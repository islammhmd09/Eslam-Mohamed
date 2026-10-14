export default function Chips({ items, map }) {
  return <div className="chips">{items.map((it, i) => <span key={i}>{it[map.label]}</span>)}</div>;
}
