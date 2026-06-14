import type { Metadata } from "next";
import DevisWizard from "@/components/devis/DevisWizard";
import { Shield, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Demande de Devis Gratuit — Électricité, Plomberie, Chauffage, Clim, PAC, VMC",
  description:
    "Demandez votre devis gratuit en ligne en 4 étapes. Therklima répond sous 24h pour tous vos travaux d'électricité, plomberie, chauffage, climatisation, PAC et ventilation.",
};

export default function DevisPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        aria-label="Demande de devis gratuit"
      >
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block px-3 py-1.5 bg-[#0da2e1]/20 border border-[#0da2e1]/30 text-[#4dbef0] text-sm font-semibold rounded-full mb-4">
            100% gratuit &amp; sans engagement
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Demandez votre devis gratuit
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Remplissez notre formulaire en 4 étapes. Nous vous répondons sous 24h avec un devis détaillé et personnalisé.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" /> Devis gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0da2e1]" aria-hidden="true" /> Réponse sous 24h
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0da2e1]" aria-hidden="true" /> Données protégées RGPD
            </span>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-padding bg-[#f8fafc]" aria-label="Formulaire de devis multi-étapes">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <DevisWizard />
          </div>
        </div>
      </section>
    </>
  );
}
