import Image from "next/image";

const QUALIFICATIONS = [
  { src: "/qualifs/qualifelec-rge.png", alt: "Qualifelec — Reconnu Garant de l'Environnement", label: "Qualifelec RGE" },
  { src: "/qualifs/rge-qualipac.png", alt: "RGE Quali'Pac — Qualification pompe à chaleur", label: "RGE Quali'Pac" },
  { src: "/qualifs/rge-chauffage-plus.png", alt: "RGE Chauffage+ — Qualification chauffage", label: "RGE Chauffage+" },
  { src: "/qualifs/rge-qualisol.png", alt: "RGE Quali'Sol — Qualification énergie solaire", label: "RGE Quali'Sol" },
  { src: "/qualifs/rge-qualibois.png", alt: "RGE Quali'Bois — Qualification bois énergie", label: "RGE Quali'Bois" },
  { src: "/qualifs/rge-ventilation-plus.png", alt: "RGE Ventilation+ — Qualification ventilation", label: "RGE Ventilation+" },
  { src: "/qualigaz.webp", alt: "Qualigaz — Professionnel du Gaz Installation & Maintenance", label: "Qualigaz PG" },
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
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
