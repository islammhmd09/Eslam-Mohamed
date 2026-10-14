import { browserSupabase } from './supabase/browser';

async function call(url, { body, ...opts } = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body), ...opts });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}
const base = (section) => `/api/admin/${section}`;

export const api = {
  list: (s) => call(base(s)),
  create: (s, body) => call(base(s), { method: 'POST', body }),
  update: (s, id, body) => call(`${base(s)}/${id}`, { method: 'PUT', body }),
  remove: (s, id) => call(`${base(s)}/${id}`, { method: 'DELETE' }),
  login: (password) => call('/api/auth', { method: 'POST', body: { password } }),
  logout: () => call('/api/auth', { method: 'DELETE' }),
};

/** Asks the server for a signed URL, then uploads straight to storage. Returns the public URL. */
export async function uploadFile(file, fieldType) {
  const { bucket, path, token, publicUrl } = await call('/api/admin/upload', {
    method: 'POST', body: { name: file.name, type: file.type, size: file.size, fieldType },
  });
  const { error } = await browserSupabase().storage.from(bucket).uploadToSignedUrl(path, token, file);
  if (error) throw new Error(error.message);
  return publicUrl;
}
