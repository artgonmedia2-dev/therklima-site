import { METIER_META, type BlogArticle, type BlogArticleSource } from "./blog-types";
import prixVmcDoubleFlux from "./articles/prix-vmc-double-flux";
import diagnosticElectriqueVenteLocation from "./articles/diagnostic-electrique-vente-location";
import pompeAChaleurAppartementParis from "./articles/pompe-a-chaleur-appartement-paris";
import climatisationReversibleOuPompeAChaleurAirAir from "./articles/climatisation-reversible-ou-pompe-a-chaleur-air-air";
import climatisationCoproprieteParis from "./articles/climatisation-copropriete-paris";
import entretienClimatisationPompeAChaleurObligatoire from "./articles/entretien-climatisation-pompe-a-chaleur-obligatoire";
import prixChangementTableauElectrique from "./articles/prix-changement-tableau-electrique";
import entretienChaudiereObligatoire from "./articles/entretien-chaudiere-obligatoire";
import fuiteEauQueFaire from "./articles/fuite-eau-que-faire";
import chauffeEauNeChauffePlus from "./articles/chauffe-eau-ne-chauffe-plus";

const LEGACY_ARTICLES: BlogArticleSource[] = [
  {
    slug: "guide-pac-2026",
    title: "Guide complet : Pompe à Chaleur 2026 — Aides, Installation & Économies",
    excerpt: "Tout ce que vous devez savoir sur les pompes à chaleur en 2026 : types, coûts, aides MaPrimeRénov', CEE et retour sur investissement.",
    metier: "pac",
    date: "2026-05-15",
    updated: "2026-10-01",
    image: "/blog/pac-guide.jpeg",
    alt: "Pompe à chaleur air-eau installée à l'extérieur d'une maison",
    content: `
# Guide complet : Pompe à Chaleur 2026

## Qu'est-ce qu'une pompe à chaleur ?

Une pompe à chaleur (PAC) est un système de chauffage et/ou de refroidissement qui puise l'énergie dans l'air extérieur, le sol ou l'eau pour la transférer dans votre logement. C'est l'une des solutions les plus efficaces sur le marché.

## Les types de PAC

### PAC air-air
Produit uniquement du chauffage/rafraîchissement via des unités intérieures (splits). Idéale pour les logements déjà équipés en radiateurs électriques.

### PAC air-eau
Produit de l'eau chaude pour alimenter les radiateurs existants ET l'eau chaude sanitaire. C'est le meilleur choix pour remplacer une chaudière.

## Les aides en 2026

- **MaPrimeRénov'** : montant variable selon vos revenus et l'équipement (PAC air-eau notamment)
- **CEE** : primes versées par les fournisseurs d'énergie, cumulables sous conditions
- **Éco-PTZ** : prêt à taux zéro pour financer le reste à charge

Les barèmes changent chaque année : vérifiez votre éligibilité sur [france-renov.gouv.fr](https://france-renov.gouv.fr). Pour en bénéficier, l'installation doit être réalisée par un artisan RGE.

## Rentabilité

Une PAC air-eau consomme 3 à 4x moins d'électricité qu'une chaudière électrique. Retour sur investissement typique : 5 à 8 ans.
    `,
    keywords: ["pompe à chaleur 2026", "PAC air-eau", "PAC air-air", "aides pompe à chaleur"],
    tags: ["PAC", "MaPrimeRénov", "Économies d'énergie", "Rénovation"],
  },
  {
    slug: "conformite-electrique-norme-c15100",
    title: "Mise en conformité électrique : tout comprendre sur la norme NF C 15-100",
    excerpt: "La norme NF C 15-100 régit toutes les installations électriques résidentielles en France. Découvrez ce qu'elle impose et comment se mettre en conformité.",
    metier: "electricite",
    date: "2026-04-20",
    updated: "2026-10-01",
    image: "/blog/elec-norme.jpeg",
    alt: "Tableau électrique avec disjoncteurs différentiels modernes",
    content: `
# Conformité électrique : la norme NF C 15-100

## Pourquoi se mettre en conformité ?

Une installation électrique vétuste représente un risque d'incendie ou d'électrocution. La norme NF C 15-100 protège les occupants et est exigée lors de la vente d'un bien immobilier.

## Ce que la norme impose

- Protection de tous les circuits par des interrupteurs différentiels 30 mA
- Mise à la terre de toutes les prises
- Liaisons équipotentielles dans les salles d'eau
- Circuit dédié pour les gros électroménagers

## Quand se mettre en conformité ?

- Installation de plus de 15 ans
- Achat ou vente d'un logement
- Travaux de rénovation
- Pannes ou disjonctions fréquentes

## Coût moyen

De 2 025 € à 6 750 € selon l'état de l'installation et la surface (voir [nos tarifs](/tarifs)). Avant une vente ou une location, lisez aussi notre article sur le [diagnostic électrique obligatoire](/blog/diagnostic-electrique-vente-location).
    `,
    keywords: ["norme NF C 15-100", "mise en conformité électrique", "installation électrique vétuste"],
    tags: ["Électricité", "NF C 15-100", "Conformité", "Sécurité"],
  },
  {
    slug: "vmc-double-flux-avantages",
    title: "VMC Double Flux : pourquoi c'est la meilleure solution pour votre maison",
    excerpt: "La VMC double flux améliore la qualité de l'air tout en récupérant la chaleur. Découvrez ses avantages, son coût et ses économies.",
    metier: "ventilation",
    date: "2026-03-10",
    updated: "2026-10-01",
    content: `
# VMC Double Flux : tout ce qu'il faut savoir

## Principe de fonctionnement

La VMC double flux extrait l'air vicié de votre logement et insuffle de l'air frais filtré. Son échangeur thermique récupère jusqu'à 90% de la chaleur de l'air extrait.

## Avantages

- **Qualité de l'air** : filtrage des particules, pollens, allergènes
- **Économies** : jusqu'à 30% sur la facture de chauffage
- **Confort** : température homogène, pas de courants d'air
- **Silence** : moteurs à très faible bruit

## Entretien

- Nettoyage des filtres : tous les 3 à 6 mois
- Entretien annuel recommandé par un professionnel

## Coût d'installation

De 4 725 € à 9 450 € fourni et posé pour une maison, selon la surface et le réseau de gaines (voir [nos tarifs](/tarifs) et notre [guide des prix de la VMC double flux](/blog/prix-vmc-double-flux)).
    `,
    keywords: ["VMC double flux avantages", "VMC double flux", "qualité de l'air intérieur"],
    tags: ["VMC", "Ventilation", "Qualité d'air", "Économies"],
  },
];

const SOURCES: BlogArticleSource[] = [
  prixVmcDoubleFlux,
  diagnosticElectriqueVenteLocation,
  pompeAChaleurAppartementParis,
  climatisationReversibleOuPompeAChaleurAirAir,
  climatisationCoproprieteParis,
  entretienClimatisationPompeAChaleurObligatoire,
  prixChangementTableauElectrique,
  entretienChaudiereObligatoire,
  fuiteEauQueFaire,
  chauffeEauNeChauffePlus,
  ...LEGACY_ARTICLES,
];

function readTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.round(words / 200))} min`;
}

/** Newest first. */
export const BLOG_ARTICLES: BlogArticle[] = SOURCES.map((a) => ({
  ...a,
  metierName: METIER_META[a.metier].name,
  metierColor: METIER_META[a.metier].color,
  readTime: readTime(a.content),
})).sort((a, b) => b.date.localeCompare(a.date));
