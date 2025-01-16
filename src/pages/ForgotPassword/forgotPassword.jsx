import React, { useState, useEffect } from "react";
import { Col, Row, message, Spin, notification } from "antd";
import {
  CenterText,
  Heading,
  Subtitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  MainButtonFull,
  InfoSec,
} from "../../globalStyles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ResetPassword } from "../../redux/actions";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cleanup loading state when the component unmounts
    return () => setLoading(false);
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Validate email format (you can add more validation if needed)
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        message.error("Please enter a valid email address");
        return;
      }

      // Start loading
      setLoading(true);

      // Make API call to send email for password reset
      const response = await dispatch(ResetPassword(email));
      console.log("Password Reset Response:", response);

      // Stop loading
      setLoading(false);

      // Handle success or failure based on the API response
      if (response == "success") {
        // Return a response from the API on success
        message.success("Password reset instructions sent to your email");
        notification.success({
          message: "Success",
          description: "Password reset instructions sent to your email",
          duration: 10, // Duration in seconds
        });
        // Redirect or perform other actions as needed
        history.push("/login");
      } else if (response == "user does not exist") {
        // Return a response from the API on success
        message.error(response);
        notification.error({
          message: "Error",
          description: response,
          duration: 10, // Duration in seconds
        });
        // Redirect or perform other actions as needed
        return;
      } else {
        // Display error message
        message.error(response || "Failed to reset password");
      }
    } catch (error) {
      // Stop loading in case of an error
      setLoading(false);

      // Handle network errors or other exceptions
      console.error("Error resetting password:", error);
      // Display a generic error message
      message.error("Failed to reset password. Please try again.");
    }
  };
  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Row justify="center">
        <Col xs={24} sm={24} md={8} lg={4} xl={4}></Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <CenterText>
            <InfoSec>
              <Heading $token={token}>Forgot password?</Heading>
              <Subtitle color="light" $token={token}>
                Enter the email that is associated with your account, and we’ll
                send you instructions on how to recover your account.
              </Subtitle>
              <Spin spinning={loading} tip="Processing...">
                <StyledForm>
                  <StyledLabel $token={token}>Email</StyledLabel>
                  <StyledInput
                    $token={token}
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MainButtonFull type="primary" onClick={handleResetPassword}>
                    Reset
                  </MainButtonFull>
                  {/* {loading && <Spin style={{ position: "absolute" }} />} */}
                </StyledForm>
              </Spin>
            </InfoSec>
          </CenterText>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
