# Google Ads Conversion Tracking Setup

## Overview

Google Ads conversion tracking has been set up to track purchase events across the application.

## What Was Added

### 1. Google Ads Tag Configuration

In `/public/index.html`, the Google Ads conversion tracking ID has been added:

```javascript
gtag("config", "AW-17949220362");
```

### 2. Conversion Tracking Function

In `/src/hooks/analytics.js`, a new function `trackPurchaseConversion` has been added:

```javascript
import { trackPurchaseConversion } from "../hooks/analytics";

// Basic usage
trackPurchaseConversion({
  value: 1.0,
  currency: "USD",
  transactionId: "TXN123456",
});

// With new customer flag
trackPurchaseConversion({
  value: 100.5,
  currency: "NGN",
  transactionId: "TXN123456",
  isNewCustomer: true, // or false, or leave undefined
});
```

## Implementation Guide

### Where to Add Conversion Tracking

You should call `trackPurchaseConversion()` after successful payment completion in these files:

#### 1. **Wallet Top-up (Navbar)** - `/src/components/Navbar/Navbar.js`

In `handlePaystackModalClose` and `handleModalOk` functions, after successful payment:

```javascript
import { trackPurchaseConversion } from "../../hooks/analytics";

// After payment verification succeeds
if (
  responseData.status === "success" ||
  responseData.data.status === "successful"
) {
  trackPurchaseConversion({
    value: parseFloat(amount) || 1.0,
    currency: userCurrency || "NGN",
    transactionId: paystackReference || transactionRef,
  });
  dispatch(fetchUserProfile(userToken2));
}
```

#### 2. **Wallet Top-up (Dashboard)** - `/src/pages/dashboard/mainDashboard.jsx`

Same implementation as Navbar.

#### 3. **Verification Services Payment** - `/src/pages/dashboard/dashboardPage.jsx`

In `handlePaystackModalClose` and Flutterwave success handlers:

```javascript
import { trackPurchaseConversion } from "../../hooks/analytics";

// After successful payment verification
if (
  responseData.status === "success" ||
  responseData.data.status === "successful"
) {
  trackPurchaseConversion({
    value: parseFloat(totalServiceCost) || 1.0,
    currency: currencyCheck || "NGN",
    transactionId: paystackReference,
  });
  // Continue with handleSubmit()
}
```

#### 4. **Business Stakeholders Payment** - `/src/pages/result/businessName.jsx`

In `handlePaystackModalClose` and `handleModalNewOk` functions:

```javascript
import { trackPurchaseConversion } from "../../hooks/analytics";

// After successful stakeholders payment
if (
  responseData.status === "success" ||
  responseData.data.status === "successful"
) {
  trackPurchaseConversion({
    value: parseFloat(stakeHolderFeeUsd) || 1.0,
    currency: currencyCheck || "NGN",
    transactionId: paystackReference || transactionRef,
  });
  // Continue with stakeholders lookup
}
```

## Parameters

- **value** (number, default: 1.0): The monetary value of the transaction
- **currency** (string, default: 'USD'): The currency code (NGN, USD, etc.)
- **transactionId** (string, default: ''): The unique transaction reference
- **isNewCustomer** (boolean, optional): Set to true for new customers, false for returning, or leave undefined

## Testing

To verify the conversion tracking is working:

1. Open browser Developer Tools > Network tab
2. Complete a payment transaction
3. Look for a request to `google-analytics.com/g/collect` with `en=conversion` parameter
4. Check Google Ads console for conversion events (may take 24-48 hours to appear)

## Notes

- Conversions are tracked client-side using gtag.js
- The conversion ID `AW-17949220362/8vVvCL6dtfcbEIq87e5C` is specific to your Google Ads account
- Make sure to test in a staging environment before deploying to production
- Consider tracking different conversion values for different payment types if needed
