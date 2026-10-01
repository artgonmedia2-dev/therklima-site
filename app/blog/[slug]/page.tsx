import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/data/blog";
import { METIER_META } from "@/lib/data/blog-types";
import { Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";
import ArticleCover from "@/components/blog/ArticleCover";
import ArticleContent, { TableOfContents, parseArticle } from "@/components/blog/ArticleContent";

/** Served host (the apex redirects to www). */
const SITE_URL = "https://www.therklima.com";

interface Props {
  params: Promise<{ slug: string }>;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `${SITE_URL}/blog/${article.slug}`;
  return {
    title: article.metaTitle ?? article.title,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      ...(article.image && { images: [{ url: `${SITE_URL}${article.image}`, alt: article.alt }] }),
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const url = `${SITE_URL}/blog/${article.slug}`;
  const metier = METIER_META[article.metier];
  const blocks = parseArticle(article.content);
  const related = [
    ...BLOG_ARTICLES.filter((a) => a.slug !== article.slug && a.metier === article.metier),
    ...BLOG_ARTICLES.filter((a) => a.slug !== article.slug && a.metier !== article.metier),
  ].slice(0, 3);

  const SCHEMA = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      inLanguage: "fr-FR",
      mainEntityOfPage: url,
      url,
      keywords: article.keywords.join(", "),
      ...(article.image && { image: `${SITE_URL}${article.image}` }),
      author: { "@type": "Organization", name: "Therklima", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Therklima",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[420px] flex items-end overflow-hidden" aria-label={`Article : ${article.title}`}>
        <div className="absolute inset-0">
          <ArticleCover article={article} priority sizes="100vw" className="object-center" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.85) 100%)` }} />
        </div>
        <div className="relative z-10 container-custom py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
          <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/blog" className="inline-flex items-center gap-1 hover:text-white">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Blog
            </Link>
          </nav>
          <span
            className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-4"
            style={{ backgroundColor: article.metierColor }}
          >
            {article.metierName}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70 text-sm">
            <span>Publié le {formatDate(article.date)}</span>
            {article.updated && article.updated !== article.date && <span>Mis à jour le {formatDate(article.updated)}</span>}
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" /> {article.readTime} de lecture
            </span>
          </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="mx-auto max-w-3xl">
          <TableOfContents blocks={blocks} />
          <ArticleContent blocks={blocks} />

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
            <h2 className="font-bold text-[#0f172a] mb-2">Un projet {article.metierName.toLowerCase()} ?</h2>
            <p className="text-[#475569] text-sm mb-4">
              Découvrez notre service{" "}
              <Link href={metier.href} className="font-semibold text-[#0878a8] underline underline-offset-2">
                {metier.name.toLowerCase()} à Paris et en Île-de-France
              </Link>{" "}
              ou demandez un devis gratuit.
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0da2e1] hover:bg-[#0878a8] text-white font-semibold rounded-xl transition-colors"
            >
              Demander un devis gratuit
            </Link>
          </div>
          </article>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-[#f8fafc]" aria-labelledby="related-heading">
        <div className="container-custom">
          <h2 id="related-heading" className="text-2xl font-bold text-[#0f172a] mb-6">À lire aussi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="text-xs font-semibold" style={{ color: a.metierColor }}>{a.metierName}</span>
                <p className="mt-2 font-bold text-[#0f172a] group-hover:text-[#0da2e1]">{a.title}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0da2e1]">
                  Lire <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
