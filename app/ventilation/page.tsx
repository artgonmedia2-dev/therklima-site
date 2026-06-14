import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "VMC & Ventilation Paris & Île-de-France — VMC Simple Flux, Double Flux",
  description:
    "Therklima, installateur VMC à Paris. Pose VMC simple flux, double flux, hygroréglable. Entretien et dépannage ventilation. Qualité d'air garantie. Devis gratuit.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ventilation VMC",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Installation et entretien de systèmes VMC simple flux et double flux.",
};

export default function VentilationPage() {
  return (
    <MetierPage
      id="ventilation"
      name="Ventilation"
      color="#9c27b0"
      icon="Wind"
      description="Installation VMC simple flux et double flux pour une qualité d'air optimale. Entretien et nettoyage de VMC, dépannage. Indispensable pour éviter humidité et moisissures."
      longDescription="Une bonne ventilation est essentielle pour la qualité de l'air intérieur et la santé des occupants. La réglementation impose l'installation d'une VMC dans tout logement. Nos techniciens installent et entretiennent tous types de VMC : simple flux autoréglable ou hygroréglable, double flux avec récupération de chaleur. Économies d'énergie et confort sont au rendez-vous."
      prestations={[
        "VMC simple flux autoréglable",
        "VMC simple flux hygroréglable A et B",
        "VMC double flux avec échangeur thermique",
        "VMC double flux hygroréglable",
        "Installation VMC dans logement existant",
        "Remplacement VMC défectueuse",
        "Entretien et nettoyage VMC",
        "Dépannage VMC en panne",
        "Vérification débit d'extraction",
        "Pose bouches d'extraction",
        "Réseau de conduits VMC",
        "VMC tertiaire / ERP",
      ]}
      avantages={[
        "Techniciens formés aux réglementations RT 2020 et RE 2020",
        "VMC dimensionnée selon la surface et le nombre de pièces",
        "Marques reconnues : Aldes, Atlantic, Zehnder, Brink",
        "VMC double flux : récupération jusqu'à 90% de la chaleur",
        "Entretien préventif pour éviter pannes et moisissures",
        "Interventions propres et soignées",
        "Conformité réglementaire RT et DTU 68",
      ]}
      faq={FAQ_BY_METIER.ventilation}
      tarifs={[
        { label: "VMC simple flux (appartement)", price: "800 € — 1 800 €" },
        { label: "VMC simple flux hygroréglable", price: "1 200 € — 2 500 €" },
        { label: "VMC double flux (maison)", price: "3 500 € — 7 000 €" },
        { label: "Entretien annuel VMC", price: "80 € — 150 €" },
        { label: "Nettoyage réseau de conduits", price: "200 € — 500 €" },
        { label: "Dépannage VMC", price: "À partir de 90 €" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
