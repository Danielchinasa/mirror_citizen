import React, { useState, useEffect, useCallback, useRef } from "react";
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
  FaIdCard,
  FaInfoCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  initiateVerificationRequest,
  completeVerificationRequest,
  fetchUserProfile,
  fetchVerificationServicePrices,
} from "../../redux/actions";
import { apiGet } from "../../apiUtils";
import { initiatePaystackPayment } from "../../services/paystackService";
import baseUrl from "../../apiConfig";
import paystackLogo from "../../images/paystack.png";
import flutterwaveLogo from "../../images/flutterwave-logos-idVM8GW1LQ.png";
import verificationConfig from "./verificationConfig";
import { SampleResultContent } from "../../components/SampleResultPopup/SampleResultPopup";
import RecommendedOffers from "../../components/ads/RecommendedOffers";
import { withBasePath } from "../../routing";
import privacyPdf from "../../images/e-citizen Ghana Privacy Notice v1.2 - Confirmed Service Scope.pdf";
import termsPdf from "../../images/e-citizen Ghana Terms of Service v1.2 - Confirmed Service Scope.pdf";

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
  PopupOverlay,
  PopupCard,
  PopupHeader,
  PopupMeta,
  PopupIcon,
  PopupTitle,
  PopupSubtitle,
  PopupCloseButton,
  PopupBody,
  PopupRow,
  PopupField,
  PopupFieldLabel,
  PopupFieldValue,
  PopupActionRow,
  ResultCardPopup,
  ResultTopPopup,
  ResultPhotoPopup,
  ResultGridPopup,
  ResultFieldPopup,
  ResultLabelPopup,
  ResultValuePopup,
  VerifiedBadgePopup,
  ResultFooterPopup,
  ResultDisclaimerPopup,
  ErrorAlert,
} from "./VerifyPage.elements";

// Steps are now dynamic — defined inside the component based on config.requiresConsent

const PAYMENT_METHODS = [
  {
    id: "wallet",
    label: "Wallet",
    icon: FaWallet,
    paymentType: "WALLET",
  },
  {
    id: "flutterwave",
    label: "",
    icon: null,
    paymentType: "INSTANT",
  },
  // {
  //   id: "paystack",
  //   label: "Paystack",
  //   icon: null,
  //   paymentType: "INSTANT",
  // },
];

function generateTransactionId() {
  let transactionId = "EA";
  for (let i = 0; i < 14; i++) {
    transactionId += Math.floor(Math.random() * 10);
  }
  return transactionId;
}

const LOCAL_COUNTRY_CODE = "GH";
const LOCAL_CURRENCY = "GHS";
const FOREIGN_CURRENCY = "USD";

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
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [currencyCheck, setCurrencyCheck] = useState(
    (localStorage.getItem("currencyCheck") || LOCAL_CURRENCY).toUpperCase(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedBureaus, setSelectedBureaus] = useState({});
  const [paystackModalOpen, setPaystackModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paystackReference, setPaystackReference] = useState("");
  const [activeGateway, setActiveGateway] = useState(""); // "paystack" or "flutterwave"
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [consentPending, setConsentPending] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [consentRequestId, setConsentRequestId] = useState("");
  const pollingRef = useRef(null);
  const pendingApiFormRef = useRef(null);
  const consentPollingRef = useRef(null);

  // Dynamic steps based on whether this verification type requires consent
  const requiresConsent = config?.requiresConsent || false;
  const STEPS = requiresConsent
    ? ["Search", "Payment", "Processing", "Consent", "Result"]
    : ["Search", "Payment", "Processing", "Result"];
  const RESULT_STEP = requiresConsent ? 4 : 3;
  const CONSENT_STEP = 3;

  // Redirect if invalid type
  useEffect(() => {
    if (!config) {
      history.replace("/dashboard");
    }
  }, [config, history]);

  // Poll payment status for Paystack or Flutterwave
  useEffect(() => {
    if (!paystackModalOpen || !paystackReference) return;

    const terminalStatuses = [
      "successful",
      "success",
      "failed",
      "abandoned",
      "cancelled",
      "error",
      "reversed",
    ];

    const checkEndpoint =
      activeGateway === "flutterwave"
        ? `${baseUrl}/payment/check?transactionRef=${paystackReference}`
        : `${baseUrl}/payment/check-pulse?transactionRef=${paystackReference}`;

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(checkEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const status = (
            data?.status ||
            data?.data?.status ||
            ""
          ).toLowerCase();
          if (terminalStatuses.includes(status)) {
            handlePaystackModalClose();
          }
        }
      } catch {
        // Ignore polling errors
      }
    }, 4000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [paystackModalOpen, paystackReference, userToken, activeGateway]);

  // Consent polling
  useEffect(() => {
    if (!consentPending || !consentRequestId) return;

    const checkConsent = async () => {
      try {
        const response = await apiGet(
          `/verification/check-consent/${consentRequestId}`,
          userToken,
        );
        if (response?.consent === "granted") {
          setConsentPending(false);
          setCurrentStep(RESULT_STEP);
          if (consentPollingRef.current)
            clearInterval(consentPollingRef.current);
        }
      } catch (err) {
        console.error("Consent check error:", err);
      }
    };

    // Check immediately, then poll every 15 seconds
    checkConsent();
    consentPollingRef.current = setInterval(checkConsent, 15000);

    return () => {
      if (consentPollingRef.current) clearInterval(consentPollingRef.current);
    };
  }, [consentPending, consentRequestId, userToken]);

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (consentPollingRef.current) clearInterval(consentPollingRef.current);
    };
  }, []);

  // Use stored IP/country from main landing page, only fetch if missing
  useEffect(() => {
    let isMounted = true;

    const syncCurrencyFromLiveIp = async () => {
      // First check if IP and country are already stored from main landing page
      const storedIp = localStorage.getItem("IpAddress");
      const storedCountry = localStorage.getItem("userCountry");
      const storedCurrency = localStorage.getItem("currencyCheck");

      // If we have all stored values, use them (main landing page already fetched)
      if (storedIp && storedCountry && storedCurrency) {
        if (isMounted) {
          setCurrencyCheck(storedCurrency.toUpperCase());
        }
        console.log(
          "✅ VerifyPage using stored IP/Country:",
          storedIp,
          storedCountry,
          storedCurrency,
        );
        return; // Don't fetch again
      }

      // Otherwise, fetch IP and country (fallback for direct page access)
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("ipapi request failed");

        const data = await response.json();
        const countryCode = (
          data?.country_code ||
          data?.country ||
          ""
        ).toUpperCase();

        if (data?.ip) {
          localStorage.setItem("IpAddress", data.ip);
        }

        if (countryCode) {
          localStorage.setItem("userCountry", countryCode);
          const detectedCurrency =
            countryCode === LOCAL_COUNTRY_CODE
              ? LOCAL_CURRENCY
              : FOREIGN_CURRENCY;

          if (isMounted) {
            setCurrencyCheck(detectedCurrency);
          }

          localStorage.setItem("currencyCheck", detectedCurrency);
          return;
        }
      } catch (error) {
        console.error("VerifyPage IP lookup failed:", error);
      }

      // Fallback to ipbase.com for IP and country
      try {
        const fallback = await fetch("https://api.ipbase.com/v1/json/");
        if (fallback.ok) {
          const fallbackData = await fallback.json();
          const ip = fallbackData?.ip;
          const country =
            fallbackData?.country_code || fallbackData?.countryCode;

          if (ip) {
            localStorage.setItem("IpAddress", ip);
          }

          if (country) {
            localStorage.setItem("userCountry", country);
            const detectedCurrency =
              country.toUpperCase() === LOCAL_COUNTRY_CODE
                ? LOCAL_CURRENCY
                : FOREIGN_CURRENCY;

            if (isMounted) {
              setCurrencyCheck(detectedCurrency);
            }
            localStorage.setItem("currencyCheck", detectedCurrency);
            return;
          }
        }
      } catch (fallbackError) {
        console.error("VerifyPage fallback IP lookup failed:", fallbackError);
      }

      // Both APIs failed - use default Ghana values
      const defaultIp = "102.131.16.255";
      const defaultCountry = "GH";
      const defaultCurrency = "GHS";
      localStorage.setItem("IpAddress", defaultIp);
      localStorage.setItem("userCountry", defaultCountry);
      localStorage.setItem("currencyCheck", defaultCurrency);

      if (isMounted) {
        setCurrencyCheck(defaultCurrency);
      }
    };

    syncCurrencyFromLiveIp();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (currencyCheck) {
      localStorage.setItem("currencyCheck", currencyCheck);
    }
  }, [currencyCheck]);

  // Fetch service prices
  useEffect(() => {
    if (!config || !userToken) return;

    const fetchPrices = async () => {
      try {
        const pricingData = await dispatch(
          fetchVerificationServicePrices(config, userToken),
        );
        setLoadingPrice(false);
        setPricingData(pricingData);
      } catch (err) {
        setLoadingPrice(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not fetch service prices. Please try again.",
          confirmButtonColor: "#FED001",
        });
      }
    };
    fetchPrices();
  }, [config, userToken]);

  if (!config) return null;

  const isGHS = currencyCheck === LOCAL_CURRENCY;

  const bureauCount = config?.bureaus
    ? Object.values(selectedBureaus).filter(Boolean).length
    : 0;
  const allBureausSelected =
    config?.bureaus && bureauCount === config.bureaus.length;
  const bureauMultiplier = config?.bureaus ? Math.max(bureauCount, 1) : 1;
  const discount =
    allBureausSelected && config?.allBureausDiscount
      ? isGHS
        ? config.allBureausDiscount.ngn
        : config.allBureausDiscount.usd
      : 0;

  const serviceFeePerCheck = isGHS
    ? Number(pricingData?.serviceFee || 0)
    : Number(pricingData?.serviceFeeusd || 0);
  const processingFeePerCheck = isGHS
    ? Number(pricingData?.processingFee || 0)
    : Number(pricingData?.processingFeeUsd || 0);
  const vatPerCheck = isGHS
    ? Number(pricingData?.vat || 0)
    : Number(pricingData?.vatUsd || 0);

  const serviceFeeTotal = serviceFeePerCheck * bureauMultiplier;
  const processingFeeTotal = processingFeePerCheck * bureauMultiplier;
  const vatTotal = vatPerCheck * bureauMultiplier;
  const displayProcessingFeeTotal = serviceFeeTotal;
  const displayTaxAndChargesTotal = vatTotal + processingFeeTotal;
  const subtotalAmount = serviceFeeTotal + processingFeeTotal + vatTotal;

  const totalAmount = pricingData ? Math.max(subtotalAmount - discount, 0) : 0;

  const currencySymbol = isGHS ? "GH₵" : "$";

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

    // Check consent contact (at least one required when config has these fields)
    const hasConsentContactFields = config.fields.some(
      (f) => f.name === "subjectPhone" || f.name === "subjectEmail",
    );
    const consentContactValid = hasConsentContactFields
      ? formData.subjectPhone?.trim() || formData.subjectEmail?.trim()
      : true;

    return requiredValid && eitherOrValid && bureauValid && consentContactValid;
  };

  /* ── Step navigation ── */

  const handleContinueToPayment = () => {
    if (!isFormValid()) {
      const hasEitherOr = config.fields.some((f) => f.eitherOr);
      const noBureauSelected =
        config.bureaus && !Object.values(selectedBureaus).some(Boolean);
      const hasConsentContactFields = config.fields.some(
        (f) => f.name === "subjectPhone" || f.name === "subjectEmail",
      );
      const noConsentContact =
        hasConsentContactFields &&
        !formData.subjectPhone?.trim() &&
        !formData.subjectEmail?.trim();
      setError(
        noConsentContact
          ? "Please provide the subject's phone number or email for consent."
          : noBureauSelected
            ? "Please select at least one credit bureau."
            : hasEitherOr
              ? "Please fill in at least one of the fields."
              : "Please fill in all required fields.",
      );
      return;
    }
    setError("");
    setShowDisclaimer(true);
  };

  const handleDisclaimerConfirm = () => {
    setShowDisclaimer(false);
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
      serviceCode: config.serviceCode || "",
      idNumber: "",
      nin: "",
      alien_card: "",
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
      consent: "true",
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

    // For wallet payments by non-Ghanaian users, verify wallet currency matches payment currency
    const userCurrency = user?.currency || "";
    if (
      paymentMethod === "wallet" &&
      currencyCheck.toUpperCase() !== "GHS" &&
      userCurrency &&
      userCurrency.toUpperCase() !== currencyCheck.toUpperCase()
    ) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Currency Mismatch",
        text: "Wallet currency must match payment currency. Please use the right currency for this transaction.",
        confirmButtonColor: "#987D0E",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

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
      const initiatePayload = initiateResponse?.data || initiateResponse || {};

      if (initiatePayload?.status === "INITIATED") {
        localStorage.setItem("sessionCode", initiatePayload?.sessionId);
        apiFormData.sessionId = initiatePayload?.sessionId;
        apiFormData.idNumber =
          apiFormData.idNumber || formData.idNumber || formData.nin || "";
      } else {
        throw new Error(
          initiatePayload?.message || "Failed to initiate verification",
        );
      }

      // 2. Process payment based on method
      if (paymentMethod === "wallet") {
        await handleWalletPayment(randomTransactionId, apiFormData);
      } else if (paymentMethod === "flutterwave") {
        await handleFlutterwavePayment(randomTransactionId, apiFormData);
      } else {
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
        confirmButtonColor: "#FED001",
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
        confirmButtonColor: "#FED001",
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
        pendingApiFormRef.current = apiFormData;
        setPaymentUrl(response.data.authorization_url);
        setPaystackReference(response.data.reference);
        setActiveGateway("paystack");
        setPaystackModalOpen(true);
        setLoading(false);
        setCurrentStep(1); // Stay on payment step while modal is open
      } else {
        throw new Error("Failed to initialize payment gateway");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleFlutterwavePayment = async (transactionId, apiFormData) => {
    try {
      const postData = {
        amount: totalAmount,
        currency: currencyCheck,
        country: "NG",
        description: "Payment for verification",
        payment_method: "card,mobilemoney,ussd",
        type: "VERIFICATION",
        sessionCode: localStorage.getItem("sessionCode"),
      };

      const response = await fetch(`${baseUrl}/payment/flexi-initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();

      if (responseData?.data?.link) {
        pendingApiFormRef.current = apiFormData;
        setPaymentUrl(responseData.data.link);
        setPaystackReference(responseData.data.txRef || transactionId);
        localStorage.setItem(
          "transactionID",
          responseData.data.txRef || transactionId,
        );
        setActiveGateway("flutterwave");
        setPaystackModalOpen(true);
        setLoading(false);
        setCurrentStep(1);
      } else {
        throw new Error("Failed to initialize Flutterwave payment");
      }
    } catch (err) {
      throw err;
    }
  };

  const handlePaystackModalClose = async () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setPaystackModalOpen(false);
    setPaymentUrl("");

    if (!paystackReference) return;

    const checkEndpoint =
      activeGateway === "flutterwave"
        ? `${baseUrl}/payment/check?transactionRef=${paystackReference}`
        : `${baseUrl}/payment/check-pulse?transactionRef=${paystackReference}`;

    try {
      const res = await fetch(checkEndpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Payment Cancelled",
          text: "Your payment was cancelled or declined.",
          confirmButtonColor: "#FED001",
        });
        return;
      }

      const data = await res.json();
      const status = (data?.status || data?.data?.status || "").toLowerCase();

      if (status === "successful" || status === "success") {
        // Payment succeeded — proceed with verification
        setLoading(true);
        setCurrentStep(2); // Processing
        if (pendingApiFormRef.current) {
          await handleCompleteVerification(pendingApiFormRef.current);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Your payment could not be completed. Please try again.",
          confirmButtonColor: "#FED001",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not verify payment status. Please check your dashboard.",
        confirmButtonColor: "#FED001",
      });
    }

    setPaystackReference("");
  };

  const handleCompleteVerification = async (apiFormData) => {
    try {
      const response = await dispatch(
        completeVerificationRequest(apiFormData, userToken),
      );

      dispatch(fetchUserProfile(userToken));
      setLoading(false);

      // Determine result and result page route
      let result = null;
      let resultTitle = "Verification Successful";
      let resultDetail = "";
      let resultRoute = "/main-dashboard";

      if (response?.status === "COMPLETED" && response?.result) {
        result = {
          ...response.result,
          provider: response.provider,
          resultCode: response.resultCode,
          jobId: response.jobId,
          pricingSegment: response.pricingSegment,
          amount: response.amount,
          currency: response.currency,
          resultStatus: response.status,
          resultText: response.resultText,
        };
        resultTitle = `${config.serviceName} Successful`;
        resultDetail =
          response.resultText || `${config.serviceName} was successful.`;

        // Check if it's a vehicle verification
        if (result.vehicleName || result.vehicleSpecification || result.vin) {
          resultRoute = "/main-dashboard";
        } else {
          resultRoute = "/main-dashboard";
        }
      } else if (
        response.basic &&
        response.basic.status &&
        response.basic.status === true
      ) {
        result =
          response.basic?.nin_data || response.basic?.data || response.basic;
        resultDetail = response.basic.detail || "Your Ghana ID was successful.";
        resultRoute = "/main-dashboard";
      } else if (
        response.basic &&
        typeof response.basic.status === "boolean" &&
        response.basic.status === false
      ) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: response.basic.detail,
          confirmButtonColor: "#FED001",
        });
        setCurrentStep(1);
        return;
      } else if (
        response["search-extension"] &&
        response["search-extension"].phoneVerification &&
        response["search-extension"].phoneVerification.status === true
      ) {
        result = response["search-extension"].phoneVerification;
        resultDetail =
          response["search-extension"].phoneVerification.detail ||
          "Phone verification was successful.";
        resultRoute = "/main-dashboard";
      } else if (
        response["search-extension"] &&
        response["search-extension"].phoneVerification &&
        response["search-extension"].phoneVerification.status === false
      ) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text:
            response["search-extension"].phoneVerification.detail ||
            "Verification failed",
          confirmButtonColor: "#FED001",
        });
        setCurrentStep(1);
        return;
      } else if (
        response["search-extension"] &&
        response["search-extension"].bvnVerification &&
        response["search-extension"].bvnVerification.status === true
      ) {
        result = response["search-extension"].bvnVerification;
        resultDetail =
          response["search-extension"].bvnVerification.detail ||
          "BVN verification was successful.";
        resultRoute = "/main-dashboard";
      } else if (response.business && response.business.success === true) {
        const bizData = Array.isArray(response.business.data)
          ? response.business.data[0]?.data
          : response.business.data;
        result = bizData || response.business;
        resultTitle = "Business Verification Successful";
        resultDetail =
          bizData?.approvedName || "Business has been verified successfully.";
        resultRoute = "/main-dashboard";
      } else if (response.business && response.business.success === false) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: response.business.message,
          confirmButtonColor: "#FED001",
        });
        setCurrentStep(1);
        return;
      } else if (response.financial && response.financial.success === true) {
        result = response.financial;
        resultDetail =
          response.financial.message ||
          "Financial verification was successful.";
        resultRoute = "/main-dashboard";
      } else if (response.financial && response.financial.success === false) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: response.financial.message,
          confirmButtonColor: "#FED001",
        });
        setCurrentStep(1);
        return;
      } else if (
        response?.advance ||
        response?.firstCentral ||
        response?.crc ||
        response?.creditRegistry
      ) {
        // Credit bureau — check which bureaus returned data
        const bureauResults = [];
        const bureauErrors = [];
        if (response?.crc) {
          if (response.crc.data && response.crc.data !== "null")
            bureauResults.push("CRC");
          else if (response.crc.error)
            bureauErrors.push(
              "CRC: " + (response.crc.error.message || "Failed"),
            );
        }
        if (response?.firstCentral) {
          if (
            response.firstCentral.data &&
            response.firstCentral.data !== "null"
          )
            bureauResults.push("First Central");
          else if (response.firstCentral.error)
            bureauErrors.push(
              "First Central: " +
                (response.firstCentral.error.message || "Failed"),
            );
        }
        if (response?.creditRegistry) {
          if (
            response.creditRegistry.data &&
            response.creditRegistry.data !== "null"
          )
            bureauResults.push("Credit Registry");
          else if (response.creditRegistry.error)
            bureauErrors.push(
              "Credit Registry: " +
                (response.creditRegistry.error.message || "Failed"),
            );
        }
        if (response?.advance) {
          if (response.advance.data && response.advance.data !== "null")
            bureauResults.push("Advance");
          else if (response.advance.error)
            bureauErrors.push(
              "Advance: " + (response.advance.error.message || "Failed"),
            );
        }

        const hasAnyData = bureauResults.length > 0;

        if (hasAnyData) {
          result = {
            bureauResults,
            bureauErrors,
            advance: response?.advance,
            firstCentral: response?.firstCentral,
            crc: response?.crc,
            creditRegistry: response?.creditRegistry,
          };
          resultTitle =
            bureauErrors.length > 0
              ? "Partial Results Available"
              : "Credit Profile Results";
          resultDetail = `Data received from: ${bureauResults.join(", ")}.`;
          resultRoute = "/financial-profile-result";
        } else {
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text:
              bureauErrors.length > 0
                ? bureauErrors.join("\n")
                : "Verification failed. Please try again.",
            confirmButtonColor: "#FED001",
          });
          setCurrentStep(1);
          return;
        }
      } else if (
        response?.status === "PENDING_CONSENT" &&
        response?.result?.subjectConsent
      ) {
        // Backend returned PENDING_CONSENT — subject consent is required
        const consent = response.result.subjectConsent;
        const channels = consent.channels || {};
        const channelList = [];
        if (channels.email) channelList.push("📧 Email");
        if (channels.whatsapp) channelList.push("💬 WhatsApp");

        Swal.fire({
          icon: "info",
          title: "Consent Pending",
          html: `
            <div style="text-align: left; font-family: 'Nunito', sans-serif;">
              <p style="margin-bottom: 12px; font-size: 14px; color: #333;">
                ${
                  consent.message ||
                  response.resultText ||
                  "Consent request sent to the subject."
                }
              </p>
              <div style="background: #f0f9ff; padding: 14px; border-radius: 8px; margin-bottom: 12px; font-size: 13px; line-height: 1.8;">
                <strong>Status:</strong> ${consent.status}<br/>
                <strong>Required:</strong> ${consent.required ? "Yes" : "No"}
                ${
                  channelList.length > 0
                    ? `<br/><strong>Channels:</strong> ${channelList.join(", ")}`
                    : ""
                }
              </div>
              <p style="font-size: 13px; color: #666; margin: 0;">
                Results will be available after the subject accepts the consent request.
              </p>
            </div>
          `,
          confirmButtonColor: "#FED001",
          confirmButtonText: "OK",
        });

        // Set up consent polling using jobId from the response
        const requestId = response.jobId || "";
        if (requestId) {
          setConsentRequestId(requestId);
          localStorage.setItem("verificationRequestId", requestId);
          setConsentPending(true);
          setCurrentStep(CONSENT_STEP);
        } else {
          setCurrentStep(1);
        }
        return;
      }

      if (result) {
        setVerificationResult({
          data: result,
          title: resultTitle,
          detail: resultDetail,
          route: resultRoute,
        });

        if (requiresConsent) {
          // Extract requestId from API response for consent polling
          const requestId =
            response.basic?.data?.requestId ||
            response.basic?.requestId ||
            response["search-extension"]?.bvnVerification?.requestId ||
            response.financial?.requestId ||
            "";

          if (requestId) {
            setConsentRequestId(requestId);
            localStorage.setItem("verificationRequestId", requestId);
            setConsentPending(true);
            setCurrentStep(CONSENT_STEP);
          } else {
            // No requestId — consent may already be granted, show results
            setShowResultPopup(true);
            setCurrentStep(RESULT_STEP);
          }
        } else {
          setShowResultPopup(true);
          setCurrentStep(2); // Keep processing visible while popup appears
        }
      } else {
        // Verification failed — generic fallback
        const errorMsg =
          response?.basic?.detail ||
          response?.["search-extension"]?.phoneVerification?.detail ||
          response?.["search-extension"]?.bvnVerification?.detail ||
          response?.business?.message ||
          response?.financial?.message ||
          "Verification could not be completed. A refund has been initiated.";
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: errorMsg,
          confirmButtonColor: "#FED001",
        });
        setCurrentStep(1);
      }
    } catch (err) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: "Service Unavailable",
        text: "Service is currently unavailable. A refund has been initiated.",
        confirmButtonColor: "#FED001",
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
              {/* Consent Contact Details section divider */}
              {field.name.startsWith("subject") &&
                idx > 0 &&
                !config.fields[idx - 1].name.startsWith("subject") && (
                  <div
                    style={{
                      margin: "24px 0 16px",
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#555",
                      fontFamily: "Nunito, sans-serif",
                      letterSpacing: 0.5,
                    }}
                  >
                    Consent Contact Details
                  </div>
                )}
              {/* Custom OR divider between subjectPhone and subjectEmail */}
              {field.name === "subjectEmail" &&
                idx > 0 &&
                config.fields[idx - 1].name === "subjectPhone" && (
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
                      border: `1.5px solid ${selectedBureaus[bureau.id] ? "#FED001" : "#e5e7eb"}`,
                      borderRadius: 8,
                      cursor: "pointer",
                      background: selectedBureaus[bureau.id]
                        ? "#fffbe6"
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
                      style={{ accentColor: "#FED001", width: 16, height: 16 }}
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
                    background: "#fffbe6",
                    border: "1px solid #fff3b0",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#b38b00",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  🎉 All 3 Bureaus Discount Applied: -{currencySymbol}
                  {(isGHS
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
            {pricingData && (
              <>
                <PriceRow>
                  <span>
                    Processing fee
                    {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                  </span>
                  <span>
                    {currencySymbol}
                    {displayProcessingFeeTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </PriceRow>
                <PriceRow>
                  <span>
                    Tax & charges
                    {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                  </span>
                  <span>
                    {currencySymbol}
                    {displayTaxAndChargesTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </PriceRow>
                {discount > 0 && (
                  <PriceRow>
                    <span style={{ color: "#b38b00" }}>Discount</span>
                    <span style={{ color: "#b38b00" }}>
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
                    {totalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </PriceTotalRow>
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
              {method.id === "paystack" && (
                <img
                  src={paystackLogo}
                  alt="Paystack"
                  style={{ height: 16, objectFit: "contain" }}
                />
              )}
              {method.id === "flutterwave" && (
                <img
                  src={flutterwaveLogo}
                  alt="Flutterwave"
                  style={{ height: 16, objectFit: "contain" }}
                />
              )}
              <PaymentOptionLabel>{method.label}</PaymentOptionLabel>
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
                  {displayProcessingFeeTotal.toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>
                  Tax & charges
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {displayTaxAndChargesTotal.toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              {discount > 0 && (
                <SummaryRow>
                  <SummaryLabel style={{ color: "#b38b00" }}>
                    Discount
                  </SummaryLabel>
                  <SummaryValue style={{ color: "#b38b00" }}>
                    -{currencySymbol}
                    {discount.toLocaleString()}
                  </SummaryValue>
                </SummaryRow>
              )}
            </>
          )}

          {/* Terms acceptance checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "12px 0",
              padding: "10px 14px",
              border: `1.5px solid ${termsAccepted ? "var(--ec-primary)" : "var(--ec-border)"}`,
              borderRadius: 8,
              cursor: "pointer",
              background: termsAccepted ? "#fffbe6" : "transparent",
              transition: "all 0.15s",
              fontFamily: "Nunito, sans-serif",
              fontSize: 13,
              color: "var(--ec-text)",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ accentColor: "#FED001", width: 16, height: 16, flexShrink: 0 }}
            />
            <span>
              By proceeding, you agree to our{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTermsModal(true);
                }}
                style={{
                  color: "var(--ec-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPrivacyModal(true);
                }}
                style={{
                  color: "var(--ec-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Privacy Policy
              </span>
              .
            </span>
          </label>

          <PayBtn onClick={handlePay} disabled={loading || loadingPrice || !termsAccepted}>
            <FaLock />
            {loading
              ? "Processing..."
              : `Pay ${currencySymbol}${totalAmount.toLocaleString()}`}
          </PayBtn>

          <SecuredBy>
            <FaShieldAlt style={{ color: "#111827" }} />
            Secured and encrypted payment
          </SecuredBy>

          <div style={{ marginTop: 16 }}>
            <ClearBtn onClick={handleBackToSearch} style={{ width: "100%" }}>
              <FaArrowLeft style={{ marginRight: 8 }} />
              Back
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
        <SampleResultContent type={type} />
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

  const getResultPreviewFields = () => {
    if (!verificationResult?.data) return [];
    const data = verificationResult.data;
    const fields = [];

    // ── Vehicle verification ──
    if (data.vehicleName || data.vin || data.vehicleSpecification) {
      if (data.vehicleName)
        fields.push({ label: "Vehicle", value: data.vehicleName });
      if (data.vin) fields.push({ label: "VIN", value: data.vin });

      const spec = data.vehicleSpecification || {};
      if (spec.year) fields.push({ label: "Year", value: spec.year });
      if (spec.category)
        fields.push({ label: "Category", value: spec.category });
      if (spec.make) fields.push({ label: "Make", value: spec.make });
      if (spec.model) fields.push({ label: "Model", value: spec.model });
      if (spec.trim) fields.push({ label: "Trim", value: spec.trim });
      if (spec.engine) fields.push({ label: "Engine", value: spec.engine });
      if (spec.transmission)
        fields.push({ label: "Transmission", value: spec.transmission });
      if (spec.drive_type)
        fields.push({ label: "Drive Type", value: spec.drive_type });

      if (data.verificationStatus)
        fields.push({
          label: "Verification Status",
          value: data.verificationStatus,
        });

      return fields.slice(0, 8);
    }

    // ── Ghana ID Card / basic result (new API format) ──
    // Check for new format fields first (fullName, idNumber, etc.)
    if (data.fullName || data.firstName || data.lastName || data.idNumber) {
      if (data.idNumber)
        fields.push({ label: "ID Number", value: data.idNumber });

      if (data.fullName)
        fields.push({ label: "Full Name", value: data.fullName });
      if (data.firstName)
        fields.push({ label: "First Name", value: data.firstName });
      if (data.lastName)
        fields.push({ label: "Last Name", value: data.lastName });

      if (data.dateOfBirth)
        fields.push({
          label: "Date of Birth",
          value: data.dateOfBirth,
        });
      if (data.gender)
        fields.push({
          label: "Gender",
          value:
            data.gender === "m"
              ? "Male"
              : data.gender === "f"
                ? "Female"
                : data.gender.charAt(0).toUpperCase() + data.gender.slice(1),
        });
      if (data.country)
        fields.push({
          label: "Country",
          value: data.country === "GH" ? "Ghana" : data.country,
        });

      return fields;
    }

    // ── Legacy NIN / basic result ──
    if (data.firstname || data.firstName || data.surname || data.lastname) {
      const fname = data.firstname || data.firstName;
      const mname = data.middlename || data.middleName;
      const lname = data.surname || data.lastname;
      if (fname) fields.push({ label: "First Name", value: fname });
      if (mname) fields.push({ label: "Middle Name", value: mname });
      if (lname) fields.push({ label: "Last Name", value: lname });
      if (data.gender)
        fields.push({
          label: "Gender",
          value:
            data.gender === "m"
              ? "Male"
              : data.gender === "f"
                ? "Female"
                : data.gender,
        });
      if (data.birthDate || data.dateOfBirth || data.birthdate)
        fields.push({
          label: "Date of Birth",
          value: data.birthDate || data.dateOfBirth || data.birthdate,
        });
      if (data.telephoneno || data.telephoneNo || data.phone)
        fields.push({
          label: "Phone",
          value: data.telephoneno || data.telephoneNo || data.phone,
        });
      if (data.residenceAddress || data.residence_address)
        fields.push({
          label: "Address",
          value: data.residenceAddress || data.residence_address,
        });
      return fields;
    }

    // Phone verification
    if (data.network) {
      if (data.name) fields.push({ label: "Owner Name", value: data.name });
      if (data.network) fields.push({ label: "Network", value: data.network });
      if (data.status) fields.push({ label: "Status", value: data.status });
      return fields;
    }

    // Business
    if (data.approvedName || data.companyName || data.company_name) {
      fields.push({
        label: "Business Name",
        value: data.approvedName || data.companyName || data.company_name,
      });
      if (data.rcNumber || data.rc_number)
        fields.push({
          label: "RC Number",
          value: data.rcNumber || data.rc_number,
        });
      if (data.registrationDate)
        fields.push({
          label: "Registration Date",
          value: new Date(data.registrationDate).toLocaleDateString(),
        });
      if (data.address && data.address !== "null")
        fields.push({ label: "Address", value: data.address });
      if (data.state && data.state !== "null")
        fields.push({ label: "State", value: data.state });
      if (data.lga && data.lga !== "null")
        fields.push({ label: "LGA", value: data.lga });
      if (data.email && data.email !== "null")
        fields.push({ label: "Email", value: data.email });
      if (data.companyStatus)
        fields.push({ label: "Status", value: data.companyStatus });
      return fields;
    }

    // Credit bureau
    if (data.advance || data.crc || data.firstCentral || data.creditRegistry) {
      if (data.crc) fields.push({ label: "CRC", value: "Data received" });
      if (data.firstCentral)
        fields.push({ label: "First Central", value: "Data received" });
      if (data.creditRegistry)
        fields.push({ label: "Credit Registry", value: "Data received" });
      return fields;
    }

    // Generic fallback
    Object.entries(data)
      .slice(0, 8)
      .forEach(([key, val]) => {
        if (
          typeof val === "string" &&
          val &&
          val !== "null" &&
          key !== "status" &&
          key !== "detail" &&
          key !== "photo" &&
          key !== "signature" &&
          key !== "rawData"
        ) {
          fields.push({
            label: key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase()),
            value: val,
          });
        }
      });

    return fields.slice(0, 12);
  };

  const renderConsentStep = () => (
    <FormCard>
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <ProcessingSpinner />
        <ProcessingText style={{ marginTop: 24 }}>
          Awaiting Consent
        </ProcessingText>
        <ProcessingSub
          style={{ maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}
        >
          We have sent a consent request to the data subject and are currently
          awaiting their response. An email will be sent to you regarding the
          status of your request.
        </ProcessingSub>
        <ProcessingSub
          style={{
            maxWidth: 520,
            margin: "16px auto 0",
            fontSize: 13,
            color: "#999",
          }}
        >
          The data subject's information will be retained for 24 hours from the
          moment they grant consent. This page will automatically update when
          consent is granted.
        </ProcessingSub>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          <ClearBtn onClick={() => history.push("/main-dashboard")}>
            Return to Dashboard
          </ClearBtn>
        </div>
      </div>
    </FormCard>
  );

  const renderResultStep = () => {
    const previewFields = getResultPreviewFields();
    const resultRoute = verificationResult?.route || "/main-dashboard";
    const resultTitle = verificationResult?.title || "Verification Complete!";
    const resultDetail = verificationResult?.detail || "";
    const bureauResults = verificationResult?.data?.bureauResults || [];
    const bureauErrors = verificationResult?.data?.bureauErrors || [];

    return (
      <FormCard>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#fdecec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <FaCheckCircle style={{ fontSize: 28, color: "#FED001" }} />
          </div>
          <ProcessingText>{resultTitle}</ProcessingText>
          <ProcessingSub>
            {resultDetail ||
              "Your verification has been completed successfully."}
          </ProcessingSub>
        </div>

        {/* Summary of what was submitted */}
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "20px 24px",
            marginBottom: 20,
          }}
        >
          <h4
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "#354138",
              margin: "0 0 16px",
            }}
          >
            Verification Summary
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 24px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontFamily: "Nunito, sans-serif",
                  marginBottom: 2,
                }}
              >
                Service
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#333",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                }}
              >
                {config.serviceName}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontFamily: "Nunito, sans-serif",
                  marginBottom: 2,
                }}
              >
                Amount Paid
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#333",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                }}
              >
                {currencySymbol}
                {totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            {config.fields.map((field) =>
              formData[field.name]?.trim() ? (
                <div key={field.name}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#999",
                      fontFamily: "Nunito, sans-serif",
                      marginBottom: 2,
                    }}
                  >
                    {field.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#333",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {formData[field.name]}
                  </div>
                </div>
              ) : null,
            )}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontFamily: "Nunito, sans-serif",
                  marginBottom: 2,
                }}
              >
                Status
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#FED001",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                }}
              >
                <FaCheckCircle
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                Successful
              </div>
            </div>
          </div>
        </div>

        {/* Bureau-specific results */}
        {(bureauResults.length > 0 || bureauErrors.length > 0) && (
          <div
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 20,
            }}
          >
            <h4
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#354138",
                margin: "0 0 12px",
              }}
            >
              Bureau Results
            </h4>
            {bureauResults.map((bureau, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <FaCheckCircle style={{ color: "#FED001", fontSize: 14 }} />
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: "Nunito, sans-serif",
                    color: "#333",
                  }}
                >
                  {bureau} — Data received
                </span>
              </div>
            ))}
            {bureauErrors.map((err, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "#dc2626", fontSize: 14 }}>✕</span>
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: "Nunito, sans-serif",
                    color: "#dc2626",
                  }}
                >
                  {err}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Preview fields from response data */}
        {previewFields.length > 0 && (
          <div
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 24,
            }}
          >
            <h4
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#354138",
                margin: "0 0 16px",
              }}
            >
              Result Preview
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 24px",
              }}
            >
              {previewFields.map((field, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#999",
                      fontFamily: "Nunito, sans-serif",
                      marginBottom: 2,
                    }}
                  >
                    {field.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#333",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <ContinueBtn
            onClick={() => history.push(resultRoute)}
            style={{ justifyContent: "center" }}
          >
            View Full Results <FaArrowRight />
          </ContinueBtn>
          <ClearBtn onClick={() => history.push("/main-dashboard")}>
            Go to Dashboard
          </ClearBtn>
        </div>
      </FormCard>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderSearchStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderProcessingStep();
      case 3:
        return requiresConsent ? renderConsentStep() : renderResultStep();
      case 4:
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
      <ContentWrapper>
        {renderStepContent()}
        <div style={{ display: "none" }}>
          <RecommendedOffers variant="green" />
        </div>
      </ContentWrapper>

      {/* Trust Bar */}
      {showResultPopup && verificationResult && (
        <PopupOverlay>
          <PopupCard>
            <PopupHeader>
              <PopupMeta>
                <PopupIcon>
                  <FaCheckCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>{verificationResult.title}</PopupTitle>
                  <PopupSubtitle>{verificationResult.detail}</PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton
                onClick={() => {
                  setShowResultPopup(false);
                  setCurrentStep(RESULT_STEP);
                }}
              >
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody>
              <ResultCardPopup>
                <ResultTopPopup>
                  {(() => {
                    const data = verificationResult?.data;
                    const isVehicle =
                      data?.vehicleName || data?.vehicleSpecification;

                    if (isVehicle && data.vehicleImage) {
                      // Vehicle verification - show vehicle image
                      return (
                        <div
                          style={{
                            width: "180px",
                            height: "120px",
                            borderRadius: "12px",
                            background: "var(--ec-bg-secondary)",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: "1px solid var(--ec-border)",
                          }}
                        >
                          <img
                            src={data.vehicleImage}
                            alt="Vehicle"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--ec-text-faint);font-size:48px;"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"></path></svg></div>`;
                            }}
                          />
                        </div>
                      );
                    }

                    // Profile photo for non-vehicle verification types
                    let photoSrc = null;
                    if (data) {
                      photoSrc =
                        data.photo ||
                        data.signature ||
                        data.image ||
                        data.profilePhoto ||
                        data.profilePic ||
                        data.picture ||
                        data.biometricPhoto ||
                        data.facialImage ||
                        data.faceImage ||
                        data.photoUrl ||
                        data.imageUrl;
                    }

                    return (
                      <ResultPhotoPopup>
                        {photoSrc ? (
                          (() => {
                            // Add data URI prefix if it's raw base64
                            if (!photoSrc.startsWith("data:")) {
                              // Detect image type from base64 signature
                              if (
                                photoSrc.startsWith("/9j/") ||
                                photoSrc.startsWith("iVBORw0KGgo")
                              ) {
                                const mimeType = photoSrc.startsWith("/9j/")
                                  ? "image/jpeg"
                                  : "image/png";
                                photoSrc = `data:${mimeType};base64,${photoSrc}`;
                              }
                            }

                            return (
                              <img
                                src={photoSrc}
                                alt="Verification photo"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                onError={(e) => {
                                  console.warn(
                                    "Image failed to load, falling back to icon",
                                  );
                                  e.target.style.display = "none";
                                }}
                              />
                            );
                          })()
                        ) : (
                          <FaUserCircle />
                        )}
                      </ResultPhotoPopup>
                    );
                  })()}
                  <ResultGridPopup>
                    {getResultPreviewFields().map((field, idx) => (
                      <ResultFieldPopup key={idx}>
                        <ResultLabelPopup>{field.label}</ResultLabelPopup>
                        {field.label === "Verification Status" ? (
                          <VerifiedBadgePopup>
                            VERIFIED <FaCheckCircle />
                          </VerifiedBadgePopup>
                        ) : (
                          <ResultValuePopup>{field.value}</ResultValuePopup>
                        )}
                      </ResultFieldPopup>
                    ))}
                  </ResultGridPopup>
                </ResultTopPopup>
                <ResultFooterPopup>
                  <span>
                    Verified on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    Ref: {localStorage.getItem("transactionID") || "N/A"}
                  </span>
                </ResultFooterPopup>
              </ResultCardPopup>
              <ResultDisclaimerPopup>
                <FaInfoCircle />
                Results are based on data available at the time of verification.
              </ResultDisclaimerPopup>
              <PopupActionRow>
                <ContinueBtn
                  onClick={() => {
                    setShowResultPopup(false);
                    history.push(
                      verificationResult?.route || "/main-dashboard",
                    );
                  }}
                >
                  View full result <FaArrowRight />
                </ContinueBtn>
                <ClearBtn
                  onClick={() => {
                    setShowResultPopup(false);
                    setCurrentStep(RESULT_STEP);
                  }}
                >
                  Close
                </ClearBtn>
              </PopupActionRow>
            </PopupBody>
          </PopupCard>
        </PopupOverlay>
      )}
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

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <PopupOverlay>
          <PopupCard style={{ maxWidth: 560 }}>
            <PopupHeader>
              <PopupMeta>
                <PopupIcon
                  style={{
                    background: "rgba(254, 208, 1, 0.10)",
                    color: "#FED001",
                  }}
                >
                  <FaInfoCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>Disclaimer</PopupTitle>
                  <PopupSubtitle>Please review before proceeding</PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowDisclaimer(false)}>
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody>
              <div
                style={{
                  background: "rgba(254, 208, 1, 0.06)",
                  border: "1px solid rgba(254, 208, 1, 0.2)",
                  borderRadius: 10,
                  padding: "16px 20px",
                  marginBottom: 20,
                }}
              >
                {type === "vehicle" ? (
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--ec-text)",
                    }}
                  >
                    By clicking, you indicate that:
                    <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                      <li style={{ marginBottom: 12 }}>
                        You confirm that search details are correct, and you
                        confirm that you will <strong>not be refunded</strong>{" "}
                        for incorrect information.
                      </li>
                      <li style={{ marginBottom: 12 }}>
                        You understand and accept that vehicle history data is
                        sourced from third-party providers and{" "}
                        <strong>may not contain all records</strong> for every
                        vehicle.
                      </li>
                      <li style={{ marginBottom: 0 }}>
                        You understand that{" "}
                        <strong>
                          search results may come back without any data
                        </strong>
                        , and you accept that you will not be refunded.
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--ec-text)",
                    }}
                  >
                    {requiresConsent && (
                      <li style={{ marginBottom: 12 }}>
                        You confirm that you understand and accept that{" "}
                        <strong>consent is required</strong> from the data
                        subject being verified before you can access their data,
                        and you accept that you will not be refunded if consent
                        is withheld.
                      </li>
                    )}
                    <li style={{ marginBottom: 12 }}>
                      You confirm and accept that the{" "}
                      <strong>search details are correct</strong>, and you
                      accept that you will not be refunded for incorrect
                      information.
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      You understand and accept that{" "}
                      <strong>
                        search details may come back without any data
                      </strong>
                      , and you accept that you will not be refunded.
                    </li>
                  </ol>
                )}
              </div>

              <PopupActionRow style={{ justifyContent: "center" }}>
                <ContinueBtn onClick={handleDisclaimerConfirm}>
                  I Understand, Continue <FaArrowRight />
                </ContinueBtn>
                <ClearBtn onClick={() => setShowDisclaimer(false)}>
                  Cancel
                </ClearBtn>
              </PopupActionRow>
            </PopupBody>
          </PopupCard>
        </PopupOverlay>
      )}

      {/* Paystack Payment Modal */}
      {paystackModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              width: "95%",
              maxWidth: 600,
              maxHeight: "90vh",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#354138",
                }}
              >
                Complete Payment —{" "}
                {activeGateway === "flutterwave" ? "Flutterwave" : "Paystack"}
              </h3>
              <button
                onClick={handlePaystackModalClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#999",
                  padding: "4px 8px",
                }}
              >
                ✕
              </button>
            </div>
            <iframe
              title={
                activeGateway === "flutterwave"
                  ? "Flutterwave Payment"
                  : "Paystack Payment"
              }
              src={paymentUrl}
              style={{
                width: "100%",
                height: 600,
                border: "none",
              }}
            />
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <PopupOverlay onClick={() => setShowTermsModal(false)}>
          <PopupCard
            style={{
              width: "min(1100px, 96vw)",
              maxWidth: "none",
              height: "min(96vh, 1200px)",
              maxHeight: "96vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <PopupHeader>
              <PopupMeta>
                <PopupIcon
                  style={{
                    background: "rgba(254, 208, 1, 0.10)",
                    color: "#FED001",
                  }}
                >
                  <FaInfoCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>Terms of Service</PopupTitle>
                  <PopupSubtitle>
                    Please read our terms of service carefully.
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowTermsModal(false)}>
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody
              style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                padding: 0,
              }}
            >
              <iframe
                src={termsPdf}
                title="Terms of Service"
                style={{
                  width: "100%",
                  flex: 1,
                  border: "none",
                  display: "block",
                }}
              />
            </PopupBody>
          </PopupCard>
        </PopupOverlay>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <PopupOverlay onClick={() => setShowPrivacyModal(false)}>
          <PopupCard
            style={{
              width: "min(1100px, 96vw)",
              maxWidth: "none",
              height: "min(96vh, 1200px)",
              maxHeight: "96vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <PopupHeader>
              <PopupMeta>
                <PopupIcon
                  style={{
                    background: "rgba(254, 208, 1, 0.10)",
                    color: "#FED001",
                  }}
                >
                  <FaInfoCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>Privacy Policy</PopupTitle>
                  <PopupSubtitle>
                    Please read our privacy policy carefully.
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowPrivacyModal(false)}>
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody
              style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                padding: 0,
              }}
            >
              <iframe
                src={privacyPdf}
                title="Privacy Policy"
                style={{
                  width: "100%",
                  flex: 1,
                  border: "none",
                  display: "block",
                }}
              />
            </PopupBody>
          </PopupCard>
        </PopupOverlay>
      )}
    </PageWrapper>
  );
};

export default VerifyPage;
