import React from "react";
import styled from "styled-components";
import appleImage from "../../images/Apple.png";

const AppleButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: white;
  color: #000000;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  img {
    margin-right: 10px;
    height: 24px;
  }
`;

function AppleSignInButton({ onClick }) {
  return (
    <AppleButton
      onClick={onClick}
      style={{ borderColor: "#000000", borderRadius: "8px" }}
    >
      <img src={appleImage} alt="Apple logo" />
      Log in with Apple
    </AppleButton>
  );
}

export default AppleSignInButton;
