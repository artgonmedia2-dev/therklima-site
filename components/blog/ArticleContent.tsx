import Link from "next/link";
import type { ReactNode } from "react";

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export function slugifyHeading(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const splitRow = (line: string) =>
  line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

export function parseArticle(content: string): Block[] {
  const lines = content.split("\n").map((l) => l.trim());
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line || line.startsWith("# ")) {
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
    } else if (line.startsWith("> ")) {
      blocks.push({ type: "quote", text: line.slice(2) });
      i++;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i])) rows.push(splitRow(lines[i]));
        i++;
      }
      const [head = [], ...body] = rows;
      blocks.push({ type: "table", head, rows: body });
    } else if (/^- /.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const re = ordered ? /^\d+\. / : /^- /;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) {
        items.push(lines[i].replace(re, ""));
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
    } else {
      blocks.push({ type: "p", text: line });
      i++;
    }
  }
  return blocks;
}

/** Inline `**bold**` and `[text](href)`; internal links use next/link. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={k++} className="font-semibold text-[#0f172a]">{inline(m[1])}</strong>);
    } else {
      const href = m[3];
      const cls = "text-[#0878a8] font-medium underline underline-offset-2 hover:text-[#0da2e1]";
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href} className={cls}>{m[2]}</Link>
        ) : (
          <a key={k++} href={href} className={cls} target="_blank" rel="noopener noreferrer">{m[2]}</a>
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const h2s = blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2");
  if (h2s.length < 3) return null;
  return (
    <nav aria-label="Sommaire" className="mb-10 rounded-2xl border border-gray-100 bg-[#f8fafc] p-5">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0f172a]">Sommaire</p>
      <ol className="list-decimal space-y-1.5 pl-5 text-[15px] text-[#475569]">
        {h2s.map((h) => (
          <li key={h.text}>
            <a href={`#${slugifyHeading(h.text)}`} className="hover:text-[#0da2e1]">{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function ArticleContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[17px] leading-relaxed text-[#334155]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={slugifyHeading(b.text)} className="scroll-mt-28 text-2xl font-bold text-[#0f172a] mt-12 mb-4">
                {inline(b.text)}
              </h2>
            );
          case "h3":
            return <h3 key={i} className="text-xl font-semibold text-[#0f172a] mt-8 mb-3">{inline(b.text)}</h3>;
          case "quote":
            return (
              <p key={i} className="my-6 rounded-r-xl border-l-4 border-[#0da2e1] bg-[#e6f6fc] px-5 py-4 text-[#0f172a]">
                {inline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="my-4 list-disc space-y-2 pl-6 marker:text-[#0da2e1]">
                {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#0da2e1]">
                {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
                  <thead className="bg-[#0f172a] text-white">
                    <tr>{b.head.map((h, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold">{inline(h)}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-gray-100 even:bg-[#f8fafc]">
                        {r.map((c, k) => <td key={k} className="px-4 py-3 align-top">{inline(c)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return <p key={i} className="mb-5">{inline(b.text)}</p>;
        }
      })}
    </div>
  );
}
