// Canvas 矩形按钮：绘制 + 命中检测
// 小游戏没有 DOM，UI 都要自己画，这是最小的可复用组件
export class Button {
  constructor({ x, y, w, h, text, onClick, bg = '#8b5a2b', color = '#fff' }) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.text = text
    this.onClick = onClick
    this.bg = bg
    this.color = color
  }
  draw(ctx) {
    ctx.fillStyle = this.bg
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.fillStyle = this.color
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2)
  }
  contains(px, py) {
    return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h
  }
}
