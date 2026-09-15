import Link from "next/link";
import { GENRE_LABELS } from "@/lib/data.js";
import BookActions from "@/components/BookActions";
import ReviewForm from "@/components/ReviewForm";
import CoverImage from "@/components/CoverImage";

export default function BookDetailContent({ book, score, reasons, libraryEntry, review, similar, booksHrefBase = "/books" }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="overflow-hidden rounded-md border border-line bg-card shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
          <div className="h-72 md:h-auto">
            <CoverImage book={book} glyphClassName="text-8xl" />
          </div>
          <div className="p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {book.genres.map((g) => (
                <span key={g} className="rounded-full bg-paper-2 px-2.5 py-1 text-[12px] text-ink">
                  {GENRE_LABELS[g]}
                </span>
              ))}
            </div>
            <h1 className="mb-1 font-serif text-3xl font-bold text-ink">{book.title}</h1>
            <p className="mb-3.5 text-[14.5px] text-ink-soft">بقلم {book.author}</p>
            {score != null && (
              <div className="mb-4">
                <span className="rounded-full bg-purple px-3 py-1.5 text-[13px] font-semibold text-white">
                  {score}% مناسب لك
                </span>
              </div>
            )}
            <div className="mb-4.5 flex flex-wrap gap-4.5 text-[13px] text-ink-soft">
              <span>{book.pages} صفحة</span>
              <span>نُشر {book.year}</span>
              <span>تقييم القراء {book.rating} / ٥</span>
            </div>
            <BookActions bookId={book.id} initialEntry={libraryEntry} bookPages={book.pages} />
          </div>
        </div>

        <div className="p-8 pt-0 md:p-8">
          <p className="mb-4 text-[14.5px] leading-loose text-ink">{book.blurb}</p>

          {book.summary && (
            <div className="mb-5">
              <h4 className="mb-2 text-[15px] font-semibold text-ink">الخلاصة</h4>
              <p className="text-[14px] leading-loose text-ink-soft">{book.summary}</p>
            </div>
          )}

          {book.flags.includes("violent_content") && (
            <div className="mb-4 border-r-[3px] border-red bg-red/10 px-3.5 py-2.5 text-[13px] text-red">
              تنبيه محتوى: يحتوي هذا الكتاب على مشاهد عنف قد لا تناسب بعض القرّاء.
            </div>
          )}
          {book.flags.includes("tragic_end") && (
            <div className="mb-4 border-r-[3px] border-red bg-red/10 px-3.5 py-2.5 text-[13px] text-red">
              تنبيه محتوى: نهاية الكتاب مؤثرة وقد تكون حزينة.
            </div>
          )}

          {reasons.length > 0 && (
            <details className="mb-5 rounded border border-[#C9E4F5] bg-purple-light p-4">
              <summary className="cursor-pointer text-[14px] font-semibold text-purple-dark">
                لماذا رُشّح لك هذا الكتاب؟ <span className="text-[11px] font-normal">(اضغط للتفاصيل)</span>
              </summary>
              <ul className="mt-2.5 list-disc pr-5 text-[13.5px] text-ink">
                {reasons.map((r) => (
                  <li key={r} className="mb-1.5">{r}</li>
                ))}
              </ul>
            </details>
          )}

          {similar.length > 0 && (
            <div className="mb-6">
              <h4 className="mb-3 text-[15px] font-semibold text-ink">كتب مشابهة</h4>
              <div className="flex gap-3 overflow-x-auto">
                {similar.map((s) => (
                  <Link key={s.id} href={`${booksHrefBase}/${s.id}`} className="w-[100px] flex-shrink-0">
                    <div className="h-32 overflow-hidden rounded">
                      <CoverImage book={s} glyphClassName="text-3xl" />
                    </div>
                    <p className="mt-1.5 text-center text-[11.5px] text-ink-soft">{s.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {libraryEntry.status === "done" && (
            <ReviewForm bookId={book.id} initialReview={review} />
          )}
        </div>
      </div>
    </div>
  );
}
