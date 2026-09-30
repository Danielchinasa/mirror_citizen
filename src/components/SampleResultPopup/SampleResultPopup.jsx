import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowRight,
  FaCar,
  FaChartBar,
  FaBuilding,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaGasPump,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPalette,
  FaSearch,
  FaShieldAlt,
  FaTachometerAlt,
  FaTimes,
  FaTools,
  FaUserCircle,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import ninSampleAvatar from "../../images/dp.jpeg";
import financialSampleAvatar from "../../images/avatar2.jpg";
import phoneSampleAvatar from "../../images/avatar1.jpg";
import vehicleSampleAvatar from "../../images/cieana.jpeg";

export const sampleData = {
  nin: {
    subtitle: "See an example of a NIN verification result.",
    image: ninSampleAvatar,
    fields: [
      ["Full Name", "KUNLE BASHR CHINASA"],
      ["First Name", "KUNLE"],
      ["Middle Name", "BASHR"],
      ["Surname", "CHINASA"],
      ["NIN", "12345678910"],
      ["Phone Number", "08032222222"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Date of Birth", "24-08-1992"],
      ["Gender", "Male"],
      ["Birth Country", "Nigeria"],
      ["Residence Address", "14 ADETOKUNBO STREET, IKEJA"],
      ["Next of Kin Full Name", "MARY JACOBS"],
      ["Email", "my.email@email.com"],
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
      ["NIN", "12345678910"],
      ["Phone Number", "08032222222"],
      ["Verification Status", "VERIFIED", "verified"],
      ["Date of Birth", "08-03-1994"],
      ["Gender", "Female"],
      ["Birth Country", "Nigeria"],
      ["Residence Address", "7 OKAFOR CLOSE, FESTAC TOWN"],
      ["Next of Kin Full Name", "CHUKWUEMEKA"],
      ["Next of Kin Email", "my.email@email.com"],
      ["Next of Kin Town", "ONITSHA"],
      ["Next of Kin LGA", "Onitsha North"],
      ["Next of Kin Address", "15 MARKET ROAD, ONITSHA"],
    ],
  },
  business: {
    subtitle: "See an example of a company verification result.",
    icon: FaBuilding,
    fields: [
      ["Company Name", "Coca Cola Nigeria"],
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
      ["Phone Number", "0802 345 7654"],
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
    image: vehicleSampleAvatar,
    landscape: true,
    fields: [
      ["Plate Number", "ABC-123XY"],
      ["VIN", "89447585678"],
      ["Make / Model", "Toyota Sienna"],
      ["Year", "2018"],
      ["Ownership Status", "VERIFIED", "verified"],
      ["Accident History", "No major records found"],
      ["Theft / Watchlist Status", "CLEAR", "verified"],
    ],
  },
};

const vehicleHighlights = [
  {
    icon: FaUserCircle,
    title: "Ownership Status",
    value: "Verified",
    body: "Current ownership is valid and matches records.",
    tone: "success",
  },
  {
    icon: FaShieldAlt,
    title: "Theft / Watchlist Status",
    value: "Clear",
    body: "Not reported stolen and not on any watchlist.",
    tone: "success",
  },
  {
    icon: FaFileAlt,
    title: "Salvage / Rebuilt History",
    value: "No salvage record",
    body: "No salvage, rebuilt, or flood damage records found.",
    tone: "success",
  },
  {
    icon: FaExclamationTriangle,
    title: "Accident History",
    value: "1 minor accident reported",
    body: "1 minor accident in 2020. No major damage reported.",
    tone: "warning",
  },
  {
    icon: FaUsers,
    title: "Previous Owners",
    value: "3 previous owners",
    body: "Multiple owners may indicate higher usage.",
    tone: "warning",
  },
  {
    icon: FaTachometerAlt,
    title: "Odometer / Mileage Check",
    value: "89,450 km",
    body: "No rollback detected. Mileage appears consistent.",
    tone: "success",
  },
  {
    icon: FaWarehouse,
    title: "Usage History",
    value: "Personal use",
    body: "No commercial or rental use reported.",
    tone: "success",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Registration",
    value: "Lagos, Nigeria",
    body: "Current registration in Lagos, Nigeria.",
    tone: "success",
  },
  {
    icon: FaChartBar,
    title: "Estimated Market Value",
    value: "₦12,000,000 - ₦15,000,000",
    body: "Based on market data and comparable listings.",
    tone: "success",
    wide: true,
  },
  {
    icon: FaTools,
    title: "Open Recalls",
    value: "None found",
    body: "No open safety recalls for this vehicle.",
    tone: "success",
    wide: true,
  },
];

const whyVehicleMatters = [
  {
    icon: FaShieldAlt,
    title: "Avoid hidden accident history",
    body: "Know the true condition before you buy.",
  },
  {
    icon: FaUsers,
    title: "Confirm ownership trail",
    body: "See how many owners the vehicle has had.",
  },
  {
    icon: FaExclamationTriangle,
    title: "Detect salvage or flood risk",
    body: "Uncover title brands and major damage.",
    tone: "warning",
  },
  {
    icon: FaSearch,
    title: "Identify red flags early",
    body: "Spot issues before they become your problem.",
  },
];

export const SampleResultContent = ({ type = "nin" }) => {
  const sample = sampleData[type] || sampleData.nin;
  const Icon = sample.icon;

  const fields = sample.fields.map(([label, value, status]) => (
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
  ));

  return (
    <>
      <ResultCard>
        {sample.landscape ? (
          <ResultGrid>
            <Photo>
              <img src={sample.image} alt="Sample vehicle" />
            </Photo>
            {fields}
          </ResultGrid>
        ) : (
          <Top>
            <Avatar>
              {sample.image ? (
                <img src={sample.image} alt="Sample person" />
              ) : (
                Icon && <Icon />
              )}
            </Avatar>
            <ResultGrid>{fields}</ResultGrid>
          </Top>
        )}
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
    </>
  );
};

export const VehicleSampleReport = ({
  ctaLink = "/verify/vehicle",
  onClose,
  hideFooter,
}) => {
  const vehicle = sampleData.vehicle;

  return (
    <>
      <VehicleReportCard>
        <VehiclePhotoPanel>
          <img src={vehicle.image} alt="Sample Toyota Sienna" />
        </VehiclePhotoPanel>

        <VehicleSummary>
          <VehicleName>2018 Toyota Sienna</VehicleName>
          <VehicleSpecs>
            <VehicleSpec>
              <span>Plate Number</span>
              <strong>ABC-123XY</strong>
            </VehicleSpec>
            <VehicleSpec>
              <span>VIN</span>
              <strong>89447585678</strong>
            </VehicleSpec>
            <VehicleSpec>
              <span>Make / Model</span>
              <strong>Toyota Sienna</strong>
            </VehicleSpec>
            <VehicleSpec>
              <span>Year</span>
              <strong>2018</strong>
            </VehicleSpec>
          </VehicleSpecs>

          <VehicleAttributes>
            <VehicleAttribute>
              <FaCar /> Minivan
            </VehicleAttribute>
            <VehicleAttribute>
              <FaGasPump /> Gasoline
            </VehicleAttribute>
            <VehicleAttribute>
              <FaTools /> Automatic
            </VehicleAttribute>
            <VehicleAttribute>
              <FaPalette /> Red
            </VehicleAttribute>
          </VehicleAttributes>
        </VehicleSummary>
      </VehicleReportCard>

      <ReportIntro>
        <div>
          <SectionTitle>Report Highlights</SectionTitle>
          <SectionSub>
            Key information from your VIN verification report.
          </SectionSub>
        </div>
        <SourceNote>
          <FaCheckCircle />
          Data from trusted government &amp; industry sources
        </SourceNote>
      </ReportIntro>

      <HighlightGrid>
        {vehicleHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <HighlightCard key={item.title} $tone={item.tone} $wide={item.wide}>
              <HighlightIcon $tone={item.tone}>
                <Icon />
              </HighlightIcon>
              <HighlightCopy>
                <HighlightTitle>{item.title}</HighlightTitle>
                <HighlightValue $tone={item.tone}>
                  {item.value}
                  {item.tone === "success" && <FaCheckCircle />}
                </HighlightValue>
                <HighlightBody>{item.body}</HighlightBody>
              </HighlightCopy>
            </HighlightCard>
          );
        })}
      </HighlightGrid>

      <WhyPanel>
        <div>
          <SectionTitle>Why this matters</SectionTitle>
          <SectionSub>
            A VIN report gives you the facts you need to buy with confidence.
          </SectionSub>
        </div>
        <WhyGrid>
          {whyVehicleMatters.map((item) => {
            const Icon = item.icon;
            return (
              <WhyItem key={item.title} $tone={item.tone}>
                <WhyIcon $tone={item.tone}>
                  <Icon />
                </WhyIcon>
                <WhyCopy>
                  <WhyTitle>{item.title}</WhyTitle>
                  <WhyBody>{item.body}</WhyBody>
                </WhyCopy>
              </WhyItem>
            );
          })}
        </WhyGrid>
      </WhyPanel>

      {!hideFooter && (
        <VehicleFooter>
          <VehicleDisclaimer>
            <FaInfoCircle />
            This is a sample report. Results are based on data available at the
            time of verification and may vary for your vehicle.
          </VehicleDisclaimer>
          <FooterActions>
            <FooterSecondary type="button" onClick={onClose}>
              Close
            </FooterSecondary>
            <FooterPrimary to={ctaLink}>
              Verify Your Vehicle Now <FaArrowRight />
            </FooterPrimary>
          </FooterActions>
        </VehicleFooter>
      )}
    </>
  );
};

const SampleResultPopup = ({
  isOpen,
  onClose,
  type = "nin",
  ctaLink = "/verify/vehicle",
}) => {
  const sample = sampleData[type] || sampleData.nin;
  const isVehicle = type === "vehicle";

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
        $wide={isVehicle}
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
          {isVehicle && (
            <TrustBadge>
              <FaShieldAlt />
              <span>
                <strong>Trusted data. Safer purchases.</strong>
                Get the full report in seconds.
              </span>
            </TrustBadge>
          )}
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <FaTimes />
          </CloseButton>
        </Header>

        {isVehicle ? (
          <VehicleSampleReport ctaLink={ctaLink} onClose={onClose} />
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
  width: ${(props) => (props.$wide ? "min(1180px, 100%)" : "min(760px, 100%)")};
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: var(--ec-bg);
  border-radius: 12px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media screen and (max-width: 760px) {
    flex-wrap: wrap;
  }
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
    color: var(--ec-primary);
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 292px;
  margin-left: auto;
  padding: 12px 16px;
  border: 1px solid #bdeed3;
  border-radius: 10px;
  background: #e9fbf2;
  color: #213b34;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.25;

  svg {
    color: #0db14b;
    font-size: 30px;
    flex-shrink: 0;
  }

  strong {
    display: block;
    color: #17332e;
    font-weight: 900;
  }

  @media screen and (max-width: 760px) {
    order: 3;
    min-width: 0;
    width: 100%;
    margin-left: 0;
  }
`;

const VehicleReportCard = styled.div`
  display: grid;
  grid-template-columns: 330px minmax(0, 1fr);
  gap: 22px;
  padding: 16px;
  border: 1px solid #cfdde8;
  border-radius: 10px;
  background: linear-gradient(135deg, #ffffff 0%, #f7fbff 100%);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const VehiclePhotoPanel = styled.div`
  position: relative;
  min-height: 174px;
  border: 1px solid #d7e1ea;
  border-radius: 8px;
  overflow: hidden;
  background: #f6f8fa;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const VehiclePhotoCaption = styled.span`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(216, 222, 228, 0.92);
  color: #556070;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
`;

const VehicleSummary = styled.div`
  min-width: 0;
`;

const VehicleName = styled.h3`
  margin: 4px 0 16px;
  color: #07111f;
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 900;

  @media screen and (max-width: 560px) {
    font-size: 22px;
  }
`;

const VehicleSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #dfe6ee;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 14px;
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const VehicleSpec = styled.div`
  min-width: 0;
  padding: 0 22px;
  border-left: 1px solid #d9e1ea;

  &:first-child {
    padding-left: 0;
    border-left: none;
  }

  span {
    display: block;
    margin-bottom: 6px;
    color: #6f7a88;
    font-family: "Nunito", sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    display: block;
    color: #07111f;
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 900;
    overflow-wrap: anywhere;
  }

  @media screen and (max-width: 720px) {
    &:nth-child(odd) {
      padding-left: 0;
      border-left: none;
    }
  }

  @media screen and (max-width: 420px) {
    padding: 0;
    border-left: none;
  }
`;

const VehicleAttributes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  padding-top: 16px;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 12px;
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const VehicleAttribute = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 0 22px;
  border-left: 1px solid #d9e1ea;
  color: #07111f;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 800;

  &:first-child {
    padding-left: 0;
    border-left: none;
  }

  svg {
    color: #25445d;
    font-size: 23px;
    flex-shrink: 0;
  }

  @media screen and (max-width: 720px) {
    &:nth-child(odd) {
      padding-left: 0;
      border-left: none;
    }
  }

  @media screen and (max-width: 420px) {
    padding: 0;
    border-left: none;
  }
`;

const ReportIntro = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin: 20px 0 12px;

  @media screen and (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #15342f;
  font-family: "Poppins", sans-serif;
  font-size: 21px;
  line-height: 1.2;
  font-weight: 900;
`;

const SectionSub = styled.p`
  margin: 4px 0 0;
  color: #687585;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  line-height: 1.3;
`;

const SourceNote = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #5f6f7d;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 800;

  svg {
    color: #08b546;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 10px;
  min-height: 118px;
  padding: 14px;
  border: 1px solid
    ${(props) => (props.$tone === "warning" ? "#f4d89f" : "#ccebdd")};
  border-radius: 8px;
  background: ${(props) =>
    props.$tone === "warning"
      ? "linear-gradient(135deg, #fffaf0 0%, #fff7e9 100%)"
      : "linear-gradient(135deg, #eefcf5 0%, #f7fffb 100%)"};
  grid-column: ${(props) => (props.$wide ? "span 2" : "span 1")};

  @media screen and (max-width: 560px) {
    grid-column: span 1;
  }
`;

const HighlightIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${(props) => (props.$tone === "warning" ? "#fff1d8" : "#cdfadd")};
  color: ${(props) => (props.$tone === "warning" ? "#c96d00" : "#08a642")};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 26px;
  }
`;

const HighlightCopy = styled.div`
  min-width: 0;
`;

const HighlightTitle = styled.h4`
  margin: 2px 0 6px;
  color: #17332e;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 900;
`;

const HighlightValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  color: ${(props) => (props.$tone === "warning" ? "#d26700" : "#03a63c")};
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 900;
  overflow-wrap: anywhere;

  svg {
    font-size: 13px;
    flex-shrink: 0;
  }
`;

const HighlightBody = styled.p`
  margin: 0;
  color: #556575;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.25;
`;

const WhyPanel = styled.div`
  margin-top: 12px;
  padding: 14px 20px;
  border: 1px solid #ccebdd;
  border-radius: 8px;
  background: linear-gradient(135deg, #ecfbf5 0%, #f8fffc 100%);
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 12px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 14px;
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const WhyItem = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 12px;
  padding: 0 18px;
  border-left: 1px solid #c7d5dc;

  &:first-child {
    padding-left: 0;
    border-left: none;
  }

  @media screen and (max-width: 900px) {
    &:nth-child(odd) {
      padding-left: 0;
      border-left: none;
    }
  }

  @media screen and (max-width: 560px) {
    padding: 0;
    border-left: none;
  }
`;

const WhyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => (props.$tone === "warning" ? "#fff1d8" : "#cdfadd")};
  color: ${(props) => (props.$tone === "warning" ? "#c96d00" : "#08a642")};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 23px;
  }
`;

const WhyCopy = styled.div`
  min-width: 0;
`;

const WhyTitle = styled.h4`
  margin: 1px 0 4px;
  color: #17332e;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.15;
  font-weight: 900;
`;

const WhyBody = styled.p`
  margin: 0;
  color: #4f6271;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.25;
`;

const VehicleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;

  @media screen and (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const VehicleDisclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: #73808d;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  line-height: 1.35;

  svg {
    color: #08b546;
    flex-shrink: 0;
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;

  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;

const FooterSecondary = styled.button`
  min-width: 88px;
  height: 44px;
  border: 1px solid #cbd6df;
  border-radius: 7px;
  background: #ffffff;
  color: #17332e;
  box-shadow: 0 4px 12px rgba(9, 18, 28, 0.1);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: #f5f8fa;
  }
`;

const FooterPrimary = styled(Link)`
  min-width: 240px;
  height: 44px;
  padding: 0 18px;
  border-radius: 7px;
  background: #05b83f;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 18px rgba(5, 184, 63, 0.22);
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    background: #049f37;
    text-decoration: none;
  }

  @media screen and (max-width: 520px) {
    min-width: 0;
    width: 100%;
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

const Photo = styled.div`
  width: 160px;
  height: 60px;
  justify-self: center;
  align-self: center;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--ec-border);
  background: var(--ec-primary-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Avatar = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: var(--ec-primary-bg);
  color: var(--ec-primary);
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
  background: var(--ec-bg-card);
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
  color: var(--ec-primary);

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
    color: var(--ec-primary);
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
  background: ${(props) =>
    props.$header ? "var(--ec-bg-secondary)" : "var(--ec-bg-card)"};
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
  color: ${(props) =>
    props.$header ? "var(--ec-text-faint)" : "var(--ec-text)"};
  text-transform: ${(props) => (props.$header ? "uppercase" : "none")};
  overflow-wrap: anywhere;

  @media screen and (max-width: 480px) {
    &:last-child {
      display: none;
    }
  }
`;

export default SampleResultPopup;
