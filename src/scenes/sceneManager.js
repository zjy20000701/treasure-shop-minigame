// 极简场景栈管理器
// 场景约定：实现 render(ctx)，可选实现 onTap(x, y)
export class SceneManager {
  constructor() {
    this.stack = []
  }
  push(scene) {
    this.stack.push(scene)
  }
  pop() {
    this.stack.pop()
  }
  replace(scene) {
    this.stack = [scene]
  }
  get current() {
    return this.stack[this.stack.length - 1]
  }
  render(ctx) {
    if (this.current) this.current.render(ctx)
  }
  onTap(x, y) {
    if (this.current && this.current.onTap) this.current.onTap(x, y)
  }
}
