# JvCard 卡片组件

## 1. 介绍组件

JvCard 是一个灵活的容器组件，用于展示相关内容的集合。它遵循 Material Design 设计规范，提供多种变体和布局选项。卡片可以包含标题、副标题、内容、媒体、操作按钮和底部信息等，适用于信息展示、产品卡片、个人资料卡等多种场景。

## 2. 布局结构使用方式

JvCard 组件采用模块化布局，包含多个子组件：

- JvCardHeader：卡片头部，包含标题和副标题
- JvCardContent：卡片内容区域
- JvCardActions：卡片操作区域，通常放置按钮
- JvCardFooter：卡片底部区域

JvCard 支持两种使用方式：

1. 通过属性和插槽直接在 JvCard 上配置内容
2. 使用子组件进行更精细的布局控制

基本使用示例：

```vue
<template>
  <!-- 简单卡片 - 使用属性 -->
  <JvCard title="卡片标题" subtitle="卡片副标题" content="这是卡片的内容区域" />

  <!-- 高级卡片 - 使用子组件 -->
  <JvCard>
    <JvCardHeader title="卡片标题" subtitle="卡片副标题" />
    <div class="jv-card__media">
      <img src="image.jpg" alt="卡片图片" />
    </div>
    <JvCardContent>
      <p>这是卡片的详细内容</p>
    </JvCardContent>
    <JvCardActions align="end">
      <JvButton variant="text">取消</JvButton>
      <JvButton variant="tonal">确认</JvButton>
    </JvCardActions>
    <JvCardFooter> 更新于: 2023-10-15 </JvCardFooter>
  </JvCard>
</template>
```

## 3. 样式

JvCard 组件提供丰富的样式定制选项：

- **变体 (variant)**：

  - elevated (默认)：带阴影的凸起卡片
  - outlined：带边框的卡片
  - tonal：带背景色的卡片

- **颜色类型 (colorType)**：

  - default (默认)：使用默认主题色
  - primary：使用主要主题色
  - secondary：使用次要主题色
  - success：使用成功色
  - warning：使用警告色
  - error：使用错误色
  - info：使用信息色

- **圆角 (rounded)**：

  - rounded (默认)：标准圆角
  - rounded-sm：小圆角
  - rounded-lg：大圆角
  - rounded-xl：超大圆角
  - rounded-full：完全圆角
  - rounded-none：无圆角

- **内边距 (padding)**：

  - none：无内边距
  - xs：超小内边距 (4px)
  - sm：小内边距 (8px)
  - md (默认)：中等内边距 (16px)
  - lg：大内边距 (24px)
  - xl：超大内边距 (32px)

- **其他样式选项**：
  - bordered：是否显示边框
  - clickable：是否有点击效果
  - disabled：禁用状态
  - maxWidth：最大宽度限制

## 4. 交互

JvCard 组件提供了以下交互特性：

- **点击交互**：设置 `clickable` 属性后，卡片可以响应点击事件并发出 `click` 事件
- **悬停效果**：可点击卡片在悬停时会有轻微的视觉反馈
- **禁用状态**：设置 `disabled` 属性后，卡片将不再响应交互
- **内容组织**：卡片会自动检测子组件，避免重复渲染，确保内容布局合理
- **布局适配**：卡片会根据内容自动调整高度，并限制最大宽度

交互行为也随不同的变体类型而变化：

- elevated 卡片在悬停和点击时会改变阴影深度
- outlined 卡片会有边框颜色变化
- tonal 卡片会有背景色透明度变化

## 5. 可访问性

JvCard 组件的可访问性设计包括：

- 语义化的 HTML 结构，便于屏幕阅读器理解内容
- 可点击卡片设置适当的键盘焦点样式
- 禁用状态下明确传达交互限制
- 足够的颜色对比度确保内容可读性
- 使用合适的 HTML 元素表示不同部分（如标题）
- 若卡片可点击，可考虑设置适当的 ARIA 角色和属性

## 6. Vue API

### Props

| 属性名       | 类型                                | 默认值     | 说明             |
| ------------ | ----------------------------------- | ---------- | ---------------- |
| title        | string                              | undefined  | 卡片标题         |
| subtitle     | string                              | undefined  | 卡片副标题       |
| content      | string                              | undefined  | 卡片内容         |
| maxWidth     | string \| number                    | undefined  | 卡片最大宽度     |
| colorType    | ColorType                           | 'default'  | 卡片颜色类型     |
| variant      | 'elevated' \| 'outlined' \| 'tonal' | 'elevated' | 卡片变体         |
| rounded      | string                              | 'rounded'  | 卡片圆角样式     |
| bordered     | boolean                             | false      | 是否显示边框     |
| clickable    | boolean                             | false      | 是否可点击       |
| disabled     | boolean                             | false      | 是否禁用         |
| padding      | string                              | 'md'       | 卡片内边距大小   |
| actionsAlign | 'start' \| 'end' \| 'center'        | 'end'      | 操作按钮对齐方式 |

### 事件 (Emits)

| 事件名 | 参数                | 说明                                        |
| ------ | ------------------- | ------------------------------------------- |
| click  | (event: MouseEvent) | 点击卡片时触发（仅当 clickable 为 true 时） |

### 插槽 (Slots)

| 插槽名   | 说明                         |
| -------- | ---------------------------- |
| default  | 默认插槽，推荐放置卡片子组件 |
| header   | 卡片头部内容                 |
| title    | 卡片标题内容                 |
| subtitle | 卡片副标题内容               |
| media    | 卡片媒体内容                 |
| content  | 卡片主要内容                 |
| actions  | 卡片操作按钮区域             |
| footer   | 卡片底部内容                 |

### 子组件

#### JvCardHeader

| 属性名   | 类型   | 默认值    | 说明       |
| -------- | ------ | --------- | ---------- |
| title    | string | undefined | 卡片标题   |
| subtitle | string | undefined | 卡片副标题 |

#### JvCardContent

| 属性名  | 类型   | 默认值    | 说明     |
| ------- | ------ | --------- | -------- |
| content | string | undefined | 卡片内容 |

#### JvCardActions

| 属性名 | 类型                         | 默认值 | 说明             |
| ------ | ---------------------------- | ------ | ---------------- |
| align  | 'start' \| 'end' \| 'center' | 'end'  | 操作按钮对齐方式 |

#### JvCardFooter

| 属性名 | 类型   | 默认值    | 说明       |
| ------ | ------ | --------- | ---------- |
| class  | string | undefined | 自定义类名 |
