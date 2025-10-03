// stripeConfig.js
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51S3dRvE7K3trmz6Ub1Eyxvp28wBkTYLSj5L9Ud7SvBAbeFv9F9a4G3mNfOtDWS6K0G3rAIBvcCzbp8k77rcw8OX200c51znQ9Q"
);

export default stripePromise;
