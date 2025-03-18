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
  SearchOutlined,
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";

import { MdOutlinePinDrop } from "react-icons/md";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { Title, Text } = Typography;

const Business = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [businessData, setBusinessData] = useState([]);
  const [shareholdersData, setShareholdersData] = useState([]);
  const requestId = localStorage.getItem("verificationRequestId");
  const [cacId, setCacId] = useState();
  const [loading, setLoading] = useState(false);
  const userEmail = user?.email || "";
  const userPhone = user?.phone || "";
  const [stakeHolderFeeUsd, setStakeHolderFeeUsd] = useState("");
  const [stakeHolderFeeNgn, setStakeHolderFeeNgn] = useState("");
  const userCurrency = user?.currency || "";
  const [currencyCheck, setCurrencyCheck] = useState("NGN");

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        // const response = await axios.get(
        //   `https://e-citizen.ng:8443/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${userToken}`, // Include the bearer token
        //     },
        //   }
        // );
        const response = await axios.post(
          "https://e-citizen.ng:8443/api/v2/transaction/services-prices",
          { ipAddress },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Service Fees");
        console.log(response.data.data[0].price);

        setCurrencyCheck(response.data.data[8].currency);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        // const response = await axios.get(
        //   `https://e-citizen.ng:8443/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${userToken}`, // Include the bearer token
        //     },
        //   }
        // );
        const response = await axios.post(
          "https://e-citizen.ng:8443/api/v2/transaction/services-prices",
          { ipAddress },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Stake Fees");
        console.log(response.data.data[8].price);

        setStakeHolderFeeUsd(response.data.data[8].price);
        // setStakeHolderFeeNgn(response.data.data[8].price);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchServiceFee();
  }, []);

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

  const config = {
    //live key
    public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}",
    amount: currencyCheck === "USD" ? stakeHolderFeeUsd : stakeHolderFeeUsd,
    currency: currencyCheck === "USD" ? "USD" : "NGN",
    payment_options:
      "card,mobilemoney,ussd, account, banktransfer, barter, nqr",
    customer: {
      email: userEmail,
      phone_number: userPhone,
      // name: userName,
    },

    customizations: {
      title: `Payment for stakeHolder lookup`,
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

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
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response);
        if (
          response.status === "successful" ||
          response.status === "success" ||
          response.status === "completed"
        ) {
          console.log("flutterWave success");

          setLoading(true);
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
        }
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };

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
                <Col span={8}>
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
                  <Divider />
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
                  <Divider />
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
                    "Branch Address",
                    business.data.branchAddress
                      ? business.data.branchAddress
                      : `No Data`
                  )}
                  <Divider />
                  {renderDetail(
                    <MailOutlined />,
                    "Postal Code",
                    business.data.postalCode
                      ? business.data.postalCode
                      : `No Data`
                  )}
                  <Divider />
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
                </Col>
                <Col span={9}>
                  {renderDetail(
                    <HomeOutlined />,
                    "Business Address",
                    business.data.address ? business.data.address : "No Data"
                  )}
                </Col>
                <Divider />
                {business["shareholders-data"] == null ? (
                  <MainButton
                    type="primary"
                    style={{ paddingRight: "50px", paddingLeft: "50px" }}
                    onClick={() => handleButtonClick(business.data.cacid)}
                  >
                    <SearchOutlined /> Lookup Stakeholder
                  </MainButton>
                ) : business["shareholders-data"].length > 0 ? (
                  <div>
                    {business["shareholders-data"].map((shareholder, index) => (
                      <div key={index}>
                        <Divider
                          style={{
                            color: "red",
                            backgroundColor: "#0DC939",
                            border: "1px #0DC939 solid",
                          }}
                        />
                        <Text
                          style={{
                            color: "#0DC939",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {shareholder.stake}
                          {shareholder.corporation_name == null ||
                          shareholder.corporation_name == "null"
                            ? ""
                            : " - " + shareholder.corporation_name}
                        </Text>

                        <Row
                          gutter={16}
                          key={index}
                          style={{ marginTop: "20px" }}
                        >
                          <Col span={6}>
                            {renderDetail2(
                              "Surname:",
                              shareholder.surname
                                ? shareholder.surname
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "First Name: ",
                              shareholder.firstname
                                ? shareholder.firstname
                                : `No Data`
                            )}

                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Other Name: ",
                              shareholder.other_name
                                ? shareholder.other_name
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "Email: ",
                              shareholder.email ? shareholder.email : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Phone Number: ",
                              shareholder.phone_number
                                ? shareholder.phone_number
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "Gender: ",
                              shareholder.gender
                                ? shareholder.gender
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Formar Nationality: ",
                              shareholder.former_nationality
                                ? shareholder.former_nationality
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "Age: ",
                              shareholder.age ? shareholder.age : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "City:",
                              shareholder.city ? shareholder.city : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "Occupation: ",
                              shareholder.occupation
                                ? shareholder.occupation
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "RC Number: ",
                              shareholder.rc_number
                                ? shareholder.rc_number
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "State: ",
                              shareholder.state ? shareholder.state : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Is a Lawyer: ",
                              shareholder.is_lawyer
                                ? shareholder.is_lawyer
                                : `No Data`
                            )}
                            <Divider />
                            {renderDetail2(
                              "Formal Type: ",
                              shareholder.form_type
                                ? shareholder.form_type
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Is Chairman: ",
                              shareholder.is_chairman
                                ? shareholder.is_chairman
                                : `No Data`
                            )}
                            <Divider />

                            {renderDetail2(
                              "Country of Residence: ",
                              shareholder.country_of_residence
                                ? shareholder.country_of_residence
                                : `No Data`
                            )}
                            <Divider />
                          </Col>

                          <Col span={6}>
                            {shareholder.stake != "Director"
                              ? renderDetail2(
                                  "Type of Shares: ",
                                  shareholder.type_of_shares
                                    ? shareholder.type_of_shares
                                    : `No Data`
                                )
                              : ""}
                            <Divider />

                            {renderDetail2(
                              "Nationality: ",
                              shareholder.nationality
                                ? shareholder.nationality
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Former name: ",
                              shareholder.former_name
                                ? shareholder.former_name
                                : `No Data`
                            )}
                            <Divider />

                            {renderDetail2(
                              "Carried over from name: ",
                              shareholder.is_carried_over_from_name_avai
                                ? shareholder.is_carried_over_from_name_avai
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Date of Termination: ",
                              shareholder.date_of_termination
                                ? shareholder.date_of_termination
                                : `No Data`
                            )}
                            <Divider />

                            {renderDetail2(
                              "Date of Appointment: ",
                              shareholder.date_of_appointment
                                ? shareholder.date_of_appointment
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Date of Status Change: ",
                              shareholder.date_of_status_change
                                ? shareholder.date_of_status_change
                                : `No Data`
                            )}
                            <Divider />

                            {renderDetail2(
                              "Identity Number: ",
                              shareholder.identity_number
                                ? shareholder.identity_number
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Government Organisation Name: ",
                              shareholder.government_organisation_name
                                ? shareholder.government_organisation_name
                                : `No Data`
                            )}
                            <Divider />

                            {renderDetail2(
                              "Foreign Organisation Name: ",
                              shareholder.foreign_organisation_name
                                ? shareholder.foreign_organisation_name
                                : `No Data`
                            )}
                            <Divider />
                          </Col>
                          <Col span={6}>
                            {renderDetail2(
                              "Full Address: ",
                              shareholder.full_address2
                                ? shareholder.full_address2
                                : `No Data`
                            )}
                            <Divider />
                            {shareholder.stake != "Director"
                              ? renderDetail2(
                                  "Number of Shares: ",
                                  shareholder.num_shares_alloted
                                    ? shareholder.num_shares_alloted
                                    : `No Data`
                                )
                              : ""}
                          </Col>
                        </Row>
                        {/* <Divider
                          style={{
                            color: "red",
                            backgroundColor: "#0DC939",
                            border: "2px #0DC939 solid",
                          }}
                        /> */}
                      </div>
                    ))}
                  </div>
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

export default Business;
