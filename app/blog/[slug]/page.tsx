import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_ARTICLES } from "@/lib/data/blog";
import { Clock, ArrowLeft, Tag } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const ARTICLE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Therklima" },
    publisher: { "@type": "Organization", name: "Therklima" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[420px] flex items-end overflow-hidden" aria-label={`Article : ${article.title}`}>
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.85) 100%)` }} />
        </div>
        {/* Content */}
        <div className="relative z-10 container-custom max-w-3xl py-12 md:py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour au blog
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-4"
            style={{ backgroundColor: article.metierColor }}
          >
            {article.metierName}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span>{new Date(article.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" /> {article.readTime} de lecture
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none">
            {article.content.split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h2 key={i} className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">{line.slice(2)}</h2>;
              if (line.startsWith("## ")) return <h3 key={i} className="text-xl font-bold text-[#0f172a] mt-6 mb-3">{line.slice(3)}</h3>;
              if (line.startsWith("### ")) return <h4 key={i} className="text-lg font-semibold text-[#0f172a] mt-4 mb-2">{line.slice(4)}</h4>;
              if (line.startsWith("- ")) return <li key={i} className="text-[#475569] ml-4">{line.slice(2)}</li>;
              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-[#0f172a]">{line.slice(2, -2)}</p>;
              if (line.trim()) return <p key={i} className="text-[#475569] leading-relaxed mb-4">{line}</p>;
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[#f1f5f9] text-[#475569] text-xs rounded-full">
                <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
              </span>
            ))}
          </div>

          {/* CTA inline */}
          <div className="mt-10 bg-[#e6f6fc] border border-[#0da2e1]/20 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-[#0f172a] mb-2">Un projet {article.metierName} ?</h3>
            <p className="text-[#475569] text-sm mb-4">Nos experts vous accompagnent de A à Z. Devis gratuit sous 24h.</p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
