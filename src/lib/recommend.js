// يبني صفوف التوصيات المجمّعة (الأقرب لذوقك، لأنك أحببت..، يناسب مزاجك، اقتراح خارج راحتك)
// من نفس منطق التسجيل المستخدم في كل مكان بالتطبيق.
import { scoreBook, reasonsForBook } from './scoring.js';
import { GENRE_LABELS, GOAL_LABELS, QUIZ } from './data.js';

export function scoreAndSort(books, profile, answers) {
  return books
    .map((b) => ({ book: b, score: scoreBook(b, profile), reasons: reasonsForBook(b, profile, answers) }))
    .sort((a, b) => b.score - a.score);
}

// يسحب أول n عنصرًا من قائمة لم يُستخدم كتابها بعد في صف سابق، ويعلّمها كمستخدمة —
// هذا ما يمنع تكرار نفس الكتاب عبر أكثر من فئة توصية في نفس الصفحة.
function takeUnused(list, n, used) {
  const picked = [];
  for (const item of list) {
    if (used.has(item.book.id)) continue;
    picked.push(item);
    used.add(item.book.id);
    if (picked.length >= n) break;
  }
  return picked;
}

export function buildRecommendationRows(books, profile, answers) {
  const scored = scoreAndSort(books, profile, answers);
  const lovedGenres = answers.lovedGenres || [];
  const used = new Set();

  const top = takeUnused(scored, 5, used);

  const topGenre = lovedGenres[0] || (scored[0] && scored[0].book.genres[0]);
  const becauseYouLiked = topGenre
    ? takeUnused(scored.filter((x) => x.book.genres.includes(topGenre)), 4, used)
    : [];

  const warmth = (answers.mood && answers.mood.warmth) ?? 3;
  const moodTag = 'm_' + (warmth < 3 ? 'light' : 'deep');
  const moodBooks = takeUnused(scored.filter((x) => x.book.tags.includes(moodTag)), 4, used);

  const goalVal = (answers.goals || [])[0];
  const goalLabel = GOAL_LABELS[goalVal] || 'قراءة تناسبك الآن';
  const goalTags = (QUIZ[0].options.find((o) => o.val === goalVal) || {}).tags || [];
  const forGoal = goalTags.length
    ? takeUnused(scored.filter((x) => goalTags.some((t) => x.book.tags.includes(t))), 4, used)
    : [];

  const remaining = scored.filter((x) => !used.has(x.book.id));
  const midFirst = [...remaining].sort((a, b) => {
    const da = Math.abs(a.score - 55);
    const db = Math.abs(b.score - 55);
    return da - db;
  });
  const outOfComfort = takeUnused(midFirst, 4, used);

  return [
    { key: 'top', title: 'هذه الكتب الأقرب لذوقك', subtitle: 'أعلى نسبة تطابق مع ملفك القرائي', items: top },
    { key: 'because', title: topGenre ? 'لأنك أحببت ' + GENRE_LABELS[topGenre] : 'كتب مرتبطة بأنواعك المفضلة', subtitle: 'كتب مرتبطة بما اخترته من أنواع محبّبة', items: becauseYouLiked },
    { key: 'mood', title: 'يناسب مزاجك اليوم', subtitle: 'بناءً على المزاج الذي حدّدته في الاستبيان', items: moodBooks },
    { key: 'goal', title: 'قد يعجبك إذا كنت تبحث عن ' + goalLabel, subtitle: 'توصيات مبنية على هدف قراءتك', items: forGoal },
    { key: 'stretch', title: 'اقتراح خارج منطقة راحتك', subtitle: 'كتاب مختلف قليلًا عن عاداتك، لكن فيه عناصر قد تناسبك', items: outOfComfort },
  ].filter((row) => row.items.length > 0);
}
