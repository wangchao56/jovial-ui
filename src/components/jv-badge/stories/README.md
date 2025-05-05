# JvBadge 徽标组件

## 1. 介绍组件

JvBadge 是一个用于显示计数、状态或提示信息的徽标组件。它通常作为其他元素的附加标记，可以展示数字、文本或简单的圆点，用于表示新消息、未读数量、状态变化等场景。

## 2. 布局结构使用方式

JvBadge 组件采用简洁的结构，主要包含两部分：

- 默认插槽：包裹需要添加徽标的内容
- 徽标内容：显示在默认内容右上角的标记

基本使用示例：

```Vue
<template>
  <!-- 基础徽标 -->
  <JvBadge :value="5">
    <JvButton>消息</JvButton>
  </JvBadge>

  <!-- 最大值 -->
  <JvBadge :value="100" :max="99">
    <JvButton>通知</JvButton>
  </JvBadge>

  <!-- 小圆点 -->
  <JvBadge dot>
    <JvButton>提醒</JvButton>
  </JvBadge>

  <!-- 自定义偏移 -->
  <JvBadge :value="8" :offset="[10, -5]">
    <JvButton>自定义位置</JvButton>
  </JvBadge>

  <!-- 不同颜色类型 -->
  <JvBadge :value="1" type="primary">
    <JvIcon name="mdi:email" />
  </JvBadge>
</template>
```

## 3. 样式

JvBadge 组件提供多种样式定制选项：

- **类型 (type)**：

  - error (默认)：错误/警告色，通常为红色
  - primary：主要主题色
  - success：成功色，通常为绿色
  - warning：警告色，通常为黄色
  - info：信息色，通常为蓝色

- **显示模式**：

  - 数字/文本模式：显示具体的数值或文本内容
  - 圆点模式 (dot)：只显示一个小圆点，不显示具体内容

- **位置调整**：
  - 默认位置：显示在内容的右上角
  - 自定义偏移：通过 offset 属性调整徽标的水平和垂直位置

使用样式示例：

```vue
<template>
  <!-- 不同类型 -->
  <JvBadge value="new" type="primary">
    <JvButton>主要</JvButton>
  </JvBadge>

  <JvBadge value="99+" type="success">
    <JvButton>成功</JvButton>
  </JvBadge>

  <JvBadge value="热" type="warning">
    <JvButton>警告</JvButton>
  </JvBadge>

  <JvBadge value="!" type="error">
    <JvButton>错误</JvButton>
  </JvBadge>

  <JvBadge value="i" type="info">
    <JvButton>信息</JvButton>
  </JvBadge>

  <!-- 不同显示模式 -->
  <JvBadge value="99+">
    <JvButton>数字模式</JvButton>
  </JvBadge>

  <JvBadge dot>
    <JvButton>圆点模式</JvButton>
  </JvBadge>
</template>
```

## 4. 交互

JvBadge 组件提供以下交互特性：

- **点击事件**：徽标本身可以响应点击事件
- **显示隐藏**：通过 hidden 属性可以控制徽标的显示和隐藏
- **最大值**：当数值超过 max 属性设定的最大值时，会显示为 "{max}+"
- **自定义位置**：使用 offset 属性可以调整徽标的位置

交互使用示例：

```vue
<template>
  <!-- 点击徽标事件 -->
  <JvBadge :value="unreadCount" @click="handleBadgeClick">
    <JvButton>消息</JvButton>
  </JvBadge>

  <!-- 控制显示隐藏 -->
  <JvBadge :value="5" :hidden="hideFlag">
    <JvButton @click="hideFlag = !hideFlag">
      {{ hideFlag ? '显示徽标' : '隐藏徽标' }}
    </JvButton>
  </JvBadge>
</template>

<script setup>
import { ref } from 'vue'

const unreadCount = ref(5)
const hideFlag = ref(false)

function handleBadgeClick(event) {
  // 点击徽标时的处理逻辑
  unreadCount.value = 0
  event.stopPropagation() // 阻止事件冒泡
}
</script>
```

## 5. 可访问性

JvBadge 组件的可访问性设计包括：

- 使用语义化标签 `<sup>` 表示徽标内容，提高屏幕阅读器的识别度
- 徽标内容和背景色有足够的对比度，确保视觉上的可识别性
- 当徽标表示重要信息时，可考虑添加 aria-label 或 aria-description 属性提供更多上下文
- 若徽标仅作为装饰用途，可以使用 aria-hidden="true" 避免屏幕阅读器读出无意义的内容
- 徽标内的文本保持简洁，便于理解和朗读

## 6. Vue API

### Props

| 属性名 | 类型             | 默认值    | 说明                              |
| ------ | ---------------- | --------- | --------------------------------- |
| value  | string \| number | undefined | 显示的值                          |
| max    | number           | 99        | 最大值，超过最大值会显示 '{max}+' |
| dot    | boolean          | false     | 是否为圆点模式                    |
| hidden | boolean          | false     | 是否隐藏徽标                      |
| type   | ColorType        | 'error'   | 徽标颜色类型                      |
| offset | [number, number] | undefined | 自定义徽标位置偏移，格式为 [x, y] |

### 事件 (Emits)

| 事件名 | 参数                | 说明           |
| ------ | ------------------- | -------------- |
| click  | (event: MouseEvent) | 点击徽标时触发 |

### 插槽 (Slots)

| 插槽名  | 说明                                 |
| ------- | ------------------------------------ |
| default | 默认插槽，用于包裹需要添加徽标的内容 |
