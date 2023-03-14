import React from "react";
import {
    FooterContainer,
    FooterLinkItems,
    FooterLogoArea,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    WebsiteRights,
} from "./Footer.elements";

import logo from "../../images/logo.svg";

function Footer() {
    const date = new Date();

    return (
        <>
            <div style={{backgroundColor: "#354138"}}>
                <div class="container text-center">
                    <div class="row" style={{borderBottom: "1px solid #fff"}}>
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <FooterLogoArea src={logo} style={{width: 120}}></FooterLogoArea>
                        </div>
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <FooterLinkItems>
                                <FooterLink to="/">Privacy policy</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="/">FQAs</FooterLink>
                            </FooterLinkItems>
                        </div>
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <FooterLinkItems>
                                <FooterLink to="/">Contact</FooterLink>
                            </FooterLinkItems>
                        </div>
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <FooterLinkItems>
                                <FooterLink to="/">+234(0) 818-437-2194</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="/">info@e-citizen.ng</FooterLink>
                            </FooterLinkItems>
                        </div>
                    </div>
                </div>
            </div>

            <FooterContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <WebsiteRights>E-citizen © Biosec {date.getFullYear()}, All Rights Reserved. </WebsiteRights>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterContainer>
        </>
    );
}

export default Footer;
