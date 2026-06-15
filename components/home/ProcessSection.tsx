"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, FileText, Wrench, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Phone,
    title: "Contact Gratuit",
    desc: "Appelez-nous ou remplissez notre formulaire de devis en ligne. Réponse garantie sous 24h.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Devis Clair",
    desc: "Nous établissons un devis détaillé et transparent, sans frais cachés, sous 24h ouvrées.",
  },
  {
    num: "03",
    icon: Wrench,
    title: "Intervention Rapide",
    desc: "Nos techniciens qualifiés interviennent dans les délais convenus. Travail soigné et propre.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Satisfaction Garantie",
    desc: "Nous assurons la qualité de notre travail avec une garantie décennale et un suivi post-intervention.",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-white" aria-labelledby="process-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-sm font-semibold rounded-full mb-4">
            Notre méthode
          </span>
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Un processus simple et transparent en 4 étapes pour une intervention sans stress.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-gray-200"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-[#0da2e1] origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>

          {/* Vertical line — mobile only */}
          <div className="lg:hidden absolute left-8 sm:left-[calc(25%-1rem)] top-8 bottom-8 w-0.5 bg-gray-200" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex items-start lg:flex-col lg:items-center lg:text-center gap-4 lg:gap-0"
              >
                {/* Circle + number */}
                <div className="relative shrink-0">
                  <div className="relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#0da2e1] flex items-center justify-center shadow-lg shadow-[#0da2e1]/30 lg:mb-5">
                    <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#0878a8] text-white text-[10px] lg:text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>

                {/* Text */}
                <div className="lg:text-center">
                  <h3 className="text-base lg:text-lg font-bold text-[#0f172a] mb-1 lg:mb-2">{step.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors text-base"
          >
            Je demande mon devis gratuit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
