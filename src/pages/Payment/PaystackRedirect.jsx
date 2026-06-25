import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button, Spin, Alert } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/actions";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import Swal from "sweetalert2";

const { useToken } = theme;

const PaystackRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const status = queryParams.get("status");

  useEffect(() => {
    const handlePaymentCallback = async () => {
      if (!reference) {
        setErrorMessage("Invalid payment reference");
        setPaymentStatus("failed");
        setLoading(false);
        return;
      }

      // Handle different payment statuses
      if (status === "cancelled") {
        setPaymentStatus("cancelled");
        setLoading(false);
        return;
      }

      if (status === "failed") {
        setPaymentStatus("failed");
        setErrorMessage("Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      // For successful payments, refresh user profile
      if (status === "success" && userToken) {
        try {
          await dispatch(fetchUserProfile(userToken));
          setPaymentStatus("success");

          // Show success message
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Payment Successful!",
            text: "Your payment has been processed successfully.",
            icon: "success",
            confirmButtonText: "Go to Dashboard",
            confirmButtonColor: "#02831C",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/main-dashboard");
            }
          });
        } catch (error) {
          console.error("Error refreshing profile:", error);
          setPaymentStatus("success");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handlePaymentCallback();
  }, [reference, status, userToken, dispatch, history, bgContainer, text]);

  const handleGoToDashboard = () => {
    history.push("/main-dashboard");
  };

  const handleTryAgain = () => {
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
        <Spin size="large" tip="Processing payment..." />
      </div>
    );
  }

  // Success View
  if (paymentStatus === "success") {
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
              Your Paystack payment has been processed successfully.
              {reference && (
                <>
                  <br />
                  Transaction Reference: <strong>{reference}</strong>
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
                backgroundColor: "#02831C",
                borderColor: "#02831C",
              }}
            >
              Go to Dashboard
            </Button>,
          ]}
        />
      </div>
    );
  }

  // Cancelled View
  if (paymentStatus === "cancelled") {
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
          icon={<WarningOutlined style={{ color: "#faad14" }} />}
          status="warning"
          title={<span style={{ color: text }}>Payment Cancelled</span>}
          subTitle={
            <span style={{ color: text }}>
              You have cancelled the Paystack payment. No charges have been made
              to your account.
              {reference && (
                <>
                  <br />
                  Transaction Reference: <strong>{reference}</strong>
                </>
              )}
            </span>
          }
          extra={[
            <Button
              type="primary"
              key="dashboard"
              onClick={handleTryAgain}
              style={{
                backgroundColor: "#02831C",
                borderColor: "#02831C",
              }}
            >
              Return to Dashboard
            </Button>,
          ]}
        />
      </div>
    );
  }

  // Failed View
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
        icon={<CloseCircleOutlined style={{ color: "#09c93a" }} />}
        status="error"
        title={<span style={{ color: text }}>Payment Failed</span>}
        subTitle={
          <span style={{ color: text }}>
            {errorMessage ||
              "Your Paystack payment could not be completed. Please try again."}
            {reference && (
              <>
                <br />
                Transaction Reference: <strong>{reference}</strong>
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
              backgroundColor: "#02831C",
              borderColor: "#02831C",
            }}
          >
            Try Again
          </Button>,
          <Button key="dashboard" onClick={handleGoToDashboard}>
            Return to Dashboard
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaystackRedirect;
