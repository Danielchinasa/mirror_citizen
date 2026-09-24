import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaFileAlt,
  FaExclamationTriangle,
  FaUsers,
  FaTachometerAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaChartBar,
  FaWrench,
  FaCarSide,
  FaGasPump,
  FaCogs,
  FaPalette,
  FaUser,
  FaSearch,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import vehicleSampleAvatar from "../../../images/cieana.jpeg";

const VehicleSampleResult = ({ onClose, isInline, isSw }) => {
  const verifyLink = useAuthRedirect("/verify/vehicle");

  return (
    <Container>
      <HeaderCard>
        <ImageSection>
          <img src={vehicleSampleAvatar} alt="Sample vehicle" />
        </ImageSection>
        <DetailsSection>
          <VehicleTitle>2018 Toyota Sienna</VehicleTitle>
          <SpecsGrid>
            <SpecItem>
              <SpecLabel>{isSw ? "NAMBA YA USAJILI" : "PLATE NUMBER"}</SpecLabel>
              <SpecValue>ABC-123XY</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>{isSw ? "NAMBA YA VIN" : "VIN"}</SpecLabel>
              <SpecValue>89447585678</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>{isSw ? "AINA / MODELI" : "MAKE / MODEL"}</SpecLabel>
              <SpecValue>Toyota Sienna</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>{isSw ? "MWAKA" : "YEAR"}</SpecLabel>
              <SpecValue>2018</SpecValue>
            </SpecItem>
          </SpecsGrid>
          <FeaturesRow>
            <Feature>
              <FaCarSide /> {isSw ? "Minivan" : "Minivan"}
            </Feature>
            <Divider />
            <Feature>
              <FaGasPump /> {isSw ? "Petroli" : "Gasoline"}
            </Feature>
            <Divider />
            <Feature>
              <FaCogs /> {isSw ? "Otomatiki" : "Automatic"}
            </Feature>
            <Divider />
            <Feature>
              <FaPalette /> {isSw ? "Nyekundu" : "Red"}
            </Feature>
          </FeaturesRow>
        </DetailsSection>
      </HeaderCard>

      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>{isSw ? "Muhtasari wa Ripoti" : "Report Highlights"}</SectionTitle>
            <SectionSubtitle>
              {isSw ? "Taarifa muhimu kutoka kwenye ripoti yako ya uthibitishaji wa VIN." : "Key information from your VIN verification report."}
            </SectionSubtitle>
          </div>
          <TrustedBadge>
            <FaCheckCircle /> {isSw ? "Data kutoka vyanzo vinavyoaminika vya serikali na sekta" : "Data from trusted government & industry sources"}
          </TrustedBadge>
        </SectionHeader>

        <CardsGrid>
          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaUser />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Hali ya Umiliki" : "Ownership Status"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Imethibitishwa" : "Verified"} <FaCheckCircle />
              </CardValue>
              <CardDesc>
                {isSw ? "Umiliki wa sasa ni halali na unalingana na rekodi." : "Current ownership is valid and matches records."}
              </CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaShieldAlt />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Hali ya Wizi / Orodha ya Uangalizi" : "Theft / Watchlist Status"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Safi" : "Clear"} <FaCheckCircle />
              </CardValue>
              <CardDesc>{isSw ? "Haijaripotiwa kuibiwa na haiko kwenye orodha yoyote ya uangalizi." : "Not reported stolen and not on any watchlist."}</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaFileAlt />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Historia ya Uokoaji / Kujengwa Upya" : "Salvage / Rebuilt History"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Hakuna rekodi ya uokoaji" : "No salvage record"} <FaCheckCircle />
              </CardValue>
              <CardDesc>
                {isSw ? "Hakuna uokoaji, kujengwa upya, au rekodi za uharibifu wa mafuriko zilizopatikana." : "No salvage, rebuilt, or flood damage records found."}
              </CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="warning">
            <CardIcon $status="warning">
              <FaExclamationTriangle />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Historia ya Ajali" : "Accident History"}</CardTitle>
              <CardValue $status="warning">{isSw ? "Ajali 1 ndogo imeripotiwa" : "1 minor accident reported"}</CardValue>
              <CardDesc>
                {isSw ? "Ajali 1 ndogo mwaka 2020. Hakuna uharibifu mkubwa ulioripotiwa." : "1 minor accident in 2020. No major damage reported."}
              </CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="warning">
            <CardIcon $status="warning">
              <FaUsers />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Wamiliki Waliopita" : "Previous Owners"}</CardTitle>
              <CardValue $status="warning">{isSw ? "Wamiliki 3 waliopita" : "3 previous owners"}</CardValue>
              <CardDesc>{isSw ? "Wamiliki wengi wanaweza kuonyesha matumizi makubwa." : "Multiple owners may indicate higher usage."}</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaTachometerAlt />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Ukaguzi wa Odometer / Maili" : "Odometer / Mileage Check"}</CardTitle>
              <CardValue $status="good">
                89,450 km <FaCheckCircle />
              </CardValue>
              <CardDesc>
                {isSw ? "Hakuna kurudishwa nyuma kulikogunduliwa. Maili inaonekana kuwa sawa." : "No rollback detected. Mileage appears consistent."}
              </CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaBuilding />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Historia ya Matumizi" : "Usage History"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Matumizi binafsi" : "Personal use"} <FaCheckCircle />
              </CardValue>
              <CardDesc>{isSw ? "Hakuna matumizi ya kibiashara au ya kukodisha yaliyoripotiwa." : "No commercial or rental use reported."}</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good">
            <CardIcon $status="good">
              <FaMapMarkerAlt />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Usajili" : "Registration"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Nairobi, Kenya" : "Nairobi, Kenya"} <FaCheckCircle />
              </CardValue>
              <CardDesc>{isSw ? "Usajili wa sasa uko Nairobi, Kenya." : "Current registration in Nairobi, Kenya."}</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good" $span2>
            <CardIcon $status="good">
              <FaChartBar />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Thamani Inayokadiriwa ya Soko" : "Estimated Market Value"}</CardTitle>
              <CardValue $status="good">{isSw ? "KES 1,200,000 - KES 1,500,000" : "KES 1,200,000 - KES 1,500,000"}</CardValue>
              <CardDesc>{isSw ? "Kulingana na data ya soko na orodha zinazolingana." : "Based on market data and comparable listings."}</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $status="good" $span2>
            <CardIcon $status="good">
              <FaWrench />
            </CardIcon>
            <CardContent>
              <CardTitle>{isSw ? "Ukumbushaji Wazi" : "Open Recalls"}</CardTitle>
              <CardValue $status="good">
                {isSw ? "Hakuna kilichopatikana" : "None found"} <FaCheckCircle />
              </CardValue>
              <CardDesc>{isSw ? "Hakuna ukumbushaji wazi wa usalama kwa gari hili." : "No open safety recalls for this vehicle."}</CardDesc>
            </CardContent>
          </HighlightCard>
        </CardsGrid>
      </Section>

      <Section>
        <WhySection>
          <WhyHeader>
            <WhyTitle>{isSw ? "Kwa nini hii ni muhimu" : "Why this matters"}</WhyTitle>
            <WhySubtitle>
              {isSw ? "Ripoti ya VIN inakupa ukweli unaohitaji kununua kwa ujasiri." : "A VIN report gives you the facts you need to buy with confidence."}
            </WhySubtitle>
          </WhyHeader>
          <WhyGrid>
            <WhyItem>
              <WhyIcon>
                <FaShieldAlt />
              </WhyIcon>
              <WhyContent>
                <WhyItemTitle>{isSw ? "Epuka historia ya ajali iliyofichwa" : "Avoid hidden accident history"}</WhyItemTitle>
                <WhyItemDesc>
                  {isSw ? "Jua hali halisi kabla ya kununua." : "Know the true condition before you buy."}
                </WhyItemDesc>
              </WhyContent>
            </WhyItem>
            <WhyItem>
              <WhyIcon>
                <FaUsers />
              </WhyIcon>
              <WhyContent>
                <WhyItemTitle>{isSw ? "Thibitisha mfululizo wa umiliki" : "Confirm ownership trail"}</WhyItemTitle>
                <WhyItemDesc>
                  {isSw ? "Tazama gari limekuwa na wamiliki wangapi." : "See how many owners the vehicle has had."}
                </WhyItemDesc>
              </WhyContent>
            </WhyItem>
            <WhyItem>
              <WhyIcon>
                <FaExclamationTriangle />
              </WhyIcon>
              <WhyContent>
                <WhyItemTitle>{isSw ? "Gundua hatari ya uokoaji au mafuriko" : "Detect salvage or flood risk"}</WhyItemTitle>
                <WhyItemDesc>
                  {isSw ? "Gundua chapa za hatimiliki na uharibifu mkubwa." : "Uncover title brands and major damage."}
                </WhyItemDesc>
              </WhyContent>
            </WhyItem>
            <WhyItem>
              <WhyIcon>
                <FaSearch />
              </WhyIcon>
              <WhyContent>
                <WhyItemTitle>{isSw ? "Tambua dalili za hatari mapema" : "Identify red flags early"}</WhyItemTitle>
                <WhyItemDesc>
                  {isSw ? "Gundua masuala kabla hayajawa tatizo lako." : "Spot issues before they become your problem."}
                </WhyItemDesc>
              </WhyContent>
            </WhyItem>
          </WhyGrid>
        </WhySection>
      </Section>

      <Footer>
        <Disclaimer>
          <FaInfoCircle />
          {isSw ? "Huu ni mfano wa ripoti. Matokeo yanategemea data inayopatikana wakati wa uthibitishaji na inaweza kutofautiana kwa gari lako." : "This is a sample report. Results are based on data available at the time of verification and may vary for your vehicle."}
        </Disclaimer>
        {!isInline && (
          <FooterActions>
            <CloseButton onClick={onClose}>{isSw ? "Funga" : "Close"}</CloseButton>
            <PrimaryButton to={verifyLink}>
              {isSw ? "Thibitisha VIN Yako Sasa" : "Verify Your VIN Now"} <FaArrowRight />
            </PrimaryButton>
          </FooterActions>
        )}
      </Footer>
    </Container>
  );
};

export default VehicleSampleResult;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderCard = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  width: 280px;
  background: #f8f9fa;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--ec-border);

  img {
    width: 100%;
    max-width: 220px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    mix-blend-mode: multiply;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--ec-border);
  }
`;

const ImageCaption = styled.span`
  margin-top: 12px;
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: var(--ec-text-muted);
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 24px;
`;

const VehicleTitle = styled.h2`
  margin: 0 0 20px;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--ec-heading);
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--ec-border);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SpecLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--ec-text-muted);
`;

const SpecValue = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const FeaturesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--ec-text);

  svg {
    color: var(--ec-text-muted);
    font-size: 16px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: var(--ec-border);
`;

const Section = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 4px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const SectionSubtitle = styled.p`
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
`;

const TrustedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #DD0201;

  svg {
    font-size: 14px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  grid-column: ${(props) => (props.$span2 ? "span 2" : "auto")};
  background: ${(props) => (props.$status === "good" ? "#FFF0F0" : "#fff8f3")};
  border: 1px solid
    ${(props) => (props.$status === "good" ? "#FFD6D6" : "#ffeadb")};
  border-radius: 10px;
  padding: 16px;
  display: flex;
  gap: 12px;

  @media screen and (max-width: 1024px) {
    grid-column: auto;
  }
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) => (props.$status === "good" ? "#FFEBEB" : "#ffe0c8")};
  color: ${(props) => (props.$status === "good" ? "#DD0201" : "#d95d00")};
  font-size: 18px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardTitle = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: var(--ec-heading);
`;

const CardValue = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.$status === "good" ? "#DD0201" : "#d95d00")};

  svg {
    font-size: 13px;
  }
`;

const CardDesc = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: var(--ec-text-muted);
  line-height: 1.4;
`;

const WhySection = styled.div`
  background: #f8f9fa;
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 20px;
`;

const WhyHeader = styled.div`
  margin-bottom: 16px;
`;

const WhyTitle = styled.h3`
  margin: 0 0 4px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const WhySubtitle = styled.p`
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WhyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-right: 12px;
  border-right: 1px solid var(--ec-border);

  &:last-child {
    border-right: none;
    padding-right: 0;
  }

  @media screen and (max-width: 768px) {
    &:nth-child(2) {
      border-right: none;
      padding-right: 0;
    }
  }

  @media screen and (max-width: 480px) {
    border-right: none;
    padding-right: 0;
  }
`;

const WhyIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #FFEBEB;
  color: #DD0201;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
`;

const WhyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const WhyItemTitle = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--ec-heading);
  line-height: 1.3;
`;

const WhyItemDesc = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: var(--ec-text-muted);
  line-height: 1.3;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--ec-border);
  gap: 20px;
  flex-wrap: wrap;
`;

const Disclaimer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: #DD0201;
  max-width: 500px;
  line-height: 1.4;

  svg {
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const FooterActions = styled.div`
  display: flex;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 0 20px;
  height: 44px;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  background: #fff;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--ec-heading);
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  height: 44px;
  background: var(--ec-primary);
  color: #fff;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: #FF4D4F;
  }
`;
