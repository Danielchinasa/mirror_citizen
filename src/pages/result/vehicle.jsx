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
import { fetchVerificationResult, fetchUserProfile } from "../../redux/actions";
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
} from "react-icons/fa";
import { PiEngineLight } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbSteeringWheel } from "react-icons/tb";
import { GiCarWheel, GiChemicalTank } from "react-icons/gi";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuCar } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import Reach1 from "../../images/reach1.jpeg";
import RecommendedOffers from "../../components/ads/RecommendedOffers";
import { theme } from "antd";
import baseUrl from "../../apiConfig";
import { imageBaseUrl } from "../../apiConfig";
import { apiGetInternalCall } from "../../apiUtils";

const { Title, Text } = Typography;

const Vehicle = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("-");
  const [fuelType, setFuelType] = useState("-");
  const [transmission, setTransmission] = useState("-");
  const [vin, setVin] = useState("-");
  const [vehicleName, setVehicleName] = useState("-");
  const [vehicleAge, setVehicleAge] = useState("-");
  const [vehicleImage, setVehicleImage] = useState("-");
  const [year, setYear] = useState("-");
  const [madeIn, setMadeIn] = useState("-");
  const [model, setModel] = useState("-");
  const [trim, setTrim] = useState("-");
  const [engine, setEngine] = useState("-");
  const [make, setMake] = useState("-");
  const [style, setStyle] = useState("-");
  const [invoice, setInvoice] = useState("-");
  const [msrp, setMsrp] = useState("-");
  const [image, setImage] = useState("-");
  const [pdfUri, setpdfUri] = useState("-");
  const [chasisNumber, setChasisNumber] = useState("-");
  const [stolen, setStolen] = useState(false);
  const [report, setReport] = useState("-");
  const [verificationStatus, setVerificationStatus] = useState("-");
  const [verificationReference, setVerificationReference] = useState("-");

  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const postResponse = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken,
        );

        // Handle the response from the post request as needed

        const vehicleData = postResponse.data.data;

        setLoading(false);
        // Map API fields to local state (avoid duplicates)
        const vinSpec = vehicleData.vin || "-";
        const vName = vehicleData.vehicleName || "-";
        const vAge = vehicleData.vehicleAge || "-";
        const vImage =
          vehicleData.vehicleImage || vehicleData.previewImageURL || "-";
        const fuel = vehicleData.fuelType || "-";
        const trans = vehicleData.transmission || "-";
        const yr = vehicleData.year || "-";
        const madein = vehicleData.madeIn || "-";
        const mdl = vehicleData.model || "-";
        const trm = vehicleData.trim || "-";
        const eng = vehicleData.engine || "-";
        const mk = vehicleData.make || "-";
        const invoice = vehicleData.invoice || "-";
        const msrp = vehicleData.msrp || "-";
        const pdfUri = vehicleData.pdfUri || "-";
        const stolenFlag = vehicleData.stolen;
        const vStatus = vehicleData.verificationStatus || "-";
        const vRef = vehicleData.verificationReference || "-";

        setVehicleName(vName);
        setVehicleAge(vAge);
        setVehicleImage(vImage);
        setFuelType(fuel);
        setTransmission(trans);
        setVin(vinSpec);
        setYear(yr);
        setMadeIn(madein);
        setModel(mdl);
        setTrim(trm);
        setEngine(eng);
        setMake(mk);
        setStyle(style);
        setInvoice(invoice);
        setMsrp(msrp);
        setImage(vImage);
        setpdfUri(pdfUri);
        setStolen(stolenFlag);
        setVerificationStatus(vStatus);
        setVerificationReference(vRef);

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
        <strong>{value}</strong>
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
          <Spin spinning={loading} tip="Loading Data...">
            <DynamicCard
              style={{ width: "100%", marginTop: "20px" }}
              $token={token}
            >
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
                  <Text>Vehicle History (VIN - {`${vin}`})</Text>
                  {/* <RightOutlined />
                <Text>Clear VIN</Text> */}
                </div>
              </div>
              {/* <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <Text>CLEAR VIN PREVIEW REPORT</Text>
                </div>

                <div>
                  <a
                    href={`${imageBaseUrl}${pdfUri}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textAlign: "right",
                      fontSize: "15px",
                      color: "#FED001",
                      textDecoration: "none",
                      cursor: "pointer",
                      padding: "6px",
                      border: "2px solid #FED001",
                      borderRadius: "5px",
                    }}
                  >
                    <DownloadOutlined /> Download PDF for Full Report
                  </a>
                </div>
              </div> */}

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
                  {/* Vehicle header: image and basic info */}
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "center" }}
                  >
                    {vehicleImage && vehicleImage !== "-" ? (
                      <Image
                        width={160}
                        src={vehicleImage}
                        alt="Vehicle"
                        fallback={Reach1}
                      />
                    ) : (
                      <Avatar size={124} icon={<CarOutlined />} />
                    )}
                    <div>
                      <Title level={4}>
                        {vehicleName !== "-"
                          ? vehicleName
                          : "Vehicle History Profile"}
                      </Title>
                      <div>
                        <strong>VIN:</strong> {vin}
                      </div>
                      <div>
                        <strong>Age:</strong> {vehicleAge}
                      </div>
                      <div>
                        <strong>Verification:</strong> {verificationStatus}
                        {verificationReference && verificationReference !== "-"
                          ? ` — ${verificationReference}`
                          : null}
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaTeethOpen />, "Name", `${vehicleName}`)}
                  <Divider />

                  {renderDetail(<FaCalendarAlt />, "Year", `${year}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaGlobe />, "Made In", `${madeIn}`)}
                  <Divider />

                  {renderDetail(<FaCarAlt />, "Model", `${model}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaCarSide />, "Trim", `${trim}`)}
                  <Divider />
                  {renderDetail(<PiEngineLight />, "Engine", `${engine}`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<FaCarAlt />, "Make", `${make}`)}
                  <Divider />
                  {renderDetail(<FaCarAlt />, "Fuel Type", `${fuelType}`)}
                </Col>
                <Divider />
                {/* <Col span={6}>
                  {renderDetail(
                    <LiaFileInvoiceDollarSolid />,
                    "Msrp",
                    `${msrp}`
                  )}
                  <Divider />
                  {renderDetail(
                    <LiaFileInvoiceDollarSolid />,
                    "Invoice",
                    `${invoice}`
                  )}
                </Col>
                <Col span={6}>
                  {renderDetail(<TbSteeringWheel />, "Steering Type", `-`)}
                  <Divider />
                  {renderDetail(<GiCarWheel />, "Tires", `-`)}
                </Col> */}
                <Col span={6}>
                  {renderDetail(
                    <GiChemicalTank />,
                    "Transmission",
                    `${transmission}`,
                  )}
                  {/* <Divider />
                  {renderDetail(<LuCar />, "Wheel drive", `-`)} */}
                </Col>
                {/* <Col span={6}>
                  {renderDetail(<AiOutlineColumnWidth />, "Overall Width", `-`)}
                  <Divider />
                  {renderDetail(<IoMdSpeedometer />, "Highway Mileage", `-`)}
                </Col> */}
              </Row>
              {/* <Divider /> */}
              {/* <div>
              <a
                href={`https://e-citizen.ng:8444${pdfUri}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "right",
                  fontSize: "25px",
                  color: "#FED001",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Download PDF for Full Report
              </a>
            </div> */}
              {/* {stolen === null ? (
                ""
              ) : (
                <div>
                  <Text
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    LOCALIZED DATA
                  </Text>
                  <Divider />
                </div>
              )}

              {stolen === null ? (
                ""
              ) : stolen === true ? (
                <Row justify="center">
                  <Col span={24}>
                    <div style={{ textAlign: "center" }}>
                      <IoIosInformationCircleOutline
                        style={{
                          fontSize: "40px",
                          paddingBottom: "10px",
                          color: "#E2574C",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "23px",
                          color: text,
                          fontWeight: "bolder",
                        }}
                      >
                        This vehicle is in our database of stolen vehicles
                        <br />
                        <span
                          style={{
                            fontSize: "14px",
                            color: text,
                          }}
                        >
                          As of January 4, 2024, 12:45Am
                        </span>
                      </span>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row justify="center">
                  <Col span={24}>
                    <div style={{ textAlign: "center" }}>
                      <FaRegCheckCircle
                        style={{
                          fontSize: "40px",
                          paddingBottom: "10px",
                          color: "#11AF59",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "23px",
                          color: text,
                          fontWeight: "bolder",
                        }}
                      >
                        This vehicle is not found in our database of stolen
                        vehicles
                        <br />
                        <span
                          style={{
                            fontSize: "14px",
                            color: text,
                          }}
                        >
                          As of January 4, 2024, 12:45Am
                        </span>
                      </span>
                    </div>
                  </Col>
                </Row>
              )} */}
            </DynamicCard>
          </Spin>
        </InfoSec>
        <div style={{ display: "none" }}>
          <RecommendedOffers variant="green" />
        </div>
        {/*
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
                marginRight: "10px",
                height: "200px",
                cursor: "pointer",
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
                cursor: "pointer",
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
        */}
      </Container>
    </div>
  );
};

export default Vehicle;
