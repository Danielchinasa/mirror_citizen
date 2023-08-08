import React from "react";
import {HeroSec, HeroRow, HeroColumn, TextWrapper, Heading, Subtitle, ImgWrapper, Img} from "./HeroSection.elements";
import {Container, MainButton} from "../../globalStyles";
import {Link} from "react-router-dom";

const HeroSection = ({lightBg, lightText, headline, description, buttonLabel, img, alt, imgStart, start}) => {
    return (
        <>
            <HeroSec lightBg={lightBg}>
                <Container>
                    <HeroRow imgStart={imgStart}>
                        <HeroColumn>
                            <TextWrapper>
                                <Heading lightText={lightText} style={{fontFamily: "Poppins"}}>
                                    {headline}
                                    <span style={{color: "#09C93A", fontFamily: "Poppins"}}>easily</span>
                                </Heading>
                                <Link to="/login">
                                    <MainButton big fontBig type="primary">
                                        {buttonLabel}
                                    </MainButton>
                                </Link>
                                <Subtitle color="primary">{description}</Subtitle>
                            </TextWrapper>
                        </HeroColumn>
                        <HeroColumn>
                            <ImgWrapper start={start}>
                                <Img src={img} alt={alt} />
                            </ImgWrapper>
                        </HeroColumn>
                    </HeroRow>
                </Container>
            </HeroSec>
        </>
    );
};

export default HeroSection;
