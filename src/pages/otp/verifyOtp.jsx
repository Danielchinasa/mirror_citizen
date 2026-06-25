import React, { useState } from "react";
import { Col, Row, Alert, message, Spin } from "antd"; // Import message from Ant Design
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
import { SendOtp, ReSendOtp } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OtpInput from "react-otp-input";
import Swal from "sweetalert2";

import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
const { useToken } = theme;

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const formDataFromLocalStorage = JSON.parse(localStorage.getItem("formData"));
  const email = formDataFromLocalStorage.email;
  const phoneNumber = formDataFromLocalStorage.phoneNumber;

  const encryptPhoneNumber = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 4); // Extracting country code
    const hiddenDigits = phoneNumber.slice(4, -2).replace(/\d/g, "*"); // Masking digits except last 2
    const lastTwoDigits = phoneNumber.slice(-2); // Extracting last 2 digits
    return `${countryCode} ${hiddenDigits}${lastTwoDigits}`;
  };

  const encryptedPhoneNumber = encryptPhoneNumber(phoneNumber);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await dispatch(SendOtp(otpValues));
      console.log("SendOtp Response:", response);

      if (response === "user activated") {
        // Display success message
        setLoading(false);
        // console.log(`Entered OTP: jjjj`);
        // message.success("OTP verification successful", 10);
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "OTP verification successful. Proceed to Sign In",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        // Handle further actions if needed
        history.push("/login");
      } else {
        setLoading(false);
        // Display error message
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response.message || "OTP verification failed",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // message.error(response.message || "OTP verification failed", 10);
        // Handle further actions if needed
      }
    } catch (error) {
      // Handle errors if needed
      setLoading(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Error sending OTP",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      console.error("Error sending OTP:", error);
    }
  };

  const handleReSendOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading2(true);
      const response = await dispatch(ReSendOtp(email));
      // console.log("SendOtp Response:", response);

      if (response === "success") {
        // Display success message
        setLoading2(false);
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "OTP Sent Successfully",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // message.success("OTP Sent Successful");
        // Handle further actions if needed
        history.push("/verify-otp");
      } else {
        setLoading2(false);
        // Display error message
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response.message || "OTP Resend failed",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // message.error(response.message || "OTP Resend failed");
        // Handle further actions if needed
      }
    } catch (error) {
      // Handle errors if needed
      setLoading2(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Error sending OTP",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      console.error("Error sending OTP:", error);
    }
  };

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  return (
    <div style={{ backgroundColor: bgContainer }}>
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
              <Heading $token={token}>Enter OTP</Heading>
              <Subtitle color="light" $token={token}>
                Enter the OTP sent to {encryptedPhoneNumber} and {email} for
                continuation
              </Subtitle>
              <Spin spinning={loading} tip="Verifying OTP...">
                <Spin spinning={loading2} tip="Resending OTP...">
                  <StyledForm>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {/* {otpValues.map((value, index) => (
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
                  ))} */}
                      <OtpInput
                        value={otpValues}
                        onChange={setOtpValues}
                        numInputs={6}
                        inputStyle={{
                          width: "50px",
                          height: "50px",
                          marginBottom: "20px",
                          marginRight: "20px",
                        }}
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                        shouldAutoFocus={true}
                      />

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

                    <p style={{ color: text }}>I didn’t receive the OTP</p>
                    <p>
                      <strong
                        style={{ color: "#02831C", cursor: "pointer" }}
                        onClick={handleReSendOTP}
                      >
                        Resend Code
                      </strong>
                    </p>
                  </StyledForm>
                </Spin>
              </Spin>
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
