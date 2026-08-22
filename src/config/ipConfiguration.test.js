jest.mock("axios", () => ({ get: jest.fn() }));

import axios from "axios";
import {
  COTE_DIVOIRE_TEST_IP_INFO,
  getIpInfo,
  getTestIpForEnvironment,
  IP_PROVIDERS,
  shouldEnableTestIpOverride,
} from "./ipConfiguration";

describe("test IP override", () => {
  it("can be enabled explicitly in development", () => {
    expect(shouldEnableTestIpOverride("development", true)).toBe(true);
  });

  it("is disabled in development when the flag is false", () => {
    expect(shouldEnableTestIpOverride("development", false)).toBe(false);
  });

  it("can be enabled explicitly in staging", () => {
    expect(shouldEnableTestIpOverride("staging", true)).toBe(true);
  });

  it("is always disabled for the production deployment", () => {
    expect(shouldEnableTestIpOverride("production", true)).toBe(false);
  });

  it("fails closed when the deployment environment is missing", () => {
    expect(shouldEnableTestIpOverride(undefined, true)).toBe(false);
  });

  it("requires the separate override flag", () => {
    expect(shouldEnableTestIpOverride("staging", undefined)).toBe(false);
  });

  it("retains each Cote d'Ivoire IP profile in staging", () => {
    Object.values(COTE_DIVOIRE_TEST_IP_INFO).forEach((profile) => {
      expect(getTestIpForEnvironment("staging", true, profile)).toBe(
        profile.ip,
      );
    });
  });

  it("blocks every Cote d'Ivoire IP profile in production", () => {
    Object.values(COTE_DIVOIRE_TEST_IP_INFO).forEach((profile) => {
      expect(getTestIpForEnvironment("production", true, profile)).toBeNull();
    });
  });

  it("retains the Login provider order: ipbase before ipapi", async () => {
    axios.get
      .mockRejectedValueOnce(new Error("ipbase unavailable"))
      .mockResolvedValueOnce({ data: { ip: "203.0.113.10", country: "CI" } });

    await getIpInfo({
      useTestOverride: false,
      providers: IP_PROVIDERS.login,
    });

    expect(axios.get.mock.calls.map(([provider]) => provider)).toEqual(
      IP_PROVIDERS.login,
    );
  });
});
