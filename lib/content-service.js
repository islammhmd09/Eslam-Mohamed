import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { getSection } from '@/config/sections';
import { uploadFields } from '@/config/fields';
import { entries } from './repository';
import { removeFiles } from './storage';
import { validate } from './validation';
import { AppError } from './errors';

/** Business logic. Routes and pages talk to this layer, never to the database directly. */
const requireSection = (key) => {
  const section = getSection(key);
  if (!section) throw new AppError('Unknown section', 404);
  return section;
};
const filesOf = (section, data) => uploadFields(section).map((f) => data?.[f.name]).filter(Boolean);
const refreshSite = () => revalidatePath('/');

/** Whole site in one query, grouped by section. Cached per request. */
export const getSiteContent = cache(async () =>
  (await entries.all()).reduce((acc, row) => ((acc[row.section] ??= []).push(row), acc), {}));

export const listEntries = (key) => entries.list(requireSection(key).key);

export async function saveEntry(key, input, id) {
  const section = requireSection(key);
  const data = validate(section, input);
  const existing = id ? await entries.get(id, key) : section.singleton ? (await entries.list(key))[0] : null;
  if (id && !existing) throw new AppError('Not found', 404);

  const saved = existing ? await entries.update(existing.id, data) : await entries.create(key, data);
  if (existing) {
    const kept = filesOf(section, data);
    await removeFiles(filesOf(section, existing.data).filter((url) => !kept.includes(url))); // replaced files
  }
  refreshSite();
  return saved;
}

export async function deleteEntry(key, id) {
  const section = requireSection(key);
  const existing = await entries.get(id, key);
  if (!existing) throw new AppError('Not found', 404);
  await entries.remove(id);
  await removeFiles(filesOf(section, existing.data));
  refreshSite();
  return { ok: true };
}
