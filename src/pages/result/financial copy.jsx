import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Spin, Avatar } from "antd";
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
import Icon, {
  RightOutlined,
  UserOutlined,
  MailOutlined,
  BankOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  RiseOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";
import {
  FaCalendarAlt,
  FaHome,
  FaRestroom,
  FaPhoneAlt,
  FaGlobe,
  FaUser,
  FaChild,
} from "react-icons/fa";
import { MdOutlineMail, MdOutlineWorkOutline } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiBigDiamondRing } from "react-icons/gi";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

const Financial = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("No Data");
  const [lastName, setLastName] = useState("No Data");
  const [bvn, setBvn] = useState("No Data");
  const [dob, setDob] = useState("No Data");
  const [gender, setGender] = useState("No Data");
  const [residenceAddress, setResidenceAddress] = useState("No Data");
  const [phone, setPhone] = useState("No Data");
  const [maritalStatus, setMaritalStatus] = useState("No Data");
  const [religion, setReligion] = useState("No Data");
  const [educationLevel, setEducationLevel] = useState("No Data");
  const [profession, setProfession] = useState("No Data");
  const [email, setEmail] = useState("No Data");
  const [birthCountry, setBirthCountry] = useState("No Data");
  const [birthState, setBirthState] = useState("No Data");
  const [originState, setOriginState] = useState("No Data");
  const [employmentStatus, setEmploymentStatus] = useState("No Data");
  const [originLGA, setOriginLGA] = useState("No Data");
  const [photo, setPhoto] = useState("No Data");
  const [
    creditSummary_numberOfAccountsInBadStanding,
    setCreditSummary_numberOfAccountsInBadStanding,
  ] = useState("No Data");
  const [
    creditSummary_numberOfAccountsInGoodStanding,
    setCreditSummary_numberOfAccountsInGoodStanding,
  ] = useState("No Data");
  const [
    creditSummary_totalNumberOfAccountsReported,
    setCreditSummary_totalNumberOfAccountsReported,
  ] = useState("No Data");
  const [
    performanceClassification_noOfLoansDoubtful,
    setPerformanceClassification_noOfLoansDoubtful,
  ] = useState("No Data");

  const [
    performanceClassification_noOfLoansLost,
    setPerformanceClassification_noOfLoansLost,
  ] = useState("No Data");
  const [
    performanceClassification_noOfLoansPerforming,
    setPerformanceClassification_noOfLoansPerforming,
  ] = useState("No Data");
  const [
    performanceClassification_noOfLoansSubstandard,
    setPerformanceClassification_noOfLoansSubstandard,
  ] = useState("No Data");

  const [consumer_details_citizenship, setConsumer_details_citizenship] =
    useState("No Data");
  const [consumer_details_date_of_birth, setConsumer_details_date_of_birth] =
    useState("No Data");
  const [consumer_details_first_name, setConsumer_details_first_name] =
    useState("No Data");
  const [consumer_details_gender, setConsumer_details_gender] =
    useState("No Data");
  const [consumer_details_last_name, setConsumer_details_last_name] =
    useState("No Data");
  const [credit_has_creditfacilities, setCredit_has_creditfacilities] =
    useState("No Data");
  const [credit_last_reported_date, setCredit_last_reported_date] =
    useState("No Data");
  const [
    credit_no_of_delinqcreditfacilities,
    setCredit_no_of_delinqcreditfacilities,
  ] = useState("No Data");
  const [last_checked_date, setLast_checked_date] = useState("No Data");
  const [mfcredit_has_creditfacilities, setMfcredit_has_creditfacilities] =
    useState("No Data");
  const [mfcredit_last_reported_date, setMfcredit_last_reported_date] =
    useState("No Data");
  const [
    mfcredit_no_of_delinqcreditfacilities,
    setMfcredit_no_of_delinqcreditfacilities,
  ] = useState("No Data");
  const [identification_id_value, setIdentification_id_value] =
    useState("No Data");

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
        const firstCentral = "firstCentral-data";
        const creditRegistry = "creditRegistry-data";
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
  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Verification Result</Heading4>
        </Card>
        <Spin spinning={loading} tip="Awaiting Consent...">
          <Card style={{ width: "100%", marginTop: "20px" }}>
            <div>
              <Text>Financial Credit Profile</Text>
              <RightOutlined />
              <Text>Bank Verification Number (BVN)</Text>
            </div>
            <Divider />

            <Row gutter={16}>
              {/* <Col span={24}>
              <Avatar size={150} style={{ backgroundColor: "#B5EFC4" }}>
                <Title
                  level={5}
                  style={{ marginTop: "20px", color: "#09C93A" }}
                >
                  Credit score{" "}
                </Title>
                <Title style={{ color: "#09C93A" }}>800</Title>
              </Avatar>
            </Col> */}
              <div>
                <Text>FIRST CENTRAL CREDIT BUREAU </Text>
              </div>
              <Divider />
              <div>
                <Text>Basic Data </Text>
              </div>
              <Divider />
              <Col span={6}>
                {renderDetail(<FaUser />, "First Name", `${firstName}`)}
                <Divider />
                {renderDetail(<FaCalendarAlt />, "Date of birth", `${dob}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaUser />, "Last Name", `${lastName}`)}
                <Divider />

                {renderDetail(<FaRestroom />, "Gender", `${gender}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaGlobe />, "Nationality", `${originLGA}`)}
                <Divider />
                {renderDetail(<FaChild />, "Dependents", `${photo}`)}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Passport Number",
                  `${bvn}`
                )}
                <Divider />
                {renderDetail(<FaPhoneAlt />, "Home phone number", `${phone}`)}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail(
                  <FaPhoneAlt />,
                  "Work phone number",
                  `${religion}`
                )}
                <Divider />
                {renderDetail(<MdOutlineMail />, "Email address ", `${email}`)}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <GiBigDiamondRing />,
                  "Marital status",
                  `${maritalStatus}`
                )}
                <Divider />
                {renderDetail(
                  <FaHome />,
                  "Residential address",
                  `${residenceAddress}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <MdOutlineWorkOutline />,
                  "Employer",
                  `${educationLevel}`
                )}
                <Divider />
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "National Identification Number (NIN)",
                  `${originState}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Consumer ID",
                  `${birthCountry}`
                )}
                <Divider />
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Driver's license Number",
                  `${birthState}`
                )}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Property Owned Type",
                  `${employmentStatus}`
                )}
              </Col>
            </Row>
            <Divider />
            <div>
              <Text>Credit summary </Text>
            </div>
            <Divider />

            <Row gutter={16}>
              <Col span={7}>
                {renderDetail(
                  "Number Of Accounts In Bad Standing:",
                  ` ${creditSummary_numberOfAccountsInBadStanding}`
                )}
                <Divider />
              </Col>
              <Col span={8}>
                {renderDetail(
                  "Number Of Accounts In Good Standing: ",
                  ` ${creditSummary_numberOfAccountsInGoodStanding}`
                )}
                <Divider />
              </Col>
              <Col span={8}>
                {renderDetail(
                  "Total Number Of Accounts Reported:  ",
                  ` ${creditSummary_totalNumberOfAccountsReported}`
                )}
                <Divider />
              </Col>
            </Row>
            <Divider />
            <div>
              <Text>Performance classification </Text>
            </div>
            <Divider />

            <Row gutter={16}>
              <Col span={6}>
                {renderDetail(
                  "Number of lost loans: ",
                  ` ${performanceClassification_noOfLoansLost}`
                )}
                <Divider />
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Uncertain loans: ",
                  `${performanceClassification_noOfLoansDoubtful}`
                )}
                <Divider />
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Active loan accounts:  ",
                  `${performanceClassification_noOfLoansPerforming}`
                )}
                <Divider />
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Below-standard loans:  ",
                  `${performanceClassification_noOfLoansSubstandard}`
                )}
                <Divider />
              </Col>
            </Row>
            <Divider />
            <div>
              <Text>CRC CREDIT BUREAU </Text>
            </div>
            <Divider />

            <Row gutter={16}>
              <Col span={6}>
                {renderDetail(
                  <FaUser />,
                  "First name: ",
                  `${consumer_details_first_name}`
                )}
                <Divider />
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Credit N0: Deliqcredit Facilities:  ",
                  `${credit_no_of_delinqcreditfacilities}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaUser />,
                  "Last name: ",
                  `${consumer_details_last_name}`
                )}
                <Divider />
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "Identification ID:  ",
                  `${identification_id_value}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaCalendarAlt />,
                  "Date of birth:  ",
                  `${consumer_details_date_of_birth}`
                )}
                <Divider />
                {renderDetail(
                  <FaCalendarAlt />,
                  "Last Checked:  ",
                  `${last_checked_date}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaRestroom />,
                  "Gender:  ",
                  `${consumer_details_gender}`
                )}
                <Divider />
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "MF Credit has Credi Facilities:  ",
                  `${mfcredit_has_creditfacilities}`
                )}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail(
                  <AiOutlineFieldNumber />,
                  "MF Credit No: Of Delinqcredit Facilities:  ",
                  `${mfcredit_no_of_delinqcreditfacilities}`
                )}
                <Divider />
                {renderDetail(
                  <FaCalendarAlt />,
                  "Last Reported Date:  ",
                  `${credit_last_reported_date}`
                )}
              </Col>
            </Row>
            <Divider />
            <div>
              <Text>Credit Nano Summary </Text>
            </div>
            <Divider />

            <Row gutter={16}>
              <Col span={6}>
                {renderDetail(
                  "Last Reported Date: ",
                  ` ${credit_last_reported_date}`
                )}
                <Divider />
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Has Credit Facilities: ",
                  `${credit_has_creditfacilities}`
                )}
                <Divider />
              </Col>
              <Col span={6}>
                {renderDetail(
                  "No: Of Delinqcredit Facilities:  ",
                  `${credit_no_of_delinqcreditfacilities}`
                )}
                <Divider />
              </Col>
            </Row>
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
