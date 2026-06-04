import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaLock,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaUserCircle,
  FaArrowRight,
  FaArrowLeft,
  FaWallet,
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaExchangeAlt,
  FaIdCard,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  initiateVerificationRequest,
  completeVerificationRequest,
  fetchUserProfile,
} from "../../redux/actions";
import { apiPostInternalCall } from "../../apiUtils";
import {
  initiatePaystackPayment,
  redirectToPaystack,
} from "../../services/paystackService";
import verificationConfig from "./verificationConfig";

import {
  PageWrapper,
  HeroSection,
  Breadcrumb,
  HeroInner,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  HeroImage,
  StepperWrapper,
  StepperInner,
  StepItem,
  StepCircle,
  StepLabel,
  StepLine,
  ContentWrapper,
  SearchGrid,
  FormCard,
  FormCardTitle,
  FormCardSub,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  CharCounter,
  FormActions,
  ClearBtn,
  ContinueBtn,
  SidebarCard,
  SidebarTitle,
  SidebarItem,
  SidebarNote,
  YouWillGetRow,
  YouWillGetItem,
  YouWillGetCard,
  YouWillGetTitle,
  PriceLabel,
  PriceAmount,
  PriceBreakdown,
  PriceRow,
  PriceTotalRow,
  IdTypeDisplay,
  PaymentGrid,
  PaymentMethodsCard,
  PaymentMethodTitle,
  PaymentMethodSub,
  PaymentOption,
  PaymentOptionLabel,
  PaymentOptionBadge,
  SummaryCard,
  SummaryTitle,
  SummaryAmount,
  SummaryHeader,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  PayBtn,
  SecuredBy,
  SampleSection,
  SampleHeader,
  SampleTitle,
  SampleSub,
  SampleResultCard,
  SampleAvatar,
  SampleInfo,
  SampleName,
  SampleId,
  VerifiedBadge,
  SampleTags,
  SampleTag,
  TrustBar,
  TrustBarInner,
  TrustItem,
  TrustIcon,
  TrustText,
  TrustTitle,
  TrustDesc,
  ProcessingWrapper,
  ProcessingSpinner,
  ProcessingText,
  ProcessingSub,
  ErrorAlert,
} from "./VerifyPage.elements";

const STEPS = ["Search", "Payment", "Processing", "Result"];

const PAYMENT_METHODS = [
  {
    id: "paystack",
    label: "Paystack",
    icon: null,
    badge: null,
    paymentType: "INSTANT",
    paymentMethodId: 5,
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: FaWallet,
    badge: null,
    paymentType: "WALLET",
    paymentMethodId: 1,
  },
  {
    id: "card",
    label: "Card",
    icon: FaCreditCard,
    badge: null,
    paymentType: "INSTANT",
    paymentMethodId: 5,
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: FaExchangeAlt,
    badge: null,
    paymentType: "INSTANT",
    paymentMethodId: 5,
  },
  {
    id: "bank",
    label: "Bank",
    icon: FaUniversity,
    badge: null,
    paymentType: "INSTANT",
    paymentMethodId: 5,
  },
];

function generateTransactionId() {
  let transactionId = "EA";
  for (let i = 0; i < 14; i++) {
    transactionId += Math.floor(Math.random() * 10);
  }
  return transactionId;
}

const VerifyPage = () => {
  const { type } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const config = verificationConfig[type];
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const userDetails = useSelector((state) => state.userDetails);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedBureaus, setSelectedBureaus] = useState({});

  // Redirect if invalid type
  useEffect(() => {
    if (!config) {
      history.replace("/dashboard");
    }
  }, [config, history]);

  // Fetch service prices
  useEffect(() => {
    if (!config || !userToken) return;

    const fetchPrices = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await apiPostInternalCall(
          `/transaction/service-prices`,
          { ipAddress },
          userToken,
        );
        setLoadingPrice(false);
        const serviceData = response.data.data[config.priceIndex];
        setPricingData({
          price: serviceData.price,
          serviceFee: serviceData.serviceFee,
          vat: serviceData.VAT,
          priceUsd: serviceData.price2,
          serviceFeeusd: serviceData.serviceFee2,
          vatUsd: serviceData.VAT2,
          processingFee: serviceData.processingFee || 0,
          rate: response.data.rate,
        });
      } catch (err) {
        setLoadingPrice(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not fetch service prices. Please try again.",
          confirmButtonColor: "#09c93a",
        });
      }
    };
    fetchPrices();
  }, [config, userToken]);

  if (!config) return null;

  const currencyCheck = localStorage.getItem("currencyCheck") || "NGN";
  const isNGN = currencyCheck.toUpperCase() === "NGN";

  const bureauCount = config?.bureaus
    ? Object.values(selectedBureaus).filter(Boolean).length
    : 0;
  const allBureausSelected =
    config?.bureaus && bureauCount === config.bureaus.length;
  const bureauMultiplier = config?.bureaus ? Math.max(bureauCount, 1) : 1;
  const discount =
    allBureausSelected && config?.allBureausDiscount
      ? isNGN
        ? config.allBureausDiscount.ngn
        : config.allBureausDiscount.usd
      : 0;

  const totalAmount = pricingData
    ? isNGN
      ? ((pricingData.serviceFee || 0) +
          (pricingData.processingFee || 0) +
          (pricingData.vat || 0)) *
          bureauMultiplier -
        discount
      : ((pricingData.serviceFeeusd || 0) + (pricingData.vatUsd || 0)) *
          bureauMultiplier -
        discount
    : 0;

  const currencySymbol = isNGN ? "₦" : "$";

  const userInitials = userDetails
    ? `${(userDetails.firstName || "")[0] || ""}${
        (userDetails.lastName || "")[0] || ""
      }`.toUpperCase()
    : "U";

  const userName = userDetails
    ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim()
    : "User";

  const userEmail = userDetails?.email || "";
  const userBalance = userDetails?.walletBalance || 0;

  /* ── Form handlers ── */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For eitherOr fields, clear the sibling field
    const currentField = config.fields.find((f) => f.name === name);
    const updates = { [name]: value };
    if (currentField?.eitherOr) {
      config.fields.forEach((f) => {
        if (f.eitherOr === currentField.eitherOr && f.name !== name) {
          updates[f.name] = "";
        }
      });
    }

    setFormData((prev) => ({ ...prev, ...updates }));
    setError("");
  };

  const handleClear = () => {
    setFormData({});
    setSelectedBureaus({});
    setError("");
  };

  const isFormValid = () => {
    // Check all strictly required fields
    const requiredValid = config.fields
      .filter((f) => f.required)
      .every((f) => formData[f.name]?.trim());

    // Check either/or groups (at least one must be filled)
    const eitherOrGroups = {};
    config.fields.forEach((f) => {
      if (f.eitherOr) {
        if (!eitherOrGroups[f.eitherOr]) eitherOrGroups[f.eitherOr] = [];
        eitherOrGroups[f.eitherOr].push(f.name);
      }
    });
    const eitherOrValid = Object.values(eitherOrGroups).every((group) =>
      group.some((name) => formData[name]?.trim()),
    );

    // Check bureau selection (at least one required if config has bureaus)
    const bureauValid = config.bureaus
      ? Object.values(selectedBureaus).some(Boolean)
      : true;

    return requiredValid && eitherOrValid && bureauValid;
  };

  /* ── Step navigation ── */

  const handleContinueToPayment = () => {
    if (!isFormValid()) {
      const hasEitherOr = config.fields.some((f) => f.eitherOr);
      const noBureauSelected =
        config.bureaus && !Object.values(selectedBureaus).some(Boolean);
      setError(
        noBureauSelected
          ? "Please select at least one credit bureau."
          : hasEitherOr
            ? "Please fill in at least one of the fields."
            : "Please fill in all required fields.",
      );
      return;
    }
    setError("");
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToSearch = () => {
    setCurrentStep(0);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Build formData for API ── */

  const buildApiFormData = () => {
    const apiForm = {
      nin: "",
      phone: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
      gender: "",
      rc: "",
      business_name: "",
      bvn: "",
      vin: "",
      stolencheck: "",
      license_number: "",
      face: "",
      nin_csv: "",
      crc: "",
      firstCentral: "",
      creditRegistry: "",
      paymentType: "",
      currency: "",
    };

    // Map form fields to API form
    config.fields.forEach((field) => {
      if (field.name !== "purpose" && formData[field.name]) {
        apiForm[field.name] = formData[field.name];
      }
    });

    // Map selected bureaus to API form
    if (config.bureaus) {
      config.bureaus.forEach((bureau) => {
        apiForm[bureau.fieldName] = selectedBureaus[bureau.id] ? true : "";
      });
    }

    return apiForm;
  };

  /* ── Payment flow ── */

  const handlePay = async () => {
    setLoading(true);
    setError("");
    setCurrentStep(2); // Processing

    const randomTransactionId = generateTransactionId();
    const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

    localStorage.setItem("transactionID", randomTransactionId);
    localStorage.setItem("paymentType", selectedMethod.paymentType);
    localStorage.setItem("totalAmount", totalAmount);

    const apiFormData = buildApiFormData();

    try {
      // 1. Initiate verification
      const initiateResponse = await dispatch(
        initiateVerificationRequest(apiFormData, userToken),
      );

      if (initiateResponse?.sessionStatus === "INITIATED") {
        localStorage.setItem("sessionCode", initiateResponse?.sessionCode);
      } else {
        throw new Error(
          initiateResponse?.message || "Failed to initiate verification",
        );
      }

      // 2. Process payment based on method
      if (paymentMethod === "wallet") {
        await handleWalletPayment(randomTransactionId, apiFormData);
      } else {
        // Paystack / Card / Transfer / Bank - all go through Paystack
        await handlePaystackPayment(randomTransactionId, apiFormData);
      }
    } catch (err) {
      setLoading(false);
      setCurrentStep(1);
      setError(err.message || "An error occurred. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An error occurred. Please try again.",
        confirmButtonColor: "#09c93a",
      });
    }
  };

  const handleWalletPayment = async (transactionId, apiFormData) => {
    // Check wallet balance
    if (userBalance < totalAmount) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: "Wallet Balance Low",
        text: `Your wallet balance (${currencySymbol}${userBalance.toLocaleString()}) is insufficient for this transaction (${currencySymbol}${totalAmount.toLocaleString()}).`,
        confirmButtonColor: "#09c93a",
      });
      return;
    }

    try {
      const apiUrl = `${
        require("../../apiConfig").default
      }/transaction/wallet-payment`;
      const requestBody = {
        sessionCode: localStorage.getItem("sessionCode"),
        userNIN: userDetails?.nin || "",
        transactionID: transactionId,
        currency: currencyCheck,
        paymentType: "WALLET",
        amount: totalAmount,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        await handleCompleteVerification(apiFormData);
      } else {
        throw new Error(data.message || "Wallet payment failed");
      }
    } catch (err) {
      throw err;
    }
  };

  const handlePaystackPayment = async (transactionId, apiFormData) => {
    try {
      const paymentData = {
        amount: totalAmount,
        currency: currencyCheck,
        type: "VERIFICATION",
        sessionCode: localStorage.getItem("sessionCode"),
      };

      const response = await initiatePaystackPayment(paymentData, userToken);

      if (response?.data?.authorization_url) {
        // Store data for post-payment completion
        localStorage.setItem("pendingVerificationType", type);
        localStorage.setItem("pendingFormData", JSON.stringify(apiFormData));
        localStorage.setItem("paystackReference", response.data.reference);

        // Redirect to Paystack
        redirectToPaystack(response.data.authorization_url, false);
      } else {
        throw new Error("Failed to initialize payment gateway");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleCompleteVerification = async (apiFormData) => {
    try {
      const response = await dispatch(
        completeVerificationRequest(apiFormData, userToken),
      );

      dispatch(fetchUserProfile(userToken));
      setLoading(false);

      // Handle different response types
      if (response?.basic?.status === true) {
        setCurrentStep(3);
        setVerificationResult(response.basic);
        Swal.fire({
          icon: "success",
          title: "Verification Successful",
          text: "Your verification has been completed successfully.",
          confirmButtonColor: "#09c93a",
        }).then(() => {
          history.push("/main-dashboard");
        });
      } else if (
        response?.["search-extension"]?.phoneVerification?.status === true
      ) {
        setCurrentStep(3);
        setVerificationResult(response["search-extension"].phoneVerification);
        Swal.fire({
          icon: "success",
          title: "Phone Verification Successful",
          text: "Phone number has been verified successfully.",
          confirmButtonColor: "#09c93a",
        }).then(() => {
          history.push("/main-dashboard");
        });
      } else if (response?.business?.success === true) {
        setCurrentStep(3);
        setVerificationResult(response.business);
        Swal.fire({
          icon: "success",
          title: "Business Verification Successful",
          text: "Business has been verified successfully.",
          confirmButtonColor: "#09c93a",
        }).then(() => {
          history.push("/main-dashboard");
        });
      } else if (
        response?.["search-extension"]?.bvnVerification?.status === true
      ) {
        setCurrentStep(3);
        setVerificationResult(response["search-extension"].bvnVerification);
        Swal.fire({
          icon: "success",
          title: "BVN Verification Successful",
          text: "BVN has been verified successfully.",
          confirmButtonColor: "#09c93a",
        }).then(() => {
          history.push("/main-dashboard");
        });
      } else {
        // Generic error handling
        const errorMsg =
          response?.basic?.message ||
          response?.["search-extension"]?.phoneVerification?.message ||
          response?.business?.message ||
          "Verification could not be completed. A refund has been initiated.";
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: errorMsg,
          confirmButtonColor: "#09c93a",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: "Service Unavailable",
        text: "Service is currently unavailable. A refund has been initiated.",
        confirmButtonColor: "#09c93a",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  /* ── Render helpers ── */

  const renderStepper = () => (
    <StepperWrapper>
      <StepperInner>
        {STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <StepItem isLast={i === STEPS.length - 1}>
              <StepCircle
                active={currentStep === i}
                completed={currentStep > i}
              >
                {currentStep > i ? (
                  <FaCheckCircle style={{ fontSize: 14 }} />
                ) : (
                  i + 1
                )}
              </StepCircle>
              <StepLabel active={currentStep === i}>{step}</StepLabel>
            </StepItem>
            {i < STEPS.length - 1 && <StepLine completed={currentStep > i} />}
          </React.Fragment>
        ))}
      </StepperInner>
    </StepperWrapper>
  );

  const renderSearchStep = () => (
    <FormCard>
      <FormCardTitle>Enter search details</FormCardTitle>
      <FormCardSub>
        Provide the details of the individual you want to verify.
      </FormCardSub>

      {error && <ErrorAlert>{error}</ErrorAlert>}

      <SearchGrid>
        <div>
          <FormGroup>
            <FormLabel>ID Type</FormLabel>
            <IdTypeDisplay>
              <FaIdCard />
              {config.idTypeLabel}
            </IdTypeDisplay>
          </FormGroup>

          {config.fields.map((field, idx) => (
            <React.Fragment key={field.name}>
              {field.eitherOr &&
                idx > 0 &&
                config.fields[idx - 1]?.eitherOr === field.eitherOr && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      margin: "4px 0 12px",
                    }}
                  >
                    <div
                      style={{ flex: 1, height: 1, background: "#e5e7eb" }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#999",
                        fontFamily: "Nunito, sans-serif",
                      }}
                    >
                      OR
                    </span>
                    <div
                      style={{ flex: 1, height: 1, background: "#e5e7eb" }}
                    />
                  </div>
                )}
              <FormGroup>
                <FormLabel>
                  {field.label}
                  {field.required && (
                    <span style={{ color: "#dc2626" }}> *</span>
                  )}
                </FormLabel>
                {field.type === "select" ? (
                  <FormSelect
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </FormSelect>
                ) : (
                  <FormInput
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    maxLength={field.maxLength}
                  />
                )}
                {field.showCounter && (
                  <CharCounter>
                    {(formData[field.name] || "").length}/{field.maxLength}
                  </CharCounter>
                )}
              </FormGroup>
            </React.Fragment>
          ))}

          {config.bureaus && (
            <FormGroup>
              <FormLabel>
                Select Credit Bureau(s){" "}
                <span style={{ color: "#dc2626" }}> *</span>
              </FormLabel>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                {config.bureaus.map((bureau) => (
                  <label
                    key={bureau.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      border: `1.5px solid ${selectedBureaus[bureau.id] ? "#09c93a" : "#e5e7eb"}`,
                      borderRadius: 8,
                      cursor: "pointer",
                      background: selectedBureaus[bureau.id]
                        ? "#f0fdf4"
                        : "#fff",
                      transition: "all 0.15s",
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 14,
                      color: "#333",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedBureaus[bureau.id]}
                      onChange={(e) => {
                        setSelectedBureaus((prev) => ({
                          ...prev,
                          [bureau.id]: e.target.checked,
                        }));
                        setError("");
                      }}
                      style={{ accentColor: "#09c93a", width: 16, height: 16 }}
                    />
                    {bureau.label}
                  </label>
                ))}
              </div>
              {allBureausSelected && config.allBureausDiscount && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 12px",
                    background: "#f0fdf4",
                    border: "1px solid #d1fae5",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#16a34a",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  🎉 All 3 Bureaus Discount Applied: -{currencySymbol}
                  {(isNGN
                    ? config.allBureausDiscount.ngn
                    : config.allBureausDiscount.usd
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              )}
            </FormGroup>
          )}

          <YouWillGetCard>
            <YouWillGetTitle>You will get</YouWillGetTitle>
            <YouWillGetRow>
              {config.youWillGet.map((item, i) => (
                <YouWillGetItem key={i}>
                  <item.icon />
                  {item.text}
                </YouWillGetItem>
              ))}
            </YouWillGetRow>
          </YouWillGetCard>

          <SidebarNote>
            <FaShieldAlt /> Your data is secure and used only for verification.
          </SidebarNote>
        </div>

        <SidebarCard>
          <PriceLabel>Amount</PriceLabel>
          <PriceAmount>
            {loadingPrice
              ? "Loading..."
              : `${currencySymbol}${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </PriceAmount>
          <PriceBreakdown>
            {pricingData &&
              (() => {
                const processingFees = isNGN
                  ? (pricingData.serviceFee || 0) +
                    (pricingData.processingFee || 0)
                  : pricingData.serviceFeeusd || 0;
                const taxCharges = isNGN
                  ? pricingData.vat || 0
                  : pricingData.vatUsd || 0;
                const perBureau = processingFees + taxCharges;
                const subtotal = perBureau * bureauMultiplier;
                const totalToPay = subtotal - discount;
                return (
                  <>
                    <PriceRow>
                      <span>
                        Processing fees
                        {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                      </span>
                      <span>
                        {currencySymbol}
                        {(processingFees * bureauMultiplier).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </span>
                    </PriceRow>
                    <PriceRow>
                      <span>
                        Tax & charges
                        {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                      </span>
                      <span>
                        {currencySymbol}
                        {(taxCharges * bureauMultiplier).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </span>
                    </PriceRow>
                    {discount > 0 && (
                      <PriceRow>
                        <span style={{ color: "#16a34a" }}>Discount</span>
                        <span style={{ color: "#16a34a" }}>
                          -{currencySymbol}
                          {discount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </PriceRow>
                    )}
                    <PriceTotalRow>
                      <span>Total to be paid</span>
                      <span>
                        {currencySymbol}
                        {totalToPay.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </PriceTotalRow>
                  </>
                );
              })()}
          </PriceBreakdown>
          <ContinueBtn
            onClick={handleContinueToPayment}
            disabled={!isFormValid()}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Continue to Payment <FaArrowRight />
          </ContinueBtn>
        </SidebarCard>
      </SearchGrid>

      <FormActions>
        <ClearBtn onClick={handleClear}>Clear</ClearBtn>
      </FormActions>
    </FormCard>
  );

  const renderPaymentStep = () => (
    <>
      <PaymentGrid>
        <PaymentMethodsCard>
          <PaymentMethodTitle>Payment Method</PaymentMethodTitle>
          <PaymentMethodSub>Choose how you'd like to pay</PaymentMethodSub>

          {PAYMENT_METHODS.map((method) => (
            <PaymentOption
              key={method.id}
              selected={paymentMethod === method.id}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method.icon && (
                <method.icon style={{ fontSize: 16, color: "#555" }} />
              )}
              <PaymentOptionLabel>{method.label}</PaymentOptionLabel>
              {method.badge && (
                <PaymentOptionBadge>{method.badge}</PaymentOptionBadge>
              )}
              {method.id === "wallet" && (
                <span
                  style={{
                    fontSize: 11,
                    color: "#777",
                    fontFamily: "Nunito",
                  }}
                >
                  {currencySymbol}
                  {userBalance.toLocaleString()}
                </span>
              )}
            </PaymentOption>
          ))}
        </PaymentMethodsCard>

        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>Verification Summary</SummaryTitle>
            <SummaryAmount>
              {loadingPrice
                ? "..."
                : `${currencySymbol}${totalAmount.toLocaleString()}`}
            </SummaryAmount>
          </SummaryHeader>

          <SummaryRow>
            <SummaryLabel>Service</SummaryLabel>
            <SummaryValue>{config.serviceName}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Type</SummaryLabel>
            <SummaryValue>{config.idTypeLabel}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Value</SummaryLabel>
            <SummaryValue>
              {formData[config.serviceFieldKey] ||
                config.fields
                  .map((f) => formData[f.name])
                  .find((v) => v?.trim()) ||
                "—"}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Email</SummaryLabel>
            <SummaryValue>{userEmail || "—"}</SummaryValue>
          </SummaryRow>

          {pricingData && (
            <>
              <div
                style={{
                  borderTop: "1px solid #f0f0f0",
                  margin: "12px 0",
                }}
              />
              {config.bureaus && bureauCount > 0 && (
                <SummaryRow>
                  <SummaryLabel>Bureaus</SummaryLabel>
                  <SummaryValue>{bureauCount} selected</SummaryValue>
                </SummaryRow>
              )}
              <SummaryRow>
                <SummaryLabel>
                  Processing Fee
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isNGN
                      ? (pricingData.serviceFee || 0) +
                        (pricingData.processingFee || 0)
                      : pricingData.serviceFeeusd || 0) * bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>
                  Tax & charges
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isNGN ? pricingData.vat : pricingData.vatUsd || 0) *
                    bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              {discount > 0 && (
                <SummaryRow>
                  <SummaryLabel style={{ color: "#16a34a" }}>
                    Discount
                  </SummaryLabel>
                  <SummaryValue style={{ color: "#16a34a" }}>
                    -{currencySymbol}
                    {discount.toLocaleString()}
                  </SummaryValue>
                </SummaryRow>
              )}
            </>
          )}

          <PayBtn onClick={handlePay} disabled={loading || loadingPrice}>
            <FaLock />
            {loading
              ? "Processing..."
              : `Pay ${currencySymbol}${totalAmount.toLocaleString()}`}
          </PayBtn>

          <SecuredBy>
            <FaShieldAlt style={{ color: "#09c93a" }} />
            Secured and encrypted payment
          </SecuredBy>

          <div style={{ marginTop: 16 }}>
            <ClearBtn onClick={handleBackToSearch} style={{ width: "100%" }}>
              <FaArrowLeft style={{ marginRight: 8 }} />
              Back to Search
            </ClearBtn>
          </div>
        </SummaryCard>
      </PaymentGrid>

      {/* Sample Result */}
      <SampleSection>
        <SampleHeader>
          <SampleTitle>Sample Result</SampleTitle>
        </SampleHeader>
        <SampleSub>
          Here's an example of what your verification result will look like.
        </SampleSub>
        <SampleResultCard>
          <SampleAvatar>
            <FaUserCircle />
          </SampleAvatar>
          <SampleInfo>
            <SampleName>
              {config.sampleResult.name}
              <VerifiedBadge>
                <FaCheckCircle /> Verified
              </VerifiedBadge>
            </SampleName>
            <SampleId>{config.sampleResult.identifier}</SampleId>
            <SampleTags>
              {config.sampleResult.tags.map((tag, i) => (
                <SampleTag key={i}>
                  <FaCheckCircle /> {tag}
                </SampleTag>
              ))}
            </SampleTags>
          </SampleInfo>
        </SampleResultCard>
      </SampleSection>
    </>
  );

  const renderProcessingStep = () => (
    <ProcessingWrapper>
      <ProcessingSpinner />
      <ProcessingText>Processing Your Verification</ProcessingText>
      <ProcessingSub>
        Please wait while we verify your information. This usually takes less
        than a minute.
      </ProcessingSub>
    </ProcessingWrapper>
  );

  const renderResultStep = () => (
    <ProcessingWrapper>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#e6f9ed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <FaCheckCircle style={{ fontSize: 28, color: "#09c93a" }} />
      </div>
      <ProcessingText>Verification Complete!</ProcessingText>
      <ProcessingSub>
        Your results are ready. Redirecting to your dashboard...
      </ProcessingSub>
    </ProcessingWrapper>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderSearchStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderProcessingStep();
      case 3:
        return renderResultStep();
      default:
        return renderSearchStep();
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection>
        <Breadcrumb>
          <span>Home</span> / <span>{config.breadcrumb[0]}</span> /{" "}
          <span>{config.breadcrumb[1]}</span>
        </Breadcrumb>
        <HeroInner>
          <HeroText>
            <HeroTitle>
              {config.heroTitle} <span>{config.heroHighlight}</span>
            </HeroTitle>
            <HeroSubtitle>{config.heroSubtitle}</HeroSubtitle>
          </HeroText>
          <HeroImage src={config.heroImage} alt={config.serviceName} />
        </HeroInner>
      </HeroSection>

      {/* Stepper */}
      {renderStepper()}

      {/* Content */}
      <ContentWrapper>{renderStepContent()}</ContentWrapper>

      {/* Trust Bar */}
      <TrustBar>
        <TrustBarInner>
          {[
            {
              icon: FaShieldAlt,
              ...config.trustBar[0],
            },
            {
              icon: FaBolt,
              ...config.trustBar[1],
            },
            {
              icon: FaCheckCircle,
              ...config.trustBar[2],
            },
            {
              icon: FaUsers,
              ...config.trustBar[3],
            },
          ].map((item, i) => (
            <TrustItem key={i}>
              <TrustIcon>
                <item.icon />
              </TrustIcon>
              <TrustText>
                <TrustTitle>{item.title}</TrustTitle>
                <TrustDesc>{item.desc}</TrustDesc>
              </TrustText>
            </TrustItem>
          ))}
        </TrustBarInner>
      </TrustBar>
    </PageWrapper>
  );
};

export default VerifyPage;
