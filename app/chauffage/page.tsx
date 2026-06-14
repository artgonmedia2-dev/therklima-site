import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chauffagiste Paris & Île-de-France — Chaudière, Radiateurs, Plancher Chauffant",
  description:
    "Therklima, chauffagiste certifié RGE à Paris. Installation et entretien de chaudières, radiateurs, planchers chauffants. Dépannage chauffage 24h/24. Devis gratuit.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Chauffage",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Installation, entretien et dépannage de systèmes de chauffage par des chauffagistes certifiés.",
};

export default function ChauffagePage() {
  return (
    <MetierPage
      id="chauffage"
      name="Chauffage"
      color="#f44336"
      icon="Flame"
      description="Installation de chaudières, radiateurs et planchers chauffants. Entretien annuel obligatoire et dépannage d'urgence. Chauffagistes certifiés RGE sur Paris et Île-de-France."
      longDescription="Un système de chauffage performant est essentiel au confort de votre logement. Nos chauffagistes certifiés RGE installent et entretiennent tous types de systèmes : chaudières gaz à condensation, chaudières fioul, planchers chauffants hydrauliques et électriques, radiateurs. Nous assurons également l'entretien annuel obligatoire de votre chaudière."
      prestations={[
        "Installation chaudière gaz à condensation",
        "Remplacement chaudière fioul / gaz",
        "Entretien annuel chaudière (obligatoire)",
        "Plancher chauffant hydraulique",
        "Plancher chauffant électrique",
        "Pose radiateurs acier / aluminium",
        "Dépannage panne chaudière",
        "Équilibrage circuit chauffage",
        "Désembouage installation",
        "Thermostat intelligent / programmable",
        "Vase d'expansion / soupape",
        "Contrat entretien annuel",
      ]}
      avantages={[
        "Chauffagistes certifiés Qualigaz et RGE",
        "Entretien annuel conforme à la réglementation",
        "Conseils sur les aides financières (MaPrimeRénov')",
        "Dépannage d'urgence panne de chauffage 24h/24",
        "Garantie constructeur + garantie main d'œuvre",
        "Contrats d'entretien annuels attractifs",
        "Partenariat avec les grandes marques (Viessmann, Vaillant, De Dietrich)",
      ]}
      faq={FAQ_BY_METIER.chauffage}
      tarifs={[
        { label: "Entretien annuel chaudière gaz", price: "120 € — 200 €" },
        { label: "Installation chaudière à condensation", price: "2 500 € — 5 000 €" },
        { label: "Dépannage panne chauffage", price: "À partir de 100 €" },
        { label: "Remplacement radiateur", price: "200 € — 500 €" },
        { label: "Plancher chauffant (par m²)", price: "50 € — 120 €/m²" },
        { label: "Désembouage installation", price: "400 € — 800 €" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
