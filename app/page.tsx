import { card } from './_components/styles';

export default function Home() {
  return (
    <div style={card}>
      <p style={{ marginTop: 0 }}>选择上方任一页面查看 SSR / CSR 行为对比。</p>
      <p style={{ marginBottom: 0 }}>
        所有页面都自动支持 <code>?__csr=1</code> 降级。每页一个 store，可以并发多个接口。
      </p>
    </div>
  );
}
