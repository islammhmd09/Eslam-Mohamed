export default function Timeline({ items, map }) {
  return (
    <div className="tl">
      {items.map((it, i) => (
        <div key={i}><small>{it[map.meta]}</small><h3>{it[map.title]}</h3><p>{it[map.text]}</p></div>
      ))}
    </div>
  );
}
