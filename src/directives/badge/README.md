# v-badge 徽章指令

`v-badge` 指令用于在任何元素上添加徽章标记。它基于 `JvBadge` 组件实现，提供了更简便的使用方式。

## 基本用法

```vue
<template>
  <!-- 显示数字 -->
  <div v-badge="{ value: 5 }">内容</div>

  <!-- 仅显示圆点 -->
  <div v-badge="{ dot: true }">内容</div>

  <!-- 不同类型 -->
  <div v-badge="{ value: 3, type: 'primary' }">主色徽章</div>
  <div v-badge="{ value: 3, type: 'success' }">成功徽章</div>
  <div v-badge="{ value: 3, type: 'warning' }">警告徽章</div>
  <div v-badge="{ value: 3, type: 'error' }">错误徽章</div>
  <div v-badge="{ value: 3, type: 'info' }">信息徽章</div>

  <!-- 设置最大值 -->
  <div v-badge="{ value: 100, max: 99 }">最大值徽章</div>

  <!-- 位置偏移 -->
  <div v-badge="{ value: 8, offset: [10, 10] }">偏移徽章</div>

  <!-- 隐藏徽章 -->
  <div v-badge="{ value: 8, hidden: true }">隐藏徽章</div>
</template>
```

## 配置选项

| 参数   | 说明                              | 类型                                                       | 默认值 |
| ------ | --------------------------------- | ---------------------------------------------------------- | ------ |
| value  | 显示值                            | `string \| number`                                         | -      |
| max    | 最大值，超过最大值会显示 '{max}+' | `number`                                                   | 99     |
| dot    | 小圆点模式                        | `boolean`                                                  | false  |
| hidden | 是否隐藏徽章                      | `boolean`                                                  | false  |
| type   | 徽章类型                          | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | error  |
| offset | 位置偏移，格式为 [x, y]           | `[number, number]`                                         | -      |

## 全局注册

```ts
import { setupDirectives } from '@/directives'
// 或者只注册 badge 指令
import { badgeDirective } from '@/directives'
// main.ts
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

// 注册所有指令
setupDirectives(app)
app.directive('badge', badgeDirective)

app.mount('#app')
```

## 局部注册

```vue
<script setup>
import { badgeDirective } from '@/directives'

// 局部注册
const vBadge = badgeDirective
</script>

<template>
  <div v-badge="{ value: 5 }">内容</div>
</template>
```
