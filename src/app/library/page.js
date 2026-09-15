import { listLibrary, listBooks } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import LibraryTabs from "@/components/LibraryTabs";

export default async function LibraryPage() {
  const readerId = await getReaderId();
  const entries = readerId ? listLibrary(readerId) : [];
  const booksById = Object.fromEntries(listBooks().map((b) => [b.id, b]));
  const items = entries
    .filter((e) => booksById[e.bookId] && e.status !== "none")
    .map((e) => ({ ...e, book: booksById[e.bookId] }));

  return (
    <div>
      <section
        className="px-6 py-11"
        style={{ background: "linear-gradient(135deg, #EFF3F6 0%, #DCEAF2 45%, #BAD8EC 100%)" }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-1.5 font-serif text-3xl font-bold text-ink">مكتبتي</h1>
          <p className="text-[14.5px] text-ink-soft">كل الكتب التي حفظتها أو بدأت قراءتها، في مكان واحد.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-9">
        <LibraryTabs items={items} />
      </div>
    </div>
  );
}
