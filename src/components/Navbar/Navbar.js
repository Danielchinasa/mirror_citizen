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

import Logo from "../../images/logo.png";
import Logo1 from "../../images/logo1.png";
import defaultDp from "../../images/defaultDp.png";
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
import ThemeToggleButton from "../ThemeToggleButton";
import { useTheme } from "../../ThemeContext";


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
      // console.log("Time don pass well");
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

  console.log(
    "userDetails?.profileImageLocation",
    userDetails?.profileImageLocation
  );

  const UserDropdown = () => {
    return (
      <Dropdown
        // menu={{
        //   items,
        // }}
        // placement="bottomLeft"
        // arrow
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
                ? `https://e-citizen.ng:8443${userDetails?.profileImageLocation}`
                : defaultDp
            }
            // src={
            //   "https://e-citizen.ng:8443" + userDetails?.profileImageLocation ||
            //   defaultDp
            // }
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

  console.log("UserDetails 2");
  console.log(userDetails);
  const userBalance = userDetails?.walletBalance || 0;
  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };
  const [amount, setAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setAmount("");
    setIsModalVisible(false);
  };
  const handleModalOk = () => {
    dispatch(fetchUserProfile(userToken2));
    setModal1Open(false);
  };
  const handleOk = async () => {
    ReactGA.event({
      category: "User",
      action: "Topped up wallet",
    });

    setIsModalVisible(false);
    try {
      // Assuming postData is the data you want to send to the endpoint
      const postData = {
        amount: amount,
        currency: userCurrency,
        country: "NG",
        description: "Wallet top up",
        payment_method: "card,mobilemoney,ussd",
        type: "TOPUP",
      };
      setAmount("");

      const response = await fetch(
        "https://e-citizen.ng:8443/api/v2/payment/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken2}`,
          },
          body: JSON.stringify(postData),
        }
      );
      console.log("Nav wallet resposne", response);
      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        // Handle successful response here

        const responseData = await response.json();
        if (responseData.status === "success") {
          if (responseData.data && responseData.data.link) {
            console.log("Embedding URL:", responseData.data.link);
            setPaymentUrl(responseData.data.link);
            setModal1Open(true);
          } else {
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
      } else {
        // Handle errors here
        console.error("Failed to post data:", response.statusText);

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
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;

    // Validate if the input is a positive number
    if (/^[1-9]\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value); // Set the amount only if it's a positive number greater than zero
    }
  };

  const { theme } = useTheme();

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav>
          
          <NavbarContainer>
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              {/* <Logo style={{ marginTop: "10px" }} /> */}
              <img
                src={theme === "light" ? Logo : Logo1}
                alt="Logo"
                width={230}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Link>
            <ThemeToggleButton />
            <HamburgerIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
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
                          type="primary"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          LOGIN
                        </OutlineButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/login">
                        <OutlineButton
                          onClick={closeMobileMenu}
                          fontBig
                          primary
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          LOGIN
                        </OutlineButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  <NavItemBtn>
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
                          primary
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                          }}
                        >
                          SIGN UP
                        </MainButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
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
                          <MainButton type="primary">FAQ</MainButton>
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
                        <p onClick={showModal}>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {/* ₦{userBalance.toLocaleString()} */}
                            {userCurrency === "usd"
                              ? `$${userBalance}`
                              : formatToNaira(userBalance)}
                          </span>
                        </p>
                        <Modal
                          title="User Wallet"
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          width={300}
                        >
                          <Title level={5}> Wallet Balance:</Title>
                          <Title level={3} style={{ color: "#0DC939" }}>
                            {userCurrency === "ngn"
                              ? formatToNaira(userBalance)
                              : `$${userBalance}`}
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

                      <NavItemBtn>
                        <NavBtnLink>
                          <OutlineButton type="primary" onClick={handleLogout}>
                            Logout
                          </OutlineButton>
                        </NavBtnLink>
                      </NavItemBtn>
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
                        <p onClick={showModal}>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {/* ₦{userBalance.toLocaleString()} */}
                            {userCurrency === "usd"
                              ? `$${userBalance}`
                              : formatToNaira(userBalance)}
                          </span>
                        </p>
                        <Modal
                          title="User Wallet"
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          width={300}
                        >
                          <Title level={5}> Wallet Balance:</Title>
                          <Title level={3} style={{ color: "#0DC939" }}>
                            {userCurrency === "ngn"
                              ? formatToNaira(userBalance)
                              : `$${userBalance}`}
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
