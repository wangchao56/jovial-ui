# JvAlert 警告提示组件

## 组件介绍

JvAlert 组件用于显示警告提示信息，支持多种类型的提示样式，可以帮助用户了解站点状态或操作反馈。

## 布局结构和使用方式

JvAlert 组件由图标区域、内容区域和操作区域组成。组件支持四种不同类型的提示样式：成功、警告、信息和错误。

基本使用示例：

```vue
<template>
  <jv-alert type="success" title="成功标题" description="这是一条成功提示信息" />
  <jv-alert type="warning" description="这是一条警告提示信息" />
  <jv-alert type="info" description="这是一条信息提示信息" />
  <jv-alert type="error" description="这是一条错误提示信息" />
</template>
```

## 交互设计

JvAlert 组件可以设置为可关闭的，用户点击关闭按钮后，会触发关闭事件并隐藏提示信息。组件支持动画效果，在显示和隐藏时都有平滑的过渡动画。

组件还支持多种样式风格，包括轮廓样式、自定义颜色和自定义背景色等。

## 可访问性

JvAlert 组件具有良好的可访问性设计：
- 使用 `role="alert"` 属性标记组件，使其在屏幕阅读器中正确识别
- 关闭按钮具有 `aria-label="关闭"` 属性，提供屏幕阅读器用户明确的操作信息
- 良好的焦点状态样式，用户在使用键盘导航时能清晰看到当前聚焦元素

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'success' \| 'warning' \| 'info' \| 'error' | 'info' | 警告提示类型 |
| closable | boolean | false | 是否可关闭 |
| title | string | - | 警告标题 |
| description | string | - | 警告描述内容 |
| icon | string | - | 自定义图标名称 |
| showIcon | boolean | true | 是否显示图标 |
| outlined | boolean | false | 是否使用轮廓风格 |
| color | string | - | 自定义颜色 |
| background | string | - | 自定义背景色 |
| rounded | RoundedType | 'none' | 圆角类型 |
| visible | boolean | true | 是否显示 |

### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| close | - | 关闭警告提示时触发 |
| update:visible | value: boolean | 更新可见状态时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 警告提示内容，默认展示 description 属性内容 |
| title | 标题内容，默认展示 title 属性内容 |
| icon | 图标内容，默认根据 type 类型显示对应图标 |
| action | 操作区域内容，默认展示关闭按钮 |

### Expose

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| close | - | void | 手动关闭警告提示 |

## 测试用例

### 基础功能测试
- 测试组件基本渲染
- 测试四种不同类型的提示样式

### Props 功能测试
- 测试设置标题
- 测试轮廓样式
- 测试隐藏/自定义图标
- 测试显示关闭按钮

### Emits 事件测试
- 测试关闭按钮点击事件触发 close 和 update:visible 事件

### Slots 插槽测试
- 测试默认插槽
- 测试标题插槽
- 测试图标插槽
- 测试操作区域插槽

### Expose API 测试
- 测试暴露的 close 方法

### 样式测试
- 测试不同类型的样式应用
- 测试图标颜色和类型

### 可访问性测试
- 测试 role 属性
- 测试关闭按钮的 aria-label 属性

## 使用示例

### 基础用法

```vue
<template>
  <jv-alert type="info" description="这是一条信息提示" />
</template>
```

### 带标题的提示

```vue
<template>
  <jv-alert
    type="success"
    title="操作成功"
    description="数据已成功保存到数据库"
  />
</template>
```

### 可关闭的提示

```vue
<template>
  <jv-alert
    type="warning"
    title="注意"
    description="这个操作无法撤销"
    closable
  />
</template>
```

### 轮廓样式

```vue
<template>
  <jv-alert
    type="error"
    title="错误"
    description="服务器连接失败"
    outlined
  />
</template>
```

### 自定义图标

```vue
<template>
  <jv-alert
    type="info"
    title="提示"
    description="自定义图标示例"
    icon="star"
  />
</template>
```

### 无图标

```vue
<template>
  <jv-alert
    type="success"
    title="成功"
    description="无图标示例"
    :show-icon="false"
  />
</template>
```

### 自定义颜色

```vue
<template>
  <jv-alert
    title="自定义颜色"
    description="使用自定义颜色的提示"
    color="#8e44ad"
    background="#f5eef8"
  />
</template>
```

### 使用插槽

```vue
<template>
  <jv-alert type="info">
    <template #title>
      <span class="custom-title">自定义标题</span>
    </template>
    <template #default>
      <p>这是使用默认插槽的内容</p>
      <p>可以包含<b>复杂的HTML</b>内容</p>
    </template>
    <template #icon>
      <jv-icon name="favorite" color="red" />
    </template>
  </jv-alert>
</template>
```

### 圆角样式

```vue
<template>
  <jv-alert
    type="success"
    title="圆角样式"
    description="使用圆角样式的提示"
    rounded="lg"
  />
</template>
```

### 结合v-model使用

```vue
<template>
  <jv-alert
    v-model:visible="alertVisible"
    type="warning"
    title="注意"
    description="3秒后自动关闭"
    closable
  />
  <jv-button @click="alertVisible = true">显示提示</jv-button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const alertVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    alertVisible.value = false
  }, 3000)
})
</script>
```

### 使用暴露的方法

```vue
<template>
  <jv-alert
    ref="alertRef"
    type="info"
    title="提示"
    description="点击按钮关闭此提示"
  />
  <jv-button @click="closeAlert">关闭提示</jv-button>
</template>

<script setup>
import { ref } from 'vue'

const alertRef = ref(null)

const closeAlert = () => {
  alertRef.value.close()
}
</script>
``` 