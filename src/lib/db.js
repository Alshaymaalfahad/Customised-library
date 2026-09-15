// طبقة قاعدة البيانات: SQLite حقيقية عبر وحدة node:sqlite المدمجة في Node.js —
// بدون أي خدمة خارجية أو تسجيل دخول، فقط ملف قاعدة بيانات دائم على القرص.
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

// يمكن تجاوز المسار عبر متغيّر البيئة DB_PATH (مثلاً ليشير إلى قرص دائم Volume عند الاستضافة).
const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'app.db');

let dbInstance = null;

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genres TEXT NOT NULL,
      tags TEXT NOT NULL,
      flags TEXT NOT NULL,
      pages INTEGER NOT NULL,
      year INTEGER NOT NULL,
      rating REAL NOT NULL,
      blurb TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      cover TEXT,
      color TEXT NOT NULL,
      letter TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS readers (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
      reader_id TEXT PRIMARY KEY,
      answers TEXT NOT NULL,
      weights TEXT NOT NULL,
      total_weight REAL NOT NULL,
      dealbreakers TEXT NOT NULL,
      archetype_name TEXT NOT NULL,
      archetype_desc TEXT NOT NULL,
      indicators TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS library_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reader_id TEXT NOT NULL,
      book_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'none',
      progress_pages INTEGER NOT NULL DEFAULT 0,
      fav INTEGER NOT NULL DEFAULT 0,
      excluded INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      UNIQUE(reader_id, book_id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reader_id TEXT NOT NULL,
      book_id INTEGER NOT NULL,
      stars INTEGER,
      pace TEXT,
      characters TEXT,
      ending_ok TEXT,
      would_reread TEXT,
      favorite_thing TEXT,
      body TEXT,
      created_at TEXT NOT NULL,
      UNIQUE(reader_id, book_id)
    );
  `);
}

// يضيف أعمدة جديدة لقاعدة بيانات قائمة أُنشئت بإصدار سابق من المخطط، دون حذف أي بيانات.
function migrateSchema(db) {
  const existingCols = new Set(db.prepare('PRAGMA table_info(books)').all().map((c) => c.name));
  if (!existingCols.has('summary')) db.exec("ALTER TABLE books ADD COLUMN summary TEXT NOT NULL DEFAULT ''");
  if (!existingCols.has('cover')) db.exec('ALTER TABLE books ADD COLUMN cover TEXT');
}

export function getDb() {
  if (dbInstance) return dbInstance;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  dbInstance = new DatabaseSync(DB_PATH);
  dbInstance.exec('PRAGMA journal_mode = WAL;');
  dbInstance.exec('PRAGMA foreign_keys = ON;');
  initSchema(dbInstance);
  migrateSchema(dbInstance);
  return dbInstance;
}
