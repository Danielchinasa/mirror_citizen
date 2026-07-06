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
import RecommendedOffers from "../../components/ads/RecommendedOffers";
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
  MdOutlineMail,
  MdOutlineWorkOutline,
  MdOutlinePinDrop,
  MdTitle,
} from "react-icons/md";
import { theme } from "antd";
import baseUrl from "../../apiConfig";
import { apiGetInternalCall } from "../../apiUtils";

const { Title, Text } = Typography;

const Business = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [firstName, setFirstName] = useState("No Data");
  const [lastName, setLastName] = useState("No Data");
  const [nin, setNin] = useState("No Data");
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
  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  const [surname, setSurname] = useState("No Data");
  const [shareholdersData, setShareholdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const response = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken,
        );
        console.log("hre");
        console.log(response);
        const firstNameFromResponse = response.data.data.approvedName || "";
        const lastNameFromResponse = response.data.data.rcNumber || "No Data";
        const ninFromResponse = response.data.data.nin || "No Data";
        const dobFromResponse = response.data.data.dob || "No Data";
        const genderFromResponse = response.data.data.gender || "No Data";
        const residenceAddressFromResponse =
          response.data.data.address || "No Data";
        const phoneFromResponse = response.data.data.phone || "No Data";
        const maritalStatusFromResponse =
          response.data.data.companyStatus || "No Data";
        const religionFromResponse = response.data.data.religion || "No Data";
        const educationLevelFromResponse =
          response.data.data.educationLevel || "No Data";
        const professionFromResponse =
          response.data.data.companyStatus || "No Data";
        const emailFromResponse = response.data.data.email || "No Data";
        const originLGAFromResponse = response.data.data.state || "No Data";
        const originStateFromResponse = response.data.data.city || "No Data";
        const birthCountryFromResponse =
          response.data.data.birthCountry || "No Data";
        const birthStateFromResponse =
          response.data.data.birthState || "No Data";
        const employmentSatusFromResponse =
          response.data.data.employmentSatus || "No Data";
        const photoFromResponse = response.data.data.photo || "No Data";
        setFirstName(firstNameFromResponse);
        setLastName(lastNameFromResponse);
        setNin(ninFromResponse);
        setDob(dobFromResponse);
        setGender(genderFromResponse);
        setResidenceAddress(residenceAddressFromResponse);
        setPhone(phoneFromResponse);
        setMaritalStatus(maritalStatusFromResponse);
        setReligion(religionFromResponse);
        setEducationLevel(educationLevelFromResponse);
        setProfession(professionFromResponse);
        setEmail(emailFromResponse);
        setBirthCountry(birthCountryFromResponse);
        setOriginState(originStateFromResponse);
        setOriginLGA(originLGAFromResponse);
        setBirthState(birthStateFromResponse);
        setEmploymentStatus(employmentSatusFromResponse);
        setPhoto(photoFromResponse);

        const crc = "shareholders-data";
        const shareholdersDataresp = response.data[`${crc}`];
        const surenameresp = response.data.data[`${crc}`].surname || "No Data";
        setSurname(surenameresp);
        setShareholdersData(shareholdersDataresp);
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
  const { token } = theme.useToken();

  return (
    <Container $token={token}>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#FED001", cursor: "pointer" }}>Go back</p>
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
            {/* <Col span={24}>
              {photo ? (
                <Avatar
                  size={124}
                  src={`https://e-citizen.ng:8444${photo}`}
                  alt="Avatar"
                />
              ) : (
                <Avatar size={124} icon={<UserOutlined />} />
              )}
            </Col>
            <Divider /> */}
            <Col span={6}>
              {renderDetail(<UserOutlined />, "Business Name", `${firstName}`)}
              <Divider />
              {renderDetail(
                <BankOutlined />,
                "Registration Number",
                `${lastName}`,
              )}
            </Col>
            <Col span={6}>
              {renderDetail(<MailOutlined />, "Business Email", `${email}`)}
              <Divider />

              {renderDetail(<MdOutlinePinDrop />, "State", `${originLGA}`)}
            </Col>
            <Col span={6}>
              {renderDetail(
                <CheckCircleOutlined />,
                "Company Status",
                `${profession}`,
              )}
              <Divider />
              {renderDetail(
                <HomeOutlined />,
                "Business Address",
                `${residenceAddress}`,
              )}
            </Col>
            <Col span={6}>
              {renderDetail(
                <UserOutlined />,
                "Approved Name: ",
                `${firstName}`,
              )}
              <Divider />
              {renderDetail(
                <HomeOutlined />,
                "Branch Address",
                `${residenceAddress}`,
              )}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail(<HomeOutlined />, "City", `${originState}`)}
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

          {shareholdersData.map((shareholder, index) => (
            <Row key={index} gutter={16}>
              <Col span={6}>
                {renderDetail(
                  "Entity:",
                  shareholder.corporation_name
                    ? shareholder.corporation_name
                    : "No Data",
                )}
                <Divider />
                {renderDetail(
                  "Name: ",
                  `${shareholder.firstname} ${shareholder.surname}`,
                )}
              </Col>
              <Col span={6}>
                {renderDetail("Role: ", "No Data")}
                <Divider />
                {renderDetail(
                  "Place of Residence: ",
                  shareholder.address ? shareholder.address : "No Data",
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Gender: ",
                  shareholder.gender ? shareholder.gender : "No Data",
                )}
                <Divider />
                {renderDetail(
                  "Nationality: ",
                  shareholder.nationality ? shareholder.nationality : "No Data",
                )}
              </Col>
              <Col span={6}>
                {renderDetail("Occupation: ", "No Data")}
                <Divider />
                {renderDetail(
                  "Email: ",
                  shareholder.email ? shareholder.email : "No Data",
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Phone Number: ",
                  shareholder.phone_number
                    ? shareholder.phone_number
                    : "No Data",
                )}
                <Divider />
                {renderDetail(
                  "Date of Birth: ",
                  shareholder.date_of_birth
                    ? shareholder.date_of_birth
                    : "No Data",
                )}
              </Col>
              <Col span={6}>
                {renderDetail("Identity Document Number: ", "No Data")}
                <Divider />
                {renderDetail("Business contact: ", "No Data")}
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Status: ",
                  shareholder.status ? shareholder.status : "No Data",
                )}
                <Divider />
                {renderDetail(
                  "Appointed on: ",
                  shareholder.date_of_appointment
                    ? shareholder.date_of_appointment
                    : "No Data",
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  "Date of Removal: ",
                  shareholder.date_of_termination
                    ? shareholder.date_of_termination
                    : "No Data",
                )}
                <Divider />
              </Col>
            </Row>
          ))}
        </Card>
        <div style={{ display: "none" }}>
          <RecommendedOffers variant="green" />
        </div>
        {/*
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
        */}
      </InfoSec>
    </Container>
  );
};

export default Business;
