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
          {/* Connecting line */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#0da2e1] flex flex-col items-center justify-center mb-5 shadow-lg shadow-[#0da2e1]/30">
                  <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <span className="absolute top-0 right-0 lg:right-auto lg:left-10 w-6 h-6 rounded-full bg-[#0878a8] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>

                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{step.desc}</p>
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
