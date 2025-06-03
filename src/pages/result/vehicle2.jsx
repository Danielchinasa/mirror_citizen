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
import { Typography, Image } from "antd";
import Icon, {
  RightOutlined,
  CarOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
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

import { useHistory } from "react-router-dom";
import Reach1 from "../../images/reach1.jpeg";
import { theme } from "antd";
import baseUrl from "../../apiConfig";

const { Title, Text } = Typography;

const Vehicle2 = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const tokenExpire = user?.expirationDate || "";
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [vin, setVin] = useState("-");
  const [model, setModel] = useState("-");
  const [make, setMake] = useState("-");
  const [decision, setDecision] = useState("-");
  const [reason, setReason] = useState("-");
  const [chassisNumber, setChassisNumber] = useState("-");
  const [stolen, setStolen] = useState("-");
  const [stolenReports, setStolenReports] = useState("-");
  const [licenseNumber, setLicenseNumber] = useState("-");
  const [category, setCategory] = useState("-");
  const [ownerFirstName, setOwnerFirstName] = useState("-");
  const [ownerMiddleName, setOwnerMiddleName] = useState("-");
  const [ownerLastName, setOwnerLastName] = useState("-");
  const [ownerAddress, setOwnerAddress] = useState("-");
  const [ownerLga, setOwnerLga] = useState("-");
  const [ownerState, setOwnerState] = useState("-");
  const [ownerPhone, setOwnerPhone] = useState("-");

  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    // Compare the current date with the expiration date
    if (currentDate >= expireDate) {
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
        const postResponse = await axios.get(
          `${baseUrl}/verification/check-consent/${requestId}`,
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
        const vinSpec = vehicleData.vin || "-";
        const modelSpec = vehicleData.model || "-";
        const makeSpec = vehicleData.make || "-";
        const decisionSpec = vehicleData.decision || "-";
        const reasonSpec = vehicleData.reason || "-";
        const chassisNumberSpec = vehicleData.chassisNumber || "-";
        const stolenSpec = vehicleData.stolen || "-";
        const stolenReportsSpec = vehicleData.stolenReports || "-";
        const licenseNumberSpec = vehicleData.license_number || "-";
        const categorySpec = vehicleData.category || "-";
        const ownerFirstNameSpec = vehicleData.owner_first_name || "-";
        const ownerMiddleNameSpec = vehicleData.owner_middle_name || "-";

        const ownerLastNameSpec = vehicleData.owner_last_name || "-";
        const ownerAddressSpec = vehicleData.owner_address || "-";
        const ownerLgaSpec = vehicleData.owner_lga || "-";
        const ownerStateSpec = vehicleData.owner_state || "-";
        const ownerPhoneSpec = vehicleData.owner_phone || "-";
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
      <StyledLabel $token={token}>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel $token={token}>
        <strong>{value != null && value !== "null" ? value : "-"}</strong>
      </StyledLabel>
    </>
  );
  const storedValue = localStorage.getItem("profile");
  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Link to="/main-dashboard">
            <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
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
                </div>
              </div>

              <Divider />
              <Row gutter={16}>
                <Col span={24}></Col>
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
                  {renderDetail(
                    <FaCarAlt />,
                    "Vehicle Category",
                    `${category}`
                  )}
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
                  {renderDetail(
                    <FaGlobe />,
                    "Owner Address",
                    `${ownerAddress}`
                  )}
                  <Divider />
                  {renderDetail(<FaGlobe />, "Owner LGA", `${ownerLga}`)}
                </Col>
              </Row>
              <Divider />
            </Card>
          </Spin>
        </InfoSec>
        <Title level={5} style={{ marginTop: "20px" }}>
          Your Offers
        </Title>
        <div class="container">
          <div class="row">
            <div
              className="col-sm-4 col-md-6 col-lg-3 mb-3"
              style={{
                backgroundImage: `url(${Reach1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                marginRight: "10px",
                cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
              }}
              onClick={() => {
                window.open(
                  "https://clk1.reachclk.com/avnq9z?landing_id=325&creative_id=1735",
                  "_blank"
                );
              }}
            ></div>
            <div
              className="col-sm-4 col-md-6 col-lg-3 mb-3 mr-3"
              style={{
                backgroundImage: `url(https://cdn.affisereach.com/public/creatives/soiipjRopdyV7BrVn0lhVUVfbLI1kUYsm13tSQ2Y.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                marginRight: "10px",
                cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
              }}
              onClick={() => {
                window.open(
                  "https://clk1.reachclk.com/I4KDDU?adv_sub1=info%40biosec.com.ng&landing_id=627&creative_id=1658",
                  "_blank"
                );
              }}
            ></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Vehicle2;
