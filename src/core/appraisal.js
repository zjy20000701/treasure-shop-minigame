// 线索生成与鉴定
import { REAL_CLUES, FAKE_CLUES, NEUTRAL_CLUES } from '../data/clues'

function pick(rng, arr, n) {
  const copy = [...arr]
  const out = []
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0])
  }
  return out
}

// 为一件商品生成线索：2 条指向真相 + 1 条干扰，最后打乱顺序
export function generateClues(item, isReal, rng) {
  const truth = pick(rng, isReal ? REAL_CLUES : FAKE_CLUES, 2)
  const decoy = pick(rng, NEUTRAL_CLUES, 1)
  const clues = [...truth, ...decoy]
  for (let i = clues.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = clues[i]
    clues[i] = clues[j]
    clues[j] = tmp
  }
  return clues
}

// 官方鉴定：付费后揭晓真假，并给出真实价值
export function officialAppraise(item) {
  return {
    isReal: item.isReal,
    realValue: item.isReal ? Math.round(item.basePrice * 2) : Math.round(item.basePrice * 0.1),
  }
}
