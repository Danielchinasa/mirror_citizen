jest.mock("../config", () => ({
  ANALYTICS_CONFIG: {
    enabled: true,
    country: "GH",
    platform: "web",
    brand: "e-citizen",
    metaPixelId: "1101219929509340",
    newGa4MeasurementId: "G-ETJKSQ0W0L",
    newGa4Enabled: true,
    legacyGtagMeasurementId: "G-XSHE0JCXW1",
    legacyReactGa4MeasurementId: "G-DDKNJYDMQ7",
    googleAdsId: "AW-17949220362",
    legacyAnalyticsEnabled: true,
    dataLayerEnabled: true,
    backendPurchaseEnabled: true,
    attributionStorageKey: "ecitizen_attribution",
    analyticsClientIdStorageKey: "ecitizen_analytics_client_id",
    analyticsSessionIdTimeoutMs: 500,
    attributionTtlDays: 90,
  },
}));

import ReactGA from "react-ga4";
import { trackGA4Event } from "../../hooks/ga4Events";
import { withAnalyticsMetadata } from "../attribution";
import {
  __resetAnalyticsForTests,
  initializeAnalytics,
  trackAnalyticsEvent,
  trackLandingPageView,
  trackPageView,
  trackFormSubmit,
  trackVerificationStarted,
  trackBeginCheckout,
  trackPaymentInitiated,
  trackProductSelected,
  trackPurchase,
  ANALYTICS_EVENTS,
} from "../analytics";

jest.mock("react-ga4", () => ({
  __esModule: true,
  default: {
    initialize: jest.fn(),
    event: jest.fn(),
  },
}));

describe("GA4 analytics instrumentation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    __resetAnalyticsForTests();
    document.cookie = "cc_cookie=" + encodeURIComponent(JSON.stringify({ categories: ["analytics"] }));
    window.gtag = jest.fn();
    window.dataLayer = [];
    window.history.pushState({}, "", "/?utm_source=google&utm_medium=cpc&utm_campaign=ghana_id_event_test");
    window.localStorage.clear();
    delete window.fbq;
    delete window._fbq;
  });

  afterEach(() => {
    document.cookie = "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    delete window.gtag;
    delete window.dataLayer;
    delete window.fbq;
    delete window._fbq;
  });

  it("queues cold-load events until new GA4 is configured", () => {
    document.cookie = "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    trackPageView("/?utm_source=google&utm_medium=cpc&utm_campaign=landing_test");
    trackLandingPageView({ page_path: "/" });

    expect(window.gtag).not.toHaveBeenCalledWith("event", expect.any(String), expect.any(Object));

    document.cookie = "cc_cookie=" + encodeURIComponent(JSON.stringify({ categories: ["analytics"] }));
    initializeAnalytics();

    const configCallIndex = window.gtag.mock.calls.findIndex(
      ([command, measurementId]) => command === "config" && measurementId === "G-ETJKSQ0W0L",
    );
    const firstEventCallIndex = window.gtag.mock.calls.findIndex(
      ([command]) => command === "event",
    );

    expect(configCallIndex).toBeGreaterThan(-1);
    expect(firstEventCallIndex).toBeGreaterThan(configCallIndex);
    expect(window.gtag.mock.calls.filter(([command]) => command === "event")).toHaveLength(2);
  });

  it("emits landing_page_view once with country/platform/brand and attribution", () => {
    trackLandingPageView({ page_path: "/" });
    trackLandingPageView({ page_path: "/" });

    const landingCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.LANDING_PAGE_VIEW,
    );

    expect(landingCalls).toHaveLength(1);
    expect(ReactGA.event).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.LANDING_PAGE_VIEW,
      expect.objectContaining({ send_to: "G-DDKNJYDMQ7" }),
    );
    expect(landingCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        country: "GH",
        platform: "web",
        brand: "e-citizen",
        page_path: "/",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "ghana_id_event_test",
      }),
    );
  });

  it("emits Ghana ID product_selected once with canonical product fields", () => {
    trackProductSelected("nin");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(1);
    expect(productCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        product_id: "GH_ID_CARD",
        product_name: "Ghana ID Card Verification",
        product_category: "Identity",
        country: "GH",
        platform: "web",
        brand: "e-citizen",
      }),
    );
    expect(ReactGA.event).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.PRODUCT_SELECTED,
      expect.objectContaining({ send_to: "G-DDKNJYDMQ7" }),
    );
    expect(window.dataLayer.some((entry) => entry.event === ANALYTICS_EVENTS.PRODUCT_SELECTED)).toBe(false);
  });

  it("allows a legitimate later product_selected for a different product", () => {
    trackProductSelected("nin");
    trackProductSelected("vehicle");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(2);
    expect(productCalls[0][2]).toEqual(expect.objectContaining({ product_id: "GH_ID_CARD" }));
    expect(productCalls[1][2]).toEqual(expect.objectContaining({ product_id: "GH_VIN" }));
  });

  it("emits Ghana ID form_submit and verification_started with canonical product fields and no PII", () => {
    trackFormSubmit("nin", { nin: "12345678901", email: "person.com" });
    trackVerificationStarted("nin", { nin: "12345678901", email: "person.com" });

    const formSubmitCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.FORM_SUBMIT,
    );
    const verificationStartedCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.VERIFICATION_STARTED,
    );

    expect(formSubmitCalls).toHaveLength(1);
    expect(verificationStartedCalls).toHaveLength(1);
    [formSubmitCalls[0][2], verificationStartedCalls[0][2]].forEach((params) => {
      expect(params).toEqual(
        expect.objectContaining({
          send_to: "G-ETJKSQ0W0L",
          product_id: "GH_ID_CARD",
          product_name: "Ghana ID Card Verification",
          product_category: "Identity",
          country: "GH",
          platform: "web",
          brand: "e-citizen",
          utm_source: "google",
          utm_medium: "cpc",
          utm_campaign: "ghana_id_event_test",
        }),
      );
      expect(params).not.toHaveProperty("nin");
      expect(params).not.toHaveProperty("email");
    });
  });

  it("emits checkout events with canonical Ghana ID fields from centralized helpers", () => {
    trackBeginCheckout("nin", { value: 600, amount: 600, currency: "GHS" });
    trackPaymentInitiated("nin", {
      value: 600,
      amount: 600,
      currency: "GHS",
      gateway: "Paystack",
      transaction_id: "PSK_123",
    });

    const checkoutCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.BEGIN_CHECKOUT,
    );
    const paymentCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PAYMENT_INITIATED,
    );
    const addPaymentInfoCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.ADD_PAYMENT_INFO,
    );

    const expectedItem = {
      item_id: "GH_ID_CARD",
      item_name: "Ghana ID Card Verification",
      item_category: "Identity",
      price: 600,
      quantity: 1,
    };

    expect(checkoutCalls).toHaveLength(1);
    expect(paymentCalls).toHaveLength(1);
    expect(addPaymentInfoCalls).toHaveLength(1);
    expect(checkoutCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "GH_ID_CARD",
        product_category: "Identity",
        value: 600,
        currency: "GHS",
        items: [expectedItem],
      }),
    );
    expect(paymentCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "GH_ID_CARD",
        product_category: "Identity",
        gateway: "Paystack",
        transaction_id: "PSK_123",
        currency: "GHS",
        value: 600,
        amount: 600,
        items: [expectedItem],
      }),
    );
    expect(addPaymentInfoCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        country: "GH",
        platform: "web",
        brand: "e-citizen",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "ghana_id_event_test",
        product_id: "GH_ID_CARD",
        product_name: "Ghana ID Card Verification",
        product_category: "Identity",
        currency: "GHS",
        value: 600,
        payment_type: "Paystack",
        items: [expectedItem],
      }),
    );
    expect(addPaymentInfoCalls[0][2]).not.toHaveProperty("transaction_id");
    expect(addPaymentInfoCalls[0][2]).not.toHaveProperty("gateway");
  });

  it("emits payment_initiated and add_payment_info once with GA4 ecommerce items and dynamic amount", () => {
    trackPaymentInitiated("nin", {
      value: 645,
      amount: 645,
      currency: "GHS",
      gateway: "Flutterwave",
      transaction_id: "EA521788394960251",
    });

    const paymentCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PAYMENT_INITIATED,
    );
    const addPaymentInfoCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.ADD_PAYMENT_INFO,
    );
    const expectedItem = {
      item_id: "GH_ID_CARD",
      item_name: "Ghana ID Card Verification",
      item_category: "Identity",
      price: 645,
      quantity: 1,
    };

    expect(paymentCalls).toHaveLength(1);
    expect(addPaymentInfoCalls).toHaveLength(1);
    expect(paymentCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        transaction_id: "EA521788394960251",
        gateway: "Flutterwave",
        currency: "GHS",
        value: 645,
        amount: 645,
        country: "GH",
        platform: "web",
        brand: "e-citizen",
        product_id: "GH_ID_CARD",
        product_name: "Ghana ID Card Verification",
        product_category: "Identity",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "ghana_id_event_test",
        items: [expectedItem],
      }),
    );
    expect(addPaymentInfoCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        currency: "GHS",
        value: 645,
        payment_type: "Flutterwave",
        country: "GH",
        platform: "web",
        brand: "e-citizen",
        product_id: "GH_ID_CARD",
        product_name: "Ghana ID Card Verification",
        product_category: "Identity",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "ghana_id_event_test",
        items: [expectedItem],
      }),
    );
    expect(addPaymentInfoCalls[0][2]).not.toHaveProperty("transaction_id");
  });

  it("does not emit duplicate new-property page_view for the same route key", () => {
    trackPageView("/verification-login?redirect=/verify/nin");
    trackPageView("/verification-login?redirect=/verify/nin");

    const pageViewCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PAGE_VIEW,
    );

    expect(pageViewCalls).toHaveLength(1);
    expect(pageViewCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        page_path: "/verification-login?redirect=/verify/nin",
      }),
    );
    expect(window.dataLayer.some((entry) => entry.event === ANALYTICS_EVENTS.PAGE_VIEW)).toBe(false);
  });

  it("attaches analytics client and session ids to backend payment payload metadata", async () => {
    window.gtag.mockImplementation((command, measurementId, field, callback) => {
      if (command === "get" && field === "session_id") callback("1712345678");
    });

    initializeAnalytics();

    const payload = await withAnalyticsMetadata({ sessionCode: "SESSION_123" });

    expect(payload).toEqual(
      expect.objectContaining({
        sessionCode: "SESSION_123",
        analyticsClientId: expect.any(String),
        analyticsSessionId: "1712345678",
        analyticsPlatform: "web",
        metaAnalyticsConsent: true,
        attribution: expect.objectContaining({
          utm_source: "google",
          utm_medium: "cpc",
          utm_campaign: "ghana_id_event_test",
        }),
      }),
    );
  });

  it("legacy browser analytics wrapper refuses purchase events", () => {
    trackGA4Event(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: "EA123",
      value: 600,
      currency: "GHS",
    });

    expect(window.gtag).not.toHaveBeenCalledWith("event", ANALYTICS_EVENTS.PURCHASE, expect.any(Object));
  });

  it("still refuses browser-owned purchase events", () => {
    trackAnalyticsEvent(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: "EA123",
      value: 600,
      currency: "GHS",
    });

    expect(window.gtag).not.toHaveBeenCalledWith("event", ANALYTICS_EVENTS.PURCHASE, expect.any(Object));
    expect(ReactGA.event).not.toHaveBeenCalledWith(ANALYTICS_EVENTS.PURCHASE, expect.any(Object));
  });
  it("does not initialize Meta Pixel without valid analytics consent", () => {
    document.cookie = "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    initializeAnalytics();
    expect(window.fbq).toBeUndefined();

    document.cookie = "cc_cookie=%7Bnot-json";
    initializeAnalytics();
    expect(window.fbq).toBeUndefined();
  });

  it("adds the Pixel consent decision to payment metadata", async () => {
    window.gtag.mockImplementation((command, _measurementId, field, callback) => {
      if (command === "get" && field === "session_id") callback("1712345678");
    });

    await expect(withAnalyticsMetadata({ sessionCode: "SESSION_META" })).resolves.toEqual(
      expect.objectContaining({ metaAnalyticsConsent: true }),
    );

    document.cookie = "cc_cookie=" + encodeURIComponent(JSON.stringify({ categories: [] }));
    await expect(withAnalyticsMetadata({ sessionCode: "SESSION_META" })).resolves.toEqual(
      expect.objectContaining({ metaAnalyticsConsent: false }),
    );
  });

  it("emits one Meta Purchase using the shared stable event ID", () => {
    initializeAnalytics();
    trackPurchase("nin", { transaction_id: "EA123", value: 645, currency: "GHS" });
    trackPurchase("nin", { transaction_id: "EA123", value: 645, currency: "GHS" });

    const purchases = window.fbq.queue.filter((call) => call[0] === "track" && call[1] === "Purchase");
    expect(purchases).toHaveLength(1);
    expect(purchases[0][2]).toEqual(expect.objectContaining({ value: 645, currency: "GHS" }));
    expect(purchases[0][3]).toEqual({ eventID: "PURCHASE:EA123" });
  });

  it("stops Meta dispatching after analytics consent is withdrawn", () => {
    initializeAnalytics();
    const queuedCalls = window.fbq.queue.length;

    document.cookie = "cc_cookie=" + encodeURIComponent(JSON.stringify({ categories: [] }));
    trackPageView("/withdrawn-consent");
    trackPurchase("nin", { transaction_id: "EA-WITHDRAWN", value: 645, currency: "GHS" });

    expect(window.fbq.queue).toHaveLength(queuedCalls);
  });

});
