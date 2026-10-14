import { db } from './supabase/server';
import { AppError } from './errors';
const COLUMNS = 'id, section, data, position';
const unwrap = ({ data, error }) => { if (error) throw new AppError(error.message, 500); return data; };
const table = () => db().from('entries');

/** Data-access layer: the only file that knows about the database. */
export const entries = {
  all: () => table().select(COLUMNS).order('position').order('created_at').then(unwrap),
  list: (section) => table().select(COLUMNS).eq('section', section).order('position').order('created_at').then(unwrap),
  get: (id, section) => table().select(COLUMNS).eq('id', id).eq('section', section).maybeSingle().then(unwrap),
  create: (section, data) => table().insert({ section, data }).select(COLUMNS).single().then(unwrap),
  update: (id, data) => table().update({ data }).eq('id', id).select(COLUMNS).single().then(unwrap),
  remove: (id) => table().delete().eq('id', id).then(unwrap),
};
