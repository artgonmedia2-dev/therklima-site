"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, Zap, Droplets, Flame, Snowflake, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { COMPANY, METIERS } from "@/lib/constants";

const metierIcons: Record<string, LucideIcon> = {
  electricite: Zap,
  plomberie: Droplets,
  chauffage: Flame,
  climatisation: Snowflake,
  pac: Thermometer,
  ventilation: Wind,
};

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Therklima — Accueil">
      <div className={`relative transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-11 h-11"}`}>
        <Image
          src="/logo.png"
          alt="Logo Therklima — flocon, éclair et flamme"
          fill
          className="object-contain"
          priority
          sizes="44px"
        />
      </div>
      <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-[#0f172a]" : "text-white"}`}>
        THERK<span className="text-[#0da2e1]">LIMA</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMetiersOpen, setIsMetiersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#0da2e1] focus:text-white">
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo scrolled={isScrolled} />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
              <Link
                href="/"
                className={`text-sm font-medium hover:text-[#0da2e1] transition-colors ${isScrolled ? "text-[#334155]" : "text-white/90"}`}
              >
                Accueil
              </Link>

              {/* Métiers Dropdown */}
              <div className="relative" onMouseEnter={() => setIsMetiersOpen(true)} onMouseLeave={() => setIsMetiersOpen(false)}>
                <button
                  className={`flex items-center gap-1 text-sm font-medium hover:text-[#0da2e1] transition-colors ${isScrolled ? "text-[#334155]" : "text-white/90"}`}
                  aria-expanded={isMetiersOpen}
                  aria-haspopup="true"
                >
                  Nos Métiers <ChevronDown className={`w-4 h-4 transition-transform ${isMetiersOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>

                {isMetiersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid grid-cols-2 gap-2">
                    {METIERS.map((metier) => {
                      const Icon = metierIcons[metier.id];
                      return (
                        <Link
                          key={metier.id}
                          href={metier.slug}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: metier.color + "20" }}>
                            <Icon className="w-4 h-4" style={{ color: metier.color }} aria-hidden="true" />
                          </div>
                          <span className="text-sm font-medium text-[#334155] group-hover:text-[#0da2e1] transition-colors">{metier.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {[
                { href: "/realisations", label: "Réalisations" },
                { href: "/tarifs", label: "Tarifs" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium hover:text-[#0da2e1] transition-colors ${isScrolled ? "text-[#334155]" : "text-white/90"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={COMPANY.phoneHref}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isScrolled ? "text-[#0da2e1]" : "text-white"}`}
                aria-label={`Appeler Therklima au ${COMPANY.phone}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {COMPANY.phone}
              </a>
              <Link
                href="/devis"
                className="px-4 py-2 bg-[#0da2e1] hover:bg-[#0878a8] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Devis gratuit
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? "text-[#0f172a]" : "text-white"}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <nav className="container-custom py-4 space-y-1" aria-label="Navigation mobile">
              <Link href="/" className="block py-2 px-3 rounded-lg text-[#334155] hover:bg-gray-50 font-medium" onClick={() => setIsMobileOpen(false)}>
                Accueil
              </Link>
              <div className="py-2 px-3">
                <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Nos Métiers</p>
                <div className="grid grid-cols-2 gap-2">
                  {METIERS.map((metier) => {
                    const Icon = metierIcons[metier.id];
                    return (
                      <Link
                        key={metier.id}
                        href={metier.slug}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: metier.color }} aria-hidden="true" />
                        <span className="text-sm font-medium text-[#334155]">{metier.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              {[
                { href: "/realisations", label: "Réalisations" },
                { href: "/tarifs", label: "Tarifs" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-3 rounded-lg text-[#334155] hover:bg-gray-50 font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 pb-2 flex flex-col gap-2">
                <a href={COMPANY.phoneHref} className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl text-[#0da2e1] font-semibold">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
                <Link href="/devis" className="flex items-center justify-center py-3 bg-[#0da2e1] text-white rounded-xl font-semibold" onClick={() => setIsMobileOpen(false)}>
                  Demander un devis gratuit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-2">
          <a
            href={COMPANY.phoneHref}
            className="flex items-center justify-center gap-2 py-3 text-[#0da2e1] font-semibold text-sm border-r border-gray-200"
            aria-label={`Appeler au ${COMPANY.phone}`}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Appeler
          </a>
          <Link href="/devis" className="flex items-center justify-center gap-2 py-3 bg-[#0da2e1] text-white font-semibold text-sm">
            Devis gratuit
          </Link>
        </div>
      </div>
    </>
  );
}
