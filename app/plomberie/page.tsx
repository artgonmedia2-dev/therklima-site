import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Plombier Paris & Île-de-France — Fuite, Sanitaire, Chauffe-eau, Urgence",
  description:
    "Therklima, plombier disponible 24h/24 sur Paris et Île-de-France. Réparation fuite, installation sanitaire, chauffe-eau, débouchage. Intervention d'urgence en moins d'1h.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plomberie",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Réparation de fuites, installation sanitaire et dépannage plomberie 24h/24.",
};

export default function PlomberiePage() {
  return (
    <MetierPage
      id="plomberie"
      name="Plomberie"
      color="#2196f3"
      icon="Droplets"
      description="Fuite d'eau, installation sanitaire, chauffe-eau, débouchage. Nos plombiers interviennent en urgence 24h/24 sur Paris et Île-de-France pour tous vos problèmes de plomberie."
      longDescription="Une fuite d'eau peut causer des dégâts importants en quelques heures. Nos plombiers certifiés interviennent rapidement pour stopper les fuites, réparer vos équipements sanitaires et réaliser toutes vos installations de plomberie. Du simple robinet qui goutte à la rénovation complète de votre salle de bain, Therklima vous accompagne."
      prestations={[
        "Réparation fuite d'eau urgente",
        "Installation salle de bain complète",
        "Remplacement chauffe-eau électrique",
        "Installation chauffe-eau thermodynamique",
        "Débouchage canalisation",
        "Remplacement WC / robinetterie",
        "Rénovation plomberie appartement",
        "Détection fuite électronique",
        "Pose douche à l'italienne",
        "Installation baignoire balnéo",
        "Remplacement tuyauterie",
        "Adoucisseur d'eau",
      ]}
      avantages={[
        "Intervention d'urgence en moins d'1 heure pour les fuites",
        "Techniciens formés aux dernières techniques de détection de fuites",
        "Matériaux homologués (cuivre, PER, multicouche)",
        "Devis transparent avant toute intervention",
        "Respect de votre logement (bâches, nettoyage)",
        "Garantie sur les pièces et la main d'œuvre",
        "Conseils pour prévenir les futures fuites",
      ]}
      faq={FAQ_BY_METIER.plomberie}
      tarifs={[
        { label: "Dépannage fuite urgence", price: "À partir de 100 €" },
        { label: "Débouchage canalisation", price: "120 € — 300 €" },
        { label: "Remplacement chauffe-eau électrique", price: "400 € — 900 €" },
        { label: "Chauffe-eau thermodynamique", price: "1 200 € — 2 500 €" },
        { label: "Rénovation salle de bain", price: "3 000 € — 12 000 €" },
        { label: "Remplacement WC", price: "250 € — 500 €" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
