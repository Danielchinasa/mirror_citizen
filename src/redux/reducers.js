// src/redux/reducers.js
const initialState = {
  isAuthenticated: false,
  user: null,
  verificationData: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      // Make API call for sign in, update state accordingly
      return { isAuthenticated: true, user: action.payload };

    case "SIGN_UP":
      // Make API call for sign up, update state accordingly
      return { isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      // Make API call for logout, update state accordingly
      return initialState;

    case "FETCH_VERIFICATION_DATA_SUCCESS":
      // Update the state with the fetched verification data
      return { ...state, verificationData: action.payload };

    default:
      return state;
  }
};

export default authReducer;
