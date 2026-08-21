import axios from "axios";
import { enableTestIpOverride } from "../apiConfig";

export const UGANDA_TEST_IP_INFO = {
  ip: "41.210.160.1",
  country: "UG",
  currency: "UGX",
};

const TESTABLE_DEPLOYMENT_ENVIRONMENTS = ["development", "staging", "test"];

// Production and missing/unknown deployment targets fail closed, even if the
// override flag is accidentally enabled.
export const shouldEnableTestIpOverride = (deploymentEnv, overrideEnabled) =>
  TESTABLE_DEPLOYMENT_ENVIRONMENTS.includes(deploymentEnv) &&
  overrideEnabled === true;

export const isTestIpOverrideEnabled = shouldEnableTestIpOverride(
  process.env.REACT_APP_DEPLOYMENT_ENV,
  enableTestIpOverride,
);

const normaliseIpInfo = (data) => {
  const country = data.country_code || data.countryCode || data.country || null;

  return {
    ip: data.ip || null,
    country,
    currency: country === "UG" ? "UGX" : "USD",
  };
};

export const storeIpInfo = ({ ip, country, currency }) => {
  if (ip) localStorage.setItem("IpAddress", ip);
  if (country) localStorage.setItem("userCountry", country);
  if (currency) localStorage.setItem("currencyCheck", currency);
};

export const getIpInfo = async () => {
  if (isTestIpOverrideEnabled) {
    storeIpInfo(UGANDA_TEST_IP_INFO);
    return UGANDA_TEST_IP_INFO;
  }

  const providers = [
    "https://ipapi.co/json/",
    "https://api.ipbase.com/v1/json/",
  ];

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

  // Never substitute a test IP when detection fails. The backend/proxy remains
  // the authoritative source for the actual client IP in this situation.
  return { ip: null, country: null, currency: null };
};
