import styled from "styled-components";
import { Link } from "react-router-dom";

/* ─── Shared ─── */

export const PageWrapper = styled.div`
  background: #fff;
`;

export const PrimaryBtn = styled(Link)`
  background-color: #09c93a;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 12px 36px;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    background-color: #16ef4d;
    color: #fff;
  }
`;

export const SecondaryBtn = styled.a`
  background-color: transparent;
  color: #09c93a;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 12px 36px;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }
  border: 1px solid #09c93a;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    color: #16ef4d;
    border-color: #16ef4d;
  }
`;

/* ─── Hero ─── */

export const HeroSectionWrapper = styled.section`
  position: relative;
  min-height: 580px;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, #f0f7f0 50%, #e0efe0 100%);
  padding: 60px 0;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #ffffff 35%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(
      180deg,
      rgba(224, 239, 224, 0) 0%,
      #e0efe0 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  @media screen and (max-width: 960px) {
    padding-bottom: 350px;

    &::after {
      width: 100%;
      height: 40%;
      top: auto;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(224, 239, 224, 0) 0%,
        #e0efe0 60%
      );
    }
  }
`;

export const HeroBgImage = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  max-height: 580px;
  object-fit: contain;
  pointer-events: none;

  @media screen and (max-width: 960px) {
    top: auto;
    bottom: 0;
    transform: none;
    width: 90%;
    height: auto;
    max-height: none;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const HeroContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px;
  width: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 0 30px;
  }
`;

export const HeroContent = styled.div`
  max-width: 520px;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 960px) {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroTag = styled.span`
  display: inline-block;
  background: #e6f9ed;
  color: #068a28;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.1;
  color: #354138;
  margin-bottom: 24px;

  span {
    color: #09c93a;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: #555;
  line-height: 24px;
  margin-bottom: 35px;
  max-width: 440px;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PriceBadgesRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const PriceBadge = styled.div`
  display: inline-block;
  background: #e6f9ed;
  color: #1a1a1a;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 20px;

  span {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #09c93a;
  }
`;

/* ─── Trust Bar ─── */

export const TrustBarWrapper = styled.div`
  padding: 28px 50px;

  @media screen and (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const TrustBarInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 48px;
  padding: 0 50px;

  @media screen and (max-width: 960px) {
    gap: 32px;
    padding: 0 30px;
  }

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

export const TrustIconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.bg || "#e6f9ed"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #09c93a;
  font-size: 16px;
  flex-shrink: 0;
`;

export const TrustText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TrustTitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
`;

export const TrustDesc = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
`;
