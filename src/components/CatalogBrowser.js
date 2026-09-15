"use client";
import { useMemo, useState } from "react";
import BookCard from "@/components/BookCard";

export default function CatalogBrowser({ books, genreLabels, hasProfile, hrefBase = "/books" }) {
  const [genre, setGenre] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = books;
    if (genre !== "all") list = list.filter((b) => b.genres.includes(genre));
    if (q.trim()) {
      const query = q.trim();
      list = list.filter((b) => b.title.includes(query) || b.author.includes(query));
    }
    if (hasProfile) list = [...list].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    return list;
  }, [books, genre, q, hasProfile]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن عنوان أو مؤلف..."
          className="min-w-[220px] flex-1 rounded border-[1.5px] border-line bg-card px-4 py-2.5 text-[14.5px] text-ink outline-none focus:border-purple"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setGenre("all")}
          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] whitespace-nowrap ${
            genre === "all" ? "border-ink bg-ink text-white" : "border-line bg-card text-ink-soft"
          }`}
        >
          كل الأنواع
        </button>
        {Object.entries(genreLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setGenre(key)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] whitespace-nowrap ${
              genre === key ? "border-ink bg-ink text-white" : "border-line bg-card text-ink-soft"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">
          {genre === "all" ? "كل الكتب" : genreLabels[genre]}
        </h2>
        <span className="text-[12.5px] text-ink-soft">{filtered.length} كتاب</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded border border-dashed border-line py-16 text-center text-ink-soft">
          لا توجد كتب مطابقة لبحثك أو للتصفية المختارة.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} score={b.score} hrefBase={hrefBase} />
          ))}
        </div>
      )}
    </div>
  );
}
