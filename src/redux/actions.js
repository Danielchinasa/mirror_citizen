// src/redux/actions.js
import axios from "axios";
import baseUrl from "../apiConfig";
import { persistor } from "../redux/store";
import {
  apiGet,
  apiPost,
  apiPostNoObject,
  apiPostInternalCall,
  apiGetInternalCall,
} from "../apiUtils";
import ReactGA from "react-ga4";

const logPurchase = ({ currency, value, transactionId, paymentType }) => {
  ReactGA.event("purchase", {
    currency: currency,
    value: value,
    transaction_id: transactionId,
    payment_type: paymentType,
  });
};

export const updatePassword = (credentials) => async (dispatch) => {
  try {
    const response = await apiPost(
      `/form/reset-password/${credentials.email}/password`,
      { newPassword: credentials.newpassword, token: credentials.token },
    );

    // Return the user data upon successful login
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const signIn = (credentials) => async (dispatch) => {
  try {
    // const response = await apiPost("/auth/login", credentials);

    //new login api to decommision old one
    const response = await apiPost("/auth/login-enhanced", credentials);
    // Check if the response is an error object

    const userData = response;

    dispatch({
      type: "SIGN_IN",
      payload: userData,
    });
    dispatch(fetchUserProfile(userData.jwtToken));

    // Return the user data upon successful login
    return userData;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const signUp = (credentials) => async (dispatch) => {
  try {
    const response = await apiPost("/auth/registration", credentials);
    const userData = response;

    dispatch({
      type: "SIGN_UP",
      payload: userData,
    });

    // Return the user data upon successful login
    return userData;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const BusinessSignUp = (credentials) => async (dispatch) => {
  try {
    const response = await apiPost(`/auth/registration`, credentials);
    const userData = response;

    dispatch({
      type: "SIGN_UP",
      payload: userData,
    });

    // Return the user data upon successful login
    return userData;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const logout = () => async (dispatch) => {
  // Clear the persisted state asynchronously
  await persistor.purge();

  // Dispatch the logout action after the state is cleared
  dispatch({
    type: "LOGOUT",
  });
};

export const fetchVerificationData = (token, page = 0, size = 10) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_VERIFICATION_DATA_REQUEST" });

    try {
      const response = await apiPost(
        `/user/matching-requests`,
        { page, size }, // Payload
        token,
      );

      dispatch({
        type: "FETCH_VERIFICATION_DATA_SUCCESS",
        payload: response,
      });
    } catch (error) {
      console.error("Error fetching verification data:", error);

      dispatch({
        type: "FETCH_VERIFICATION_DATA_FAILURE",
        payload: error.response?.message || "Something went wrong!",
      });
    }
  };
};

export const fetchTransactionData = (token) => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch verification data
      const response = await apiGet(`/transaction/payment-history`, token);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_TRANSACTION_DATA_SUCCESS",
        payload: response,
      });
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching transaction data:", error);
    }
  };
};

export const SendOtp = (otpString) => async (dispatch) => {
  try {
    const response = await apiGet(`/auth/activation/${otpString}`);
    const userData = response.data;

    dispatch({
      type: "SEND_OTP_SUCCESS",
      payload: response,
    });

    // Return the user data upon successful login
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const ReSendOtp = (emailString) => async (dispatch) => {
  try {
    const response = await apiGet(`/auth/resendtotp/${emailString}`);
    const userData = response.data;

    dispatch({
      type: "RESEND_OTP_SUCCESS",
      payload: response,
    });

    // Return the user data upon successful login
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const sendVerificationRequest =
  (formData, token) => async (dispatch) => {
    try {
      const CLICK_ID = localStorage.getItem("CLICK_ID");
      const currencyCheck = localStorage.getItem("currencyCheck");
      const transactionID = localStorage.getItem("transactionID");
      const paymentType = localStorage.getItem("paymentType");
      function generateTransactionId() {
        const length = 16; // total length including "EA"
        let transactionId = "EA";
        for (let i = 0; i < length - 2; i++) {
          transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
        }
        return transactionId;
      }

      const randomTransactionId = generateTransactionId();

      const restructuredData = {
        payment: {
          currency: currencyCheck || "NGN",
          transactionID: transactionID || randomTransactionId,
          paymentType: paymentType || "INSTANT",
        },
        basic: {
          phoneNumber: formData.phone || "",
          nin: formData.nin || "",
          nin_csv: formData.nin_csv || "",
          dateOfBirth: formData.dateOfBirth || "",
          gender: formData.gender || "",
          firstname: formData.firstname || "",
          lastname: formData.lastname || "",
          liveFaceNin: formData.liveFaceNin || "",
          face: formData.face || "",
          finger: formData.finger || "",
        },
        business: {
          company_name: formData.business_name || "",
          rc_number: parseInt(formData.rc) || "",
        },
        financial: {
          bvn: parseInt(formData.bvn) || "",
          ...(formData.bvn && {
            crc: formData.crc || false,
            firstCentral: formData.firstCentral || false,
            creditRegistry: formData.creditRegistry || false,
          }),
        },
        reach: {
          CLICK_ID: CLICK_ID || "",
        },
        vehicle: {
          vin: formData.vin || "",
          ...(formData.vin && { stolencheck: formData.stolencheck || false }),
          license_number: formData.license_number || "",
        },
      };

      // Remove fields with empty strings from the payload
      Object.keys(restructuredData).forEach((section) => {
        Object.keys(restructuredData[section]).forEach((field) => {
          if (restructuredData[section][field] === "") {
            delete restructuredData[section][field];
          }
        });

        // Remove the section if it has no fields
        if (Object.keys(restructuredData[section]).length === 0) {
          delete restructuredData[section];
        }
      });
      const response = await apiPost(
        `/verification/call-external-apis`,
        restructuredData,
        token,
      );

      const userData = response;

      dispatch({
        type: "SEND_VERIFICATION_REQUEST_SUCCESS",
        payload: response,
      });

      // Return the user data upon successful verification
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx. Access response data in error.response.data
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
          status: "failed",
          message: "No response received from the server",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        return { status: "failed", message: "Error setting up the request" };
      }
    }
  };

export const ResetPassword = (emailAddress) => async (dispatch) => {
  try {
    const response = await apiGet(`/auth/fpassword/${emailAddress}`);
    const userData = response.data;

    dispatch({
      type: "RESET_PASSWORD",
      payload: response,
    });

    // Return the user data upon successful login
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

// actions.js
export const fetchVerificationResult = (requestId, token) => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch verification data
      const response = await apiGet(
        `/verification/check-consent/${requestId}`,
        token,
      );

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_VERIFICATION_RESULT",
        payload: response,
      });
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching verification result:", error);
    }
  };
};

export const setNewPassword = (formData, token) => async (dispatch) => {
  try {
    const response = await apiPost(`/user/change/password`, formData, token);

    const userData = response.data;

    dispatch({
      type: "SET_NEW_PASSWORD_SUCCESS",
      payload: response,
    });

    // Return the user data upon successful verification
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};
export const updateProfile = (formData, token) => async (dispatch) => {
  try {
    const response = await apiPost(`/user/update`, formData, token);

    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: response,
    });

    // Return the user data upon successful verification
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return {
        status: "failed",
        message: "No response received from the server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return { status: "failed", message: "Error setting up the request" };
    }
  }
};

export const updateUserWalletBalance = (newBalance) => ({
  type: "UPDATE_USER_WALLET_BALANCE",
  payload: newBalance,
});

export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch user profile data
      const response = await apiGet(`/user/profile`, token);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_USER_PROFILE_SUCCESS",
        payload: response,
      });

      // Dispatch an action to update user details separately
      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: response,
      });

      // Return the user profile data upon successful fetch
      return response;
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching user profile data:", error);
    }
  };
};

export const fetchVerificationServicePrices =
  (config, token) => async (dispatch) => {
    try {
      let serviceData;
      let rate;

      if (config.serviceCode) {
        const response = await apiGetInternalCall(
          `/africa/countries/GH/service-prices`,
          token,
        );
        const services = response.data?.data || response.data || [];
        serviceData = Array.isArray(services)
          ? services.find((s) => s.service === config.apiServiceName)
          : services[config.apiServiceName];
        rate = response.data?.rate;
      } else {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await apiPostInternalCall(
          `/transaction/service-prices`,
          { ipAddress },
          token,
        );
        serviceData = response.data.data[config.priceIndex];
        rate = response.data.rate;
      }

      return {
        price: serviceData.price,
        serviceFee: serviceData.serviceFee,
        vat: serviceData.VAT,
        priceUsd: serviceData.price2,
        serviceFeeusd: serviceData.serviceFee2,
        vatUsd: serviceData.VAT2,
        processingFee: serviceData.processingFee || 0,
        rate,
      };
    } catch (error) {
      if (error.response) return error.response;
      return { status: "failed", message: "Could not fetch service prices" };
    }
  };

export const initiateVerificationRequest =
  (formData, token) => async (dispatch) => {
    try {
      const CLICK_ID = localStorage.getItem("CLICK_ID");
      const currencyCheck = localStorage.getItem("currencyCheck");
      const transactionID = localStorage.getItem("transactionID");
      const paymentType = localStorage.getItem("paymentType");
      function generateTransactionId() {
        const length = 16; // total length including "EA"
        let transactionId = "EA";
        for (let i = 0; i < length - 2; i++) {
          transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
        }
        return transactionId;
      }

      const randomTransactionId = generateTransactionId();

      const restructuredData = {
        ...(formData.serviceCode && { serviceCode: formData.serviceCode }),
        payment: {
          currency: currencyCheck || "NGN",
          paymentType: paymentType || "INSTANT",
        },
        "search-extension": {
          "phone-number": formData.phone || "",
        },
        basic: {
          // phoneNumber: formData.phone || "",
          nin: formData.nin || "",
          nin_csv: formData.nin_csv || "",
          dateOfBirth: formData.dateOfBirth || "",
          gender: formData.gender || "",
          firstname: formData.firstname || "",
          lastname: formData.lastname || "",
          liveFaceNin: formData.liveFaceNin || "",
          face: formData.face || "",
          finger: formData.finger || "",
        },
        business: {
          company_name: formData.business_name || "",
          rc_number: parseInt(formData.rc) || "",
        },
        financial: {
          bvn: parseInt(formData.bvn) || "",
          ...(formData.bvn && {
            crc: formData.crc || false,
            firstCentral: formData.firstCentral || false,
            creditRegistry: formData.creditRegistry || false,
          }),
        },
        reach: {
          CLICK_ID: CLICK_ID || "",
        },
        vehicle: {
          vin: formData.vin || "",
          ...(formData.vin && { stolencheck: formData.stolencheck || false }),
          license_number: formData.license_number || "",
        },
      };

      // Remove fields with empty strings from the payload
      Object.keys(restructuredData).forEach((section) => {
        Object.keys(restructuredData[section]).forEach((field) => {
          if (restructuredData[section][field] === "") {
            delete restructuredData[section][field];
          }
        });

        // Remove the section if it has no fields
        if (Object.keys(restructuredData[section]).length === 0) {
          delete restructuredData[section];
        }
      });
      const response = await apiPost(
        `/africa/verification/GH/initiate`,
        restructuredData,
        token,
      );

      // dispatch({
      //   type: "SEND_VERIFICATION_REQUEST_SUCCESS",
      //   payload: response,
      // });

      // Return the user data upon successful verification
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
          status: "failed",
          message: "No response received from the server",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        return { status: "failed", message: "Error setting up the request" };
      }
    }
  };

export const initiateStakeHoldersRequest =
  (formData, token) => async (dispatch) => {
    try {
      const CLICK_ID = localStorage.getItem("CLICK_ID");

      const restructuredData = {
        business: {
          //!! We have to add the requestId and cacId to the business object
          //!! This is because the backend expects these fields to be present
          requestId: formData?.business?.requestId || "",
          cacId: formData?.business?.cacId || "",
        },

        reach: {
          CLICK_ID: CLICK_ID || "",
        },
      };

      // Remove fields with empty strings from the payload
      Object.keys(restructuredData).forEach((section) => {
        Object.keys(restructuredData[section]).forEach((field) => {
          if (restructuredData[section][field] === "") {
            delete restructuredData[section][field];
          }
        });

        // Remove the section if it has no fields
        if (Object.keys(restructuredData[section]).length === 0) {
          delete restructuredData[section];
        }
      });
      const response = await apiPost(
        `/africa/verification/GH/initiate`,
        restructuredData,
        token,
      );

      // Return the user data upon successful verification
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
          status: "failed",
          message: "No response received from the server",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        return { status: "failed", message: "Error setting up the request" };
      }
    }
  };

const buildItems = (formData) => {
  const items = [];

  Object.keys(formData).forEach((field) => {
    if (typeof formData[field] === "string" && formData[field].trim() !== "") {
      items.push({
        item_id: field,
        item_name: field,
        price: 1, // fallback if you don’t have per-field pricing here
        quantity: 1,
      });
    }
  });

  return items;
};

const getStoredAmount = () => {
  return Number(localStorage.getItem("totalAmount") || 0);
};

export const completeVerificationRequest =
  (formData, token) => async (dispatch) => {
    try {
      const CLICK_ID = localStorage.getItem("CLICK_ID");
      const currencyCheck = localStorage.getItem("currencyCheck");
      const transactionID = localStorage.getItem("transactionID");
      const paymentType = localStorage.getItem("paymentType");
      function generateTransactionId() {
        const length = 16; // total length including "EA"
        let transactionId = "EA";
        for (let i = 0; i < length - 2; i++) {
          transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
        }
        return transactionId;
      }

      const randomTransactionId = generateTransactionId();

      const restructuredData = {
        payment: {
          currency: currencyCheck || "NGN",
          transactionID: transactionID || randomTransactionId,
          paymentType: paymentType || "INSTANT",
        },
        sessionCode: localStorage.getItem("sessionCode") || "",
        sessionStatus: "COMPLETED",
        paymentType: paymentType || "INSTANT",
        "search-extension": {
          "phone-number": formData.phone || "",
        },
        basic: {
          // phoneNumber: formData.phone || "",
          nin: formData.nin || "",
          nin_csv: formData.nin_csv || "",
          dateOfBirth: formData.dateOfBirth || "",
          gender: formData.gender || "",
          firstname: formData.firstname || "",
          lastname: formData.lastname || "",
          liveFaceNin: formData.liveFaceNin || "",
          face: formData.face || "",
          finger: formData.finger || "",
        },
        business: {
          company_name: formData.business_name || "",
          rc_number: parseInt(formData.rc) || "",
        },
        financial: {
          bvn: parseInt(formData.bvn) || "",
          ...(formData.bvn && {
            crc: formData.crc || false,
            firstCentral: formData.firstCentral || false,
            creditRegistry: formData.creditRegistry || false,
          }),
        },
        reach: {
          CLICK_ID: CLICK_ID || "",
        },
        vehicle: {
          vin: formData.vin || "",
          ...(formData.vin && { stolencheck: formData.stolencheck || false }),
          license_number: formData.license_number || "",
        },
      };

      // Remove fields with empty strings from the payload
      Object.keys(restructuredData).forEach((section) => {
        Object.keys(restructuredData[section]).forEach((field) => {
          if (restructuredData[section][field] === "") {
            delete restructuredData[section][field];
          }
        });

        // Remove the section if it has no fields
        if (Object.keys(restructuredData[section]).length === 0) {
          delete restructuredData[section];
        }
      });
      const response = await apiPost(
        `/verification/complete `,
        restructuredData,
        token,
      );

      dispatch({
        type: "SEND_VERIFICATION_REQUEST_SUCCESS",
        payload: response,
      });

      // ✅ GA4 Purchase Tracking
      try {
        const currency = currencyCheck || "NGN";
        const transactionId = transactionID || randomTransactionId;
        const payment = paymentType || "INSTANT";

        // You can improve this if you have exact total stored
        const value = parseFloat(localStorage.getItem("totalAmount")) || 0;

        const items = buildItems(formData);

        logPurchase({
          currency,
          value,
          transactionId,
          paymentType: payment,
          items,
        });
      } catch (err) {
        console.error("GA4 logPurchase error:", err);
      }

      // Return the user data upon successful verification
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
          status: "failed",
          message: "No response received from the server",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        return { status: "failed", message: "Error setting up the request" };
      }
    }
  };

export const paymentInitializationRequest =
  (formData, token) => async (dispatch) => {
    try {
      const currencyCheck = localStorage.getItem("currencyCheck");
      const paymentType = localStorage.getItem("paymentType");
      const restructuredData = {
        currency: currencyCheck || "NGN",
        sessionCode: localStorage.getItem("sessionCode") || "",
        type: paymentType || "INSTANT",
      };

      // Remove fields with empty strings from the payload
      Object.keys(restructuredData).forEach((section) => {
        Object.keys(restructuredData[section]).forEach((field) => {
          if (restructuredData[section][field] === "") {
            delete restructuredData[section][field];
          }
        });

        // Remove the section if it has no fields
        if (Object.keys(restructuredData[section]).length === 0) {
          delete restructuredData[section];
        }
      });
      const response = await apiPost(
        `/payment/flexi-initiate`,
        restructuredData,
        token,
      );

      // Return the user data upon successful verification
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
          status: "failed",
          message: "No response received from the server",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        return { status: "failed", message: "Error setting up the request" };
      }
    }
  };
