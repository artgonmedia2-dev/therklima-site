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

function SectionCard({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-[#00bcd4] text-white text-sm font-bold flex items-center justify-center shrink-0">
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
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  withOther?: boolean;
  otherValue?: string;
  onOtherChange?: (val: string) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          aria-pressed={selected.includes(opt)}
          className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-150 ${
            selected.includes(opt)
              ? "bg-[#00bcd4] text-white border-[#00bcd4] font-medium shadow-sm"
              : "bg-[#f8fafc] text-[#334155] border-gray-200 hover:border-[#00bcd4] hover:text-[#00bcd4]"
          }`}
        >
          {opt}
        </button>
      ))}
      {withOther && (
        <div className="flex items-center gap-2 w-full mt-1">
          <button
            type="button"
            onClick={() => toggle("Autre")}
            aria-pressed={selected.includes("Autre")}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-150 shrink-0 ${
              selected.includes("Autre")
                ? "bg-[#00bcd4] text-white border-[#00bcd4] font-medium"
                : "bg-[#f8fafc] text-[#334155] border-gray-200 hover:border-[#00bcd4]"
            }`}
          >
            Autre
          </button>
          {selected.includes("Autre") && (
            <input
              type="text"
              value={otherValue ?? ""}
              onChange={(e) => onOtherChange?.(e.target.value)}
              placeholder="Précisez..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]/20"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function DevisClimatisationForm() {
  const [natureIntervention, setNatureIntervention] = useState<string[]>([]);
  const [typeDemande, setTypeDemande] = useState<string[]>([]);
  const [typeEquipement, setTypeEquipement] = useState<string[]>([]);
  const [configuration, setConfiguration] = useState<string[]>([]);
  const [configAutre, setConfigAutre] = useState("");
  const [marque, setMarque] = useState<string[]>([]);
  const [marqueAutre, setMarqueAutre] = useState("");
  const [symptomes, setSymptomes] = useState<string[]>([]);
  const [symptomesAutre, setSymptomesAutre] = useState("");
  const [typeBatiment, setTypeBatiment] = useState<string[]>([]);
  const [batimentAutre, setBatimentAutre] = useState("");
  const [surface, setSurface] = useState("");
  const [hauteur, setHauteur] = useState("");
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
      typeDemande,
      typeEquipement,
      configuration: configuration.includes("Autre") ? [...configuration.filter((c) => c !== "Autre"), `Autre: ${configAutre}`] : configuration,
      marque: marque.includes("Autre") ? [...marque.filter((m) => m !== "Autre"), `Autre: ${marqueAutre}`] : marque,
      symptomes: symptomes.includes("Autre") ? [...symptomes.filter((s) => s !== "Autre"), `Autre: ${symptomesAutre}`] : symptomes,
      typeBatiment: typeBatiment.includes("Autre") ? [...typeBatiment.filter((b) => b !== "Autre"), `Autre: ${batimentAutre}`] : typeBatiment,
      surface,
      hauteur,
      jours,
      creneaux: autreCreneaux ? [...creneaux, `Autre: ${autreCreneaux}`] : creneaux,
      ...contact,
    };
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Demande climatisation:", payload);
    toast.success("Demande envoyée ! Nous vous contactons sous 24h.", { description: `Un technicien vous rappellera au ${contact.telephone}.` });
    // Reset all
    setNatureIntervention([]); setTypeDemande([]); setTypeEquipement([]);
    setConfiguration([]); setConfigAutre(""); setMarque([]); setMarqueAutre("");
    setSymptomes([]); setSymptomesAutre(""); setTypeBatiment([]); setBatimentAutre("");
    setSurface(""); setHauteur(""); setJours([]); setCreneaux([]); setAutreCreneaux("");
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
          options={["Installation neuve", "Remplacement équipement existant", "Réparation / Dépannage", "Entretien / Maintenance", "Mise en service"]}
          selected={typeDemande}
          onChange={setTypeDemande}
        />
      </SectionCard>

      {/* 3. Type d'équipement */}
      <SectionCard num={3} title="Type d'équipement concerné">
        <ToggleGroup
          options={["Pompe à chaleur air/air", "Pompe à chaleur air/eau", "Climatisation réversible (chauffage + froid)"]}
          selected={typeEquipement}
          onChange={setTypeEquipement}
        />
      </SectionCard>

      {/* 4. Configuration */}
      <SectionCard num={4} title="Configuration du système">
        <ToggleGroup
          options={["Mono split", "Multi split", "Gainable", "Cassette", "Console", "Plafonnier", "Murale"]}
          selected={configuration}
          onChange={setConfiguration}
          withOther
          otherValue={configAutre}
          onOtherChange={setConfigAutre}
        />
      </SectionCard>

      {/* 5. Marque */}
      <SectionCard num={5} title="Marque de l'équipement">
        <ToggleGroup
          options={["Daikin", "Mitsubishi Electric", "Panasonic", "Toshiba", "Hitachi", "Atlantic", "LG", "Samsung"]}
          selected={marque}
          onChange={setMarque}
          withOther
          otherValue={marqueAutre}
          onOtherChange={setMarqueAutre}
        />
      </SectionCard>

      {/* 6. Symptômes */}
      <SectionCard num={6} title="Symptômes / Problèmes rencontrés (pour dépannage)">
        <ToggleGroup
          options={[
            "Ne refroidit pas",
            "Ne chauffe pas",
            "Erreur affichée",
            "Bruit anormal",
            "Arrêts intempestifs",
            "Fuite d'eau",
            "Problème condensats / pompe de relevage",
            "Télécommande défectueuse",
            "Givre / fuite fluide frigorigène",
            "Filtre encrassé / mauvais entretien",
            "Groupe extérieur inactif",
            "Problème électrique / disjoncteur",
          ]}
          selected={symptomes}
          onChange={setSymptomes}
          withOther
          otherValue={symptomesAutre}
          onOtherChange={setSymptomesAutre}
        />
      </SectionCard>

      {/* 7. Type de bâtiment */}
      <SectionCard num={7} title="Type de bâtiment">
        <ToggleGroup
          options={["Appartement", "Maison individuelle", "Immeuble / Copropriété", "Bureau", "Commerce", "Local professionnel"]}
          selected={typeBatiment}
          onChange={setTypeBatiment}
          withOther
          otherValue={batimentAutre}
          onOtherChange={setBatimentAutre}
        />
      </SectionCard>

      {/* 8. Surface */}
      <SectionCard num={8} title="Surface à équiper">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-[#475569] mb-1.5">
              Surface (m²)
            </label>
            <input
              id="surface"
              type="number"
              min="1"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              placeholder="Ex : 35"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/30 focus:border-[#00bcd4]"
            />
          </div>
          <div>
            <label htmlFor="hauteur" className="block text-sm font-medium text-[#475569] mb-1.5">
              Hauteur sous plafond (m)
            </label>
            <input
              id="hauteur"
              type="number"
              min="1"
              step="0.1"
              value={hauteur}
              onChange={(e) => setHauteur(e.target.value)}
              placeholder="Ex : 2.5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/30 focus:border-[#00bcd4]"
            />
          </div>
        </div>
      </SectionCard>

      {/* 9. Disponibilités */}
      <SectionCard num={9} title="Disponibilités pour visite technique">
        <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Jours disponibles</p>
        <ToggleGroup
          options={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]}
          selected={jours}
          onChange={setJours}
        />

        <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2 mt-5">Créneaux horaires</p>
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
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]/20"
          />
        </div>
      </SectionCard>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-[#0da2e1]/30 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-[#0da2e1] text-white text-sm font-bold flex items-center justify-center shrink-0">
            ✉
          </div>
          <h2 className="text-base font-bold text-[#0f172a]">Vos coordonnées</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="prenom" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Prénom *</label>
            <input id="prenom" {...register("prenom")} placeholder="Jean" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
          </div>
          <div>
            <label htmlFor="nom" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Nom *</label>
            <input id="nom" {...register("nom")} placeholder="Dupont" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Téléphone *</label>
            <input id="telephone" type="tel" {...register("telephone")} placeholder="06 12 34 56 78" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email *</label>
            <input id="email" type="email" {...register("email")} placeholder="jean@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="adresse" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Adresse d'intervention</label>
          <input id="adresse" {...register("adresse")} placeholder="12 rue de la Paix, 75001 Paris" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0da2e1]/30 focus:border-[#0da2e1]" />
        </div>

        <label className="flex items-start gap-2 cursor-pointer mb-2">
          <input type="checkbox" {...register("rgpd")} className="mt-0.5 w-4 h-4 rounded accent-[#0da2e1]" />
          <span className="text-xs text-[#64748b]">
            J&apos;accepte que mes données soient traitées conformément à la{" "}
            <a href="/mentions-legales#confidentialite" className="text-[#0da2e1] underline-offset-2 hover:underline">politique de confidentialité</a>. *
          </span>
        </label>
        {errors.rgpd && <p className="text-red-500 text-xs mb-3">{errors.rgpd.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 bg-[#00bcd4] hover:bg-[#008fa1] disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
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
