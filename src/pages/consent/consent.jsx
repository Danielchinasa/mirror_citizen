import React, { useEffect, useState } from "react";
import { Col, Spin } from "antd";
import { Subtitle, Heading, InfoSec, BtnLink } from "../../globalStyles";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 84,
    }}
    spin
  />
);

const Consent = ({ history }) => {
  const [isConsentGranted, setIsConsentGranted] = useState(false);
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  useEffect(() => {
    const checkConsent = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        // Make an API request to check consent status
        const response = await axios.get(
          `http://41.184.212.26:8069/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        const consentStatus = response.data.consent; // Adjust this based on your API response structure

        if (consentStatus === "granted") {
          // Consent granted, redirect to result page
          setIsConsentGranted(true);
          clearInterval(intervalId); // Stop polling
          // localStorage.removeItem("verificationRequestId");
          history.push("/result");
        }
      } catch (error) {
        // Handle errors if needed
        console.error("Error checking consent:", error);
      }
    };

    // Poll the API every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(checkConsent, 15000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [history]);
  return (
    <div>
      <center>
        <InfoSec>
          <Col
            span={10}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 15 }}
            lg={{ span: 15 }}
          >
            <Spin indicator={antIcon} />
            <Heading>Awaiting consent...</Heading>
            <Subtitle>
              We have sent a consent request to the data subject and verified
              and are currently awaiting their response. An email will be sent
              to you regarding the status of your request. You can track the
              progress via the dashboard. Please be aware that the data
              subject's information will be retained for a period of 24 hours
              from the moment they grant consent. Thank you for your patience.
            </Subtitle>
            <BtnLink to="/main-dashboard">
              <Subtitle color="primary" style={{ marginTop: "50px" }}>
                Return to Dashboard
              </Subtitle>
            </BtnLink>
          </Col>
        </InfoSec>
      </center>
    </div>
  );
};

export default Consent;
