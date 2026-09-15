import { NextResponse } from 'next/server';
import { listLibrary, upsertLibraryEntry, listBooks } from '@/lib/repo.js';
import { getOrCreateReaderId, getReaderId } from '@/lib/reader.js';

export async function GET() {
  const readerId = await getReaderId();
  if (!readerId) return NextResponse.json({ entries: [] });

  const entries = listLibrary(readerId);
  const booksById = Object.fromEntries(listBooks().map((b) => [b.id, b]));
  const withBooks = entries
    .filter((e) => booksById[e.bookId])
    .map((e) => ({ ...e, book: booksById[e.bookId] }));

  return NextResponse.json({ entries: withBooks });
}

export async function POST(request) {
  const body = await request.json();
  const { bookId, status, progressPages, fav, excluded } = body;
  if (!bookId) return NextResponse.json({ error: 'bookId مطلوب' }, { status: 400 });

  const readerId = await getOrCreateReaderId();
  const entry = upsertLibraryEntry(readerId, bookId, { status, progressPages, fav, excluded });
  return NextResponse.json({ entry });
}
