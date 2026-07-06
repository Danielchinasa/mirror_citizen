import styled from "styled-components";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════
   Hero
   ══════════════════════════════════════════ */

export const HeroWrapper = styled.section`
  position: relative;
  min-height: 580px;
  display: flex;
  align-items: center;
  background: var(--ec-hero-gradient);
  padding: 60px 0;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: var(--ec-hero-overlay);
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
      background: var(--ec-hero-overlay-mobile);
    }
  }

  @media screen and (max-width: 600px) {
    padding: 36px 0 32px;
  }
`;

export const HeroStrip = styled.div`
  width: 100%;
  height: 18px;
  background: linear-gradient(
    180deg,
    #0c0d0c 0%,
    #0c0d0c 33.33%,
    #fa181f 33.33%,
    #fa181f 66.66%,
    #005900 66.66%,
    #005900 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    height: 12px;
  }
`;

export const HeroBgImage = styled.img`
  position: absolute;
  right: 0;
  top: 65%;
  transform: translateY(-50%);
  height: 100%;
  max-height: 530px;
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
  background: #fdecec;
  color: #d80111;
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
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--ec-heading);
  margin-bottom: 24px;

  span {
    color: #d80111;
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
  line-height: 1.6;
  margin-bottom: 12px;
  max-width: 440px;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 24px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const PrimaryBtn = styled(Link)`
  background-color: #d80111;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 10px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(216, 1, 17, 0.24);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    background-color: #ee1020;
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
  color: var(--ec-text);
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 10px;
  border: 1px solid var(--ec-border);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    border-color: #d80111;
    color: #d80111;
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

export const TrustIndicators = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TrustIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fdecec;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d80111;
  font-size: 14px;
  flex-shrink: 0;
`;

export const TrustLabel = styled.div``;

export const TrustTitle = styled.span`
  display: block;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: var(--ec-text);
`;

export const TrustDesc = styled.span`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: var(--ec-text-faint);
`;

export const SocialProof = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);

  @media screen and (max-width: 960px) {
    justify-content: center;
  }
`;

export const AvatarStack = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: -8px;
    object-fit: cover;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Stars = styled.span`
  color: #f5a623;
  font-size: 14px;
  letter-spacing: 2px;
`;

/* ══════════════════════════════════════════
   How It Works
   ══════════════════════════════════════════ */

export const HowSection = styled.section`
  padding: 60px 50px;
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const SectionHeading = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--ec-text);
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

export const SectionSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-muted);
  margin-bottom: 48px;
`;

export const StepsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

export const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 260px;
  text-align: center;
  padding: 0 16px;
`;

export const StepTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 18px;
`;

export const StepNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #d80111;
  margin-right: 8px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 6px;
`;

export const StepIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ec-error-bg);
  border: 1px solid rgba(220, 5, 2, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d80111;
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(220, 5, 2, 0.08);
`;

export const StepName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--ec-text);
  margin: 0 0 6px;
`;

export const StepDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  line-height: 1.5;
  margin: 0;
`;

export const StepArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 96px;
  margin-top: 34px;
  color: #d80111;
  font-size: 18px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 2px dashed #d1d5db;
  }

  svg {
    flex-shrink: 0;
    margin: 0 2px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* ══════════════════════════════════════════
   Service Cards
   ══════════════════════════════════════════ */

export const ServicesSection = styled.section`
  padding: 60px 50px;
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-content: center;
  gap: 20px;
  margin-bottom: 32px;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto 32px;
  }
`;

export const ServiceCard = styled.div`
  border: 1.5px solid ${({ $popular }) => ($popular ? "#D80111" : "#e5e7eb")};
  border-radius: 14px;
  padding: 24px 20px;
  text-align: center;
  position: relative;
  transition:
    border-color 0.25s ease,
    box-shadow 0.3s ease;
  cursor: default;

  &:hover {
    border-color: #D80111;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
`;

export const PopularBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #d80111;
  color: #fff;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 12px;
  white-space: nowrap;
`;

export const ServiceIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--ec-error-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d80111;
  font-size: 24px;
  margin: 0 auto 16px;
`;

export const ServiceName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--ec-text);
  margin: 0 0 6px;
`;

export const ServiceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  line-height: 1.5;
  margin: 0 0 16px;
`;

export const ServicePrice = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--ec-text);
  margin-bottom: 16px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  text-align: left;
`;

export const FeatureItem = styled.li`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #d80111;
    font-size: 12px;
    flex-shrink: 0;
  }
`;

export const ServiceBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  background: ${({ $popular }) => ($popular ? "#D80111" : "#fff")};
  color: ${({ $popular }) => ($popular ? "#fff" : "#333")};
  border: 1.5px solid ${({ $popular }) => ($popular ? "#D80111" : "#e5e7eb")};

  &:hover {
    background: ${({ $popular }) => ($popular ? "#ee1020" : "#f9fafb")};
    color: ${({ $popular }) => ($popular ? "#fff" : "#D80111")};
    border-color: #d80111;
  }
`;

export const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #d80111;
  text-decoration: none;
  margin-top: 12px;

  &:hover {
    color: #d80111;
  }
`;

export const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #d80111;
  text-decoration: none;

  &:hover {
    color: #d80111;
  }
`;

/* ══════════════════════════════════════════
   Compliance Bar
   ══════════════════════════════════════════ */

export const ComplianceSection = styled.section`
  padding: 24px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const ComplianceInner = styled.div`
  background: var(--ec-bg-secondary);
  border: 1px solid var(--ec-border);
  border-radius: 14px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px 20px;
    gap: 20px;
  }
`;

export const ComplianceText = styled.div``;

export const ComplianceTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;
`;

export const ComplianceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0;
`;

export const ComplianceLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const ComplianceBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  min-height: 48px;

  img {
    max-height: 36px;
    width: auto;
    object-fit: contain;
  }
`;

/* ══════════════════════════════════════════
   CTA Banner
   ══════════════════════════════════════════ */

export const CtaSection = styled.section`
  padding: 24px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const CtaInner = styled.div`
  background: var(--ec-error-bg);
  border-radius: 14px;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 28px 24px;
  }
`;

export const CtaShield = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #eec3c3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 26px;
    color: #d80111;
  }
`;

export const CtaContent = styled.div`
  flex: 1;
`;

export const CtaTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;
`;

export const CtaDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary);
  margin: 0;
`;

export const CtaButton = styled(Link)`
  background: #d80111;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 36px;
  border-radius: 10px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  white-space: nowrap;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  &:hover {
    background: #ee1020;
    color: #fff;
  }
`;
