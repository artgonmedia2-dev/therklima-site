import type { Metadata } from "next";
import { Star } from "lucide-react";
import { TESTIMONIALS, STATS } from "@/lib/data/testimonials";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Avis Clients — 4.8/5 sur 156 avis Google",
  description: "Découvrez les avis de nos clients sur nos services d'électricité, plomberie, chauffage, climatisation, PAC et ventilation. Note moyenne 4.8/5 sur 156 avis.",
};

export default function AvisPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Avis clients">
        <div className="container-custom text-center">
          <div className="flex justify-center gap-0.5 mb-4" aria-label="Note 4.8 sur 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-7 h-7 text-yellow-400 fill-yellow-400" aria-hidden="true" />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Avis de nos clients</h1>
          <p className="text-white/70 text-lg">
            <strong className="text-white">4.8/5</strong> de moyenne sur 156 avis Google vérifiés
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#0da2e1]">{stat.value}</p>
                <p className="text-sm text-[#64748b] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avis grid */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="avis-heading">
        <div className="container-custom">
          <h2 id="avis-heading" className="text-3xl font-bold text-[#0f172a] mb-10 text-center">Témoignages clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <article key={t.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3" aria-label={`Note : ${t.rating} sur 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-[#334155] text-sm leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</blockquote>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-[#0da2e1] flex items-center justify-center text-white font-bold text-sm shrink-0" aria-hidden="true">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0f172a]">{t.name}</p>
                    <p className="text-xs text-[#64748b]">{t.city} · <span className="text-[#0da2e1]">{t.metier}</span> · {t.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
