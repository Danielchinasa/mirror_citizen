import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Spin, Avatar, Tabs, Table } from "antd";
import {
  Container,
  Heading,
  Heading4,
  InfoSec,
  StyledLabel,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";

import Swal from "sweetalert2";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const renderTable = (dataArray) => {
  const excludedColumns = ["insertionDate", "lastUpdatedAt"];
  const columns =
    dataArray.length > 0
      ? Object.keys(dataArray[0])
          .filter((key) => !excludedColumns.includes(key)) // Exclude specified columns
          .map((key) => ({ title: key, dataIndex: key, key: key }))
      : [];
  return (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table dataSource={dataArray} columns={columns} scroll={{ x: true }} />
    </div>
  );
};

const CountStatisticCard = ({ title, count }) => {
  return (
    <Card
      style={{
        textAlign: "center",
        width: 200, // Adjust the width here as needed
        marginBottom: "20px",
      }}
    >
      <Title level={4}>{title}</Title>
      <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</Text>
    </Card>
  );
};

const Financial = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(false);
  const [basicData, setBasicData] = useState(null);
  const [ficoData, setFicoData] = useState(null);
  const [crcData, setCrcData] = useState(null);
  const [crcDataStats, setCrcDataStats] = useState(null);
  const [creditRegistryData, setCreditRegistryData] = useState(null);
  const [creditRegistryDataStats, setCreditRegistryDataStats] = useState(null);
  const [firstCentralData, setFirstCentralData] = useState(null);
  const [firstCentralDataStats, setFirstCentralDataStats] = useState(null);
  const [ficoDataStats, setFicoDataStats] = useState(null);
  const [checkFirstCentralDataStats, setCheckFirstCentralDataStats] =
    useState(false);
  const [checkCreditRegistryDataStats, setCheckCreditRegistryDataStats] =
    useState(false);
  const [checkCrcDataStats, setCheckCrcDataStats] = useState(false);
  const [checkFicoDataStats, setCheckFicoDataStats] = useState(false);

  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

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
        console.log("hre");
        console.log(response);
        if (response.data.consent === "pending") {
          setLoading(true);
        } else {
          setLoading(false);
        }

        const crc = "crc-data";
        const basic = "basic-data";
        const fico = "FICO-Score";
        const firstCentral = "firstCentral-data";
        const creditRegistry = "creditRegistry-data";
        if ("basic-data" in response.data) {
          setBasicData(response.data["basic-data"]);
        }
        if ("FICO-Score" in response.data) {
          setCheckFicoDataStats(true);
          setFicoData(response.data["FICO-Score"]);
        }
        if ("crc-data" in response.data) {
          setCrcData(response.data["crc-data"]);
        }
        if ("firstCentral-data" in response.data) {
          setFirstCentralData(response.data["firstCentral-data"]);
        }
        if ("creditRegistry-data" in response.data) {
          setCreditRegistryData(response.data["creditRegistry-data"]);
        }

        if ("creditRegistry-data" in response.data) {
          setCheckCreditRegistryDataStats(true);
          setCreditRegistryDataStats(
            response.data["creditRegistry-data"]["data"]
          );
        }
        if ("firstCentral-data" in response.data) {
          setCheckFirstCentralDataStats(true);
          setFirstCentralDataStats(response.data["firstCentral-data"]["data"]);
        }
        if ("crc-data" in response.data) {
          setCheckCrcDataStats(true);
          setCrcDataStats(response.data["crc-data"]["data"]);
        }

        setFicoDataStats(response.data["FICO-Score"]);
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
      <StyledLabel>
        {label}: <strong>{value}</strong>
      </StyledLabel>
    </>
  );
  const storedValue = localStorage.getItem("profile");
  if (loading) {
    Swal.fire({
      title: "Hmmm...",
      text: "Awaiting Consent",
      icon: "info",
      didOpen: () => {
        Swal.showLoading();
      },
      // allowOutsideClick: false,
      // allowEscapeKey: false,
    });
  }
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const excludedFields = [
    "insertionDate",
    "lastReportedDate",
    "requestId",
    "id",
  ];
  if (checkCrcDataStats == true) {
    if (!crcDataStats || typeof crcDataStats !== "object") {
      return null; // or return a message indicating that the object is invalid
    }
  }
  if (checkFicoDataStats == true) {
    if (!ficoDataStats || typeof ficoDataStats !== "object") {
      return null; // or return a message indicating that the object is invalid
    }
  }
  if (checkFirstCentralDataStats == true) {
    if (!firstCentralDataStats || typeof firstCentralDataStats !== "object") {
      return null; // or return a message indicating that the object is invalid
    }
  }

  if (checkCreditRegistryDataStats == true) {
    if (
      !creditRegistryDataStats ||
      typeof creditRegistryDataStats !== "object"
    ) {
      return null; // or return a message indicating that the object is invalid
    }
  }

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card
          style={{ width: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <Heading4>Verification Result</Heading4>
        </Card>
        <Spin spinning={loading} tip="Awaiting Consent...">
          <Card
            style={{
              width: "100%",
              marginTop: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <Text>Financial Credit Profile</Text>
              <RightOutlined />
              <Text>Bank Verification Number (BVN)</Text>
            </div>
            <Divider />
          </Card>
          {basicData && (
            <Card
              style={{
                width: "100%",
                marginBottom: "20px",
                marginTop: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <Text>Basic Data </Text>
              </div>
              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  {renderDetail("Name", basicData[0].name)}
                  {renderDetail("Gender", basicData[0].gender)}
                  {renderDetail("BVN", basicData[0].bvn)}
                </Col>
                <Col span={12}>
                  {renderDetail("Phone", basicData[0].phone || "No Data")}
                  {renderDetail("Address", basicData[0].address || "No Data")}
                  {renderDetail("Email", basicData[0].email || "No Data")}
                </Col>
              </Row>
            </Card>
          )}
          {ficoData && (
            <Card
              style={{
                width: "100%",
                marginBottom: "20px",
                marginTop: "20px",
                background: "rgba(13, 201, 57, 0.3)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <Text>Credit Score </Text>
              </div>
              <Divider />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {Object.entries(ficoDataStats)
                  .filter(([key]) => !excludedFields.includes(key))
                  .map(([key, value]) => (
                    <Card
                      key={key}
                      style={{ width: "auto", marginBottom: "20px" }}
                    >
                      <p>{key}</p>
                      <h6>{value}</h6>
                    </Card>
                  ))}
              </div>
            </Card>
          )}
          <Card
            style={{
              width: "100%",
              marginBottom: "20px",
              marginTop: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tabs defaultActiveKey="1">
              {checkFirstCentralDataStats == true ? (
                <TabPane tab="First Central" key="1">
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {Object.entries(firstCentralDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value]) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{key}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))}
                  </div>
                  {firstCentralData &&
                    Object.entries(firstCentralData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        return (
                          <div key={key}>
                            <Text>{key} </Text>
                            {renderTable(value)}
                          </div>
                        );
                      }
                      return null;
                    })}
                </TabPane>
              ) : (
                ""
              )}
              {checkCrcDataStats == true ? (
                <TabPane tab="CRC" key="2">
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {Object.entries(crcDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value]) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{key}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))}
                  </div>

                  {crcData &&
                    Object.entries(crcData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        return (
                          <div key={key}>
                            <Text>{key} </Text>
                            {renderTable(value)}
                          </div>
                        );
                      }
                      return null;
                    })}
                </TabPane>
              ) : (
                ""
              )}
              {checkCreditRegistryDataStats == true ? (
                <TabPane tab="Credit Registry" key="3">
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {Object.entries(creditRegistryDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value]) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{key}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))}
                  </div>
                  {creditRegistryData &&
                    Object.entries(creditRegistryData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        return (
                          <div key={key}>
                            <Text>{key} </Text>
                            {renderTable(value)}
                          </div>
                        );
                      }
                      return null;
                    })}
                </TabPane>
              ) : (
                ""
              )}
            </Tabs>
          </Card>
        </Spin>
      </InfoSec>
      <Title level={5} style={{ marginTop: "20px" }}>
        Your Offers
      </Title>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Car Finance</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#DDF9EA",
                }}
              >
                <p class="card-text">Credit Cards handpicked for you</p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Car Insurance</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#ECF5F8",
                }}
              >
                <p class="card-text">
                  Borrow from 100,000 with monthly repayments of to 7 years.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Financial;
