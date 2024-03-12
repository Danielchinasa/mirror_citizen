import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar, Spin } from "antd";
import {
  Container,
  Heading4,
  InfoSec,
  MainButton,
  StyledLabel,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Typography } from "antd";
import Icon, {
  RightOutlined,
  UserOutlined,
  MailOutlined,
  BankOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";

import { MdOutlinePinDrop } from "react-icons/md";

const { Title, Text } = Typography;

const BusinessName = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [businessData, setBusinessData] = useState([]);
  const [shareholdersData, setShareholdersData] = useState([]);
  const requestId = localStorage.getItem("verificationRequestId");
  const [cacId, setCacId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to check consent status
        setLoading(true);
        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        setBusinessData(response.data.data);
        setLoading(false);
      } catch (error) {
        // Handle errors if needed
        console.error("Error checking consent:", error);
        setLoading(false);
      }
    };
    // Fetch verification result when the component mounts
    fetchData();
  }, [dispatch, userToken]);
  // localStorage.removeItem("verificationRequestId");

  const renderDetail = (icon, label, value) => (
    <>
      <StyledLabel>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel>
        <strong>{value}</strong>
      </StyledLabel>
    </>
  );
  const renderDetail2 = (label, value) => (
    <>
      <StyledLabel> {label}</StyledLabel>
      <StyledLabel>
        <strong>{value}</strong>
      </StyledLabel>
    </>
  );
  const storedValue = localStorage.getItem("profile");

  const handleButtonClick = async (cacid) => {
    try {
      setLoading(true);
      // Prepare the request body
      const requestBody = {
        business: {
          requestId: parseInt(requestId),
          cacId: parseInt(cacid),
        },
      };
      // Make an API request to call external APIs
      const response = await axios.post(
        "https://e-citizen.ng:8443/api/v2/verification/call-external-apis",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // Include the bearer token
          },
        }
      );
      // Handle response if needed
      console.log("External API call response:", response.data);
      // setBusinessData((prevBusinessData) => [
      //   ...prevBusinessData,
      //   response.data.data,
      // ]);
      if (
        response.data.business &&
        Array.isArray(response.data.business.data)
      ) {
        // Update businessData state with the data array
        setBusinessData(response.data.business.data);
      } else {
        console.error("Invalid response structure:", response.data);
      }
      // setBusinessData(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors if needed
      console.error("Error calling external APIs:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Business Verification Result</Heading4>
        </Card>

        {businessData && businessData.length > 0 ? (
          businessData.map((business) => (
            <Card
              style={{ width: "100%", marginTop: "20px" }}
              key={business.data.id}
            >
              <div>
                <Text>Business Profile</Text>
                <RightOutlined />
                <Text>Business Name</Text>
                <RightOutlined />
                <Text style={{ color: "#0DC939", fontWeight: "bold" }}>
                  {business.data.approvedName}
                </Text>
              </div>
              <Divider />
              <Row gutter={16}>
                <Col span={6}>
                  {renderDetail(
                    <UserOutlined />,
                    "Business Name",
                    business.data.approvedName
                      ? business.data.approvedName
                      : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <BankOutlined />,
                    "Registration Number",
                    business.data.rcNumber ? business.data.rcNumber : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <HomeOutlined />,
                    "City",
                    business.data.city ? business.data.city : `No Data`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MailOutlined />,
                    "Business Email",
                    business.data.email ? business.data.email : `No Data`
                  )}
                  <Divider />

                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "State",
                    business.data.state ? business.data.state : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <MailOutlined />,
                    "Postal Code",
                    business.data.postalCode
                      ? business.data.postalCode
                      : `No Data`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <CheckCircleOutlined />,
                    "Company Status",
                    business.data.companyStatus
                      ? business.data.companyStatus
                      : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <HomeOutlined />,
                    "Business Address",
                    business.data.address ? business.data.address : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <MailOutlined />,
                    "Postal Code",
                    business.data.postalCode
                      ? business.data.postalCode
                      : `No Data`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <UserOutlined />,
                    "Approved Name: ",
                    business.data.approvedName
                      ? business.data.approvedName
                      : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <HomeOutlined />,
                    "Branch Address",
                    business.data.branchAddress
                      ? business.data.branchAddress
                      : `No Data`
                  )}
                </Col>
                <Divider />
                {business["shareholders-data"] == null ? (
                  <MainButton
                    type="primary"
                    style={{ paddingRight: "50px", paddingLeft: "50px" }}
                    onClick={() => handleButtonClick(business.data.cacid)}
                  >
                    Shareholders {business.data.cacid}
                  </MainButton>
                ) : (
                  <span style={{ color: "red" }}>
                    We couldn't find any shareholders records based on the
                    information you provided.
                  </span>
                )}
              </Row>
            </Card>
          ))
        ) : (
          <Spin size="large" />
        )}
      </InfoSec>
    </Container>
  );
};

export default BusinessName;
