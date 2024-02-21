// src/redux/reducers.js
const initialState = {
  isAuthenticated: false,
  // user: null,
  user: {
    // Other user fields...
    firstName: "",
    lastName: "",
    // ...
  },
  verificationData: [],
  transactionData: [],
  verificationResult: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      // Make API call for sign in, update state accordingly
      return { isAuthenticated: true, user: action.payload };

    case "SIGN_UP":
      // Make API call for sign up, update state accordingly
      return { isAuthenticated: false, user: action.payload };

    case "LOGOUT":
      // Make API call for logout, update state accordingly
      return initialState;

    case "FETCH_VERIFICATION_DATA_SUCCESS":
      // Update the state with the fetched verification data
      return { ...state, verificationData: action.payload };

    case "FETCH_TRANSACTION_DATA_SUCCESS":
      // Update the state with the fetched verification data
      return { ...state, transactionData: action.payload };

    case "SEND_OTP_SUCCESS":
      // Update the state with the fetched otp data
      return { ...state, otpData: action.payload };

    case "RESEND_OTP_SUCCESS":
      // Update the state with the fetched otp data
      return { ...state, otpData: action.payload };

    case "RESET_PASSWORD":
      // Update the state with the reset password data
      return { ...state, otpData: action.payload };

    case "SEND_VERIFICATION_REQUEST_SUCCESS":
      // Update the state with the send verification data
      return { ...state, otpData: action.payload };

    case "SET_NEW_PASSWORD_SUCCESS":
      // Update the state with the set New Password
      return { ...state, otpData: action.payload };

    case "UPDATE_PROFILE_SUCCESS":
      // Update the state with the set New Password
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        otpData: action.payload, // You may adjust this as needed
      };

    case "FETCH_VERIFICATION_RESULT":
      // Update the state with the fetched verification data
      return { ...state, verificationResult: action.payload };

    case "UPDATE_USER_WALLET_BALANCE":
      // Update the user's wallet balance in the state
      return {
        ...state,
        user: {
          ...state.user,
          walletBalance: action.payload,
        },
      };

    case "FETCH_USER_PROFILE_SUCCESS":
      // Update the state with the fetched user profile data
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "UPDATE_USER_DETAILS":
      // Update the state with the user details separately
      return {
        ...state,
        userDetails: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
