"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  sujet: z.string().min(3, "Sujet requis"),
  message: z.string().min(10, "Message trop court (10 caractères min.)"),
  rgpd: z.boolean().refine((v) => v, "Consentement requis"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Contact form:", data);
    toast.success("Message envoyé ! Nous vous répondons sous 24h.");
    reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Page contact">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Une question, un besoin urgent ? Notre équipe est disponible 24h/24, 7j/7.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#f8fafc]" aria-label="Formulaire de contact et coordonnées">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Infos contact */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Nos coordonnées</h2>
              <div className="space-y-4 mb-8">
                {[
                  { Icon: Phone, label: "Téléphone", value: COMPANY.phone, href: COMPANY.phoneHref },
                  { Icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { Icon: MapPin, label: "Adresse", value: COMPANY.addressFull, href: "https://maps.google.com/?q=6+Rue+d%27Armaillé+75017+Paris" },
                  { Icon: Clock, label: "Disponibilité", value: COMPANY.hours, href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#e6f6fc] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0da2e1]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748b]">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold text-[#0f172a] hover:text-[#0da2e1] transition-colors">{value}</a>
                      ) : (
                        <p className="font-semibold text-[#0f172a]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#0da2e1] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Urgence 24h/24</h3>
                <p className="text-white/80 text-sm mb-4">Panne électrique, fuite d&apos;eau, panne de chauffage ? Nos techniciens interviennent en moins d&apos;une heure.</p>
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0da2e1] font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Appeler maintenant
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Envoyer un message</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Nom complet *</label>
                  <input id="nom" {...register("nom")} placeholder="Jean Dupont" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
                  {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email *</label>
                    <input id="email" type="email" {...register("email")} placeholder="jean@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Téléphone</label>
                    <input id="telephone" type="tel" {...register("telephone")} placeholder="06 12 34 56 78" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Sujet *</label>
                  <input id="sujet" {...register("sujet")} placeholder="Demande de renseignement..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
                  {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Message *</label>
                  <textarea id="message" rows={4} {...register("message")} placeholder="Décrivez votre demande..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1] resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" {...register("rgpd")} className="mt-0.5 w-4 h-4 rounded text-[#0da2e1]" />
                  <span className="text-xs text-[#64748b]">J&apos;accepte que mes données soient traitées conformément à la <a href="/mentions-legales#confidentialite" className="text-[#0da2e1]">politique de confidentialité</a>. *</span>
                </label>
                {errors.rgpd && <p className="text-red-500 text-xs">{errors.rgpd.message}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#0da2e1] hover:bg-[#0878a8] disabled:opacity-70 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {isSubmitting ? "Envoi…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
