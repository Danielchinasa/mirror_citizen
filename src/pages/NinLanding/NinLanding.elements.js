import styled from "styled-components";
import { Link } from "react-router-dom";

/* ─── Shared ─── */

export const PageWrapper = styled.div`
  background: var(--ec-bg);
`;

export const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: var(--ec-text);
  text-align: center;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const SectionSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: var(--ec-text-muted);
  text-align: center;
  line-height: 24px;
  max-width: 600px;
  margin: 0 auto 50px;
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
  border: 1px solid #fbcb19;
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

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: var(--ec-hero-bottom-gradient);
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

export const PriceBadge = styled.div`
  display: inline-block;
  background: var(--ec-primary-bg);
  color: var(--ec-text);
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  margin-bottom: 20px;
  max-width: 100%;
  text-align: center;

  span {
    margin-right: 2px;
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
  background: ${(props) => props.bg || "#FFF9CC"};
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

/* ─── How It Works ─── */

export const SectionWrapper = styled.section`
  padding: 80px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  background: var(--ec-bg-secondary);
  border-radius: 12px;
  padding: 30px 24px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fbcb19;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

export const StepTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--ec-text);
  margin-bottom: 8px;
`;

export const StepDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-muted);
  line-height: 24px;
`;

/* ─── Features ─── */

export const FeaturesSectionWrapper = styled.section`
  background: var(--ec-bg-card-alt);
  padding: 80px 50px;

  @media screen and (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const FeaturesInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: var(--ec-bg);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const FeatureIcon = styled.div`
  color: var(--ec-primary);
  font-size: 36px;
  margin-bottom: 16px;
`;

export const FeatureTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--ec-text);
  margin-bottom: 10px;
`;

export const FeatureDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-muted);
  line-height: 24px;
`;

/* ─── Sample Result ─── */

export const SampleSectionWrapper = styled.section`
  padding: 80px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const SampleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const SampleImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 400px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

export const SampleInfo = styled.div`
  flex: 1;
`;

export const SampleTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: var(--ec-text);
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

export const SampleDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: var(--ec-text-secondary);
  line-height: 24px;
  margin-bottom: 24px;
`;

export const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
`;

export const CheckItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: var(--ec-text);
  margin-bottom: 12px;
  line-height: 24px;

  svg {
    color: var(--ec-primary);
    flex-shrink: 0;
  }
`;

/* ─── CTA ─── */

export const CtaSectionWrapper = styled.section`
  background: #fbcb19;
  padding: 60px 50px;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 50px 30px;
  }
`;

export const CtaTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #fff;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const CtaDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 24px;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const CtaButton = styled(Link)`
  background-color: #fff;
  color: var(--ec-primary);
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

  &:hover {
    background-color: #f0f0f0;
    color: var(--ec-primary);
  }
`;
