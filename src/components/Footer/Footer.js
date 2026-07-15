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

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <FooterStrip aria-hidden="true" />
      <FooterWrapper>
        <FooterInner>
          <FooterTop>
            <BrandCol>
              <PublicBrand to="/">
                <span className="brand-red">e</span>
                <span className="brand-dot">-</span>
                citizen<span className="brand-dot">.africa</span>
              </PublicBrand>
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
              <FooterColTitle>Services</FooterColTitle>
              {/* <FooterLink to="/">National ID Verification</FooterLink>

              <FooterLink to="/">VIN Verification</FooterLink> */}
              <FooterLink to="/api-docs">API for Business</FooterLink>
            </FooterCol>

            <FooterCol>
              <FooterColTitle>Support</FooterColTitle>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/faq-ghana">FAQs</FooterLink>
              <ExternalLink
                href="https://blog.e-citizen.ng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </ExternalLink>
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
              © e-citizen.africa {new Date().getFullYear()}. All Rights
              Reserved.
            </Copyright>
            <LegalLinks>
              <LegalLink onClick={() => setIsOpen(true)}>
                Privacy Policy
              </LegalLink>
              <LegalLink onClick={() => setIsOpen2(true)}>
                Terms of Service
              </LegalLink>
            </LegalLinks>
          </FooterBottom>
        </FooterInner>

        <Modal
          title="Privacy Policy"
          visible={isOpen}
          centered
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          width={1000}
        >
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
        </Modal>
        <Modal
          title="Terms of Service"
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
