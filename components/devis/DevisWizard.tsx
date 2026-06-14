"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, Upload, Loader2, type LucideIcon } from "lucide-react";
import { METIERS } from "@/lib/constants";

// ─── Schemas Zod par étape ───────────────────────────────────────────────────

const step1Schema = z.object({
  metier: z.string().min(1, "Veuillez sélectionner un métier"),
});

const step2Schema = z.object({
  prestation: z.string().min(1, "Veuillez sélectionner une prestation"),
});

const step3Schema = z.object({
  typeLogement: z.enum(["maison", "appartement", "local-pro"] as const).refine(Boolean, "Sélectionnez un type de logement"),
  surface: z.string().min(1, "Indiquez la surface"),
  description: z.string().min(10, "Décrivez votre projet (10 caractères min.)"),
});

const step4Schema = z.object({
  nom: z.string().min(2, "Nom requis (2 caractères min.)"),
  prenom: z.string().min(2, "Prénom requis"),
  telephone: z.string().refine(
    (v) => /^(?:\+33|0)[1-9]\d{8}$/.test(v.replace(/[\s.\-()]/g, "")),
    "Numéro invalide (ex : 06 12 34 56 78 ou +33612345678)"
  ),
  email: z.string().email("Email invalide"),
  adresse: z.string().optional(),
  ville: z.string().min(2, "Ville requise"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  rgpd: z.boolean().refine((v) => v === true, "Vous devez accepter la politique de confidentialité"),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;
type Step4 = z.infer<typeof step4Schema>;

// ─── Icônes ──────────────────────────────────────────────────────────────────

const METIER_ICONS: Record<string, LucideIcon> = {
  electricite: Zap,
  plomberie: Droplets,
  chauffage: Flame,
  climatisation: Snowflake,
  pac: Thermometer,
  ventilation: Wind,
};

// ─── Main Component ───────────────────────────────────────────────────────────

const STORAGE_KEY = "therklima_devis_draft";

export default function DevisWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form data accumulator
  const [formData, setFormData] = useState<{
    metier?: string;
    prestation?: string;
    typeLogement?: string;
    surface?: string;
    description?: string;
    nom?: string;
    prenom?: string;
    telephone?: string;
    email?: string;
    ville?: string;
    codePostal?: string;
  }>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.data || {});
        setStep(parsed.step || 1);
      }
    } catch {}
  }, []);

  // Save to localStorage
  const saveProgress = (data: typeof formData, currentStep: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step: currentStep }));
    } catch {}
  };

  const selectedMetier = METIERS.find((m) => m.id === formData.metier);

  // ─── Step 1 form ────────────────────────────────────────────────────────────
  const form1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: { metier: formData.metier || "" },
  });

  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: { prestation: formData.prestation || "" },
  });

  const form3 = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      typeLogement: (formData.typeLogement as "maison" | "appartement" | "local-pro") || undefined,
      surface: formData.surface || "",
      description: formData.description || "",
    },
  });

  const form4 = useForm<Step4>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      nom: formData.nom || "",
      prenom: formData.prenom || "",
      telephone: formData.telephone || "",
      email: formData.email || "",
      adresse: "",
      ville: formData.ville || "",
      codePostal: formData.codePostal || "",
      rgpd: false,
    },
  });

  // ─── Navigation handlers ─────────────────────────────────────────────────────

  const onStep1 = form1.handleSubmit((data) => {
    const next = { ...formData, ...data };
    setFormData(next);
    saveProgress(next, 2);
    setStep(2);
    form2.setValue("prestation", "");
  });

  const onStep2 = form2.handleSubmit((data) => {
    const next = { ...formData, ...data };
    setFormData(next);
    saveProgress(next, 3);
    setStep(3);
  });

  const onStep3 = form3.handleSubmit((data) => {
    const next = { ...formData, ...data };
    setFormData(next);
    saveProgress(next, 4);
    setStep(4);
  });

  const onStep4 = form4.handleSubmit(async (data) => {
    const final = { ...formData, ...data };
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Devis soumis :", final);
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Demande envoyée ! Nous vous répondons sous 24h.", { duration: 6000 });
  });

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  // ─── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-3">Demande envoyée avec succès !</h2>
        <p className="text-[#475569] mb-2">
          Merci <strong>{formData.prenom} {formData.nom}</strong>, votre demande de devis a bien été transmise à notre équipe.
        </p>
        <p className="text-[#475569] mb-6">
          Nous vous contactons sous <strong>24h</strong> au <strong>{formData.telephone}</strong> ou par email à <strong>{formData.email}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setFormData({}); }}
          className="px-6 py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white rounded-xl font-semibold transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s < step ? "bg-[#0da2e1] text-white" : s === step ? "bg-[#0da2e1] text-white ring-4 ring-[#0da2e1]/20" : "bg-gray-200 text-gray-400"
                }`}
                aria-current={s === step ? "step" : undefined}
              >
                {s < step ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : s}
              </div>
              {s < 4 && (
                <div className="w-16 sm:w-24 h-1 mx-1">
                  <div className={`h-full rounded-full transition-all duration-500 ${s < step ? "bg-[#0da2e1]" : "bg-gray-200"}`} aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#64748b]">
          <span>Métier</span><span>Prestation</span><span>Projet</span><span>Coordonnées</span>
        </div>
        <p className="text-sm text-[#475569] mt-2">Étape {step}/4</p>
      </div>

      <AnimatePresence mode="wait">
        {/* ─── Step 1 ─── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Quel métier concerne votre projet ?</h2>
            <p className="text-[#64748b] mb-6">Sélectionnez le domaine d&apos;intervention souhaité.</p>

            <form onSubmit={onStep1} noValidate>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {METIERS.map((metier) => {
                  const Icon = METIER_ICONS[metier.id];
                  const selected = form1.watch("metier") === metier.id;
                  return (
                    <button
                      key={metier.id}
                      type="button"
                      onClick={() => form1.setValue("metier", metier.id, { shouldValidate: true })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selected ? "border-[#0da2e1] bg-[#e6f6fc] shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      aria-pressed={selected}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: metier.color + "20" }}>
                        <Icon className="w-5 h-5" style={{ color: metier.color }} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium text-[#334155]">{metier.name}</span>
                    </button>
                  );
                })}
              </div>
              {form1.formState.errors.metier && (
                <p className="text-red-500 text-sm mb-4" role="alert">{form1.formState.errors.metier.message}</p>
              )}
              <button type="submit" className="w-full py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                Continuer <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}

        {/* ─── Step 2 ─── */}
        {step === 2 && selectedMetier && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Type de prestation</h2>
            <p className="text-[#64748b] mb-6">
              Vous avez sélectionné : <span className="font-semibold" style={{ color: selectedMetier.color }}>{selectedMetier.name}</span>. Quel type d&apos;intervention ?
            </p>

            <form onSubmit={onStep2} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {selectedMetier.prestations.map((p) => {
                  const selected = form2.watch("prestation") === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => form2.setValue("prestation", p, { shouldValidate: true })}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        selected ? "border-[#0da2e1] bg-[#e6f6fc] text-[#0da2e1]" : "border-gray-200 hover:border-gray-300 text-[#334155] bg-white"
                      }`}
                      aria-pressed={selected}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {form2.formState.errors.prestation && (
                <p className="text-red-500 text-sm mb-4" role="alert">{form2.formState.errors.prestation.message}</p>
              )}
              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-[#475569] font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  Continuer <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── Step 3 ─── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Détails de votre projet</h2>
            <p className="text-[#64748b] mb-6">Plus de précisions nous aident à vous proposer un devis adapté.</p>

            <form onSubmit={onStep3} noValidate className="space-y-5">
              {/* Type de logement */}
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2">Type de logement *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "maison", label: "Maison" },
                    { value: "appartement", label: "Appartement" },
                    { value: "local-pro", label: "Local pro" },
                  ].map((opt) => {
                    const selected = form3.watch("typeLogement") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => form3.setValue("typeLogement", opt.value as "maison" | "appartement" | "local-pro", { shouldValidate: true })}
                        className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                          selected ? "border-[#0da2e1] bg-[#e6f6fc] text-[#0da2e1]" : "border-gray-200 hover:border-gray-300 text-[#334155]"
                        }`}
                        aria-pressed={selected}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                {form3.formState.errors.typeLogement && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{form3.formState.errors.typeLogement.message}</p>
                )}
              </div>

              {/* Surface */}
              <div>
                <label htmlFor="surface" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Surface approximative (m²) *</label>
                <input
                  id="surface"
                  type="number"
                  min="1"
                  {...form3.register("surface")}
                  placeholder="ex: 75"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                />
                {form3.formState.errors.surface && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{form3.formState.errors.surface.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Description de votre projet *</label>
                <textarea
                  id="description"
                  rows={4}
                  {...form3.register("description")}
                  placeholder="Décrivez votre problème ou vos besoins en détail..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1] resize-none"
                />
                {form3.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{form3.formState.errors.description.message}</p>
                )}
              </div>

              {/* Photos upload placeholder */}
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">Photos (optionnel)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#0da2e1]/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm text-[#64748b]">Glissez vos photos ici ou <span className="text-[#0da2e1] font-medium">parcourir</span></p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu&apos;à 5 Mo — max 3 photos</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={goBack} className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-[#475569] font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  Continuer <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── Step 4 ─── */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Vos coordonnées</h2>
            <p className="text-[#64748b] mb-6">Pour vous envoyer votre devis gratuit sous 24h.</p>

            <form onSubmit={onStep4} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "prenom", label: "Prénom *", placeholder: "Jean", reg: form4.register("prenom"), err: form4.formState.errors.prenom },
                  { id: "nom", label: "Nom *", placeholder: "Dupont", reg: form4.register("nom"), err: form4.formState.errors.nom },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-semibold text-[#0f172a] mb-1.5">{f.label}</label>
                    <input
                      id={f.id}
                      {...f.reg}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                    />
                    {f.err && <p className="text-red-500 text-xs mt-1" role="alert">{f.err.message}</p>}
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Téléphone *</label>
                <input
                  id="telephone"
                  type="tel"
                  {...form4.register("telephone")}
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                />
                {form4.formState.errors.telephone && <p className="text-red-500 text-xs mt-1" role="alert">{form4.formState.errors.telephone.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email *</label>
                <input
                  id="email"
                  type="email"
                  {...form4.register("email")}
                  placeholder="jean.dupont@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                />
                {form4.formState.errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{form4.formState.errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="ville" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Ville *</label>
                  <input
                    id="ville"
                    {...form4.register("ville")}
                    placeholder="Paris"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                  />
                  {form4.formState.errors.ville && <p className="text-red-500 text-xs mt-1" role="alert">{form4.formState.errors.ville.message}</p>}
                </div>
                <div>
                  <label htmlFor="codePostal" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Code postal *</label>
                  <input
                    id="codePostal"
                    {...form4.register("codePostal")}
                    placeholder="75001"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]"
                  />
                  {form4.formState.errors.codePostal && <p className="text-red-500 text-xs mt-1" role="alert">{form4.formState.errors.codePostal.message}</p>}
                </div>
              </div>

              {/* RGPD */}
              <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...form4.register("rgpd")}
                    className="mt-0.5 w-4 h-4 rounded text-[#0da2e1] border-gray-300 focus:ring-[#0da2e1]"
                  />
                  <span className="text-sm text-[#475569]">
                    J&apos;accepte la{" "}
                    <a href="/mentions-legales#confidentialite" className="text-[#0da2e1] underline hover:no-underline">
                      politique de confidentialité
                    </a>{" "}
                    et que Therklima me contacte par téléphone ou email pour répondre à ma demande de devis. *
                  </span>
                </label>
                {form4.formState.errors.rgpd && <p className="text-red-500 text-xs mt-2" role="alert">{form4.formState.errors.rgpd.message}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={goBack} className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-[#475569] font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#0da2e1] hover:bg-[#0878a8] disabled:opacity-70 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Envoi en cours…</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Envoyer ma demande</>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-[#94a3b8]">
                🔒 Vos données sont protégées — Réponse garantie sous 24h
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
