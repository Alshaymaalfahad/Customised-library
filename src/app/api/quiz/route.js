import { NextResponse } from 'next/server';
import { listBooks, saveProfile, getProfile } from '@/lib/repo.js';
import { getOrCreateReaderId, getReaderId } from '@/lib/reader.js';
import { buildProfile, computeArchetype, computeIndicators } from '@/lib/scoring.js';
import { ARCHETYPES } from '@/lib/data.js';

export async function POST(request) {
  const answers = await request.json();
  const readerId = await getOrCreateReaderId();
  const books = listBooks();

  const profile = buildProfile(answers, books);
  const archetype = computeArchetype(profile, ARCHETYPES);
  const indicators = computeIndicators(profile);

  saveProfile(readerId, profile, archetype, indicators, answers);

  return NextResponse.json({ archetype, indicators });
}

export async function GET() {
  const readerId = await getReaderId();
  if (!readerId) return NextResponse.json({ profile: null });
  const profile = getProfile(readerId);
  return NextResponse.json({ profile });
}
