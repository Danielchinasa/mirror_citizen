import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Divider,
  Spin,
  Avatar,
  Tabs,
  Table,
  Badge,
} from "antd";
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
import GaugeChart from "react-gauge-chart";
import { FaRegMoneyBillAlt, FaRegCalendarTimes } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiHomeOfficeLine } from "react-icons/ri";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

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
  const [highestloanRequest, setHighestloanRequest] = useState(null);

  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
  // if (loading) {
  //   Swal.fire({
        background: bgContainer,
        color: text,
  //     title: "Hmmm...",
  //     text: "Awaiting Consent",
  //     icon: "info",
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //     // allowOutsideClick: false,
  //     // allowEscapeKey: false,
  //   });
  // }
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
  let summaryData = firstCentralDataStats;
  let crcsummaryData = crcDataStats;
  let creditRegistrySummaryData = creditRegistryDataStats;
  const formatAmountToNaira = (amount) => {
    // Convert number to string and split into array of characters
    let amountStr = String(amount);
    let amountArr = amountStr.split("");

    // Insert comma separators every three characters from the end
    for (let i = amountArr.length - 3; i > 0; i -= 3) {
      amountArr.splice(i, 0, ",");
    }

    // Add Naira symbol to the beginning
    amountArr.unshift("₦");

    // Join the array back into a string
    return amountArr.join("");
  };
  const { token } = theme.useToken();

  return (
    <Container $token={token}>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card
          style={{ width: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <Heading4>Verification Result</Heading4>
        </Card>
        <Spin spinning={loading} tip="loading...">
          <Card
            style={{
              width: "100%",
              marginTop: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div>
              <Text style={{ fontSize: "18px" }}>Financial Credit Profile</Text>
              <RightOutlined />
              <Text style={{ fontSize: "18px" }}>
                Bank Verification Number (BVN)
              </Text>
            </div>
            <Divider />
            <div class="container">
              <div class="row">
                <div class="col-md-12 col-lg-6 col-sm-12">
                  {basicData && (
                    <div>
                      <div class="row">
                        <div class="col-12">
                          {renderDetail("Name", basicData[0].name)}
                        </div>
                        <div class="col-12">
                          {renderDetail(
                            "Date of Birth",
                            basicData[0].dateOfBirth || "No Data"
                          )}
                        </div>
                        <div class="col-12">
                          {renderDetail("Gender", basicData[0].gender)}
                        </div>
                        <div class="col-12">
                          {renderDetail(
                            "Phone",
                            basicData[0].phone || "No Data"
                          )}
                        </div>
                        <div class="col-12">
                          {renderDetail("BVN", basicData[0].bvn)}
                        </div>
                        <div class="col-12">
                          {renderDetail(
                            "Address",
                            basicData[0].address || "No Data"
                          )}
                        </div>
                        <div class="col-12">
                          {renderDetail(
                            "Email",
                            basicData[0].email || "No Data"
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div class="col-md-12 col-lg-6 col-sm-12" style={{}}>
                  {ficoData && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <div style={{ marginRight: "20px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#CC440B",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>POOR (300 - 539)</span>
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <div style={{ marginRight: "20px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#E57E0D",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>AVERAGE (540 - 660)</span>
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <div style={{ marginRight: "20px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#FCCF38",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>GOOD (661 - 700)</span>
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <div style={{ marginRight: "20px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#67F351",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>VERY GOOD (701 - 750)</span>
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#186609",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>EXCELLENT (751 - 850)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={1000}
                        arcsLength={[0.9, 0.4, 0.1, 0.1, 0.2]}
                        colors={[
                          "#CC440B",
                          "#E57E0D",
                          "#FCCF38",
                          "#67F351",
                          "#186609",
                        ]}
                        percent={ficoData["ficoScore"] / 1000}
                        arcPadding={0.006}
                        hideText={true}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                          fontSize: "25px",
                        }}
                      >
                        <span style={{ color: "#126609" }}>Credit Score:</span>
                        &nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {ficoData["ficoScore"]}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* {ficoData && (
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
          )} */}
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
                    {/* {Object.entries(firstCentralDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value], index) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{customTexts[index]}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))} */}
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Highest Loan Request</p>
                      <h6>
                        {" "}
                        {summaryData &&
                          formatAmountToNaira(summaryData.highestLoanAmount)}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit facilities
                      </p>
                      <h6>
                        {" "}
                        {summaryData && summaryData.totalNoOfInstitutions}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total due (Overdue)</p>
                      <h6>
                        {" "}
                        {summaryData &&
                          formatAmountToNaira(summaryData.totalOverdue)}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total loan value</p>
                      <h6>
                        {" "}
                        {summaryData &&
                          formatAmountToNaira(summaryData.totalBorrowed)}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total outstanding value
                      </p>
                      <h6>
                        {" "}
                        {summaryData &&
                          formatAmountToNaira(summaryData.totalOutstanding)}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit loans
                      </p>
                      <h6> {summaryData && summaryData.totalNoOfLoans}</h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-warning">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of open credit facilities
                      </p>
                      <h6>
                        {" "}
                        {summaryData && summaryData.totalNoOfActiveLoans}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <RiHomeOfficeLine size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of delinquent facilities
                      </p>
                      <h6>
                        {" "}
                        {summaryData &&
                          summaryData.totalNoOfDelinquentFacilities}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Max no: of days due (overdue days)
                      </p>
                      <h6>
                        {" "}
                        {summaryData && summaryData.maxNoOfDays !== "null"
                          ? summaryData.maxNoOfDays
                          : "no data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of closed credit facilities
                      </p>
                      <h6>
                        {" "}
                        {summaryData &&
                        summaryData.totalNoOfClosedLoans !== "null"
                          ? summaryData.totalNoOfClosedLoans
                          : "no data"}
                      </h6>
                    </Card>
                  </div>
                  {firstCentralData &&
                    Object.entries(firstCentralData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        // Function to convert camelCase key to separate words
                        const getKeyText = (key) => {
                          // Remove the "data" part and split camelCase into words
                          return key
                            .replace("data", "")
                            .replace("-", "")
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            });
                        };

                        return (
                          <div key={key}>
                            <Text
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {getKeyText(key)}{" "}
                              {/* Use the function to convert key to separate words */}
                            </Text>
                            <Card
                              className="text-center"
                              style={{
                                width: "auto",
                                marginBottom: "20px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              {renderTable(value)}
                            </Card>
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
                    {/* {Object.entries(crcDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value]) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{key}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))} */}
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Highest Loan Request</p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.highestLoanAmount !== null
                          ? formatAmountToNaira(
                              crcsummaryData.highestLoanAmount
                            )
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit facilities
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalNoOfInstitutions !== null
                          ? crcsummaryData.totalNoOfInstitutions
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total due (Overdue)</p>
                      <h6>
                        {" "}
                        {crcsummaryData && crcsummaryData.totalOverdue !== null
                          ? formatAmountToNaira(crcsummaryData.totalOverdue)
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total loan value</p>
                      <h6>
                        {" "}
                        {crcsummaryData && crcsummaryData.totalBorrowed !== null
                          ? formatAmountToNaira(crcsummaryData.totalBorrowed)
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total outstanding value
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalOutstanding !== null
                          ? formatAmountToNaira(crcsummaryData.totalOutstanding)
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit loans
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalNoOfLoans !== null
                          ? crcsummaryData.totalNoOfLoans
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-warning">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of open credit facilities
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalNoOfActiveLoans !== null
                          ? crcsummaryData.totalNoOfActiveLoans
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <RiHomeOfficeLine size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of delinquent facilities
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalNoOfDelinquentFacilities !== null
                          ? crcsummaryData.totalNoOfDelinquentFacilities
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Max no: of days due (overdue days)
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData && crcsummaryData.maxNoOfDays !== null
                          ? crcsummaryData.maxNoOfDays
                          : "no data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of closed credit facilities
                      </p>
                      <h6>
                        {" "}
                        {crcsummaryData &&
                        crcsummaryData.totalNoOfClosedLoans !== null
                          ? crcsummaryData.totalNoOfClosedLoans
                          : "no data"}
                      </h6>
                    </Card>
                  </div>

                  {crcData &&
                    Object.entries(crcData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        // Function to convert camelCase key to separate words
                        const getKeyText = (key) => {
                          // Remove the "data" part and split camelCase into words
                          return key
                            .replace("data", "")
                            .replace("-", "")
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            });
                        };

                        return (
                          <div key={key}>
                            <Text
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {getKeyText(key)}{" "}
                              {/* Use the function to convert key to separate words */}
                            </Text>
                            <Card
                              className="text-center"
                              style={{
                                width: "auto",
                                marginBottom: "20px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              {renderTable(value)}
                            </Card>
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
                    {/* {Object.entries(creditRegistryDataStats)
                      .filter(([key]) => !excludedFields.includes(key))
                      .map(([key, value]) => (
                        <Card
                          key={key}
                          style={{ width: "auto", marginBottom: "20px" }}
                        >
                          <p>{key}</p>
                          <h6>{value}</h6>
                        </Card>
                      ))} */}
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Highest Loan Request</p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.highestLoanAmount !== null
                          ? formatAmountToNaira(
                              creditRegistrySummaryData.highestLoanAmount
                            )
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit facilities
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalNoOfInstitutions !== null
                          ? creditRegistrySummaryData.totalNoOfInstitutions
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total due (Overdue)</p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalOverdue !== null
                          ? formatAmountToNaira(
                              creditRegistrySummaryData.totalOverdue
                            )
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <FaRegMoneyBillAlt size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>Total loan value</p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalBorrowed !== null
                          ? formatAmountToNaira(
                              creditRegistrySummaryData.totalBorrowed
                            )
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-info">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total outstanding value
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalOutstanding !== null
                          ? formatAmountToNaira(
                              creditRegistrySummaryData.totalOutstanding
                            )
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <CiWallet size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of credit loans
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalNoOfLoans !== null
                          ? creditRegistrySummaryData.totalNoOfLoans
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-warning">
                          <HiOutlineBuildingOffice2 size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of open credit facilities
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalNoOfActiveLoans !== null
                          ? creditRegistrySummaryData.totalNoOfActiveLoans
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-primary">
                          <RiHomeOfficeLine size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of delinquent facilities
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalNoOfDelinquentFacilities !==
                          null
                          ? creditRegistrySummaryData.totalNoOfDelinquentFacilities
                          : "No Data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-danger">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Max no: of days due (overdue days)
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.maxNoOfDays !== null
                          ? creditRegistrySummaryData.maxNoOfDays
                          : "no data"}
                      </h6>
                    </Card>
                    <Card
                      className="text-center"
                      style={{
                        width: "200px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <p>
                        <span class="badge text-bg-secondary">
                          <FaRegCalendarTimes size={30} />
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Total no: of closed credit facilities
                      </p>
                      <h6>
                        {" "}
                        {creditRegistrySummaryData &&
                        creditRegistrySummaryData.totalNoOfClosedLoans !== null
                          ? creditRegistrySummaryData.totalNoOfClosedLoans
                          : "no data"}
                      </h6>
                    </Card>
                  </div>
                  {creditRegistryData &&
                    Object.entries(creditRegistryData).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        // Function to convert camelCase key to separate words
                        const getKeyText = (key) => {
                          // Remove the "data" part and split camelCase into words
                          return key
                            .replace("data", "")
                            .replace("-", "")
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            });
                        };

                        return (
                          <div key={key}>
                            <Text
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {getKeyText(key)}{" "}
                              {/* Use the function to convert key to separate words */}
                            </Text>
                            <Card
                              className="text-center"
                              style={{
                                width: "auto",
                                marginBottom: "20px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              {renderTable(value)}
                            </Card>
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
