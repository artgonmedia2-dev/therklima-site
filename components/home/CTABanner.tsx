"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20"
      style={{ background: "linear-gradient(135deg, #0da2e1 0%, #0878a8 100%)" }}
      aria-label="Appel à l'action — Demande de devis"
    >
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Besoin d&apos;un expert ? Devis gratuit sous 24h.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Électricité, plomberie, chauffage, climatisation, PAC ou ventilation — nos experts interviennent rapidement sur Paris et Île-de-France.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0da2e1] font-bold rounded-xl hover:bg-gray-50 transition-colors text-base"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base"
              aria-label={`Appeler Therklima au ${COMPANY.phone}`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Sans engagement • Réponse sous 24h • Disponible 7j/7
          </p>
        </motion.div>
      </div>
    </section>
  );
}
