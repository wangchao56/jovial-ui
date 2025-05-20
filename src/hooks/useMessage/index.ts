import type { VNode } from 'vue'
import type { JvMessageProps, MessageType } from '@/components/jv-message'
import { createVNode, render } from 'vue'
import JvMessage from '@/components/jv-message'
import './style.scss'

// 管理所有Message实例
const instances: VNode[] = []
let seed = 1

// Message组件配置接口
export interface MessageOptions extends Omit<JvMessageProps, 'onClose'> {
  /**
   * 消息文本内容
   */
  message?: string
  /**
   * 关闭回调
   */
  onClose?: () => void
  /**
   * 唯一标识
   */
  id?: string
}

// 创建Message实例容器
let messageContainer: HTMLElement | null = null

// 创建Message实例的函数
function createMessage(options: MessageOptions) {
  // 创建容器
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.className = 'jv-message-container'
    document.body.appendChild(messageContainer)
  }

  // 生成唯一ID
  const id = `message_${seed++}`
  options.id = options.id || id

  // 创建关闭回调
  const userOnClose = options.onClose
  const onClose = () => {
    closeMessage(id)
    if (userOnClose) {
      userOnClose()
    }
  }
  const jvMessageProps: JvMessageProps = {
    type: options.type,
    closable: options.closable,
    autoClose: options.autoClose,
    showIcon: options.showIcon,
    duration: options.duration,
    center: options.center,
    variant: options.variant,
  } as any
  // 创建VNode
  const vnode = createVNode(
    JvMessage,
    {
      ...jvMessageProps,
      onClose,
    },
    options.message
      ? {
          default: () => options.message,
        }
      : undefined,
  )

  // 创建容器
  const container = document.createElement('div')
  render(vnode, container)

  // 将内容添加到DOM
  if (container.firstElementChild) {
    messageContainer.appendChild(container.firstElementChild)
  }

  // 保存实例
  instances.push(vnode)

  return {
    close: () => {
      if (vnode.component) {
        const closeFun = vnode.component.exposed?.close
        closeFun?.()
      }
    },
  }
}

// 关闭指定Message
function closeMessage(id: string) {
  const idx = instances.findIndex((instance) => {
    const { props } = instance
    return props && (props as any).id === id
  })

  if (idx === -1)
    return

  const instance = instances[idx]
  if (!instance)
    return

  // 移除实例
  instances.splice(idx, 1)

  // 从DOM中移除
  const el = instance.el as HTMLElement
  if (el && el.parentNode) {
    el.parentNode.removeChild(el)
  }

  // 渲染null以清理引用
  if (instance.el) {
    render(null, instance.el as HTMLElement)
  }
}

// 函数式调用接口
interface MessageFunction {
  (options: MessageOptions | string): { close: () => void }
  success: (options: MessageOptions | string) => { close: () => void }
  warning: (options: MessageOptions | string) => { close: () => void }
  info: (options: MessageOptions | string) => { close: () => void }
  error: (options: MessageOptions | string) => { close: () => void }
  closeAll: () => void
}

// 不同类型的快捷调用
export const useMessage = ((options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  return createMessage(options)
}) as MessageFunction

// 为每种类型提供快捷方法
const messageTypes: MessageType[] = ['success', 'warning', 'info', 'error']

messageTypes.forEach((type) => {
  useMessage[type] = (options: MessageOptions | string) => {
    const opt: MessageOptions
      = typeof options === 'string'
        ? { message: options, type }
        : { ...options, type }
    return createMessage(opt)
  }
})

// 关闭所有Message
useMessage.closeAll = () => {
  instances.forEach((instance) => {
    if (instance.component) {
      const closeFun = instance.component.exposed?.close
      closeFun?.()
    }
  })
  // 清空实例数组
  instances.length = 0
}

// 切换页面并且instance为空 则移除messageContainer
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (instances.length === 0) {
      messageContainer?.remove()
      messageContainer = null
    }
  }
})
