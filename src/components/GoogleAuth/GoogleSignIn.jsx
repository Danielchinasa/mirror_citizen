import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Typography, Space } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signIn } from "../../redux/actions";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 20px;
  }

  .ant-modal-body {
    text-align: center;
    padding: 40px 20px;
  }
`;

const GoogleButton = styled(Button)`
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #dadce0;
  background: white;
  color: #3c4043;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-color: #dadce0;
    background: #f8f9fa;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 24px;

  img {
    height: 60px;
  }
`;

const GoogleSignIn = ({ visible, onSuccess }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.auth || { isAuthenticated: false }
  );

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const googleUser = userInfoResponse.data;

        // Create user data for your app
        const userData = {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          profilePicture: googleUser.picture,
          googleId: googleUser.id,
          isGoogleAuth: true,
        };

        // Dispatch sign in action
        dispatch(signIn(userData));

        if (onSuccess) {
          onSuccess(userData);
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  return (
    <StyledModal
      visible={visible}
      footer={null}
      closable={false}
      width={400}
      centered
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <LogoContainer>
          <img
            src="/static/media/e-citizen_logo_ecitizen_white.9be9f1c1.png"
            alt="E-Citizen"
          />
        </LogoContainer>

        <div>
          <Title level={3} style={{ marginBottom: 8 }}>
            Welcome to E-Citizen
          </Title>
          <Text type="secondary">
            Sign in to access identity verification services
          </Text>
        </div>

        <GoogleButton
          size="large"
          block
          onClick={() => googleLogin()}
          icon={<GoogleOutlined />}
        >
          Continue with Google
        </GoogleButton>

        <Text type="secondary" style={{ fontSize: 12 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Space>
    </StyledModal>
  );
};

export default GoogleSignIn;
