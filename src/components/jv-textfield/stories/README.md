# JvTextfield 文本输入框组件

## 1. 组件介绍

JvTextfield 是一个功能丰富的文本输入框组件，用于收集用户输入的文本信息。支持多种输入类型、尺寸和样式变体，并提供清除、密码显示切换等交互功能。

## 2. 布局结构使用方式

JvTextfield 组件由输入框主体、前缀/后缀图标、前置/后置内容等部分组成，支持灵活的布局配置。

基本使用示例：

```vue
<template>
  <JvTextfield v-model="inputValue" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
```

## 3. 样式

JvTextfield 提供多种尺寸和变体样式：

- 尺寸：small、medium、large、xlarge
- 变体：outlined（带边框）、default（默认样式）

使用样式示例：

```vue
<template>
  <div class="demo-container">
    <!-- 不同尺寸 -->
    <JvTextfield v-model="value" size="small" placeholder="小尺寸" />
    <JvTextfield v-model="value" size="medium" placeholder="中等尺寸" />
    <JvTextfield v-model="value" size="large" placeholder="大尺寸" />
    <JvTextfield v-model="value" size="xlarge" placeholder="超大尺寸" />
    
    <!-- 不同变体 -->
    <JvTextfield v-model="value" variant="outlined" placeholder="带边框样式" />
    <JvTextfield v-model="value" variant="default" placeholder="默认样式" />
  </div>
</template>
```
组件文档和示例方面，我们提供了完整的API文档和使用示例。通过Storybook建立可视化测试环境，展示各种状态下的输入框表现。典型用法示例覆盖表单验证、动态禁用、自动聚焦等常见场景。性能最佳实践指南帮助开发者避免常见的使用误区。交互设计规范文档详细说明在各种情境下的使用建议。
## 4. 交互设计

JvTextfield 组件支持多种交互功能：

- 清除按钮：设置 `clearable` 属性后，输入内容时显示清除按钮
- 密码显示切换：设置 `showPassword` 属性后，可切换密码显示/隐藏
- 字数统计：设置 `showCount` 属性后，显示输入字符数量
- 状态变化：聚焦、禁用、只读等状态有不同样式

交互使用示例：

```vue
<template>
  <div class="demo-container">
    <!-- 可清除输入 -->
    <JvTextfield v-model="password" clearable placeholder="可清除内容" />
    
    <!-- 密码输入框 -->
    <JvTextfield 
      v-model="password" 
      type="password" 
      showPassword 
      placeholder="请输入密码" 
    />
    
    <!-- 字数统计 -->
    <JvTextfield 
      v-model="message" 
      showCount 
      :maxLength="100" 
      placeholder="最多输入100个字符" 
    />
    
    <!-- 禁用状态 -->
    <JvTextfield v-model="value" disabled placeholder="禁用状态" />
    
    <!-- 只读状态 -->
    <JvTextfield v-model="value" readonly placeholder="只读状态" />
  </div>
</template>
```

## 5. 可访问性

JvTextfield 组件遵循 WAI-ARIA 可访问性最佳实践：

- 支持键盘导航和操作
- 适当的焦点状态指示
- 与屏幕阅读器兼容的状态提示
- 禁用状态有明确的视觉区分

## 6. Vue API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---------------- | --------- | --------------------------------- |
| modelValue | string | '' | 绑定值 |
| placeholder | string | '' | 输入框占位文本 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | false | 是否可清空 |
| showPassword | boolean | false | 是否显示切换密码图标 |
| type | string | 'text' | 输入框类型，可选值：'text'、'password'、'email' |
| variant | string | 'outlined' | 变体样式，可选值：'outlined'、'default' |
| size | string | 'medium' | 输入框尺寸，可选值：'small'、'medium'、'large'、'xlarge' |
| prefixIcon | string | '' | 前缀图标 |
| suffixIcon | string | '' | 后缀图标 |
| maxLength | number | undefined | 最大输入长度 |
| showCount | boolean | false | 是否显示输入字数统计 |

### 事件 (Emits)

| 事件名 | 参数 | 说明 |
| ------ | ------------------- | -------------- |
| update:modelValue | (value: string) | 在输入值变化时触发 |
| clear | - | 点击清除按钮时触发 |
| focus | (event: FocusEvent) | 输入框获得焦点时触发 |
| blur | (event: FocusEvent) | 输入框失去焦点时触发 |

### 插槽 (Slots)

| 插槽名 | 说明 |
| ------- | ------------------------------------ |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| prefix | 输入框头部内容，会显示在输入框内部 |
| suffix | 输入框尾部内容，会显示在输入框内部 |

### 暴露方法 (Expose)

| 方法名 | 说明 |
| ------ | ---- |
| focus | 使输入框获取焦点 |
| blur | 使输入框失去焦点 |
| clear | 清空输入框内容 |
