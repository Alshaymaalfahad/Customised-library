import { NextResponse } from 'next/server';
import { getBook, listBooks, getProfile, getLibraryEntry, getReview } from '@/lib/repo.js';
import { getReaderId } from '@/lib/reader.js';
import { scoreBook, reasonsForBook } from '@/lib/scoring.js';

export async function GET(request, { params }) {
  const { id } = await params;
  const bookId = parseInt(id, 10);
  const book = getBook(bookId);
  if (!book) return NextResponse.json({ error: 'الكتاب غير موجود' }, { status: 404 });

  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  const libraryEntry = readerId ? getLibraryEntry(readerId, bookId) : { status: 'none', progressPages: 0, fav: false, excluded: false };
  const review = readerId ? getReview(readerId, bookId) : null;

  const similar = listBooks()
    .filter((b) => b.id !== bookId && b.genres.some((g) => book.genres.includes(g)))
    .slice(0, 4);

  return NextResponse.json({
    book,
    score: profile ? scoreBook(book, profile) : null,
    reasons: profile ? reasonsForBook(book, profile, profile.answers) : [],
    libraryEntry,
    review,
    similar,
  });
}
