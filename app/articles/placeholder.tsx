import { list, row, meta, bar } from '../_components/styles';

export default function Placeholder() {
  return (
    <section>
      <div style={meta}>
        <span style={bar(260)} />
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span style={bar(14, 14)} />
        <span style={bar(56, 12)} />
      </div>
      <ul style={list}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} style={row}>
            <span style={bar('70%')} />
            <span style={bar(40, 12)} />
            <span style={bar(70, 12)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
