import React, { useState } from "react";
import {
  FooterWrapper,
  FooterInner,
  FooterTop,
  BrandCol,
  BrandLogo,
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
} from "./Footer.elements";

import logo from "../../images/e-citizen_logo_ecitizen_white.png";
import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import PdfModal from "../PdfModal/PdfModal";
import termsPdf from "../../images/e-citizen_Nigeria_Terms_of_Service_v2.1_Confirmed.pdf";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";

function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <FooterWrapper>
      <FooterInner>
        <FooterTop>
          <BrandCol>
            <Link to="/">
              <BrandLogo src={logo} alt="eCitizen" />
            </Link>
            <BrandDesc>
              Your trusted partner for digital identity verification and
              background checks.
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
                href="https://www.facebook.com/profile.php?id=100066689567403"
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
            <FooterColTitle>Services</FooterColTitle>
            <FooterLink to="/nin-verification">NIN Verification</FooterLink>
            <FooterLink to="/phone-number-verification">
              Phone Number Verification
            </FooterLink>
            <FooterLink to="/business-verification">
              Business Verification
            </FooterLink>
            <FooterLink to="/credit-profile">Credit Profile</FooterLink>
            <FooterLink to="/vehicle-verification">
              Vehicle Verification
            </FooterLink>
            <FooterLink to="/api-docs">API for Business</FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterColTitle>Support</FooterColTitle>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/faq">FAQs</FooterLink>
            <ExternalLink
              href="https://blog.e-citizen.ng/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </ExternalLink>
          </FooterCol>
          <FooterCol>
            <FooterColTitle>Legal</FooterColTitle>
            <FooterLink
              as="span"
              onClick={() => setIsTermsOpen(true)}
              style={{ cursor: "pointer" }}
            >
              Terms of Service
            </FooterLink>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/account-deletion">Account Deletion</FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterColTitle>Get the app</FooterColTitle>
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
            © e-citizen {new Date().getFullYear()}. All Rights Reserved.
          </Copyright>
          <Disclaimer>
            Disclaimer: e-citizen is not a government organisation
          </Disclaimer>
          <LegalLinks>
            <LegalLink as={Link} to="/privacy-policy">
              Privacy Policy
            </LegalLink>
            <LegalLink as={Link} to="/account-deletion">
              Account Deletion
            </LegalLink>
            <LegalLink onClick={() => setIsTermsOpen(true)}>
              Terms of Service
            </LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterInner>

      <PdfModal
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
        src={termsPdf}
        height={560}
      />
    </FooterWrapper>
  );
}

export default Footer;
