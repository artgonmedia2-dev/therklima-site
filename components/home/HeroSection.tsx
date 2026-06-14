"use client";

import Link from "next/link";
import { Phone, Star, Award, Clock, CheckCircle2, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY, METIERS } from "@/lib/constants";

const metierIcons: Record<string, LucideIcon> = {
  electricite: Zap,
  plomberie: Droplets,
  chauffage: Flame,
  climatisation: Snowflake,
  pac: Thermometer,
  ventilation: Wind,
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Section principale — Therklima experts bâtiment"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0878a8 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#0da2e1]/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00bcd4]/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            Disponible 24h/24 — 7j/7
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Vos Experts en{" "}
            <span className="text-[#0da2e1]">Électricité</span>,{" "}
            <span className="text-[#2196f3]">Plomberie</span>,{" "}
            <span className="text-[#f44336]">Chauffage</span>,{" "}
            <span className="text-[#00bcd4]">Climatisation</span>,{" "}
            <span className="text-[#4caf50]">PAC</span>{" "}
            &amp; <span className="text-[#9c27b0]">Ventilation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
          >
            Installation, rénovation et dépannage 7j/7 pour particuliers et professionnels.
            Intervention en moins d&apos;1 heure sur Paris et Île-de-France.
          </motion.p>

          {/* 6 Métier Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8"
          >
            {METIERS.map((metier) => {
              const Icon = metierIcons[metier.id];
              return (
                <Link
                  key={metier.id}
                  href={metier.slug}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all group"
                  aria-label={`Voir nos services ${metier.name}`}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: metier.color }} aria-hidden="true" />
                  <span className="text-xs font-medium text-white/90 text-center leading-tight">{metier.name}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors text-base"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base"
              aria-label={`Appeler Therklima au ${COMPANY.phone}`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-white/70 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span>4.8/5 (156 avis)</span>
            </div>
            <div className="w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#0da2e1]" aria-hidden="true" />
              <span>Certifié Qualifelec &amp; RGE</span>
            </div>
            <div className="w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0da2e1]" aria-hidden="true" />
              <span>Intervention &lt; 1h</span>
            </div>
            <div className="w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
              <span>Devis 100% gratuit</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
