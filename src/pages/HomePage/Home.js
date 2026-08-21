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
import { useLocale } from "../../components/LocaleProvider";
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
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import heroImg from "../../images/uganda.png";
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
  CtaSection,
  CtaInner,
  CtaShield,
  CtaContent,
  CtaTitle,
  CtaDesc,
  CtaButton,
} from "./HomePage.elements";
const { useToken } = theme;

const Home = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [ipCountry, setIpCountry] = useState(null);
  const [servicePrices, setServicePrices] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { t } = useLocale();
  const { bgContainer, text } = token;
  const ninVerify = useAuthRedirect("/verify/nin");
  const vehicleVerify = useAuthRedirect("/verify/vehicle");

  useEffect(() => {
    const fetchIpAddress = async () => {
      // ═══════════════════════════════════════════════════════════════════
      // 🧪 TESTING SECTION - Uncomment to manually set IP/Country/Currency
      // ═══════════════════════════════════════════════════════════════════
      const testIp = "41.210.160.1"; // Uganda IP
      const testCountry = "UG"; // Uganda country code
      const testCurrency = "UGX"; // Uganda Shilling

      setIpAddress(testIp);
      localStorage.setItem("IpAddress", testIp);
      setIpCountry(testCountry);
      localStorage.setItem("userCountry", testCountry);
      localStorage.setItem("currencyCheck", testCurrency);
      console.log(
        "🧪 TEST MODE: Using manual IP/Country:",
        testIp,
        testCountry,
      );
      return;
      // ═══════════════════════════════════════════════════════════════════

      // Try ipapi.co first (gets IP and country)
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const ip = response.data.ip;
        const country = (
          response.data.country_code ||
          response.data.country ||
          ""
        ).toUpperCase();

        if (ip) {
          localStorage.setItem("IpAddress", ip);
          setIpAddress(ip);
        }

        if (country) {
          localStorage.setItem("userCountry", country);
          setIpCountry(country);
          const currency = country === "UG" ? "UGX" : "USD";
          localStorage.setItem("currencyCheck", currency);
          console.log(
            "✅ IP/Country detected from ipapi.co:",
            ip,
            country,
            currency,
          );
          return;
        }
      } catch (error1) {
        console.error("❌ ipapi.co failed:", error1);
      }

      // Fallback to ipbase.com (also gets IP and country)
      try {
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        const ip = response.data.ip;
        const country = (
          response.data.country_code ||
          response.data.countryCode ||
          ""
        ).toUpperCase();

        if (ip) {
          localStorage.setItem("IpAddress", ip);
          setIpAddress(ip);
        }

        if (country) {
          localStorage.setItem("userCountry", country);
          setIpCountry(country);
          const currency = country === "UG" ? "UGX" : "USD";
          localStorage.setItem("currencyCheck", currency);
          console.log(
            "✅ IP/Country detected from ipbase.com:",
            ip,
            country,
            currency,
          );
          return;
        }
      } catch (error2) {
        console.error("❌ ipbase.com failed:", error2);
      }

      // Both APIs failed - use default Uganda values
      const defaultIp = "41.210.160.1";
      const defaultCountry = "UG";
      const defaultCurrency = "UGX";
      localStorage.setItem("IpAddress", defaultIp);
      localStorage.setItem("userCountry", defaultCountry);
      localStorage.setItem("currencyCheck", defaultCurrency);
      setIpAddress(defaultIp);
      setIpCountry(defaultCountry);
      console.log(
        "⚠️ Both APIs failed - using default Uganda values:",
        defaultIp,
        defaultCountry,
        defaultCurrency,
      );
    };
    fetchIpAddress();
  }, []);

  useEffect(() => {
    const fetchServicePrices = async () => {
      try {
        const response = await apiGet("/africa/countries/UG/service-prices");
        const services = response.data?.data || response.data || response;
        setServicePrices(Array.isArray(services) ? services : null);
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

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const ctaLink = isAuthenticated ? "/main-dashboard" : "/verification-login";

  return (
    <>
      {/* ── Hero ── */}
      <HeroWrapper>
        <HeroBgImage src={heroImg} alt="e-raia verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              {t("home.hero.titlePrefix")} {t("home.hero.titleCountry")}{" "}
              <span
                style={{
                  color: "#DD0201",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {t("home.hero.titleSuffix")}
              </span>
            </HeroTitle>
            <HeroSubtitle>{t("home.hero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("home.hero.verifyNationalId")} <FaArrowRight />
              </PrimaryBtn>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("home.hero.checkVin")} <FaArrowRight />
              </PrimaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("home.trust.secureTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.secureDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("home.trust.instantTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.instantDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("home.trust.compliantTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.compliantDesc")}</TrustDesc>
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
              {t("home.socialProof")}
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <HeroStrip aria-hidden="true" />

      {/* ── How It Works ── */}
      <HowSection id="how-it-works">
        <SectionHeading>{t("home.how.title")}</SectionHeading>
        <SectionSub>{t("home.how.subtitle")}</SectionSub>
        <StepsRow>
          <StepCard>
            <StepTop>
              <StepNumber>1</StepNumber>
              <StepIconBox>
                <FaIdCard />
              </StepIconBox>
            </StepTop>
            <StepName>{t("home.how.step1Name")}</StepName>
            <StepDesc>{t("home.how.step1Desc")}</StepDesc>
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
            <StepName>{t("home.how.step2Name")}</StepName>
            <StepDesc>{t("home.how.step2Desc")}</StepDesc>
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
            <StepName>{t("home.how.step3Name")}</StepName>
            <StepDesc>{t("home.how.step3Desc")}</StepDesc>
          </StepCard>
        </StepsRow>
      </HowSection>

      {/* ── Service Cards ── */}
      <ServicesSection id="services">
        <SectionHeading>{t("home.services.title")}</SectionHeading>
        <SectionSub>{t("home.services.subtitle")}</SectionSub>

        <CardsGrid>
          {/* Person Identity */}
          <ServiceCard>
            <ServiceIcon>
              <FaUser />
            </ServiceIcon>
            <ServiceName>{t("home.services.nin.name")}</ServiceName>
            <ServiceDesc>{t("home.services.nin.desc")}</ServiceDesc>
            <ServicePrice>
              {(() => {
                const isLocal =
                  localStorage.getItem("currencyCheck") === "UGX" ||
                  ipCountry === "UG";
                const s = Array.isArray(servicePrices)
                  ? servicePrices.find((x) => x.service === "National ID")
                  : null;
                if (!s) return isLocal ? "USh —" : "$ —";
                return isLocal
                  ? `USh ${Number(s.price).toLocaleString()}`
                  : `$${Number(s.price2).toFixed(2)}`;
              })()}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.ninLookup")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.fullName")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.photoId")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.resultsMinutes")}
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={ninVerify}>
              {t("home.services.verifyNow")}
            </ServiceBtn>
            <LearnMoreLink to="/nin-verification">
              {t("home.services.learnMore")}{" "}
              <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* VIN Verification */}
          <ServiceCard>
            <ServiceIcon>
              <FaCar />
            </ServiceIcon>
            <ServiceName>{t("home.services.vin.name")}</ServiceName>
            <ServiceDesc>{t("home.services.vin.desc")}</ServiceDesc>
            <ServicePrice>
              {(() => {
                const isLocal =
                  localStorage.getItem("currencyCheck") === "UGX" ||
                  ipCountry === "UG";
                const s = Array.isArray(servicePrices)
                  ? servicePrices.find((x) => x.service === "VIN")
                  : null;
                if (!s) return isLocal ? "USh —" : "$ —";
                return isLocal
                  ? `USh ${Number(s.price).toLocaleString()}`
                  : `$${Number(s.price2).toFixed(2)}`;
              })()}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.vinLookup")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.vehicleDetails")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.ownershipHistory")}
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> {t("home.services.feature.resultsMinutes")}
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={vehicleVerify}>
              {t("home.services.verifyNow")}
            </ServiceBtn>
            <LearnMoreLink to="/vehicle-verification">
              {t("home.services.learnMore")}{" "}
              <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>
        </CardsGrid>
      </ServicesSection>

      <NinLoginSample />

      {/* ── Compliance ── */}
      <ComplianceSection />

      {/* ── CTA ── */}
      <CtaSection>
        <CtaInner>
          <CtaShield>
            <FaCheckCircle />
          </CtaShield>
          <CtaContent>
            <CtaTitle>{t("home.cta.title")}</CtaTitle>
            <CtaDesc>{t("home.cta.desc")}</CtaDesc>
          </CtaContent>
          <CtaButton to={ctaLink}>{t("home.cta.button")}</CtaButton>
        </CtaInner>
      </CtaSection>

      <div style={{ height: 40 }} />
      <NewsletterSection visible={false} onClose={() => {}} />
    </>
  );
};

export default Home;
