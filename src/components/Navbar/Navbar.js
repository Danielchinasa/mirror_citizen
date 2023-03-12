import React, {useState, useEffect} from "react";
import {Nav, NavbarContainer, HamburgerIcon, NavMenu, NavItemBtn, NavBtnLink} from "./Navbar.elements";
import {FaTimes, FaBars} from "react-icons/fa";
import {IconContext} from "react-icons/lib";
import {MainButton, OutlineButton} from "../../globalStyles";

import {ReactComponent as Logo} from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

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

    return (
        <>
            <IconContext.Provider value={{color: "#000"}}>
                <Nav>
                    <NavbarContainer>
                        <Link to="/">
                            <Logo style={{marginTop: "10px"}} />
                        </Link>
                        <HamburgerIcon onClick={handleClick}>{click ? <FaTimes /> : <FaBars />}</HamburgerIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnLink to="/login">
                                        <OutlineButton type="primary">LOGIN</OutlineButton>
                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to="/login">
                                        <OutlineButton onClick={closeMobileMenu} fontBig primary>
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
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
