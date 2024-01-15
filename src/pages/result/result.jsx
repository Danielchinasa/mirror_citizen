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
import axios from "axios";
import { Typography } from "antd";
import Icon, { RightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Result = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nin, setNin] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [residenceAddress, setResidenceAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [birthState, setBirthState] = useState("");
  const [originState, setOriginState] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [originLGA, setOriginLGA] = useState("");
  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await dispatch(
    //       fetchVerificationResult(requestId, userToken)
    //     );
    //     console.log("hre");
    //     console.log(response);
    //     // Access the firstName from the response and store it in local state
    //   } catch (error) {
    //     console.error("Error fetching verification result", error);
    //   }
    // };
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const response = await axios.get(
          `http://41.184.212.26:8063/api/v2/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        // console.log("hre");
        // console.log(response.data.data.firstName);
        const firstNameFromResponse = response.data.data.firstName || "";
        const lastNameFromResponse = response.data.data.lastName || "N/A";
        const ninFromResponse = response.data.data.nin || "N/A";
        const dobFromResponse = response.data.data.dob || "N/A";
        const genderFromResponse = response.data.data.gender || "N/A";
        const residenceAddressFromResponse =
          response.data.data.residenceAddress || "N/A";
        const phoneFromResponse = response.data.data.phone || "N/A";
        const maritalStatusFromResponse =
          response.data.data.maritalStatus || "N/A";
        const religionFromResponse = response.data.data.religion || "N/A";
        const educationLevelFromResponse =
          response.data.data.educationLevel || "N/A";
        const professionFromResponse = response.data.data.profession || "N/A";
        const emailFromResponse = response.data.data.email || "N/A";
        const originLGAFromResponse = response.data.data.originLGA || "N/A";
        const originStateFromResponse = response.data.data.originState || "N/A";
        const birthCountryFromResponse =
          response.data.data.birthCountry || "N/A";
        const birthStateFromResponse = response.data.data.birthState || "N/A";
        const employmentSatusFromResponse =
          response.data.data.employmentSatus || "N/A";
        setFirstName(firstNameFromResponse);
        setLastName(lastNameFromResponse);
        setNin(ninFromResponse);
        setDob(dobFromResponse);
        setGender(genderFromResponse);
        setResidenceAddress(residenceAddressFromResponse);
        setPhone(phoneFromResponse);
        setMaritalStatus(maritalStatusFromResponse);
        setReligion(religionFromResponse);
        setEducationLevel(educationLevelFromResponse);
        setProfession(professionFromResponse);
        setEmail(emailFromResponse);
        setBirthCountry(birthCountryFromResponse);
        setOriginState(originStateFromResponse);
        setOriginLGA(originLGAFromResponse);
        setBirthState(birthStateFromResponse);
        setEmploymentStatus(employmentSatusFromResponse);
      } catch (error) {
        // Handle errors if needed
        console.error("Error checking consent:", error);
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
  const storedValue = localStorage.getItem("profile");
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
          <div>
            <Text>Basic Identity Profile </Text>
            <RightOutlined />
            <Text>{storedValue}</Text>
          </div>
          <Divider />

          <Row gutter={16}>
            <Col span={6}>
              {renderDetail("Name", `${firstName} ${lastName}`)}
              <Divider />
              {renderDetail("NIN", `${nin}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Date of Birth", `${dob}`)}
              <Divider />
              {renderDetail("Phone Number", `${phone}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Address", `${residenceAddress}`)}
              <Divider />
              {renderDetail("Gender", `${gender}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Religion", `${religion}`)}
              <Divider />
              {renderDetail("Email", `${email}`)}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail("Country of Birth", `${birthCountry}`)}
              <Divider />
              {renderDetail("Employment Status", `${employmentStatus}`)}
            </Col>
            <Col span={6}>
              {renderDetail("State of Birth", `${birthState}`)}
              <Divider />
              {renderDetail("LGA of Origin", `${originLGA}`)}
            </Col>
            <Col span={6}>
              {renderDetail("State of Origin", `${originState}`)}
              <Divider />
              {renderDetail("Marrital Status", `${maritalStatus}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Profession", `${profession}`)}
              <Divider />
              {renderDetail("Education Level", `${educationLevel}`)}
            </Col>
          </Row>
        </Card>
      </InfoSec>
    </Container>
  );
};

export default Result;
