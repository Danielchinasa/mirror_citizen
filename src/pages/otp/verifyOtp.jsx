import React, { useState } from "react";
import { Col, Row } from "antd";
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

const VerifyOtp = () => {
  // State to manage OTP input values
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  // Function to handle OTP input change
  const handleOtpChange = (index, value) => {
    // Copy the current state array
    const newOtpValues = [...otpValues];
    // Update the value at the specified index
    newOtpValues[index] = value;
    // Update the state
    setOtpValues(newOtpValues);
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
                {/* Add 6-box OTP input */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {/* Map through the OTP input boxes */}
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
                </div>

                {/* Update the button to reflect OTP verification */}
                <BtnLink to="/email-confirm">
                  <MainButtonFull type="primary">Verify OTP</MainButtonFull>
                </BtnLink>

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
