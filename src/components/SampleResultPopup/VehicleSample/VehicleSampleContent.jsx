import React from 'react';
import { Link } from 'react-router-dom';
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import styled from 'styled-components';
import { 
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaArrowRight,
  FaCar, FaGasPump, FaCogs, FaPalette, FaUserCircle, FaShieldAlt, 
  FaFileAlt, FaUsers, FaTachometerAlt, FaBuilding, FaMapMarkerAlt, FaSearch, FaChartBar, FaWrench
} from 'react-icons/fa';
import vehicleImage from "../../../images/cieana.jpeg";

// We'll export the component
const VehicleSampleContent = ({ onClose, hideFooter }) => {
  const verifyLink = useAuthRedirect("/verify/vehicle");
  return (
    <Container>
      <VehicleHeaderCard>
        <VehicleImageSection>
          <img src={vehicleImage} alt="Sample vehicle" />
          <ImageLabel>Sample vehicle image</ImageLabel>
        </VehicleImageSection>
        <VehicleInfoSection>
          <VehicleTitle>2018 Toyota Sienna</VehicleTitle>
          <VehicleGrid>
            <VehicleGridItem>
              <Label>PLATE NUMBER</Label>
              <Value>ABC-123XY</Value>
            </VehicleGridItem>
            <VehicleGridItem>
              <Label>VIN</Label>
              <Value>89447585678</Value>
            </VehicleGridItem>
            <VehicleGridItem>
              <Label>MAKE / MODEL</Label>
              <Value>Toyota Sienna</Value>
            </VehicleGridItem>
            <VehicleGridItem>
              <Label>YEAR</Label>
              <Value>2018</Value>
            </VehicleGridItem>
          </VehicleGrid>
          <VehicleSpecs>
            <SpecItem><FaCar /> Minivan</SpecItem>
            <SpecDivider />
            <SpecItem><FaGasPump /> Gasoline</SpecItem>
            <SpecDivider />
            <SpecItem><FaCogs /> Automatic</SpecItem>
            <SpecDivider />
            <SpecItem><FaPalette /> Red</SpecItem>
          </VehicleSpecs>
        </VehicleInfoSection>
      </VehicleHeaderCard>

      <HighlightsSection>
        <HighlightsHeader>
          <div>
            <HighlightsTitle>Report Highlights</HighlightsTitle>
            <HighlightsSubtitle>Key information from your VIN verification report.</HighlightsSubtitle>
          </div>
          <TrustedSourceBadge>
            <FaCheckCircle style={{ color: '#FBCB19' }} /> Data from trusted government & industry sources
          </TrustedSourceBadge>
        </HighlightsHeader>
        <HighlightsGrid>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaUserCircle /></IconWrapper>
            <CardContent>
              <CardTitle>Ownership Status</CardTitle>
              <CardStatus $color="#FBCB19">Verified <FaCheckCircle /></CardStatus>
              <CardDesc>Current ownership is valid and matches records.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaShieldAlt /></IconWrapper>
            <CardContent>
              <CardTitle>Theft / Watchlist Status</CardTitle>
              <CardStatus $color="#FBCB19">Clear <FaCheckCircle /></CardStatus>
              <CardDesc>Not reported stolen and not on any watchlist.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaFileAlt /></IconWrapper>
            <CardContent>
              <CardTitle>Salvage / Rebuilt History</CardTitle>
              <CardStatus $color="#FBCB19">No salvage record <FaCheckCircle /></CardStatus>
              <CardDesc>No salvage, rebuilt, or flood damage records found.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard $warning>
            <IconWrapper $color="#f59e0b" $bg="#fef3c7"><FaExclamationTriangle /></IconWrapper>
            <CardContent>
              <CardTitle>Accident History</CardTitle>
              <CardStatus $color="#f59e0b">1 minor accident reported</CardStatus>
              <CardDesc>1 minor accident in 2020. No major damage reported.</CardDesc>
            </CardContent>
          </HighlightCard>
          
          <HighlightCard>
            <IconWrapper $color="#f59e0b" $bg="#fef3c7"><FaUsers /></IconWrapper>
            <CardContent>
              <CardTitle>Previous Owners</CardTitle>
              <CardStatus $color="#f59e0b">3 previous owners</CardStatus>
              <CardDesc>Multiple owners may indicate higher usage.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaTachometerAlt /></IconWrapper>
            <CardContent>
              <CardTitle>Odometer / Mileage Check</CardTitle>
              <CardStatus $color="#FBCB19">89,450 km <FaCheckCircle /></CardStatus>
              <CardDesc>No rollback detected. Mileage appears consistent.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaBuilding /></IconWrapper>
            <CardContent>
              <CardTitle>Usage History</CardTitle>
              <CardStatus $color="#FBCB19">Personal use <FaCheckCircle /></CardStatus>
              <CardDesc>No commercial or rental use reported.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaMapMarkerAlt /></IconWrapper>
            <CardContent>
              <CardTitle>Registration</CardTitle>
              <CardStatus $color="#FBCB19">Lagos, Nigeria <FaCheckCircle /></CardStatus>
              <CardDesc>Current registration in Lagos, Nigeria.</CardDesc>
            </CardContent>
          </HighlightCard>

          <HighlightCard $span2>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaChartBar /></IconWrapper>
            <CardContent>
              <CardTitle>Estimated Market Value</CardTitle>
              <CardStatus $color="#FBCB19">₦12,000,000 - ₦15,000,000</CardStatus>
              <CardDesc>Based on market data and comparable listings.</CardDesc>
            </CardContent>
          </HighlightCard>
          <HighlightCard $span2>
            <IconWrapper $color="#FBCB19" $bg="rgba(251, 203, 25, 0.15)"><FaWrench /></IconWrapper>
            <CardContent>
              <CardTitle>Open Recalls</CardTitle>
              <CardStatus $color="#FBCB19">None found <FaCheckCircle /></CardStatus>
              <CardDesc>No open safety recalls for this vehicle.</CardDesc>
            </CardContent>
          </HighlightCard>
        </HighlightsGrid>

      </HighlightsSection>

      <WhyMattersSection>
        <WhyMattersTitle>Why this matters</WhyMattersTitle>
        <WhyMattersSubtitle>A VIN report gives you the facts you need to buy with confidence.</WhyMattersSubtitle>
        <MattersGrid>
          <MattersItem>
            <MattersIcon><FaShieldAlt /></MattersIcon>
            <MattersContent>
              <h4>Avoid hidden accident history</h4>
              <p>Know the true condition before you buy.</p>
            </MattersContent>
          </MattersItem>
          <MattersItem>
            <MattersIcon><FaUsers /></MattersIcon>
            <MattersContent>
              <h4>Confirm ownership trail</h4>
              <p>See how many owners the vehicle has had.</p>
            </MattersContent>
          </MattersItem>
          <MattersItem>
            <MattersIcon><FaExclamationTriangle style={{color: '#f59e0b'}} /></MattersIcon>
            <MattersContent>
              <h4>Detect salvage or flood risk</h4>
              <p>Uncover title brands and major damage.</p>
            </MattersContent>
          </MattersItem>
          <MattersItem>
            <MattersIcon><FaSearch /></MattersIcon>
            <MattersContent>
              <h4>Identify red flags early</h4>
              <p>Spot issues before they become your problem.</p>
            </MattersContent>
          </MattersItem>
        </MattersGrid>
      </WhyMattersSection>

      {!hideFooter && (
        <Footer>
          <Disclaimer>
            <FaInfoCircle style={{ color: '#FBCB19' }} />
            <span><strong>This is a sample report.</strong> Results are based on data available at the time of verification and may vary for your vehicle.</span>
          </Disclaimer>
          <FooterButtons>
            <CloseBtn onClick={onClose}>Close</CloseBtn>
            <VerifyBtn to={verifyLink}>
              Verify Your Vehicle Now <FaArrowRight />
            </VerifyBtn>
          </FooterButtons>
        </Footer>
      )}
    </Container>
  );
};

export default VehicleSampleContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// ... styles to follow ...
const VehicleHeaderCard = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const VehicleImageSection = styled.div`
  width: 280px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-right: 1px solid var(--ec-border);
  
  img {
    width: 100%;
    max-width: 220px;
    object-fit: contain;
  }
  
  @media screen and (max-width: 640px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--ec-border);
  }
`;

const ImageLabel = styled.div`
  background: #e2e8f0;
  color: #475569;
  font-size: 10px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  margin-top: 12px;
`;

const VehicleInfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const VehicleTitle = styled.h3`
  margin: 0;
  padding: 20px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--ec-heading);
  border-bottom: 1px solid var(--ec-border);
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px 24px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const VehicleGridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #64748b;
`;

const Value = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const VehicleSpecs = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--ec-border);
  background: #f8fafc;
  gap: 16px;
  flex-wrap: wrap;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  
  svg {
    color: #94a3b8;
    font-size: 16px;
  }
`;

const SpecDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #cbd5e1;
`;

const HighlightsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HighlightsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const HighlightsTitle = styled.h4`
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const HighlightsSubtitle = styled.p`
  margin: 4px 0 0;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: #64748b;
`;

const TrustedSourceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  background: ${props => props.$warning ? '#fffcf3' : '#f8fafc'};
  border: 1px solid ${props => props.$warning ? '#fef0c7' : 'var(--ec-border)'};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  grid-column: ${props => props.$span2 ? 'span 2' : 'auto'};
  
  @media screen and (max-width: 900px) {
    grid-column: auto;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    font-size: 16px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const CardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$color};
`;

const CardDesc = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  color: #64748b;
  line-height: 1.4;
`;

const WhyMattersSection = styled.div`
  background: #f8fafc;
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 20px 24px;
`;

const WhyMattersTitle = styled.h4`
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--ec-heading);
`;

const WhyMattersSubtitle = styled.p`
  margin: 4px 0 16px;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: #64748b;
`;

const MattersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MattersItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const MattersIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(251, 203, 25, 0.15);
  color: #FBCB19;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    font-size: 16px;
  }
`;

const MattersContent = styled.div`
  h4 {
    margin: 0 0 4px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--ec-heading);
  }
  p {
    margin: 0;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    color: #64748b;
    line-height: 1.4;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--ec-border);
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const Disclaimer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  color: #64748b;
  max-width: 60%;
  
  svg {
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseBtn = styled.button`
  padding: 10px 20px;
  background: #fff;
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const VerifyBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #FBCB19;
  border: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background: #e5b816;
    color: #1a1a1a;
  }
`;
