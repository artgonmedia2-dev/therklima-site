"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Zap, Droplets, Flame } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const URGENCES = [
  {
    icon: Zap,
    color: "#ff8c00",
    metier: "Électricité",
    situations: ["Panne générale d'électricité", "Court-circuit / disjonction", "Câble électrique endommagé", "Odeur de brûlé"],
  },
  {
    icon: Droplets,
    color: "#2196f3",
    metier: "Plomberie",
    situations: ["Fuite d'eau importante", "WC bouché / débordement", "Tuyau éclaté", "Coupure d'eau froide"],
  },
  {
    icon: Flame,
    color: "#f44336",
    metier: "Chauffage",
    situations: ["Panne chaudière en hiver", "Radiateurs froids", "Odeur de gaz", "Fuite circuit chauffage"],
  },
];

export default function UrgenceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      aria-labelledby="urgence-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
            Urgence 24h/24
          </div>
          <h2 id="urgence-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Urgence ? On intervient en moins d&apos;1 heure !
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Panne électrique, fuite d&apos;eau, chauffage en panne… Nos techniciens sont disponibles 24h/24, 7j/7.
          </p>
        </motion.div>

        {/* Urgence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {URGENCES.map((u, i) => (
            <motion.div
              key={u.metier}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: u.color + "20" }}
              >
                <u.icon className="w-6 h-6" style={{ color: u.color }} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Urgence {u.metier}</h3>
              <ul className="space-y-1.5 mb-5" role="list">
                {u.situations.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: u.color }} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: u.color }}
                aria-label={`Appeler pour une urgence ${u.metier}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Appeler maintenant
              </a>
            </motion.div>
          ))}
        </div>

        {/* Big CTA Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/70 text-sm mb-3">Ligne urgence disponible 24h/24, 7j/7</p>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-3 px-8 py-5 bg-red-500 hover:bg-red-600 text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 shadow-xl shadow-red-500/30"
            aria-label={`Numéro d'urgence Therklima : ${COMPANY.phone}`}
          >
            <Phone className="w-7 h-7" aria-hidden="true" />
            {COMPANY.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
