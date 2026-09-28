// 每日货架生成
import { dailySeed } from './rng'
import { generateClues } from './appraisal'
import { ITEM_POOL } from '../data/items'

export const DAILY_ITEM_COUNT = 6 // 每天上架数量

// 以日期为种子刷新货架：同一天内结果完全一致
export function refreshShop(date) {
  const { key, rng } = dailySeed(date)

  // 洗牌物品池，取前 N 件
  const pool = [...ITEM_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = pool[i]
    pool[i] = pool[j]
    pool[j] = tmp
  }

  return pool.slice(0, DAILY_ITEM_COUNT).map((tpl, idx) => {
    const isReal = rng() < tpl.realRate          // 隐藏真假属性，UI 层不得直接展示
    const price = Math.round(tpl.basePrice * (0.7 + rng() * 0.8)) // 售价在基准价 0.7~1.5 倍浮动
    return {
      uid: `${key}-${tpl.id}-${idx}`,
      ...tpl,
      isReal,
      price,
      appraised: false,
      clues: generateClues(tpl, isReal, rng),
    }
  })
}
