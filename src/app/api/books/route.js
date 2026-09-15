import { NextResponse } from 'next/server';
import { listBooks, listExcludedBookIds, getProfile } from '@/lib/repo.js';
import { getReaderId } from '@/lib/reader.js';
import { scoreBook, reasonsForBook } from '@/lib/scoring.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const q = (searchParams.get('q') || '').trim();

  const readerId = await getReaderId();
  const excluded = readerId ? new Set(listExcludedBookIds(readerId)) : new Set();
  const profile = readerId ? getProfile(readerId) : null;

  let books = listBooks().filter((b) => !excluded.has(b.id));
  if (genre && genre !== 'all') books = books.filter((b) => b.genres.includes(genre));
  if (q) books = books.filter((b) => b.title.includes(q) || b.author.includes(q));

  const result = books.map((b) => ({
    ...b,
    score: profile ? scoreBook(b, profile) : null,
    reasons: profile ? reasonsForBook(b, profile, profile.answers) : [],
  }));

  return NextResponse.json({ books: result, hasProfile: !!profile });
}
