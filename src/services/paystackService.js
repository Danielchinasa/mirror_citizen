// Paystack Payment Service
import baseUrl from "../apiConfig";

/**
 * Initiate Paystack Payment
 * @param {Object} paymentData - Payment request data
 * @param {string} paymentData.amount - Amount in Naira (will be converted to kobo)
 * @param {string} paymentData.currency - Currency code (e.g., "NGN")
 * @param {string} paymentData.type - Payment type: TOPUP, VERIFICATION, STAKEHOLDERS
 * @param {string} paymentData.sessionCode - Required for VERIFICATION payments
 * @param {string} paymentData.stakeHolders - Required for STAKEHOLDERS payments
 * @param {string} userToken - User JWT token
 * @returns {Promise<Object>} Response with authorization_url, access_code, and reference
 */
export const initiatePaystackPayment = async (paymentData, userToken) => {
  try {
    const response = await fetch(`${baseUrl}/payment/paystack-initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate payment");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Paystack initiate error:", error);
    throw error;
  }
};

/**
 * Check Paystack Payment Status
 * @param {string} reference - Transaction reference
 * @param {string} userToken - User JWT token
 * @returns {Promise<Object>} Payment status response
 */
export const checkPaystackPaymentStatus = async (reference, userToken) => {
  try {
    const response = await fetch(
      `${baseUrl}/payment/paystack-verify?reference=${reference}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify payment");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Paystack verify error:", error);
    throw error;
  }
};

/**
 * Open Paystack payment page in a new window or redirect
 * @param {string} authorizationUrl - Paystack authorization URL
 * @param {boolean} openInNewTab - Whether to open in a new tab (default: true)
 */
export const redirectToPaystack = (authorizationUrl, openInNewTab = true) => {
  if (openInNewTab) {
    window.open(authorizationUrl, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = authorizationUrl;
  }
};
