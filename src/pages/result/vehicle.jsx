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
  const [vin, setVin] = useState("-");
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
  const [stolen, setStolen] = useState("-");
  const [report, setReport] = useState("-");

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
          userToken
        );

        // Handle the response from the post request as needed

        const vehicleData = postResponse.data.data;

        setLoading(false);
        const vinSpec = vehicleData.vin || "-";
        const year = vehicleData.year || "-";
        const madein = vehicleData.madeIn || "-";
        const model = vehicleData.model || "-";
        const trim = vehicleData.trim || "-";
        const engine = vehicleData.engine || "-";
        const make = vehicleData.make || "-";
        const style = vehicleData.style || "-";
        const invoice = vehicleData.invoice || "-";
        const msrp = vehicleData.msrp || "-";
        const image = vehicleData.previewImageURL || "-";
        const pdfUri = vehicleData.pdfUri || "-";
        const stolen = vehicleData.stolen || "-";
        setVin(vinSpec);
        setYear(year);
        setMadeIn(madein);
        setModel(model);
        setTrim(trim);
        setEngine(engine);
        setMake(make);
        setStyle(style);
        setInvoice(invoice);
        setMsrp(msrp);
        setImage(image);
        setpdfUri(pdfUri);
        setStolen(stolen);

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
                  <Text>Vehicle History (VIN)</Text>
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
                  <Text>CLEAR VIN PREVIEW REPORT</Text>
                  {/* <RightOutlined />
                <Text>Clear VIN</Text> */}
                </div>

                <div>
                  <a
                    href={`${imageBaseUrl}${pdfUri}`}
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
                </div>
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
                  {renderDetail(<FaTeethOpen />, "Vin", `${vin}`)}
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
                  {renderDetail(<FaCarAlt />, "Style", `${style}`)}
                </Col>
                <Divider />
                <Col span={6}>
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
                </Col>
                <Col span={6}>
                  {renderDetail(<GiChemicalTank />, "Tank Size", `-`)}
                  <Divider />
                  {renderDetail(<LuCar />, "Wheel drive", `-`)}
                </Col>
                <Col span={6}>
                  {renderDetail(<AiOutlineColumnWidth />, "Overall Width", `-`)}
                  <Divider />
                  {renderDetail(<IoMdSpeedometer />, "Highway Mileage", `-`)}
                </Col>
              </Row>
              <Divider />
              {/* <div>
              <a
                href={`https://e-citizen.ng:8444${pdfUri}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "right",
                  fontSize: "25px",
                  color: "#09C93A",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Download PDF for Full Report
              </a>
            </div> */}

              <div>
                <Text
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  LOCALIZED DATA
                </Text>
              </div>
              <Row gutter={16}>
                <Col span={24}>
                  {/* {photo ? (
                <Avatar
                  size={124}
                  src={`https://e-citizen.ng:8444${photo}`}
                  alt="Avatar"
                />
              ) : (
                <Avatar size={124} icon={<UserOutlined />} />
              )} */}
                </Col>
                <Divider />
                {/* <Col span={6}>
                {renderDetail(
                  <PiEngineLight />,
                  "Chassis Number",
                  `${chasisNumber}`
                )}
              </Col>
              <Col span={6}>
                {renderDetail(<FaFileInvoice />, "Stolen", `${stolen}`)}
              </Col>
              <Col span={6}>
                {renderDetail(<FaFileInvoice />, "Stolen Reports", `${report}`)}
              </Col> */}
              </Row>

              {!stolen ? (
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
                      {/* Adjust margin as needed */}
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
                      {/* Adjust margin as needed */}
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
              )}

              {/* <Row gutter={16}>
            <Divider />
            <Col span={6}>
              {renderDetail("Rebuilt", `${vin}`)}
              <Divider />

              {renderDetail("Salvage", `${year}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Not Actual", `${madeIn}`)}
              <Divider />

              {renderDetail("Clear", `${model}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Flood damage", `${trim}`)}
              <Divider />
              {renderDetail("Fire damage", `${engine}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Hail damage", `${make}`)}
              <Divider />
              {renderDetail("Salt water damage", `${style}`)}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail("Vandalism", `${msrp}`)}
              <Divider />
              {renderDetail("Kit", `${invoice}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Dismantled", `No Data`)}
              <Divider />
              {renderDetail("Junk", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Reconstructed", `No Data`)}
              <Divider />
              {renderDetail("Test Vehicle", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Refurbished", `No Data`)}
              <Divider />
              {renderDetail("Collision", `No Data`)}
            </Col>
          </Row>
          <Row gutter={16}>
            <Divider />
            <Col span={6}>
              {renderDetail("Reserved", `${vin}`)}
              <Divider />

              {renderDetail("Salvage Retention", `${year}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Totaledl", `${madeIn}`)}
              <Divider />

              {renderDetail("Remanufactured", `${model}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Gray Market", `${trim}`)}
              <Divider />
              {renderDetail("Warranty Return", `${engine}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Antique", `${make}`)}
              <Divider />
              {renderDetail("Street Rod", `${style}`)}
            </Col>
            <Divider />
            <Col span={6}>
              {renderDetail("Call Title Division", `${msrp}`)}
              <Divider />
              {renderDetail("Pending Junk", `${invoice}`)}
            </Col>
            <Col span={6}>
              {renderDetail("Junk Automobile", `No Data`)}
              <Divider />
              {renderDetail("Odometer may be Altered", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Odometer Replaced", `No Data`)}
              <Divider />
              {renderDetail("Crushed", `No Data`)}
            </Col>
            <Col span={6}>
              {renderDetail("Export only vehicle", `No Data`)}
              <Divider />
              {renderDetail("Salvage--Stolen", `No Data`)}
            </Col>
          </Row>
          <Divider />
          <div>
            <Text>Title History Information</Text>
          </div>
          <Row gutter={16}>
            <Divider />
            <Col span={24}>
              <Text>Title History Information</Text>
            </Col>
            <Col span={6}>{renderDetail("Title Issue date", `${vin}`)}</Col>
            <Col span={6}>{renderDetail("State", `${madeIn}`)}</Col>
            <Col span={6}>{renderDetail("Mileage", `${trim}`)}</Col>
          </Row> */}
            </DynamicCard>
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
                marginRight: "10px",
                height: "200px",
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
            {/* <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
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
          </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Vehicle;
