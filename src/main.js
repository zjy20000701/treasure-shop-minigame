// 启动引导：画布初始化、读档、跨天刷新、触摸分发
import { SceneManager } from './scenes/sceneManager'
import { ShopScene } from './scenes/shopScene'
import { Wallet, DAILY_BONUS } from './core/economy'
import { refreshShop } from './core/shop'
import { loadSave, writeSave, todayKey } from './core/save'

const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')
const info = wx.getSystemInfoSync()
canvas.width = info.windowWidth
canvas.height = info.windowHeight

// 全局游戏状态，所有场景共享
const game = {
  canvas,
  ctx,
  width: info.windowWidth,
  height: info.windowHeight,
  wallet: new Wallet(),
  shop: [],      // 今日货架
  bag: [],       // 背包（已购入的商品）
  lastDay: '',   // 上次刷新日期
  scenes: new SceneManager(),
  persist() {
    writeSave({
      gold: this.wallet.gold,
      bag: this.bag,
      lastDay: this.lastDay,
    })
  },
}

function boot() {
  const save = loadSave()
  const today = todayKey()

  if (save) {
    game.wallet = new Wallet(save.gold)
    game.bag = save.bag || []
    game.lastDay = save.lastDay || ''
  }

  // 货架由日期种子决定，同一天可复现；跨天时发放每日奖励
  if (game.lastDay !== today) {
    if (game.lastDay) game.wallet.earn(DAILY_BONUS)
    game.lastDay = today
    game.persist()
  }
  game.shop = refreshShop().filter(
    item => !game.bag.some(b => b.uid === item.uid)
  )

  game.scenes.replace(new ShopScene(game))
  render()
}

function render() {
  game.scenes.render(ctx)
}

// 触摸分发：处理完点击后重绘当前场景
wx.onTouchEnd(e => {
  const t = e.changedTouches[0]
  game.scenes.onTap(t.clientX, t.clientY)
  render()
})

boot()
