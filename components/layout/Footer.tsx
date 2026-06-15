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
            {/* Google Reviews Badge */}
            <div className="inline-flex items-center gap-3 bg-[#1e293b] rounded-xl px-4 py-3 mb-2 border border-[#2d3f55]">
              {/* Google G */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                  ))}
                  <span className="text-white text-sm font-bold ml-1.5">4.8</span>
                </div>
                <p className="text-[#94a3b8] text-xs">156 avis Google</p>
              </div>
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
