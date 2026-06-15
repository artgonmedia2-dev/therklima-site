import Image from "next/image";
import { CheckCircle2, Flame, ShieldCheck } from "lucide-react";

const QUALIFICATIONS = [
  { src: "/qualifs/qualifelec-rge.png", alt: "Qualifelec — Reconnu Garant de l'Environnement", label: "Qualifelec RGE" },
  { src: "/qualifs/rge-qualipac.png", alt: "RGE Quali'Pac — Qualification pompe à chaleur", label: "RGE Quali'Pac" },
  { src: "/qualifs/rge-chauffage-plus.png", alt: "RGE Chauffage+ — Qualification chauffage", label: "RGE Chauffage+" },
  { src: "/qualifs/rge-qualisol.png", alt: "RGE Quali'Sol — Qualification énergie solaire", label: "RGE Quali'Sol" },
  { src: "/qualifs/rge-qualibois.png", alt: "RGE Quali'Bois — Qualification bois énergie", label: "RGE Quali'Bois" },
  { src: "/qualifs/rge-ventilation-plus.png", alt: "RGE Ventilation+ — Qualification ventilation", label: "RGE Ventilation+" },
];

const PARTENAIRES_ELEC = [
  { src: "/partenaires-elec/hager.png", alt: "Hager — Partenaire électricité", label: "Hager" },
  { src: "/partenaires-elec/schneider.png", alt: "Schneider Electric — Partenaire électricité", label: "Schneider Electric" },
  { src: "/partenaires-elec/legrand.png", alt: "Legrand — Partenaire électricité", label: "Legrand" },
];

const PARTENAIRES_CLIMA = [
  { src: "/partenaires-clima/daikin.png", alt: "Daikin — Partenaire climatisation", label: "Daikin" },
  { src: "/partenaires-clima/mitsubishi.png", alt: "Mitsubishi — Partenaire climatisation", label: "Mitsubishi" },
  { src: "/partenaires-clima/panasonic.png", alt: "Panasonic — Partenaire climatisation", label: "Panasonic" },
];

export default function PartnersSection() {
  return (
    <section className="section-padding bg-[#f8fafc]" aria-label="Qualifications et partenaires">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-xs font-semibold rounded-full uppercase tracking-wide mb-3">
            Certifications & Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
            Des garanties qui font la différence
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto text-base">
            Nos certifications RGE vous permettent de bénéficier des aides de l&apos;État. Nous travaillons avec les meilleures marques du marché.
          </p>
        </div>

        {/* Qualifications RGE */}
        <div className="mb-14">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[#0da2e1] mb-6 text-center">
            Nos Qualifications RGE
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {QUALIFICATIONS.map((q) => (
              <div
                key={q.src}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-[#0da2e1]/20 transition-all duration-200 group"
              >
                <div className="relative w-full h-16">
                  <Image
                    src={q.src}
                    alt={q.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 150px"
                  />
                </div>
                <span className="text-xs text-center text-[#64748b] font-medium leading-tight group-hover:text-[#0da2e1] transition-colors">
                  {q.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires — deux colonnes */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Partenaires Électricité */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#ff8c00]" aria-hidden="true" />
              <h3 className="text-base font-bold text-[#0f172a]">Partenaires Électricité</h3>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {PARTENAIRES_ELEC.map((p) => (
                <div
                  key={p.src}
                  className="relative h-14 w-32 transition-all duration-300"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partenaires Climatisation */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#00bcd4]" aria-hidden="true" />
              <h3 className="text-base font-bold text-[#0f172a]">Partenaires Climatisation</h3>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {PARTENAIRES_CLIMA.map((p) => (
                <div
                  key={p.src}
                  className="relative h-14 w-32 flex items-center justify-center transition-all duration-300"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Qualigaz — Partenaire Agréé Gaz (featured card) */}
        <div className="mt-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0a00] via-[#3d1a00] to-[#6b2f00] shadow-xl">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-[#ff8c00]/10 pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#ff8c00]/8 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left — badge + logo */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff8c00]/20 border border-[#ff8c00]/30 text-[#ffb347] text-xs font-semibold uppercase tracking-wide">
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                Partenaire Agréé Gaz
              </span>
              <div className="bg-white rounded-2xl shadow-lg p-4 w-44 h-24 relative">
                <Image
                  src="/qualigaz.webp"
                  alt="Professionnel du Gaz — Installation & Maintenance"
                  fill
                  className="object-contain p-2"
                  sizes="176px"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-28 bg-white/10 shrink-0" aria-hidden="true" />

            {/* Right — content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Professionnel du Gaz — Installation &amp; Maintenance
              </h3>
              <p className="text-[#ffd6a0] text-sm leading-relaxed mb-5 max-w-lg">
                Therklima est partenaire agréé <strong className="text-white">PG</strong>, garantissant des installations
                et maintenances gaz conformes aux normes de sécurité en vigueur.
              </p>
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-6">
                {[
                  "Installations conformes DTU 61.1",
                  "Sécurité gaz certifiée",
                  "Dépannage & entretien chaudières",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff8c00] shrink-0" aria-hidden="true" />
                    <span className="text-sm text-[#ffd6a0]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right corner badge */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#ff8c00]/20 border border-[#ff8c00]/30 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#ff8c00]" aria-hidden="true" />
              </div>
              <span className="text-xs text-[#ffb347] mt-2 font-semibold text-center leading-tight">Agréé<br />Qualigaz</span>
            </div>
          </div>
        </div>

        {/* Badge RGE info */}
        <div className="mt-10 bg-gradient-to-r from-[#0da2e1]/10 to-[#0da2e1]/5 border border-[#0da2e1]/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#0da2e1] flex items-center justify-center shrink-0 text-white text-xl font-extrabold">
            RGE
          </div>
          <div>
            <p className="font-semibold text-[#0f172a] text-sm">Certification Reconnue Garant de l&apos;Environnement</p>
            <p className="text-[#64748b] text-xs mt-0.5">
              Notre label RGE vous ouvre droit aux aides de l&apos;État : MaPrimeRénov&apos;, CEE, éco-prêt à taux zéro. Économisez jusqu&apos;à 70% sur vos travaux.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
