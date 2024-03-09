import React, { useState, useMemo, useEffect } from "react";
import { Checkbox, Alert, Spin, notification, Button } from "antd";
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
import { signIn } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";

const Context = React.createContext({
  name: "Default",
});

const LoginForm = () => {
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

  const [ipAddress, setIpAddress] = useState(null);
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
    []
  );

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
    event.preventDefault();
    if (formData.rememberMe) {
      Cookies.set("rememberedEmail", formData.email, { expires: 7 }); // Store email in cookie for 7 days
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
      const formDataWithIp = {
        ...formData,
        ipAddress,
      };

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(signIn(formDataWithIp));
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

      console.log("Response from signIn:", response.status);

      if (response.jwtToken) {
        // On successful login with jwtToken, navigate to the main dashboard
        localStorage.setItem("IpAddress", ipAddress);
        history.push("/main-dashboard");
      } else if (response === "Incorrect email or password") {
        setFormErrors({ general: response }); // Set error message
        openNotification2("topRight");
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time. Try again later",
        }); // Set error message
        openNotification3("topRight");
      } else {
        // On successful login, navigate to the main dashboard
        setFormErrors({ general: "Login Failed" }); // Set error message
        openNotification2("topRight");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ marginTop: "50px" }}>
        <Heading>Login</Heading>
        <Spin spinning={loading} tip="Logging in...">
          <StyledForm onSubmit={handleSignIn}>
            {formErrors.general && (
              <Alert
                message={formErrors.general}
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )}
            <StyledLabel>Email address</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <Alert message={formErrors.email} type="error" showIcon />
            )}
            <StyledLabel>Password</StyledLabel>
            <StyledInput
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
            ,
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
            <Subtitle color="light">
              Don’t have an account?{" "}
              <BtnLink to="/sign-up">
                <span style={{ color: "#09C93A", cursor: "pointer" }}>
                  Register here
                </span>
              </BtnLink>
            </Subtitle>
            <Subtitle color="light">
              Forgot password?{" "}
              <span style={{ color: "#09C93A" }}>
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
