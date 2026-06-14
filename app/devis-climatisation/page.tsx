import type { Metadata } from "next";
import { Snowflake } from "lucide-react";
import DevisClimatisationForm from "@/components/devis/DevisClimatisationForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Demande d'intervention Climatisation — Devis gratuit",
  description:
    "Formulaire de demande d'intervention climatisation : installation, rénovation, dépannage, entretien. Devis personnalisé sous 24h par Therklima, expert climatisation à Paris.",
};

export default function DevisClimatisationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-28 bg-gradient-to-br from-[#0f172a] via-[#003d4d] to-[#006070]" aria-label="Formulaire demande intervention climatisation">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00bcd4]/20 border border-[#00bcd4]/30 rounded-full mb-6">
            <Snowflake className="w-4 h-4 text-[#00bcd4]" aria-hidden="true" />
            <span className="text-[#00bcd4] text-sm font-semibold">Climatisation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Demande d&apos;Intervention
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed">
            Installation, rénovation, dépannage, entretien, maintenance — remplissez le formulaire ci-dessous pour recevoir un devis personnalisé sous 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]" /> Réponse sous 24h
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]" /> Techniciens certifiés RGE
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]" /> Devis gratuit et sans engagement
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-[#f8fafc]" aria-label="Formulaire détaillé demande intervention climatisation">
        <div className="container-custom max-w-3xl">
          {/* Info banner */}
          <div className="bg-[#e0f7fa] border border-[#00bcd4]/30 rounded-2xl p-4 flex items-start gap-3 mb-8">
            <Snowflake className="w-5 h-5 text-[#00bcd4] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-[#006070]">
              <span className="font-semibold">Cliquez sur les options qui vous correspondent.</span>{" "}
              Vous pouvez en sélectionner plusieurs. Plus votre demande est précise, plus notre devis sera rapide et adapté à vos besoins.
            </div>
          </div>

          <DevisClimatisationForm />

          {/* Contact alternatif */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#64748b] mb-2">Besoin d&apos;aide pour remplir ce formulaire ?</p>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#1e293b] transition-colors text-sm"
            >
              Appelez-nous — {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
