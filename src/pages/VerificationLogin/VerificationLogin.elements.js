import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  background: var(--ec-bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LoginNav = styled.nav`
  background: var(--ec-bg);
  border-bottom: 1px solid var(--ec-border-light);
  padding: 16px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    padding: 14px 20px;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;

  img {
    height: 32px;
    width: auto;
    object-fit: contain;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NavLink = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--ec-text-secondary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f9fafb 0%, #fef2f2 50%, #fdecec 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -120px;
    right: -120px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(220, 5, 2, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(220, 5, 2, 0.06) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(220, 5, 2, 0.12);
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow:
    0 8px 32px rgba(220, 5, 2, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  opacity: 0;
  animation: ${fadeSlideUp} 0.5s ease-out 0.1s forwards;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 480px) {
    padding: 32px 20px;
  }
`;

export const LoginTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: var(--ec-text);
  margin: 0 0 4px;
  text-align: center;
`;

export const LoginSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0 0 28px;
  text-align: center;
`;

export const SSOGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 0;
`;

export const SSOButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  background: var(--ec-bg);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;

  &:hover {
    background: var(--ec-bg-secondary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  svg {
    font-size: 20px;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-faint);

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--ec-border);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--ec-text-secondary);
  margin-bottom: 6px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--ec-input-placeholder);
  }

  &:focus {
    border-color: var(--ec-primary);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--ec-text-faint);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);
  cursor: pointer;
`;

export const ForgotLink = styled(Link)`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-primary);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background: var(--ec-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #FF4D4F;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const RegisterText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  text-align: center;
  margin: 16px 0 0;

  a {
    color: var(--ec-primary);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorAlert = styled.div`
  background: var(--ec-error-bg);
  border: 1px solid var(--ec-error-border);
  color: var(--ec-error-text);
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 10;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--ec-border);
  border-top-color: var(--ec-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
