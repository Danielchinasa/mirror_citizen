import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import NewsletterSection from "../../components/newsletter/newsLetterSection";
import { homeObjOne } from "./Data";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { signIn, fetchUserProfile, logout } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
const { useToken } = theme;

const Home = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        // Attempt to fetch IP address from the first URL
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        setIpAddress(response.data.ip);
      } catch (error1) {
        console.error("Error fetching IP address from primary URL:", error1);
        try {
          // Attempt to fetch IP address from the second URL if the first one fails
          const response = await axios.get("https://ipapi.co/json/");
          setIpAddress(response.data.ip);
        } catch (error2) {
          console.error(
            "Error fetching IP address from secondary URL:",
            error2
          );
          setIpAddress(null); // Set IP address to null if both URLs fail
        }
      }
    };

    fetchIpAddress();
  }, []);
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const payload = {
          accessToken: response.access_token,
          deviceToken: localStorage.getItem("clientToken"),
          ipAddress: ipAddress,
          deviceName: "Web app",
        };

        const res = await axios.post(
          `${baseUrl}/openauth/google-login`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userData = res.data;
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "Google login successful!",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        dispatch({
          type: "SIGN_IN",
          payload: userData,
        });
        dispatch(fetchUserProfile(userData.jwtToken));

        if (userData.jwtToken) {
          localStorage.setItem("IpAddress", ipAddress);
          history.push("/main-dashboard");
        } else {
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: "Login failed",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          // openNotification2("topRight");
        }
      } catch (error) {
        console.error("Google login failed:", error);

        let errorMessage = "Google login failed. Please try again.";

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with status:", error.response.status);
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
          errorMessage = "Network error. Please check your connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
        }
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: errorMessage,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    },
  });
  useEffect(() => {
    const loadGoogleOneTap = () => {
      if (window.google && window.google.accounts?.id) {
        window.google.accounts.id.disableAutoSelect(); // ⛔ reset for dev

        window.google.accounts.id.initialize({
          client_id:
            "642042384169-d0uquoka9qll83ucfm8ck7esdvptknls.apps.googleusercontent.com",
          callback: (credentialResponse) => {
            console.log("✅ One Tap Login Success:", credentialResponse);
            login();
          },
          auto_select: true,
          cancel_on_tap_outside: false,
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.warn(
              "⚠️ One Tap not displayed:",
              notification.getNotDisplayedReason()
            );
          }
          if (notification.isSkippedMoment()) {
            console.warn(
              "⚠️ One Tap skipped:",
              notification.getSkippedReason()
            );
          }
          if (notification.isDismissedMoment()) {
            console.warn(
              "⚠️ One Tap dismissed:",
              notification.getDismissedReason()
            );
          }
        });
      }
    };

    const interval = setInterval(() => {
      if (window.google && window.google.accounts?.id) {
        loadGoogleOneTap();
        clearInterval(interval);
      }
    }, 100);
  }, []);
  return (
    <>
      <HeroSection {...homeObjOne} />
      <NewsletterSection visible={false} onClose={() => {}} />
    </>
  );
};

export default Home;
