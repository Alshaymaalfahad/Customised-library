import Link from "next/link";
import { listBooks, listExcludedBookIds } from "@/lib/repo.js";
import { buildRecommendationRows } from "@/lib/recommend.js";
import BookCard from "@/components/BookCard";

export default function RecommendationsView({ readerId, profile, quizHref = "/quiz", booksHrefBase = "/books" }) {
  if (!profile) {
    return (
      <div className="rounded-md border border-dashed border-line py-16 text-center text-ink-soft">
        <h3 className="mb-2 text-xl font-semibold text-ink">لا توجد توصيات بعد</h3>
        <p className="mb-4.5">ابدأ باستبيان اكتشاف الذوق ليصبح لدينا ما نبني عليه ترشيحاتك.</p>
        <Link
          href={quizHref}
          className="inline-block rounded-full bg-purple px-7 py-3 text-[15px] font-semibold text-white hover:bg-purple-dark"
        >
          ابدأ الاستبيان
        </Link>
      </div>
    );
  }

  const excluded = new Set(listExcludedBookIds(readerId));
  const books = listBooks().filter((b) => !excluded.has(b.id));
  const rows = buildRecommendationRows(books, profile, profile.answers);

  return (
    <div className="flex flex-col gap-11">
      {rows.map((row) => (
        <div key={row.key}>
          <h3 className="mb-1 text-[22px] font-semibold text-ink">{row.title}</h3>
          <p className="mb-4.5 text-[13.5px] text-ink-soft">{row.subtitle}</p>
          <div className="flex gap-4.5 overflow-x-auto pb-2.5">
            {row.items.map((x) => (
              <div key={x.book.id} className="w-[190px] flex-shrink-0">
                <BookCard book={x.book} score={x.score} reason={x.reasons[0]} hrefBase={booksHrefBase} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
