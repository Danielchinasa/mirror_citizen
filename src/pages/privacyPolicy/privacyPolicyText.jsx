import React, { useState, useEffect } from "react";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const PrivacyPolicyText = () => {
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', lineHeight: '1.6', textAlign: 'left' }}>
      <h2 className="mb-4 text-center">{isSw ? "ILANI YA FARAGHA / PRIVACY NOTICE" : "PRIVACY NOTICE"}</h2>
      
      {isSw ? (
        <div>
          <h4>1. Madhumuni na upeo</h4>
          <p>Ilani hii inaeleza jinsi Biosec Solutions Limited inavyokusanya, kutumia, kushiriki, kuhifadhi na kulinda data binafsi katika e-raia Uganda kupitia e-raia.com/ug na huduma zinazohusiana.</p>
          <p>Inawahusu watumiaji wa Jukwaa, watu wanaothibitishwa, wageni na watu wanaowasiliana nasi. Taasisi Chanzo inaweza kuwa mdhibiti tofauti wa rekodi ya msingi.</p>

          <h4>2. Mdhibiti na mawasiliano</h4>
          <p>Biosec Solutions Limited (RC 901419) imesajiliwa Nigeria na ni mwendeshaji wa kuvuka mipaka. Kwa kawaida ni mdhibiti wa data za akaunti, malipo, usalama, msaada na usimamizi. Kulingana na mpangilio wa chanzo, inaweza kuwa mdhibiti huru, mdhibiti mwenza au mchakataji. Biosec haijasajiliwa kwa sasa kama kampuni tofauti nchini Uganda.</p>
          <p>Biosec Solutions Limited imesajiliwa katika Jamhuri ya Shirikisho la Nigeria na inaendesha Huduma kutoka Nigeria kwa njia ya kuvuka mipaka. Jina e-raia Uganda na tovuti e-raia.com/ug ni vitambulisho vya bidhaa na biashara pekee na si kampuni tofauti iliyosajiliwa nchini Uganda.</p>
          <p>Afisa wa Ulinzi wa Data: ug-info@e-raia.com. Maswali ya jumla: ug-info@e-raia.com. Pale sheria inapohitaji usajili wa mdhibiti wa kigeni, idhini au mwakilishi wa ndani, Biosec itakamilisha hatua hiyo na kuchapisha maelezo kwenye e-raia.com/ug.</p>

          <h4>3. Sheria na mamlaka</h4>
          <p>Tunachakata data kwa mujibu wa Data Protection and Privacy Act, 2019 and Data Protection and Privacy Regulations, 2021 na sheria nyingine husika. Mamlaka ya faragha ni Personal Data Protection Office of Uganda (PDPO) (pdpo.go.ug).</p>

          <h4>4. Data tunayoweza kuchakata</h4>
          <p><strong>Akaunti:</strong> jina, barua pepe, simu, kitambulisho cha kuingia, uthibitishaji, lugha, shirika na jukumu.</p>
          <p><strong>Uthibitishaji:</strong> kitambulisho cha utafutaji, taarifa ya Kitambulisho cha Taifa au VIN, jina, hali ya idhini na matokeo kutoka Taasisi Chanzo.</p>
          <p><strong>Teknolojia:</strong> anwani ya IP, kifaa, kivinjari, mfumo, eneo la kukadiria, kikao, vidakuzi, muda, hitilafu na matukio ya usalama.</p>
          <p><strong>Malipo:</strong> kiasi, sarafu, rejea, hali, marejesho au salio; kwa kawaida hatuhifadhi taarifa kamili za kadi.</p>
          <p><strong>Msaada na uzingatiaji:</strong> ujumbe, malalamiko, maombi ya haki, ushahidi wa mamlaka, ishara za udanganyifu na kumbukumbu za ukaguzi.</p>

          <h4>5. Chanzo cha data</h4>
          <p>Data hutoka kwa mtumiaji au mhusika, mtu au shirika linaloanzisha ombi halali, serikali na Taasisi Chanzo, watoa malipo na mobile money, huduma za kuingia na uthibitishaji, mawasiliano, uhosting, usalama na uchanganuzi, vifaa na vivinjari, au mamlaka ya umma pale sheria inaporuhusu.</p>
          <p>Kwa kawaida Biosec haipati rekodi za uthibitishaji kwa kuunganishwa moja kwa moja na kanzidata ya serikali. Hutuma taarifa za utafutaji zinazohitajika kwa watoa huduma wa uthibitishaji na ufikiaji wa data walio chini ya mkataba, kwa sasa wakiwemo Smile ID, Prembly IdentityPass na Mono inapohusika. Mtoa huduma anaweza kuhoji Taasisi Chanzo moja kwa moja au kupitia mshirika wa juu aliyeidhinishwa.</p>

          <h4>6. Madhumuni na msingi wa kisheria</h4>
          <p>Tunatumia data kuunda na kusimamia akaunti, kutoa uthibitishaji, kurekodi idhini na ufikiaji, kushughulikia malipo na marejesho, kulinda Jukwaa, kuzuia udanganyifu, kutoa msaada, kuboresha huduma, kutuma mawasiliano yanayoruhusiwa na kutii sheria.</p>
          <p>Msingi unaweza kuwa idhini, mkataba, wajibu wa kisheria, maslahi halali yasiyozidi haki za mhusika, kazi ya maslahi ya umma au msingi mwingine unaoruhusiwa.</p>

          <h4>7. Idhini na mamlaka</h4>
          <p>Pale idhini inapohitajika, lazima iwe ya hiari, maalum, yenye taarifa na wazi. Tunarekodi njia, muda na hali. Inaweza kukataliwa au kuondolewa; kuondoa hakuathiri uchakataji halali wa awali lakini kunaweza kuzuia huduma.</p>

          <h4>8. Kushiriki data</h4>
          <p>Data inaweza kushirikiwa na mtumiaji aliyeidhinishwa na mhusika, Taasisi Chanzo, watoa huduma chini ya mkataba (uhosting, mawasiliano, uthibitishaji, msaada, usalama, uchanganuzi), watoa malipo, washauri wa kitaalamu, kampuni za kundi au mrithi halali wa biashara, na mamlaka pale sheria inapohitaji.</p>
          <p>Hatuuzi wala kukodisha data binafsi na haturuhusu mtoa huduma kuitumia kwa masoko yake yasiyohusiana.</p>

          <h4>9. Uhamisho wa kimataifa</h4>
          <p>Baadhi ya mifumo au watoa huduma wanaweza kuwa nje ya Uganda. Kabla ya uhamisho tunatumia njia inayoruhusiwa na sheria, kutathmini ulinzi wa nchi na mpokeaji, na kuweka mikataba, udhibiti wa kiufundi na hatua za shirika. Idhini, usajili, taarifa au kibali cha mamlaka kitapokelewa pale kinapohitajika.</p>
          
          <h4>10. Uhifadhi</h4>
          <p>Matokeo huhifadhiwa kwa muda mfupi wa ufikiaji ulioonyeshwa kisha kufutwa au kutambulishwa upya isipokuwa sheria ihitaji vingine. Akaunti, malipo, ushahidi wa idhini, kumbukumbu za usalama, malalamiko na maombi ya haki huhifadhiwa kwa muda unaolingana na kusudi, wajibu wa kisheria, ukaguzi na madai.</p>

          <h4>11. Usalama na uvunjaji wa data</h4>
          <p>Tunatumia udhibiti wa ufikiaji, uthibitishaji, usimbaji fiche unaofaa, kumbukumbu na ufuatiliaji, maendeleo salama, nakala za usalama, majibu ya tukio, ukaguzi wa watoa huduma, mafunzo na tathmini.</p>
          
          <h4>12. Haki zako</h4>
          <p>Kwa kuzingatia masharti ya sheria, unaweza kuomba taarifa na ufikiaji, kusahihisha, kufuta, kuzuia au kupinga uchakataji, kuondoa idhini, kupinga masoko, kubeba data inapohusika, kuomba mapitio ya kibinadamu kwa maamuzi fulani ya kiotomatiki, na kulalamika.</p>

          <h4>13. Kutumia haki na malalamiko</h4>
          <p>Andika kwa ug-info@e-raia.com ukiweka maelezo ya kutosha. Tutathibitisha utambulisho kwa kiwango kinachofaa na kujibu ndani ya muda wa kisheria. Unaweza pia kulalamika kwa Personal Data Protection Office of Uganda (PDPO) kupitia pdpo.go.ug.</p>

          <h4>14. Watoto, vidakuzi na masoko</h4>
          <p>Jukwaa si la wenye akaunti chini ya miaka 18. Mzazi au mlezi atumie akaunti yake na atoe mamlaka inayoweza kuthibitishwa pale inapohitajika.</p>
          <p>Tunaweza kutumia vidakuzi vya lazima, mapendeleo, uchanganuzi na kipimo cha matangazo. Teknolojia zisizo za lazima hutumiwa kwa idhini pale sheria inapotaka.</p>
          
          <h4>15. Uchakataji wa kiotomatiki, mabadiliko na mawasiliano</h4>
          <p>Jukwaa linaweza kulinganisha vitambulisho, kuelekeza maombi, kugundua udanganyifu na kurudisha ulinganifu kiotomatiki. Halikusudii kufanya pekee yake uamuzi wenye athari kubwa za kisheria bila taarifa na ulinzi unaohitajika.</p>
          <p>Tunaweza kusasisha Ilani hii. Toleo na tarehe ya sasa vitachapishwa na mabadiliko makubwa yataelezwa.</p>
          <br/>
          <p>Biosec Solutions Limited (RC 901419)<br/>
          DPO: info@biosec.com.ng<br/>
          Maswali: ug-info@e-raia.com<br/>
          Jukwaa: e-raia.com/ug</p>
        </div>
      ) : (
        <div>
          <h4>1. Purpose and scope</h4>
          <p>This Privacy Notice explains how Biosec Solutions Limited collects, uses, discloses, stores and protects Personal Data when operating e-raia Uganda through e-raia.com/ug and related websites, applications, APIs, communications and verification services.</p>
          <p>It applies to Platform Users who create an Account or submit a request, Verification Subjects whose information is requested, visitors, business contacts and persons who communicate with us. A Source Institution may separately act as controller of the underlying record and should provide its own privacy information.</p>

          <h4>2. Controller and contact</h4>
          <p>Biosec Solutions Limited (RC 901419) is incorporated in Nigeria and is the cross-border operator. It ordinarily acts as controller for Account, payment, security, support and Platform-administration processing. Depending on a source arrangement, Biosec may act as an independent controller, joint controller or processor for a particular verification flow. Biosec is not presently incorporated in Uganda; the country brand is not a separate legal entity.</p>
          <p>Data Protection Officer: ug-info@e-raia.com. General enquiries: ug-info@e-raia.com. Where applicable law requires a foreign-controller registration, authorisation or local representative, Biosec will complete the applicable step and publish the registration or representative details on e-raia.com/ug.</p>

          <h4>3. Applicable law and regulator</h4>
          <p>We process Personal Data in accordance with Data Protection and Privacy Act, 2019 and Data Protection and Privacy Regulations, 2021 and other applicable privacy, consumer, cybersecurity, electronic-transactions and sector-specific requirements. The relevant privacy regulator is the Personal Data Protection Office of Uganda (PDPO) (pdpo.go.ug).</p>

          <h4>4. Categories of people and information</h4>
          <ul>
            <li><strong>Platform User:</strong> Name, email, telephone number, login identifier, authentication data, language, organisation, role and account preferences.</li>
            <li><strong>Verification Subject:</strong> Search identifier, National ID or VIN-related identifier, name, consent or authentication status, and the result returned by the relevant Source Institution.</li>
            <li><strong>Service and device use:</strong> IP address, device, browser, operating system, approximate location, session, cookie identifiers, timestamps, pages, errors and security events.</li>
            <li><strong>Payments:</strong> Amount, currency, transaction reference, gateway response, payment status, refund or wallet record. Biosec ordinarily does not store full card credentials.</li>
            <li><strong>Support and compliance:</strong> Messages, call or ticket records, complaints, rights requests, authority documents, fraud indicators, audit records and investigation information.</li>
          </ul>

          <h4>5. Where information comes from</h4>
          <ul>
            <li>directly from the Platform User or Verification Subject;</li>
            <li>from the person or organisation initiating a lawful request;</li>
            <li>from government agencies, statutory bodies and authorised Source Institutions;</li>
            <li>from identity, vehicle or other appropriately authorised data providers, where applicable;</li>
            <li>from payment gateways, banks and mobile-money providers;</li>
            <li>from social-login, authentication, communications, hosting, analytics, fraud-prevention and security providers;</li>
            <li>from devices and browser technologies; and</li>
            <li>from public authorities, professional advisers or another person where lawful and necessary.</li>
          </ul>
          <p>Biosec generally does not obtain verification records by connecting directly to a government database. It submits the minimum required search data to contracted verification and data-access providers, currently including Smile ID, Prembly IdentityPass and Mono where applicable. A provider may query a Source Institution directly or through an authorised upstream partner.</p>

          <h4>6. Purposes and lawful bases</h4>
          <ul>
            <li><strong>Create and administer an Account; provide a requested Service:</strong> Performance of a contract; steps requested before a contract.</li>
            <li><strong>Verify identity or information and deliver a result:</strong> Consent where required; contract; legitimate interests; legal obligation; or another basis permitted by applicable law and the Source Institution.</li>
            <li><strong>Record consent, authority, access and audit events:</strong> Legal obligation; legitimate interests in accountability, security and dispute resolution.</li>
            <li><strong>Process payments, refunds and reconciliation:</strong> Contract; legal obligation; legitimate interests in fraud prevention and accounting.</li>
            <li><strong>Secure the Platform and investigate misuse:</strong> Legal obligation; legitimate interests in cybersecurity, fraud prevention and protection of users and Source Institutions.</li>
          </ul>

          <h4>7. Consent and authority</h4>
          <p>Where consent is required, it must be freely given, specific, informed and unambiguous. We record the method, time and status. Consent may be refused or withdrawn through the applicable flow or by contacting the DPO. Withdrawal does not affect prior lawful processing and may prevent completion of a consent-dependent Service.</p>
          <p>A Platform User initiating a request must have an independent lawful purpose and any required authority. Biosec may request evidence and suspend access where misuse is suspected.</p>

          <h4>8. Service-specific processing</h4>
          <p>The Services currently offered are National ID verification and vehicle identification number (VIN) verification. The data fields, source, consent or authority requirement, access period and retention differ by Service and will be described at the point of request or in a service notice. Biosec will update this Notice before introducing another verification category.</p>

          <h4>9. Sharing and recipients</h4>
          <ul>
            <li>the requesting user and, where applicable, the Verification Subject;</li>
            <li>the relevant Source Institution and authorised data provider;</li>
            <li>cloud, hosting, communications, authentication, customer-support, analytics, cybersecurity and professional service providers acting under contract;</li>
            <li>payment gateways, banks, mobile-money providers and fraud-prevention services;</li>
            <li>group companies or a successor in a genuine restructuring, merger, investment or sale, subject to safeguards;</li>
            <li>lawyers, auditors, insurers and other professional advisers; and</li>
            <li>regulators, courts, law-enforcement bodies or public authorities where required by law or necessary to protect rights and security.</li>
          </ul>
          <p>We do not sell or rent Personal Data and do not permit service providers to use it for unrelated marketing.</p>

          <h4>10. International transfers</h4>
          <p>Some infrastructure or service providers may be outside Uganda or permit authorised access from another country. We use a transfer mechanism allowed by applicable law, assess the destination and recipient, and apply contractual, technical and organisational safeguards. Where prior regulator approval, notification, adequacy, consent or another condition is required, we will satisfy it before the transfer.</p>

          <h4>11. Retention</h4>
          <p><strong>Account and contract records:</strong> For the Account or contract relationship and a reasonable period afterwards for disputes, audit and legal obligations.<br/>
          <strong>Payment and tax records:</strong> For the statutory accounting, tax, anti-fraud and dispute period.<br/>
          <strong>Verification result:</strong> For the short access period displayed for the Service, then deleted or de-identified unless longer retention is legally required.<br/>
          <strong>Consent and audit evidence:</strong> Long enough to demonstrate lawful processing, investigate misuse and resolve claims.<br/>
          <strong>Security and technical logs:</strong> For a proportionate period based on risk, operational need and legal requirements.<br/>
          <strong>Support, complaint and rights records:</strong> Until the matter is resolved and for the applicable legal-claims or accountability period.<br/>
          <strong>Marketing preferences:</strong> Until withdrawal, plus a limited suppression record to respect the opt-out.</p>

          <h4>12. Security</h4>
          <ul>
            <li>role-based access, authentication and periodic access review;</li>
            <li>encryption in transit and at rest where appropriate;</li>
            <li>logging, monitoring, secure development and vulnerability management;</li>
            <li>segregation and restricted access for sensitive results;</li>
            <li>backup, recovery, incident response and business-continuity processes;</li>
            <li>vendor due diligence, contracts and confidentiality obligations; and</li>
            <li>staff privacy and security training, risk assessments and audits.</li>
          </ul>

          <h4>13. Personal Data breaches</h4>
          <p>We maintain procedures to identify, contain, investigate and document Personal Data breaches. We notify the relevant regulator and affected persons within the time and circumstances required by applicable law. A notice may describe the nature of the breach, likely consequences, mitigation and contact point.</p>
          
          <h4>14. Your rights</h4>
          <ul>
            <li>be informed about processing;</li>
            <li>request confirmation and access to Personal Data;</li>
            <li>request correction of inaccurate or incomplete data;</li>
            <li>request deletion where the legal conditions are met;</li>
            <li>request restriction or object to qualifying processing;</li>
            <li>withdraw consent;</li>
            <li>object to direct marketing;</li>
            <li>request portability where applicable;</li>
            <li>seek human review of qualifying solely automated decisions;</li>
            <li>complain to Biosec and the competent regulator; and</li>
            <li>seek compensation or another remedy where available.</li>
          </ul>
          
          <h4>15. Exercising rights and complaints</h4>
          <p>Email ug-info@e-raia.com with the right requested and sufficient Account or transaction details. We verify identity proportionately, ordinarily do not charge a fee, and respond within the period required by applicable law. A manifestly unfounded or excessive request may be limited, refused or charged where law permits.</p>
          <p>You may complain to the Personal Data Protection Office of Uganda (PDPO) using its current official channel at pdpo.go.ug. Please confirm current contact details on the regulator's official site.</p>

          <h4>16. Children and persons lacking capacity</h4>
          <p>The Platform is not intended for Account holders under 18. A parent, guardian or authorised adult should use their own Account. Where consent is required for a child’s Personal Data, we obtain or require verifiable authority from the parent or guardian unless law provides otherwise.</p>

          <h4>17. Cookies, analytics and similar technologies</h4>
          <p>The Platform may use strictly necessary, preference, analytics and advertising-measurement cookies or similar technologies. Non-essential technologies are used only with consent where required. Choices may be changed through the cookie panel or browser settings, although disabling necessary technologies may prevent core functions.</p>

          <h4>18. Marketing</h4>
          <p>We send marketing only where permitted and provide an unsubscribe method. Opting out does not stop receipts, security alerts, consent prompts or other operational messages. We keep a limited suppression record and do not use Verification Results for behavioural advertising.</p>

          <h4>19. Automated processing</h4>
          <p>The Platform may automatically compare identifiers, validate fields, route requests, detect fraud and return match or no-match responses. Biosec does not intend to make a solely automated decision producing legal or similarly significant effects about a Verification Subject unless the Service expressly states this, identifies the lawful basis and provides required safeguards.</p>

          <h4>20. Changes to this Notice</h4>
          <p>We may update this Notice for changes in law, guidance, source arrangements, technology or processing. The current version and effective date will be published. Material changes will be highlighted or communicated where reasonably practicable.</p>

          <h4>21. Contact</h4>
          <p>Biosec Solutions Limited (RC 901419)<br/>
          Data Protection Officer: info@biosec.com.ng<br/>
          General enquiries: ug-info@e-raia.com<br/>
          Platform: e-raia.com/ug</p>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyText;
