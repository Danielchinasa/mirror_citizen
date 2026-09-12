const ATTRIBUTION_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const ATTRIBUTION_STORAGE_KEY = "ecitizen_attribution";
const CLIENT_ID_STORAGE_KEY = "ecitizen_analytics_client_id";
const ATTRIBUTION_TTL_MILLIS = 90 * 24 * 60 * 60 * 1000;

const canUseStorage = () => typeof window !== "undefined" && window.localStorage;

function storedAttribution() {
  if (!canUseStorage()) return {};
  try {
    const record = JSON.parse(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
    if (!record.expiresAt || record.expiresAt < Date.now()) return {};
    return ATTRIBUTION_FIELDS.reduce((values, field) => {
      if (record[field]) values[field] = record[field];
      return values;
    }, {});
  } catch {
    return {};
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  const captured = ATTRIBUTION_FIELDS.reduce((values, field) => {
    const value = query.get(field);
    if (value) values[field] = value;
    return values;
  }, {});
  const existing = storedAttribution();
  const attribution = { ...existing, ...captured };

  if (canUseStorage() && Object.keys(attribution).length > 0) {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify({
      ...attribution,
      expiresAt: Date.now() + ATTRIBUTION_TTL_MILLIS,
    }));
  }
  return attribution;
}

export function getAttribution() {
  return captureAttribution();
}

function gaClientId() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )_ga=([^;]+)/);
  if (!match) return null;
  const parts = decodeURIComponent(match[1]).split(".");
  return parts.length >= 4 ? parts.slice(-2).join(".") : null;
}

function analyticsClientId() {
  const fromCookie = gaClientId();
  if (fromCookie) return fromCookie;
  if (!canUseStorage()) return null;
  const existing = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);
  if (existing) return existing;
  const generated = `web.${Math.random().toString(36).slice(2)}.${Date.now()}`;
  window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, generated);
  return generated;
}

export async function withAnalyticsMetadata(payload = {}) {
  return {
    ...payload,
    attribution: getAttribution(),
    analyticsClientId: analyticsClientId(),
  };
}
