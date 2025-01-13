import React, { useState } from "react";
import {
  Footer1Container,
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

// import logo from "../../images/logo.svg";
// import logo from "../../images/logo.png";
import logo1 from "../../images/logo1.png";
import osia from "../../images/osia.png";
import ndpr from "../../images/ndpr.png";
import osia1 from "../../images/osia1.png";
import ndpr1 from "../../images/ndpr1.png";
import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import NewsletterSection from "../newsletter/newsLetterSection";
import { Modal } from "antd";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import { Link } from "react-router-dom";


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

  return (
    <>
      <Footer1Container>
        <div className="container">
          <div className="row custom-row" style={{ width: "auto" }}>
            {/* Logo Section */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div >
                <a href="/" style={{ cursor: "pointer", margin: "5px" }}>
                  <img src={logo1} alt="Logo" />
                </a>
              </div>
              <div style={{ marginTop: "10px"}}>
                <a href="https://www.ndpc.gov.ng/#" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", margin: "5px" }}>
                  <img src={ndpr1} alt="NDPC"  />
                </a>
              </div>
              <div className="text-left" style={{ marginTop: "10px"}}>
                <a href="https://secureidentityalliance.org/osia" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", margin: "5px" }}>
                  <img src={osia1} alt="OSIA" />
                </a>
              </div>
            </div>

            {/* App Store Links */}
            <div className="col-md-3 col-sm-6 col-xs-6 " style={{ width: "auto" }}>
              <div style={{ marginBottom: "15px" }}>
                <a href="https://play.google.com/store/apps/details?id=biosec.ecitizen" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", margin: "5px" }}>
                  <img src={playStore} alt="Google Play" style={{ width: 120 }} />
                </a>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", margin: "5px" }}>
                  <img src={appStore} alt="App Store" style={{ width: 120 }} />
                </a>
              </div>
              <div>
                <a href="#" target="_blank" style={{ margin: "5px" }}>
                  <i className="fab fa-facebook" style={{ color: "#fff", fontSize: "20px", marginRight: "10px" }}></i>
                </a>
                <a href="#" target="_blank" style={{ margin: "5px" }}>
                  <i className="fab fa-instagram" style={{ color: "#fff", fontSize: "20px", marginRight: "10px" }}></i>
                </a>
                <a href="#" target="_blank" style={{ margin: "5px" }}>
                  <i className="fab fa-twitter" style={{ color: "#fff", fontSize: "20px", marginRight: "10px" }}></i>
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div>
                <h5 style={{ color: "#fff" }}>Company</h5>
                <a href="/contact" style={{ color: "#fff", textDecoration: "none", display: "block", margin: "5px 0" }}>
                  Contact
                </a>
                <a href="/faq" style={{ color: "#fff", textDecoration: "none", display: "block", margin: "5px 0" }}>
                  FAQs
                </a>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-xs-6">
              <div>
                <h5 style={{ color: "#fff" }}>Legal</h5>
                <a onClick={handleClickPrivacyPolicy} style={{ color: "#fff", textDecoration: "none", display: "block", margin: "5px 0", cursor: "pointer" }}>
                  Privacy Policy
                </a>
                <a onClick={handleClickTermsofService} style={{ color: "#fff", textDecoration: "none", display: "block", margin: "5px 0", cursor: "pointer" }}>
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </Footer1Container>
      <FooterContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <WebsiteRights>© e-citizen {date.getFullYear()}, All Rights Reserved.</WebsiteRights>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterContainer>
    </>
  );
}

export default Footer;
