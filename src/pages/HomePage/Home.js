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
import heroImg from "../../images/kenya.png";
import ndprImg from "../../images/ndpr.png";
import nimcImg from "../../images/nidologo.png";
import osiaImg from "../../images/osia.png";
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
  ServiceIcon,
  ServiceName,
  ServiceDesc,
  ServicePrice,
  FeatureList,
  FeatureItem,
  ServiceBtn,
  LearnMoreLink,
  ViewAllLink,
  ComplianceSection,
  ComplianceInner,
  ComplianceText,
  ComplianceTitle,
  ComplianceDesc,
  ComplianceLogos,
  ComplianceBadge,
  CtaSection,
  CtaInner,
  CtaShield,
  CtaContent,
  CtaTitle,
  CtaDesc,
  CtaButton,
} from "./HomePage.elements";
const { useToken } = theme;

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const Home = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [servicePrices, setServicePrices] = useState(null);
  const [language, setLanguage] = useState(getLanguage);
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;
  const ninVerify = useAuthRedirect("/verify/nin");
  const alienCardVerify = useAuthRedirect("/verify/alien");
  const vehicleVerify = useAuthRedirect("/verify/vehicle");

  useEffect(() => {
    const fetchIpAndCountry = async () => {
      // ============================================================
      //  🧪 TODO: TESTING OVERRIDE - Uncomment to use static IP/Country
      // ============================================================
      // When uncommented, bypasses all IP detection APIs
      // Comment out this entire section for normal operation
      // ============================================================
      const testIp = "41.212.86.175"; // Kenya IP
      const testCountry = "KE"; // Kenya
      const testCurrency = "KES"; // Kenyan Shilling
      // For testing USD pricing, use:
      // const testIp = "8.8.8.8";           // US IP
      // const testCountry = "US";           // United States
      // const testCurrency = "USD";         // US Dollar
      setIpAddress(testIp);
      setUserCountry(testCountry);
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
        const country = response.data.country;
        setUserCountry(country);
        localStorage.setItem("userCountry", country); // Store country in localStorage for other pages
        const currency = country === "KE" ? "KES" : "USD";
        localStorage.setItem("currencyCheck", currency);
        return;
      } catch (error1) {
        console.error("Error fetching from ipapi.co:", error1);
      }

      // Fallback to ipbase.com for IP and country
      try {
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        const ip = response.data.ip;
        const country = response.data.country_code || response.data.countryCode;
        setIpAddress(ip);
        localStorage.setItem("IpAddress", ip);
        if (country) {
          setUserCountry(country);
          localStorage.setItem("userCountry", country);
          const currency = country === "KE" ? "KES" : "USD";
          localStorage.setItem("currencyCheck", currency);
        }
        return;
      } catch (error2) {
        console.error("Error fetching IP from both sources:", error2);
        // Both APIs failed - use default Kenya IP and country
        const defaultIp = "41.212.86.175";
        const defaultCountry = "KE";
        const defaultCurrency = "KES";
        setIpAddress(defaultIp);
        setUserCountry(defaultCountry);
        localStorage.setItem("IpAddress", defaultIp);
        localStorage.setItem("userCountry", defaultCountry);
        localStorage.setItem("currencyCheck", defaultCurrency);
      }
    };

    fetchIpAndCountry();
  }, []);

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  useEffect(() => {
    const fetchServicePrices = async () => {
      try {
        const response = await apiGet("/africa/countries/KE/service-prices");
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

  // Determine currency: KES if in Kenya, USD otherwise
  // Priority: IP-detected country > localStorage > Redux user currency
  const currencyCheck =
    userCountry === "KE"
      ? "KES"
      : localStorage.getItem("currencyCheck") || "KES";
  const isKES = currencyCheck === "KES";
  const currencySymbol = isKES ? "KSh" : "$";

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const ctaLink = isAuthenticated
    ? "/dashboard"
    : "/verification-login?redirect=/verify/nin";
  const isSw = language === "SW";

  return (
    <>
      {/* ── Hero ── */}
      <HeroWrapper>
        <HeroBgImage src={heroImg} alt="e-citizen verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              {isSw
                ? "Thibitisha utambulisho wako nchini"
                : "Verify your identity in"}{" "}
              <span
                style={{
                  color: "#D80111",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                Kenya.{" "}
              </span>
              {isSw
                ? "Haraka, salama na ya kuaminika."
                : "Fast, secure and trusted."}
            </HeroTitle>
            <HeroSubtitle>
              {isSw
                ? "Huduma rasmi za uthibitishaji wa utambulisho kwa watu binafsi na biashara kote Kenya na diaspora."
                : "Official identity verification for individuals and businesses across Kenya and the diaspora."}
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
                {isSw
                  ? "Thibitisha Kitambulisho cha Taifa"
                  : "Verify National ID"}{" "}
                <FaArrowRight />
              </PrimaryBtn>
            </HeroButtons>
            <HeroButtons>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {isSw ? "Thibitisha Alien Card" : "Verify Alien Card"}{" "}
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
                {isSw ? "Kagua VIN" : "Check VIN"} <FaArrowRight />
              </PrimaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>
                    {isSw ? "Salama kwa 100%" : "100% Secure"}
                  </TrustTitle>
                  <TrustDesc>
                    {isSw
                      ? "Taarifa zako zinalindwa"
                      : "Your data is protected"}
                  </TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>
                    {isSw ? "Matokeo ya Haraka" : "Instant Results"}
                  </TrustTitle>
                  <TrustDesc>
                    {isSw ? "Matokeo ndani ya sekunde" : "Results in seconds"}
                  </TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>
                    {isSw ? "Inazingatia Serikali" : "Government Compliant"}
                  </TrustTitle>
                  <TrustDesc>
                    {isSw
                      ? "Rekodi rasmi na za kuaminika"
                      : "Official & reliable records"}
                  </TrustDesc>
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
              {isSw
                ? "Jiunge na Wakenya zaidi ya 500,000 wanaoamini e-raia"
                : "Join 500,000+ Kenyans who trust e-raia"}
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <HeroStrip aria-hidden="true" />

      {/* ── How It Works ── */}
      <HowSection id="how-it-works">
        <SectionHeading>
          {isSw ? "Inavyofanya kazi" : "How it works"}
        </SectionHeading>
        <SectionSub>
          {isSw
            ? "Thibitishwa kwa hatua 3 rahisi"
            : "Get verified in just 3 simple steps"}
        </SectionSub>
        <StepsRow>
          <StepCard>
            <StepTop>
              <StepNumber>1</StepNumber>
              <StepIconBox>
                <FaIdCard />
              </StepIconBox>
            </StepTop>
            <StepName>{isSw ? "Chagua huduma" : "Choose a service"}</StepName>
            <StepDesc>
              {isSw
                ? "Chagua Kitambulisho cha Taifa au Uthibitishaji wa VIN."
                : "Select National ID or VIN Verification."}
            </StepDesc>
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
            <StepName>{isSw ? "Wasilisha taarifa" : "Submit details"}</StepName>
            <StepDesc>
              {isSw
                ? "Ingiza taarifa zinazohitajika kwa usalama."
                : "Enter required information securely."}
            </StepDesc>
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
            <StepName>{isSw ? "Pata matokeo" : "Get results"}</StepName>
            <StepDesc>
              {isSw
                ? "Pokea matokeo ya uthibitishaji mara moja."
                : "Receive instant verification results."}
            </StepDesc>
          </StepCard>
        </StepsRow>
      </HowSection>

      {/* ── Service Cards ── */}
      <ServicesSection id="services">
        <SectionHeading>
          {isSw
            ? "Chagua uthibitishaji unaokufaa"
            : "Choose the verification that fits your needs"}
        </SectionHeading>
        <SectionSub>
          {isSw
            ? "Huduma za uthibitishaji wa haraka, salama na za kuaminika kwa watu binafsi na biashara."
            : "Fast, reliable and secure verification services for individuals and businesses."}
        </SectionSub>

        <CardsGrid>
          {/* Person Identity */}
          <ServiceCard>
            <ServiceIcon>
              <FaUser />
            </ServiceIcon>
            <ServiceName>
              {isSw
                ? "Uthibitishaji wa Kitambulisho cha Taifa"
                : "National ID Verification"}
            </ServiceName>
            <ServiceDesc>
              {isSw
                ? "Thibitisha taarifa za Kitambulisho cha Taifa cha Kenya kwa wakati halisi."
                : "Verify Kenya National Identity Card details in real-time."}
            </ServiceDesc>
            <ServicePrice>
              {(() => {
                const s = Array.isArray(servicePrices)
                  ? servicePrices.find((x) => x.service === "National ID")
                  : null;
                if (!s) return `${currencySymbol}—`;
                if (isKES)
                  return `${currencySymbol}${Number(s.price).toLocaleString()}`;
                return `${currencySymbol}${Number(s.price2 || s.price_usd || s.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
              })()}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw
                  ? "Utafutaji wa Kitambulisho cha Taifa"
                  : "National ID lookup"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw
                  ? "Uthibitishaji wa jina kamili"
                  : "Full name verification"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw
                  ? "Uthibitishaji wa picha ya kitambulisho"
                  : "Photo ID verification"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw ? "Matokeo ndani ya dakika" : "Results in minutes"}
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={ninVerify}>
              {isSw ? "Thibitisha Sasa" : "Verify Now"}
            </ServiceBtn>
            <LearnMoreLink to="/nin-verification">
              {isSw ? "Jifunze zaidi" : "Learn more"}{" "}
              <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* Alien Card Verification */}
          <ServiceCard>
            <ServiceIcon>
              <FaIdCard />
            </ServiceIcon>
            <ServiceName>
              {isSw ? "Uthibitishaji wa Alien Card" : "Alien Card Verification"}
            </ServiceName>
            <ServiceDesc>
              {isSw
                ? "Thibitisha taarifa za Alien Card ya Kenya haraka na kwa usalama."
                : "Verify Kenya Alien Card details quickly and securely."}
            </ServiceDesc>
            <ServicePrice>
              {(() => {
                const s = Array.isArray(servicePrices)
                  ? servicePrices.find((x) => x.service === "Alien Card")
                  : null;
                if (!s) return `${currencySymbol}—`;
                if (isKES)
                  return `${currencySymbol}${Number(s.price).toLocaleString()}`;
                return `${currencySymbol}${Number(s.price2 || s.price_usd || s.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
              })()}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw ? "Utafutaji wa Alien Card" : "Alien Card lookup"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw
                  ? "Uthibitishaji wa jina la mmiliki"
                  : "Holder name validation"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw ? "Ukaguzi wa hali ya hati" : "Document status check"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {isSw ? "Matokeo ya haraka" : "Fast results"}
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={alienCardVerify}>
              {isSw ? "Thibitisha Sasa" : "Verify Now"}
            </ServiceBtn>
            <LearnMoreLink to="/nin-verification">
              {isSw ? "Jifunze zaidi" : "Learn more"}{" "}
              <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* VIN Verification */}
          <ServiceCard>
            <ServiceIcon>
              <FaCar />
            </ServiceIcon>
            <ServiceName>
              {isSw ? "Uthibitishaji wa VIN" : "VIN Verification"}
            </ServiceName>
            <ServiceDesc>
              {isSw
                ? "Thibitisha nambari ya utambulisho wa gari na taarifa zake."
                : "Verify vehicle identification number and details."}
            </ServiceDesc>
            <ServicePrice>
              {(() => {
                const s = Array.isArray(servicePrices)
                  ? servicePrices.find((x) => x.service === "VIN")
                  : null;
                if (!s) return `${currencySymbol}—`;
                if (isKES)
                  return `${currencySymbol}${Number(s.price).toLocaleString()}`;
                return `${currencySymbol}${Number(s.price2 || s.price_usd || s.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
              })()}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> {isSw ? "Utafutaji wa VIN" : "VIN lookup"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {isSw ? "Taarifa za gari" : "Vehicle details"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw ? "Historia ya umiliki" : "Ownership history"}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle />{" "}
                {isSw ? "Matokeo ndani ya dakika" : "Results in minutes"}
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={vehicleVerify}>
              {isSw ? "Thibitisha Sasa" : "Verify Now"}
            </ServiceBtn>
            <LearnMoreLink to="/vehicle-verification">
              {isSw ? "Jifunze zaidi" : "Learn more"}{" "}
              <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>
        </CardsGrid>
      </ServicesSection>

      <NinLoginSample />

      {/* ── Compliance ── */}
      <ComplianceSection>
        <ComplianceInner>
          <ComplianceText>
            <ComplianceTitle>
              {isSw
                ? "Unaaminika. Unafuata sheria. Umejengwa kwa ajili yako."
                : "Trusted. Compliant. Built for you."}
            </ComplianceTitle>
            <ComplianceDesc>
              {isSw
                ? "Taarifa zako ziko salama nasi."
                : "Your data is safe with us."}
            </ComplianceDesc>
          </ComplianceText>
          <ComplianceLogos>
            <ComplianceBadge>
              <img src={ndprImg} alt="NDPC" />
            </ComplianceBadge>
            <ComplianceBadge>
              <img src={nimcImg} alt="NCMC" style={{ maxHeight: 48 }} />
            </ComplianceBadge>
            <ComplianceBadge>
              <img src={osiaImg} alt="OSIA" style={{ maxHeight: 48 }} />
            </ComplianceBadge>
          </ComplianceLogos>
        </ComplianceInner>
      </ComplianceSection>

      {/* ── CTA ── */}
      <CtaSection>
        <CtaInner>
          <CtaShield>
            <FaCheckCircle />
          </CtaShield>
          <CtaContent>
            <CtaTitle>
              {isSw ? "Uko tayari kuthibitishwa?" : "Ready to get verified?"}
            </CtaTitle>
            <CtaDesc>
              {isSw
                ? "Jiunge na maelfu ya Wakenya wanaoiamini e-raia kwa mahitaji yao ya uthibitishaji."
                : "Join thousands of Kenyans who trust e-raia for their verification needs."}
            </CtaDesc>
          </CtaContent>
          <CtaButton to={ctaLink}>
            {isSw ? "Anza Sasa" : "Get Started Now"}
          </CtaButton>
        </CtaInner>
      </CtaSection>

      <div style={{ height: 40 }} />
      <NewsletterSection visible={false} onClose={() => {}} />
    </>
  );
};

export default Home;
