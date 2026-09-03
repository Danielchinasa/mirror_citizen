jest.mock("../config", () => ({
  ANALYTICS_CONFIG: {
    enabled: true,
    country: "UG",
    platform: "web",
    brand: "e-raia",
    defaultCurrency: "UGX",
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

    document.cookie =
      "cc_cookie=" +
      encodeURIComponent(
        JSON.stringify({
          categories: ["analytics"],
        }),
      );

    window.gtag = jest.fn();
    window.dataLayer = [];

    window.history.pushState(
      {},
      "",
      "/?utm_source=google&utm_medium=cpc&utm_campaign=uganda_national_id_event_test",
    );

    window.localStorage.clear();
  });

  afterEach(() => {
    document.cookie =
      "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    delete window.gtag;
    delete window.dataLayer;
  });

  it("queues cold-load events until new GA4 is configured", () => {
    document.cookie =
      "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    trackPageView(
      "/?utm_source=google&utm_medium=cpc&utm_campaign=landing_test",
    );

    trackLandingPageView({
      page_path: "/",
    });

    expect(window.gtag).not.toHaveBeenCalledWith(
      "event",
      expect.any(String),
      expect.any(Object),
    );

    document.cookie =
      "cc_cookie=" +
      encodeURIComponent(
        JSON.stringify({
          categories: ["analytics"],
        }),
      );

    initializeAnalytics();

    const configCallIndex = window.gtag.mock.calls.findIndex(
      ([command, measurementId]) =>
        command === "config" && measurementId === "G-ETJKSQ0W0L",
    );

    const firstEventCallIndex = window.gtag.mock.calls.findIndex(
      ([command]) => command === "event",
    );

    expect(configCallIndex).toBeGreaterThan(-1);
    expect(firstEventCallIndex).toBeGreaterThan(configCallIndex);

    expect(
      window.gtag.mock.calls.filter(([command]) => command === "event"),
    ).toHaveLength(2);
  });

  it("emits landing_page_view once with country/platform/brand and attribution", () => {
    trackLandingPageView({
      page_path: "/",
    });

    trackLandingPageView({
      page_path: "/",
    });

    const landingCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.LANDING_PAGE_VIEW,
    );

    expect(landingCalls).toHaveLength(1);

    expect(ReactGA.event).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.LANDING_PAGE_VIEW,
      expect.objectContaining({
        send_to: "G-DDKNJYDMQ7",
      }),
    );

    expect(landingCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        country: "UG",
        platform: "web",
        brand: "e-raia",
        page_path: "/",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "uganda_national_id_event_test",
      }),
    );
  });

  it("emits Uganda National ID product_selected once with canonical product fields", () => {
    trackProductSelected("nin");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(1);

    expect(productCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        product_id: "UG_NATIONAL_ID",
        product_name: "Uganda National ID Verification",
        product_category: "Identity",
        country: "UG",
        platform: "web",
        brand: "e-raia",
      }),
    );

    expect(ReactGA.event).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.PRODUCT_SELECTED,
      expect.objectContaining({
        send_to: "G-DDKNJYDMQ7",
      }),
    );

    expect(
      window.dataLayer.some(
        (entry) => entry.event === ANALYTICS_EVENTS.PRODUCT_SELECTED,
      ),
    ).toBe(false);
  });

  it("allows a legitimate later product_selected for a different product", () => {
    trackProductSelected("nin");
    trackProductSelected("vehicle");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(2);

    expect(productCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "UG_NATIONAL_ID",
      }),
    );

    expect(productCalls[1][2]).toEqual(
      expect.objectContaining({
        product_id: "UG_VIN",
      }),
    );
  });

  it("emits Uganda National ID form_submit and verification_started with canonical product fields and no PII", () => {
    trackFormSubmit("nin", {
      nin: "12345678901",
      email: "person.com",
    });

    trackVerificationStarted("nin", {
      nin: "12345678901",
      email: "person.com",
    });

    const formSubmitCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.FORM_SUBMIT,
    );

    const verificationStartedCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.VERIFICATION_STARTED,
    );

    expect(formSubmitCalls).toHaveLength(1);
    expect(verificationStartedCalls).toHaveLength(1);

    [formSubmitCalls[0][2], verificationStartedCalls[0][2]].forEach(
      (params) => {
        expect(params).toEqual(
          expect.objectContaining({
            send_to: "G-ETJKSQ0W0L",
            product_id: "UG_NATIONAL_ID",
            product_name: "Uganda National ID Verification",
            product_category: "Identity",
            country: "UG",
            platform: "web",
            brand: "e-raia",
            utm_source: "google",
            utm_medium: "cpc",
            utm_campaign: "uganda_national_id_event_test",
          }),
        );

        expect(params).not.toHaveProperty("nin");
        expect(params).not.toHaveProperty("email");
      },
    );
  });

  it("emits checkout events with canonical Uganda National ID fields from centralized helpers", () => {
    trackBeginCheckout("nin", {
      value: 600,
      amount: 600,
      currency: "UGX",
    });

    trackPaymentInitiated("nin", {
      value: 600,
      amount: 600,
      currency: "UGX",
      gateway: "Paystack",
      transaction_id: "PSK_123",
    });

    const checkoutCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.BEGIN_CHECKOUT,
    );

    const paymentCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PAYMENT_INITIATED,
    );

    const addPaymentInfoCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.ADD_PAYMENT_INFO,
    );

    const expectedItem = {
      item_id: "UG_NATIONAL_ID",
      item_name: "Uganda National ID Verification",
      item_category: "Identity",
      price: 600,
      quantity: 1,
    };

    expect(checkoutCalls).toHaveLength(1);
    expect(paymentCalls).toHaveLength(1);
    expect(addPaymentInfoCalls).toHaveLength(1);

    expect(checkoutCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "UG_NATIONAL_ID",
        product_category: "Identity",
        value: 600,
        currency: "UGX",
        items: [expectedItem],
      }),
    );

    expect(paymentCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "UG_NATIONAL_ID",
        product_category: "Identity",
        gateway: "Paystack",
        transaction_id: "PSK_123",
        currency: "UGX",
        value: 600,
        amount: 600,
        items: [expectedItem],
      }),
    );

    expect(addPaymentInfoCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        country: "UG",
        platform: "web",
        brand: "e-raia",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "uganda_national_id_event_test",
        product_id: "UG_NATIONAL_ID",
        product_name: "Uganda National ID Verification",
        product_category: "Identity",
        currency: "UGX",
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
      currency: "UGX",
      gateway: "Flutterwave",
      transaction_id: "EA521788394960251",
    });

    const paymentCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PAYMENT_INITIATED,
    );

    const addPaymentInfoCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.ADD_PAYMENT_INFO,
    );

    const expectedItem = {
      item_id: "UG_NATIONAL_ID",
      item_name: "Uganda National ID Verification",
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
        currency: "UGX",
        value: 645,
        amount: 645,
        country: "UG",
        platform: "web",
        brand: "e-raia",
        product_id: "UG_NATIONAL_ID",
        product_name: "Uganda National ID Verification",
        product_category: "Identity",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "uganda_national_id_event_test",
        items: [expectedItem],
      }),
    );

    expect(addPaymentInfoCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        currency: "UGX",
        value: 645,
        payment_type: "Flutterwave",
        country: "UG",
        platform: "web",
        brand: "e-raia",
        product_id: "UG_NATIONAL_ID",
        product_name: "Uganda National ID Verification",
        product_category: "Identity",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "uganda_national_id_event_test",
        items: [expectedItem],
      }),
    );

    expect(addPaymentInfoCalls[0][2]).not.toHaveProperty("transaction_id");
  });

  it("maps Uganda VIN to the canonical vehicle analytics product", () => {
    trackProductSelected("vehicle");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(1);

    expect(productCalls[0][2]).toEqual(
      expect.objectContaining({
        product_id: "UG_VIN",
        product_name: "Uganda VIN Vehicle History",
        product_category: "Vehicle",
        country: "UG",
        platform: "web",
        brand: "e-raia",
      }),
    );
  });

  it("preserves USD as the runtime currency for diaspora transactions", () => {
    trackBeginCheckout("nin", {
      value: 12,
      amount: 12,
      currency: "USD",
    });

    trackPaymentInitiated("nin", {
      value: 12,
      amount: 12,
      currency: "USD",
      gateway: "Flutterwave",
      transaction_id: "EA_DIASPORA_UG_001",
    });

    const checkoutCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.BEGIN_CHECKOUT,
    );

    const paymentCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PAYMENT_INITIATED,
    );

    expect(checkoutCalls).toHaveLength(1);
    expect(paymentCalls).toHaveLength(1);

    expect(checkoutCalls[0][2]).toEqual(
      expect.objectContaining({
        country: "UG",
        currency: "USD",
        value: 12,
        product_id: "UG_NATIONAL_ID",
      }),
    );

    expect(paymentCalls[0][2]).toEqual(
      expect.objectContaining({
        country: "UG",
        currency: "USD",
        gateway: "Flutterwave",
        transaction_id: "EA_DIASPORA_UG_001",
        product_id: "UG_NATIONAL_ID",
      }),
    );
  });

  it("does not emit duplicate new-property page_view for the same route key", () => {
    trackPageView("/verification-login?redirect=/verify/nin");
    trackPageView("/verification-login?redirect=/verify/nin");

    const pageViewCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) =>
        command === "event" &&
        eventName === ANALYTICS_EVENTS.PAGE_VIEW,
    );

    expect(pageViewCalls).toHaveLength(1);

    expect(pageViewCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        page_path: "/verification-login?redirect=/verify/nin",
      }),
    );

    expect(
      window.dataLayer.some(
        (entry) => entry.event === ANALYTICS_EVENTS.PAGE_VIEW,
      ),
    ).toBe(false);
  });

  it("attaches analytics client and session ids to backend payment payload metadata", async () => {
    window.gtag.mockImplementation(
      (command, measurementId, field, callback) => {
        if (command === "get" && field === "session_id") {
          callback("1712345678");
        }
      },
    );

    initializeAnalytics();

    const payload = await withAnalyticsMetadata({
      sessionCode: "SESSION_123",
    });

    expect(payload).toEqual(
      expect.objectContaining({
        sessionCode: "SESSION_123",
        analyticsClientId: expect.any(String),
        analyticsSessionId: "1712345678",
        analyticsPlatform: "web",
        attribution: expect.objectContaining({
          utm_source: "google",
          utm_medium: "cpc",
          utm_campaign: "uganda_national_id_event_test",
        }),
      }),
    );
  });

  it("legacy browser analytics wrapper refuses purchase events", () => {
    trackGA4Event(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: "EA123",
      value: 600,
      currency: "UGX",
    });

    expect(window.gtag).not.toHaveBeenCalledWith(
      "event",
      ANALYTICS_EVENTS.PURCHASE,
      expect.any(Object),
    );
  });

  it("still refuses browser-owned purchase events", () => {
    trackAnalyticsEvent(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: "EA123",
      value: 600,
      currency: "UGX",
    });

    expect(window.gtag).not.toHaveBeenCalledWith(
      "event",
      ANALYTICS_EVENTS.PURCHASE,
      expect.any(Object),
    );

    expect(ReactGA.event).not.toHaveBeenCalledWith(
      ANALYTICS_EVENTS.PURCHASE,
      expect.any(Object),
    );
  });
});