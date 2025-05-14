# JvCard 卡片组件

## 组件介绍
`JvCard` 是一个灵活的容器组件，用于展示相关内容的集合。它遵循 Material Design 设计规范，提供多种变体和布局选项。卡片可以包含标题、副标题、描述、内容、媒体、操作按钮等，适用于信息展示、产品卡片、个人资料卡等多种场景。

## 布局结构使用方式
组件支持两种使用方式：

### 1. 子组件嵌套方式（推荐）
```vue
<template>
  <JvCard variant="elevated" color="primary">
    <JvCardMedia :image="imageSrc" />
    <JvCardHeader title="卡片标题" subtitle="卡片副标题" description="更详细的描述信息" />
    <JvCardContent>这是卡片的详细内容</JvCardContent>
    <JvCardActions align="end">
      <JvButton variant="text">取消</JvButton>
      <JvButton variant="tonal">确认</JvButton>
    </JvCardActions>
  </JvCard>
</template>
```

### 2. 属性配置方式
```vue
<template>
  <JvCard
    title="卡片标题"
    subtitle="卡片副标题"
    description="更详细的描述信息"
    content="这是卡片的详细内容"
    :image="imageSrc"
    variant="elevated"
    color="primary"
  >
    <template #actions>
      <JvButton variant="text">取消</JvButton>
      <JvButton variant="tonal">确认</JvButton>
    </template>
  </JvCard>
</template>
```

## 交互设计
卡片组件提供以下交互特性：
- 点击交互：设置 `clickable` 属性后，卡片可以响应点击事件并发出 `click` 事件
- 悬停效果：可点击卡片在悬停时会有轻微上浮和阴影加深效果
- 禁用状态：设置 `disabled` 属性后，卡片将变为禁用状态并阻止所有交互

## 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 HTML 结构，便于屏幕阅读器理解内容
- 可点击卡片设置适当的键盘焦点样式
- 禁用状态下明确传达交互限制
- 提供足够的颜色对比度确保内容可读性

## Vue 组件 API

### JvCard Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| tag | string | 'div' | 卡片根元素标签 |
| title | string | - | 卡片标题 |
| subtitle | string | - | 卡片副标题 |
| description | string | - | 卡片描述，提供更详细的说明文本 |
| content | string | - | 卡片内容 |
| image | string \| JvImageProps | - | 卡片图片 |
| maxWidth | number \| string | - | 卡片最大宽度 |
| minWidth | number \| string | - | 卡片最小宽度 |
| height | number \| string | - | 卡片高度 |
| color | CardColorType | 'default' | 卡片颜色类型 |
| variant | CardVariant | 'elevated' | 卡片变体 |
| rounded | CardRounded | 'rounded' | 卡片圆角样式 |
| bordered | boolean | false | 是否显示边框 |
| clickable | boolean | false | 是否可点击 |
| disabled | boolean | false | 是否禁用 |
| padding | CardPadding | 'md' | 卡片内边距大小 |
| actionsAlign | CardActionsAlign | 'end' | 操作按钮对齐方式 |
| orientation | CardOrientation | 'vertical' | 卡片布局方向 |
| elevation | boolean \| number | - | 卡片阴影级别 |
| flat | boolean | false | 是否平面（无阴影） |
| loading | boolean | false | 是否显示加载状态 |
| objectFit | string | 'cover' | 媒体内容的填充模式 |

### JvCard Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击卡片时触发（仅当 clickable 为 true 时） |

### JvCard Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，用于放置子组件或内容 |
| title | 卡片标题 |
| subtitle | 卡片副标题 |
| description | 卡片描述 |
| media | 卡片媒体内容 |
| content | 卡片主要内容 |
| actions | 卡片操作按钮区域 |

### JvCardHeader Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string \| JvTitleProps | - | 卡片标题 |
| subtitle | string \| JvTextProps | - | 卡片副标题 |
| description | string \| JvParagraphProps | - | 卡片描述 |
| icon | string \| JvIconProps | - | 卡片图标 |
| avatar | string \| JvAvatarProps | - | 卡片头像 |
| image | string \| JvImageProps | - | 卡片头部图片 |
| divider | boolean | false | 是否显示分割线 |
| variant | string | 'flat' | 头部变体样式 |

### JvCardContent Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | string | - | 卡片内容 |
| padding | CardPadding | 'md' | 内容内边距 |
| divider | boolean | false | 是否显示分割线 |

### JvCardMedia Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| image | string \| JvImageProps | - | 媒体图片 |
| height | number \| string | - | 媒体高度 |
| width | number \| string | - | 媒体宽度 |
| aspectRatio | string | '16 / 9' | 媒体宽高比 |
| objectFit | string | 'cover' | 填充模式 |
| divider | boolean | false | 是否显示分割线 |

### JvCardActions Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| align | CardActionsAlign | 'start' | 操作按钮对齐方式 |
| divider | boolean | false | 是否显示分割线 |
| padding | CardPadding | 'sm' | 操作区内边距 |
| gap | number \| string | 8 | 操作按钮间距 |

## 优化特性

### 1. 优化的性能
- 使用 `shallowRef` 提高响应性性能
- 添加 `will-change` 属性优化动画渲染性能
- 优化 CSS 选择器减少渲染计算
- `contain: content` 优化渲染层级

### 2. 智能子组件识别
卡片组件能够智能识别子组件类型，根据不同的使用方式自动调整布局：
- 自动识别 `JvCardHeader`、`JvCardContent`、`JvCardMedia` 和 `JvCardActions` 子组件
- 当识别到非卡片子组件时，会自动将其包装到 `JvCardContent` 中
- 两种使用方式可混合使用，组件会智能处理显示优先级

### 3. 增强的动画效果
- 平滑的悬停动画效果和高度变化
- 加载状态下的模糊背景和加载指示器
- 改进的点击反馈效果

### 4. 响应式布局支持
- 支持水平和垂直布局方向
- 媒体内容根据设备大小自动调整
- 适应各种屏幕尺寸的响应式设计

### 5. 多种填充模式
- 支持多种媒体内容填充模式：`cover`、`contain`、`fill`、`none`、`scale-down`
- 可自定义媒体内容的宽高比
- 优化的图片显示方式

## 使用示例

### 基础卡片
```vue
<template>
  <JvCard title="基础卡片" content="这是一个简单的卡片示例" />
</template>
```

### 水平布局卡片
```vue
<template>
  <JvCard orientation="horizontal" title="水平布局" subtitle="侧边显示图片">
    <template #media>
      <img src="/path/to/image.jpg" alt="卡片图片" />
    </template>
    <template #content>
      水平布局卡片将媒体内容显示在左侧，适合显示列表项目。
    </template>
  </JvCard>
</template>
```

### 混合使用方式
```vue
<template>
  <JvCard title="混合使用方式">
    <JvCardMedia :image="imageSrc" />
    <div>这是一段普通文本，会被自动包装到内容区域</div>
    <JvCardActions>
      <JvButton>操作按钮</JvButton>
    </JvCardActions>
  </JvCard>
</template>
```

### 完全自定义布局
```vue
<template>
  <JvCard>
    <JvCardHeader>
      <template #prepend>
        <JvAvatar :image="avatarSrc" />
      </template>
      <template #title>自定义标题</template>
      <template #subtitle>自定义副标题</template>
      <template #append>
        <JvButton icon="more_vert" variant="text" />
      </template>
    </JvCardHeader>
    <JvCardMedia height="200">
      <video src="/path/to/video.mp4" controls />
    </JvCardMedia>
    <JvCardContent>
      <div class="custom-content">
        自定义内容区域可以放置任何自定义组件和布局
      </div>
    </JvCardContent>
    <JvCardActions align="space-between">
      <div>
        <JvButton icon="thumb_up" variant="text">喜欢</JvButton>
        <JvButton icon="share" variant="text">分享</JvButton>
      </div>
      <JvButton variant="tonal">了解更多</JvButton>
    </JvCardActions>
  </JvCard>
</template>
``` 