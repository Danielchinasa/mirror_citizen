import React, { useState, useEffect } from "react";
import {
  NinNav,
  NinNavbarContainer,
  NinNavMenu,
  NinNavItem,
  NinNavLink,
  NinNavLinkRouter,
  NinCtaButton,
  NinHamburgerIcon,
} from "./NinNavbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Logo from "../../images/e-citizen_logo_ecitizen.png";
import { Link } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../SampleResultPopup/SampleResultPopup";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

function NinNavbar() {
  const [click, setClick] = useState(false);
  const [showSampleResult, setShowSampleResult] = useState(false);
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

  const verifyLink = useAuthRedirect("/verify/nin");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openSampleResult = (event) => {
    event.preventDefault();
    closeMobileMenu();
    setShowSampleResult(true);
  };

  return (
    <>
      <NinNav>
        <NinNavbarContainer>
          <Link to="/nin-verification">
            <img
              src={Logo}
              alt="eCitizen Logo"
              width={200}
              style={{ cursor: "pointer" }}
            />
          </Link>

          <NinHamburgerIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </NinHamburgerIcon>

          <NinNavMenu click={click}>
            <NinNavItem>
              <NinNavLink
                onClick={() => scrollToSection("how-it-works")}
                href="#how-it-works"
              >
                {isSw ? "Inavyofanya kazi" : "How it works"}
              </NinNavLink>
            </NinNavItem>
            <NinNavItem>
              <NinNavLink onClick={openSampleResult} href="#sample-result">
                {isSw ? "Mfano wa matokeo" : "Sample result"}
              </NinNavLink>
            </NinNavItem>
            <NinNavItem>
              <NinNavLinkRouter to={verifyLink} onClick={closeMobileMenu}>
                {isSw ? "Ingia" : "Login"}
              </NinNavLinkRouter>
            </NinNavItem>
            <NinNavItem>
              <NinCtaButton to={verifyLink} onClick={closeMobileMenu}>
                {isSw
                  ? "Thibitisha Kitambulisho cha Taifa Sasa"
                  : "Verify National ID Now"}{" "}
                <FaArrowRight />
              </NinCtaButton>
            </NinNavItem>
          </NinNavMenu>
        </NinNavbarContainer>
      </NinNav>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="nin"
      />
    </>
  );
}

export default NinNavbar;
