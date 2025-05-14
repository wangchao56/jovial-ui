# JvBadge 徽标组件

## 1. 组件介绍
`JvBadge` 是一个用于显示计数、状态或提示信息的徽标组件。它通常作为其他元素的附加标记，可以展示数字、文本或简单的圆点，用于表示新消息、未读数量、状态变化等场景。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 默认插槽：包裹需要添加徽标的内容
- 徽标内容：显示在默认内容右上角的标记

### 基本使用示例
```vue
<template>
  <!-- 基础徽标 -->
  <JvBadge :value="5">
    <JvButton>消息</JvButton>
  </JvBadge>

  <!-- 最大值 -->
  <JvBadge :value="100" :max="99">
    <JvButton>通知</JvButton>
  </JvBadge>

  <!-- 小圆点 -->
  <JvBadge dot>
    <JvButton>提醒</JvButton>
  </JvBadge>

  <!-- 自定义偏移 -->
  <JvBadge :value="8" :offset="[10, -5]">
    <JvButton>自定义位置</JvButton>
  </JvBadge>

  <!-- 不同颜色类型 -->
  <JvBadge :value="1" type="primary">
    <JvIcon name="$email" />
  </JvBadge>
</template>
```

## 3. 交互设计
组件提供以下交互效果：
- 点击事件：徽标本身可以响应点击事件
- 显示隐藏：通过 hidden 属性可以控制徽标的显示和隐藏
- 最大值溢出：当数值超过 max 属性设定的最大值时，会显示为 "{max}+"
- 位置调整：通过 offset 属性调整徽标的水平和垂直位置

特殊交互：
- 点击徽标时，事件默认会冒泡；如需独立处理徽标点击，应在事件处理函数中阻止冒泡
- 徽标内容会根据内容长度自动调整宽度
- 当使用圆点模式时，value 属性会被忽略

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化标签 `<sup>` 表示徽标内容，提高屏幕阅读器的识别度
- 徽标内容和背景色有足够的对比度，确保视觉上的可识别性
- 可通过 aria-label 或 aria-description 属性提供更多上下文信息
- 当仅作为装饰用途时，使用 aria-hidden="true" 避免屏幕阅读器读出无意义的内容
- 徽标内的文本保持简洁，便于理解和朗读

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| number | undefined | 显示的值 |
| max | number | 99 | 最大值，超过最大值会显示 '{max}+' |
| dot | boolean | false | 是否为圆点模式 |
| hidden | boolean | false | 是否隐藏徽标 |
| color | 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'secondary' | 'error' | 徽标颜色类型 |
| offset | [number, number] | undefined | 自定义徽标位置偏移，格式为 [x, y] |
| placement | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right' | 徽标位置 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击徽标时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于包裹需要添加徽标的内容 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| BD-002 | 数值显示 | 验证数值是否正确显示 | 1. 设置 value 属性<br>2. 检查渲染结果 | 徽标显示正确的数值 | ✅ |
| BD-003 | 圆点模式 | 验证圆点模式效果 | 1. 设置 dot 属性为 true<br>2. 检查渲染结果 | 显示一个小圆点，不显示数值 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-101 | 最大值 | 验证最大值效果 | 1. 设置 value 大于 max<br>2. 检查渲染结果 | 显示为 "{max}+" | ✅ |
| BD-102 | 隐藏徽标 | 验证隐藏效果 | 1. 设置 hidden 为 true<br>2. 检查渲染结果 | 徽标不可见 | ✅ |
| BD-103 | 颜色类型 | 验证不同颜色类型 | 1. 设置不同的 type 属性<br>2. 检查样式变化 | 徽标颜色与类型匹配 | ✅ |
| BD-104 | 位置偏移 | 验证自定义位置 | 1. 设置 offset 属性<br>2. 检查徽标位置 | 徽标位置符合偏移设置 | ✅ |
| BD-105 | 文本内容 | 验证文本内容显示 | 1. 设置 value 为字符串<br>2. 检查渲染结果 | 正确显示文本内容 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-201 | 点击事件 | 验证点击事件触发 | 1. 监听 click 事件<br>2. 点击徽标 | 事件被触发且参数正确 | ✅ |
| BD-202 | 事件冒泡 | 验证事件冒泡行为 | 1. 在徽标和父元素上监听事件<br>2. 点击徽标<br>3. 在事件处理中阻止冒泡 | 可以通过阻止冒泡控制事件传递 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 正确显示插槽内容，徽标位于内容右上角 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-401 | 自适应宽度 | 验证徽标宽度自适应 | 1. 设置不同长度的内容<br>2. 检查徽标宽度 | 徽标宽度根据内容自动调整 | ✅ |
| BD-402 | 圆点样式 | 验证圆点模式样式 | 1. 设置 dot 为 true<br>2. 检查圆点样式 | 圆点大小、颜色和位置正确 | ✅ |
| BD-403 | 文本溢出 | 验证长文本处理 | 1. 设置较长的文本内容<br>2. 检查文本处理 | 文本适当截断或适应宽度 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| BD-501 | ARIA属性 | 验证无障碍属性 | 1. 检查组件的 ARIA 属性<br>2. 验证语义标签使用 | 使用适当的ARIA属性和语义标签 | ✅ |
| BD-502 | 颜色对比度 | 验证颜色对比度 | 1. 检查不同类型徽标的对比度<br>2. 验证文本可读性 | 颜色对比度符合WCAG标准 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvBadge :value="5">
    <JvButton>消息</JvButton>
  </JvBadge>
</template>
```

### 圆点徽标
```vue
<template>
  <JvBadge dot>
    <JvButton>提醒</JvButton>
  </JvBadge>
</template>
```

### 不同颜色类型
```vue
<template>
  <JvBadge value="new" color="primary">
    <JvButton>主要</JvButton>
  </JvBadge>
  
  <JvBadge value="99+" color="success">
    <JvButton>成功</JvButton>
  </JvBadge>
  
  <JvBadge value="热" color="warning">
    <JvButton>警告</JvButton>
  </JvBadge>
  
  <JvBadge value="!" color="error">
    <JvButton>错误</JvButton>
  </JvBadge>
  
  <JvBadge value="i" color="info">
    <JvButton>信息</JvButton>
  </JvBadge>
</template>
```

### 最大值和隐藏控制
```vue
<template>
  <JvBadge :value="100" :max="99">
    <JvButton>通知</JvButton>
  </JvBadge>
  
  <JvBadge :value="5" :hidden="hideFlag">
    <JvButton @click="hideFlag = !hideFlag">
      {{ hideFlag ? '显示徽标' : '隐藏徽标' }}
    </JvButton>
  </JvBadge>
</template>

<script setup>
import { ref } from 'vue'

const hideFlag = ref(false)
</script>
```

### 自定义位置
```vue
<template>
  <JvBadge :value="8" :offset="[10, -5]">
    <JvButton>右偏移</JvButton>
  </JvBadge>
  
  <JvBadge :value="8" :offset="[-10, -5]">
    <JvButton>左偏移</JvButton>
  </JvBadge>
</template>
```

### 处理点击事件
```vue
<template>
  <JvBadge :value="unreadCount" @click="handleBadgeClick">
    <JvButton>消息</JvButton>
  </JvBadge>
</template>

<script setup>
import { ref } from 'vue'

const unreadCount = ref(5)

function handleBadgeClick(event) {
  // 点击徽标时清零并阻止事件冒泡
  unreadCount.value = 0
  event.stopPropagation()
}
</script>
```

### 结合其他组件使用
```vue
<template>
  <JvBadge :value="3">
    <JvIcon name="$email" size="24" />
  </JvBadge>
  
  <JvBadge dot color="primary">
    <JvAvatar image="https://example.com/avatar.jpg" />
  </JvBadge>
  
  <JvBadge :value="99" color="warning">
    <JvMenu>
      <JvButton>下拉菜单</JvButton>
      <template #content>
        <div>菜单内容</div>
      </template>
    </JvMenu>
  </JvBadge>
</template>
```
