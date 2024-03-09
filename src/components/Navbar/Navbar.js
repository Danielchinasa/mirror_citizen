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
import defaultDp from "../../images/defaultDp.png";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";

const { Title } = Typography;

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const userDetails = useSelector((state) => state.userDetails);
  const userToken = userDetails?.jwtToken || "";
  // const user = useSelector((state) => state.user);
  // const userFirstName = user?.user?.firstName || "";
  // const userLastName = user?.user?.lastName || "";
  // const userBal = user?.user?.walletBalance;

  // localStorage.setItem("userBalance", JSON.stringify(userBal));
  // const storedUserBalance = localStorage.getItem("userBalance");
  // console.log("Redux State:", userBal);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    // so if the screensize is <= 960px then set button state to false
    if (window.innerwidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

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
    {
      key: "1",
      label: (
        <a href="/main-dashboard" style={{ textDecoration: "none" }}>
          Dashboard
        </a>
      ),
    },
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
  const userCurrency = userDetails?.currency || "";
  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav>
          <NavbarContainer>
            <Link to={isAuthenticated ? "/main-dashboard" : "/"}>
              {/* <Logo style={{ marginTop: "10px" }} /> */}
              <img
                src={Logo}
                alt="Logo"
                width={230}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Link>
            <HamburgerIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </HamburgerIcon>

            <NavMenu onClick={handleClick} click={click}>
              {isAuthenticated && (
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
                      <NavItemBtn>
                        <NavBtnLink to="/main-dashboard">
                          <MainButton type="primary">Dashboard</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
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
                        <p>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {/* ₦{userBalance.toLocaleString()} */}
                            {formatToNaira(userBalance)}
                          </span>
                        </p>
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
                        <p>
                          Wallet Balance:
                          <span style={{ color: "#0DC939" }}>
                            {" "}
                            {/* ₦{userBalance.toLocaleString()} */}
                            {formatToNaira(userBalance)}
                            {/* {userCurrency === "ngn"
                              ? 
                              : `$${userBalance}`} */}
                          </span>
                        </p>
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
