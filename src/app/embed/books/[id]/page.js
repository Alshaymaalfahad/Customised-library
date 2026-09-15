import { notFound } from "next/navigation";
import { getBook, listBooks, getProfile, getLibraryEntry, getReview } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import { scoreBook, reasonsForBook } from "@/lib/scoring.js";
import BookDetailContent from "@/components/BookDetailContent";

export default async function EmbedBookDetailPage({ params }) {
  const { id } = await params;
  const bookId = parseInt(id, 10);
  const book = getBook(bookId);
  if (!book) notFound();

  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  const score = profile ? scoreBook(book, profile) : null;
  const reasons = profile ? reasonsForBook(book, profile, profile.answers) : [];
  const libraryEntry = readerId ? getLibraryEntry(readerId, bookId) : { status: "none", progressPages: 0, fav: false, excluded: false };
  const review = readerId ? getReview(readerId, bookId) : null;
  const similar = listBooks().filter((b) => b.id !== bookId && b.genres.some((g) => book.genres.includes(g))).slice(0, 4);

  return (
    <BookDetailContent
      book={book}
      score={score}
      reasons={reasons}
      libraryEntry={libraryEntry}
      review={review}
      similar={similar}
      booksHrefBase="/embed/books"
    />
  );
}
