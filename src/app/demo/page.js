import Script from "next/script";

export const metadata = {
  title: "مكتبة النور",
  description: "موقع مكتبة تجريبي يحاكي موقعًا منشورًا مسبقًا، لعرض دمج ودجت اكتشف ذوقك القرائي.",
};

const PLACEHOLDER_BOOKS = [
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٤٥ ر.س", tone: "#C7CAD3" },
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٣٨ ر.س", tone: "#B9BCC6" },
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٥٢ ر.س", tone: "#D3D5DC" },
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٤٠ ر.س", tone: "#AEB1BC" },
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٣٣ ر.س", tone: "#C7CAD3" },
  { title: "اسم الكتاب", author: "اسم المؤلف", price: "٤٧ ر.س", tone: "#B9BCC6" },
];

export default function DemoHostSitePage() {
  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh", color: "#2B2B33", fontFamily: "inherit" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E4E5EA", position: "sticky", top: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "16px 28px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 17, flexShrink: 0 }}>
            <span style={{ width: 30, height: 30, borderRadius: 6, background: "#2B2B33", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              ن
            </span>
            مكتبة النور
          </div>
          <nav style={{ display: "flex", gap: 22, flex: 1 }}>
            {["الرئيسية", "التصنيفات", "الأكثر مبيعًا", "إصدارات جديدة", "حسابي"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 14, color: "#5A5A63", textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </nav>
          <button style={{ background: "#2B2B33", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 4, fontSize: 13, flexShrink: 0 }}>
            السلة (٠)
          </button>
        </div>
      </header>

      <section style={{ background: "#EDEEF2", padding: "46px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, margin: "0 0 8px", color: "#2B2B33" }}>أهلاً بك في مكتبة النور</h1>
        <p style={{ fontSize: 14, color: "#6B6B75", margin: "0 0 20px" }}>
          آلاف العناوين العربية والمترجمة، وتوصيل سريع لجميع المناطق.
        </p>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex" }}>
          <input
            type="text"
            placeholder="ابحث عن عنوان، مؤلف، أو دار نشر..."
            style={{ flex: 1, padding: "11px 14px", border: "1px solid #DADBE0", borderInlineEnd: "none", borderRadius: "4px 0 0 4px", fontSize: 13.5 }}
          />
          <button style={{ padding: "11px 20px", background: "#2B2B33", color: "#fff", border: "none", borderRadius: "0 4px 4px 0", fontSize: 13.5 }}>
            بحث
          </button>
        </div>
      </section>

      <section style={{ padding: "44px 28px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, margin: "0 0 20px", color: "#2B2B33" }}>الأكثر مبيعًا هذا الأسبوع</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 16 }}>
          {PLACEHOLDER_BOOKS.map((b, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E4E5EA", borderRadius: 4, padding: 10 }}>
              <div style={{ height: 160, borderRadius: 3, background: b.tone, marginBottom: 10 }} />
              <p style={{ fontSize: 12.5, fontWeight: 600, margin: "0 0 2px", color: "#2B2B33" }}>{b.title}</p>
              <p style={{ fontSize: 11, color: "#8A8A92", margin: "0 0 6px" }}>{b.author}</p>
              <p style={{ fontSize: 12, color: "#2B2B33", margin: 0, fontWeight: 600 }}>{b.price}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", fontSize: 12, color: "#9A9AA3", padding: 18, borderTop: "1px solid #E4E5EA", background: "#fff" }}>
        © مكتبة النور — هذه صفحة تجريبية تحاكي موقع مكتبة منشورًا مسبقًا، لإظهار كيف تُدمج ميزة{" "}
        <strong>«اكتشف ذوقك القرائي»</strong> كإضافة (Widget) داخله عبر سطر برمجي واحد، دون أي علاقة بتصميم
        الموقع الأصلي أو كتالوجه.
      </footer>

      {/* الودجت نفسه: سطر واحد كما سيضيفه أي موقع مكتبة حقيقي في صفحته */}
      <Script src="/widget.js" strategy="afterInteractive" />
    </div>
  );
}
