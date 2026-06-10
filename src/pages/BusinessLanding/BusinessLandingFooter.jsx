import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styled from "styled-components";
import Logo from "../../images/e-citizen_logo_ecitizen_white.png";
import playstoreImg from "../../images/playstore.png";
import appStoreImg from "../../images/appStore.png";

const FooterWrapper = styled.footer`
  background: #354138;
  color: #fff;
  padding: 60px 50px 0;

  @media screen and (max-width: 768px) {
    padding: 40px 30px 0;
  }
`;

const FooterInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding-bottom: 40px;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BrandLogo = styled.img`
  height: 36px;
  width: auto;
  object-fit: contain;
  align-self: flex-start;

  @media screen and (max-width: 600px) {
    align-self: center;
  }
`;

const BrandDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0;
  max-width: 280px;

  @media screen and (max-width: 600px) {
    text-align: center;
    max-width: 100%;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const FooterCol = styled.div``;

const FooterColTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  margin: 0 0 16px;
`;

const FooterLink = styled(Link)`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const ExternalLink = styled.a`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const AppCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AppBadge = styled.a`
  display: inline-block;
  text-decoration: none;
  width: fit-content;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  img {
    height: 44px;
    width: auto;
    object-fit: contain;
    display: block;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

const Copyright = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const LegalLink = styled(Link)`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

const BusinessLandingFooter = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <FooterWrapper>
      <FooterInner>
        <FooterTop>
          <BrandCol>
            <BrandLogo src={Logo} alt="eCitizen" />
            <BrandDesc>
              Your trusted partner for digital identity verification and
              background checks.
            </BrandDesc>
            <SocialRow>
              <SocialIcon
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </SocialIcon>
              <SocialIcon
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </SocialIcon>
              <SocialIcon
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </SocialIcon>
            </SocialRow>
          </BrandCol>

          <FooterCol>
            <FooterColTitle>Product</FooterColTitle>
            <ExternalLink
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("how-it-works");
              }}
            >
              How it works
            </ExternalLink>
            <ExternalLink
              href="#sample-result"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("sample-result");
              }}
            >
              Sample result
            </ExternalLink>
            <FooterLink to="/business-verification">
              Business Verification
            </FooterLink>
            <FooterLink to="/products">All Services</FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterColTitle>Support</FooterColTitle>
            <FooterLink to="/faq">Help Center</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/faq">FAQs</FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterColTitle>Get the app</FooterColTitle>
            <AppCol>
              <AppBadge href="#" target="_blank" rel="noopener noreferrer">
                <img src={playstoreImg} alt="Get it on Google Play" />
              </AppBadge>
              <AppBadge href="#" target="_blank" rel="noopener noreferrer">
                <img src={appStoreImg} alt="Download on the App Store" />
              </AppBadge>
            </AppCol>
          </FooterCol>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © e-citizen {new Date().getFullYear()}. All Rights Reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink to="/privacy-policy">Privacy Policy</LegalLink>
            <LegalLink to="/terms-of-service">Terms of Service</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterInner>
    </FooterWrapper>
  );
};

export default BusinessLandingFooter;
