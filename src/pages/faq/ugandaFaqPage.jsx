import React from "react";
import { Container, InfoSec, DynamicCollapse } from "../../globalStyles";
import { Card, Collapse, Typography } from "antd";
import { theme } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

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
      title: "Mon résultat de vérification est-il sauvegardé sur e-citoyen.africa ?",
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
          title: "Qu'est-ce que la vérification de la Carte Nationale d'Identité (NNI) ?",
          content:
            "La vérification de la Carte Nationale d'Identité (NNI) permet de confirmer qu'un numéro d'identité ou les détails d'une carte correspondent aux registres détenus par la source de données d'identité nationale compétente, lorsque la source est disponible via e-citoyen.africa.",
        },
        {
          key: "2",
          title: "Quelles informations sont nécessaires pour la vérification NNI ?",
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
  const content = frContent;
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

export default FrenchCivFaqPage;
