# JvInput 输入框组件

## 1. 介绍组件

JvInput 是一个功能完善的输入框组件，提供了多种输入类型、尺寸和变体。它支持前缀/后缀图标、清除按钮、密码可见性切换、字符计数等特性，适用于各种表单输入场景。

## 2. 布局结构使用方式

JvInput 组件的布局结构包含以下主要部分：

- 前置区域 (prepend)：位于输入框之前的内容
- 输入框包装器 (wrapper)：包含输入框和其相关元素
  - 前缀区域 (prefix)：位于输入框内部左侧
  - 输入元素 (inner)：实际的输入框
  - 后缀区域 (suffix)：位于输入框内部右侧，包含清除按钮、密码切换按钮、字符计数等
- 后置区域 (append)：位于输入框之后的内容

基本使用示例：

```vue
<template>
  <!-- 基础输入框 -->
  <JvInput v-model="input" placeholder="请输入内容" />

  <!-- 带图标的输入框 -->
  <JvInput v-model="input" prefix-icon="mdi:account" />

  <!-- 可清除的输入框 -->
  <JvInput v-model="input" clearable />

  <!-- 密码输入框 -->
  <JvInput v-model="password" type="password" show-password />

  <!-- 带字符计数的输入框 -->
  <JvInput v-model="message" show-count max-length="50" />
</template>
```

## 3. 样式

JvInput 组件提供多种样式定制选项：

- **变体 (variant)**：

  - outlined (默认)：带边框的输入框
  - default：标准输入框

- **尺寸 (size)**：

  - small：小尺寸
  - medium (默认)：中等尺寸
  - large：大尺寸
  - xlarge：超大尺寸

- **状态样式**：
  - 默认状态：常规外观
  - 聚焦状态：边框高亮，有轻微阴影
  - 禁用状态：灰色背景，不可交互
  - 只读状态：灰色背景，可聚焦但不可编辑

使用样式示例：

```vue
<template>
  <!-- 不同变体 -->
  <JvInput v-model="input1" variant="outlined" placeholder="描边输入框" />
  <JvInput v-model="input2" variant="default" placeholder="默认输入框" />

  <!-- 不同尺寸 -->
  <JvInput v-model="input3" size="small" placeholder="小型输入框" />
  <JvInput v-model="input4" placeholder="默认尺寸" />
  <JvInput v-model="input5" size="large" placeholder="大型输入框" />

  <!-- 不同状态 -->
  <JvInput v-model="input6" disabled placeholder="禁用状态" />
  <JvInput v-model="input7" readonly placeholder="只读状态" />
</template>
```

## 4. 交互

JvInput 组件提供丰富的交互功能：

- **聚焦/失焦**：输入框聚焦时边框变色并有轻微阴影效果
- **输入事件**：实时响应用户输入并更新绑定值
- **清除功能**：启用 clearable 后鼠标悬停在输入框上会显示清除按钮
- **密码可见性**：启用 showPassword 后可切换密码的明文/密文显示
- **字符计数**：启用 showCount 后在输入框右侧显示当前字符数量
- **最大长度限制**：设置 maxLength 可限制输入的最大字符数

特殊交互：

- 清除按钮点击后会自动聚焦输入框
- 禁用状态下不响应任何交互
- 只读状态下可以选择和复制文本，但不能编辑

## 5. 可访问性

JvInput 组件的可访问性设计包括：

- 使用语义化的 `<input>` 元素作为输入控件
- 支持键盘导航和操作
- 提供 placeholder 属性增强提示信息
- 禁用状态下视觉和功能上都明确表示
- 输入框聚焦状态有明显的视觉提示
- 可通过编程方式聚焦和操作 (focus/blur API)
- 足够的颜色对比度确保可读性

## 6. Vue API

### Props

| 属性名       | 类型                                       | 默认值     | 说明                 |
| ------------ | ------------------------------------------ | ---------- | -------------------- |
| modelValue   | string                                     | ''         | 绑定值               |
| placeholder  | string                                     | ''         | 输入框占位文本       |
| disabled     | boolean                                    | false      | 是否禁用输入框       |
| readonly     | boolean                                    | false      | 是否只读             |
| clearable    | boolean                                    | false      | 是否可清空           |
| showPassword | boolean                                    | false      | 是否显示切换密码图标 |
| type         | 'text' \| 'password' \| 'email'            | 'text'     | 输入框类型           |
| variant      | 'outlined' \| 'default'                    | 'outlined' | 输入框变体样式       |
| size         | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium'   | 输入框尺寸           |
| prefixIcon   | string                                     | ''         | 输入框头部图标       |
| suffixIcon   | string                                     | ''         | 输入框尾部图标       |
| maxLength    | number                                     | undefined  | 最大输入长度         |
| showCount    | boolean                                    | false      | 是否显示字符计数     |

### 事件 (Emits)

| 事件名            | 参数                | 说明                 |
| ----------------- | ------------------- | -------------------- |
| update:modelValue | (value: string)     | 输入值变化时触发     |
| clear             | -                   | 点击清除按钮时触发   |
| focus             | (event: FocusEvent) | 输入框获取焦点时触发 |
| blur              | (event: FocusEvent) | 输入框失去焦点时触发 |

### 插槽 (Slots)

| 插槽名  | 说明           |
| ------- | -------------- |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |

### 暴露方法 (Expose)

| 方法名 | 参数 | 说明             |
| ------ | ---- | ---------------- |
| focus  | -    | 使输入框获取焦点 |
| blur   | -    | 使输入框失去焦点 |
| clear  | -    | 清空输入框       |
