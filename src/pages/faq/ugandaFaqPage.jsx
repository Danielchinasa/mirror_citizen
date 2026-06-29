import React from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse, Typography } from "antd";
import { theme } from "antd";
import { useLocale } from "../../components/LocaleProvider";

const { Title } = Typography;
const { Panel } = Collapse;

const enContent = {
  pageTitle: "Frequently Asked Questions",
  sections: {
    general: "GENERAL FAQS",
    matrix: "SERVICE AVAILABILITY MATRIX",
    country: "COUNTRY SERVICE FAQS",
    payments: "PAYMENTS, RESULTS AND SUPPORT",
  },
  generalItems: [
    {
      key: "1",
      title: "Does e-raia.com comply with privacy standards?",
      content:
        "Yes. e-raia.com is designed as a consent-driven platform. For this market, the service should be operated in line with applicable local data protection rules, e-raia.com privacy policies, and GDPR where it applies to cross-border or diaspora users.",
    },
    {
      key: "2",
      title: "What data requires consent?",
      content:
        "Personal data requires consent or another lawful basis before it is displayed to a third party. This includes data that can identify a person directly or indirectly, such as names, identification numbers, phone numbers, dates of birth, addresses, photographs, or similar identity information.",
    },
    {
      key: "3",
      title: "What data may be accessible without consent?",
      content:
        "Public records, non-personal vehicle history data, and information accessed by a public authority with the required lawful basis may not require the same customer consent flow. e-raia.com should still apply access controls, audit logging, and responsible-use checks.",
    },
    {
      key: "4",
      title: "How does consent work?",
      content:
        "For services that return personal data, the data subject is asked to authorise the check before the result is released. Depending on the source, consent may be collected through the portal, SMS, email, OTP, WhatsApp, or another approved channel. If consent is not completed, personal data should not be displayed.",
    },
    {
      key: "5",
      title: "Why do I need to pay before verifying?",
      content:
        "e-raia.com is a premium verification service. Fees cover secure integrations, data provider charges, payment processing, infrastructure, monitoring, and customer support. The applicable local or diaspora price is shown before payment.",
    },
    {
      key: "6",
      title: "Why do I need to register before verifying?",
      content:
        "Registration helps protect the platform, lets you track your transactions, and gives you access to your payment history and eligible verification results.",
    },
    {
      key: "7",
      title: "Is my verification result saved on e-raia.com?",
      content:
        "Verification results may be temporarily stored in your account so you can view your search history. Results should be deleted or anonymised after the applicable retention period stated in the privacy policy.",
    },
    {
      key: "8",
      title: "What do I do if my information is not correct?",
      content:
        "e-raia.com aggregates and displays data from authorised data sources. If the information is incorrect, you should contact the relevant custodian agency or issuing authority to correct the source record.",
    },
    {
      key: "9",
      title:
        "I did not receive a verification email, SMS, OTP or WhatsApp message. What should I do?",
      content:
        "Check your spam or junk folder and confirm that the phone number or email address supplied is correct. If the message still does not arrive, contact support with your payment reference, service name, and the phone number or email used.",
    },
    {
      key: "10",
      title: "I paid but did not receive a result. What should I do?",
      content:
        "Contact support with the payment reference, amount paid, service selected, country, and the email or phone number used. The support team can trace the payment and confirm whether the verification request was completed, pending, failed, or requires a refund/retry.",
    },
  ],
  matrixRows: [
    "Uganda National ID: ID/card number; supporting details where required. Consent required where personal data is returned. Typical result: identity status and permitted identity fields.",
    "Phone Number: Phone number; OTP/consent where required. Consent required where personal data is returned. Typical result: subscriber or identity match indicators.",
    "VIN Vehicle History: 17-character VIN. Consent usually not required for non-personal/public vehicle history data. Typical result: vehicle history fields available from VIN sources.",
    "Service availability depends on live data-source connectivity and provider uptime. Where a source is unavailable, e-raia.com may return a pending, failed, or unavailable status rather than a result.",
  ],
  countryGroups: [
    {
      key: "1",
      title: "Uganda National ID Verification",
      items: [
        {
          key: "1",
          title: "What is Uganda National ID verification?",
          content:
            "Uganda National ID verification helps confirm that an identity number or card details match the record held by the relevant national identity data source, where the source is available through e-raia.com.",
        },
        {
          key: "2",
          title:
            "What information do I need for Uganda National ID verification?",
          content:
            "You will normally need the identity number or card number. Depending on the data provider, you may also be asked for supporting details such as name, date of birth, phone number, or consent information.",
        },
        {
          key: "3",
          title: "What information can the result provide?",
          content:
            "The result may confirm identity status and return available details such as names, gender, date of birth, photograph or match indicators, and other fields permitted by the data source. The exact fields depend on the provider and regulatory restrictions.",
        },
        {
          key: "4",
          title: "Is consent required?",
          content:
            "Yes. Where personal identity information is returned, consent or another lawful basis is required before the result is displayed to a third party.",
        },
      ],
    },
    {
      key: "2",
      title: "Phone Number Verification",
      items: [
        {
          key: "1",
          title: "What is phone number verification?",
          content:
            "Phone number verification helps confirm identity information linked to a mobile number where the relevant telecommunications or identity data source is available.",
        },
        {
          key: "2",
          title: "What information do I need?",
          content:
            "You will normally need the mobile phone number. The data source may require OTP, SMS, WhatsApp, email, or another consent step before personal data is released.",
        },
        {
          key: "3",
          title: "What information can the result provide?",
          content:
            "The result may confirm whether the number has a matching record and may return permitted identity or match information. The exact fields depend on the data provider and consent flow.",
        },
        {
          key: "4",
          title: "Is consent required?",
          content: "Yes, where subscriber or identity information is returned.",
        },
      ],
    },
    {
      key: "3",
      title: "VIN Vehicle History Report",
      items: [
        {
          key: "1",
          title: "What is a VIN vehicle history report?",
          content:
            "A VIN vehicle history report uses a Vehicle Identification Number to retrieve available history about a vehicle. It can be useful before buying a used or imported vehicle.",
        },
        {
          key: "2",
          title: "What information do I need?",
          content:
            "You need the 17-character VIN. The VIN is usually found on the dashboard, door frame, registration documents, or vehicle purchase documents.",
        },
        {
          key: "3",
          title: "What information can a VIN check provide?",
          content:
            "A VIN report may include accident history, title or salvage records, mileage/odometer information, recalls, ownership history, auction/sales records, service records, and theft or recovery indicators where available.",
        },
        {
          key: "4",
          title: "Is a VIN check reliable?",
          content:
            "A VIN check is useful, but it may not contain every event in a vehicle's history. Some records may be missing, delayed, or unavailable from the source databases.",
        },
      ],
    },
  ],
  paymentsItems: [
    {
      key: "1",
      title: "How are prices and payment options shown?",
      content:
        "Payment gateways and currencies may vary by market. The available options are shown at checkout.",
    },
    {
      key: "2",
      title: "Can a result be blank or unavailable?",
      content:
        "Service availability depends on live data-source connectivity and provider uptime. Where a source is unavailable, e-raia.com may return a pending, failed, or unavailable status rather than a result.",
    },
    {
      key: "3",
      title: "How do I contact support?",
      content: "Support: info@e-raia.com",
    },
  ],
};

const swContent = {
  pageTitle: "Uganda - Maswali Yanayoulizwa Mara kwa Mara",
  sections: {
    general: "MASWALI YA JUMLA",
    matrix: "JEDWALI LA HUDUMA ZINAZOPATIKANA",
    country: "MASWALI YA HUDUMA ZA NCHI",
    payments: "MALIPO, MATOKEO NA USAIDIZI",
  },
  generalItems: [
    {
      key: "1",
      title: "Je, e-raia.com inazingatia viwango vya faragha?",
      content:
        "Ndiyo. e-raia.com imeundwa kama jukwaa linalotegemea idhini. Katika soko hili, huduma inapaswa kuendeshwa kwa kuzingatia sheria za ndani za ulinzi wa data, sera za faragha za Biosec/e-raia.com, na GDPR pale inapohusika kwa watumiaji wa nje ya nchi au diaspora.",
    },
    {
      key: "2",
      title: "Ni data gani inahitaji idhini?",
      content:
        "Taarifa binafsi zinahitaji idhini au msingi mwingine wa kisheria kabla hazijaonyeshwa kwa mtu wa tatu. Hii inajumuisha taarifa zinazoweza kumtambulisha mtu moja kwa moja au kwa njia isiyo ya moja kwa moja, kama jina, nambari ya utambulisho, nambari ya simu, tarehe ya kuzaliwa, anwani, picha au taarifa zinazofanana.",
    },
    {
      key: "3",
      title: "Ni taarifa gani zinaweza kupatikana bila idhini?",
      content:
        "Taarifa zilizo wazi kwa umma, historia ya gari isiyo na taarifa binafsi, au taarifa zinazopatikana na mamlaka ya umma yenye msingi sahihi wa kisheria zinaweza zisihitaji mchakato ule ule wa idhini ya mteja. Hata hivyo e-raia.com inapaswa kutumia udhibiti wa ufikiaji, rekodi za ukaguzi na udhibiti wa matumizi sahihi.",
    },
    {
      key: "4",
      title: "Idhini hufanyaje kazi?",
      content:
        "Kwa huduma zinazorejesha taarifa binafsi, mhusika wa data huombwa kuruhusu ukaguzi kabla ya matokeo kutolewa. Kulingana na chanzo, idhini inaweza kukusanywa kupitia tovuti, SMS, barua pepe, OTP, WhatsApp au njia nyingine iliyoidhinishwa. Ikiwa idhini haijakamilika, taarifa binafsi hazipaswi kuonyeshwa.",
    },
    {
      key: "5",
      title: "Kwa nini ninapaswa kulipa kabla ya uthibitishaji?",
      content:
        "e-raia.com ni huduma ya uthibitishaji ya kiwango cha juu. Ada hulipia miunganisho salama, gharama za watoa data, uchakataji wa malipo, miundombinu, ufuatiliaji na huduma kwa wateja. Bei ya ndani au ya diaspora huonyeshwa kabla ya malipo.",
    },
    {
      key: "6",
      title: "Kwa nini ninapaswa kujisajili kabla ya kuthibitisha?",
      content:
        "Usajili husaidia kulinda jukwaa, hukuwezesha kufuatilia miamala yako, na hukupa ufikiaji wa historia yako ya malipo na matokeo yanayostahili kuonekana.",
    },
    {
      key: "7",
      title: "Je, matokeo yangu yanahifadhiwa kwenye e-raia.com?",
      content:
        "Matokeo ya uthibitishaji yanaweza kuhifadhiwa kwa muda kwenye akaunti yako ili uweze kuona historia ya utafutaji. Matokeo yanapaswa kufutwa au kufanywa yasimtambulishe mtu baada ya kipindi cha kuhifadhi kilicho kwenye sera ya faragha.",
    },
    {
      key: "8",
      title: "Nifanye nini ikiwa taarifa zangu si sahihi?",
      content:
        "e-raia.com hukusanya na kuonyesha data kutoka vyanzo vilivyoidhinishwa. Ikiwa taarifa si sahihi, unapaswa kuwasiliana na taasisi inayomiliki data au mamlaka iliyotoa hati ili kurekebisha rekodi ya chanzo.",
    },
    {
      key: "9",
      title:
        "Sijapokea barua pepe, SMS, OTP au ujumbe wa WhatsApp wa uthibitishaji. Nifanye nini?",
      content:
        "Angalia folda ya spam/junk na hakikisha nambari ya simu au barua pepe uliyoingiza ni sahihi. Ikiwa ujumbe haujafika, wasiliana na support ukiambatanisha kumbukumbu ya malipo, jina la huduma, na simu au barua pepe iliyotumika.",
    },
    {
      key: "10",
      title: "Nimelipa lakini sijapokea matokeo. Nifanye nini?",
      content:
        "Wasiliana na support ukiambatanisha kumbukumbu ya malipo, kiasi kilicholipwa, huduma iliyochaguliwa, nchi, na barua pepe au nambari ya simu iliyotumika. Timu ya support inaweza kufuatilia malipo na kuthibitisha kama ombi limekamilika, linasubiri, limeshindwa, au linahitaji kurejeshewa pesa/kujaribiwa tena.",
    },
  ],
  matrixRows: [
    "Kitambulisho cha Taifa cha Uganda: Nambari ya ID/kadi; taarifa za ziada zikihitajika. Idhini inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: hali ya utambulisho na taarifa zinazoruhusiwa.",
    "Nambari ya Simu: Nambari ya simu; OTP/idhini ikihitajika. Idhini inahitajika pale taarifa binafsi zinaporudishwa. Matokeo ya kawaida: viashiria vya mteja au ulinganisho wa utambulisho.",
    "Historia ya Gari kwa VIN: VIN yenye herufi/nambari 17. Kwa kawaida idhini haihitajiki kwa taarifa zisizo binafsi au historia ya gari iliyo wazi. Matokeo ya kawaida: historia ya gari inayopatikana kutoka vyanzo vya VIN.",
    "Upatikanaji wa huduma hutegemea muunganisho wa moja kwa moja na vyanzo vya data na upatikanaji wa watoa huduma. Ikiwa chanzo hakipatikani, e-raia.com inaweza kuonyesha hali ya kusubiri, kushindwa au kutopatikana badala ya matokeo.",
  ],
  countryGroups: [
    {
      key: "1",
      title: "Uthibitishaji wa Kitambulisho cha Taifa cha Uganda",
      items: [
        {
          key: "1",
          title: "Uthibitishaji wa Kitambulisho cha Taifa cha Uganda ni nini?",
          content:
            "Uthibitishaji wa Kitambulisho cha Taifa cha Uganda husaidia kuthibitisha kuwa nambari ya utambulisho au taarifa za kadi zinalingana na rekodi iliyopo kwenye chanzo husika cha utambulisho, pale chanzo hicho kinapopatikana kupitia e-raia.com.",
        },
        {
          key: "2",
          title: "Ni taarifa gani zinahitajika?",
          content:
            "Kwa kawaida utahitaji nambari ya utambulisho au nambari ya kadi. Kulingana na mtoa data, unaweza pia kuombwa jina, tarehe ya kuzaliwa, nambari ya simu au taarifa za idhini.",
        },
        {
          key: "3",
          title: "Matokeo yanaweza kuonyesha nini?",
          content:
            "Matokeo yanaweza kuthibitisha hali ya utambulisho na kuonyesha taarifa zinazoruhusiwa kama majina, jinsia, tarehe ya kuzaliwa, picha au viashiria vya ulinganisho. Sehemu kamili hutegemea mtoa data na masharti ya udhibiti.",
        },
        {
          key: "4",
          title: "Je, idhini inahitajika?",
          content:
            "Ndiyo. Pale taarifa binafsi za utambulisho zinaporudishwa, idhini au msingi mwingine wa kisheria unahitajika kabla matokeo kuonyeshwa kwa mtu wa tatu.",
        },
      ],
    },
    {
      key: "2",
      title: "Uthibitishaji wa Nambari ya Simu",
      items: [
        {
          key: "1",
          title: "Uthibitishaji wa nambari ya simu ni nini?",
          content:
            "Uthibitishaji wa simu husaidia kuthibitisha taarifa za utambulisho zilizounganishwa na nambari ya simu pale chanzo husika cha mawasiliano au utambulisho kinapopatikana.",
        },
        {
          key: "2",
          title: "Ni taarifa gani zinahitajika?",
          content:
            "Kwa kawaida utahitaji nambari ya simu. Chanzo cha data kinaweza kuhitaji OTP, SMS, WhatsApp, barua pepe au hatua nyingine ya idhini kabla ya taarifa binafsi kutolewa.",
        },
        {
          key: "3",
          title: "Matokeo yanaweza kuonyesha nini?",
          content:
            "Matokeo yanaweza kuthibitisha kama nambari ina rekodi inayolingana na kuonyesha taarifa za utambulisho au ulinganisho zinazoruhusiwa.",
        },
        {
          key: "4",
          title: "Je, idhini inahitajika?",
          content:
            "Ndiyo, pale taarifa za mteja wa simu au utambulisho zinaporudishwa.",
        },
      ],
    },
    {
      key: "3",
      title: "Ripoti ya Historia ya Gari kwa VIN",
      items: [
        {
          key: "1",
          title: "Ripoti ya historia ya gari kwa VIN ni nini?",
          content:
            "Ripoti ya VIN hutumia nambari ya utambulisho wa gari kupata historia inayopatikana kuhusu gari. Hii ni muhimu kabla ya kununua gari lililotumika au lililoingizwa kutoka nje.",
        },
        {
          key: "2",
          title: "Ni taarifa gani zinahitajika?",
          content:
            "Unahitaji VIN yenye herufi/nambari 17. Kwa kawaida VIN hupatikana kwenye dashboard, fremu ya mlango, hati za usajili au nyaraka za ununuzi wa gari.",
        },
        {
          key: "3",
          title: "Ukaguzi wa VIN unaweza kuonyesha nini?",
          content:
            "Ripoti ya VIN inaweza kuonyesha historia ya ajali, rekodi za title/salvage, mileage/odometer, recalls, historia ya wamiliki, rekodi za mauzo/minada, huduma na viashiria vya wizi au kupatikana pale zinapopatikana.",
        },
        {
          key: "4",
          title: "Je, ukaguzi wa VIN unaaminika?",
          content:
            "Ukaguzi wa VIN ni muhimu, lakini huenda usiwe na kila tukio kwenye historia ya gari. Baadhi ya rekodi zinaweza kukosekana, kuchelewa au kutopatikana kwenye vyanzo vya data.",
        },
      ],
    },
  ],
  paymentsItems: [
    {
      key: "1",
      title: "Bei na njia za malipo zinaonyeshwaje?",
      content:
        "Njia za malipo na sarafu zinaweza kutofautiana kulingana na soko. Chaguo zinazopatikana huonyeshwa wakati wa malipo.",
    },
    {
      key: "2",
      title: "Je, matokeo yanaweza kuwa tupu au kutopatikana?",
      content:
        "Upatikanaji wa huduma hutegemea muunganisho wa moja kwa moja na vyanzo vya data na upatikanaji wa watoa huduma. Ikiwa chanzo hakipatikani, e-raia.com inaweza kuonyesha hali ya kusubiri, kushindwa au kutopatikana badala ya matokeo.",
    },
    {
      key: "3",
      title: "Ninawezaje kuwasiliana na support?",
      content: "Usaidizi: info@e-raia.com",
    },
  ],
};

const renderQAGroup = (items) => (
  <Collapse accordion>
    {items.map((item) => (
      <Panel key={item.key} header={item.title}>
        <p>{item.content}</p>
      </Panel>
    ))}
  </Collapse>
);

const UgandaFaqPage = () => {
  const { language } = useLocale();
  const content = language === "SW" ? swContent : enContent;
  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  const items = [
    {
      key: "1",
      title: content.sections.general,
      content: renderQAGroup(content.generalItems),
    },
    {
      key: "2",
      title: content.sections.matrix,
      content: (
        <div>
          {content.matrixRows.map((row, idx) => (
            <p key={idx}>{row}</p>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      title: content.sections.country,
      content: (
        <Collapse accordion>
          {content.countryGroups.map((group) => (
            <Panel key={group.key} header={group.title}>
              {renderQAGroup(group.items)}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "4",
      title: content.sections.payments,
      content: renderQAGroup(content.paymentsItems),
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
              {content.pageTitle}
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

export default UgandaFaqPage;
