"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FloatingWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === "maktaba-widget:close") setOpen(false);
    }
    function onOpenRequest() {
      setLoaded(true);
      setOpen(true);
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("maktaba:open-widget", onOpenRequest);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("maktaba:open-widget", onOpenRequest);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/embed") || pathname?.startsWith("/demo")) return null;

  const openPanel = () => {
    setLoaded(true);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={openPanel}
        aria-label="اكتشف ذوقك القرائي"
        className={`fixed top-1/2 right-0 z-[100] flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-s-[10px] px-3 py-4 text-white shadow-[-4px_0_18px_rgba(24,128,195,0.35)] transition-all hover:pe-4 ${
          open ? "pointer-events-none translate-x-3 opacity-0" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(135deg, #4EACE9 0%, #1880C3 100%)" }}
      >
        <span className="text-[17px]">✦</span>
        <span className="text-[13px] font-semibold tracking-wide" style={{ writingMode: "vertical-rl" }}>
          اكتشف ذوقك القرائي
        </span>
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[98] bg-[rgba(14,18,26,0.42)] transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed inset-y-0 right-0 z-[99] w-full max-w-[460px] bg-paper shadow-[-14px_0_50px_rgba(10,20,40,0.28)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {loaded && (
          <iframe src="/embed" title="اكتشف ذوقك القرائي" className="h-full w-full border-0" loading="lazy" />
        )}
      </div>
    </>
  );
}
