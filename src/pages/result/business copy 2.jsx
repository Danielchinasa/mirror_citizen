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
  MinusOutlined,
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";

import { MdOutlinePinDrop } from "react-icons/md";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";

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
          `${baseUrl}/verification/check-consent/${requestId}`,
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
  const renderDetail2 = (label, value) => (
    <>
      <StyledLabel> {label}</StyledLabel>
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
          <Heading4>Business Verification Result</Heading4>
        </Card>
        {businessData.map((business) => (
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
            </Row>

            <div>
              <Text>Stakeholders Details </Text>
            </div>
            <Divider />
            {business["shareholders-data"] &&
              business["shareholders-data"].map((stakeholder, index) => (
                <>
                  <Row gutter={16} key={index}>
                    <Col span={6}>
                      {renderDetail2(
                        "Surname:",
                        stakeholder.surname ? stakeholder.surname : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "First Name: ",
                        stakeholder.firstname
                          ? stakeholder.firstname
                          : `No Data`
                      )}

                      <Divider />

                      {renderDetail2(
                        "Other Name: ",
                        stakeholder.other_name
                          ? stakeholder.other_name
                          : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "Email: ",
                        stakeholder.email ? stakeholder.email : `No Data`
                      )}
                    </Col>
                    <Col span={6}>
                      {renderDetail2(
                        "Phone Number: ",
                        stakeholder.phone_number
                          ? stakeholder.phone_number
                          : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "Gender: ",
                        stakeholder.gender ? stakeholder.gender : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "Formar Nationality: ",
                        stakeholder.former_nationality
                          ? stakeholder.former_nationality
                          : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "Age: ",
                        stakeholder.age ? stakeholder.age : `No Data`
                      )}
                    </Col>
                    <Col span={6}>
                      {renderDetail2(
                        "City:",
                        stakeholder.city ? stakeholder.city : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "Occupation: ",
                        stakeholder.occupation
                          ? stakeholder.occupation
                          : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "RC Number: ",
                        stakeholder.rc_number
                          ? stakeholder.rc_number
                          : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "State: ",
                        stakeholder.state ? stakeholder.state : `No Data`
                      )}
                    </Col>
                    <Col span={6}>
                      {renderDetail2(
                        "Is a Lawyer: ",
                        stakeholder.is_lawyer
                          ? stakeholder.is_lawyer
                          : `No Data`
                      )}
                      <Divider />
                      {renderDetail2(
                        "Formal Type: ",
                        stakeholder.form_type
                          ? stakeholder.form_type
                          : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "Is Chairman: ",
                        stakeholder.is_chairman
                          ? stakeholder.is_chairman
                          : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "Country of Residence: ",
                        stakeholder.country_of_residence
                          ? stakeholder.country_of_residence
                          : `No Data`
                      )}
                    </Col>
                    <Divider />
                    <Col span={6}>
                      {renderDetail2(
                        "Type of Shares: ",
                        stakeholder.type_of_shares
                          ? stakeholder.type_of_shares
                          : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "Number of Shares Alloted: ",
                        stakeholder.num_shares_alloted
                          ? stakeholder.num_shares_alloted
                          : `No Data`
                      )}
                    </Col>
                    <Col span={6}>
                      {renderDetail2(
                        "Nationality: ",
                        stakeholder.nationality
                          ? stakeholder.nationality
                          : `No Data`
                      )}
                      <Divider />

                      {renderDetail2(
                        "Carried over from name: ",
                        stakeholder.is_carried_over_from_name_avai
                          ? stakeholder.is_carried_over_from_name_avai
                          : `No Data`
                      )}
                    </Col>
                  </Row>
                  <Divider
                    style={{
                      color: "red",
                      backgroundColor: "#0DC939",
                      border: "2px #0DC939 solid",
                    }}
                  />
                </>
              ))}
          </Card>
        ))}
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
