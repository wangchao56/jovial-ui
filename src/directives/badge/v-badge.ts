import type { DirectiveBinding, ObjectDirective } from 'vue'
import { createVNode, render } from 'vue'
import JvBadge from '@/components/jv-badge'
import './style.scss'

export interface BadgeOptions {
  value?: string | number
  max?: number
  dot?: boolean
  hidden?: boolean
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  offset?: [number, number]
}

// 自定义的元素接口，用于存储徽章包装器
interface BadgeElement extends HTMLElement {
  _vBadgeWrapper?: HTMLElement
  _vBadgeVNode?: any
}

/**
 * Badge 徽章指令
 * 用法：v-badge="options"
 * options: BadgeOptions
 *
 * 示例：
 * ```html
 * <div v-badge="{ value: 5, type: 'primary' }">内容</div>
 * <div v-badge="{ dot: true, type: 'error' }">内容</div>
 * ```
 */
const vBadge: ObjectDirective<BadgeElement, BadgeOptions> = {
  mounted(el: BadgeElement, binding: DirectiveBinding<BadgeOptions>) {
    // 保证元素有相对定位
    if (window.getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }

    // 创建一个包裹器，用于包含徽章内容
    const badgeWrapper = document.createElement('div')
    badgeWrapper.className = 'v-badge-wrapper'
    badgeWrapper.style.cssText
      = 'position: absolute; top: 0; right: 0; transform: translate(50%, -50%); pointer-events: none;'

    // 应用徽章
    applyBadge(el, binding.value || {}, badgeWrapper)

    // 存储包裹器
    el._vBadgeWrapper = badgeWrapper
    el.appendChild(badgeWrapper)
  },

  updated(el: BadgeElement, binding: DirectiveBinding<BadgeOptions>) {
    // 更新徽章
    if (el._vBadgeWrapper) {
      applyBadge(el, binding.value || {}, el._vBadgeWrapper)
    }
  },

  beforeUnmount(el: BadgeElement) {
    // 移除徽章
    if (el._vBadgeWrapper) {
      if (el._vBadgeVNode) {
        render(null, el._vBadgeWrapper)
      }
      if (el._vBadgeWrapper.parentNode) {
        el._vBadgeWrapper.parentNode.removeChild(el._vBadgeWrapper)
      }
      delete el._vBadgeWrapper
      delete el._vBadgeVNode
    }
  },
}

// 辅助函数：应用徽章
function applyBadge(
  el: BadgeElement,
  options: BadgeOptions,
  wrapper: HTMLElement,
) {
  // 创建VNode
  const vnode = createVNode(JvBadge, {
    ...options,
    style: {
      pointerEvents: 'none',
    },
  })

  // 渲染VNode
  render(vnode, wrapper)

  // 存储VNode以便清理
  el._vBadgeVNode = vnode
}

export default vBadge
