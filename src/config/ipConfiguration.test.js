jest.mock("axios", () => ({ get: jest.fn() }));

import { shouldEnableTestIpOverride } from "./ipConfiguration";

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
});
