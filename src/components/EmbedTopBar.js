"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/embed/quiz", label: "اكتشف ذوقي" },
  { href: "/embed/discover", label: "اكتشف كتابًا" },
  { href: "/embed/recommendations", label: "توصياتي" },
  { href: "/embed/library", label: "مكتبتي" },
];

export const EMBED_TOPBAR_HEIGHT = 96;

export default function EmbedTopBar() {
  const pathname = usePathname();

  const close = () => {
    try {
      window.parent.postMessage({ type: "maktaba-widget:close" }, "*");
    } catch {
      /* لا شيء — قد تكون اللوحة مفتوحة مباشرة بدون أب */
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm border-[1.5px] border-purple font-serif text-base text-purple">
            أ
          </span>
          <span className="font-serif text-lg font-bold text-ink">اكتشف ذوقك القرائي</span>
        </div>
        <button
          onClick={close}
          aria-label="إغلاق"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink hover:bg-ink/20"
        >
          ×
        </button>
      </div>
      <nav className="flex gap-0.5 overflow-x-auto px-3 pb-2">
        {LINKS.map((l) => {
          const active = pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded px-2.5 py-1.5 text-[13px] transition-colors ${
                active ? "bg-purple-light text-purple-dark font-semibold" : "text-ink-soft hover:bg-ink/5"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
