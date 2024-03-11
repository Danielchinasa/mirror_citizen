import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar } from "antd";
import { Container, Heading4, InfoSec, StyledLabel } from "../../globalStyles";
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
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";

import { MdOutlinePinDrop } from "react-icons/md";

const { Title, Text } = Typography;

const Business = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
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
      } catch (error) {
        // Handle errors if needed
        console.error("Error checking consent:", error);
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
  const storedValue = localStorage.getItem("profile");

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Business Verification Result</Heading4>
        </Card>
        <Card style={{ width: "100%", marginTop: "20px" }}>
          <div>
            <Text>Business Profile</Text>
            <RightOutlined />
            <Text>Business Name</Text>
          </div>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              {renderDetail(<UserOutlined />, "Business Name", `No Data`)}
              <Divider />
              {renderDetail(<BankOutlined />, "Registration Number", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail(<MailOutlined />, "Business Email", `No Data`)}
              <Divider />

              {renderDetail(<MdOutlinePinDrop />, "State", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail(
                <CheckCircleOutlined />,
                "Company Status",
                `No Data`
              )}
              <Divider />
              {renderDetail(<HomeOutlined />, "Business Address", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail(<UserOutlined />, "Approved Name: ", `No Data`)}
              <Divider />
              {renderDetail(<HomeOutlined />, "Branch Address", `No Data`)}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail(<HomeOutlined />, "City", `No Data`)}
              <Divider />
            </Col>
            <Col span={6}>
              {renderDetail(<MailOutlined />, "Postal Code", `No Data`)}
              <Divider />
            </Col>
          </Row>
          <Divider />
          <div>
            <Text>Stakeholders Details </Text>
          </div>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              {renderDetail("Entity:", `No Data`)}
              <Divider />
              {renderDetail("Name: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Role: ", "No Data")}
              <Divider />
              {renderDetail("Place of Residence: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Gender: ", `No Data`)}
              <Divider />
              {renderDetail("Nationality: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Occupation: ", "No Data")}
              <Divider />
              {renderDetail("Email: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Phone Number: ", `No Data`)}
              <Divider />
              {renderDetail("Date of Birth: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Identity Document Number: ", "No Data")}
              <Divider />
              {renderDetail("Business contact: ", "No Data")}
            </Col>
            <Col span={6}>
              {renderDetail("Status: ", `No Data`)}
              <Divider />
              {renderDetail("Appointed on: ", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Date of Removal: ", `No Data`)}
              <Divider />
            </Col>
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

export default Business;
