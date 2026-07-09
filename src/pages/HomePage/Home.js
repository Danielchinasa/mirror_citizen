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
import { apiPost, apiPostInternalCall } from "../../apiUtils";
import {
  FaArrowRight,
  FaLock,
  FaBolt,
  FaShieldAlt,
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaCar,
  FaPhoneAlt,
  FaCheckCircle,
  FaPlayCircle,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import heroImg from "../../images/Hero_image_new.png";
import ndprImg from "../../images/ndpr.png";
import nimcImg from "../../images/nidologo.png";
import osiaImg from "../../images/osia.png";
import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
import avatar3 from "../../images/avatar3.jpg";
import avatar4 from "../../images/avatar4.jpg";

import {
  HeroWrapper,
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

const Home = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [servicePrices, setServicePrices] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;
  const ninVerify = useAuthRedirect("/verify/nin");
  const businessVerify = useAuthRedirect("/verify/business");
  const bvnVerify = useAuthRedirect("/verify/bvn");
  const vehicleVerify = useAuthRedirect("/verify/vehicle");
  const phoneVerify = useAuthRedirect("/verify/phone");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipbase.com/v1/json/");
        setIpAddress(response.data.ip);
      } catch (error1) {
        console.error("Error fetching IP address from primary URL:", error1);
        try {
          const response = await axios.get("https://ipapi.co/json/");
          setIpAddress(response.data.ip);
        } catch (error2) {
          console.error(
            "Error fetching IP address from secondary URL:",
            error2,
          );
          setIpAddress(null);
        }
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (!ipAddress) return;
    const fetchServicePrices = async () => {
      try {
        const data = await apiPost("/transaction/public/service-prices", {
          ipAddress,
        });
        setServicePrices(data);
      } catch (error) {
        console.error("Failed to fetch service prices:", error);
      }
    };
    fetchServicePrices();
  }, [ipAddress]);

  const detectedCurrency = servicePrices?.data?.[0]?.currency || "NGN";
  const priceCurrencySymbol =
    detectedCurrency.toUpperCase() === "NGN" ? "₦" : "$";

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
  const ctaLink = isAuthenticated ? "/dashboard" : "/login";

  return (
    <>
      {/* ── Hero ── */}
      <HeroWrapper>
        <HeroBgImage src={heroImg} alt="e-citizen verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>FAST. SECURE. TRUSTED.</HeroTag>
            <HeroTitle>
              Choose the verification you need.{" "}
              <span
                style={{
                  color: "#09c93a",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                Get trusted results in seconds.
              </span>
            </HeroTitle>
            <HeroSubtitle>
              Secure, reliable and compliant identity verification for
              individuals and businesses.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("verification-services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Verification <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#how-it-works">
                <FaPlayCircle /> See How It Works
              </SecondaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Secure & Private</TrustTitle>
                  <TrustDesc>Your data is protected</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Fast Results</TrustTitle>
                  <TrustDesc>Results in minutes</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Trusted Platform</TrustTitle>
                  <TrustDesc>Government compliant</TrustDesc>
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
              Join 500,000+ Nigerians who trust e-citizen
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>

      {/* ── How It Works ── */}
      <HowSection id="how-it-works">
        <SectionHeading>How it works</SectionHeading>
        <SectionSub>Get verified in just 3 simple steps</SectionSub>
        <StepsRow>
          <StepCard>
            <StepTop>
              <StepNumber>1</StepNumber>
              <StepIconBox>
                <FaUsers />
              </StepIconBox>
            </StepTop>
            <StepName>Choose a service</StepName>
            <StepDesc>Select the type of verification you need</StepDesc>
          </StepCard>
          <StepArrow>
            <FaArrowRight />
          </StepArrow>
          <StepCard>
            <StepTop>
              <StepNumber>2</StepNumber>
              <StepIconBox>
                <FaFileAlt />
              </StepIconBox>
            </StepTop>
            <StepName>Provide your information</StepName>
            <StepDesc>
              Fill in your details and upload required documents
            </StepDesc>
          </StepCard>
          <StepArrow>
            <FaArrowRight />
          </StepArrow>
          <StepCard>
            <StepTop>
              <StepNumber>3</StepNumber>
              <StepIconBox>
                <FaCheckCircle />
              </StepIconBox>
            </StepTop>
            <StepName>Get trusted results</StepName>
            <StepDesc>
              Make payment and receive your results in minutes
            </StepDesc>
          </StepCard>
        </StepsRow>
      </HowSection>

      {/* ── Service Cards ── */}
      <ServicesSection id="verification-services">
        <SectionHeading>
          Choose the verification that fits your needs
        </SectionHeading>
        <SectionSub>
          Fast, reliable and secure verification services for individuals and
          businesses.
        </SectionSub>

        <CardsGrid>
          {/* Person Identity */}
          <ServiceCard>
            <ServiceIcon>
              <FaUser />
            </ServiceIcon>
            <ServiceName>NIN Verification</ServiceName>
            <ServiceDesc>
              Verify your personal identity with a government-issued ID.
            </ServiceDesc>
            <ServicePrice>
              {servicePrices?.data?.[0]?.serviceFee
                ? `${priceCurrencySymbol}${Number(servicePrices.data[0].serviceFee).toLocaleString()}`
                : `${priceCurrencySymbol}100`}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Full name verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Date of birth verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Photo ID verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in minutes
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={ninVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/nin-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* Business Profile */}
          <ServiceCard>
            <ServiceIcon>
              <FaBuilding />
            </ServiceIcon>
            <ServiceName>Business Profile Verification</ServiceName>
            <ServiceDesc>
              Verify your business information and registration.
            </ServiceDesc>
            <ServicePrice>
              {servicePrices?.data?.[2]?.serviceFee
                ? `${priceCurrencySymbol}${Number(servicePrices.data[2].serviceFee).toLocaleString()}`
                : `${priceCurrencySymbol}100`}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Business registration check
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> CAC verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Owner verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in minutes
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={businessVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/business-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* Financial Credit */}
          <ServiceCard>
            <ServiceIcon>
              <FaCreditCard />
            </ServiceIcon>
            <ServiceName>Financial Credit Verification</ServiceName>
            <ServiceDesc>
              Check credit history and financial standing.
            </ServiceDesc>
            <ServicePrice>
              {servicePrices?.data?.[4]?.serviceFee
                ? `${priceCurrencySymbol}${Number(servicePrices.data[4].serviceFee).toLocaleString()}`
                : `${priceCurrencySymbol}1,700`}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Credit history report
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Debt verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Financial standing
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in minutes
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={bvnVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/credit-profile">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* Vehicle History */}
          <ServiceCard>
            <ServiceIcon>
              <FaCar />
            </ServiceIcon>
            <ServiceName>Vehicle History Verification</ServiceName>
            <ServiceDesc>Verify vehicle history and ownership.</ServiceDesc>
            <ServicePrice>
              {servicePrices?.data?.[5]?.serviceFee
                ? `${priceCurrencySymbol}${Number(servicePrices.data[5].serviceFee).toLocaleString()}`
                : `${priceCurrencySymbol}2,500`}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Ownership verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Accident history
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Theft records check
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in minutes
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={vehicleVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/vehicle-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>

          {/* Phone Number Verification */}
          <ServiceCard>
            <ServiceIcon>
              <FaPhoneAlt />
            </ServiceIcon>
            <ServiceName>Phone Number Verification</ServiceName>
            <ServiceDesc>
              Verify phone number ownership and network details.
            </ServiceDesc>
            <ServicePrice>
              {servicePrices?.data?.[9]?.serviceFee
                ? `${priceCurrencySymbol}${Number(servicePrices.data[9].serviceFee).toLocaleString()}`
                : `${priceCurrencySymbol}100`}
            </ServicePrice>
            <FeatureList>
              <FeatureItem>
                <FaCheckCircle /> Number ownership verification
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Network provider details
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Phone status check
              </FeatureItem>
              <FeatureItem>
                <FaCheckCircle /> Results in minutes
              </FeatureItem>
            </FeatureList>
            <ServiceBtn to={phoneVerify}>Verify Now</ServiceBtn>
            <LearnMoreLink to="/phone-number-verification">
              Learn more <FaArrowRight style={{ fontSize: 11 }} />
            </LearnMoreLink>
          </ServiceCard>
        </CardsGrid>
      </ServicesSection>

      {/* ── Compliance ── */}
      <ComplianceSection>
        <ComplianceInner>
          <ComplianceText>
            <ComplianceTitle>
              Trusted. Compliant. Built for you.
            </ComplianceTitle>
            <ComplianceDesc>Your data is safe with us.</ComplianceDesc>
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
