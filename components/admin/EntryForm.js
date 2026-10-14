'use client';
import { useState } from 'react';
import FieldInput from './FieldInput';

export default function EntryForm({ section, initial, onSubmit, onCancel }) {
  const [values, setValues] = useState(initial ?? {});
  const [message, setMessage] = useState('');
  const submit = async () => { setMessage((await onSubmit(values)) ?? ''); };
  return (
    <div className="form">
      {section.fields.map((f) => (
        <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))} />
      ))}
      {message && <p className="err">{message}</p>}
      <div className="actions">
        <button onClick={submit}>{initial ? 'Save changes' : 'Add'}</button>
        {onCancel && <button className="ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
}
