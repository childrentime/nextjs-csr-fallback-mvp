export const products = [
  { id: 1, name: '限时秒杀 · 蓝牙耳机', price: 99, stock: 23, categoryId: 1 },
  { id: 2, name: '限时秒杀 · 智能手表', price: 299, stock: 7, categoryId: 1 },
  { id: 3, name: '限时秒杀 · 移动电源', price: 59, stock: 142, categoryId: 1 },
  { id: 4, name: '限时秒杀 · 机械键盘', price: 399, stock: 4, categoryId: 1 },
  { id: 5, name: '限时秒杀 · 4K 显示器', price: 1599, stock: 12, categoryId: 1 },
  { id: 6, name: '居家拖鞋', price: 39, stock: 88, categoryId: 2 },
  { id: 7, name: '运动 T 恤', price: 89, stock: 56, categoryId: 4 },
];

export const categories = [
  { id: 1, name: '数码电子' },
  { id: 2, name: '家居生活' },
  { id: 3, name: '服饰配件' },
  { id: 4, name: '运动户外' },
];

export const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'editor' },
];

export const articles = [
  { id: 1, title: 'Next.js 15 新特性解析', author: '张三', publishedAt: '2026-04-01' },
  { id: 2, title: 'React Server Components 实战', author: '李四', publishedAt: '2026-04-15' },
  { id: 3, title: 'Zustand vs Redux 对比', author: '王五', publishedAt: '2026-04-20' },
  { id: 4, title: 'SSR 降级到 CSR 的工程实践', author: '赵六', publishedAt: '2026-04-23' },
];

export const featured = { ids: [2, 4] };

export async function delay(ms = 600) {
  return new Promise((r) => setTimeout(r, ms));
}
