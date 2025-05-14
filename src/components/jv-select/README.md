# JvSelect 选择器组件

## 组件介绍

JvSelect 是一个功能丰富的下拉选择器组件，用于从预定义的选项列表中进行单选或多选操作。它继承了 JvInput 组件的外观和行为，并增加了下拉菜单和选项选择功能。这个组件特别适用于表单、筛选条件、配置面板等各种需要从固定选项中选择内容的场景。

## 布局结构使用方式

JvSelect 组件的布局结构主要由以下几个部分组成：

1. **输入框区域**：基于 JvInput 组件，显示当前选中的值
   - **前缀区域** (prefix slot)：可放置图标或自定义内容
   - **内容区域**：显示当前选中的选项标签（单选）或标签列表（多选）
   - **后缀区域** (suffix slot)：默认显示下拉箭头图标，可自定义

2. **下拉菜单**：点击输入框时显示的选项列表
   - **选项列表**：所有可选择的选项，支持禁用单个选项
   - **选中标记**：当前已选中的选项会显示对勾图标
   - **空状态**：当没有选项时显示"暂无数据"提示

基本使用示例：

```vue
<template>
  <JvSelect 
    v-model="selectedValue" 
    :options="options" 
    placeholder="请选择" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const selectedValue = ref('')
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3', disabled: true },
  { label: '选项4', value: 'option4' }
]
</script>
```

## 交互设计

JvSelect 组件提供了丰富的交互功能，旨在提供流畅的用户体验：

1. **下拉菜单控制**：
   - 点击选择器或获取焦点时显示下拉菜单
   - 点击外部区域、失去焦点或在单选模式下选择选项后自动关闭下拉菜单
   - 箭头图标随下拉菜单的打开/关闭状态旋转，提供直观的视觉反馈

2. **选项选择机制**：
   - **单选模式**：点击选项直接选中并关闭下拉菜单
   - **多选模式**：点击选项进行选择，再次点击已选项可取消选择，下拉菜单保持打开状态
   - 选中的选项会有明显的视觉标识（颜色变化和对勾图标）

3. **状态与反馈**：
   - 禁用状态下不可操作
   - 只读状态下可以查看但不能修改
   - 可清空功能允许一键清除已选内容
   - 鼠标悬停在选项上会有背景色变化提供反馈

4. **键盘支持**：
   - 支持Tab键焦点导航
   - 支持Enter键确认选择
   - 支持Esc键关闭下拉菜单

## 可访问性

JvSelect 组件在设计时充分考虑了可访问性（A11Y）需求：

1. **语义化结构**：基于标准HTML元素构建，确保屏幕阅读器可以正确识别和解读
2. **键盘操作支持**：完全支持键盘导航和操作，无需依赖鼠标
3. **状态传达**：
   - 禁用和只读状态有明确的视觉和功能区分
   - 选中状态通过颜色和图标双重指示
   - 焦点状态有清晰的视觉提示
4. **文本提示**：通过placeholder属性提供清晰的操作指引
5. **色彩对比**：确保文本和背景之间有足够的对比度，提高可读性
6. **动画过渡**：下拉菜单的显示和隐藏有平滑的过渡效果，不会造成视觉冲击
7. **响应式设计**：适应不同屏幕尺寸和设备

## Vue 组件 API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | string \| number \| string[] \| number[] | - |
| options | 选项列表 | JvSelectOption[] | [] |
| placeholder | 占位文本 | string | '请选择' |
| disabled | 是否禁用 | boolean | false |
| readonly | 是否只读 | boolean | false |
| clearable | 是否可清空 | boolean | false |
| size | 选择器尺寸 | 'small' \| 'medium' \| 'large' | 'medium' |
| multiple | 是否多选 | boolean | false |

### 选项数据结构 (JvSelectOption)

```typescript
interface JvSelectOption {
  label: string        // 选项标签文本
  value: string | number  // 选项值
  disabled?: boolean   // 是否禁用此选项
}
```

### Emits

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 更新值时触发 | (value: string \| number \| string[] \| number[]) |
| change | 选中值变化时触发 | (value: string \| number \| string[] \| number[]) |
| clear | 点击清除按钮时触发 | - |
| focus | 获取焦点时触发 | (event: FocusEvent) |
| blur | 失去焦点时触发 | (event: FocusEvent) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，一般不使用 |
| prefix | 输入框头部内容插槽 |
| suffix | 输入框尾部内容插槽，默认为下拉箭头 |

## 测试用例

| 测试类型 | 测试描述 | 测试方法 | 预期结果 |
| --- | --- | --- | --- |
| **基础功能测试** | 组件渲染测试 | 创建组件实例并验证DOM结构 | 组件能够正确渲染且包含所有必要元素 |
| | 下拉菜单显示测试 | 点击选择器并检查下拉菜单 | 点击后下拉菜单正确显示，包含所有选项 |
| | 选项选择测试 | 点击下拉菜单中的选项 | 正确触发update:modelValue事件，值为所选选项的value |
| **单选功能测试** | 选中值显示测试 | 设置modelValue并检查显示内容 | 输入框正确显示选中项的label文本 |
| | 选中状态标记测试 | 设置modelValue并检查选项样式 | 对应选项显示为选中状态，包含对勾图标 |
| | 选项切换测试 | 选择不同选项并验证值变化 | 选中不同选项时值正确更新，UI相应变化 |
| **多选功能测试** | 多选模式启用测试 | 设置multiple=true并选择多个选项 | 可以选择多个选项，值为数组格式 |
| | 多选值显示测试 | 选择多个选项并检查显示内容 | 输入框显示所有选中项的label，用逗号分隔 |
| | 选项取消选择测试 | 点击已选中的选项 | 该选项被取消选择，从选中数组中移除 |
| **状态测试** | 禁用状态测试 | 设置disabled=true并尝试交互 | 组件显示为禁用状态，无法点击打开下拉菜单 |
| | 只读状态测试 | 设置readonly=true并尝试交互 | 可以查看但不能修改选中的值 |
| | 禁用选项测试 | 点击禁用的选项 | 禁用选项无法被选中，不触发值更新 |
| **事件测试** | change事件测试 | 选择不同选项并监听事件 | 值变化时正确触发change事件 |
| | clear事件测试 | 点击清除按钮并监听事件 | 触发clear事件，值被清空 |
| | focus/blur事件测试 | 使组件获取/失去焦点 | 正确触发focus和blur事件 |
| **交互测试** | 点击外部关闭测试 | 打开下拉菜单后点击外部区域 | 下拉菜单自动关闭 |
| | 失焦关闭测试 | 使组件失去焦点 | 下拉菜单自动关闭 |
| | 箭头旋转测试 | 打开和关闭下拉菜单 | 箭头图标随状态变化旋转 |
| **样式测试** | 尺寸变化测试 | 设置不同的size值 | 组件尺寸随设置变化 |
| | 选中项样式测试 | 检查选中项的样式 | 选中项有正确的背景色和图标 |
| | 空数据提示测试 | 设置空的options数组 | 显示"暂无数据"提示 |

## 使用示例

### 基础用法

```vue
<template>
  <JvSelect v-model="value" :options="options" placeholder="请选择" />
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const value = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
```

### 不同尺寸

```vue
<template>
  <div class="select-size-demo">
    <JvSelect v-model="value" :options="options" size="small" placeholder="小尺寸" />
    <JvSelect v-model="value" :options="options" size="medium" placeholder="中等尺寸（默认）" />
    <JvSelect v-model="value" :options="options" size="large" placeholder="大尺寸" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const value = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>

<style>
.select-size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 多选模式

```vue
<template>
  <JvSelect 
    v-model="multiValue" 
    :options="options" 
    multiple
    placeholder="请选择多个选项" 
  />
  <div style="margin-top: 10px">当前选中值: {{ multiValue }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const multiValue = ref([])
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
]
</script>
```

### 禁用选项

```vue
<template>
  <JvSelect v-model="value" :options="disabledOptions" placeholder="包含禁用选项" />
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const value = ref('')
const disabledOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二 (禁用)', value: '2', disabled: true },
  { label: '选项三', value: '3' },
  { label: '选项四 (禁用)', value: '4', disabled: true },
]
</script>
```

### 可清空选择

```vue
<template>
  <JvSelect 
    v-model="value" 
    :options="options" 
    clearable
    placeholder="可清空选择器" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const value = ref('1') // 初始选中第一个选项
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
```

### 自定义前缀和后缀

```vue
<template>
  <JvSelect 
    v-model="value" 
    :options="options" 
    placeholder="自定义前缀和后缀" 
  >
    <template #prefix>
      <JvIcon name="$search" />
    </template>
    <template #suffix>
      <JvIcon name="$menuDown" :rotate="isOpen ? 180 : 0" />
    </template>
  </JvSelect>
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect, JvIcon } from 'jovial-ui'

const value = ref('')
const isOpen = ref(false)
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
```

### 表单中使用

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-item">
      <label>爱好:</label>
      <JvSelect 
        v-model="hobby" 
        :options="hobbyOptions" 
        placeholder="请选择您的爱好" 
        required
      />
    </div>
    <div class="form-item">
      <label>技能:</label>
      <JvSelect 
        v-model="skills" 
        :options="skillOptions" 
        multiple
        placeholder="请选择您的技能（可多选）" 
      />
    </div>
    <button type="submit">提交</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { JvSelect } from 'jovial-ui'

const hobby = ref('')
const skills = ref([])

const hobbyOptions = [
  { label: '阅读', value: 'reading' },
  { label: '运动', value: 'sports' },
  { label: '音乐', value: 'music' },
  { label: '电影', value: 'movie' },
  { label: '旅行', value: 'travel' },
]

const skillOptions = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]

const submitForm = () => {
  console.log('表单提交', { hobby: hobby.value, skills: skills.value })
}
</script>

<style>
.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
}
</style>
``` 