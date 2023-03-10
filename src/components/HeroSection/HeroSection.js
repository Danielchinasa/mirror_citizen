import React from "react";
import {HeroSec, HeroRow, HeroColumn, TextWrapper, Heading, Subtitle, ImgWrapper, Img} from "./HeroSection.elements";
import {Container, Button} from "../../globalStyles";
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
                                    <Button big fontBig primary={primary}>
                                        {buttonLabel}
                                    </Button>
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
