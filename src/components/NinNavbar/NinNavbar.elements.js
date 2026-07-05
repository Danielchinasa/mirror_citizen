import styled from "styled-components";
import { Container } from "../../globalStyles";
import { Link } from "react-router-dom";

export const NinNav = styled.nav`
  background: var(--ec-bg);
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

export const NinNavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const NinNavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 40px;

  @media screen and (max-width: 768px) {
    display: ${({ click }) => (click ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    background: var(--ec-bg);
    padding: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    gap: 0;
  }
`;

export const NinNavItem = styled.li`
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 12px 0;
  }
`;

export const NinNavLink = styled.a`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--ec-primary);
  }

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const NinNavLinkRouter = styled(Link)`
  color: var(--ec-text);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--ec-primary);
  }

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const NinCtaButton = styled(Link)`
  background-color: var(--ec-primary);
  color: #fff;
  font-family: Arial, sans-serif;
  font-weight: 900;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  white-space: nowrap;

  &:hover {
    background-color: #FF4D4F;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NinHamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
