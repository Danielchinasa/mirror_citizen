import React, { useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState("");
  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hre");
        console.log(requestId);
        const response = await dispatch(
          fetchVerificationResult(requestId, userToken)
        );

        // Access the firstName from the response and store it in local state
        const firstNameFromResponse = response.data.firstName || "";
        setFirstName(firstNameFromResponse);
      } catch (error) {
        console.error("Error fetching verification result", error);
      }
    };

    // Fetch verification result when the component mounts
    fetchData();
  }, [dispatch, userToken]);
  // localStorage.removeItem("verificationRequestId");

  const renderDetail = (label, value) => (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledLabel>
        <strong>{value}</strong>
      </StyledLabel>
    </>
  );

  return (
    <Container>
      <InfoSec>
        <Link to="/dashboard">
          <p style={{ color: "#0DC939" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Verification Result</Heading4>
        </Card>
        <Card style={{ width: "100%", marginTop: "20px" }}>
          <p>Personal Details</p>
          <Row gutter={16}>
            <Col span={6}>
              {renderDetail("Name", `${firstName}`)}
              <Divider />
              {renderDetail("NIN", `${firstName}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Date of Birth", `${firstName}`)}
              <Divider />
              {renderDetail("Phone Number", `${firstName}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Address", `${firstName}`)}
              <Divider />
              {renderDetail("Birth Country", `${firstName}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Birth State", `${firstName}`)}
              <Divider />
              {renderDetail("Birth LGA", `${firstName}`)}
            </Col>
          </Row>
        </Card>
      </InfoSec>
    </Container>
  );
};

export default Result;
