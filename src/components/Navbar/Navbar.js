import React, { useState, useEffect } from "react";
import {
  Nav,
  NavbarContainer,
  HamburgerIcon,
  NavMenu,
  NavItemBtn,
  NavBtnLink,
  PublicNav,
  PublicNavInner,
  PublicBrand,
  PublicCenter,
  CountryPill,
  PublicNavGroup,
  PublicTrigger,
  PublicNavLink,
  PublicAnchor,
  PublicLanguage,
  PublicActions,
  PublicHeaderLanguage,
  PublicLogin,
  PublicCta,
  PublicHamburger,
  PublicMobilePanel,
  PublicMobileMenu,
  PublicLanguageToggleGroup,
  PublicLanguageToggle,
  PublicMobileLink,
  PublicMobileAnchor,
  PublicDesktopOnly,
} from "./Navbar.elements";
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MainButton, OutlineButton } from "../../globalStyles";

import Logo from "../../images/kenya_logo.png";
import LogoWhite from "../../images/kenya_dark.png";
import defaultDp from "../../images/defaultDp.png";
import defaultDpDark from "../../images/defaultDpDark.png";
import { Link } from "react-router-dom";
import { Button, Flex, Modal, Radio, Spin } from "antd";
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
import { trackPurchaseConversion } from "../../hooks/analytics";
import { absoluteAppUrl, withBasePath } from "../../routing";

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
        <Link to="/profile" style={{ textDecoration: "none" }}>
          My Profile
        </Link>
      ),
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];
  const [visible, setVisible] = useState(false);
  const [mobileLanguage, setMobileLanguage] = useState(() => {
    if (typeof window === "undefined") return "SW";
    return window.localStorage.getItem("siteLanguage") || "SW";
  });

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleLanguageChange = (language) => {
    setMobileLanguage(language);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("siteLanguage", language);
      document.documentElement.lang = language === "SW" ? "sw" : "en";
      window.dispatchEvent(new Event("siteLanguageChanged"));
    }
  };

  const isSw = mobileLanguage === "SW";

  const menu = (
    <Menu>
      <Menu.SubMenu
        key="language"
        title={mobileLanguage === "SW" ? "Language" : "Language"}
      >
        <Menu.Item
          key="lang-en"
          onClick={() => {
            handleLanguageChange("EN");
            closeMobileMenu();
          }}
        >
          EN
        </Menu.Item>
        <Menu.Item
          key="lang-sw"
          onClick={() => {
            handleLanguageChange("SW");
            closeMobileMenu();
          }}
        >
          SW
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="country"
        title={
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span role="img" aria-label="flag">
              🇰🇪
            </span>
            Kenya
          </span>
        }
      >
        <Menu.Item key="country-Nigeria">
          <a
            href="https://e-citizen.ng"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <span
              role="img"
              aria-label="Nigeria flag"
              style={{ marginRight: 10 }}
            >
              🇳🇬
            </span>
            Nigeria
          </a>
        </Menu.Item>
        <Menu.Item key="country-ghana">
          <a
            href="https://e-citizen.africa/gh"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <span
              role="img"
              aria-label="Ghana flag"
              style={{ marginRight: 10 }}
            >
              🇬🇭
            </span>
            Ghana
          </a>
        </Menu.Item>
        <Menu.Item key="country-uganda">
          <a
            href="https://e-raia.com/ug"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <span
              role="img"
              aria-label="Uganda flag"
              style={{ marginRight: 10 }}
            >
              🇺🇬
            </span>
            Uganda
          </a>
        </Menu.Item>
        <Menu.Item key="country-civ">
          <a
            href="https://citoyen.africa/ci"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <span
              role="img"
              aria-label="Côte d'Ivoire flag"
              style={{ marginRight: 10 }}
            >
              🇨🇮
            </span>
            Côte d'Ivoire
          </a>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Divider />
      <Menu.Item key="theme">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ThemeToggle />
        </div>
      </Menu.Item>
      <Menu.Divider />
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
        key={mobileLanguage}
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

  const servicesMenu = (
    <Menu>
      <Menu.Item key="services-nin">
        <Link to="/#services" style={{ textDecoration: "none" }}>
          {isSw ? "Kitambulisho cha Taifa" : "National ID"}
        </Link>
      </Menu.Item>
      <Menu.Item key="services-alien-card">
        <Link to="/#services" style={{ textDecoration: "none" }}>
          {isSw ? "Uthibitishaji wa Alien Card" : "Alien Card Verification"}
        </Link>
      </Menu.Item>
      <Menu.Item key="services-vin">
        <Link to="/#services" style={{ textDecoration: "none" }}>
          {isSw ? "Uthibitishaji wa VIN" : "VIN Verification"}
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // Dispatch fetchUserProfile action when component mounts and token is available
    if (!userToken2) return;
    dispatch(fetchUserProfile(userToken2));
  }, [dispatch, userToken2]);

  const countryMenu = (
    <Menu>
      <Menu.Item key="country-Nigeria">
        <a
          href="https://e-citizen.ng"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span
            role="img"
            aria-label="Nigeria flag"
            style={{ marginRight: 10 }}
          >
            🇳🇬
          </span>
          Nigeria
        </a>
      </Menu.Item>
      <Menu.Item key="country-ghana">
        <a
          href="https://e-citizen.africa/gh"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span role="img" aria-label="Ghana flag" style={{ marginRight: 10 }}>
            🇬🇭
          </span>
          Ghana
        </a>
      </Menu.Item>

      <Menu.Item key="country-uganda">
        <a
          href="https://e-raia.com/ug"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span role="img" aria-label="Uganda flag" style={{ marginRight: 10 }}>
            🇺🇬
          </span>
          Uganda
        </a>
      </Menu.Item>
      <Menu.Item key="country-civ">
        <a
          href="https://citoyen.africa/ci"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span
            role="img"
            aria-label="Côte d'Ivoire flag"
            style={{ marginRight: 10 }}
          >
            🇨🇮
          </span>
          Côte d'Ivoire
        </a>
      </Menu.Item>
    </Menu>
  );

  const userBalance = userDetails?.walletBalance || 0;
  const formatToKES = (value) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
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
  const [openPaystackModal, setOpenPaystackModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [paystackReference, setPaystackReference] = useState("");
  const [walletPaymentMethod, setWalletPaymentMethod] = useState(1);
  const [paystackLoading, setPaystackLoading] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);

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
          // Track conversion
          trackPurchaseConversion({
            value: parseFloat(transactionAmount) || 1.0,
            currency: userCurrency || "NGN",
            transactionId: transactionRef,
          });
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

  const handlePaystackModalClose = async () => {
    setOpenPaystackModal(false);

    try {
      const response = await fetch(
        `${baseUrl}/payment/check-pulse?transactionRef=${paystackReference}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken2}`,
          },
        },
      );

      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        Swal.fire({
          background: bgContainer,
          color: text,
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
          confirmButtonColor: "#DD0201",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        return;
      }
      if (response.ok) {
        const responseData = await response.json();
        if (
          responseData.data.status === "successful" ||
          responseData.status === "success"
        ) {
          if (
            responseData.data &&
            (responseData.data.status === "success" ||
              responseData.data.status === "successful")
          ) {
            // Payment successful - track conversion and refresh profile
            trackPurchaseConversion({
              value: parseFloat(transactionAmount) || 1.0,
              currency: userCurrency || "NGN",
              transactionId: paystackReference,
            });
            dispatch(fetchUserProfile(userToken2));
          } else {
            Swal.fire({
              background: bgContainer,
              color: text,
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
              confirmButtonColor: "#DD0201",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "There was an issue making payment",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#DD0201",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      return;
    }
  };

  // Auto-close FlutterWave modal when payment reaches a terminal state
  useEffect(() => {
    if (!modal1Open || !transactionRef) return;
    const TERMINAL = [
      "successful",
      "success",
      "failed",
      "abandoned",
      "cancelled",
      "error",
      "reversed",
    ];
    let handled = false;
    const intervalId = setInterval(async () => {
      if (handled) return;
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
          const data = await response.json();
          const status = (data?.data?.status || "").toLowerCase();
          if (TERMINAL.includes(status) || data?.status === "success") {
            handled = true;
            handleModalOk();
          }
        } else {
          handled = true;
          handleModalOk();
        }
      } catch (e) {
        // Network error – keep polling
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, [modal1Open, transactionRef]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-close Paystack modal when payment reaches a terminal state
  useEffect(() => {
    if (!openPaystackModal || !paystackReference) return;
    const TERMINAL = [
      "successful",
      "success",
      "failed",
      "abandoned",
      "cancelled",
      "error",
      "reversed",
    ];
    let handled = false;
    const intervalId = setInterval(async () => {
      if (handled) return;
      try {
        const response = await fetch(
          `${baseUrl}/payment/check-pulse?transactionRef=${paystackReference}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken2}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          const status = (data?.data?.status || "").toLowerCase();
          if (TERMINAL.includes(status) || data?.status === "success") {
            handled = true;
            handlePaystackModalClose();
          }
        } else {
          handled = true;
          handlePaystackModalClose();
        }
      } catch (e) {
        // Network error – keep polling
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, [openPaystackModal, paystackReference]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOk = async () => {
    const minAmount = userCurrency.toUpperCase() === "NGN" ? 1000 : 10;

    // Validate minimum amount
    if (!amount || parseFloat(amount) < minAmount) {
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: `Minimum top-up amount is ${
          userCurrency.toUpperCase() === "NGN" ? "KHs1,000" : "$10"
        }`,
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#DD0201",
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
        setTransactionAmount(amount); // Store amount for conversion tracking
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
              confirmButtonColor: "#DD0201",
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
            confirmButtonColor: "#DD0201",
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
          return_url: absoluteAppUrl("/payment/success"),
          cancel_url: absoluteAppUrl("/payment/failure"),
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
            confirmButtonColor: "#DD0201",
          });
        }
      } else if (walletPaymentMethod === 3) {
        // Paystack payment
        const postData = {
          amount: amount,
          currency: userCurrency.toUpperCase() === "NGN" ? "NGN" : "USD",
          type: "TOPUP",
          sessionCode: null,
          stakeHolders: null,
        };
        setTransactionAmount(amount); // Store amount for conversion tracking
        setAmount("");
        setPaystackLoading(true);

        try {
          const responseData = await initiatePaystackPayment(
            postData,
            userToken2,
          );
          console.log("Paystack Response Data:", responseData);
          if (responseData.status && responseData.data) {
            // Open Paystack payment page in modal
            setPaymentUrl(responseData.data.authorization_url);
            setPaystackReference(responseData.data.reference);
            setOpenPaystackModal(true);
            setPaystackLoading(false);
          } else {
            console.error("Paystack response invalid");
            setPaystackLoading(false);
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
              confirmButtonColor: "#DD0201",
            });
          }
        } catch (error) {
          console.error("Paystack error:", error);
          setPaystackLoading(false);
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
            confirmButtonColor: "#DD0201",
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
        confirmButtonColor: "#DD0201",
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

  if (!isAuthenticated) {
    return (
      <>
        <PublicNav>
          <PublicNavInner>
            <Link to="/">
              <img
                src={isDark ? LogoWhite : Logo}
                alt="Logo"
                width={120}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Link>

            <PublicCenter>
              <Dropdown overlay={servicesMenu} trigger={["click"]} arrow>
                <PublicTrigger type="button">
                  {isSw ? "Huduma" : "Services"}{" "}
                  <DownOutlined className="chev" />
                </PublicTrigger>
              </Dropdown>

              <PublicAnchor href={withBasePath("/#how-it-works")}>
                {isSw ? "Inavyofanya kazi" : "How it works"}
              </PublicAnchor>
              <PublicAnchor href={withBasePath("/#services")}>
                {isSw ? "Bei" : "Pricing"}
              </PublicAnchor>
              <PublicNavLink to="/faq-kenya">FAQ</PublicNavLink>
              <PublicNavLink to="/contact">
                {isSw ? "Msaada" : "Support"}
              </PublicNavLink>
            </PublicCenter>

            <PublicActions>
              <Dropdown overlay={countryMenu} trigger={["click"]} arrow>
                <CountryPill type="button" aria-label="Select country">
                  <span className="flag" role="img" aria-label="Kenya flag">
                    🇰🇪
                  </span>
                  Kenya
                  <DownOutlined className="chev" />
                </CountryPill>
              </Dropdown>
              <PublicHeaderLanguage>
                <PublicLanguageToggleGroup>
                  <PublicLanguageToggle
                    type="button"
                    $active={mobileLanguage === "SW"}
                    onClick={() => handleLanguageChange("SW")}
                    aria-pressed={mobileLanguage === "SW"}
                  >
                    SW
                  </PublicLanguageToggle>
                  <PublicLanguageToggle
                    type="button"
                    $active={mobileLanguage === "EN"}
                    onClick={() => handleLanguageChange("EN")}
                    aria-pressed={mobileLanguage === "EN"}
                  >
                    EN
                  </PublicLanguageToggle>
                </PublicLanguageToggleGroup>
              </PublicHeaderLanguage>
              <PublicLanguage>
                <PublicLanguageToggleGroup>
                  <PublicLanguageToggle
                    type="button"
                    $active={mobileLanguage === "EN"}
                    onClick={() => handleLanguageChange("EN")}
                    aria-pressed={mobileLanguage === "EN"}
                  >
                    EN
                  </PublicLanguageToggle>
                  <PublicLanguageToggle
                    type="button"
                    $active={mobileLanguage === "SW"}
                    onClick={() => handleLanguageChange("SW")}
                    aria-pressed={mobileLanguage === "SW"}
                  >
                    SW
                  </PublicLanguageToggle>
                </PublicLanguageToggleGroup>
              </PublicLanguage>
              <PublicDesktopOnly>
                <ThemeToggle />
              </PublicDesktopOnly>
              <PublicCta href={withBasePath("/#services")}>
                {isSw ? "Anza" : "Get Started"}
              </PublicCta>
              <PublicHamburger onClick={handleClick} aria-label="Open menu">
                {click ? <FaTimes /> : <FaBars />}
              </PublicHamburger>
            </PublicActions>
          </PublicNavInner>

          <PublicMobilePanel $open={click}>
            <PublicMobileMenu>
              {/* <PublicMobileLink
                to="/nin-verification"
                onClick={closeMobileMenu}
              >
                {isSw ? "Kitambulisho cha Taifa" : "National ID"}
              </PublicMobileLink>
              <PublicMobileLink
                to="/vehicle-verification"
                onClick={closeMobileMenu}
              >
                {isSw ? "Uthibitishaji wa VIN" : "VIN Verification"}
              </PublicMobileLink> */}
              <PublicMobileAnchor
                href={withBasePath("/#how-it-works")}
                onClick={closeMobileMenu}
              >
                {isSw ? "Inavyofanya kazi" : "How it works"}
              </PublicMobileAnchor>
              <PublicMobileLink to="/faq-kenya" onClick={closeMobileMenu}>
                FAQ
              </PublicMobileLink>
              <PublicMobileLink to="/contact" onClick={closeMobileMenu}>
                {isSw ? "Msaada" : "Support"}
              </PublicMobileLink>
              <PublicMobileAnchor
                href={withBasePath("/#services")}
                onClick={closeMobileMenu}
              >
                {isSw ? "Anza" : "Get Started"}
              </PublicMobileAnchor>
              {/* <div style={{ padding: "6px 0" }}>
                <Dropdown overlay={countryMenu} trigger={["click"]}>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#fff",
                      fontFamily: "Poppins",
                      width: "100%",
                      marginBottom: 8,
                    }}
                  >
                    <span role="img" aria-label="flag">
                      🇰🇪
                    </span>
                    Kenya
                  </button>
                </Dropdown>
              </div> */}
              <div style={{ padding: "6px 0" }}>
                <ThemeToggle />
              </div>
            </PublicMobileMenu>
          </PublicMobilePanel>
        </PublicNav>
      </>
    );
  }

  return (
    <>
      <Spin
        spinning={paystackLoading}
        size="large"
        tip="Loading Paystack payment..."
        fullscreen
      />
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav $token={token}>
          <NavbarContainer>
            {/* <PublicBrand to="/">
              <span className="brand-red">e</span>
              <span className="brand-dot">-</span>
              raia<span className="brand-dot">.com</span>
            </PublicBrand> */}
            <Link to="/">
              <img
                src={isDark ? LogoWhite : Logo}
                alt="Logo"
                width={100}
                style={{ marginTop: "25px", cursor: "pointer" }}
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
                        View Dashboard
                      </OutlineButton>
                    </NavBtnLink>
                  </NavItemBtn>
                  <NavItemBtn>
                    <NavBtnLink to="/">
                      <MainButton
                        type="primary"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "700",
                        }}
                      >
                        Verify Now
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
                          <MainButton type="primary">My Profile</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <NavItemBtn>
                        <NavBtnLink to="/contact">
                          <MainButton type="primary">Contact Us</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <NavItemBtn>
                        <NavBtnLink to="/faq-kenya">
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
                        <p
                          onClick={showModal}
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          Wallet Balance:
                          <span style={{ color: "#DD0201" }}>
                            {" "}
                            {userCurrency === "USD" || userCurrency === "usd"
                              ? `${formatToDollar(userBalance)}`
                              : formatToKES(userBalance)}
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
                          <Title level={3} style={{ color: "#DD0201" }}>
                            {userCurrency.toUpperCase() === "USD"
                              ? `${formatToDollar(userBalance)}`
                              : formatToKES(userBalance)}
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
                            <Radio
                              value={3}
                              disabled={userCurrency.toUpperCase() === "USD"}
                              style={{
                                display: "block",
                                border: "1px solid #e8e8e8",
                                borderRadius: "5px",
                                padding: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Paystack{" "}
                              {userCurrency.toUpperCase() === "USD" &&
                                "(Not available for USD)"}
                            </Radio>
                          </Radio.Group>
                          <p>
                            Enter Amount to Fund Wallet (Minimum:{" "}
                            {userCurrency.toUpperCase() === "NGN"
                              ? "KHs1,000"
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
                                  ? "KHs1,000"
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
                        <Modal
                          style={{
                            top: 20,
                          }}
                          width={1000}
                          open={openPaystackModal}
                          onOk={handlePaystackModalClose}
                          onCancel={handlePaystackModalClose}
                          maskClosable={false}
                          footer={[
                            <Button
                              style={{ color: text }}
                              type="dashed"
                              onClick={handlePaystackModalClose}
                            >
                              Close
                            </Button>,
                          ]}
                        >
                          <iframe
                            id="paystackPaymentFrame"
                            title="Paystack Payment"
                            width="100%"
                            height="600"
                            src={paymentUrl}
                          ></iframe>
                        </Modal>
                      </div>

                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "12px",
                        }}
                      >
                        <Dropdown overlay={countryMenu} trigger={["click"]}>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              border: "1px solid rgba(255,255,255,0.3)",
                              borderRadius: "6px",
                              padding: "4px 10px",
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 13,
                              color: "rgba(255,255,255,0.85)",
                              fontFamily: "Poppins",
                            }}
                          >
                            <span role="img" aria-label="flag">
                              🇰🇪
                            </span>
                          </button>
                        </Dropdown>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: 4,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.1)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleLanguageChange("EN")}
                            style={{
                              border: "none",
                              background:
                                mobileLanguage === "EN"
                                  ? "#DD0201"
                                  : "transparent",
                              color:
                                mobileLanguage === "EN"
                                  ? "#fff"
                                  : "rgba(255,255,255,0.7)",
                              fontFamily: "Nunito, sans-serif",
                              fontSize: 13,
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                              padding: "8px 14px",
                              borderRadius: 999,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            EN
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLanguageChange("SW")}
                            style={{
                              border: "none",
                              background:
                                mobileLanguage === "SW"
                                  ? "#DD0201"
                                  : "transparent",
                              color:
                                mobileLanguage === "SW"
                                  ? "#fff"
                                  : "rgba(255,255,255,0.7)",
                              fontFamily: "Nunito, sans-serif",
                              fontSize: 13,
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                              padding: "8px 14px",
                              borderRadius: 999,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            SW
                          </button>
                        </div>
                        <ThemeToggle />
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
                    </>
                  )
                : isAuthenticated && (
                    <>
                      {/* <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <PublicLanguageToggleGroup>
                          <PublicLanguageToggle
                            type="button"
                            $active={mobileLanguage === "EN"}
                            onClick={() => handleLanguageChange("EN")}
                            aria-pressed={mobileLanguage === "EN"}
                          >
                            EN
                          </PublicLanguageToggle>
                          <PublicLanguageToggle
                            type="button"
                            $active={mobileLanguage === "SW"}
                            onClick={() => handleLanguageChange("SW")}
                            aria-pressed={mobileLanguage === "SW"}
                          >
                            SW
                          </PublicLanguageToggle>
                        </PublicLanguageToggleGroup>
                        <ThemeToggle />
                      </div> */}
                      <div
                        style={{
                          marginTop: "20px",
                          textAlign: "end",
                          paddingLeft: "35px",
                          paddingRight: "15px",
                          marginLeft: "auto",
                        }}
                      >
                        <Title level={4}>
                          {userDetails?.firstName} {userDetails?.lastName}
                        </Title>
                        <p onClick={showModal} style={{ color: text }}>
                          Wallet Balance:
                          <span style={{ color: "#DD0201" }}>
                            {" "}
                            {/* KHs{userBalance.toLocaleString()} */}
                            {userCurrency === "USD" || userCurrency === "usd"
                              ? `${formatToDollar(userBalance)}`
                              : formatToKES(userBalance)}
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
                          <Title level={3} style={{ color: "#DD0201" }}>
                            {userCurrency.toUpperCase() === "USD"
                              ? `${formatToDollar(userBalance)}`
                              : formatToKES(userBalance)}
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
                            <Radio
                              value={3}
                              disabled={userCurrency.toUpperCase() === "USD"}
                              style={{
                                display: "block",
                                border: "1px solid #e8e8e8",
                                borderRadius: "5px",
                                padding: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Paystack{" "}
                              {userCurrency.toUpperCase() === "USD" &&
                                "(Not available for USD)"}
                            </Radio>
                          </Radio.Group>
                          <p>
                            Enter Amount to Fund Wallet (Minimum:{" "}
                            {userCurrency.toUpperCase() === "NGN"
                              ? "KHs1,000"
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
                                  ? "KHs1,000"
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
                        <Modal
                          style={{
                            top: 20,
                          }}
                          width={1000}
                          open={openPaystackModal}
                          onOk={handlePaystackModalClose}
                          onCancel={handlePaystackModalClose}
                          maskClosable={false}
                          footer={[
                            <Button
                              danger
                              type="dashed"
                              onClick={handlePaystackModalClose}
                            >
                              Close
                            </Button>,
                          ]}
                        >
                          <iframe
                            id="paystackPaymentFrame"
                            title="Paystack Payment"
                            width="100%"
                            height="600"
                            src={paymentUrl}
                          ></iframe>
                        </Modal>
                      </div>
                      <UserDropdown />
                      <div style={{ marginLeft: "16px" }}></div>
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
