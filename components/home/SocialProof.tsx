"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/data/testimonials";
import { Shield, Award, CheckCircle2 } from "lucide-react";

function AnimatedNumber({ value }: { value: string }) {
  return <span className="text-3xl md:text-4xl font-bold text-[#0da2e1]">{value}</span>;
}

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-12 md:py-16 border-b border-gray-100" aria-label="Chiffres clés et certifications">
      <div className="container-custom">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} />
              <p className="text-sm text-[#64748b] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {[
            { icon: Shield, label: "Qualifelec", desc: "Électricité certifiée" },
            { icon: Award, label: "RGE QualiPac", desc: "Pompes à chaleur" },
            { icon: CheckCircle2, label: "Garantie décennale", desc: "Assurance professionnelle" },
            { icon: Award, label: "Qualigaz", desc: "Installations gaz" },
          ].map((cert) => (
            <div
              key={cert.label}
              className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc] border border-gray-100 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-[#e6f6fc] flex items-center justify-center shrink-0">
                <cert.icon className="w-5 h-5 text-[#0da2e1]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">{cert.label}</p>
                <p className="text-xs text-[#64748b]">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
