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
  NinBrand,
} from "./NinNavbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../SampleResultPopup/SampleResultPopup";
import { useLocale } from "../LocaleProvider";

function NinNavbar() {
  const { t } = useLocale();
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
          <NinBrand to="/nin-verification">
            <span className="brand-red">e</span>
            <span className="brand-dot">-</span>
            raia<span className="brand-dot">.africa</span>
          </NinBrand>

          <NinHamburgerIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </NinHamburgerIcon>

          <NinNavMenu click={click}>
            <NinNavItem>
              <NinNavLink
                onClick={() => scrollToSection("how-it-works")}
                href="#how-it-works"
              >
                {t("nav.howItWorks")}
              </NinNavLink>
            </NinNavItem>
            <NinNavItem>
              <NinNavLink onClick={openSampleResult} href="#sample-result">
                {t("landing.sampleResult")}
              </NinNavLink>
            </NinNavItem>
            <NinNavItem>
              <NinNavLinkRouter to={verifyLink} onClick={closeMobileMenu}>
                {t("nav.login")}
              </NinNavLinkRouter>
            </NinNavItem>
            <NinNavItem>
              <NinCtaButton to={verifyLink} onClick={closeMobileMenu}>
                {t("landing.verifyNinNow")} <FaArrowRight />
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
