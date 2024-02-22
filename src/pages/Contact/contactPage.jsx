import React from "react";
import { Col, Row, Space } from "antd";
import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import {
  Container,
  Heading,
  InfoSec,
  Subtitle,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  MainButtonFull,
} from "../../globalStyles";

const ContactPage = () => {
  return (
    <Container>
      <InfoSec>
        <Row>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Heading>We will love to hear from you</Heading>
            <Subtitle color="light">
              We value your feedback and look forward to hearing from you. Don't
              hesitate to get in touch with us through any of the contact
              methods provided below. Thank you for considering us
            </Subtitle>
            <Row>
              <Col>
                <Space direction="horizontal" size={10}>
                  <MailOutlined
                    style={{
                      fontSize: "22px",
                      color: "#09c93a",
                    }}
                  />
                  <h5> info@e-citizen.ng</h5>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Space direction="horizontal" size={10}></Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Space direction="horizontal" size={10}></Space>
              </Col>
            </Row>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledForm>
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your name
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Full name" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your email address
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Email address" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your phone number
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Phone number" />
              <StyledLabel>Your subject</StyledLabel>
              <StyledInput placeholder="Subject" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Message
                </Space>
              </StyledLabel>
              <StyledTextArea placeholder="Message" rows={4} />
              <MainButtonFull type="primary">Send</MainButtonFull>
            </StyledForm>
          </Col>
        </Row>
      </InfoSec>
    </Container>
  );
};

export default ContactPage;
