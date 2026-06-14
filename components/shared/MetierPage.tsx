import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CTABanner from "@/components/home/CTABanner";

const ICONS: Record<string, LucideIcon> = {
  Zap, Droplets, Flame, Snowflake, Thermometer, Wind,
};

interface MetierPageProps {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  longDescription: string;
  prestations: readonly string[];
  avantages: string[];
  faq: Array<{ question: string; answer: string }>;
  tarifs: Array<{ label: string; price: string }>;
  jsonLd: object;
}

export default function MetierPage({
  id,
  name,
  color,
  icon,
  description,
  longDescription,
  prestations,
  avantages,
  faq,
  tarifs,
  jsonLd,
}: MetierPageProps) {
  const Icon = ICONS[icon];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section
        className="min-h-[60vh] flex items-center py-24 md:py-32 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #0f172a 0%, ${color}30 100%)` }}
        aria-label={`Services ${name} — Therklima`}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: color }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">Accueil</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 text-sm">{name}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color + "30" }}>
              {Icon && <Icon className="w-8 h-8" style={{ color }} aria-hidden="true" />}
            </div>
            <div>
              <span className="text-sm font-semibold" style={{ color }}>Nos experts {name}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{name}</h1>
            </div>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold rounded-xl transition-colors"
              style={{ backgroundColor: color }}
            >
              Devis gratuit {name}
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl transition-colors hover:bg-white/20"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Prestations + Description */}
      <section className="section-padding bg-white" aria-labelledby={`${id}-services-heading`}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 id={`${id}-services-heading`} className="text-3xl font-bold text-[#0f172a] mb-4">
                Nos prestations {name}
              </h2>
              <p className="text-[#475569] leading-relaxed mb-6">{longDescription}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                {prestations.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color }} aria-hidden="true" />
                    <span className="text-[#334155] text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4">Pourquoi choisir Therklima pour votre {name.toLowerCase()} ?</h3>
              <ul className="space-y-3" role="list">
                {avantages.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: color + "20" }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                    </div>
                    <span className="text-sm text-[#475569]">{a}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-[#0f172a] mb-3">Demander un devis gratuit</p>
                <Link
                  href="/devis"
                  className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl transition-colors"
                  style={{ backgroundColor: color }}
                >
                  Devis en ligne <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby={`${id}-tarifs-heading`}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 id={`${id}-tarifs-heading`} className="text-3xl font-bold text-[#0f172a] mb-2">
              Tarifs indicatifs {name}
            </h2>
            <p className="text-[#475569]">Devis précis après visite ou description de votre projet</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {tarifs.map((t) => (
              <div key={t.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-[#64748b] mb-1">{t.label}</p>
                <p className="text-lg font-bold" style={{ color }}>{t.price}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#94a3b8] mt-4">
            * Tarifs indicatifs HT, variables selon la complexité du chantier. Devis personnalisé gratuit.
          </p>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby={`${id}-faq-heading`}>
          <div className="container-custom max-w-3xl">
            <h2 id={`${id}-faq-heading`} className="text-3xl font-bold text-[#0f172a] mb-8 text-center">
              Questions fréquentes — {name}
            </h2>
            <Accordion className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-[#f8fafc] border border-gray-100 rounded-xl px-4 data-[state=open]:border-[#0da2e1]/30"
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
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
