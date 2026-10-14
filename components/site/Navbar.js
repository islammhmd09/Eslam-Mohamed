import { SECTIONS } from '@/config/sections';
export default function Navbar({ name }) {
  return (
    <header className="nav">
      <b>{name || 'Your Name'}</b>
      <nav>{SECTIONS.filter((s) => s.nav !== false).map((s) => <a key={s.key} href={`#${s.key}`}>{s.label}</a>)}</nav>
    </header>
  );
}
