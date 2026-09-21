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
import PdfModal from "../PdfModal/PdfModal";
import privacyPdf from "../../images/citoyen Cote dIvoire Privacy Notice FR-EN v1.2 - Confirmed Service Scope.pdf";
import termsPdf from "../../images/citoyen Cote dIvoire Terms of Service FR-EN v1.2 - Confirmed Service Scope.pdf";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

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
              <BrandDesc>{t("footer.brandDesc")}</BrandDesc>
              <SocialRow>
                <SocialIcon
                  href="https://www.instagram.com/biosecofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon
                  href="https://x.com/CitoyenAfrica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </SocialIcon>
                <SocialIcon
                  href="https://www.facebook.com/profile.php?id=61593902775843"
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
              <FooterColTitle>{t("footer.services")}</FooterColTitle>
              <FooterLink to="/api-docs">
                {t("footer.apiForBusiness")}
              </FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>{t("footer.support")}</FooterColTitle>
              <FooterLink to="/contact">{t("footer.contact")}</FooterLink>
              <FooterLink to="/faq-ci">{t("footer.faqs")}</FooterLink>
              <ExternalLink
                href="https://blog.e-citizen.ng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.blog")}
              </ExternalLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>Legal</FooterColTitle>
              <FooterLink
                as="span"
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
              >
                {t("footer.privacyPolicy")}
              </FooterLink>
              <FooterLink
                as="span"
                onClick={() => setIsOpen2(true)}
                style={{ cursor: "pointer" }}
              >
                {t("footer.termsOfService")}
              </FooterLink>
              <FooterLink to="/account-deletion">
                Account Deletion
              </FooterLink>
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
              {t("footer.copyright").replace(
                "{year}",
                String(new Date().getFullYear()),
              )}
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

        <PdfModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={t("privacyPolicy.title")}
          src={privacyPdf}
          height={560}
        />
        <PdfModal
          open={isOpen2}
          onClose={() => setIsOpen2(false)}
          title={t("termsOfService.title")}
          src={termsPdf}
          height={560}
        />
      </FooterWrapper>
    </>
  );
}

export default Footer;
