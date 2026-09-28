import React from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse, Typography } from "antd";
import { theme } from "antd";
import { useLocale } from "../../components/LocaleProvider";

const { Title } = Typography;
const { Panel } = Collapse;

const enContent = {
  pageTitle: "Frequently Asked Questions — Côte d'Ivoire",
  sections: {
    general: "GENERAL QUESTIONS",
    matrix: "SERVICE AVAILABILITY MATRIX",
    country: "SERVICES",
    payments: "PAYMENTS, RESULTS AND SUPPORT",
  },
  generalItems: [
    {
      key: "1",
      title: "Does e-citoyen.africa comply with privacy standards?",
      content:
        "Yes. e-citoyen.africa is designed as a consent-based platform. For this market, the service is operated in accordance with local data protection rules, e-citoyen.africa privacy policies and GDPR where it applies to cross-border or diaspora users.",
    },
    {
      key: "2",
      title: "What data requires consent?",
      content:
        "Personal data requires consent or another lawful basis before it is disclosed to a third party. This includes information that can directly or indirectly identify a person, such as names, identification numbers, phone numbers, dates of birth, addresses, photographs or similar identity information.",
    },
    {
      key: "3",
      title: "What data is accessible without consent?",
      content:
        "Public records, non-personal vehicle history data and information accessed by a public authority under the required legal basis may not require the same customer consent flow. e-citoyen.africa nonetheless applies access controls, audit logging and responsible-use checks.",
    },
    {
      key: "4",
      title: "How does consent work?",
      content:
        "For services that return personal data, the data subject is asked to approve the verification before the result is disclosed. Depending on the source, consent may be captured through the portal, SMS, email, OTP, WhatsApp or another approved channel. If consent is not completed, personal data should not be displayed.",
    },
    {
      key: "5",
      title: "Why do I need to pay before verifying?",
      content:
        "e-citoyen.africa is a premium verification service. The fee covers secure integrations, data-provider costs, payment processing, infrastructure, monitoring and customer support. The applicable local or diaspora price is displayed before payment.",
    },
    {
      key: "6",
      title: "Why do I need to register before verifying?",
      content:
        "Registration helps protect the platform, lets you track your transactions and gives you access to your payment history and eligible verification results.",
    },
    {
      key: "7",
      title: "Is my verification result saved on e-citoyen.africa?",
      content:
        "Verification results may be temporarily stored in your account so you can review your search history. Results should be deleted or anonymised after the applicable retention period stated in the privacy policy.",
    },
    {
      key: "8",
      title: "What do I do if my information is not correct?",
      content:
        "e-citoyen.africa aggregates and displays data from authorised data sources. If the information is incorrect, you should contact the relevant managing body or issuing authority to correct the underlying source record.",
    },
    {
      key: "9",
      title:
        "I did not receive an email, SMS, OTP or WhatsApp verification message. What should I do?",
      content:
        "Check your spam or junk folder and confirm that the phone number or email address provided is correct. If the message still does not arrive, contact support with your payment reference, service name and the phone number or email used.",
    },
    {
      key: "10",
      title: "I paid but did not receive a result. What should I do?",
      content:
        "Contact support with the payment reference, amount paid, selected service, country and the email or phone number used. Support can trace the payment and confirm whether the verification request was completed, is pending, failed or requires refund or retry.",
    },
  ],
  matrixRows: [
    "National Identity Card (NNI): NNI number; supporting details if required. Consent required where personal data is returned. Typical result: identity status and permitted identity fields.",
    "Resident Card: Resident card number; consent required. Consent required where personal data is returned. Typical result: residence status and validity.",
    "VIN Verification: 17-character VIN. Consent is generally not required for non-personal vehicle history/public records. Typical result: available vehicle history fields from VIN sources.",
    "Service availability depends on live connectivity to data sources and provider availability. When a source is unavailable, e-citoyen.africa may return a pending, failed or unavailable status rather than a result.",
  ],
  countryGroups: [
    {
      key: "1",
      title: "National Identity Card (NNI) Verification",
      items: [
        {
          key: "1",
          title: "What is National Identity Card (NNI) verification?",
          content:
            "National Identity Card (NNI) verification confirms whether an identity number or card details match the records held by the relevant national identity data source, where that source is available through e-citoyen.africa.",
        },
        {
          key: "2",
          title: "What information is needed for NNI verification?",
          content:
            "You will normally need the NNI number. Depending on the data provider, supporting details such as name, date of birth, phone number or consent information may also be requested.",
        },
        {
          key: "3",
          title: "What information can the result provide?",
          content:
            "The result can confirm identity status and return available details such as names, sex, date of birth, photo or match indicators, plus other fields permitted by the data source.",
        },
        {
          key: "4",
          title: "Is consent required?",
          content:
            "Yes. When personal identity information is returned, consent or another lawful basis is required before the result is shown to a third party.",
        },
      ],
    },
    {
      key: "2",
      title: "Resident Card Verification",
      items: [
        {
          key: "1",
          title: "What is Resident Card verification?",
          content:
            "Resident Card verification confirms the identity details attached to a residence card issued to foreign residents in Côte d'Ivoire, when the competent data source is available.",
        },
        {
          key: "2",
          title: "What information is needed?",
          content:
            "You will normally need the resident card number. The data source may require an OTP, SMS, WhatsApp, email or another consent step before personal data is disclosed.",
        },
        {
          key: "3",
          title: "What information can the result provide?",
          content:
            "The result can confirm the resident card status and validity, permit type, holder information and registered address, subject to the fields allowed by the data provider.",
        },
        {
          key: "4",
          title: "Is consent required?",
          content:
            "Yes, whenever personal or identity information is returned.",
        },
      ],
    },
    {
      key: "3",
      title: "VIN History Report (Vehicle)",
      items: [
        {
          key: "1",
          title: "What is a VIN history report?",
          content:
            "A VIN history report uses a vehicle identification number (VIN) to retrieve the available history of a vehicle. It may be useful before buying a used or imported vehicle.",
        },
        {
          key: "2",
          title: "What information is needed?",
          content:
            "You need the 17-character VIN. The VIN is usually found on the dashboard, door frame, registration documents or vehicle purchase papers.",
        },
        {
          key: "3",
          title: "What information can a VIN report provide?",
          content:
            "A VIN report can include accident history, title or claim records, odometer information, recalls, ownership history, sale/auction records, maintenance history and theft/recovery indicators when available.",
        },
        {
          key: "4",
          title: "Is a VIN report reliable?",
          content:
            "A VIN report is helpful, but it may not include all events in a vehicle's history. Some records may be missing, delayed or unavailable from the source databases.",
        },
      ],
    },
  ],
  paymentsItems: [
    {
      key: "1",
      title: "How are pricing and payment options displayed?",
      content:
        "Payment gateways and currencies may vary by market. Available options are shown during checkout.",
    },
    {
      key: "2",
      title: "Can a result be empty or unavailable?",
      content:
        "Service availability depends on live connectivity to data sources and provider availability. When a source is unavailable, e-citoyen.africa may return a pending, failed or unavailable status rather than a result.",
    },
    {
      key: "3",
      title: "How do I contact support?",
      content: "Support: info@e-raia.com",
    },
  ],
};

const frContent = {
  pageTitle: "Foire Aux Questions — Côte d'Ivoire",
  sections: {
    general: "QUESTIONS GÉNÉRALES",
    matrix: "MATRICE DE DISPONIBILITÉ DES SERVICES",
    country: "SERVICES PAR PAYS",
    payments: "PAIEMENTS, RÉSULTATS ET ASSISTANCE",
  },
  generalItems: [
    {
      key: "1",
      title: "e-citoyen.africa respecte-t-il les normes de confidentialité ?",
      content:
        "Oui. e-citoyen.africa est conçu comme une plateforme basée sur le consentement. Pour ce marché, le service est exploité conformément aux règles locales de protection des données, aux politiques de confidentialité d'e-citoyen.africa et au RGPD lorsqu'il s'applique aux utilisateurs transfrontaliers ou de la diaspora.",
    },
    {
      key: "2",
      title: "Quelles données nécessitent un consentement ?",
      content:
        "Les données personnelles nécessitent un consentement ou une autre base légale avant d'être affichées à un tiers. Cela inclut les données pouvant identifier une personne directement ou indirectement, telles que les noms, les numéros d'identification, les numéros de téléphone, les dates de naissance, les adresses, les photographies ou les informations d'identité similaires.",
    },
    {
      key: "3",
      title: "Quelles données sont accessibles sans consentement ?",
      content:
        "Les registres publics, les données non personnelles sur l'historique des véhicules et les informations consultées par une autorité publique avec la base légale requise peuvent ne pas nécessiter le même flux de consentement client. e-citoyen.africa applique néanmoins des contrôles d'accès, une journalisation d'audit et des vérifications d'utilisation responsable.",
    },
    {
      key: "4",
      title: "Comment fonctionne le consentement ?",
      content:
        "Pour les services qui renvoient des données personnelles, la personne concernée est invitée à autoriser la vérification avant que le résultat ne soit publié. Selon la source, le consentement peut être recueilli via le portail, SMS, email, OTP, WhatsApp ou un autre canal approuvé. Si le consentement n'est pas complété, les données personnelles ne doivent pas être affichées.",
    },
    {
      key: "5",
      title: "Pourquoi dois-je payer avant de vérifier ?",
      content:
        "e-citoyen.africa est un service de vérification premium. Les frais couvrent les intégrations sécurisées, les frais des fournisseurs de données, le traitement des paiements, l'infrastructure, la surveillance et le support client. Le prix applicable local ou diaspora est affiché avant le paiement.",
    },
    {
      key: "6",
      title: "Pourquoi dois-je m'inscrire avant de vérifier ?",
      content:
        "L'inscription aide à protéger la plateforme, vous permet de suivre vos transactions et vous donne accès à votre historique de paiement et aux résultats de vérification éligibles.",
    },
    {
      key: "7",
      title:
        "Mon résultat de vérification est-il sauvegardé sur e-citoyen.africa ?",
      content:
        "Les résultats de vérification peuvent être temporairement stockés dans votre compte afin que vous puissiez consulter votre historique de recherche. Les résultats doivent être supprimés ou anonymisés après la période de conservation applicable indiquée dans la politique de confidentialité.",
    },
    {
      key: "8",
      title: "Que faire si mes informations ne sont pas correctes ?",
      content:
        "e-citoyen.africa agrège et affiche les données provenant de sources de données autorisées. Si les informations sont incorrectes, vous devez contacter l'organisme gestionnaire concerné ou l'autorité émettrice pour corriger l'enregistrement source.",
    },
    {
      key: "9",
      title:
        "Je n'ai pas reçu d'email, SMS, OTP ou message WhatsApp de vérification. Que dois-je faire ?",
      content:
        "Vérifiez votre dossier spam ou courrier indésirable et confirmez que le numéro de téléphone ou l'adresse email fourni est correct. Si le message n'arrive toujours pas, contactez le support avec votre référence de paiement, le nom du service et le numéro de téléphone ou l'email utilisé.",
    },
    {
      key: "10",
      title: "J'ai payé mais je n'ai pas reçu de résultat. Que dois-je faire ?",
      content:
        "Contactez le support avec la référence de paiement, le montant payé, le service sélectionné, le pays et l'email ou le numéro de téléphone utilisé. L'équipe de support peut retracer le paiement et confirmer si la demande de vérification a été complétée, est en attente, a échoué ou nécessite un remboursement/une nouvelle tentative.",
    },
  ],
  matrixRows: [
    "Carte Nationale d'Identité (NNI) : Numéro NNI ; détails justificatifs si nécessaires. Consentement requis lorsque des données personnelles sont renvoyées. Résultat typique : statut d'identité et champs d'identité autorisés.",
    "Carte de Résident : Numéro de carte de résident ; consentement requis. Consentement requis lorsque des données personnelles sont renvoyées. Résultat typique : statut et validité du titre de séjour.",
    "Vérification VIN : VIN à 17 caractères. Consentement généralement non requis pour les données non personnelles/de l'historique public du véhicule. Résultat typique : champs d'historique du véhicule disponibles à partir des sources VIN.",
    "La disponibilité du service dépend de la connectivité en direct des sources de données et de la disponibilité du fournisseur. Lorsqu'une source n'est pas disponible, e-citoyen.africa peut renvoyer un statut en attente, échoué ou indisponible plutôt qu'un résultat.",
  ],
  countryGroups: [
    {
      key: "1",
      title: "Vérification de la Carte Nationale d'Identité (NNI)",
      items: [
        {
          key: "1",
          title:
            "Qu'est-ce que la vérification de la Carte Nationale d'Identité (NNI) ?",
          content:
            "La vérification de la Carte Nationale d'Identité (NNI) permet de confirmer qu'un numéro d'identité ou les détails d'une carte correspondent aux registres détenus par la source de données d'identité nationale compétente, lorsque la source est disponible via e-citoyen.africa.",
        },
        {
          key: "2",
          title:
            "Quelles informations sont nécessaires pour la vérification NNI ?",
          content:
            "Vous aurez normalement besoin du numéro NNI. Selon le fournisseur de données, des détails justificatifs tels que le nom, la date de naissance, le numéro de téléphone ou les informations de consentement peuvent également être demandés.",
        },
        {
          key: "3",
          title: "Quelles informations le résultat peut-il fournir ?",
          content:
            "Le résultat peut confirmer le statut d'identité et renvoyer les détails disponibles tels que les noms, le sexe, la date de naissance, la photographie ou les indicateurs de correspondance, ainsi que d'autres champs autorisés par la source de données.",
        },
        {
          key: "4",
          title: "Le consentement est-il requis ?",
          content:
            "Oui. Lorsque des informations d'identité personnelle sont renvoyées, un consentement ou une autre base légale est requis avant que le résultat ne soit affiché à un tiers.",
        },
      ],
    },
    {
      key: "2",
      title: "Vérification de la Carte de Résident",
      items: [
        {
          key: "1",
          title: "Qu'est-ce que la vérification de la Carte de Résident ?",
          content:
            "La vérification de la Carte de Résident permet de confirmer les informations d'identité liées à un titre de séjour délivré aux résidents étrangers en Côte d'Ivoire, lorsque la source de données compétente est disponible.",
        },
        {
          key: "2",
          title: "Quelles informations sont nécessaires ?",
          content:
            "Vous aurez normalement besoin du numéro de la carte de résident. La source de données peut exiger un OTP, SMS, WhatsApp, email ou une autre étape de consentement avant que les données personnelles ne soient publiées.",
        },
        {
          key: "3",
          title: "Quelles informations le résultat peut-il fournir ?",
          content:
            "Le résultat peut confirmer le statut et la validité de la carte, le type de titre de séjour, les informations sur le titulaire et l'adresse enregistrée, selon les champs autorisés par le fournisseur de données.",
        },
        {
          key: "4",
          title: "Le consentement est-il requis ?",
          content:
            "Oui, lorsque des informations personnelles ou d'identité sont renvoyées.",
        },
      ],
    },
    {
      key: "3",
      title: "Rapport d'Historique VIN (Véhicule)",
      items: [
        {
          key: "1",
          title: "Qu'est-ce qu'un rapport d'historique VIN ?",
          content:
            "Un rapport d'historique VIN utilise un numéro d'identification de véhicule (VIN) pour récupérer l'historique disponible d'un véhicule. Il peut être utile avant d'acheter un véhicule d'occasion ou importé.",
        },
        {
          key: "2",
          title: "Quelles informations sont nécessaires ?",
          content:
            "Vous avez besoin du VIN à 17 caractères. Le VIN se trouve généralement sur le tableau de bord, le cadre de la porte, les documents d'immatriculation ou les documents d'achat du véhicule.",
        },
        {
          key: "3",
          title: "Quelles informations un rapport VIN peut-il fournir ?",
          content:
            "Un rapport VIN peut inclure l'historique des accidents, les titres ou registres de sinistre, les informations de kilométrage, les rappels, l'historique des propriétaires, les registres de ventes/enchères, l'historique d'entretien et les indicateurs de vol ou de récupération lorsqu'ils sont disponibles.",
        },
        {
          key: "4",
          title: "Un rapport VIN est-il fiable ?",
          content:
            "Un rapport VIN est utile, mais il peut ne pas contenir tous les événements de l'historique d'un véhicule. Certains registres peuvent être manquants, retardés ou indisponibles auprès des bases de données sources.",
        },
      ],
    },
  ],
  paymentsItems: [
    {
      key: "1",
      title: "Comment les prix et les options de paiement sont-ils affichés ?",
      content:
        "Les passerelles de paiement et les devises peuvent varier selon le marché. Les options disponibles sont affichées lors du paiement.",
    },
    {
      key: "2",
      title: "Un résultat peut-il être vide ou indisponible ?",
      content:
        "La disponibilité du service dépend de la connectivité en direct des sources de données et de la disponibilité du fournisseur. Lorsqu'une source n'est pas disponible, e-citoyen.africa peut renvoyer un statut en attente, échoué ou indisponible plutôt qu'un résultat.",
    },
    {
      key: "3",
      title: "Comment contacter le support ?",
      content: "Support : info@e-raia.com",
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

const FrenchCivFaqPage = () => {
  const { language } = useLocale();
  const content = language === "EN" ? enContent : frContent;
  const { token } = theme.useToken();
  const { bgContainer, text } = token;

  const items = [
    {
      key: "1",
      title: content.sections.general,
      content: renderQAGroup(content.generalItems),
    },
    // {
    //   key: "2",
    //   title: content.sections.matrix,
    //   content: (
    //     <div>
    //       {content.matrixRows.map((row, idx) => (
    //         <p key={idx}>{row}</p>
    //       ))}
    //     </div>
    //   ),
    // },
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

export default FrenchCivFaqPage;
