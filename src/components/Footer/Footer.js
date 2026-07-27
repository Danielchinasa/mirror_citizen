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
  LegalLinks,
  LegalLink,
  PublicBrand,
} from "./Footer.elements";

import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import Logo from "../../images/kenya_logo.png";
import LogoWhite from "../../images/kenya_dark.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
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
                  href="https://www.instagram.com/ecitizenng/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon
                  href="https://x.com/ecitizenng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </SocialIcon>
                <SocialIcon
                  href="https://x.com/ecitizenng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </SocialIcon>
                <SocialIcon
                  href="https://www.tiktok.com/@ecitizenng"
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

        <Modal
          title={isSw ? "Sera ya Faragha" : "Privacy Policy"}
          visible={isOpen}
          centered
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
        </Modal>
        <Modal
          title={isSw ? "Sheria na Masharti" : "Terms of Service"}
          visible={isOpen2}
          centered
          onOk={() => setIsOpen2(false)}
          onCancel={() => setIsOpen2(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: termsOfService }} />
        </Modal>
      </FooterWrapper>
    </>
  );
}

export default Footer;
