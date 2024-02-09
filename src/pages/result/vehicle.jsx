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

const { Title, Text } = Typography;

const Vehicle = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(true);
  const [vin, setVin] = useState("No Data");
  const [year, setYear] = useState("No Data");
  const [madeIn, setMadeIn] = useState("No Data");
  const [model, setModel] = useState("No Data");
  const [trim, setTrim] = useState("No Data");
  const [engine, setEngine] = useState("No Data");
  const [make, setMake] = useState("No Data");
  const [style, setStyle] = useState("No Data");
  const [invoice, setInvoice] = useState("No Data");
  const [msrp, setMsrp] = useState("No Data");
  const [image, setImage] = useState("No Data");
  const [pdfUri, setpdfUri] = useState("No Data");
  const [chasisNumber, setChasisNumber] = useState("No Data");
  const [stolen, setStolen] = useState("No Data");
  const [report, setReport] = useState("No Data");

  // const verificationResult = useSelector(
  //   (state) => state.verificationResult.data
  // );
  const requestId = localStorage.getItem("verificationRequestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a new API post request independently of the consent status
        // const postResponse = await axios.post(
        //   "http://41.184.212.26:8063/api/v2/call-external-apis",
        //   {
        //     vehicle: {
        //       vin: "5TDYK3DC8DS290235",
        //     },
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${userToken}`,
        //     },
        //   }
        // );

        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const postResponse = await axios.get(
          `http://41.184.212.26:8063/api/v2/check-consent/${requestId}`,
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
        const year = vehicleData.year || "No Data";
        const madein = vehicleData.madeIn || "No Data";
        const model = vehicleData.model || "No Data";
        const trim = vehicleData.trim || "No Data";
        const engine = vehicleData.engine || "No Data";
        const make = vehicleData.make || "No Data";
        const style = vehicleData.style || "No Data";
        const invoice = vehicleData.invoice || "No Data";
        const msrp = vehicleData.msrp || "No Data";
        const image = vehicleData.previewImageURL || "No Data";
        const pdfUri = vehicleData.pdfUri || "No Data";
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

        // Your existing code for handling response data from the consent status check
      } catch (error) {
        // Handle errors if needed
        console.error("Error making post request:", error);
      }
    };

    // Fetch verification result and make post request when the component mounts
    fetchData();
  }, [dispatch, userToken]);

  const renderDetail = (label, value) => (
    <>
      <StyledLabel>{label}</StyledLabel>
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
          <p style={{ color: "#0DC939" }}>Go back</p>
        </Link>
        <Card style={{ width: "100%" }}>
          <Heading4>Vehicle Verification Result</Heading4>
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
                <Text>Vehicle Identification Number (VIN)</Text>
                {/* <RightOutlined />
                <Text>Clear VIN</Text> */}
              </div>
              <div>
                <a
                  href={`http://41.184.212.26:8063${pdfUri}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    color: "#09C93A",
                    textDecoration: "none",
                    cursor: "pointer",
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
                <Avatar size={124} icon={<CarOutlined />} />
                {/* )} */}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail("Vin", `${vin}`)}
                <Divider />

                {renderDetail("Year", `${year}`)}
              </Col>
              <Col span={6}>
                {renderDetail("Made In", `${madeIn}`)}
                <Divider />

                {renderDetail("Model", `${model}`)}
              </Col>
              <Col span={6}>
                {renderDetail("Trim", `${trim}`)}
                <Divider />
                {renderDetail("Engine", `${engine}`)}
              </Col>
              <Col span={6}>
                {renderDetail("Make", `${make}`)}
                <Divider />
                {renderDetail("Style", `${style}`)}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail("Msrp", `${msrp}`)}
                <Divider />
                {renderDetail("Invoice", `${invoice}`)}
              </Col>
              <Col span={6}>
                {renderDetail("Steering Type", `No Data`)}
                <Divider />
                {renderDetail("Tires", `No Data`)}
              </Col>
              <Col span={6}>
                {renderDetail("Tank Size", `No Data`)}
                <Divider />
                {renderDetail("Wheel drive", `No Data`)}
              </Col>
              <Col span={6}>
                {renderDetail("Overall Width", `No Data`)}
                <Divider />
                {renderDetail("Highway Mileage", `No Data`)}
              </Col>
            </Row>
            <Divider />
            {/* <div>
              <a
                href={`http://41.184.212.26:8063${pdfUri}`}
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
                  src={`http://41.184.212.26:8063${photo}`}
                  alt="Avatar"
                />
              ) : (
                <Avatar size={124} icon={<UserOutlined />} />
              )} */}
              </Col>
              <Divider />
              <Col span={6}>
                {renderDetail("Chassis Number", `${chasisNumber}`)}
              </Col>
              <Col span={6}>{renderDetail("Stolen", `${stolen}`)}</Col>
              <Col span={6}>{renderDetail("Stolen Reports", `${report}`)}</Col>
            </Row>
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

export default Vehicle;
