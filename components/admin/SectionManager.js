'use client';
import { useState } from 'react';
import { isUpload } from '@/config/fields';
import { useSection } from '@/hooks/useSection';
import EntryForm from './EntryForm';

const summary = (section, data) =>
  section.fields.filter((f) => !isUpload(f.type)).map((f) => data[f.name]).filter(Boolean).join(' · ') || '(untitled)';

export default function SectionManager({ section }) {
  const { items, loading, error, save, remove } = useSection(section.key);
  const [editing, setEditing] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const target = editing ?? (section.singleton ? items[0] : null); // singleton: always edit the one entry

  const submit = async (values) => {
    const err = await save(values, target?.id);
    if (!err) { setEditing(null); setFormKey((k) => k + 1); }
    return err;
  };

  return (
    <div className="card">
      <h2>{section.label} {!section.singleton && <small>({items.length})</small>}</h2>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="err">{error}</p>}
      {!section.singleton && items.map((e) => (
        <div className="row" key={e.id}>
          <span>{summary(section, e.data)}</span>
          <span>
            <button className="ghost" onClick={() => setEditing(e)}>Edit</button>
            <button className="danger" onClick={() => confirm('Delete this item?') && remove(e.id)}>Delete</button>
          </span>
        </div>
      ))}
      <EntryForm key={target?.id ?? `new-${formKey}`} section={section} initial={target?.data} onSubmit={submit}
        onCancel={editing ? () => setEditing(null) : undefined} />
    </div>
  );
}
