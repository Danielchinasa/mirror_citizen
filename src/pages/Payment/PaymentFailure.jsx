import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const { useToken } = theme;

const PaymentFailure = () => {
  const history = useHistory();
  const location = useLocation();

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get("txRef");
  const errorMessage = queryParams.get("error");

  const handleGoToDashboard = () => {
    history.push("/main-dashboard");
  };

  const handleTryAgain = () => {
    history.push("/main-dashboard");
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
        icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
        status="error"
        title={<span style={{ color: text }}>Payment Failed</span>}
        subTitle={
          <span style={{ color: text }}>
            {errorMessage ||
              "Your PayPal payment could not be completed. Please try again."}
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
              backgroundColor: "#DD0201",
              borderColor: "#DD0201",
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

export default PaymentFailure;
