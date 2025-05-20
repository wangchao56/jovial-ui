# JvCheckbox 复选框组件

## 组件介绍

JvCheckbox 是一个功能强大的复选框组件，提供了灵活的选择功能，可单独使用或配合 JvCheckboxGroup 使用。它支持丰富的尺寸变体、禁用状态、半选状态和自定义数据。

## 布局结构使用方式

JvCheckbox 组件的布局结构包括以下几个部分：

- 复选框标记：显示选中/未选中状态
- 标签内容：可通过插槽或属性设置
- 容器布局：提供合理的间距和对齐方式

基本使用示例：

```vue
<template>
  <JvCheckbox v-model="checked" label="同意条款">同意条款</JvCheckbox>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const checked = ref(false)
</script>
```

## 交互设计

JvCheckbox 具有以下交互特性：

- 点击切换：点击复选框可切换选中状态
- 键盘支持：支持空格键切换选中状态，提高可访问性
- 焦点状态：具有明显的焦点指示，方便键盘操作
- 禁用效果：禁用状态下不响应交互，且有明显的视觉区分
- 半选状态：支持三态显示（选中、未选中、半选）

## 可访问性

JvCheckbox 组件依照 WAI-ARIA 规范设计，提供了良好的可访问性支持：

- 正确的 ARIA 角色（role="checkbox"）
- 状态提示（aria-checked）
- 禁用提示（aria-disabled）
- 键盘可访问性（tabindex 和键盘事件处理）
- 适当的焦点管理

## Vue 组件 API

### JvCheckbox Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string \| number \| boolean` | - | 复选框绑定值 |
| value | `string \| number` | - | 复选框绑定值（在 group 中才有效） |
| label | `string \| number` | - | 复选框标签，也作为在数组模式下的值 |
| checked | `boolean` | `false` | 是否选中 |
| trueValue | `any` | - | 选中时的值，用于自定义值模式 |
| falseValue | `any` | - | 未选中时的值，用于自定义值模式 |
| disabled | `boolean` | `false` | 是否禁用复选框 |
| indeterminate | `boolean` | `false` | 是否为不确定状态（半选状态） |
| name | `string` | - | 原生 name 属性 |
| size | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | 复选框尺寸 |

### JvCheckbox Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: string \| number)` | 复选框值变化时触发 |
| click | `(event: MouseEvent)` | 点击复选框时触发 |
| checked | `(checked: boolean)` | 复选框选中状态变化时触发 |

### JvCheckbox Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义标签内容 |

### JvCheckbox Expose

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| focus | - | `void` | 使复选框获取焦点 |
| blur | - | `void` | 使复选框失去焦点 |

## JvCheckboxGroup Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | `(string \| number)[]` | `[]` | 选中的值数组 |
| disabled | `boolean` | `false` | 是否禁用整个复选框组 |
| size | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | 尺寸，会被应用到所有子复选框 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 复选框组方向 |
| max | `number` | - | 最大可选数量 |
| gap | `number \| string` | `12` | 子选项之间的间距 |
| customStyle | `Record<string, string>` | - | 自定义样式 |
| customClass | `string \| string[] \| Record<string, boolean>` | - | 自定义类名 |

### JvCheckboxGroup Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: (string \| number)[])` | 复选框组值变化时触发 |
| change | `(value: (string \| number)[])` | 复选框组值变化时触发 |

### JvCheckboxGroup Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置复选框 |

## 测试用例

JvCheckbox 组件具有完善的测试覆盖，包括：

1. 基础功能测试：渲染和默认插槽
2. Props 功能测试：各种 Props 属性正确影响组件行为
3. Emits 事件测试：正确触发事件
4. Slots 插槽测试：插槽内容正确显示
5. Expose API 测试：暴露的方法能正常工作
6. 样式测试：样式类正确应用
7. 可访问性测试：符合 WAI-ARIA 规范

## 使用示例

### 基础使用

```vue
<template>
  <JvCheckbox v-model="checked">我同意条款</JvCheckbox>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const checked = ref(false)
</script>
```

### 禁用状态

```vue
<template>
  <JvCheckbox v-model="checked" disabled>禁用选项</JvCheckbox>
</template>
```

### 半选状态

```vue
<template>
  <JvCheckbox v-model="checked" :indeterminate="true">半选状态</JvCheckbox>
</template>
```

### 自定义值

```vue
<template>
  <JvCheckbox 
    v-model="status" 
    :true-value="'active'" 
    :false-value="'inactive'"
  >
    用户状态
  </JvCheckbox>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const status = ref('inactive')
</script>
```

### 使用复选框组

```vue
<template>
  <JvCheckboxGroup v-model="fruits">
    <JvCheckbox label="apple">苹果</JvCheckbox>
    <JvCheckbox label="banana">香蕉</JvCheckbox>
    <JvCheckbox label="orange">橙子</JvCheckbox>
  </JvCheckboxGroup>
  <div>已选择: {{ fruits }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox, JvCheckboxGroup } from '@/components/jv-checkbox'

const fruits = ref(['apple'])
</script>
```

### 垂直布局

```vue
<template>
  <JvCheckboxGroup v-model="options" direction="vertical">
    <JvCheckbox label="option1">选项1</JvCheckbox>
    <JvCheckbox label="option2">选项2</JvCheckbox>
    <JvCheckbox label="option3">选项3</JvCheckbox>
  </JvCheckboxGroup>
</template>
```

### 限制最大选择数量

```vue
<template>
  <JvCheckboxGroup v-model="hobbies" :max="2">
    <JvCheckbox label="reading">阅读</JvCheckbox>
    <JvCheckbox label="sports">运动</JvCheckbox>
    <JvCheckbox label="music">音乐</JvCheckbox>
    <JvCheckbox label="travel">旅行</JvCheckbox>
  </JvCheckboxGroup>
  <div v-if="hobbies.length >= 2">最多只能选择2项爱好</div>
</template>
``` 