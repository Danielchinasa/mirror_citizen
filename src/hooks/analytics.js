const GA_MEASUREMENT_ID = "G-XSHE0JCXW1";
const GOOGLE_ADS_CONVERSION_ID = "AW-17949220362/8vVvCL6dtfcbEIq87e5C";

// Track page views
export const pageview = (url) => {
  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track purchase conversions for Google Ads
export const trackPurchaseConversion = ({
  value = 1.0,
  currency = "USD",
  transactionId = "",
  isNewCustomer = undefined,
}) => {
  if (window.gtag) {
    const conversionData = {
      send_to: GOOGLE_ADS_CONVERSION_ID,
      value: value,
      currency: currency,
      transaction_id: transactionId,
    };

    // Only include new_customer if it's explicitly set
    if (isNewCustomer !== undefined) {
      conversionData.new_customer = isNewCustomer;
    }

    window.gtag("event", "conversion", conversionData);
  }
};
