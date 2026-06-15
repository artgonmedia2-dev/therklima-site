"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/data/testimonials";
import { Shield, Award, CheckCircle2, Wind, Flame, Sun, Droplets } from "lucide-react";

const CERTIFICATIONS = [
  { icon: Shield,       label: "Qualifelec",         desc: "Électricité certifiée",    color: "#0da2e1", bg: "#e6f6fc" },
  { icon: Award,        label: "RGE QualiPac",        desc: "Pompes à chaleur",         color: "#7c3aed", bg: "#ede9fe" },
  { icon: Droplets,     label: "Qualigaz",            desc: "Installations gaz",        color: "#ff8c00", bg: "#fff3e0" },
  { icon: Wind,         label: "RGE Qualiventil",     desc: "Ventilation certifiée",    color: "#06b6d4", bg: "#e0f7fa" },
  { icon: Flame,        label: "RGE Chauffage+",      desc: "Chauffage certifié",       color: "#ef4444", bg: "#fee2e2" },
  { icon: Sun,          label: "RGE QualiSol",        desc: "Énergie solaire",          color: "#f59e0b", bg: "#fef3c7" },
  { icon: CheckCircle2, label: "Garantie décennale",  desc: "Assurance professionnelle",color: "#10b981", bg: "#d1fae5" },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-12 md:py-16 border-b border-gray-100" aria-label="Chiffres clés et certifications">
      <div className="container-custom">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center rounded-2xl bg-gradient-to-b from-[#f0faff] to-white border border-[#e0f4fd] p-4 md:p-6 shadow-sm"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-[#0da2e1] tracking-tight">
                {stat.value}
              </span>
              <p className="text-xs md:text-sm text-[#64748b] mt-1.5 leading-snug">{stat.label}</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-[#0da2e1]/30" aria-hidden="true" />
            </motion.div>
          ))}
        </div>

        {/* Certifications header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Nos agréments & certifications</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" aria-hidden="true" />
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              className="group flex flex-col items-center gap-2.5 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: cert.bg }}
              >
                <cert.icon className="w-5 h-5" style={{ color: cert.color }} aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#0f172a] leading-tight">{cert.label}</p>
                <p className="text-[10px] text-[#94a3b8] mt-0.5 leading-tight">{cert.desc}</p>
              </div>
              <div
                className="w-6 h-0.5 rounded-full opacity-60 group-hover:w-10 transition-all duration-300"
                style={{ backgroundColor: cert.color }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
