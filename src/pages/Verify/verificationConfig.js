import {
  FaIdCard,
  FaPhoneAlt,
  FaBuilding,
  FaCreditCard,
  FaCheckCircle,
  FaCamera,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaBolt,
  FaFileAlt,
  FaCar,
  FaShieldAlt,
  FaHistory,
} from "react-icons/fa";

const verificationConfig = {
  nin: {
    heroTitle: "Vérifiez votre",
    heroHighlight: "Carte Nationale d'Identité",
    heroSubtitle:
      "Entrez les détails, payez en toute sécurité et obtenez des résultats précis instantanément.",
    heroImage: require("../../images/cote_divoire.png"),
    breadcrumb: ["Vérifier Identité", "Vérification CNI"],
    idTypeLabel: "Numéro National d'Identité (NNI)",
    countryCode: "CI",
    serviceCode: "NATIONAL_ID_NNI",
    fields: [
      {
        name: "idNumber",
        label: "Numéro NNI",
        placeholder: "Entrez le numéro NNI",
        type: "text",
        maxLength: 20,
        showCounter: true,
        required: true,
      },
      {
        name: "subjectPhone",
        label: "Contact du sujet (pour consentement)",
        placeholder: "Entrez le numéro de téléphone du sujet",
        type: "text",
        maxLength: 15,
        showCounter: true,
        required: false,
      },
      {
        name: "subjectEmail",
        label: "Email du sujet (pour consentement)",
        placeholder: "Entrez l'adresse email du sujet",
        type: "email",
        maxLength: 100,
        showCounter: false,
        required: false,
      },
    ],
    youWillGet: [
      { icon: FaUser, text: "Détails personnels complets" },
      { icon: FaCamera, text: "Photo" },
      { icon: FaUsers, text: "Détails du proche parent" },
      { icon: FaCheckCircle, text: "Statut de vérification" },
      { icon: FaBolt, text: "Résultats instantanés" },
    ],
    sampleResult: {
      name: "Kouamé Yao Jean",
      identifier: "NNI: CI-1234567890",
      tags: ["Nom complet", "Photo", "Date de naissance", "Et plus..."],
    },
    serviceName: "Vérification CNI (NNI)",
    apiServiceName: "National ID NNI",
    serviceFieldKey: "idNumber",
    priceIndex: 0,
    requiresConsent: true,
    trustBar: [
      { title: "Sécurisé & Privé", desc: "Vos données sont protégées" },
      { title: "Résultats Instantanés", desc: "Résultats en secondes" },
      {
        title: "Plateforme de Confiance",
        desc: "Conforme aux réglementations",
      },
      { title: "500 000+ Utilisateurs", desc: "Font confiance à e-citoyen" },
    ],
  },

  phone: {
    heroTitle: "Verify a Phone",
    heroHighlight: "Number",
    heroSubtitle:
      "Enter a phone number, pay securely and get verification results instantly.",
    heroImage: require("../../images/cote_divoire.png"),
    breadcrumb: ["Verify Identity", "Phone Verification"],
    idTypeLabel: "Phone Number Verification",
    fields: [
      {
        name: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number (e.g. 08031234567)",
        type: "text",
        maxLength: 11,
        showCounter: true,
        required: true,
      },
    ],
    youWillGet: [
      { icon: FaUser, text: "Owner information" },
      { icon: FaPhoneAlt, text: "Network details" },
      { icon: FaCheckCircle, text: "Verification status" },
      { icon: FaMapMarkerAlt, text: "Region details" },
      { icon: FaBolt, text: "Instant results" },
    ],
    sampleResult: {
      name: "Adebayo John O.",
      identifier: "Phone: 0803 *** 5678",
      tags: ["Owner Name", "Network", "Status", "And more..."],
    },
    serviceName: "Phone Verification",
    serviceFieldKey: "phone",
    priceIndex: 9,
    trustBar: [
      { title: "Secure & Private", desc: "Your data is protected" },
      { title: "Instant Results", desc: "Get results in seconds" },
      { title: "Trusted Platform", desc: "Government compliant" },
      { title: "500,000+ Users", desc: "Trust e-citoyen" },
    ],
  },

  business: {
    heroTitle: "Verify a Business",
    heroHighlight: "in seconds",
    heroSubtitle:
      "Enter company details, pay securely and get accurate results instantly.",
    heroImage: require("../../images/business_verification2.png"),
    breadcrumb: ["Verify Business", "Business Verification"],
    idTypeLabel: "Business Registration (RC Number / Business Name)",
    fields: [
      {
        name: "rc",
        label: "RC Number",
        placeholder: "Enter RC Number",
        type: "text",
        maxLength: 10,
        showCounter: false,
        required: false,
        eitherOr: "business",
      },
      {
        name: "business_name",
        label: "Business Name",
        placeholder: "Enter Business Name",
        type: "text",
        maxLength: 100,
        showCounter: false,
        required: false,
        eitherOr: "business",
      },
    ],
    youWillGet: [
      { icon: FaBuilding, text: "Company details" },
      { icon: FaUsers, text: "Directors & shareholders" },
      { icon: FaFileAlt, text: "Registration status" },
      { icon: FaCheckCircle, text: "Verification status" },
      { icon: FaBolt, text: "Instant results" },
    ],
    sampleResult: {
      name: "ABC Technologies Ltd",
      identifier: "RC: 123456",
      tags: ["Company Name", "Directors", "Status", "And more..."],
    },
    serviceName: "Business Verification",
    serviceFieldKey: "rc",
    priceIndex: 2,
    trustBar: [
      { title: "Secure & Private", desc: "Your data is protected" },
      { title: "Instant Results", desc: "Get results in seconds" },
      { title: "Trusted Platform", desc: "Government compliant" },
      { title: "500,000+ Users", desc: "Trust e-citoyen" },
    ],
  },

  "business-name": {
    heroTitle: "Verify a Business",
    heroHighlight: "Name",
    heroSubtitle:
      "Search by business name, pay securely and get accurate results instantly.",
    heroImage: require("../../images/business_verification.png"),
    breadcrumb: ["Verify Business", "Business Name Verification"],
    idTypeLabel: "Business Name Search",
    fields: [
      {
        name: "business_name",
        label: "Business Name",
        placeholder: "Enter business name",
        type: "text",
        maxLength: 100,
        showCounter: false,
        required: true,
      },
      {
        name: "purpose",
        label: "Purpose (optional)",
        placeholder: "Select purpose",
        type: "select",
        required: false,
        options: [
          "Due Diligence",
          "Partnership Verification",
          "Investment Check",
          "Compliance",
          "Other",
        ],
      },
    ],
    youWillGet: [
      { icon: FaBuilding, text: "Company details" },
      { icon: FaUsers, text: "Directors & shareholders" },
      { icon: FaFileAlt, text: "Registration status" },
      { icon: FaCheckCircle, text: "Verification status" },
      { icon: FaBolt, text: "Instant results" },
    ],
    sampleResult: {
      name: "XYZ Enterprises",
      identifier: "BN: 3456789",
      tags: ["Business Name", "Directors", "Status", "And more..."],
    },
    serviceName: "Business Name Verification",
    serviceFieldKey: "business_name",
    priceIndex: 3,
    trustBar: [
      { title: "Secure & Private", desc: "Your data is protected" },
      { title: "Instant Results", desc: "Get results in seconds" },
      { title: "Trusted Platform", desc: "Government compliant" },
      { title: "500,000+ Users", desc: "Trust e-citoyen" },
    ],
  },

  bvn: {
    heroTitle: "Verify Your ",
    heroHighlight: "BVN in seconds",
    heroSubtitle:
      "Enter your BVN, pay securely and get financial verification results instantly.",
    heroImage: require("../../images/credit_profile.png"),
    breadcrumb: ["Verify Financial", "BVN Verification"],
    idTypeLabel: "Bank Verification Number (BVN)",
    fields: [
      {
        name: "bvn",
        label: "BVN",
        placeholder: "Enter 11 digits BVN",
        type: "text",
        maxLength: 11,
        showCounter: true,
        required: true,
      },
    ],
    youWillGet: [
      { icon: FaUser, text: "Full personal details" },
      { icon: FaCreditCard, text: "Financial profile" },
      { icon: FaCheckCircle, text: "Verification status" },
      { icon: FaBolt, text: "Instant results" },
    ],
    sampleResult: {
      name: "John Doe",
      identifier: "BVN: 22345678901",
      tags: ["Full Name", "Bank Details", "Status", "And more..."],
    },
    serviceName: "BVN Verification",
    serviceFieldKey: "bvn",
    priceIndex: 4,
    requiresConsent: true,
    bureaus: [
      { id: "crc", label: "Credit Risk Certification (CRC)", fieldName: "crc" },
      { id: "firstCentral", label: "First Central", fieldName: "firstCentral" },
      {
        id: "creditRegistry",
        label: "Credit Registry",
        fieldName: "creditRegistry",
      },
    ],
    allBureausDiscount: { xof: 800, usd: 0.97 },
    trustBar: [
      { title: "Secure & Private", desc: "Your data is protected" },
      { title: "Instant Results", desc: "Get results in seconds" },
      { title: "Trusted Platform", desc: "Government compliant" },
      { title: "500,000+ Users", desc: "Trust e-citoyen" },
    ],
  },

  vehicle: {
    heroTitle: "Vérifiez ",
    heroHighlight: "l'Historique du Véhicule",
    heroSubtitle:
      "Vérifiez un véhicule par VIN pour réduire la fraude et prendre des décisions d'achat plus sûres.",
    heroImage: require("../../images/cote_vehicle.png"),
    breadcrumb: ["Vérifier Véhicule", "Vérification VIN"],
    idTypeLabel: "Numéro d'Identification du Véhicule (VIN)",
    countryCode: "CI",
    serviceCode: "VIN",
    fields: [
      {
        name: "idNumber",
        label: "VIN (Numéro d'Identification du Véhicule)",
        placeholder: "Entrez le VIN",
        type: "text",
        maxLength: 17,
        showCounter: true,
        required: true,
      },
    ],
    youWillGet: [
      { icon: FaCar, text: "Détails du véhicule" },
      { icon: FaHistory, text: "Historique de propriété" },
      { icon: FaShieldAlt, text: "Statut vol / liste de surveillance" },
      { icon: FaCheckCircle, text: "Statut de vérification" },
      { icon: FaBolt, text: "Résultats instantanés" },
    ],
    sampleResult: {
      name: "Toyota Corolla 2018",
      identifier: "VIN: 84759805678",
      tags: ["Marque/Modèle", "Propriété", "Statut", "Et plus..."],
    },
    serviceName: "Vérification VIN",
    apiServiceName: "VIN",
    serviceFieldKey: "idNumber",
    priceIndex: 5,
    trustBar: [
      { title: "Sécurisé & Privé", desc: "Vos données sont protégées" },
      { title: "Résultats Instantanés", desc: "Résultats en secondes" },
      {
        title: "Plateforme de Confiance",
        desc: "Conforme aux réglementations",
      },
      { title: "500 000+ Utilisateurs", desc: "Font confiance à e-citoyen" },
    ],
  },

  resident: {
    heroTitle: "Vérifiez votre",
    heroHighlight: "Carte de Résident",
    heroSubtitle:
      "Entrez les détails de la carte de résident, payez en toute sécurité et obtenez des résultats instantanément.",
    heroImage: require("../../images/cote_divoire.png"),
    breadcrumb: ["Vérifier Identité", "Carte de Résident"],
    idTypeLabel: "Carte de Résident",
    countryCode: "CI",
    serviceCode: "RESIDENTS_ID",
    fields: [
      {
        name: "idNumber",
        label: "Residents ID",
        placeholder: "Enter Residents ID number",
        type: "text",
        maxLength: 20,
        showCounter: true,
        required: true,
      },
      {
        name: "subjectPhone",
        label: "Contact du sujet (pour consentement)",
        placeholder: "Entrez le numéro de téléphone du sujet",
        type: "text",
        maxLength: 15,
        showCounter: true,
        required: false,
      },
      {
        name: "subjectEmail",
        label: "Email du sujet (pour consentement)",
        placeholder: "Entrez l'adresse email du sujet",
        type: "email",
        maxLength: 100,
        showCounter: false,
        required: false,
      },
    ],
    youWillGet: [
      { icon: FaUser, text: "Détails personnels" },
      { icon: FaIdCard, text: "Détails de la carte" },
      { icon: FaCheckCircle, text: "Statut de vérification" },
      { icon: FaBolt, text: "Résultats instantanés" },
    ],
    sampleResult: {
      name: "Diallo Mamadou",
      identifier: "Carte: CI-RES-12345",
      tags: ["Nom complet", "Numéro de carte", "Statut", "Et plus..."],
    },
    serviceName: "Vérification Carte de Résident",
    apiServiceName: "Residents ID",
    serviceFieldKey: "idNumber",
    priceIndex: 0,
    requiresConsent: true,
    trustBar: [
      { title: "Sécurisé & Privé", desc: "Vos données sont protégées" },
      { title: "Résultats Instantanés", desc: "Résultats en secondes" },
      {
        title: "Plateforme de Confiance",
        desc: "Conforme aux réglementations",
      },
      { title: "500 000+ Utilisateurs", desc: "Font confiance à e-citoyen" },
    ],
  },
};

// Service-specific copy used to live directly in the config above.  Keep the
// service metadata there, but overlay the display copy for the selected locale
// so a language change re-renders the entire verification experience.
const localizedContent = {
  EN: {
    nin: {
      heroTitle: "Verify your",
      heroHighlight: "National Identity Card",
      heroSubtitle:
        "Enter the details, pay securely, and get accurate results instantly.",
      breadcrumb: ["Verify Identity", "National ID Verification"],
      idTypeLabel: "National Identity Number (NNI)",
      fields: {
        idNumber: { label: "NNI Number", placeholder: "Enter NNI number" },
        subjectPhone: {
          label: "Subject contact (for consent)",
          placeholder: "Enter the subject's phone number",
        },
        subjectEmail: {
          label: "Subject email (for consent)",
          placeholder: "Enter the subject's email address",
        },
      },
      youWillGet: [
        "Full personal details",
        "Photo",
        "Next-of-kin details",
        "Verification status",
        "Instant results",
      ],
      sampleResult: {
        identifier: "NNI: CI-1234567890",
        tags: ["Full name", "Photo", "Date of birth", "And more..."],
      },
      serviceName: "National ID (NNI) Verification",
      trustBar: [
        ["Secure & Private", "Your data is protected"],
        ["Instant Results", "Results in seconds"],
        ["Trusted Platform", "Compliant with regulations"],
        ["500,000+ Users", "Trust e-citoyen"],
      ],
    },
    vehicle: {
      heroTitle: "Verify",
      heroHighlight: "Vehicle History",
      heroSubtitle:
        "Verify a vehicle by VIN to reduce fraud and make safer buying decisions.",
      breadcrumb: ["Verify Vehicle", "VIN Verification"],
      idTypeLabel: "Vehicle Identification Number (VIN)",
      fields: {
        idNumber: {
          label: "VIN (Vehicle Identification Number)",
          placeholder: "Enter VIN",
        },
      },
      youWillGet: [
        "Vehicle details",
        "Ownership history",
        "Stolen/watch-list status",
        "Verification status",
        "Instant results",
      ],
      sampleResult: {
        tags: ["Make/Model", "Ownership", "Status", "And more..."],
      },
      serviceName: "VIN Verification",
      trustBar: [
        ["Secure & Private", "Your data is protected"],
        ["Instant Results", "Results in seconds"],
        ["Trusted Platform", "Compliant with regulations"],
        ["500,000+ Users", "Trust e-citoyen"],
      ],
    },
    resident: {
      heroTitle: "Verify your",
      heroHighlight: "Resident Card",
      heroSubtitle:
        "Enter resident card details, pay securely, and get results instantly.",
      breadcrumb: ["Verify Identity", "Resident Card"],
      idTypeLabel: "Resident Card",
      fields: {
        idNumber: {
          label: "Resident ID",
          placeholder: "Enter resident ID number",
        },
        subjectPhone: {
          label: "Subject contact (for consent)",
          placeholder: "Enter the subject's phone number",
        },
        subjectEmail: {
          label: "Subject email (for consent)",
          placeholder: "Enter the subject's email address",
        },
      },
      youWillGet: [
        "Personal details",
        "Card details",
        "Verification status",
        "Instant results",
      ],
      sampleResult: {
        identifier: "Card: CI-RES-12345",
        tags: ["Full name", "Card number", "Status", "And more..."],
      },
      serviceName: "Resident Card Verification",
      trustBar: [
        ["Secure & Private", "Your data is protected"],
        ["Instant Results", "Results in seconds"],
        ["Trusted Platform", "Compliant with regulations"],
        ["500,000+ Users", "Trust e-citoyen"],
      ],
    },
  },
};

export const getVerificationConfig = (type, language) => {
  const config = verificationConfig[type];
  const content = localizedContent[language]?.[type];
  if (!config || !content) return config;

  return {
    ...config,
    ...content,
    fields: config.fields.map((field) => ({
      ...field,
      ...(content.fields?.[field.name] || {}),
    })),
    youWillGet: config.youWillGet.map((item, index) => ({
      ...item,
      text: content.youWillGet?.[index] || item.text,
    })),
    sampleResult: { ...config.sampleResult, ...content.sampleResult },
    trustBar: config.trustBar.map((item, index) => ({
      ...item,
      title: content.trustBar?.[index]?.[0] || item.title,
      desc: content.trustBar?.[index]?.[1] || item.desc,
    })),
  };
};

export default verificationConfig;
