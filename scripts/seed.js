// يعبّئ قاعدة البيانات المحلية بالخمسين كتابًا الحقيقية عند أول تشغيل.
// تشغيل: node scripts/seed.js
import { getDb } from '../src/lib/db.js';
import { insertBook, countBooks } from '../src/lib/repo.js';
import { SEED_BOOKS } from './seed-data.js';

getDb();
SEED_BOOKS.forEach((book) => insertBook(book));
console.log(`تمت تعبئة قاعدة البيانات: ${countBooks()} كتاب.`);
