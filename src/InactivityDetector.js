import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/actions";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { theme } from "antd";
import { useTheme } from "./components/ThemeProvider";
const { useToken } = theme;

const InactivityDetector = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isAuthenticated);

  let inactivityTimer;
  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  const handleUserActivity = () => {
    // Clear the existing timer
    clearTimeout(inactivityTimer);

    if (isLoggedIn) {
      // Reset the timer
      inactivityTimer = setTimeout(() => {
        // Show SweetAlert dialog before logout only if the user is still logged in
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "You have been inactive for 10 minutes",
          text: "We will log you out in 10 seconds if no response",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#FED001",
          confirmButtonText: "Logout",
          confirmButtonColor: "#BFBFBF",
          cancelButtonText: "Stay logged in",
          timer: 10000, // Auto close the dialog after 10 seconds
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
          onClose: () => {
            // Trigger logout action when the dialog is closed without interaction
            dispatch(logout());

            // Redirect to login page
            // history.push("/login");
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // If the timer is the reason for closing the dialog, logout the user
            dispatch(logout());

            // Redirect to login page
            // history.push("/login");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // If the user clicks "Stay logged in", reset the timer
            handleUserActivity();
          }
        });
      }, 10 * 60 * 1000); // Show the dialog 9 seconds before logout
    }
  };

  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    // Initialize the timer
    handleUserActivity();

    // Clean up event listeners
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, [dispatch, history, isLoggedIn]);

  return null; // This component doesn't render anything
};

export default InactivityDetector;
