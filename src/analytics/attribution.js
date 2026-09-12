import { ANALYTICS_CONFIG } from "./config";

export const ATTRIBUTION_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const now = () => Date.now();

function expiresAt() {
  return now() + ANALYTICS_CONFIG.attributionTtlDays * 24 * 60 * 60 * 1000;
}

function canUseStorage() {
  return typeof window !== "undefined" && window.localStorage;
}

export function getAttribution() {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(ANALYTICS_CONFIG.attributionStorageKey);
    if (!raw) return {};

    const record = JSON.parse(raw);
    if (!record.expiresAt || record.expiresAt < now()) {
      window.localStorage.removeItem(ANALYTICS_CONFIG.attributionStorageKey);
      return {};
    }

    return ATTRIBUTION_FIELDS.reduce((values, field) => {
      if (record[field]) values[field] = record[field];
      return values;
    }, {});
  } catch {
    return {};
  }
}

export function captureAttribution(search) {
  if (!canUseStorage()) return {};

  const query = new URLSearchParams(search || window.location.search);
  const captured = ATTRIBUTION_FIELDS.reduce((values, field) => {
    const value = query.get(field);
    if (value) values[field] = value;
    return values;
  }, {});

  if (Object.keys(captured).length === 0) {
    return getAttribution();
  }

  const existing = getAttribution();
  const nextRecord = {
    ...captured,
    ...existing,
    capturedAt: existing.capturedAt || new Date().toISOString(),
    expiresAt: expiresAt(),
  };

  window.localStorage.setItem(
    ANALYTICS_CONFIG.attributionStorageKey,
    JSON.stringify(nextRecord),
  );

  return getAttribution();
}

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function generateClientId() {
  return "web." + Math.random().toString(36).slice(2) + "." + Date.now();
}

export function getAnalyticsClientId() {
  const gaCookie = readCookie("_ga");
  if (gaCookie) {
    const parts = gaCookie.split(".");
    if (parts.length >= 4) {
      return parts.slice(-2).join(".");
    }
  }

  if (!canUseStorage()) return null;

  const storageKey = ANALYTICS_CONFIG.analyticsClientIdStorageKey;
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const generated = generateClientId();
  window.localStorage.setItem(storageKey, generated);
  return generated;
}

const analyticsMeasurementId = () =>
  ANALYTICS_CONFIG.newGa4MeasurementId ||
  ANALYTICS_CONFIG.legacyGtagMeasurementId ||
  ANALYTICS_CONFIG.legacyReactGa4MeasurementId;

export function getAnalyticsSessionId() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return Promise.resolve(null);
  }

  const measurementId = analyticsMeasurementId();
  if (!measurementId) return Promise.resolve(null);

  return new Promise((resolve) => {
    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      resolve(value == null || value === "" ? null : String(value));
    };

    const timeout = window.setTimeout(
      () => finish(null),
      ANALYTICS_CONFIG.analyticsSessionIdTimeoutMs,
    );

    try {
      window.gtag("get", measurementId, "session_id", (sessionId) => {
        window.clearTimeout(timeout);
        finish(sessionId);
      });
    } catch {
      window.clearTimeout(timeout);
      finish(null);
    }
  });
}

export function withAttribution(payload = {}) {
  return {
    ...payload,
    attribution: getAttribution(),
    analyticsClientId: getAnalyticsClientId(),
  };
}

export async function withAnalyticsMetadata(payload = {}) {
  const nextPayload = withAttribution(payload);
  const analyticsSessionId = await getAnalyticsSessionId();
  if (analyticsSessionId) {
    nextPayload.analyticsSessionId = analyticsSessionId;
  }
  return nextPayload;
}
