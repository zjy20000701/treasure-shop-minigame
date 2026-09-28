// 商品详情场景：看线索、决定是否买入
import { Button } from '../ui/button'

export class DetailScene {
  constructor(game, item) {
    this.game = game
    this.item = item
    this.buttons = []
    this.message = ''
  }

  render(ctx) {
    const g = this.game
    const item = this.item
    ctx.fillStyle = '#f5efe0'
    ctx.fillRect(0, 0, g.width, g.height)

    ctx.fillStyle = '#333'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(item.name, 16, 44)
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#b8860b'
    ctx.fillText(`售价：${item.price} 金币`, 16, 72)

    ctx.fillStyle = '#333'
    ctx.fillText('—— 掌柜提供的线索 ——', 16, 104)
    item.clues.forEach((c, i) => {
      ctx.fillText(`· ${c}`, 16, 132 + i * 26)
    })

    if (this.message) {
      ctx.fillStyle = '#a33'
      ctx.fillText(this.message, 16, 132 + item.clues.length * 26 + 24)
    }

    this.buttons = []
    const buyBtn = new Button({
      x: 16, y: g.height - 130, w: 150, h: 44,
      text: '买入',
      onClick: () => this.buy(),
    })
    const backBtn = new Button({
      x: 16, y: g.height - 70, w: 150, h: 44,
      text: '返回',
      onClick: () => g.scenes.pop(),
    })
    buyBtn.draw(ctx)
    backBtn.draw(ctx)
    this.buttons.push(buyBtn, backBtn)
  }

  buy() {
    const g = this.game
    if (!g.wallet.spend(this.item.price)) {
      this.message = '金币不足，买不起！'
      return
    }
    g.bag.push(this.item)
    g.shop = g.shop.filter(i => i.uid !== this.item.uid)
    g.persist()
    g.scenes.pop()
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
