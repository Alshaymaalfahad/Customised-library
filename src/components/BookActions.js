"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATUS_LABELS } from "@/lib/data.js";

export default function BookActions({ bookId, initialEntry, bookPages }) {
  const router = useRouter();
  const [entry, setEntry] = useState(initialEntry);
  const [, startTransition] = useTransition();

  const patch = async (body) => {
    const res = await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, ...body }),
    });
    const data = await res.json();
    setEntry(data.entry);
    startTransition(() => router.refresh());
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2.5">
        <select
          value={entry.status}
          onChange={(e) => patch({ status: e.target.value })}
          className="rounded border-[1.5px] border-line bg-card px-3 py-2 text-[13.5px] text-ink outline-none"
        >
          {Object.entries(STATUS_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <button
          onClick={() => patch({ fav: !entry.fav })}
          className={`rounded-full border-[1.5px] px-5 py-2 text-[14px] font-semibold ${
            entry.fav ? "border-ink bg-ink text-white" : "border-ink text-ink"
          }`}
        >
          {entry.fav ? "★ في المفضلة" : "☆ أضف للمفضلة"}
        </button>
        <button
          onClick={() => patch({ excluded: true })}
          className="rounded-full border-[1.5px] border-ink px-5 py-2 text-[14px] font-semibold text-ink"
        >
          لا تقترحه لي مرة أخرى
        </button>
      </div>

      {entry.status === "reading" && (
        <div className="mb-5 rounded bg-paper-2 p-4.5">
          <div className="mb-2 flex justify-between text-[13px] text-ink">
            <span>قرأت {entry.progressPages} من {bookPages} صفحة</span>
            <span>أنجزت {Math.round((entry.progressPages / bookPages) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-blue"
              style={{ width: `${Math.round((entry.progressPages / bookPages) * 100)}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={bookPages}
            value={entry.progressPages}
            onChange={(e) => setEntry((prev) => ({ ...prev, progressPages: parseInt(e.target.value, 10) }))}
            onMouseUp={(e) => patch({ progressPages: parseInt(e.target.value, 10) })}
            onTouchEnd={(e) => patch({ progressPages: parseInt(e.target.value, 10) })}
            className="mt-3"
          />
        </div>
      )}
    </div>
  );
}
