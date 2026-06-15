"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { METIERS } from "@/lib/constants";

const metierIcons: Record<string, LucideIcon> = {
  electricite: Zap,
  plomberie: Droplets,
  chauffage: Flame,
  climatisation: Snowflake,
  pac: Thermometer,
  ventilation: Wind,
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-[#f8fafc]" aria-labelledby="services-heading">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-sm font-semibold rounded-full mb-4">
            Nos 6 expertises
          </span>
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 md:mb-4">
            Des solutions complètes pour votre confort
          </h2>
          <p className="text-[#475569] text-base md:text-lg max-w-2xl mx-auto">
            6 métiers du bâtiment, un seul interlocuteur. Therklima prend en charge tous vos travaux d&apos;installation, de rénovation et de dépannage.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {METIERS.map((metier, i) => {
            const Icon = metierIcons[metier.id];
            return (
              <motion.div
                key={metier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={metier.slug}
                  className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ borderTopColor: metier.color, borderTopWidth: "3px" }}
                  aria-label={`Découvrir nos services ${metier.name}`}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: metier.color + "20" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metier.color }} aria-hidden="true" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#0f172a] mb-2 group-hover:text-[#0da2e1] transition-colors">
                    {metier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#64748b] mb-4">{metier.description}</p>

                  {/* Prestations list */}
                  <ul className="space-y-1 mb-5" role="list">
                    {metier.prestations.slice(0, 4).map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-[#475569]">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: metier.color }} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                    style={{ color: metier.color }}
                  >
                    Découvrir <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
