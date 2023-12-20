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
        const response = await axios.get("https://api.ipify.org/?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setIpAddress(null);
      }
    };

    fetchIpAddress();
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

  const handleSignIn = async (event) => {
    event.preventDefault();

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
          description: response.message,
          placement,
        });
      };

      console.log("Response from signIn:", response);

      if (response.status === "failed") {
        setFormErrors({ general: response.message }); // Set error message
        openNotification2("topRight");
      } else {
        // On successful login, navigate to the main dashboard
        history.push("/main-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
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
              onChange={handleInputChange}
              checked={formData.rememberMe}
            >
              Remember me
            </Checkbox>
            <MainButtonFull type="primary" htmlType="submit">
              Login
            </MainButtonFull>
            <Subtitle color="light">
              Don’t have an account?{" "}
              <BtnLink to="/sign-up">
                <span style={{ color: "#09C93A" }}>Register here</span>
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
