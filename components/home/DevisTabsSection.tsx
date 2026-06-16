"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, Wind, ChevronRight, ChevronLeft, Send, CheckCircle2, AlertTriangle, Phone } from "lucide-react";
import { toast } from "sonner";
import { COMPANY } from "@/lib/constants";

type Tab = "electricite" | "climatisation" | "urgence";

const ELEC_ACCENT = "#ff8c00";
const CLIMA_ACCENT = "#00bcd4";
const URGENCE_ACCENT = "#ef4444";

const URGENCE_STEPS = [
  "Type d'urgence",
  "Décrivez le problème",
  "Vos coordonnées",
];

const ELEC_STEPS = [
  "Nature de l'intervention souhaitée",
  "Type de demande",
  "Type de bâtiment",
  "Puissance électrique",
  "Surface concernée",
  "Travaux – Installation / Rénovation",
  "Dépannage – Symptômes / Problèmes",
  "Disponibilités & Coordonnées",
];

const CLIMA_STEPS = [
  "Nature de l'intervention souhaitée",
  "Type de demande",
  "Type d'équipement concerné",
  "Configuration du système",
  "Marque de l'équipement",
  "Symptômes / Problèmes (dépannage)",
  "Type de bâtiment",
  "Surface à équiper",
  "Disponibilités & Coordonnées",
];

// ── ToggleChips ──────────────────────────────────────────────────────────────
function ToggleChips({
  options, selected, onChange, accent,
  withOther, otherValue, onOtherChange, placeholder,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  accent: string;
  withOther?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
  placeholder?: string;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          aria-pressed={selected.includes(opt)}
          className="px-3 py-1.5 rounded-xl text-sm border font-medium transition-all duration-150"
          style={
            selected.includes(opt)
              ? { backgroundColor: accent, color: "#fff", borderColor: accent }
              : { backgroundColor: "#f8fafc", color: "#334155", borderColor: "#e2e8f0" }
          }
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
            className="px-3 py-1.5 rounded-xl text-sm border font-medium transition-all shrink-0"
            style={
              selected.includes("Autre")
                ? { backgroundColor: accent, color: "#fff", borderColor: accent }
                : { backgroundColor: "#f8fafc", color: "#334155", borderColor: "#e2e8f0" }
            }
          >
            Autre
          </button>
          {selected.includes("Autre") && (
            <input
              type="text"
              value={otherValue ?? ""}
              onChange={e => onOtherChange?.(e.target.value)}
              placeholder={placeholder ?? "Précisez..."}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── AvailabilityFields ───────────────────────────────────────────────────────
function AvailabilityFields({
  jours, setJours, creneaux, setCreneaux, autreCreneaux, setAutreCreneaux, accent,
}: {
  jours: string[]; setJours: (v: string[]) => void;
  creneaux: string[]; setCreneaux: (v: string[]) => void;
  autreCreneaux: string; setAutreCreneaux: (v: string) => void;
  accent: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Jours disponibles</p>
        <ToggleChips
          options={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]}
          selected={jours} onChange={setJours} accent={accent}
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Créneaux horaires</p>
        <ToggleChips
          options={["Matin (8h–12h)", "Après-midi (13h–17h)", "Soir (17h–20h)"]}
          selected={creneaux} onChange={setCreneaux} accent={accent}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#475569] shrink-0">Autre créneau :</span>
        <input
          type="text"
          value={autreCreneaux}
          onChange={e => setAutreCreneaux(e.target.value)}
          placeholder="Précisez..."
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none"
        />
      </div>
    </div>
  );
}

// ── ContactFields ────────────────────────────────────────────────────────────
type ContactState = { prenom: string; nom: string; telephone: string; email: string; adresse: string; rgpd: boolean };

function ContactFields({
  contact, setContact, errors,
}: {
  contact: ContactState;
  setContact: React.Dispatch<React.SetStateAction<ContactState>>;
  errors: Record<string, string>;
}) {
  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0da2e1] focus:ring-2 focus:ring-[#0da2e1]/20 transition-colors";
  return (
    <div className="space-y-3 pt-5 border-t border-gray-100 mt-6">
      <p className="text-sm font-bold text-[#0f172a]">Vos coordonnées</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input value={contact.prenom} onChange={e => setContact(p => ({ ...p, prenom: e.target.value }))} placeholder="Prénom *" className={inp} />
          {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
        </div>
        <div>
          <input value={contact.nom} onChange={e => setContact(p => ({ ...p, nom: e.target.value }))} placeholder="Nom *" className={inp} />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
        </div>
        <div>
          <input type="tel" value={contact.telephone} onChange={e => setContact(p => ({ ...p, telephone: e.target.value }))} placeholder="Téléphone *" className={inp} />
          {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
        </div>
        <div>
          <input type="email" value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} placeholder="Email *" className={inp} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <input value={contact.adresse} onChange={e => setContact(p => ({ ...p, adresse: e.target.value }))} placeholder="Adresse d'intervention" className={inp} />
      <label className="flex items-start gap-2 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={contact.rgpd}
          onChange={e => setContact(p => ({ ...p, rgpd: e.target.checked }))}
          className="mt-0.5 w-4 h-4 rounded accent-[#0da2e1]"
        />
        <span className="text-xs text-[#64748b]">
          J&apos;accepte le traitement de mes données conformément à la{" "}
          <a href="/mentions-legales#confidentialite" className="text-[#0da2e1] hover:underline">politique de confidentialité</a>. *
        </span>
      </label>
      {errors.rgpd && <p className="text-red-500 text-xs">{errors.rgpd}</p>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function DevisTabsSection() {
  const [tab, setTab] = useState<Tab>("electricite");
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // ── Electricité state ──
  const [elecNature, setElecNature] = useState<string[]>([]);
  const [elecTypeDemande, setElecTypeDemande] = useState<string[]>([]);
  const [elecTypeDemandeAutre, setElecTypeDemandeAutre] = useState("");
  const [elecBatiment, setElecBatiment] = useState<string[]>([]);
  const [elecBatimentAutre, setElecBatimentAutre] = useState("");
  const [elecPuissance, setElecPuissance] = useState<string[]>([]);
  const [elecPuissanceAutre, setElecPuissanceAutre] = useState("");
  const [elecSurface, setElecSurface] = useState("");
  const [elecHauteur, setElecHauteur] = useState("");
  const [elecTravauxInstall, setElecTravauxInstall] = useState<string[]>([]);
  const [elecDepannage, setElecDepannage] = useState<string[]>([]);
  const [elecDepannageAutre, setElecDepannageAutre] = useState("");
  const [elecJours, setElecJours] = useState<string[]>([]);
  const [elecCreneaux, setElecCreneaux] = useState<string[]>([]);
  const [elecAutreCreneaux, setElecAutreCreneaux] = useState("");

  // ── Climatisation state ──
  const [climaNature, setClimaNature] = useState<string[]>([]);
  const [climaTypeDemande, setClimaTypeDemande] = useState<string[]>([]);
  const [climaEquipement, setClimaEquipement] = useState<string[]>([]);
  const [climaConfig, setClimaConfig] = useState<string[]>([]);
  const [climaConfigAutre, setClimaConfigAutre] = useState("");
  const [climaMarque, setClimaMarque] = useState<string[]>([]);
  const [climaMarqueAutre, setClimaMarqueAutre] = useState("");
  const [climaSymptomes, setClimaSymptomes] = useState<string[]>([]);
  const [climaSymptomesAutre, setClimaSymptomesAutre] = useState("");
  const [climaBatiment, setClimaBatiment] = useState<string[]>([]);
  const [climaBatimentAutre, setClimaBatimentAutre] = useState("");
  const [climaSurface, setClimaSurface] = useState("");
  const [climaHauteur, setClimaHauteur] = useState("");
  const [climaJours, setClimaJours] = useState<string[]>([]);
  const [climaCreneaux, setClimaCreneaux] = useState<string[]>([]);
  const [climaAutreCreneaux, setClimaAutreCreneaux] = useState("");

  // ── Urgence state ──
  const [urgenceType, setUrgenceType] = useState<string[]>([]);
  const [urgenceSymptomes, setUrgenceSymptomes] = useState<string[]>([]);
  const [urgenceAutre, setUrgenceAutre] = useState("");
  const [urgenceDescription, setUrgenceDescription] = useState("");

  // ── Shared contact ──
  const [contact, setContact] = useState<ContactState>({
    prenom: "", nom: "", telephone: "", email: "", adresse: "", rgpd: false,
  });

  // ── Derived values ──
  const isElec = tab === "electricite";
  const isUrgence = tab === "urgence";
  const accent = isElec ? ELEC_ACCENT : isUrgence ? URGENCE_ACCENT : CLIMA_ACCENT;
  const stepTitles = isElec ? ELEC_STEPS : isUrgence ? URGENCE_STEPS : CLIMA_STEPS;
  const totalSteps = stepTitles.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);
  const isLastStep = step === totalSteps - 1;

  const certBadge = isElec
    ? { src: "/qualifs/qualifelec-rge.png", title: "Artisan certifié Qualifelec", sub: "Travaux électriques conformes NF C 15-100", bgClass: "bg-blue-50 border-blue-100" }
    : isUrgence
    ? { src: "/qualifs/qualifelec-rge.png", title: "Urgence 24h/24 — 7j/7", sub: "Intervention en moins d'1 heure sur Paris & IDF", bgClass: "bg-red-50 border-red-100" }
    : { src: "/qualifs/rge-qualipac.png", title: "Technicien certifié RGE QualiPac", sub: "Installation & maintenance pompes à chaleur", bgClass: "bg-cyan-50 border-cyan-100" };

  // ── Handlers ──
  const handleTabChange = (t: Tab) => {
    if (t !== tab) { setTab(t); setStep(0); setContactErrors({}); }
  };
  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const handlePrev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!contact.prenom.trim()) errs.prenom = "Prénom requis";
    if (!contact.nom.trim()) errs.nom = "Nom requis";
    if (contact.telephone.replace(/\s/g, "").length < 10) errs.telephone = "Numéro invalide";
    if (!contact.email.includes("@")) errs.email = "Email invalide";
    if (!contact.rgpd) errs.rgpd = "Consentement requis";
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      toast.success(
        isUrgence ? "Urgence reçue ! Un technicien vous rappelle sous 5 min." : "Demande envoyée ! Nous vous contactons sous 24h.",
        { description: `Nous vous rappellerons au ${contact.telephone}.` }
      );
      setSubmitted(true);
    } catch {
      toast.error("Erreur lors de l'envoi. Réessayez ou appelez-nous directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step renderers ──
  const renderElecStep = () => {
    switch (step) {
      case 0:
        return (
          <ToggleChips
            options={["Étude et devis", "Fourniture et pose", "Main d'œuvre seule", "Recherche de panne", "Contrat d'entretien"]}
            selected={elecNature} onChange={setElecNature} accent={accent}
          />
        );
      case 1:
        return (
          <ToggleChips
            options={["Installation neuve", "Rénovation partielle / complète", "Dépannage / Réparation", "Mise en conformité / Sécurité", "Attestation Consuel", "Remplacement tableau électrique", "Extension / modification installation existante", "Étude technique / Diagnostic électrique"]}
            selected={elecTypeDemande} onChange={setElecTypeDemande} accent={accent}
            withOther otherValue={elecTypeDemandeAutre} onOtherChange={setElecTypeDemandeAutre}
          />
        );
      case 2:
        return (
          <ToggleChips
            options={["Appartement", "Maison individuelle", "Immeuble / Copropriété", "Local professionnel", "Commerce / Bureau"]}
            selected={elecBatiment} onChange={setElecBatiment} accent={accent}
            withOther otherValue={elecBatimentAutre} onOtherChange={setElecBatimentAutre}
          />
        );
      case 3:
        return (
          <ToggleChips
            options={["6 kVA", "9 kVA", "12 kVA", "36 kVA", "Triphasé", "Tarif Bleu", "Tarif Jaune", "Tarif Vert"]}
            selected={elecPuissance} onChange={setElecPuissance} accent={accent}
            withOther otherValue={elecPuissanceAutre} onOtherChange={setElecPuissanceAutre}
          />
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Surface (m²)</label>
              <input
                type="number" min="1" value={elecSurface} onChange={e => setElecSurface(e.target.value)}
                placeholder="Ex : 80"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Hauteur sous plafond (m)</label>
              <input
                type="number" min="1" step="0.1" value={elecHauteur} onChange={e => setElecHauteur(e.target.value)}
                placeholder="Ex : 2.5"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <ToggleChips
            options={["Tableau électrique complet", "Disjoncteurs / Différentiels", "Circuits spécialisés (four, plaque, ballon…)", "Câblage neuf / Mise à niveau", "Mise à la terre", "Éclairage intérieur / extérieur", "Chauffage électrique", "VMC (simple / hygro / double flux)", "Réseaux TV / RJ45 / Téléphone", "Bornes de recharge", "Motorisation (volet, portail, garage)", "Alarme / Interphone / Vidéo", "Protection parafoudre", "Branchement provisoire"]}
            selected={elecTravauxInstall} onChange={setElecTravauxInstall} accent={accent}
          />
        );
      case 6:
        return (
          <ToggleChips
            options={["Intervention urgente", "Coupure d'électricité partielle ou totale", "Court-circuit / Disjoncteur qui saute", "Surcharge électrique", "Prise ou interrupteur défectueux", "Appareil électrique non alimenté", "Éclairage non fonctionnel", "Odeur de brûlé / Échauffement anormal", "Détection d'anomalies électriques", "Dépannage VMC"]}
            selected={elecDepannage} onChange={setElecDepannage} accent={accent}
            withOther otherValue={elecDepannageAutre} onOtherChange={setElecDepannageAutre}
            placeholder="Autre panne à préciser..."
          />
        );
      case 7:
        return (
          <>
            <AvailabilityFields
              jours={elecJours} setJours={setElecJours}
              creneaux={elecCreneaux} setCreneaux={setElecCreneaux}
              autreCreneaux={elecAutreCreneaux} setAutreCreneaux={setElecAutreCreneaux}
              accent={accent}
            />
            <ContactFields contact={contact} setContact={setContact} errors={contactErrors} />
          </>
        );
      default: return null;
    }
  };

  const renderClimaStep = () => {
    switch (step) {
      case 0:
        return (
          <ToggleChips
            options={["Étude et devis", "Fourniture et pose", "Main d'œuvre seule", "Recherche de panne", "Contrat d'entretien"]}
            selected={climaNature} onChange={setClimaNature} accent={accent}
          />
        );
      case 1:
        return (
          <ToggleChips
            options={["Installation neuve", "Remplacement équipement existant", "Réparation / Dépannage", "Entretien / Maintenance", "Mise en service"]}
            selected={climaTypeDemande} onChange={setClimaTypeDemande} accent={accent}
          />
        );
      case 2:
        return (
          <ToggleChips
            options={["Pompe à chaleur air/air", "Pompe à chaleur air/eau", "Climatisation réversible (chauffage + froid)"]}
            selected={climaEquipement} onChange={setClimaEquipement} accent={accent}
          />
        );
      case 3:
        return (
          <ToggleChips
            options={["Mono split", "Multi split", "Gainable", "Cassette", "Console", "Plafonnier", "Murale"]}
            selected={climaConfig} onChange={setClimaConfig} accent={accent}
            withOther otherValue={climaConfigAutre} onOtherChange={setClimaConfigAutre}
          />
        );
      case 4:
        return (
          <ToggleChips
            options={["Daikin", "Mitsubishi Electric", "Panasonic", "Toshiba", "Hitachi", "Atlantic", "LG", "Samsung"]}
            selected={climaMarque} onChange={setClimaMarque} accent={accent}
            withOther otherValue={climaMarqueAutre} onOtherChange={setClimaMarqueAutre}
          />
        );
      case 5:
        return (
          <ToggleChips
            options={["Ne refroidit pas", "Ne chauffe pas", "Erreur affichée", "Bruit anormal", "Arrêts intempestifs", "Fuite d'eau", "Problème condensats / pompe de relevage", "Télécommande défectueuse", "Givre / fuite fluide frigorigène", "Filtre encrassé / mauvais entretien", "Groupe extérieur inactif", "Problème électrique / disjoncteur"]}
            selected={climaSymptomes} onChange={setClimaSymptomes} accent={accent}
            withOther otherValue={climaSymptomesAutre} onOtherChange={setClimaSymptomesAutre}
          />
        );
      case 6:
        return (
          <ToggleChips
            options={["Appartement", "Maison individuelle", "Immeuble / Copropriété", "Bureau", "Commerce", "Local professionnel"]}
            selected={climaBatiment} onChange={setClimaBatiment} accent={accent}
            withOther otherValue={climaBatimentAutre} onOtherChange={setClimaBatimentAutre}
          />
        );
      case 7:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Surface (m²)</label>
              <input
                type="number" min="1" value={climaSurface} onChange={e => setClimaSurface(e.target.value)}
                placeholder="Ex : 35"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Hauteur sous plafond (m)</label>
              <input
                type="number" min="1" step="0.1" value={climaHauteur} onChange={e => setClimaHauteur(e.target.value)}
                placeholder="Ex : 2.5"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>
        );
      case 8:
        return (
          <>
            <AvailabilityFields
              jours={climaJours} setJours={setClimaJours}
              creneaux={climaCreneaux} setCreneaux={setClimaCreneaux}
              autreCreneaux={climaAutreCreneaux} setAutreCreneaux={setClimaAutreCreneaux}
              accent={accent}
            />
            <ContactFields contact={contact} setContact={setContact} errors={contactErrors} />
          </>
        );
      default: return null;
    }
  };

  // ── Urgence step renderer ──
  const renderUrgenceStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <ToggleChips
              options={["Panne électrique", "Fuite d'eau", "Panne de chauffage", "Odeur de gaz", "Coupure eau chaude", "Court-circuit", "Dégât des eaux", "Autre urgence"]}
              selected={urgenceType} onChange={setUrgenceType} accent={URGENCE_ACCENT}
            />
            {/* Big call button */}
            <a
              href={COMPANY.phoneHref}
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base shadow-lg shadow-red-500/20 transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}
              aria-label={`Appel urgence : ${COMPANY.phone}`}
            >
              <Phone className="w-5 h-5 animate-pulse" aria-hidden="true" />
              Urgence ? Appelez maintenant — {COMPANY.phone}
            </a>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <ToggleChips
              options={["Fuite importante", "Pas d'eau", "Disjoncteur qui saute", "Pas de chauffage", "Odeur suspecte", "Inondation", "Prise / interrupteur HS", "Ballon d'eau chaude en panne"]}
              selected={urgenceSymptomes} onChange={setUrgenceSymptomes} accent={URGENCE_ACCENT}
              withOther otherValue={urgenceAutre} onOtherChange={setUrgenceAutre}
              placeholder="Décrivez votre urgence..."
            />
            <div>
              <label className="block text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">
                Informations complémentaires (optionnel)
              </label>
              <textarea
                value={urgenceDescription}
                onChange={e => setUrgenceDescription(e.target.value)}
                placeholder="Décrivez brièvement la situation pour que notre technicien soit préparé à son arrivée..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 resize-none transition-colors"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
              <p className="text-xs text-red-700 font-medium">Un technicien vous rappelle dans les 5 minutes.</p>
            </div>
            <ContactFields contact={contact} setContact={setContact} errors={contactErrors} />
          </div>
        );
      default: return null;
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <section className="section-padding bg-[#f8fafc]" aria-label="Demande envoyée">
        <div className="container-custom max-w-3xl text-center">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Demande envoyée !</h2>
            <p className="text-[#64748b] mb-2">
              Un technicien vous rappellera sous 24h au numéro indiqué.
            </p>
            <p className="text-sm text-[#94a3b8] mb-8">
              Ou appelez directement :{" "}
              <a href={COMPANY.phoneHref} className="text-[#0da2e1] font-semibold hover:underline">
                {COMPANY.phone}
              </a>
            </p>
            <button
              onClick={() => {
                setSubmitted(false); setStep(0); setContactErrors({});
                setContact({ prenom: "", nom: "", telephone: "", email: "", adresse: "", rgpd: false });
              }}
              className="px-6 py-3 bg-[#0da2e1] text-white font-semibold rounded-xl hover:bg-[#0878a8] transition-colors"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Main render ──
  return (
    <section className="section-padding bg-[#f8fafc]" aria-label="Formulaire de demande d'intervention">
      <div className="container-custom max-w-3xl">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-[#e6f6fc] text-[#0da2e1] text-xs font-semibold rounded-full uppercase tracking-wide mb-3">
            Demande d&apos;intervention
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Obtenir un devis personnalisé
          </h2>
          <p className="text-[#64748b] mt-2 text-base">
            Réponse garantie sous 24h — Devis gratuit et sans engagement
          </p>
        </div>

        {/* Tab switcher — 3 tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#f1f5f9] rounded-2xl mb-6">
          {([
            { key: "electricite" as Tab, label: "Électricité", Icon: Zap, accent: ELEC_ACCENT },
            { key: "climatisation" as Tab, label: "Climatisation", Icon: Wind, accent: CLIMA_ACCENT },
            { key: "urgence" as Tab, label: "Urgence 24h", Icon: AlertTriangle, accent: URGENCE_ACCENT },
          ] as const).map(({ key, label, Icon, accent: tabAccent }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-1 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                tab === key
                  ? key === "urgence"
                    ? "bg-red-500 shadow-sm text-white shadow-red-500/30"
                    : "bg-white shadow-sm text-[#0f172a]"
                  : "text-[#64748b] hover:text-[#334155]"
              }`}
            >
              <Icon
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                style={{ color: tab === key ? (key === "urgence" ? "#fff" : tabAccent) : "#94a3b8" }}
                aria-hidden="true"
              />
              <span className="leading-tight text-center">{label}</span>
            </button>
          ))}
        </div>

        {/* Certification badge */}
        <div className={`flex items-center gap-4 p-4 rounded-2xl border mb-5 ${certBadge.bgClass}`}>
          <div className="relative w-24 h-14 shrink-0">
            <Image
              src={certBadge.src}
              alt={certBadge.title}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
          <div>
            <p className="font-bold text-[#0f172a] text-sm">{certBadge.title}</p>
            <p className="text-[#475569] text-xs mt-0.5">{certBadge.sub}</p>
          </div>
        </div>

        {/* Step card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[160px]">
          <h3 className="text-base font-bold text-[#0f172a] mb-5">
            {stepTitles[step]}
          </h3>
          {isElec ? renderElecStep() : isUrgence ? renderUrgenceStep() : renderClimaStep()}
        </div>

        {/* Progress + Navigation */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#64748b] font-medium">
              Étape {step + 1} sur {totalSteps}
            </span>
            <span className="font-bold" style={{ color: accent }}>
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: accent }}
            />
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-[#334155] hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                Précédent
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                Suivant
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: accent }}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            )}
          </div>

          <p className="text-center text-xs text-[#94a3b8] mt-4">
            Ou appelez directement :{" "}
            <a href={COMPANY.phoneHref} className="font-semibold text-[#0da2e1] hover:underline">
              {COMPANY.phone}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
