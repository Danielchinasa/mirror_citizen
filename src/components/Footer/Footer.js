import React, { useState, useEffect } from "react";
import {
  FooterStrip,
  FooterWrapper,
  FooterInner,
  FooterTop,
  BrandCol,
  BrandDesc,
  SocialRow,
  SocialIcon,
  FooterCol,
  FooterColTitle,
  FooterLink,
  ExternalLink,
  AppCol,
  AppBadge,
  FooterBottom,
  Copyright,
  Disclaimer,
  LegalLinks,
  LegalLink,
  PublicBrand,
} from "./Footer.elements";

import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import PdfModal from "../PdfModal/PdfModal";
import privacyPdf from "../../images/e-raia Kenya Privacy Notice EN-SW v1.2 - Confirmed Service Scope.pdf";
import termsPdf from "../../images/e-raia Kenya Terms of Service EN-SW v1.2 - Confirmed Service Scope.pdf";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import Logo from "../../images/kenya_logo.png";
import LogoWhite from "../../images/kenya_dark.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";

const getLanguage = () => {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem("siteLanguage") === "SW" ? "SW" : "EN";
};

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [language, setLanguage] = useState(getLanguage);
  const { isDark } = useTheme();

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

  return (
    <>
      <FooterStrip aria-hidden="true" />
      <FooterWrapper>
        <FooterInner>
          <FooterTop>
            <BrandCol>
              <Link to="/">
                <img
                  src={isDark ? LogoWhite : Logo}
                  alt="Logo"
                  width={120}
                  style={{ marginTop: "10px", cursor: "pointer" }}
                />
              </Link>
              <BrandDesc>
                {isSw
                  ? "Mshirika wako anayeaminika kwa uthibitishaji wa utambulisho wa kidijitali na ukaguzi wa usuli."
                  : "Your trusted partner for digital identity verification and background checks."}
              </BrandDesc>
              <SocialRow>
                <SocialIcon
                  href="https://www.instagram.com/biosecofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon
                  href="https://x.com/ERaiaAfrica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </SocialIcon>
                <SocialIcon
                  href="https://www.facebook.com/profile.php?id=61593887716716"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </SocialIcon>
                <SocialIcon
                  href="https://www.tiktok.com/@biosecofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </SocialIcon>
              </SocialRow>
            </BrandCol>

            <FooterCol>
              <FooterColTitle>{isSw ? "Huduma" : "Services"}</FooterColTitle>
              <FooterLink to="/api-docs">
                {isSw ? "API ya Biashara" : "API for Business"}
              </FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{isSw ? "Msaada" : "Support"}</FooterColTitle>
              <FooterLink to="/contact">
                {isSw ? "Wasiliana nasi" : "Contact"}
              </FooterLink>
              <FooterLink to="/faq-kenya">
                {isSw ? "Maswali" : "FAQs"}
              </FooterLink>
              <ExternalLink
                href="https://blog.e-citizen.ng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isSw ? "Blogu" : "Blog"}
              </ExternalLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{isSw ? "Kisheria" : "Legal"}</FooterColTitle>
              <FooterLink
                as="span"
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
              >
                {isSw ? "Sera ya Faragha" : "Privacy Policy"}
              </FooterLink>
              <FooterLink
                as="span"
                onClick={() => setIsOpen2(true)}
                style={{ cursor: "pointer" }}
              >
                {isSw ? "Sheria na Masharti" : "Terms of Service"}
              </FooterLink>
              <FooterLink to="/account-deletion">
                {isSw ? "Ufutaji wa Akaunti" : "Account Deletion"}
              </FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>
                {isSw ? "Pata programu" : "Get the app"}
              </FooterColTitle>
              <AppCol>
                <AppBadge
                  href="https://play.google.com/store/apps/details?id=biosec.ecitizen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={playStore} alt="Get it on Google Play" />
                </AppBadge>
                <AppBadge
                  href="https://apps.apple.com/ng/app/e-citizen-ng/id6503291019"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={appStore} alt="Download on the App Store" />
                </AppBadge>
              </AppCol>
            </FooterCol>
          </FooterTop>

          <FooterBottom>
            <Copyright>
              {isSw
                ? `© e-raia.com ${new Date().getFullYear()}. Haki Zote Zimehifadhiwa.`
                : `© e-raia.com ${new Date().getFullYear()}. All Rights Reserved.`}
            </Copyright>
            <Disclaimer>
              {isSw ? "Kanusho: " : "Disclaimer: "}
              <strong>
                {isSw
                  ? "e-raia si shirika la serikali"
                  : "e-raia is not a government organisation"}
              </strong>
            </Disclaimer>
            <LegalLinks>
              <LegalLink onClick={() => setIsOpen(true)}>
                {isSw ? "Sera ya Faragha" : "Privacy Policy"}
              </LegalLink>
              <LegalLink onClick={() => setIsOpen2(true)}>
                {isSw ? "Sheria na Masharti" : "Terms of Service"}
              </LegalLink>
            </LegalLinks>
          </FooterBottom>
        </FooterInner>

        <PdfModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={isSw ? "Sera ya Faragha" : "Privacy Policy"}
          src={privacyPdf}
          height={560}
        />
        <PdfModal
          open={isOpen2}
          onClose={() => setIsOpen2(false)}
          title={isSw ? "Sheria na Masharti" : "Terms of Service"}
          src={termsPdf}
          height={560}
        />
      </FooterWrapper>
    </>
  );
}

export default Footer;
