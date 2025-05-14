# JvMessage 消息组件

## 组件介绍

JvMessage 是一个全局消息提示组件，用于向用户展示简短的提示信息、操作结果反馈或系统通知。它支持不同类型的消息（信息、成功、警告、错误），可以自动关闭或手动关闭，并提供丰富的样式定制选项。

## 布局结构使用方式

JvMessage 组件以轻量级弹出框的形式出现在页面顶部中央位置，由图标、消息内容和可选的关闭按钮组成。组件支持四种类型的消息，每种类型都有对应的颜色和图标。

基本使用示例：

```vue
<template>
  <JvMessage type="info">这是一条信息提示</JvMessage>
  <JvMessage type="success">操作成功</JvMessage>
  <JvMessage type="warning">警告信息</JvMessage>
  <JvMessage type="error">错误信息</JvMessage>
</template>
```

## 交互设计

- **自动关闭**：默认情况下，消息会在指定的时间后自动关闭（默认为3秒）
- **手动关闭**：可以通过设置 `closable` 属性来显示关闭按钮，允许用户手动关闭消息
- **悬停暂停**：当鼠标悬停在消息上时，自动关闭的计时会暂停，移开后继续倒计时
- **动画效果**：消息出现和消失时有平滑的过渡动画效果
- **类型区分**：不同类型的消息（信息、成功、警告、错误）有不同的颜色和图标，便于用户快速识别

## 可访问性

JvMessage 组件在设计时考虑了可访问性：

- 使用 `role="alert"` 属性，确保屏幕阅读器能够正确识别并朗读消息内容
- 消息图标和内容之间有足够的对比度，提高视觉辨识度
- 关闭按钮有明确的视觉提示和可点击区域
- 支持通过键盘操作关闭消息

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 消息类型 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| autoClose | `boolean` | `true` | 是否自动关闭 |
| showIcon | `boolean` | `true` | 是否显示图标 |
| duration | `number` | `3000` | 显示时间（毫秒），设为 0 则不自动关闭 |
| center | `boolean` | `false` | 是否居中显示内容 |
| variant | `'' \| 'outlined' \| 'filled'` | `''` | 消息样式变体 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| close | - | 消息关闭时触发 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 消息内容 |

### Expose

| 方法名 | 说明 |
|--------|------|
| close | 关闭消息 |

## 测试用例

JvMessage 组件的测试覆盖了以下场景：

### 基础功能测试
- 使用默认属性正确渲染消息内容
- 验证组件基本样式类的正确应用

### Props 功能测试
- 测试不同消息类型（info、success、warning、error）的样式应用
- 验证 `showIcon` 属性控制图标显示/隐藏
- 验证 `closable` 属性控制关闭按钮显示/隐藏
- 验证 `center` 属性控制内容居中显示
- 测试不同变体样式（outlined、filled）的正确应用

### Emits 事件测试
- 测试点击关闭按钮时正确触发 `close` 事件

### 自动关闭功能测试
- 验证消息在指定的 `duration` 时间后自动关闭
- 验证当 `duration` 设为 0 时消息不会自动关闭
- 测试鼠标悬停时暂停自动关闭，移开后继续倒计时

### 样式测试
- 验证不同类型消息的颜色、图标样式正确应用
- 测试消息出现和消失的过渡动画效果

### 可访问性测试
- 验证组件包含正确的 ARIA 属性

## 使用示例

### 基础用法

```vue
<template>
  <div>
    <JvButton @click="showMessage('info')">显示信息</JvButton>
    <JvButton @click="showMessage('success')">显示成功</JvButton>
    <JvButton @click="showMessage('warning')">显示警告</JvButton>
    <JvButton @click="showMessage('error')">显示错误</JvButton>
  </div>
</template>

<script setup>
import { JvMessage, JvButton } from 'jovial-ui'
import { ref } from 'vue'

function showMessage(type) {
  const message = ref(null)
  message.value = <JvMessage type={type} onClose={() => console.log('消息已关闭')}>
    这是一条{type}消息
  </JvMessage>
}
</script>
```

### 可关闭的消息

```vue
<template>
  <JvButton @click="showClosableMessage">显示可关闭消息</JvButton>
</template>

<script setup>
import { JvMessage, JvButton } from 'jovial-ui'

function showClosableMessage() {
  <JvMessage closable duration="0">
    这是一条可手动关闭的消息，不会自动关闭
  </JvMessage>
}
</script>
```

### 无图标消息

```vue
<template>
  <JvButton @click="showMessageWithoutIcon">显示无图标消息</JvButton>
</template>

<script setup>
import { JvMessage, JvButton } from 'jovial-ui'

function showMessageWithoutIcon() {
  <JvMessage showIcon={false}>
    这是一条不带图标的消息
  </JvMessage>
}
</script>
```

### 不同变体样式

```vue
<template>
  <div>
    <JvButton @click="showMessage('outlined')">显示描边样式</JvButton>
    <JvButton @click="showMessage('filled')">显示填充样式</JvButton>
  </div>
</template>

<script setup>
import { JvMessage, JvButton } from 'jovial-ui'

function showMessage(variant) {
  <JvMessage type="success" :variant="variant">
    这是一条使用 {variant} 样式的消息
  </JvMessage>
}
</script>
```

### 居中显示内容

```vue
<template>
  <JvButton @click="showCenteredMessage">显示居中消息</JvButton>
</template>

<script setup>
import { JvMessage, JvButton } from 'jovial-ui'

function showCenteredMessage() {
  <JvMessage center type="info">
    这是一条居中显示的消息
  </JvMessage>
}
</script>
```
