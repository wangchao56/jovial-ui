## 1. 组件介绍
`JvAvatar` 是一个用于展示用户或物体头像的组件，支持图片、文本和图标三种类型。它可以用在用户信息展示、评论列表、个人中心等多种场景，并提供了多种尺寸、形状和变体选项。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 外层容器：控制大小、形状和样式
- 内容区域：展示图片、文本或图标

## 3. 交互设计
组件提供以下交互效果：
- 点击事件：可以通过点击触发自定义操作
- 图片加载：支持图片加载状态和加载失败的处理
- 自适应内容：根据不同内容类型调整样式
- 文本截断：超出容器的文本会被自动截断
- 禁用状态：设置 `disabled` 为 `true` 时，头像变为半透明且不可点击

特殊交互：
- 当图片加载失败时，可以显示备用内容或回退到文本/图标模式
- 文本内容会根据容器大小自动调整字体大小
- 图标大小会根据头像尺寸自动调整

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 图片类型提供适当的替代文本
- 可通过键盘导航和操作
- 文本和背景色之间保持足够的对比度
- 大小足够便于交互操作
- 所有交互元素都有可见的焦点状态

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| image | string \| JvImageProps | - | 头像图片，可以是URL字符串或JvImage组件属性对象 |
| icon | string \| JvIconProps | - | 头像图标，可以是图标名称或JvIcon组件属性对象 |
| text | string | 'U' | 头像文本内容 |
| shape | 'circle' \| 'square' \| 'rounded' | 'circle' | 头像形状 |
| size | 'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| number \| string | 'medium' | 头像大小，可以是预设值或自定义尺寸（像素值或其他CSS单位） |
| variant | 'filled' \| 'outlined' | 'filled' | 头像变体样式 |
| badge | boolean \| JvBadgeProps | - | 徽标配置，可以是布尔值或徽标组件属性对象 |
| color | string | - | 头像背景颜色 |
| textColor | string | - | 头像文本/图标颜色 |
| disabled | boolean | false | 是否禁用状态 |
| borderWidth | number \| string | 1 | 边框宽度 |
| elevated | boolean | true | 是否显示阴影效果 |
| class | string | - | 自定义类名 |
| style | Record<string, string> | - | 自定义样式 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: Event) | 点击头像时触发 |
| load | (event: Event) | 图片加载成功时触发 |
| error | (error: Error) | 图片加载失败时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，当没有其他内容时显示 |
| text | 文本类型的内容插槽 |
| icon | 图标类型的内容插槽 |
| placeholder | 图片加载失败时的占位内容插槽 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| AV-002 | 图片头像 | 验证图片头像渲染 | 1. 设置 image 属性<br>2. 检查渲染结果 | 正确显示图片头像 | ✅ |
| AV-003 | 文本头像 | 验证文本头像渲染 | 1. 设置 text 属性<br>2. 检查渲染结果 | 正确显示文本头像 | ✅ |
| AV-004 | 图标头像 | 验证图标头像渲染 | 1. 设置 icon 属性<br>2. 检查渲染结果 | 正确显示图标头像 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-101 | 形状设置 | 验证不同形状效果 | 1. 设置不同的 shape 属性<br>2. 检查样式变化 | 头像形状与设置匹配 | ✅ |
| AV-102 | 尺寸设置 | 验证不同尺寸效果 | 1. 设置不同的 size 属性<br>2. 检查样式变化 | 头像尺寸与设置匹配 | ✅ |
| AV-103 | 变体样式 | 验证不同变体效果 | 1. 设置不同的 variant 属性<br>2. 检查样式变化 | 头像变体样式与设置匹配 | ✅ |
| AV-104 | 自定义尺寸 | 验证数字尺寸设置 | 1. 设置数字 size 属性<br>2. 检查样式变化 | 头像尺寸为指定像素值 | ✅ |
| AV-105 | 图片对象 | 验证图片对象属性 | 1. 设置 image 为对象<br>2. 检查渲染结果 | 正确应用图片对象属性 | ✅ |
| AV-106 | 图标对象 | 验证图标对象属性 | 1. 设置 icon 为对象<br>2. 检查渲染结果 | 正确应用图标对象属性 | ✅ |
| AV-107 | 禁用状态 | 验证禁用状态 | 1. 设置 disabled=true<br>2. 点击头像<br>3. 检查样式 | 1. 头像半透明<br>2. 点击事件不触发 | ✅ |
| AV-109 | 徽标显示 | 验证徽标功能 | 1. 设置 badge 属性<br>2. 检查渲染结果 | 正确显示徽标 | ✅ |
| AV-110 | 阴影效果 | 验证阴影设置 | 1. 设置 elevated=false<br>2. 检查样式变化 | 头像没有阴影 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-201 | 点击事件 | 验证点击事件触发 | 1. 监听 click 事件<br>2. 点击头像 | 事件被触发且参数正确 | ✅ |
| AV-202 | 加载事件 | 验证加载事件触发 | 1. 监听 load 事件<br>2. 加载图片 | 事件被触发且参数正确 | ✅ |
| AV-203 | 错误事件 | 验证错误事件触发 | 1. 监听 error 事件<br>2. 图片加载失败 | 事件被触发且参数正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 正确显示自定义内容 | ✅ |
| AV-302 | 文本插槽 | 验证文本插槽内容 | 1. 设置 text 插槽内容<br>2. 检查渲染结果 | 正确显示自定义文本 | ✅ |
| AV-303 | 图标插槽 | 验证图标插槽内容 | 1. 设置 icon 插槽内容<br>2. 检查渲染结果 | 正确显示自定义图标 | ✅ |
| AV-304 | 占位插槽 | 验证占位插槽内容 | 1. 设置 placeholder 插槽内容<br>2. 触发图片加载失败<br>3. 检查渲染结果 | 正确显示占位内容 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-401 | 文本大小 | 验证文本自适应 | 1. 设置不同尺寸的文本头像<br>2. 检查文本大小 | 文本大小随头像尺寸调整 | ✅ |
| AV-402 | 图标大小 | 验证图标自适应 | 1. 设置不同尺寸的图标头像<br>2. 检查图标大小 | 图标大小随头像尺寸调整 | ✅ |
| AV-403 | 颜色样式 | 验证不同类型颜色 | 1. 设置不同内容类型和变体<br>2. 检查颜色样式 | 颜色样式与类型和变体匹配 | ✅ |
| AV-404 | 自定义颜色 | 验证自定义颜色 | 1. 设置 color 和 textColor<br>2. 检查颜色样式 | 颜色与设置匹配 | ✅ |
| AV-405 | 边框宽度 | 验证边框宽度 | 1. 设置 borderWidth<br>2. 检查边框样式 | 边框宽度与设置匹配 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AV-501 | 图片替代文本 | 验证图片替代文本 | 1. 设置图片头像<br>2. 检查 alt 属性 | 存在适当的替代文本 | ✅ |
| AV-502 | 键盘交互 | 验证键盘可访问性 | 1. 使用 Tab 键导航<br>2. 使用 Enter 键触发 | 可以通过键盘访问和操作 | ✅ |
| AV-503 | 对比度 | 验证文本对比度 | 1. 检查文本和背景色<br>2. 计算对比度 | 对比度符合 WCAG 标准 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
<JvAvatar image="https://example.com/avatar.jpg" />
</template>
```

### 文本头像
```vue
<template>
  <JvAvatar text="用户" />
  <JvAvatar>A</JvAvatar>
  <JvAvatar>
    <template #text>自定义</template>
  </JvAvatar>
</template>
```

### 图标头像
```vue
<template>
  <JvAvatar icon="$account" />
  <JvAvatar>
    <template #icon>
      <JvIcon name="$user" />
    </template>
  </JvAvatar>
</template>
```

### 不同尺寸
```vue
<template>
  <JvAvatar size="tiny" text="T" />
  <JvAvatar size="small" text="S" />
  <JvAvatar size="medium" text="M" />
  <JvAvatar size="large" text="L" />
  <JvAvatar size="xlarge" text="XL" />
  <JvAvatar :size="80" text="80" />
</template>
```

### 不同形状
```vue
<template>
  <JvAvatar shape="circle" text="C" />
  <JvAvatar shape="square" text="S" />
  <JvAvatar shape="rounded" text="R" />
</template>
```

### 处理点击事件
```vue
<template>
  <JvAvatar @click="handleAvatarClick" text="点击" />
</template>

<script setup>
const handleAvatarClick = (event) => {
  console.log('头像被点击', event)
}
</script>
```

### 自定义样式
```vue
<template>
  <JvAvatar
    text="A"
    color="#f44336"
    textColor="#ffffff"
    :elevated="false"
    borderWidth="2px"
  />
</template>
```

### 禁用状态
```vue
<template>
  <JvAvatar disabled image="https://example.com/avatar.jpg" />
</template>
```

### 带徽标的头像
```vue
<template>
  <JvAvatar :badge="true" image="https://example.com/avatar.jpg" />
  <JvAvatar :badge="{ value: 8, color: 'primary' }" image="https://example.com/avatar.jpg" />
</template>
```

### 组合使用
```vue
<template>
  <div class="user-info">
    <JvAvatar image="https://example.com/avatar.jpg" size="small" />
    <div class="user-details">
      <div class="user-name">张三</div>
      <div class="user-role">产品经理</div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-name {
  font-weight: bold;
}
.user-role {
  font-size: 12px;
  color: #666;
}
</style>
```

