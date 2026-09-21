import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "1. Send your request",
    body: "Email gh-info@e-citizen.africa from the email address linked to your e-citizen Ghana account and use the subject line Account deletion request.",
  },
  {
    title: "2. Include account details",
    body: "Include your full name, registered email address, phone number if available, and a short statement confirming that you want your e-citizen Ghana account deleted.",
  },
  {
    title: "3. Verify ownership",
    body: "We may ask for additional information to confirm that the request is coming from the account owner or an authorised representative.",
  },
  {
    title: "4. Confirmation and deletion",
    body: "After verification, we will process the request and confirm when the account has been deleted or explain if any data must be retained for legal, security, fraud-prevention, accounting, dispute-resolution, or regulatory reasons.",
  },
];

const retainedData = [
  "Transaction, billing, refund, and accounting records required by law.",
  "Security, fraud-prevention, audit, complaint, and dispute records.",
  "Verification records that must be retained temporarily under source-institution, legal, or operational requirements.",
  "Encrypted backup copies until they are overwritten through the normal backup cycle.",
];

const AccountDeletionPage = () => {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>e-citizen Ghana</p>
        <h1 style={styles.title}>Account Deletion Instructions</h1>
        <p style={styles.subtitle}>
          This page explains how to request deletion of your e-citizen Ghana account
          and what happens after your request is received.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.heading}>How To Delete Your Account</h2>
        <div style={styles.steps}>
          {steps.map((step) => (
            <article key={step.title} style={styles.step}>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.paragraph}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.heading}>Request Channel</h2>
        <p style={styles.paragraph}>
          Send account deletion requests to{" "}
          <a href="mailto:gh-info@e-citizen.africa" style={styles.link}>
            gh-info@e-citizen.africa
          </a>
          . Privacy requests may also be directed to{" "}
          <a href="mailto:info@biosec.com.ng" style={styles.link}>
            info@biosec.com.ng
          </a>
          .
        </p>
        <p style={styles.paragraph}>
          We aim to respond to valid and complete privacy requests within 30
          days, subject to any extension or exception permitted by applicable
          law.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.heading}>Data That May Be Retained</h2>
        <p style={styles.paragraph}>
          Deleting your account removes or deactivates account access, but some
          information may need to be retained where required or permitted by
          law.
        </p>
        <ul style={styles.list}>
          {retainedData.map((item) => (
            <li key={item} style={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.notice}>
        <p style={styles.paragraph}>
          For more information about your privacy rights, please review the{" "}
          <Link to="/privacy-policy-text" style={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
};

const styles = {
  page: {
    background: "#f8fafc",
    color: "#1f2937",
    minHeight: "100vh",
    padding: "56px 20px 72px",
  },
  hero: {
    maxWidth: 980,
    margin: "0 auto 24px",
  },
  eyebrow: {
    color: "#FBCB19",
    fontWeight: 700,
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#111827",
    fontSize: 42,
    lineHeight: 1.15,
    margin: "0 0 14px",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: 17,
    lineHeight: 1.7,
    maxWidth: 780,
    margin: 0,
  },
  panel: {
    maxWidth: 980,
    margin: "0 auto 18px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "26px 30px",
    lineHeight: 1.65,
  },
  notice: {
    maxWidth: 980,
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "18px 22px",
  },
  heading: {
    color: "#111827",
    fontSize: 24,
    lineHeight: 1.35,
    margin: "0 0 16px",
  },
  steps: {
    display: "grid",
    gap: 16,
  },
  step: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 16,
  },
  stepTitle: {
    color: "#111827",
    fontSize: 18,
    lineHeight: 1.4,
    margin: "0 0 8px",
  },
  paragraph: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.8,
    margin: "0 0 12px",
  },
  list: {
    margin: "8px 0 0",
    paddingLeft: 22,
  },
  listItem: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.75,
    marginBottom: 7,
  },
  link: {
    color: "#FBCB19",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default AccountDeletionPage;
