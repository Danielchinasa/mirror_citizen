import axios from "axios";
import { enableTestIpOverride } from "../apiConfig";

export const COTE_DIVOIRE_TEST_IP_INFO = {
  primary: {
    ip: "41.202.219.255",
    country: "CI",
    currency: "XOF",
  },
  loginFallback: {
    ip: "105.235.70.1",
    country: "CI",
    currency: "XOF",
  },
  verificationRequest: {
    ip: "41.207.206.172",
    country: "CI",
    currency: "XOF",
  },
};

const TESTABLE_DEPLOYMENT_ENVIRONMENTS = ["development", "staging", "test"];

export const IP_PROVIDERS = {
  standard: ["https://ipapi.co/json/", "https://api.ipbase.com/v1/json/"],
  login: ["https://api.ipbase.com/v1/json/", "https://ipapi.co/json/"],
};

// Production and missing/unknown deployment targets fail closed, even if the
// override flag is accidentally enabled.
export const shouldEnableTestIpOverride = (deploymentEnv, overrideEnabled) =>
  TESTABLE_DEPLOYMENT_ENVIRONMENTS.includes(deploymentEnv) &&
  overrideEnabled === true;

export const isTestIpOverrideEnabled = shouldEnableTestIpOverride(
  process.env.REACT_APP_DEPLOYMENT_ENV,
  enableTestIpOverride,
);

export const getTestIpForEnvironment = (
  deploymentEnv,
  overrideEnabled,
  testIpInfo,
) =>
  shouldEnableTestIpOverride(deploymentEnv, overrideEnabled)
    ? testIpInfo.ip
    : null;

export const getNonProductionTestIp = (testIpInfo) =>
  isTestIpOverrideEnabled ? testIpInfo.ip : null;

const normaliseIpInfo = (data) => {
  const country = data.country_code || data.countryCode || data.country || null;

  return {
    ip: data.ip || null,
    country,
    currency: country === "CI" ? "XOF" : "USD",
  };
};

export const storeIpInfo = ({ ip, country, currency }) => {
  if (ip) localStorage.setItem("IpAddress", ip);
  if (country) localStorage.setItem("userCountry", country);
  if (currency) localStorage.setItem("currencyCheck", currency);
};

export const getIpInfo = async ({
  useTestOverride = true,
  fallbackTestIpInfo = null,
  providers = IP_PROVIDERS.standard,
} = {}) => {
  if (isTestIpOverrideEnabled && useTestOverride) {
    storeIpInfo(COTE_DIVOIRE_TEST_IP_INFO.primary);
    return COTE_DIVOIRE_TEST_IP_INFO.primary;
  }

  for (const provider of providers) {
    try {
      const response = await axios.get(provider);
      const ipInfo = normaliseIpInfo(response.data);
      if (ipInfo.ip) {
        storeIpInfo(ipInfo);
        return ipInfo;
      }
    } catch (error) {
      console.error(`Unable to detect client IP using ${provider}:`, error);
    }
  }

  if (isTestIpOverrideEnabled && fallbackTestIpInfo) {
    storeIpInfo(fallbackTestIpInfo);
    return fallbackTestIpInfo;
  }

  // Never substitute a test IP when detection fails. The backend/proxy remains
  // the authoritative source for the actual client IP in this situation.
  return { ip: null, country: null, currency: null };
};
