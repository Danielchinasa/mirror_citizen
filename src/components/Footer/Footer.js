import React, { useState } from "react";
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
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";

function Footer() {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);

  const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");
  const handleClickPrivacyPolicy = () => {
    // // Import the PDF file using require
    // const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");

    // // Open the PDF in a new tab
    // window.open(pdf, "_blank");
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
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
                <Modal
                  title="Privacy Policy"
                  visible={isOpen}
                  centered
                  // open={open}
                  onOk={() => setIsOpen(false)}
                  onCancel={() => setIsOpen(false)}
                  width={1000}
                >
                  <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
                </Modal>
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
