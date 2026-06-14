"use client";

import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function FloatingPhone() {
  return (
    <a
      href={COMPANY.phoneHref}
      className="fixed bottom-20 right-4 z-30 lg:bottom-6 lg:right-6 flex items-center gap-2 bg-[#0da2e1] hover:bg-[#0878a8] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 md:hover:scale-105 group"
      aria-label={`Appeler Therklima au ${COMPANY.phone} — Disponible 24h/24`}
    >
      <Phone className="w-5 h-5 animate-pulse" aria-hidden="true" />
      <span className="hidden sm:block text-sm font-semibold whitespace-nowrap">{COMPANY.phone}</span>
    </a>
  );
}
