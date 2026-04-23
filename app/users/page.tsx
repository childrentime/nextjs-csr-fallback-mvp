'use client';

import { useMemo } from 'react';
import { useStore } from './store';
import { list, row, meta } from '../_components/styles';

export default function Page() {
  const { users, loadedAt, query, setQuery } = useStore();

  const filtered = useMemo(
    () => (query ? users.filter((u) => u.name.includes(query) || u.email.includes(query)) : users),
    [users, query],
  );

  return (
    <section>
      <div style={meta}>
        取数 {new Date(loadedAt).toLocaleTimeString()} · {users.length} 个用户
      </div>
      <input
        type="text"
        placeholder="搜索姓名或邮箱..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={input}
      />
      <ul style={list}>
        {filtered.map((u) => (
          <li key={u.id} style={row}>
            <span>{u.name}</span>
            <span style={{ color: '#9ca3af', fontSize: 12 }}>{u.email}</span>
            <span style={{ color: '#60a5fa' }}>{u.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 6,
  background: '#1f2937',
  border: '1px solid #374151',
  color: '#fff',
  fontSize: 14,
  marginBottom: 12,
};
