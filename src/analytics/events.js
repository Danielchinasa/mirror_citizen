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
    product_id: "KE_NATIONAL_ID",
    product_name: "Kenya National ID Verification",
    product_category: "Identity",
  },

  national_id: {
    product_id: "KE_NATIONAL_ID",
    product_name: "Kenya National ID Verification",
    product_category: "Identity",
  },

  id_card: {
    product_id: "KE_NATIONAL_ID",
    product_name: "Kenya National ID Verification",
    product_category: "Identity",
  },

  alien: {
    product_id: "KE_ALIEN_CARD",
    product_name: "Kenya Alien Card Verification",
    product_category: "Identity",
  },

  alien_card: {
    product_id: "KE_ALIEN_CARD",
    product_name: "Kenya Alien Card Verification",
    product_category: "Identity",
  },

  vehicle: {
    product_id: "KE_VIN",
    product_name: "Kenya VIN Vehicle History",
    product_category: "Vehicle",
  },

  vin: {
    product_id: "KE_VIN",
    product_name: "Kenya VIN Vehicle History",
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
