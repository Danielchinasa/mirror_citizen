import React, { useEffect } from "react";
import styled from "styled-components";
import {
  FaBuilding,
  FaCar,
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import defaultDp from "../../images/defaultDp.png";
import ninSampleAvatar from "../../images/BW7A9844.png";
import financialSampleAvatar from "../../images/avatar2.jpg";
import phoneSampleAvatar from "../../images/avatar1.jpg";

const sampleData = {
  nin: {
    subtitle: "See an example of a National ID result.",
    image: ninSampleAvatar,
    fields: [
      ["Full Name", "DANIEL CHINASA OKORO"],
      ["First Name", "DANIEL"],
      ["Middle Name", "CHINASA"],
      ["Surname", "OKORO"],
      ["NIN", "7348 9021 5**"],
      ["Phone Number", "0806 *** 4821"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Date of Birth", "24-08-1992"],
      ["Gender", "Male"],
      ["Birth Country", "Nigeria"],
      ["Residence Address", "14 ADETOKUNBO STREET, IKEJA"],
      ["Next of Kin First Name", "FUNMI"],
      ["Next of Kin Middle Name", "KEMI"],
      ["Next of Kin Town", "ABEOKUTA"],
      ["Next of Kin LGA", "Abeokuta South"],
      ["Next of Kin Address", "22 UNITY AVENUE, OKE ILEWO"],
    ],
  },
  phone: {
    subtitle: "See an example of a phone number verification result.",
    image: phoneSampleAvatar,
    fields: [
      ["Full Name", "ADAOBI CHIOMA NWOSU"],
      ["First Name", "ADAOBI"],
      ["Middle Name", "CHIOMA"],
      ["Surname", "NWOSU"],
      ["NIN", "5923 4107 8**"],
      ["Phone Number", "0803 *** 5678"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Date of Birth", "08-03-1994"],
      ["Gender", "Female"],
      ["Birth Country", "Nigeria"],
      ["Residence Address", "7 OKAFOR CLOSE, FESTAC TOWN"],
      ["Next of Kin First Name", "CHUKWUEMEKA"],
      ["Next of Kin Middle Name", "TOCHUKWU"],
      ["Next of Kin Town", "ONITSHA"],
      ["Next of Kin LGA", "Onitsha North"],
      ["Next of Kin Address", "15 MARKET ROAD, ONITSHA"],
    ],
  },
  business: {
    subtitle: "See an example of a company verification result.",
    icon: FaBuilding,
    fields: [
      ["Company Name", "BIOSEC SOLUTIONS LIMITED"],
      ["RC Number", "RC 456823"],
      ["CAC ID", "2198456"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Classification", "Private Limited Liability"],
      ["Registration Date", "08 May 2015"],
      ["Verification Date", "14 Mar 2025"],
    ],
    stakeholders: [
      {
        name: "BABATUNDE ADEWALE OKONKWO",
        role: "Director",
        nationality: "Nigerian",
      },
      {
        name: "CHIDINMA GRACE OBIORA",
        role: "Director / Shareholder",
        nationality: "Nigerian",
      },
      {
        name: "ROTIMI FEMI ADEYEMI",
        role: "Shareholder",
        nationality: "Nigerian",
      },
    ],
  },
  financial: {
    subtitle: "See an example of a Credit Profile result.",
    image: financialSampleAvatar,
    fields: [
      ["Customer Name", "CHIJIOKE OLUWASEUN ADEBAYO"],
      ["BVN", "2234 5678 9**"],
      ["Gender", "Male"],
      ["Phone Number", "0802 *** 7654"],
      ["Address", "45 Awolowo Road, Ikoyi, Lagos"],
      ["Report Date", "14 Mar 2025"],
      ["Credit Score", "718"],
      ["Rating", "Good", "verified"],
      ["CRC", "Success", "verified"],
      ["First Central", "Success", "verified"],
      ["Credit Registry", "Success", "verified"],
      ["Bureaus Checked", "3"],
    ],
  },
  vehicle: {
    subtitle: "See an example of a vehicle verification report.",
    icon: FaCar,
    fields: [
      ["Plate Number", "ABC-123XY"],
      ["VIN", "******5678"],
      ["Make / Model", "Toyota Corolla"],
      ["Year", "2018"],
      ["Ownership Status", "VERIFIED", "verified"],
      ["Accident History", "No major records found"],
      ["Theft / Watchlist Status", "CLEAR", "verified"],
    ],
  },
};

const SampleResultPopup = ({ isOpen, onClose, type = "nin" }) => {
  const sample = sampleData[type] || sampleData.nin;
  const Icon = sample.icon;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-result-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <div>
            <TitleRow>
              <Title id="sample-result-title">Sample result</Title>
              <Badge>This is a sample only</Badge>
            </TitleRow>
            <Subtitle>{sample.subtitle}</Subtitle>
          </div>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <FaTimes />
          </CloseButton>
        </Header>

        <ResultCard>
          <Top>
            <Avatar>
              {sample.image ? (
                <img src={sample.image} alt="Sample person" />
              ) : (
                Icon && <Icon />
              )}
            </Avatar>
            <ResultGrid>
              {sample.fields.map(([label, value, status]) => (
                <ResultField key={label}>
                  <ResultLabel>{label}</ResultLabel>
                  {status === "verified" ? (
                    <VerifiedValue>
                      {value} <FaCheckCircle />
                    </VerifiedValue>
                  ) : (
                    <ResultValue>{value}</ResultValue>
                  )}
                </ResultField>
              ))}
            </ResultGrid>
          </Top>
          {sample.stakeholders && (
            <StakeholderSection>
              <StakeholderSectionTitle>Stakeholders</StakeholderSectionTitle>
              <StakeholderTable>
                <StakeholderRow $header>
                  <StakeholderCell $header>Name</StakeholderCell>
                  <StakeholderCell $header>Role</StakeholderCell>
                  <StakeholderCell $header>Nationality</StakeholderCell>
                </StakeholderRow>
                {sample.stakeholders.map((s, i) => (
                  <StakeholderRow key={i}>
                    <StakeholderCell>{s.name}</StakeholderCell>
                    <StakeholderCell>{s.role}</StakeholderCell>
                    <StakeholderCell>{s.nationality}</StakeholderCell>
                  </StakeholderRow>
                ))}
              </StakeholderTable>
            </StakeholderSection>
          )}
        </ResultCard>

        <Disclaimer>
          <FaInfoCircle />
          Results are based on data available at the time of verification.
        </Disclaimer>
      </Dialog>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(12, 18, 16, 0.58);
`;

const Dialog = styled.div`
  width: min(760px, 100%);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: var(--ec-bg);
  border-radius: 12px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--ec-heading);
`;

const Badge = styled.span`
  background: #fff7e6;
  color: #a15c00;
  border: 1px solid #ffe0a3;
  border-radius: 999px;
  padding: 5px 10px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-muted);
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  background: var(--ec-bg);
  color: var(--ec-heading);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: var(--ec-bg-secondary);
    color: #dd0201;
  }
`;

const ResultCard = styled.div`
  background: var(--ec-bg-secondary);
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  padding: 18px;
`;

const Top = styled.div`
  display: flex;
  gap: 18px;

  @media screen and (max-width: 560px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Avatar = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: #fdecec;
  color: #dd0201;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 36px;
  }
`;

const ResultGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media screen and (max-width: 560px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

const ResultField = styled.div`
  min-width: 0;
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  padding: 12px;
`;

const ResultLabel = styled.div`
  margin-bottom: 5px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: var(--ec-text-faint);
  text-transform: uppercase;
`;

const ResultValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--ec-text);
  overflow-wrap: anywhere;
`;

const VerifiedValue = styled(ResultValue)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #dd0201;

  svg {
    font-size: 12px;
  }
`;

const Disclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);

  svg {
    color: #dd0201;
    flex-shrink: 0;
  }
`;

const StakeholderSection = styled.div`
  margin-top: 16px;
  border-top: 1px solid var(--ec-border);
  padding-top: 14px;
`;

const StakeholderSectionTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--ec-heading);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const StakeholderTable = styled.div`
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  overflow: hidden;
`;

const StakeholderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr;
  background: ${(props) => (props.$header ? "#f4f7f5" : "#fff")};
  border-bottom: 1px solid var(--ec-border);

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StakeholderCell = styled.div`
  padding: 9px 12px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: ${(props) => (props.$header ? "800" : "600")};
  color: ${(props) => (props.$header ? "#8a94a6" : "#344054")};
  text-transform: ${(props) => (props.$header ? "uppercase" : "none")};
  overflow-wrap: anywhere;

  @media screen and (max-width: 480px) {
    &:last-child {
      display: none;
    }
  }
`;

export default SampleResultPopup;
