import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_ARTICLES } from "@/lib/data/blog";
import { Clock, ArrowRight } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Blog & Conseils — Électricité, Plomberie, Chauffage, Clim, PAC, VMC",
  description:
    "Conseils d'experts en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation. Guides pratiques et actualités réglementaires.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[#0f172a]" aria-label="Blog et conseils">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Conseils</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Guides pratiques, actualités réglementaires et conseils d&apos;experts pour vos projets de bâtiment.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="blog-heading">
        <div className="container-custom">
          <h2 id="blog-heading" className="text-3xl font-bold text-[#0f172a] mb-8">Derniers articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                {/* Photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold shadow-sm"
                    style={{ backgroundColor: article.metierColor }}
                  >
                    {article.metierName}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-[#94a3b8] mb-3">
                    <span>{new Date(article.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0f172a] mb-2 line-clamp-2 hover:text-[#0da2e1] transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0da2e1] hover:gap-2 transition-all"
                    aria-label={`Lire l'article : ${article.title}`}
                  >
                    Lire l&apos;article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
