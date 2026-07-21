import React, { useState, useRef, useEffect } from "react";
import {
  NinNav,
  NinNavbarContainer,
  NinNavMenu,
  NinNavItem,
  NinNavLink,
  NinNavLinkRouter,
  NinCtaButton,
  NinHamburgerIcon,
  DropdownWrapper,
  DropdownItem,
} from "./NinNavbar.elements";

import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { FaTimes, FaBars } from "react-icons/fa";
import Logo from "../../images/e-citizen_logo_ecitizen.png";
import { Link } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../SampleResultPopup/SampleResultPopup";

function NinNavbar() {
  const [click, setClick] = useState(false);
  const [showSampleResult, setShowSampleResult] = useState(false);
  const [showVerificationDropdown, setShowVerificationDropdown] =
    useState(false);
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

  const verificationItems = [
    { label: "NIN Verification", to: "/nin-verification" },
    { label: "Phone Number Verification", to: "/phone-number-verification" },
    { label: "Business Verification", to: "/business-verification" },
    { label: "Credit Profile", to: "/credit-profile" },
    { label: "Vehicle Verification", to: "/vehicle-verification" },
  ];

  const closeVerificationDropdown = () => setShowVerificationDropdown(false);
  const verificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        verificationRef.current &&
        !verificationRef.current.contains(event.target)
      ) {
        setShowVerificationDropdown(false);
      }
    };
    if (showVerificationDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showVerificationDropdown]);

  return (
    <>
      <NinNav>
        <NinNavbarContainer>
          <Link to="/">
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
                How it works
              </NinNavLink>
            </NinNavItem>
            <NinNavItem>
              <NinNavLink onClick={openSampleResult} href="#sample-result">
                Sample result
              </NinNavLink>
            </NinNavItem>
            <NinNavItem ref={verificationRef}>
              <NinNavLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowVerificationDropdown(!showVerificationDropdown);
                }}
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Verification Types <FaChevronDown style={{ fontSize: 12 }} />
              </NinNavLink>
              {showVerificationDropdown && (
                <DropdownWrapper>
                  {verificationItems.map((item) => (
                    <DropdownItem
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        closeMobileMenu();
                        closeVerificationDropdown();
                      }}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownWrapper>
              )}
            </NinNavItem>
            <NinNavItem>
              <NinNavLinkRouter to={verifyLink} onClick={closeMobileMenu}>
                Login
              </NinNavLinkRouter>
            </NinNavItem>
            <NinNavItem>
              <NinCtaButton to={verifyLink} onClick={closeMobileMenu}>
                Verify NIN Now <FaArrowRight />
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
