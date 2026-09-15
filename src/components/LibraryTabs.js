"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";

const TABS = [
  ["all", "الكل"],
  ["want", "أريد قراءته"],
  ["reading", "أقرأه الآن"],
  ["done", "أنهيته"],
  ["paused", "متوقف"],
  ["dnf", "لم أكمله"],
  ["fav", "المفضلة"],
];

export default function LibraryTabs({ items, hrefBase = "/books", browseHref = "/" }) {
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    if (tab === "all") return items;
    if (tab === "fav") return items.filter((i) => i.fav);
    return items.filter((i) => i.status === tab);
  }, [items, tab]);

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line py-16 text-center text-ink-soft">
        <h3 className="mb-2 text-xl font-semibold text-ink">مكتبتك فارغة الآن</h3>
        <p className="mb-4.5">تصفّح الكتب وأضف أول كتاب تريد قراءته أو ابدأ بقراءته.</p>
        <Link href={browseHref} className="inline-block rounded-full bg-purple px-7 py-3 text-[15px] font-semibold text-white hover:bg-purple-dark">
          تصفّح المكتبة
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-1 border-b border-line">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative top-px px-4 py-2.5 text-[14px] ${
              tab === key ? "border-b-2 border-purple-dark font-semibold text-purple-dark" : "text-ink-soft"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-md border border-dashed border-line py-14 text-center text-ink-soft">
          لا توجد كتب في هذا القسم بعد.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => {
            const pct = item.status === "reading" ? Math.round((item.progressPages / item.book.pages) * 100) : null;
            return (
              <Link
                key={item.bookId}
                href={`${hrefBase}/${item.bookId}`}
                className="flex items-center gap-4 rounded border border-line bg-card p-3.5 hover:border-purple"
              >
                <div className="h-22 w-16 flex-shrink-0 overflow-hidden rounded">
                  <CoverImage book={item.book} glyphClassName="text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5 text-[15px] font-semibold text-ink">
                    {item.book.title} {item.fav && <span className="text-purple">★</span>}
                  </p>
                  <p className="mb-2 text-[12.5px] text-ink-soft">{item.book.author}</p>
                  {pct != null && (
                    <>
                      <div className="h-1.5 max-w-[220px] overflow-hidden rounded-full bg-paper-2">
                        <div className="h-full rounded-full bg-blue" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-[12px] text-blue">أنجزت {pct}%</p>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
