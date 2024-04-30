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

const { Title, Text } = Typography;

const Result = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";
  const [loading, setLoading] = useState(false);
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
  const [residenceLGA, setResidenceLGA] = useState("No Data");
  const [residenceState, setResidenceState] = useState("No Data");
  const [height, setHeight] = useState("No Data");
  const [title, setTitle] = useState("No Data");
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
          `https://e-citizen.ng:8443/api/v2/verification/check-consent/${requestId}`,
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
        const lastNameFromResponse = response.data.data.lastName || "No Data";
        const ninFromResponse = response.data.data.nin || "No Data";
        const dobFromResponse = response.data.data.dob || "No Data";
        const genderFromResponse = response.data.data.gender || "No Data";
        const residenceAddressFromResponse =
          response.data.data.residenceAddress || "No Data";
        const phoneFromResponse = response.data.data.phone || "No Data";
        const maritalStatusFromResponse =
          response.data.data.maritalStatus || "No Data";
        const religionFromResponse = response.data.data.religion || "No Data";
        const educationLevelFromResponse =
          response.data.data.educationLevel || "No Data";
        const professionFromResponse =
          response.data.data.profession || "No Data";
        const emailFromResponse = response.data.data.email || "No Data";
        const originLGAFromResponse = response.data.data.originLGA || "No Data";
        const originStateFromResponse =
          response.data.data.originState || "No Data";
        const birthCountryFromResponse =
          response.data.data.birthCountry || "No Data";
        const birthStateFromResponse =
          response.data.data.birthState || "No Data";
        const employmentSatusFromResponse =
          response.data.data.employmentSatus || "No Data";
        const photoFromResponse = response.data.data.photo || "No Data";
        const residenceLGAFromResponse =
          response.data.data.residenceLGA || "No Data";
        const residenceStateFromResponse =
          response.data.data.residenceState || "No Data";
        const heightFromResponse = response.data.data.height || "No Data";
        const titleFromResponse = response.data.data.title || "No Data";
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
              <Text>Basic Identity Profile </Text>
              <RightOutlined />
              {/* <Text>{storedValue}</Text> */}
              <Text>National Identification Number (NIN)</Text>
            </div>
            <Divider />

            <Row gutter={16}>
              <StyledLabel style={{ marginBottom: "10px" }}>
                Personal Details
              </StyledLabel>
              <Col span={24}>
                {photo ? (
                  <Avatar
                    size={124}
                    src={`https://e-citizen.ng:8443${photo}`}
                    alt="Avatar"
                  />
                ) : (
                  <Avatar size={124} icon={<UserOutlined />} />
                )}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Name",
                  `${firstName} ${lastName}`
                )}
                <Divider />

                {renderDetail(<AiOutlineFieldNumber />, "NIN", `${nin}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaCalendarAlt />, "Date of Birth", `${dob}`)}
                <Divider />

                {renderDetail(<FaPray />, "Religion", `${religion}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaHome />, "Address", `${residenceAddress}`)}
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
                  <MdOutlineWorkOutline />,
                  "Employment Status",
                  `${employmentStatus}`
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
                  "LGA of Origin",
                  `${originLGA}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "State of Origin",
                  `${originState}`
                )}
                <Divider />
                {renderDetail(
                  <GiBigDiamondRing />,
                  "Marrital Status",
                  `${maritalStatus}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(<IoSchoolSharp />, "Profession", `${profession}`)}
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
                  "Residence LGA",
                  `${residenceLGA}`
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
                  "Origin State",
                  `${originState}`
                )}
                <Divider />
                {renderDetail(
                  <MdOutlinePinDrop />,
                  "Origin LGA",
                  `${originLGA}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(<GiBodyHeight />, "Height", `${height}`)}
                <Divider />
                {renderDetail(<MdTitle />, "Title", `${title}`)}
              </Col>
            </Row>
          </Card>
        </Spin>
      </InfoSec>
    </Container>
  );
};

export default Result;
