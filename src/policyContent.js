import privacyPolicy from "./privacyPolicy";
import privacyPolicySW from "./privacyPolicySW";
import termsOfService from "./termsOfService";
import termsOfServiceSW from "./termsOfServiceSW";

export function getPrivacyPolicy(language) {
  return language === "SW" ? privacyPolicySW : privacyPolicy;
}

export function getTermsOfService(language) {
  return language === "SW" ? termsOfServiceSW : termsOfService;
}
