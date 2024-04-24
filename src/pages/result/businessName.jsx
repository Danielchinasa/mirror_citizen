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
import { sendVerificationRequest, fetchUserProfile } from "../../redux/actions";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const BusinessName = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
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
  const [modal2Open, setModal2Open] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

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
        // setStakeHolderFeeNgn(response.data.data[8].price);
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

  const renderDetail = (icon, label, value) => (
    <>
      <StyledLabel>
        {icon}
        &nbsp; {label}
      </StyledLabel>
      <StyledLabel>
        <strong>{value}</strong>
      </StyledLabel>
    </>
  );
  const renderDetail2 = (label, value) => (
    <>
      <StyledLabel> {label}</StyledLabel>
      <StyledLabel>
        <strong>{value}</strong>
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
        // Handle the selected payment method here
        // console.log("Selected payment method:", stakeHolderFeeUsd);

        if (result.value === "Payment from Wallet") {
          setLoading(true);
          if (currencyCheck === "NGN" && userCurrency === "usd") {
            setLoading(false);
            Swal.fire({
              title: "Error",
              text: "Wallet currency doesn't match purchase currency. Please use a Naira wallet for this transaction.",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            return;
          }
          if (currencyCheck === "USD" && userCurrency === "ngn") {
            setLoading(false);
            Swal.fire({
              title: "Error",
              text: "Wallet currency doesn't match purchase currency. Please use a USD wallet for this transaction.",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            return;
          }
          const apiUrl =
            "https://e-citizen.ng:8443/api/v2/transaction/wallet-payment";

          const requestBody = {
            userNIN: userNin,
            transactionID: randomTransactionId,
            // amount: `${danfee.toFixed(2)}`,

            amount:
              currencyCheck === "USD" ? stakeHolderFeeUsd : stakeHolderFeeUsd,
          };

          if (userBalance.toLocaleString() < stakeHolderFeeUsd) {
            // Show the Ant Design notification
            setLoading(false);
            // handleCancel();
            Swal.fire({
              title: "Wallet Balance Low",
              text: "Your wallet balance is low. Please recharge before making a payment.",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            // notification.error({
            //   message: "Wallet Balance Warning",
            //   description:
            //     "Your wallet balance is low. Please recharge before making a payment.",
            // });
          } else {
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
                // console.log("Payment successful. Response:", data);
                // handleCancel();
                dispatch(fetchUserProfile(userToken));
                setLoading(true);
                try {
                  setLoading(true);
                  // Prepare the request body
                  const requestBody = {
                    payment: {
                      currency: currencyCheck || "ngn",
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
                  // Handle response if needed
                  console.log("External API call response:", response.data);
                  // setBusinessData((prevBusinessData) => [
                  //   ...prevBusinessData,
                  //   response.data.data,
                  // ]);
                  if (
                    response.data.business &&
                    Array.isArray(response.data.business.data)
                  ) {
                    // Update businessData state with the data array
                    setBusinessData(response.data.business.data);
                  } else {
                    console.error("Invalid response structure:", response.data);
                  }
                  // setBusinessData(response.data.data);
                  setLoading(false);
                } catch (error) {
                  // Handle errors if needed
                  console.error("Error calling external APIs:", error);
                  setLoading(false);
                }
              } else {
                console.error("Payment failed. Response:", data);
              }
            } catch (error) {
              console.error("Error:", error);
            } finally {
              // handleCancel();

              setLoading(false); // Set loading to false when the request completes (either success or failure)
            }
          }
        } else if (result.value === "Instant Payment") {
          setLoading(true);
          //!! old payment method
          // handleFlutterPayment({
          //   callback: async (response) => {
          //     console.log(response);
          //     if (
          //       response.status === "successful" ||
          //       response.status === "success" ||
          //       response.status === "completed"
          //     ) {
          //       console.log("flutterWave success");
          //       setLoading(true);
          //       try {
          //         setLoading(true);
          //         // Prepare the request body
          //         const requestBody = {
          //           business: {
          //             requestId: parseInt(requestId),
          //             cacId: parseInt(cacid),
          //           },
          //         };
          //         // Make an API request to call external APIs
          //         const response = await axios.post(
          //           "https://e-citizen.ng:8443/api/v2/verification/call-external-apis",
          //           requestBody,
          //           {
          //             headers: {
          //               "Content-Type": "application/json",
          //               Authorization: `Bearer ${userToken}`, // Include the bearer token
          //             },
          //           }
          //         );
          //         // Handle response if needed
          //         console.log("External API call response:", response.data);
          //         // setBusinessData((prevBusinessData) => [
          //         //   ...prevBusinessData,
          //         //   response.data.data,
          //         // ]);
          //         if (
          //           response.data.business &&
          //           Array.isArray(response.data.business.data)
          //         ) {
          //           // Update businessData state with the data array
          //           setBusinessData(response.data.business.data);
          //         } else {
          //           console.error("Invalid response structure:", response.data);
          //         }
          //         // setBusinessData(response.data.data);
          //         setLoading(false);
          //       } catch (error) {
          //         // Handle errors if needed
          //         console.error("Error calling external APIs:", error);
          //         setLoading(false);
          //       }
          //     }
          //     closePaymentModal();
          //   },
          //   onClose: () => {},
          // });

          //!!NEW PAYMENT METHOD

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

            // console.log("response", response);

            // Check if the request was successful (status code 200-299)
            if (response.ok) {
              // Handle successful response here

              const responseData = await response.json();
              console.log(responseData.data.link);
              console.log(responseData.data.txRef);
              if (responseData.data && responseData.data.link) {
                console.log("Embedding URL:", responseData.data.link);
                setPaymentUrl(responseData.data.link);
                setTransactionRef(responseData.data.txRef);
                setModal2Open(true);
              } else {
                console.error("Response data does not contain a link");
              }
            } else {
              // Handle errors here
              console.error("Failed to post data:", response.statusText);
            }
          } catch (error) {
            // Handle any unexpected errors
            console.error("An error occurred:", error);
          }
          handleCancel();
        }
        // Add your logic here for handling the selected payment method
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
    setLoading(true);
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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setLoading(true);

      if (loading) {
        Swal.fire({
          title: "Please Wait",
          text: "Verification in progress",
          icon: "info",
          didOpen: () => {
            Swal.showLoading();
          },
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
      setModal2Open(false);

      if (data.status === "success") {
        setLoading(true);
        const requestBody = {
          payment: {
            currency: currencyCheck || "ngn",
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
        console.log("External API call response:", externalApiResponse.data);
        if (
          externalApiResponse.data.business &&
          externalApiResponse.data.business.success == false
        ) {
          setLoading(false);
          Swal.fire({
            title: "Verification Error",
            text: externalApiResponse.data.business.message,
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
        if (
          externalApiResponse.data.business &&
          Array.isArray(externalApiResponse.data.business.data)
        ) {
          setBusinessData(externalApiResponse.data.business.data);
        } else {
          console.error(
            "Invalid response structure:",
            externalApiResponse.data
          );
        }
        setLoading(false);
        setModal2Open(false);
      } else {
        setModal2Open(false);
      }
    } catch (error) {
      console.error("Error handling modal new OK:", error);
      // Handle errors here
    }
  };
  const handleCancel2 = () => {
    setLoading(false);
    setModal2Open(false);
  };

  return (
    <Container>
      <InfoSec>
        <Link to="/main-dashboard">
          <p style={{ color: "#0DC939", cursor: "pointer" }}>Go back</p>
        </Link>
        <Card
          style={{ width: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" }}
        >
          <Heading4>Business Verification Result</Heading4>
        </Card>

        {businessData && businessData.length > 0 ? (
          businessData.map((business) => (
            <Card
              style={{
                width: "100%",
                marginTop: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              }}
              key={business.data.id}
            >
              <div>
                <Text>Business Profile</Text>
                <RightOutlined />
                <Text>Business Name</Text>
                <RightOutlined />
                <Text style={{ color: "#0DC939", fontWeight: "bold" }}>
                  {business.data.approvedName}
                </Text>
              </div>
              <Divider />
              <div class="container">
                <div class="row">
                  <div class="col">
                    {renderDetail(
                      <UserOutlined />,
                      "Business Name",
                      business.data.approvedName
                        ? business.data.approvedName
                        : `No Data`
                    )}
                  </div>
                  <div class="col">
                    {renderDetail(
                      <BankOutlined />,
                      "Registration Number",
                      business.data.rcNumber
                        ? business.data.rcNumber
                        : `No Data`
                    )}
                  </div>

                  <div class="col">
                    {renderDetail(
                      <MailOutlined />,
                      "Business Email",
                      business.data.email ? business.data.email : `No Data`
                    )}
                  </div>
                </div>
                <Divider />
                <div class="row">
                  <div class="col">
                    {renderDetail(
                      <CheckCircleOutlined />,
                      "Status",
                      business.data.status
                        ? business.data.companyStatus
                        : `No Data`
                    )}
                  </div>
                  <div class="col">
                    {renderDetail(
                      <CheckCircleOutlined />,
                      "Company Status",
                      business.data.companyStatus
                        ? business.data.companyStatus
                        : `No Data`
                    )}
                  </div>

                  <div class="col">
                    {renderDetail(
                      <HomeOutlined />,
                      "Business Address",
                      business.data.address ? business.data.address : "No Data"
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
                          ? `No Data`
                          : business.data.state
                        : `No Data`
                    )}
                  </div>

                  <div class="col">
                    {renderDetail(
                      <MdOutlinePinDrop />,
                      "LGA",
                      business.data.lga
                        ? business.data.lga === "null"
                          ? `No Data`
                          : business.data.lga
                        : `No Data`
                    )}
                  </div>

                  <div class="col">
                    {renderDetail(
                      <MdOutlinePinDrop />,
                      "City",
                      business.data.city ? business.data.city : `No Data`
                    )}
                  </div>
                </div>

                <Divider />
                <div class="row">
                  <div class="col">
                    {renderDetail(
                      <CheckCircleOutlined />,
                      "CAC ID",
                      business.data.cacid ? business.data.cacid : `No Data`
                    )}
                  </div>
                  <div class="col">
                    {renderDetail(
                      <CheckCircleOutlined />,
                      "Code",
                      business.data.code ? business.data.code : `No Data`
                    )}
                  </div>

                  <div class="col">
                    {renderDetail(
                      <MailOutlined />,
                      "Classification ID",
                      business.data.classificationId
                        ? business.data.classificationId
                        : `No Data`
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
                        : `No Data`
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
                        : "No Data"
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
                        style={{ paddingRight: "50px", paddingLeft: "50px" }}
                        onClick={() => handleButtonClick(business.data.cacid)}
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
                                        {`${shareholder.firstname || ""} ${
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
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Last Name:",
                                          shareholder.surname
                                            ? shareholder.surname
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Other Name: ",
                                          shareholder.other_name
                                            ? shareholder.other_name
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "Address: ",
                                          shareholder.address
                                            ? shareholder.address == "null"
                                              ? `No Data`
                                              : shareholder.address
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Full Address: ",
                                          shareholder.full_address2
                                            ? shareholder.full_address2 ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.full_address2
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Email: ",
                                          shareholder.email
                                            ? shareholder.email == "null"
                                              ? `No Data`
                                              : shareholder.email
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "Phone Number: ",
                                          shareholder.phone_number
                                            ? shareholder.phone_number == "null"
                                              ? `No Data`
                                              : shareholder.phone_number
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Gender: ",
                                          shareholder.gender
                                            ? shareholder.gender == "null"
                                              ? `No Data`
                                              : shareholder.gender
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "State: ",
                                          shareholder.state
                                            ? shareholder.state == "null"
                                              ? `No Data`
                                              : shareholder.state
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "IsChairman: ",
                                          shareholder.is_chairman
                                            ? shareholder.is_chairman == "null"
                                              ? `No Data`
                                              : shareholder.is_chairman
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Occupation: ",
                                          shareholder.occupation
                                            ? shareholder.occupation == "null"
                                              ? `No Data`
                                              : shareholder.occupation
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Former Name: ",
                                          shareholder.former_name
                                            ? shareholder.former_name == "null"
                                              ? `No Data`
                                              : shareholder.former_name
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.corporation_name
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Number of Shares: ",
                                          shareholder.num_shares_alloted
                                            ? shareholder.num_shares_alloted ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.num_shares_alloted
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Status: ",
                                          shareholder.status
                                            ? shareholder.status == "null"
                                              ? `No Data`
                                              : shareholder.status
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.identity_number
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Age: ",
                                          shareholder.age
                                            ? shareholder.age == "null"
                                              ? `No Data`
                                              : shareholder.age
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Type of Shares: ",
                                          shareholder.type_of_shares
                                            ? shareholder.type_of_shares ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.type_of_shares
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "IsCorporate:",
                                          shareholder.is_corporate
                                            ? shareholder.is_corporate == "null"
                                              ? `No Data`
                                              : shareholder.is_corporate
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Termination:",
                                          shareholder.date_of_termination
                                            ? shareholder.date_of_termination ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_termination
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Appointment:",
                                          shareholder.date_of_appointment
                                            ? shareholder.date_of_appointment ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_appointment
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
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
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_status_change
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Birth:",
                                          shareholder.date_of_birth
                                            ? shareholder.date_of_birth ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_birth
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Government Organisation Name:",
                                          shareholder.government_organisation_name
                                            ? shareholder.government_organisation_name ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.government_organisation_name
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.foreign_organisation_name
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Nationality:",
                                          shareholder.nationality
                                            ? shareholder.nationality == "null"
                                              ? `No Data`
                                              : shareholder.nationality
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Appointed By:",
                                          shareholder.appointed_by
                                            ? shareholder.appointed_by == "null"
                                              ? `No Data`
                                              : shareholder.appointed_by
                                            : `No Data`
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
                                        {`${shareholder.firstname || ""} ${
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
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Last Name:",
                                          shareholder.surname
                                            ? shareholder.surname
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Other Name: ",
                                          shareholder.other_name
                                            ? shareholder.other_name
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "Address: ",
                                          shareholder.address
                                            ? shareholder.address == "null"
                                              ? `No Data`
                                              : shareholder.address
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Full Address: ",
                                          shareholder.full_address2
                                            ? shareholder.full_address2 ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.full_address2
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Email: ",
                                          shareholder.email
                                            ? shareholder.email == "null"
                                              ? `No Data`
                                              : shareholder.email
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "Phone Number: ",
                                          shareholder.phone_number
                                            ? shareholder.phone_number == "null"
                                              ? `No Data`
                                              : shareholder.phone_number
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Gender: ",
                                          shareholder.gender
                                            ? shareholder.gender == "null"
                                              ? `No Data`
                                              : shareholder.gender
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "State: ",
                                          shareholder.state
                                            ? shareholder.state == "null"
                                              ? `No Data`
                                              : shareholder.state
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "IsChairman: ",
                                          shareholder.is_chairman
                                            ? shareholder.is_chairman == "null"
                                              ? `No Data`
                                              : shareholder.is_chairman
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Occupation: ",
                                          shareholder.occupation
                                            ? shareholder.occupation == "null"
                                              ? `No Data`
                                              : shareholder.occupation
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Former Name: ",
                                          shareholder.former_name
                                            ? shareholder.former_name == "null"
                                              ? `No Data`
                                              : shareholder.former_name
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.corporation_name
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Number of Shares: ",
                                          shareholder.num_shares_alloted
                                            ? shareholder.num_shares_alloted ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.num_shares_alloted
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Status: ",
                                          shareholder.status
                                            ? shareholder.status == "null"
                                              ? `No Data`
                                              : shareholder.status
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.identity_number
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Age: ",
                                          shareholder.age
                                            ? shareholder.age == "null"
                                              ? `No Data`
                                              : shareholder.age
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Type of Shares: ",
                                          shareholder.type_of_shares
                                            ? shareholder.type_of_shares ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.type_of_shares
                                            : `No Data`
                                        )}
                                      </div>
                                    </div>
                                    <Divider />
                                    <div class="row">
                                      <div class="col">
                                        {renderDetail2(
                                          "IsCorporate:",
                                          shareholder.is_corporate
                                            ? shareholder.is_corporate == "null"
                                              ? `No Data`
                                              : shareholder.is_corporate
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Termination:",
                                          shareholder.date_of_termination
                                            ? shareholder.date_of_termination ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_termination
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Appointment:",
                                          shareholder.date_of_appointment
                                            ? shareholder.date_of_appointment ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_appointment
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
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
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_status_change
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Date of Birth:",
                                          shareholder.date_of_birth
                                            ? shareholder.date_of_birth ==
                                              "null"
                                              ? `No Data`
                                              : new Date(
                                                  shareholder.date_of_birth
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                })
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Government Organisation Name:",
                                          shareholder.government_organisation_name
                                            ? shareholder.government_organisation_name ==
                                              "null"
                                              ? `No Data`
                                              : shareholder.government_organisation_name
                                            : `No Data`
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
                                              ? `No Data`
                                              : shareholder.foreign_organisation_name
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Nationality:",
                                          shareholder.nationality
                                            ? shareholder.nationality == "null"
                                              ? `No Data`
                                              : shareholder.nationality
                                            : `No Data`
                                        )}
                                      </div>
                                      <div class="col">
                                        {renderDetail2(
                                          "Appointed By:",
                                          shareholder.appointed_by
                                            ? shareholder.appointed_by == "null"
                                              ? `No Data`
                                              : shareholder.appointed_by
                                            : `No Data`
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
                    We couldn't find any shareholders records based on the
                    information you provided.
                  </span>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Spin size="large" />
        )}
      </InfoSec>
      <Title level={5} style={{ marginTop: "20px" }}>
        Your Offers
      </Title>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Car Finance</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#DDF9EA",
                }}
              >
                <p class="card-text">Credit Cards handpicked for you</p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-header">Car Insurance</div>
              <div
                class="card-body"
                style={{
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  backgroundColor: "#ECF5F8",
                }}
              >
                <p class="card-text">
                  Borrow from 100,000 with monthly repayments of to 7 years.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
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
          </div>
          <Modal
            // title="Complete Wallet TopUp"
            style={{
              top: 20,
            }}
            width={1000}
            open={modal2Open}
            onOk={handleModalNewOk}
            onCancel={handleCancel2}
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
