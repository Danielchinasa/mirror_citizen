import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signIn, fetchUserProfile } from "../../redux/actions";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
import { apiPost } from "../../apiUtils";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { trackEvent } from "../../hooks/analytics";
import { trackLogin } from "../../analytics/analytics";
import { getIpInfo } from "../../config/ipConfiguration";
import {
  PageWrapper,
  MainContent,
  LoginCard,
  LoginTitle,
  LoginSubtitle,
  SSOGroup,
  SSOButton,
  Divider,
  FormGroup,
  FormLabel,
  FormInput,
  PasswordWrapper,
  PasswordToggle,
  FormRow,
  RememberLabel,
  ForgotLink,
  LoginButton,
  RegisterText,
  ErrorAlert,
  SpinnerOverlay,
  Spinner,
} from "./VerificationLogin.elements";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const VerificationLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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

  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/main-dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    const fetchIpAddress = async () => {
      const { ip } = await getIpInfo();
      setIpAddress(ip);
    };
    fetchIpAddress();

    const rememberedEmail = Cookies.get("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const validateForm = () => {
    const errors = {};
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
    }
    return errors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    trackEvent({
      action: "click_normail_signin_attempt",
      category: "Authentication Attempt",
      label: "Normal Signin Attempt",
      value: 1,
    });

    if (formData.rememberMe) {
      Cookies.set("rememberedEmail", formData.email, { expires: 7 });
    } else {
      Cookies.remove("rememberedEmail");
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ipAddress,
        deviceToken: localStorage.getItem("clientToken"),
      };

      const response = await dispatch(signIn(payload));

      if (response.jwtToken) {
        trackLogin({ method: "email" });
        if (ipAddress) localStorage.setItem("IpAddress", ipAddress);
        trackEvent({
          action: "click_normail_signin_sucess",
          category: "Authentication Success",
          label: "Normal Signin Success",
          value: 1,
        });
        history.push(redirectTo);
      } else if (response === "Incorrect email or password") {
        setFormErrors({
          general: isSw
            ? "Barua pepe au nenosiri si sahihi"
            : "Incorrect email or password",
        });
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general: isSw
            ? "Hitilafu 406: Haikubaliki. Samahani, seva haiwezi kutimiza ombi lako kwa sasa."
            : "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
        });
      } else {
        setFormErrors({
          general: isSw
            ? "Uingiaji umeshindwa. Tafadhali jaribu tena."
            : "Login failed. Please try again.",
        });
      }
    } catch (error) {
      setFormErrors({
        general: isSw
          ? "Uingiaji umeshindwa. Tafadhali jaribu tena."
          : "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);
        const payload = {
          accessToken: response.access_token,
          deviceToken: localStorage.getItem("clientToken"),
          ipAddress,
          deviceName: "Web app",
        };

        const res = await apiPost("/openauth/google-login", payload);
        dispatch({ type: "SIGN_IN", payload: res });
        dispatch(fetchUserProfile(res.jwtToken));

        if (res.jwtToken) {
          if (ipAddress) localStorage.setItem("IpAddress", ipAddress);
          history.push(redirectTo);
        } else {
          setFormErrors({
            general: isSw
              ? "Uingiaji wa Google umeshindwa."
              : "Google login failed.",
          });
        }
      } catch (error) {
        setFormErrors({
          general:
            error?.response?.data?.message ||
            (isSw
              ? "Uingiaji wa Google umeshindwa. Tafadhali jaribu tena."
              : "Google login failed. Please try again."),
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFacebook = async (fbRes) => {
    if (!fbRes || !fbRes.accessToken) {
      setFormErrors({
        general: isSw
          ? "Uingiaji wa Facebook ulighairiwa au umeshindwa."
          : "Facebook login was cancelled or failed.",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        accessToken: fbRes.accessToken,
        deviceToken: localStorage.getItem("clientToken"),
        ipAddress,
        deviceName: "Web app",
      };

      const res = await apiPost("/openauth/facebook", payload);
      dispatch({ type: "SIGN_IN", payload: res });
      dispatch(fetchUserProfile(res.jwtToken));

      if (res.jwtToken) {
        if (ipAddress) localStorage.setItem("IpAddress", ipAddress);
        history.push(redirectTo);
      } else {
        setFormErrors({
          general: isSw
            ? "Uingiaji wa Facebook umeshindwa."
            : "Facebook login failed.",
        });
      }
    } catch (err) {
      setFormErrors({
        general:
          err?.response?.data?.message ||
          (isSw
            ? "Uingiaji wa Facebook umeshindwa. Tafadhali jaribu tena."
            : "Facebook login failed. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageWrapper>
      <MainContent>
        <LoginCard style={{ position: "relative" }}>
          {loading && (
            <SpinnerOverlay>
              <Spinner />
            </SpinnerOverlay>
          )}

          <LoginTitle>{isSw ? "Karibu tena" : "Welcome back"}</LoginTitle>
          <LoginSubtitle>
            {isSw
              ? "Ingia ili kuendelea na uthibitishaji wako"
              : "Sign in to continue your verification"}
          </LoginSubtitle>

          <SSOGroup>
            <SSOButton
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                trackEvent({
                  action: "click_google_signin",
                  category: "Authentication",
                  label: "Google Sign-In Button",
                  value: 1,
                });
                googleLogin();
              }}
            >
              <FcGoogle /> {isSw ? "Endelea na Google" : "Continue with Google"}
            </SSOButton>

            <FacebookLogin
              appId="541710452150170"
              autoLoad={false}
              fields="name,picture"
              scope="public_profile"
              callback={handleFacebook}
              render={(renderProps) => (
                <SSOButton type="button" onClick={renderProps.onClick}>
                  <FaFacebook color="#1877F2" />{" "}
                  {isSw ? "Endelea na Facebook" : "Continue with Facebook"}
                </SSOButton>
              )}
            />
          </SSOGroup>

          <Divider>{isSw ? "AU" : "OR"}</Divider>

          <form onSubmit={handleSignIn}>
            {formErrors.general && (
              <ErrorAlert>{formErrors.general}</ErrorAlert>
            )}

            <FormGroup>
              <FormLabel>{isSw ? "Barua pepe" : "Email address"}</FormLabel>
              <FormInput
                type="email"
                placeholder={
                  isSw ? "Ingiza barua pepe yako" : "Enter your email"
                }
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <ErrorAlert>{formErrors.email}</ErrorAlert>}
            </FormGroup>

            <FormGroup>
              <FormLabel>{isSw ? "Nenosiri" : "Password"}</FormLabel>
              <PasswordWrapper>
                <FormInput
                  type={showPass ? "text" : "password"}
                  placeholder={
                    isSw ? "Ingiza nenosiri lako" : "Enter your password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordWrapper>
              {formErrors.password && (
                <ErrorAlert>{formErrors.password}</ErrorAlert>
              )}
            </FormGroup>

            <FormRow>
              <RememberLabel>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />{" "}
                {isSw ? "Nikumbuke" : "Remember me"}
              </RememberLabel>
              <ForgotLink to="/forgot-password">
                {isSw ? "Umesahau nenosiri?" : "Forgot password?"}
              </ForgotLink>
            </FormRow>

            <ReCAPTCHA
              sitekey="6Lc308cZAAAAALRRhzvQnCeHrY2WoYmIaBb-6knX"
              onChange={() => setIsCaptchaVerified(true)}
              style={{ marginBottom: 20 }}
            />

            <LoginButton type="submit" disabled={!isCaptchaVerified}>
              {isSw ? "Ingia" : "Login"}
            </LoginButton>
          </form>

          <RegisterText>
            {isSw ? "Huna akaunti?" : "Don't have an account?"}{" "}
            <Link to="/individual/sign-up/1">
              {isSw ? "Jisajili hapa" : "Register here"}
            </Link>
          </RegisterText>
        </LoginCard>
      </MainContent>
    </PageWrapper>
  );
};

export default VerificationLoginPage;
