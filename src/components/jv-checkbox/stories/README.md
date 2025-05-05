# JvCheckbox 复选框组件

## 1. 介绍组件

JvCheckbox 是一个复选框组件，用于在表单中让用户从一组选项中进行多选或单选操作。它支持单独使用或组合使用，可以通过 v-model 轻松实现数据绑定，并提供了丰富的样式和状态变化。

## 2. 布局结构使用方式

JvCheckbox 组件的布局结构主要包含两部分：

- 复选框输入区域 (input)：包含实际的复选框元素和视觉指示器
- 标签区域 (label)：显示复选框的说明文本

基本使用示例：

```vue
<template>
  <!-- 基础复选框 -->
  <JvCheckbox v-model="checked" label="同意协议" />

  <!-- 禁用状态 -->
  <JvCheckbox v-model="checked" label="禁用选项" disabled />

  <!-- 不确定状态 -->
  <JvCheckbox v-model="checked" label="部分选中" indeterminate />

  <!-- 多选绑定 -->
  <JvCheckbox v-model="checkedFruits" label="苹果" />
  <JvCheckbox v-model="checkedFruits" label="香蕉" />
  <JvCheckbox v-model="checkedFruits" label="橙子" />

  <!-- 自定义内容 -->
  <JvCheckbox v-model="checked">
    我已阅读并同意<a href="#">《服务条款》</a>
  </JvCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checkedFruits = ref(['苹果'])
</script>
```

## 3. 样式

JvCheckbox 组件提供以下样式定制选项：

- **尺寸 (size)**：

  - small：小尺寸
  - medium (默认)：中等尺寸
  - large：大尺寸

- **状态样式**：
  - 未选中状态：显示空白框
  - 选中状态：显示带对勾的填充框
  - 不确定状态：显示带横线的填充框
  - 禁用状态：降低透明度，不可交互

复选框使用主题色作为选中状态的背景色，确保与整体设计系统保持一致。

使用样式示例：

```vue
<template>
  <!-- 不同尺寸 -->
  <JvCheckbox v-model="checked" label="小尺寸" size="small" />
  <JvCheckbox v-model="checked" label="中等尺寸" />
  <!-- 默认 medium -->
  <JvCheckbox v-model="checked" label="大尺寸" size="large" />

  <!-- 不同状态 -->
  <JvCheckbox v-model="checked1" label="未选中" />
  <JvCheckbox v-model="checked2" label="已选中" />
  <JvCheckbox v-model="checked3" label="不确定状态" indeterminate />
  <JvCheckbox v-model="checked4" label="禁用未选中" disabled />
  <JvCheckbox v-model="checked5" label="禁用已选中" disabled />
</template>
```

## 4. 交互

JvCheckbox 组件提供以下交互特性：

- **点击交互**：点击复选框或标签可切换选中状态
- **数据绑定**：支持通过 v-model 双向绑定数据
  - 绑定布尔值：单个复选框的选中状态
  - 绑定数组：多个复选框的选中值集合
- **键盘交互**：支持键盘空格键切换选中状态
- **不确定状态**：indeterminate 属性设置介于选中和未选中之间的状态
- **禁用状态**：disabled 属性禁止用户交互

特殊交互：

- 当绑定数组时，选中的复选框的 label 值会被添加到数组中
- 点击选中的复选框会从绑定数组中移除对应的 label 值
- 不确定状态是一种视觉状态，不影响实际的选中值

## 5. 可访问性

JvCheckbox 组件的可访问性设计包括：

- 使用语义化的 `<label>` 和 `<input type="checkbox">` 元素
- 支持键盘导航和操作（可通过 Tab 键聚焦，空格键切换）
- 禁用状态下明确传达交互限制
- 标签文本与复选框关联，增大可点击区域
- 可通过 ARIA 属性增强屏幕阅读器的使用体验
- 足够的颜色对比度确保状态可识别性

## 6. Vue API

### Props

| 属性名        | 类型                               | 默认值    | 说明                                 |
| ------------- | ---------------------------------- | --------- | ------------------------------------ |
| modelValue    | boolean \| Array<string \| number> | undefined | 绑定值                               |
| label         | string \| number                   | undefined | 选项标签，当绑定值为数组时作为选中值 |
| disabled      | boolean                            | false     | 是否禁用                             |
| required      | boolean                            | false     | 是否必填                             |
| indeterminate | boolean                            | false     | 是否为不确定状态                     |
| name          | string                             | undefined | 原生 name 属性                       |
| trueValue     | any                                | undefined | 选中时的值                           |
| falseValue    | any                                | undefined | 未选中时的值                         |
| size          | 'small' \| 'medium' \| 'large'     | 'medium'  | 复选框尺寸                           |

### 事件 (Emits)

| 事件名            | 参数                | 说明                 |
| ----------------- | ------------------- | -------------------- |
| click             | (event: MouseEvent) | 点击复选框时触发     |
| update:modelValue | (value: any)        | 复选框状态变化时触发 |

### 插槽 (Slots)

| 插槽名  | 说明                         |
| ------- | ---------------------------- |
| default | 默认插槽，用于自定义标签内容 |

### 暴露方法 (Expose)

| 方法名 | 参数 | 说明             |
| ------ | ---- | ---------------- |
| focus  | -    | 使复选框获取焦点 |
| blur   | -    | 使复选框失去焦点 |
