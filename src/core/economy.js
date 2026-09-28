// 经济系统：钱包、费用与买卖结算规则

export const START_GOLD = 800     // 初始金币
export const DAILY_BONUS = 100    // 每日登录奖励
export const APPRAISAL_FEE = 100  // 官方鉴定费

export class Wallet {
  constructor(gold = START_GOLD) {
    this.gold = gold
  }
  canAfford(v) {
    return this.gold >= v
  }
  spend(v) {
    if (!this.canAfford(v)) return false
    this.gold -= v
    return true
  }
  earn(v) {
    this.gold += v
  }
}

// 不经鉴定直接转手：按“玩家的判断”结算，是本作的核心博弈点
// guessReal = true 表示玩家按真品的价格出售
export function quickSell(item, guessReal) {
  if (item.isReal && guessReal) {
    return { gold: Math.round(item.basePrice * 1.6), verdict: '眼力独到！真品卖出高价' }
  }
  if (item.isReal && !guessReal) {
    return { gold: Math.round(item.basePrice * 0.5), verdict: '看走眼了，真品被当成假货贱卖' }
  }
  if (!item.isReal && guessReal) {
    return { gold: Math.round(item.basePrice * 0.2), verdict: '赝品被买家识破，只肯折价回收' }
  }
  return { gold: Math.round(item.basePrice * 0.8), verdict: '果断脱手赝品，及时止损' }
}

// 经官方鉴定后出售：按真实价值结算，稳但赚过鉴定费
export function sellAppraised(item) {
  const gold = item.isReal ? Math.round(item.basePrice * 2) : Math.round(item.basePrice * 0.1)
  return {
    gold,
    verdict: item.isReal ? '真品！鉴定所高价回收' : '确认是赝品，只值个材料钱',
  }
}
