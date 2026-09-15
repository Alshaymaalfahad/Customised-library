import { NextResponse } from 'next/server';
import { listBooks, listExcludedBookIds, getProfile } from '@/lib/repo.js';
import { getReaderId } from '@/lib/reader.js';
import { scoreBook, reasonsForBook } from '@/lib/scoring.js';

const MOOD_TAG = { light: 'm_light', emotional: 'e_moved', thrill: 'p_fast', deep: 'm_deep', different: null };

export async function POST(request) {
  const { time, mood, novelty } = await request.json();

  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  const excluded = readerId ? new Set(listExcludedBookIds(readerId)) : new Set();

  let pool = listBooks().filter((b) => !excluded.has(b.id));
  if (time === 'short') {
    pool = pool.filter((b) => b.pages <= 280).concat(pool.filter((b) => b.pages > 280));
  }
  const moodTag = MOOD_TAG[mood];
  if (moodTag) {
    pool = [...pool].sort((a, b) => (b.tags.includes(moodTag) ? 1 : 0) - (a.tags.includes(moodTag) ? 1 : 0));
  }

  let scored = pool.map((b) => ({
    book: b,
    score: profile ? scoreBook(b, profile) : 60,
    reasons: profile ? reasonsForBook(b, profile, profile.answers) : [],
  }));
  scored = novelty === 'new' ? scored.sort((a, b) => a.score - b.score) : scored.sort((a, b) => b.score - a.score);

  const picks = scored.slice(0, 3).map((x) => ({ ...x, score: profile ? x.score : null }));
  return NextResponse.json({ picks });
}
