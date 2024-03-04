import React from "react";
import {
  HeroSec,
  HeroRow,
  HeroColumn,
  TextWrapper,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "./HeroSection.elements";
import { Container, MainButton } from "../../globalStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HeroSection = ({
  lightBg,
  lightText,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
}) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
    <>
      <HeroSec lightBg={lightBg}>
        <Container>
          <HeroRow imgStart={imgStart}>
            <HeroColumn>
              <TextWrapper>
                <Heading
                  lightText={lightText}
                  style={{ fontFamily: "Poppins", fontWeight: "700" }}
                >
                  {/* {headline} */}
                  Your{" "}
                  <span
                    style={{
                      color: "#09C93A",
                      fontFamily: "Poppins",
                      fontWeight: "700",
                    }}
                  >
                    one-stop shop
                  </span>{" "}
                  for identity verification
                </Heading>
                <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                  <MainButton
                    big
                    fontBig
                    type="primary"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "700",
                    }}
                  >
                    {buttonLabel}
                  </MainButton>
                </Link>
                {/* <Subtitle color="primary">{description}</Subtitle> */}
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
