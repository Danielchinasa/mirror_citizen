import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Divider,
  Avatar,
  Spin,
  Modal,
  Button,
  Collapse,
} from "antd";
import {
  Container,
  Heading4,
  InfoSec,
  MainButton,
  StyledLabel,
} from "../../globalStyles";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Typography } from "antd";
import Icon, {
  RightOutlined,
  UserOutlined,
  MailOutlined,
  BankOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  MinusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../dashboard/emergency.css";

import { MdOutlinePinDrop } from "react-icons/md";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Swal from "sweetalert2";
import {
  sendVerificationRequest,
  fetchUserProfile,
  logout,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import Reach1 from "../../images/reach1.jpeg";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const BusinessName = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";
  const [businessData, setBusinessData] = useState([]);
  const [shareholdersData, setShareholdersData] = useState([]);
  const requestId = localStorage.getItem("verificationRequestId");
  const myCacic = localStorage.getItem("verificationRequestCacid");

  const [loading, setLoading] = useState(false);
  const userEmail = user?.email || "";
  const userPhone = user?.phone || "";
  const [stakeHolderFeeUsd, setStakeHolderFeeUsd] = useState("");
  const [stakeHolderFeeNgn, setStakeHolderFeeNgn] = useState("");
  const userCurrency = user?.currency || "";
  const [currencyCheck, setCurrencyCheck] = useState("NGN");
  const userNin = user?.nin || "";
  const userBalance = user?.walletBalance || 0;
  const [openFlutterwaveModal, setOpenFlutterwaveModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    if (currentDate >= expireDate) {
      dispatch(logout());
      history.push("/");
      // console.log("Time don pass well");
    } else {
    }
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        console.log("Service Fees");
        console.log(response.data.data[0].price);

        setCurrencyCheck(response.data.data[8].currency);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        console.log("Stake Fees");
        console.log(response.data.data[8].price);

        setStakeHolderFeeUsd(response.data.data[8].price);
        setStakeHolderFeeNgn(response.data.data[8].price2);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to check consent status
        setLoading(true);
        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/verification/check-consent/${requestId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        setBusinessData(response.data.data);
        setLoading(false);
      } catch (error) {
        // Handle errors if needed
        console.error("Error checking consent:", error);
        setLoading(false);
      }
    };
    // Fetch verification result when the component mounts
    fetchData();
  }, [dispatch, userToken]);
  // localStorage.removeItem("verificationRequestId");

  const config = {
    //live key
    public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}",
    amount: currencyCheck === "USD" ? stakeHolderFeeUsd : stakeHolderFeeUsd,
    currency: currencyCheck === "USD" ? "USD" : "NGN",
    payment_options:
      "card,mobilemoney,ussd, account, banktransfer, barter, nqr",
    customer: {
      email: userEmail,
      phone_number: userPhone,
      // name: userName,
    },

    customizations: {
      title: `Payment for stakeHolder lookup`,
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  // const renderDetail = (icon, label, value) => (
  //   <>
  //     <StyledLabel>
  //       {icon}
  //       &nbsp; {label}
  //     </StyledLabel>
  //     <StyledLabel>
  //       <strong>{value}</strong>
  //     </StyledLabel>
  //   </>
  // );

  const renderDetail = (icon, label, value) => (
    <>
      <StyledLabel>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel>
        <strong>{value != null && value !== "null" ? value : "-"}</strong>
      </StyledLabel>
    </>
  );
  const renderDetail2 = (label, value) => (
    <>
      <StyledLabel> {label}</StyledLabel>
      <StyledLabel>
        <strong>{value != null && value !== "null" ? value : "-"}</strong>
      </StyledLabel>
    </>
  );
  const storedValue = localStorage.getItem("profile");
  const [cacId, setCacId] = useState(null);

  function generateTransactionId() {
    const length = 16; // total length including "EA"
    let transactionId = "EA";
    for (let i = 0; i < length - 2; i++) {
      transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
    }
    return transactionId;
  }
  const randomTransactionId = generateTransactionId();

  const handleButtonClick = async (cacid) => {
    dispatch(fetchUserProfile(userToken));
    Swal.fire({
      title: "Select Payment Method",
      input: "radio",
      inputOptions: {
        "Payment from Wallet": "Payment from Wallet",
        "Instant Payment": "Instant Payment",
      },
      customClass: "swal-wide",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#0DC939",
      inputValidator: (value) => {
        if (!value) {
          return "You must select a payment method";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const apiUrl =
          "https://e-citizen.ng:8443/api/v2/transaction/wallet-payment";

        const requestBody = {
          userNIN: userNin,
          transactionID: randomTransactionId,

          amount: stakeHolderFeeUsd,
        };

        const requestBodyWithAmountEquivalent = {
          userNIN: userNin,
          transactionID: randomTransactionId,

          amount: stakeHolderFeeNgn,
        };
        const handlePayment = async () => {
          try {
            setLoading(true);
            if (userBalance.toLocaleString() < stakeHolderFeeUsd) {
              Swal.fire({
                title: "Wallet Balance Low",
                text: "Your wallet balance is low. Please recharge before making a payment.",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              return;
            }
            if (userBalance.toLocaleString() < stakeHolderFeeNgn) {
              Swal.fire({
                title: "Wallet Balance Low",
                text: "Your wallet balance is low. Please recharge before making a payment.",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              return;
            }
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify(
                userCurrency === "usd"
                  ? requestBody
                  : requestBodyWithAmountEquivalent
              ),
            });

            const data = await response.text();

            if (response.ok && data === "payment successful") {
              const transactionID = localStorage.getItem("transactionID");
              const paymentType = localStorage.getItem("paymentType");

              const generateTransactionId = () => {
                const length = 16; // total length including "EA"
                let transactionId = "EA";
                for (let i = 0; i < length - 2; i++) {
                  transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
                }
                return transactionId;
              };

              const randomTransactionId = generateTransactionId();

              try {
                dispatch(fetchUserProfile(userToken));

                const requestBody = {
                  payment: {
                    currency: currencyCheck || "NGN",
                    transactionID: transactionID || randomTransactionId,
                    paymentType: paymentType || "INSTANT",
                  },
                  business: {
                    requestId: parseInt(requestId),
                    cacId: parseInt(cacid),
                  },
                };

                const response = await axios.post(
                  "https://e-citizen.ng:8443/api/v2/verification/call-external-apis",
                  requestBody,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
                );

                if (
                  response.data.business &&
                  response.data.business.success == true
                ) {
                  setLoading(false);
                  if (
                    response.data.business &&
                    Array.isArray(response.data.business.data)
                  ) {
                    setLoading(false);
                    setBusinessData(response.data.business.data);
                  } else {
                    console.error("Invalid response structure:", response.data);
                    Swal.fire({
                      title: "Error",
                      text: "Error fetching Stake Holders",
                      icon: "error",
                      customClass: {
                        confirmButton: "custom-swal-button",
                      },
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: true,
                      confirmButtonText: "OK",
                      confirmButtonColor: "#0DC939",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                    });
                  }
                } else {
                  setLoading(false);
                  Swal.fire({
                    title: "Error",
                    text: response.data.business.message,
                    icon: "error",
                    customClass: {
                      confirmButton: "custom-swal-button",
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#0DC939",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }
              } catch (error) {
                setLoading(false);
                console.error("Error calling external APIs:", error);
                Swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  customClass: {
                    confirmButton: "custom-swal-button",
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: true,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#0DC939",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }
            } else {
              setLoading(false);
              console.error("Payment failed. Response:", data);
              Swal.fire({
                title: "Error",
                text: "Payment Failed",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } finally {
            setLoading(false);
          }
        };

        if (result.value === "Payment from Wallet") {
          localStorage.setItem("transactionID", randomTransactionId);
          localStorage.setItem("paymentType", "WALLET");
          if (currencyCheck === "NGN" && userCurrency === "usd") {
            setLoading(false);

            Swal.fire({
              title: "Warning",
              icon: "warning",
              text: "Wallet currency doesn't match purchase currency. Do you want to pay with your wallet currency?",
              showCancelButton: true,
              confirmButtonText: "Continue",
              confirmButtonColor: "#0DC939",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                handlePayment();
              } else if (result.isDismissed) {
                return;
              }
            });
            return;
          }
          if (currencyCheck === "USD" && userCurrency === "ngn") {
            setLoading(false);

            Swal.fire({
              title: "Warning",
              icon: "warning",
              text: "Wallet currency doesn't match purchase currency. Do you want to pay with your wallet currency?",
              showCancelButton: true,
              confirmButtonText: "Continue",
              confirmButtonColor: "#0DC939",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                handlePayment();
              } else if (result.isDismissed) {
                return;
              }
            });
            return;
          }

          if (userBalance.toLocaleString() < stakeHolderFeeUsd) {
            Swal.fire({
              title: "Wallet Balance Low",
              text: "Your wallet balance is low. Please recharge before making a payment.",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }

          try {
            setLoading(true);
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify(requestBody),
            });

            const data = await response.text();

            if (response.ok && data === "payment successful") {
              const transactionID = localStorage.getItem("transactionID");
              const paymentType = localStorage.getItem("paymentType");
              function generateTransactionId() {
                const length = 16; // total length including "EA"
                let transactionId = "EA";
                for (let i = 0; i < length - 2; i++) {
                  transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
                }
                return transactionId;
              }

              const randomTransactionId = generateTransactionId();
              try {
                dispatch(fetchUserProfile(userToken));

                const requestBody = {
                  payment: {
                    currency: currencyCheck || "NGN",
                    transactionID: transactionID || randomTransactionId,
                    paymentType: paymentType || "INSTANT",
                  },
                  business: {
                    requestId: parseInt(requestId),
                    cacId: parseInt(cacid),
                  },
                };
                // Make an API request to call external APIs
                const response = await axios.post(
                  "https://e-citizen.ng:8443/api/v2/verification/call-external-apis",
                  requestBody,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userToken}`, // Include the bearer token
                    },
                  }
                );

                if (
                  response.data.business &&
                  response.data.business.success == true
                ) {
                  setLoading(false);
                  if (
                    response.data.business &&
                    Array.isArray(response.data.business.data)
                  ) {
                    setLoading(false);
                    // Update businessData state with the data array
                    setBusinessData(response.data.business.data);
                  } else {
                    console.error("Invalid response structure:", response.data);
                    Swal.fire({
                      title: "Error",
                      text: "Error fetching Stake Holders",
                      icon: "error",
                      customClass: {
                        confirmButton: "custom-swal-button",
                      },
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: true,
                      confirmButtonText: "OK",
                      confirmButtonColor: "#0DC939",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                    });
                  }
                } else {
                  setLoading(false);
                  Swal.fire({
                    title: "Error",
                    text: response.data.business.message,
                    icon: "error",
                    customClass: {
                      confirmButton: "custom-swal-button",
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#0DC939",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }

                // setBusinessData(response.data.data);
              } catch (error) {
                setLoading(false);
                // Handle errors if needed
                console.error("Error calling external APIs:", error);
                Swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  customClass: {
                    confirmButton: "custom-swal-button",
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: true,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#0DC939",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }
            } else {
              setLoading(false);
              console.error("Payment failed. Response:", data);
              Swal.fire({
                title: "Error",
                text: "Payment Failed",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } finally {
            setLoading(false); // Set loading to false when the request completes (either success or failure)
          }
        } else if (result.value === "Instant Payment") {
          //!!LIVE PAYMENT START

          handleCancel();
          try {
            setCacId(cacid);
            // Assuming postData is the data you want to send to the endpoint
            const postData = {
              amount:
                currencyCheck === "USD" ? stakeHolderFeeUsd : stakeHolderFeeUsd,
              currency: currencyCheck,
              country: "NG",
              description: "Payment for StakeHolder verification",
              payment_method: "card,mobilemoney,ussd",
              type: "VERIFICATION",
            };

            const response = await fetch(
              "https://e-citizen.ng:8443/api/v2/payment/initiate",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(postData),
              }
            );

            if (response.ok) {
              // Handle successful response here

              const responseData = await response.json();
              if (responseData.status === "success") {
                if (responseData.data && responseData.data.link) {
                  console.log("Embedding URL:", responseData.data.link);
                  setPaymentUrl(responseData.data.link);
                  setTransactionRef(responseData.data.txRef);
                  localStorage.setItem(
                    "transactionID",
                    responseData.data.txRef
                  );
                  localStorage.setItem("paymentType", "INSTANT");
                  //!------------- Open the FlutterWave modal for payment --------------//
                  setOpenFlutterwaveModal(true);
                  //!------------- Open the FlutterWave modal for payment End --------------//
                } else {
                  console.error("Response data does not contain a link");
                  Swal.fire({
                    title: "Error",
                    text: "Response data does not contain a link",
                    icon: "error",
                    customClass: {
                      confirmButton: "custom-swal-button",
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#0DC939",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                  return;
                }
              }
            } else {
              Swal.fire({
                title: "Error",
                text: "Failed to initialize payment",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              return;
            }
          } catch (error) {
            // Handle any unexpected errors
            console.error("An error occurred:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to initialize payment",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }
          handleCancel();
        }
        //!!LIVE PAYMENT ENDS
      }
    });
  };

  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };

  const handleModalNewOk = async () => {
    setOpenFlutterwaveModal(false);

    try {
      const response = await fetch(
        `https://e-citizen.ng:8443/api/v2/payment/check?transactionRef=${transactionRef}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Payment Cancelled or Declined",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        return;
      }
      if (response.ok) {
        setLoading(true);
        const responseData = await response.json();
        const transactionID = localStorage.getItem("transactionID");
        const paymentType = localStorage.getItem("paymentType");
        if (responseData.status === "success") {
          console.log("Checking payment status");
          console.log(responseData.data);
          if (
            responseData.data &&
            (responseData.data.status === "success" ||
              responseData.data.status === "successful")
          ) {
            const requestBody = {
              payment: {
                currency: currencyCheck || "NGN",
                transactionID: transactionID || randomTransactionId,
                paymentType: paymentType || "INSTANT",
              },
              business: {
                requestId: parseInt(requestId),
                cacId: parseInt(cacId),
              },
            };
            const externalApiResponse = await axios.post(
              "https://e-citizen.ng:8443/api/v2/verification/call-external-apis",
              requestBody,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            if (
              externalApiResponse.data.business &&
              externalApiResponse.data.business.success == false
            ) {
              setLoading(false);
              Swal.fire({
                title: "Request Error",
                text: externalApiResponse.data.business.message,
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              return;
            }
            if (
              externalApiResponse.data.business &&
              Array.isArray(externalApiResponse.data.business.data)
            ) {
              setLoading(false);
              setBusinessData(externalApiResponse.data.business.data);
            } else {
              setLoading(false);
              console.error("Invalid response structure:", response.data);
              Swal.fire({
                title: "Error",
                text: "Error fetching Stake Holders",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          } else {
            setLoading(false);
            Swal.fire({
              title: "Failed Payment",
              text: responseData.data.processor_response,
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }
        } else {
          setOpenFlutterwaveModal(false);
          setLoading(true);
          Swal.fire({
            title: "Error",
            text: "Error fetching Stake Holders",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      }
    } catch (error) {
      console.error("Error handling modal new OK:", error);
      // Handle errors here
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#0DC939",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };
  const [activeKey, setActiveKey] = React.useState(null);
  React.useEffect(() => {
    if (businessData && businessData.length === 1) {
      setActiveKey(businessData[0].data.id);
    } else {
      setActiveKey(null);
    }
  }, [businessData]);

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card
          style={{
            width: "100%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            marginBottom: "30px",
          }}
        >
          <Heading4>Business Verification Result</Heading4>
        </Card>

        {businessData && businessData.length > 0 ? (
          businessData.map((business) => (
            <Collapse
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                width: "100%",
                marginTop: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              }}
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
              items={[
                {
                  key: business.data.id,
                  label: (
                    <div>
                      {/* <Text>Business Profile</Text>
                      <RightOutlined />
                      <Text>Business Name</Text>
                      <RightOutlined /> */}
                      <Text style={{ color: "#0DC939", fontWeight: "bold" }}>
                        {business.data.approvedName}
                      </Text>
                    </div>
                  ),
                  children: (
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          {renderDetail(
                            <UserOutlined />,
                            "Business Name",
                            business.data.approvedName
                              ? business.data.approvedName
                              : `-`
                          )}
                        </div>
                        <div class="col">
                          {renderDetail(
                            <BankOutlined />,
                            "Registration Number",
                            business.data.rcNumber
                              ? business.data.rcNumber
                              : `-`
                          )}
                        </div>

                        <div class="col">
                          {renderDetail(
                            <MailOutlined />,
                            "Business Email",
                            business.data.email ? business.data.email : `-`
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div class="row">
                        <div class="col">
                          {renderDetail(
                            <CheckCircleOutlined />,
                            "Status",
                            business.data.status ? business.data.status : `-`
                          )}
                        </div>
                        <div class="col">
                          {renderDetail(
                            <CheckCircleOutlined />,
                            "Company Status",
                            business.data.companyStatus
                              ? business.data.companyStatus
                              : `-`
                          )}
                        </div>

                        <div class="col">
                          {renderDetail(
                            <HomeOutlined />,
                            "Business Address",
                            business.data.address ? business.data.address : "-"
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div class="row">
                        <div class="col">
                          {renderDetail(
                            <MdOutlinePinDrop />,
                            "State",
                            business.data.state
                              ? business.data.state === "null"
                                ? `-`
                                : business.data.state
                              : `-`
                          )}
                        </div>

                        <div class="col">
                          {renderDetail(
                            <MdOutlinePinDrop />,
                            "LGA",
                            business.data.lga
                              ? business.data.lga === "null"
                                ? `-`
                                : business.data.lga
                              : `-`
                          )}
                        </div>

                        <div class="col">
                          {renderDetail(
                            <MdOutlinePinDrop />,
                            "City",
                            business.data.city ? business.data.city : `-`
                          )}
                        </div>
                      </div>

                      <Divider />
                      <div class="row">
                        <div class="col">
                          {renderDetail(
                            <CheckCircleOutlined />,
                            "CAC ID",
                            business.data.cacid ? business.data.cacid : `-`
                          )}
                        </div>
                        <div class="col">
                          {renderDetail(
                            <CheckCircleOutlined />,
                            "Code",
                            business.data.code ? business.data.code : `-`
                          )}
                        </div>

                        <div class="col">
                          {renderDetail(
                            <MailOutlined />,
                            "Classification ID",
                            business.data.classificationId
                              ? business.data.classificationId
                              : `-`
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div class="row">
                        <div class="col">
                          {renderDetail(
                            <UserOutlined />,
                            "Approved Name: ",
                            business.data.approvedName
                              ? business.data.approvedName
                              : `-`
                          )}
                        </div>
                        <div class="col">
                          {renderDetail(
                            <MailOutlined />,
                            "Incorporated On",
                            business.data.registrationDate
                              ? new Date(
                                  business.data.registrationDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "-"
                          )}
                        </div>

                        <div class="col"></div>
                      </div>
                      <Divider />
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Stakeholder Details
                      </Text>
                      {business["shareholders-data"] == null ? (
                        loading ? (
                          <Spin size="large" tip="Loading" />
                        ) : (
                          <>
                            <br></br>
                            <MainButton
                              type="primary"
                              style={{
                                paddingRight: "50px",
                                paddingLeft: "50px",
                              }}
                              onClick={() =>
                                handleButtonClick(business.data.cacid)
                              }
                            >
                              <SearchOutlined /> Lookup Stakeholder for only{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {currencyCheck == "USD"
                                  ? "$" + stakeHolderFeeUsd
                                  : formatToNaira(stakeHolderFeeUsd)}
                              </span>
                            </MainButton>
                          </>
                        )
                      ) : business["shareholders-data"].length > 0 ? (
                        <div>
                          <Collapse bordered={true} accordion>
                            <Panel
                              header={
                                <div
                                  style={{
                                    color: "#0DC939",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Shareholders
                                </div>
                              }
                              key="shareholderPanel"
                            >
                              {business["shareholders-data"].map(
                                (shareholder, index) =>
                                  shareholder.stake == "Shareholder" && (
                                    <Collapse
                                      bordered={false}
                                      accordion
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <Panel
                                        key={index}
                                        header={
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div style={{ fontWeight: "bold" }}>
                                              {/* {`${shareholder.firstname || ""} ${
                                            shareholder.surname || ""
                                          }`} */}
                                              {shareholder &&
                                              shareholder.corporation_name ==
                                                null
                                                ? `${
                                                    shareholder.firstname || ""
                                                  } ${
                                                    shareholder.surname || ""
                                                  }`
                                                : `${
                                                    shareholder.corporation_name
                                                  } ${
                                                    shareholder.firstname || ""
                                                  } ${
                                                    shareholder.surname || ""
                                                  }`}
                                            </div>
                                            <div
                                              style={{
                                                color: "#0DC939",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                padding: "2px",
                                                border: "1px solid #0DC939",
                                              }}
                                            >
                                              {shareholder.stake}
                                            </div>
                                          </div>
                                        }
                                      >
                                        <div class="container">
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "First Name: ",
                                                shareholder.firstname
                                                  ? shareholder.firstname
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Last Name:",
                                                shareholder.surname
                                                  ? shareholder.surname
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Other Name: ",
                                                shareholder.other_name
                                                  ? shareholder.other_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Address: ",
                                                shareholder.address
                                                  ? shareholder.address ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.address
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Full Address: ",
                                                shareholder.full_address2
                                                  ? shareholder.full_address2 ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.full_address2
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Email: ",
                                                shareholder.email
                                                  ? shareholder.email == "null"
                                                    ? `-`
                                                    : shareholder.email
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Phone Number: ",
                                                shareholder.phone_number
                                                  ? shareholder.phone_number ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.phone_number
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Gender: ",
                                                shareholder.gender
                                                  ? shareholder.gender == "null"
                                                    ? `-`
                                                    : shareholder.gender
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "State: ",
                                                shareholder.state
                                                  ? shareholder.state == "null"
                                                    ? `-`
                                                    : shareholder.state
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "IsChairman: ",
                                                shareholder.is_chairman
                                                  ? shareholder.is_chairman ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.is_chairman
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Occupation: ",
                                                shareholder.occupation
                                                  ? shareholder.occupation ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.occupation
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Former Name: ",
                                                shareholder.former_name
                                                  ? shareholder.former_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.former_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Corporation Name: ",
                                                shareholder.corporation_name
                                                  ? shareholder.corporation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.corporation_name
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Number of Shares: ",
                                                shareholder.num_shares_alloted
                                                  ? shareholder.num_shares_alloted ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.num_shares_alloted
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Status: ",
                                                shareholder.status
                                                  ? shareholder.status == "null"
                                                    ? `-`
                                                    : shareholder.status
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Identity Number: ",
                                                shareholder.identity_number
                                                  ? shareholder.identity_number ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.identity_number
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Age: ",
                                                shareholder.age
                                                  ? shareholder.age == "null"
                                                    ? `-`
                                                    : shareholder.age
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Type of Shares: ",
                                                shareholder.type_of_shares
                                                  ? shareholder.type_of_shares ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.type_of_shares
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "IsCorporate:",
                                                shareholder.is_corporate
                                                  ? shareholder.is_corporate ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.is_corporate
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Termination:",
                                                shareholder.date_of_termination
                                                  ? shareholder.date_of_termination ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_termination
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Appointment:",
                                                shareholder.date_of_appointment
                                                  ? shareholder.date_of_appointment ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_appointment
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Status Change:",
                                                shareholder.date_of_status_change
                                                  ? shareholder.date_of_status_change ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_status_change
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Birth:",
                                                shareholder.date_of_birth
                                                  ? shareholder.date_of_birth ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_birth
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Government Organisation Name:",
                                                shareholder.government_organisation_name
                                                  ? shareholder.government_organisation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.government_organisation_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Foreign Organisation Name:",
                                                shareholder.foreign_organisation_name
                                                  ? shareholder.foreign_organisation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.foreign_organisation_name
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Nationality:",
                                                shareholder.nationality
                                                  ? shareholder.nationality ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.nationality
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Appointed By:",
                                                shareholder.appointed_by
                                                  ? shareholder.appointed_by ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.appointed_by
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Panel>
                                    </Collapse>
                                  )
                              )}
                            </Panel>
                            <Panel
                              header={
                                <div
                                  style={{
                                    color: "#0DC939",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Directors
                                </div>
                              }
                              key="directorPanel"
                            >
                              {business["shareholders-data"].map(
                                (shareholder, index) =>
                                  shareholder.stake === "Director" && (
                                    <Collapse
                                      bordered={false}
                                      accordion
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <Panel
                                        key={index}
                                        header={
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div style={{ fontWeight: "bold" }}>
                                              {shareholder &&
                                              shareholder.corporation_name ==
                                                null
                                                ? `${
                                                    shareholder.firstname || ""
                                                  } ${
                                                    shareholder.surname || ""
                                                  }`
                                                : `${
                                                    shareholder.corporation_name
                                                  } ${
                                                    shareholder.firstname || ""
                                                  } ${
                                                    shareholder.surname || ""
                                                  }`}
                                            </div>
                                            <div
                                              style={{
                                                color: "#0DC939",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {shareholder.stake}
                                            </div>
                                          </div>
                                        }
                                      >
                                        <div class="container">
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "First Name: ",
                                                shareholder.firstname
                                                  ? shareholder.firstname
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Last Name:",
                                                shareholder.surname
                                                  ? shareholder.surname
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Other Name: ",
                                                shareholder.other_name
                                                  ? shareholder.other_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Address: ",
                                                shareholder.address
                                                  ? shareholder.address ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.address
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Full Address: ",
                                                shareholder.full_address2
                                                  ? shareholder.full_address2 ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.full_address2
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Email: ",
                                                shareholder.email
                                                  ? shareholder.email == "null"
                                                    ? `-`
                                                    : shareholder.email
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Phone Number: ",
                                                shareholder.phone_number
                                                  ? shareholder.phone_number ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.phone_number
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Gender: ",
                                                shareholder.gender
                                                  ? shareholder.gender == "null"
                                                    ? `-`
                                                    : shareholder.gender
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "State: ",
                                                shareholder.state
                                                  ? shareholder.state == "null"
                                                    ? `-`
                                                    : shareholder.state
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "IsChairman: ",
                                                shareholder.is_chairman
                                                  ? shareholder.is_chairman ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.is_chairman
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Occupation: ",
                                                shareholder.occupation
                                                  ? shareholder.occupation ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.occupation
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Former Name: ",
                                                shareholder.former_name
                                                  ? shareholder.former_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.former_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Corporation Name: ",
                                                shareholder.corporation_name
                                                  ? shareholder.corporation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.corporation_name
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Number of Shares: ",
                                                shareholder.num_shares_alloted
                                                  ? shareholder.num_shares_alloted ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.num_shares_alloted
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Status: ",
                                                shareholder.status
                                                  ? shareholder.status == "null"
                                                    ? `-`
                                                    : shareholder.status
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Identity Number: ",
                                                shareholder.identity_number
                                                  ? shareholder.identity_number ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.identity_number
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Age: ",
                                                shareholder.age
                                                  ? shareholder.age == "null"
                                                    ? `-`
                                                    : shareholder.age
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Type of Shares: ",
                                                shareholder.type_of_shares
                                                  ? shareholder.type_of_shares ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.type_of_shares
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "IsCorporate:",
                                                shareholder.is_corporate
                                                  ? shareholder.is_corporate ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.is_corporate
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Termination:",
                                                shareholder.date_of_termination
                                                  ? shareholder.date_of_termination ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_termination
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Appointment:",
                                                shareholder.date_of_appointment
                                                  ? shareholder.date_of_appointment ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_appointment
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Status Change:",
                                                shareholder.date_of_status_change
                                                  ? shareholder.date_of_status_change ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_status_change
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Date of Birth:",
                                                shareholder.date_of_birth
                                                  ? shareholder.date_of_birth ==
                                                    "null"
                                                    ? `-`
                                                    : new Date(
                                                        shareholder.date_of_birth
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Government Organisation Name:",
                                                shareholder.government_organisation_name
                                                  ? shareholder.government_organisation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.government_organisation_name
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                          <Divider />
                                          <div class="row">
                                            <div class="col">
                                              {renderDetail2(
                                                "Foreign Organisation Name:",
                                                shareholder.foreign_organisation_name
                                                  ? shareholder.foreign_organisation_name ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.foreign_organisation_name
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Nationality:",
                                                shareholder.nationality
                                                  ? shareholder.nationality ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.nationality
                                                  : `-`
                                              )}
                                            </div>
                                            <div class="col">
                                              {renderDetail2(
                                                "Appointed By:",
                                                shareholder.appointed_by
                                                  ? shareholder.appointed_by ==
                                                    "null"
                                                    ? `-`
                                                    : shareholder.appointed_by
                                                  : `-`
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Panel>
                                    </Collapse>
                                  )
                              )}
                            </Panel>
                          </Collapse>
                        </div>
                      ) : (
                        <span style={{ color: "red" }}>
                          <br />
                          We couldn't find any shareholders records based on the
                          information you provided.
                        </span>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          ))
        ) : businessData && businessData.length === "null" ? (
          <span>No data available</span>
        ) : (
          <Spin size="large" />
        )}
      </InfoSec>
      <Title level={5} style={{ marginTop: "20px" }}>
        Your Offers
      </Title>
      <div class="container">
        <div class="row">
          <div
            className="col-sm-4 col-md-3 col-lg-3 mb-3 mr-3"
            style={{
              backgroundImage: `url(${Reach1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginRight: "10px",
              height: "200px",
              cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
            }}
            onClick={() => {
              window.open(
                "https://clk1.reachclk.com/avnq9z?landing_id=325&creative_id=1735",
                "_blank"
              );
            }}
          ></div>
          <div
            className="col-sm-4 col-md-3 col-lg-3 mb-3 mr-3"
            style={{
              backgroundImage: `url(https://cdn.affisereach.com/public/creatives/soiipjRopdyV7BrVn0lhVUVfbLI1kUYsm13tSQ2Y.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              marginRight: "10px",
              cursor: "pointer", // Optional: Change cursor to pointer to indicate it's clickable
            }}
            onClick={() => {
              window.open(
                "https://clk1.reachclk.com/I4KDDU?adv_sub1=info%40biosec.com.ng&landing_id=627&creative_id=1658",
                "_blank"
              );
            }}
          ></div>
          {/* <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Finance your Next Car</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#DDF9EA",
                }}
              >
                <p class="card-text">
                  Find financial offers that are tailored to your credit score.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Credit Cards</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#ECF5F8",
                }}
              >
                <p class="card-text">Credit Cards handpicked for you</p>
              </div>
            </div>
          </div> */}
          <Modal
            style={{
              top: 20,
            }}
            width={1000}
            open={openFlutterwaveModal}
            onOk={handleModalNewOk}
            onCancel={handleModalNewOk}
            maskClosable={false}
            footer={[
              <Button danger type="dashed" onClick={handleModalNewOk}>
                Close
              </Button>,
            ]}
          >
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              width="100%"
              height="600"
              src={paymentUrl}
              // ref={iframeRef}
              // onLoad={handleIframeLoad}
            ></iframe>
            {/* <button onClick={getContentFromIframe}>Get Content from Iframe</button> */}
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default BusinessName;
