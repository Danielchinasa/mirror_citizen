export const ANALYTICS_EVENTS = {
  LANDING_PAGE_VIEW: "landing_page_view",
  PRODUCT_SELECTED: "product_selected",
  SIGNUP_STARTED: "signup_started",
  SIGN_UP: "sign_up",
  LOGIN: "login",
  VERIFICATION_STARTED: "verification_started",
  FORM_SUBMIT: "form_submit",
  BEGIN_CHECKOUT: "begin_checkout",
  PAYMENT_INITIATED: "payment_initiated",
  ADD_PAYMENT_INFO: "add_payment_info",
  PAYMENT_FAILED: "payment_failed",
  PURCHASE: "purchase",
  REPORT_DELIVERED: "report_delivered",
  REFUND: "refund",
  PAGE_VIEW: "page_view",
};

export const ALLOWED_ANALYTICS_PARAMS = new Set([
  "user_id",
  "session_id",
  "platform",
  "country",
  "brand",
  "page_path",
  "page_location",
  "page_title",
  "product_id",
  "product_name",
  "product_category",
  "amount",
  "value",
  "currency",
  "gateway",
  "payment_type",
  "transaction_id",
  "payment_status",
  "report_status",
  "method",
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "items",
]);

export const BLOCKED_ANALYTICS_PARAMS = new Set([
  "nin",
  "bvn",
  "phone",
  "phoneNumber",
  "email",
  "idNumber",
  "identityNumber",
  "password",
  "token",
  "jwt",
  "jwtToken",
  "accessToken",
  "providerResponse",
  "verificationPayload",
  "card",
]);

const PRODUCT_MAP = {
  nin: {
    product_id: "NG_NIN",
    product_name: "Nigeria NIN Verification",
    product_category: "Identity",
  },
  phone: {
    product_id: "NG_PHONE",
    product_name: "Nigeria Phone Verification",
    product_category: "Identity",
  },
  bvn: {
    product_id: "NG_CREDIT_BVN",
    product_name: "Nigeria Credit BVN Verification",
    product_category: "Financial",
  },
  business: {
    product_id: "NG_BUSINESS",
    product_name: "Nigeria Business Verification",
    product_category: "Business",
  },
  rc: {
    product_id: "NG_BUSINESS",
    product_name: "Nigeria Business Verification",
    product_category: "Business",
  },
  business_name: {
    product_id: "NG_BUSINESS",
    product_name: "Nigeria Business Verification",
    product_category: "Business",
  },
  vehicle: {
    product_id: "NG_VEHICLE",
    product_name: "Nigeria Vehicle Verification",
    product_category: "Vehicle",
  },
  vin: {
    product_id: "NG_VEHICLE",
    product_name: "Nigeria Vehicle Verification",
    product_category: "Vehicle",
  },
};

export function resolveAnalyticsProduct(serviceType) {
  const key = String(serviceType || "").trim().toLowerCase();
  return PRODUCT_MAP[key] || null;
}

export function buildAnalyticsItem(product, amount) {
  if (!product || amount === undefined || amount === null || amount === "") {
    return null;
  }

  const price = Number(amount);
  if (!Number.isFinite(price)) return null;

  return {
    item_id: product.product_id,
    item_name: product.product_name,
    item_category: product.product_category,
    price,
    quantity: 1,
  };
}

export function sanitizeAnalyticsParams(params = {}) {
  return Object.entries(params).reduce((safeParams, [key, value]) => {
    if (
      !ALLOWED_ANALYTICS_PARAMS.has(key) ||
      BLOCKED_ANALYTICS_PARAMS.has(key) ||
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return safeParams;
    }
    safeParams[key] = value;
    return safeParams;
  }, {});
}
