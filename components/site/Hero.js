export default function Hero({ about }) {
  return (
    <div className="hero">
      <div><p className="kicker">{about.title || 'Your title here'}</p><h1>{about.name || 'Your Name'}</h1></div>
      {about.photo ? <img src={about.photo} alt={about.name || ''} /> : <div className="ph" />}
    </div>
  );
}
