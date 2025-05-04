# useMessage 消息钩子

`useMessage` 是一个响应式的消息提示钩子函数，用于在应用中快速显示全局消息提示。它是基于 `JvMessage` 组件的函数式封装，提供了更便捷的使用方式。

## 基本用法

```vue
<script setup>
import { useMessage } from '@/hooks/useMessage'

const message = useMessage

function showMessage() {
  // 基本调用
  message('这是一条默认消息')

  // 指定类型
  message.success('操作成功')
  message.error('操作失败')
  message.warning('警告信息')
  message.info('提示信息')

  // 配置选项
  message({
    type: 'success',
    message: '操作成功',
    duration: 5000,
    closable: true,
    showIcon: true,
    center: true,
    variant: 'outlined',
    onClose: () => {
      console.log('消息关闭')
    }
  })
}

// 手动控制
function handleManualMessage() {
  const msg = message.info('这是一条提示信息')
  setTimeout(() => {
    msg.close()
  }, 1000)
}

// 关闭所有消息
function closeAllMessages() {
  message.closeAll()
}
</script>
```

## API 参考

### 参数

```ts
// 消息类型
type MessageType = 'info' | 'success' | 'warning' | 'error'

// 消息变体
type MessageVariant = 'outlined' | 'filled' | ''

// 消息配置选项
interface MessageOptions {
  // 消息类型
  type?: MessageType
  // 是否可关闭
  closable?: boolean
  // 自动关闭
  autoClose?: boolean
  // 是否显示图标
  showIcon?: boolean
  // 显示时间，单位毫秒，设为0则不自动关闭
  duration?: number
  // 是否居中显示
  center?: boolean
  // 变体类型
  variant?: MessageVariant
  // 消息文本内容
  message?: string
  // 关闭回调
  onClose?: () => void
}
```

### 返回值

```ts
interface MessageReturn {
  close: () => void
}
```

### 方法

| 方法名              | 说明         | 参数                                | 返回值          |
| ------------------- | ------------ | ----------------------------------- | --------------- |
| useMessage          | 显示消息     | `options: MessageOptions \| string` | `MessageReturn` |
| useMessage.success  | 显示成功消息 | `options: MessageOptions \| string` | `MessageReturn` |
| useMessage.warning  | 显示警告消息 | `options: MessageOptions \| string` | `MessageReturn` |
| useMessage.info     | 显示信息消息 | `options: MessageOptions \| string` | `MessageReturn` |
| useMessage.error    | 显示错误消息 | `options: MessageOptions \| string` | `MessageReturn` |
| useMessage.closeAll | 关闭所有消息 | -                                   | -               |
