import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pompe à Chaleur Paris & Île-de-France — PAC air-air, air-eau, MaPrimeRénov'",
  description:
    "Therklima, installateur RGE QualiPac à Paris. Installation pompe à chaleur air-air et air-eau. Éligible MaPrimeRénov' et CEE. Devis gratuit avec simulation d'aides.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pompe à Chaleur",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Installation et entretien de pompes à chaleur air-air et air-eau. Certifié RGE QualiPac.",
};

export default function PACPage() {
  return (
    <MetierPage
      id="pac"
      name="Pompe à Chaleur"
      color="#4caf50"
      icon="Thermometer"
      description="Installation de pompes à chaleur air-air et air-eau. Éligible MaPrimeRénov' et CEE. Nos installateurs RGE QualiPac vous accompagnent de A à Z, y compris dans vos démarches d'aides financières."
      longDescription="La pompe à chaleur est la solution de chauffage la plus performante et écologique du marché. Elle consomme 3 à 4 fois moins d'énergie qu'une chaudière électrique classique. Therklima, certifié RGE QualiPac, vous installe la PAC adaptée à votre logement et vous accompagne dans toutes vos démarches pour obtenir MaPrimeRénov' et les CEE."
      prestations={[
        "PAC air-air (chauffage + rafraîchissement)",
        "PAC air-eau (chauffage + eau chaude sanitaire)",
        "Remplacement chaudière par PAC",
        "PAC géothermique (sol-eau)",
        "Entretien annuel PAC",
        "Dépannage panne PAC",
        "Ballon tampon / hydraulique",
        "Intégration avec plancher chauffant",
        "Pilotage connecté via application",
        "Dossier MaPrimeRénov'",
        "Simulation économies d'énergie",
        "Bilan thermique avant installation",
      ]}
      avantages={[
        "Certifié RGE QualiPac — condition pour MaPrimeRénov'",
        "Jusqu'à 65% d'aides financières selon vos revenus",
        "COP (Coefficient de Performance) > 3 garanti",
        "Marques premium : Daikin, Mitsubishi, Viessmann, Atlantic",
        "Bilan thermique offert pour dimensionner correctement",
        "Accompagnement complet dans les démarches administratives",
        "Garantie constructeur + garantie décennale",
      ]}
      faq={FAQ_BY_METIER.pac}
      tarifs={[
        { label: "PAC air-air 3,5 kW (1 pièce)", price: "1 800 € — 3 500 €" },
        { label: "PAC air-eau 8 kW (maison 100m²)", price: "8 000 € — 14 000 €" },
        { label: "PAC air-eau 12 kW (maison 150m²)", price: "10 000 € — 18 000 €" },
        { label: "PAC géothermique", price: "15 000 € — 25 000 €" },
        { label: "Entretien annuel PAC", price: "120 € — 250 €" },
        { label: "MaPrimeRénov' possible", price: "jusqu'à -65%" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
