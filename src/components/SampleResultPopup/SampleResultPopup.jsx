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
import ninSampleAvatar from "../../images/nin_sample_avatar.png";

const sampleData = {
  nin: {
    subtitle: "See an example of a NIN verification result.",
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
    icon: FaUserCircle,
    fields: [
      ["Phone Number", "0803 *** 5678"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Status", "Active", "verified"],
      ["Region", "Lagos"],
      ["Confidence Score", "98%"],
      ["Reference", "ECPH202505251245ABC0"],
    ],
  },
  business: {
    subtitle: "See an example of a company verification result.",
    icon: FaBuilding,
    fields: [
      ["Company Name", "ADEBAYO GLOBAL SERVICES LTD"],
      ["RC Number", "RC 1234567"],
      ["Status", "ACTIVE / VERIFIED", "verified"],
      ["Company Type", "Private Limited Liability"],
      ["Registered Address", "12 Adeola Odeku Street, Victoria Island, Lagos"],
      ["Directors", "3"],
      ["Date Incorporated", "12 Feb 2019"],
      ["Confidence Score", "98%"],
    ],
  },
  financial: {
    subtitle: "See an example of a Credit Profile result.",
    image: defaultDp,
    fields: [
      ["Customer Name", "ADEBAYO CHINEDU MICHAEL"],
      ["BVN", "1234 5678 901**"],
      ["Report Date", "16 May 2024"],
      ["Credit Score", "742"],
      ["Rating", "Good", "verified"],
      ["Active Loans", "2"],
      ["Repayment Status", "On track", "verified"],
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
  background: #fff;
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
  color: #354138;
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
  color: #667085;
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #354138;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f9fafb;
    color: #09c93a;
  }
`;

const ResultCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
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
  background: #e6f9ed;
  color: #09c93a;
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
  background: #fff;
  border: 1px solid #edf0f2;
  border-radius: 8px;
  padding: 12px;
`;

const ResultLabel = styled.div`
  margin-bottom: 5px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #8a94a6;
  text-transform: uppercase;
`;

const ResultValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #344054;
  overflow-wrap: anywhere;
`;

const VerifiedValue = styled(ResultValue)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #09c93a;

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
  color: #667085;

  svg {
    color: #09c93a;
    flex-shrink: 0;
  }
`;

export default SampleResultPopup;
