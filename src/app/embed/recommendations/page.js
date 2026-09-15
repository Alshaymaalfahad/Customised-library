import { getProfile } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import RecommendationsView from "@/components/RecommendationsView";

export default async function EmbedRecommendationsPage() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;

  return (
    <div className="px-4 py-6">
      <h1 className="mb-1 font-serif text-2xl font-bold text-ink">توصياتي</h1>
      <p className="mb-6 text-[13px] text-ink-soft">
        {profile
          ? "رُتّبت هذه المجموعات بناءً على ملف ذوقك القرائي."
          : "أكمل استبيان الذوق أولًا لنبني توصياتك الشخصية."}
      </p>
      <RecommendationsView readerId={readerId} profile={profile} quizHref="/embed/quiz" booksHrefBase="/embed/books" />
    </div>
  );
}
