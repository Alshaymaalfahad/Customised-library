"use client";
import { useState } from "react";

const PACE_OPTS = [["slow", "بطيئة"], ["ok", "مناسبة"], ["fast", "سريعة جدًا"]];
const CHAR_OPTS = [["shallow", "سطحية"], ["good", "جيدة"], ["deep", "عميقة ومقنعة"]];
const ENDING_OPTS = [["yes", "نعم"], ["no", "لا"], ["mixed", "إلى حد ما"]];

export default function ReviewForm({ bookId, initialReview }) {
  const [review, setReview] = useState(
    initialReview || { stars: 0, pace: null, characters: null, endingOk: null, favoriteThing: "" }
  );
  const [saved, setSaved] = useState(false);

  const set = (patch) => {
    setReview((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const save = async () => {
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, ...review }),
    });
    setSaved(true);
  };

  return (
    <div className="border-t border-line pt-5.5">
      <h4 className="mb-3.5 text-[15px] font-semibold text-ink">كيف كانت تجربتك مع هذا الكتاب؟</h4>

      <div className="mb-4 flex gap-1 text-2xl">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => set({ stars: n })}
            className={`cursor-pointer ${n <= (review.stars || 0) ? "text-purple" : "text-paper-2"}`}
          >
            ★
          </span>
        ))}
      </div>

      <MiniQuestion label="كيف وجدت سرعة الأحداث؟" options={PACE_OPTS} value={review.pace} onChange={(v) => set({ pace: v })} />
      <MiniQuestion label="كيف وجدت الشخصيات؟" options={CHAR_OPTS} value={review.characters} onChange={(v) => set({ characters: v })} />
      <MiniQuestion label="هل كانت النهاية مرضية؟" options={ENDING_OPTS} value={review.endingOk} onChange={(v) => set({ endingOk: v })} />

      <button
        onClick={save}
        className="mt-1.5 rounded-full bg-purple px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-purple-dark"
      >
        {saved ? "تم الحفظ ✓" : "حفظ التقييم"}
      </button>
    </div>
  );
}

function MiniQuestion({ label, options, value, onChange }) {
  return (
    <div className="mb-3.5">
      <div className="mb-1.5 text-[13px] text-ink-soft">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-full border-[1.5px] px-3 py-1.5 text-[12.5px] ${
              value === v ? "border-purple bg-purple-light text-purple-dark" : "border-line bg-card text-ink"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
