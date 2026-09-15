import { listBooks, getProfile, listExcludedBookIds } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import { scoreBook } from "@/lib/scoring.js";
import { GENRE_LABELS } from "@/lib/data.js";
import CatalogBrowser from "@/components/CatalogBrowser";
import OpenWidgetButton from "@/components/OpenWidgetButton";

export default async function HomePage() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  const excluded = readerId ? new Set(listExcludedBookIds(readerId)) : new Set();

  const books = listBooks()
    .filter((b) => !excluded.has(b.id))
    .map((b) => ({ ...b, score: profile ? scoreBook(b, profile) : null }));

  return (
    <div>
      <section
        className="px-6 py-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, #EFF3F6 0%, #DCEAF2 45%, #BAD8EC 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-4xl font-bold text-ink md:text-5xl">
            أهلاً بك في <span className="text-purple-dark">مكتبة الأصيل</span>
          </h1>
          <p className="mb-8 text-lg text-ink-soft">
            ١٠٠ عنوان عربي ومترجم حقيقي — منصة تبدأ من فهم ذوقك القرائي، لا من قائمة كتب عشوائية.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <OpenWidgetButton className="rounded-full bg-purple px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-purple-dark">
              {profile ? "أعد اكتشاف ذوقي" : "اكتشف ذوقك القرائي"}
            </OpenWidgetButton>
            <OpenWidgetButton className="rounded-full border-[1.5px] border-ink/20 bg-white px-7 py-3.5 text-[15.5px] font-semibold text-ink transition-colors hover:border-purple hover:text-purple-dark">
              {profile ? "شاهد توصياتي" : "اكتشف لي كتابًا الآن"}
            </OpenWidgetButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <CatalogBrowser books={books} genreLabels={GENRE_LABELS} hasProfile={!!profile} />
      </section>
    </div>
  );
}
