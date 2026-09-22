import ReactGA from "react-ga4";
import { ANALYTICS_CONFIG } from "./config";
import { captureAttribution, getAttribution } from "./attribution";
import {
  ANALYTICS_EVENTS,
  resolveAnalyticsProduct,
  buildAnalyticsItem,
  sanitizeAnalyticsParams,
} from "./events";

let initialized = false;
let flushingQueuedEvents = false;
let pendingEvents = [];
let lastTrackedPagePath = null;
let lastLandingPagePath = null;

const BACKEND_OWNED_EVENTS = new Set([
  ANALYTICS_EVENTS.PURCHASE,
  ANALYTICS_EVENTS.PAYMENT_FAILED,
  ANALYTICS_EVENTS.REPORT_DELIVERED,
  ANALYTICS_EVENTS.REFUND,
]);

const MAX_PENDING_EVENTS = 50;

function hasAnalyticsConsent() {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(/(^| )cc_cookie=([^;]+)/);
  if (!match) return false;

  try {
    const consent = JSON.parse(decodeURIComponent(match[2]));
    return Array.isArray(consent.categories)
      ? consent.categories.includes("analytics")
      : false;
  } catch {
    return false;
  }
}

function baseParams(params = {}) {
  return sanitizeAnalyticsParams({
    country: ANALYTICS_CONFIG.country,
    platform: ANALYTICS_CONFIG.platform,
    brand: ANALYTICS_CONFIG.brand,
    ...getAttribution(),
    ...params,
  });
}

function configureGtagMeasurement(measurementId) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", measurementId, { send_page_view: false });
}

function ensureGtag() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  if (!document.getElementById("ecitizen-analytics-gtag")) {
    const measurementId = ANALYTICS_CONFIG.newGa4Enabled
      ? ANALYTICS_CONFIG.newGa4MeasurementId
      : ANALYTICS_CONFIG.legacyGtagMeasurementId;
    const script = document.createElement("script");
    script.id = "ecitizen-analytics-gtag";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
}

function eventKey(eventName, eventParams) {
  if (eventName === ANALYTICS_EVENTS.PAGE_VIEW) {
    return `${eventName}:${eventParams.page_path || ""}`;
  }
  if (eventName === ANALYTICS_EVENTS.LANDING_PAGE_VIEW) {
    return `${eventName}:${eventParams.page_path || ""}`;
  }
  if (eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED) {
    return `${eventName}:${eventParams.product_id || ""}`;
  }
  return `${eventName}:${JSON.stringify(eventParams)}`;
}

function queueEvent(eventName, eventParams) {
  const key = eventKey(eventName, eventParams);
  if (pendingEvents.some((event) => event.key === key)) return;

  pendingEvents.push({ key, eventName, eventParams });
  if (pendingEvents.length > MAX_PENDING_EVENTS) {
    pendingEvents = pendingEvents.slice(-MAX_PENDING_EVENTS);
  }
}

function shouldPushToDataLayer(eventName) {
  return (
    eventName !== ANALYTICS_EVENTS.PAGE_VIEW &&
    !ANALYTICS_CONFIG.newGa4Enabled &&
    ANALYTICS_CONFIG.dataLayerEnabled &&
    typeof window !== "undefined" &&
    window.dataLayer
  );
}

function legacyReactGaParams(eventParams) {
  if (
    ANALYTICS_CONFIG.newGa4Enabled &&
    ANALYTICS_CONFIG.legacyReactGa4MeasurementId
  ) {
    return {
      ...eventParams,
      send_to: ANALYTICS_CONFIG.legacyReactGa4MeasurementId,
    };
  }
  return eventParams;
}

function dispatchFacebookEvent(eventName, eventParams) {
  if (typeof window === "undefined" || !window.fbq) return;

  const fbParams = { ...eventParams };

  switch (eventName) {
    case ANALYTICS_EVENTS.PAGE_VIEW:
    case ANALYTICS_EVENTS.LANDING_PAGE_VIEW:
      console.log("🔵 [FB Pixel] Firing: PageView", fbParams);
      window.fbq("track", "PageView", fbParams);
      break;
    case ANALYTICS_EVENTS.PURCHASE:
      const purchasePayload = {
        ...fbParams,
        value: Number(fbParams.value || fbParams.amount || 0),
        currency: fbParams.currency || "NGN",
        content_ids: fbParams.product_id
          ? [fbParams.product_id.replace(/^NG_/, "")]
          : [],
        country: fbParams.country || "NG",
      };
      console.log("🔵 [FB Pixel] Firing: Purchase", purchasePayload);
      window.fbq("track", "Purchase", purchasePayload);
      break;
    case ANALYTICS_EVENTS.BEGIN_CHECKOUT:
    case ANALYTICS_EVENTS.PAYMENT_INITIATED:
      console.log("🔵 [FB Pixel] Firing: InitiateCheckout", fbParams);
      window.fbq("track", "InitiateCheckout", fbParams);
      break;
    case ANALYTICS_EVENTS.ADD_PAYMENT_INFO:
      console.log("🔵 [FB Pixel] Firing: AddPaymentInfo", fbParams);
      window.fbq("track", "AddPaymentInfo", fbParams);
      break;
    case ANALYTICS_EVENTS.SIGN_UP:
      console.log("🔵 [FB Pixel] Firing: CompleteRegistration", fbParams);
      window.fbq("track", "CompleteRegistration", fbParams);
      break;
    case ANALYTICS_EVENTS.VERIFICATION_STARTED:
    case ANALYTICS_EVENTS.FORM_SUBMIT:
      console.log("🔵 [FB Pixel] Firing: Lead", fbParams);
      window.fbq("track", "Lead", fbParams);
      break;
    case ANALYTICS_EVENTS.PRODUCT_SELECTED:
      console.log("🔵 [FB Pixel] Firing: ViewContent", fbParams);
      window.fbq("track", "ViewContent", fbParams);
      break;
    case ANALYTICS_EVENTS.PAYMENT_FAILED:
      const paymentFailedPayload = {
        ...fbParams,
        value: Number(fbParams.value || fbParams.amount || 0),
        currency: fbParams.currency || "NGN",
        content_ids: fbParams.product_id
          ? [fbParams.product_id.replace(/^NG_/, "")]
          : [],
        country: fbParams.country || "NG",
      };
      console.log(
        "🔵 [FB Pixel] Firing Custom: PaymentFailed",
        paymentFailedPayload,
      );
      window.fbq("trackCustom", "PaymentFailed", paymentFailedPayload);
      break;
    default:
      // Track any unmapped events as custom events so you don't miss anything
      console.log(`🔵 [FB Pixel] Firing Custom: ${eventName}`, fbParams);
      window.fbq("trackCustom", eventName, fbParams);
      break;
  }
}

function dispatchAnalyticsEvent(eventName, eventParams) {
  const isBackendOwned = BACKEND_OWNED_EVENTS.has(eventName);

  if (isBackendOwned) {
    console.log(
      `🚫 [Analytics Tracker] Ignored Backend-Owned Event (GA Skipped): ${eventName}`,
      eventParams,
    );
  } else {
    console.log(
      `🚀 [Analytics Tracker] Dispatched Event: ${eventName}`,
      eventParams,
    );
  }

  if (!isBackendOwned && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...eventParams,
      ...(ANALYTICS_CONFIG.newGa4Enabled
        ? { send_to: ANALYTICS_CONFIG.newGa4MeasurementId }
        : {}),
    });
  }

  if (!isBackendOwned && shouldPushToDataLayer(eventName)) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  if (!isBackendOwned && ANALYTICS_CONFIG.legacyAnalyticsEnabled) {
    ReactGA.event(eventName, legacyReactGaParams(eventParams));
  }

  dispatchFacebookEvent(eventName, eventParams);
}

function flushPendingEvents() {
  if (!initialized || flushingQueuedEvents) return;
  flushingQueuedEvents = true;

  const eventsToFlush = pendingEvents;
  pendingEvents = [];
  eventsToFlush.forEach(({ eventName, eventParams }) => {
    dispatchAnalyticsEvent(eventName, eventParams);
  });

  flushingQueuedEvents = false;
}

export function initializeAnalytics() {
  captureAttribution();

  if (!ANALYTICS_CONFIG.enabled || !hasAnalyticsConsent()) {
    return false;
  }

  if (initialized) {
    flushPendingEvents();
    return true;
  }

  ensureGtag();

  if (ANALYTICS_CONFIG.legacyAnalyticsEnabled) {
    ReactGA.initialize(ANALYTICS_CONFIG.legacyReactGa4MeasurementId);
    configureGtagMeasurement(ANALYTICS_CONFIG.legacyGtagMeasurementId);
  }

  if (ANALYTICS_CONFIG.newGa4Enabled) {
    configureGtagMeasurement(ANALYTICS_CONFIG.newGa4MeasurementId);
  }

  if (ANALYTICS_CONFIG.googleAdsId) {
    configureGtagMeasurement(ANALYTICS_CONFIG.googleAdsId);
  }

  initialized = true;
  flushPendingEvents();
  return true;
}

export function trackAnalyticsEvent(eventName, params = {}) {
  if (!ANALYTICS_CONFIG.enabled) return;

  captureAttribution();
  const eventParams = baseParams(params);

  if (!initialized && !initializeAnalytics()) {
    queueEvent(eventName, eventParams);
    return;
  }

  dispatchAnalyticsEvent(eventName, eventParams);
}

export function trackPageView(path) {
  if (path === lastTrackedPagePath) return;
  lastTrackedPagePath = path;

  trackAnalyticsEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page_path: path,
    page_location:
      typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

export function trackLandingPageView(params = {}) {
  const landingPath =
    params.page_path ||
    (typeof window !== "undefined" ? window.location.pathname : "");
  if (landingPath === lastLandingPagePath) return;
  lastLandingPagePath = landingPath;

  trackAnalyticsEvent(ANALYTICS_EVENTS.LANDING_PAGE_VIEW, params);
}

export function trackProductSelected(serviceType, params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.PRODUCT_SELECTED, {
    ...resolveAnalyticsProduct(serviceType),
    ...params,
  });
}

export function trackSignupStarted(params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.SIGNUP_STARTED, params);
}

export function trackSignUp(params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.SIGN_UP, params);
}

export function trackLogin(params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.LOGIN, params);
}

export function trackVerificationStarted(serviceType, params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.VERIFICATION_STARTED, {
    ...resolveAnalyticsProduct(serviceType),
    ...params,
  });
}

export function trackFormSubmit(serviceType, params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.FORM_SUBMIT, {
    ...resolveAnalyticsProduct(serviceType),
    ...params,
  });
}

export function trackBeginCheckout(serviceType, params = {}) {
  const product = resolveAnalyticsProduct(serviceType);
  const item = buildAnalyticsItem(product, params.value ?? params.amount);

  trackAnalyticsEvent(ANALYTICS_EVENTS.BEGIN_CHECKOUT, {
    ...product,
    currency: params.currency || ANALYTICS_CONFIG.defaultCurrency,
    ...params,
    ...(item ? { items: [item] } : {}),
  });
}

export function trackPaymentInitiated(serviceType, params = {}) {
  const product = resolveAnalyticsProduct(serviceType);
  const amount = params.value ?? params.amount;
  const currency = params.currency || ANALYTICS_CONFIG.defaultCurrency;
  const item = buildAnalyticsItem(product, amount);

  trackAnalyticsEvent(ANALYTICS_EVENTS.PAYMENT_INITIATED, {
    ...product,
    currency,
    ...params,
    ...(item ? { items: [item] } : {}),
  });

  trackAnalyticsEvent(ANALYTICS_EVENTS.ADD_PAYMENT_INFO, {
    ...product,
    currency,
    value: amount,
    payment_type: params.gateway,
    ...(item ? { items: [item] } : {}),
  });
}

export function trackPaymentFailed(serviceType, params = {}) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, {
    ...resolveAnalyticsProduct(serviceType),
    ...params,
  });
}

export function trackPurchase(serviceType, params = {}) {
  const product = resolveAnalyticsProduct(serviceType);
  const amount = params.value ?? params.amount;
  const currency = params.currency || ANALYTICS_CONFIG.defaultCurrency;
  const item = buildAnalyticsItem(product, amount);

  trackAnalyticsEvent(ANALYTICS_EVENTS.PURCHASE, {
    ...product,
    currency,
    value: amount,
    ...params,
    ...(item ? { items: [item] } : {}),
  });
}

export function __resetAnalyticsForTests() {
  initialized = false;
  flushingQueuedEvents = false;
  pendingEvents = [];
  lastTrackedPagePath = null;
  lastLandingPagePath = null;
}

export { ANALYTICS_CONFIG, ANALYTICS_EVENTS, getAttribution };
