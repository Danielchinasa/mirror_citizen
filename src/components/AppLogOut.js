import React, { useEffect } from "react";
import Swal from "sweetalert2";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;

  // Function to show SweetAlert and logout
  const showLogoutAlert = () => {
    Swal.fire({
      title: "Logging you out...",
      timer: 2000, // Adjust the timer if needed
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
    }).then(() => {
      logoutAction(); // Logout after the alert is closed
    });
  };

  // Function to reset the logout timer
  const resetTimer = () => {
    clearTimeout(timer);
    handleLogoutTimer();
  };

  // Function to handle logout timer
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      showLogoutAlert();
    }, 10 * 60 * 10000); // 10000ms = 10secs. You can change the time.
  };

  // Function to logout user
  const logoutAction = () => {
    // localStorage.clear();
    // window.location.pathname = "/login";
  };

  useEffect(() => {
    // Event listener setup
    const eventListener = () => {
      resetTimer();
    };

    // Add event listeners to the window
    events.forEach((event) => {
      window.addEventListener(event, eventListener);
    });

    // Initialize timer on component mount
    handleLogoutTimer();

    // Cleanup: remove event listeners
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventListener);
      });
      clearTimeout(timer); // Clear timeout on component unmount
    };
  }, []);

  return children;
};

export default AppLogout;
