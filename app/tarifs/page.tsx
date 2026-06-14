import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { METIERS } from "@/lib/constants";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Tarifs Indicatifs — Électricité, Plomberie, Chauffage, Clim, PAC, VMC",
  description:
    "Consultez nos tarifs indicatifs pour l'électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation. Devis personnalisé gratuit sous 24h.",
};

const METIER_ICONS: Record<string, LucideIcon> = {
  electricite: Zap, plomberie: Droplets, chauffage: Flame,
  climatisation: Snowflake, pac: Thermometer, ventilation: Wind,
};

const TARIFS_DATA = [
  {
    metier: "electricite",
    prestations: [
      { label: "Diagnostic électrique complet", price: "À partir de 90 €" },
      { label: "Remplacement tableau électrique", price: "600 € — 1 500 €" },
      { label: "Mise en conformité NF C 15-100", price: "1 500 € — 5 000 €" },
      { label: "Installation prise / interrupteur", price: "80 € — 150 €" },
      { label: "Borne recharge véhicule électrique", price: "800 € — 1 800 €" },
    ],
  },
  {
    metier: "plomberie",
    prestations: [
      { label: "Dépannage fuite urgence", price: "À partir de 100 €" },
      { label: "Débouchage canalisation", price: "120 € — 300 €" },
      { label: "Remplacement chauffe-eau électrique", price: "400 € — 900 €" },
      { label: "Chauffe-eau thermodynamique", price: "1 200 € — 2 500 €" },
      { label: "Rénovation salle de bain", price: "3 000 € — 12 000 €" },
    ],
  },
  {
    metier: "chauffage",
    prestations: [
      { label: "Entretien annuel chaudière gaz", price: "120 € — 200 €" },
      { label: "Installation chaudière à condensation", price: "2 500 € — 5 000 €" },
      { label: "Dépannage panne chauffage", price: "À partir de 100 €" },
      { label: "Remplacement radiateur", price: "200 € — 500 €" },
      { label: "Plancher chauffant (par m²)", price: "50 € — 120 €/m²" },
    ],
  },
  {
    metier: "climatisation",
    prestations: [
      { label: "Installation split mural mono", price: "1 200 € — 2 500 €" },
      { label: "Système bi-split (2 unités)", price: "2 500 € — 4 500 €" },
      { label: "Multi-split (3 à 5 unités)", price: "4 000 € — 8 000 €" },
      { label: "Entretien annuel climatisation", price: "100 € — 200 €" },
      { label: "Dépannage panne clim", price: "À partir de 120 €" },
    ],
  },
  {
    metier: "pac",
    prestations: [
      { label: "PAC air-air 3,5 kW", price: "1 800 € — 3 500 €" },
      { label: "PAC air-eau 8 kW (100m²)", price: "8 000 € — 14 000 €" },
      { label: "PAC air-eau 12 kW (150m²)", price: "10 000 € — 18 000 €" },
      { label: "Entretien annuel PAC", price: "120 € — 250 €" },
      { label: "MaPrimeRénov' possible", price: "Jusqu'à -65%" },
    ],
  },
  {
    metier: "ventilation",
    prestations: [
      { label: "VMC simple flux (appartement)", price: "800 € — 1 800 €" },
      { label: "VMC hygroréglable", price: "1 200 € — 2 500 €" },
      { label: "VMC double flux (maison)", price: "3 500 € — 7 000 €" },
      { label: "Entretien annuel VMC", price: "80 € — 150 €" },
      { label: "Nettoyage réseau de conduits", price: "200 € — 500 €" },
    ],
  },
];

export default function TarifsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Tarifs indicatifs">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tarifs indicatifs</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Des tarifs transparents pour vous permettre d&apos;anticiper votre budget. Devis personnalisé gratuit.
          </p>
        </div>
      </section>

      {/* Note */}
      <div className="bg-[#e6f6fc] border-b border-[#b3e4f7] py-4">
        <div className="container-custom">
          <p className="text-sm text-[#0878a8] text-center">
            ⚠️ Ces tarifs sont donnés à titre indicatif et peuvent varier selon la complexité du chantier, la région et les matériaux.
            <Link href="/devis" className="font-semibold underline ml-1">Demandez un devis précis et gratuit →</Link>
          </p>
        </div>
      </div>

      {/* Tarifs par métier */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="tarifs-heading">
        <div className="container-custom">
          <h2 id="tarifs-heading" className="sr-only">Tarifs par métier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TARIFS_DATA.map((t) => {
              const metier = METIERS.find((m) => m.id === t.metier)!;
              const Icon = METIER_ICONS[t.metier];
              return (
                <div key={t.metier} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: metier.color + "10" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: metier.color + "20" }}>
                      <Icon className="w-5 h-5" style={{ color: metier.color }} aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-[#0f172a]">{metier.name}</h3>
                    <Link href={metier.slug} className="ml-auto text-xs font-medium hover:underline" style={{ color: metier.color }}>
                      En savoir plus →
                    </Link>
                  </div>
                  <ul className="p-5 space-y-3" role="list">
                    {t.prestations.map((p) => (
                      <li key={p.label} className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: metier.color }} aria-hidden="true" />
                          <span className="text-sm text-[#475569]">{p.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-[#0f172a] shrink-0">{p.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="px-5 pb-5">
                    <Link
                      href="/devis"
                      className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: metier.color }}
                    >
                      Devis {metier.name} gratuit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
