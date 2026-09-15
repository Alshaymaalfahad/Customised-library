// دوال الوصول للبيانات: تحوّل بين صفوف SQLite (نصوص JSON) وكائنات JS التي يستخدمها التطبيق.
import { getDb } from './db.js';

function rowToBook(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    genres: JSON.parse(row.genres),
    tags: JSON.parse(row.tags),
    flags: JSON.parse(row.flags),
    pages: row.pages,
    year: row.year,
    rating: row.rating,
    blurb: row.blurb,
    summary: row.summary || '',
    cover: row.cover || null,
    color: row.color,
    letter: row.letter,
  };
}

export function listBooks() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM books ORDER BY id').all();
  return rows.map(rowToBook);
}

export function getBook(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
  return rowToBook(row);
}

export function countBooks() {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) AS c FROM books').get();
  return row.c;
}

export function insertBook(book) {
  const db = getDb();
  db.prepare(`
    INSERT INTO books (id, title, author, genres, tags, flags, pages, year, rating, blurb, summary, cover, color, letter)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title, author=excluded.author, genres=excluded.genres, tags=excluded.tags,
      flags=excluded.flags, pages=excluded.pages, year=excluded.year, rating=excluded.rating,
      blurb=excluded.blurb, summary=excluded.summary, cover=excluded.cover, color=excluded.color, letter=excluded.letter
  `).run(
    book.id, book.title, book.author,
    JSON.stringify(book.genres), JSON.stringify(book.tags), JSON.stringify(book.flags),
    book.pages, book.year, book.rating, book.blurb, book.summary || '', book.cover || null, book.color, book.letter,
  );
}

export function ensureReader(readerId) {
  const db = getDb();
  db.prepare('INSERT OR IGNORE INTO readers (id, created_at) VALUES (?, ?)')
    .run(readerId, new Date().toISOString());
}

export function saveProfile(readerId, profile, archetype, indicators, answers) {
  const db = getDb();
  ensureReader(readerId);
  db.prepare(`
    INSERT INTO profiles (reader_id, answers, weights, total_weight, dealbreakers, archetype_name, archetype_desc, indicators, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(reader_id) DO UPDATE SET
      answers=excluded.answers, weights=excluded.weights, total_weight=excluded.total_weight,
      dealbreakers=excluded.dealbreakers, archetype_name=excluded.archetype_name,
      archetype_desc=excluded.archetype_desc, indicators=excluded.indicators, updated_at=excluded.updated_at
  `).run(
    readerId,
    JSON.stringify(answers),
    JSON.stringify(profile.weights),
    profile.totalWeight,
    JSON.stringify(profile.dealbreakers),
    archetype.name,
    archetype.desc,
    JSON.stringify(indicators),
    new Date().toISOString(),
  );
}

export function getProfile(readerId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM profiles WHERE reader_id = ?').get(readerId);
  if (!row) return null;
  return {
    answers: JSON.parse(row.answers),
    weights: JSON.parse(row.weights),
    totalWeight: row.total_weight,
    dealbreakers: JSON.parse(row.dealbreakers),
    archetype: { name: row.archetype_name, desc: row.archetype_desc },
    indicators: JSON.parse(row.indicators),
    updatedAt: row.updated_at,
  };
}

export function upsertLibraryEntry(readerId, bookId, patch) {
  const db = getDb();
  ensureReader(readerId);
  const existing = db.prepare('SELECT * FROM library_entries WHERE reader_id = ? AND book_id = ?').get(readerId, bookId);
  const merged = {
    status: patch.status ?? existing?.status ?? 'none',
    progress_pages: patch.progressPages ?? existing?.progress_pages ?? 0,
    fav: patch.fav !== undefined ? (patch.fav ? 1 : 0) : (existing?.fav ?? 0),
    excluded: patch.excluded !== undefined ? (patch.excluded ? 1 : 0) : (existing?.excluded ?? 0),
  };
  db.prepare(`
    INSERT INTO library_entries (reader_id, book_id, status, progress_pages, fav, excluded, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(reader_id, book_id) DO UPDATE SET
      status=excluded.status, progress_pages=excluded.progress_pages, fav=excluded.fav,
      excluded=excluded.excluded, updated_at=excluded.updated_at
  `).run(readerId, bookId, merged.status, merged.progress_pages, merged.fav, merged.excluded, new Date().toISOString());
  return getLibraryEntry(readerId, bookId);
}

export function getLibraryEntry(readerId, bookId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM library_entries WHERE reader_id = ? AND book_id = ?').get(readerId, bookId);
  if (!row) return { status: 'none', progressPages: 0, fav: false, excluded: false };
  return {
    status: row.status,
    progressPages: row.progress_pages,
    fav: !!row.fav,
    excluded: !!row.excluded,
    updatedAt: row.updated_at,
  };
}

export function listLibrary(readerId) {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM library_entries WHERE reader_id = ?').all(readerId);
  return rows.map((row) => ({
    bookId: row.book_id,
    status: row.status,
    progressPages: row.progress_pages,
    fav: !!row.fav,
    excluded: !!row.excluded,
    updatedAt: row.updated_at,
  }));
}

export function listExcludedBookIds(readerId) {
  const db = getDb();
  const rows = db.prepare('SELECT book_id FROM library_entries WHERE reader_id = ? AND excluded = 1').all(readerId);
  return rows.map((r) => r.book_id);
}

export function saveReview(readerId, bookId, review) {
  const db = getDb();
  ensureReader(readerId);
  db.prepare(`
    INSERT INTO reviews (reader_id, book_id, stars, pace, characters, ending_ok, would_reread, favorite_thing, body, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(reader_id, book_id) DO UPDATE SET
      stars=excluded.stars, pace=excluded.pace, characters=excluded.characters, ending_ok=excluded.ending_ok,
      would_reread=excluded.would_reread, favorite_thing=excluded.favorite_thing, body=excluded.body
  `).run(
    readerId, bookId, review.stars ?? null, review.pace ?? null, review.characters ?? null,
    review.endingOk ?? null, review.wouldReread ?? null, review.favoriteThing ?? null,
    review.body ?? null, new Date().toISOString(),
  );
  return getReview(readerId, bookId);
}

export function getReview(readerId, bookId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM reviews WHERE reader_id = ? AND book_id = ?').get(readerId, bookId);
  if (!row) return null;
  return {
    stars: row.stars, pace: row.pace, characters: row.characters, endingOk: row.ending_ok,
    wouldReread: row.would_reread, favoriteThing: row.favorite_thing, body: row.body,
    createdAt: row.created_at,
  };
}
