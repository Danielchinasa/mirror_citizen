import React from "react";
import { Card, Row, Col, Image } from "antd";
import {
  Container,
  Heading,
  InfoSec,
  StyledLabel,
  Heading6,
} from "../../globalStyles";

const Result = () => {
  return (
    <Container>
      <InfoSec>
        <Card
          style={{
            width: "100%",
          }}
        >
          <Heading>Verification Result</Heading>
          <Row>
            <Col
              span={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
            >
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
            >
              <Row>
                <Col span={24}>
                  <StyledLabel>First Name</StyledLabel>
                  <Heading6>Timothy</Heading6>
                </Col>
                <Col span={24}>
                  <StyledLabel>Date of Birth</StyledLabel>
                  <Heading6>10/12/1972</Heading6>
                </Col>
              </Row>
            </Col>
            <Col
              span={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
            >
              <Row>
                <Col span={24}>
                  <StyledLabel>Middle Name</StyledLabel>
                  <Heading6>Agba</Heading6>
                </Col>
                <Col span={24}>
                  <StyledLabel>Phone Number</StyledLabel>
                  <Heading6>08025455312</Heading6>
                </Col>
              </Row>
            </Col>
            <Col
              span={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
            >
              <Row>
                <Col span={24}>
                  <StyledLabel>Last Name</StyledLabel>
                  <Heading6>Shater</Heading6>
                </Col>
                <Col span={24}>
                  <StyledLabel>NIN</StyledLabel>
                  <Heading6>21025462387</Heading6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </InfoSec>
    </Container>
  );
};

export default Result;
