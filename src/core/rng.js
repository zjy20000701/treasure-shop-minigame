// 种子随机数：让“每日刷新”可复现的关键
// 同一天用同一个日期字符串做种子，生成的货架完全一致

// 字符串 -> 32 位整数哈希
export function hashSeed(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

// mulberry32：轻量、质量够用的伪随机数生成器
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 以“今天”为种子：返回日期 key 和对应的随机函数
export function dailySeed(date = new Date()) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return { key, rng: mulberry32(hashSeed(key)) }
}
