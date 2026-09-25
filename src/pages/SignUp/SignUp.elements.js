import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SignUpShell = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
  position: relative;
  background: var(--ec-login-bg, var(--ec-bg-secondary));

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: 420px;
    height: 420px;
    right: -150px;
    top: -130px;
    background: radial-gradient(circle, rgba(221, 2, 1, 0.1), transparent 70%);
  }

  &::after {
    width: 320px;
    height: 320px;
    left: -110px;
    bottom: -120px;
    background: radial-gradient(circle, rgba(221, 2, 1, 0.07), transparent 70%);
  }

  @media screen and (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const SignUpCard = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  padding: 40px 36px 32px;
  border: 1px solid var(--ec-primary, #dd0201);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: var(--ec-login-card-bg, rgba(255, 255, 255, 0.8));
  background: var(--ec-login-card-bg, var(--ec-bg));
  box-shadow:
    0 8px 32px rgba(221, 2, 1, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  animation: ${fadeSlideUp} 0.5s ease-out 0.1s both;

  @media screen and (max-width: 480px) {
    padding: 32px 20px 24px;
  }
`;

export const Eyebrow = styled.p`
  margin: 0 0 8px;
  color: var(--ec-primary);
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--ec-text);
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
`;

export const Subtitle = styled.p`
  max-width: 380px;
  margin: 8px auto 28px;
  color: var(--ec-text-muted);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  line-height: 1.55;
  text-align: center;
`;

export const AccountOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border: 1px solid
    ${({ $selected }) => ($selected ? "var(--ec-primary)" : "var(--ec-border)")};
  border-radius: 12px;
  background: ${({ $selected }) =>
    $selected ? "var(--ec-primary-bg)" : "var(--ec-bg)"};
  color: var(--ec-text);
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: var(--ec-primary);
    box-shadow: 0 6px 16px rgba(221, 2, 1, 0.1);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(221, 2, 1, 0.25);
    outline-offset: 2px;
  }
`;

export const AccountIcon = styled.span`
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--ec-bg);
  border: 1px solid rgba(221, 2, 1, 0.12);

  img {
    width: 34px;
    height: 34px;
  }
`;

export const AccountCopy = styled.span`
  display: block;
  flex: 1;
`;

export const AccountTitle = styled.strong`
  display: block;
  margin-bottom: 3px;
  color: var(--ec-text);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
`;

export const AccountDescription = styled.span`
  display: block;
  color: var(--ec-text-muted);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  line-height: 1.45;
`;

export const SelectionMark = styled.span`
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  display: grid;
  place-items: center;
  border: 2px solid
    ${({ $selected }) => ($selected ? "var(--ec-primary)" : "var(--ec-border)")};
  border-radius: 50%;
  background: ${({ $selected }) =>
    $selected ? "var(--ec-primary)" : "transparent"};
  color: #fff;
  transition: all 0.2s ease;

  svg {
    font-size: 11px;
  }
`;

export const ContinueLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 24px;
  padding: 13px 18px;
  border-radius: 8px;
  background: var(--ec-primary);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--ec-primary-hover);
    color: #fff;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(221, 2, 1, 0.3);
    outline-offset: 2px;
  }
`;

export const SignInPrompt = styled.p`
  margin: 20px 0 0;
  color: var(--ec-text-muted);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  text-align: center;

  a {
    color: var(--ec-primary);
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 22px;
  color: var(--ec-text-secondary);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: var(--ec-primary);
  }
`;

export const FormTitle = styled.h1`
  margin: 0;
  color: var(--ec-text);
  font-family: "Poppins", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.25;
`;

export const FormSubtitle = styled.p`
  margin: 6px 0 6px;
  color: var(--ec-text-muted);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
`;

export const AppleLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  text-align: left;
  color: var(--ec-text);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const AppleInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid transparent;
  border-radius: 12px;
  margin-bottom: 24px;
  background: var(--ec-input-bg, rgba(0, 0, 0, 0.04));
  color: var(--ec-text);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 15px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    background: var(--ec-bg, #fff);
    border-color: var(--ec-primary, #dd0201);
    box-shadow: 0 0 0 4px rgba(221, 2, 1, 0.25);
  }
`;

export const AppleButton = styled.button`
  width: 100%;
  padding: 15px 24px;
  border: none;
  border-radius: 12px;
  background: ${({ disabled }) =>
    disabled ? "var(--ec-disabled, #d2d2d7)" : "var(--ec-primary, #DD0201)"};
  color: ${({ disabled }) => (disabled ? "#86868b" : "#fff")};
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  margin-top: 16px;

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.97)")};
  }

  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? "var(--ec-disabled, #d2d2d7)"
        : "var(--ec-primary-hover, #ff1a19)"};
  }
`;

export const PasswordHintList = styled.ul`
  margin: -16px 0 24px;
  padding-left: 20px;
  color: var(--ec-text-muted, #86868b);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 13px;
  line-height: 1.6;

  li {
    margin-bottom: 4px;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EyeIconContainer = styled.span`
  position: absolute;
  right: 16px;
  top: 15px;
  cursor: pointer;
  color: var(--ec-text-muted, #86868b);
  font-size: 18px;
  transition: color 0.2s ease;
  z-index: 10;

  &:hover {
    color: var(--ec-text, #1d1d1f);
  }
`;

export const PasswordHintItem = styled.li`
  margin-bottom: 6px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $valid }) =>
    $valid ? "var(--ec-success, #09c93a)" : "var(--ec-text-muted, #86868b)"};
  transition: color 0.3s ease;

  svg {
    font-size: 14px;
  }
`;
