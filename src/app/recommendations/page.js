import { getProfile } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import RecommendationsView from "@/components/RecommendationsView";

export default async function RecommendationsPage() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;

  return (
    <div>
      <section
        className="px-6 py-11"
        style={{ background: "linear-gradient(135deg, #EFF3F6 0%, #DCEAF2 45%, #BAD8EC 100%)" }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-1.5 font-serif text-3xl font-bold text-ink">توصياتي</h1>
          <p className="text-[14.5px] text-ink-soft">
            {profile
              ? "رُتّبت هذه المجموعات بناءً على ملف ذوقك القرائي، مع سبب واضح لكل ترشيح."
              : "أكمل استبيان الذوق أولًا لنبني توصياتك الشخصية."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-11">
        <RecommendationsView readerId={readerId} profile={profile} quizHref="/quiz" booksHrefBase="/books" />
      </div>
    </div>
  );
}
