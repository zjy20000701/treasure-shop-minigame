// 背包场景：鉴定 / 凭判断转手 / 按鉴定价出售
import { Button } from '../ui/button'
import { APPRAISAL_FEE, quickSell, sellAppraised } from '../core/economy'
import { officialAppraise } from '../core/appraisal'

export class BagScene {
  constructor(game) {
    this.game = game
    this.buttons = []
    this.message = ''
  }

  render(ctx) {
    const g = this.game
    ctx.fillStyle = '#f5efe0'
    ctx.fillRect(0, 0, g.width, g.height)

    ctx.fillStyle = '#333'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`背包   金币：${g.wallet.gold}`, 16, 40)
    ctx.font = '14px sans-serif'

    this.buttons = []
    if (!g.bag.length) {
      ctx.fillText('空空如也，去店里淘点货吧', 16, 80)
    }

    g.bag.forEach((item, i) => {
      const y = 70 + i * 92
      ctx.fillStyle = '#fff'
      ctx.fillRect(12, y, g.width - 24, 82)

      ctx.fillStyle = '#333'
      const tag = item.appraised ? (item.isReal ? '【已鉴定：真】' : '【已鉴定：假】') : '【未鉴定】'
      ctx.fillText(`${item.name} ${tag}`, 20, y + 22)

      const mk = (x, text, fn) => {
        const b = new Button({ x, y: y + 40, w: 104, h: 32, text, onClick: fn })
        b.draw(ctx)
        this.buttons.push(b)
      }
      if (!item.appraised) {
        mk(20, `鉴定(-${APPRAISAL_FEE})`, () => this.appraise(item))
        mk(136, '当真品卖', () => this.sell(item, true))
        mk(252, '当赝品抛', () => this.sell(item, false))
      } else {
        mk(20, '按鉴定价出售', () => this.sellVerified(item))
      }
    })

    if (this.message) {
      ctx.fillStyle = '#a33'
      ctx.fillText(this.message, 16, g.height - 100)
    }

    const back = new Button({
      x: 16, y: g.height - 70, w: 120, h: 40,
      text: '返回',
      onClick: () => g.scenes.pop(),
    })
    back.draw(ctx)
    this.buttons.push(back)
  }

  appraise(item) {
    const g = this.game
    if (!g.wallet.spend(APPRAISAL_FEE)) {
      this.message = '金币不足，无法鉴定'
      return
    }
    const r = officialAppraise(item)
    item.appraised = true
    this.message = `鉴定结果：${r.isReal ? '真品！' : '赝品……'}`
    g.persist()
  }

  sell(item, guessReal) {
    const g = this.game
    const r = quickSell(item, guessReal)
    g.wallet.earn(r.gold)
    g.bag = g.bag.filter(i => i.uid !== item.uid)
    this.message = `${r.verdict}（+${r.gold} 金币）`
    g.persist()
  }

  sellVerified(item) {
    const g = this.game
    const r = sellAppraised(item)
    g.wallet.earn(r.gold)
    g.bag = g.bag.filter(i => i.uid !== item.uid)
    this.message = `${r.verdict}（+${r.gold} 金币）`
    g.persist()
  }

  onTap(x, y) {
    for (const b of this.buttons) {
      if (b.contains(x, y)) {
        b.onClick()
        return
      }
    }
  }
}
