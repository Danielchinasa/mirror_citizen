import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { useToken } = theme;

const PaymentCancel = () => {
  const history = useHistory();
  const location = useLocation();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const paypalToken = queryParams.get("token");
  const txRef = queryParams.get("txRef");

  const handleGoToDashboard = () => {
    history.push("/main-dashboard");
  };

  const handleTryAgain = () => {
    history.push("/dashboard");
  };

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
        icon={<CloseCircleOutlined style={{ color: "#faad14" }} />}
        status="warning"
        title={<span style={{ color: text }}>Payment Cancelled</span>}
        subTitle={
          <span style={{ color: text }}>
            You have cancelled the PayPal payment. No charges have been made to
            your account.
            {paypalToken && (
              <>
                <br />
                PayPal Token: <strong>{paypalToken}</strong>
              </>
            )}
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
            key="retry"
            onClick={handleTryAgain}
            style={{
              backgroundColor: "#0DC939",
              borderColor: "#0DC939",
              marginRight: "10px",
            }}
          >
            Try Again
          </Button>,
          <Button key="dashboard" onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentCancel;
