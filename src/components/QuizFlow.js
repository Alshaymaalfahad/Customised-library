"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ } from "@/lib/data.js";

const AR_DIGITS = (n) => String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const initialAnswers = {
  goals: [],
  mood: { tone: 3, warmth: 3, realism: 3, brightness: 3 },
  pace: null,
  attractions: [],
  dealbreakers: [],
  emotions: [],
  challenge: null,
  lovedGenres: [],
  favBooksText: "",
};

export default function QuizFlow({ resultHref = "/result", offsetPx = 63 }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const q = QUIZ[step];

  const toggleMulti = (key, val, max) => {
    setAnswers((prev) => {
      const arr = prev[key];
      const idx = arr.indexOf(val);
      let next;
      if (idx > -1) next = arr.filter((v) => v !== val);
      else {
        next = max && arr.length >= max ? [...arr.slice(1), val] : [...arr, val];
      }
      return { ...prev, [key]: next };
    });
  };

  const setSingle = (key, val) => setAnswers((prev) => ({ ...prev, [key]: val }));
  const setSlider = (key, val) =>
    setAnswers((prev) => ({ ...prev, mood: { ...prev.mood, [key]: val } }));

  const next = async () => {
    if (step < QUIZ.length - 1) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("فشل حفظ الاستبيان");
      router.push(resultHref);
    } catch (e) {
      setSubmitting(false);
      alert("حدث خطأ أثناء حفظ إجاباتك، حاول مرة أخرى.");
    }
  };

  const back = () => step > 0 && setStep(step - 1);

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: `calc(100vh - ${offsetPx}px)`,
        background: "linear-gradient(135deg, #EFF3F6 0%, #DCEAF2 45%, #BAD8EC 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-2xl px-7 pt-7">
        <div className="mb-2 flex items-center justify-between text-[13px] text-ink-soft">
          <span>{AR_DIGITS(step + 1)} من {AR_DIGITS(QUIZ.length)}</span>
          <span>{q.section}</span>
        </div>
        <div className="mb-1.5 h-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-purple transition-all"
            style={{ width: `${Math.round(((step + 1) / QUIZ.length) * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-7 py-8">
        <div className="w-full max-w-xl">
          <span className="mb-3 block text-sm text-purple-dark">{q.section}</span>
          <h2 className="mb-2 font-serif text-3xl font-bold text-ink">{q.title}</h2>
          {q.hint && <p className="mb-7 text-sm text-ink-soft">{q.hint}</p>}

          {q.kind === "single" && (
            <div className="flex flex-col gap-3">
              {q.options.map((o) => (
                <button
                  key={o.val}
                  onClick={() => setSingle(q.key, o.val)}
                  className={`flex items-center gap-2.5 rounded border-[1.5px] px-4 py-3.5 text-right text-[14.5px] transition-colors ${
                    answers[q.key] === o.val
                      ? "border-purple bg-purple-light shadow-[inset_0_0_0_1px_var(--purple)]"
                      : "border-line bg-card hover:border-purple"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 flex-shrink-0 rounded-full border-[1.5px] ${
                      answers[q.key] === o.val ? "border-purple bg-purple" : "border-ink-soft"
                    }`}
                  />
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {q.kind === "multi" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {q.options.map((o) => {
                const selected = answers[q.key].includes(o.val);
                return (
                  <button
                    key={o.val}
                    onClick={() => toggleMulti(q.key, o.val, q.max)}
                    className={`flex items-center gap-2.5 rounded border-[1.5px] px-4 py-3.5 text-right text-[14.5px] transition-colors ${
                      selected
                        ? "border-purple bg-purple-light shadow-[inset_0_0_0_1px_var(--purple)]"
                        : "border-line bg-card hover:border-purple"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 flex-shrink-0 rounded-full border-[1.5px] ${
                        selected ? "border-purple bg-purple" : "border-ink-soft"
                      }`}
                    />
                    {o.label}
                  </button>
                );
              })}
            </div>
          )}

          {q.kind === "sliders" && (
            <div className="flex flex-col gap-6">
              {q.sliders.map((s) => (
                <div key={s.key}>
                  <div className="mb-2.5 flex justify-between text-[13.5px] font-semibold text-ink">
                    <span>{s.left}</span>
                    <span>{s.right}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={answers.mood[s.key]}
                    onChange={(e) => setSlider(s.key, parseInt(e.target.value, 10))}
                  />
                </div>
              ))}
            </div>
          )}

          {q.kind === "text" && (
            <textarea
              rows={3}
              value={answers.favBooksText}
              onChange={(e) => setAnswers((prev) => ({ ...prev, favBooksText: e.target.value }))}
              placeholder={q.placeholder}
              className="w-full rounded border-[1.5px] border-line bg-card p-4 text-[14.5px] text-ink outline-none focus:border-purple"
            />
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className="rounded-full border-[1.5px] border-ink px-6 py-3 text-[15px] font-semibold text-ink disabled:opacity-40"
            >
              السابق
            </button>
            <div className="flex items-center gap-4">
              {q.kind !== "single" && (
                <button onClick={next} className="border-b border-dashed border-ink-soft text-[13.5px] text-ink-soft">
                  تخطّي هذا السؤال
                </button>
              )}
              <button
                onClick={next}
                disabled={submitting}
                className="rounded-full bg-purple px-7 py-3 text-[15.5px] font-semibold text-white transition-colors hover:bg-purple-dark disabled:opacity-60"
              >
                {submitting ? "جارٍ الحفظ..." : step === QUIZ.length - 1 ? "اكتشف هويتي القرائية" : "التالي"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
