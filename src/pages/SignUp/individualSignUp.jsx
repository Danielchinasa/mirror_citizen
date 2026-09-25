import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { trackEvent } from "../../hooks/analytics";

import {
  Alert,
  notification,
  Space,
  Checkbox,
  Spin,
  message,
  Divider,
} from "antd";
import { useHistory } from "react-router-dom";

import {
  StyledForm,
  StyledInput,
  StyledLabel,
  MainButtonFull,
} from "../../globalStyles";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { signUp, fetchUserProfile } from "../../redux/actions";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../index.css";
import PdfModal from "../../components/PdfModal/PdfModal";
import privacyPdf from "../../images/e-raia Kenya Privacy Notice EN-SW v1.2 - Confirmed Service Scope.pdf";

import Swal from "sweetalert2";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignUpButton from "../../components/sso_button/googleSignUpButton";
import baseUrl from "../../apiConfig";
import { apiPostInternalCall } from "../../apiUtils";
import GoogleSignInButton from "../../components/sso_button/googleSignInButton";
import FacebookSignInButton from "../../components/sso_button/facebookSignInButton";
import AppleSignInButton from "../../components/sso_button/appleSignInButton";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_APP_ID } from "../../config/facebook";
import AppleLogin from "react-apple-login";
import { apiPost } from "../../apiUtils";
import { trackGA4Event } from "../../hooks/analytics";
import { getLanguage, t } from "../../utils/alertTranslations";
import {
  BackLink,
  FormSubtitle,
  FormTitle,
  SignUpCard,
  SignUpShell,
  AppleLabel,
  AppleInput,
  AppleButton,
  PasswordHintList,
  PasswordInputWrapper,
  EyeIconContainer,
  PasswordHintItem,
} from "./SignUp.elements";

const IndividualSignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

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
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
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
  const handleBlur = () => {
    setIsFocused(false);
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
    [],
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
      errors.push(
        isSw ? "Tafadhali ingiza nenosiri lako" : "Please enter your password",
      );
    }
    if (password.length < 8) {
      errors.push(
        isSw
          ? "Nenosiri lazima liwe na herufi 8 au zaidi"
          : "Password must be 8 characters or more",
      );
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(
        isSw
          ? "Nenosiri lazima liwe na angalau herufi moja kubwa"
          : "Password must contain at least one capital letter",
      );
    }
    if (!/[a-z]/.test(password)) {
      errors.push(
        isSw
          ? "Nenosiri lazima liwe na angalau herufi moja ndogo"
          : "Password must contain at least one lowercase letter",
      );
    }
    if (!/\d/.test(password)) {
      errors.push(
        isSw
          ? "Nenosiri lazima liwe na angalau nambari moja"
          : "Password must contain at least one number",
      );
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push(
        isSw
          ? "Nenosiri lazima liwe na angalau herufi maalum moja"
          : "Password must contain at least one special character",
      );
    }

    return errors.join(". "); // Join errors into a single string with a dot and space separator
  };

  const passwordErrorMessage = validatePassword(formData.password);

  const validateForm = () => {
    const errors = {};
    // First Name
    if (!formData.firstName) {
      errors.firstName = isSw
        ? "Tafadhali ingiza jina lako la kwanza"
        : "Please enter your first name";
    }

    // Last Name
    if (!formData.lastName) {
      errors.lastName = isSw
        ? "Tafadhali ingiza jina lako la mwisho"
        : "Please enter your last name";
    }

    if (!formData.email) {
      errors.email = isSw
        ? "Tafadhali ingiza barua pepe yako"
        : "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = isSw
        ? "Fomati ya barua pepe si sahihi"
        : "Invalid email format";
    }

    if (!formData.password) {
      errors.password = isSw
        ? "Tafadhali ingiza nenosiri lako"
        : "Please enter your password";
    } else if (formData.password.length < 8) {
      errors.password = isSw
        ? "Nenosiri lazima liwe na herufi 8 au zaidi"
        : "Password must be 8 characters or more";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = isSw
        ? "Nenosiri lazima liwe na angalau herufi moja kubwa"
        : "Password must contain at least one capital letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = isSw
        ? "Nenosiri lazima liwe na angalau herufi moja ndogo"
        : "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.password)) {
      errors.password = isSw
        ? "Nenosiri lazima liwe na angalau nambari moja"
        : "Password must contain at least one number";
    } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
      errors.password = isSw
        ? "Nenosiri lazima liwe na angalau herufi maalum moja"
        : "Password must contain at least one special character";
    }

    return errors;
  };

  const handleSignUp = async (event) => {
    trackEvent({
      action: "click_individual_signup_form_attempt",
      category: "Account Creation Attempt",
      label: "Individual Signup Form Attempt",
      value: 1,
    });
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
        setFormErrors({
          reenterPassword: isSw
            ? "Manenosiri hayafanani"
            : "Passwords do not match",
        });
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

      if (response === "success") {
        trackGA4Event("sign_up", { method: "email" });
        trackEvent({
          action: "click_individual_signup_form_success",
          category: "Account Creation Success",
          label: "Individual Signup Form Success",
          value: 1,
        });
        history.push("/verify-otp");
      } else {
        setFormErrors({ general: response?.message || response });
        Swal.fire({
          background: bgContainer,
          color: text,
          title: t("Error", isSw),
          text: response?.message || response,
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
        title: t("Error", isSw),
        text: t("Sign up failed. Please try again.", isSw),
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      setLoading(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleClickPrivacyPolicy = () => {
    setIsOpen(true);
  };
  const [isAccepted, setIsAccepted] = useState(false);

  const onChangeIsAccepted = (e) => {
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

        const res = await apiPostInternalCall(
          `/openauth/google-login`,
          payload,
        );
        const userData = res.data;
        Swal.fire({
          background: bgContainer,
          color: text,
          title: t("Success", isSw),
          text: t("Google login successful!", isSw),
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
            title: t("Error", isSw),
            text: t("Google login failed", isSw),
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      } catch (error) {
        console.error("Google login failed:", error);

        let errorMessage = t("Google login failed. Please try again.", isSw);

        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.request) {
          console.error("No response received from server:", error.request);
          errorMessage = t(
            "Network error. Please check your connection.",
            isSw,
          );
        } else {
          console.error("Error setting up request:", error.message);
        }
        Swal.fire({
          background: bgContainer,
          color: text,
          title: t("Error", isSw),
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
        title: t("Facebook Login", isSw),
        text: t("Facebook login was cancelled or failed.", isSw),
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
        deviceToken: localStorage.getItem("clientToken"),
        ipAddress: ipAddress,
        deviceName: "Web app",
      };

      const resfb = await apiPost(`/openauth/facebook`, payload);
      const userDataFb = resfb;
      Swal.fire({
        background: bgContainer,
        color: text,
        title: t("Success", isSw),
        text: t("Facebook login successful!", isSw),
        icon: "success",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      dispatch({ type: "SIGN_IN", payload: userDataFb });
      dispatch(fetchUserProfile(userDataFb.jwtToken));

      if (userDataFb.jwtToken) {
        localStorage.setItem("IpAddress", ipAddress);
        history.push("/main-dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Facebook login failed:", err);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: t("Error", isSw),
        text:
          err?.response?.data?.message ||
          t("Facebook login failed. Please try again.", isSw),
        icon: "error",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const pwd = formData.password || "";
  const isLengthValid = pwd.length >= 8;
  const isCaseValid = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);
  const isNumberValid = /\d/.test(pwd);
  const isSpecialValid = /[^a-zA-Z0-9]/.test(pwd);

  return (
    <SignUpShell>
      <SignUpCard style={{ maxWidth: "620px" }}>
        <FormTitle style={{ textAlign: "center" }}>
          {isSw ? "Unda akaunti yako" : "Create your account"}
        </FormTitle>
        <FormSubtitle style={{ textAlign: "center", marginBottom: "24px" }}>
          {isSw
            ? "Weka maelezo yako ili kuanza kuthibitisha na e-Raia."
            : "Enter your details to start verifying with e-Raia."}
        </FormSubtitle>

        <Space size="large" direction="vertical" style={{ display: "flex" }}>
          <Spin
            spinning={loading}
            tip={isSw ? "Inasajili..." : "Signing Up..."}
          >
            <StyledForm onSubmit={handleSignUp}>
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
              <Space direction="vertical" style={{ width: "100%" }}>
                <GoogleSignInButton
                  text={isSw ? "Endelea na Google" : "Continue with Google"}
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("token");
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
                  appId={FACEBOOK_APP_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  redirectUri="https://e-citizen.ng/verification-login"
                  responseType="code"
                  callback={handleFacebook}
                  cssClass="facebook-btn"
                  textButton={
                    isSw ? "Endelea na Facebook" : "Continue with Facebook"
                  }
                  icon={<FacebookSignInButton />}
                />
              </Space>
              <Divider>{isSw ? "AU" : "OR"}</Divider>
              {formErrors.general && (
                <Alert
                  message={formErrors.general}
                  type="error"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />
              )}
              <AppleLabel $token={token}>
                {isSw ? "Jina la kwanza" : "First name"}
              </AppleLabel>
              <AppleInput
                $token={token}
                type="text"
                placeholder={
                  isSw ? "Ingiza jina lako la kwanza" : "Enter your first name"
                }
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                ref={firstNameRef}
              />
              {formErrors.firstName && (
                <Alert message={formErrors.firstName} type="error" showIcon />
              )}

              <AppleLabel $token={token}>
                {isSw ? "Jina la mwisho" : "Last name"}
              </AppleLabel>
              <AppleInput
                $token={token}
                type="text"
                placeholder={
                  isSw ? "Ingiza jina lako la mwisho" : "Enter your last name"
                }
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                ref={lastNameRef}
              />
              {formErrors.lastName && (
                <Alert message={formErrors.lastName} type="error" showIcon />
              )}

              <AppleInput
                $token={token}
                hidden
                type="text"
                placeholder="Enter your NIN"
                name="nin"
                value={formData.nin}
                onChange={handleInputChange}
                pattern="[0-9]*"
                title="Please enter only numbers"
                ref={ninRef}
              />

              <AppleLabel $token={token}>
                {isSw ? "Barua pepe" : "Email address"}
              </AppleLabel>
              <AppleInput
                $token={token}
                type="text"
                placeholder={
                  isSw ? "Ingiza barua pepe yako" : "Enter your Email address"
                }
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                ref={emailRef}
              />
              {formErrors.email && (
                <Alert message={formErrors.email} type="error" showIcon />
              )}
              <AppleLabel $token={token}>
                {isSw
                  ? "Nambari ya simu (Mfano: +254 XXX XXX XXX X)"
                  : "Phone number (E.g: +254 XXX XXX XXX X)"}
              </AppleLabel>
              <PhoneInput
                $token={token}
                country={"ke"}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                enableSearch
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={"input-phone-number mb-3"}
                inputStyle={{
                  width: "100%",
                  height: "52px",
                  borderColor: isFocused
                    ? "var(--ec-primary, #DD0201)"
                    : "transparent",
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  borderRadius: "12px",
                  color: text,
                  background: isFocused
                    ? "var(--ec-bg, #fff)"
                    : "var(--ec-input-bg, rgba(0, 0, 0, 0.04))",
                  boxShadow: isFocused
                    ? "0 0 0 4px rgba(221, 2, 1, 0.25)"
                    : "none",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  fontSize: "15px",
                  transition: "all 0.2s ease",
                }}
                buttonStyle={{
                  border: "none",
                  background: "transparent",
                  borderRadius: "12px 0 0 12px",
                  paddingLeft: "8px",
                }}
              />

              {formErrors.phoneNumber && (
                <Alert message={formErrors.phoneNumber} type="error" showIcon />
              )}

              <AppleLabel $token={token}>
                {isSw ? "Nenosiri" : "Password"}
              </AppleLabel>
              <PasswordInputWrapper>
                <AppleInput
                  $token={token}
                  type={showPassword ? "text" : "password"}
                  placeholder={isSw ? "Unda nenosiri" : "Create a password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  ref={passwordRef}
                />
                <EyeIconContainer
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </EyeIconContainer>
              </PasswordInputWrapper>

              <PasswordHintList>
                <PasswordHintItem $valid={isLengthValid}>
                  {isLengthValid ? (
                    <CheckCircleFilled />
                  ) : (
                    <CloseCircleFilled />
                  )}{" "}
                  {isSw ? "Angalau herufi 8" : "At least 8 characters long"}
                </PasswordHintItem>
                <PasswordHintItem $valid={isCaseValid}>
                  {isCaseValid ? <CheckCircleFilled /> : <CloseCircleFilled />}{" "}
                  {isSw
                    ? "Herufi 1 kubwa na herufi 1 ndogo"
                    : "1 uppercase and 1 lowercase letter"}
                </PasswordHintItem>
                <PasswordHintItem $valid={isNumberValid}>
                  {isNumberValid ? (
                    <CheckCircleFilled />
                  ) : (
                    <CloseCircleFilled />
                  )}{" "}
                  {isSw ? "Nambari 1" : "1 number"}
                </PasswordHintItem>
                <PasswordHintItem $valid={isSpecialValid}>
                  {isSpecialValid ? (
                    <CheckCircleFilled />
                  ) : (
                    <CloseCircleFilled />
                  )}{" "}
                  {isSw ? "Herufi maalum 1" : "1 special character"}
                </PasswordHintItem>
              </PasswordHintList>

              {formErrors.password && (
                <Alert
                  message={passwordErrorMessage}
                  type="error"
                  showIcon
                  style={{ marginBottom: "20px" }}
                />
              )}

              <AppleLabel $token={token}>
                {isSw ? "Thibitisha Nenosiri" : "Confirm Password"}
              </AppleLabel>
              <PasswordInputWrapper>
                <AppleInput
                  $token={token}
                  type={showReenterPassword ? "text" : "password"}
                  placeholder={
                    isSw ? "Ingiza tena nenosiri" : "Re-enter the password"
                  }
                  name="reenterPassword"
                  value={reenterPassword}
                  onChange={handleInputChange}
                />
                <EyeIconContainer
                  onClick={() => setShowReenterPassword(!showReenterPassword)}
                >
                  {showReenterPassword ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </EyeIconContainer>
              </PasswordInputWrapper>
              {formErrors.reenterPassword && (
                <Alert
                  message={formErrors.reenterPassword}
                  type="error"
                  showIcon
                />
              )}
              <Checkbox onChange={onChangeIsAccepted}>
                {isSw
                  ? "Ninathibitisha kuwa nimesoma na kukubali "
                  : "I certify that I have read and accepted the "}
                <span
                  style={{ color: "#DD0002", cursor: "pointer" }}
                  onClick={handleClickPrivacyPolicy}
                >
                  {isSw
                    ? "Sera ya Faragha ya e-Raia™"
                    : "e-Raia™ Privacy Policy"}
                </span>
              </Checkbox>
              <PdfModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title={isSw ? "Sera ya Faragha" : "Privacy Policy"}
                src={privacyPdf}
                height={560}
              />

              <AppleButton
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
                {isSw ? "Endelea" : "Proceed"}
              </AppleButton>
            </StyledForm>
          </Spin>
        </Space>
      </SignUpCard>
    </SignUpShell>
  );
};

export default IndividualSignUp;
