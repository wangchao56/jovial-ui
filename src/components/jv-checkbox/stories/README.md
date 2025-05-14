# JvCheckbox 复选框组件

## 1. 组件介绍
`JvCheckbox` 是一个复选框组件，用于在表单中让用户从一组选项中进行多选或单选操作。它支持单独使用或组合使用，可以通过 v-model 轻松实现数据绑定，并提供了丰富的样式和状态变化。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 复选框输入区域 (input)：包含实际的复选框元素和视觉指示器
- 标签区域 (label)：显示复选框的说明文本

### 基本使用示例
```vue
<template>
  <!-- 基础用法 -->
  <JvCheckbox v-model="checked" label="同意协议" />
  
  <!-- 禁用状态 -->
  <JvCheckbox v-model="checked" label="禁用选项" disabled />
  
  <!-- 不确定状态 -->
  <JvCheckbox v-model="checked" label="部分选中" indeterminate />
  
  <!-- 多选绑定 -->
  <JvCheckbox v-model="checkedFruits" label="苹果" />
  <JvCheckbox v-model="checkedFruits" label="香蕉" />
  <JvCheckbox v-model="checkedFruits" label="橙子" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checkedFruits = ref(['苹果'])
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 点击交互：点击复选框或标签可切换选中状态
- 数据绑定：支持通过 v-model 双向绑定数据
  - 绑定布尔值：单个复选框的选中状态
  - 绑定数组：多个复选框的选中值集合
- 键盘交互：支持键盘空格键切换选中状态
- 不确定状态：indeterminate 属性设置介于选中和未选中之间的状态
- 禁用状态：disabled 属性禁止用户交互
- 视觉反馈：选中、未选中、不确定和禁用状态有明显的视觉差异
- 过渡动画：状态变化时有平滑的过渡效果

特殊交互：
- 当绑定数组时，选中的复选框的 label 值会被添加到数组中
- 点击选中的复选框会从绑定数组中移除对应的 label 值
- 不确定状态是一种视觉状态，不影响实际的选中值

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 `<label>` 和 `<input type="checkbox">` 元素
- 支持键盘导航和操作（可通过 Tab 键聚焦，空格键切换）
- 禁用状态下明确传达交互限制
- 标签文本与复选框关联，增大可点击区域
- 可通过 ARIA 属性增强屏幕阅读器的使用体验
- 足够的颜色对比度确保状态可识别性

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean \| Array<string \| number> | undefined | 绑定值 |
| label | string \| number | undefined | 选项标签，当绑定值为数组时作为选中值 |
| disabled | boolean | false | 是否禁用 |
| required | boolean | false | 是否必填 |
| indeterminate | boolean | false | 是否为不确定状态 |
| name | string | undefined | 原生 name 属性 |
| trueValue | any | undefined | 选中时的值 |
| falseValue | any | undefined | 未选中时的值 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 复选框尺寸 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击复选框时触发 |
| update:modelValue | (value: any) | 复选框状态变化时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于自定义标签内容 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus | - | 使复选框获取焦点 |
| blur | - | 使复选框失去焦点 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| CB-002 | 状态切换 | 验证点击复选框是否切换状态 | 1. 引入组件<br>2. 点击复选框 | 状态应该从 false 变为 true | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-101 | 尺寸设置 | 验证不同尺寸属性的效果 | 1. 设置不同的 size 属性<br>2. 检查样式变化 | 应用对应的尺寸类名 | ✅ |
| CB-102 | 禁用状态 | 验证禁用状态的效果 | 1. 设置 disabled 属性<br>2. 尝试点击复选框 | 禁用样式正确且无法点击 | ✅ |
| CB-103 | 不确定状态 | 验证不确定状态的效果 | 1. 设置 indeterminate 属性<br>2. 检查样式变化 | 显示不确定状态样式 | ✅ |
| CB-104 | 标签显示 | 验证标签显示效果 | 1. 设置 label 属性<br>2. 检查标签显示 | 正确显示标签文本 | ✅ |
| CB-105 | 必填属性 | 验证必填属性的效果 | 1. 设置 required 属性<br>2. 检查样式变化 | 显示必填状态样式 | ✅ |
| CB-106 | 自定义值 | 验证自定义值的效果 | 1. 设置 trueValue/falseValue 属性<br>2. 切换复选框 | 正确返回对应状态的值 | ✅ |
| CB-107 | 数组绑定 | 验证数组绑定的效果 | 1. 绑定数组值<br>2. 切换多个复选框 | 数组正确更新选中值 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-201 | 更新事件 | 验证 update:modelValue 事件 | 1. 监听事件<br>2. 点击复选框 | 事件被触发且值正确 | ✅ |
| CB-202 | 点击事件 | 验证 click 事件 | 1. 监听事件<br>2. 点击复选框 | 事件被触发且事件对象正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 正确显示自定义内容 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-401 | focus 方法 | 验证 focus 方法 | 1. 调用 focus 方法<br>2. 检查焦点状态 | 复选框获得焦点 | ✅ |
| CB-402 | blur 方法 | 验证 blur 方法 | 1. 调用 blur 方法<br>2. 检查焦点状态 | 复选框失去焦点 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-501 | 选中样式 | 验证选中状态的样式 | 1. 切换为选中状态<br>2. 检查样式变化 | 显示正确的选中样式 | ✅ |
| CB-502 | 过渡效果 | 验证状态切换的过渡效果 | 1. 切换复选框状态<br>2. 观察过渡动画 | 平滑的过渡动画效果 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-601 | 键盘操作 | 验证键盘操作功能 | 1. 使用 Tab 聚焦<br>2. 使用空格键切换 | 可以通过键盘操作复选框 | ✅ |
| CB-602 | 标签关联 | 验证标签与复选框的关联 | 1. 点击标签文本<br>2. 检查复选框状态 | 点击标签可以切换复选框状态 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvCheckbox v-model="checked" label="同意协议" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

### 不确定状态
```vue
<template>
  <JvCheckbox v-model="checked" label="全选" indeterminate />
</template>
```

### 复选框组
```vue
<template>
  <JvCheckbox v-model="checkedFruits" label="苹果" />
  <JvCheckbox v-model="checkedFruits" label="香蕉" />
  <JvCheckbox v-model="checkedFruits" label="橙子" />
  <p>选中的水果: {{ checkedFruits }}</p>
</template>

<script setup>
import { ref } from 'vue'

const checkedFruits = ref(['苹果'])
</script>
```

### 自定义内容
```vue
<template>
  <JvCheckbox v-model="checked">
    我已阅读并同意<a href="#">《服务条款》</a>
  </JvCheckbox>
</template>
```

### 不同尺寸
```vue
<template>
  <JvCheckbox v-model="checked" label="小尺寸" size="small" />
  <JvCheckbox v-model="checked" label="中等尺寸" />
  <JvCheckbox v-model="checked" label="大尺寸" size="large" />
</template>
```
