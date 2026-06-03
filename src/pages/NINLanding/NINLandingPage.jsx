import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../components/ThemeProvider";
import { theme, Collapse, Rate } from "antd";
import {
  CheckCircleFilled,
  SafetyCertificateFilled,
  ThunderboltFilled,
  LockFilled,
  RightOutlined,
  StarFilled,
  UserOutlined,
  FileSearchOutlined,
  CreditCardOutlined,
  CheckOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

import logoGreen from "../../images/e-citizen_logo_ecitizen.png";
import logoWhite from "../../images/e-citizen_logo_ecitizen_white.png";
import ninBanner from "../../images/Verify_NIN_on_ecitizen.jpg";
import ninBanner2 from "../../images/NIN_verification_on_ecitizen.png";
import tickImg from "../../images/tick.png";
import nimc from "../../images/nidologo.png";
import ndpr from "../../images/ndpr1.png";
import osia from "../../images/osia.png";

const { useToken } = theme;
const { Panel } = Collapse;

/* ─── Animations ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(13, 201, 57, 0.5); }
  50%       { box-shadow: 0 0 0 12px rgba(13, 201, 57, 0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ─── Layout ──────────────────────────────────────────────── */
const PageWrapper = styled.div`
  background: ${({ $dark }) => ($dark ? "#1a1f1b" : "#f8fdf9")};
  min-height: 100vh;
  font-family: "Nunito", sans-serif;
`;

/* ─── Topbar ──────────────────────────────────────────────── */
const Topbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  height: 68px;
  background: ${({ $dark }) => ($dark ? "#141a15" : "#ffffff")};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
`;

const TopbarLogo = styled.img`
  height: 36px;
  object-fit: contain;
`;

const TopbarCta = styled(Link)`
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 10px 26px;
  border-radius: 50px;
  text-decoration: none;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(13, 201, 57, 0.45);
  }
`;

/* ─── Hero ─────────────────────────────────────────────────── */
const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 80px 6% 0;
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(135deg, #141a15 0%, #1e2d20 100%)"
      : "linear-gradient(135deg, #e8fded 0%, #f0fff4 50%, #ffffff 100%)"};

  @media (max-width: 768px) {
    padding: 48px 5% 0;
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const HeroLeft = styled.div`
  animation: ${fadeUp} 0.7s ease both;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ $dark }) => ($dark ? "rgba(13,201,57,0.15)" : "#e6fded")};
  border: 1px solid rgba(13, 201, 57, 0.4);
  color: #0dc939;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

const HeroH1 = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.18;
  color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
  margin-bottom: 20px;

  span {
    color: #0dc939;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #0dc939, #09a82e);
      border-radius: 2px;
    }
  }
`;

const HeroSub = styled.p`
  font-size: 1.05rem;
  color: ${({ $dark }) => ($dark ? "#a8c4ae" : "#4a6b53")};
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 500px;
`;

const HeroCtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-bottom: 40px;
`;

const PrimaryBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 1rem;
  padding: 15px 36px;
  border-radius: 50px;
  text-decoration: none;
  animation: ${pulse} 2.5s infinite;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(13, 201, 57, 0.5);
    animation: none;
  }
`;

const SecondaryBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 2px solid #0dc939;
  color: ${({ $dark }) => ($dark ? "#0dc939" : "#0a8c28")} !important;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 13px 28px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    background: #0dc939;
    color: #fff !important;
  }
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#4a6b53")};
`;

const HeroRight = styled.div`
  position: relative;
  animation: ${fadeUp} 0.9s 0.2s ease both;

  @media (max-width: 900px) {
    order: -1;
  }
`;

const HeroImgCard = styled.div`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.18);
  position: relative;
`;

const HeroImg = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const FloatingBadge = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: ${({ $dark }) =>
    $dark ? "rgba(30,45,32,0.92)" : "rgba(255,255,255,0.95)"};
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

const FloatingBadgeIcon = styled.div`
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #0dc939, #09a82e);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #fff;
  flex-shrink: 0;
`;

const FloatingBadgeText = styled.div`
  .main {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
    margin: 0;
  }
  .sub {
    font-size: 0.75rem;
    color: ${({ $dark }) => ($dark ? "#8db89a" : "#4a6b53")};
    margin: 0;
  }
`;

/* ─── Wave divider ─────────────────────────────────────────── */
const WaveDivider = styled.div`
  width: 100%;
  overflow: hidden;
  line-height: 0;
  margin-top: -2px;
  svg {
    display: block;
  }
`;

/* ─── Section Shared ───────────────────────────────────────── */
const Section = styled.section`
  padding: 80px 6%;
  @media (max-width: 768px) {
    padding: 56px 5%;
  }
`;

const SectionCenter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionLabel = styled.div`
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0dc939;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
  margin-bottom: 12px;
  line-height: 1.25;
`;

const SectionSub = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#5a7a63")};
  max-width: 560px;
  margin: 0 auto 52px;
  line-height: 1.7;
`;

/* ─── Trust logos ──────────────────────────────────────────── */
const TrustSection = styled.section`
  padding: 32px 6%;
  background: ${({ $dark }) => ($dark ? "#1a1f1b" : "#ffffff")};
  border-top: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e8f5ea")};
  border-bottom: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e8f5ea")};
`;

const TrustLogoRow = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px 48px;
`;

const TrustLogoLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#8aab94")};
`;

const TrustLogo = styled.img`
  height: 38px;
  object-fit: contain;
  opacity: 0.75;
  filter: ${({ $dark }) => ($dark ? "brightness(1.8) grayscale(0.2)" : "none")};
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

/* ─── Steps ────────────────────────────────────────────────── */
const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 28px;
  margin-top: 52px;
`;

const StepCard = styled.div`
  background: ${({ $dark }) => ($dark ? "#1e2d20" : "#ffffff")};
  border: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e0f2e3")};
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  position: relative;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(13, 201, 57, 0.12);
  }
`;

const StepNumber = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin: 0 auto 18px;
`;

const StepIcon = styled.div`
  font-size: 2rem;
  color: #0dc939;
  margin-bottom: 14px;
`;

const StepTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  font-size: 0.87rem;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#5a7a63")};
  line-height: 1.65;
  margin: 0;
`;

const StepConnector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0dc939;
  font-size: 1.4rem;
  padding-top: 28px;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ─── Feature cards ────────────────────────────────────────── */
const FeaturesSection = styled(Section)`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(135deg, #141a15 0%, #1e2d20 100%)"
      : "linear-gradient(135deg, #e8fded 0%, #f5fff7 100%)"};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 52px;
`;

const FeatureCard = styled.div`
  background: ${({ $dark }) =>
    $dark ? "rgba(30,45,32,0.6)" : "rgba(255,255,255,0.85)"};
  backdrop-filter: blur(8px);
  border: 1px solid
    ${({ $dark }) => ($dark ? "#2a3a2c" : "rgba(13,201,57,0.2)")};
  border-radius: 20px;
  padding: 30px 28px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 44px rgba(13, 201, 57, 0.14);
  }
`;

const FeatureIconBox = styled.div`
  width: 52px;
  height: 52px;
  background: ${({ $dark }) =>
    $dark ? "rgba(13,201,57,0.2)" : "rgba(13,201,57,0.1)"};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #0dc939;
  flex-shrink: 0;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
  margin-bottom: 6px;
`;

const FeatureDesc = styled.p`
  font-size: 0.87rem;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#5a7a63")};
  line-height: 1.65;
  margin: 0;
`;

/* ─── Pricing card ─────────────────────────────────────────── */
const PricingSection = styled(Section)`
  background: ${({ $dark }) => ($dark ? "#1a1f1b" : "#ffffff")};
`;

const PricingCard = styled.div`
  max-width: 480px;
  margin: 52px auto 0;
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(145deg, #1e2d20, #243428)"
      : "linear-gradient(145deg, #f0fff4, #e8fded)"};
  border: 2px solid #0dc939;
  border-radius: 28px;
  padding: 44px 40px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(13, 201, 57, 0.18);
  position: relative;
  overflow: hidden;

  &::before {
    content: "MOST POPULAR";
    position: absolute;
    top: 20px;
    right: -28px;
    background: linear-gradient(135deg, #0dc939, #09a82e);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    padding: 5px 40px;
    transform: rotate(45deg);
  }

  @media (max-width: 520px) {
    padding: 36px 24px;
  }
`;

const PricingName = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0dc939;
  margin-bottom: 10px;
`;

const PricingPrice = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
  line-height: 1;
  margin-bottom: 4px;
  span {
    font-size: 1.2rem;
    font-weight: 600;
    vertical-align: super;
  }
  sub {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ $dark }) => ($dark ? "#8db89a" : "#5a7a63")};
    vertical-align: baseline;
  }
`;

const PricingPerks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0 32px;
  text-align: left;
`;

const PricingPerk = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.93rem;
  color: ${({ $dark }) => ($dark ? "#c8e8ce" : "#2d5235")};
  padding: 8px 0;
  border-bottom: 1px solid
    ${({ $dark }) => ($dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)")};
  &:last-child {
    border-bottom: none;
  }
`;

const PricingBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: block;
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 16px;
  border-radius: 50px;
  text-decoration: none;
  text-align: center;
  transition: all 0.25s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(13, 201, 57, 0.5);
  }
`;

/* ─── Social proof / reviews ───────────────────────────────── */
const ReviewsSection = styled(Section)`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(135deg, #141a15 0%, #1e2d20 100%)"
      : "linear-gradient(135deg, #f5fff7 0%, #ffffff 100%)"};
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 52px;
`;

const ReviewCard = styled.div`
  background: ${({ $dark }) => ($dark ? "#1e2d20" : "#ffffff")};
  border: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e0f2e3")};
  border-radius: 20px;
  padding: 28px;
  transition: transform 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewText = styled.p`
  font-size: 0.92rem;
  color: ${({ $dark }) => ($dark ? "#c8e8ce" : "#2d5235")};
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewAvatar = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #0dc939, #09a82e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

const ReviewName = styled.div`
  .name {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")};
    margin: 0;
  }
  .role {
    font-size: 0.78rem;
    color: ${({ $dark }) => ($dark ? "#8db89a" : "#5a7a63")};
    margin: 0;
  }
`;

/* ─── Stats bar ────────────────────────────────────────────── */
const StatsBar = styled.section`
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  padding: 48px 6%;
`;

const StatsInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  text-align: center;
`;

const StatItem = styled.div``;

const StatNum = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
`;

/* ─── FAQ ──────────────────────────────────────────────────── */
const FaqSection = styled(Section)`
  background: ${({ $dark }) => ($dark ? "#1a1f1b" : "#f8fdf9")};
`;

const StyledCollapse = styled(Collapse)`
  max-width: 760px;
  margin: 0 auto;
  background: transparent !important;
  border: none !important;

  .ant-collapse-item {
    background: ${({ $dark }) => ($dark ? "#1e2d20" : "#ffffff")} !important;
    border: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e0f2e3")} !important;
    border-radius: 14px !important;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .ant-collapse-header {
    font-size: 0.97rem !important;
    font-weight: 600 !important;
    color: ${({ $dark }) => ($dark ? "#f0fff4" : "#1a2e1e")} !important;
    padding: 18px 20px !important;
  }

  .ant-collapse-content {
    background: transparent !important;
    border-top: 1px solid ${({ $dark }) => ($dark ? "#2a3a2c" : "#e0f2e3")} !important;
  }

  .ant-collapse-content-box {
    font-size: 0.9rem;
    color: ${({ $dark }) => ($dark ? "#8db89a" : "#4a6b53")};
    line-height: 1.7;
    padding: 16px 20px !important;
  }
`;

/* ─── Final CTA ────────────────────────────────────────────── */
const FinalCta = styled.section`
  padding: 80px 6%;
  background: linear-gradient(135deg, #0dc939 0%, #07943f 100%);
  text-align: center;
`;

const FinalCtaTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 14px;
  line-height: 1.2;
`;

const FinalCtaSub = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 36px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const FinalCtaBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  color: #0a8c28 !important;
  font-weight: 800;
  font-size: 1.05rem;
  padding: 16px 44px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.3);
  }
`;

/* ─── Slim footer ──────────────────────────────────────────── */
const SlimFooter = styled.footer`
  background: ${({ $dark }) => ($dark ? "#0d1410" : "#1a2e1e")};
  padding: 24px 6%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const SlimFooterLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const SlimLink = styled(Link)`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6) !important;
  text-decoration: none;
  &:hover {
    color: #0dc939 !important;
  }
`;

const SlimCopy = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
`;

/* ════════════════════════════════════════════════════════════ */
/*   COMPONENT                                                  */
/* ════════════════════════════════════════════════════════════ */
const NINLandingPage = () => {
  const { isDark } = useTheme();
  const { token } = useToken();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const ctaTarget = isAuthenticated ? "/dashboard" : "/signup";
  const loginTarget = "/login";

  const faqItems = [
    {
      key: "1",
      label: "What is NIN verification and why do I need it?",
      children:
        "NIN (National Identification Number) verification confirms the identity of a person by cross-checking their NIN against the NIMC database. It is required for KYC compliance, background checks, employment screening, financial onboarding, and access to government services.",
    },
    {
      key: "2",
      label: "How long does the verification process take?",
      children:
        "Most NIN verifications are completed in under 60 seconds. Our API connects directly to the NIMC database, so results are returned in real time.",
    },
    {
      key: "3",
      label: "Is my data secure?",
      children:
        "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest. We are NDPR compliant and follow strict data minimisation principles. We never store your NIN beyond what is needed to complete the verification.",
    },
    {
      key: "4",
      label: "What information is returned in the result?",
      children:
        "A standard NIN lookup returns full name, date of birth, gender, phone number, address, and a passport-size photograph linked to the NIN record.",
    },
    {
      key: "5",
      label: "Do I need an account to verify a NIN?",
      children:
        "Yes, a free e-Citizen account is required so that your verification history is securely saved and accessible only by you. Creating an account takes less than two minutes.",
    },
    {
      key: "6",
      label: "Can businesses use this service for bulk verification?",
      children:
        "Yes. We offer API access and bulk verification packages for businesses. Contact our team at info@e-citizen.ng for enterprise pricing.",
    },
  ];

  return (
    <PageWrapper $dark={isDark}>
      {/* ── Topbar ─────────────────────────────────────── */}
      <Topbar $dark={isDark}>
        <Link to="/">
          <TopbarLogo
            src={isDark ? logoWhite : logoGreen}
            alt="e-Citizen logo"
          />
        </Link>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <SlimLink
            to={loginTarget}
            style={{
              color: isDark ? "#c8e8ce" : "#2d5235",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Login
          </SlimLink>
          <TopbarCta to={ctaTarget}>Verify NIN Now</TopbarCta>
        </div>
      </Topbar>

      {/* ── Hero ───────────────────────────────────────── */}
      <HeroSection $dark={isDark}>
        <HeroInner>
          <HeroLeft>
            <HeroH1 $dark={isDark}>
              Verify Your NIN <span>Online</span> in Minutes.
            </HeroH1>

            <HeroSub $dark={isDark}>
              Instantly confirm any Nigerian identity. Real-time verification
              results with no paperwork, no queues, no stress.
            </HeroSub>

            <HeroCtaRow>
              <PrimaryBtn to={ctaTarget}>
                Verify NIN Now <RightOutlined style={{ fontSize: "0.85rem" }} />
              </PrimaryBtn>
              <SecondaryBtn $dark={isDark} to={loginTarget}>
                Sign In
              </SecondaryBtn>
            </HeroCtaRow>

            <TrustRow>
              <TrustItem $dark={isDark}>
                <CheckCircleFilled style={{ color: "#0dc939" }} />
                No hidden fees
              </TrustItem>
              <TrustItem $dark={isDark}>
                <LockFilled style={{ color: "#0dc939" }} />
                256-bit encryption
              </TrustItem>
              <TrustItem $dark={isDark}>
                <ThunderboltFilled style={{ color: "#0dc939" }} />
                Results in &lt; 60 sec
              </TrustItem>
            </TrustRow>
          </HeroLeft>

          <HeroRight>
            <HeroImgCard>
              <HeroImg src={ninBanner} alt="NIN verification on e-Citizen" />
            </HeroImgCard>
            <FloatingBadge $dark={isDark}>
              <FloatingBadgeIcon>
                <SafetyCertificateFilled />
              </FloatingBadgeIcon>
              <FloatingBadgeText $dark={isDark}>
                <p className="main">Verification Complete</p>
                <p className="sub">Identity confirmed · 0.8 sec</p>
              </FloatingBadgeText>
            </FloatingBadge>
          </HeroRight>
        </HeroInner>

        {/* Wave */}
        <WaveDivider>
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "60px" }}
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill={isDark ? "#1a1f1b" : "#f8fdf9"}
            />
          </svg>
        </WaveDivider>
      </HeroSection>

      {/* ── Trust logos ─────────────────────────────────── */}
      <TrustSection $dark={isDark}>
        <TrustLogoRow>
          <TrustLogoLabel $dark={isDark}>Trusted & Certified by</TrustLogoLabel>
          <TrustLogo src={nimc} alt="NIMC" $dark={isDark} />
          <TrustLogo src={ndpr} alt="NDPR" $dark={isDark} />
          <TrustLogo src={osia} alt="OSIA" $dark={isDark} />
        </TrustLogoRow>
      </TrustSection>

      {/* ── Stats ───────────────────────────────────────── */}
      <StatsBar>
        <StatsInner>
          <StatItem>
            <StatNum>500K+</StatNum>
            <StatLabel>Verifications Processed</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>99.9%</StatNum>
            <StatLabel>Uptime SLA</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>&lt; 60s</StatNum>
            <StatLabel>Average Result Time</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>4.9 ★</StatNum>
            <StatLabel>User Rating</StatLabel>
          </StatItem>
        </StatsInner>
      </StatsBar>

      {/* ── How it works ────────────────────────────────── */}
      <Section
        $dark={isDark}
        style={{ background: isDark ? "#1a1f1b" : "#ffffff" }}
      >
        <SectionCenter>
          <SectionLabel>Simple Process</SectionLabel>
          <SectionTitle $dark={isDark}>How NIN Verification Works</SectionTitle>
          <SectionSub $dark={isDark}>
            Four easy steps: From sign-up to verified result in under two
            minutes.
          </SectionSub>

          <StepsGrid>
            <StepCard $dark={isDark}>
              <StepNumber>1</StepNumber>
              <StepIcon>
                <UserOutlined />
              </StepIcon>
              <StepTitle $dark={isDark}>Create Your Account</StepTitle>
              <StepDesc $dark={isDark}>
                Sign up for free with your email address. No credit card
                required to get started.
              </StepDesc>
            </StepCard>

            <StepCard $dark={isDark}>
              <StepNumber>2</StepNumber>
              <StepIcon>
                <FileSearchOutlined />
              </StepIcon>
              <StepTitle $dark={isDark}>Select NIN Verification</StepTitle>
              <StepDesc $dark={isDark}>
                Choose the NIN verification service from the dashboard and enter
                the NIN you want to verify.
              </StepDesc>
            </StepCard>

            <StepCard $dark={isDark}>
              <StepNumber>3</StepNumber>
              <StepIcon>
                <CreditCardOutlined />
              </StepIcon>
              <StepTitle $dark={isDark}>Make a Secure Payment</StepTitle>
              <StepDesc $dark={isDark}>
                Pay securely via Paystack, Flutterwave or Wallet. All major
                banks and cards accepted.
              </StepDesc>
            </StepCard>

            <StepCard $dark={isDark}>
              <StepNumber>4</StepNumber>
              <StepIcon>
                <CheckOutlined />
              </StepIcon>
              <StepTitle $dark={isDark}>Instant Verified Result</StepTitle>
              <StepDesc $dark={isDark}>
                View and download the full verification report including name,
                photo, DOB, and address.
              </StepDesc>
            </StepCard>
          </StepsGrid>
        </SectionCenter>
      </Section>

      {/* ── Features ────────────────────────────────────── */}
      <FeaturesSection $dark={isDark}>
        <SectionCenter>
          <SectionLabel>Why e-Citizen</SectionLabel>
          <SectionTitle $dark={isDark}>
            Everything You Need for Reliable Identity Verification
          </SectionTitle>
          <SectionSub $dark={isDark}>
            Built for individuals, businesses, and developers who need fast,
            accurate, and compliant NIN verification.
          </SectionSub>

          <FeaturesGrid>
            <FeatureCard $dark={isDark}>
              <FeatureIconBox $dark={isDark}>
                <ThunderboltFilled />
              </FeatureIconBox>
              <FeatureContent>
                <FeatureTitle $dark={isDark}>Real-Time Results</FeatureTitle>
                <FeatureDesc $dark={isDark}>
                  Direct NIMC database connection means results are returned in
                  under 60 seconds — not hours or days.
                </FeatureDesc>
              </FeatureContent>
            </FeatureCard>

            <FeatureCard $dark={isDark}>
              <FeatureIconBox $dark={isDark}>
                <SafetyCertificateFilled />
              </FeatureIconBox>
              <FeatureContent>
                <FeatureTitle $dark={isDark}>NIMC Authorised</FeatureTitle>
                <FeatureDesc $dark={isDark}>
                  We are an authorised partner of NIMC, ensuring the data you
                  receive is official and legally admissible.
                </FeatureDesc>
              </FeatureContent>
            </FeatureCard>

            <FeatureCard $dark={isDark}>
              <FeatureIconBox $dark={isDark}>
                <FileSearchOutlined />
              </FeatureIconBox>
              <FeatureContent>
                <FeatureTitle $dark={isDark}>Comprehensive Report</FeatureTitle>
                <FeatureDesc $dark={isDark}>
                  Full name, photo, date of birth, gender, phone, and address —
                  all in one downloadable PDF report.
                </FeatureDesc>
              </FeatureContent>
            </FeatureCard>

            <FeatureCard $dark={isDark}>
              <FeatureIconBox $dark={isDark}>
                <CreditCardOutlined />
              </FeatureIconBox>
              <FeatureContent>
                <FeatureTitle $dark={isDark}>Flexible Payment</FeatureTitle>
                <FeatureDesc $dark={isDark}>
                  Pay per verification or top up your wallet. Supports NGN, USD,
                  and all major payment methods.
                </FeatureDesc>
              </FeatureContent>
            </FeatureCard>

            <FeatureCard $dark={isDark}>
              <FeatureIconBox $dark={isDark}>
                <UserOutlined />
              </FeatureIconBox>
              <FeatureContent>
                <FeatureTitle $dark={isDark}>Built for Everyone</FeatureTitle>
                <FeatureDesc $dark={isDark}>
                  Whether you are an individual, HR manager, fintech, or
                  developer — e-Citizen scales to your needs.
                </FeatureDesc>
              </FeatureContent>
            </FeatureCard>
          </FeaturesGrid>
        </SectionCenter>
      </FeaturesSection>

      {/* ── Pricing ─────────────────────────────────────── */}
      <PricingSection $dark={isDark}>
        <SectionCenter>
          <SectionLabel>Transparent Pricing</SectionLabel>
          <SectionTitle $dark={isDark}>
            Simple, Pay-Per-Use Pricing
          </SectionTitle>
          <SectionSub $dark={isDark}>
            No subscriptions, no surprises. Pay only for what you verify.
          </SectionSub>

          <PricingCard $dark={isDark}>
            <PricingName>NIN Verification</PricingName>
            <PricingPrice $dark={isDark}>
              <span>₦</span>645<sub> / lookup</sub>
            </PricingPrice>
            <p
              style={{
                fontSize: "0.82rem",
                color: isDark ? "#8db89a" : "#5a7a63",
                marginTop: "6px",
              }}
            >
              One-time payment for each NIN verification. No hidden fees.
            </p>

            <PricingPerks>
              {[
                "Full NIMC NIN data record",
                "Passport photo from NIMC database",
                "Downloadable PDF verification report",
                "Instant real-time result",
                "Saved to your secure dashboard",
                "NDPR-compliant data handling",
              ].map((perk) => (
                <PricingPerk key={perk} $dark={isDark}>
                  <CheckCircleFilled
                    style={{ color: "#0dc939", flexShrink: 0 }}
                  />
                  {perk}
                </PricingPerk>
              ))}
            </PricingPerks>

            <PricingBtn to={ctaTarget}>Get Started — Verify NIN Now</PricingBtn>

            <p
              style={{
                fontSize: "0.78rem",
                color: isDark ? "#8db89a" : "#5a7a63",
                marginTop: "16px",
                marginBottom: 0,
              }}
            >
              Bulk &amp; API plans available ·{" "}
              <a
                href="mailto:info@e-citizen.ng"
                style={{ color: "#0dc939", textDecoration: "none" }}
              >
                Contact sales
              </a>
            </p>
          </PricingCard>
        </SectionCenter>
      </PricingSection>

      {/* ── Reviews ─────────────────────────────────────── */}
      <ReviewsSection $dark={isDark}>
        <SectionCenter>
          <SectionLabel>Real Users, Real Results</SectionLabel>
          <SectionTitle $dark={isDark}>What Our Customers Say</SectionTitle>
          <SectionSub $dark={isDark}>
            Trusted by thousands of Nigerians and businesses nationwide.
          </SectionSub>

          <ReviewsGrid>
            {[
              {
                text: "I had to verify a potential employee's identity before hiring. e-Citizen returned the full NIMC result in under a minute. Absolutely seamless.",
                name: "Adaeze O.",
                role: "HR Manager, Lagos",
                initials: "AO",
                stars: 5,
              },
              {
                text: "The interface is clean, the process is straight-forward, and the result matched exactly what I needed for KYC compliance. 10/10.",
                name: "Emeka N.",
                role: "Fintech Founder, Abuja",
                initials: "EN",
                stars: 5,
              },
              {
                text: "I was sceptical at first but after seeing the real NIMC photo and details, I knew it was genuine. Great service, will use again.",
                name: "Bola A.",
                role: "Independent Consultant",
                initials: "BA",
                stars: 5,
              },
            ].map((review) => (
              <ReviewCard key={review.name} $dark={isDark}>
                <Rate
                  disabled
                  defaultValue={review.stars}
                  style={{
                    fontSize: "0.85rem",
                    color: "#f5a623",
                    marginBottom: "14px",
                  }}
                />
                <ReviewText $dark={isDark}>"{review.text}"</ReviewText>
                <ReviewAuthor>
                  <ReviewAvatar>{review.initials}</ReviewAvatar>
                  <ReviewName $dark={isDark}>
                    <p className="name">{review.name}</p>
                    <p className="role">{review.role}</p>
                  </ReviewName>
                </ReviewAuthor>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </SectionCenter>
      </ReviewsSection>

      {/* ── Final CTA ───────────────────────────────────── */}
      <FinalCta>
        <FinalCtaTitle>Ready to Verify a NIN?</FinalCtaTitle>
        <FinalCtaSub>
          Join over 500,000 Nigerians who trust e-Citizen for fast, secure, and
          official identity verification.
        </FinalCtaSub>
        <FinalCtaBtn to={ctaTarget}>
          Verify NIN Now <RightOutlined />
        </FinalCtaBtn>
      </FinalCta>

      {/* ── Slim footer ─────────────────────────────────── */}
      <SlimFooter $dark={isDark}>
        <TopbarLogo
          src={logoWhite}
          alt="e-Citizen"
          style={{ height: "28px" }}
        />
        <SlimFooterLinks>
          <SlimLink to="/privacy-policy">Privacy Policy</SlimLink>
          <SlimLink to="/terms-of-service">Terms of Service</SlimLink>
          <SlimLink to="/faq">FAQ</SlimLink>
          <SlimLink to="/contact">Contact</SlimLink>
        </SlimFooterLinks>
        <SlimCopy>
          © {new Date().getFullYear()} e-Citizen · Biosec. All rights reserved.
        </SlimCopy>
      </SlimFooter>
    </PageWrapper>
  );
};

export default NINLandingPage;
