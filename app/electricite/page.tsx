import type { Metadata } from "next";
import MetierPage from "@/components/shared/MetierPage";
import { FAQ_BY_METIER } from "@/lib/data/faq";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Électricien Paris & Île-de-France — Installation, Rénovation, Dépannage",
  description:
    "Therklima, électricien certifié Qualifelec à Paris et Île-de-France. Installation électrique, mise en conformité NF C 15-100, tableau électrique, domotique. Devis gratuit.",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Électricité",
  provider: { "@type": "LocalBusiness", name: "Therklima", url: COMPANY.url },
  areaServed: { "@type": "City", name: "Paris" },
  description: "Installation, rénovation et dépannage électrique par des techniciens Qualifelec certifiés.",
  serviceType: "Électricité bâtiment",
};

export default function ElectricitePage() {
  return (
    <MetierPage
      id="electricite"
      name="Électricité"
      color="#ff8c00"
      icon="Zap"
      description="Installation, rénovation électrique et dépannage d'urgence par nos électriciens certifiés Qualifelec. Intervention rapide 24h/24 sur Paris et Île-de-France."
      longDescription="Nos électriciens qualifiés prennent en charge tous vos travaux électriques, du simple remplacement de prise à la rénovation complète d'une installation. Certifiés Qualifelec, nous garantissons des travaux conformes à la norme NF C 15-100 et à la réglementation en vigueur. Pour les urgences (panne, court-circuit), nous intervenons en moins d'une heure."
      prestations={[
        "Installation électrique neuve",
        "Rénovation complète installation",
        "Tableau électrique / disjoncteur",
        "Mise en conformité NF C 15-100",
        "Dépannage panne électrique",
        "Mise à la terre",
        "Éclairage intérieur/extérieur",
        "Domotique & gestion d'énergie",
        "Interphone & visiophone",
        "Bornes de recharge véhicule",
        "Détecteurs incendie",
        "Volets roulants électriques",
      ]}
      avantages={[
        "Certifiés Qualifelec — standard de qualité reconnu",
        "Conformité NF C 15-100 garantie sur toutes nos installations",
        "Diagnostics électriques complets avant travaux",
        "Matériaux de marques certifiées CE",
        "Garantie décennale sur tous les travaux",
        "Devis détaillé et transparent sous 24h",
        "Intervention d'urgence 24h/24, 7j/7",
      ]}
      faq={FAQ_BY_METIER.electricite}
      tarifs={[
        { label: "Diagnostic électrique", price: "À partir de 90 €" },
        { label: "Remplacement tableau électrique", price: "600 € — 1 500 €" },
        { label: "Mise en conformité NF C 15-100", price: "1 500 € — 5 000 €" },
        { label: "Installation prise / interrupteur", price: "80 € — 150 €" },
        { label: "Dépannage panne urgence", price: "À partir de 120 €" },
        { label: "Borne recharge véhicule électrique", price: "800 € — 1 800 €" },
      ]}
      jsonLd={JSON_LD}
    />
  );
}
