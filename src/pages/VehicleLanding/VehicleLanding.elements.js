import styled from "styled-components";
import { Link } from "react-router-dom";

/* ─── Shared ─── */

export const PageWrapper = styled.div`
  background: var(--ec-bg);
`;

export const PrimaryBtn = styled(Link)`
  background-color: var(--ec-primary);
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
    background-color: var(--ec-primary);
    color: #fff;
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
  color: var(--ec-primary);
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 12px 36px;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 10px 28px;
  }
  border: 1px solid var(--ec-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    color: var(--ec-primary);
    border-color: var(--ec-primary);
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
  background: var(--ec-hero-gradient);
  padding: 60px 0;
  overflow: hidden;

  &::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 60%;\n    height: 100%;\n    background: var(--ec-hero-overlay);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 30%;\n    background: var(--ec-hero-bottom-gradient);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  @media screen and (max-width: 960px) {\n    min-height: auto;\n    flex-direction: column;\n    align-items: center;\n    padding: 48px 0 40px;\n\n    &::after {\n      width: 100%;\n      height: 100%;\n      top: 0;\n      bottom: auto;\n      background: var(--ec-hero-overlay-mobile);\n    }\n  }

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
  z-index: 0;

  @media screen and (max-width: 960px) {
    position: relative;
    order: 2;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    transform: none;
    width: min(82vw, 520px);
    height: auto;
    max-height: 320px;
    margin: 28px auto 0;
    z-index: 2;
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
    order: 1;
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
  background: var(--ec-primary-bg);
  color: var(--ec-primary);
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
  color: var(--ec-heading);
  margin-bottom: 24px;

  span {
    color: var(--ec-primary);
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
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
  color: var(--ec-text-secondary);
  line-height: 24px;
  margin-bottom: 35px;
  max-width: 440px;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 25px;
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
    width: 100%;
  }
`;

export const PriceBadgesRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

export const PriceBadge = styled.div`
  display: inline-block;
  background: var(--ec-primary-bg);
  color: var(--ec-text);
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  max-width: 100%;
  text-align: center;

  span {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: var(--ec-primary);
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
  background: ${(props) => props.bg || "#dcfce7"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ec-primary);
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
  color: var(--ec-text);
`;

export const TrustDesc = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
`;
