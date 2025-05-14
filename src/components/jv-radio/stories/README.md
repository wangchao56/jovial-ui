# JvRadio 单选框组件

## 1. 组件介绍
`JvRadio` 单选框组件用于在一组选项中进行单一选择，包含单选框 (JvRadio) 和单选框组 (JvRadioGroup) 两个组件。它符合 Material Design 设计规范，提供了丰富的自定义选项和交互效果，适用于表单、设置页面等需要单选功能的场景。

## 2. 布局结构使用方式
组件分为单选框和单选框组两部分：

### JvRadio 组件
JvRadio 组件的布局结构包含两个主要部分：
- 单选框输入区域 (input)：包含实际的单选框元素和视觉指示器
- 标签区域 (label)：显示选项的文本说明

### JvRadioGroup 组件
JvRadioGroup 用于管理一组相关的单选框，提供统一的布局和数据管理：
- 标题区域 (legend)：可选的组标题
- 选项包装器 (wrapper)：包含所有单选框选项

### 基本使用示例
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

## 3. 交互设计
组件提供丰富的交互体验，确保用户操作的便捷性和反馈的即时性：

### JvRadio 交互特性
- **点击选择**：点击单选框或标签可选中该选项，增大可点击区域
- **数据绑定**：支持通过 v-model 双向绑定数据，反映实时选择状态
- **视觉反馈**：
  - 波纹效果：点击时显示波纹动画，提供即时视觉反馈
  - 过渡动画：选中状态变化时的平滑过渡，使状态变化更加自然
  - 悬停效果：鼠标悬停时有轻微的背景色变化
- **键盘支持**：支持通过键盘选择和操作，增强可访问性
- **禁用状态**：禁用时视觉样式变淡，不响应任何交互操作

### JvRadioGroup 交互功能
- **统一管理**：维护一组单选框的选中状态，确保只有一个被选中
- **数据共享**：所有子单选框共享同一个数据模型，保持状态一致性
- **布局控制**：
  - 水平/垂直布局：适应不同的界面设计需求
  - 紧凑/间隔模式：根据交互密度调整组件间距
- **状态管理**：
  - 统一禁用：可一次性禁用组内所有单选框
  - 重置功能：提供 reset 方法，可将选择重置为初始状态
- **事件通知**：选中值改变时触发 change 事件，便于上层组件响应

## 4. 可访问性
组件遵循 WCAG 无障碍标准，确保各类用户都能有效使用：

- **语义化结构**：
  - 使用语义化的 `<input type="radio">` 元素，确保屏幕阅读器正确识别
  - 使用 `<label>` 元素关联标签内容，增大可点击区域
  - 使用 `<fieldset>` 和 `<legend>` 为单选框组提供语义化结构

- **键盘可用性**：
  - 完全支持键盘导航，可以使用 Tab 键在选项间移动
  - 支持空格键选择当前聚焦的选项
  - 支持方向键在同一组内的选项间切换

- **状态传达**：
  - 通过 aria-checked 属性传达选中状态
  - 通过 aria-disabled 属性标识禁用状态
  - 选中和禁用状态有足够的视觉差异，确保可辨识性

- **分组与关联**：
  - 单选框组提供统一的标签，便于理解分组的含义
  - 使用 name 属性关联同一组的单选框，确保正确的互斥行为

- **色彩对比**：
  - 确保文本和背景、边框之间有足够的对比度
  - 选中状态使用明显的视觉指示器，不仅依赖颜色区分

## 5. Vue 组件 API

### JvRadio 组件

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | any | - | 单选框绑定值 |
| label | any | - | 单选框对应的值 |
| disabled | boolean | false | 是否禁用 |
| name | string | - | 原生 name 属性 |
| color | string | - | 单选框颜色 |
| animated | boolean | true | 是否有动画效果 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 单选框尺寸 |
| bordered | boolean | false | 是否带边框样式 |
| ripple | boolean | true | 是否显示波纹效果 |

#### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: any) | 更新值时触发 |
| click | (event: MouseEvent) | 点击单选框时触发 |
| change | (value: any) | 选中状态变化时触发 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 自定义标签内容 |

#### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| check | - | 手动触发选中该单选框 |
| isChecked | - | 获取当前单选框是否被选中 |

### JvRadioGroup 组件

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | string \| number \| boolean | undefined | 单选框组绑定值 |
| disabled | boolean | false | 是否禁用整个单选框组 |
| name | string | - | 原生 name 属性 |
| column | boolean | false | 是否为垂直布局 |
| inline | boolean | false | 是否为内联布局 |
| label | string | - | 单选框组标题 |
| bordered | boolean | false | 是否显示边框 |
| compact | boolean | false | 是否使用紧凑模式 |
| color | string | - | 统一设置所有单选框的颜色 |
| animated | boolean | true | 是否开启动画效果 |

#### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value?: string \| number \| boolean) | 更新值时触发 |
| change | (value?: string \| number \| boolean) | 选中值变化时触发 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于放置 Radio 组件 |
| label | 标签插槽，用于自定义标签内容 |
| legend | 标题插槽，用于自定义标题内容 |

#### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| reset | - | 重置单选框组，清除选中状态 |
| getValue | - | 获取当前选中的值 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| RD-001 | 基本渲染 | 验证单选框能够正确渲染 | 1. 挂载JvRadio组件<br>2. 检查DOM结构 | 组件应正确渲染为input[type="radio"]元素并包含jv-radio类名 | ✅ |
| RD-002 | 选中状态 | 验证单选框的选中状态 | 1. 挂载JvRadio组件并设置modelValue等于label<br>2. 检查选中状态 | 单选框应处于选中状态，显示选中样式 | ✅ |
| RD-003 | 单选组渲染 | 验证单选框组能够正确渲染 | 1. 挂载JvRadioGroup组件<br>2. 在其中放置多个JvRadio组件<br>3. 检查DOM结构 | 组件应正确渲染并包含所有子单选框 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| RD-101 | 尺寸设置 | 验证不同size属性的效果 | 1. 分别挂载不同size的JvRadio<br>2. 检查样式差异 | 不同尺寸的单选框应有对应的样式类 | ✅ |
| RD-102 | 禁用状态 | 验证禁用状态的单选框 | 1. 挂载disabled=true的JvRadio<br>2. 尝试点击<br>3. 检查交互行为 | 单选框应显示禁用样式且无法被选中 | ✅ |
| RD-103 | 颜色设置 | 验证color属性效果 | 1. 挂载设置了color的JvRadio<br>2. 选中该单选框<br>3. 检查颜色应用 | 单选框应使用指定的颜色 | ✅ |
| RD-104 | 边框样式 | 验证bordered属性效果 | 1. 挂载bordered=true的JvRadio<br>2. 检查外观 | 单选框应显示带边框的样式 | ✅ |
| RD-105 | 动画效果 | 验证animated属性效果 | 1. 挂载animated=false的JvRadio<br>2. 切换选中状态<br>3. 观察动画 | 切换选中状态时不应有过渡动画 | ✅ |
| RD-106 | 波纹效果 | 验证ripple属性效果 | 1. 挂载ripple=false的JvRadio<br>2. 点击单选框<br>3. 观察交互效果 | 点击时不应有波纹动画 | ✅ |
| RD-107 | 垂直布局 | 验证RadioGroup的column属性 | 1. 挂载column=true的JvRadioGroup<br>2. 检查布局方式 | 单选框应垂直排列 | ✅ |
| RD-108 | 紧凑模式 | 验证RadioGroup的compact属性 | 1. 挂载compact=true的JvRadioGroup<br>2. 检查间距 | 选项之间应无间距 | ✅ |
| RD-109 | 组禁用 | 验证RadioGroup的disabled属性 | 1. 挂载disabled=true的JvRadioGroup<br>2. 尝试选择任一子选项<br>3. 检查交互行为 | 所有子单选框均应被禁用 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| RD-201 | 更新事件 | 验证update:modelValue事件 | 1. 挂载JvRadio组件<br>2. 点击单选框<br>3. 检查事件触发 | 应触发update:modelValue事件，值为label值 | ✅ |
| RD-202 | 点击事件 | 验证click事件 | 1. 挂载JvRadio组件<br>2. 点击单选框<br>3. 检查事件触发 | 应触发click事件 | ✅ |
| RD-203 | 变化事件 | 验证change事件 | 1. 挂载JvRadio组件<br>2. 改变选中状态<br>3. 检查事件触发 | 应触发change事件 | ✅ |
| RD-204 | 组值更新 | 验证RadioGroup的update:modelValue事件 | 1. 挂载JvRadioGroup及子单选框<br>2. 选择一个选项<br>3. 检查事件触发 | 应触发update:modelValue事件，值为所选子项的label | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| RD-301 | 默认插槽 | 验证JvRadio默认插槽内容 | 1. 挂载JvRadio并设置默认插槽内容<br>2. 检查渲染结果 | 默认插槽内容应正确显示 | ✅ |
| RD-302 | 标签插槽 | 验证JvRadioGroup的label插槽 | 1. 挂载JvRadioGroup并设置label插槽内容<br>2. 检查渲染结果 | label插槽内容应正确显示 | ✅ |
| RD-303 | 标题插槽 | 验证JvRadioGroup的legend插槽 | 1. 挂载JvRadioGroup并设置legend插槽内容<br>2. 检查渲染结果 | legend插槽内容应正确显示 | ✅ |

### 暴露方法测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| RD-401 | 单选框选中 | 验证JvRadio的check方法 | 1. 挂载JvRadio组件<br>2. 调用check方法<br>3. 检查选中状态 | 单选框应被选中 | ✅ |
| RD-402 | 状态检查 | 验证JvRadio的isChecked方法 | 1. 挂载JvRadio组件并设置选中/未选中状态<br>2. 调用isChecked方法<br>3. 检查返回值 | 返回值应与实际选中状态一致 | ✅ |
| RD-403 | 组重置 | 验证JvRadioGroup的reset方法 | 1. 挂载JvRadioGroup并选中一个选项<br>2. 调用reset方法<br>3. 检查选中状态 | 所有单选框应恢复未选中状态 | ✅ |
| RD-404 | 获取组值 | 验证JvRadioGroup的getValue方法 | 1. 挂载JvRadioGroup并选中一个选项<br>2. 调用getValue方法<br>3. 检查返回值 | 返回值应为当前选中项的值 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvRadio v-model="value" label="option1">选项一</JvRadio>
  <JvRadio v-model="value" label="option2">选项二</JvRadio>
  <div>当前选中值: {{ value }}</div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('option1')
</script>
```

### 单选框组
```vue
<template>
  <JvRadioGroup v-model="selectedFruit" label="选择一种水果">
    <JvRadio label="apple">苹果</JvRadio>
    <JvRadio label="banana">香蕉</JvRadio>
    <JvRadio label="orange">橙子</JvRadio>
    <JvRadio label="grape" disabled>葡萄</JvRadio>
  </JvRadioGroup>
  <div>当前选择: {{ selectedFruit }}</div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFruit = ref('banana')
</script>
```

### 不同尺寸
```vue
<template>
  <JvRadio v-model="size" label="small" size="small">小尺寸</JvRadio>
  <JvRadio v-model="size" label="medium">中等尺寸（默认）</JvRadio>
  <JvRadio v-model="size" label="large" size="large">大尺寸</JvRadio>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('medium')
</script>
```

### 自定义颜色
```vue
<template>
  <JvRadio v-model="color" label="red" color="red">红色</JvRadio>
  <JvRadio v-model="color" label="green" color="#00c853">绿色</JvRadio>
  <JvRadio v-model="color" label="blue" color="blue">蓝色</JvRadio>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('red')
</script>
```

### 垂直布局
```vue
<template>
  <JvRadioGroup v-model="direction" column label="布局方向">
    <JvRadio label="horizontal">水平方向</JvRadio>
    <JvRadio label="vertical">垂直方向</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const direction = ref('horizontal')
</script>
```

### 带边框样式
```vue
<template>
  <JvRadioGroup v-model="payment" bordered label="支付方式">
    <JvRadio label="credit" bordered>信用卡</JvRadio>
    <JvRadio label="debit" bordered>借记卡</JvRadio>
    <JvRadio label="cash" bordered>现金</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const payment = ref('credit')
</script>
```

### 紧凑模式
```vue
<template>
  <JvRadioGroup v-model="align" compact bordered>
    <JvRadio label="left" bordered>左对齐</JvRadio>
    <JvRadio label="center" bordered>居中</JvRadio>
    <JvRadio label="right" bordered>右对齐</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const align = ref('center')
</script>
```

### 禁用状态
```vue
<template>
  <JvRadio v-model="value" label="enabled">启用选项</JvRadio>
  <JvRadio v-model="value" label="disabled" disabled>禁用选项</JvRadio>
  
  <JvRadioGroup v-model="groupValue" disabled label="禁用的选项组">
    <JvRadio label="option1">选项一</JvRadio>
    <JvRadio label="option2">选项二</JvRadio>
  </JvRadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('enabled')
const groupValue = ref('option1')
</script>
```

### 使用暴露方法
```vue
<template>
  <JvRadio 
    v-model="value" 
    label="option1"
    ref="radioRef"
  >可编程控制的选项</JvRadio>
  
  <JvRadioGroup 
    v-model="groupValue" 
    ref="groupRef"
    label="可编程控制的组"
  >
    <JvRadio label="option1">选项一</JvRadio>
    <JvRadio label="option2">选项二</JvRadio>
  </JvRadioGroup>
  
  <div class="actions">
    <button @click="checkRadio">选中单选框</button>
    <button @click="isRadioChecked">检查单选框状态</button>
    <button @click="resetGroup">重置选项组</button>
    <button @click="getGroupValue">获取组选中值</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const groupValue = ref('option1')
const radioRef = ref(null)
const groupRef = ref(null)

function checkRadio() {
  radioRef.value.check()
}

function isRadioChecked() {
  alert(radioRef.value.isChecked() ? '选中' : '未选中')
}

function resetGroup() {
  groupRef.value.reset()
}

function getGroupValue() {
  alert('当前选中: ' + groupRef.value.getValue())
}
</script>

<style scoped>
.actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
```
