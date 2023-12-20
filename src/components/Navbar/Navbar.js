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

import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
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
  const user = useSelector((state) => state.user);
  const userFirstName = user?.user?.firstName || "";
  const userLastName = user?.user?.lastName || "";
  const userBal = user?.user?.walletBalance;

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
      label: "Profile",
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>LogOut</span>,
    },
  ];

  const UserDropdown = () => {
    return (
      <Dropdown
        menu={{
          items,
        }}
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
            src="https://placekitten.com/40/40" // Replace with your circular image URL
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

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav>
          <NavbarContainer>
            <Link to="/">
              <Logo style={{ marginTop: "10px" }} />
            </Link>
            <HamburgerIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </HamburgerIcon>

            <NavMenu onClick={handleClick} click={click}>
              {isAuthenticated && (
                <NavItemBtn>
                  <NavBtnLink to="/dashboard">
                    <MainButton type="primary">
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
                        <OutlineButton type="primary">LOGIN</OutlineButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/login">
                        <OutlineButton
                          onClick={closeMobileMenu}
                          fontBig
                          primary
                        >
                          LOGIN
                        </OutlineButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to="/sign-up">
                        <MainButton type="primary">SIGN UP</MainButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/sign-up">
                        <MainButton onClick={closeMobileMenu} fontBig primary>
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
                        <NavBtnLink to="/main-dashboard">
                          <MainButton type="primary">Profile</MainButton>
                        </NavBtnLink>
                      </NavItemBtn>
                      <NavItemBtn>
                        <NavBtnLink>
                          <OutlineButton type="primary" onClick={handleLogout}>
                            LogOut
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
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                      >
                        <Title level={4}>
                          {userFirstName} {userLastName}
                        </Title>
                        <p>
                          Bal:
                          <span style={{ color: "#0DC939" }}>
                            ₦{userBal.toLocaleString()}
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
