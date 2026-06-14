import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Climatisation Paris & Île-de-France — Split, Gainable, Multi-split",
  description:
    "Therklima, installateur climatisation à Paris. Pose split mural, gainable, multi-split. Entretien et dépannage clim. Devis gratuit. Certifié RGE.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Climatisation",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Installation, entretien et dépannage de systèmes de climatisation.",
};

export default function ClimatisationPage() {
  return (
    <MetierPage
      id="climatisation"
      name="Climatisation"
      color="#00bcd4"
      icon="Snowflake"
      description="Installation de climatisation split mural, gainable et multi-split. Entretien annuel et dépannage. Climatiseurs réversibles pour chauffer et rafraîchir votre logement."
      longDescription="La climatisation réversible est la solution idéale pour maintenir un confort optimal toute l'année : fraîcheur en été, chaleur d'appoint en hiver. Nos techniciens certifiés installent, entretiennent et réparent tous types de systèmes de climatisation : splits muraux, systèmes gainables, multi-splits. Nous intervenons chez les particuliers et les professionnels."
      prestations={[
        "Installation split mural réversible",
        "Climatisation gainable (conduits)",
        "Système multi-split (plusieurs pièces)",
        "Climatisation mobile / monobloc",
        "Entretien annuel clim (obligatoire > 2kW)",
        "Dépannage panne climatiseur",
        "Recharge gaz frigorigène",
        "Remplacement unité extérieure",
        "Nettoyage filtres et échangeurs",
        "Climatisation bureau / commerce",
        "Contrôle connecté via smartphone",
        "Garantie pièces et installation",
      ]}
      avantages={[
        "Techniciens certifiés manipulation fluides frigorigènes",
        "Marques premium : Daikin, Mitsubishi, Atlantic, Toshiba",
        "Dimensionnement précis selon surface et exposition",
        "Installation propre et soignée (câblage encastré si souhaité)",
        "Entretien annuel conforme à la réglementation",
        "Garantie constructeur jusqu'à 5 ans",
        "Conseils sur les économies d'énergie et label A+++",
      ]}
      faq={FAQ_BY_METIER.climatisation}
      tarifs={[
        { label: "Installation split mural mono", price: "1 200 € — 2 500 €" },
        { label: "Système bi-split (2 unités)", price: "2 500 € — 4 500 €" },
        { label: "Multi-split (3 à 5 unités)", price: "4 000 € — 8 000 €" },
        { label: "Climatisation gainable", price: "5 000 € — 12 000 €" },
        { label: "Entretien annuel climatisation", price: "100 € — 200 €" },
        { label: "Dépannage panne clim", price: "À partir de 120 €" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
