import crypto from 'crypto';
import { cookies } from 'next/headers';
import { COOKIE, verifySession } from './session';
import { need } from '../env';
const digest = (s) => crypto.createHash('sha256').update(String(s)).digest();
export const isAdmin = () => verifySession(cookies().get(COOKIE)?.value);
export const passwordMatches = (input) => crypto.timingSafeEqual(digest(input), digest(need('ADMIN_PASSWORD')));
