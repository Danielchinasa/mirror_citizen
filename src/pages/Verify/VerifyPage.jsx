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
import RecommendedOffers from "../../components/ads/RecommendedOffers";

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
  SampleResultCard,
  SampleAvatar,
  SampleInfo,
  SampleName,
  SampleId,
  VerifiedBadge,
  SampleMetaRow,
  SampleMetaItem,
  SampleVehicleImage,
  SampleSpecsGrid,
  SampleSpecChip,
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

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const VerifyPage = () => {
  const { type } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

  const config = verificationConfig[type];
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const userDetails = useSelector((state) => state.userDetails);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("wallet");
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
  const [consentPending, setConsentPending] = useState(false);
  const [consentRequestId, setConsentRequestId] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const pollingRef = useRef(null);
  const pendingApiFormRef = useRef(null);
  const consentPollingRef = useRef(null);

  // Dynamic steps based on whether this verification type requires consent
  const requiresConsent = config?.requiresConsent || false;
  const STEPS = requiresConsent
    ? isSw
      ? ["Tafuta", "Malipo", "Inachakata", "Idhini", "Matokeo"]
      : ["Search", "Payment", "Processing", "Consent", "Result"]
    : isSw
      ? ["Tafuta", "Malipo", "Inachakata", "Matokeo"]
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

  // Keep language in sync with the site-wide toggle
  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

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
          title: isSw ? "Hitilafu" : "Error",
          text: isSw
            ? "Imeshindwa kupata bei za huduma. Tafadhali jaribu tena."
            : "Could not fetch service prices. Please try again.",
          confirmButtonColor: "#DD0201",
        });
      }
    };
    fetchPrices();
  }, [config, userToken]);

  if (!config) return null;

  const currencyCheck = localStorage.getItem("currencyCheck") || "KES";
  const isKES = currencyCheck.toUpperCase() === "KES";

  const bureauCount = config?.bureaus
    ? Object.values(selectedBureaus).filter(Boolean).length
    : 0;
  const allBureausSelected =
    config?.bureaus && bureauCount === config.bureaus.length;
  const bureauMultiplier = config?.bureaus ? Math.max(bureauCount, 1) : 1;
  const discount =
    allBureausSelected && config?.allBureausDiscount
      ? isKES
        ? config.allBureausDiscount.ngn
        : config.allBureausDiscount.usd
      : 0;

  const totalAmount = pricingData
    ? isKES
      ? ((pricingData.serviceFee || 0) +
          (pricingData.processingFee || 0) +
          (pricingData.vat || 0)) *
          bureauMultiplier -
        discount
      : ((pricingData.serviceFeeusd || 0) + (pricingData.vatUsd || 0)) *
          bureauMultiplier -
        discount
    : 0;

  const currencySymbol = isKES ? "KSh" : "$";

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
  const userProfileCurrency = userDetails?.currency || "KES";

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
          ? isSw
            ? "Tafadhali chagua angalau ofisi moja ya mikopo."
            : "Please select at least one credit bureau."
          : hasEitherOr
            ? isSw
              ? "Tafadhali jaza angalau sehemu moja."
              : "Please fill in at least one of the fields."
            : isSw
              ? "Tafadhali jaza sehemu zote zinazohitajika."
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
      phone: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
      gender: "",
      rc: "",
      business_name: "",
      bvn: "",
      vin: "",
      alien_card: "",
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

    // For wallet payments by non-Kenyan users, verify wallet currency matches payment currency
    const userCurrency = user?.currency || "";
    if (
      paymentMethod === "wallet" &&
      currencyCheck.toUpperCase() !== "KES" &&
      userCurrency &&
      userCurrency.toUpperCase() !== currencyCheck.toUpperCase()
    ) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: isSw ? "Sarafu Hailingani" : "Currency Mismatch",
        text: isSw
          ? "Sarafu ya pochi lazima ilingane na sarafu ya malipo. Tafadhali tumia sarafu sahihi kwa muamala huu."
          : "Wallet currency must match payment currency. Please use the right currency for this transaction.",
        confirmButtonColor: "#DD0201",
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
      setError(
        err.message ||
          (isSw
            ? "Hitilafu imetokea. Tafadhali jaribu tena."
            : "An error occurred. Please try again."),
      );
      Swal.fire({
        icon: "error",
        title: isSw ? "Hitilafu" : "Error",
        text:
          err.message ||
          (isSw
            ? "Hitilafu imetokea. Tafadhali jaribu tena."
            : "An error occurred. Please try again."),
        confirmButtonColor: "#DD0201",
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
        title: isSw ? "Salio la Pochi Halitoshi" : "Wallet Balance Low",
        text: isSw
          ? `Salio lako la pochi (${currencySymbol}${userBalance.toLocaleString()}) halitoshi kwa muamala huu (${currencySymbol}${totalAmount.toLocaleString()}).`
          : `Your wallet balance (${currencySymbol}${userBalance.toLocaleString()}) is insufficient for this transaction (${currencySymbol}${totalAmount.toLocaleString()}).`,
        confirmButtonColor: "#DD0201",
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
          title: isSw ? "Malipo Yameghairiwa" : "Payment Cancelled",
          text: isSw
            ? "Malipo yako yameghairiwa au yamekataliwa."
            : "Your payment was cancelled or declined.",
          confirmButtonColor: "#DD0201",
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
          title: isSw ? "Malipo Yameshindwa" : "Payment Failed",
          text: isSw
            ? "Malipo yako hayakukamilika. Tafadhali jaribu tena."
            : "Your payment could not be completed. Please try again.",
          confirmButtonColor: "#DD0201",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: isSw ? "Hitilafu" : "Error",
        text: isSw
          ? "Imeshindwa kuthibitisha hali ya malipo. Tafadhali angalia dashibodi yako."
          : "Could not verify payment status. Please check your dashboard.",
        confirmButtonColor: "#DD0201",
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
      let resultTitle = isSw
        ? "Uthibitishaji Umefanikiwa"
        : "Verification Successful";
      let resultDetail = "";
      let resultRoute = "/main-dashboard";

      if (response?.status === "COMPLETED" && response?.result) {
        result = response.result;
        resultTitle = isSw
          ? `${config.serviceName} Imefanikiwa`
          : `${config.serviceName} Successful`;
        resultDetail =
          response.resultText ||
          (isSw
            ? `${config.serviceName} imefanikiwa.`
            : `${config.serviceName} was successful.`);

        // Check if it's a vehicle verification
        if (result.vehicleName || result.vehicleSpecification || result.vin) {
          resultRoute = "/vehicle-profile-result";
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
        resultDetail =
          response.basic.detail ||
          (isSw
            ? "Kitambulisho chako cha Taifa kimefanikiwa."
            : "Your National ID was successful.");
        resultRoute = "/main-dashboard";
      } else if (
        response.basic &&
        typeof response.basic.status === "boolean" &&
        response.basic.status === false
      ) {
        Swal.fire({
          icon: "error",
          title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
          text: response.basic.detail,
          confirmButtonColor: "#DD0201",
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
          (isSw
            ? "Uthibitishaji wa simu umefanikiwa."
            : "Phone verification was successful.");
        resultRoute = "/main-dashboard";
      } else if (
        response["search-extension"] &&
        response["search-extension"].phoneVerification &&
        response["search-extension"].phoneVerification.status === false
      ) {
        Swal.fire({
          icon: "error",
          title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
          text:
            response["search-extension"].phoneVerification.detail ||
            (isSw ? "Uthibitishaji umeshindwa" : "Verification failed"),
          confirmButtonColor: "#DD0201",
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
          (isSw
            ? "Uthibitishaji wa BVN umefanikiwa."
            : "BVN verification was successful.");
        resultRoute = "/main-dashboard";
      } else if (response.business && response.business.success === true) {
        const bizData = Array.isArray(response.business.data)
          ? response.business.data[0]?.data
          : response.business.data;
        result = bizData || response.business;
        resultTitle = isSw
          ? "Uthibitishaji wa Biashara Umefanikiwa"
          : "Business Verification Successful";
        resultDetail =
          bizData?.approvedName ||
          (isSw
            ? "Biashara imethibitishwa kwa mafanikio."
            : "Business has been verified successfully.");
        resultRoute = "/main-dashboard";
      } else if (response.business && response.business.success === false) {
        Swal.fire({
          icon: "error",
          title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
          text: response.business.message,
          confirmButtonColor: "#DD0201",
        });
        setCurrentStep(1);
        return;
      } else if (response.financial && response.financial.success === true) {
        result = response.financial;
        resultDetail =
          response.financial.message ||
          (isSw
            ? "Uthibitishaji wa kifedha umefanikiwa."
            : "Financial verification was successful.");
        resultRoute = "/main-dashboard";
      } else if (response.financial && response.financial.success === false) {
        Swal.fire({
          icon: "error",
          title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
          text: response.financial.message,
          confirmButtonColor: "#DD0201",
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
              ? isSw
                ? "Matokeo ya Sehemu Yanapatikana"
                : "Partial Results Available"
              : isSw
                ? "Matokeo ya Wasifu wa Mikopo"
                : "Credit Profile Results";
          resultDetail = isSw
            ? `Data imepokelewa kutoka: ${bureauResults.join(", ")}.`
            : `Data received from: ${bureauResults.join(", ")}.`;
          resultRoute = "/financial-profile-result";
        } else {
          Swal.fire({
            icon: "error",
            title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
            text:
              bureauErrors.length > 0
                ? bureauErrors.join("\n")
                : isSw
                  ? "Uthibitishaji umeshindwa. Tafadhali jaribu tena."
                  : "Verification failed. Please try again.",
            confirmButtonColor: "#DD0201",
          });
          setCurrentStep(1);
          return;
        }
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
          (isSw
            ? "Uthibitishaji haukukamilika. Marejesho yameanzishwa."
            : "Verification could not be completed. A refund has been initiated.");
        Swal.fire({
          icon: "error",
          title: isSw ? "Uthibitishaji Umeshindwa" : "Verification Failed",
          text: errorMsg,
          confirmButtonColor: "#DD0201",
        });
        setCurrentStep(1);
      }
    } catch (err) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: isSw ? "Huduma Haipatikani" : "Service Unavailable",
        text: isSw
          ? "Huduma haipatikani kwa sasa. Marejesho yameanzishwa."
          : "Service is currently unavailable. A refund has been initiated.",
        confirmButtonColor: "#DD0201",
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
      <FormCardTitle>
        {isSw ? "Weka maelezo ya utafutaji" : "Enter search details"}
      </FormCardTitle>
      <FormCardSub>
        {isSw
          ? "Toa maelezo ya mtu unayetaka kumthibitisha."
          : "Provide the details of the individual you want to verify."}
      </FormCardSub>

      {error && <ErrorAlert>{error}</ErrorAlert>}

      <SearchGrid>
        <div>
          <FormGroup>
            <FormLabel>{isSw ? "Aina ya Kitambulisho" : "ID Type"}</FormLabel>
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
                      {isSw ? "AU" : "OR"}
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
                {isSw ? "Chagua Ofisi ya Mikopo" : "Select Credit Bureau(s)"}{" "}
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
                      border: `1.5px solid ${selectedBureaus[bureau.id] ? "#DD0201" : "#e5e7eb"}`,
                      borderRadius: 8,
                      cursor: "pointer",
                      background: selectedBureaus[bureau.id]
                        ? "#fef2f2"
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
                      style={{ accentColor: "#DD0201", width: 16, height: 16 }}
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
                    background: "#fef2f2",
                    border: "1px solid #d1fae5",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#16a34a",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  🎉{" "}
                  {isSw
                    ? "Punguzo la Ofisi Zote 3 Limetumika: -"
                    : "All 3 Bureaus Discount Applied: -"}
                  {currencySymbol}
                  {(isKES
                    ? config.allBureausDiscount.ngn
                    : config.allBureausDiscount.usd
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              )}
            </FormGroup>
          )}

          <YouWillGetCard>
            <YouWillGetTitle>
              {isSw ? "Utapata" : "You will get"}
            </YouWillGetTitle>
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
            <FaShieldAlt />{" "}
            {isSw
              ? "Data yako ni salama na inatumika kwa uthibitishaji pekee."
              : "Your data is secure and used only for verification."}
          </SidebarNote>
        </div>

        <SidebarCard>
          <PriceLabel>{isSw ? "Kiasi" : "Amount"}</PriceLabel>
          <PriceAmount>
            {loadingPrice
              ? isSw
                ? "Inapakia..."
                : "Loading..."
              : `${currencySymbol}${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </PriceAmount>
          <PriceBreakdown>
            {pricingData &&
              (() => {
                const processingFees = isKES
                  ? (pricingData.serviceFee || 0) +
                    (pricingData.processingFee || 0)
                  : pricingData.serviceFeeusd || 0;
                const taxCharges = isKES
                  ? pricingData.vat || 0
                  : pricingData.vatUsd || 0;
                const perBureau = processingFees + taxCharges;
                const subtotal = perBureau * bureauMultiplier;
                const totalToPay = subtotal - discount;
                return (
                  <>
                    <PriceRow>
                      <span>
                        {isSw ? "Ada za uchakataji" : "Processing fees"}
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
                        {isSw ? "Kodi na ada" : "Tax & charges"}
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
                        <span style={{ color: "#16a34a" }}>
                          {isSw ? "Punguzo" : "Discount"}
                        </span>
                        <span style={{ color: "#16a34a" }}>
                          -{currencySymbol}
                          {discount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </PriceRow>
                    )}
                    <PriceTotalRow>
                      <span>
                        {isSw ? "Jumla ya kulipa" : "Total to be paid"}
                      </span>
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
            {isSw ? "Endelea kwa Malipo" : "Continue to Payment"}{" "}
            <FaArrowRight />
          </ContinueBtn>
        </SidebarCard>
      </SearchGrid>

      <FormActions>
        <ClearBtn onClick={handleClear}>{isSw ? "Futa" : "Clear"}</ClearBtn>
      </FormActions>
    </FormCard>
  );

  const renderPaymentStep = () => (
    <>
      <PaymentGrid>
        <PaymentMethodsCard>
          <PaymentMethodTitle>
            {isSw ? "Njia ya Malipo" : "Payment Method"}
          </PaymentMethodTitle>
          <PaymentMethodSub>
            {isSw
              ? "Chagua jinsi unavyotaka kulipa"
              : "Choose how you'd like to pay"}
          </PaymentMethodSub>

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
                  {userProfileCurrency.toLocaleString()}{" "}
                  {userBalance.toLocaleString()}
                </span>
              )}
            </PaymentOption>
          ))}
        </PaymentMethodsCard>

        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>
              {isSw ? "Muhtasari wa Uthibitishaji" : "Verification Summary"}
            </SummaryTitle>
            <SummaryAmount>
              {loadingPrice
                ? "..."
                : `${currencySymbol}${totalAmount.toLocaleString()}`}
            </SummaryAmount>
          </SummaryHeader>

          <SummaryRow>
            <SummaryLabel>{isSw ? "Huduma" : "Service"}</SummaryLabel>
            <SummaryValue>{config.serviceName}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{isSw ? "Aina" : "Type"}</SummaryLabel>
            <SummaryValue>{config.idTypeLabel}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{isSw ? "Thamani" : "Value"}</SummaryLabel>
            <SummaryValue>
              {formData[config.serviceFieldKey] ||
                config.fields
                  .map((f) => formData[f.name])
                  .find((v) => v?.trim()) ||
                "—"}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{isSw ? "Barua pepe" : "Email"}</SummaryLabel>
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
                  <SummaryLabel>
                    {isSw ? "Ofisi za Mikopo" : "Bureaus"}
                  </SummaryLabel>
                  <SummaryValue>
                    {isSw
                      ? `${bureauCount} zimechaguliwa`
                      : `${bureauCount} selected`}
                  </SummaryValue>
                </SummaryRow>
              )}
              <SummaryRow>
                <SummaryLabel>
                  {isSw ? "Ada ya Uchakataji" : "Processing Fee"}
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isKES
                      ? (pricingData.serviceFee || 0) +
                        (pricingData.processingFee || 0)
                      : pricingData.serviceFeeusd || 0) * bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>
                  {isSw ? "Kodi na ada" : "Tax & charges"}
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isKES ? pricingData.vat : pricingData.vatUsd || 0) *
                    bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              {discount > 0 && (
                <SummaryRow>
                  <SummaryLabel style={{ color: "#16a34a" }}>
                    {isSw ? "Punguzo" : "Discount"}
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
              ? isSw
                ? "Inachakata..."
                : "Processing..."
              : `${isSw ? "Lipa" : "Pay"} ${currencySymbol}${totalAmount.toLocaleString()}`}
          </PayBtn>

          <SecuredBy>
            <FaShieldAlt style={{ color: "#DD0201" }} />
            {isSw
              ? "Malipo yaliyolindwa na kusimbwa"
              : "Secured and encrypted payment"}
          </SecuredBy>

          <div style={{ marginTop: 16 }}>
            <ClearBtn onClick={handleBackToSearch} style={{ width: "100%" }}>
              <FaArrowLeft style={{ marginRight: 8 }} />
              {isSw ? "Rudi" : "Back"}
            </ClearBtn>
          </div>
        </SummaryCard>
      </PaymentGrid>

      {/* Sample Result */}
      <SampleSection>
        <SampleHeader>
          <SampleTitle>
            {isSw ? "Mfano wa Matokeo" : "Sample Result"}
          </SampleTitle>
        </SampleHeader>
        <SampleSub>
          {isSw
            ? "Huu ni mfano wa jinsi matokeo yako ya uthibitishaji yatakavyoonekana."
            : "Here's an example of what your verification result will look like."}
        </SampleSub>
        <SampleResultCard>
          {type === "vehicle" && config.sampleResult.vehicleData ? (
            <>
              <SampleVehicleImage>
                <img
                  src={config.sampleResult.vehicleData.vehicleImage}
                  alt={config.sampleResult.vehicleData.vehicleName}
                />
              </SampleVehicleImage>
              <SampleInfo>
                <SampleName>
                  {config.sampleResult.vehicleData.vehicleName}
                  <VerifiedBadge>
                    <FaCheckCircle /> {isSw ? "Imethibitishwa" : "Verified"}
                  </VerifiedBadge>
                </SampleName>
                <SampleId>
                  VIN: {config.sampleResult.vehicleData.vinMasked}
                </SampleId>
                <SampleMetaRow>
                  <SampleMetaItem>
                    {isSw ? "Mwaka" : "Year"}:{" "}
                    {config.sampleResult.vehicleData.year}
                  </SampleMetaItem>
                  <SampleMetaItem>
                    {isSw ? "Aina" : "Category"}:{" "}
                    {config.sampleResult.vehicleData.category}
                  </SampleMetaItem>
                  <SampleMetaItem>
                    {isSw ? "Mafuta" : "Fuel"}:{" "}
                    {config.sampleResult.vehicleData.fuelType}
                  </SampleMetaItem>
                </SampleMetaRow>
                <SampleTags>
                  <SampleTag>
                    <FaCheckCircle /> {isSw ? "Hali" : "Status"}:{" "}
                    {config.sampleResult.vehicleData.verificationStatus}
                  </SampleTag>
                  <SampleTag>
                    <FaCheckCircle /> {isSw ? "Injini" : "Engine"}:{" "}
                    {config.sampleResult.vehicleData.engine}
                  </SampleTag>
                  <SampleTag>
                    <FaCheckCircle /> {isSw ? "Transmission" : "Transmission"}:{" "}
                    {config.sampleResult.vehicleData.transmission}
                  </SampleTag>
                  <SampleTag>
                    <FaCheckCircle /> {isSw ? "Hatari" : "Risk"}:{" "}
                    {config.sampleResult.vehicleData.riskLabel}
                  </SampleTag>
                </SampleTags>
                <SampleSpecsGrid>
                  {config.sampleResult.vehicleData.specs.map((spec) => (
                    <SampleSpecChip key={spec.label}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </SampleSpecChip>
                  ))}
                </SampleSpecsGrid>
              </SampleInfo>
            </>
          ) : (
            <>
              <SampleAvatar>
                <FaUserCircle />
              </SampleAvatar>
              <SampleInfo>
                <SampleName>
                  {config.sampleResult.name}
                  <VerifiedBadge>
                    <FaCheckCircle /> {isSw ? "Imethibitishwa" : "Verified"}
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
            </>
          )}
        </SampleResultCard>
      </SampleSection>
    </>
  );

  const renderProcessingStep = () => (
    <ProcessingWrapper>
      <ProcessingSpinner />
      <ProcessingText>
        {isSw
          ? "Inachakata Uthibitishaji Wako"
          : "Processing Your Verification"}
      </ProcessingText>
      <ProcessingSub>
        {isSw
          ? "Tafadhali subiri tunapothibitisha taarifa zako. Hii kwa kawaida huchukua chini ya dakika moja."
          : "Please wait while we verify your information. This usually takes less than a minute."}
      </ProcessingSub>
    </ProcessingWrapper>
  );

  const formatIdType = (val) => {
    if (!val) return val;
    const formatted = val
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    // Handle special cases
    const specialCases = {
      "National Id": "National ID",
      Vin: "VIN",
      Nin: "NIN",
      Bvn: "BVN",
      Rc: "RC",
    };
    return specialCases[formatted] || formatted;
  };

  const getResultPreviewFields = () => {
    if (!verificationResult?.data) return [];
    const data = verificationResult.data;
    const fields = [];

    // Vehicle verification
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

    // New KE complete response format (e.g. Smile ID)
    if (data.idType)
      fields.push({ label: "ID Type", value: formatIdType(data.idType) });
    if (data.idNumber)
      fields.push({ label: "ID Number", value: data.idNumber });
    if (data.vin) fields.push({ label: "VIN", value: data.vin });
    if (data.licenseNumber)
      fields.push({ label: "License Number", value: data.licenseNumber });
    if (data.fullName)
      fields.push({ label: "Full Name", value: data.fullName });
    if (data.lastName)
      fields.push({ label: "Last Name", value: data.lastName });

    // NIN / basic result (API returns lowercase: firstname, middlename, surname)
    if (
      data.firstname ||
      data.firstName ||
      data.surname ||
      data.lastname ||
      data.lastName
    ) {
      const fname = data.firstname || data.firstName;
      const mname = data.middlename || data.middleName;
      const lname = data.surname || data.lastname || data.lastName;
      if (fname) fields.push({ label: "First Name", value: fname });
      if (mname) fields.push({ label: "Middle Name", value: mname });
      if (lname && !fields.some((field) => field.label === "Last Name")) {
        fields.push({ label: "Last Name", value: lname });
      }
      if (data.gender)
        fields.push({
          label: "Gender",
          value:
            String(data.gender).toLowerCase() === "m"
              ? "Male"
              : String(data.gender).toLowerCase() === "f"
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
    }

    if (data.address && !fields.some((field) => field.label === "Address")) {
      fields.push({ label: "Address", value: data.address });
    }

    // Phone verification
    if (data.network) {
      if (data.name) fields.push({ label: "Owner Name", value: data.name });
      if (data.network) fields.push({ label: "Network", value: data.network });
      if (data.status) fields.push({ label: "Status", value: data.status });
    }

    // Business (API returns: approvedName, rcNumber, registrationDate, address, email, lga, state, classificationId)
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
    }

    // Credit bureau
    if (data.advance || data.crc || data.firstCentral || data.creditRegistry) {
      if (data.crc) fields.push({ label: "CRC", value: "Data received" });
      if (data.firstCentral)
        fields.push({ label: "First Central", value: "Data received" });
      if (data.creditRegistry)
        fields.push({ label: "Credit Registry", value: "Data received" });
    }

    // Generic fallback — show first few string fields
    if (fields.length === 0) {
      Object.entries(data)
        .slice(0, 5)
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
    }

    return fields.slice(0, 8); // Show max 8 fields
  };

  const renderConsentStep = () => (
    <FormCard>
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <ProcessingSpinner />
        <ProcessingText style={{ marginTop: 24 }}>
          {isSw ? "Inasubiri Idhini" : "Awaiting Consent"}
        </ProcessingText>
        <ProcessingSub
          style={{ maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}
        >
          {isSw
            ? "Tumetuma ombi la idhini kwa mhusika wa data na kwa sasa tunasubiri jibu lao. Barua pepe itatumwa kwako kuhusu hali ya ombi lako."
            : "We have sent a consent request to the data subject and are currently awaiting their response. An email will be sent to you regarding the status of your request."}
        </ProcessingSub>
        <ProcessingSub
          style={{
            maxWidth: 520,
            margin: "16px auto 0",
            fontSize: 13,
            color: "#999",
          }}
        >
          {isSw
            ? "Taarifa za mhusika wa data zitahifadhiwa kwa saa 24 kuanzia wanapotoa idhini. Ukurasa huu utajisasisha kiotomatiki idhini inapotolewa."
            : "The data subject's information will be retained for 24 hours from the moment they grant consent. This page will automatically update when consent is granted."}
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
            {isSw ? "Rudi kwenye Dashibodi" : "Return to Dashboard"}
          </ClearBtn>
        </div>
      </div>
    </FormCard>
  );

  const renderResultStep = () => {
    const previewFields = getResultPreviewFields();
    const resultRoute = verificationResult?.route || "/main-dashboard";
    const resultTitle =
      verificationResult?.title ||
      (isSw ? "Uthibitishaji Umekamilika!" : "Verification Complete!");
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
            <FaCheckCircle style={{ fontSize: 28, color: "#DD0201" }} />
          </div>
          <ProcessingText>{resultTitle}</ProcessingText>
          <ProcessingSub>
            {resultDetail ||
              (isSw
                ? "Uthibitishaji wako umekamilika kwa mafanikio."
                : "Your verification has been completed successfully.")}
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
            {isSw ? "Muhtasari wa Uthibitishaji" : "Verification Summary"}
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
                {isSw ? "Huduma" : "Service"}
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
                {isSw ? "Kiasi Kilicholipwa" : "Amount Paid"}
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
                {isSw ? "Hali" : "Status"}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#DD0201",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                }}
              >
                <FaCheckCircle
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                {isSw ? "Imefanikiwa" : "Successful"}
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
              {isSw ? "Matokeo ya Ofisi za Mikopo" : "Bureau Results"}
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
                <FaCheckCircle style={{ color: "#DD0201", fontSize: 14 }} />
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: "Nunito, sans-serif",
                    color: "#333",
                  }}
                >
                  {bureau} — {isSw ? "Data imepokelewa" : "Data received"}
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
              {isSw ? "Onyesho la Matokeo" : "Result Preview"}
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
            {isSw ? "Tazama Matokeo Kamili" : "View Full Results"}{" "}
            <FaArrowRight />
          </ContinueBtn>
          <ClearBtn onClick={() => history.push("/main-dashboard")}>
            {isSw ? "Nenda kwenye Dashibodi" : "Go to Dashboard"}
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
          <span>{isSw ? "Nyumbani" : "Home"}</span> /{" "}
          <span>{config.breadcrumb[0]}</span> /{" "}
          <span>{config.breadcrumb[1]}</span>
        </Breadcrumb>
        <HeroInner>
          <HeroText>
            <HeroTitle>
              {config.heroTitle} <span>{config.heroHighlight}</span>{" "}
              {config.heroTitleContinue}
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

                    // Profile photo for other verification types
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
                            {isSw ? "IMETHIBITISHWA" : "VERIFIED"}{" "}
                            <FaCheckCircle />
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
                    {isSw ? "Imethibitishwa" : "Verified on"}{" "}
                    {new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    {isSw ? "Kumb:" : "Ref:"}{" "}
                    {localStorage.getItem("transactionID") || "N/A"}
                  </span>
                </ResultFooterPopup>
              </ResultCardPopup>
              <ResultDisclaimerPopup>
                <FaInfoCircle />
                {isSw
                  ? "Matokeo yanategemea data iliyopatikana wakati wa uthibitishaji."
                  : "Results are based on data available at the time of verification."}
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
                  {isSw ? "Tazama matokeo kamili" : "View full result"}{" "}
                  <FaArrowRight />
                </ContinueBtn>
                <ClearBtn
                  onClick={() => {
                    setShowResultPopup(false);
                    setCurrentStep(RESULT_STEP);
                  }}
                >
                  {isSw ? "Funga" : "Close"}
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
                    background: "rgba(235, 3, 24, 0.10)",
                    color: "#EB0318",
                  }}
                >
                  <FaInfoCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>{isSw ? "Kanusho" : "Disclaimer"}</PopupTitle>
                  <PopupSubtitle>
                    {isSw
                      ? "Tafadhali kagua kabla ya kuendelea"
                      : "Please review before proceeding"}
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowDisclaimer(false)}>
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody>
              <div
                style={{
                  background: "rgba(235, 3, 24, 0.06)",
                  border: "1px solid rgba(235, 3, 24, 0.2)",
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
                    {isSw
                      ? "Kwa kubofya, unaonyesha kwamba:"
                      : "By clicking, you indicate that:"}
                    <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                      <li style={{ marginBottom: 12 }}>
                        {isSw ? (
                          <>
                            Unathibitisha kwamba maelezo ya utafutaji ni sahihi,
                            na unathibitisha kwamba{" "}
                            <strong>hutarejeshewa fedha</strong> kwa taarifa
                            zisizo sahihi.
                          </>
                        ) : (
                          <>
                            You confirm that search details are correct, and you
                            confirm that you will{" "}
                            <strong>not be refunded</strong> for incorrect
                            information.
                          </>
                        )}
                      </li>
                      <li style={{ marginBottom: 12 }}>
                        {isSw ? (
                          <>
                            Unaelewa na kukubali kwamba data ya historia ya gari
                            inatoka kwa watoa huduma wa nje na{" "}
                            <strong>huenda isiwe na rekodi zote</strong> kwa
                            kila gari.
                          </>
                        ) : (
                          <>
                            You understand and accept that vehicle history data
                            is sourced from third-party providers and{" "}
                            <strong>may not contain all records</strong> for
                            every vehicle.
                          </>
                        )}
                      </li>
                      <li style={{ marginBottom: 0 }}>
                        {isSw ? (
                          <>
                            Unaelewa kwamba{" "}
                            <strong>
                              matokeo ya utafutaji yanaweza kurudi bila data
                              yoyote
                            </strong>
                            , na unakubali kwamba hutarejeshewa fedha.
                          </>
                        ) : (
                          <>
                            You understand that{" "}
                            <strong>
                              search results may come back without any data
                            </strong>
                            , and you accept that you will not be refunded.
                          </>
                        )}
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
                        {isSw ? (
                          <>
                            Unathibitisha kwamba unaelewa na kukubali kwamba{" "}
                            <strong>idhini inahitajika</strong> kutoka kwa
                            mhusika wa data anayethibitishwa kabla ya kufikia
                            data yao, na unakubali kwamba hutarejeshewa fedha
                            iwapo idhini itazuiliwa.
                          </>
                        ) : (
                          <>
                            You confirm that you understand and accept that{" "}
                            <strong>consent is required</strong> from the data
                            subject being verified before you can access their
                            data, and you accept that you will not be refunded
                            if consent is withheld.
                          </>
                        )}
                      </li>
                    )}
                    <li style={{ marginBottom: 12 }}>
                      {isSw ? (
                        <>
                          Unathibitisha na kukubali kwamba{" "}
                          <strong>maelezo ya utafutaji ni sahihi</strong>, na
                          unakubali kwamba hutarejeshewa fedha kwa taarifa
                          zisizo sahihi.
                        </>
                      ) : (
                        <>
                          You confirm and accept that the{" "}
                          <strong>search details are correct</strong>, and you
                          accept that you will not be refunded for incorrect
                          information.
                        </>
                      )}
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      {isSw ? (
                        <>
                          Unaelewa na kukubali kwamba{" "}
                          <strong>
                            maelezo ya utafutaji yanaweza kurudi bila data
                            yoyote
                          </strong>
                          , na unakubali kwamba hutarejeshewa fedha.
                        </>
                      ) : (
                        <>
                          You understand and accept that{" "}
                          <strong>
                            search details may come back without any data
                          </strong>
                          , and you accept that you will not be refunded.
                        </>
                      )}
                    </li>
                  </ol>
                )}
              </div>
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: 13,
                  color: "var(--ec-text-muted)",
                  textAlign: "center",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                By proceeding, you agree to our{" "}
                {isSw ? (
                  <>
                    Kwa kuendelea, unakubali{" "}
                    <a
                      href="/terms_of_service"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--ec-primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Masharti ya Huduma
                    </a>{" "}
                    na{" "}
                    <a
                      href="/privacy_policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--ec-primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Sera ya Faragha
                    </a>
                    .
                  </>
                ) : (
                  <>
                    <a
                      href="/terms_of_service"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--ec-primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy_policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--ec-primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </>
                )}
              </div>
              <PopupActionRow style={{ justifyContent: "center" }}>
                <ContinueBtn onClick={handleDisclaimerConfirm}>
                  {isSw ? "Nimeelewa, Endelea" : "I Understand, Continue"}{" "}
                  <FaArrowRight />
                </ContinueBtn>
                <ClearBtn onClick={() => setShowDisclaimer(false)}>
                  {isSw ? "Ghairi" : "Cancel"}
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
                {isSw ? "Kamilisha Malipo" : "Complete Payment"} —{" "}
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
    </PageWrapper>
  );
};

export default VerifyPage;
