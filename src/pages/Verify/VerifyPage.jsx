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
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  initiateVerificationRequest,
  completeVerificationRequest,
  fetchUserProfile,
} from "../../redux/actions";
import { apiPostInternalCall, apiGet } from "../../apiUtils";
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
  {
    id: "paystack",
    label: "Paystack",
    icon: null,
    paymentType: "INSTANT",
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
  const [consentPending, setConsentPending] = useState(false);
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
          confirmButtonColor: "#09c93a",
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
          confirmButtonColor: "#09c93a",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not verify payment status. Please check your dashboard.",
        confirmButtonColor: "#09c93a",
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

      if (
        response.basic &&
        response.basic.status &&
        response.basic.status === true
      ) {
        result =
          response.basic?.nin_data || response.basic?.data || response.basic;
        resultDetail =
          response.basic.detail || "Your NIN verification was successful.";
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
          confirmButtonColor: "#09c93a",
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
          confirmButtonColor: "#09c93a",
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
          confirmButtonColor: "#09c93a",
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
          confirmButtonColor: "#09c93a",
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
            confirmButtonColor: "#09c93a",
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
            setCurrentStep(RESULT_STEP);
          }
        } else {
          setCurrentStep(RESULT_STEP);
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
          confirmButtonColor: "#09c93a",
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
        confirmButtonColor: "#09c93a",
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

  const getResultPreviewFields = () => {
    if (!verificationResult?.data) return [];
    const data = verificationResult.data;
    const fields = [];

    // NIN / basic result (API returns lowercase: firstname, middlename, surname)
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
              background: "#e6f9ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <FaCheckCircle style={{ fontSize: 28, color: "#09c93a" }} />
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
                  color: "#09c93a",
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
                <FaCheckCircle style={{ color: "#09c93a", fontSize: 14 }} />
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
        <RecommendedOffers variant="green" />
      </ContentWrapper>

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
    </PageWrapper>
  );
};

export default VerifyPage;
