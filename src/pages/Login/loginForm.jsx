import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Checkbox,
  Alert,
  Spin,
  notification,
  Button,
  Divider,
  Space,
} from "antd";
import {
  BtnLink,
  Heading,
  MainButtonFull,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";
import { useDispatch } from "react-redux";
import { signIn, fetchUserProfile, logout } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import ReactGA from "react-ga4";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignInButton from "../../components/sso_button/googleSignInButton";
// import FacebookSignInButton from "../../components/sso_button/facebookSignInButton"; // No longer needed as a wrapper
import AppleSignInButton from "../../components/sso_button/appleSignInButton";
import { trackEvent } from "../../hooks/analytics";
import { apiPost, apiPostInternalCall } from "../../apiUtils";
import FacebookLogin from "react-facebook-login";
import FacebookSignInButton from "../../components/sso_button/facebookSignInButton";
import AppleLogin from "react-apple-login";
import { trackGA4Event } from "../../hooks/analytics";

const { useToken } = theme;

const Context = React.createContext({
  name: "Default",
});

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const [ipAddress, setIpAddress] = useState("41.212.86.175"); // TODO: remove hardcoded IP before release
  const [ipCountry, setIpCountry] = useState(null);

  const openNotification = (placement) => {
    api.info({
      message: `Notification`,
      description: "response.message",
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    [],
  );

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        // Attempt to fetch IP address from the first URL
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        // setIpAddress(response.data.ip); // TODO: restore when removing hardcoded IP
      } catch (error1) {
        console.error("Error fetching IP address from primary URL:", error1);
        try {
          // Attempt to fetch IP address from the second URL if the first one fails
          const response = await axios.get("https://ipapi.co/json/");
          // setIpAddress(response.data.ip); // TODO: restore when removing hardcoded IP
        } catch (error2) {
          console.error(
            "Error fetching IP address from secondary URL:",
            error2,
          );
          // setIpAddress(null); // TODO: restore when removing hardcoded IP
        }
      }
    };

    fetchIpAddress();

    // Retrieve email from cookie and set in state when component mounts
    const rememberedEmail = Cookies.get("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prevState) => ({
        ...prevState,
        email: rememberedEmail,
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });

    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  };

  const handleRememberMeChange = (e) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      rememberMe: checked,
    }));
  };

  const handleSignIn = async (event) => {
    trackEvent({
      action: "click_normail_signin_attempt",
      category: "Authentication Attempt",
      label: "Normal Signin Attempt",
      value: 1,
    });
    event.preventDefault();
    if (formData.rememberMe) {
      Cookies.set("rememberedEmail", formData.email, { expires: 7 });
    } else {
      Cookies.remove("rememberedEmail");
    }
    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setFormErrors({});
      setLoading(true);

      // Add ipAddress to the formData
      const formDataWithIpAndToken = {
        ...formData,
        ipAddress,
        deviceToken: localStorage.getItem("clientToken"),
      };

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(signIn(formDataWithIpAndToken));
      const openNotification2 = (placement) => {
        api.error({
          message: `Notification`,
          description: response,
          placement,
        });
      };
      const openNotification3 = (placement) => {
        api.error({
          message: `Notification`,
          description:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
          placement,
        });
      };

      if (response.jwtToken) {
        // On successful login with jwtToken, fire GA4 event

        trackGA4Event("login", { method: "email" });
        // On successful login with jwtToken, navigate to the main dashboard
        localStorage.setItem("IpAddress", ipAddress);
        setLoading(false);
        trackEvent({
          action: "click_normail_signin_sucess",
          category: "Authentication Success",
          label: "Normal Signin Success",
          value: 1,
        });
        history.push("/dashboard");
      } else if (response === "Incorrect email or password") {
        setFormErrors({ general: response }); // Set error message
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "Incorrect email or password",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // openNotification2("topRight");
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time. Try again later",
        }); // Set error message
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time. Try again later",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // openNotification3("topRight");
      } else {
        // On successful login, navigate to the main dashboard
        setFormErrors({ general: "Login Failed" }); // Set error message
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "Login Failed",
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
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Login Failed",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };
  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const payload = {
          accessToken: response.access_token,
          deviceToken: localStorage.getItem("clientToken"),
          ipAddress: ipAddress,
          deviceName: "Web app",
        };

        const res = await apiPost(`/openauth/google-login`, payload);
        const userData = res;
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
          history.push("/dashboard");
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

  const handleFacebook = async (fbRes) => {
    // User cancelled or popup blocked
    if (!fbRes || !fbRes.accessToken) {
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Facebook Login",
        text: "Facebook login was cancelled or failed.",
        icon: "error",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        accessToken: fbRes.accessToken,
        // userId: fbRes.userID,
        deviceToken: localStorage.getItem("clientToken"),
        ipAddress: ipAddress,
        deviceName: "Web app",
      };

      const resfb = await apiPost(`/openauth/facebook`, payload);
      const userDataFb = resfb;
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Success",
        text: "Facebook login successful!",
        icon: "success",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      dispatch({ type: "SIGN_IN", payload: userDataFb });
      dispatch(fetchUserProfile(userDataFb.jwtToken));

      if (userDataFb.jwtToken) {
        localStorage.setItem("IpAddress", ipAddress);
        history.push("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Facebook login failed:", err);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text:
          err?.response?.data?.message ||
          "Facebook login failed. Please try again.",
        icon: "error",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <style>
        {`
          .facebook-btn {
           display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;
            padding: 10px 20px;
            border: 1px solid #000;
            border-radius: 4px;
            background-color: white;
            color: #000;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
            border-radius: 8px;
          }

          .facebook-btn:hover {
           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          }
        `}
      </style>
      <div style={{ marginTop: "50px" }}>
        <Spin spinning={loading} tip="Logging in...">
          <StyledForm onSubmit={handleSignIn}>
            <Heading $token={token}>Login</Heading>
            <Space direction="vertical" style={{ width: "100%" }}>
              <GoogleSignInButton
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  // 🔍 Track the click event
                  trackEvent({
                    action: "click_google_signin",
                    category: "Authentication",
                    label: "Google Sign-In Button",
                    value: 1,
                  });
                  login();
                }}
              />

              <FacebookLogin
                appId="541710452150170"
                autoLoad={false}
                fields="name,picture"
                scope="public_profile"
                callback={handleFacebook}
                cssClass="facebook-btn"
                textButton="Continue with Facebook"
                icon={<FacebookSignInButton />}
              />
              {/*<AppleLogin
                clientId="com.react.apple.login"
                redirectURI="https://redirectUrl.com"
                responseType="code"
                responseMode="query"
                usePopup={true}
                callback={(response) => {
                  console.log("Apple login response:", response);
                  // handle login here
                }}
                render={({ onClick }) => (
                  <AppleSignInButton onClick={onClick} />
                )}
              /> */}
            </Space>

            <Divider>OR</Divider>
            {formErrors.general && (
              <Alert
                message={formErrors.general}
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )}
            <StyledLabel $token={token}>Email address</StyledLabel>
            <StyledInput
              $token={token}
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <Alert message={formErrors.email} type="error" showIcon />
            )}
            <StyledLabel $token={token}>Password</StyledLabel>
            <StyledInput
              $token={token}
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <Alert message={formErrors.password} type="error" showIcon />
            )}
            <Checkbox
              onChange={handleRememberMeChange}
              checked={formData.rememberMe}
            >
              Remember me
            </Checkbox>
            <ReCAPTCHA
              sitekey="6LdDLJEpAAAAAH4yHx5GfRDcvHzvaKkwx6fMtTdT"
              onChange={handleCaptchaVerify}
            />
            <MainButtonFull
              type="primary"
              htmlType="submit"
              disabled={!isCaptchaVerified}
              style={
                isCaptchaVerified
                  ? {}
                  : {
                      backgroundColor: "gray",
                      color: "white",
                      cursor: "not-allowed",
                    }
              }
            >
              Login
            </MainButtonFull>

            {/* // Google SSO button */}

            <Subtitle
              color="light"
              $token={token}
              style={{ marginTop: "15px" }}
            >
              Don’t have an account? {/* <BtnLink to="/sign-up"> */}
              <BtnLink to="/individual/sign-up/1">
                <span style={{ color: "#DD0201", cursor: "pointer" }}>
                  Register here
                </span>
              </BtnLink>
            </Subtitle>
            <Subtitle color="light" $token={token}>
              Forgot password?{" "}
              <span style={{ color: "#DD0201" }}>
                <BtnLink to="/forgot-password">Click me!</BtnLink>
              </span>
            </Subtitle>
          </StyledForm>
        </Spin>
      </div>
    </Context.Provider>
  );
};

export default LoginForm;
