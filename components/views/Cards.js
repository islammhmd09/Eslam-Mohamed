export default function Cards({ items, map }) {
  return (
    <div className="grid">
      {items.map((it, i) => (
        <article key={i} className="item">
          {it[map.image] && <img src={it[map.image]} alt={it[map.title] || ''} loading="lazy" />}
          <div className="body">
            <small>{it[map.meta]}</small>
            <h3>{it[map.title]}</h3>
            <p>{it[map.text]}</p>
            {it[map.link] && <a href={it[map.link]} target="_blank" rel="noopener noreferrer">View →</a>}
          </div>
        </article>
      ))}
    </div>
  );
}
