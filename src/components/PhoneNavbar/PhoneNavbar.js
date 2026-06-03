import React, { useState } from "react";
import {
  NinNav,
  NinNavbarContainer,
  NinNavMenu,
  NinNavItem,
  NinNavLink,
  NinNavLinkRouter,
  NinCtaButton,
  NinHamburgerIcon,
} from "../NinNavbar/NinNavbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Logo from "../../images/e-citizen_logo_ecitizen.png";
import { Link } from "react-router-dom";

function PhoneNavbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NinNav>
      <NinNavbarContainer>
        <Link to="/phone-number-verification">
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
            <NinNavLink
              onClick={() => scrollToSection("sample-result")}
              href="#sample-result"
            >
              Sample result
            </NinNavLink>
          </NinNavItem>
          <NinNavItem>
            <NinNavLinkRouter
              to="/verification-login"
              onClick={closeMobileMenu}
            >
              Login
            </NinNavLinkRouter>
          </NinNavItem>
          <NinNavItem>
            <NinCtaButton to="/verification-login" onClick={closeMobileMenu}>
              Verify Phone Now <FaArrowRight />
            </NinCtaButton>
          </NinNavItem>
        </NinNavMenu>
      </NinNavbarContainer>
    </NinNav>
  );
}

export default PhoneNavbar;
