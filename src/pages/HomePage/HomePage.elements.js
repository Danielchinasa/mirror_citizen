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
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  color: #354138;
  margin-bottom: 24px;

  span {
    color: #09c93a;
  }

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 440px;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PrimaryBtn = styled(Link)`
  background-color: #09c93a;
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
  box-shadow: 0px 4px 12px rgba(9, 201, 58, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    background-color: #16ef4d;
    color: #fff;
  }
`;

export const SecondaryBtn = styled.a`
  background-color: transparent;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    border-color: #09c93a;
    color: #09c93a;
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
  background: #e6f9ed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #09c93a;
  font-size: 14px;
  flex-shrink: 0;
`;

export const TrustLabel = styled.div``;

export const TrustTitle = styled.span`
  display: block;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #1a1a1a;
`;

export const TrustDesc = styled.span`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: #999;
`;

export const SocialProof = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #555;

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
  color: #1a1a1a;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

export const SectionSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: #777;
  margin-bottom: 48px;
`;

export const StepsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;

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
  padding: 0 20px;
`;

export const StepTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #09c93a;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StepIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 18px;
  flex-shrink: 0;
`;

export const StepName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
  margin: 0 0 6px;
`;

export const StepDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  margin: 0;
`;

export const StepArrow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-top: 22px;
  color: #09c93a;
  font-size: 20px;

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
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
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
  border: 1.5px solid ${({ $popular }) => ($popular ? "#09c93a" : "#e5e7eb")};
  border-radius: 14px;
  padding: 28px 24px;
  text-align: center;
  position: relative;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
`;

export const PopularBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #09c93a;
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
  background: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #09c93a;
  font-size: 24px;
  margin: 0 auto 16px;
`;

export const ServiceName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
  margin: 0 0 6px;
`;

export const ServiceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  margin: 0 0 16px;
`;

export const ServicePrice = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1a1a1a;
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
  color: #555;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #09c93a;
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
  background: ${({ $popular }) => ($popular ? "#09c93a" : "#fff")};
  color: ${({ $popular }) => ($popular ? "#fff" : "#333")};
  border: 1.5px solid ${({ $popular }) => ($popular ? "#09c93a" : "#e5e7eb")};

  &:hover {
    background: ${({ $popular }) => ($popular ? "#16ef4d" : "#f9fafb")};
    color: ${({ $popular }) => ($popular ? "#fff" : "#09c93a")};
    border-color: #09c93a;
  }
`;

export const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #09c93a;
  text-decoration: none;
  margin-top: 12px;

  &:hover {
    color: #078a28;
  }
`;

export const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #09c93a;
  text-decoration: none;

  &:hover {
    color: #078a28;
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
  background: #f9fafb;
  border: 1px solid #e5e7eb;
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
  color: #1a1a1a;
  margin: 0 0 4px;
`;

export const ComplianceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #777;
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
  background: #f0fdf4;
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
  background: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 26px;
    color: #09c93a;
  }
`;

export const CtaContent = styled.div`
  flex: 1;
`;

export const CtaTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #1a1a1a;
  margin: 0 0 4px;
`;

export const CtaDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #555;
  margin: 0;
`;

export const CtaButton = styled(Link)`
  background: #09c93a;
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
    background: #16ef4d;
    color: #fff;
  }
`;
