'use client';
import { useState } from 'react';
import { UPLOAD_TYPES, isUpload } from '@/config/fields';
import { uploadFile } from '@/lib/api-client';

export default function FieldInput({ field, value = '', onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const label = <span>{field.name}{field.required && ' *'}</span>;

  if (isUpload(field.type)) {
    const pick = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setBusy(true); setError('');
      try { onChange(await uploadFile(file, field.type)); } catch (err) { setError(err.message); }
      setBusy(false);
    };
    return (
      <label>{label}
        <input type="file" accept={UPLOAD_TYPES[field.type].accept} onChange={pick} disabled={busy} />
        {busy && <small>Uploading…</small>}
        {error && <small className="err">{error}</small>}
        {value && !busy && <small>✓ <a href={value} target="_blank" rel="noopener noreferrer">current file</a></small>}
      </label>
    );
  }
  const isArea = field.type === 'textarea';
  const Tag = isArea ? 'textarea' : 'input';
  return <label>{label}<Tag value={value} rows={isArea ? 5 : undefined} onChange={(e) => onChange(e.target.value)} /></label>;
}
