//Staging API
const baseUrl = "https://api-staging.e-citizen.ng/api/v2";
const imageBaseUrl = "https://api-staging.e-citizen.ng";

// Non-production IP testing:
// true  = use the configured Kenya test IP in development and staging.
// false = detect the user's live IP through the configured IP providers.
// Production always blocks the test IP, even if this is accidentally left true.
const enableTestIpOverride = true;

//Prod API
// const baseUrl = "https://e-citizen.ng:8444/api/v2";
// const imageBaseUrl = "https://e-citizen.ng:8444";
// Keep this false when enabling the production API configuration.
// const enableTestIpOverride = false;

export default baseUrl;
export { imageBaseUrl, enableTestIpOverride };
