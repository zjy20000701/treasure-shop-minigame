// 本地存档（wx 本地存储封装）
// 后续如需云存档 / 多端同步，只需替换这个文件的实现

const SAVE_KEY = 'treasure_shop_save_v1'

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function loadSave() {
  try {
    return wx.getStorageSync(SAVE_KEY) || null
  } catch (e) {
    return null
  }
}

export function writeSave(data) {
  try {
    wx.setStorageSync(SAVE_KEY, data)
  } catch (e) {
    // 存储失败不阻塞游戏
  }
}
