import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Shield, Award, Star } from "lucide-react";
import { COMPANY, METIERS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Therklima — Accueil">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo Therklima"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                THERK<span className="text-[#0da2e1]">LIMA</span>
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
              Vos experts en électricité, plomberie, chauffage, climatisation, PAC et ventilation. Disponibles 7j/7, 24h/24.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="text-sm text-[#94a3b8]">4.8/5 — 156 avis Google</span>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e293b] rounded-lg text-xs text-[#94a3b8]">
                <Shield className="w-3 h-3" aria-hidden="true" /> Qualifelec
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e293b] rounded-lg text-xs text-[#94a3b8]">
                <Award className="w-3 h-3" aria-hidden="true" /> RGE
              </span>
            </div>
          </div>

          {/* Métiers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">Nos Métiers</h3>
            <ul className="space-y-2" role="list">
              {METIERS.map((metier) => (
                <li key={metier.id}>
                  <Link
                    href={metier.slug}
                    className="text-sm text-[#94a3b8] hover:text-[#0da2e1] transition-colors"
                  >
                    {metier.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">Services</h3>
            <ul className="space-y-2" role="list">
              {[
                { href: "/devis", label: "Devis gratuit" },
                { href: "/realisations", label: "Réalisations" },
                { href: "/avis", label: "Avis clients" },
                { href: "/tarifs", label: "Tarifs indicatifs" },
                { href: "/faq", label: "FAQ" },
                { href: "/blog", label: "Blog & Conseils" },
                { href: "/zone-intervention", label: "Zone d'intervention" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#94a3b8] hover:text-[#0da2e1] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">Contact</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#0da2e1] transition-colors"
                  aria-label={`Téléphone : ${COMPANY.phone}`}
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#0da2e1]" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#0da2e1] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#0da2e1]" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#0da2e1]" aria-hidden="true" />
                <a
                  href="https://maps.google.com/?q=6+Rue+d%27Armaillé+75017+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0da2e1] transition-colors"
                >
                  {COMPANY.addressFull}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <Clock className="w-4 h-4 shrink-0 text-[#0da2e1]" aria-hidden="true" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>

            <Link
              href="/devis"
              className="inline-block mt-5 px-5 py-2.5 bg-[#0da2e1] hover:bg-[#0878a8] text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e293b]">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748b]">
            © {currentYear} Therklima — Tous droits réservés. Réalisé par <span className="text-[#0da2e1] font-medium">artgonMEDIA</span>
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/mentions-legales#confidentialite", label: "Confidentialité" },
              { href: "/mentions-legales#cgv", label: "CGV" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-[#64748b] hover:text-[#0da2e1] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
