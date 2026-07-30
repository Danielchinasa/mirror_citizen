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
} from "./NinNavbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { PublicBrand } from "../Navbar/Navbar.elements";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../SampleResultPopup/SampleResultPopup";

function NinNavbar() {
  const [click, setClick] = useState(false);
  const [showSampleResult, setShowSampleResult] = useState(false);
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
          <PublicBrand to="/nin-verification">
            <span className="brand-red">e</span>
            <span className="brand-dot">-</span>
            citoyen<span className="brand-dot">.africa</span>
          </PublicBrand>

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
            <NinNavItem>
              <NinNavLinkRouter to={verifyLink} onClick={closeMobileMenu}>
                Login
              </NinNavLinkRouter>
            </NinNavItem>
            <NinNavItem>
              <NinCtaButton to={verifyLink} onClick={closeMobileMenu}>
                Verify NNI Now <FaArrowRight />
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
