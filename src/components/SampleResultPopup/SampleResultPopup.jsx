import React, { useEffect } from "react";
import styled from "styled-components";
import {
  FaBuilding,
  FaCar,
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaUserCircle,
  FaArrowRight,
  FaSearch,
  FaWrench,
  FaChartBar,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaUserFriends,
  FaExclamationTriangle,
  FaFileAlt,
  FaShieldAlt,
  FaPalette,
  FaCogs,
  FaGasPump,
  FaCarSide,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import VehicleSampleResult from "./VehicleSampleResult/VehicleSampleResult";
import ninSampleAvatar from "../../images/BW7A9844.png";
import financialSampleAvatar from "../../images/avatar2.jpg";
import phoneSampleAvatar from "../../images/avatar1.jpg";
import vehicleSampleAvatar from "../../images/cieana.jpeg";
import { useLocale } from "../../components/LocaleProvider";

const subtitleKeys = {
  nin: "sample.subtitle.nin",
  phone: "sample.subtitle.phone",
  business: "sample.subtitle.business",
  financial: "sample.subtitle.financial",
  vehicle: "sample.subtitle.vehicle",
  "business-name": "sample.subtitle.business",
  bvn: "sample.subtitle.financial",
  nin_ug: "sample.subtitle.nin",
  vehicle_ug: "sample.subtitle.vehicle",
  alien: "sample.subtitle.alien",
};

const fieldLabelKeys = {
  "Full Name": "sample.field.fullName",
  "First Name": "sample.field.firstName",
  "Middle Name": "sample.field.middleName",
  Surname: "sample.field.surname",
  NIN: "sample.field.nin",
  "Phone Number": "sample.field.phoneNumber",
  "Verification Status": "sample.field.verificationStatus",
  "Date of Birth": "sample.field.dateOfBirth",
  Gender: "sample.field.gender",
  "Birth Country": "sample.field.birthCountry",
  "Residence Address": "sample.field.residenceAddress",
  "Alien Card Number": "sample.field.alienCardNumber",
  Nationality: "sample.field.nationality",
  "Next of Kin First Name": "sample.field.nokFirstName",
  "Next of Kin Middle Name": "sample.field.nokMiddleName",
  "Next of Kin Town": "sample.field.nokTown",
  "Next of Kin LGA": "sample.field.nokLga",
  "Next of Kin Address": "sample.field.nokAddress",
  "Company Name": "sample.field.companyName",
  "RC Number": "sample.field.rcNumber",
  "CAC ID": "sample.field.cacId",
  Classification: "sample.field.classification",
  "Registration Date": "sample.field.registrationDate",
  "Verification Date": "sample.field.verificationDate",
  "Customer Name": "sample.field.customerName",
  BVN: "sample.field.bvn",
  Address: "sample.field.address",
  "Report Date": "sample.field.reportDate",
  "Credit Score": "sample.field.creditScore",
  Rating: "sample.field.rating",
  CRC: "sample.field.crc",
  "First Central": "sample.field.firstCentral",
  "Credit Registry": "sample.field.creditRegistry",
  "Bureaus Checked": "sample.field.bureausChecked",
  "Plate Number": "sample.field.plateNumber",
  VIN: "sample.field.vin",
  "Make / Model": "sample.field.makeModel",
  Year: "sample.field.year",
  "Ownership Status": "sample.field.ownershipStatus",
  "Accident History": "sample.field.accidentHistory",
  "Theft / Watchlist Status": "sample.field.watchlistStatus",
};

const statusValueKeys = {
  VERIFIED: "sample.value.verified",
  CLEAR: "sample.value.clear",
  "No major records found": "sample.value.noRecords",
};

const stakeholderRoleKeys = {
  Director: "sample.stakeholder.director",
  "Director / Shareholder": "sample.stakeholder.directorShareholder",
  Shareholder: "sample.stakeholder.shareholder",
};

const nationalityKeys = {
  Nigerian: "sample.stakeholder.nigerian",
};

const sampleData = {
  nin: {
    image: ninSampleAvatar,
    fields: [
      ["First Name", "David "],
      ["Middle Name", "Kiwanuka"],
      ["Surname", "Ssemakula"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Date of Birth", "24-08-1992"],
      ["Gender", "Male"],
      ["Birth Country", "Uganda"],
    ],
  },
  phone: {
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
    image: vehicleSampleAvatar,
    banner: true,
    icon: FaCar,
    fields: [
      ["Plate Number", "ABC-123XY"],
      ["VIN", "9846355678"],
      ["Make / Model", "Toyota Corolla"],
      ["Year", "2018"],
      ["Ownership Status", "VERIFIED", "verified"],
      ["Accident History", "No major records found"],
      ["Theft / Watchlist Status", "CLEAR", "verified"],
    ],
  },
  alien: {
    image: ninSampleAvatar,
    fields: [
      ["Full Name", "Grace Ojocheneimi David"],
      ["Alien Card Number", "ALN 4383 2856 233"],
      ["Nationality", "Nigerian"],
      ["Date of Birth", "15-03-1994"],
      ["Gender", "Female"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Residence Address", "12 Riverside Drive, Kampala"],
    ],
  },
};

// VerifyPage subtypes that reuse an existing sample design
sampleData["business-name"] = sampleData.business;
sampleData.bvn = sampleData.financial;
sampleData.nin_ug = sampleData.nin;
sampleData.vehicle_ug = sampleData.vehicle;

export const SampleResultContent = ({ type = "nin" }) => {
  const { t } = useLocale();
  const sample = sampleData[type] || sampleData.nin;
  const Icon = sample.icon;

  return (
    <>
      <ResultCard>
        {sample.banner && sample.image && (
          <PhotoBanner>
            <img src={sample.image} alt="Sample vehicle" />
          </PhotoBanner>
        )}
        <Top>
          {!sample.banner && (
            <Avatar>
              {sample.image ? (
                <img src={sample.image} alt="Sample person" />
              ) : (
                Icon && <Icon />
              )}
            </Avatar>
          )}
          <ResultGrid>
            {sample.fields.map(([label, value, status]) => (
              <ResultField key={label}>
                <ResultLabel>{t(fieldLabelKeys[label] || label)}</ResultLabel>
                {status === "verified" ? (
                  <VerifiedValue>
                    {t(statusValueKeys[value] || value)} <FaCheckCircle />
                  </VerifiedValue>
                ) : (
                  <ResultValue>
                    {t(statusValueKeys[value] || value)}
                  </ResultValue>
                )}
              </ResultField>
            ))}
          </ResultGrid>
        </Top>
        {sample.stakeholders && (
          <StakeholderSection>
            <StakeholderSectionTitle>
              {t("sample.stakeholder.title")}
            </StakeholderSectionTitle>
            <StakeholderTable>
              <StakeholderRow $header>
                <StakeholderCell $header>
                  {t("sample.stakeholder.name")}
                </StakeholderCell>
                <StakeholderCell $header>
                  {t("sample.stakeholder.role")}
                </StakeholderCell>
                <StakeholderCell $header>
                  {t("sample.stakeholder.nationality")}
                </StakeholderCell>
              </StakeholderRow>
              {sample.stakeholders.map((s, i) => (
                <StakeholderRow key={i}>
                  <StakeholderCell>{s.name}</StakeholderCell>
                  <StakeholderCell>
                    {t(stakeholderRoleKeys[s.role] || s.role)}
                  </StakeholderCell>
                  <StakeholderCell>
                    {t(nationalityKeys[s.nationality] || s.nationality)}
                  </StakeholderCell>
                </StakeholderRow>
              ))}
            </StakeholderTable>
          </StakeholderSection>
        )}
      </ResultCard>

      <Disclaimer>
        <FaInfoCircle />
        {t("sample.disclaimer")}
      </Disclaimer>
    </>
  );
};

const SampleResultPopup = ({ isOpen, onClose, type = "nin" }) => {
  const { t } = useLocale();
  const sample = sampleData[type] || sampleData.nin;
  const subtitleKey = subtitleKeys[type] || subtitleKeys.nin;
  const isVehicle = type === "vehicle" || type === "vehicle_ug";

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
        $isVehicle={isVehicle}
      >
        {isVehicle ? (
          <VehicleSampleResult onClose={onClose} />
        ) : (
          <SampleResultContent type={type} />
        )}
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
  width: ${(props) =>
    props.$isVehicle ? "min(1100px, 100%)" : "min(760px, 100%)"};
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 24px;
  }
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
    color: #dd0201;
  }
`;

const ResultCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
`;

const PhotoBanner = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #fff;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  @media screen and (max-width: 560px) {
    height: 120px;
  }
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
  color: #667085;

  svg {
    color: #dd0201;
    flex-shrink: 0;
  }
`;

const StakeholderSection = styled.div`
  margin-top: 16px;
  border-top: 1px solid #edf0f2;
  padding-top: 14px;
`;

const StakeholderSectionTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #354138;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const StakeholderTable = styled.div`
  border: 1px solid #edf0f2;
  border-radius: 8px;
  overflow: hidden;
`;

const StakeholderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr;
  background: ${(props) => (props.$header ? "#f4f7f5" : "#fff")};
  border-bottom: 1px solid #edf0f2;

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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MainCard = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  width: 280px;
  background: #f9fafb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e5e7eb;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const ImageCaption = styled.span`
  margin-top: 8px;
  font-size: 11px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 99px;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CarTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  font-family: "Poppins", sans-serif;
`;

const SpecsGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SpecBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SpecLabel = styled.span`
  font-size: 11px;
  color: #6b7280;
  font-weight: 800;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SpecValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  width: 100%;
  margin-bottom: 16px;
`;

const FeaturesRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
  font-weight: 600;

  svg {
    color: #9ca3af;
    font-size: 16px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  font-family: "Poppins", sans-serif;
`;

const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

const TrustedData = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4b5563;
  font-weight: 600;

  svg {
    color: var(--ec-primary);
  }
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  background: ${(props) =>
    props.status === "warning" ? "#fffbeb" : "var(--ec-bg-primary-light)"};
  border: 1px solid
    ${(props) =>
      props.status === "warning" ? "#fef08a" : "var(--ec-cta-shield)"};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  ${(props) =>
    props.$wide &&
    `
    grid-column: span 2;
    @media screen and (max-width: 640px) {
      grid-column: span 1;
    }
  `}
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) =>
    props.status === "warning" ? "#fef3c7" : "var(--ec-bg-primary-muted)"};
  color: ${(props) =>
    props.status === "warning" ? "#d97706" : "var(--ec-primary)"};
  font-size: 18px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardLabel = styled.span`
  font-size: 13px;
  font-weight: 800;
  font-family: "Poppins", sans-serif;
  color: #111827;
`;

const CardValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) =>
    props.status === "warning" ? "#d97706" : "var(--ec-primary)"};
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 12px;
  }
`;

const CardDesc = styled.span`
  font-size: 11px;
  color: #6b7280;
  line-height: 1.4;
`;

const WhyMattersSection = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MattersRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const MatterItem = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const MatterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MatterTitle = styled.span`
  font-size: 14px;
  font-weight: 800;
  font-family: "Poppins", sans-serif;
  color: #111827;
`;

const MatterDesc = styled.span`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
`;

const MatterDivider = styled.div`
  width: 1px;
  background: #e5e7eb;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const FooterDisclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;

  svg {
    color: var(--ec-primary);
    font-size: 16px;
    flex-shrink: 0;
  }
`;

const FooterActions = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: 768px) {
    justify-content: stretch;
    > button {
      flex: 1;
    }
  }
`;

const CloseBtn = styled.button`
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 8px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #f9fafb;
  }
`;

const VerifyBtn = styled.button`
  padding: 10px 20px;
  background: var(--ec-primary);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background: var(--ec-primary-hover);
  }
`;

const VehicleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TrustBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--ec-bg-primary-light);
  border: 1px solid var(--ec-cta-shield);
  padding: 8px 16px;
  border-radius: 8px;

  svg {
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    strong {
      font-size: 13px;
      color: var(--ec-primary-dark);
    }

    span {
      font-size: 11px;
      color: var(--ec-primary-dark);
    }
  }
`;

export default SampleResultPopup;
