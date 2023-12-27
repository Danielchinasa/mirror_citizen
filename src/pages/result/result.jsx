import React, { useEffect } from "react";
import { Card, Row, Col, Divider } from "antd";
import {
  Container,
  Heading,
  Heading4,
  InfoSec,
  StyledLabel,
  Heading6,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchVerificationResult } from "../../redux/actions";

const Result = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const verificationResult = useSelector(
    (state) => state.verificationResult.data
  );

  useEffect(() => {
    // Fetch verification result when the component mounts
    dispatch(fetchVerificationResult("329", userToken));
  }, [dispatch, userToken]);
  const {
    firstName,
    lastName,
    nin,
    dob,
    phoneNumber,
    address,
    requestId,
    birthCountry,
    birthState,
    birthLGA,
    residenceAddress,
    phone,
  } = verificationResult;
  return (
    <Container>
      <InfoSec>
        <Link to="/dashboard">
          <p
            style={{
              color: "#0DC939",
            }}
          >
            Go back
          </p>
        </Link>
        <Card
          style={{
            width: "100%",
          }}
        >
          <Heading4>Verification Result</Heading4>
        </Card>
        <Card
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        >
          <p>Personal Details</p>
          <Row>
            <Col
              span={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
            >
              <Row>
                <Col span={24}>
                  <StyledLabel>Name</StyledLabel>
                  <StyledLabel>
                    <strong>
                      {firstName} {""} {lastName}
                    </strong>
                  </StyledLabel>
                </Col>
                <Divider />
                <Col span={24}>
                  <StyledLabel>NIN</StyledLabel>
                  <StyledLabel>
                    <strong>{nin}</strong>
                  </StyledLabel>
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
                  <StyledLabel>Date of birth</StyledLabel>
                  <StyledLabel>
                    <strong>{dob}</strong>
                  </StyledLabel>
                </Col>
                <Divider />
                <Col span={24}>
                  <StyledLabel>Phone Number</StyledLabel>
                  <StyledLabel>
                    <strong>{phone}</strong>
                  </StyledLabel>
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
                  <StyledLabel>Address</StyledLabel>
                  <StyledLabel>
                    <strong>{residenceAddress}</strong>
                  </StyledLabel>
                </Col>
                <Divider />
                <Col span={24}>
                  <StyledLabel>Birth Country</StyledLabel>
                  <StyledLabel>
                    <strong>{birthCountry}</strong>
                  </StyledLabel>
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
                  <StyledLabel>Birth State</StyledLabel>
                  <StyledLabel>
                    <strong>{birthState}</strong>
                  </StyledLabel>
                </Col>
                <Divider />
                <Col span={24}>
                  <StyledLabel>Birth LGA </StyledLabel>
                  <StyledLabel>
                    <strong>{birthLGA}</strong>
                  </StyledLabel>
                </Col>
              </Row>
            </Col>
            <Divider />
          </Row>
        </Card>
      </InfoSec>
    </Container>
  );
};

export default Result;
