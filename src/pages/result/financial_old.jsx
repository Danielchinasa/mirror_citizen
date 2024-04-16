import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Spin, Typography } from "antd";
import { Container, Heading4, InfoSec, StyledLabel } from "../../globalStyles";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Icon, { RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Financial = () => {
  const [loading, setLoading] = useState(false);
  const [basicData, setBasicData] = useState(null);
  const [crcData, setCrcData] = useState(null);
  const [creditRegistryData, setCreditRegistryData] = useState(null);
  const [firstCentralData, setFirstCentralData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        const userToken = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("hre");
        console.log(response);
        if (response.data.consent === "pending") {
          setLoading(true);
        } else {
          setLoading(false);
        }

        if ("basic-data" in response.data) {
          setBasicData(response.data["basic-data"]);
        }

        if ("crc-data" in response.data) {
          setCrcData(response.data["crc-data"]);
        }

        if ("creditRegistry-data" in response.data) {
          setCreditRegistryData(response.data["creditRegistry-data"]);
        }

        if ("firstCentral-data" in response.data) {
          setFirstCentralData(response.data["firstCentral-data"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderDetail = (label, value) => (
    <StyledLabel>
      <strong>{label}: </strong>
      {value}
    </StyledLabel>
  );

  if (loading) {
    Swal.fire({
      title: "Hmmm...",
      text: "Awaiting Consent",
      icon: "info",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Verification Result</Heading4>
          <div>
            <Text>Financial Credit Profile</Text>
            <RightOutlined />
            <Text>Bank Verification Number (BVN)</Text>
          </div>
        </Card>

        <Spin spinning={loading} tip="Awaiting Consent...">
          {/* Basic Data Section */}
          {basicData && (
            <Card style={{ width: "100%", marginBottom: "20px" }}>
              <Heading4>Basic Data</Heading4>
              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  {renderDetail("Name", basicData.name)}
                  {renderDetail("Gender", basicData.gender)}
                  {renderDetail("BVN", basicData.bvn)}
                  {renderDetail("Address", basicData.address)}
                </Col>
                <Col span={12}>
                  {renderDetail("Phone", basicData.phone)}
                  {renderDetail("Email", basicData.email || "No Data")}
                </Col>
              </Row>
            </Card>
          )}

          {/* CRC Data Section */}
          {crcData && (
            <Card style={{ width: "100%", marginBottom: "20px" }}>
              <Heading4>CRC Data</Heading4>
              <Divider />
              {/* Display CRC data here */}
            </Card>
          )}

          {/* Credit Registry Data Section */}
          {creditRegistryData && (
            <Card style={{ width: "100%", marginBottom: "20px" }}>
              <Heading4>Credit Registry Data</Heading4>
              <Divider />
              {/* Display Credit Registry data here */}
            </Card>
          )}

          {/* First Central Data Section */}
          {firstCentralData && (
            <Card style={{ width: "100%", marginBottom: "20px" }}>
              <Heading4>First Central Data</Heading4>
              <Divider />
              {/* Display First Central data here */}
            </Card>
          )}
        </Spin>
      </InfoSec>
    </Container>
  );
};

export default Financial;
