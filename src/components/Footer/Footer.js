import React, { useState } from "react";
import {
  FooterContainer,
  FooterLinkItems,
  FooterLogoArea,
  FooterLogoArea2,
  FooterLogoArea3,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from "./Footer.elements";

import logo from "../../images/e-citizen_logo_ecitizen_white.png";
import osia from "../../images/osia.png";
import ndpr from "../../images/ndpr1.png";
import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import NewsletterSection from "../newsletter/newsLetterSection";
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";

function Footer() {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");
  const handleClickPrivacyPolicy = () => {
    // // Import the PDF file using require
    // const pdf = require("../../images/e_citizen_Data_Protection_and_Privacy_Policy_FINAL.pdf");

    // // Open the PDF in a new tab
    // window.open(pdf, "_blank");
    setIsOpen(true);
  };
  const handleClickTermsofService = () => {
    setIsOpen2(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { isDark } = useTheme();

  return (
    <>
      <div style={{ backgroundColor: isDark ? "#212121" : "#354138" }}>
        <div class="container text-left">
          <div class="row" style={{ borderBottom: "1px solid #fff" }}>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <FooterLink to="/" onClick={handleClickPrivacyPolicy}>
                  <FooterLogoArea
                    src={logo}
                    style={{ width: "205px" }}
                  ></FooterLogoArea>
                </FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLink
                  to="/https://www.ndpc.gov.ng/#"
                  onClick={handleClickPrivacyPolicy}
                >
                  <FooterLogoArea
                    src={ndpr}
                    style={{ width: "205px" }}
                  ></FooterLogoArea>
                </FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLink
                  to="/https://secureidentityalliance.org/osia"
                  onClick={handleClickPrivacyPolicy}
                >
                  <FooterLogoArea
                    src={osia}
                    style={{ width: "135px" }}
                  ></FooterLogoArea>
                </FooterLink>
              </FooterLinkItems>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <a
                  href="https://play.google.com/store/apps/details?id=biosec.ecitizen"
                  target="none"
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                >
                  <img
                    src={playStore}
                    alt="Logo"
                    style={{
                      width: 120,
                      cursor: "pointer",
                      paddingRight: "5px",
                    }}
                  />
                </a>
              </FooterLinkItems>
              <FooterLinkItems>
                <a href="#" target="none">
                  <img
                    src={appStore}
                    alt="Logo"
                    style={{
                      width: 120,
                      cursor: "pointer",
                      paddingRight: "5px",
                    }}
                  />
                </a>
              </FooterLinkItems>
              <FooterLinkItems></FooterLinkItems>
            </div>

            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <FooterLink to="#">
                  <strong style={{ fontWeight: "bolder" }}>Company</strong>
                </FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLink to="/contact">Contact</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLink to="/faq">FAQ</FooterLink>
              </FooterLinkItems>

              {/* <FooterLinkItems>
                <FooterLink to="/">info@e-citizen.ng</FooterLink>
              </FooterLinkItems> */}
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems>
                <FooterLink to="#">
                  <strong style={{ fontWeight: "bolder" }}>Legal</strong>
                </FooterLink>
              </FooterLinkItems>
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
                <FooterLink to="/" onClick={handleClickTermsofService}>
                  Terms of Service
                </FooterLink>
                <Modal
                  title="Terms of Service"
                  visible={isOpen2}
                  centered
                  // open={open}
                  onOk={() => setIsOpen2(false)}
                  onCancel={() => setIsOpen2(false)}
                  width={1000}
                >
                  <div dangerouslySetInnerHTML={{ __html: termsOfService }} />
                </Modal>
              </FooterLinkItems>
            </div>
            {/* <div class="col-md-3 col-sm-12 col-xs-12">
              <FooterLinkItems></FooterLinkItems>
              
            </div> */}
          </div>
        </div>
      </div>
      <FooterContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <WebsiteRights>
              © e-citizen {date.getFullYear()}. All Rights Reserved
            </WebsiteRights>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterContainer>
    </>
  );
}

export default Footer;
