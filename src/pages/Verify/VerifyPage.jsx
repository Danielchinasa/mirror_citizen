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
  const userToken = useSelector((state) => state.userToken);
  const userDetails = useSelector((state) => state.userDetails);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

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

  const totalAmount = pricingData
    ? isNGN
      ? pricingData.price + pricingData.serviceFee + pricingData.vat
      : pricingData.priceUsd +
        (pricingData.serviceFeeusd || 0) +
        (pricingData.vatUsd || 0)
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleClear = () => {
    setFormData({});
    setError("");
  };

  const isFormValid = () => {
    return config.fields
      .filter((f) => f.required)
      .every((f) => formData[f.name]?.trim());
  };

  /* ── Step navigation ── */

  const handleContinueToPayment = () => {
    if (!isFormValid()) {
      setError("Please fill in all required fields.");
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

          {config.fields.map((field) => (
            <FormGroup key={field.name}>
              <FormLabel>
                {field.label}
                {field.required && <span style={{ color: "#dc2626" }}> *</span>}
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
          ))}

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
            <PriceRow>
              <span>Service</span>
              <span>{config.serviceName}</span>
            </PriceRow>
            {pricingData && (
              <>
                <PriceRow>
                  <span>Base price</span>
                  <span>
                    {currencySymbol}
                    {(isNGN
                      ? pricingData.price
                      : pricingData.priceUsd
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </PriceRow>
                <PriceRow>
                  <span>Service fee</span>
                  <span>
                    {currencySymbol}
                    {(isNGN
                      ? pricingData.serviceFee
                      : pricingData.serviceFeeusd || 0
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </PriceRow>
                <PriceRow>
                  <span>VAT</span>
                  <span>
                    {currencySymbol}
                    {(isNGN
                      ? pricingData.vat
                      : pricingData.vatUsd || 0
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </PriceRow>
              </>
            )}
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
              {formData[config.serviceFieldKey] || "—"}
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
              <SummaryRow>
                <SummaryLabel>Service Fee</SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(isNGN
                    ? pricingData.price
                    : pricingData.priceUsd
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Processing Fee</SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(isNGN
                    ? pricingData.serviceFee
                    : pricingData.serviceFeeusd || 0
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>VAT</SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(isNGN
                    ? pricingData.vat
                    : pricingData.vatUsd || 0
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
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
