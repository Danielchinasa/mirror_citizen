import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleSignIn from "../GoogleAuth/GoogleSignIn";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth || { isAuthenticated: false, user: null }
  );
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage or cookies)
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("userData");

    if (!isAuthenticated && !savedAuth) {
      // Show sign-in modal after a brief delay for better UX
      const timer = setTimeout(() => {
        setShowSignIn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleSignInSuccess = (userData) => {
    // Save authentication state to localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
    setShowSignIn(false);
  };

  // If authenticated, show the app
  if (isAuthenticated || localStorage.getItem("isAuthenticated")) {
    return children;
  }

  // Show the app with sign-in overlay
  return (
    <>
      {children}
      <GoogleSignIn visible={showSignIn} onSuccess={handleSignInSuccess} />
    </>
  );
};

export default AuthGuard;
