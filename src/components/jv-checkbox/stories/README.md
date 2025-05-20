# JvCheckbox 复选框组件

## 1. 组件介绍
`JvCheckbox` 是一个高性能的复选框组件，用于在表单中让用户从一组选项中进行多选或单选操作。它支持单独使用或组合使用，可以通过 v-model 轻松实现数据绑定，并提供了丰富的样式和状态变化。

`JvCheckboxGroup` 是复选框的组合组件，用于管理一组相关联的复选框，提供了统一的值管理和布局控制。

### 主要特性
- **高性能渲染**：采用优化的CSS和逻辑，减少不必要的重绘和重排
- **多种值绑定模式**：支持布尔值、数组和自定义值模式
- **完善的键盘操作**：支持完整的键盘访问和导航
- **增强的可访问性**：符合WCAG标准的ARIA属性和键盘交互
- **自定义样式支持**：通过CSS变量和自定义类/样式属性提供灵活的样式自定义
- **复选框组支持**：通过JvCheckboxGroup组件可以轻松管理一组复选框

## 2. 布局结构使用方式
组件采用以下布局结构：
- 复选框输入区域 (input)：包含实际的复选框元素和视觉指示器
- 标签区域 (label)：显示复选框的说明文本
- 复选框组 (checkbox-group)：管理一组相关联的复选框

### 基本使用示例
```vue
<template>
  <!-- 基础用法 -->
  <JvCheckbox v-model="checked" label="同意协议" />
  
  <!-- 禁用状态 -->
  <JvCheckbox v-model="checked" label="禁用选项" disabled />
  
  <!-- 不确定状态 -->
  <JvCheckbox v-model="checked" label="部分选中" indeterminate />
  
  <!-- 必填状态 -->
  <JvCheckbox v-model="checked" label="必填选项" required />
  
  <!-- 自定义样式 -->
  <JvCheckbox 
    v-model="checked" 
    label="自定义样式" 
    :customStyle="{ '--jv-theme-primary': '#ff5722' }"
    :customClass="['custom-checkbox']"
  />
  
  <!-- 多选绑定 -->
  <JvCheckbox v-model="checkedFruits" label="苹果" />
  <JvCheckbox v-model="checkedFruits" label="香蕉" />
  <JvCheckbox v-model="checkedFruits" label="橙子" />
  
  <!-- 自定义值 -->
  <JvCheckbox 
    v-model="status" 
    label="启用状态" 
    true-value="active" 
    false-value="inactive" 
  />
  
  <!-- 复选框组 -->
  <JvCheckboxGroup v-model="selectedColors" :max="3">
    <JvCheckbox label="红色" />
    <JvCheckbox label="蓝色" />
    <JvCheckbox label="绿色" />
    <JvCheckbox label="黄色" />
    <JvCheckbox label="紫色" />
  </JvCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checkedFruits = ref(['苹果'])
const status = ref('inactive')
const selectedColors = ref(['红色'])
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 点击交互：点击复选框或标签可切换选中状态
- 数据绑定：支持通过 v-model 双向绑定数据
  - 绑定布尔值：单个复选框的选中状态
  - 绑定数组：多个复选框的选中值集合
  - 绑定自定义值：通过 true-value/false-value 属性自定义选中/未选中值
- 键盘交互：
  - 通过Tab键可聚焦到复选框
  - 通过空格键可切换选中状态
  - 支持键盘焦点状态的视觉反馈
- 不确定状态：indeterminate 属性设置介于选中和未选中之间的状态
- 禁用状态：disabled 属性禁止用户交互
- 视觉反馈：选中、未选中、不确定和禁用状态有明显的视觉差异
- 过渡动画：状态变化时有平滑的过渡效果
- 复选框组交互：
  - 最大可选数量限制：达到最大数量后禁用未选中的复选框
  - 布局方向控制：水平或垂直排列
  - 间距控制：控制复选框之间的间距

特殊交互：
- 当绑定数组时，选中的复选框的 label 值会被添加到数组中
- 点击选中的复选框会从绑定数组中移除对应的 label 值
- 不确定状态是一种视觉状态，不影响实际的选中值
- 支持自定义样式和类名，方便进行主题定制

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 `<label>` 和 `<input type="checkbox">` 元素
- 支持键盘导航和操作（可通过 Tab 键聚焦，空格键切换）
- 使用 role="checkbox" 和 aria-checked 属性增强语义
- 复选框组使用 role="group" 增强语义
- 不确定状态下使用 aria-checked="mixed" 表示半选状态
- 禁用状态下使用 aria-disabled="true" 表示交互限制
- 标签文本与复选框关联，增大可点击区域
- 可通过 ARIA 属性增强屏幕阅读器的使用体验
- 足够的颜色对比度确保状态可识别性
- 支持键盘焦点的视觉提示，使用 :focus-visible 实现

## 5. Vue 组件 API

### JvCheckbox Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean \| Array<string \| number> | undefined | 绑定值 |
| label | string \| number | undefined | 选项标签，当绑定值为数组时作为选中值 |
| disabled | boolean | false | 是否禁用 |
| required | boolean | false | 是否必填，显示红色星号 |
| indeterminate | boolean | false | 是否为不确定状态（半选状态） |
| name | string | undefined | 原生 name 属性 |
| trueValue | any | undefined | 选中时的值 |
| falseValue | any | undefined | 未选中时的值 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 复选框尺寸 |
| customStyle | Record<string, string> | undefined | 自定义样式 |
| customClass | string \| string[] \| Record<string, boolean> | undefined | 自定义类名 |

### JvCheckbox Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击复选框时触发 |
| update:modelValue | (value: any) | 复选框状态变化时触发 |

### JvCheckbox Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于自定义标签内容 |

### JvCheckbox Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus | - | 使复选框获取焦点 |
| blur | - | 使复选框失去焦点 |

### JvCheckboxGroup Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Array<string \| number> | [] | 选中的值数组 |
| disabled | boolean | false | 是否禁用整个复选框组 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 尺寸，会被应用到所有子复选框 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 复选框组方向 |
| max | number | undefined | 最大可选数量 |
| gap | number \| string | 12 | 子选项之间的间距 |
| customStyle | Record<string, string> | undefined | 自定义样式 |
| customClass | string \| string[] \| Record<string, boolean> | undefined | 自定义类名 |

### JvCheckboxGroup Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: (string \| number)[]) | 复选框组值变化时触发 |
| change | (value: (string \| number)[]) | 复选框组值变化时触发 |

### JvCheckboxGroup Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于放置复选框 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| CB-002 | 状态切换 | 验证点击复选框是否切换状态 | 1. 引入组件<br>2. 点击复选框 | 状态应该从 false 变为 true | ✅ |
| CB-003 | 键盘操作 | 验证键盘操作功能 | 1. 使用Tab聚焦<br>2. 按空格键 | 状态应该切换 | ✅ |
| CB-004 | 复选框组 | 验证复选框组功能 | 1. 使用复选框组<br>2. 点击复选框 | 组值数组应该正确更新 | ✅ |

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
| CB-108 | 自定义样式 | 验证自定义样式的效果 | 1. 设置 customStyle 属性<br>2. 检查样式变化 | 正确应用自定义样式 | ✅ |
| CB-109 | 自定义类名 | 验证自定义类名的效果 | 1. 设置 customClass 属性<br>2. 检查类名变化 | 正确应用自定义类名 | ✅ |
| CB-110 | 最大选择数量 | 验证max属性的效果 | 1. 设置max属性<br>2. 选择达到最大数量 | 其他选项被禁用 | ✅ |
| CB-111 | 组方向设置 | 验证direction属性的效果 | 1. 设置direction属性<br>2. 检查布局变化 | 复选框按设定方向排列 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-201 | 更新事件 | 验证 update:modelValue 事件 | 1. 监听事件<br>2. 点击复选框 | 事件被触发且值正确 | ✅ |
| CB-202 | 点击事件 | 验证 click 事件 | 1. 监听事件<br>2. 点击复选框 | 事件被触发且事件对象正确 | ✅ |
| CB-203 | 组变化事件 | 验证 change 事件 | 1. 监听事件<br>2. 在组中点击复选框 | 事件被触发且值正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 正确显示自定义内容 | ✅ |
| CB-302 | 组默认插槽 | 验证组默认插槽内容 | 1. 在组中放置多个复选框<br>2. 检查渲染结果 | 复选框正确显示在组中 | ✅ |

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
| CB-503 | 响应式布局 | 验证在不同尺寸下的响应性 | 1. 在不同容器尺寸下渲染<br>2. 检查布局适应性 | 在各种容器中都能正确显示 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CB-601 | 键盘操作 | 验证键盘操作功能 | 1. 使用 Tab 聚焦<br>2. 使用空格键切换 | 可以通过键盘操作复选框 | ✅ |
| CB-602 | 标签关联 | 验证标签与复选框的关联 | 1. 点击标签文本<br>2. 检查复选框状态 | 点击标签可以切换复选框状态 | ✅ |
| CB-603 | ARIA属性 | 验证ARIA属性的正确性 | 1. 检查role属性<br>2. 检查aria-checked属性<br>3. 检查aria-disabled属性 | 所有ARIA属性正确设置 | ✅ |
| CB-604 | 焦点指示器 | 验证焦点状态视觉提示 | 1. 使用Tab键聚焦<br>2. 检查焦点视觉效果 | 显示明显的焦点指示器 | ✅ |
| CB-605 | 组ARIA属性 | 验证组ARIA属性的正确性 | 1. 检查role="group"属性 | 正确设置组角色 | ✅ |

## 7. 性能优化

组件采用了以下性能优化措施：

1. **响应式优化**：
   - 使用 computed 缓存计算结果，避免重复计算
   - 减少响应式依赖，优化渲染性能

2. **渲染优化**：
   - 使用 v-if 条件性渲染非必要元素
   - 优化类名和样式计算逻辑

3. **CSS优化**：
   - 使用CSS变量提高主题定制能力
   - 减少CSS选择器特殊性，提高可维护性
   - 简化过渡动画，减少重绘和重排
   - 使用:where()选择器降低特殊性，提高可覆盖性

4. **可访问性优化**：
   - 添加键盘导航支持
   - 使用合适的ARIA属性增强语义
   - 添加焦点视觉指示器
   - 支持屏幕阅读器

5. **组件通信优化**：
   - 使用依赖注入（provide/inject）减少props透传
   - 优化复选框组内部通信机制

## 8. 使用示例

### 8.1 基础用法
```vue
<template>
  <JvCheckbox v-model="checked" label="同意协议" />
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const checked = ref(false)
</script>
```

### 8.2 复选框组
```vue
<template>
  <div class="checkbox-group">
    <h4>选择水果 (已选: {{ checkedFruits.length }})</h4>
    <JvCheckbox v-model="checkedFruits" label="苹果" />
    <JvCheckbox v-model="checkedFruits" label="香蕉" />
    <JvCheckbox v-model="checkedFruits" label="橙子" />
    <JvCheckbox v-model="checkedFruits" label="葡萄" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const checkedFruits = ref(['苹果'])
</script>
```

### 8.3 自定义值
```vue
<template>
  <div class="status-toggle">
    <JvCheckbox
      v-model="status"
      label="系统状态"
      true-value="active"
      false-value="inactive"
    />
    <div>当前状态: {{ status }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const status = ref('inactive')
</script>
```

### 8.4 不确定状态
```vue
<template>
  <div class="parent-child-selection">
    <JvCheckbox
      v-model="parentChecked"
      :indeterminate="indeterminate"
      label="全选"
      @click="handleParentClick"
    />
    <div class="child-items">
      <JvCheckbox v-model="childChecked.item1" label="选项1" />
      <JvCheckbox v-model="childChecked.item2" label="选项2" />
      <JvCheckbox v-model="childChecked.item3" label="选项3" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const parentChecked = ref(false)
const indeterminate = ref(false)
const childChecked = reactive({
  item1: false,
  item2: false,
  item3: false,
})

// 监听子项变化，更新父项状态
watch(childChecked, (newVal) => {
  const values = Object.values(newVal)
  const checkedCount = values.filter(v => v).length
  
  indeterminate.value = checkedCount > 0 && checkedCount < values.length
  parentChecked.value = checkedCount === values.length
})

// 处理父项点击
function handleParentClick() {
  const newVal = !parentChecked.value
  Object.keys(childChecked).forEach(key => {
    childChecked[key] = newVal
  })
  indeterminate.value = false
}
</script>
```

### 8.5 使用自定义样式
```vue
<template>
  <JvCheckbox
    v-model="checked"
    label="自定义样式"
    :customStyle="{
      '--jv-theme-primary': '#ff5722',
    }"
    :customClass="['custom-checkbox', { 'is-important': isImportant }]"
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox } from '@/components/jv-checkbox'

const checked = ref(false)
const isImportant = ref(true)
</script>

<style>
.custom-checkbox {
  font-weight: bold;
}
.is-important {
  color: #ff5722;
}
</style>
```

### 8.6 复选框组用法
```vue
<template>
  <div>
    <h4>选择颜色 (最多选3个):</h4>
    <JvCheckboxGroup 
      v-model="selectedColors" 
      :max="3" 
      direction="vertical"
      :gap="16"
      @change="handleColorChange"
    >
      <JvCheckbox label="红色" />
      <JvCheckbox label="蓝色" />
      <JvCheckbox label="绿色" />
      <JvCheckbox label="黄色" />
      <JvCheckbox label="紫色" />
    </JvCheckboxGroup>
    
    <div class="selected-info">
      已选颜色: {{ selectedColors.join(', ') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox, JvCheckboxGroup } from '@/components/jv-checkbox'

const selectedColors = ref(['红色'])

function handleColorChange(colors) {
  console.log('颜色选择已更新:', colors)
}
</script>

<style>
.selected-info {
  margin-top: 16px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

### 8.7 禁用整个组
```vue
<template>
  <div>
    <JvCheckboxGroup 
      v-model="selectedOptions" 
      disabled
    >
      <JvCheckbox label="选项1" />
      <JvCheckbox label="选项2" />
      <JvCheckbox label="选项3" />
    </JvCheckboxGroup>
    
    <button @click="toggleDisabled">
      {{ groupDisabled ? '启用' : '禁用' }} 复选框组
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvCheckbox, JvCheckboxGroup } from '@/components/jv-checkbox'

const selectedOptions = ref(['选项1'])
const groupDisabled = ref(true)

function toggleDisabled() {
  groupDisabled.value = !groupDisabled.value
}
</script>
```
