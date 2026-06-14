"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Shield, Clock, FileText, Eye, MapPin, Award, Coins } from "lucide-react";

const ARGUMENTS = [
  {
    icon: Layers,
    title: "Multi-métiers",
    desc: "6 spécialités en un seul interlocuteur. Électricité, plomberie, chauffage, clim, PAC, ventilation.",
    color: "#0da2e1",
  },
  {
    icon: Shield,
    title: "Certifié & Garanti",
    desc: "Qualifelec, RGE, Qualigaz. Garantie décennale et assurance RC pro sur toutes nos interventions.",
    color: "#4caf50",
  },
  {
    icon: Clock,
    title: "Urgence 24h/24",
    desc: "Intervention en moins d'une heure pour toutes les urgences, 7 jours sur 7, 365 jours par an.",
    color: "#f44336",
  },
  {
    icon: FileText,
    title: "Devis Gratuit",
    desc: "Devis détaillé et transparent sous 24h, sans engagement. Aucune surprise sur la facture finale.",
    color: "#ff8c00",
  },
  {
    icon: Eye,
    title: "Transparence",
    desc: "Tarifs clairs affichés, sans frais cachés. Vous savez exactement ce que vous payez avant l'intervention.",
    color: "#9c27b0",
  },
  {
    icon: MapPin,
    title: "Proximité",
    desc: "Artisans locaux qui connaissent votre secteur. Paris et toute l'Île-de-France couverts.",
    color: "#2196f3",
  },
  {
    icon: Award,
    title: "Garantie 10 Ans",
    desc: "Garantie décennale sur tous nos travaux de construction et rénovation. Tranquillité d'esprit assurée.",
    color: "#00bcd4",
  },
  {
    icon: Coins,
    title: "Aides Financières",
    desc: "Accompagnement pour MaPrimeRénov', CEE et Éco-PTZ. Nous vous aidons à obtenir toutes les subventions disponibles.",
    color: "#4caf50",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-white" aria-labelledby="why-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-sm font-semibold rounded-full mb-4">
            Pourquoi nous choisir
          </span>
          <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Pourquoi choisir Therklima ?
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Notre engagement : qualité, réactivité et transparence. 8 raisons de nous faire confiance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARGUMENTS.map((arg, i) => (
            <motion.div
              key={arg.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-[#f8fafc] hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md rounded-2xl p-5 transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: arg.color + "15" }}
              >
                <arg.icon className="w-5 h-5" style={{ color: arg.color }} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-[#0f172a] mb-1.5">{arg.title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{arg.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
