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
import nimc from "../../images/nidologo.png";
import ndpr from "../../images/ndpr1.png";
import playStore from "../../images/playstore.png";
import appStore from "../../images/appStore.png";
import NewsletterSection from "../newsletter/newsLetterSection";
import { Modal, Col, Divider, Row } from "antd";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

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
            <Row>
              <Col className="gutter-row" xs={12} sm={12} md={6} lg={6} xl={6}>
                <div>
                  <FooterLinkItems>
                    <FooterLinkItems>
                      <a
                        href="#"
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{
                            width: "115px",
                            cursor: "pointer",
                            paddingRight: "5px",
                          }}
                        />
                      </a>
                    </FooterLinkItems>
                  </FooterLinkItems>
                  <FooterLinkItems>
                    <a
                      href="https://www.ndpc.gov.ng/#"
                      target="none"
                      style={{ cursor: "pointer", marginBottom: "10px" }}
                    >
                      <img
                        src={ndpr}
                        alt="Logo"
                        style={{
                          width: "115px",
                          cursor: "pointer",
                          paddingRight: "5px",
                        }}
                      />
                    </a>
                  </FooterLinkItems>
                  <FooterLinkItems
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <a
                      href="https://secureidentityalliance.org/osia"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={osia}
                        alt="OSIA Logo"
                        style={{
                          width: "95px",
                          height: "50px",
                          cursor: "pointer",
                          paddingRight: "5px",
                        }}
                      />
                    </a>

                    <a
                      href="https://nimc.gov.ng/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={nimc}
                        alt="NIMC Logo"
                        style={{
                          width: "50px",
                          cursor: "pointer",
                          height: "50px",
                          paddingRight: "5px",
                        }}
                      />
                    </a>
                  </FooterLinkItems>
                </div>
              </Col>
              <Col className="gutter-row" xs={12} sm={12} md={6} lg={6} xl={6}>
                <div>
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
                          width: "115px",
                          cursor: "pointer",
                          paddingRight: "5px",
                        }}
                      />
                    </a>
                  </FooterLinkItems>
                  <FooterLinkItems>
                    <a
                      href="https://apps.apple.com/ng/app/e-citizen-ng/id6503291019"
                      target="none"
                      style={{ cursor: "pointer", marginBottom: "10px" }}
                    >
                      <img
                        src={appStore}
                        alt="Logo"
                        style={{
                          width: "115px",
                          cursor: "pointer",
                          paddingRight: "5px",
                        }}
                      />
                    </a>
                  </FooterLinkItems>
                  <FooterLinkItems
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    {/* <a
                      href="https://www.facebook.com/share/16sSsUGzvP"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", cursor: "pointer" }}
                    >
                      <FaFacebookF size={20} />
                    </a> */}
                    <a
                      href="https://www.instagram.com/ecitizenng/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", cursor: "pointer" }}
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href="https://x.com/ecitizenng"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", cursor: "pointer" }}
                    >
                      <FaXTwitter size={20} />
                    </a>
                  </FooterLinkItems>
                </div>
              </Col>

              <Col className="gutter-row" xs={12} sm={12} md={6} lg={6} xl={6}>
                <div>
                  <FooterLinkItems>
                    <h5 style={{ fontWeight: "bolder" }}>Service</h5>
                  </FooterLinkItems>
                  <FooterLinkItems>
                    <FooterLink to="/contact">Contact</FooterLink>
                  </FooterLinkItems>
                  <FooterLinkItems>
                    <FooterLink to="/faq">FAQs</FooterLink>
                  </FooterLinkItems>
                  <FooterLinkItems>
                    <a
                      href="https://blog.e-citizen.ng/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      Blog
                    </a>
                  </FooterLinkItems>
                </div>
              </Col>
              <Col className="gutter-row" xs={12} sm={12} md={6} lg={6} xl={6}>
                <div>
                  <FooterLinkItems>
                    <h5 style={{ fontWeight: "bolder" }}>Legal</h5>
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
                      <div
                        dangerouslySetInnerHTML={{ __html: privacyPolicy }}
                      />
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
                      <div
                        dangerouslySetInnerHTML={{ __html: termsOfService }}
                      />
                    </Modal>
                  </FooterLinkItems>
                </div>
              </Col>
            </Row>
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
