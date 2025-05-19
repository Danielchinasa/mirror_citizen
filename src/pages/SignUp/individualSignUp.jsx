import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  Image,
  Typography,
  Button,
  Alert,
  notification,
  Space,
  Col,
  Row,
  Checkbox,
  Spin,
  message,
} from "antd";
import { useHistory } from "react-router-dom";

import reg from "../../images/Verify_NIN_on_ecitizen.jpg";
import {
  BtnLink,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
  MainButtonFull,
} from "../../globalStyles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { signUp, fetchUserProfile } from "../../redux/actions";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../index.css";
import privacyPolicy from "../../privacyPolicy";
import { Modal } from "antd";
import Swal from "sweetalert2";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignUpButton from "../../components/sso_button/googleSignUpButton";
const { Title } = Typography;

const IndividualSignUp = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];
  // const [selectedDiv, setSelectedDiv] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const [userType, setUserType] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [ipCountry, setIpCountry] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ninRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const [reenterPassword, setReenterPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nin: "",
    phoneNumber: "",
    email: "",
    password: "",
    rememberMe: false,
    userType: "",
    ipAddress: "",
    ipCountry: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handlePhoneChange = (phone) => {
    // Update state using setPhone

    setPhone(phone);
    setFormData({
      ...formData,
      phoneNumber: phone,
    });
  };
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const [api, contextHolder] = notification.useNotification();

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

  const focusOnErrorField = (fieldName) => {
    switch (fieldName) {
      case "firstName":
        firstNameRef.current.focus();
        break;
      case "lastName":
        lastNameRef.current.focus();
        break;
      case "nin":
        ninRef.current.focus();
        break;
      case "email":
        emailRef.current.focus();
        break;
      // case "phoneNumber":
      //   phoneNumberRef.current.focus();
      //   break;
      case "password":
        passwordRef.current.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchIpCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIpCountry(response.data.country_name);
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setIpCountry(null);
      }
    };

    fetchIpCountry();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name === "reenterPassword") {
      setReenterPassword(value);
    }

    setFormData({
      ...formData,
      [name]: inputValue,
      userType: "individual",
      ipAddress: ipAddress,
      ipCountry: ipCountry,
    });

    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const validatePassword = (password) => {
    const errors = [];

    if (!password) {
      errors.push("Please enter your password");
    }
    if (password.length < 8) {
      errors.push("Password must be 8 characters or more");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one capital letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors.join(". "); // Join errors into a single string with a dot and space separator
  };

  const passwordErrorMessage = validatePassword(formData.password);

  const validateForm = () => {
    const errors = {};
    // First Name
    if (!formData.firstName) {
      errors.firstName = "Please enter your first name";
    }

    // Last Name
    if (!formData.lastName) {
      errors.lastName = "Please enter your last name";
    }

    // NIN
    // if (!formData.nin) {
    //   errors.nin = "Please enter your National Identification Number (NIN)";
    // } else if (formData.nin.length != 11) {
    //   errors.nin = "NIN must be 11 characters";
    // }
    if (!formData.email) {
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    // Phone Number
    // if (!formData.phoneNumber) {
    //   errors.phoneNumber = "Please enter your phone number";
    // }

    if (!formData.password) {
      errors.password = "Please enter your password";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one capital letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }

    return errors;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        const firstErrorField = Object.keys(errors)[0];
        focusOnErrorField(firstErrorField); // Focus on the first error field
        return;
      }

      if (formData.password !== reenterPassword) {
        setFormErrors({ reenterPassword: "Passwords do not match" });
        focusOnErrorField("reenterPassword");
        return;
      }

      setFormErrors({});
      setLoading(true);

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(signUp(formData));
      const openNotification2 = (placement) => {
        api.error({
          message: `Notification`,
          description: response.message,
          placement,
        });
      };
      setLoading(true);
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Response from signUp:", response);
      // if (response.status !== 200) {
      //   throw new Error(response); // Throw an error with the response status text
      // }

      if (response === "success") {
        // On successful login, navigate to the main dashboard
        // console.log("I reach here");
        history.push("/verify-otp");
      } else {
        setFormErrors({ general: response.message }); // Set error message
        // openNotification2("topRight");
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    } catch (error) {
      console.error("SignUp failed:", error);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: response,
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      // notification.error({
      //   message: "Server Error",
      //   description: error.message || "An error occurred while signing up.",
      // });
    } finally {
      setLoading(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleClickPrivacyPolicy = () => {
    // Import the PDF file using require
    // const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");

    // // Open the PDF in a new tab
    // window.open(pdf, "_blank");
    setIsOpen(true);
  };
  const [isAccepted, setIsAccepted] = useState(false);
  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };
  const onChangeIsAccepted = (e) => {
    // console.log(`onChangeIsAccepted = ${e.target.checked}`);
    e.target.checked ? setIsAccepted(true) : setIsAccepted(false);
  };

  const { token } = theme.useToken();
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

        const res = await axios.post(
          `https://e-citizen.ng:8444/api/v2/openauth/google-login`,
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

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Row>
        <Col span={8} sm={0} xs={0} md={8} lg={8}>
          <Image src={reg} preview={false} />
        </Col>
        <Col span={13} sm={24} xs={24} md={13} lg={13}>
          <div className="p-5">
            <BtnLink to="/sign-up">
              <ArrowLeftOutlined
                style={{
                  fontSize: "25px",
                  color: text,
                  cursor: "pointer",
                }}
              />
            </BtnLink>

            <Space
              size="large"
              direction="vertical"
              style={{
                display: "flex",
              }}
            >
              <Spin spinning={loading} tip="Signing Up...">
                <StyledForm onSubmit={handleSignUp}>
                  <Title>Create Account</Title>
                  <Title level={4}>INDIVIDUAL ACCOUNT</Title>
                  {formErrors.general && (
                    <Alert
                      message={formErrors.general}
                      type="error"
                      showIcon
                      style={{ marginBottom: "16px" }}
                    />
                  )}
                  <StyledLabel $token={token}>First name</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    ref={firstNameRef}
                  />
                  {formErrors.firstName && (
                    <Alert
                      message={formErrors.firstName}
                      type="error"
                      showIcon
                    />
                  )}

                  <StyledLabel $token={token}>Last name</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    ref={lastNameRef}
                  />
                  {formErrors.lastName && (
                    <Alert
                      message={formErrors.lastName}
                      type="error"
                      showIcon
                    />
                  )}
                  {/* <StyledLabel>
                    National Identification Number (NIN)
                  </StyledLabel> */}
                  <StyledInput
                    $token={token}
                    hidden
                    type="text"
                    placeholder="Enter your NIN"
                    name="nin"
                    value={formData.nin}
                    onChange={handleInputChange}
                    pattern="[0-9]*" // Allow only numbers
                    title="Please enter only numbers"
                    ref={ninRef}
                  />
                  {/* {formErrors.nin && (
                    <Alert message={formErrors.nin} type="error" showIcon />
                  )} */}
                  <StyledLabel $token={token}>Email address</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="text"
                    placeholder="Enter your Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    ref={emailRef}
                  />
                  {formErrors.email && (
                    <Alert message={formErrors.email} type="error" showIcon />
                  )}
                  <StyledLabel $token={token}>
                    Phone number (E.g: +234 81X XXX XXX X)
                  </StyledLabel>
                  <PhoneInput
                    $token={token}
                    country={"ng"}
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    enableSearch
                    onFocus={handleFocus}
                    className={"input-phone-number mb-3"}
                    inputStyle={{
                      width: "100%",
                      borderColor: isFocused ? "#09c93a" : "",
                      borderRadius: "5px",
                      color: text,
                      background: "rgba(53, 65, 56, 0.1)",
                    }}
                  />
                  {/* <StyledInput
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]*" // Allow only numbers
                    title="Please enter only numbers"
                    ref={phoneNumberRef}
                  /> */}
                  {formErrors.phoneNumber && (
                    <Alert
                      message={formErrors.phoneNumber}
                      type="error"
                      showIcon
                    />
                  )}

                  <small style={{ color: "#42B7FF" }}>
                    Password must be 8 characters or more, contain at least one
                    capital letter, <br /> contain at least one lowercase
                    letter, contain at least one number, contain at least one
                    special character.
                  </small>
                  <StyledLabel $token={token}>Password</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="password"
                    placeholder="Create a password "
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    ref={passwordRef}
                  />

                  {formErrors.password && (
                    <Alert
                      message={passwordErrorMessage}
                      type="error"
                      showIcon
                    />
                  )}

                  <StyledLabel $token={token}>Confirm Password</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="password"
                    placeholder="Re-enter the password "
                    name="reenterPassword"
                    value={reenterPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.reenterPassword && (
                    <Alert
                      message={formErrors.reenterPassword}
                      type="error"
                      showIcon
                    />
                  )}
                  <Checkbox onChange={onChangeIsAccepted}>
                    I certify that I have read and accepted the{" "}
                    <span
                      style={{ color: "#09C93A", cursor: "pointer" }}
                      onClick={handleClickPrivacyPolicy}
                    >
                      e-citizen™ Privacy Policy
                    </span>
                  </Checkbox>
                  <Modal
                    title="Privacy Policy"
                    visible={isOpen}
                    centered
                    // open={open}
                    onOk={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    width={1000}
                  >
                    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
                  </Modal>
                  <MainButtonFull
                    type="primary"
                    htmlType="submit"
                    disabled={!isAccepted}
                    style={
                      isAccepted
                        ? {}
                        : {
                            marginTop: "10px",
                            backgroundColor: "gray",
                            color: "white",
                            cursor: "not-allowed",
                          }
                    }
                  >
                    Proceed
                  </MainButtonFull>
                </StyledForm>
                {/* // Google SSO button */}
                <GoogleSignUpButton
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("token");
                    login();
                  }}
                />
              </Spin>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IndividualSignUp;
