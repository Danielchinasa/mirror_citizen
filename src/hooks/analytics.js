import { trackAnalyticsEvent } from "../analytics/analytics";

export const pageview = (url) => {
  trackAnalyticsEvent("page_view", { page_path: url });
};

export const trackEvent = ({ action, category, label, value }) => {
  trackAnalyticsEvent(action, {
    product_category: category,
    product_name: label,
    value,
  });
};

export const trackPurchaseConversion = () => {
  // Browser-owned purchase/conversion tracking is disabled.
  // Backend payment confirmation owns purchase in the new GA4 model.
};

export { trackAnalyticsEvent, trackAnalyticsEvent as trackGA4Event };
