# JvDropdown 下拉菜单组件

## 1. 介绍组件

JvDropdown 是一个灵活的下拉菜单组件，用于在用户与元素交互时显示下拉内容。它基于 @popperjs/core 构建，提供精确的定位和多种交互方式。下拉菜单通常用于导航、选择操作、过滤或显示附加信息。

## 2. 布局结构使用方式

下拉菜单组件有两个主要部分：触发器和下拉内容。触发器是用户交互的元素，可以是按钮、链接或任何其他元素。下拉内容是在用户与触发器交互时显示的。

基本使用示例：

```vue
<template>
  <JvDropdown>
    <template #trigger>
      <button>点击此处 ▼</button>
    </template>
    <div>
      <div>选项 1</div>
      <div>选项 2</div>
      <div>选项 3</div>
    </div>
  </JvDropdown>
</template>
```

## 3. 样式

JvDropdown 组件提供了多种自定义样式选项：

- **位置控制**：通过 `placement` 属性可以设置下拉菜单的显示位置
- **宽度控制**：通过 `width` 属性可以设置下拉菜单的宽度
- **箭头显示**：通过 `arrow` 属性可以控制是否显示指示箭头

使用样式示例：

```vue
<JvDropdown placement="bottom-start" :width="200" :arrow="true">
  <!-- 内容 -->
</JvDropdown>
```

## 4. 交互

JvDropdown 支持多种交互方式：

- **点击触发**：通过点击触发器打开下拉菜单
- **悬停触发**：通过鼠标悬停在触发器上打开下拉菜单
- **手动控制**：通过代码控制下拉菜单的显示状态

交互使用示例：

```vue
<!-- 点击触发 -->
<JvDropdown trigger="click">
  <!-- 内容 -->
</JvDropdown>

<!-- 悬停触发 -->
<JvDropdown trigger="hover">
  <!-- 内容 -->
</JvDropdown>

<!-- 手动控制 -->
<JvDropdown trigger="manual" v-model:show="isVisible">
  <!-- 内容 -->
</JvDropdown>
```

## 5. 可访问性

下拉菜单组件遵循 WAI-ARIA 实践，确保可访问性：
- 支持键盘导航
- 适当的 ARIA 角色和属性
- 屏幕阅读器友好的结构

## 6. Vue API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| placement | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' | 'bottom-start' | 下拉菜单的显示位置 |
| arrow | boolean | true | 是否显示箭头 |
| offset | number \| [number, number] | 4 | 偏移量，可以是单值或[x, y]数组 |
| show | boolean | false | 是否显示下拉菜单 |
| placementStrategy | 'flip' \| 'prevent-overflow' \| 'auto' \| 'fixed' | 'auto' | 放置策略 |
| arrowSize | number | 8 | 箭头大小 |
| trigger | 'click' \| 'hover' \| 'manual' | 'click' | 触发方式 |
| hideDelay | number | 150 | 延迟关闭时间(毫秒) |
| width | number \| 'auto' \| 'trigger' | 'auto' | 下拉菜单宽度，'auto'表示自动适应内容宽度，'trigger'表示与触发元素同宽 |
| disabled | boolean | false | 是否禁用 |
| manual | boolean | false | 是否手动控制(与trigger="manual"效果相同) |

### 事件 (Emits)

| 事件名 | 参数 | 说明 |
| ------ | ---- | ---- |
| update:show | boolean | 更新显示状态 |
| select | any | 选项被点击时触发 |
| shown | - | 下拉菜单显示后触发 |
| hidden | - | 下拉菜单隐藏后触发 |

### 插槽 (Slots)

| 插槽名 | 说明 |
| ------ | ---- |
| default | 默认插槽，下拉菜单内容 |
| trigger | 触发器插槽 |
| empty | 空状态插槽，当没有选项时显示 |

### 暴露方法 (Expose)

| 方法名 | 参数 | 说明 |
| ------ | ---- | ---- |
| toggle | force?: boolean | 切换下拉菜单显示状态，可选参数force用于强制指定状态 |
| show | - | 显示下拉菜单 |
| hide | - | 隐藏下拉菜单 |
