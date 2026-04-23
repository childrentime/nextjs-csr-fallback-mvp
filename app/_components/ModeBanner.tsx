import { headers } from 'next/headers';
import { CSR_HEADER, CSR_ON } from '@/lib/csr-constants';
import { card } from './styles';

export default async function ModeBanner() {
  const isCsr = (await headers()).get(CSR_HEADER) === CSR_ON;
  return (
    <div style={card}>
      <strong>当前模式：</strong>
      {isCsr
        ? '🟡 CSR (URL 含 __csr，所有页面服务端跳过取数)'
        : '🟢 SSR (服务端预取并注水)'}
      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
        DevTools Network 看 <code>localhost:4000/*</code>，对比 Express 终端日志。
      </div>
    </div>
  );
}
