# JvSelect 选择器组件

## 1. 介绍组件

JvSelect 是一个下拉选择器组件，用于从预定义的选项列表中进行单选或多选。它继承了 JvInput 组件的外观和行为，但增加了下拉菜单和选项选择功能。适用于表单、筛选、设置等各种需要从有限选项中选择的场景。

## 2. 布局结构使用方式

JvSelect 组件的布局结构主要包含以下部分：

- 输入框区域：基于 JvInput 组件，显示当前选中的值
  - 前缀区域 (prefix)：可选的前置图标或内容
  - 内容区域：显示选中的选项标签
  - 后缀区域 (suffix)：默认显示下拉箭头图标
- 下拉菜单：点击输入框时显示的选项列表
  - 选项列表：可选择的所有选项
  - 选中标记：当前已选中的选项会显示对勾图标

基本使用示例：

```vue
<template>
  <!-- 基础单选 -->
  <JvSelect v-model="selectedValue" :options="options" placeholder="请选择" />

  <!-- 多选 -->
  <JvSelect
    v-model="multiSelectedValues"
    :options="options"
    multiple
    placeholder="请选择多个选项"
  />

  <!-- 禁用状态 -->
  <JvSelect v-model="selectedValue" :options="options" disabled />

  <!-- 可清除 -->
  <JvSelect v-model="selectedValue" :options="options" clearable />

  <!-- 不同尺寸 -->
  <JvSelect v-model="selectedValue" :options="options" size="small" />

  <!-- 自定义前缀图标 -->
  <JvSelect v-model="selectedValue" :options="options">
    <template #prefix>
      <JvIcon name="mdi:folder" />
    </template>
  </JvSelect>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('')
const multiSelectedValues = ref([])
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3', disabled: true },
  { label: '选项4', value: 'option4' }
]
</script>
```

## 3. 样式

JvSelect 组件的样式沿用了 JvInput 组件的大部分样式设计，并增加了下拉菜单相关的样式：

- **尺寸 (size)**：

  - small：小尺寸选择器
  - medium (默认)：中等尺寸选择器
  - large：大尺寸选择器

- **状态样式**：

  - 默认状态：普通边框样式
  - 聚焦状态：高亮边框和轻微阴影
  - 禁用状态：灰色背景，不可交互
  - 只读状态：可见但不可修改

- **下拉菜单样式**：

  - 默认菜单：白色背景，带阴影和边框
  - 选项悬停：浅灰色背景
  - 选中选项：主题色标记和对勾图标
  - 禁用选项：灰色文本，不可选择

- **交互反馈**：
  - 箭头旋转：下拉菜单打开时箭头图标旋转
  - 选中高亮：已选中选项有明显的视觉区分

## 4. 交互

JvSelect 组件提供丰富的交互功能：

- **打开下拉菜单**：点击选择器或获取焦点时显示下拉菜单
- **选择选项**：点击选项进行选择，单选模式自动关闭菜单
- **多选模式**：启用 multiple 属性后可选择多个选项
  - 选中选项会显示在输入框内，多个选项用逗号分隔
  - 再次点击已选中的选项可取消选择
- **关闭下拉菜单**：
  - 点击外部区域自动关闭
  - 单选模式下选择选项后自动关闭
  - 失去焦点后自动关闭
- **清除选择**：启用 clearable 属性后，鼠标悬停在选择器上会显示清除按钮
- **键盘操作**：支持键盘导航和操作（Tab 聚焦，Enter 确认等）

## 5. 可访问性

JvSelect 组件的可访问性设计包括：

- 基于语义化的 `<input>` 元素构建，确保屏幕阅读器可以识别
- 提供 placeholder 属性增强提示信息
- 下拉选项可通过键盘导航操作
- 禁用状态有明确的视觉和功能标识
- 选中状态有明确的视觉指示（颜色、图标）
- 提供足够的色彩对比度确保可读性
- 下拉菜单的显示和隐藏有平滑的过渡效果
- 多选模式下显示已选择的项目数量

## 6. Vue API

### Props

| 属性名      | 类型                                     | 默认值   | 说明       |
| ----------- | ---------------------------------------- | -------- | ---------- |
| modelValue  | string \| number \| string[] \| number[] | -        | 绑定值     |
| options     | JvSelectOption[]                         | []       | 选项列表   |
| placeholder | string                                   | '请选择' | 占位文本   |
| disabled    | boolean                                  | false    | 是否禁用   |
| readonly    | boolean                                  | false    | 是否只读   |
| clearable   | boolean                                  | false    | 是否可清空 |
| size        | 'small' \| 'medium' \| 'large'           | 'medium' | 选择器尺寸 |
| multiple    | boolean                                  | false    | 是否多选   |

### 选项数据结构 (JvSelectOption)

```typescript
interface JvSelectOption {
  label: string // 选项标签
  value: string | number // 选项值
  disabled?: boolean // 是否禁用此选项
}
```

### 事件 (Emits)

| 事件名            | 参数                                              | 说明               |
| ----------------- | ------------------------------------------------- | ------------------ |
| update:modelValue | (value: string \| number \| string[] \| number[]) | 更新值时触发       |
| change            | (value: string \| number \| string[] \| number[]) | 选中值变化时触发   |
| clear             | -                                                 | 点击清除按钮时触发 |
| focus             | (event: FocusEvent)                               | 获取焦点时触发     |
| blur              | (event: FocusEvent)                               | 失去焦点时触发     |

### 插槽 (Slots)

| 插槽名  | 说明                               |
| ------- | ---------------------------------- |
| default | 默认插槽，一般不使用               |
| prefix  | 输入框头部内容插槽                 |
| suffix  | 输入框尾部内容插槽，默认为下拉箭头 |

</rewritten_file>
