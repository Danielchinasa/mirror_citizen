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
import Reach1 from "../../images/reach1.jpeg";
import { theme } from "antd";
import baseUrl from "../../apiConfig";
import { apiGetInternalCall } from "../../apiUtils";

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
        const response = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken
        );

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
  const { token } = theme.useToken();
  return (
    <Container $token={token}>
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
                  src={`https://e-citizen.ng:8444${photo}`}
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
      </InfoSec>
      <Title level={5} style={{ marginTop: "20px" }}>
        Your Offers
      </Title>
      <div class="container">
        <div class="row">
          <div
            className="col-sm-12 col-md-6 col-lg-3 mb-3"
            style={{
              backgroundImage: `url(${Reach1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
            }}
            onClick={() => {
              window.open(
                "https://clk1.reachclk.com/avnq9z?landing_id=325&creative_id=1735",
                "_blank"
              );
            }}
          ></div>
          <div
            className="col-sm-12 col-md-6 col-lg-3 mb-3 mr-3"
            style={{
              backgroundImage: `url(https://cdn.affisereach.com/public/creatives/soiipjRopdyV7BrVn0lhVUVfbLI1kUYsm13tSQ2Y.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              marginRight: "10px",
              cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
            }}
            onClick={() => {
              window.open(
                "https://clk1.reachclk.com/I4KDDU?adv_sub1=info%40biosec.com.ng&landing_id=627&creative_id=1658",
                "_blank"
              );
            }}
          ></div>
          {/* <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Finance your Next Car</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#DDF9EA",
                }}
              >
                <p class="card-text">
                  Find financial offers that are tailored to your credit score.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Credit Cards</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#ECF5F8",
                }}
              >
                <p class="card-text">Credit Cards handpicked for you</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default LegitCar;
