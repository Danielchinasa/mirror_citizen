import React from "react";

const sections = [
  {
    title: "1. Scope and Legal Framework",
    body: [
      "This Privacy Notice applies to Personal Data processed through e-citizen Nigeria, including e-citizen.ng, related mobile applications, dashboards, APIs, support channels, consent workflows, reports and communications operated by Biosec Solutions Limited.",
      "We process Personal Data in accordance with the Nigeria Data Protection Act 2023, applicable directives and guidance issued by the Nigeria Data Protection Commission, including the General Application and Implementation Directive 2025 where applicable, and other relevant Nigerian laws such as the Federal Competition and Consumer Protection Act 2018 and the Credit Reporting Act 2017.",
      "The Services currently offered include National Identification Number verification, phone-number verification, financial credit verification, business verification and vehicle identification number verification.",
    ],
  },
  {
    title: "2. Who We Are and Our Data Protection Roles",
    body: [
      "Biosec Solutions Limited (RC 901419) operates e-citizen and is generally the Data Controller for account administration, platform security, payments, customer support, service analytics, marketing and processing activities for which Biosec determines the purposes and means.",
      "A Source Institution remains responsible for the official or source record it maintains. Depending on the agreement and the Service, Biosec may act as an independent controller, a joint controller or a processor acting on the Source Institution's documented instructions.",
      "Our Data Protection Officer may be contacted at info@biosec.com.ng or at our Abuja office listed in the Contact and Complaints section.",
    ],
  },
  {
    title: "3. Who This Notice Applies To",
    list: [
      "Platform Users who register, pay, submit a request, receive a result, contact support or otherwise use e-citizen.",
      "Verification Subjects whose NIN, phone, financial credit, business-related or VIN information is requested, authenticated or returned through a Service.",
      "Business contacts and authorised users of organisations that use or integrate with the Platform.",
      "Website and app visitors whose device and usage information is processed when they interact with our digital services.",
      "Complainants and rights requesters who contact us about privacy, security, correction, access, complaints or disputes.",
    ],
  },
  {
    title: "4. Personal Data We Process",
    body: [
      "Depending on the Service, we may process account and contact data, authentication data, search and identity data, Verification Results, consent and authority records, payment and billing data, technical and usage data, security and fraud data, support communications, rights and compliance records, and marketing preferences.",
      "We do not intentionally collect more Personal Data than is reasonably necessary for the selected Service. The exact fields depend on the Service, Source Institution and applicable law.",
    ],
  },
  {
    title: "5. Where Personal Data Comes From",
    list: [
      "Directly from a Platform User during registration, payment, support or submission of a Verification Request.",
      "Directly from a Verification Subject through consent, authentication, correction or a rights request.",
      "From government agencies, statutory bodies, licensed credit bureaus, telecommunications data providers, vehicle-information providers, corporate registries and other authorised Source Institutions.",
      "From contracted verification and data-access providers, including Smile ID, Prembly IdentityPass and Mono.",
      "From social-login and identity providers where a User chooses that login method.",
      "From payment gateways, banks and mobile-payment providers.",
      "Automatically from devices, applications, cookies, logs, security tools and analytics systems.",
      "From an employer, client, agent, professional adviser, authorised representative, regulator, court or law-enforcement body where lawful.",
    ],
  },
  {
    title: "6. Why We Process Personal Data and Our Lawful Bases",
    body: [
      "We process Personal Data to create and manage accounts, provide requested verifications, obtain or record consent, provide credit-information Services, process payments and refunds, provide customer support, prevent fraud and abuse, comply with legal obligations, improve Platform reliability and user experience, send service communications and, where permitted, send marketing communications.",
      "Our lawful bases may include contract, consent, legal obligation, legitimate interests, and the establishment, exercise or defence of legal claims. Where we rely on legitimate interests, we consider the purpose, necessity, reasonable expectations and impact on the Data Subject.",
    ],
  },
  {
    title: "7. Sensitive and Higher-Risk Information",
    body: [
      "Some Services may involve government identifiers, biometric attributes returned by a Source Institution, financial or credit information, or other information that requires enhanced protection.",
    ],
    list: [
      "We do not use biometric or credit information for advertising.",
      "We do not build a general-purpose database of Verification Results for sale.",
      "Credit reports are made available only through authorised sources and subject to applicable consent and permissible-purpose requirements.",
      "Where processing is likely to create a high risk to individuals, we carry out or support a Data Protection Impact Assessment as required.",
      "Access is limited according to role, purpose and service configuration.",
    ],
  },
  {
    title: "8. Consent",
    body: [
      "Where we rely on consent, the request will identify the purpose and require a clear affirmative action. Consent must be freely given, specific, informed and unambiguous. Silence or inactivity is not consent.",
      "A Data Subject may refuse or withdraw consent at any time through the relevant Service flow or by contacting info@e-citizen.ng. Withdrawal does not affect processing already lawfully completed. Consent for one purpose does not automatically authorise a different purpose.",
    ],
  },
  {
    title: "9. Automated Decision-Making and User Decisions",
    body: [
      "e-citizen is designed to retrieve and present verification information. Biosec does not ordinarily make a solely automated decision that produces legal or similarly significant effects for a Verification Subject.",
      "A Source Institution may use automated matching to return a status, and the Platform may use automated security rules to flag or block suspicious activity. A User or Business User that makes a significant decision using a Verification Result is responsible for that decision and any applicable fairness, human review, correction and appeal requirements.",
    ],
  },
  {
    title: "10. Who We Share Personal Data With",
    body: [
      "We disclose Personal Data only where necessary for the stated purpose, where required by law or where another lawful basis applies.",
    ],
    list: [
      "The requesting User or authorised Business User.",
      "The Verification Subject.",
      "Source Institutions.",
      "Service providers under contract and confidentiality obligations.",
      "Payment providers involved in payment, reconciliation, refund and fraud prevention.",
      "Group companies and transaction successors where necessary and subject to safeguards.",
      "Regulators, courts and law enforcement where required by law or legal process.",
      "Professional advisers such as lawyers, auditors, insurers and consultants.",
    ],
    footer: "We do not sell or rent Personal Data. We do not permit a service provider to use Personal Data for its own unrelated marketing.",
  },
  {
    title: "11. International Transfers",
    body: [
      "Some service providers, cloud systems, support personnel or technical infrastructure may be located outside Nigeria or may permit access from another country.",
      "Before transferring Personal Data from Nigeria, we document an applicable transfer basis and assess the protection available in the destination and through the recipient's legal, contractual, technical and organisational safeguards.",
    ],
  },
  {
    title: "12. Retention and Deletion",
    body: [
      "We retain Personal Data only for as long as reasonably necessary for the purpose, applicable law, Source Institution requirements, security, audit, complaint handling and legal claims.",
      "NIMC-sourced verification data may be retained for up to 24 hours while awaiting consent and up to a further 24 hours after consent is granted. Vehicle verification data and credit bureau data may be retained for up to 7 days, subject to Source Institution requirements or service configuration.",
      "Search, consent and audit metadata, account data, payment and accounting records, security logs, support records, complaints, rights requests and marketing preferences are retained for periods reasonably required for their purposes and applicable legal obligations.",
      "Deletion from active systems may not immediately remove data from encrypted backups. Backup data is isolated, protected and overwritten according to the backup cycle, unless it must be restored for continuity or retained under a legal hold.",
    ],
  },
  {
    title: "13. Security",
    list: [
      "Encryption in transit and at rest where appropriate.",
      "Role-based access, authentication, logging and periodic access review.",
      "Segregation of duties and restricted access to sensitive results.",
      "Secure software development, vulnerability management and monitoring.",
      "Backup, recovery, incident response and business-continuity procedures.",
      "Vendor due diligence, contracts and confidentiality obligations.",
      "Staff privacy and security training.",
      "Periodic risk assessment, audit and testing.",
    ],
    footer: "No electronic system is completely secure. Users must also protect passwords, devices, downloaded results and organisational access. Please report suspected compromise to info@e-citizen.ng promptly.",
  },
  {
    title: "14. Personal Data Breaches",
    body: [
      "We maintain procedures to identify, contain, investigate and document a Personal Data breach. Where a breach is likely to result in a risk to the rights and freedoms of Data Subjects, we will notify the NDPC within the period required by the NDPA, generally within 72 hours after becoming aware, where feasible.",
      "Where the risk is high, we will also communicate with affected Data Subjects as required by law.",
    ],
  },
  {
    title: "15. Your Rights",
    list: [
      "Be informed about the processing of your Personal Data.",
      "Obtain confirmation whether we process your Personal Data and access a copy and related information.",
      "Request correction of inaccurate or incomplete Personal Data.",
      "Request deletion where legally available.",
      "Request restriction of processing in appropriate circumstances.",
      "Object to processing based on legitimate interests and object to direct marketing at any time.",
      "Withdraw consent without affecting prior lawful processing.",
      "Receive qualifying Personal Data in a structured, commonly used and machine-readable format and request transmission where technically feasible.",
      "Not be subject to a solely automated decision producing legal or similarly significant effects, subject to lawful exceptions.",
      "Complain to the NDPC and seek compensation or another legal remedy where available.",
    ],
  },
  {
    title: "16. How to Exercise Your Rights",
    body: [
      "Send a request to info@e-citizen.ng and state the right you wish to exercise, the relevant Account or transaction details, and enough information for us to locate the data. You may use an authorised representative, but we may request proof of authority.",
      "We aim to respond to a valid and complete request within 30 days, subject to any extension or exception permitted by applicable law. We ordinarily do not charge a fee, but a reasonable fee or refusal may apply where permitted by law.",
    ],
  },
  {
    title: "17. Children and Persons Lacking Legal Capacity",
    body: [
      "The Platform is not intended for Account holders under 18. A parent, legal guardian or other authorised adult should create and use the Account where a Service lawfully concerns a child or person who lacks legal capacity.",
      "Where consent is the lawful basis for processing a child's Personal Data, we obtain or require verifiable consent from the parent or legal guardian, unless an exception under applicable law applies.",
    ],
  },
  {
    title: "18. Cookies, Analytics and Similar Technologies",
    body: [
      "Our websites and applications may use cookies, software development kits, local storage, pixels and similar technologies for strictly necessary functions, preferences, analytics, advertising or campaign measurement.",
      "Where required, non-essential technologies are used only after consent through the cookie control. A user can change choices through the Platform or browser settings, although disabling necessary technologies may prevent some functions.",
    ],
  },
  {
    title: "19. Marketing Communications",
    body: [
      "We may send information about e-citizen or related Biosec services where you have consented or where another lawful basis permits. Marketing messages will identify the sender and provide an opt-out method.",
      "You may unsubscribe at any time without affecting operational messages, receipts, security notices or responses to your request. We do not use Verification Results or credit information for behavioural advertising.",
    ],
  },
  {
    title: "20. Third-Party Websites and Services",
    body: [
      "The Platform may link to or integrate with Source Institutions, social-login providers, payment providers and other third parties. An independent third party's processing is governed by its own privacy notice. This Notice does not cover a third party's separate website or processing that Biosec does not control.",
    ],
  },
  {
    title: "21. Changes to This Notice",
    body: [
      "We may update this Notice to reflect changes in law, regulatory guidance, Source Institution arrangements, technology or our processing. The latest version and effective date will be published on the Platform. Where a change is material, we will provide a prominent notice or direct communication where reasonably practicable.",
    ],
  },
  {
    title: "22. Contact and Complaints",
    body: [
      "Data Controller: Biosec Solutions Limited (RC 901419). Platform: e-citizen Nigeria.",
      "DPO / privacy requests: info@biosec.com.ng. Customer support and security incidents: info@e-citizen.ng.",
      "Abuja office: 8B Rumbek Close, off Sudan Street, Wuse Zone 6, Abuja, Nigeria.",
      "Websites: www.e-citizen.ng and www.biosec.com.ng.",
      "You also have the right to lodge a complaint with the Nigeria Data Protection Commission at No. 12 Dr Clement Isong Street, Abuja, Nigeria, info@ndpc.gov.ng, www.ndpc.gov.ng.",
    ],
  },
  {
    title: "23. Key Definitions",
    body: [
      "Consent means a freely given, specific, informed and unambiguous indication of a Data Subject's wishes through a statement or clear affirmative action.",
      "Data Controller means a person or organisation that, alone or jointly, determines the purposes and means of processing Personal Data. Data Processor means a person or organisation that processes Personal Data on behalf of a Data Controller.",
      "Data Subject means the identified or identifiable natural person to whom Personal Data relates. Personal Data means information relating to an identified or identifiable natural person. Processing means any operation performed on Personal Data, including collection, use, transmission, storage, access, alteration, disclosure and deletion.",
      "Source Institution means a government agency, licensed bureau, commercial data provider or other authorised source from which information is requested or received. Verification Result means the response, report, status, match, no-match, consent outcome or other information generated or returned for a Verification Request.",
    ],
  },
];

const PrivacyPolicyWeb = () => {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>e-citizen Nigeria</p>
        <h1 style={styles.title}>Privacy Notice</h1>
        <p style={styles.subtitle}>
          Version 2.1, effective 4 August 2026. This notice replaces Privacy
          Policy Version 1.1 for use after the effective date.
        </p>
      </section>

      <section style={styles.notice}>
        <strong>Publication notice:</strong> This web page presents the privacy
        notice content in an accessible page format. It does not use the PDF
        viewer.
      </section>

      <section style={styles.content}>
        {sections.map((section) => (
          <article key={section.title} style={styles.section}>
            <h2 style={styles.heading}>{section.title}</h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul style={styles.list}>
                {section.list.map((item) => (
                  <li key={item} style={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.footer && <p style={styles.paragraph}>{section.footer}</p>}
          </article>
        ))}
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
    color: "#DD0201",
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
  notice: {
    maxWidth: 980,
    margin: "0 auto 18px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "16px 18px",
    lineHeight: 1.65,
  },
  content: {
    maxWidth: 980,
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  section: {
    padding: "28px 30px",
    borderBottom: "1px solid #e5e7eb",
  },
  heading: {
    color: "#111827",
    fontSize: 22,
    lineHeight: 1.35,
    margin: "0 0 14px",
  },
  paragraph: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.8,
    margin: "0 0 12px",
  },
  list: {
    margin: "8px 0 14px",
    paddingLeft: 22,
  },
  listItem: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.75,
    marginBottom: 7,
  },
};

export default PrivacyPolicyWeb;
