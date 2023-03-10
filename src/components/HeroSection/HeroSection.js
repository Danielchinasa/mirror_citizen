import React from "react";
import {HeroSec, HeroRow, HeroColumn, TextWrapper, Heading, Subtitle, ImgWrapper, Img} from "./HeroSection.elements";
import {Container, MainButton} from "../../globalStyles";
import {Link} from "react-router-dom";

const HeroSection = ({
    primary,
    lightBg,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
    start,
}) => {
    return (
        <>
            <HeroSec lightBg={lightBg}>
                <Container>
                    <HeroRow imgStart={imgStart}>
                        <HeroColumn>
                            <TextWrapper>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Link to="/sign-up">
                                    <MainButton big fontBig primary={primary}>
                                        {buttonLabel}
                                    </MainButton>
                                </Link>
                                <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
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
