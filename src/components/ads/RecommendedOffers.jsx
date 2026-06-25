import React from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

const OFFERS = [
  {
    title: "Open a Digital Bank Account",
    description: "Zero balance accounts in minutes.",
    link: "#",
  },
  {
    title: "Personal Loan Offers",
    description: "Compare loan offers from trusted lenders.",
    link: "#",
  },
  {
    title: "Affordable Health Insurance",
    description: "Protect your health and your family.",
    link: "#",
  },
];

const RecommendedOffers = ({ variant }) => {
  return (
    <Wrapper $variant={variant}>
      <Header>
        <HeaderLeft>
          <Title>Recommended for you</Title>
          <Subtitle>
            Use your verified identity to access trusted services
          </Subtitle>
          <SubSubtitle>
            Explore partner offers that can help you achieve more.
          </SubSubtitle>
        </HeaderLeft>
      </Header>

      <OffersGrid>
        {OFFERS.map((offer, i) => (
          <OfferCard key={i}>
            <OfferTitle>{offer.title}</OfferTitle>
            <OfferDesc>{offer.description}</OfferDesc>
            <OfferLink
              href={offer.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Offers <FaArrowRight style={{ fontSize: 11 }} />
            </OfferLink>
          </OfferCard>
        ))}
      </OffersGrid>

      <Disclaimer>Trusted partners only. We may earn a commission.</Disclaimer>
    </Wrapper>
  );
};

export default RecommendedOffers;

/* ─── Styled Components ─── */

const Wrapper = styled.div`
  border: 1.5px solid
    ${({ $variant }) => ($variant === "blue" ? "#3b82f6" : "#02831C")};
  border-radius: 14px;
  padding: 28px 28px 20px;
  margin-top: 32px;
  margin-bottom: 40px;
  background: ${({ $variant }) =>
    $variant === "green"
      ? "#f0fdf4"
      : $variant === "blue"
        ? "#eff6ff"
        : "#fff"};

  @media screen and (max-width: 768px) {
    padding: 20px 16px 16px;
    margin-top: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div``;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #354138;
  margin: 0 0 4px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Subtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #555;
  margin: 0 0 2px;
  font-weight: 600;
`;

const SubSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #999;
  margin: 0;
`;

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OfferCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
`;

const OfferTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #333;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const OfferDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  margin: 0;
  line-height: 1.5;
`;

const OfferLink = styled.a`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #02831c;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;

  &:hover {
    color: #02831c;
    text-decoration: none;
  }
`;

const Disclaimer = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: #bbb;
  margin: 16px 0 0;
  text-align: left;
`;
