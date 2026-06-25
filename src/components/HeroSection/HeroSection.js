import React from "react";
import {
  HeroSec,
  HeroRow,
  HeroColumn,
  HeroColumnSmall,
  TextWrapper,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "./HeroSection.elements";
import { Container, MainButton, Heading6 } from "../../globalStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../components/ThemeProvider";
import { theme, List, Avatar } from "antd";
import tick from "../../images/tick.png";

const { useToken } = theme;

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
  const { token } = useToken();
  const { isDark } = useTheme();
  const data = [
    {
      title: "Choose one or more profiles to verify",
    },
    {
      title: "Input the information you want to search",
    },
    {
      title: "Make a payment",
    },
    {
      title: "View results",
    },
  ];
  return (
    <>
      <HeroSec $token={token}>
        <Container>
          <HeroRow imgStart={imgStart}>
            <HeroColumn>
              <TextWrapper>
                <Heading
                  $token={token}
                  style={{ fontFamily: "Poppins", fontWeight: "700" }}
                >
                  {/* {headline} */}
                  Your{" "}
                  <span
                    style={{
                      color: "#02831C",
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
            <HeroColumnSmall>
              <>
                <Heading6 $token={token}>How to verify</Heading6>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={tick} />}
                        title={item.title}
                      />
                    </List.Item>
                  )}
                />
              </>
            </HeroColumnSmall>
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
