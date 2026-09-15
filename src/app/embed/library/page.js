import { listLibrary, listBooks } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import LibraryTabs from "@/components/LibraryTabs";

export default async function EmbedLibraryPage() {
  const readerId = await getReaderId();
  const entries = readerId ? listLibrary(readerId) : [];
  const booksById = Object.fromEntries(listBooks().map((b) => [b.id, b]));
  const items = entries
    .filter((e) => booksById[e.bookId] && e.status !== "none")
    .map((e) => ({ ...e, book: booksById[e.bookId] }));

  return (
    <div className="px-4 py-6">
      <h1 className="mb-1 font-serif text-2xl font-bold text-ink">مكتبتي</h1>
      <p className="mb-6 text-[13px] text-ink-soft">كل الكتب التي حفظتها أو بدأت قراءتها.</p>
      <LibraryTabs items={items} hrefBase="/embed/books" browseHref="/embed/quiz" />
    </div>
  );
}
