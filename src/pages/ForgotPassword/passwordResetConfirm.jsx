import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import {
  BtnLink,
  CenterText,
  Heading,
  InfoSec,
  MainButtonFull,
  StyledForm,
  Subtitle,
} from "../../globalStyles";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const PasswordResetConfirm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch the logout action when the user clicks the logout button
    dispatch(logout());
    history.push("/");
  };

  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const { bgContainer, text, text3 } = token;
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
              <CheckCircleOutlined
                style={{ fontSize: "92px", color: "#DD0201" }}
              />
              <Heading $token={token}>Password reset</Heading>
              <Subtitle color="light" $token={token}>
                Your password has been successfully reset, Click below to log in
              </Subtitle>
              <StyledForm>
                {/* <BtnLink to="/login"> */}
                <MainButtonFull type="primary" onClick={handleLogout}>
                  Continue
                </MainButtonFull>
                {/* </BtnLink> */}
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

export default PasswordResetConfirm;
