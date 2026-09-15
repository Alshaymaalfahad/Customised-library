// يبحث في Open Library عن الغلاف الحقيقي لكل كتاب (بعنوانه الأصلي/الإنجليزي لأفضل تطابق)
// ويحفظه محليًا في public/covers/{id}.jpg. يطبع تقريرًا بالنتائج، ولا يكسر شيئًا للكتب غير الموجودة.
import fs from "node:fs";
import path from "node:path";
import { COVER_QUERIES } from "./cover-queries.js";
import { SEED_BOOKS } from "./seed-data.js";

const OUT_DIR = path.join(process.cwd(), "public", "covers");
fs.mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchCoverId(query) {
  const url = `https://openlibrary.org/search.json?${new URLSearchParams({
    q: query,
    limit: "5",
    fields: "title,cover_i,cover_edition_key",
  })}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`search failed ${res.status}`);
  const data = await res.json();
  const withCover = (data.docs || []).find((d) => d.cover_i);
  return withCover ? withCover.cover_i : null;
}

async function downloadCover(coverId, destPath) {
  const url = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 800) throw new Error("placeholder/empty image"); // OL يرجع صورة رمادية صغيرة جدًا عند عدم وجود غلاف فعلي
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

const results = {};
for (const book of SEED_BOOKS) {
  const query = COVER_QUERIES[book.id];
  if (!query) {
    console.log(`[${book.id}] تخطّي (لا يوجد عمل منشور موثّق): ${book.title}`);
    results[book.id] = null;
    continue;
  }
  try {
    const coverId = await searchCoverId(query);
    if (!coverId) {
      console.log(`[${book.id}] لم يُعثر على غلاف: ${book.title}`);
      results[book.id] = null;
      continue;
    }
    const dest = path.join(OUT_DIR, `${book.id}.jpg`);
    const size = await downloadCover(coverId, dest);
    console.log(`[${book.id}] ✓ ${book.title} — ${size} bytes`);
    results[book.id] = `/covers/${book.id}.jpg`;
  } catch (e) {
    console.log(`[${book.id}] خطأ: ${book.title} — ${e.message}`);
    results[book.id] = null;
  }
  await sleep(250);
}

fs.writeFileSync(
  path.join(process.cwd(), "scripts", "cover-results.json"),
  JSON.stringify(results, null, 2)
);

const found = Object.values(results).filter(Boolean).length;
console.log(`\nتم: ${found} من ${SEED_BOOKS.length} كتابًا حصلوا على غلاف حقيقي.`);
