'use client';
import { useState } from 'react';
import { SECTIONS } from '@/config/sections';
import { api } from '@/lib/api-client';
import SectionManager from './SectionManager';

export default function AdminApp() {
  const [active, setActive] = useState(SECTIONS[0]);
  const logout = async () => { await api.logout(); location.href = '/admin/login'; };
  return (
    <div className="shell">
      <aside>
        <h1>Admin</h1>
        <nav>{SECTIONS.map((s) => <button key={s.key} className={s.key === active.key ? 'on' : ''} onClick={() => setActive(s)}>{s.label}</button>)}</nav>
        <a href="/" target="_blank">View site ↗</a>
        <button className="ghost" onClick={logout}>Log out</button>
      </aside>
      <div className="panel"><SectionManager key={active.key} section={active} /></div>
    </div>
  );
}
