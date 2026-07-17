import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/actions";
import { apiGetInternalCall } from "../../apiUtils";
import styled, { css } from "styled-components";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCar,
  FaCalendarAlt,
  FaGasPump,
  FaCog,
  FaRoad,
  FaTachometerAlt,
  FaShieldAlt,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const VehicleResult = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestId = localStorage.getItem("verificationRequestId");
        const response = await apiGetInternalCall(
          `/verification/check-consent/${requestId}`,
          userToken,
        );

        // API returns response.data which contains the actual result
        setResultData(response.data || response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userToken]);

  if (loading) {
    return (
      <PageWrapper>
        <Container>
          <LoadingSpinner>Loading vehicle data...</LoadingSpinner>
        </Container>
      </PageWrapper>
    );
  }

  if (!resultData || !resultData.data) {
    return (
      <PageWrapper>
        <Container>
          <ErrorCard>
            <FaExclamationTriangle /> Unable to load vehicle data
          </ErrorCard>
        </Container>
      </PageWrapper>
    );
  }

  const { data, status, resultText, provider } = resultData;

  const {
    vin,
    vehicleName,
    vehicleAge,
    vehicleImage,
    vehicleSpecification = {},
    vehicle = {},
    verificationStatus,
    verificationReference,
    dsvi = {},
    billingInfo = {},
  } = data;

  const spec = vehicleSpecification;
  const equipments = vehicle.vehicle_equipments || [];
  const warranty = vehicle.vehicle_warranty || [];
  const fuelDetails = vehicle.fuel_details || {};

  const getRiskColor = (label) => {
    const l = (label || "").toLowerCase();
    if (l === "low") return "#16a34a";
    if (l === "medium") return "#ea580c";
    if (l === "high") return "#dc2626";
    return "#6b7280";
  };

  return (
    <PageWrapper>
      <Container>
        <BackLink to="/main-dashboard">
          <FaArrowLeft /> Back to Dashboard
        </BackLink>

        {/* Hero Section */}
        <HeroCard>
          <HeroImageSection>
            {vehicleImage ? (
              <VehicleImage src={vehicleImage} alt={vehicleName} />
            ) : (
              <VehiclePlaceholder>
                <FaCar />
              </VehiclePlaceholder>
            )}
          </HeroImageSection>
          <HeroContent>
            <VehicleTitle>{vehicleName || "Vehicle"}</VehicleTitle>
            <VinLine>VIN: {vin}</VinLine>
            {verificationStatus && (
              <StatusBadge $verified={verificationStatus === "VERIFIED"}>
                <FaCheckCircle /> {verificationStatus}
              </StatusBadge>
            )}
            <MetaGrid>
              <MetaItem>
                <MetaLabel>
                  <FaCalendarAlt /> Year
                </MetaLabel>
                <MetaValue>
                  {spec.year ||
                    vehicle.vehicle_specification?.find((s) => s.year)?.year ||
                    "-"}
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>
                  <FaCar /> Category
                </MetaLabel>
                <MetaValue>{spec.category || "-"}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>
                  <FaTachometerAlt /> Age
                </MetaLabel>
                <MetaValue>
                  {vehicleAge ? `${vehicleAge} years` : "-"}
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>
                  <FaGasPump /> Fuel
                </MetaLabel>
                <MetaValue>
                  {spec.fuel_type || fuelDetails.Fuel_Type || "-"}
                </MetaValue>
              </MetaItem>
            </MetaGrid>
            {dsvi && dsvi.risk_label && (
              <RiskBadge $color={getRiskColor(dsvi.risk_label)}>
                <FaShieldAlt /> Risk Level: {dsvi.risk_label.toUpperCase()}{" "}
                (Score: {dsvi.score || "N/A"})
              </RiskBadge>
            )}
          </HeroContent>
        </HeroCard>

        {/* Quick Specs */}
        <SectionCard>
          <SectionTitle>Key Specifications</SectionTitle>
          <SpecGrid>
            <SpecItem>
              <SpecLabel>Make</SpecLabel>
              <SpecValue>{spec.make || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Model</SpecLabel>
              <SpecValue>{spec.model || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Trim</SpecLabel>
              <SpecValue>{spec.trim || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Engine</SpecLabel>
              <SpecValue>{spec.engine || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Transmission</SpecLabel>
              <SpecValue>{spec.transmission || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Drivetrain</SpecLabel>
              <SpecValue>{spec.drivetrain || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Doors</SpecLabel>
              <SpecValue>{spec.doors || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Seating</SpecLabel>
              <SpecValue>{spec.standard_seating || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Made In</SpecLabel>
              <SpecValue>{spec.made_in || "-"}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>City Mileage</SpecLabel>
              <SpecValue>
                {spec.city_mileage || fuelDetails.City_Mileage || "-"}
              </SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Highway Mileage</SpecLabel>
              <SpecValue>
                {spec.highway_mileage || fuelDetails.Highway_Mileage || "-"}
              </SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Fuel Capacity</SpecLabel>
              <SpecValue>
                {spec.fuel_capacity || fuelDetails.Fuel_Capacity || "-"}
              </SpecValue>
            </SpecItem>
          </SpecGrid>
        </SectionCard>

        {/* Dimensions & Weight */}
        {(spec.curb_weight ||
          spec.overall_length ||
          spec.overall_width ||
          spec.overall_height) && (
          <SectionCard>
            <SectionTitle>Dimensions & Weight</SectionTitle>
            <SpecGrid>
              {spec.curb_weight && (
                <SpecItem>
                  <SpecLabel>Curb Weight</SpecLabel>
                  <SpecValue>{spec.curb_weight}</SpecValue>
                </SpecItem>
              )}
              {spec.overall_length && (
                <SpecItem>
                  <SpecLabel>Overall Length</SpecLabel>
                  <SpecValue>{spec.overall_length}</SpecValue>
                </SpecItem>
              )}
              {spec.overall_width && (
                <SpecItem>
                  <SpecLabel>Overall Width</SpecLabel>
                  <SpecValue>{spec.overall_width}</SpecValue>
                </SpecItem>
              )}
              {spec.overall_height && (
                <SpecItem>
                  <SpecLabel>Overall Height</SpecLabel>
                  <SpecValue>{spec.overall_height}</SpecValue>
                </SpecItem>
              )}
              {spec.wheelbase_length && (
                <SpecItem>
                  <SpecLabel>Wheelbase</SpecLabel>
                  <SpecValue>{spec.wheelbase_length}</SpecValue>
                </SpecItem>
              )}
            </SpecGrid>
          </SectionCard>
        )}

        {/* Equipment Details */}
        {equipments.length > 0 && (
          <SectionCard>
            <SectionTitle>Equipment & Features</SectionTitle>
            {equipments.map((eq, idx) => (
              <EquipmentSection key={idx}>
                <EquipmentTitle>{eq.section}</EquipmentTitle>
                <SpecGrid>
                  {eq.details?.map((detail, dIdx) => {
                    const [key, value] = Object.entries(detail)[0];
                    return (
                      <SpecItem key={dIdx}>
                        <SpecLabel>{key.replace(/_/g, " ")}</SpecLabel>
                        <SpecValue>{value}</SpecValue>
                      </SpecItem>
                    );
                  })}
                </SpecGrid>
              </EquipmentSection>
            ))}
          </SectionCard>
        )}

        {/* Warranty */}
        {warranty.length > 0 && (
          <SectionCard>
            <SectionTitle>Warranty Information</SectionTitle>
            <WarrantyGrid>
              {warranty.map((w, idx) => (
                <WarrantyCard key={idx}>
                  <WarrantyType>{w.type}</WarrantyType>
                  <WarrantyDetail>{w.warranty}</WarrantyDetail>
                  <WarrantyStatus
                    $expired={w.estimated_remainings === "Expired"}
                  >
                    {w.estimated_remainings}
                  </WarrantyStatus>
                </WarrantyCard>
              ))}
            </WarrantyGrid>
          </SectionCard>
        )}

        <Disclaimer>
          <FaInfoCircle /> Results are based on data available at the time of
          verification.
        </Disclaimer>
      </Container>
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--ec-bg, #f9fafb);
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ec-primary, #dd0201);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
  }
`;

const HeroCard = styled.div`
  background: var(--ec-bg-secondary, #fff);
  border: 1px solid var(--ec-border, #e5e7eb);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  gap: 32px;

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 24px;
  }
`;

const HeroImageSection = styled.div`
  flex-shrink: 0;
  width: 400px;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

const VehicleImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--ec-border, #e5e7eb);
`;

const VehiclePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 12px;
  border: 1px solid var(--ec-border, #e5e7eb);

  svg {
    font-size: 80px;
    color: #9ca3af;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const VehicleTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--ec-heading, #111827);
  margin: 0 0 12px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const VinLine = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-secondary, #6b7280);
  margin-bottom: 16px;
  font-weight: 600;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
  ${(props) =>
    props.$verified
      ? css`
          background: #d1fae5;
          color: #065f46;
        `
      : css`
          background: #fee2e2;
          color: #991b1b;
        `}

  svg {
    font-size: 12px;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MetaItem = styled.div``;

const MetaLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted, #9ca3af);
  margin-bottom: 4px;

  svg {
    font-size: 12px;
  }
`;

const MetaValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ec-heading, #111827);
`;

const RiskBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  background: ${(props) => props.$color}15;
  color: ${(props) => props.$color};
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid ${(props) => props.$color};

  svg {
    font-size: 16px;
  }
`;

const SectionCard = styled.div`
  background: var(--ec-bg-secondary, #fff);
  border: 1px solid var(--ec-border, #e5e7eb);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--ec-heading, #111827);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ec-border, #e5e7eb);
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div``;

const SpecLabel = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted, #9ca3af);
  margin-bottom: 4px;
`;

const SpecValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--ec-heading, #111827);
`;

const EquipmentSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EquipmentTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--ec-heading, #111827);
  margin: 0 0 16px;
`;

const WarrantyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const WarrantyCard = styled.div`
  padding: 16px;
  background: var(--ec-bg, #f9fafb);
  border: 1px solid var(--ec-border, #e5e7eb);
  border-radius: 10px;
`;

const WarrantyType = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--ec-heading, #111827);
  margin-bottom: 8px;
`;

const WarrantyDetail = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary, #6b7280);
  margin-bottom: 8px;
`;

const WarrantyStatus = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => (props.$expired ? "#dc2626" : "#16a34a")};
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--ec-border, #e5e7eb);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted, #9ca3af);
`;

const DetailValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--ec-heading, #111827);
`;

const Disclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: #fff7e6;
  border: 1px solid #ffe0a3;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #a15c00;
  margin-top: 24px;

  svg {
    font-size: 18px;
    flex-shrink: 0;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: var(--ec-text-secondary, #6b7280);
`;

const ErrorCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 12px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: #991b1b;
  margin-top: 40px;

  svg {
    font-size: 24px;
  }
`;

export default VehicleResult;
