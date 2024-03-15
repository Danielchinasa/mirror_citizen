import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  let timer;

  useEffect(() => {
    // Function to show SweetAlert and logout
    const showLogoutAlert = () => {
      let timerInterval;

      Swal.fire({
        title: "You have been inactive for 10 minutes",
        html: "The system will log you out in <b></b> seconds.",
        timer: 10 * 60 * 10000, // Set timer to 10 seconds
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: "#0DC939",
        confirmButtonText: "Stay logged in",

        didOpen: () => {
          const timer = Swal.getPopup().querySelector("b");
          let remainingTime = 10; // Set initial remaining time to 10 seconds
          timerInterval = setInterval(() => {
            timer.textContent = `${remainingTime--}`; // Decrease remaining time by 1 second
          }, 1000); // Update interval every 1000 milliseconds (1 second)
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.isConfirmed) {
          resetTimer();
        }
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
          logoutAction();
        }
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
        if (isAuthenticated === true) {
          console.log("isAuthenticated at this point22");
          console.log(isAuthenticated);
          showLogoutAlert();
        }
      }, 10 * 60 * 10000); // 10000ms = 10secs. You can change the time.
    };

    // Function to logout user
    const logoutAction = () => {
      dispatch(logout());
      localStorage.clear();
      window.location.pathname = "/login";
    };

    // Event listener setup
    const eventListener = () => {
      resetTimer();
    };

    // Add event listeners to the window
    events.forEach((event) => {
      window.addEventListener(event, eventListener);
    });

    // Initialize timer on component mount
    handleLogoutTimer(); // Run the timer immediately

    // Cleanup: remove event listeners
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventListener);
      });
      clearTimeout(timer); // Clear timeout on component unmount
    };
  }, [dispatch, isAuthenticated]); // Ensure useEffect runs when isAuthenticated changes

  return children;
};

export default AppLogout;
