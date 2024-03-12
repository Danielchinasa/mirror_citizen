import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actions"; // Assuming this is where your logout action is defined

const InactivityDetector = () => {
  const dispatch = useDispatch();

  let inactivityTimer;

  const handleUserActivity = () => {
    // Clear the existing timer
    clearTimeout(inactivityTimer);

    // Reset the timer
    inactivityTimer = setTimeout(() => {
      // Trigger logout action after 10 seconds of inactivity (for testing)
      dispatch(logout());
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
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default InactivityDetector;
