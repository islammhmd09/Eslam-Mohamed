export default function Section({ id, title, isEmpty, children }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {isEmpty ? <p className="empty">Coming soon…</p> : children}
    </section>
  );
}
