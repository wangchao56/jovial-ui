# JvCollapse 折叠面板组件

## 1. 组件介绍

JvCollapse是一个可折叠的内容面板组件，用于在有限空间内组织和展示内容。它允许用户通过点击标题栏来展开或折叠内容区域，实现内容的分层展示和交互。组件支持多种样式变体、尺寸和自定义选项，适用于各种场景，如FAQ列表、设置面板、分类导航等。

## 2. 布局结构使用方式

JvCollapse组件由标题区域和内容区域组成。标题区域包含可选的前置图标、标题文本和后置箭头图标；内容区域可放置任意内容，支持懒加载。

基本使用示例：

```vue
<template>
  <JvCollapse title="折叠面板标题">
    <div>折叠面板的内容区域</div>
  </JvCollapse>
</template>
```

组合使用示例（使用JvCollapseGroup）：

```vue
<template>
  <JvCollapseGroup :accordion="true">
    <JvCollapse title="第一个面板">
      <div>第一个面板的内容</div>
    </JvCollapse>
    <JvCollapse title="第二个面板">
      <div>第二个面板的内容</div>
    </JvCollapse>
  </JvCollapseGroup>
</template>
```

## 3. 样式

JvCollapse支持三种样式变体和三种尺寸，可以根据不同场景选择合适的样式。

样式变体：
- `elevated`: 默认样式，带有阴影效果，突出视觉层次
- `flat`: 扁平样式，无阴影和边框，适合轻量级界面
- `outlined`: 边框样式，使用边框代替阴影，适合需要明确边界的场景

尺寸选项：
- `small`: 小尺寸，适合空间紧凑的场景
- `medium`: 中等尺寸（默认），适合大多数场景
- `large`: 大尺寸，适合触摸屏或需要更大点击区域的场景

使用样式示例：

```vue
<template>
  <JvCollapse 
    title="自定义样式折叠面板" 
    variant="outlined" 
    size="large"
    width="500px"
  >
    <div>内容区域</div>
  </JvCollapse>
</template>
```

## 4. 交互设计

JvCollapse组件提供以下交互特性：

1. **展开/折叠动画**：点击标题区域时，内容区域会平滑地展开或折叠，动画时长可自定义
2. **状态同步**：组件内部状态与v-model双向绑定，可以通过代码控制展开状态
3. **手风琴模式**：在JvCollapseGroup中使用accordion属性，实现一次只能展开一个面板的交互模式
4. **键盘支持**：可以通过Enter或Space键触发展开/折叠操作，提高可访问性
5. **懒加载**：支持懒加载内容，仅在首次展开时渲染内容，提高性能

交互使用示例：

```vue
<template>
  <JvCollapse 
    v-model="isExpanded" 
    title="可控制的折叠面板"
    @expand="handleExpand"
    @collapse="handleCollapse"
  >
    <div>内容区域</div>
  </JvCollapse>
  
  <button @click="isExpanded = !isExpanded">
    {{ isExpanded ? '收起' : '展开' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

function handleExpand() {
  console.log('面板已展开')
}

function handleCollapse() {
  console.log('面板已折叠')
}
</script>
```

## 5. 可访问性

JvCollapse组件遵循WAI-ARIA规范，确保对所有用户的可访问性：

1. 使用适当的ARIA角色和属性：
   - `role="button"` 用于标题区域
   - `role="region"` 用于内容区域
   - `aria-expanded` 指示当前展开状态
   - `aria-disabled` 表示禁用状态
   - `aria-hidden` 控制内容区域的可见性

2. 键盘导航支持：
   - 可通过Tab键聚焦到折叠面板
   - 使用Enter或Space键触发展开/折叠操作

3. 屏幕阅读器支持：
   - 提供合适的标签和状态指示，确保屏幕阅读器用户能够理解组件状态
   - 内容区域的显示/隐藏对屏幕阅读器正确暴露

## 6. Vue API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| modelValue | Boolean | false | 是否展开，可使用v-model绑定 |
| title | String | '' | 折叠区域标题 |
| icon | String | '' | 标题图标 |
| variant | String | 'elevated' | 样式变体，可选值：'elevated'、'flat'、'outlined' |
| showArrow | Boolean | true | 是否显示箭头 |
| collapseIcon | String | '$chevronDown' | 折叠状态的图标 |
| expandIcon | String | '$chevronUp' | 展开状态的图标 |
| duration | Number | 300 | 动画持续时间，单位毫秒 |
| class | String | '' | 自定义类名 |
| style | CSSProperties | {} | 自定义样式 |
| width | String | - | 宽度 |
| maxWidth | String | - | 最大宽度 |
| disabled | Boolean | false | 是否禁用 |
| size | String | 'medium' | 组件尺寸，可选值：'small'、'medium'、'large' |

### 事件 (Emits)

| 事件名 | 参数 | 说明 |
| ------ | ---- | ---- |
| update:modelValue | (value: boolean) | 更新展开状态 |
| expand | - | 展开事件 |
| collapse | - | 折叠事件 |

### 插槽 (Slots)

| 插槽名 | 说明 |
| ------ | ---- |
| default | 折叠区域内容 |
| header | 头部插槽，参数：{ expanded, disabled } |
| title | 标题插槽 |
| prepend | 前置图标插槽 |
| append | 箭头图标插槽 |

### JvCollapseGroup API

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| accordion | Boolean | false | 是否为手风琴模式（同时只能展开一个面板） |
| modelValue | Array | [] | 当前展开的折叠面板的name列表 |
| variant | String | - | 样式变体，可选值：'outlined'、'elevated'、'flat' |
| divider | Boolean | false | 是否显示分割线 |
| rounded | Boolean | false | 是否圆角 |
| elevated | Boolean | false | 是否使用阴影 |
| size | String | 'medium' | 组件尺寸，可选值：'small'、'medium'、'large' |

#### 事件 (Emits)

| 事件名 | 参数 | 说明 |
| ------ | ---- | ---- |
| update:modelValue | (names: string[]) | 展开状态变化时触发 |
| change | (names: string[]) | 当展开状态变化时触发 |

## 7. 测试用例

JvCollapse组件包含全面的测试用例，确保组件功能稳定可靠。测试用例包括：

1. 基础功能测试：验证组件基本渲染和展开/折叠功能
2. Props功能测试：验证各种属性设置的正确应用
3. 事件测试：确保事件正确触发
4. 插槽测试：验证各插槽正确渲染
5. 样式测试：确认不同变体和尺寸下的样式应用
6. 可访问性测试：验证ARIA属性和键盘操作

## 8. 使用场景示例

JvCollapse组件适用于多种场景：

1. **FAQ页面**：展示常见问题和答案
2. **设置面板**：分类展示不同的设置选项
3. **详情展示**：在列表中展示项目的详细信息
4. **分类导航**：构建分层次的导航菜单
5. **表单分组**：将复杂表单分成多个部分，提高可用性
