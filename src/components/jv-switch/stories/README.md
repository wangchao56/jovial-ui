# JvSwitch 开关组件

## 1. 组件介绍
`JvSwitch` 是一个用于在两种状态间切换的组件，通常用于开启/关闭某个功能。组件提供了丰富的自定义选项，包括不同的尺寸、颜色、变体样式，以及文本和图标的定制能力。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 开关轨道区域 (track)
- 开关圆点/方形区域 (thumb)
- 图标区域 (icon)
- 文本区域 (text-on/text-off)

### 基本使用示例
```vue
<template>
  <!-- 基础用法 -->
  <JvSwitch v-model="value" />
  
  <!-- 带文本 -->
  <JvSwitch v-model="value" activeText="开启" inactiveText="关闭" />
  
  <!-- 不同尺寸 -->
  <JvSwitch v-model="value" size="large" />
  
  <!-- 不同变体样式 -->
  <JvSwitch v-model="value" variant="outside" />
  
  <!-- 不同颜色 -->
  <JvSwitch v-model="value" color="success" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 点击切换：点击开关可以在两种状态间切换
- 键盘操作：支持通过空格键和回车键切换开关状态
- 悬停效果：鼠标悬停时会有视觉反馈
- 涟漪效果：点击时会有涟漪动画效果
- 过渡动画：状态变化时有平滑的过渡效果
- 禁用/只读状态：禁止用户交互并提供视觉反馈
- 加载状态：显示加载动画，表示状态正在变更

不同变体提供不同的视觉效果：
- inside 变体：开关点在轨道内部移动
- outside 变体：开关点在轨道外部移动

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用 `role="switch"` 语义角色
- 提供 `aria-checked` 属性表示当前状态
- 提供 `aria-disabled` 属性表示禁用状态
- 提供 `aria-readonly` 属性表示只读状态
- 支持键盘导航（Tab键）和操作（空格键、回车键）
- 提供足够的对比度确保可见性
- 状态变化时提供视觉和文本反馈

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean / string / number | false | 开关的值 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| size | 'tiny' / 'small' / 'medium' / 'large' / 'xlarge' | 'medium' | 开关尺寸 |
| color | 'default' / 'primary' / 'secondary' / 'success' / 'warning' / 'error' / 'info' | 'primary' | 开关颜色 |
| variant | 'inside' / 'outside' | 'inside' | 开关样式类型 |
| activeText | string | - | 打开时的文本 |
| inactiveText | string | - | 关闭时的文本 |
| activeValue | boolean / string / number | true | 打开时的值 |
| inactiveValue | boolean / string / number | false | 关闭时的值 |
| showIcon | boolean | true | 是否显示内部图标 |
| loading | boolean | false | 是否为加载状态 |
| square | boolean | false | 是否为方形开关 |
| name | string | - | 表单提交时的名称 |
| ripple | boolean | true | 是否启用涟漪效果 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: boolean / string / number) | 开关值变化时触发 |
| change | (value: boolean / string / number) | 开关状态变化时触发 |
| click | (event: MouseEvent) | 点击开关时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| activeIcon | 开关打开时的图标 |
| inactiveIcon | 开关关闭时的图标 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| SW-002 | 状态切换 | 验证点击开关是否切换状态 | 1. 引入组件<br>2. 点击开关 | 状态应该从 false 变为 true | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-101 | 尺寸设置 | 验证不同尺寸属性的效果 | 1. 设置不同的 size 属性<br>2. 检查样式变化 | 应用对应的尺寸类名 | ✅ |
| SW-102 | 颜色设置 | 验证不同颜色属性的效果 | 1. 设置不同的 color 属性<br>2. 检查样式变化 | 应用对应的颜色类名 | ✅ |
| SW-103 | 变体设置 | 验证不同变体属性的效果 | 1. 设置不同的 variant 属性<br>2. 检查样式变化 | 应用对应的变体类名 | ✅ |
| SW-104 | 禁用状态 | 验证禁用状态的效果 | 1. 设置 disabled 属性<br>2. 尝试点击开关 | 禁用样式正确且无法点击 | ✅ |
| SW-105 | 只读状态 | 验证只读状态的效果 | 1. 设置 readonly 属性<br>2. 尝试点击开关 | 只读样式正确且无法点击 | ✅ |
| SW-106 | 加载状态 | 验证加载状态的效果 | 1. 设置 loading 属性<br>2. 检查加载图标 | 显示加载图标且无法点击 | ✅ |
| SW-107 | 方形开关 | 验证方形开关的效果 | 1. 设置 square 属性<br>2. 检查样式变化 | 开关变为方形 | ✅ |
| SW-108 | 文本显示 | 验证文本显示效果 | 1. 设置 activeText/inactiveText 属性<br>2. 检查文本显示 | 正确显示对应状态的文本 | ✅ |
| SW-109 | 自定义值 | 验证自定义值的效果 | 1. 设置 activeValue/inactiveValue 属性<br>2. 切换开关 | 正确返回对应状态的值 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-201 | 更新事件 | 验证 update:modelValue 事件 | 1. 监听事件<br>2. 点击开关 | 事件被触发且值正确 | ✅ |
| SW-202 | 变更事件 | 验证 change 事件 | 1. 监听事件<br>2. 点击开关 | 事件被触发且值正确 | ✅ |
| SW-203 | 点击事件 | 验证 click 事件 | 1. 监听事件<br>2. 点击开关 | 事件被触发且事件对象正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-301 | 激活图标 | 验证 activeIcon 插槽 | 1. 设置 activeIcon 插槽内容<br>2. 切换到激活状态 | 正确显示自定义激活图标 | ✅ |
| SW-302 | 未激活图标 | 验证 inactiveIcon 插槽 | 1. 设置 inactiveIcon 插槽内容<br>2. 切换到未激活状态 | 正确显示自定义未激活图标 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-401 | 过渡效果 | 验证状态切换的过渡效果 | 1. 切换开关状态<br>2. 观察过渡动画 | 平滑的过渡动画效果 | ✅ |
| SW-402 | 涟漪效果 | 验证点击时的涟漪效果 | 1. 点击开关<br>2. 观察涟漪动画 | 有可见的涟漪效果 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SW-501 | ARIA 属性 | 验证 ARIA 属性设置 | 1. 检查 ARIA 属性<br>2. 切换开关状态 | 正确设置 role 和 aria 属性 | ✅ |
| SW-502 | 键盘操作 | 验证键盘操作功能 | 1. 使用 Tab 聚焦<br>2. 使用空格键切换 | 可以通过键盘操作开关 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
<JvSwitch v-model="value" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>
```

### 带文本
```vue
<template>
<JvSwitch v-model="value" activeText="开启" inactiveText="关闭" />
</template>
```

### 不同尺寸
```vue
<template>
<JvSwitch v-model="value" size="tiny" />
<JvSwitch v-model="value" size="small" />
<JvSwitch v-model="value" size="medium" />
<JvSwitch v-model="value" size="large" />
<JvSwitch v-model="value" size="xlarge" />
</template>
```

### 不同颜色
```vue
<template>
<JvSwitch v-model="value" color="primary" />
<JvSwitch v-model="value" color="secondary" />
<JvSwitch v-model="value" color="success" />
<JvSwitch v-model="value" color="warning" />
<JvSwitch v-model="value" color="error" />
<JvSwitch v-model="value" color="info" />
</template>
```

### 自定义图标
```vue
<template>
<JvSwitch v-model="value">
  <template #activeIcon>
    <JvIcon name="$check" />
  </template>
  <template #inactiveIcon>
    <JvIcon name="$close" />
  </template>
</JvSwitch>
</template>
```
