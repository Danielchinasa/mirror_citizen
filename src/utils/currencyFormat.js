// Shared helpers for displaying a user's wallet currency exactly as returned by the backend.
const CURRENCY_LOCALES = {
  GHS: "en-GH",
  NGN: "en-NG",
  KES: "en-KE",
  USD: "en-US",
};

const CURRENCY_SYMBOLS = {
  GHS: "GH₵",
  NGN: "₦",
  KES: "KSh",
  USD: "$",
};

export const getCurrencySymbol = (currencyCode) => {
  const code = (currencyCode || "USD").toUpperCase();
  return CURRENCY_SYMBOLS[code] || code;
};

export const formatWalletCurrency = (value, currencyCode) => {
  const code = (currencyCode || "USD").toUpperCase();
  const locale = CURRENCY_LOCALES[code] || "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
    }).format(value || 0);
  } catch (e) {
    // Unsupported/unknown currency code - fall back to symbol + number
    return `${getCurrencySymbol(code)}${Number(value || 0).toLocaleString()}`;
  }
};
