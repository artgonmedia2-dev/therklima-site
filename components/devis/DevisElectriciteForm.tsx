"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const contactSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  telephone: z.string().min(10, "Numéro requis"),
  email: z.string().email("Email invalide"),
  adresse: z.string().optional(),
  rgpd: z.boolean().refine((v) => v === true, "Consentement requis"),
});

type ContactData = z.infer<typeof contactSchema>;

const ACCENT = "#ff8c00";
const ACCENT_RING = "focus:ring-[#ff8c00]/30 focus:border-[#ff8c00]";

function SectionCard({ num, title, children }: { num: number | string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0"
          style={{ backgroundColor: ACCENT }}
        >
          {num}
        </div>
        <h2 className="text-base font-bold text-[#0f172a]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ToggleGroup({
  options,
  selected,
  onChange,
  withOther,
  otherValue,
  onOtherChange,
  otherPlaceholder,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  withOther?: boolean;
  otherValue?: string;
  onOtherChange?: (val: string) => void;
  otherPlaceholder?: string;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          aria-pressed={selected.includes(opt)}
          className="px-3 py-1.5 rounded-lg text-sm border transition-all duration-150"
          style={
            selected.includes(opt)
              ? { backgroundColor: ACCENT, color: "#fff", borderColor: ACCENT, fontWeight: 500 }
              : { backgroundColor: "#f8fafc", color: "#334155", borderColor: "#e2e8f0" }
          }
          onMouseEnter={(e) => {
            if (!selected.includes(opt)) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
              (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
            }
          }}
          onMouseLeave={(e) => {
            if (!selected.includes(opt)) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLButtonElement).style.color = "#334155";
            }
          }}
        >
          {opt}
        </button>
      ))}
      {withOther && (
        <div className="flex items-center gap-2 w-full mt-1">
          <button
            type="button"
            onClick={() => toggle("Autre")}
            className="px-3 py-1.5 rounded-lg text-sm border transition-all duration-150 shrink-0"
            style={
              selected.includes("Autre")
                ? { backgroundColor: ACCENT, color: "#fff", borderColor: ACCENT, fontWeight: 500 }
                : { backgroundColor: "#f8fafc", color: "#334155", borderColor: "#e2e8f0" }
            }
          >
            Autre
          </button>
          {selected.includes("Autre") && (
            <input
              type="text"
              value={otherValue ?? ""}
              onChange={(e) => onOtherChange?.(e.target.value)}
              placeholder={otherPlaceholder ?? "Précisez..."}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00]"
            />
          )}
        </div>
      )}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">{children}</p>
  );
}

export default function DevisElectriciteForm() {
  const [natureIntervention, setNatureIntervention] = useState<string[]>([]);
  const [typeDemande, setTypeDemande] = useState<string[]>([]);
  const [typeDemandeAutre, setTypeDemandeAutre] = useState("");
  const [typeBatiment, setTypeBatiment] = useState<string[]>([]);
  const [batimentAutre, setBatimentAutre] = useState("");
  const [puissance, setPuissance] = useState<string[]>([]);
  const [puissanceAutre, setPuissanceAutre] = useState("");
  const [surface, setSurface] = useState("");
  const [hauteur, setHauteur] = useState("");
  const [travauxInstall, setTravauxInstall] = useState<string[]>([]);
  const [travauxDepannage, setTravauxDepannage] = useState<string[]>([]);
  const [depannageAutre, setDepannageAutre] = useState("");
  const [jours, setJours] = useState<string[]>([]);
  const [creneaux, setCreneaux] = useState<string[]>([]);
  const [autreCreneaux, setAutreCreneaux] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (contact: ContactData) => {
    const payload = {
      natureIntervention,
      typeDemande: typeDemande.includes("Autre")
        ? [...typeDemande.filter((t) => t !== "Autre"), `Autre: ${typeDemandeAutre}`]
        : typeDemande,
      typeBatiment: typeBatiment.includes("Autre")
        ? [...typeBatiment.filter((b) => b !== "Autre"), `Autre: ${batimentAutre}`]
        : typeBatiment,
      puissance: puissance.includes("Autre")
        ? [...puissance.filter((p) => p !== "Autre"), `Autre: ${puissanceAutre}`]
        : puissance,
      surface,
      hauteur,
      travauxInstallation: travauxInstall,
      travauxDepannage: travauxDepannage.includes("Autre")
        ? [...travauxDepannage.filter((d) => d !== "Autre"), `Autre: ${depannageAutre}`]
        : travauxDepannage,
      jours,
      creneaux: autreCreneaux ? [...creneaux, `Autre: ${autreCreneaux}`] : creneaux,
      ...contact,
    };
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Demande électricité:", payload);
    toast.success("Demande envoyée ! Nous vous contactons sous 24h.", {
      description: `Un électricien vous rappellera au ${contact.telephone}.`,
    });
    setNatureIntervention([]); setTypeDemande([]); setTypeDemandeAutre("");
    setTypeBatiment([]); setBatimentAutre(""); setPuissance([]); setPuissanceAutre("");
    setSurface(""); setHauteur(""); setTravauxInstall([]); setTravauxDepannage([]);
    setDepannageAutre(""); setJours([]); setCreneaux([]); setAutreCreneaux("");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* 1. Nature de l'intervention */}
      <SectionCard num={1} title="Nature de l'intervention souhaitée">
        <ToggleGroup
          options={["Étude et devis", "Fourniture et pose", "Main d'œuvre seule", "Recherche de panne", "Contrat d'entretien"]}
          selected={natureIntervention}
          onChange={setNatureIntervention}
        />
      </SectionCard>

      {/* 2. Type de demande */}
      <SectionCard num={2} title="Type de demande">
        <ToggleGroup
          options={[
            "Installation neuve",
            "Rénovation partielle / complète",
            "Dépannage / Réparation",
            "Mise en conformité / Sécurité",
            "Attestation Consuel",
            "Remplacement tableau électrique",
            "Extension / modification installation existante",
            "Étude technique / Diagnostic électrique",
          ]}
          selected={typeDemande}
          onChange={setTypeDemande}
          withOther
          otherValue={typeDemandeAutre}
          onOtherChange={setTypeDemandeAutre}
        />
      </SectionCard>

      {/* 3. Type de bâtiment */}
      <SectionCard num={3} title="Type de bâtiment">
        <ToggleGroup
          options={["Appartement", "Maison individuelle", "Immeuble / Copropriété", "Local professionnel", "Commerce / Bureau"]}
          selected={typeBatiment}
          onChange={setTypeBatiment}
          withOther
          otherValue={batimentAutre}
          onOtherChange={setBatimentAutre}
        />
      </SectionCard>

      {/* 4. Puissance électrique */}
      <SectionCard num={4} title="Puissance électrique existante ou souhaitée">
        <ToggleGroup
          options={["6 kVA", "9 kVA", "12 kVA", "36 kVA", "Triphasé", "Tarif Bleu", "Tarif Jaune", "Tarif Vert"]}
          selected={puissance}
          onChange={setPuissance}
          withOther
          otherValue={puissanceAutre}
          onOtherChange={setPuissanceAutre}
        />
      </SectionCard>

      {/* 5. Surface */}
      <SectionCard num={5} title="Surface concernée">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="surface-elec" className="block text-sm font-medium text-[#475569] mb-1.5">
              Surface (m²)
            </label>
            <input
              id="surface-elec"
              type="number"
              min="1"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              placeholder="Ex : 80"
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 ${ACCENT_RING}`}
            />
          </div>
          <div>
            <label htmlFor="hauteur-elec" className="block text-sm font-medium text-[#475569] mb-1.5">
              Hauteur sous plafond (m)
            </label>
            <input
              id="hauteur-elec"
              type="number"
              min="1"
              step="0.1"
              value={hauteur}
              onChange={(e) => setHauteur(e.target.value)}
              placeholder="Ex : 2.5"
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 ${ACCENT_RING}`}
            />
          </div>
        </div>
      </SectionCard>

      {/* 6. Travaux — Installation / Rénovation */}
      <SectionCard num={6} title="Travaux électriques — Installation / Rénovation">
        <ToggleGroup
          options={[
            "Tableau électrique complet",
            "Disjoncteurs / Différentiels",
            "Circuits spécialisés (four, plaque, ballon…)",
            "Câblage neuf / Mise à niveau",
            "Mise à la terre",
            "Éclairage intérieur / extérieur",
            "Chauffage électrique",
            "VMC (simple / hygro / double flux)",
            "Réseaux TV / RJ45 / Téléphone",
            "Bornes de recharge",
            "Motorisation (volet, portail, garage)",
            "Alarme / Interphone / Vidéo",
            "Protection parafoudre",
            "Branchement provisoire",
          ]}
          selected={travauxInstall}
          onChange={setTravauxInstall}
        />
      </SectionCard>

      {/* 7. Dépannage */}
      <SectionCard num={7} title="Dépannage — Symptômes / Problèmes">
        <ToggleGroup
          options={[
            "Intervention urgente",
            "Coupure d'électricité partielle ou totale",
            "Court-circuit / Disjoncteur qui saute",
            "Surcharge électrique",
            "Prise ou interrupteur défectueux",
            "Appareil électrique non alimenté",
            "Éclairage non fonctionnel",
            "Odeur de brûlé / Échauffement anormal",
            "Détection d'anomalies électriques",
            "Dépannage VMC",
          ]}
          selected={travauxDepannage}
          onChange={setTravauxDepannage}
          withOther
          otherValue={depannageAutre}
          onOtherChange={setDepannageAutre}
          otherPlaceholder="Autre panne à préciser..."
        />
      </SectionCard>

      {/* 8 & 9. Disponibilités */}
      <SectionCard num={8} title="Disponibilités pour visite technique">
        <SubLabel>Jours disponibles</SubLabel>
        <ToggleGroup
          options={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]}
          selected={jours}
          onChange={setJours}
        />

        <SubLabel>Créneaux horaires</SubLabel>
        <ToggleGroup
          options={["Matin (8h–12h)", "Après-midi (13h–17h)", "Soir (17h–20h)"]}
          selected={creneaux}
          onChange={setCreneaux}
        />

        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-[#475569] shrink-0">Autre créneau :</span>
          <input
            type="text"
            value={autreCreneaux}
            onChange={(e) => setAutreCreneaux(e.target.value)}
            placeholder="Précisez..."
            className={`flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${ACCENT_RING}`}
          />
        </div>
      </SectionCard>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-[#ff8c00]/30 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-[#0da2e1] text-white text-sm font-bold flex items-center justify-center shrink-0">
            ✉
          </div>
          <h2 className="text-base font-bold text-[#0f172a]">Vos coordonnées</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="prenom-elec" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Prénom *</label>
            <input id="prenom-elec" {...register("prenom")} placeholder="Jean" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
          </div>
          <div>
            <label htmlFor="nom-elec" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Nom *</label>
            <input id="nom-elec" {...register("nom")} placeholder="Dupont" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
          </div>
          <div>
            <label htmlFor="telephone-elec" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Téléphone *</label>
            <input id="telephone-elec" type="tel" {...register("telephone")} placeholder="06 12 34 56 78" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>}
          </div>
          <div>
            <label htmlFor="email-elec" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email *</label>
            <input id="email-elec" type="email" {...register("email")} placeholder="jean@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="adresse-elec" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Adresse d'intervention</label>
          <input id="adresse-elec" {...register("adresse")} placeholder="12 rue de la Paix, 75001 Paris" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
        </div>

        <label className="flex items-start gap-2 cursor-pointer mb-2">
          <input type="checkbox" {...register("rgpd")} className="mt-0.5 w-4 h-4 rounded accent-[#ff8c00]" />
          <span className="text-xs text-[#64748b]">
            J&apos;accepte que mes données soient traitées conformément à la{" "}
            <a href="/mentions-legales#confidentialite" className="text-[#ff8c00] underline-offset-2 hover:underline">politique de confidentialité</a>. *
          </span>
        </label>
        {errors.rgpd && <p className="text-red-500 text-xs mb-3">{errors.rgpd.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          style={{ backgroundColor: isSubmitting ? "#ccc" : ACCENT }}
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande d'intervention"}
        </button>

        <p className="text-center text-xs text-[#94a3b8] mt-3">
          Réponse sous 24h — ou appelez directement{" "}
          <a href={COMPANY.phoneHref} className="text-[#0da2e1] font-semibold hover:underline">
            {COMPANY.phone}
          </a>
        </p>
      </div>

    </form>
  );
}
