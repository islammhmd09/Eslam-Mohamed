export default function Prose({ items, map }) {
  return items.map((it, i) => <p key={i} className="prose">{it[map.text]}</p>);
}
