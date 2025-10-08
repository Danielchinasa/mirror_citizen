import React, { useState, useEffect } from "react";
import {
  Nav,
  NavbarContainer,
  HamburgerIcon,
  NavMenu,
  NavItemBtn,
  NavBtnLink,
} from "./Navbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MainButton, OutlineButton } from "../../globalStyles";

import Logo from "../../images/e-citizen_logo_ecitizen.png";
import LogoWhite from "../../images/e-citizen_logo_ecitizen_white.png";
import defaultDp from "../../images/defaultDp.png";
import defaultDpDark from "../../images/defaultDpDark.png";
import { Link } from "react-router-dom";
import { Button, Flex, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space, Divider, Input } from "antd";
import ReactGA from "react-ga4";
import Swal from "sweetalert2";
import { ThemeToggle } from "../../components/ThemeToggle";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
import { imageBaseUrl } from "../../apiConfig";
import axios from "axios"; // Import axios
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../stripeConfig";
import StripePaymentForm from "../../stripe/StripePaymentForm";

const { useToken } = theme;

const { Title } = Typography;

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const userDetails = useSelector((state) => state.userDetails);
  const userToken = userDetails?.jwtToken || "";
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // const tokenExpire = userDetails?.expirationDate || "";
  const userCurrency = userDetails?.currency || "";
  const user = useSelector((state) => state.user);
  const userToken2 = user?.jwtToken || "";
  // const tokenExpire = "2024-04-30T09:04:44.000+00:00";

  const tokenExpire = user?.expirationDate || "";

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    // Correct the typo from innerwidth to innerWidth
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    if (currentDate >= expireDate) {
      dispatch(logout());
      history.push("/");
    } else {
    }
  }, []);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  const handleLogout = () => {
    // Dispatch the logout action when the user clicks the logout button
    dispatch(logout());
    history.push("/");
  };

  const items = [
    // {
    //   key: "1",
    //   label: (
    //     <a href="/main-dashboard" style={{ textDecoration: "none" }}>
    //       Dashboard
    //     </a>
    //   ),
    // },
    {
      key: "2",
      label: (
        <a href="/profile" style={{ textDecoration: "none" }}>
          Profile
        </a>
      ),
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key} onClick={closeMobileMenu}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const UserDropdown = () => {
    return (
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottomLeft"
        arrow
      >
        <Space
          key="user-dropdown"
          style={{
            cursor: "pointer",
            border: "1px solid #d9d9d9",
            padding: "8px",
            borderRadius: "8px", // Set borderRadius to make it a square
          }}
          size={20}
        >
          <img
            src={
              userDetails && userDetails?.profileImageLocation
                ? `${imageBaseUrl}${userDetails?.profileImageLocation}`
                : isDark
                ? defaultDpDark
                : defaultDp
            }
            alt="User Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <DownOutlined />
        </Space>
      </Dropdown>
    );
  };

  useEffect(() => {
    // Dispatch fetchUserProfile action when component mounts
    dispatch(fetchUserProfile(userToken));
  }, [dispatch]);

  const userBalance = userDetails?.walletBalance || 0;
  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };
  const formatToDollar = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const [amount, setAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [transactionRef, setTransactionRef] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setAmount("");
    setIsModalVisible(false);
  };
  const handleModalOk = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/payment/check?transactionRef=${transactionRef}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken2}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          dispatch(fetchUserProfile(userToken2));
          setModal1Open(false);
        } else {
          dispatch(fetchUserProfile(userToken2));
          setModal1Open(false);
        }
      }
    } catch (error) {
      dispatch(fetchUserProfile(userToken2));
      setModal1Open(false);
    }
    // dispatch(fetchUserProfile(userToken2));
    // setModal1Open(false);
  };

  const handleOk = () => {
    if (!amount) {
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Payment Failed",
        text: "Please enter an amount",
        icon: "error",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Payment Failed",
        text: "Please select a payment method",
        icon: "error",
      });
      return;
    }

    // Handle payment based on selected method
    if (selectedPaymentMethod === "flutterwave") {
      handleFlutterwavePayment();
    } else if (selectedPaymentMethod === "stripe") {
      handleStripePayment();
    }
  };

  const [stripeModalVisible, setStripeModalVisible] = useState(false);
  const [selectedStripePayment, setSelectedStripePayment] = useState(null);
  const [currencyCheck, setCurrencyCheck] = useState("NGN");

  const handleStripePayment = async () => {
    ReactGA.event({
      category: "User",
      action: "Topped up wallet via Stripe",
    });

    setIsModalVisible(false);
    try {
      //!! Do verification initiate here
      // const initiateResponse = await dispatch(
      //   initiateVerificationRequest(formData, userToken)
      // );

      // if (initiateResponse?.sessionStatus == "INITIATED") {
      //   localStorage.setItem("sessionCode", initiateResponse?.sessionCode);
      // }

      // Create payment intent on your backend
      const response = await fetch(`${baseUrl}/payment/create-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: "usd",
          // sessionCode: localStorage.getItem("sessionCode"),
          description: "Wallet funding",
          payment_method: "card,mobilemoney,ussd",
          type: "TOPUP",
        }),
      });

      const { client_secret, paymentIntentId } = await response.json();

      if (!client_secret) {
        throw new Error("Failed to create payment intent");
      }

      localStorage.setItem("transactionID", paymentIntentId);
      localStorage.setItem("paymentType", "STRIPE");
      setSelectedStripePayment({
        client_secret,
        amount: amount,
        currency: currencyCheck.toUpperCase() === "USD" ? "USD" : "NGN",
      });
      setStripeModalVisible(true);
    } catch (error) {
      console.error("Stripe payment error:", error);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Failed to initialize Stripe payment",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
    } finally {
    }
  };

  const StripePaymentModal = () => (
    <Modal
      title="Pay with Card"
      visible={stripeModalVisible}
      onCancel={() => setStripeModalVisible(false)}
      footer={null}
      width={500}
      maskClosable={false}
    >
      <div
        style={{ marginBottom: "15px", fontWeight: "bold", fontSize: "16px" }}
      >
        Amount to Pay: {selectedStripePayment?.currency}{" "}
        {(selectedStripePayment?.amount ?? 0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: selectedStripePayment?.client_secret,
          appearance: {
            theme: isDark ? "night" : "stripe",
            variables: {
              colorPrimary: "#0DC939",
            },
          },
        }}
      >
        <StripePaymentForm
          onSuccess={async (paymentIntent) => {
            console.log(
              "Stripe Payment Success. PaymentIntent:",
              paymentIntent
            );
            setStripeModalVisible(false);
            // handleSubmit();
            if (paymentIntent && paymentIntent.status === "succeeded") {
              const response = await fetch(
                `${baseUrl}/payment/confirm-intent`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                  },
                  body: JSON.stringify({
                    paymentIntentId: localStorage.getItem("transactionID"),
                    paymentMethod: "pm_card_mastercard",
                  }),
                }
              );
              const responseData = await response.json();
              if (responseData.status === "succeeded") {
                dispatch(fetchUserProfile(userToken));
              }
            } else {
              Swal.fire({
                background: bgContainer,
                color: text,
                title: "Payment Failed",
                text: "Stripe payment failed. Please try again.",
                icon: "error",
              });
            }
          }}
          onError={(error) => {
            console.error("Stripe payment error:", error);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Payment Failed",
              text: "Stripe payment failed. Please try again.",
              icon: "error",
            });
            setStripeModalVisible(false);
          }}
          onCancel={() => {
            setStripeModalVisible(false);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Payment Cancelled",
              text: "Stripe payment was cancelled.",
              icon: "info",
            });
          }}
        />
      </Elements>
    </Modal>
  );
  const handleFlutterwavePayment = async () => {
    ReactGA.event({
      category: "User",
      action: "Topped up wallet",
    });

    setIsModalVisible(false);
    try {
      const postData = {
        amount: amount,
        currency: userCurrency,
        country: "NG",
        description: "Wallet top up",
        payment_method: "card,mobilemoney,ussd",
        type: "TOPUP",
      };
      setAmount("");

      // Changed from fetch to axios
      const response = await axios.post(
        `${baseUrl}/payment/flexi-initiate`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken2}`,
          },
        }
      );

      const responseData = response.data; // Axios puts the response data in the 'data' property

      if (responseData.status === "success") {
        if (responseData.data && responseData.data.link) {
          setPaymentUrl(responseData.data.link);
          setTransactionRef(responseData.data.txRef);
          setModal1Open(true);
        } else {
          Swal.fire({
            background: bgContainer,
            color: text,
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
      } else {
        Swal.fire({
          background: bgContainer,
          color: text,
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
      // Axios errors are typically in error.response or error.message
      console.error("An error occurred:", error);

      Swal.fire({
        background: bgContainer,
        color: text,
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
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;

    // Validate if the input is a positive number
    if (/^[1-9]\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value); // Set the amount only if it's a positive number greater than zero
    }
  };

  const { isDark } = useTheme();
  const { token } = theme.useToken(); // Get token from useToken
  const { text, bgContainer } = token;

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav $token={token}>
          <NavbarContainer>
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              {/* <Logo style={{ marginTop: "10px" }} /> */}
              <img
                src={isDark ? LogoWhite : Logo}
                alt="Logo"
                width={230}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Link>
            <HamburgerIcon onClick={handleClick}>
              {click ? (
                <FaTimes />
              ) : (
                <FaBars color={isDark ? "white" : "black"} />
              )}
            </HamburgerIcon>

            <NavMenu onClick={handleClick} click={click}>
              {isAuthenticated && (
                <>
                  <NavItemBtn>
                    <NavBtnLink to="/main-dashboard">
                      <OutlineButton
                        type="primary"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "700",
                        }}
                        $token={token}
                      >
                        Dashboard
                      </OutlineButton>
                    </NavBtnLink>
                  </NavItemBtn>
                  <NavItemBtn>
                    <NavBtnLink to="/dashboard">
                      <MainButton
                        type="primary"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "700",
                        }}
                      >
                        Identity Verification
                      </MainButton>
                    </NavBtnLink>
                  </NavItemBtn>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to="/login">
                        <OutlineButton
                          $token={token}
                          type="primary"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          GET STARTED
                        </OutlineButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/login">
                        <OutlineButton
                          $token={token}
                          onClick={closeMobileMenu}
                          fontBig
                          type="primary"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          GET STARTED
                        </OutlineButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  {/* <NavItemBtn>
                    {button ? (
                      <NavBtnLink
                        to="/sign-up"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "700",
                        }}
                      >
                        <MainButton type="primary">SIGN UP</MainButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/sign-up">
                        <MainButton
                          onClick={closeMobileMenu}
                          fontBig
                          type="primary"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          SIGN UP
                        </MainButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn> */}
                  <ThemeToggle />
                </>
              )}

              {/* Conditionally render logout button when the user is authenticated */}
              {window.innerWidth <= 960
                ? isAuthenticated && (
                    <>
                      {/* <NavItemBtn>
                        <NavBtnLink to="/main-dashboard">
                          <MainButton type="primary">Dashboard</MainButton>
                        </NavBtnLink>
                      </NavItemBtn> */}
                      <NavItemBtn>
                        <NavBtnLink to="/profile">
                          <MainButton type="primary">Profile</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <NavItemBtn>
                        <NavBtnLink to="/contact">
                          <MainButton type="primary">Contact Us</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <NavItemBtn>
                        <NavBtnLink to="/faq">
                          <MainButton type="primary">FAQs</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <div
                        style={{
                          marginTop: "20px",
                          textAlign: "center",
                          paddingLeft: "35px",
                          paddingRight: "15px",
                          color: "#FFFFFF",
                        }}
                      >
                        <Title level={4} style={{ color: "#FFFFFF" }}>
                          {userDetails?.firstName} {userDetails?.lastName}
                        </Title>
                        <p onClick={showModal} style={{ color: text }}>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {userCurrency === "USD" || userCurrency === "usd"
                              ? `${formatToDollar(userBalance)}`
                              : formatToNaira(userBalance)}
                          </span>
                        </p>
                        <Modal
                          title="Fund Your Wallet"
                          visible={isModalVisible}
                          onOk={handleOk}
                          okText="Proceed to Payment"
                          onCancel={handleCancel}
                          width={400}
                        >
                          {/* Current Balance Section */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Wallet Balance:</Title>
                            <Title level={3} style={{ color: "#0DC939" }}>
                              {userCurrency.toUpperCase() === "NGN"
                                ? formatToNaira(userBalance)
                                : `${formatToDollar(userBalance)}`}
                            </Title>
                          </div>

                          <Divider style={{ border: "1px solid #D9D9D9" }} />

                          {/* Amount Input Section */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Enter Amount</Title>
                            <Input
                              type="text"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={handleChange}
                              style={{ marginTop: 8 }}
                            />
                          </div>

                          {/* Payment Method Selection */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Select Payment Method</Title>

                            <div
                              style={{
                                display: "flex",
                                gap: "12px",
                                marginTop: 12,
                              }}
                            >
                              {/* Flutterwave Option */}
                              <div
                                style={{
                                  flex: 1,
                                  border: `2px solid ${
                                    selectedPaymentMethod === "flutterwave"
                                      ? "#1890ff"
                                      : "#f0f0f0"
                                  }`,
                                  borderRadius: "8px",
                                  padding: "12px",
                                  cursor: "pointer",
                                  backgroundColor:
                                    selectedPaymentMethod === "flutterwave"
                                      ? "#f6ffed"
                                      : "white",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  setSelectedPaymentMethod("flutterwave")
                                }
                              >
                                <div
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  🇳🇬
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                  Flutterwave
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "4px",
                                  }}
                                >
                                  Best for NGN payments
                                </div>
                              </div>

                              {/* Stripe Option */}
                              <div
                                style={{
                                  flex: 1,
                                  border: `2px solid ${
                                    selectedPaymentMethod === "stripe"
                                      ? "#1890ff"
                                      : "#f0f0f0"
                                  }`,
                                  borderRadius: "8px",
                                  padding: "12px",
                                  cursor: "pointer",
                                  backgroundColor:
                                    selectedPaymentMethod === "stripe"
                                      ? "#f6ffed"
                                      : "white",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  setSelectedPaymentMethod("stripe")
                                }
                              >
                                <div
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  💳
                                </div>
                                <div style={{ fontWeight: "bold" }}>Stripe</div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "4px",
                                  }}
                                >
                                  Cards & International
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Payment Method Details */}
                          {selectedPaymentMethod && (
                            <div
                              style={{
                                padding: "12px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "6px",
                                fontSize: "12px",
                                color: "#666",
                              }}
                            >
                              {selectedPaymentMethod === "flutterwave"
                                ? "You will be redirected to Flutterwave to complete your payment"
                                : "You will be redirected to Stripe to complete your payment"}
                            </div>
                          )}
                        </Modal>
                        <Modal
                          // title="Complete Wallet TopUp"
                          style={{
                            top: 20,
                          }}
                          width={1000}
                          open={modal1Open}
                          onOk={handleModalOk}
                          onCancel={handleModalOk}
                          maskClosable={false}
                          footer={[
                            <Button
                              style={{ color: text }}
                              type="dashed"
                              onClick={handleModalOk}
                            >
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

                      <NavItemBtn>
                        <NavBtnLink>
                          <OutlineButton
                            type="primary"
                            onClick={handleLogout}
                            $token={token}
                          >
                            Logout
                          </OutlineButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <ThemeToggle style={{ paddingLeft: "49px" }} />
                    </>
                  )
                : isAuthenticated && (
                    <>
                      <div
                        style={{
                          marginTop: "20px",
                          textAlign: "end",
                          paddingLeft: "35px",
                          paddingRight: "15px",
                        }}
                      >
                        <Title level={4}>
                          {userDetails?.firstName} {userDetails?.lastName}
                        </Title>
                        <p onClick={showModal} style={{ color: text }}>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {/* ₦{userBalance.toLocaleString()} */}
                            {userCurrency === "USD" || userCurrency === "usd"
                              ? `${formatToDollar(userBalance)}`
                              : formatToNaira(userBalance)}
                          </span>
                        </p>
                        {/* <Modal
                          title="User Wallet"
                          open={isModalVisible} // Use 'open' instead of 'visible' for Ant Design v5+ Modal
                          onOk={handleOk}
                          okText="Proceed to Payment"
                          onCancel={handleCancel}
                          width={300}
                        >
                          <Title level={5}> Wallet Balance:</Title>
                          <Title level={3} style={{ color: "#0DC939" }}>
                            {userCurrency.toUpperCase() === "NGN"
                              ? formatToNaira(userBalance)
                              : `${formatToDollar(userBalance)}`}
                          </Title>

                          <Divider style={{ border: "1px solid #D9D9D9" }} />
                          <Title level={5}>Fund Wallet</Title>
                          <p>Enter Amount to Fund Wallet</p>
                          <Input
                            type="text"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={handleChange}
                          />
                        </Modal> */}
                        <Modal
                          title="Fund Your Wallet"
                          visible={isModalVisible}
                          onOk={handleOk}
                          okText="Proceed to Payment"
                          onCancel={handleCancel}
                          width={400}
                        >
                          {/* Current Balance Section */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Wallet Balance:</Title>
                            <Title level={3} style={{ color: "#0DC939" }}>
                              {userCurrency.toUpperCase() === "NGN"
                                ? formatToNaira(userBalance)
                                : `${formatToDollar(userBalance)}`}
                            </Title>
                          </div>

                          <Divider style={{ border: "1px solid #D9D9D9" }} />

                          {/* Amount Input Section */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Enter Amount</Title>
                            <Input
                              type="text"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={handleChange}
                              style={{ marginTop: 8 }}
                            />
                          </div>

                          {/* Payment Method Selection */}
                          <div style={{ marginBottom: 20 }}>
                            <Title level={5}>Select Payment Method</Title>

                            <div
                              style={{
                                display: "flex",
                                gap: "12px",
                                marginTop: 12,
                              }}
                            >
                              {/* Flutterwave Option */}
                              <div
                                style={{
                                  flex: 1,
                                  border: `2px solid ${
                                    selectedPaymentMethod === "flutterwave"
                                      ? "#1890ff"
                                      : "#f0f0f0"
                                  }`,
                                  borderRadius: "8px",
                                  padding: "12px",
                                  cursor: "pointer",
                                  backgroundColor:
                                    selectedPaymentMethod === "flutterwave"
                                      ? "#f6ffed"
                                      : "white",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  setSelectedPaymentMethod("flutterwave")
                                }
                              >
                                <div
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  🇳🇬
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                  Flutterwave
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "4px",
                                  }}
                                >
                                  Best for NGN payments
                                </div>
                              </div>

                              {/* Stripe Option */}
                              <div
                                style={{
                                  flex: 1,
                                  border: `2px solid ${
                                    selectedPaymentMethod === "stripe"
                                      ? "#1890ff"
                                      : "#f0f0f0"
                                  }`,
                                  borderRadius: "8px",
                                  padding: "12px",
                                  cursor: "pointer",
                                  backgroundColor:
                                    selectedPaymentMethod === "stripe"
                                      ? "#f6ffed"
                                      : "white",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  setSelectedPaymentMethod("stripe")
                                }
                              >
                                <div
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  💳
                                </div>
                                <div style={{ fontWeight: "bold" }}>Stripe</div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "4px",
                                  }}
                                >
                                  Cards & International
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Payment Method Details */}
                          {selectedPaymentMethod && (
                            <div
                              style={{
                                padding: "12px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "6px",
                                fontSize: "12px",
                                color: "#666",
                              }}
                            >
                              {selectedPaymentMethod === "flutterwave"
                                ? "You will be redirected to Flutterwave to complete your payment"
                                : "You will be redirected to Stripe to complete your payment"}
                            </div>
                          )}
                        </Modal>
                        <Modal
                          // title="Complete Wallet TopUp"
                          style={{
                            top: 20,
                          }}
                          width={1000}
                          open={modal1Open}
                          onOk={handleModalOk}
                          onCancel={handleModalOk}
                          maskClosable={false}
                          footer={[
                            <Button
                              danger
                              type="dashed"
                              onClick={handleModalOk}
                            >
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
                      <UserDropdown />
                      <div style={{ marginLeft: "20px" }}>
                        <ThemeToggle />
                      </div>
                    </>
                  )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
