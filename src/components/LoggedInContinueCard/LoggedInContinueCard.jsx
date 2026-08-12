import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaArrowRight, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { logout } from "../../redux/actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
  min-height: 300px;
  padding: 16px 0;

  @media screen and (max-width: 600px) {
    min-height: auto;
    padding: 24px 0;
  }
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fffbe6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  > svg {
    font-size: 34px;
    color: #b38b00;
  }
`;

const CheckBadge = styled.div`
  position: absolute;
  right: -4px;
  bottom: -2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #16a34a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--ec-bg);

  svg {
    font-size: 12px;
  }
`;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-heading);
  margin: 0;
`;

const Sub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 6px 0 20px;
  overflow-wrap: anywhere;
`;

const ContinueLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fbcb19;
  color: #fff;
  border-radius: 8px;
  padding: 12px 28px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #09c93a;
    color: #fff;
    transform: translateY(-1px);
  }

  svg {
    font-size: 14px;
  }
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  margin-top: 14px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-faint);
  text-decoration: underline;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #b38b00;
  }
`;

const LoggedInContinueCard = ({ redirectTo = "/" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user) || {};

  const displayName =
    user.firstName || user.lastName
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : user.fullName || user.email || "";

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Wrapper>
      <AvatarWrap>
        <FaUserCircle />
        <CheckBadge>
          <FaCheckCircle />
        </CheckBadge>
      </AvatarWrap>
      <Title>You're logged in</Title>
      {displayName && <Sub>{displayName}</Sub>}
      <ContinueLink to={redirectTo}>
        Continue to Verification
        <FaArrowRight />
      </ContinueLink>
      <LogoutBtn type="button" onClick={handleLogout}>
        Not you? Log out
      </LogoutBtn>
    </Wrapper>
  );
};

export default LoggedInContinueCard;
