import React, { useEffect, useState } from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse, Typography } from "antd";
import { theme } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const enContent = {
  pageTitle: "Kenya Frequently Asked Questions",
  sections: {
    general: "GENERAL FAQS",
    matrix: "SERVICE AVAILABILITY MATRIX",
    country: "COUNTRY SERVICE FAQS",
    payments: "PAYMENTS, RESULTS AND SUPPORT",
  },
  generalItems: [
    [
      "Does e-raia.com comply with privacy standards?",
      "Yes. e-raia.com is designed as a consent-driven platform. For this market, the service should be operated in line with applicable local data protection rules, e-raia.com privacy policies, and GDPR where it applies to cross-border or diaspora users.",
    ],
    [
      "What data requires consent?",
      "Personal data requires consent or another lawful basis before it is displayed to a third party. This includes data that can identify a person directly or indirectly, such as names, identification numbers, phone numbers, dates of birth, addresses, photographs, or similar identity information.",
    ],
    [
      "What data may be accessible without consent?",
      "Public records, non-personal vehicle history data, and information accessed by a public authority with the required lawful basis may not require the same customer consent flow. e-raia.com should still apply access controls, audit logging, and responsible-use checks.",
    ],
    [
      "How does consent work?",
      "For services that return personal data, the data subject is asked to authorise the check before the result is released. Depending on the source, consent may be collected through the portal, SMS, email, OTP, WhatsApp, or another approved channel. If consent is not completed, personal data should not be displayed.",
    ],
    [
      "Why do I need to pay before verifying?",
      "e-raia.com is a premium verification service. Fees cover secure integrations, data provider charges, payment processing, infrastructure, monitoring, and customer support. The applicable local or diaspora price is shown before payment.",
    ],
    [
      "Why do I need to register before verifying?",
      "Registration helps protect the platform, lets you track your transactions, and gives you access to your payment history and eligible verification results.",
    ],
    [
      "Is my verification result saved on e-Citizen?",
      "Verification results may be temporarily stored in your account so you can view your search history. Results should be deleted or anonymised after the applicable retention period stated in the privacy policy.",
    ],
    [
      "What do I do if my information is not correct?",
      "e-raia.com aggregates and displays data from authorised data sources. If the information is incorrect, you should contact the relevant custodian agency or issuing authority to correct the source record.",
    ],
    [
      "I did not receive a verification email, SMS, OTP or WhatsApp message. What should I do?",
      "Check your spam or junk folder and confirm that the phone number or email address supplied is correct. If the message still does not arrive, contact support with your payment reference, service name, and the phone number or email used.",
    ],
    [
      "I paid but did not receive a result. What should I do?",
      "Contact support with the payment reference, amount paid, service selected, country, and the email or phone number used. The support team can trace the payment and confirm whether the verification request was completed, pending, failed, or requires a refund/retry.",
    ],
  ],
  matrixItems: [
    [
      "Kenya National ID",
      "Information normally required: ID/card number; supporting details where required. Consent position: Required where personal data is returned. Typical result: Identity status and permitted identity fields.",
    ],
    [
      "Alien Card",
      "Information normally required: ID/card number; supporting details where required. Consent position: Required where personal data is returned. Typical result: Identity status and permitted identity fields.",
    ],
    [
      "Driver's Licence",
      "Information normally required: Licence number; supporting details where required. Consent position: Required where personal data is returned. Typical result: Licence status and permitted licence fields.",
    ],
    [
      "Phone Number",
      "Information normally required: Phone number; OTP/consent where required. Consent position: Required where personal data is returned. Typical result: Subscriber or identity match indicators.",
    ],
    [
      "VIN Vehicle History",
      "Information normally required: 17-character VIN. Consent position: Usually not required for non-personal/public vehicle history data. Typical result: Vehicle history fields available from VIN sources.",
    ],
  ],
  countryItems: [
    {
      title: "Kenya National ID Verification",
      qa: [
        [
          "What is Kenya National ID verification?",
          "Kenya National ID verification helps confirm that an identity number or card details match the record held by the relevant national identity data source, where the source is available through e-raia.com.",
        ],
        [
          "What information do I need for Kenya National ID verification?",
          "You will normally need the identity number or card number. Depending on the data provider, you may also be asked for supporting details such as name, date of birth, phone number, or consent information.",
        ],
        [
          "What information can the result provide?",
          "The result may confirm identity status and return available details such as names, gender, date of birth, photograph or match indicators, and other fields permitted by the data source. The exact fields depend on the provider and regulatory restrictions.",
        ],
        [
          "Is consent required?",
          "Yes. Where personal identity information is returned, consent or another lawful basis is required before the result is displayed to a third party.",
        ],
      ],
    },
    {
      title: "Alien Card Verification",
      qa: [
        [
          "What is Alien Card verification?",
          "Alien Card verification helps confirm the identity or immigration/residency record of a foreign resident, where the relevant data source is available through e-raia.com.",
        ],
        [
          "What information do I need?",
          "You will normally need the card number or resident/alien identification number. Some sources may also request name, date of birth, nationality, or consent information.",
        ],
        [
          "What does the result show?",
          "The result may show whether the record is valid and may return permitted identity or residency details. Available fields depend on the issuing authority and data provider.",
        ],
        [
          "Is consent required?",
          "Yes. Consent or another lawful basis is required where personal information is returned.",
        ],
      ],
    },
    {
      title: "Driver's Licence Verification",
      qa: [
        [
          "What is driver's licence verification?",
          "This service helps confirm whether a driver's licence record exists and whether the licence details match the data available from the relevant licensing source.",
        ],
        [
          "What information do I need?",
          "You will normally need the licence number. Depending on the data source, additional details such as name, date of birth, or consent information may be required.",
        ],
        [
          "What information can the result provide?",
          "The result may confirm licence status and return permitted details such as names, licence class/category, issue/expiry dates, or match indicators, depending on the source.",
        ],
        [
          "Is consent required?",
          "Yes, where the check returns personal identity information.",
        ],
      ],
    },
    {
      title: "Phone Number Verification",
      qa: [
        [
          "What is phone number verification?",
          "Phone number verification helps confirm identity information linked to a mobile number where the relevant telecommunications or identity data source is available.",
        ],
        [
          "What information do I need?",
          "You will normally need the mobile phone number. The data source may require OTP, SMS, WhatsApp, email, or another consent step before personal data is released.",
        ],
        [
          "What information can the result provide?",
          "The result may confirm whether the number has a matching record and may return permitted identity or match information. The exact fields depend on the data provider and consent flow.",
        ],
        [
          "Is consent required?",
          "Yes, where subscriber or identity information is returned.",
        ],
      ],
    },
    {
      title: "VIN Vehicle History Report",
      qa: [
        [
          "What is a VIN vehicle history report?",
          "A VIN vehicle history report uses a Vehicle Identification Number to retrieve available history about a vehicle. It can be useful before buying a used or imported vehicle.",
        ],
        [
          "What information do I need?",
          "You need the 17-character VIN. The VIN is usually found on the dashboard, door frame, registration documents, or vehicle purchase documents.",
        ],
        [
          "What information can a VIN check provide?",
          "A VIN report may include accident history, title or salvage records, mileage/odometer information, recalls, ownership history, auction/sales records, service records, and theft or recovery indicators where available.",
        ],
        [
          "Is a VIN check reliable?",
          "A VIN check is useful, but it may not contain every event in a vehicle's history. Some records may be missing, delayed, or unavailable from the source databases.",
        ],
      ],
    },
  ],
  paymentsItems: [
    [
      "How are prices and payment options shown?",
      "Payment gateways and currencies may vary by market. The available options are shown at checkout.",
    ],
    [
      "Can a result be blank or unavailable?",
      "Service availability depends on live data-source connectivity and provider uptime. Where a source is unavailable, e-raia.com may return a pending, failed, or unavailable status rather than a result.",
    ],
    ["How do I contact support?", "Support: info@e-raia.com"],
  ],
};

const swContent = {
  pageTitle: "Kenya - Maswali Yanayoulizwa Mara kwa Mara",
  sections: {
    general: "MASWALI YA JUMLA",
    matrix: "JEDWALI LA HUDUMA ZINAZOPATIKANA",
    country: "MASWALI YA HUDUMA ZA NCHI",
    payments: "MALIPO, MATOKEO NA USAIDIZI",
  },
  generalItems: [
    [
      "Je, e-raia.com inazingatia viwango vya faragha?",
      "Ndiyo. e-raia.com imeundwa kama jukwaa linalotegemea idhini. Katika soko hili, huduma inapaswa kuendeshwa kwa kuzingatia sheria za ndani za ulinzi wa data, sera za faragha za Biosec/e-raia.com, na GDPR pale inapohusika kwa watumiaji wa nje ya nchi au diaspora.",
    ],
    [
      "Ni data gani inahitaji idhini?",
      "Taarifa binafsi zinahitaji idhini au msingi mwingine wa kisheria kabla hazijaonyeshwa kwa mtu wa tatu. Hii inajumuisha taarifa zinazoweza kumtambulisha mtu moja kwa moja au kwa njia isiyo ya moja kwa moja, kama jina, nambari ya utambulisho, nambari ya simu, tarehe ya kuzaliwa, anwani, picha au taarifa zinazofanana.",
    ],
    [
      "Ni taarifa gani zinaweza kupatikana bila idhini?",
      "Taarifa zilizo wazi kwa umma, historia ya gari isiyo na taarifa binafsi, au taarifa zinazopatikana na mamlaka ya umma yenye msingi sahihi wa kisheria zinaweza zisihitaji mchakato ule ule wa idhini ya mteja. Hata hivyo e-raia.com inapaswa kutumia udhibiti wa ufikiaji, rekodi za ukaguzi na udhibiti wa matumizi sahihi.",
    ],
    [
      "Idhini hufanyaje kazi?",
      "Kwa huduma zinazorejesha taarifa binafsi, mhusika wa data huombwa kuruhusu ukaguzi kabla ya matokeo kutolewa. Kulingana na chanzo, idhini inaweza kukusanywa kupitia tovuti, SMS, barua pepe, OTP, WhatsApp au njia nyingine iliyoidhinishwa. Ikiwa idhini haijakamilika, taarifa binafsi hazipaswi kuonyeshwa.",
    ],
    [
      "Kwa nini ninapaswa kulipa kabla ya uthibitishaji?",
      "e-raia.com ni huduma ya uthibitishaji ya kiwango cha juu. Ada hulipia miunganisho salama, gharama za watoa data, uchakataji wa malipo, miundombinu, ufuatiliaji na huduma kwa wateja. Bei ya ndani au ya diaspora huonyeshwa kabla ya malipo.",
    ],
    [
      "Kwa nini ninapaswa kujisajili kabla ya kuthibitisha?",
      "Usajili husaidia kulinda jukwaa, hukuwezesha kufuatilia miamala yako, na hukupa ufikiaji wa historia yako ya malipo na matokeo yanayostahili kuonekana.",
    ],
    [
      "Je, matokeo yangu yanahifadhiwa kwenye e-raia.com?",
      "Matokeo ya uthibitishaji yanaweza kuhifadhiwa kwa muda kwenye akaunti yako ili uweze kuona historia ya utafutaji. Matokeo yanapaswa kufutwa au kufanywa yasimtambulishe mtu baada ya kipindi cha kuhifadhi kilicho kwenye sera ya faragha.",
    ],
    [
      "Nifanye nini ikiwa taarifa zangu si sahihi?",
      "e-raia.com hukusanya na kuonyesha data kutoka vyanzo vilivyoidhinishwa. Ikiwa taarifa si sahihi, unapaswa kuwasiliana na taasisi inayomiliki data au mamlaka iliyotoa hati ili kurekebisha rekodi ya chanzo.",
    ],
    [
      "Sijapokea barua pepe, SMS, OTP au ujumbe wa WhatsApp wa uthibitishaji. Nifanye nini?",
      "Angalia folda ya spam/junk na hakikisha nambari ya simu au barua pepe uliyoingiza ni sahihi. Ikiwa ujumbe haujafika, wasiliana na support ukiambatanisha kumbukumbu ya malipo, jina la huduma, na simu au barua pepe iliyotumika.",
    ],
    [
      "Nimelipa lakini sijapokea matokeo. Nifanye nini?",
      "Wasiliana na support ukiambatanisha kumbukumbu ya malipo, kiasi kilicholipwa, huduma iliyochaguliwa, nchi, na barua pepe au nambari ya simu iliyotumika. Timu ya support inaweza kufuatilia malipo na kuthibitisha kama ombi limekamilika, linasubiri, limeshindwa, au linahitaji kurejeshewa pesa/kujaribiwa tena.",
    ],
  ],
  matrixItems: [
    [
      "Kitambulisho cha Taifa cha Kenya",
      "Taarifa zinazohitajika kwa kawaida: Nambari ya ID/kadi; taarifa za ziada zikihitajika. Msimamo kuhusu idhini: Inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: Hali ya utambulisho na taarifa zinazoruhusiwa.",
    ],
    [
      "Alien Card / Kadi ya Mgeni",
      "Taarifa zinazohitajika kwa kawaida: Nambari ya ID/kadi; taarifa za ziada zikihitajika. Msimamo kuhusu idhini: Inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: Hali ya utambulisho na taarifa zinazoruhusiwa.",
    ],
    [
      "Leseni ya Udereva",
      "Taarifa zinazohitajika kwa kawaida: Nambari ya leseni; taarifa za ziada zikihitajika. Msimamo kuhusu idhini: Inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: Hali ya leseni na taarifa zinazoruhusiwa.",
    ],
    [
      "Nambari ya Simu",
      "Taarifa zinazohitajika kwa kawaida: Nambari ya simu; OTP/idhini ikihitajika. Msimamo kuhusu idhini: Inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: Viashiria vya mteja au ulinganisho wa utambulisho.",
    ],
    [
      "Historia ya Gari kwa VIN",
      "Taarifa zinazohitajika kwa kawaida: VIN yenye herufi/nambari 17. Msimamo kuhusu idhini: Kwa kawaida haihitajiki kwa taarifa zisizo binafsi au historia ya gari iliyo wazi. Matokeo ya kawaida: Historia ya gari inayopatikana kutoka vyanzo vya VIN.",
    ],
  ],
  countryItems: [
    {
      title: "Uthibitishaji wa Kitambulisho cha Taifa cha Kenya",
      qa: [
        [
          "Uthibitishaji wa Kitambulisho cha Taifa cha Kenya ni nini?",
          "Uthibitishaji wa Kitambulisho cha Taifa cha Kenya husaidia kuthibitisha kuwa nambari ya utambulisho au taarifa za kadi zinalingana na rekodi iliyopo kwenye chanzo husika cha utambulisho, pale chanzo hicho kinapopatikana kupitia e-raia.com.",
        ],
        [
          "Ni taarifa gani zinahitajika?",
          "Kwa kawaida utahitaji nambari ya utambulisho au nambari ya kadi. Kulingana na mtoa data, unaweza pia kuombwa jina, tarehe ya kuzaliwa, nambari ya simu au taarifa za idhini.",
        ],
        [
          "Matokeo yanaweza kuonyesha nini?",
          "Matokeo yanaweza kuthibitisha hali ya utambulisho na kuonyesha taarifa zinazoruhusiwa kama majina, jinsia, tarehe ya kuzaliwa, picha au viashiria vya ulinganisho. Sehemu kamili hutegemea mtoa data na masharti ya udhibiti.",
        ],
        [
          "Je, idhini inahitajika?",
          "Ndiyo. Pale taarifa binafsi za utambulisho zinaporudishwa, idhini au msingi mwingine wa kisheria unahitajika kabla matokeo kuonyeshwa kwa mtu wa tatu.",
        ],
      ],
    },
    {
      title: "Uthibitishaji wa Alien Card / Kadi ya Mgeni",
      qa: [
        [
          "Uthibitishaji wa Alien Card / Kadi ya Mgeni ni nini?",
          "Uthibitishaji wa Alien Card / Kadi ya Mgeni husaidia kuthibitisha utambulisho au rekodi ya ukaazi/uhamiaji ya mkazi wa kigeni, pale chanzo husika kinapopatikana kupitia e-raia.com.",
        ],
        [
          "Ni taarifa gani zinahitajika?",
          "Kwa kawaida utahitaji nambari ya kadi au nambari ya utambulisho wa mkazi/mgeni. Baadhi ya vyanzo vinaweza pia kuhitaji jina, tarehe ya kuzaliwa, uraia au taarifa za idhini.",
        ],
        [
          "Matokeo yanaonyesha nini?",
          "Matokeo yanaweza kuonyesha kama rekodi ni halali na yanaweza kuonyesha taarifa za utambulisho au ukaazi zinazoruhusiwa. Sehemu zinazopatikana hutegemea mamlaka iliyotoa hati na mtoa data.",
        ],
        [
          "Je, idhini inahitajika?",
          "Ndiyo. Idhini au msingi mwingine wa kisheria unahitajika pale taarifa binafsi zinaporudishwa.",
        ],
      ],
    },
    {
      title: "Uthibitishaji wa Leseni ya Udereva",
      qa: [
        [
          "Uthibitishaji wa leseni ya udereva ni nini?",
          "Huduma hii husaidia kuthibitisha kama rekodi ya leseni ipo na kama taarifa za leseni zinalingana na data inayopatikana kutoka chanzo husika cha utoaji leseni.",
        ],
        [
          "Ni taarifa gani zinahitajika?",
          "Kwa kawaida utahitaji nambari ya leseni. Kulingana na chanzo, taarifa za ziada kama jina, tarehe ya kuzaliwa au idhini zinaweza kuhitajika.",
        ],
        [
          "Matokeo yanaweza kuonyesha nini?",
          "Matokeo yanaweza kuthibitisha hali ya leseni na kuonyesha taarifa zinazoruhusiwa kama majina, daraja/kategoria ya leseni, tarehe ya kutolewa/kuisha au viashiria vya ulinganisho.",
        ],
        [
          "Je, idhini inahitajika?",
          "Ndiyo, pale ukaguzi unaporudisha taarifa binafsi za utambulisho.",
        ],
      ],
    },
    {
      title: "Uthibitishaji wa Nambari ya Simu",
      qa: [
        [
          "Uthibitishaji wa nambari ya simu ni nini?",
          "Uthibitishaji wa simu husaidia kuthibitisha taarifa za utambulisho zilizounganishwa na nambari ya simu pale chanzo husika cha mawasiliano au utambulisho kinapopatikana.",
        ],
        [
          "Ni taarifa gani zinahitajika?",
          "Kwa kawaida utahitaji nambari ya simu. Chanzo cha data kinaweza kuhitaji OTP, SMS, WhatsApp, barua pepe au hatua nyingine ya idhini kabla ya taarifa binafsi kutolewa.",
        ],
        [
          "Matokeo yanaweza kuonyesha nini?",
          "Matokeo yanaweza kuthibitisha kama nambari ina rekodi inayolingana na kuonyesha taarifa za utambulisho au ulinganisho zinazoruhusiwa.",
        ],
        [
          "Je, idhini inahitajika?",
          "Ndiyo, pale taarifa za mteja wa simu au utambulisho zinaporudishwa.",
        ],
      ],
    },
    {
      title: "Ripoti ya Historia ya Gari kwa VIN",
      qa: [
        [
          "Ripoti ya historia ya gari kwa VIN ni nini?",
          "Ripoti ya VIN hutumia nambari ya utambulisho wa gari kupata historia inayopatikana kuhusu gari. Hii ni muhimu kabla ya kununua gari lililotumika au lililoingizwa kutoka nje.",
        ],
        [
          "Ni taarifa gani zinahitajika?",
          "Unahitaji VIN yenye herufi/nambari 17. Kwa kawaida VIN hupatikana kwenye dashboard, fremu ya mlango, hati za usajili au nyaraka za ununuzi wa gari.",
        ],
        [
          "Ukaguzi wa VIN unaweza kuonyesha nini?",
          "Ripoti ya VIN inaweza kuonyesha historia ya ajali, rekodi za title/salvage, mileage/odometer, recalls, historia ya wamiliki, rekodi za mauzo/minada, huduma na viashiria vya wizi au kupatikana pale zinapopatikana.",
        ],
        [
          "Je, ukaguzi wa VIN unaaminika?",
          "Ukaguzi wa VIN ni muhimu, lakini huenda usiwe na kila tukio kwenye historia ya gari. Baadhi ya rekodi zinaweza kukosekana, kuchelewa au kutopatikana kwenye vyanzo vya data.",
        ],
      ],
    },
  ],
  paymentsItems: [
    [
      "Bei na njia za malipo zinaonyeshwaje?",
      "Njia za malipo na sarafu zinaweza kutofautiana kulingana na soko. Chaguo zinazopatikana huonyeshwa wakati wa malipo.",
    ],
    [
      "Je, matokeo yanaweza kuwa tupu au kutopatikana?",
      "Upatikanaji wa huduma hutegemea muunganisho wa moja kwa moja na vyanzo vya data na upatikanaji wa watoa huduma. Ikiwa chanzo hakipatikani, e-raia.com inaweza kuonyesha hali ya kusubiri, kushindwa au kutopatikana badala ya matokeo.",
    ],
    ["Ninawezaje kuwasiliana na support?", "Usaidizi: info@e-raia.com"],
  ],
};

const mapSimple = (items) => (
  <Collapse accordion>
    {items.map(([title, content], i) => (
      <Panel key={String(i + 1)} header={title}>
        <p>{content}</p>
      </Panel>
    ))}
  </Collapse>
);

const currentLang = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const KenyaFaqPage = () => {
  const [language, setLanguage] = useState(currentLang);

  useEffect(() => {
    const onLang = () => setLanguage(currentLang());
    window.addEventListener("siteLanguageChanged", onLang);
    window.addEventListener("storage", onLang);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLang);
      window.removeEventListener("storage", onLang);
    };
  }, []);

  const c = language === "SW" ? swContent : enContent;
  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  const items = [
    { key: "1", title: c.sections.general, content: mapSimple(c.generalItems) },
    { key: "2", title: c.sections.matrix, content: mapSimple(c.matrixItems) },
    {
      key: "3",
      title: c.sections.country,
      content: (
        <Collapse accordion>
          {c.countryItems.map((group, i) => (
            <Panel key={String(i + 1)} header={group.title}>
              {mapSimple(group.qa)}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "4",
      title: c.sections.payments,
      content: mapSimple(c.paymentsItems),
    },
  ];

  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container $token={token}>
        <InfoSec>
          <Card
            style={{
              width: "100%",
              background: bgContainer,
              borderColor: text,
            }}
          >
            <Title level={4} style={{ color: text }}>
              {c.pageTitle}
            </Title>
          </Card>

          <DynamicCollapse
            $token={token}
            size="large"
            accordion
            defaultActiveKey={["1"]}
            style={{ marginTop: "30px" }}
          >
            {items.map((item) => (
              <Panel key={item.key} header={item.title}>
                {item.content}
              </Panel>
            ))}
          </DynamicCollapse>
        </InfoSec>
      </Container>
    </div>
  );
};

export default KenyaFaqPage;
