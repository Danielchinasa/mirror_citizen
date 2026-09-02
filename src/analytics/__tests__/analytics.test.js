jest.mock("../config", () => ({
  ANALYTICS_CONFIG: {
    enabled: true,
    country: "NG",
    platform: "web",
    brand: "e-citizen",
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
import {
  __resetAnalyticsForTests,
  initializeAnalytics,
  trackAnalyticsEvent,
  trackLandingPageView,
  trackPageView,
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
    document.cookie = "cc_cookie=" + encodeURIComponent(JSON.stringify({ categories: ["analytics"] }));
    window.gtag = jest.fn();
    window.dataLayer = [];
    window.history.pushState({}, "", "/?utm_source=google&utm_medium=cpc&utm_campaign=nin_event_test");
    window.localStorage.clear();
  });

  afterEach(() => {
    document.cookie = "cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    delete window.gtag;
    delete window.dataLayer;
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
        country: "NG",
        platform: "web",
        brand: "e-citizen",
        page_path: "/",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "nin_event_test",
      }),
    );
  });

  it("emits NIN product_selected once with canonical product fields", () => {
    trackProductSelected("nin");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(1);
    expect(productCalls[0][2]).toEqual(
      expect.objectContaining({
        send_to: "G-ETJKSQ0W0L",
        product_id: "NG_NIN",
        product_name: "Nigeria NIN Verification",
        product_category: "Identity",
        country: "NG",
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
    trackProductSelected("phone");

    const productCalls = window.gtag.mock.calls.filter(
      ([command, eventName]) => command === "event" && eventName === ANALYTICS_EVENTS.PRODUCT_SELECTED,
    );

    expect(productCalls).toHaveLength(2);
    expect(productCalls[0][2]).toEqual(expect.objectContaining({ product_id: "NG_NIN" }));
    expect(productCalls[1][2]).toEqual(expect.objectContaining({ product_id: "NG_PHONE" }));
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

  it("still refuses browser-owned purchase events", () => {
    trackAnalyticsEvent(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: "EA123",
      value: 600,
      currency: "NGN",
    });

    expect(window.gtag).not.toHaveBeenCalledWith("event", ANALYTICS_EVENTS.PURCHASE, expect.any(Object));
    expect(ReactGA.event).not.toHaveBeenCalledWith(ANALYTICS_EVENTS.PURCHASE, expect.any(Object));
  });
});
