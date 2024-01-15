import React, { useState } from "react";
import { Col, Row, Alert, message } from "antd"; // Import message from Ant Design
import {
  CenterText,
  Heading,
  Subtitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  MainButtonFull,
  InfoSec,
  BtnLink,
} from "../../globalStyles";
import { SendOtp } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otpValues.join("");
    console.log(`Entered OTP: ${otpString}`);

    try {
      const response = await dispatch(SendOtp(otpString));
      console.log("SendOtp Response:", response);

      if (response === "user activated") {
        // Display success message
        console.log(`Entered OTP: jjjj`);
        message.success("OTP verification successful");
        // Handle further actions if needed
        history.push("/email-confirm");
      } else {
        // Display error message
        message.error(response.message || "OTP verification failed");
        // Handle further actions if needed
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div>
      <Row justify="center">
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
        <Col
          span={16}
          sm={{
            span: 24,
          }}
          xs={{
            span: 24,
          }}
          md={{
            span: 8,
          }}
          lg={{
            span: 8,
          }}
        >
          <CenterText>
            <InfoSec>
              <Heading>Enter OTP</Heading>
              <Subtitle color="light">
                Enter the OTP sent to +234 ********19 and example@biosec.com for
                continuation
              </Subtitle>
              <StyledForm>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {otpValues.map((value, index) => (
                    <StyledInput
                      key={index}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      style={{
                        width: "50px",
                        height: "60px",
                        textAlign: "center",
                      }}
                    />
                  ))}
                  {formErrors.general && (
                    <Alert
                      message={formErrors.general}
                      type="error"
                      showIcon
                      style={{ marginBottom: "16px" }}
                    />
                  )}
                </div>

                <MainButtonFull type="primary" onClick={handleVerifyOTP}>
                  Verify OTP
                </MainButtonFull>

                <p>I didn’t receive the OTP</p>
                <p>
                  <strong style={{ color: "#09C93A" }}>Resend Code</strong>
                </p>
              </StyledForm>
            </InfoSec>
          </CenterText>
        </Col>
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default VerifyOtp;
