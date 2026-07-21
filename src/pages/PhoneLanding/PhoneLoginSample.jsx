import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import styled from "styled-components";
import phoneSampleAvatar from "../../images/avatar1.jpg";
import { useDispatch } from "react-redux";
import { signIn, fetchUserProfile } from "../../redux/actions";
import axios from "axios";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
import { apiPost } from "../../apiUtils";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { trackEvent, trackGA4Event } from "../../hooks/analytics";

const SectionWrapper = styled.section`
  padding: 40px 50px 60px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 30px 20px 40px;
  }
`;

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Login Card ─── */

const LoginCard = styled.div`
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 36px 32px;

  @media screen and (max-width: 960px) {
    order: 2;
  }

  @media screen and (max-width: 768px) {
    padding: 28px 20px;
  }
`;

const LoginCardTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;
`;

const LoginCardSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0 0 24px;
`;

const LoginLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const SSOCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  justify-content: center;
`;

const SSOButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  background: var(--ec-bg);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: var(--ec-step-card-bg);
  }

  svg {
    font-size: 20px;
  }
`;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 12px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-faint);
  align-self: stretch;

  &::before,
  &::after {
    content: "";
    flex: 1;
    width: 1px;
    background: var(--ec-divider-color);
  }

  @media screen and (max-width: 600px) {
    flex-direction: row;
    padding: 8px 0;
    align-self: auto;

    &::before,
    &::after {
      flex: 1;
      width: auto;
      height: 1px;
    }
  }
`;

const FormCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormLabel = styled.label`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--ec-text-secondary);
  margin-bottom: 2px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: var(--ec-input-placeholder);
  }

  &:focus {
    border-color: var(--ec-primary);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--ec-text-faint);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);
  cursor: pointer;
`;

const ForgotLink = styled(Link)`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-primary);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginBtn = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background: ${(props) => (props.disabled ? "#ccc" : "#09c93a")};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#16ef4d")};
    color: #fff;
  }
`;

const ErrorAlert = styled.div`
  background: var(--ec-error-bg);
  border: 1px solid var(--ec-error-border);
  color: var(--ec-error-text);
  padding: 8px 12px;
  border-radius: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  margin-bottom: 8px;
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: var(--ec-spinner-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: 10;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid var(--ec-border);
  border-top-color: var(--ec-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RegisterText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  text-align: center;
  margin: 12px 0 0;

  a {
    color: var(--ec-primary);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ─── Sample Result Card ─── */

const SampleCard = styled.div`
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 36px 32px;

  @media screen and (max-width: 960px) {
    order: 1;
  }

  @media screen and (max-width: 768px) {
    padding: 28px 20px;
  }
`;

const SampleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

const SampleCardTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0;
`;

const SampleBadge = styled.span`
  display: inline-block;
  background: var(--ec-bg);
  border: 1px solid var(--ec-primary);
  color: var(--ec-primary);
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 16px;
  white-space: nowrap;
`;

const SampleCardSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0 0 20px;
`;

const ResultCard = styled.div`
  background: var(--ec-step-card-bg);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 24px;

  @media screen and (max-width: 480px) {
    padding: 16px;
  }
`;

const ResultTop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PhoneIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--ec-border);
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 28px;
    color: var(--ec-text-secondary);
  }
`;

const ResultGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ResultField = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: var(--ec-text-faint);
`;

const ResultValue = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--ec-text);
`;

const VerifiedBadge = styled.span`
  color: var(--ec-primary);
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ResultFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--ec-border);
  padding-top: 12px;
  margin-top: 16px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: var(--ec-text-faint);

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const ResultDisclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: #3b82f6;
  margin-top: 12px;

  svg {
    font-size: 14px;
    color: #3b82f6;
  }
`;

const PhoneLoginSample = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = "/verify/phone";

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
      try {
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        setIpAddress(response.data.ip);
      } catch (error1) {
        try {
          const response = await axios.get("https://ipapi.co/json/");
          setIpAddress(response.data.ip);
        } catch (error2) {
          setIpAddress(null);
        }
      }
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
        localStorage.setItem("IpAddress", ipAddress);
        trackEvent({
          action: "click_normail_signin_sucess",
          category: "Authentication Success",
          label: "Normal Signin Success",
          value: 1,
        });
        history.push(redirectTo);
      } else if (response === "Incorrect email or password") {
        setFormErrors({ general: "Incorrect email or password" });
        Swal.fire({
          title: "Error",
          text: "Incorrect email or password",
          icon: "error",
          customClass: { confirmButton: "custom-swal-button" },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
        });
        Swal.fire({
          title: "Error",
          text: "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
          icon: "error",
          customClass: { confirmButton: "custom-swal-button" },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        setFormErrors({ general: "Login failed. Please try again." });
        Swal.fire({
          title: "Error",
          text: "Login Failed",
          icon: "error",
          customClass: { confirmButton: "custom-swal-button" },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    } catch (error) {
      setFormErrors({ general: "Login failed. Please try again." });
      Swal.fire({
        title: "Error",
        text: "Login Failed",
        icon: "error",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
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
        Swal.fire({
          title: "Success",
          text: "Google login successful!",
          icon: "success",
          customClass: { confirmButton: "custom-swal-button" },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        dispatch({ type: "SIGN_IN", payload: res });
        dispatch(fetchUserProfile(res.jwtToken));
        if (res.jwtToken) {
          localStorage.setItem("IpAddress", ipAddress);
          history.push(redirectTo);
        } else {
          setFormErrors({ general: "Google login failed." });
          Swal.fire({
            title: "Error",
            text: "Login failed",
            icon: "error",
            customClass: { confirmButton: "custom-swal-button" },
          });
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Google login failed. Please try again.";
        setFormErrors({ general: errorMessage });
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          customClass: { confirmButton: "custom-swal-button" },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFacebook = async (fbRes) => {
    if (!fbRes || !fbRes.accessToken) {
      setFormErrors({ general: "Facebook login was cancelled or failed." });
      Swal.fire({
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
        deviceToken: localStorage.getItem("clientToken"),
        ipAddress,
        deviceName: "Web app",
      };
      const res = await apiPost("/openauth/facebook", payload);
      Swal.fire({
        title: "Success",
        text: "Facebook login successful!",
        icon: "success",
        customClass: { confirmButton: "custom-swal-button" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      dispatch({ type: "SIGN_IN", payload: res });
      dispatch(fetchUserProfile(res.jwtToken));
      if (res.jwtToken) {
        localStorage.setItem("IpAddress", ipAddress);
        history.push(redirectTo);
      } else {
        setFormErrors({ general: "Facebook login failed." });
        Swal.fire({
          title: "Error",
          text: "Facebook login failed",
          icon: "error",
          customClass: { confirmButton: "custom-swal-button" },
        });
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        "Facebook login failed. Please try again.";
      setFormErrors({ general: errorMessage });
      Swal.fire({
        title: "Error",
        text: errorMessage,
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
    <SectionWrapper id="sample-result">
      <TwoColGrid>
        {/* Login Card */}
        <LoginCard style={{ position: "relative" }}>
          {loading && (
            <SpinnerOverlay>
              <Spinner />
            </SpinnerOverlay>
          )}
          <LoginCardTitle>Login / Continue</LoginCardTitle>
          <LoginCardSub>
            Sign in or continue to start your verification.
          </LoginCardSub>
          <form onSubmit={handleSignIn}>
            <LoginLayout>
              <SSOCol>
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
                  <FcGoogle /> Continue with Google
                </SSOButton>
                <FacebookLogin
                  appId="541710452150170"
                  autoLoad={false}
                  fields="name,picture"
                  scope="public_profile"
                  callback={handleFacebook}
                  render={(renderProps) => (
                    <SSOButton type="button" onClick={renderProps.onClick}>
                      <FaFacebook color="#1877F2" /> Continue with Facebook
                    </SSOButton>
                  )}
                />
              </SSOCol>
              <Divider>OR</Divider>
              <FormCol>
                {formErrors.general && (
                  <ErrorAlert>{formErrors.general}</ErrorAlert>
                )}
                <div>
                  <FormLabel>Email address</FormLabel>
                  <FormInput
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <ErrorAlert>{formErrors.email}</ErrorAlert>
                  )}
                </div>
                <div>
                  <FormLabel>Password</FormLabel>
                  <PasswordWrapper>
                    <FormInput
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
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
                </div>
                <FormRow>
                  <RememberLabel>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />{" "}
                    Remember me
                  </RememberLabel>
                  <ForgotLink to="/forgot-password">
                    Forgot password?
                  </ForgotLink>
                </FormRow>
                <ReCAPTCHA
                  sitekey="6LdDLJEpAAAAAH4yHx5GfRDcvHzvaKkwx6fMtTdT"
                  onChange={() => setIsCaptchaVerified(true)}
                  style={{ marginBottom: 4 }}
                />
                <LoginBtn type="submit" disabled={!isCaptchaVerified}>
                  Login
                </LoginBtn>
                <RegisterText>
                  Don't have an account?{" "}
                  <Link to="/individual/sign-up/1">Register here</Link>
                </RegisterText>
              </FormCol>
            </LoginLayout>
          </form>
        </LoginCard>

        {/* Sample Result Card */}
        <SampleCard>
          <SampleHeader>
            <SampleCardTitle>Sample result</SampleCardTitle>
            <SampleBadge>This is a sample only</SampleBadge>
          </SampleHeader>
          <SampleCardSub>
            See an example of a phone number verification result.
          </SampleCardSub>
          <ResultCard>
            <ResultTop>
              <PhoneIcon>
                <img src={phoneSampleAvatar} alt="Sample person" />
              </PhoneIcon>
              <ResultGrid>
                <ResultField>
                  <ResultLabel>Full Name</ResultLabel>
                  <ResultValue>ADAOBI CHIOMA NWOSU</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Phone Number</ResultLabel>
                  <ResultValue>08032222222</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>NIN</ResultLabel>
                  <ResultValue>12345678910</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Verification Status</ResultLabel>
                  <VerifiedBadge>
                    VERIFIED <FaCheckCircle />
                  </VerifiedBadge>
                </ResultField>
                <ResultField>
                  <ResultLabel>Date of Birth</ResultLabel>
                  <ResultValue>08-03-1994</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Gender</ResultLabel>
                  <ResultValue>Female</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Birth Country</ResultLabel>
                  <ResultValue>Nigeria</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Residence Address</ResultLabel>
                  <ResultValue>7 OKAFOR CLOSE, FESTAC TOWN</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Next of Kin Full Name</ResultLabel>
                  <ResultValue>CHUKWUEMEKA</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Next of Kin Middle Name</ResultLabel>
                  <ResultValue>TOCHUKWU</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Next of Kin Town</ResultLabel>
                  <ResultValue>ONITSHA</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Next of Kin LGA</ResultLabel>
                  <ResultValue>Onitsha North</ResultValue>
                </ResultField>
                <ResultField>
                  <ResultLabel>Next of Kin Address</ResultLabel>
                  <ResultValue>15 MARKET ROAD, ONITSHA</ResultValue>
                </ResultField>
              </ResultGrid>
            </ResultTop>
            <ResultFooter>
              <span>Verified on 25 May 2025, 12:45 PM</span>
              <span>Ref: ECPH202505251245ABC0</span>
            </ResultFooter>
          </ResultCard>
          <ResultDisclaimer>
            <FaInfoCircle />
            Results are based on data available at the time of verification.
          </ResultDisclaimer>
        </SampleCard>
      </TwoColGrid>
    </SectionWrapper>
  );
};

export default PhoneLoginSample;
