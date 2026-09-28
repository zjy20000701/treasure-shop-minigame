// 商店场景：展示今日货架
import { Button } from '../ui/button'
import { DetailScene } from './detailScene'
import { BagScene } from './bagScene'

export class ShopScene {
  constructor(game) {
    this.game = game
    this.buttons = []
  }

  render(ctx) {
    const g = this.game
    ctx.fillStyle = '#f5efe0'
    ctx.fillRect(0, 0, g.width, g.height)

    ctx.fillStyle = '#333'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(`鉴宝小店   金币：${g.wallet.gold}`, 16, 40)
    ctx.font = '14px sans-serif'
    ctx.fillText('今日货架（每日 0 点刷新）', 16, 66)

    this.buttons = []
    g.shop.forEach((item, i) => {
      const y = 90 + i * 60
      ctx.fillStyle = '#fff'
      ctx.fillRect(12, y, g.width - 24, 50)
      ctx.fillStyle = '#333'
      ctx.fillText(item.name, 24, y + 20)
      ctx.fillStyle = '#b8860b'
      ctx.fillText(`售价 ${item.price} 金币`, 24, y + 40)

      const btn = new Button({
        x: g.width - 104,
        y: y + 9,
        w: 80,
        h: 32,
        text: '看看货',
        onClick: () => g.scenes.push(new DetailScene(g, item)),
      })
      btn.draw(ctx)
      this.buttons.push(btn)
    })

    const bagBtn = new Button({
      x: 16,
      y: g.height - 60,
      w: 140,
      h: 40,
      text: `背包（${g.bag.length}）`,
      onClick: () => g.scenes.push(new BagScene(g)),
    })
    bagBtn.draw(ctx)
    this.buttons.push(bagBtn)
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
