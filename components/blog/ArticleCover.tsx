import Image from "next/image";
import { Zap, Droplets, Flame, Snowflake, Leaf, Wind, type LucideIcon } from "lucide-react";
import type { BlogArticle, MetierId } from "@/lib/data/blog-types";

const ICONS: Record<MetierId, LucideIcon> = {
  electricite: Zap,
  plomberie: Droplets,
  chauffage: Flame,
  climatisation: Snowflake,
  pac: Leaf,
  ventilation: Wind,
};

/** Article photo, or a métier-coloured cover when the article has no real photo. */
export default function ArticleCover({
  article,
  sizes,
  priority = false,
  className = "",
}: {
  article: BlogArticle;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (article.image) {
    return (
      <Image
        src={article.image}
        alt={article.alt ?? ""}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        sizes={sizes}
      />
    );
  }
  const Icon = ICONS[article.metier];
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${article.metierColor} 0%, #0f172a 100%)` }}
      aria-hidden="true"
    >
      <Icon className="h-20 w-20 text-white/25" strokeWidth={1.25} />
    </div>
  );
}
