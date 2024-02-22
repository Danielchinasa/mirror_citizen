import React from "react";
import {
  FooterContainer,
  FooterLinkItems,
  FooterLogoArea,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from "./Footer.elements";

import logo from "../../images/logo.svg";
import NewsletterSection from "../newsletter/newsLetterSection";

function Footer() {
  const date = new Date();
  const handleClickPrivacyPolicy = () => {
    // Import the PDF file using require
    const pdf = require("../../images/e-citizen - Data Protection and Privacy Policy.pdf");

    // Open the PDF in a new tab
    window.open(pdf, "_blank");
  };

  return (
    <>
      <div style={{ backgroundColor: "#354138" }}>
        <div class="container text-center">
          <div class="row" style={{ borderBottom: "1px solid #fff" }}>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLogoArea
                src={logo}
                style={{ width: 120 }}
              ></FooterLogoArea>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <FooterLink to="/" onClick={handleClickPrivacyPolicy}>
                  Privacy policy
                </FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLink to="/faq">FAQ</FooterLink>
              </FooterLinkItems>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <FooterLink to="/contact">Contact</FooterLink>
              </FooterLinkItems>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems></FooterLinkItems>
              <FooterLinkItems>
                <FooterLink to="/">info@e-citizen.ng</FooterLink>
              </FooterLinkItems>
            </div>
          </div>
        </div>
      </div>
      <FooterContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <WebsiteRights>
              E-citizen © Biosec {date.getFullYear()}, All Rights Reserved.{" "}
            </WebsiteRights>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterContainer>
    </>
  );
}

export default Footer;
