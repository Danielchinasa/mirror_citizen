import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar } from "antd";
import {
  Container,
  Heading,
  Heading4,
  InfoSec,
  StyledLabel,
  Heading6,
  CenterText,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchVerificationResult } from "../../redux/actions";
import axios from "axios";
import { Typography } from "antd";
import Icon, { RightOutlined, UserOutlined } from "@ant-design/icons";
import AdsCard from "../../components/ads/adsCard";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";

const { Title, Text } = Typography;

const LegitCar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [chasisNumber, setChasisNumber] = useState("No Data");
  const [stolen, setStolen] = useState("No Data");
  const [report, setReport] = useState("No Data");
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const response = await axios.get(
          `https://41.184.212.26:8069/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        // console.log("hre");
        // console.log(response.data.data.firstName);
        const chasisNumberFromResponse = response.data.data.chasisNumber || "";
        const stolenFromResponse = response.data.data.stolen || "No Data";
        const reportFromResponse = response.data.data.report || "No Data";
        setChasisNumber(chasisNumberFromResponse);
        setStolen(stolenFromResponse);
        setReport(reportFromResponse);
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
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Vehicle Verification Result</Heading4>
        </Card>
        <Card style={{ width: "100%", marginTop: "20px" }}>
          <div>
            <Text>Vehicle Profile </Text>
            <RightOutlined />
            <Text>Basic VIN</Text>
            <RightOutlined />
            <Text>Legit Car</Text>
          </div>
          <Divider />

          <Row gutter={16}>
            <Col span={24}>
              {/* {photo ? (
                <Avatar
                  size={124}
                  src={`https://41.184.212.26:8069${photo}`}
                  alt="Avatar"
                />
              ) : (
                <Avatar size={124} icon={<UserOutlined />} />
              )} */}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail("Chassis Number", `${chasisNumber}`)}
            </Col>
            <Col span={6}>{renderDetail("Stolen", `${stolen}`)}</Col>
            <Col span={6}>{renderDetail("Stolen Reports", `${report}`)}</Col>
          </Row>
        </Card>
        <Title level={5} style={{ marginTop: "20px" }}>
          Your Offers
        </Title>
        <Row gutter={30}>
          <Col span={6}>
            <AdsCard
              backgroundColor="#DDF9EA"
              title="Car Finance"
              imageSrc={creditCard}
              content="Credit Cards handpicked for you"
            />
          </Col>
          <Col span={6}>
            <AdsCard
              backgroundColor="#ECF5F8"
              title="Car Insurance"
              imageSrc={carInsurance}
              content="Borrow from 100,000 with monthly repayments of to 7 years."
            />
          </Col>
          <Col span={6}>
            <AdsCard
              backgroundColor="#DDF9EA"
              title="Finance your Next Car"
              imageSrc={creditCard}
              content="Find financial offers that are 
              tailored to your credit score. "
            />
          </Col>
          <Col span={6}>
            <AdsCard
              backgroundColor="#ECF5F8"
              title="Credit Cards"
              imageSrc={carInsurance}
              content="Credit Cards handpicked for you"
            />
          </Col>
        </Row>
      </InfoSec>
    </Container>
  );
};

export default LegitCar;
