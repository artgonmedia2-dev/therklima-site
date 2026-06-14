import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_GENERAL, FAQ_BY_METIER } from "@/lib/data/faq";
import { METIERS } from "@/lib/constants";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur nos services bâtiment",
  description: "Toutes les réponses à vos questions sur nos services d'électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation.",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GENERAL.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="FAQ">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Questions fréquentes</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Retrouvez les réponses à toutes vos questions sur nos services et interventions.
          </p>
        </div>
      </section>

      {/* FAQ Générale */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="faq-general-heading">
        <div className="container-custom max-w-3xl">
          <h2 id="faq-general-heading" className="text-3xl font-bold text-[#0f172a] mb-8">Questions générales</h2>
          <Accordion className="space-y-3">
            {FAQ_GENERAL.map((item, i) => (
              <AccordionItem key={i} value={`gen-${i}`} className="bg-white border border-gray-100 rounded-xl px-4 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-[#0f172a] hover:text-[#0da2e1] hover:no-underline py-4 text-sm">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#475569] leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FAQ par métier */}
      <section className="section-padding bg-white" aria-labelledby="faq-metiers-heading">
        <div className="container-custom max-w-3xl">
          <h2 id="faq-metiers-heading" className="text-3xl font-bold text-[#0f172a] mb-8">FAQ par métier</h2>
          <div className="space-y-10">
            {METIERS.filter((m) => FAQ_BY_METIER[m.id]?.length > 0).map((metier) => (
              <div key={metier.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: metier.color }} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-[#0f172a]">{metier.name}</h3>
                  <Link href={metier.slug} className="ml-auto text-sm text-[#0da2e1] hover:underline">
                    Voir la page →
                  </Link>
                </div>
                <Accordion className="space-y-3">
                  {FAQ_BY_METIER[metier.id].map((item, i) => (
                    <AccordionItem key={i} value={`${metier.id}-${i}`} className="bg-[#f8fafc] border border-gray-100 rounded-xl px-4">
                      <AccordionTrigger className="text-left font-semibold text-[#0f172a] hover:no-underline py-4 text-sm" style={{ color: undefined }}>
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-[#475569] leading-relaxed pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
