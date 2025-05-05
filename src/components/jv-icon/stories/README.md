# JvIcon 图标组件

## 1. 介绍组件

JvIcon 是一个灵活的图标组件，支持内部图标和外部图标库（如 Iconify）。它提供了丰富的自定义选项，包括颜色、尺寸、旋转、翻转和动画效果，可用于界面中各种需要图标显示的场景。

## 2. 布局结构使用方式

JvIcon 组件采用简洁的结构，根据不同的图标类型自动选择合适的渲染方式：

- 内部图标：以 `$` 前缀开头的图标名称，从内部图标库加载
- 外部图标：使用 Iconify 库加载的图标，支持各种图标集
- 自定义图标：通过默认插槽提供自定义内容

基本使用示例：

```vue
<template>
  <!-- 内部图标 -->
  <JvIcon name="$close" />

  <!-- Iconify 图标 -->
  <JvIcon name="mdi:home" />

  <!-- 自定义尺寸 -->
  <JvIcon name="mdi:account" size="large" />
  <JvIcon name="mdi:star" :size="32" />

  <!-- 自定义颜色 -->
  <JvIcon name="mdi:heart" color-type="error" />
  <JvIcon name="mdi:check" color="#00ff00" />

  <!-- 特殊效果 -->
  <JvIcon name="mdi:refresh" spin />
  <JvIcon name="mdi:arrow-left" :rotate="45" />
  <JvIcon name="mdi:arrow-right" flip />
</template>
```

## 3. 样式

JvIcon 组件提供多种样式定制选项：

- **尺寸 (size)**：

  - tiny：12px
  - small：16px
  - medium (默认)：24px
  - large：32px
  - xlarge：40px
  - 自定义数值：直接指定像素值

- **颜色类型 (colorType)**：

  - default (默认)：使用默认主题色
  - primary：使用主要主题色
  - secondary：使用次要主题色
  - success：使用成功色
  - warning：使用警告色
  - error：使用错误色
  - info：使用信息色

- **特殊效果**：
  - spin：旋转动画
  - flip：水平翻转
  - rotate：自定义旋转角度
  - disabled：禁用状态

使用样式示例：

```vue
<template>
  <!-- 不同尺寸 -->
  <JvIcon name="mdi:star" size="tiny" />
  <JvIcon name="mdi:star" size="small" />
  <JvIcon name="mdi:star" />
  <!-- 默认 medium -->
  <JvIcon name="mdi:star" size="large" />
  <JvIcon name="mdi:star" size="xlarge" />

  <!-- 不同颜色类型 -->
  <JvIcon name="mdi:heart" color-type="primary" />
  <JvIcon name="mdi:heart" color-type="secondary" />
  <JvIcon name="mdi:heart" color-type="success" />
  <JvIcon name="mdi:heart" color-type="warning" />
  <JvIcon name="mdi:heart" color-type="error" />
  <JvIcon name="mdi:heart" color-type="info" />

  <!-- 自定义颜色 -->
  <JvIcon name="mdi:circle" color="#ff5722" />
</template>
```

## 4. 交互

JvIcon 组件提供了以下交互特性：

- **鼠标交互**：图标可以接收点击事件
- **键盘交互**：图标可通过 tabindex 获取焦点，支持键盘操作
- **动画效果**：
  - spin 属性启用旋转动画
  - rotate 属性设置静态旋转角度
  - flip 属性启用水平翻转
- **禁用状态**：设置 disabled 属性后，图标将显示为禁用状态，不响应交互

特殊交互效果：

- 旋转动画持续时间为 2 秒，无限循环
- 禁用状态下图标透明度降低，显示为不可点击状态

## 5. 可访问性

JvIcon 组件的可访问性设计包括：

- 支持通过 tabindex 属性进行键盘导航
- 禁用状态下设置 aria-disabled 属性
- 可以通过 aria-label 或 aria-labelledby 属性提供图标的语义描述
- 纯装饰性图标应设置 aria-hidden="true"
- 交互式图标应提供适当的键盘焦点样式
- 图标大小和颜色设置足够的对比度，确保可见性

## 6. Vue API

### Props

| 属性名    | 类型                                      | 默认值    | 说明                                |
| --------- | ----------------------------------------- | --------- | ----------------------------------- |
| name      | InternalIconName \| string \| IconifyIcon | undefined | 图标名称，内部图标以 $ 开头         |
| size      | SizeType \| number \| string              | 'medium'  | 图标尺寸，支持预设尺寸或自定义值    |
| color     | string                                    | 'primary' | 图标颜色，支持任何有效的 CSS 颜色值 |
| colorType | ColorType                                 | 'default' | 图标颜色类型，使用主题中的颜色      |
| autofocus | boolean                                   | false     | 图标是否自动获取焦点                |
| flip      | boolean                                   | false     | 是否水平翻转图标                    |
| rotate    | number                                    | 0         | 图标旋转角度，单位为度              |
| spin      | boolean                                   | false     | 是否应用旋转动画                    |
| disabled  | boolean                                   | false     | 是否禁用图标                        |

### 事件 (Emits)

| 事件名 | 参数                | 说明           |
| ------ | ------------------- | -------------- |
| click  | (event: MouseEvent) | 点击图标时触发 |

### 插槽 (Slots)

| 插槽名  | 说明                                     |
| ------- | ---------------------------------------- |
| default | 图标内容的默认插槽，可用于完全自定义图标 |
