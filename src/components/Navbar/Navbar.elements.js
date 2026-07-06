import React from "react";
import styled from "styled-components";
import { Container } from "../../globalStyles";
import { FaMagento } from "react-icons/fa";
import { Link } from "react-router-dom";
import { theme } from "antd";

const { useToken } = theme;

export const Nav = styled.nav`
  background: ${(props) => props.$token.bgContainer};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const NavLogo = styled(Link)`
  color: #000;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export const NavIcon = styled(FaMagento)`
  margin-right: 0.5rem;
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  padding-left: 0px !important;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    opacity: 1;
    transition: all 0.5s ease;
    background-color: #101522;
    padding-left: 0px !important;
    left: ${({ click }) => (click ? 0 : "-100%")};
  }
`;
export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;
  border-radius: 2px;

  &:hover {
    border-bottom: 4px solid #fff;
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border-bottom: none;
    }
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 8px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

export const PublicNav = styled.nav`
  background: var(--ec-bg);
  position: sticky;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
`;

export const PublicNavInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: 92px;
  padding: 0 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media screen and (max-width: 1024px) {
    padding: 0 24px;
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

export const PublicCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  flex: 1;
  justify-content: center;

  @media screen and (max-width: 1100px) {
    gap: 24px;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const CountryPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  color: var(--ec-text);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  .flag {
    font-size: 26px;
    line-height: 1;
  }

  .chev {
    font-size: 12px;
    color: var(--ec-text-muted);
  }
`;

export const PublicNavGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const PublicTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: var(--ec-text);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--ec-primary);
  }

  .chev {
    font-size: 12px;
    color: var(--ec-text-muted);
  }
`;

export const PublicNavLink = styled(Link)`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const PublicAnchor = styled.a`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const PublicTextLink = styled(Link)`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const PublicLanguage = styled.div`
  color: var(--ec-text);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const PublicActions = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  flex-shrink: 0;

  @media screen and (max-width: 1024px) {
    gap: 14px;
  }
`;

export const PublicHeaderLanguage = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: inline-flex;
    align-items: center;
    padding: 4px;
    border-radius: 999px;
    background: rgba(17, 24, 39, 0.04);
  }
`;

export const PublicLogin = styled(Link)`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    color: var(--ec-primary);
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const PublicCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 28px;
  border-radius: 10px;
  background: var(--ec-primary);
  color: #fff;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 8px 18px rgba(254, 208, 1, 0.22);
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--ec-primary);
    color: #fff;
    transform: translateY(-1px);
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const PublicHamburger = styled.button`
  display: none;
  border: none;
  background: transparent;
  color: var(--ec-text);
  font-size: 1.8rem;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PublicMobilePanel = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    border-top: 1px solid rgba(17, 24, 39, 0.08);
    background: var(--ec-bg);
    padding: 16px 24px 22px;
  }
`;

export const PublicMobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PublicMobileLanguage = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 4px 0 14px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  }
`;

export const PublicMobileLanguageLabel = styled.span`
  color: var(--ec-text-muted);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

export const PublicLanguageToggleGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.04);
`;

export const PublicLanguageToggle = styled.button`
  border: none;
  background: ${({ $active }) => ($active ? "#FED001" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#111827")};
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const PublicMobileLink = styled(Link)`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const PublicMobileAnchor = styled.a`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;

  &:hover {
    color: var(--ec-primary);
  }
`;
