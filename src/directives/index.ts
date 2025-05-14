// 直接从v-badge目录中导入指令实现文件
import type { App } from 'vue'
import vBadge from './badge'
import vRipple from './ripple'
// 导出所有指令
export { vBadge, vRipple }

// 安装所有指令的函数
export function setupDirectives(app: App): void {
  app.directive('badge', vBadge)
  // 在这里添加更多指令
}
