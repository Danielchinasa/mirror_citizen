export const COUNTRY_CODES = [
  { code: "+233", country: "Ghana", flag: "🇬🇭", iso: "GH" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+1", country: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+254", country: "Kenya", flag: "🇰🇪", iso: "KE" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮", iso: "CI" },
  { code: "+228", country: "Togo", flag: "🇹🇬", iso: "TG" },
  { code: "+229", country: "Benin", flag: "🇧🇯", iso: "BJ" },
  { code: "+231", country: "Liberia", flag: "🇱🇷", iso: "LR" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱", iso: "SL" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼", iso: "RW" },
  { code: "+256", country: "Uganda", flag: "🇺🇬", iso: "UG" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿", iso: "TZ" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲", iso: "CM" },
  { code: "+221", country: "Senegal", flag: "🇸🇳", iso: "SN" },
  { code: "+220", country: "Gambia", flag: "🇬🇲", iso: "GM" },
  { code: "+224", country: "Guinea", flag: "🇬🇳", iso: "GN" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫", iso: "BF" },
  { code: "+223", country: "Mali", flag: "🇲🇱", iso: "ML" },
  { code: "+227", country: "Niger", flag: "🇳🇪", iso: "NE" },
  { code: "+260", country: "Zambia", flag: "🇿🇲", iso: "ZM" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼", iso: "ZW" },
  { code: "+20", country: "Egypt", flag: "🇪🇬", iso: "EG" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹", iso: "ET" },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", iso: "BE" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+974", country: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+86", country: "China", flag: "🇨🇳", iso: "CN" },
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", iso: "BR" },
];

export const DUMMY_PHONE_PLACEHOLDER = "024 123 4567";

/**
 * Get the initial default country code based on detected user country or Ghana
 */
export const getDefaultCountryCode = (userCountry) => {
  if (userCountry) {
    const found = COUNTRY_CODES.find(
      (c) => c.iso.toUpperCase() === String(userCountry).trim().toUpperCase(),
    );
    if (found) return found.code;
  }
  return "+233"; // Default to Ghana
};

/**
 * Formats a raw phone number by attaching the selected country code prefix.
 * Strips duplicate country codes and leading 0s.
 */
export const formatPhoneNumberWithCountryCode = (
  phone,
  countryCode = "+233",
) => {
  if (!phone || !phone.trim()) return "";
  let digits = phone.replace(/\D/g, "");
  const codeDigits = (countryCode || "").replace(/\D/g, "");

  // If user typed/pasted the country code digits at start, strip to avoid duplicates (e.g. 233...)
  if (
    codeDigits &&
    digits.startsWith(codeDigits) &&
    digits.length > codeDigits.length
  ) {
    digits = digits.slice(codeDigits.length);
  }

  // Strip leading 0 trunk prefix (e.g. 024... -> 24...)
  if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }

  if (!digits) return "";
  return `${countryCode}${digits}`;
};

/**
 * Parses an existing full phone number into its country code and local number components.
 */
export const extractCountryCodeAndLocalNumber = (
  fullPhoneNumber,
  defaultCode = "+233",
) => {
  if (!fullPhoneNumber) return { countryCode: defaultCode, localNumber: "" };
  const str = String(fullPhoneNumber).trim();

  // Check if string starts with +
  if (str.startsWith("+")) {
    // Match against known country codes (longest prefix match)
    const sortedCodes = [...COUNTRY_CODES].sort(
      (a, b) => b.code.length - a.code.length,
    );
    for (const item of sortedCodes) {
      if (str.startsWith(item.code)) {
        return {
          countryCode: item.code,
          localNumber: str.slice(item.code.length).replace(/^0+/, ""),
        };
      }
    }
  }

  return { countryCode: defaultCode, localNumber: str.replace(/\D/g, "") };
};
