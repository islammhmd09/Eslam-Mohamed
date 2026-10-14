import { NextResponse } from 'next/server';
import { AppError } from './errors';
import { isAdmin } from './auth/admin';

/** Wraps a handler with auth, JSON serialisation and uniform error handling. */
export const route = (handler, { admin = true } = {}) => async (req, ctx) => {
  try {
    if (admin && !(await isAdmin())) throw new AppError('Unauthorized', 401);
    return NextResponse.json(await handler(req, ctx));
  } catch (e) {
    const status = e instanceof AppError ? e.status : 500;
    if (status === 500) console.error(e);
    return NextResponse.json({ error: status === 500 ? 'Server error' : e.message }, { status });
  }
};
export const body = (req) => req.json().catch(() => { throw new AppError('Invalid JSON'); });
