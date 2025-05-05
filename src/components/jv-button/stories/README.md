JvButton 按钮组件

1. 介绍组件
   JvButton 是一个功能丰富的按钮组件，遵循 Material Design 设计规范，提供多种样式变体、尺寸和颜色选项。它支持图标、加载状态等功能，并可用于表单提交、普通按钮点击等场景。
2. 布局结构使用方式
   JvButton 组件采用栅格布局结构，包含以下主要布局区域：
   前置图标区域 (prepend)
   内容区域 (content)
   后置图标区域 (append)
   图标专用区域 (icon)
   加载状态区域 (loading)
   基本使用示例：

```javascript
<template>
  <!-- 不同变体 -->
  <JvButton variant="elevated">凸起按钮</JvButton>
  <JvButton variant="outlined">描边按钮</JvButton>
  <JvButton variant="text">文本按钮</JvButton>

  <!-- 不同尺寸 -->
  <JvButton size="small">小按钮</JvButton>
  <JvButton>默认按钮</JvButton>
  <JvButton size="large">大按钮</JvButton>

  <!-- 不同颜色 -->
  <JvButton color-type="primary">主要按钮</JvButton>
  <JvButton color-type="success">成功按钮</JvButton>
  <JvButton color-type="warning">警告按钮</JvButton>
</template>
```

4. 交互
   JvButton 组件提供多种交互状态和行为：
   悬停效果：鼠标悬停时会有轻微的背景色变化
   点击反馈：点击时有视觉反馈效果
   加载状态：loading 属性可显示加载动画，替代按钮内容
   禁用状态：disabled 属性使按钮无法点击并改变外观
   交互行为也随不同的变体类型而变化：
   elevated 按钮在悬停和点击时会改变阴影深度
   outlined 和 dashed 按钮会有边框颜色变化
   text 和 tonal 按钮会有背景色透明度变化
5. 可访问性
   JvButton 组件遵循 WCAG 无障碍标准设计：
   使用语义化的 <button> 元素作为根元素
   提供 role="button" ARIA 角色
   在禁用状态下设置 aria-disabled="true"
   为纯图标按钮提供 aria-label 属性表明按钮用途
   支持键盘导航和聚焦（通过 tab 键）
   自动聚焦功能（通过 autofocus 属性）
   足够的色彩对比度确保可读性
6. Vue API
   Props
   | 属性名 | 类型 | 默认值 | 说明 |
   |-------|------|-------|------|
   | colorType | ColorType | 'default' | 按钮颜色类型 |
   | size | SizeType | 'medium' | 按钮尺寸 |
   | disabled | boolean | false | 是否禁用按钮 |
   | shape | Shape | 'square' | 按钮形状 |
   | variant | JvButtonVariant | 'elevated' | 按钮变体样式 |
   | icon | string | - | 按钮图标名称 |
   | block | boolean | false | 是否为块级按钮（占满容器宽度） |
   | prependIcon | string | - | 按钮内容前的图标 |
   | appendIcon | string | - | 按钮内容后的图标 |
   | stacked | boolean | false | 是否堆叠显示（垂直排列） |
   | autofocus | boolean | false | 是否自动获取焦点 |
   | loading | boolean | false | 是否显示加载状态 |
   | nativeType | 'button' \| 'submit' \| 'reset' | 'button' | 原生按钮类型 |
   | content | string | - | 按钮文本内容 |
   事件 (Emits)
   | 事件名 | 参数 | 说明 |
   |-------|------|------|
   | click | (event: MouseEvent) | 按钮点击事件 |
   | focus | (event: FocusEvent) | 按钮获取焦点事件 |
   | blur | (event: FocusEvent) | 按钮失去焦点事件 |
   插槽 (Slots)
   | 插槽名 | 说明 |
   |-------|------|
   | default | 按钮内容插槽 |
   | prepend | 按钮前置内容插槽 |
   | append | 按钮后置内容插槽 |
   | icon | 图标按钮内容插槽 |
   | loader | 加载状态自定义插槽 |
