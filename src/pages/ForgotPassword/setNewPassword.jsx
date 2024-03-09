import React, { useState } from "react";
import { Col, Row, Spin, message, notification } from "antd";
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
import { setNewPassword } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SetNewPassword = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data
    setLoading(true);
    try {
      const response = await dispatch(setNewPassword(formData, userToken));
      setLoading(false);

      console.log(response);
      if (response === "incorrect old password") {
        message.error(response);
        notification.error({
          message: "Error",
          description: response,
          duration: 10, // Duration in seconds
        });
        // Handle further actions if needed
      } else {
        message.success("Password Update Successful");
        notification.success({
          message: "Success",
          description: "Password Update Successful",
          duration: 10, // Duration in seconds
        });
        history.push("/password-confirm");
      }
    } catch (error) {
      // Handle errors if needed
      message.error(error);
      notification.error({
        message: "Error",
        description: error,
        duration: 10, // Duration in seconds
      });
      console.error("Error updating password", error);
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
          span={8}
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
              <Heading>Set new password</Heading>
              <Subtitle color="light">
                Your new password must be different to previously used passwords
              </Subtitle>
              <Spin spinning={loading} tip="Logging in...">
                <StyledForm>
                  <StyledLabel>Old Password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Enter your old password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={(e) =>
                      handleInputChange("oldPassword", e.target.value)
                    }
                  />
                  <StyledLabel>New password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Enter your new password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                  />
                  {/* <BtnLink to="/password-confirm"> */}
                  <MainButtonFull type="primary" onClick={handleSubmit}>
                    Reset Password
                  </MainButtonFull>
                  {/* </BtnLink> */}
                </StyledForm>
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

export default SetNewPassword;
