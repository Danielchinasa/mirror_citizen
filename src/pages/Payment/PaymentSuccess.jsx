import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button, Spin } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/actions";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { useToken } = theme;

const PaymentSuccess = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get("txRef");
  const paymentId = queryParams.get("token");

  useEffect(() => {
    // Refresh user profile to get updated wallet balance
    if (userToken) {
      dispatch(fetchUserProfile(userToken))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error refreshing profile:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, userToken]);

  const handleGoToDashboard = () => {
    history.push("/main-dashboard");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          backgroundColor: bgContainer,
        }}
      >
        <Spin size="large" tip="Processing payment confirmation..." />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgContainer,
        padding: "20px",
      }}
    >
      <Result
        icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
        status="success"
        title={<span style={{ color: text }}>Payment Successful!</span>}
        subTitle={
          <span style={{ color: text }}>
            Your PayPal payment has been processed successfully.
            {txRef && (
              <>
                <br />
                Transaction Reference: <strong>{txRef}</strong>
              </>
            )}
          </span>
        }
        extra={[
          <Button
            type="primary"
            key="dashboard"
            onClick={handleGoToDashboard}
            style={{
              backgroundColor: "#DD0201",
              borderColor: "#DD0201",
            }}
          >
            Go to Dashboard
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
