const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url);
export default function Gallery({ items, map }) {
  return (
    <div className="grid">
      {items.map((it, i) => (
        <figure key={i} className="item">
          {isVideo(it[map.src])
            ? <video src={it[map.src]} controls preload="metadata" />
            : <img src={it[map.src]} alt={it[map.caption] || ''} loading="lazy" />}
          {it[map.caption] && <figcaption className="body">{it[map.caption]}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
