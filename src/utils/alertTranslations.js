/**
 * Shared Swahili/English translations for SweetAlert dialogs.
 *
 * Usage:
 *   import { t, getLanguage } from "../../utils/alertTranslations";
 *   const isSw = getLanguage() === "SW";
 *   Swal.fire({ title: t("Wallet Balance Low", isSw), text: t("Your wallet balance is low...", isSw) });
 */

export const getLanguage = () => {
  if (typeof window === "undefined") return "EN";
  return window.localStorage.getItem("siteLanguage") === "SW" ? "SW" : "EN";
};

export const t = (label, isSw) => {
  const translations = {
    // Common button text
    OK: "OK",
    Confirm: isSw ? "Thibitisha" : "Confirm",
    Cancel: isSw ? "Ghairi" : "Cancel",
    Close: isSw ? "Funga" : "Close",
    Continue: isSw ? "Endelea" : "Continue",

    // Titles
    Error: isSw ? "Hitilafu" : "Error",
    Warning: isSw ? "Onyo" : "Warning",
    Success: isSw ? "Imefanikiwa" : "Success",
    Info: isSw ? "Taarifa" : "Info",
    "Oops!": isSw ? "Samahani!" : "Oops!",
    Disclaimer: isSw ? "Taarifa ya Kushindwa" : "Disclaimer",

    // Wallet Balance
    "Wallet Balance Low": isSw ? "Salio la Pochi Halitoshi" : "Wallet Balance Low",
    "Your wallet balance is low. Please recharge before making a payment.":
      isSw
        ? "Salio lako la pochi halitoshi. Tafadhali jaza tena kabla ya kufanya malipo."
        : "Your wallet balance is low. Please recharge before making a payment.",
    "Wallet Balance Warning": isSw ? "Onyo la Salio la Pochi" : "Wallet Balance Warning",

    // Currency
    "Currency Not Selected": isSw ? "Sarafu haijachaguliwa" : "Currency Not Selected",
    "Please select a payment currency (Naira or USD) before proceeding.":
      isSw
        ? "Tafadhali chagua sarafu ya malipo (Naira au USD) kabla ya kuendelea."
        : "Please select a payment currency (Naira or USD) before proceeding.",

    // Currency mismatch
    "Wallet currency doesn't match purchase currency. Please use the right currency for this transaction.":
      isSw
        ? "Sarafu ya pochi haifanani na sarafu ya ununuzi. Tafadhali tumia sarafu sahihi kwa muamala huu."
        : "Wallet currency doesn't match purchase currency. Please use the right currency for this transaction.",
    "Wallet currency doesn't match purchase currency. Do you want to pay with your wallet currency?":
      isSw
        ? "Sarafu ya pochi haifanani na sarafu ya ununuzi. Unataka kulipa kwa sarafu ya pochi yako?"
        : "Wallet currency doesn't match purchase currency. Do you want to pay with your wallet currency?",

    // Verification errors
    "At least one Credit Bereau must be selected":
      isSw
        ? "Angalau moja ya Ofisi ya Mikopo lazima ichaguliwe"
        : "At least one Credit Bereau must be selected",
    "Verification failed":
      isSw ? "Uthibitishaji umeshindwa" : "Verification failed",
    "Failed to load result.":
      isSw ? "Imeshindwa kupakia matokeo." : "Failed to load result.",
    "Verification Result or Consent expired":
      isSw
        ? "Matokeo ya Uthibitishaji au Idhini yameisha muda wake"
        : "Verification Result or Consent expired",
    "Consent Denied": isSw ? "Idhini Imekataliwa" : "Consent Denied",
    "Awaiting Consent": isSw ? "Kusubiri Idhini" : "Awaiting Consent",
    "Sorry, No record found":
      isSw
        ? "Samahani, Hakuna rekodi iliyopatikana"
        : "Sorry, No record found",
    "Sorry, verification failed":
      isSw ? "Samahani, uthibitishaji umeshindwa" : "Sorry, verification failed",

    // Payment
    "Payment Cancelled or Declined":
      isSw ? "Malipo Yameghairiwa au Kukataliwa" : "Payment Cancelled or Declined",
    "Failed Payment": isSw ? "Malipo Yameshindwa" : "Failed Payment",
    "Payment Failed": isSw ? "Malipo Yameshindwa" : "Payment Failed",
    "There was an issue making payment":
      isSw ? "Kulikuwa na tatizo la kufanya malipo" : "There was an issue making payment",
    "Payment failed": isSw ? "Malipo yameshindwa" : "Payment failed",
    "There was an issue verifying payment":
      isSw ? "Kulikuwa na tatizo la kuthibitisha malipo" : "There was an issue verifying payment",
    "We encountered an issue while trying to process your payment. Please try again shortly.":
      isSw
        ? "Tulikuwa na tatizo wakati wa kusindika malipo yako. Tafadhali jaribu tena baadaye."
        : "We encountered an issue while trying to process your payment. Please try again shortly.",

    // PayPal
    "Failed to initialize PayPal payment":
      isSw ? "Imeshindwa kuanzisha malipo ya PayPal" : "Failed to initialize PayPal payment",
    "Response data does not contain a link":
      isSw ? "Data ya majibu haifuniki kiungo" : "Response data does not contain a link",

    // Paystack
    "Failed to initialize Paystack payment":
      isSw ? "Imeshindwa kuanzisha malipo ya Paystack" : "Failed to initialize Paystack payment",

    // Service
    "Unable to get Service Prices":
      isSw ? "Haiwezi kupata Bei za Huduma" : "Unable to get Service Prices",
    "Service unavailable at the moment. Please try again later.":
      isSw
        ? "Huduma haipatikani kwa sasa. Tafadhali jaribu tena baadaye."
        : "Service unavailable at the moment. Please try again later.",
    "Service unavailable at the moment. Please try again later. A refund has already been initiated.":
      isSw
        ? "Huduma haipatikani kwa sasa. Tafadhali jaribu tena baadaye. Urefu umeanzishwa tayari."
        : "Service unavailable at the moment. Please try again later. A refund has already been initiated.",

    // Stakeholders
    "Error fetching Stake Holders":
      isSw ? "Hitilafu kupata Waendeshaji" : "Error fetching Stake Holders",

    // Business
    "Your business verification request was successful.":
      isSw ? "Ombi lako la uthibitishaji wa biashara limefanikiwa." : "Your business verification request was successful.",

    // Vehicle
    "Your vehicle verification request was successful.":
      isSw ? "Ombi lako la uthibitishaji wa gari limefanikiwa." : "Your vehicle verification request was successful.",

    // Request Error
    "Request Error": isSw ? "Hitilafu ya Ombi" : "Request Error",

    // Profile
    "Date and Time": isSw ? "Tarehe na Muda" : "Date and Time",
    "Selected Profile": isSw ? "Profaili Iliyochaguliwa" : "Selected Profile",
    Status: isSw ? "Hali" : "Status",
    Action: isSw ? "Kitendo" : "Action",

    // Dashboard
    "Wallet Balance:": isSw ? "Salio la Pochi:" : "Wallet Balance:",
    "Fund Wallet": isSw ? "Jaza Pochi" : "Fund Wallet",
    "Select Payment Method": isSw ? "Chagua Njia ya Malipo" : "Select Payment Method",
    "Proceed to Payment": isSw ? "Endelea na Malipo" : "Proceed to Payment",
    "View Wallet": isSw ? "Tazama Pochi" : "View Wallet",
    "User Wallet": isSw ? "Pochi ya Mtumiaji" : "User Wallet",
    "(Not available for USD)": isSw ? "(Haipatikani kwa USD)" : "(Not available for USD)",
    "Kindly select a payment method":
      isSw ? "Tafadhali chagua njia ya malipo" : "Kindly select a payment method",

    // Transaction history
    "COMPANY NAME": isSw ? "JINA LA KAMPUNI" : "COMPANY NAME",
    "Vehicle Registration Number":
      isSw ? "Nambari ya Usajili wa Gari" : "Vehicle Registration Number",
    "Transaction Ref": isSw ? "Kumbukumbu ya Muamala" : "Transaction Ref",
    Amount: isSw ? "Kiasi" : "Amount",
    "Transaction Type": isSw ? "Aina ya Muamala" : "Transaction Type",
    Successful: isSw ? "Imefanikiwa" : "Successful",
    Failed: isSw ? "Imeshindwa" : "Failed",
    VERIFICATION: isSw ? "UTHIBITISHO" : "VERIFICATION",
    REFUND: isSw ? "KURUDISHWA" : "REFUND",
    TOPUP: isSw ? "KUJAZA" : "TOPUP",
    "Verification History": isSw ? "Historia ya Uthibitishaji" : "Verification History",
    "Transaction Logs": isSw ? "Rekodi za Miamala" : "Transaction Logs",
    "Search...": isSw ? "Tafuta..." : "Search...",
    "No Data Found": isSw ? "Hakuna Data" : "No Data Found",
    "NO DATA": isSw ? "HAKUNA DATA" : "NO DATA",
    Expired: isSw ? "Kimeisha" : "Expired",

    // Verification statuses
    granted: isSw ? "imetolewa" : "granted",
    pending: isSw ? "inasubiri" : "pending",
    denied: isSw ? "imekataliwa" : "denied",
    initiate: isSw ? "kuanzisha" : "initiate",

    // Loading / misc
    "Loading Paystack payment...":
      isSw ? "Inapakia malipo ya Paystack..." : "Loading Paystack payment...",
    "Fetching result ...":
      isSw ? "Inachukua matokeo ..." : "Fetching result ...",
    "View Results": isSw ? "Tazama Matokeo" : "View Results",

    // Verification Failed (with context)
    "Verification Failed":
      isSw ? "Uthibitishaji umeshindwa" : "Verification Failed",
    "Partial Results": isSw ? "Matokeo ya Kiasi" : "Partial Results",
    "Failed to initialize payment":
      isSw ? "Imeshindwa kuanzisha malipo" : "Failed to initialize payment",
    "Please Wait": isSw ? "Tafadhali Subiri" : "Please Wait",
    "Verification in progress": isSw ? "Uthibitishaji unaendelea" : "Verification in progress",
    "Choose one or more profiles to verify": isSw
      ? "Chagua profili moja au zaidi za kuthibitisha"
      : "Choose one or more profiles to verify",
    "Input the information you want to search": isSw
      ? "Weka taarifa unazotaka kutafuta"
      : "Input the information you want to search",
    "Make a payment": isSw ? "Fanya malipo" : "Make a payment",
    "View results": isSw ? "Tazama matokeo" : "View results",
    "National ID must be exactly 11 digits.": isSw
      ? "Nambari ya Kitambulisho lazima iwe na tarakimu 11 sahihi."
      : "National ID must be exactly 11 digits.",
    "BVN must be exactly 11 digits.": isSw
      ? "BVN lazima iwe na tarakimu 11 sahihi."
      : "BVN must be exactly 11 digits.",
    "VIN must be exactly 17 characters.": isSw
      ? "VIN lazima iwe na herufi 17 sahihi."
      : "VIN must be exactly 17 characters.",
    "There was an issue making payment": isSw
      ? "Kulikuwa na tatizo la kufanya malipo"
      : "There was an issue making payment",

    // Confirmation prompts
    "You must select a payment method":
      isSw ? "Lazima uchague njia ya malipo" : "You must select a payment method",

    // Bulk NIN
    "Bulk verification completed":
      isSw ? "Uthibitishaji wa wingi umekamilika" : "Bulk verification completed",
  };
  return translations[label] || label;
};
