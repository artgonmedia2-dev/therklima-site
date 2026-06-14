import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions Légales, CGV & Politique de Confidentialité",
  description: "Mentions légales, conditions générales de vente et politique de confidentialité (RGPD) de Therklima.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="section-padding bg-white" aria-label="Mentions légales et politique de confidentialité">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-bold text-[#0f172a] mb-10">Mentions Légales</h1>

        {/* Éditeur */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">1. Éditeur du site</h2>
          <div className="bg-[#f8fafc] rounded-xl p-5 text-sm text-[#475569] space-y-1">
            <p><strong>Raison sociale :</strong> Therklima</p>
            <p><strong>Forme juridique :</strong> SARL</p>
            <p><strong>SIRET :</strong> {COMPANY.siret}</p>
            <p><strong>Siège social :</strong> Paris, France</p>
            <p><strong>Téléphone :</strong> {COMPANY.phone}</p>
            <p><strong>Email :</strong> {COMPANY.email}</p>
            <p><strong>Directeur de la publication :</strong> Gérant de Therklima</p>
          </div>
        </div>

        {/* Hébergement */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">2. Hébergement</h2>
          <p className="text-sm text-[#475569]">
            Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA.
          </p>
        </div>

        {/* CGV */}
        <div id="cgv" className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">3. Conditions Générales de Vente (CGV)</h2>
          <div className="space-y-3 text-sm text-[#475569] leading-relaxed">
            <p><strong>Objet :</strong> Les présentes CGV définissent les droits et obligations de Therklima et de ses clients dans le cadre de la prestation de services en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation.</p>
            <p><strong>Devis :</strong> Tout devis est valable 30 jours à compter de sa date d&apos;émission. L&apos;acceptation du devis signé par le client vaut bon de commande.</p>
            <p><strong>Paiement :</strong> Le paiement est dû à la réception de la facture, sauf accord contraire. En cas de retard, des pénalités de 3 fois le taux légal seront appliquées.</p>
            <p><strong>Garantie :</strong> Nos travaux bénéficient de la garantie décennale (10 ans) pour les travaux de construction et de la garantie biennale (2 ans) pour les équipements, conformément aux articles 1792 et suivants du Code Civil.</p>
            <p><strong>Responsabilité :</strong> Therklima est assuré en responsabilité civile professionnelle et décennale auprès d&apos;une compagnie d&apos;assurance réputée.</p>
          </div>
        </div>

        {/* Confidentialité / RGPD */}
        <div id="confidentialite" className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">4. Politique de Confidentialité (RGPD)</h2>
          <div className="space-y-3 text-sm text-[#475569] leading-relaxed">
            <p><strong>Responsable du traitement :</strong> Therklima, {COMPANY.email}</p>
            <p><strong>Données collectées :</strong> Dans le cadre de vos demandes de devis et de contact, nous collectons : nom, prénom, téléphone, email, adresse, et description de votre projet.</p>
            <p><strong>Finalité :</strong> Ces données sont utilisées uniquement pour répondre à vos demandes et établir des devis. Elles ne sont jamais transmises à des tiers sans votre consentement.</p>
            <p><strong>Durée de conservation :</strong> Vos données sont conservées 3 ans à compter de notre dernier contact, conformément à la réglementation RGPD.</p>
            <p><strong>Vos droits :</strong> Conformément au RGPD (Règlement UE 2016/679), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de portabilité et d&apos;opposition. Pour exercer ces droits, contactez-nous à {COMPANY.email}.</p>
            <p><strong>Cookies :</strong> Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de tracking tiers n&apos;est utilisé sans votre consentement explicite.</p>
            <p><strong>Réclamation :</strong> Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés), www.cnil.fr.</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">5. Certifications professionnelles</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#475569]">
            {[
              { label: "Qualifelec", desc: "Qualification électricité" },
              { label: "RGE QualiPac", desc: "Pompes à chaleur" },
              { label: "Qualigaz", desc: "Installations gaz" },
              { label: "Garantie décennale", desc: "Assurance construction" },
            ].map((c) => (
              <div key={c.label} className="bg-[#f8fafc] rounded-xl p-4">
                <p className="font-semibold text-[#0f172a]">{c.label}</p>
                <p className="text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Propriété intellectuelle */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">6. Propriété intellectuelle</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive de Therklima et est protégé par le droit d&apos;auteur français et les conventions internationales. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </div>

        <p className="text-xs text-[#94a3b8]">
          Dernière mise à jour : juin 2026
        </p>
      </div>
    </section>
  );
}
