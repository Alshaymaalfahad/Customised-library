// محرّك التخصيص: يحوّل إجابات الاستبيان إلى ملف ذوق قرائي (أوزان لكل وسم)،
// ثم يستخدم هذا الملف لتسجيل درجة ملاءمة كل كتاب وشرح سبب ترشيحه.
// نفس منطق النموذج الأولي، لكنه يعمل هنا على السيرفر ويُحفظ في قاعدة البيانات.

import { QUIZ, GENRE_LABELS, TAG_REASONS } from './data.js';

const SLIDER_MAP = {
  tone: ['m_calm', 'm_tense'],
  warmth: ['m_light', 'm_deep'],
  realism: ['m_realistic', 'm_fantasy'],
  brightness: ['m_bright', 'm_dark'],
};

export function buildProfile(answers, books) {
  const w = {};
  const add = (tag, val = 1) => { w[tag] = (w[tag] || 0) + val; };

  const goalsOptions = QUIZ[0].options;
  (answers.goals || []).forEach((val) => {
    const opt = goalsOptions.find((o) => o.val === val);
    if (opt) opt.tags.forEach((t) => add(t, 1));
  });

  const mood = answers.mood || { tone: 3, warmth: 3, realism: 3, brightness: 3 };
  Object.entries(SLIDER_MAP).forEach(([key, [low, high]]) => {
    const v = mood[key] ?? 3;
    const intensity = Math.abs(v - 3);
    if (v < 3) add(low, intensity);
    else if (v > 3) add(high, intensity);
  });

  if (answers.pace && answers.pace !== 'p_any') add(answers.pace, 2);

  (answers.attractions || []).forEach((t) => add(t, 1.5));
  (answers.emotions || []).forEach((t) => add(t, 1.5));
  if (answers.challenge) add(answers.challenge, 1.5);
  (answers.lovedGenres || []).forEach((g) => add(g, 2));

  const text = (answers.favBooksText || '').toLowerCase();
  if (text && Array.isArray(books)) {
    books.forEach((b) => {
      if (text.includes(b.title.toLowerCase().slice(0, 6))) {
        b.genres.forEach((g) => add(g, 1.5));
        b.tags.forEach((t) => add(t, 0.8));
      }
    });
  }

  const totalWeight = Object.values(w).reduce((a, b) => a + b, 0) || 1;
  return { weights: w, totalWeight, dealbreakers: (answers.dealbreakers || []).slice() };
}

export function scoreBook(book, profile) {
  let raw = 0;
  Object.entries(profile.weights).forEach(([tag, wt]) => {
    if (book.tags.includes(tag) || book.genres.includes(tag)) raw += wt;
  });
  let penalty = 0;
  profile.dealbreakers.forEach((db) => { if (book.flags.includes(db)) penalty += 14; });
  const pct = (raw / profile.totalWeight) * 100;
  let display = 52 + pct * 0.9 - penalty;
  display = Math.max(38, Math.min(97, Math.round(display)));
  return display;
}

export function reasonsForBook(book, profile, answers) {
  const matched = Object.entries(profile.weights)
    .filter(([tag]) => book.tags.includes(tag) && TAG_REASONS[tag])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => TAG_REASONS[tag]);
  const lovedGenres = answers?.lovedGenres || [];
  const genreMatch = book.genres.find((g) => lovedGenres.includes(g));
  if (genreMatch) matched.unshift('لأنك من محبي ' + GENRE_LABELS[genreMatch]);
  if (matched.length === 0) matched.push('يشترك مع ذوقك في أكثر من عنصر حتى وإن لم يكن تطابقًا تامًا');
  return [...new Set(matched)].slice(0, 3);
}

export function computeArchetype(profile, archetypes) {
  let best = archetypes[0];
  let bestScore = -1;
  archetypes.forEach((a) => {
    let s = 0;
    a.need.forEach((t) => { s += profile.weights[t] || 0; });
    if (s > bestScore) { bestScore = s; best = a; }
  });
  return best;
}

export function levelLabel(pct) {
  return pct >= 66 ? 'مرتفع' : (pct >= 38 ? 'متوسط' : 'منخفض');
}

export function computeIndicators(profile) {
  const get = (t) => profile.weights[t] || 0;
  const charPct = Math.min(100, (get('a_strongchar') + get('a_growth') + get('a_relationships')) * 22);
  const pacePct = Math.min(100, Math.max(10, 50 + (get('p_fast') - get('p_slow')) * 18));
  const fantasyPct = Math.min(100, Math.max(10, 50 + (get('m_fantasy') - get('m_realistic')) * 20));
  const depthPct = Math.min(100, Math.max(10, 50 + (get('m_deep') - get('m_light')) * 20 + get('c_literary') * 10));
  return [
    { label: 'اهتمامك بالشخصيات', pct: Math.max(15, charPct) },
    { label: 'تفضيلك للسرعة', pct: pacePct },
    { label: 'ميلك للخيال', pct: fantasyPct },
    { label: 'عمقك المفضّل', pct: depthPct },
  ];
}
