import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocale } from "../../components/LocaleProvider";
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
  FaCarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "antd";
import {
  initiateVerificationRequest,
  completeVerificationRequest,
  fetchUserProfile,
  fetchVerificationServicePrices,
} from "../../redux/actions";
import { apiPostInternalCall, apiGet } from "../../apiUtils";
import { initiatePaystackPayment } from "../../services/paystackService";
import baseUrl from "../../apiConfig";
import paystackLogo from "../../images/paystack.png";
import flutterwaveLogo from "../../images/flutterwave-logos-idVM8GW1LQ.png";
import { getVerificationConfig } from "./verificationConfig";
import { SampleResultContent } from "../../components/SampleResultPopup/SampleResultPopup";
import RecommendedOffers from "../../components/ads/RecommendedOffers";
import { withBasePath } from "../../routing";
import { getCurrencySymbol } from "../../utils/currencyFormat";
import privacyPdf from "../../images/citoyen Cote dIvoire Privacy Notice FR-EN v1.2 - Confirmed Service Scope.pdf";
import termsPdf from "../../images/citoyen Cote dIvoire Terms of Service FR-EN v1.2 - Confirmed Service Scope.pdf";
import {
  COTE_DIVOIRE_TEST_IP_INFO,
  getIpInfo,
  getNonProductionTestIp,
  isTestIpOverrideEnabled,
} from "../../config/ipConfiguration";
import {
  trackBeginCheckout,
  trackFormSubmit,
  trackPaymentFailed,
  trackPaymentInitiated,
  trackVerificationStarted,
} from "../../analytics/analytics";
import { withAnalyticsMetadata } from "../../analytics/attribution";

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
  PhoneInputGroup,
  PhoneCountryWrapper,
  PhoneCountryDisplay,
  PhoneCountrySelect,
  PhoneInputField,
  PhoneAttachedHint,
} from "./VerifyPage.elements";
import {
  COUNTRY_CODES,
  getDefaultCountryCode,
  DUMMY_PHONE_PLACEHOLDER,
  formatPhoneNumberWithCountryCode,
} from "./countryCodes";

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
];

function generateTransactionId() {
  let transactionId = "EA";
  for (let i = 0; i < 14; i++) {
    transactionId += Math.floor(Math.random() * 10);
  }
  return transactionId;
}

const VerifyPage = () => {
  const { language, t } = useLocale();
  const { type } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const config = useMemo(
    () => getVerificationConfig(type, language),
    [type, language],
  );
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const userDetails = useSelector((state) => state.userDetails);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [subjectCountryCode, setSubjectCountryCode] = useState(() =>
    getDefaultCountryCode(),
  );
  const [subjectPhoneLocal, setSubjectPhoneLocal] = useState("");
  const currentCountryObj =
    COUNTRY_CODES.find((c) => c.code === subjectCountryCode) ||
    COUNTRY_CODES[0];
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [allServicePrices, setAllServicePrices] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedBureaus, setSelectedBureaus] = useState({});
  const [paystackModalOpen, setPaystackModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paystackReference, setPaystackReference] = useState("");
  const [activeGateway, setActiveGateway] = useState(""); // "paystack" or "flutterwave"
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [showPayDisclaimer, setShowPayDisclaimer] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(true);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [consentPending, setConsentPending] = useState(false);
  const [consentRequestId, setConsentRequestId] = useState("");
  const pollingRef = useRef(null);
  const pendingApiFormRef = useRef(null);
  const consentPollingRef = useRef(null);
  const funnelTrackedRef = useRef({
    formSubmit: false,
    beginCheckout: false,
    verificationStarted: false,
  });

  // Dynamic steps based on whether this verification type requires consent
  const requiresConsent = config?.requiresConsent || false;
  const STEPS = requiresConsent
    ? [
        t("verify.step.search"),
        t("verify.step.payment"),
        t("verify.step.processing"),
        t("verify.step.consent"),
        t("verify.step.result"),
      ]
    : [
        t("verify.step.search"),
        t("verify.step.payment"),
        t("verify.step.processing"),
        t("verify.step.result"),
      ];
  const RESULT_STEP = requiresConsent ? 4 : 3;
  const CONSENT_STEP = 3;

  // Redirect if invalid type
  useEffect(() => {
    if (!config) {
      history.replace("/main-dashboard");
    }
    setSubjectPhoneLocal("");
    setSubjectCountryCode(getDefaultCountryCode());
  }, [config, history, type]);

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
    const ensureIpAndCurrency = async () => {
      const storedIp = localStorage.getItem("IpAddress");
      const storedCountry = localStorage.getItem("userCountry");
      const storedCurrency = localStorage.getItem("currencyCheck");

      // Retain the original non-production reuse of complete stored IP data.
      // Production refreshes it dynamically to avoid reusing a stale test IP.
      if (
        isTestIpOverrideEnabled &&
        storedIp &&
        storedCountry &&
        storedCurrency
      ) {
        return;
      }

      await getIpInfo({
        useTestOverride: false,
        fallbackTestIpInfo: COTE_DIVOIRE_TEST_IP_INFO.primary,
      });
    };

    ensureIpAndCurrency();
  }, []);

  const isPricingValid = (data) => {
    if (!data || typeof data !== "object") return false;
    if (data.status === "failed") return false;
    if (typeof data.status === "number" && data.status >= 400) return false;
    if (data.isAxiosError) return false;

    const hasLocalFee =
      data.serviceFee !== undefined &&
      data.serviceFee !== null &&
      !isNaN(Number(data.serviceFee));
    const hasUsdFee =
      data.serviceFeeusd !== undefined &&
      data.serviceFeeusd !== null &&
      !isNaN(Number(data.serviceFeeusd));

    return hasLocalFee || hasUsdFee;
  };

  // Fetch service prices
  const fetchPrices = useCallback(async () => {
    if (!config) return;

    setLoadingPrice(true);
    setPriceError(false);

    try {
      const data = await dispatch(
        fetchVerificationServicePrices(config, userToken),
      );
      if (data && data.status === "success") {
        setAllServicePrices({
          data: data.allServices,
          rate: data.rate,
        });

        let serviceData = null;
        if (config.serviceCode || config.apiServiceName) {
          const targetServiceName =
            type === "vehicle" && formData.platform === "premium"
              ? "STOLEN_CHECK"
              : config.apiServiceName || config.serviceCode;
          serviceData = Array.isArray(data.allServices)
            ? data.allServices.find(
                (s) =>
                  s?.service?.toLowerCase() ===
                  targetServiceName?.toLowerCase(),
              )
            : data.allServices?.[targetServiceName];
        } else {
          const targetIndex =
            type === "vehicle" && formData.platform === "premium"
              ? 7
              : config.priceIndex;
          serviceData = data.allServices?.[targetIndex];
        }

        if (serviceData) {
          setPricingData({
            price: serviceData.price,
            serviceFee: serviceData.serviceFee,
            vat: serviceData.VAT,
            priceUsd: serviceData.price2,
            serviceFeeusd: serviceData.serviceFee2,
            vatUsd: serviceData.VAT2,
            processingFee: serviceData.processingFee || 0,
            rate: data.rate,
          });
          setPriceError(false);
        } else {
          setPricingData(null);
          setPriceError(true);
        }
      } else {
        setPricingData(null);
        setPriceError(true);
      }
    } catch (err) {
      setPricingData(null);
      setPriceError(true);
    } finally {
      setLoadingPrice(false);
    }
  }, [config, userToken, dispatch]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    if (allServicePrices && config) {
      let serviceData = null;
      if (config.serviceCode || config.apiServiceName) {
        const targetServiceName =
          type === "vehicle" && formData.platform === "premium"
            ? "STOLEN_CHECK"
            : config.apiServiceName || config.serviceCode;
        serviceData = Array.isArray(allServicePrices.data)
          ? allServicePrices.data.find(
              (s) =>
                s?.service?.toLowerCase() === targetServiceName?.toLowerCase(),
            )
          : allServicePrices.data?.[targetServiceName];
      } else {
        const targetIndex =
          type === "vehicle" && formData.platform === "premium"
            ? 7
            : config.priceIndex;
        serviceData = allServicePrices.data?.[targetIndex];
      }

      if (serviceData) {
        setPricingData({
          price: serviceData.price,
          serviceFee: serviceData.serviceFee,
          vat: serviceData.VAT,
          priceUsd: serviceData.price2,
          serviceFeeusd: serviceData.serviceFee2,
          vatUsd: serviceData.VAT2,
          processingFee: serviceData.processingFee || 0,
          rate: allServicePrices.rate,
        });
      }
    }
  }, [allServicePrices, config, type, formData.platform]);

  if (!config) return null;

  const isPriceAvailable =
    !loadingPrice && !priceError && isPricingValid(pricingData);

  const currencyCheck = localStorage.getItem("currencyCheck") || "XOF";
  const isLocal = currencyCheck.toUpperCase() === "XOF";

  const bureauCount = config?.bureaus
    ? Object.values(selectedBureaus).filter(Boolean).length
    : 0;
  const allBureausSelected =
    config?.bureaus && bureauCount === config.bureaus.length;
  const bureauMultiplier = config?.bureaus ? Math.max(bureauCount, 1) : 1;
  const discount =
    allBureausSelected && config?.allBureausDiscount
      ? isLocal
        ? config.allBureausDiscount.xof
        : config.allBureausDiscount.usd
      : 0;

  const totalAmount =
    isPriceAvailable && pricingData
      ? Math.max(
          isLocal
            ? ((pricingData.serviceFee || 0) +
                (pricingData.processingFee || 0) +
                (pricingData.vat || 0)) *
                bureauMultiplier -
                discount
            : ((pricingData.serviceFeeusd || 0) + (pricingData.vatUsd || 0)) *
                bureauMultiplier -
                discount,
          0,
        )
      : 0;

  const currencySymbol = isLocal ? "CFA " : "$";

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
  const userWalletCurrency = userDetails?.currency || user?.currency || "";

  // The wallet is always held in CFA (XOF). Compute the CFA total so wallet
  // comparisons and charges are always in the correct currency, regardless of
  // what currency is displayed to the user.
  const totalAmountFcfa =
    isPriceAvailable && pricingData
      ? Math.max(
          ((pricingData.serviceFee || 0) +
            (pricingData.processingFee || 0) +
            (pricingData.vat || 0)) *
            bureauMultiplier -
            (allBureausSelected && config?.allBureausDiscount
              ? config.allBureausDiscount.xof || 0
              : 0),
          0,
        )
      : 0;

  const normalizeCurrency = (value = "") => {
    const normalized = String(value).trim().toUpperCase();
    if (normalized === "FCFA" || normalized === "CFA") return "XOF";
    return normalized;
  };

  const paymentCurrency = normalizeCurrency(currencyCheck);
  // Always reflect the backend's wallet currency; only default to XOF before the profile has loaded
  const effectiveWalletCurrency = userWalletCurrency
    ? normalizeCurrency(userWalletCurrency)
    : "XOF";
  const walletCurrencySymbol = getCurrencySymbol(effectiveWalletCurrency);

  const resetFunnelTracking = () => {
    funnelTrackedRef.current = {
      formSubmit: false,
      beginCheckout: false,
      verificationStarted: false,
    };
  };

  const trackFormSubmitOnce = () => {
    if (funnelTrackedRef.current.formSubmit) return;
    funnelTrackedRef.current.formSubmit = true;
    trackFormSubmit(type);
  };

  const trackBeginCheckoutOnce = (params = {}) => {
    if (funnelTrackedRef.current.beginCheckout) return;
    funnelTrackedRef.current.beginCheckout = true;
    trackBeginCheckout(type, params);
  };

  const trackVerificationStartedOnce = () => {
    if (funnelTrackedRef.current.verificationStarted) return;
    funnelTrackedRef.current.verificationStarted = true;
    trackVerificationStarted(type);
  };

  /* ── Form handlers ── */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const currentField = config.fields.find((f) => f.name === name);
    let sanitizedValue = value;
    if (currentField?.numericOnly || name === "subjectPhone") {
      if (currentField?.allowPlus || name === "subjectPhone") {
        const hasPlus = value.includes("+");
        sanitizedValue = (hasPlus ? "+" : "") + value.replace(/\D/g, "");
      } else {
        sanitizedValue = value.replace(/\D/g, "");
      }
    }

    // For eitherOr fields, clear the sibling field
    const updates = { [name]: sanitizedValue };
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

  const handleKeyDown = (field) => (e) => {
    if (field?.numericOnly || field?.name === "subjectPhone") {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        [
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ].includes(e.key)
      ) {
        return;
      }
      if (
        (field?.allowPlus || field?.name === "subjectPhone") &&
        e.key === "+"
      ) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleCountryCodeChange = (e) => {
    const newCode = e.target.value;
    setSubjectCountryCode(newCode);

    if (subjectPhoneLocal && subjectPhoneLocal.trim()) {
      const attached = formatPhoneNumberWithCountryCode(
        subjectPhoneLocal,
        newCode,
      );
      setFormData((prev) => ({ ...prev, subjectPhone: attached }));
    }
  };

  const handleSubjectPhoneChange = (e) => {
    let rawVal = e.target.value;

    // If pasted number starts with +, find matching country code
    if (rawVal.startsWith("+")) {
      const matched = COUNTRY_CODES.find((c) => rawVal.startsWith(c.code));
      if (matched) {
        setSubjectCountryCode(matched.code);
        rawVal = rawVal.slice(matched.code.length);
      }
    }

    let cleanDigits = rawVal.replace(/\D/g, "");

    // If clean digits start with the country code digits (e.g. pasted 225...), strip it
    const codeDigits = (subjectCountryCode || "").replace(/\D/g, "");
    if (
      codeDigits &&
      cleanDigits.startsWith(codeDigits) &&
      cleanDigits.length > codeDigits.length + 5
    ) {
      cleanDigits = cleanDigits.slice(codeDigits.length);
    }

    setSubjectPhoneLocal(cleanDigits);

    if (!cleanDigits) {
      setFormData((prev) => ({ ...prev, subjectPhone: "" }));
      setError("");
      return;
    }

    const attached = formatPhoneNumberWithCountryCode(
      cleanDigits,
      subjectCountryCode,
    );
    setFormData((prev) => ({ ...prev, subjectPhone: attached }));
    setError("");
  };

  const handleClear = () => {
    setFormData({});
    setSubjectPhoneLocal("");
    setSubjectCountryCode(getDefaultCountryCode());
    setSelectedBureaus({});
    resetFunnelTracking();
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
    if (loadingPrice) return;

    if (!isPriceAvailable) {
      setError(
        t(
          "verify.search.unableToGetFeesError",
          "Unable to get service fees. Please try again before proceeding.",
        ),
      );
      return;
    }

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
        noBureauSelected
          ? t("verify.error.selectBureau")
          : noConsentContact
            ? t("verify.error.provideContact")
            : hasEitherOr
              ? t("verify.error.fillEitherOr")
              : t("verify.error.fillRequired"),
      );
      return;
    }

    if (formData.subjectPhone?.trim()) {
      const digitsOnly = formData.subjectPhone.replace(/\D/g, "");
      if (digitsOnly.length < 8) {
        setError(
          t(
            "verify.error.invalidPhone",
            "Veuillez entrer un numéro de téléphone de contact valide.",
          ),
        );
        return;
      }
    }
    setError("");

    trackFormSubmitOnce();

    trackBeginCheckoutOnce({
      amount: totalAmount,
      value: totalAmount,
      currency: paymentCurrency,
    });

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
      stolencheck: formData.platform === "premium" ? true : "",
      license_number: "",
      face: "",
      nin_csv: "",
      crc: "",
      firstCentral: "",
      creditRegistry: "",
      paymentType: "",
      currency: "",
      // platform: formData.platform || "standard",
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
    setError("");

    if (!isPriceAvailable || totalAmount <= 0) {
      Swal.fire({
        icon: "error",
        title: t("common.error"),
        text: t("verify.alert.fetchPricesError"),
        confirmButtonColor: "#FD7A00",
      });
      return;
    }

    const randomTransactionId = generateTransactionId();
    const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

    const isKenyaUser =
      normalizeCurrency(config?.countryCode) === "KE" ||
      paymentCurrency === "KES";

    // For non-Kenya users, wallet payment currency must match selected payment currency.
    if (
      paymentMethod === "wallet" &&
      !isKenyaUser &&
      effectiveWalletCurrency &&
      effectiveWalletCurrency !== paymentCurrency
    ) {
      const mismatchMessage = t("verify.alert.walletCurrencyMismatch");

      setError(mismatchMessage);

      Swal.fire({
        icon: "error",
        title: t("verify.alert.currencyMismatch"),
        text: mismatchMessage,
        confirmButtonColor: "#FD7A00",
      });

      return;
    }

    setLoading(true);
    setCurrentStep(2); // Processing

    localStorage.setItem("transactionID", randomTransactionId);
    localStorage.setItem("paymentType", selectedMethod.paymentType);
    localStorage.setItem("totalAmount", totalAmount);

    const apiFormData = buildApiFormData();

    try {
      // 1. Track verification attempt
      trackVerificationStartedOnce();

      // 2. Initiate verification
      let initiateResponse;

      if (config.countryCode && config.serviceCode) {
        // Africa country-specific endpoint
        const payload = {
          serviceCode: config.serviceCode,
          ...apiFormData,
        };

        const legacyStoredIp = localStorage.getItem("ipAddress");
        const detectedIp = legacyStoredIp || localStorage.getItem("IpAddress");

        const ipAddress = isTestIpOverrideEnabled
          ? legacyStoredIp ||
            getNonProductionTestIp(
              COTE_DIVOIRE_TEST_IP_INFO.verificationRequest,
            )
          : detectedIp;

        initiateResponse = await apiPostInternalCall(
          `/africa/verification/${config.countryCode}/initiate`,
          payload,
          userToken,
          {
            headers: ipAddress
              ? {
                  "X-Forwarded-For": ipAddress,
                }
              : {},
          },
        );

        initiateResponse = initiateResponse?.data || initiateResponse;
      } else {
        // Legacy/non-Africa fallback
        initiateResponse = await dispatch(
          initiateVerificationRequest(apiFormData, userToken),
        );

        initiateResponse = initiateResponse?.data || initiateResponse;
      }

      // 3. Validate initiated verification session
      if (
        initiateResponse?.sessionStatus === "INITIATED" ||
        initiateResponse?.status === "INITIATED"
      ) {
        const sessionKey =
          initiateResponse?.sessionCode || initiateResponse?.sessionId;

        if (!sessionKey) {
          throw new Error(
            "Verification session was initiated without a session ID",
          );
        }

        localStorage.setItem("sessionCode", sessionKey);
      } else {
        throw new Error(
          initiateResponse?.message || "Failed to initiate verification",
        );
      }

      // 4. Process payment
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

      const apiErrorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";

      const apiErrorStatus = err.response?.data?.status;

      setError(apiErrorMessage);

      Swal.fire({
        icon: "error",
        title:
          apiErrorStatus === "failed"
            ? t("verify.alert.serviceError")
            : t("common.error"),
        text: apiErrorMessage,
        confirmButtonColor: "#FD7A00",
      });
    }
  };

  const handleWalletPayment = async (transactionId, apiFormData) => {
    // Check wallet balance — wallet is always in CFA
    if (userBalance < totalAmountFcfa) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: t("verify.alert.walletBalanceLow"),
        text: t("verify.alert.walletInsufficient"),
        confirmButtonColor: "#FD7A00",
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
        currency: "XOF", // wallet is always CFA
        paymentType: "WALLET",
        amount: totalAmountFcfa, // always charge in CFA
      };

      trackPaymentInitiated(type, {
        amount: totalAmount,
        value: totalAmount,
        currency: currencyCheck,
        gateway: "Wallet",
        transaction_id: transactionId,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(await withAnalyticsMetadata(requestBody)),
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

      const response = await initiatePaystackPayment(
        await withAnalyticsMetadata(paymentData),
        userToken,
      );

      if (response?.data?.authorization_url) {
        pendingApiFormRef.current = apiFormData;
        setPaymentUrl(response.data.authorization_url);
        setPaystackReference(response.data.reference);
        setActiveGateway("paystack");
        trackPaymentInitiated(type, {
          amount: totalAmount,
          value: totalAmount,
          currency: currencyCheck,
          gateway: "Paystack",
          transaction_id: response.data.reference,
        });
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
        country: "GH",
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
        body: JSON.stringify(await withAnalyticsMetadata(postData)),
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
        trackPaymentInitiated(type, {
          amount: totalAmount,
          value: totalAmount,
          currency: currencyCheck,
          gateway: "Flutterwave",
          transaction_id: responseData.data.txRef || transactionId,
        });
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
        trackPaymentFailed(type, {
          amount: totalAmount,
          value: totalAmount,
          currency: currencyCheck,
          gateway: activeGateway === "flutterwave" ? "Flutterwave" : "Paystack",
          transaction_id: paystackReference,
          payment_status: "cancelled",
        });
        Swal.fire({
          icon: "error",
          title: t("verify.alert.paymentCancelled"),
          text: t("verify.alert.paymentCancelledText"),
          confirmButtonColor: "#FD7A00",
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
        trackPaymentFailed(type, {
          amount: totalAmount,
          value: totalAmount,
          currency: currencyCheck,
          gateway: activeGateway === "flutterwave" ? "Flutterwave" : "Paystack",
          transaction_id: paystackReference,
        });
        Swal.fire({
          icon: "error",
          title: t("verify.alert.paymentFailed"),
          text: t("verify.alert.paymentFailedText"),
          confirmButtonColor: "#FD7A00",
        });
      }
    } catch {
      trackPaymentFailed(type, {
        amount: totalAmount,
        value: totalAmount,
        currency: currencyCheck,
        gateway: activeGateway === "flutterwave" ? "Flutterwave" : "Paystack",
        transaction_id: paystackReference,
      });
      Swal.fire({
        icon: "error",
        title: t("common.error"),
        text: t("verify.alert.verifyPaymentStatusError"),
        confirmButtonColor: "#FD7A00",
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
          response.basic.detail || "Your NNI verification was successful.";
        resultRoute = "/main-dashboard";
      } else if (
        response.basic &&
        typeof response.basic.status === "boolean" &&
        response.basic.status === false
      ) {
        Swal.fire({
          icon: "error",
          title: t("verify.alert.verificationFailed"),
          text: response.basic.detail,
          confirmButtonColor: "#FD7A00",
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
          title: t("verify.alert.verificationFailed"),
          text:
            response["search-extension"].phoneVerification.detail ||
            t("verify.alert.verificationFailed"),
          confirmButtonColor: "#FD7A00",
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
        resultTitle = t("verify.alert.businessVerificationSuccess");
        resultDetail =
          bizData?.approvedName || "Business has been verified successfully.";
        resultRoute = "/main-dashboard";
      } else if (response.business && response.business.success === false) {
        Swal.fire({
          icon: "error",
          title: t("verify.alert.verificationFailed"),
          text: response.business.message,
          confirmButtonColor: "#FD7A00",
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
          title: t("verify.alert.verificationFailed"),
          text: response.financial.message,
          confirmButtonColor: "#FD7A00",
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
              ? t("verify.alert.partialResults")
              : t("verify.alert.creditProfileResults");
          resultDetail = `Data received from: ${bureauResults.join(", ")}.`;
          resultRoute = "/financial-profile-result";
        } else {
          Swal.fire({
            icon: "error",
            title: t("verify.alert.verificationFailed"),
            text:
              bureauErrors.length > 0
                ? bureauErrors.join("\n")
                : t("verify.alert.verificationFailed"),
            confirmButtonColor: "#FD7A00",
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
          title: t("verify.alert.consentPending"),
          html: `
            <div style="text-align: left; font-family: 'Nunito', sans-serif;">
              <p style="margin-bottom: 12px; font-size: 14px; color: #333;">
                ${
                  consent.message ||
                  response.resultText ||
                  t("verify.alert.consentResultsAvailable")
                }
              </p>
              <div style="background: #f0f9ff; padding: 14px; border-radius: 8px; margin-bottom: 12px; font-size: 13px; line-height: 1.8;">
                <strong>${t("verify.alert.consentStatus")}</strong> ${consent.status}<br/>
                <strong>${t("verify.alert.consentRequired")}</strong> ${consent.required ? "Yes" : "No"}
                ${
                  channelList.length > 0
                    ? `<br/><strong>${t("verify.alert.consentChannels")}</strong> ${channelList.join(", ")}`
                    : ""
                }
              </div>
              <p style="font-size: 13px; color: #666; margin: 0;">
                ${t("verify.alert.consentResultsAvailable")}
              </p>
            </div>
          `,
          confirmButtonColor: "#FD7A00",
          confirmButtonText: t("verify.alert.ok"),
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

      // CI / Smile ID completed verification
      if (!result && response.status === "COMPLETED" && response.result) {
        result = response.result;
        resultTitle = t("verify.alert.verificationSuccessful");
        resultDetail =
          response.resultText || "Your ID has been verified successfully.";
        resultRoute = "/main-dashboard";
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
          t("verify.alert.refundInitiated");
        Swal.fire({
          icon: "error",
          title: t("verify.alert.verificationFailed"),
          text: errorMsg,
          confirmButtonColor: "#FD7A00",
        });
        setCurrentStep(1);
      }
    } catch (err) {
      setLoading(false);
      setCurrentStep(1);
      Swal.fire({
        icon: "error",
        title: t("verify.alert.serviceUnavailable"),
        text: t("verify.alert.serviceUnavailableText"),
        confirmButtonColor: "#FD7A00",
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
      <FormCardTitle>{t("verify.search.title")}</FormCardTitle>
      <FormCardSub>{t("verify.search.subtitle")}</FormCardSub>

      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!loadingPrice && !isPriceAvailable && !error && (
        <ErrorAlert
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaInfoCircle />
            <span>
              {t(
                "verify.search.topErrorNotice",
                "Unable to get service fees at the moment. Please try again.",
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={fetchPrices}
            style={{
              background: "none",
              border: "1px solid currentColor",
              color: "inherit",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t("verify.search.retry", "Retry")}
          </button>
        </ErrorAlert>
      )}

      <SearchGrid>
        <div>
          <FormGroup>
            <FormLabel>{t("verify.search.idType")}</FormLabel>
            <IdTypeDisplay>
              <FaIdCard />
              {config.idTypeLabel}
            </IdTypeDisplay>
          </FormGroup>

          {config.fields.map((field, idx) => (
            <React.Fragment key={field.name}>
              {field.name.startsWith("subject") &&
                idx > 0 &&
                !config.fields[idx - 1].name.startsWith("subject") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        margin: "24px 0 12px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: 1,
                          background: "#e5e7eb",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#666",
                        fontFamily: "Nunito, sans-serif",
                        marginBottom: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {t("verify.search.consentContact")}
                    </div>
                  </>
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
                      {t("verify.search.or")}
                    </span>
                    <div
                      style={{ flex: 1, height: 1, background: "#e5e7eb" }}
                    />
                  </div>
                )}
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
                      {t("verify.search.or")}
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
                ) : field.name === "subjectPhone" || field.hasCountryCode ? (
                  <>
                    <PhoneInputGroup>
                      <PhoneCountryWrapper title="Click to change country code">
                        <PhoneCountryDisplay>
                          <span>{currentCountryObj.flag}</span>
                          <span>{currentCountryObj.code}</span>
                          <span
                            style={{
                              fontSize: 10,
                              color: "#888",
                              marginLeft: 2,
                            }}
                          >
                            ▼
                          </span>
                        </PhoneCountryDisplay>
                        <PhoneCountrySelect
                          value={subjectCountryCode}
                          onChange={handleCountryCodeChange}
                          aria-label="Select country code"
                        >
                          {COUNTRY_CODES.map((item) => (
                            <option
                              key={`${item.iso}-${item.code}-${item.country}`}
                              value={item.code}
                            >
                              {item.flag} {item.code} ({item.country})
                            </option>
                          ))}
                        </PhoneCountrySelect>
                      </PhoneCountryWrapper>
                      <PhoneInputField
                        type="tel"
                        name={field.name}
                        placeholder={
                          field.placeholder || `e.g. ${DUMMY_PHONE_PLACEHOLDER}`
                        }
                        value={subjectPhoneLocal}
                        onChange={handleSubjectPhoneChange}
                        onKeyDown={handleKeyDown(field)}
                        maxLength={15}
                        inputMode="tel"
                      />
                    </PhoneInputGroup>
                    <PhoneAttachedHint>
                      {formData.subjectPhone ? (
                        <div className="attached-preview">
                          <span>
                            {language === "FR" ? "Attaché :" : "Attached:"}
                          </span>
                          <strong>{formData.subjectPhone}</strong>
                        </div>
                      ) : (
                        <span>
                          {language === "FR" ? "Exemple :" : "Sample:"}{" "}
                          <strong>{DUMMY_PHONE_PLACEHOLDER}</strong>{" "}
                          {language === "FR" ? "(sans 0)" : "(without 0)"}
                        </span>
                      )}
                      {field.showCounter && (
                        <span>
                          {(formData[field.name] || "").length}/
                          {field.maxLength}
                        </span>
                      )}
                    </PhoneAttachedHint>
                  </>
                ) : (
                  <FormInput
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown(field)}
                    maxLength={field.maxLength}
                    inputMode={
                      field.inputMode ||
                      (field.numericOnly || field.name === "subjectPhone"
                        ? field.allowPlus || field.name === "subjectPhone"
                          ? "tel"
                          : "numeric"
                        : undefined)
                    }
                    pattern={field.pattern}
                  />
                )}
                {field.showCounter &&
                  field.name !== "subjectPhone" &&
                  !field.hasCountryCode && (
                    <CharCounter>
                      {(formData[field.name] || "").length}/{field.maxLength}
                    </CharCounter>
                  )}
              </FormGroup>
            </React.Fragment>
          ))}

          {/* {type === "vehicle" && (
            <FormGroup>
              <FormLabel>Select Platform</FormLabel>
              <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.platform === "standard" || !formData.platform
                    }
                    onChange={() =>
                      handleInputChange({
                        target: { name: "platform", value: "standard" },
                      })
                    }
                    style={{
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                      accentColor: "#09c93a",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: "Nunito, sans-serif",
                      color: "#374151",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Standard
                    <Tooltip
                      title={
                        language === "FR" ? (
                          <div>
                            <strong>Recherche standard de NIV (VIN)</strong>
                            <br />
                            Informations essentielles sur le véhicule : Identité du véhicule, caractéristiques, moteur, transmission, dimensions, informations sur le carburant, et autres détails disponibles sur le véhicule.
                          </div>
                        ) : (
                          <div>
                            <strong>Standard VIN Search</strong>
                            <br />
                            Essential vehicle information: Vehicle identity, specifications, engine, transmission, dimensions, fuel information, and other available vehicle details.
                          </div>
                        )
                      }
                    >
                      <FaInfoCircle color="#999" />
                    </Tooltip>
                  </span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.platform === "premium"}
                    onChange={() =>
                      handleInputChange({
                        target: { name: "platform", value: "premium" },
                      })
                    }
                    style={{
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                      accentColor: "#09c93a",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: "Nunito, sans-serif",
                      color: "#374151",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Premium
                    <Tooltip
                      title={
                        language === "FR" ? (
                          <div>
                            <strong>Recherche avancée de NIV (VIN)</strong>
                            <br />
                            Historique détaillé du véhicule et rapport des risques : Tout ce dont vous avez besoin pour enquêter sur l'historique disponible d'un véhicule d'occasion — y compris les accidents, les titres de propriété, les véhicules récupérés (salvage), le kilométrage, l'assurance, les privilèges (liens), les enchères, l'évaluation, les vols et les rappels.
                          </div>
                        ) : (
                          <div>
                            <strong>Advanced VIN Search</strong>
                            <br />
                            Detailed vehicle history & risk report: Everything you need to investigate a used vehicle's available history — including accident, title, salvage, mileage, insurance, lien, auction, valuation, theft, and recall records.
                          </div>
                        )
                      }
                    >
                      <FaInfoCircle color="#999" />
                    </Tooltip>
                  </span>
                </label>
              </div>
            </FormGroup>
          )} */}

          {config.bureaus && (
            <FormGroup>
              <FormLabel>
                {t("verify.search.selectBureaus")}{" "}
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
                      border: `1.5px solid ${selectedBureaus[bureau.id] ? "#FD7A00" : "#e5e7eb"}`,
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
                      style={{ accentColor: "#FD7A00", width: 16, height: 16 }}
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
                  {t("verify.search.discountApplied")} -{currencySymbol}
                  {(isLocal
                    ? config.allBureausDiscount.xof
                    : config.allBureausDiscount.usd
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              )}
            </FormGroup>
          )}

          <YouWillGetCard>
            <YouWillGetTitle>{t("verify.search.youWillGet")}</YouWillGetTitle>
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
            <FaShieldAlt /> {t("verify.search.secureNote")}
          </SidebarNote>
        </div>

        <SidebarCard>
          <PriceLabel>{t("verify.search.amount")}</PriceLabel>
          <PriceAmount
            style={
              !isPriceAvailable && !loadingPrice
                ? { color: "#dc2626", fontSize: 18 }
                : {}
            }
          >
            {loadingPrice
              ? t("verify.search.loading")
              : isPriceAvailable
                ? `${currencySymbol}${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : t("verify.search.unavailable", "Unavailable")}
          </PriceAmount>

          {!loadingPrice && !isPriceAvailable && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "10px 12px",
                margin: "12px 0",
                fontSize: 13,
                color: "#991b1b",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                }}
              >
                <FaInfoCircle />
                <span>
                  {t(
                    "verify.search.unableToGetFees",
                    "Unable to get service fees",
                  )}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#7f1d1d",
                  lineHeight: 1.4,
                }}
              >
                {t(
                  "verify.search.feesUnavailableNotice",
                  "Pricing for this service is currently unavailable. Please try again or contact support.",
                )}
              </div>
              <button
                type="button"
                onClick={fetchPrices}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FaBolt /> {t("verify.search.retry", "Retry")}
              </button>
            </div>
          )}

          {isPriceAvailable && (
            <PriceBreakdown>
              {pricingData &&
                (() => {
                  const processingFees = isLocal
                    ? (pricingData.serviceFee || 0) +
                      (pricingData.processingFee || 0)
                    : pricingData.serviceFeeusd || 0;
                  const taxCharges = isLocal
                    ? pricingData.vat || 0
                    : pricingData.vatUsd || 0;
                  const perBureau = processingFees + taxCharges;
                  const subtotal = perBureau * bureauMultiplier;
                  const totalToPay = subtotal - discount;
                  return (
                    <>
                      <PriceRow>
                        <span>
                          {t("verify.search.processingFees")}
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
                          {t("verify.search.taxAndCharges")}
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
                            {t("verify.search.discount")}
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
                        <span>{t("verify.search.totalToBePaid")}</span>
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
          )}
          <ContinueBtn
            onClick={handleContinueToPayment}
            disabled={!isFormValid() || loadingPrice || !isPriceAvailable}
            title={
              !isPriceAvailable && !loadingPrice
                ? t(
                    "verify.search.unableToGetFees",
                    "Unable to get service fees",
                  )
                : undefined
            }
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loadingPrice
              ? t("verify.search.loadingFees", "Loading fees...")
              : !isPriceAvailable
                ? t(
                    "verify.search.unableToGetFees",
                    "Unable to Get Service Fees",
                  )
                : t("verify.search.continueToPayment")}{" "}
            {isPriceAvailable && !loadingPrice && <FaArrowRight />}
          </ContinueBtn>
        </SidebarCard>
      </SearchGrid>

      <FormActions>
        <ClearBtn onClick={handleClear}>{t("verify.search.clear")}</ClearBtn>
      </FormActions>
    </FormCard>
  );

  const renderPaymentStep = () => (
    <>
      <PaymentGrid>
        <PaymentMethodsCard>
          <PaymentMethodTitle>
            {t("verify.payment.paymentMethod")}
          </PaymentMethodTitle>
          <PaymentMethodSub>
            {t("verify.payment.chooseHowToPay")}
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
                  {walletCurrencySymbol}
                  {userBalance.toLocaleString()}
                </span>
              )}
            </PaymentOption>
          ))}
        </PaymentMethodsCard>

        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>{t("verify.payment.summaryTitle")}</SummaryTitle>
            <SummaryAmount>
              {loadingPrice
                ? "..."
                : isPriceAvailable
                  ? `${currencySymbol}${totalAmount.toLocaleString()}`
                  : t("verify.search.unavailable", "Unavailable")}
            </SummaryAmount>
          </SummaryHeader>

          <SummaryRow>
            <SummaryLabel>{t("verify.payment.service")}</SummaryLabel>
            <SummaryValue>{config.serviceName}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{t("verify.payment.type")}</SummaryLabel>
            <SummaryValue>{config.idTypeLabel}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{t("verify.payment.value")}</SummaryLabel>
            <SummaryValue>
              {formData[config.serviceFieldKey] ||
                config.fields
                  .map((f) => formData[f.name])
                  .find((v) => v?.trim()) ||
                "—"}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>{t("verify.payment.email")}</SummaryLabel>
            <SummaryValue>{userEmail || "—"}</SummaryValue>
          </SummaryRow>

          {isPriceAvailable && pricingData && (
            <>
              <div
                style={{
                  borderTop: "1px solid #f0f0f0",
                  margin: "12px 0",
                }}
              />
              {config.bureaus && bureauCount > 0 && (
                <SummaryRow>
                  <SummaryLabel>{t("verify.payment.bureaus")}</SummaryLabel>
                  <SummaryValue>
                    {bureauCount} {t("verify.payment.selected")}
                  </SummaryValue>
                </SummaryRow>
              )}
              <SummaryRow>
                {" "}
                <SummaryLabel>
                  {t("verify.payment.processingFee")}
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isLocal
                      ? (pricingData.serviceFee || 0) +
                        (pricingData.processingFee || 0)
                      : pricingData.serviceFeeusd || 0) * bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                {" "}
                <SummaryLabel>
                  {t("verify.payment.taxCharges")}
                  {bureauMultiplier > 1 ? ` × ${bureauMultiplier}` : ""}
                </SummaryLabel>
                <SummaryValue>
                  {currencySymbol}
                  {(
                    (isLocal ? pricingData.vat : pricingData.vatUsd || 0) *
                    bureauMultiplier
                  ).toLocaleString()}
                </SummaryValue>
              </SummaryRow>
              {discount > 0 && (
                <SummaryRow>
                  <SummaryLabel style={{ color: "#16a34a" }}>
                    {t("verify.payment.discount")}
                  </SummaryLabel>
                  <SummaryValue style={{ color: "#16a34a" }}>
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
              marginTop: 16,
              padding: "10px 14px",
              background: termsAccepted
                ? "rgba(2, 131, 28, 0.04)"
                : "rgba(253, 122, 0, 0.04)",
              border: `1.5px solid ${termsAccepted ? "rgba(2, 131, 28, 0.3)" : "rgba(253, 122, 0, 0.15)"}`,
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "Nunito, sans-serif",
              fontSize: 13,
              color: "var(--ec-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{
                accentColor: "#FD7A00",
                width: 16,
                height: 16,
                flexShrink: 0,
              }}
            />
            <span>
              {t("verify.payment.agreePrefix")}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTermsPopup(true);
                }}
                style={{
                  color: "var(--ec-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {t("verify.payment.termsOfService")}
              </a>{" "}
              {t("verify.payment.and")}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPrivacyPopup(true);
                }}
                style={{
                  color: "var(--ec-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {t("verify.payment.privacyPolicy")}
              </a>
              .
            </span>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: 24,
              fontSize: "0.9rem",
              color: "#4B5563",
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={marketingAccepted}
              onChange={(e) => setMarketingAccepted(e.target.checked)}
              style={{
                width: 18,
                height: 18,
                cursor: "pointer",
                accentColor: "var(--ec-primary)",
                marginTop: 2,
                flexShrink: 0,
              }}
            />
            <span>
              {" "}
              {language === "FR"
                ? "Envoyez-moi des offres occasionnelles et des recommandations de services e-citizen pertinentes."
                : "Send me occasional offers and relevant e-citizen service recommendations."}
            </span>
          </label>

          <PayBtn
            onClick={() => setShowPayDisclaimer(true)}
            disabled={
              loading || loadingPrice || !termsAccepted || !isPriceAvailable
            }
          >
            <FaLock />
            {loading
              ? t("verify.payment.loading")
              : `${t("verify.payment.pay")} ${currencySymbol}${totalAmount.toLocaleString()}`}
          </PayBtn>

          <SecuredBy>
            <FaShieldAlt style={{ color: "#FD7A00" }} />
            {t("verify.payment.securedEncrypted")}
          </SecuredBy>

          <div style={{ marginTop: 16 }}>
            <ClearBtn onClick={handleBackToSearch} style={{ width: "100%" }}>
              <FaArrowLeft style={{ marginRight: 8 }} />
              {t("verify.payment.back")}
            </ClearBtn>
          </div>
        </SummaryCard>
      </PaymentGrid>

      {/* Sample Result */}
      <SampleSection>
        <SampleHeader>
          <SampleTitle>{t("verify.payment.sampleResult")}</SampleTitle>
        </SampleHeader>
        <SampleSub>{t("verify.payment.sampleSubtitle")}</SampleSub>
        <SampleResultContent type={type} />
      </SampleSection>
    </>
  );

  const renderProcessingStep = () => (
    <ProcessingWrapper>
      <ProcessingSpinner />
      <ProcessingText>{t("verify.processing.title")}</ProcessingText>
      <ProcessingSub>{t("verify.processing.subtitle")}</ProcessingSub>
    </ProcessingWrapper>
  );

  const formatPopupValue = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "boolean")
      return value ? t("verify.yes") : t("verify.no");
    if (Array.isArray(value)) return value.filter(Boolean).join(", ");
    if (typeof value === "number") return String(value);
    const normalized = String(value).trim();
    return normalized === "" || normalized === "null" ? "" : normalized;
  };

  const addPopupField = (fields, label, value) => {
    const formatted = formatPopupValue(value);
    if (formatted) {
      fields.push({ label, value: formatted });
    }
  };

  const getResultPreviewFields = () => {
    if (!verificationResult?.data) return [];
    const data = verificationResult.data;
    const fields = [];

    // Vehicle verification gets a richer mini-summary because the popup is
    // the first place users see the completed result.
    if (type === "vehicle") {
      addPopupField(fields, "Vehicle Name", data.vehicleName || data.name);
      addPopupField(
        fields,
        "VIN",
        data.vin || data.chasisNumber || data.chassisNumber,
      );
      addPopupField(fields, "Year", data.year);
      addPopupField(fields, "Make", data.make);
      addPopupField(fields, "Model", data.model);
      addPopupField(fields, "Trim", data.trim);
      addPopupField(fields, "Engine", data.engine);
      addPopupField(fields, "Fuel Type", data.fuelType);
      addPopupField(fields, "Transmission", data.transmission);
      addPopupField(fields, "Vehicle Age", data.vehicleAge);
      addPopupField(fields, "Stolen", data.stolen);
      addPopupField(
        fields,
        "Stolen Reports",
        data.report || data.stolenReports || data.stolen_report,
      );
      addPopupField(
        fields,
        "Verification Status",
        data.verificationStatus || data.status,
      );
      addPopupField(
        fields,
        "Verification Reference",
        data.verificationReference || data.reference,
      );

      return fields.slice(0, 10);
    }

    // CI / Smile ID result (fullName, firstName, lastName, dateOfBirth, address, idNumber, idType, actions)
    if (data.fullName || (data.firstName && data.lastName && !data.firstname)) {
      addPopupField(fields, "Full Name", data.fullName);
      addPopupField(fields, "First Name", data.firstName);
      addPopupField(fields, "Last Name", data.lastName);
      addPopupField(fields, "Date of Birth", data.dateOfBirth);
      addPopupField(fields, "ID Number", data.idNumber);
      addPopupField(fields, "ID Type", data.idType?.replace(/_/g, " "));
      addPopupField(fields, "Address", data.address);
      addPopupField(fields, "Country", data.country);
      const verifyAction = data.actions?.Verify_ID_Number;
      addPopupField(fields, "Verification Status", verifyAction);
      return fields.slice(0, 8);
    }

    // NNI / basic result (API returns lowercase: firstname, middlename, surname)
    if (data.firstname || data.firstName || data.surname || data.lastname) {
      const fname = data.firstname || data.firstName;
      const mname = data.middlename || data.middleName;
      const lname = data.surname || data.lastname;
      addPopupField(fields, "First Name", fname);
      addPopupField(fields, "Middle Name", mname);
      addPopupField(fields, "Last Name", lname);
      addPopupField(
        fields,
        "Gender",
        data.gender === "m"
          ? "Male"
          : data.gender === "f"
            ? "Female"
            : data.gender,
      );
      addPopupField(
        fields,
        "Date of Birth",
        data.birthDate || data.dateOfBirth || data.birthdate,
      );
      addPopupField(
        fields,
        "Phone",
        data.telephoneno || data.telephoneNo || data.phone,
      );
      addPopupField(
        fields,
        "Address",
        data.residenceAddress || data.residence_address,
      );
    }

    // Phone verification
    if (data.network) {
      addPopupField(fields, "Owner Name", data.name);
      addPopupField(fields, "Network", data.network);
      addPopupField(fields, "Status", data.status);
    }

    // Business (API returns: approvedName, rcNumber, registrationDate, address, email, lga, state, classificationId)
    if (data.approvedName || data.companyName || data.company_name) {
      addPopupField(
        fields,
        "Business Name",
        data.approvedName || data.companyName || data.company_name,
      );
      addPopupField(fields, "RC Number", data.rcNumber || data.rc_number);
      addPopupField(
        fields,
        "Registration Date",
        data.registrationDate
          ? new Date(data.registrationDate).toLocaleDateString()
          : "",
      );
      addPopupField(fields, "Address", data.address);
      addPopupField(fields, "State", data.state);
      addPopupField(fields, "LGA", data.lga);
      addPopupField(fields, "Email", data.email);
      addPopupField(fields, "Status", data.companyStatus);
    }

    // Credit bureau
    if (data.advance || data.crc || data.firstCentral || data.creditRegistry) {
      addPopupField(fields, "CRC", data.crc ? "Data received" : "");
      addPopupField(
        fields,
        "First Central",
        data.firstCentral ? "Data received" : "",
      );
      addPopupField(
        fields,
        "Credit Registry",
        data.creditRegistry ? "Data received" : "",
      );
    }

    // Generic fallback — show first few string fields
    if (fields.length === 0) {
      Object.entries(data)
        .slice(0, 5)
        .forEach(([key, val]) => {
          if (
            typeof val === "string" &&
            formatPopupValue(val) &&
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
          {t("verify.consent.title")}
        </ProcessingText>
        <ProcessingSub
          style={{ maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}
        >
          {t("verify.consent.description")}
        </ProcessingSub>
        <ProcessingSub
          style={{
            maxWidth: 520,
            margin: "16px auto 0",
            fontSize: 13,
            color: "#999",
          }}
        >
          {t("verify.consent.retentionNote")}
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
            {t("verify.consent.returnToDashboard")}
          </ClearBtn>
        </div>
      </div>
    </FormCard>
  );

  const renderResultStep = () => {
    const previewFields = getResultPreviewFields();
    const resultRoute = verificationResult?.route || "/main-dashboard";
    const resultTitle = verificationResult?.title || t("verify.result.title");
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
            <FaCheckCircle style={{ fontSize: 28, color: "#FD7A00" }} />
          </div>
          <ProcessingText>{resultTitle}</ProcessingText>
          <ProcessingSub>
            {resultDetail || t("verify.result.verificationSuccessful")}
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
            {t("verify.result.summary")}
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
                {t("verify.result.service")}
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
                {t("verify.result.amountPaid")}
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
                {t("verify.result.status")}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#FD7A00",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                }}
              >
                <FaCheckCircle
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                {t("verify.result.successful")}
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
              {t("verify.result.bureauResults")}
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
                <FaCheckCircle style={{ color: "#FD7A00", fontSize: 14 }} />
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: "Nunito, sans-serif",
                    color: "#333",
                  }}
                >
                  {bureau} — {t("verify.result.dataReceived")}
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
              {t("verify.result.preview")}
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
            {t("verify.result.viewFull")} <FaArrowRight />
          </ContinueBtn>
          <ClearBtn onClick={() => history.push("/main-dashboard")}>
            {t("verify.result.goToDashboard")}
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
          <span>{t("verify.breadcrumb.home")}</span> /{" "}
          <span>{config.breadcrumb[0]}</span> /{" "}
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
                  <ResultPhotoPopup $isVehicle={type === "vehicle"}>
                    {(() => {
                      const data = verificationResult?.data;
                      if (!data) return <FaUserCircle />;

                      // Try multiple possible keys for image data
                      let photoSrc =
                        data.vehicleImage ||
                        data.previewImageURL ||
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

                      if (photoSrc) {
                        // Add data URI prefix if it's raw base64
                        if (
                          !photoSrc.startsWith("data:") &&
                          !photoSrc.startsWith("http")
                        ) {
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
                            alt={
                              type === "vehicle"
                                ? t("verify.popup.vehicleImage")
                                : t("verify.popup.verificationPhoto")
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: type === "vehicle" ? "8px" : "50%",
                              objectFit:
                                type === "vehicle" ? "contain" : "cover",
                            }}
                            onError={(e) => {
                              console.warn(
                                "Image failed to load, falling back to icon",
                              );
                              e.target.style.display = "none";
                            }}
                          />
                        );
                      }
                      return type === "vehicle" ? (
                        <FaCarAlt />
                      ) : (
                        <FaUserCircle />
                      );
                    })()}
                  </ResultPhotoPopup>
                  <ResultGridPopup>
                    {getResultPreviewFields().map((field, idx) => (
                      <ResultFieldPopup key={idx}>
                        <ResultLabelPopup>{field.label}</ResultLabelPopup>
                        {field.label === "Verification Status" ? (
                          <VerifiedBadgePopup>
                            {String(field.value).toUpperCase()}{" "}
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
                    {t("verify.popup.verifiedOn")}{" "}
                    {new Date().toLocaleDateString(
                      language === "FR" ? "fr-FR" : "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                  <span>
                    {t("verify.popup.reference")}{" "}
                    {type === "vehicle"
                      ? verificationResult?.data?.verificationReference ||
                        verificationResult?.data?.reference ||
                        localStorage.getItem("transactionID") ||
                        t("verify.popup.notAvailable")
                      : localStorage.getItem("transactionID") ||
                        t("verify.popup.notAvailable")}
                  </span>
                </ResultFooterPopup>
              </ResultCardPopup>
              <ResultDisclaimerPopup>
                <FaInfoCircle />
                {t("verify.popup.dataDisclaimer")}
              </ResultDisclaimerPopup>
              <PopupActionRow>
                <ContinueBtn
                  onClick={() => {
                    setShowResultPopup(false);
                    history.push("/main-dashboard");
                  }}
                >
                  {t("verify.popup.viewFullResult")} <FaArrowRight />
                </ContinueBtn>
                <ClearBtn
                  onClick={() => {
                    setShowResultPopup(false);
                    setCurrentStep(RESULT_STEP);
                  }}
                >
                  {t("verify.popup.close")}
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

      {/* Terms of Service Popup */}
      {showTermsPopup && (
        <PopupOverlay onClick={() => setShowTermsPopup(false)}>
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
                    background: "rgba(253, 122, 0, 0.10)",
                    color: "#FD7A00",
                  }}
                >
                  <FaShieldAlt />
                </PopupIcon>
                <div>
                  <PopupTitle>{t("termsOfService.title")}</PopupTitle>
                  <PopupSubtitle>
                    {language === "FR"
                      ? "Veuillez lire les conditions attentivement avant de continuer."
                      : "Please read the terms carefully before proceeding."}
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowTermsPopup(false)}>
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
                title={t("termsOfService.title")}
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

      {/* Privacy Policy Popup */}
      {showPrivacyPopup && (
        <PopupOverlay onClick={() => setShowPrivacyPopup(false)}>
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
                    background: "rgba(2, 131, 28, 0.10)",
                    color: "#02831C",
                  }}
                >
                  <FaShieldAlt />
                </PopupIcon>
                <div>
                  <PopupTitle>{t("privacyPolicy.title")}</PopupTitle>
                  <PopupSubtitle>
                    {language === "FR"
                      ? "Comment nous collectons, utilisons et protégeons vos données personnelles."
                      : "How we collect, use, and protect your personal data."}
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowPrivacyPopup(false)}>
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
                title={t("privacyPolicy.title")}
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

      {/* Pre-Payment Disclaimer Modal */}
      {showPayDisclaimer && (
        <PopupOverlay>
          <PopupCard style={{ maxWidth: 560 }}>
            <PopupHeader>
              <PopupMeta>
                <PopupIcon
                  style={{
                    background: "rgba(2, 131, 28, 0.10)",
                    color: "#02831C",
                  }}
                >
                  <FaInfoCircle />
                </PopupIcon>
                <div>
                  <PopupTitle>{t("verify.disclaimer.title")}</PopupTitle>
                  <PopupSubtitle>
                    {t("verify.disclaimer.subtitle")}
                  </PopupSubtitle>
                </div>
              </PopupMeta>
              <PopupCloseButton onClick={() => setShowPayDisclaimer(false)}>
                ×
              </PopupCloseButton>
            </PopupHeader>
            <PopupBody>
              <div
                style={{
                  background: "rgba(2, 131, 28, 0.06)",
                  border: "1px solid rgba(2, 131, 28, 0.2)",
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
                    {t("verify.disclaimer.vehicleHeading")}
                    <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                      <li style={{ marginBottom: 12 }}>
                        {t("verify.disclaimer.vehicleBullet1")}{" "}
                        <strong>
                          {t("verify.disclaimer.vehicleBullet1Bold")}
                        </strong>{" "}
                        {t("verify.disclaimer.vehicleBullet1End")}
                      </li>
                      <li style={{ marginBottom: 12 }}>
                        {t("verify.disclaimer.vehicleBullet2")}{" "}
                        <strong>
                          {t("verify.disclaimer.vehicleBullet2Bold")}
                        </strong>{" "}
                        {t("verify.disclaimer.vehicleBullet2End")}
                      </li>
                      <li style={{ marginBottom: 0 }}>
                        {t("verify.disclaimer.vehicleBullet3")}{" "}
                        <strong>
                          {t("verify.disclaimer.vehicleBullet3Bold")}
                        </strong>
                        {t("verify.disclaimer.vehicleBullet3End")}
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
                        {t("verify.disclaimer.consentBullet")}{" "}
                        <strong>
                          {t("verify.disclaimer.consentBulletBold")}
                        </strong>{" "}
                        {t("verify.disclaimer.consentBulletEnd")}
                      </li>
                    )}
                    <li style={{ marginBottom: 12 }}>
                      {t("verify.disclaimer.bullet2")}{" "}
                      <strong>{t("verify.disclaimer.bullet2Bold")}</strong>
                      {t("verify.disclaimer.bullet2End")}
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      {t("verify.disclaimer.bullet3")}{" "}
                      <strong>{t("verify.disclaimer.bullet3Bold")}</strong>
                      {t("verify.disclaimer.bullet3End")}
                    </li>
                  </ol>
                )}
              </div>
              <PopupActionRow style={{ justifyContent: "center" }}>
                <ContinueBtn
                  onClick={() => {
                    setShowPayDisclaimer(false);
                    handlePay();
                  }}
                >
                  {t("verify.disclaimer.continue")} <FaArrowRight />
                </ContinueBtn>
                <ClearBtn onClick={() => setShowPayDisclaimer(false)}>
                  {t("verify.disclaimer.cancel")}
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
    </PageWrapper>
  );
};

export default VerifyPage;
