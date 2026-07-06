import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterWrapper = styled.footer`
  background: var(--ec-bg);
  color: var(--ec-text);
  padding: 0 24px 0;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 0 16px 0;
  }
`;

export const PublicBrand = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--ec-text);
  text-decoration: none;

  .brand-red {
    color: var(--ec-primary);
  }

  .brand-dot {
    color: var(--ec-text);
  }
`;

export const FooterStrip = styled.div`
  width: 100%;
  height: 18px;
  background: linear-gradient(
    90deg,
    #FED001 0%,
    #FED001 20%,
    #ffd000 20%,
    #ffd000 40%,
    #FED001 40%,
    #FED001 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.1) 42%,
      rgba(255, 255, 255, 0) 43%,
      rgba(255, 255, 255, 0) 100%
    );
    mix-blend-mode: screen;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    height: 12px;
  }
`;

export const FooterInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 0 0;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding-bottom: 40px;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BrandLogo = styled.img`
  height: 36px;
  width: auto;
  object-fit: contain;
  align-self: flex-start;

  @media screen and (max-width: 600px) {
    align-self: center;
  }
`;

export const BrandDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 280px;

  @media screen and (max-width: 600px) {
    text-align: center;
    max-width: 100%;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

export const SocialIcon = styled.a`
  color: var(--ec-text-muted);
  font-size: 18px;
  transition: color 0.2s;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const FooterCol = styled.div``;

export const FooterColTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--ec-text);
  margin: 0 0 16px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 42px;
    height: 3px;
    border-radius: 999px;
    background: #FED001;
    margin-top: 8px;
  }
`;

export const FooterLink = styled(Link)`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-secondary);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.2s;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const ExternalLink = styled.a`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-secondary);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.2s;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const AppCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AppBadge = styled.a`
  display: inline-block;
  text-decoration: none;
  width: fit-content;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  img {
    height: 44px;
    width: auto;
    object-fit: contain;
    display: block;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(17, 24, 39, 0.08);
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

export const Copyright = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
`;

export const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const LegalLink = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--ec-primary);
  }
`;
