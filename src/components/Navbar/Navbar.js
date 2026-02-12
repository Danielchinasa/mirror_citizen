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
import { Button, Flex, Modal, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space, Divider, Input } from "antd";
import paypal from "../../images/paypal.png";
import ReactGA from "react-ga4";
import Swal from "sweetalert2";
import { ThemeToggle } from "../../components/ThemeToggle";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
import { imageBaseUrl } from "../../apiConfig";
import axios from "axios"; // Import axios
import { initiatePaystackPayment } from "../../services/paystackService";

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
  const [walletPaymentMethod, setWalletPaymentMethod] = useState(1);

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
        },
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
  const handleOk = async () => {
    const minAmount = userCurrency.toUpperCase() === "NGN" ? 1000 : 10;

    // Validate minimum amount
    if (!amount || parseFloat(amount) < minAmount) {
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: `Minimum top-up amount is ${
          userCurrency.toUpperCase() === "NGN" ? "₦1,000" : "$10"
        }`,
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#0DC939",
      });
      return;
    }

    ReactGA.event({
      category: "User",
      action: "Topped up wallet",
    });

    setIsModalVisible(false);
    try {
      if (walletPaymentMethod === 1) {
        // FlutterWave payment
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
          },
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
      } else if (walletPaymentMethod === 2) {
        // PayPal payment
        const postData = {
          tx_ref: `WALLET_${Date.now()}`,
          amount: amount,
          currency: "USD",
          email: userDetails?.email || "",
          type: "TOPUP",
          stakeHolders: "NON-STAKEHOLDER",
          return_url: window.location.origin + "/payment/success",
          cancel_url: window.location.origin + "/payment/failure",
        };
        setAmount("");

        const response = await axios.post(
          `${baseUrl}/payment/paypal/create`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken2}`,
            },
          },
        );

        const responseData = response.data;
        console.log("PayPal Response Data:", responseData);

        if (responseData.status === "success" && responseData.approval_url) {
          // Redirect to PayPal approval URL
          window.location.href = responseData.approval_url;
        } else {
          console.error("PayPal response does not contain approval URL");
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: "Failed to initialize PayPal payment",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          });
        }
      } else if (walletPaymentMethod === 3) {
        // Paystack payment
        const postData = {
          amount: amount,
          currency: "NGN",
          type: "TOPUP",
          sessionCode: null,
          stakeHolders: null,
        };
        setAmount("");

        try {
          const responseData = await initiatePaystackPayment(
            postData,
            userToken2,
          );

          if (responseData.status === "success" && responseData.data) {
            // Redirect to Paystack payment page
            window.location.href = responseData.data.authorization_url;
          } else {
            console.error("Paystack response invalid");
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Error",
              text: "Failed to initialize Paystack payment",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            });
          }
        } catch (error) {
          console.error("Paystack error:", error);
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: error.message || "Failed to initialize Paystack payment",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          });
        }
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
                          title="User Wallet"
                          open={isModalVisible}
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
                          <Title level={5}>Select Payment Method</Title>
                          <Radio.Group
                            value={walletPaymentMethod}
                            onChange={(e) =>
                              setWalletPaymentMethod(e.target.value)
                            }
                            style={{ width: "100%", marginBottom: "15px" }}
                          >
                            <Radio
                              value={1}
                              style={{
                                display: "block",
                                border: "1px solid #e8e8e8",
                                borderRadius: "5px",
                                padding: "10px",
                                marginBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              FlutterWave
                            </Radio>
                            {/* {userCurrency.toUpperCase() !== "NGN" && (
                              <Radio
                                value={2}
                                style={{
                                  display: "block",
                                  border: "1px solid #e8e8e8",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  marginBottom: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                PayPal
                                <img
                                  src={paypal}
                                  alt="paypal"
                                  width={60}
                                  style={{ float: "right", marginTop: "5px" }}
                                />
                              </Radio>
                            )} */}
                            {userCurrency.toUpperCase() === "NGN" && (
                              <Radio
                                value={3}
                                style={{
                                  display: "block",
                                  border: "1px solid #e8e8e8",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                Paystack
                              </Radio>
                            )}
                          </Radio.Group>
                          <p>
                            Enter Amount to Fund Wallet (Minimum:{" "}
                            {userCurrency.toUpperCase() === "NGN"
                              ? "₦1,000"
                              : "$10"}
                            )
                          </p>
                          <Input
                            type="number"
                            placeholder={`Enter amount (min: ${
                              userCurrency.toUpperCase() === "NGN"
                                ? "1000"
                                : "10"
                            })`}
                            value={amount}
                            onChange={handleChange}
                            min={
                              userCurrency.toUpperCase() === "NGN" ? 1000 : 10
                            }
                          />
                          {amount &&
                            parseFloat(amount) <
                              (userCurrency.toUpperCase() === "NGN"
                                ? 1000
                                : 10) && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "5px",
                                }}
                              >
                                Minimum top-up amount is{" "}
                                {userCurrency.toUpperCase() === "NGN"
                                  ? "₦1,000"
                                  : "$10"}
                              </p>
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
                        <Modal
                          title="User Wallet"
                          open={isModalVisible}
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
                          <Title level={5}>Select Payment Method</Title>
                          <Radio.Group
                            value={walletPaymentMethod}
                            onChange={(e) =>
                              setWalletPaymentMethod(e.target.value)
                            }
                            style={{ width: "100%", marginBottom: "15px" }}
                          >
                            <Radio
                              value={1}
                              style={{
                                display: "block",
                                border: "1px solid #e8e8e8",
                                borderRadius: "5px",
                                padding: "10px",
                                marginBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              FlutterWave
                            </Radio>
                            {/* {userCurrency.toUpperCase() !== "NGN" && (
                              <Radio
                                value={2}
                                style={{
                                  display: "block",
                                  border: "1px solid #e8e8e8",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  marginBottom: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                PayPal
                                <img
                                  src={paypal}
                                  alt="paypal"
                                  width={60}
                                  style={{ float: "right", marginTop: "5px" }}
                                />
                              </Radio>
                            )} */}
                            {userCurrency.toUpperCase() === "NGN" && (
                              <Radio
                                value={3}
                                style={{
                                  display: "block",
                                  border: "1px solid #e8e8e8",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                Paystack
                              </Radio>
                            )}
                          </Radio.Group>
                          <p>
                            Enter Amount to Fund Wallet (Minimum:{" "}
                            {userCurrency.toUpperCase() === "NGN"
                              ? "₦1,000"
                              : "$10"}
                            )
                          </p>
                          <Input
                            type="number"
                            placeholder={`Enter amount (min: ${
                              userCurrency.toUpperCase() === "NGN"
                                ? "1000"
                                : "10"
                            })`}
                            value={amount}
                            onChange={handleChange}
                            min={
                              userCurrency.toUpperCase() === "NGN" ? 1000 : 10
                            }
                          />
                          {amount &&
                            parseFloat(amount) <
                              (userCurrency.toUpperCase() === "NGN"
                                ? 1000
                                : 10) && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "5px",
                                }}
                              >
                                Minimum top-up amount is{" "}
                                {userCurrency.toUpperCase() === "NGN"
                                  ? "₦1,000"
                                  : "$10"}
                              </p>
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
