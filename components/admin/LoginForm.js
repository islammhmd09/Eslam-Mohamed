'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try { await api.login(password); location.href = '/admin'; } catch (err) { setError(err.message); }
  };
  return (
    <form className="login card" onSubmit={submit}>
      <h2>Owner login</h2>
      <label><span>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus /></label>
      {error && <p className="err">{error}</p>}
      <button>Enter</button>
    </form>
  );
}
