// src/redux/reducers.js
const initialState = {
  isAuthenticated: false,
  user: null,
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

    default:
      return state;
  }
};

export default authReducer;
