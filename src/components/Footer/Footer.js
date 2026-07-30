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

import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import Logo from "../../images/uganda_logo.png";
import LogoWhite from "../../images/uganda_dark.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import { useLocale } from "../LocaleProvider";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const { isDark } = useTheme();
  const { t } = useLocale();

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
                  width={130}
                  style={{ marginTop: "10px", cursor: "pointer" }}
                />
              </Link>
              <BrandDesc>{t("footer.tagline")}</BrandDesc>
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
              <FooterLink to="/api-docs">
                {t("footer.apiForBusiness")}
              </FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{t("footer.support")}</FooterColTitle>
              <FooterLink to="/contact">
                {t("footer.contact")}
              </FooterLink>
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
              {t("footer.copyright", { year: new Date().getFullYear() })}
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
          title={t("footer.privacyPolicy")}
          visible={isOpen}
          centered
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
        </Modal>
        <Modal
          title={t("footer.termsOfService")}
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
