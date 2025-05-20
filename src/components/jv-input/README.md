# JvInput 输入框组件

## 组件介绍

JvInput是一个支持多种样式变体和功能的输入框组件，符合现代UI设计标准，支持明暗两种主题模式。组件提供了清除、密码显示/隐藏等实用功能，以及丰富的样式定制选项。

## 布局结构使用方式

JvInput组件由输入框主体、前缀/后缀图标、前置/后置内容等部分组成。基本使用示例：

```vue
<template>
  <JvInput v-model="inputValue" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import JvInput from '@/components/jv-input'

const inputValue = ref('')
</script>
```

## 交互设计

- **聚焦效果**：输入框聚焦时会显示主题色边框和轻微阴影效果
- **清除按钮**：当设置`clearable`属性时，输入框有内容时会显示清除按钮
- **密码切换**：对于密码类型输入框，可通过`showPassword`属性启用密码显示/隐藏功能
- **禁用和只读**：支持禁用和只读状态，有相应的视觉样式反馈

## 可访问性

- 组件具有合理的标签结构，支持屏幕阅读器
- 提供键盘导航支持
- 聚焦状态有明确的视觉提示
- 颜色对比度符合WCAG 2.1标准

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | '' | 绑定值 |
| placeholder | string | '' | 占位文本 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | false | 是否可清除 |
| showPassword | boolean | false | 是否显示密码切换按钮 |
| type | string | 'text' | 输入框类型，可选值：'text'、'password'、'email' |
| variant | string | 'outlined' | 变体样式，可选值：'outlined'、'default' |
| size | string | 'medium' | 尺寸，可选值：'small'、'medium'、'large'、'xlarge' |
| prefixIcon | string | '' | 前缀图标名称 |
| suffixIcon | string | '' | 后缀图标名称 |
| maxLength | number | undefined | 最大输入长度 |
| showCount | boolean | false | 是否显示字数统计 |

### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | value: string | 输入值变化时触发 |
| clear | - | 点击清除按钮时触发 |
| focus | event: FocusEvent | 输入框获取焦点时触发 |
| blur | event: FocusEvent | 输入框失去焦点时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| prefix | 输入框头部内容，位于输入框内 |
| suffix | 输入框尾部内容，位于输入框内 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| focus | - | void | 使输入框获取焦点 |
| blur | - | void | 使输入框失去焦点 |
| clear | - | void | 清空输入框内容 |

## 测试用例

### 基础功能测试
- 验证组件能否正确渲染
- 测试输入框的基本功能和属性

### Props功能测试
- 测试各种props是否正确影响组件行为
- 验证尺寸、变体等样式属性

### Emits事件测试
- 测试输入、清除、聚焦、失焦等事件是否正确触发

### Slots插槽测试
- 验证各插槽是否正确渲染

### Expose API测试
- 测试暴露的focus、blur、clear方法

### 样式测试
- 测试主题适配是否正常工作
- 验证明暗主题下样式是否正确

### 可访问性测试
- 验证键盘操作
- 确保可被屏幕阅读器正确识别

## 使用示例

### 基础输入框

```vue
<JvInput v-model="value" placeholder="请输入" />
```

### 带图标的输入框

```vue
<JvInput v-model="value" prefix-icon="$user" suffix-icon="$search" />
```

### 可清除输入框

```vue
<JvInput v-model="value" clearable />
```

### 密码输入框

```vue
<JvInput v-model="password" type="password" show-password />
```

### 带字数显示

```vue
<JvInput v-model="value" :max-length="20" show-count />
```

### 不同尺寸

```vue
<JvInput v-model="value" size="small" />
<JvInput v-model="value" size="medium" />
<JvInput v-model="value" size="large" />
<JvInput v-model="value" size="xlarge" />
```

### 禁用状态

```vue
<JvInput v-model="value" disabled />
```

### 只读状态

```vue
<JvInput v-model="value" readonly />
```

### 使用插槽

```vue
<JvInput v-model="value">
  <template #prepend>https://</template>
  <template #append>.com</template>
  <template #prefix>
    <JvIcon name="$user" />
  </template>
  <template #suffix>
    <JvIcon name="$check" />
  </template>
</JvInput>
``` 