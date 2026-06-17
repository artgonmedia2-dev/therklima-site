"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/data/testimonials";

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-12 md:py-16 border-b border-gray-100" aria-label="Chiffres clés">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
      </div>
    </section>
  );
}
