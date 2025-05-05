# JvRadio 单选框组件

## 1. 介绍组件

JvRadio 单选框组件用于在一组选项中进行单一选择，包含单选框 (JvRadio) 和单选框组 (JvRadioGroup) 两个组件。它符合 Material Design 设计规范，提供了丰富的自定义选项和交互效果，适用于表单、设置页面等需要单选功能的场景。

## 2. 布局结构使用方式

### JvRadio 组件

JvRadio 组件的布局结构包含两个主要部分：

- 单选框输入区域 (input)：包含实际的单选框元素和视觉指示器
- 标签区域 (label)：显示选项的文本说明

### JvRadioGroup 组件

JvRadioGroup 用于管理一组相关的单选框，提供统一的布局和数据管理：

- 标题区域 (legend)：可选的组标题
- 选项包装器 (wrapper)：包含所有单选框选项

基本使用示例：

```vue
<template>
  <!-- 单独使用单选框 -->
  <JvRadio v-model="singleValue" label="选项1">选项1</JvRadio>

  <!-- 使用单选框组 -->
  <JvRadioGroup v-model="groupValue" label="选择一个选项">
    <JvRadio label="选项1">选项1</JvRadio>
    <JvRadio label="选项2">选项2</JvRadio>
    <JvRadio label="选项3" disabled>选项3</JvRadio>
  </JvRadioGroup>

  <!-- 垂直布局 -->
  <JvRadioGroup v-model="columnValue" column>
    <JvRadio label="选项A">选项A</JvRadio>
    <JvRadio label="选项B">选项B</JvRadio>
  </JvRadioGroup>

  <!-- 带边框样式 -->
  <JvRadioGroup v-model="borderedValue" bordered label="边框样式">
    <JvRadio label="选项X" bordered>选项X</JvRadio>
    <JvRadio label="选项Y" bordered>选项Y</JvRadio>
  </JvRadioGroup>

  <!-- 紧凑模式 -->
  <JvRadioGroup v-model="compactValue" compact>
    <JvRadio label="左边" bordered>左边</JvRadio>
    <JvRadio label="中间" bordered>中间</JvRadio>
    <JvRadio label="右边" bordered>右边</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const singleValue = ref('选项1')
const groupValue = ref('选项1')
const columnValue = ref('选项A')
const borderedValue = ref('选项X')
const compactValue = ref('中间')
</script>
```

## 3. 样式

### JvRadio 组件样式

JvRadio 组件提供以下样式定制选项：

- **尺寸 (size)**：

  - small：小尺寸
  - medium (默认)：中等尺寸
  - large：大尺寸

- **颜色 (color)**：

  - 默认使用主题色
  - 可通过 color 属性自定义颜色

- **状态样式**：

  - 默认状态：白色背景带边框的圆形
  - 选中状态：中间带有填充圆点
  - 禁用状态：降低透明度，不可交互
  - 边框样式：带有边框的矩形外观

- **特殊效果**：
  - 波纹效果：点击时产生波纹动画
  - 切换动画：选中状态变化时的过渡动画

### JvRadioGroup 组件样式

JvRadioGroup 组件样式主要控制整体布局和外观：

- **布局模式**：

  - 默认模式：水平排列带间距
  - 列模式 (column)：垂直排列
  - 内联模式 (inline)：内联显示，适合与其他元素排列

- **边框样式**：

  - 普通模式：无边框
  - 边框模式 (bordered)：带有边框和圆角

- **紧凑模式**：
  - 普通模式：各选项间有间距
  - 紧凑模式 (compact)：选项之间无间距，适合按钮组样式

使用样式示例：

```vue
<template>
  <!-- 不同尺寸 -->
  <JvRadio v-model="size" label="small" size="small">小尺寸</JvRadio>
  <JvRadio v-model="size" label="medium">默认尺寸</JvRadio>
  <JvRadio v-model="size" label="large" size="large">大尺寸</JvRadio>

  <!-- 自定义颜色 -->
  <JvRadio v-model="color" label="red" color="red">红色</JvRadio>
  <JvRadio v-model="color" label="green" color="#00c853">绿色</JvRadio>
  <JvRadio v-model="color" label="blue" color="blue">蓝色</JvRadio>

  <!-- 不同布局 -->
  <JvRadioGroup v-model="layout" label="布局模式">
    <JvRadio label="default">默认布局</JvRadio>
    <JvRadio label="column">列布局</JvRadio>
    <JvRadio label="inline">内联布局</JvRadio>
  </JvRadioGroup>
</template>
```

## 4. 交互

### JvRadio 交互

JvRadio 组件提供以下交互特性：

- **点击选择**：点击单选框或标签可选中该选项
- **数据绑定**：支持通过 v-model 双向绑定数据
- **波纹效果**：点击时显示波纹动画，提供视觉反馈
- **过渡动画**：选中状态变化时的平滑过渡
- **键盘导航**：支持通过键盘选择和操作
- **禁用状态**：禁用时不响应任何交互

### JvRadioGroup 交互

JvRadioGroup 组件提供以下交互功能：

- **统一管理**：维护一组单选框的选中状态，确保只有一个被选中
- **数据共享**：所有子单选框共享同一个数据模型
- **统一禁用**：可一次性禁用组内所有单选框
- **重置功能**：提供 reset 方法，可将选择重置为初始状态
- **值变化事件**：选中值改变时触发 change 事件

## 5. 可访问性

JvRadio 组件的可访问性设计包括：

- 使用语义化的 `<input type="radio">` 元素，确保屏幕阅读器识别
- 使用 `<label>` 元素关联标签内容，增大可点击区域
- 使用 `<fieldset>` 和 `<legend>` 为单选框组提供语义化结构
- 通过 aria-disabled 属性标识禁用状态
- 支持键盘导航，可以使用 Tab 键聚焦，空格键选择
- 单选框组提供统一的标签，便于理解分组的含义
- 视觉状态（选中、禁用等）有足够的对比度，确保可辨识性

## 6. Vue API

### JvRadio 组件

#### Props

| 属性名     | 类型                           | 默认值   | 说明             |
| ---------- | ------------------------------ | -------- | ---------------- |
| modelValue | any                            | -        | 单选框绑定值     |
| label      | any                            | -        | 单选框对应的值   |
| disabled   | boolean                        | false    | 是否禁用         |
| name       | string                         | -        | 原生 name 属性   |
| color      | string                         | -        | 单选框颜色       |
| animated   | boolean                        | true     | 是否有动画效果   |
| size       | 'small' \| 'medium' \| 'large' | 'medium' | 单选框尺寸       |
| bordered   | boolean                        | false    | 是否带边框样式   |
| ripple     | boolean                        | true     | 是否显示波纹效果 |

#### 事件 (Emits)

| 事件名            | 参数                | 说明               |
| ----------------- | ------------------- | ------------------ |
| update:modelValue | (value: any)        | 更新值时触发       |
| click             | (event: MouseEvent) | 点击单选框时触发   |
| change            | (value: any)        | 选中状态变化时触发 |

#### 插槽 (Slots)

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义标签内容 |

#### 暴露方法 (Expose)

| 方法名    | 参数 | 说明                     |
| --------- | ---- | ------------------------ |
| check     | -    | 手动触发选中该单选框     |
| isChecked | -    | 获取当前单选框是否被选中 |

### JvRadioGroup 组件

#### Props

| 属性名     | 类型                        | 默认值    | 说明                     |
| ---------- | --------------------------- | --------- | ------------------------ |
| modelValue | string \| number \| boolean | undefined | 单选框组绑定值           |
| disabled   | boolean                     | false     | 是否禁用整个单选框组     |
| name       | string                      | -         | 原生 name 属性           |
| column     | boolean                     | false     | 是否为垂直布局           |
| inline     | boolean                     | false     | 是否为内联布局           |
| label      | string                      | -         | 单选框组标题             |
| bordered   | boolean                     | false     | 是否显示边框             |
| compact    | boolean                     | false     | 是否使用紧凑模式         |
| color      | string                      | -         | 统一设置所有单选框的颜色 |
| animated   | boolean                     | true      | 是否开启动画效果         |

#### 事件 (Emits)

| 事件名            | 参数                                  | 说明             |
| ----------------- | ------------------------------------- | ---------------- |
| update:modelValue | (value?: string \| number \| boolean) | 更新值时触发     |
| change            | (value?: string \| number \| boolean) | 选中值变化时触发 |

#### 插槽 (Slots)

| 插槽名  | 说明                          |
| ------- | ----------------------------- |
| default | 默认插槽，用于放置 Radio 组件 |
| label   | 标签插槽，用于自定义标签内容  |
| legend  | 标题插槽，用于自定义标题内容  |

#### 暴露方法 (Expose)

| 方法名   | 参数 | 说明                       |
| -------- | ---- | -------------------------- |
| reset    | -    | 重置单选框组，清除选中状态 |
| getValue | -    | 获取当前选中的值           |
