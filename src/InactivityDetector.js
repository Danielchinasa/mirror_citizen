import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actions";
import { useHistory } from "react-router-dom";

const InactivityDetector = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let inactivityTimer;

  const handleUserActivity = () => {
    // Clear the existing timer
    clearTimeout(inactivityTimer);

    // Reset the timer
    inactivityTimer = setTimeout(() => {
      // Trigger logout action after 10 seconds of inactivity (for testing)
      dispatch(logout());
      console.log("Logging out...");
      // Redirect to login page
      //   history.push("/login");
      window.location.href = "https://e-citizen.ng/login";
      console.log("Redirecting to login...");
    }, 10 * 60 * 1000); // 10 seconds in milliseconds
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
  }, [dispatch, history]);

  return null; // This component doesn't render anything
};

export default InactivityDetector;
