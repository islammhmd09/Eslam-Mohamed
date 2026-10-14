import { cookies } from 'next/headers';
import { route, body } from '@/lib/http';
import { AppError } from '@/lib/errors';
import { passwordMatches } from '@/lib/auth/admin';
import { COOKIE, sessionCookie, signSession } from '@/lib/auth/session';

export const POST = route(async (req) => {
  const { password = '' } = await body(req);
  await new Promise((r) => setTimeout(r, 600)); // slows brute force; add real rate limiting later
  if (!passwordMatches(password)) throw new AppError('Wrong password', 401);
  cookies().set(COOKIE, await signSession(), sessionCookie);
  return { ok: true };
}, { admin: false });

export const DELETE = route(async () => { cookies().delete(COOKIE); return { ok: true }; }, { admin: false });
