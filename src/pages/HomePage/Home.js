import React, { useEffect, useState } from "react";
import NewsletterSection from "../../components/newsletter/newsLetterSection";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { signIn, fetchUserProfile, logout } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
import { apiGet, apiPost, apiPostInternalCall } from "../../apiUtils";
import {
  FaArrowRight,
  FaLock,
  FaBolt,
  FaShieldAlt,
  FaUser,
  FaCar,
  FaCheckCircle,
  FaPlayCircle,
  FaIdCard,
  FaUpload,
} from "react-icons/fa";
import NinLoginSample from "../NinLanding/NinLoginSample";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import heroImg from "../../images/ghana.png";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
import avatar3 from "../../images/avatar3.jpg";
import avatar4 from "../../images/avatar4.jpg";

import {
  HeroWrapper,
  HeroStrip,
  HeroBgImage,
  HeroContainer,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryBtn,
  SecondaryBtn,
  TrustIndicators,
  TrustItem,
  TrustIcon,
  TrustLabel,
  TrustTitle,
  TrustDesc,
  SocialProof,
  AvatarStack,
  Stars,
  HowSection,
  SectionHeading,
  SectionSub,
  StepsRow,
  StepCard,
  StepTop,
  StepNumber,
  StepIconBox,
  StepName,
  StepDesc,
  StepArrow,
  ServicesSection,
  CardsGrid,
  ServiceCard,
  PopularBadge,
  ServiceIcon,
  ServiceName,
  ServiceDesc,
  ServicePrice,
  FeatureList,
  FeatureItem,
  ServiceBtn,
  LearnMoreLink,
  ViewAllLink,
  CtaSection,
  CtaInner,
  CtaShield,
  CtaContent,
  CtaTitle,
  CtaDesc,
  CtaButton,
} from "./HomePage.elements";
const { useToken } = theme;

// Fallback IP (Ghana) used when both IP lookups fail so login still works
const DEFAULT_GHANA_IP = "102.131.16.255";

const Home = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [ipCountry, setIpCountry] = useState(null);
  const [servicePrices, setServicePrices] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;
  const ninVerify = useAuthRedirect("/verify/nin");
  const vehicleVerify = useAuthRedirect("/verify/vehicle");

  // Get user country from IP to show correct pricing
  useEffect(() => {
    const fetchIpInfo = async () => {
      // ============================================================
      // 🧪 TESTING OVERRIDE - Uncomment to use static IP/Country
      // ============================================================
      // When uncommented, bypasses all IP detection APIs
      // Comment out this entire section for normal operation
      // ============================================================
      const testIp = "102.131.16.255"; // Ghana IP
      const testCountry = "GH"; // Ghana
      const testCurrency = "GHS"; // Ghanaian Cedi
      // For testing USD pricing, use:
      // const testIp = "8.8.8.8";           // US IP
      // const testCountry = "US";           // United States
      // const testCurrency = "USD";         // US Dollar
      setIpAddress(testIp);
      setIpCountry(testCountry);
      localStorage.setItem("IpAddress", testIp);
      localStorage.setItem("userCountry", testCountry);
      localStorage.setItem("currencyCheck", testCurrency);
      console.log(
        "🧪 Using test IP/Country:",
        testIp,
        testCountry,
        testCurrency,
      );
      return;
      // ============================================================

      // Try ipapi.co first — returns IP + country info in one call
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIpAddress(response.data.ip);
        localStorage.setItem("IpAddress", response.data.ip);
        const country =
          response.data.country_code || response.data.country || null;
        setIpCountry(country);
        localStorage.setItem("userCountry", country || ""); // Store country in localStorage for other pages
        const currency = country === "GH" ? "GHS" : "USD";
        localStorage.setItem("currencyCheck", currency);
        return;
      } catch (error1) {
        console.error("Error fetching IP info from ipapi.co:", error1);
      }

      // Fallback to ipbase.com for IP and country
      try {
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        const ip = response.data.ip;
        const country = response.data.country_code || response.data.countryCode;
        setIpAddress(ip);
        localStorage.setItem("IpAddress", ip);
        if (country) {
          setIpCountry(country);
          localStorage.setItem("userCountry", country);
          const currency = country === "GH" ? "GHS" : "USD";
          localStorage.setItem("currencyCheck", currency);
        }
        return;
      } catch (error2) {
        console.error("Error fetching IP from both sources:", error2);
        // Both APIs failed - use default Ghana IP and country
        const defaultIp = "102.131.16.255";
        const defaultCountry = "GH";
        const defaultCurrency = "GHS";
        setIpAddress(defaultIp);
        setIpCountry(defaultCountry);
        localStorage.setItem("IpAddress", defaultIp);
        localStorage.setItem("userCountry", defaultCountry);
        localStorage.setItem("currencyCheck", defaultCurrency);
      }
    };

    fetchIpInfo();
  }, []);

  useEffect(() => {
    const fetchServicePrices = async () => {
      try {
        const response = await apiGet("/africa/countries/GH/service-prices");
        const services = response.data?.data || response.data || response;
        setServicePrices(services);
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchServicePrices();
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const payload = {
          accessToken: response.access_token,
          deviceToken: localStorage.getItem("clientToken"),
          ipAddress: ipAddress || DEFAULT_GHANA_IP,
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
          localStorage.setItem("IpAddress", ipAddress || DEFAULT_GHANA_IP);
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
        }
      } catch (error) {
        console.error("Google login failed:", error);

        let errorMessage = "Google login failed. Please try again.";

        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.request) {
          console.error("No response received from server:", error.request);
          errorMessage = "Network error. Please check your connection.";
        } else {
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
    // Add onError to handle potential issues with the popup itself, though less common for blocking.
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
      // This onError might catch some initial errors before the popup opens or if there's
      // an issue with the Google API configuration, but not directly a popup block.
    },
    // IMPORTANT: For redirect flow, you typically set 'flow: "auth-code"' and handle it differently.
    // However, if you want a redirect fallback for a *blocked popup*, you'd initiate the redirect yourself.
    // For a pure redirect flow, use 'flow: "popup"'. You would then send the code to your backend.
    // For this scenario, we're relying on the `login()` function's default popup behavior,
    // and falling back to a redirect if that specific popup fails.
  });

  useEffect(() => {
    const loadGoogleOneTap = () => {
      if (window.google && window.google.accounts?.id) {
        window.google.accounts.id.disableAutoSelect(); // ⛔ reset for dev

        window.google.accounts.id.initialize({
          client_id:
            "642042384169-d0uquoka9qll83ucfm8ck7esdvptknls.apps.googleusercontent.com",
          callback: (credentialResponse) => {
            login();
          },
          auto_select: true,
          cancel_on_tap_outside: false,
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.warn(
              "⚠️ One Tap not displayed:",
              notification.getNotDisplayedReason(),
            );
            // Check specifically if the reason is 'popup_blocked'
            if (notification.getNotDisplayedReason() === "popup_blocked") {
              console.log(
                "Popup blocked. Initiating redirect for Google login.",
              );
              // Trigger Google login via redirect flow
              // This is the key change: manually construct the redirect URL
              const redirectUri = window.location.origin; // Or a specific redirect URL configured in your Google Cloud Console
              const authUrl =
                `https://accounts.google.com/o/oauth2/v2/auth?` +
                `client_id=${"642042384169-d0uquoka9qll83ucfm8ck7esdvptknls.apps.googleusercontent.com"}&` +
                `response_type=code&` + // Request an authorization code
                `scope=openid%20profile%20email&` + // Required scopes
                `redirect_uri=${encodeURIComponent(redirectUri)}&` +
                `access_type=offline&` + // If you need a refresh token
                `prompt=consent%20select_account`; // Force user to select account and consent

              window.location.href = authUrl; // Redirect the user
            }
          }
          if (notification.isSkippedMoment()) {
            console.warn(
              "⚠️ One Tap skipped:",
              notification.getSkippedReason(),
            );
          }
          if (notification.isDismissedMoment()) {
            console.warn(
              "⚠️ One Tap dismissed:",
              notification.getDismissedReason(),
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

  // If you decide to handle the ID token from One Tap directly (Recommended for One Tap)
  // const handleOneTapCredential = async (idToken) => {
  //   try {
  //     const payload = {
  //       idToken: idToken, // Send the ID token directly
  //       deviceToken: localStorage.getItem("clientToken"),
  //       ipAddress: ipAddress,
  //       deviceName: "Web app",
  //     };
  //     const res = await apiPost(`/openauth/google-one-tap-login`, payload); // New backend endpoint for ID token
  //     // ... rest of your success logic (Swal, Redux dispatch, history.push)
  //   } catch (error) {
  //     console.error("One Tap login failed:", error);
  //     // ... error handling
  //   }
  // };

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const ctaLink = isAuthenticated
    ? "/dashboard"
    : "/verification-login?redirect=/verify/nin";

  const formatPrice = (serviceName) => {
    const s = Array.isArray(servicePrices)
      ? servicePrices.find((x) => x.service === serviceName)
      : null;
    if (!s) return "—";
    const isGhana = ipCountry === "GH";
    if (isGhana) {
      return s?.price ? `GH₵${Number(s.price).toLocaleString()}` : "GH₵—";
    } else {
      return s?.price2 ? `$${Number(s.price2).toLocaleString()}` : "$—";
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <HeroWrapper>
        <HeroBgImage src={heroImg} alt="e-citizen verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              Verify your identity in Ghana.{" "}
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                Fast
              </span>
              ,{" "}
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                secure
              </span>
              {" and "}
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                trusted
              </span>
              .
            </HeroTitle>
            <HeroSubtitle>
              Official identity verification services for individuals and
              businesses across Ghana and the diaspora.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Verify Ghana ID
                <FaArrowRight />
              </PrimaryBtn>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Check VIN <FaArrowRight />
              </PrimaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>100% Secure</TrustTitle>
                  <TrustDesc>Your data is protected</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Instand Results</TrustTitle>
                  <TrustDesc>Results in seconds</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Government Compliant</TrustTitle>
                  <TrustDesc>Official & reliable records</TrustDesc>
                </TrustLabel>
              </TrustItem>
            </TrustIndicators>
            <SocialProof>
              <AvatarStack>
                <img src={avatar1} alt="user" />
                <img src={avatar2} alt="user" />
                <img src={avatar3} alt="user" />
                <img src={avatar4} alt="user" />
              </AvatarStack>
              4.8/5 from 8,000+ reviews
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <HeroStrip aria-hidden="true" />

      {/* ── How It Works ── */}
      <HowSection id="how-it-works">
        <SectionHeading>How it works</SectionHeading>
        <SectionSub>Get verified in just 3 simple steps</SectionSub>
        <StepsRow>
          <StepCard>
            <StepTop>
              <StepNumber>1</StepNumber>
              <StepIconBox>
                <FaIdCard />
              </StepIconBox>
            </StepTop>
            <StepName>Choose a service</StepName>
            <StepDesc>Select Ghana ID or VIN Verification</StepDesc>
          </StepCard>
          <StepArrow>
            <FaArrowRight />
          </StepArrow>
          <StepCard>
            <StepTop>
              <StepNumber>2</StepNumber>
              <StepIconBox>
                <FaUpload />
              </StepIconBox>
            </StepTop>
            <StepName>Submit details</StepName>
            <StepDesc>Enter required information securely</StepDesc>
          </StepCard>
          <StepArrow>
            <FaArrowRight />
          </StepArrow>
          <StepCard>
            <StepTop>
              <StepNumber>3</StepNumber>
              <StepIconBox>
                <FaShieldAlt />
              </StepIconBox>
            </StepTop>
            <StepName>Get results</StepName>
            <StepDesc>Receive instant verification results.</StepDesc>
          </StepCard>
        </StepsRow>
      </HowSection>

      {/* ── Service Cards ── */}
      <ServicesSection id="services">
        <SectionHeading>
          Choose the verification that fits your needs
        </SectionHeading>
        <SectionSub>
          Simple, transparent pricing Affordable rates for everyone.
        </SectionSub>

        <CardsGrid>
          {/* Person Identity */}
          <ServiceCard>
            <ServiceIcon>
              <FaUser />
            </ServiceIcon>
            <ServiceName>Ghana ID Card</ServiceName>
            <ServiceDesc>
              Verify Ghana National Identity Card details in real-time.
            </ServiceDesc>
            <ServicePrice>{formatPrice("ID Card")}</ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Ghana ID lookup
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Full name verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Photo ID verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in seconds
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={ninVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/nin-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* VIN Verification */}
          <ServiceCard>
            <ServiceIcon>
              <FaCar />
            </ServiceIcon>
            <ServiceName>VIN Verification</ServiceName>
            <ServiceDesc>
              Verify vehicle identification number and details.
            </ServiceDesc>
            <ServicePrice>{formatPrice("VIN")}</ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> VIN lookup
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Vehicle details
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Ownership history
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in seconds
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={vehicleVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/vehicle-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>
        </CardsGrid>
      </ServicesSection>

      <NinLoginSample />

      <ComplianceBar />

      {/* ── CTA ── */}
      <CtaSection>
        <CtaInner>
          <CtaShield>
            <FaCheckCircle />
          </CtaShield>
          <CtaContent>
            <CtaTitle>Ready to get verified?</CtaTitle>
            <CtaDesc>
              Join thousands of Nigerians who trust e-citizen for their
              verification needs.
            </CtaDesc>
          </CtaContent>
          <CtaButton to={ctaLink}>Get Started Now</CtaButton>
        </CtaInner>
      </CtaSection>

      <div style={{ height: 40 }} />
      <NewsletterSection visible={false} onClose={() => {}} />
    </>
  );
};

export default Home;
