import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";

const ContinueWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 10px 0 6px;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--ec-primary-bg);
  color: var(--ec-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 34px;
  }
`;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0;
`;

const Sub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0;
`;

const SignedInAs = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--ec-primary);
  background: var(--ec-primary-bg);
  padding: 6px 14px;
  border-radius: 999px;

  svg {
    font-size: 13px;
  }
`;

const ContinueBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  background: var(--ec-primary);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 12px 32px;
  border-radius: 10px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: var(--ec-primary-hover);
    color: #fff;
  }
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: var(--ec-text);
  }
`;

const LoggedInContinueCard = ({ redirectTo }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const user = useSelector((state) => state.user);

  const firstName =
    userDetails?.firstName || user?.firstName || user?.name || "";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ContinueWrap>
      <Avatar>
        <FaUserCircle />
      </Avatar>
      <Title>Welcome back!</Title>
      <Sub>You&rsquo;re signed in. Continue your verification.</Sub>
      {firstName && (
        <SignedInAs>
          <FaCheckCircle /> Signed in as {firstName}
        </SignedInAs>
      )}
      <ContinueBtn to={redirectTo}>
        Continue to Verification <FaArrowRight />
      </ContinueBtn>
      <LogoutBtn type="button" onClick={handleLogout}>
        Not you? Log out
      </LogoutBtn>
    </ContinueWrap>
  );
};

export default LoggedInContinueCard;
