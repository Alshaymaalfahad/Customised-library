import Link from "next/link";
import { levelLabel } from "@/lib/scoring.js";

export default function ResultCard({ profile, recsHref = "/recommendations", quizHref = "/quiz" }) {
  return (
    <div
      className="px-6 py-16"
      style={{ background: "linear-gradient(135deg, #EFF3F6 0%, #DCEAF2 45%, #BAD8EC 100%)" }}
    >
      <div className="mx-auto max-w-xl rounded-md border border-line bg-card p-11 text-center shadow-xl">
        <div className="mx-auto mb-4.5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple font-serif text-2xl text-purple-dark">
          م
        </div>
        <div className="mb-2 text-[13px] tracking-wide text-purple-dark">هويتك القرائية جاهزة</div>
        <h2 className="mb-3.5 font-serif text-4xl font-bold text-ink">{profile.archetype.name}</h2>
        <p className="mx-auto mb-7 max-w-md text-[15.5px] text-ink-soft">{profile.archetype.desc}</p>

        <div className="mx-auto mb-8 max-w-md text-right">
          {profile.indicators.map((ind) => (
            <div key={ind.label} className="mb-2.5 flex items-center gap-2.5 text-[13px]">
              <span className="w-36 flex-shrink-0 text-ink">
                {ind.label} ({levelLabel(ind.pct)})
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
                <span className="block h-full rounded-full bg-purple" style={{ width: `${ind.pct}%` }} />
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={recsHref}
            className="rounded-full bg-purple px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-purple-dark"
          >
            شاهد توصياتي الآن
          </Link>
          <Link
            href={quizHref}
            className="rounded-full border-[1.5px] border-ink px-7 py-3.5 text-[15.5px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            أعد الاستبيان
          </Link>
        </div>
        <p className="mt-5 text-[12.5px] text-ink-soft">
          ذوقك القرائي قابل للتعديل دائمًا، وسيتطور مع كل كتاب تقرأه وتقيّمه.
        </p>
      </div>
    </div>
  );
}
