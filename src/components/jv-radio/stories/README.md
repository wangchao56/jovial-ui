# JvRadio 单选框组件

## 组件介绍

JvRadio 单选框组件用于在多个选项中选择一个选项。它支持单独使用或与 JvRadioGroup 组件结合，支持多种尺寸、颜色和布局。该组件遵循 WCAG 2.1 无障碍标准，提供了丰富的交互反馈和自定义选项。

### 核心特性

- 支持无界面样式定制，包括尺寸、颜色、边框等
- 提供动画效果和触摸反馈，增强用户体验
- 完全支持无障碍访问，符合 ARIA 规范
- 提供单选框组，支持多种布局方式（垂直、水平、网格）
- 支持远程数据加载和选项的动态渲染
- 集成表单验证功能，支持错误状态显示

## 布局结构使用方式

JvRadio 组件由以下部分组成：

1. **输入区域**：包含实际的单选框元素（通常隐藏）和自定义的视觉选择指示器
2. **标签区域**：展示选项的文本或自定义内容
3. **错误信息区域**：当验证失败时显示错误信息

JvRadioGroup 组件提供了对多个 JvRadio 的管理，包括：

1. **标题/图例**：描述单选框组的用途
2. **选项容器**：排列和布局多个单选框
3. **错误信息区域**：显示组级别的错误信息

### 布局选项

- **标签位置**：支持 `left` 或 `right` 设置
- **尺寸**：支持 `sm`、`md`、`lg` 三种规格
- **布局方式**：支持水平（默认）和垂直（`column: true`）排列
- **网格布局**：通过 `columns` 属性配置每行的单选框数量，支持响应式配置

## 交互设计

JvRadio 组件提供了丰富的交互反馈：

- **点击效果**：点击时有波纹反馈效果，视觉上确认用户操作
- **焦点状态**：使用键盘导航时，显示清晰的焦点轮廓
- **悬停状态**：当鼠标悬停在选项上时，边框颜色变化给予反馈
- **选中动画**：选中时内部圆点会有缩放动画，增强用户体验
- **错误状态**：验证失败时显示红色边框和错误信息
- **加载状态**：远程加载数据时显示加载指示器

### 键盘操作支持

| 按键 | 动作 |
|------|------|
| Tab | 在不同选项间移动焦点 |
| Space/Enter | 选择当前焦点所在的选项 |
| 方向键 | 在 RadioGroup 内快速导航选项 |

## 可访问性

JvRadio 组件遵循 WAI-ARIA 规范，确保所有用户都能正常使用：

- 使用 `role="radio"` 和 `aria-checked` 表明选项状态
- 通过 `aria-disabled` 传达禁用状态
- 使用 `aria-labelledby` 将标签与选项关联
- 支持屏幕阅读器宣读选项内容和状态
- 对于 RadioGroup，使用 `role="radiogroup"` 和 `aria-labelledby` 创建语义结构
- 确保键盘可操作性，支持 Tab 导航和 Space/Enter 选择
- 选项间距和点击区域符合 WCAG 标准，最小可触摸区域 12px

## Vue 组件 API

### JvRadio Props

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|------|------|
| modelValue | any | - | 绑定值，可用 v-model 双向绑定 |
| label | any | - | 单选框的值 |
| disabled | boolean | false | 是否禁用 |
| name | string | - | 原生 name 属性，用于表单提交 |
| color | string | - | 自定义颜色 |
| animated | boolean | true | 是否启用动画效果 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 尺寸大小 |
| bordered | boolean | false | 是否显示边框 |
| labelPosition | 'left' \| 'right' | 'right' | 标签位置 |
| gap | number \| string | '8px' | 标签与单选框的间距 |
| ripple | boolean | true | 是否有波纹效果 |
| error | boolean | false | 是否有错误状态 |
| errorMessage | string | - | 错误信息 |
| radioClass | string | - | 单选框自定义类名 |
| labelClass | string | - | 标签自定义类名 |
| ariaLabel | string | - | ARIA 标签 |
| focusVisible | boolean | true | 是否显示焦点样式 |

### JvRadio Events

| 事件名 | 参数 | 说明 |
|------|------|------|
| update:modelValue | (value: any) | 更新绑定值 |
| click | (event: MouseEvent) | 点击事件 |
| change | (value: any) | 选中状态变化事件 |
| focus | (event: FocusEvent) | 获得焦点事件 |
| blur | (event: FocusEvent) | 失去焦点事件 |

### JvRadio Slots

| 插槽名 | 说明 |
|------|------|
| default | 标签内容 |

### JvRadio Exposed Methods

| 方法名 | 说明 |
|------|------|
| check() | 触发选中 |
| isChecked() | 获取是否选中 |
| focus() | 聚焦单选框 |
| blur() | 取消聚焦 |

### JvRadioGroup Props

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|------|------|
| modelValue | string \| number \| boolean | - | 绑定值 |
| disabled | boolean | false | 是否禁用所有选项 |
| name | string | - | 单选框组的 name 属性 |
| column | boolean | false | 是否垂直布局 |
| inline | boolean | false | 是否内联布局 |
| label | string | - | 单选框组标题 |
| bordered | boolean | false | 是否显示边框 |
| compact | boolean | false | 是否紧凑模式 |
| color | string | - | 统一设置所有选项的颜色 |
| animated | boolean | true | 是否启用动画效果 |
| options | RadioOption[] | [] | 选项数据 |
| columns | number \| Record<string, number> | 0 | 每行显示的列数 |
| remote | boolean | false | 是否使用远程数据 |
| remoteUrl | string | - | 远程加载URL |
| remoteMethod | () => Promise<RadioOption[]> | - | 远程加载方法 |
| remoteParams | object | {} | 远程加载参数 |
| remoteLoading | boolean | false | 是否正在加载 |
| valueField | string | 'value' | 选项值字段名 |
| labelField | string | 'label' | 选项标签字段名 |
| labelPosition | 'left' \| 'right' | 'right' | 标签位置 |
| error | boolean | false | 是否有错误状态 |
| errorMessage | string | - | 错误信息 |
| customClass | string | - | 自定义类名 |
| gap | string \| number | 12 | 选项间距 |

### JvRadioGroup Events

| 事件名 | 参数 | 说明 |
|------|------|------|
| update:modelValue | (value?: string \| number \| boolean) | 更新绑定值 |
| change | (value?: string \| number \| boolean) | 选中值变化 |
| load-success | (options: RadioOption[]) | 远程加载成功 |
| load-error | (error: Error) | 远程加载失败 |

### JvRadioGroup Slots

| 插槽名 | 说明 |
|------|------|
| default | 自定义的 Radio 组件 |
| label/legend | 自定义标题内容 |
| error | 自定义错误信息 |
| loading | 自定义加载状态 |
| empty | 自定义空状态 |
| prepend | 前置内容 |
| append | 后置内容 |

### RadioOption 类型

```typescript
interface RadioOption {
  /** 选项标签显示的文本 */
  label: string
  /** 选项的值 */
  value: string | number | boolean
  /** 是否禁用该选项 */
  disabled?: boolean
  /** 自定义样式 */
  style?: Record<string, string>
  /** 自定义类名 */
  class?: string
  /** 其他自定义属性 */
  [key: string]: any
}
```

## 测试用例

JvRadio 组件经过全面测试，确保各种场景下的稳定性：

### 基础功能测试

- 基本渲染测试：验证组件是否正确渲染
- 标签内容测试：验证标签内容是否正确显示
- 尺寸测试：验证不同尺寸是否正确应用
- 禁用状态测试：验证禁用状态下的行为
- 选中状态测试：验证选中状态的视觉效果和数据绑定

### 交互测试

- 点击事件测试：验证点击后的事件触发
- 键盘事件测试：验证键盘操作的行为
- 焦点处理测试：验证焦点状态的处理
- 颜色自定义测试：验证自定义颜色的应用
- 标签位置测试：验证标签位置的正确应用
- 错误状态测试：验证错误状态的显示

### 单选框组测试

- 基本渲染测试：验证组件结构
- 布局测试：验证不同布局配置
- 选项数据测试：验证选项的正确渲染
- 值变化测试：验证选择变化时的事件触发
- 远程加载测试：验证远程数据的加载和渲染

## 使用示例

### 基础用法

```vue
<template>
  <JvRadio v-model="selectedValue" label="option1">选项一</JvRadio>
  <JvRadio v-model="selectedValue" label="option2">选项二</JvRadio>
</template>

<script setup>
import { ref } from 'vue'
import { JvRadio } from '@/components/jv-radio'

const selectedValue = ref('option1')
</script>
```

### 使用 RadioGroup

```vue
<template>
  <JvRadioGroup v-model="selectedValue" label="请选择一个选项">
    <JvRadio label="option1">选项一</JvRadio>
    <JvRadio label="option2">选项二</JvRadio>
    <JvRadio label="option3" disabled>选项三 (禁用)</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { JvRadio, JvRadioGroup } from '@/components/jv-radio'

const selectedValue = ref('option1')
</script>
```

### 使用选项数据

```vue
<template>
  <JvRadioGroup
    v-model="selectedValue"
    label="使用选项数据"
    :options="options"
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvRadioGroup } from '@/components/jv-radio'

const selectedValue = ref('')
const options = ref([
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3', disabled: true },
])
</script>
```

### 远程加载数据

```vue
<template>
  <JvRadioGroup
    v-model="selectedValue"
    label="远程加载选项"
    :remote="true"
    :remote-method="loadOptions"
    :remote-loading="loading"
  >
    <template #loading>
      <div>加载中，请稍候...</div>
    </template>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { JvRadioGroup } from '@/components/jv-radio'

const selectedValue = ref('')
const loading = ref(false)

const loadOptions = async () => {
  loading.value = true
  try {
    // 模拟API请求
    const response = await fetch('/api/options')
    const data = await response.json()
    return data.map(item => ({
      label: item.name,
      value: item.id
    }))
  } catch (error) {
    console.error('加载选项失败', error)
    return []
  } finally {
    loading.value = false
  }
}
</script>
```

### 响应式网格布局

```vue
<template>
  <JvRadioGroup
    v-model="selectedValue"
    label="响应式布局"
    :options="options"
    :columns="{ xs: 1, sm: 2, md: 3, lg: 4 }"
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvRadioGroup } from '@/components/jv-radio'

const selectedValue = ref('')
const options = ref([
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' },
  { label: '选项五', value: 'option5' },
  { label: '选项六', value: 'option6' },
])
</script>
```

### 自定义样式

```vue
<template>
  <JvRadioGroup v-model="selectedValue" label="自定义样式" color="#8e44ad">
    <JvRadio
      v-for="option in options"
      :key="option.value"
      :label="option.value"
      :disabled="option.disabled"
      :style="option.style"
    >
      {{ option.label }}
    </JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { JvRadio, JvRadioGroup } from '@/components/jv-radio'

const selectedValue = ref('')
const options = ref([
  { label: '选项一', value: 'option1', style: { fontWeight: 'bold' } },
  { label: '选项二', value: 'option2', style: { color: '#e74c3c' } },
  { label: '选项三', value: 'option3', disabled: true },
])
</script>
```
