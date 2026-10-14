import { randomUUID } from 'crypto';
import { MAX_UPLOAD_BYTES, UPLOAD_TYPES } from '@/config/fields';
import { db } from './supabase/server';
import { AppError } from './errors';

export const BUCKET = 'media';
const bucket = () => db().storage.from(BUCKET);
const MARKER = `/object/public/${BUCKET}/`;
export const pathFromUrl = (url) => (url?.includes(MARKER) ? decodeURIComponent(url.split(MARKER)[1]) : null);

/** Validates the request and returns a signed URL so the browser uploads straight to storage
 *  (bypasses Vercel's 4.5MB request limit, which matters for videos). */
export async function createUpload({ name = '', type, size, fieldType }) {
  const rule = UPLOAD_TYPES[fieldType];
  if (!rule?.mime.includes(type)) throw new AppError('File type not allowed');
  if (!(size > 0 && size <= MAX_UPLOAD_BYTES)) throw new AppError('File too large (max 50MB)');
  const ext = name.includes('.') ? name.split('.').pop().toLowerCase().replace(/\W/g, '') : 'bin';
  const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;
  const { data, error } = await bucket().createSignedUploadUrl(path);
  if (error) throw new AppError(error.message, 500);
  return { bucket: BUCKET, path, token: data.token, publicUrl: bucket().getPublicUrl(path).data.publicUrl };
}

export async function removeFiles(urls) {
  const paths = urls.map(pathFromUrl).filter(Boolean);
  if (paths.length) await bucket().remove(paths);
}
