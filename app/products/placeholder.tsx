import { list, row, meta, bar } from '../_components/styles';

export default function Placeholder() {
  return (
    <section>
      <div style={meta}>
        <span style={bar(280)} />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {[60, 70, 80, 70, 90].map((w, i) => (
          <span key={i} style={{ ...bar(w, 24), borderRadius: 999 }} />
        ))}
      </div>
      <ul style={list}>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} style={row}>
            <span style={bar('60%')} />
            <span style={bar(50)} />
            <span style={bar(40, 12)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
