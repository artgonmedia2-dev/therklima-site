export type MetierId = "electricite" | "plomberie" | "chauffage" | "climatisation" | "pac" | "ventilation";

export const METIER_META: Record<MetierId, { name: string; color: string; href: string }> = {
  electricite: { name: "Électricité", color: "#ff8c00", href: "/electricite" },
  plomberie: { name: "Plomberie", color: "#2196f3", href: "/plomberie" },
  chauffage: { name: "Chauffage", color: "#f44336", href: "/chauffage" },
  climatisation: { name: "Climatisation", color: "#00bcd4", href: "/climatisation" },
  pac: { name: "Pompe à Chaleur", color: "#4caf50", href: "/pac" },
  ventilation: { name: "Ventilation", color: "#9c27b0", href: "/ventilation" },
};

/**
 * Article source. `content` is a small Markdown subset rendered by
 * components/blog/ArticleContent.tsx: `## ` H2, `### ` H3, paragraphs,
 * `- ` and `1. ` lists, `| a | b |` tables, `> ` callouts, inline `**bold**`
 * and `[texte](/lien)`. Never start content with a `# ` title (the page H1 is `title`).
 */
export type BlogArticleSource = {
  slug: string;
  /** H1 + <title> (keep ≤ 60 chars for the <title>; use metaTitle if the H1 is longer) */
  title: string;
  metaTitle?: string;
  /** Meta description, 140–160 chars */
  excerpt: string;
  metier: MetierId;
  /** ISO date YYYY-MM-DD */
  date: string;
  updated?: string;
  image?: string;
  alt?: string;
  /** Primary keyword first */
  keywords: string[];
  tags: string[];
  content: string;
};

export type BlogArticle = BlogArticleSource & {
  metierName: string;
  metierColor: string;
  readTime: string;
};
