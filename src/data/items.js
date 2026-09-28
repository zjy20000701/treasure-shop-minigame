// 物品池：直接往里加条目即可扩充商品
// name      商品名
// category  品类（后续可用于品类专属线索）
// basePrice 基准价（实际售价围绕它上下浮动）
// realRate  刷出真品的概率
export const ITEM_POOL = [
  { id: 'vase',     name: '青花缠枝莲纹瓶', category: '瓷器', basePrice: 1500, realRate: 0.35 },
  { id: 'jade',     name: '羊脂玉佩',       category: '玉器', basePrice: 2200, realRate: 0.30 },
  { id: 'painting', name: '山水古画',       category: '字画', basePrice: 1800, realRate: 0.40 },
  { id: 'coin',     name: '光绪元宝',       category: '钱币', basePrice: 600,  realRate: 0.55 },
  { id: 'bronze',   name: '青铜香炉',       category: '铜器', basePrice: 1300, realRate: 0.35 },
  { id: 'watch',    name: '老式机械怀表',   category: '杂项', basePrice: 900,  realRate: 0.50 },
  { id: 'seal',     name: '田黄石印章',     category: '杂项', basePrice: 2600, realRate: 0.25 },
  { id: 'teapot',   name: '紫砂老壶',       category: '瓷器', basePrice: 1100, realRate: 0.45 },
]
