import { list, row, meta, bar } from '../_components/styles';

export default function Placeholder() {
  return (
    <section>
      <div style={meta}>
        <span style={bar(220)} />
      </div>
      <div style={{ ...bar('100%', 36), borderRadius: 6, marginBottom: 12 }} />
      <ul style={list}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} style={row}>
            <span style={bar(80)} />
            <span style={bar(180, 12)} />
            <span style={bar(48)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
