import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ─── Page ─── */

export const PageWrapper = styled.div`
  background: var(--ec-bg-secondary);
  min-height: 100vh;
`;

/* ─── Navbar ─── */

export const TopNav = styled.nav`
  background: var(--ec-bg);
  height: 80px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const NavLogo = styled.img`
  height: 30px;
  width: auto;
  object-fit: contain;
  cursor: pointer;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ec-text);
`;

export const NavAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--ec-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 13px;
`;

/* ─── Hero ─── */

export const HeroSection = styled.section`
  background: var(--ec-bg);
  padding: 32px 50px 0;
  border-bottom: 1px solid var(--ec-border-light);

  @media screen and (max-width: 768px) {
    padding: 24px 16px 0;
  }
`;

export const Breadcrumb = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-faint);
  margin-bottom: 16px;

  span {
    color: var(--ec-text-secondary);
    &:last-child {
      color: var(--ec-primary);
      font-weight: 600;
    }
  }
`;

export const HeroInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  flex: 1;
`;

export const HeroTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.1;
  color: var(--ec-heading);
  margin: 0 0 16px;

  span {
    color: var(--ec-primary);
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 48px;
    line-height: 1.1;
  }

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  color: var(--ec-text-secondary);
  line-height: 24px;
  margin: 0;
  max-width: 440px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const HeroImage = styled.img`
  width: 260px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    width: 180px;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

/* ─── Stepper ─── */

export const StepperWrapper = styled.div`
  background: var(--ec-bg);
  padding: 0 50px 24px;
  border-bottom: 1px solid var(--ec-border-light);

  @media screen and (max-width: 768px) {
    padding: 0 16px 20px;
  }
`;

export const StepperInner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 28px;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: ${(props) => (props.isLast ? "0 0 auto" : "1")};
`;

export const StepCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
  transition: all 0.3s;

  background: ${(props) =>
    props.active ? "#DD0201" : props.completed ? "#DD0201" : "#e5e7eb"};
  color: ${(props) => (props.active || props.completed ? "#fff" : "#999")};
`;

export const StepLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "700" : "400")};
  color: ${(props) => (props.active ? "#1a1a1a" : "#999")};
  white-space: nowrap;

  @media screen and (max-width: 480px) {
    display: ${(props) => (props.active ? "inline" : "none")};
  }
`;

export const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${(props) => (props.completed ? "#DD0201" : "#e5e7eb")};
  margin: 0 8px;
  transition: background 0.3s;
`;

/* ─── Main Content ─── */

export const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 30px 50px 60px;
  animation: ${fadeIn} 0.4s ease-out;

  @media screen and (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const PopupCard = styled.div`
  width: min(680px, 100%);
  background: var(--ec-bg);
  border-radius: 20px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  animation: ${fadeIn} 0.25s ease-out;
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 24px 0;
`;

export const PopupMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
`;

export const PopupIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--ec-primary-bg);
  color: var(--ec-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

export const PopupTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: var(--ec-text);
`;

export const PopupSubtitle = styled.p`
  margin: 8px 0 0;
  font-family: "Nunito", sans-serif;
  color: var(--ec-text-secondary);
  line-height: 1.6;
  font-size: 15px;
`;

export const PopupCloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--ec-text-muted);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export const PopupBody = styled.div`
  padding: 24px;
`;

export const PopupRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

export const PopupField = styled.div`
  flex: 1 1 45%;
  min-width: 180px;
`;

export const PopupFieldLabel = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  margin-bottom: 6px;
`;

export const PopupFieldValue = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--ec-text);
`;

export const PopupActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 18px;
`;

export const ResultCardPopup = styled.div`
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 18px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  margin-bottom: 20px;
`;

export const ResultTopPopup = styled.div`
  display: flex;
  gap: 24px;
  padding: 28px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const ResultPhotoPopup = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--ec-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ec-text);
  font-size: 32px;
  flex-shrink: 0;
`;

export const ResultGridPopup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 20px 32px;
  width: 100%;
`;

export const ResultFieldPopup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ResultLabelPopup = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-faint);
`;

export const ResultValuePopup = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--ec-text);
`;

export const VerifiedBadgePopup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--ec-primary-bg);
  color: var(--ec-primary);
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
`;

export const ResultFooterPopup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px 24px;
  border-top: 1px solid var(--ec-border-light);
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
`;

export const ResultDisclaimerPopup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding: 16px 24px;
  border-radius: 14px;
  background: var(--ec-bg-secondary);
  color: #1d4ed8;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
`;

/* ─── Search Form ─── */

export const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 28px;
  align-items: start;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const FormCard = styled.div`
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 32px;

  @media screen and (max-width: 480px) {
    padding: 20px 16px;
  }
`;

export const FormCardTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--ec-heading);
  margin: 0 0 4px;
`;

export const FormCardSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-muted);
  margin: 0 0 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--ec-text-secondary);
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--ec-input-placeholder);
  }

  &:focus {
    border-color: var(--ec-primary);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text);
  outline: none;
  box-sizing: border-box;
  background: var(--ec-bg);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  &:focus {
    border-color: var(--ec-primary);
  }
`;

export const CharCounter = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  float: right;
  margin-top: 4px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
`;

export const ClearBtn = styled.button`
  background: transparent;
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  padding: 12px 28px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--ec-border);
    background: var(--ec-bg-secondary);
  }
`;

export const ContinueBtn = styled.button`
  background: var(--ec-primary);
  border: none;
  border-radius: 10px;
  padding: 12px 36px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #ff4d4f;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

/* ─── You Will Get (horizontal row inside card) ─── */

export const YouWillGetCard = styled.div`
  background: var(--ec-error-bg);
  border: 1px solid var(--ec-primary);
  border-radius: 10px;
  padding: 18px 20px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const YouWillGetTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--ec-heading);
  margin: 0 0 12px;
`;

export const YouWillGetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
`;

export const YouWillGetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);

  svg {
    color: var(--ec-primary);
    font-size: 14px;
    flex-shrink: 0;
  }
`;

/* ─── Price Sidebar ─── */

export const SidebarCard = styled.div`
  background: var(--ec-error-bg);
  border: 1px solid var(--ec-primary);
  border-radius: 12px;
  padding: 28px 24px;
`;

export const PriceLabel = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  margin-bottom: 4px;
`;

export const PriceAmount = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--ec-primary);
  margin-bottom: 20px;
`;

export const PriceBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #d1fae5;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);

  span:last-child {
    font-weight: 600;
    color: var(--ec-text);
  }
`;

export const PriceTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text);
  font-weight: 700;
  padding-top: 10px;
  border-top: 1px solid var(--ec-primary);
`;

export const SidebarTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--ec-heading);
  margin: 0 0 16px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text);

  svg {
    color: var(--ec-primary);
    font-size: 16px;
    flex-shrink: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SidebarNote = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary);
  margin: 16px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--ec-border);
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: var(--ec-primary);
    font-size: 14px;
  }
`;

/* ─── Payment Section ─── */

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentMethodsCard = styled.div`
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 24px;
`;

export const PaymentMethodTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-heading);
  margin: 0 0 4px;
`;

export const PaymentMethodSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0 0 16px;
`;

export const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 2px solid ${(props) => (props.selected ? "#DD0201" : "#e5e7eb")};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
  background: ${(props) => (props.selected ? "#fef2f2" : "#fff")};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-color: var(--ec-primary);
  }

  input[type="radio"] {
    accent-color: var(--ec-primary);
  }
`;

export const PaymentOptionIcon = styled.img`
  height: 20px;
  width: auto;
  object-fit: contain;
`;

export const PaymentOptionLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ec-text);
  flex: 1;
`;

export const PaymentOptionBadge = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: var(--ec-primary);
  background: #fdecec;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`;

export const SummaryCard = styled.div`
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 28px;
`;

export const SummaryTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-heading);
  margin: 0;
`;

export const SummaryAmount = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--ec-primary);
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--ec-border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const SummaryLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-muted);
`;

export const SummaryValue = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--ec-text);
`;

export const PayBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: var(--ec-primary);
  border: none;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #ff4d4f;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const SecuredBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);

  img {
    height: 16px;
  }
`;

/* ─── Sample Result ─── */

export const SampleSection = styled.div`
  background: var(--ec-bg);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  padding: 28px;
  margin-top: 30px;
`;

export const SampleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const SampleTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-heading);
  margin: 0;
`;

export const SampleViewLink = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-primary);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SampleSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  color: var(--ec-text-muted);
  margin: 0 0 16px;
`;

export const SampleResultCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--ec-bg-secondary);
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  padding: 16px 20px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const SampleVehicleImage = styled.div`
  width: 180px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--ec-border);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 560px) {
    width: 100%;
    max-width: 340px;
    height: 180px;
  }
`;

export const SampleAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fdecec;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 22px;
    color: var(--ec-primary);
  }
`;

export const SampleInfo = styled.div`
  flex: 1;
`;

export const SampleName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--ec-heading);
`;

export const SampleId = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary);
`;

export const SampleMetaRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const SampleMetaItem = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--ec-heading);
  background: #fff7e6;
  border: 1px solid #ffe0a3;
  border-radius: 999px;
  padding: 4px 10px;
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #fdecec;
  color: var(--ec-primary);
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;

  svg {
    font-size: 10px;
  }
`;

export const SampleTags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const SampleTag = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  svg {
    color: var(--ec-primary);
    font-size: 10px;
  }
`;

export const SampleSpecsGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const SampleSpecChip = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-secondary);
  border: 1px solid var(--ec-border);
  background: #fff;
  border-radius: 8px;
  padding: 8px 10px;

  strong {
    color: var(--ec-heading);
    font-weight: 700;
  }
`;

/* ─── Trust Bar ─── */

export const TrustBar = styled.div`
  background: var(--ec-bg);
  border-top: 1px solid var(--ec-border-light);
  padding: 24px 50px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const TrustBarInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 24px;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TrustIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fdecec;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: var(--ec-primary);
    font-size: 16px;
  }
`;

export const TrustText = styled.div``;

export const TrustTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: var(--ec-heading);
`;

export const TrustDesc = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
`;

/* ─── Processing / Loading ─── */

export const ProcessingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const ProcessingSpinner = styled.div`
  width: 56px;
  height: 56px;
  border: 4px solid var(--ec-border);
  border-top-color: var(--ec-primary);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 24px;
`;

export const ProcessingText = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--ec-heading);
  margin: 0 0 8px;
`;

export const ProcessingSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: var(--ec-text-secondary);
  margin: 0;
`;

/* ─── Error Alert ─── */

export const ErrorAlert = styled.div`
  background: var(--ec-error-bg);
  border: 1px solid var(--ec-error-border);
  color: var(--ec-error-text);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

/* ─── ID Type Display ─── */

export const IdTypeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid var(--ec-border);
  border-radius: 10px;
  background: var(--ec-bg-secondary);
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ec-text);

  svg {
    color: var(--ec-primary);
    font-size: 16px;
  }
`;
