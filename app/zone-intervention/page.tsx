import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Zone d'Intervention — Paris et Île-de-France",
  description:
    "Therklima intervient sur Paris et toute l'Île-de-France : 75, 92, 93, 94, 78, 91, 95. Électricité, plomberie, chauffage, climatisation, PAC et ventilation.",
};

const DEPARTMENTS = [
  { code: "75", name: "Paris", villes: ["Paris 1er", "Paris 2e", "Paris 8e", "Paris 16e", "Paris 17e", "Paris 18e"] },
  { code: "92", name: "Hauts-de-Seine", villes: ["Neuilly-sur-Seine", "Boulogne-Billancourt", "Levallois-Perret", "Courbevoie", "Puteaux", "Nanterre", "Issy-les-Moulineaux"] },
  { code: "93", name: "Seine-Saint-Denis", villes: ["Saint-Denis", "Montreuil", "Aubervilliers", "Noisy-le-Grand", "Bondy"] },
  { code: "94", name: "Val-de-Marne", villes: ["Créteil", "Vincennes", "Maisons-Alfort", "Ivry-sur-Seine", "Vitry-sur-Seine"] },
  { code: "78", name: "Yvelines", villes: ["Versailles", "Saint-Germain-en-Laye", "Mantes-la-Jolie", "Poissy", "Conflans-Sainte-Honorine"] },
  { code: "91", name: "Essonne", villes: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Massy", "Palaiseau", "Gif-sur-Yvette"] },
  { code: "95", name: "Val-d'Oise", villes: ["Cergy", "Pontoise", "Argenteuil", "Sarcelles", "Enghien-les-Bains"] },
  { code: "77", name: "Seine-et-Marne", villes: ["Meaux", "Chelles", "Melun", "Fontainebleau", "Montereau-Fault-Yonne"] },
];

export default function ZoneInterventionPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Zone d'intervention">
        <div className="container-custom text-center">
          <div className="w-16 h-16 rounded-full bg-[#0da2e1]/20 border border-[#0da2e1]/30 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-[#0da2e1]" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Zone d&apos;Intervention</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Therklima intervient sur Paris et toute l&apos;Île-de-France. Urgences en moins d&apos;1 heure, travaux planifiés sous 48h.
          </p>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="zone-heading">
        <div className="container-custom">
          <h2 id="zone-heading" className="text-3xl font-bold text-[#0f172a] mb-8 text-center">
            Départements couverts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.code} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#e6f6fc] text-[#0da2e1] text-xs font-bold rounded-lg">{dept.code}</span>
                  <h3 className="font-bold text-[#0f172a]">{dept.name}</h3>
                </div>
                <ul className="space-y-1.5" role="list">
                  {dept.villes.map((v) => (
                    <li key={v} className="flex items-center gap-1.5 text-sm text-[#475569]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0da2e1] shrink-0" aria-hidden="true" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-[#e6f6fc] rounded-2xl border border-[#0da2e1]/20 p-6 text-center max-w-2xl mx-auto">
            <p className="text-[#0878a8] font-semibold mb-2">Vous ne trouvez pas votre ville ?</p>
            <p className="text-sm text-[#475569] mb-4">Contactez-nous pour vérifier si nous intervenons dans votre secteur. Notre zone s&apos;étend au-delà de l&apos;Île-de-France pour certains projets.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors text-sm">
              Vérifier ma zone
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
