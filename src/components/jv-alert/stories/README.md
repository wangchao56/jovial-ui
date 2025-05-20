# JvAlert 警告提示

## 组件介绍
Alert 警告提示组件用于向用户显示警告、通知或提示信息，可以包含标题、内容、图标和关闭按钮。

## 布局结构使用方式
Alert 组件由图标区域、内容区域和操作区域组成。内容区域可以包含标题和描述内容，而操作区域通常是关闭按钮。组件支持多种类型的警告样式（成功、警告、信息、错误）以及不同的显示模式（填充或轮廓）。

## 交互设计
- 可通过点击关闭按钮关闭警告提示
- 提供不同类型的警告样式（成功、警告、信息、错误）
- 支持自定义图标、标题和内容
- 可以通过 `v-model:visible` 控制警告的显示和隐藏

## 可访问性
- 使用适当的语义HTML结构
- 关闭按钮具有清晰的 `aria-label`
- 图标提供额外的视觉指示，帮助用户理解警告的重要性和类型

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ----- | --- | ----- | --- |
| type | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | 警告类型 |
| closable | `boolean` | `false` | 是否可关闭 |
| title | `string` | - | 警告标题 |
| description | `string` | - | 警告描述内容 |
| icon | `string` | - | 自定义图标名称 |
| showIcon | `boolean` | `true` | 是否显示图标 |
| outlined | `boolean` | `false` | 是否使用轮廓风格 |
| color | `string` | - | 自定义颜色 |
| background | `string` | - | 自定义背景色 |
| rounded | `RoundedType` | `'none'` | 圆角类型 |
| visible | `boolean` | `true` | 是否显示 |

### Emits

| 事件名 | 参数 | 说明 |
| ----- | --- | --- |
| close | - | 关闭警告时触发 |
| update:visible | `(value: boolean)` | 更新可见状态时触发 |

### Slots

| 插槽名 | 说明 |
| ----- | --- |
| default | 警告的内容 |
| title | 自定义标题 |
| icon | 自定义图标 |
| action | 自定义操作区域 |

## 使用示例

### 基本使用

```vue
<template>
  <JvAlert type="info">这是一条消息提示</JvAlert>
</template>
```

### 不同类型的警告

```vue
<template>
  <JvAlert type="success">操作成功</JvAlert>
  <JvAlert type="warning">警告信息</JvAlert>
  <JvAlert type="info">提示信息</JvAlert>
  <JvAlert type="error">错误信息</JvAlert>
</template>
```

### 带有标题

```vue
<template>
  <JvAlert type="success" title="成功">操作已完成</JvAlert>
</template>
```

### 可关闭的警告

```vue
<template>
  <JvAlert type="info" closable>点击右上角可关闭</JvAlert>
</template>
```

### 自定义样式

```vue
<template>
  <JvAlert 
    type="info" 
    color="#6200ea" 
    background="#ede7f6" 
    rounded="lg"
  >
    自定义样式的警告
  </JvAlert>
</template>
```

### 轮廓样式

```vue
<template>
  <JvAlert type="success" outlined>轮廓样式的成功提示</JvAlert>
</template>
```
