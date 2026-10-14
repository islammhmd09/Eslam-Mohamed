'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

/** All client-side state + CRUD for one section. Mutations resolve to an error message or null. */
export function useSection(key) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  const load = useCallback(async () => {
    try { setItems(await api.list(key)); setStatus({ loading: false, error: null }); }
    catch (e) { setStatus({ loading: false, error: e.message }); }
  }, [key]);
  useEffect(() => { load(); }, [load]);

  const mutate = async (action) => {
    try { await action(); await load(); return null; } catch (e) { return e.message; }
  };
  return {
    items, ...status,
    save: (data, id) => mutate(() => (id ? api.update(key, id, data) : api.create(key, data))),
    remove: (id) => mutate(() => api.remove(key, id)),
  };
}
