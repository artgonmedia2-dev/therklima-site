"use client";

import Link from "next/link";
import Image from "next/image";
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
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0878a8 100%)" }}
    >
      {/* Hero background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center md:object-right"
          sizes="100vw"
        />
        {/* Mobile: heavy dark overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/85 via-[#0f172a]/80 to-[#0f172a]/90 md:hidden" />
        {/* Desktop: left-to-right fade — dark on left (text area), image visible on right */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-[#0f172a]/30" />
        {/* Desktop: extra top/bottom fade */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]/60" />
      </div>

      {/* Dot pattern subtle */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-1/4 right-8 md:right-1/3 w-48 md:w-72 h-48 md:h-72 bg-[#0da2e1]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-4 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-[#00bcd4]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10 py-20 md:py-32">
        {/* Content capped to left 60% on desktop */}
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm mb-5 md:mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" aria-hidden="true" />
            Disponible 24h/24 — 7j/7
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6"
          >
            Vos Experts en{" "}
            <span className="text-[#0da2e1]">Électricité</span>,{" "}
            <span className="text-[#2196f3]">Plomberie</span>,{" "}
            <span className="text-[#f44336]">Chauffage</span>,{" "}
            <br className="hidden sm:block" />
            <span className="text-[#00bcd4]">Climatisation</span>,{" "}
            <span className="text-[#4caf50]">PAC</span>{" "}
            &amp; <span className="text-[#9c27b0]">Ventilation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-6 md:mb-8 max-w-xl"
          >
            Installation, rénovation et dépannage 7j/7 pour particuliers et professionnels.
            Intervention en moins d&apos;1 heure sur Paris et Île-de-France.
          </motion.p>

          {/* 6 Métier Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6 md:mb-8"
          >
            {METIERS.map((metier) => {
              const Icon = metierIcons[metier.id];
              return (
                <Link
                  key={metier.id}
                  href={metier.slug}
                  className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all group"
                  aria-label={`Voir nos services ${metier.name}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" style={{ color: metier.color }} aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs font-medium text-white/90 text-center leading-tight">{metier.name}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10"
          >
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors text-sm sm:text-base"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base"
              aria-label={`Appeler Therklima au ${COMPANY.phone}`}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/70 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 shrink-0" aria-hidden="true" />
              <span>5/5 (156 avis)</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0da2e1] shrink-0" aria-hidden="true" />
              <span>Certifié Qualifelec &amp; RGE</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0da2e1] shrink-0" aria-hidden="true" />
              <span>Intervention &lt; 1h</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0" aria-hidden="true" />
              <span>Devis 100% gratuit</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
