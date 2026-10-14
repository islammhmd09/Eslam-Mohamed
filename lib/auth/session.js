// Edge-safe (used by middleware): no Node-only imports here.
import { SignJWT, jwtVerify } from 'jose';
import { need } from '../env';
export const COOKIE = 'session';
const MAX_AGE = 60 * 60 * 24 * 7;
const key = () => new TextEncoder().encode(need('SESSION_SECRET'));
export const sessionCookie = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: MAX_AGE };
export const signSession = () => new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(`${MAX_AGE}s`).sign(key());
export async function verifySession(token) {
  if (!token) return false;
  try { await jwtVerify(token, key()); return true; } catch { return false; }
}
