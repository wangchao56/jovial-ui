# JvButton 按钮组件

## 组件介绍
`JvButton` 是一个功能丰富的按钮组件，遵循 Material Design 设计规范，提供多种样式变体、尺寸和颜色选项。它支持图标、加载状态等功能，并可用于表单提交、普通按钮点击等场景。

## 布局结构使用方式
组件采用以下布局结构：
- 前置图标区域 (prepend)：放置在内容前的图标
- 内容区域 (content)：按钮的主要文本内容
- 后置图标区域 (append)：放置在内容后的图标
- 图标专用区域 (icon)：纯图标按钮的内容区域
- 加载状态区域 (loading)：显示加载动画的区域


基本使用示例：

```vue
<template>
  <!-- 不同变体 -->
  <JvButton variant="elevated">凸起按钮</JvButton>
  <JvButton variant="outlined">描边按钮</JvButton>
  <JvButton variant="text">文本按钮</JvButton>

  <!-- 不同尺寸 -->
  <JvButton size="small">小按钮</JvButton>
  <JvButton>默认按钮</JvButton>
  <JvButton size="large">大按钮</JvButton>

  <!-- 不同颜色 -->
  <JvButton color="primary">主要按钮</JvButton>
  <JvButton color="success">成功按钮</JvButton>
  <JvButton color="warning">警告按钮</JvButton>
</template>
<button>
  <!-- 涟漪效果层/遮罩层 -->
  <span class="jv-button__overlay"></span>
  <!-- 图标按钮模式 -->
  <span v-if="isIconOnly" :class="bem.e('content')">
    <slot name="icon">
      <JvIcon v-bind="iconProps" :class="bem.e('icon')"></JvIcon>
    </slot>
  </span>

  <!-- 普通按钮模式 -->
  <template v-else>
    <!-- 前置图标 -->
    <span v-if="showPrepend" :class="bem.e('prepend')">
      <slot name="prepend">
        <JvIcon v-bind="prependIconProps" :class="bem.e('icon')"></JvIcon>
      </slot>
    </span>

    <!-- 加载指示器 -->
    <span v-if="loading" :class="bem.e('loading')">
      <slot name="loader">
        <JvLoader/>
      </slot>
    </span>

    <!-- 按钮内容 -->
    <span :class="bem.e('content')">
      <slot>{{ content }}</slot>
    </span>

    <!-- 后置图标 -->
    <span v-if="showAppend" :class="bem.e('append')">
      <slot name="append">
        <JvIcon v-bind="appendIconProps" :class="bem.e('icon')"></JvIcon>
      </slot>
    </span>
  </template>
</button>

```

## 交互设计
组件提供以下交互效果：
- **悬停效果**：鼠标悬停时有轻微的背景色变化
- **点击反馈**：点击时有视觉反馈效果
- **加载状态**：通过 loading 属性显示加载动画，替代按钮内容
- **禁用状态**：通过 disabled 属性使按钮无法点击并改变外观

特殊交互：
- 不同变体类型有不同的交互视觉反馈：
  - elevated 按钮在悬停和点击时会改变阴影深度
  - outlined 和 dashed 按钮会有边框颜色变化
  - text 和 tonal 按钮会有背景色透明度变化
- 块级按钮会自动充满父容器宽度
- 堆叠模式下，图标和文本垂直排列

## 可访问性
组件遵循 WCAG 无障碍标准：
- **语义化结构**：使用语义化的 `<button>` 元素作为根元素
- **ARIA 支持**：提供 `role="button"` ARIA 角色
- **禁用状态**：在禁用状态下设置 `aria-disabled="true"`
- **图标按钮**：为纯图标按钮提供 `aria-label` 属性表明按钮用途
- **键盘导航**：支持键盘导航和聚焦（通过 tab 键）
- **自动聚焦**：通过 autofocus 属性支持自动聚焦功能
- **视觉对比**：足够的色彩对比度确保可读性

## Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| colorType | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | 按钮颜色类型 |
| size | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 按钮尺寸 |
| disabled | boolean | false | 是否禁用按钮 |
| shape | 'square' \| 'rounded' \| 'pill' | 'square' | 按钮形状 |
| variant | 'elevated' \| 'outlined' \| 'text' \| 'tonal' \| 'filled' \| 'dashed' | 'elevated' | 按钮变体样式 |
| icon | string | undefined | 按钮图标名称 |
| block | boolean | false | 是否为块级按钮（占满容器宽度） |
| prependIcon | string | undefined | 按钮内容前的图标 |
| appendIcon | string | undefined | 按钮内容后的图标 |
| stacked | boolean | false | 是否堆叠显示（垂直排列） |
| autofocus | boolean | false | 是否自动获取焦点 |
| loading | boolean | false | 是否显示加载状态 |
| nativeType | 'button' \| 'submit' \| 'reset' | 'button' | 原生按钮类型 |
| content | string | undefined | 按钮文本内容 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 按钮点击事件 |
| focus | (event: FocusEvent) | 按钮获取焦点事件 |
| blur | (event: FocusEvent) | 按钮失去焦点事件 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容插槽 |
| prepend | 按钮前置内容插槽 |
| append | 按钮后置内容插槽 |
| icon | 图标按钮内容插槽 |
| loader | 加载状态自定义插槽 |

## 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BT-001 | 基本渲染 | 验证按钮能够正确渲染基本内容 | 1. 挂载JvButton组件<br>2. 检查组件类名和标签 | 组件应正确渲染为button元素并包含jv-button类名 | ✅ |
| BT-002 | 内容渲染 | 验证按钮能正确显示文本内容 | 1. 挂载JvButton组件并设置content属性或默认插槽<br>2. 检查按钮内容 | 按钮应显示设置的文本内容 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BT-101 | 颜色类型 | 验证不同colorType属性的效果 | 1. 分别挂载不同colorType的JvButton<br>2. 检查不同colorType的按钮样式 | 不同颜色类型的按钮应有对应的样式类 | ✅ |
| BT-102 | 尺寸设置 | 验证不同size属性的效果 | 1. 分别挂载不同size的JvButton<br>2. 检查不同size的按钮样式 | 不同尺寸的按钮应有对应的样式类 | ✅ |
| BT-103 | 禁用状态 | 验证禁用状态的按钮 | 1. 挂载disabled=true的JvButton<br>2. 尝试点击按钮<br>3. 检查样式和行为 | 按钮应有禁用样式且点击事件不应触发 | ✅ |
| BT-104 | 加载状态 | 验证加载状态的按钮 | 1. 挂载loading=true的JvButton<br>2. 检查加载状态显示和按钮行为 | 按钮应显示加载动画并阻止点击行为 | ✅ |
| BT-105 | 变体样式 | 验证不同variant属性的效果 | 1. 分别挂载不同variant的JvButton<br>2. 检查不同variant的按钮样式 | 不同变体的按钮应有对应的样式类和视觉效果 | ✅ |
| BT-106 | 图标按钮 | 验证包含图标的按钮 | 1. 挂载设置了icon属性的JvButton<br>2. 检查图标是否正确显示 | 按钮应正确显示指定的图标 | ✅ |
| BT-107 | 块级按钮 | 验证块级按钮样式 | 1. 挂载block=true的JvButton<br>2. 检查按钮宽度样式 | 按钮应占据父容器的完整宽度 | ✅ |
| BT-108 | 形状设置 | 验证不同shape属性的效果 | 1. 分别挂载不同shape的JvButton<br>2. 检查不同shape的按钮样式 | 不同形状的按钮应有对应的圆角样式 | ✅ |
| BT-109 | 前置图标 | 验证前置图标显示 | 1. 挂载设置了prependIcon的JvButton<br>2. 检查图标是否正确显示在内容前 | 前置图标应正确显示在按钮内容前 | ✅ |
| BT-110 | 后置图标 | 验证后置图标显示 | 1. 挂载设置了appendIcon的JvButton<br>2. 检查图标是否正确显示在内容后 | 后置图标应正确显示在按钮内容后 | ✅ |
| BT-111 | 自动焦点 | 验证自动焦点功能 | 1. 挂载autofocus=true的JvButton<br>2. 检查按钮是否获得焦点 | 按钮应在挂载后自动获得焦点 | ✅ |
| BT-112 | 原生类型 | 验证nativeType属性 | 1. 挂载不同nativeType的JvButton<br>2. 检查按钮的type属性 | 按钮的type属性应与设置的nativeType一致 | ✅ |
| BT-113 | 堆叠布局 | 验证堆叠布局显示 | 1. 挂载stacked=true的JvButton<br>2. 检查按钮内容布局 | 按钮内容应垂直排列而非水平排列 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BT-201 | 点击事件 | 验证按钮点击事件触发 | 1. 挂载JvButton组件<br>2. 触发按钮点击<br>3. 检查事件是否被触发 | 点击后应触发click事件 | ✅ |
| BT-202 | 焦点事件 | 验证按钮焦点事件 | 1. 挂载JvButton组件<br>2. 触发focus和blur事件<br>3. 检查事件是否被触发 | 应正确触发focus和blur事件 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BT-301 | 默认插槽 | 验证默认插槽内容 | 1. 挂载JvButton并设置默认插槽内容<br>2. 检查内容是否正确显示 | 默认插槽内容应正确显示 | ✅ |
| BT-302 | 前置插槽 | 验证前置插槽内容 | 1. 挂载JvButton并设置prepend插槽内容<br>2. 检查内容是否正确显示 | 前置插槽内容应正确显示在按钮内容前 | ✅ |
| BT-303 | 后置插槽 | 验证后置插槽内容 | 1. 挂载JvButton并设置append插槽内容<br>2. 检查内容是否正确显示 | 后置插槽内容应正确显示在按钮内容后 | ✅ |
| BT-304 | 图标插槽 | 验证图标插槽内容 | 1. 挂载JvButton并设置icon插槽内容<br>2. 检查内容是否正确显示 | 图标插槽内容应正确显示 | ✅ |
| BT-305 | 加载插槽 | 验证加载插槽内容 | 1. 挂载loading=true的JvButton并设置loader插槽内容<br>2. 检查内容是否正确显示 | 加载插槽内容应正确显示 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BT-401 | ARIA属性 | 验证按钮的ARIA属性 | 1. 挂载不同状态的JvButton<br>2. 检查ARIA属性 | 按钮应具有正确的ARIA属性 | ✅ |
| BT-402 | 键盘操作 | 验证键盘操作支持 | 1. 挂载JvButton<br>2. 模拟键盘操作 | 可通过键盘聚焦和触发按钮 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvButton>默认按钮</JvButton>
  <JvButton color="primary">主要按钮</JvButton>
  <JvButton color="success">成功按钮</JvButton>
  <JvButton color="warning">警告按钮</JvButton>
  <JvButton color="error">错误按钮</JvButton>
  <JvButton color="info">信息按钮</JvButton>
</template>
```

### 不同变体样式
```vue
<template>
  <JvButton variant="elevated">凸起按钮</JvButton>
  <JvButton variant="outlined">描边按钮</JvButton>
  <JvButton variant="text">文本按钮</JvButton>
  <JvButton variant="tonal">渐变按钮</JvButton>
  <JvButton variant="filled">填充按钮</JvButton>
  <JvButton variant="dashed">虚线按钮</JvButton>
</template>
```

### 不同尺寸
```vue
<template>
  <JvButton size="small">小按钮</JvButton>
  <JvButton size="medium">中按钮</JvButton>
  <JvButton size="large">大按钮</JvButton>
  <JvButton size="xlarge">超大按钮</JvButton>
</template>
```

### 不同形状
```vue
<template>
  <JvButton shape="square">方形按钮</JvButton>
  <JvButton shape="rounded">圆角按钮</JvButton>
  <JvButton shape="pill">胶囊按钮</JvButton>
</template>
```

### 带图标的按钮
```vue
<template>
  <JvButton prepend-icon="$search">搜索</JvButton>
  <JvButton append-icon="$arrow-right">下一步</JvButton>
  <JvButton icon="$settings"></JvButton>
</template>
```

### 块级按钮
```vue
<template>
  <JvButton block color="primary">块级按钮</JvButton>
</template>
```

### 加载状态按钮
```vue
<template>
  <JvButton :loading="isLoading" @click="handleSubmit">
    {{ isLoading ? '提交中' : '提交' }}
  </JvButton>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

function handleSubmit() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>
```

### 禁用状态
```vue
<template>
  <JvButton disabled>禁用按钮</JvButton>
</template>
```

### 表单提交按钮
```vue
<template>
  <form @submit.prevent="onSubmit">
    <!-- 表单内容 -->
    <JvButton native-type="submit" color="primary">提交表单</JvButton>
    <JvButton native-type="reset">重置表单</JvButton>
  </form>
</template>

<script setup>
function onSubmit() {
  console.log('表单已提交')
}
</script>
```

### 自定义加载动画
```vue
<template>
  <JvButton :loading="true">
    <template #loader>
      <div class="custom-loader">加载中...</div>
    </template>
    提交
  </JvButton>
</template>

<style scoped>
.custom-loader {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: currentColor;
  opacity: 0.8;
}
</style>
``` 