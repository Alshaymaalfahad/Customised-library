// هوية قارئ مجهول عبر كوكيز — بدون تسجيل دخول أو كلمة مرور.
// أول تفاعل (استبيان، تقييم، تحديث حالة كتاب...) يولّد معرفًا فريدًا يُحفظ سنة كاملة.
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

export const READER_COOKIE = 'reader_id';
const MAX_AGE = 60 * 60 * 24 * 365;

// للاستخدام داخل Route Handlers: يقرأ الكوكيز، وينشئ معرّفًا جديدًا ويحفظه إن لم يوجد.
export async function getOrCreateReaderId() {
  const store = await cookies();
  let id = store.get(READER_COOKIE)?.value;
  if (!id) {
    id = crypto.randomUUID();
    store.set(READER_COOKIE, id, {
      httpOnly: true, sameSite: 'lax', path: '/', maxAge: MAX_AGE,
    });
  }
  return id;
}

// للاستخدام داخل مكوّنات السيرفر (Server Components): قراءة فقط، بدون تعديل الكوكيز.
export async function getReaderId() {
  const store = await cookies();
  return store.get(READER_COOKIE)?.value || null;
}
