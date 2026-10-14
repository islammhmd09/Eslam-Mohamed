export default function Links({ items, map }) {
  return (
    <div className="links">
      {items.map((it, i) => <a key={i} href={it[map.href]} target="_blank" rel="noopener noreferrer">{it[map.label]}</a>)}
    </div>
  );
}
