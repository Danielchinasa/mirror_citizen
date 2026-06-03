import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../components/ThemeProvider";
import { theme, Collapse, Rate, Progress } from "antd";
import {
  CheckCircleFilled,
  RightOutlined,
  LockFilled,
  ThunderboltFilled,
  SafetyCertificateFilled,
  CreditCardOutlined,
  LineChartOutlined,
  FileProtectOutlined,
  BankOutlined,
  WarningOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import logoGreen from "../../images/e-citizen_logo_ecitizen.png";
import logoWhite from "../../images/e-citizen_logo_ecitizen_white.png";
import creditHero from "../../images/check_credit_scores_on_ecitizen.png";
import ndpr from "../../images/ndpr1.png";
import osia from "../../images/osia.png";

const { useToken } = theme;

/* ─── Animations ──────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(13, 201, 57, 0.45); }
  50%       { box-shadow: 0 0 0 14px rgba(13, 201, 57, 0); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
`;

const sweepIn = keyframes`
  from { stroke-dashoffset: 502; }
  to   { stroke-dashoffset: 120; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
`;

/* ─── Page wrapper ────────────────────────────────────────── */
const PageWrapper = styled.div`
  font-family: "Nunito", sans-serif;
  background: ${({ $dark }) => ($dark ? "#0e1110" : "#f4f9f5")};
  min-height: 100vh;
  overflow-x: hidden;
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
  height: 66px;
  background: ${({ $dark }) =>
    $dark ? "rgba(14,17,16,0.95)" : "rgba(255,255,255,0.97)"};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid
    ${({ $dark }) => ($dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")};
`;

const TopbarLogo = styled.img`
  height: 34px;
  object-fit: contain;
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const NavLogin = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ $dark }) => ($dark ? "#8db89a" : "#2d5235")} !important;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #0dc939 !important;
  }
`;

const NavCta = styled(Link)`
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 10px 24px;
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

/* ══════════════════════════════════════════════════════════
   HERO — full-bleed split dark panel
══════════════════════════════════════════════════════════ */
const HeroOuter = styled.section`
  min-height: 92vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

/* Left: dark panel */
const HeroLeft = styled.div`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(160deg, #0e1110 0%, #152018 100%)"
      : "linear-gradient(160deg, #0f1f13 0%, #1a3020 100%)"};
  padding: 100px 7% 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  animation: ${fadeUp} 0.7s ease both;

  @media (max-width: 900px) {
    padding: 70px 6% 50px;
    order: 2;
  }
`;

/* Decorative green glow blob behind left panel */
const GlowBlob = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(13, 201, 57, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  top: -80px;
  left: -80px;
  pointer-events: none;
`;

const HeroEyebrow = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0dc939;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    display: inline-block;
    width: 28px;
    height: 2px;
    background: #0dc939;
    border-radius: 2px;
  }
`;

const HeroH1 = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 900;
  line-height: 1.12;
  color: #ffffff;
  margin-bottom: 24px;

  span {
    display: block;
    background: linear-gradient(90deg, #0dc939 0%, #64e87f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSub = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  max-width: 460px;
  margin-bottom: 40px;
`;

const HeroCtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-bottom: 48px;
`;

const PrimaryBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 9px;
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
    box-shadow: 0 12px 32px rgba(13, 201, 57, 0.55);
    animation: none;
  }
`;

const OutlineBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 600;
  font-size: 0.93rem;
  padding: 13px 28px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    border-color: #0dc939;
    color: #0dc939 !important;
  }
`;

const HeroTrustPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const TrustPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
`;

/* Right: visual panel */
const HeroRight = styled.div`
  background: ${({ $dark }) => ($dark ? "#0a0e0b" : "#f0fff4")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 6%;
  position: relative;
  animation: ${fadeIn} 1s 0.3s ease both;

  @media (max-width: 900px) {
    order: 1;
    min-height: 360px;
    padding: 48px 6%;
  }
`;

/* Mock credit score card */
const ScoreCard = styled.div`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(145deg, #121a14, #1a2e1e)"
      : "linear-gradient(145deg, #1a2e1e, #0f1f13)"};
  border: 1px solid rgba(13, 201, 57, 0.25);
  border-radius: 28px;
  padding: 36px 32px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  animation: ${floatY} 5s ease-in-out infinite;
  position: relative;
  z-index: 2;
`;

const ScoreCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const ScoreCardTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

const ScoreCardBadge = styled.div`
  background: rgba(13, 201, 57, 0.15);
  border: 1px solid rgba(13, 201, 57, 0.3);
  color: #0dc939;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
`;

const ScoreGaugeSvg = styled.svg`
  display: block;
  margin: 0 auto 12px;
`;

const ScoreNumber = styled.div`
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 3.2rem;
  font-weight: 900;
  color: #0dc939;
  line-height: 1;
  margin-bottom: 4px;
  animation: ${countUp} 0.8s 0.6s ease both;
`;

const ScoreLabel = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 24px;
`;

const ScoreMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 8px;
`;

const ScoreMetric = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
`;

const MetricLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ $good }) => ($good ? "#0dc939" : "#ff6b6b")};
`;

const ScoreCardDivider = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: 20px 0 16px;
`;

const ScorePersonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScoreAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #0dc939, #09a82e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const ScorePersonName = styled.div`
  .name {
    font-family: "Poppins", sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  .sub {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }
`;

const BureauRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const BureauTag = styled.div`
  flex: 1;
  background: rgba(13, 201, 57, 0.1);
  border: 1px solid rgba(13, 201, 57, 0.2);
  border-radius: 8px;
  padding: 6px 8px;
  text-align: center;
  font-size: 0.68rem;
  font-weight: 700;
  color: #0dc939;
  font-family: "Poppins", sans-serif;
`;

/* floating badge top right of card */
const LiveBadge = styled.div`
  position: absolute;
  top: -16px;
  right: 24px;
  background: linear-gradient(135deg, #0dc939, #09a82e);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba(13, 201, 57, 0.5);
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite;
  }
`;

/* ── Shared section layout ─────────────────────────────────── */
const Section = styled.section`
  padding: 88px 6%;
  @media (max-width: 768px) {
    padding: 60px 5%;
  }
`;

const SectionCenter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionEyebrow = styled.div`
  text-align: center;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #0dc939;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before,
  &::after {
    content: "";
    width: 32px;
    height: 2px;
    background: #0dc939;
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: ${({ $dark }) => ($dark ? "#f4fff6" : "#0f1f13")};
  margin-bottom: 14px;
  line-height: 1.22;
`;

const SectionSub = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ $dark }) => ($dark ? "#7aab84" : "#4a6b53")};
  max-width: 540px;
  margin: 0 auto 56px;
  line-height: 1.75;
`;

/* ── Stats strip ───────────────────────────────────────────── */
const StatsStrip = styled.section`
  background: ${({ $dark }) => ($dark ? "#0f1a11" : "#0f1f13")};
  padding: 0 6%;
`;

const StatsStripInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCell = styled.div`
  padding: 36px 20px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  &:last-child {
    border-right: none;
  }
`;

const StatNum = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  color: #0dc939;
  line-height: 1;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`;

/* ── Bureau section ────────────────────────────────────────── */
const BureauSection = styled(Section)`
  background: ${({ $dark }) => ($dark ? "#0e1110" : "#f4f9f5")};
`;

const BureauGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 0;
`;

const BureauCard = styled.div`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(145deg, #111a13, #192a1c)"
      : "linear-gradient(145deg, #ffffff, #f0fff4)"};
  border: 1px solid
    ${({ $dark }) => ($dark ? "rgba(13,201,57,0.18)" : "rgba(13,201,57,0.22)")};
  border-radius: 22px;
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0dc939, #09a82e);
    border-radius: 22px 22px 0 0;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 56px rgba(13, 201, 57, 0.14);
  }
`;

const BureauName = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: ${({ $dark }) => ($dark ? "#f4fff6" : "#0f1f13")};
  margin-bottom: 10px;
`;

const BureauDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ $dark }) => ($dark ? "#7aab84" : "#4a6b53")};
  line-height: 1.7;
  margin-bottom: 18px;
`;

const BureauTag2 = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(13, 201, 57, 0.1);
  border: 1px solid rgba(13, 201, 57, 0.25);
  color: #0dc939;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
`;

/* ── Score range bar ───────────────────────────────────────── */
const ScoreRangeSection = styled(Section)`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(160deg, #0f1a11 0%, #0e1110 100%)"
      : "linear-gradient(160deg, #0f1f13 0%, #1a3020 100%)"};
`;

const RangeBar = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const RangeTrack = styled.div`
  height: 18px;
  border-radius: 50px;
  background: linear-gradient(
    90deg,
    #e63946 0%,
    #f4a261 25%,
    #f7cb45 50%,
    #7bc67e 75%,
    #0dc939 100%
  );
  margin-bottom: 10px;
  position: relative;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
`;

const RangeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
  font-family: "Poppins", sans-serif;
`;

const RangeBands = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const RangeBand = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 12px;
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 600px) {
    padding: 12px 8px;
  }
`;

const BandScore = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.92rem;
  font-weight: 800;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
`;

const BandLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 600;
`;

/* ── Why check section ─────────────────────────────────────── */
const WhySection = styled(Section)`
  background: ${({ $dark }) => ($dark ? "#0e1110" : "#f4f9f5")};
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
`;

const WhyCard = styled.div`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(145deg, #111a13, #192a1c)"
      : "linear-gradient(145deg, #ffffff, #f0fff4)"};
  border: 1px solid
    ${({ $dark }) => ($dark ? "rgba(13,201,57,0.15)" : "rgba(13,201,57,0.2)")};
  border-radius: 20px;
  padding: 28px 26px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 44px rgba(13, 201, 57, 0.12);
  }
`;

const WhyIconBox = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ $dark }) =>
    $dark ? "rgba(13,201,57,0.18)" : "rgba(13,201,57,0.12)"};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: #0dc939;
  flex-shrink: 0;
`;

const WhyTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-size: 0.97rem;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? "#f4fff6" : "#0f1f13")};
  margin-bottom: 6px;
`;

const WhyDesc = styled.p`
  font-size: 0.86rem;
  color: ${({ $dark }) => ($dark ? "#7aab84" : "#4a6b53")};
  line-height: 1.65;
  margin: 0;
`;

/* ── Pricing ───────────────────────────────────────────────── */
const PricingSection = styled(Section)`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(160deg, #0f1a11 0%, #0e1110 100%)"
      : "linear-gradient(160deg, #0f1f13 0%, #1a3020 100%)"};
`;

const PricingCard = styled.div`
  max-width: 520px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(13, 201, 57, 0.3);
  border-radius: 28px;
  padding: 48px 42px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 80px rgba(13, 201, 57, 0.08);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(13, 201, 57, 0.06) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  @media (max-width: 520px) {
    padding: 36px 24px;
  }
`;

const PricingLabel = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0dc939;
  margin-bottom: 12px;
`;

const PricingPrice = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 3.4rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin-bottom: 4px;
  span {
    font-size: 1.3rem;
    font-weight: 600;
    vertical-align: super;
  }
  sub {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.45);
    vertical-align: baseline;
  }
`;

const PricingNote = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 8px 0 32px;
`;

const PerkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 36px;
  text-align: left;
`;

const Perk = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 9px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  padding: 17px;
  border-radius: 50px;
  text-decoration: none;
  text-align: center;
  transition: all 0.25s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(13, 201, 57, 0.55);
  }
`;

/* ── Reviews ───────────────────────────────────────────────── */
const ReviewsSection = styled(Section)`
  background: ${({ $dark }) => ($dark ? "#0e1110" : "#f4f9f5")};
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
`;

const ReviewCard = styled.div`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(145deg, #111a13, #192a1c)"
      : "linear-gradient(145deg, #ffffff, #f0fff4)"};
  border: 1px solid
    ${({ $dark }) => ($dark ? "rgba(13,201,57,0.15)" : "rgba(13,201,57,0.2)")};
  border-radius: 20px;
  padding: 28px;
  transition: transform 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  }
`;

const ReviewText = styled.p`
  font-size: 0.9rem;
  color: ${({ $dark }) => ($dark ? "rgba(255,255,255,0.7)" : "#2d5235")};
  line-height: 1.72;
  margin-bottom: 20px;
  font-style: italic;
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewAvatar = styled.div`
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #0dc939, #09a82e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  font-family: "Poppins", sans-serif;
`;

const ReviewMeta = styled.div`
  .name {
    font-family: "Poppins", sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    color: ${({ $dark }) => ($dark ? "#f4fff6" : "#0f1f13")};
    margin: 0;
  }
  .role {
    font-size: 0.75rem;
    color: ${({ $dark }) => ($dark ? "rgba(255,255,255,0.4)" : "#5a7a63")};
    margin: 0;
  }
`;

/* ── FAQ ───────────────────────────────────────────────────── */
const FaqSection = styled(Section)`
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(160deg, #0f1a11 0%, #0e1110 100%)"
      : "linear-gradient(160deg, #0f1f13 0%, #1a3020 100%)"};
`;

const StyledCollapse = styled(Collapse)`
  max-width: 720px;
  margin: 0 auto;
  background: transparent !important;
  border: none !important;

  .ant-collapse-item {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(13, 201, 57, 0.18) !important;
    border-radius: 14px !important;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .ant-collapse-header {
    font-family: "Poppins", sans-serif !important;
    font-size: 0.95rem !important;
    font-weight: 600 !important;
    color: rgba(255, 255, 255, 0.88) !important;
    padding: 18px 20px !important;
  }

  .ant-collapse-content {
    background: transparent !important;
    border-top: 1px solid rgba(13, 201, 57, 0.12) !important;
  }

  .ant-collapse-content-box {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.75;
    padding: 16px 20px !important;
  }
`;

/* ── Final CTA ─────────────────────────────────────────────── */
const FinalCta = styled.section`
  padding: 100px 6%;
  background: ${({ $dark }) => ($dark ? "#0e1110" : "#f4f9f5")};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(13, 201, 57, 0.08) 0%,
      transparent 70%
    );
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

const FinalCtaInner = styled.div`
  position: relative;
  z-index: 1;
`;

const FinalCtaTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 900;
  color: ${({ $dark }) => ($dark ? "#f4fff6" : "#0f1f13")};
  margin-bottom: 14px;
  line-height: 1.18;

  span {
    background: linear-gradient(90deg, #0dc939 0%, #64e87f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FinalCtaSub = styled.p`
  font-size: 1.05rem;
  color: ${({ $dark }) => ($dark ? "rgba(255,255,255,0.55)" : "#4a6b53")};
  max-width: 480px;
  margin: 0 auto 40px;
  line-height: 1.75;
`;

const FinalCtaBtn = styled(Link)`
  font-family: "Poppins", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #0dc939 0%, #09a82e 100%);
  color: #fff !important;
  font-weight: 800;
  font-size: 1.05rem;
  padding: 17px 48px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(13, 201, 57, 0.35);
  transition: all 0.25s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(13, 201, 57, 0.55);
  }
`;

/* ── Footer ────────────────────────────────────────────────── */
const SlimFooter = styled.footer`
  background: #070d08;
  padding: 24px 6%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid rgba(13, 201, 57, 0.1);
`;

const SlimFooterLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const SlimLink = styled(Link)`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4) !important;
  text-decoration: none;
  &:hover {
    color: #0dc939 !important;
  }
`;

const SlimCopy = styled.span`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.25);
`;

/* ════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════ */
const CreditLandingPage = () => {
  const { isDark } = useTheme();
  const { token } = useToken();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const ctaTarget = isAuthenticated ? "/dashboard" : "/signup";
  const loginTarget = "/login";

  const faqItems = [
    {
      key: "1",
      label: "What is a credit profile / credit score in Nigeria?",
      children:
        "A credit profile is a record of your borrowing history compiled by licensed Credit Bureaux in Nigeria. It includes loans, repayment behaviour, outstanding debts and defaults. Lenders use this score to decide whether — and on what terms — to extend credit to you.",
    },
    {
      key: "2",
      label: "Which credit bureaux does e-Citizen query?",
      children:
        "e-Citizen connects to three CBN-licensed bureaux: CRC Credit Bureau, First Central Credit Bureau, and Credit Registry. You can select one or all three for a comprehensive view.",
    },
    {
      key: "3",
      label: "Do I need my BVN to check my credit profile?",
      children:
        "Yes. The BVN (Bank Verification Number) is the primary identifier used by Nigerian credit bureaux to link financial records to an individual. You will need to provide your BVN to retrieve your credit report.",
    },
    {
      key: "4",
      label: "Will checking my own credit score affect it negatively?",
      children:
        "No. Checking your own credit profile is a 'soft inquiry' and does not affect your credit score. Only formal credit applications by lenders trigger 'hard inquiries'.",
    },
    {
      key: "5",
      label: "What if there are errors in my credit report?",
      children:
        "If you find inaccurate information, you can contact the relevant credit bureau directly to dispute it. Maintaining an accurate report is important for your financial health.",
    },
    {
      key: "6",
      label: "Can businesses use this to check applicants?",
      children:
        "Yes, with the applicant's consent. Businesses, fintechs, and lenders can use our API for bulk credit checks as part of their KYC and credit decisioning workflows. Contact info@e-citizen.ng for enterprise access.",
    },
  ];

  return (
    <PageWrapper $dark={isDark}>
      {/* ── Topbar ──────────────────────────────────────── */}
      <Topbar $dark={isDark}>
        <Link to="/">
          <TopbarLogo src={isDark ? logoWhite : logoGreen} alt="e-Citizen" />
        </Link>
        <TopbarRight>
          <NavLogin $dark={isDark} to={loginTarget}>
            Login
          </NavLogin>
          <NavCta to={ctaTarget}>Check Credit Profile</NavCta>
        </TopbarRight>
      </Topbar>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <HeroOuter>
        {/* Left dark panel */}
        <HeroLeft $dark={isDark}>
          <GlowBlob />

          <HeroEyebrow>BVN-Powered · CBN-Licensed Bureaux</HeroEyebrow>

          <HeroH1>
            Check Your Credit Profile <span>Before Applying for Loans.</span>
          </HeroH1>

          <HeroSub>
            Know exactly where you stand financially. Instantly pull your credit
            report from Nigeria's top three bureaux — CRC, First Central &
            Credit Registry — using just your BVN.
          </HeroSub>

          <HeroCtaRow>
            <PrimaryBtn to={ctaTarget}>
              Check Credit Profile{" "}
              <RightOutlined style={{ fontSize: "0.85rem" }} />
            </PrimaryBtn>
            <OutlineBtn to={loginTarget}>Sign In</OutlineBtn>
          </HeroCtaRow>

          <HeroTrustPills>
            <TrustPill>
              <LockFilled style={{ color: "#0dc939" }} />
              256-bit encrypted
            </TrustPill>
            <TrustPill>
              <ThunderboltFilled style={{ color: "#0dc939" }} />
              Results in &lt; 60 sec
            </TrustPill>
            <TrustPill>
              <SafetyCertificateFilled style={{ color: "#0dc939" }} />
              NDPR compliant
            </TrustPill>
          </HeroTrustPills>
        </HeroLeft>

        {/* Right visual panel */}
        <HeroRight $dark={isDark}>
          {/* Mock credit score card */}
          <ScoreCard $dark={isDark}>
            <LiveBadge>LIVE RESULT</LiveBadge>

            <ScoreCardHeader>
              <ScoreCardTitle>Credit Score Report</ScoreCardTitle>
              <ScoreCardBadge>GOOD</ScoreCardBadge>
            </ScoreCardHeader>

            {/* SVG gauge arc */}
            <ScoreGaugeSvg width="160" height="90" viewBox="0 0 160 90">
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="188"
                strokeDashoffset="50"
              />
              <defs>
                <linearGradient
                  id="scoreGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f4a261" />
                  <stop offset="100%" stopColor="#0dc939" />
                </linearGradient>
              </defs>
            </ScoreGaugeSvg>

            <ScoreNumber>724</ScoreNumber>
            <ScoreLabel>out of 850 · Very Good</ScoreLabel>

            <ScoreMetrics>
              <ScoreMetric>
                <MetricLabel>Payment History</MetricLabel>
                <MetricValue $good>On-time ✓</MetricValue>
              </ScoreMetric>
              <ScoreMetric>
                <MetricLabel>Active Loans</MetricLabel>
                <MetricValue $good>2 accounts</MetricValue>
              </ScoreMetric>
              <ScoreMetric>
                <MetricLabel>Defaults</MetricLabel>
                <MetricValue $good={false}>0 records</MetricValue>
              </ScoreMetric>
              <ScoreMetric>
                <MetricLabel>Credit Utilisation</MetricLabel>
                <MetricValue $good>28%</MetricValue>
              </ScoreMetric>
            </ScoreMetrics>

            <ScoreCardDivider />

            <ScorePersonRow>
              <ScoreAvatar>
                <UserOutlined />
              </ScoreAvatar>
              <ScorePersonName>
                <p className="name">A. Okonkwo</p>
                <p className="sub">BVN: ●●●●● 4821 · Verified</p>
              </ScorePersonName>
            </ScorePersonRow>

            <BureauRow>
              <BureauTag>CRC</BureauTag>
              <BureauTag>First Central</BureauTag>
              <BureauTag>Credit Registry</BureauTag>
            </BureauRow>
          </ScoreCard>
        </HeroRight>
      </HeroOuter>

      {/* ── Stats strip ──────────────────────────────────── */}
      <StatsStrip $dark={isDark}>
        <StatsStripInner>
          <StatCell>
            <StatNum>300K+</StatNum>
            <StatLabel>Credit Reports Pulled</StatLabel>
          </StatCell>
          <StatCell>
            <StatNum>3</StatNum>
            <StatLabel>CBN-Licensed Bureaux</StatLabel>
          </StatCell>
          <StatCell>
            <StatNum>&lt; 60s</StatNum>
            <StatLabel>Average Result Time</StatLabel>
          </StatCell>
          <StatCell>
            <StatNum>4.9 ★</StatNum>
            <StatLabel>User Rating</StatLabel>
          </StatCell>
        </StatsStripInner>
      </StatsStrip>

      {/* ── Bureau cards ────────────────────────────────── */}
      <BureauSection $dark={isDark}>
        <SectionCenter>
          <SectionEyebrow>3 Bureaux in 1 Report</SectionEyebrow>
          <SectionTitle $dark={isDark}>
            All CBN-Licensed Credit Bureaux, One Place
          </SectionTitle>
          <SectionSub $dark={isDark}>
            Nigerian lenders check one or more of these three bureaux. We cover
            all of them so you get the full picture.
          </SectionSub>

          <BureauGrid>
            {[
              {
                name: "CRC Credit Bureau",
                desc: "Nigeria's largest credit bureau by data coverage. Holds loan, default, and repayment records from banks, fintechs, and MFBs across the country.",
                tag: "Largest Coverage",
              },
              {
                name: "First Central Credit Bureau",
                desc: "Specialises in individual and SME credit data. Widely used by microfinance banks and digital lenders for fast credit decisions.",
                tag: "MFB & Fintech Focus",
              },
              {
                name: "Credit Registry",
                desc: "A fast-growing bureau with deep integration into Nigeria's formal banking sector. Trusted by top-tier commercial banks for corporate and retail credit checks.",
                tag: "Banking Sector Trusted",
              },
            ].map((b) => (
              <BureauCard key={b.name} $dark={isDark}>
                <BureauName $dark={isDark}>{b.name}</BureauName>
                <BureauDesc $dark={isDark}>{b.desc}</BureauDesc>
                <BureauTag2>
                  <CheckCircleFilled style={{ fontSize: "0.7rem" }} />
                  {b.tag}
                </BureauTag2>
              </BureauCard>
            ))}
          </BureauGrid>
        </SectionCenter>
      </BureauSection>

      {/* ── Score range ──────────────────────────────────── */}
      <ScoreRangeSection $dark={isDark}>
        <SectionCenter>
          <SectionEyebrow>Understanding Your Score</SectionEyebrow>
          <SectionTitle style={{ color: "#fff" }}>
            What Does Your Score Mean?
          </SectionTitle>
          <SectionSub style={{ color: "rgba(255,255,255,0.5)" }}>
            Nigerian credit scores typically run from 300 to 850. Here's how the
            bands break down.
          </SectionSub>

          <RangeBar>
            <RangeTrack />
            <RangeLabels>
              <RangeLabel>300</RangeLabel>
              <RangeLabel>450</RangeLabel>
              <RangeLabel>600</RangeLabel>
              <RangeLabel>700</RangeLabel>
              <RangeLabel>850</RangeLabel>
            </RangeLabels>

            <RangeBands>
              {[
                { range: "300–449", label: "Poor", color: "#e63946" },
                { range: "450–549", label: "Fair", color: "#f4a261" },
                { range: "550–649", label: "Average", color: "#f7cb45" },
                { range: "650–749", label: "Good", color: "#7bc67e" },
                { range: "750–850", label: "Excellent", color: "#0dc939" },
              ].map((b) => (
                <RangeBand key={b.range}>
                  <BandScore $color={b.color}>{b.range}</BandScore>
                  <BandLabel>{b.label}</BandLabel>
                </RangeBand>
              ))}
            </RangeBands>
          </RangeBar>
        </SectionCenter>
      </ScoreRangeSection>

      {/* ── Why check ───────────────────────────────────── */}
      <WhySection $dark={isDark}>
        <SectionCenter>
          <SectionEyebrow>Why It Matters</SectionEyebrow>
          <SectionTitle $dark={isDark}>
            6 Reasons to Check Before You Apply
          </SectionTitle>
          <SectionSub $dark={isDark}>
            Your credit report affects more than just loan approvals. Here's
            what's at stake.
          </SectionSub>

          <WhyGrid>
            {[
              {
                icon: <BankOutlined />,
                title: "Improve Loan Approval Odds",
                desc: "Know your score before applying so you can approach the right lender with confidence — or take steps to improve first.",
              },
              {
                icon: <WarningOutlined />,
                title: "Spot Errors Early",
                desc: "Inaccurate data on your report can unfairly lower your score. Catch and dispute errors before they cost you a loan.",
              },
              {
                icon: <LineChartOutlined />,
                title: "Negotiate Better Rates",
                desc: "A strong credit score gives you leverage to negotiate lower interest rates on loans, mortgages, and credit cards.",
              },
              {
                icon: <SafetyCertificateFilled />,
                title: "Detect Identity Fraud",
                desc: "Unexplained accounts or inquiries on your report could indicate identity theft. Catch it before it spirals.",
              },
              {
                icon: <DollarOutlined />,
                title: "Plan Major Purchases",
                desc: "Buying a car or property? A healthy credit profile is increasingly required by Nigerian sellers and developers.",
              },
              {
                icon: <ArrowUpOutlined />,
                title: "Track Your Progress",
                desc: "Regularly checking your score lets you see the impact of good financial habits and adjust accordingly.",
              },
            ].map((w) => (
              <WhyCard key={w.title} $dark={isDark}>
                <WhyIconBox $dark={isDark}>{w.icon}</WhyIconBox>
                <div>
                  <WhyTitle $dark={isDark}>{w.title}</WhyTitle>
                  <WhyDesc $dark={isDark}>{w.desc}</WhyDesc>
                </div>
              </WhyCard>
            ))}
          </WhyGrid>
        </SectionCenter>
      </WhySection>

      {/* ── Pricing ─────────────────────────────────────── */}
      <PricingSection $dark={isDark}>
        <SectionCenter>
          <SectionEyebrow>Transparent Pricing</SectionEyebrow>
          <SectionTitle style={{ color: "#fff" }}>
            Simple, Pay-Per-Check Pricing
          </SectionTitle>
          <SectionSub
            style={{ color: "rgba(255,255,255,0.5)", marginBottom: "40px" }}
          >
            Select one bureau or all three. No subscriptions, no surprises.
          </SectionSub>

          <PricingCard>
            <PricingLabel>BVN Credit Profile Check</PricingLabel>
            <PricingPrice>
              <span>₦</span>1,773<sub> / bureau</sub>
            </PricingPrice>
            <PricingNote>
              Select 1, 2, or all 3 bureaux per check · No hidden fees
            </PricingNote>

            <PerkList>
              {[
                "Full BVN-linked credit report",
                "Score from your chosen bureau(x)",
                "Active loan & default history",
                "Payment pattern analysis",
                "Credit utilisation breakdown",
                "Downloadable PDF report",
                "Saved to your secure dashboard",
                "NDPR-compliant data handling",
              ].map((p) => (
                <Perk key={p}>
                  <CheckCircleFilled
                    style={{ color: "#0dc939", flexShrink: 0 }}
                  />
                  {p}
                </Perk>
              ))}
            </PerkList>

            <PricingBtn to={ctaTarget}>Check Credit Profile Now</PricingBtn>

            <p
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.3)",
                marginTop: "18px",
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
          <SectionEyebrow>Real Users, Real Results</SectionEyebrow>
          <SectionTitle $dark={isDark}>What Our Customers Say</SectionTitle>
          <SectionSub $dark={isDark}>
            From salary earners to business owners — Nigerians trust e-Citizen
            to understand their credit standing.
          </SectionSub>

          <ReviewsGrid>
            {[
              {
                text: "I applied for a mortgage and was rejected without explanation. I checked my credit report on e-Citizen and found a default I never knew about. I disputed it and got approved 3 months later.",
                name: "Ngozi E.",
                role: "Accountant, Lagos",
                initials: "NE",
                stars: 5,
              },
              {
                text: "As a fintech startup, we needed to run BVN credit checks on applicants quickly. e-Citizen's API was the easiest integration we've done. Results in under a minute.",
                name: "David O.",
                role: "CTO, Digital Lending Startup",
                initials: "DO",
                stars: 5,
              },
              {
                text: "I never knew I had such a strong credit score until I checked. It gave me the confidence to negotiate a better rate on my car loan. Saved me over ₦200k in interest.",
                name: "Kemi A.",
                role: "Marketing Manager, Abuja",
                initials: "KA",
                stars: 5,
              },
            ].map((r) => (
              <ReviewCard key={r.name} $dark={isDark}>
                <Rate
                  disabled
                  defaultValue={r.stars}
                  style={{
                    fontSize: "0.8rem",
                    color: "#f5a623",
                    marginBottom: "14px",
                  }}
                />
                <ReviewText $dark={isDark}>"{r.text}"</ReviewText>
                <ReviewAuthor>
                  <ReviewAvatar>{r.initials}</ReviewAvatar>
                  <ReviewMeta $dark={isDark}>
                    <p className="name">{r.name}</p>
                    <p className="role">{r.role}</p>
                  </ReviewMeta>
                </ReviewAuthor>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </SectionCenter>
      </ReviewsSection>

      {/* ── Final CTA ───────────────────────────────────── */}
      <FinalCta $dark={isDark}>
        <FinalCtaInner>
          <FinalCtaTitle $dark={isDark}>
            Your Financial Future Starts with <span>Knowing Your Score.</span>
          </FinalCtaTitle>
          <FinalCtaSub $dark={isDark}>
            Don't get caught off guard by a lender. Check your credit profile
            now and take control of your financial story.
          </FinalCtaSub>
          <FinalCtaBtn to={ctaTarget}>
            Check Credit Profile Now <RightOutlined />
          </FinalCtaBtn>
        </FinalCtaInner>
      </FinalCta>

      {/* ── Slim footer ─────────────────────────────────── */}
      <SlimFooter>
        <TopbarLogo
          src={logoWhite}
          alt="e-Citizen"
          style={{ height: "26px" }}
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

export default CreditLandingPage;
