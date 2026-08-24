import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useLocale } from "../../components/LocaleProvider";
import { useDispatch } from "react-redux";
import { signIn, fetchUserProfile } from "../../redux/actions";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
import { apiPost } from "../../apiUtils";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { trackEvent, trackGA4Event } from "../../hooks/analytics";
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

const VerificationLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useLocale();

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
        trackGA4Event("login", { method: "email" });
        if (ipAddress) localStorage.setItem("IpAddress", ipAddress);
        trackEvent({
          action: "click_normail_signin_sucess",
          category: "Authentication Success",
          label: "Normal Signin Success",
          value: 1,
        });
        history.push(redirectTo);
      } else if (response === "Incorrect email or password") {
        setFormErrors({ general: "Incorrect email or password" });
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
        });
      } else {
        setFormErrors({ general: "Login failed. Please try again." });
      }
    } catch (error) {
      setFormErrors({ general: "Login failed. Please try again." });
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
          setFormErrors({ general: "Google login failed." });
        }
      } catch (error) {
        setFormErrors({
          general:
            error?.response?.data?.message ||
            "Google login failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFacebook = async (fbRes) => {
    if (!fbRes || !fbRes.accessToken) {
      setFormErrors({ general: "Facebook login was cancelled or failed." });
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
        setFormErrors({ general: "Facebook login failed." });
      }
    } catch (err) {
      setFormErrors({
        general:
          err?.response?.data?.message ||
          "Facebook login failed. Please try again.",
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

          <LoginTitle>{t("login.welcomeBack")}</LoginTitle>
          <LoginSubtitle>{t("login.signInToContinue")}</LoginSubtitle>

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
              <FcGoogle /> {t("login.continueGoogle")}
            </SSOButton>

            <FacebookLogin
              appId="541710452150170"
              autoLoad={false}
              fields="name,picture"
              scope="public_profile"
              callback={handleFacebook}
              render={(renderProps) => (
                <SSOButton type="button" onClick={renderProps.onClick}>
                  <FaFacebook color="#1877F2" /> {t("login.continueFacebook")}
                </SSOButton>
              )}
            />
          </SSOGroup>

          <Divider>{t("login.or")}</Divider>

          <form onSubmit={handleSignIn}>
            {formErrors.general && (
              <ErrorAlert>{formErrors.general}</ErrorAlert>
            )}

            <FormGroup>
              <FormLabel>{t("login.emailLabel")}</FormLabel>
              <FormInput
                type="email"
                placeholder={t("login.emailPlaceholder")}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <ErrorAlert>{formErrors.email}</ErrorAlert>}
            </FormGroup>

            <FormGroup>
              <FormLabel>{t("login.passwordLabel")}</FormLabel>
              <PasswordWrapper>
                <FormInput
                  type={showPass ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
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
                {t("login.rememberMe")}
              </RememberLabel>
              <ForgotLink to="/forgot-password">
                {t("login.forgotPassword")}
              </ForgotLink>
            </FormRow>
            <ReCAPTCHA
              sitekey="6Lc308cZAAAAALRRhzvQnCeHrY2WoYmIaBb-6knX"
              onChange={(token) => setIsCaptchaVerified(!!token)}
              onExpired={() => setIsCaptchaVerified(false)}
              style={{ marginBottom: 20 }}
            />

            <LoginButton type="submit" disabled={isCaptchaVerified || loading}>
              Login
            </LoginButton>
          </form>

          <RegisterText>
            {t("login.noAccount")}{" "}
            <Link to="/individual/sign-up/1">{t("login.registerHere")}</Link>
          </RegisterText>
        </LoginCard>
      </MainContent>
    </PageWrapper>
  );
};

export default VerificationLoginPage;
