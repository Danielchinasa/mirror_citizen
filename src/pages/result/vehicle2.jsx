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
import { fetchVerificationResult } from "../../redux/actions";
import axios from "axios";
import { Typography, Image } from "antd";
import Icon, {
  RightOutlined,
  CarOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import carInsurance from "../../images/car-insurance.svg";
import creditCard from "../../images/credit-card.svg";
import AdsCard from "../../components/ads/adsCard";
import {
  FaTeethOpen,
  FaCalendarAlt,
  FaCarAlt,
  FaGlobe,
  FaCarSide,
  FaFileInvoice,
  FaRegCheckCircle,
  FaRegUser,
  FaPhone,
} from "react-icons/fa";
import { PiEngineLight } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbSteeringWheel } from "react-icons/tb";
import { GiCarWheel, GiChemicalTank } from "react-icons/gi";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuCar } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const { Title, Text } = Typography;

const Vehicle2 = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(true);
  const [vin, setVin] = useState("No Data");
  const [model, setModel] = useState("No Data");
  const [make, setMake] = useState("No Data");
  const [decision, setDecision] = useState("No Data");
  const [reason, setReason] = useState("No Data");
  const [chassisNumber, setChassisNumber] = useState("No Data");
  const [stolen, setStolen] = useState("No Data");
  const [stolenReports, setStolenReports] = useState("No Data");
  const [licenseNumber, setLicenseNumber] = useState("No Data");
  const [category, setCategory] = useState("No Data");
  const [ownerFirstName, setOwnerFirstName] = useState("No Data");
  const [ownerMiddleName, setOwnerMiddleName] = useState("No Data");
  const [ownerLastName, setOwnerLastName] = useState("No Data");
  const [ownerAddress, setOwnerAddress] = useState("No Data");
  const [ownerLga, setOwnerLga] = useState("No Data");
  const [ownerState, setOwnerState] = useState("No Data");
  const [ownerPhone, setOwnerPhone] = useState("No Data");

  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const postResponse = await axios.get(
          `https://41.184.212.26:8443/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );

        // Handle the response from the post request as needed
        console.log("Post Response:", postResponse.data);
        const vehicleData = postResponse.data.data;
        console.log("Post JSON:", vehicleData);
        setLoading(false);
        const vinSpec = vehicleData.vin || "No Data";
        const modelSpec = vehicleData.model || "No Data";
        const makeSpec = vehicleData.make || "No Data";
        const decisionSpec = vehicleData.decision || "No Data";
        const reasonSpec = vehicleData.reason || "No Data";
        const chassisNumberSpec = vehicleData.chassisNumber || "No Data";
        const stolenSpec = vehicleData.stolen || "No Data";
        const stolenReportsSpec = vehicleData.stolenReports || "No Data";
        const licenseNumberSpec = vehicleData.license_number || "No Data";
        const categorySpec = vehicleData.category || "No Data";
        const ownerFirstNameSpec = vehicleData.owner_first_name || "No Data";
        const ownerMiddleNameSpec = vehicleData.owner_middle_name || "No Data";

        const ownerLastNameSpec = vehicleData.owner_last_name || "No Data";
        const ownerAddressSpec = vehicleData.owner_address || "No Data";
        const ownerLgaSpec = vehicleData.owner_lga || "No Data";
        const ownerStateSpec = vehicleData.owner_state || "No Data";
        const ownerPhoneSpec = vehicleData.owner_phone || "No Data";
        setVin(vinSpec);
        setModel(modelSpec);
        setMake(makeSpec);
        setDecision(decisionSpec);
        setReason(reasonSpec);
        setChassisNumber(chassisNumberSpec);
        setStolen(stolenSpec);
        setStolenReports(stolenReportsSpec);
        setLicenseNumber(licenseNumberSpec);
        setCategory(categorySpec);
        setOwnerFirstName(ownerFirstNameSpec);
        setOwnerMiddleName(ownerMiddleNameSpec);
        setOwnerLastName(ownerLastNameSpec);
        setOwnerAddress(ownerAddressSpec);
        setOwnerLga(ownerLgaSpec);
        setOwnerState(ownerStateSpec);
        setOwnerPhone(ownerPhoneSpec);

        // Your existing code for handling response data from the consent status check
      } catch (error) {
        // Handle errors if needed
        console.error("Error making post request:", error);
      }
    };

    // Fetch verification result and make post request when the component mounts
    fetchData();
  }, [dispatch, userToken]);

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
          <Heading4>Verification Result</Heading4>
        </Card>
        <Spin spinning={loading} tip="Loading Data...">
          <Card style={{ width: "100%", marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Text>Vehicle History Profile </Text>
                <RightOutlined />
                <Text>Vehicle Registration Number</Text>
                {/* <RightOutlined />
                <Text>Clear VIN</Text> */}
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <Text>VEHICLE REPORT</Text>
                {/* <RightOutlined />
                <Text>Clear VIN</Text> */}
              </div>

              {/* <div>
                <a
                  href={`https://41.184.212.26:8443${pdfUri}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textAlign: "right",
                    fontSize: "15px",
                    color: "#09C93A",
                    textDecoration: "none",
                    cursor: "pointer",
                    padding: "6px",
                    border: "2px solid #09C93A",
                    borderRadius: "5px",
                  }}
                >
                  <DownloadOutlined /> Download PDF for Full Report
                </a>
              </div> */}
            </div>

            <Divider />
            <Row gutter={16}>
              <Col span={24}>
                {/* {image ? (
                <Avatar
                  size={224}
                  src={`${image}`}
                  alt="Avatar"
                  style={{ borderRadius: "4px" }} // Optional: Add a border-radius for a slightly rounded appearance
                  square
                />
              ) : ( */}
                {/* <Avatar size={124} icon={<CarOutlined />} /> */}
                Vehicle Specification
                {/* )} */}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaTeethOpen />,
                  "Chassis Number",
                  `${chassisNumber}`
                )}
                <Divider />

                {renderDetail(<FaFileInvoice />, "Reason", `${reason}`)}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaFileInvoice />,
                  "Registration Number",
                  `${licenseNumber}`
                )}
                <Divider />

                {renderDetail(<FaCarAlt />, "Model", `${model}`)}
              </Col>

              <Col span={6}>
                {renderDetail(<FaCarAlt />, "VIN", `${vin}`)}
                <Divider />
                {renderDetail(<FaFileInvoice />, "Decision", `${decision}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaCarAlt />, "Make", `${make}`)}
                <Divider />
                {renderDetail(<FaCarAlt />, "Stolen", `${stolen}`)}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Owner First Name",
                  `${ownerFirstName}`
                )}
                <Divider />
                {renderDetail(
                  <FaRegUser />,
                  "Owner Last Name",
                  `${ownerLastName}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaRegUser />,
                  "Owner Middlename",
                  `${ownerMiddleName}`
                )}
                <Divider />
                {renderDetail(<FaCarAlt />, "Vehicle Category", `${category}`)}
              </Col>
              <Col span={6}>
                {renderDetail(
                  <FaPhone />,
                  "Owner Phone Number",
                  `${ownerPhone}`
                )}
                <Divider />
                {renderDetail(
                  <FaFileInvoice />,
                  "Stolen Reports",
                  `${stolenReports}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(<FaGlobe />, "Owner Address", `${ownerAddress}`)}
                <Divider />
                {renderDetail(<FaGlobe />, "Owner LGA", `${ownerLga}`)}
              </Col>
            </Row>
            <Divider />
          </Card>
        </Spin>
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

export default Vehicle2;
