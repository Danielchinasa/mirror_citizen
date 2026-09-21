import React from "react";
import { useLocale } from "../../components/LocaleProvider";

const PrivacyPolicyText = () => {
  const { language } = useLocale();
  const isFr = language === "FR";

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', lineHeight: '1.6', textAlign: 'left' }}>
      <h2 className="mb-4 text-center">{isFr ? "POLITIQUE DE CONFIDENTIALITÉ" : "PRIVACY NOTICE"}</h2>
      
      {isFr ? (
        <div>
          <h4>1. Objet et champ d’application</h4>
          <p>La présente Politique explique comment Biosec Solutions Limited collecte, utilise, communique, conserve et protège les données à caractère personnel dans le cadre de citoyen Côte d’Ivoire et citoyen.africa/ci.</p>
          <p>Elle concerne les utilisateurs, les personnes faisant l’objet d’une vérification, les visiteurs, contacts professionnels et personnes qui communiquent avec nous. Un Organisme source peut être responsable distinct du registre sous-jacent.</p>

          <h4>2. Responsable du traitement et contact</h4>
          <p>Biosec Solutions Limited (RC 901419) est constituée au Nigeria et est l’opérateur transfrontalier. Elle agit normalement comme responsable du traitement pour les comptes, paiements, sécurité, assistance et administration de la Plateforme. Selon l’accord avec la source, elle peut agir comme responsable autonome, responsable conjoint ou sous-traitant. Biosec n’est pas actuellement constituée comme société distincte en Côte d’Ivoire.</p>
          <p>Biosec Solutions Limited est constituée en République fédérale du Nigeria et exploite le Service depuis le Nigeria dans le cadre d’une prestation transfrontalière. Le nom citoyen Côte d’Ivoire et le domaine citoyen.africa/ci sont uniquement des identifiants de produit et de commerce et ne constituent pas une société distincte immatriculée en Côte d’Ivoire.</p>
          <p>Délégué à la protection des données : info@biosec.com.ng. Questions générales : ci.info@citoyen.africa. Lorsque le droit applicable exige une déclaration, une autorisation, un enregistrement ou un représentant local, Biosec accomplira la formalité et publiera les références sur citoyen.africa/ci.</p>

          <h4>3. Cadre juridique et autorité</h4>
          <p>Le traitement est effectué conformément à la Loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel et aux exigences applicables. L’autorité compétente est l’Autorité de Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI), agissant comme Autorité de protection (artci.ci).</p>

          <h4>4. Données traitées</h4>
          <p><strong>Données de compte :</strong> nom, courriel, téléphone, identifiant, authentification, langue, organisation et rôle.</p>
          <p><strong>Données de vérification :</strong> identifiant de recherche, NNI ou carte de résident, nom, statut du consentement et résultat communiqué par l’Organisme source.</p>
          <p><strong>Données techniques :</strong> adresse IP, appareil, navigateur, système, localisation approximative, session, cookies, horodatages, erreurs et événements de sécurité.</p>
          <p><strong>Paiements :</strong> montant, devise, référence, statut, remboursement ou portefeuille; Biosec ne conserve normalement pas les données complètes de carte.</p>
          <p><strong>Assistance et conformité :</strong> messages, réclamations, demandes de droits, justificatifs d’autorité, alertes de fraude et journaux d’audit.</p>

          <h4>5. Origine des données</h4>
          <p>Les données proviennent de l’utilisateur ou de la personne concernée, de la personne ou organisation qui initie une demande licite, des administrations et Organismes sources, des prestataires de paiement et mobile money, des fournisseurs d’authentification, hébergement, communications, sécurité et analyse, des appareils et navigateurs, ou d’une autorité publique lorsque la loi le permet.</p>
          <p>Biosec n’obtient généralement pas les données de vérification par une connexion directe à une base gouvernementale. Elle transmet les données de recherche strictement nécessaires à des prestataires contractuels de vérification et d’accès aux données, actuellement Smile ID, Prembly IdentityPass et Mono lorsque cela s’applique. Le prestataire peut interroger directement l’Organisme source ou un partenaire autorisé.</p>

          <h4>6. Finalités et bases juridiques</h4>
          <p>Nous traitons les données pour créer et administrer les comptes, fournir la vérification demandée, enregistrer le consentement et les accès, traiter les paiements, sécuriser la Plateforme, prévenir la fraude, répondre aux demandes, améliorer le service, envoyer des communications autorisées et respecter la loi.</p>
          <p>Les bases peuvent être le consentement, l’exécution d’un contrat, une obligation légale, l’intérêt légitime sous réserve des droits de la personne, une mission d’intérêt public ou une autre base autorisée par la loi.</p>

          <h4>7. Consentement et autorité</h4>
          <p>Lorsque le consentement est requis, il doit être libre, spécifique, éclairé et univoque. Nous enregistrons sa méthode, sa date et son statut. Il peut être refusé ou retiré; le retrait n’affecte pas les traitements licites antérieurs mais peut empêcher le service.</p>
          <p>L’utilisateur qui initie la demande doit disposer d’une finalité licite et de l’autorité requise.</p>

          <h4>8. Destinataires</h4>
          <p>Les données peuvent être communiquées à l’utilisateur autorisé et à la personne concernée, à l’Organisme source, aux prestataires sous contrat (hébergement, communications, authentification, assistance, sécurité, analyse), aux banques et moyens de paiement, aux conseils professionnels, aux sociétés du groupe ou successeurs dans une opération légitime, et aux autorités lorsque la loi l’exige.</p>
          <p>Nous ne vendons ni ne louons les données personnelles et n’autorisons pas un prestataire à les utiliser pour son propre marketing sans rapport.</p>

          <h4>9. Transferts internationaux</h4>
          <p>Certains prestataires ou infrastructures peuvent être situés hors de Côte d’Ivoire. Avant tout transfert, Biosec applique les formalités, autorisations préalables, conditions de protection adéquate, consentement ou garanties contractuelles et techniques exigées par le droit ivoirien et l’ARTCI.</p>
          <p>Biosec exploitant la Plateforme depuis le Nigeria, les données personnelles peuvent être transférées, stockées ou consultées depuis le Nigeria. Un prestataire ou ses sous-traitants peut également traiter les données dans d’autres pays indiqués dans la liste des prestataires. Biosec applique, avant tout transfert soumis à restriction, les autorisations, consentements, garanties contractuelles et mesures de sécurité exigés par le droit applicable.</p>
          
          <h4>10. Conservation</h4>
          <p>Les résultats de vérification sont conservés pendant la courte durée d’accès annoncée pour le service, puis supprimés ou anonymisés sauf obligation contraire. Les comptes, paiements, preuves de consentement, journaux de sécurité, réclamations et demandes de droits sont conservés pendant une durée proportionnée aux finalités, obligations légales, audits et litiges.</p>
          <p>Les sauvegardes chiffrées sont isolées et remplacées selon le cycle de sauvegarde, sauf gel juridique.</p>

          <h4>11. Sécurité et violations</h4>
          <p>Nous appliquons des contrôles d’accès, authentification, chiffrement approprié, journalisation, surveillance, développement sécurisé, sauvegardes, réponse aux incidents, contrôle des prestataires, formation et audits.</p>
          <p>En cas de violation, nous identifions, contenons, enquêtons et notifions l’ARTCI et les personnes concernées dans les conditions et délais prévus par le droit applicable.</p>

          <h4>12. Vos droits</h4>
          <p>Sous réserve des conditions légales, vous pouvez demander l’information, l’accès, la rectification, l’effacement, la limitation, l’opposition, le retrait du consentement, la portabilité lorsqu’elle s’applique, une intervention humaine face à certaines décisions automatisées, et introduire une réclamation.</p>
          <p>La rectification d’un registre officiel peut devoir être demandée directement à l’Organisme source.</p>

          <h4>13. Exercice des droits et réclamations</h4>
          <p>Écrivez à ci.info@citoyen.africa avec les informations nécessaires pour localiser les données. Nous vérifions l’identité de manière proportionnée et répondons dans le délai légal. Vous pouvez aussi saisir l’Autorité de Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI), agissant comme Autorité de protection via artci.ci.</p>

          <h4>14. Mineurs, cookies et marketing</h4>
          <p>La Plateforme n’est pas destinée aux titulaires de compte âgés de moins de 18 ans. Le parent ou tuteur utilise son propre compte et fournit une autorisation vérifiable lorsque requise.</p>
          <p>La Plateforme peut utiliser des cookies nécessaires, de préférence, d’analyse et de mesure publicitaire. Les technologies non essentielles sont soumises au consentement lorsque la loi l’exige.</p>
          <p>Les communications commerciales comportent un moyen de désinscription. Les résultats de vérification ne sont pas utilisés pour la publicité comportementale.</p>
          
          <h4>15. Traitement automatisé, mises à jour et contact</h4>
          <p>La Plateforme peut automatiser la comparaison d’identifiants, le routage, la détection de fraude et le retour d’une correspondance. Elle n’est pas destinée à prendre seule une décision produisant des effets juridiques importants sauf information spécifique et garanties requises.</p>
          <p>La présente Politique peut être mise à jour. La version en vigueur et sa date seront publiées; les modifications importantes seront signalées.</p>
          <br/>
          <p>Biosec Solutions Limited (RC 901419)<br/>
          DPO : info@biosec.com.ng<br/>
          Informations : ci.info@citoyen.africa<br/>
          Plateforme : citoyen.africa/ci</p>
        </div>
      ) : (
        <div>
          <h4>1. Purpose and scope</h4>
          <p>This Privacy Notice explains how Biosec Solutions Limited collects, uses, discloses, stores and protects Personal Data when operating citoyen Côte d’Ivoire through citoyen.africa/ci and related websites, applications, APIs, communications and verification services.</p>
          <p>It applies to Platform Users who create an Account or submit a request, Verification Subjects whose information is requested, visitors, business contacts and persons who communicate with us. A Source Institution may separately act as controller of the underlying record and should provide its own privacy information.</p>

          <h4>2. Controller and contact</h4>
          <p>Biosec Solutions Limited (RC 901419) is incorporated in Nigeria and is the cross-border operator. It ordinarily acts as controller for Account, payment, security, support and Platform-administration processing. Depending on a source arrangement, Biosec may act as an independent controller, joint controller or processor for a particular verification flow. Biosec is not presently incorporated in Cote d'Ivoire; the country brand is not a separate legal entity.</p>
          <p>Data Protection Officer: info@biosec.com.ng. General enquiries: ci.info@citoyen.africa. Where applicable law requires a foreign-controller registration, authorisation or local representative, Biosec will complete the applicable step and publish the registration or representative details on citoyen.africa/ci.</p>

          <h4>3. Applicable law and regulator</h4>
          <p>We process Personal Data in accordance with Loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel and other applicable privacy, consumer, cybersecurity, electronic-transactions and sector-specific requirements. The relevant privacy regulator is the Autorité de Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI), agissant comme Autorité de protection (artci.ci).</p>

          <h4>4. Categories of people and information</h4>
          <ul>
            <li><strong>Platform User:</strong> Name, email, telephone number, login identifier, authentication data, language, organisation, role and account preferences.</li>
            <li><strong>Verification Subject:</strong> Search identifier, identity or resident identifier, name, consent or authentication status, and the result returned by the relevant Source Institution.</li>
            <li><strong>Service and device use:</strong> IP address, device, browser, operating system, approximate location, session, cookie identifiers, timestamps, pages, errors and security events.</li>
            <li><strong>Payments:</strong> Amount, currency, transaction reference, gateway response, payment status, refund or wallet record. Biosec ordinarily does not store full card credentials.</li>
            <li><strong>Support and compliance:</strong> Messages, call or ticket records, complaints, rights requests, authority documents, fraud indicators, audit records and investigation information.</li>
            <li><strong>Business or API use:</strong> Organisation details, authorised users, API keys, request logs, billing contacts and contract records.</li>
          </ul>

          <h4>5. Where information comes from</h4>
          <ul>
            <li>directly from the Platform User or Verification Subject;</li>
            <li>from the person or organisation initiating a lawful request;</li>
            <li>from government agencies, statutory bodies and authorised Source Institutions;</li>
            <li>from identity, resident-card, vehicle or other appropriately authorised data providers, where applicable;</li>
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
            <li><strong>Support, complaints and data-subject rights:</strong> Contract; legal obligation; legitimate interests in service quality and legal claims.</li>
            <li><strong>Analytics and service improvement:</strong> Legitimate interests, or consent where required for non-essential cookies or tracking.</li>
            <li><strong>Marketing:</strong> Consent or another lawful opt-out basis where permitted. Verification Results are not used for behavioural advertising.</li>
            <li><strong>Comply with law and protect legal rights:</strong> Legal obligation; public-interest requirement; establishment, exercise or defence of legal claims.</li>
          </ul>

          <h4>7. Consent and authority</h4>
          <p>Where consent is required, it must be freely given, specific, informed and unambiguous. We record the method, time and status. Consent may be refused or withdrawn through the applicable flow or by contacting the DPO. Withdrawal does not affect prior lawful processing and may prevent completion of a consent-dependent Service.</p>
          <p>A Platform User initiating a request must have an independent lawful purpose and any required authority. Biosec may request evidence and suspend access where misuse is suspected.</p>

          <h4>8. Service-specific processing</h4>
          <p>The Services currently offered are National Identification Number (NNI) verification, Resident Card verification and vehicle identification number (VIN) verification. The data fields, source, consent or authority requirement, access period and retention differ by Service and will be described at the point of request or in a service notice. Biosec will update this Notice before introducing another verification category.</p>

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
          <p>Some infrastructure or service providers may be outside Cote d'Ivoire or permit authorised access from another country. We use a transfer mechanism allowed by applicable law, assess the destination and recipient, and apply contractual, technical and organisational safeguards. Where prior regulator approval, notification, adequacy, consent or another condition is required, we will satisfy it before the transfer.</p>

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
          <p>No electronic system is completely secure. Users must protect credentials, devices and downloaded results and report suspected compromise promptly.</p>

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
          <p>A request to correct an official identity, resident, vehicle or other source record may need to be made directly to the Source Institution. We will correct information controlled by Biosec and provide reasonable guidance.</p>
          
          <h4>15. Exercising rights and complaints</h4>
          <p>Email ci.info@citoyen.africa with the right requested and sufficient Account or transaction details. We verify identity proportionately, ordinarily do not charge a fee, and respond within the period required by applicable law. A manifestly unfounded or excessive request may be limited, refused or charged where law permits.</p>
          <p>You may complain to the Autorité de Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI), agissant comme Autorité de protection using its current official channel at artci.ci. Please confirm current contact details on the regulator’s official site.</p>

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
          General enquiries: ci.info@citoyen.africa<br/>
          Platform: citoyen.africa/ci</p>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyText;
