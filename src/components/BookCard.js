"use client";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";

export default function BookCard({ book, score, reason, hrefBase = "/books" }) {
  return (
    <Link
      href={`${hrefBase}/${book.id}`}
      className="flex w-full flex-col overflow-hidden rounded border border-line bg-card transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56">
        <CoverImage book={book} />
        {score != null && (
          <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-1 text-[11.5px] font-semibold text-white">
            {score}% مناسب لك
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="mb-1 text-[15px] font-semibold leading-snug text-ink">{book.title}</p>
        <p className="mb-2 text-[12.5px] text-ink-soft">{book.author}</p>
        {reason && <p className="mt-auto text-[12px] text-purple-dark">{reason}</p>}
      </div>
    </Link>
  );
}
