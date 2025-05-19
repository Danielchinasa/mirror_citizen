import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Avatar, Spin } from "antd";
import {
  Container,
  Heading,
  Heading4,
  InfoSec,
  StyledLabel,
  Heading6,
  CenterText,
  DynamicCard,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchVerificationResult,
  logout,
  fetchUserProfile,
} from "../../redux/actions";
import axios from "axios";
import { Typography } from "antd";
import Icon, { RightOutlined, UserOutlined } from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";
import "../dashboard/emergency.css";
import {
  FaRegUser,
  FaCalendarAlt,
  FaPray,
  FaHome,
  FaRestroom,
  FaPhoneAlt,
  FaGlobe,
} from "react-icons/fa";
import {
  MdOutlineMail,
  MdOutlineWorkOutline,
  MdOutlinePinDrop,
  MdTitle,
} from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiBigDiamondRing, GiBodyHeight } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { Title, Text } = Typography;

const Result = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("-");
  const [middleName, setMiddleName] = useState("-");
  const [lastName, setLastName] = useState("-");
  const [nin, setNin] = useState("-");
  const [dob, setDob] = useState("-");
  const [gender, setGender] = useState("-");
  const [residenceAddress, setResidenceAddress] = useState("-");
  const [phone, setPhone] = useState("-");
  const [maritalStatus, setMaritalStatus] = useState("-");
  const [religion, setReligion] = useState("-");
  const [educationLevel, setEducationLevel] = useState("-");
  const [profession, setProfession] = useState("-");
  const [email, setEmail] = useState("-");
  const [birthCountry, setBirthCountry] = useState("-");
  const [birthState, setBirthState] = useState("-");
  const [birthLGA, setBirthLGA] = useState("-");
  const [originState, setOriginState] = useState("-");
  const [originPlace, setOriginPlace] = useState("-");
  const [employmentStatus, setEmploymentStatus] = useState("-");
  const [originLGA, setOriginLGA] = useState("-");
  const [photo, setPhoto] = useState("-");
  const [residenceLGA, setResidenceLGA] = useState("-");
  const [residenceState, setResidenceState] = useState("-");
  const [height, setHeight] = useState("-");
  const [title, setTitle] = useState("-");
  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");
  console.log("photo", photo);

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    // Compare the current date with the expiration date
    if (currentDate >= expireDate) {
      // If the current date is greater than or equal to the expiration date,
      // it means the token has expired
      dispatch(logout());
      history.push("/");
    } else {
      // Token is still valid
      // You may want to handle this case differently
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const response = await axios.get(
          `https://e-citizen.ng:8444/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        // console.log("Consent Check");
        // console.log(response.data.consent);
        if (response.data.consent === "pending") {
          setLoading(true);
        } else {
          setLoading(false);
        }
        // console.log("hre");
        // console.log(response.data);
        const firstNameFromResponse = response.data.data.firstName || "";
        const middleNameFromResponse = response.data.data.middleName || "";
        const lastNameFromResponse = response.data.data.lastName || "-";
        const ninFromResponse = response.data.data.nin || "-";
        const dobFromResponse = response.data.data.dob || "-";
        const genderFromResponse = response.data.data.gender || "-";
        const residenceAddressFromResponse =
          response.data.data.residenceAddress || "-";
        const phoneFromResponse = response.data.data.phone || "-";
        const maritalStatusFromResponse =
          response.data.data.maritalStatus || "-";
        const religionFromResponse = response.data.data.religion || "-";
        const educationLevelFromResponse =
          response.data.data.educationLevel || "-";
        const professionFromResponse = response.data.data.profession || "-";
        const emailFromResponse = response.data.data.email || "-";
        const originLGAFromResponse = response.data.data.originLGA || "-";
        const originStateFromResponse = response.data.data.originState || "-";
        const originPlaceFromResponse = response.data.data.originPlace || "-";
        const birthCountryFromResponse = response.data.data.birthCountry || "-";
        const birthStateFromResponse = response.data.data.birthState || "-";
        const birthLGAFromResponse = response.data.data.birthLGA || "-";
        const employmentSatusFromResponse =
          response.data.data.employmentSatus || "-";
        const photoFromResponse = response.data.data.photo || "-";
        const residenceLGAFromResponse = response.data.data.residenceLGA || "-";
        const residenceStateFromResponse =
          response.data.data.residenceState || "-";
        const heightFromResponse = response.data.data.height || "-";
        const titleFromResponse = response.data.data.title || "-";
        setFirstName(firstNameFromResponse);
        setMiddleName(middleNameFromResponse);
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
        setOriginPlace(originPlaceFromResponse);
        setOriginLGA(originLGAFromResponse);
        setBirthState(birthStateFromResponse);
        setBirthLGA(birthLGAFromResponse);
        setEmploymentStatus(employmentSatusFromResponse);
        setPhoto(photoFromResponse);
        setResidenceLGA(residenceLGAFromResponse);
        setResidenceState(residenceStateFromResponse);
        setHeight(heightFromResponse);
        setTitle(titleFromResponse);
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
      <StyledLabel $token={token}>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel $token={token}>
        <strong>{value != null && value !== "null" ? value : "-"}</strong>
      </StyledLabel>
    </>
  );
  // const renderDetail = (icon, label, value) => (
  //   <>
  //     <StyledLabel>
  //       {icon}
  //       &nbsp; {label}
  //     </StyledLabel>
  //     <StyledLabel>
  //       <strong>{value}</strong>
  //     </StyledLabel>
  //   </>
  // );
  const storedValue = localStorage.getItem("profile");

  if (loading) {
    Swal.fire({
      background: bgContainer,
      color: text,
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
  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Link to="/main-dashboard" style={{ color: text }}>
            <p style={{ color: text, cursor: "pointer" }}>Go back</p>
          </Link>
          <Card
            style={{
              width: "100%",
              backgroundColor: bgContainer,
              borderColor: text,
            }}
          >
            <Heading4 $token={token}>Verification Result</Heading4>
          </Card>
          <Spin spinning={loading} tip="Awaiting Consent...">
            <DynamicCard
              style={{ width: "100%", marginTop: "20px" }}
              $token={token}
            >
              <div>
                <Text>Basic Identity Profile </Text>
                <RightOutlined />
                {/* <Text>{storedValue}</Text> */}
                <Text>National Identification Number (NIN)</Text>
              </div>
              <Divider />

              <Row gutter={16}>
                <StyledLabel style={{ marginBottom: "10px" }} $token={token}>
                  Personal Details
                </StyledLabel>
                <Col span={24}>
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
                <Divider />
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "First Name", `${firstName}`)}
                  <Divider />

                  {renderDetail(<AiOutlineFieldNumber />, "NIN", `${nin}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Middle Name", `${middleName}`)}
                  <Divider />

                  {renderDetail(<FaCalendarAlt />, "Date of Birth", `${dob}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaRegUser />, "Last Name", `${lastName}`)}
                  <Divider />
                  {renderDetail(<FaRestroom />, "Gender", `${gender}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaPhoneAlt />, "Phone Number", `${phone}`)}
                  <Divider />
                  {renderDetail(<MdOutlineMail />, "Email", `${email}`)}
                </Col>
                <Divider />
                <Col span={6}>
                  {renderDetail(
                    <FaGlobe />,
                    "Country of Birth",
                    `${birthCountry}`
                  )}
                  <Divider />
                  {renderDetail(
                    <FaHome />,
                    "Residence Address",
                    `${residenceAddress}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "State of Birth",
                    `${birthState}`
                  )}
                  <Divider />
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Residence State",
                    `${residenceState}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "LGA of Birth",
                    `${originState}`
                  )}
                  <Divider />
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Residence LGA",
                    `${residenceLGA}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <IoSchoolSharp />,
                    "Profession",
                    `${profession}`
                  )}
                  <Divider />
                  {renderDetail(
                    <IoSchoolSharp />,
                    "Education Level",
                    `${educationLevel}`
                  )}
                </Col>
                <Divider />
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Origin State",
                    `${originState}`
                  )}
                  <Divider />
                  {renderDetail(<GiBodyHeight />, "Height", `${height}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Origin LGA",
                    `${originLGA}`
                  )}
                  <Divider />
                  {renderDetail(
                    <GiBigDiamondRing />,
                    "Marital Status",
                    `${maritalStatus}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(
                    <MdOutlinePinDrop />,
                    "Origin Place",
                    `${originPlace}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(<MdTitle />, "Title", `${title}`)}
                </Col>
              </Row>
            </DynamicCard>
          </Spin>
        </InfoSec>
      </Container>
    </div>
  );
};

export default Result;
