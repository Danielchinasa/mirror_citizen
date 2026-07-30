import React, { useState } from "react";
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

import Logo from "../../images/civ_logo.png";
import LogoWhite from "../../images/civ_dark.png";
import { useTheme } from "../../components/ThemeProvider";
import { useLocale } from "../../components/LocaleProvider";
import { Link } from "react-router-dom";

import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";
import privacyPolicyFR from "../../privacyPolicyFR";
import termsOfService from "../../termsOfService";
import termsOfServiceFR from "../../termsOfServiceFR";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const { isDark } = useTheme();
  const { language, t } = useLocale();
  const privacyContent = language === "FR" ? privacyPolicyFR : privacyPolicy;
  const termsContent = language === "FR" ? termsOfServiceFR : termsOfService;

  return (
    <>
      <FooterStrip aria-hidden="true" />
      <FooterWrapper>
        <FooterInner>
          <FooterTop>
            <BrandCol>
              {/* <PublicBrand to="/">
               
                citoyen
                <span className="brand-red">.africa</span>
              </PublicBrand> */}
              <Link to="/">
                <img
                  src={isDark ? LogoWhite : Logo}
                  alt="Logo"
                  width={120}
                  style={{ marginTop: "10px", cursor: "pointer" }}
                />
              </Link>
              <BrandDesc>
                {t("footer.brandDesc")}
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
              <FooterColTitle>{t("footer.services")}</FooterColTitle>
              <FooterLink to="/api-docs">{t("footer.apiForBusiness")}</FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{t("footer.support")}</FooterColTitle>
              <FooterLink to="/contact">{t("footer.contact")}</FooterLink>
              <FooterLink to="/faq-uganda">{t("footer.faqs")}</FooterLink>
              <ExternalLink
                href="https://blog.e-citizen.ng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.blog")}
              </ExternalLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{t("footer.getApp")}</FooterColTitle>
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
              {t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}
            </Copyright>
            <LegalLinks>
              <LegalLink onClick={() => setIsOpen(true)}>
                {t("footer.privacyPolicy")}
              </LegalLink>
              <LegalLink onClick={() => setIsOpen2(true)}>
                {t("footer.termsOfService")}
              </LegalLink>
            </LegalLinks>
          </FooterBottom>
        </FooterInner>

        <Modal
          title={t("privacyPolicy.title")}
          visible={isOpen}
          centered
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
        </Modal>
        <Modal
          title={t("termsOfService.title")}
          visible={isOpen2}
          centered
          onOk={() => setIsOpen2(false)}
          onCancel={() => setIsOpen2(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: termsContent }} />
        </Modal>
      </FooterWrapper>
    </>
  );
}

export default Footer;
