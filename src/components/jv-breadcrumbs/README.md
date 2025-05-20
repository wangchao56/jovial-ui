# JvBreadcrumbs 面包屑导航

## 组件介绍

面包屑组件是网站导航的重要部分，用于展示当前页面在网站层级结构中的位置，帮助用户了解当前所处位置并提供返回上级页面的便捷方式。

## 布局结构使用方式

面包屑组件由两部分构成：
- `JvBreadcrumbs`：面包屑容器组件
- `JvBreadcrumbItem`：面包屑项组件

### 基本用法

有两种使用方式：
1. 通过`items`属性传入数据
2. 通过插槽自定义内容

```vue
<!-- 方式一：通过items属性 -->
<jv-breadcrumbs :items="[
  { text: '首页', to: '/' },
  { text: '产品中心', to: '/products' },
  { text: '智能手机', to: '/products/phones' }
]" />

<!-- 方式二：通过插槽 -->
<jv-breadcrumbs>
  <jv-breadcrumb-item text="首页" to="/" />
  <jv-breadcrumb-item text="产品中心" to="/products" />
  <jv-breadcrumb-item text="智能手机" active />
</jv-breadcrumbs>
```

## 交互设计

面包屑组件提供以下交互特性：
- 可点击的导航链接，支持路由跳转
- 最后一项自动标记为当前页面（active状态）
- 可禁用特定项
- 支持自定义分隔符
- 响应式设计，适应不同屏幕尺寸

## 可访问性

面包屑组件遵循WAI-ARIA规范，确保良好的可访问性支持：
- 使用`nav`和`ol`元素构建语义化结构
- 设置适当的`aria-label`属性
- 为禁用项设置正确的状态标记
- 确保键盘可访问性

## Vue 组件 API

### JvBreadcrumbs Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | `BreadcrumbItem[]` | `[]` | 面包屑项数组 |
| separator | `string` | `/` | 分隔符 |
| separatorIcon | `string` | - | 分隔符图标 |
| showHome | `boolean` | `true` | 是否显示首页 |
| homeText | `string` | `首页` | 首页文本 |
| homeTo | `string` | `/` | 首页链接 |
| homeIcon | `string` | - | 首页图标 |
| maxItems | `number` | `Infinity` | 最大显示层级 |

### JvBreadcrumbItem Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| to | `string` | - | 路由链接 |
| disabled | `boolean` | `false` | 是否禁用 |
| active | `boolean` | `false` | 是否为当前项 |
| text | `string` | - | 文本内容 |
| icon | `string` | - | 图标 |

### JvBreadcrumbs Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义面包屑内容 |
| separator | 自定义分隔符 |
| home | 自定义首页内容 |

### JvBreadcrumbItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义项内容 |
| icon | 自定义图标 |

### JvBreadcrumbItem Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `(event: MouseEvent)` | 点击面包屑项时触发 |

## 测试用例

### 基础功能测试
- 测试面包屑组件正确渲染
- 测试面包屑项数量符合预期

### Props 功能测试
- 测试自定义分隔符
- 测试首页显示控制
- 测试最大显示层级限制

### 面包屑项功能测试
- 测试链接功能
- 测试禁用状态
- 测试激活状态
- 测试图标显示

### Slots 插槽测试
- 测试自定义内容插槽
- 测试自定义分隔符插槽

### 样式测试
- 测试默认样式
- 测试响应式布局

### 可访问性测试
- 测试键盘操作
- 测试ARIA属性

## 使用示例

### 基本使用
```vue
<template>
  <jv-breadcrumbs :items="breadcrumbs" />
</template>

<script setup>
import { ref } from 'vue'

const breadcrumbs = ref([
  { text: '首页', to: '/' },
  { text: '产品中心', to: '/products' },
  { text: '智能手机', to: '/products/phones' }
])
</script>
```

### 自定义分隔符
```vue
<template>
  <jv-breadcrumbs :items="breadcrumbs" separator=">" />
</template>
```

### 使用图标分隔符
```vue
<template>
  <jv-breadcrumbs :items="breadcrumbs" separator-icon="chevron-right" />
</template>
```

### 自定义首页
```vue
<template>
  <jv-breadcrumbs :items="breadcrumbs" home-text="主页" home-icon="home" />
</template>
```

### 完全自定义面包屑
```vue
<template>
  <jv-breadcrumbs>
    <jv-breadcrumb-item to="/">
      <template #icon>
        <i class="jv-icon jv-icon-home"></i>
      </template>
      返回首页
    </jv-breadcrumb-item>
    <jv-breadcrumb-item to="/products">产品目录</jv-breadcrumb-item>
    <jv-breadcrumb-item active>智能手机</jv-breadcrumb-item>
  </jv-breadcrumbs>
</template>
```

### 动态路由匹配
```vue
<template>
  <jv-breadcrumbs :items="dynamicBreadcrumbs" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dynamicBreadcrumbs = ref([])

// 根据路由自动生成面包屑
watch(() => route.path, (newPath) => {
  const pathSegments = newPath.split('/').filter(Boolean)
  dynamicBreadcrumbs.value = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    return {
      text: segment.charAt(0).toUpperCase() + segment.slice(1),
      to: path
    }
  })
}, { immediate: true })
</script>
``` 