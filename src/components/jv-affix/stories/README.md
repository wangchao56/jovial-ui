# JvAffix 固钉组件

## 1. 组件介绍
`JvAffix` 是一个固定元素组件，可以将内容固定在页面的特定位置，常用于导航栏、工具栏和返回顶部按钮等场景。组件支持相对于视口或特定容器元素进行定位，并提供了自定义偏移量和触发点的功能。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 外层包装器：维持原始尺寸和位置，防止固定后布局抖动
- 内部固定元素：根据滚动位置状态进行定位

### 基本使用示例
```vue
<template>
  <!-- 基础固钉 -->
  <JvAffix :offset-top="80">
    <JvButton>固定在顶部80px位置</JvButton>
  </JvAffix>
  
  <!-- 底部固钉 -->
  <JvAffix :offset-bottom="20">
    <JvButton>固定在底部20px位置</JvButton>
  </JvAffix>
  
  <!-- 相对容器固定 -->
  <div class="container" ref="container">
    <JvAffix :target="container" :offset-top="10">
      <JvButton>相对容器固定</JvButton>
    </JvAffix>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const container = ref(null)
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 滚动跟踪：监听页面或容器的滚动事件，根据滚动位置动态改变固定状态
- 平滑过渡：固定状态切换时有平滑的过渡效果
- 尺寸维持：固定前后保持元素原有尺寸，防止布局抖动
- 位置计算：根据偏移设置精确计算固定位置

特殊交互：
- 同时设置 offset-top 和 offset-bottom 时，offset-top 优先级更高
- 当使用 target 属性指定相对容器时，固钉状态受容器位置影响
- 窗口调整大小时自动重新计算位置

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 保持内容结构不变，确保屏幕阅读器正确识别固定内容
- 不会影响键盘导航和焦点管理
- 固定状态变化不会改变内容的语义结构
- 支持高对比度模式下的视觉呈现

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| top | number | undefined | 距离窗口顶部的偏移量（单位：像素） |
| bottom | number | undefined | 距离窗口底部的偏移量（单位：像素） |
| right | number | undefined | 距离窗口右侧的偏移量（单位：像素） |
| left | number | undefined | 距离窗口左侧的偏移量（单位：像素） |
| target | string \| HTMLElement | undefined | 指定固钉的容器元素，默认为 window |
| zIndex | number | 100 | 固定时的 z-index |
| position | 'fixed' \| 'absolute' | 'fixed' | 固定的定位方式 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| change | (fixed: boolean) | 固钉状态改变时触发 |
| scroll | (event: Event, scrollInfo: { scrollTop: number, fixed: boolean }) | 滚动时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，固钉内容 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| updatePosition | - | 手动更新固钉位置 |
| refresh | - | 刷新固钉状态和位置 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| AF-002 | 内容渲染 | 验证组件是否正确渲染内容 | 1. 在组件中放置内容<br>2. 检查渲染结果 | 内容正确显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-101 | 顶部偏移 | 验证顶部偏移设置 | 1. 设置 offsetTop<br>2. 滚动页面使元素达到偏移位置 | 元素固定在设定的顶部偏移位置 | ✅ |
| AF-102 | 底部偏移 | 验证底部偏移设置 | 1. 设置 offsetBottom<br>2. 滚动页面使元素达到偏移位置 | 元素固定在设定的底部偏移位置 | ✅ |
| AF-103 | 容器限制 | 验证在指定容器中的固定效果 | 1. 设置 target 为容器<br>2. 滚动页面使容器移出视口 | 元素固定行为受容器位置限制 | ✅ |
| AF-104 | Z轴层级 | 验证 zIndex 设置 | 1. 设置 zIndex<br>2. 触发固定状态 | 固定元素的 z-index 值符合设置 | ✅ |
| AF-105 | 定位方式 | 验证不同定位方式 | 1. 设置不同的 position 值<br>2. 触发固定状态 | 元素使用指定的定位方式固定 | ✅ |
| AF-106 | 优先级测试 | 验证同时设置顶部和底部偏移时的行为 | 1. 同时设置 offsetTop 和 offsetBottom<br>2. 滚动页面 | 顶部偏移优先生效 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-201 | 状态变化 | 验证 change 事件 | 1. 监听 change 事件<br>2. 触发固定状态变化 | 事件被触发且参数正确 | ✅ |
| AF-202 | 滚动事件 | 验证 scroll 事件 | 1. 监听 scroll 事件<br>2. 滚动页面 | 事件被触发且参数正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 正确显示插槽内容 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-401 | 更新位置 | 验证 updatePosition 方法 | 1. 调用 updatePosition 方法<br>2. 检查位置更新 | 位置正确更新 | ✅ |
| AF-402 | 刷新状态 | 验证 refresh 方法 | 1. 调用 refresh 方法<br>2. 检查状态刷新 | 状态正确刷新 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-501 | 固定样式 | 验证固定状态的样式 | 1. 触发固定状态<br>2. 检查样式变化 | 应用正确的固定样式 | ✅ |
| AF-502 | 过渡效果 | 验证状态切换的过渡效果 | 1. 触发状态切换<br>2. 观察过渡动画 | 平滑的过渡动画效果 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AF-601 | 键盘交互 | 验证键盘交互不受影响 | 1. 固定元素包含可聚焦内容<br>2. 使用键盘导航 | 键盘导航正常工作 | ✅ |
| AF-602 | 内容结构 | 验证固定状态不影响内容结构 | 1. 观察固定前DOM结构<br>2. 触发固定状态<br>3. 比较DOM结构 | 内容结构保持一致 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvAffix :offset-top="100">
    <JvButton type="primary">固定在顶部100px位置</JvButton>
  </JvAffix>
</template>
```

### 底部固定
```vue
<template>
  <JvAffix :offset-bottom="30">
    <JvButton type="primary">固定在底部30px位置</JvButton>
  </JvAffix>
</template>
```

### 相对容器固定
```vue
<template>
  <div class="container" ref="container">
    <JvAffix :target="container" :offset-top="10">
      <JvButton type="primary">相对容器固定</JvButton>
    </JvAffix>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const container = ref(null)
</script>
```

### 固定状态监听
```vue
<template>
  <JvAffix :offset-top="120" @change="onChange" @scroll="onScroll">
    <JvButton type="primary">监听固定状态</JvButton>
  </JvAffix>
</template>

<script setup>
const onChange = (fixed) => {
  console.log('固定状态变化:', fixed)
}

const onScroll = (event, { scrollTop, fixed }) => {
  console.log('滚动位置:', scrollTop, '固定状态:', fixed)
}
</script>
``` 