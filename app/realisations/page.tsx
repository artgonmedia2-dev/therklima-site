import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { REALISATIONS } from "@/lib/data/realisations";
import { MapPin, Ruler, Clock } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Nos Réalisations — Portfolio Électricité, Plomberie, Chauffage, Clim, PAC, VMC",
  description:
    "Découvrez nos réalisations en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation. 6 projets référencés sur Paris et Île-de-France.",
};

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Nos réalisations">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Réalisations</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Découvrez nos projets récents — 10 réalisations en électricité, plomberie, chauffage, PAC et ventilation sur Paris et Île-de-France.
          </p>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="realisations-heading">
        <div className="container-custom">
          <h2 id="realisations-heading" className="sr-only">Portfolio de réalisations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REALISATIONS.map((r) => (
              <article key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold shadow-sm"
                    style={{ backgroundColor: r.metierColor }}
                  >
                    {r.metierName}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#0f172a] mb-2">{r.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">{r.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {r.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5" aria-hidden="true" /> {r.surface}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {r.duration}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#475569] mb-4">Vous avez un projet similaire ?</p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
