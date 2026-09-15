import { NextResponse } from 'next/server';
import { saveReview, getReview } from '@/lib/repo.js';
import { getOrCreateReaderId, getReaderId } from '@/lib/reader.js';

export async function POST(request) {
  const body = await request.json();
  const { bookId, ...review } = body;
  if (!bookId) return NextResponse.json({ error: 'bookId مطلوب' }, { status: 400 });

  const readerId = await getOrCreateReaderId();
  const saved = saveReview(readerId, bookId, review);
  return NextResponse.json({ review: saved });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookId = parseInt(searchParams.get('bookId'), 10);
  const readerId = await getReaderId();
  if (!readerId || !bookId) return NextResponse.json({ review: null });
  return NextResponse.json({ review: getReview(readerId, bookId) });
}
