import { NextResponse } from 'next/server';
import { listBooks, listExcludedBookIds, getProfile } from '@/lib/repo.js';
import { getReaderId } from '@/lib/reader.js';
import { buildRecommendationRows } from '@/lib/recommend.js';

export async function GET() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  if (!profile) return NextResponse.json({ rows: [], hasProfile: false });

  const excluded = new Set(listExcludedBookIds(readerId));
  const books = listBooks().filter((b) => !excluded.has(b.id));

  const rows = buildRecommendationRows(books, profile, profile.answers).map((row) => ({
    ...row,
    items: row.items.map((x) => ({ book: x.book, score: x.score, reasons: x.reasons })),
  }));

  return NextResponse.json({ rows, hasProfile: true, archetype: profile.archetype, indicators: profile.indicators });
}
