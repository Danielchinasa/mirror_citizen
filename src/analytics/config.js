export const ANALYTICS_CONFIG = {
  enabled: process.env.REACT_APP_ANALYTICS_ENABLED !== "false",
  country: process.env.REACT_APP_ANALYTICS_COUNTRY || "NG",
  platform: process.env.REACT_APP_ANALYTICS_PLATFORM || "web",
  brand: process.env.REACT_APP_ANALYTICS_BRAND || "e-citizen",
  defaultCurrency: process.env.REACT_APP_ANALYTICS_DEFAULT_CURRENCY || "NGN",
  metaPixelId: process.env.REACT_APP_META_PIXEL_ID || "",
  newGa4MeasurementId:
    process.env.REACT_APP_GA4_MEASUREMENT_ID || "G-GTKPPQ4D13",
  newGa4Enabled: process.env.REACT_APP_GA4_NEW_PROPERTY_ENABLED === "true",
  legacyGtagMeasurementId:
    process.env.REACT_APP_LEGACY_GTAG_MEASUREMENT_ID || "G-XSHE0JCXW1",
  legacyReactGa4MeasurementId:
    process.env.REACT_APP_LEGACY_REACT_GA4_MEASUREMENT_ID || "G-DDKNJYDMQ7",
  googleAdsId: process.env.REACT_APP_GOOGLE_ADS_ID || "AW-17949220362",
  legacyAnalyticsEnabled:
    process.env.REACT_APP_LEGACY_ANALYTICS_ENABLED !== "false",
  dataLayerEnabled: process.env.REACT_APP_ANALYTICS_DATALAYER_ENABLED !== "false",
  backendPurchaseEnabled:
    process.env.REACT_APP_GA4_BACKEND_PURCHASE_ENABLED === "true",
  attributionStorageKey: "ecitizen_attribution",
  analyticsClientIdStorageKey: "ecitizen_analytics_client_id",
  analyticsSessionIdTimeoutMs: 500,
  attributionTtlDays: 90,
};
