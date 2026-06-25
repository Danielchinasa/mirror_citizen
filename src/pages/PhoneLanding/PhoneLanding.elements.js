import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

/* ─── Animations ─── */

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeSlideRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const floatUp = keyframes`
  0%, 100% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(calc(-50% - 12px));
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0px 8px 24px rgba(220, 5, 2, 0.4);
  }
`;

/* ─── Shared ─── */

export const PageWrapper = styled.div`
  background: #fff;
`;

export const PrimaryBtn = styled(Link)`
  background-color: #DD0201;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 12px 36px;
  border-radius: 10px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;
  animation: ${pulseGlow} 2.5s ease-in-out infinite 1.5s;

  &:hover {
    background-color: #FF4D4F;
    color: #fff;
    animation: none;
    box-shadow: 0px 8px 24px rgba(220, 5, 2, 0.5);
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }

  @media screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 12px 20px;
    white-space: normal;
    text-align: center;
  }
`;

export const SecondaryBtn = styled.a`
  background-color: transparent;
  color: #DD0201;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 12px 36px;
  border-radius: 10px;
  border: 1px solid #DD0201;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    color: #FF4D4F;
    border-color: #FF4D4F;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }

  @media screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 12px 20px;
    white-space: normal;
    text-align: center;
  }
`;

/* ─── Hero ─── */

export const HeroSectionWrapper = styled.section`
  position: relative;
  min-height: 580px;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, #fff1f1 50%, #fce8e8 100%);
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
      #fce8e8 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  @media screen and (max-width: 960px) {
    min-height: auto;
    flex-direction: column;
    align-items: center;
    padding: 48px 0 40px;

    &::after {
      width: 100%;
      height: 100%;
      top: 0;
      bottom: auto;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0.78) 46%,
        rgba(224, 239, 224, 0.72) 100%
      );
    }
  }

  @media screen and (max-width: 600px) {
    padding: 36px 0 32px;
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
  animation: ${floatUp} 4s ease-in-out infinite;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const HeroMobileImage = styled.img`
  display: none;
  width: min(82vw, 520px);
  max-width: 500px;
  max-height: 320px;
  margin: 30px auto 0;
  object-fit: contain;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 960px) {
    display: block;
  }

  @media screen and (max-width: 600px) {
    width: min(90vw, 420px);
    max-height: 260px;
    margin-top: 24px;
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

  @media screen and (max-width: 600px) {
    padding: 0 20px;
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
  background: #fdecec;
  color: #b91c1c;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
  opacity: 0;
  animation: ${fadeSlideRight} 0.6s ease-out 0.1s forwards;
`;

export const HeroTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.1;
  color: #354138;
  margin-bottom: 24px;
  opacity: 0;
  animation: ${fadeSlideUp} 0.7s ease-out 0.25s forwards;

  span {
    color: #DD0201;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    background: linear-gradient(90deg, #DD0201 0%, #FF4D4F 50%, #DD0201 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  }

  @media screen and (max-width: 960px) {
    font-size: 40px;
  }

  @media screen and (max-width: 768px) {
    font-size: 34px;
  }

  @media screen and (max-width: 480px) {
    font-size: 28px;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: #555;
  line-height: 24px;
  margin-bottom: 35px;
  max-width: 440px;
  opacity: 0;
  animation: ${fadeSlideUp} 0.7s ease-out 0.45s forwards;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 25px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${fadeSlideUp} 0.7s ease-out 0.65s forwards;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const PriceBadge = styled.div`
  display: inline-block;
  background: #fdecec;
  color: #1a1a1a;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  margin-bottom: 16px;
  opacity: 0;
  animation: ${fadeSlideUp} 0.7s ease-out 0.8s forwards;
  max-width: 100%;
  text-align: center;

  span {
    margin-right: 2px;
  }
`;

export const HeroChecks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeSlideUp} 0.7s ease-out 0.95s forwards;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const HeroCheck = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #555;

  svg {
    color: #DD0201;
    font-size: 14px;
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
  background: ${(props) => props.bg || "#fdecec"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #DD0201;
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
