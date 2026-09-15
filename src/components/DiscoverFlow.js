"use client";
import { useState } from "react";
import BookCard from "@/components/BookCard";

const TIME_OPTS = [["short", "أقل من ساعتين"], ["days", "عدة أيام"], ["any", "لا يهم"]];
const MOOD_OPTS = [["light", "خفيف"], ["emotional", "عاطفي"], ["thrill", "مشوّق"], ["deep", "عميق"], ["different", "مختلف"]];
const NOVELTY_OPTS = [["familiar", "مألوف يشبه ذوقي"], ["new", "تجربة جديدة عليّ"]];

export default function DiscoverFlow({ booksHrefBase = "/books" }) {
  const [answers, setAnswers] = useState({});
  const [picks, setPicks] = useState(null);
  const [loading, setLoading] = useState(false);

  const choose = (key, val) => setAnswers((prev) => ({ ...prev, [key]: val }));

  const go = async () => {
    setLoading(true);
    const res = await fetch("/api/discover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    setPicks(data.picks);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-14">
      <div className="mb-9 text-center">
        <h1 className="mb-3 font-serif text-3xl font-bold text-ink">اكتشف لي كتابًا الآن</h1>
        <p className="text-[15px] text-ink-soft">
          ثلاثة أسئلة سريعة فقط، بدون إعادة الاستبيان الكامل، لنقترح عليك ٣ كتب مناسبة لهذه اللحظة تحديدًا.
        </p>
      </div>

      <div className="rounded-md border border-line bg-card p-8">
        <Question label="كم لديك من وقت؟" options={TIME_OPTS} value={answers.time} onChange={(v) => choose("time", v)} />
        <Question label="وش مزاجك الآن؟" options={MOOD_OPTS} value={answers.mood} onChange={(v) => choose("mood", v)} />
        <Question label="هل تريد شيئًا مألوفًا أم تجربة جديدة؟" options={NOVELTY_OPTS} value={answers.novelty} onChange={(v) => choose("novelty", v)} />

        <button
          onClick={go}
          disabled={loading}
          className="mt-1.5 w-full rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white hover:bg-ink-2 disabled:opacity-60"
        >
          {loading ? "جارٍ الاختيار..." : "اقترح ٣ كتب لي"}
        </button>
      </div>

      {picks && (
        <div className="mt-11">
          <h3 className="mb-5.5 text-center text-xl font-semibold text-ink">هذه ٣ كتب مقترحة الآن</h3>
          <div className="flex flex-wrap justify-center gap-4.5">
            {picks.map((x) => (
              <div key={x.book.id} className="w-[190px]">
                <BookCard book={x.book} score={x.score} reason={x.reasons?.[0]} hrefBase={booksHrefBase} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Question({ label, options, value, onChange }) {
  return (
    <div className="mb-6.5">
      <div className="mb-3 text-[15.5px] font-semibold text-ink">{label}</div>
      <div className="flex flex-wrap gap-2.5">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-full border-[1.5px] px-4 py-2 text-[13.5px] ${
              value === v ? "border-purple bg-purple text-white" : "border-line bg-paper text-ink"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
