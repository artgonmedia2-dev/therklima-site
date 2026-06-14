"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_GENERAL } from "@/lib/data/faq";
import Link from "next/link";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-white" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-sm font-semibold rounded-full mb-4">
              FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Questions fréquentes
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-6">
              Retrouvez les réponses à vos questions les plus fréquentes. Vous n&apos;avez pas trouvé votre réponse ?
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#0da2e1] text-[#0da2e1] font-semibold rounded-xl hover:bg-[#e6f6fc] transition-colors"
            >
              Voir toutes les FAQ
            </Link>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion className="space-y-3">
              {FAQ_GENERAL.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-gray-100 rounded-xl px-4 shadow-sm data-[state=open]:border-[#0da2e1]/30 data-[state=open]:shadow-md transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#0f172a] hover:text-[#0da2e1] hover:no-underline py-4 text-sm">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#475569] leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
