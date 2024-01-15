// src/redux/actions.js
import axios from "axios";
import baseUrl from "../apiConfig";
import { persistor } from "../redux/store";

export const signIn = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials);
    const userData = response.data;
    console.log("User Data:", userData);

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
      return error.response.data;
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
    const response = await axios.post(`${baseUrl}/registration`, credentials);
    const userData = response.data;

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
      return error.response.data;
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
    const response = await axios.post(`${baseUrl}/registration`, credentials);
    const userData = response.data;

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
      return error.response.data;
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

export const fetchVerificationData = (token) => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch verification data
      const response = await axios.get(`${baseUrl}/user/matching-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the bearer token
        },
      });
      console.log("Verification Data Response:", response);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_VERIFICATION_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching verification data:", error);
    }
  };
};

export const fetchTransactionData = (token) => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch verification data
      const response = await axios.get(`${baseUrl}/payment-history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the bearer token
        },
      });
      console.log("Transaction Data Response:", response);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_TRANSACTION_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching transaction data:", error);
    }
  };
};

export const SendOtp = (otpString) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://41.184.212.26:8063/api/citizens/activation/${otpString}`
    );
    const userData = response.data;

    dispatch({
      type: "SEND_OTP_SUCCESS",
      payload: response.data,
    });

    // Return the user data upon successful login
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response.data;
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
      const restructuredData = {
        basic: {
          phoneNumber: formData.phone || "",
          nin: formData.nin || "",
          dob: formData.dob || "",
          gender: formData.gender || "",
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          liveFaceNin: formData.liveFaceNin || "",
          face: formData.face || "",
          finger: formData.finger || "",
        },
        business: {
          business_name: formData.business_name || "",
          rc: formData.rc || "",
        },
        financial: {
          bvn: formData.bvn || "",
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
      const response = await axios.post(
        `${baseUrl}/call-external-apis`,
        restructuredData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token
          },
        }
      );

      const userData = response.data;

      dispatch({
        type: "SEND_VERIFICATION_REQUEST_SUCCESS",
        payload: response.data,
      });

      // Return the user data upon successful verification
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx. Access response data in error.response.data
        return error.response.data;
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
    const response = await axios.get(`${baseUrl}/fpassword/${emailAddress}`);
    const userData = response.data;

    dispatch({
      type: "RESET_PASSWORD",
      payload: response.data,
    });

    // Return the user data upon successful login
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response.data;
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
      const response = await axios.get(
        `${baseUrl}/check-consent/${requestId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token
          },
        }
      );
      console.log("Verification Result Response:", response);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_VERIFICATION_RESULT",
        payload: response.data,
      });
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching verification result:", error);
    }
  };
};

export const setNewPassword = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/change/password`, formData);

    const userData = response.data;

    dispatch({
      type: "SET_NEW_PASSWORD_SUCCESS",
      payload: response.data,
    });

    // Return the user data upon successful verification
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response.data;
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
    const response = await axios.post(`${baseUrl}/updateuser`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the bearer token
      },
    });

    const userData = response.data;

    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: response.data,
    });

    // Return the user data upon successful verification
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // other than 2xx. Access response data in error.response.data
      return error.response.data;
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
      const response = await axios.get(`${baseUrl}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the bearer token
        },
      });

      console.log("User Profile Data Response:", response);

      // Dispatch the fetched data to the store
      dispatch({
        type: "FETCH_USER_PROFILE_SUCCESS",
        payload: response.data,
      });

      // Dispatch an action to update user details separately
      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: response.data,
      });

      // Return the user profile data upon successful fetch
      return response.data;
    } catch (error) {
      // Handle errors, dispatch an error action, or set an error state
      console.error("Error fetching user profile data:", error);
    }
  };
};
