# JvImage 图片组件

## 组件介绍

JvImage 是一个功能丰富的图片组件，基于 HTML5 的 `<picture>` 元素实现，支持响应式图片、多格式图片、懒加载等特性。该组件旨在提供更好的用户体验和性能优化，适用于各种图片展示场景。

## 布局结构使用方式

JvImage 组件的基本布局结构基于 `<picture>` 元素，可以通过默认插槽添加 `<source>` 元素来实现响应式图片功能。组件内部会根据浏览器支持和媒体查询条件自动选择最合适的图片源。

基本使用示例：

```vue
<JvImage src="/path/to/fallback.jpg" alt="示例图片" />
```

响应式图片示例（根据屏幕尺寸选择不同图片）：

```vue
<JvImage src="/path/to/fallback.jpg" alt="响应式图片">
  <source srcset="/path/to/small.jpg" media="(max-width: 600px)" />
  <source srcset="/path/to/medium.jpg" media="(max-width: 1024px)" />
  <source srcset="/path/to/large.jpg" media="(min-width: 1025px)" />
</JvImage>
```

## 交互设计

JvImage 组件提供了以下交互特性：

1. **懒加载**：通过 `lazy` 属性启用懒加载功能，只有当图片进入视口时才会加载，有效减少页面初始加载时间。
2. **加载状态**：组件内置了加载中和加载失败的状态显示，可通过 `loadingImg` 和 `errorImg` 属性自定义状态图片。
3. **覆盖层**：通过 `overlay` 插槽可以在图片上添加自定义的覆盖内容，如标题、描述等。

## 可访问性

JvImage 组件遵循 Web 可访问性标准：

1. 必须提供 `alt` 属性以便屏幕阅读器识别图片内容
2. 组件使用适当的 ARIA 属性（role="img"）
3. 加载状态有清晰的视觉提示

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | - | 图片源 URL |
| alt | string | '图片' | 图片替代文本 |
| width | string \| number | - | 图片宽度 |
| height | string \| number | - | 图片高度 |
| aspectRatio | string | 'auto' | 图片宽高比 |
| lazy | boolean | false | 是否启用懒加载 |
| fit | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | 'fill' | 图片适应方式 |
| loadingImg | string | - | 加载中显示的图片 |
| errorImg | string | - | 加载失败显示的图片 |
| rounded | RoundedType | 'none' | 圆角类型 |
| borderStyle | string | 'none' | 边框样式 |
| borderWidth | string | '0' | 边框宽度 |
| borderColor | string | 'transparent' | 边框颜色 |

### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| load | event: Event | 图片加载成功时触发 |
| error | event: Event | 图片加载失败时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置 `<source>` 元素实现响应式图片 |
| loading | 自定义加载中显示的内容 |
| error | 自定义加载失败显示的内容 |
| overlay | 自定义覆盖层内容 |

## 测试用例

### 基础功能测试

- 测试组件是否正确渲染图片
- 测试 alt 属性是否正确应用
- 测试默认插槽是否正确渲染 source 元素

### Props 功能测试

- 测试 fit 属性是否正确应用样式
- 测试 lazy 属性是否正确触发懒加载
- 测试 rounded 属性是否正确应用圆角样式
- 测试边框相关属性是否正确应用

### Emits 事件测试

- 测试 load 事件是否在图片加载成功时触发
- 测试 error 事件是否在图片加载失败时触发

### Slots 插槽测试

- 测试 loading 插槽是否在加载中状态显示
- 测试 error 插槽是否在加载失败状态显示
- 测试 overlay 插槽是否正确显示覆盖内容

### 样式测试

- 测试不同 fit 模式下图片的显示效果
- 测试不同圆角类型的显示效果
- 测试边框样式的显示效果

### 可访问性测试

- 测试组件是否包含必要的 ARIA 属性
- 测试屏幕阅读器是否能正确识别图片内容

## 使用示例

### 基础用法

```vue
<JvImage src="/path/to/image.jpg" alt="示例图片" />
```

### 响应式图片（不同屏幕尺寸）

```vue
<JvImage src="/path/to/fallback.jpg" alt="响应式图片">
  <source srcset="/path/to/small.jpg" media="(max-width: 600px)" />
  <source srcset="/path/to/medium.jpg" media="(max-width: 1024px)" />
  <source srcset="/path/to/large.jpg" media="(min-width: 1025px)" />
</JvImage>
```

### 多格式支持

```vue
<JvImage src="/path/to/fallback.jpg" alt="多格式图片">
  <source srcset="/path/to/image.webp" type="image/webp" />
  <source srcset="/path/to/image.avif" type="image/avif" />
</JvImage>
```

### 响应式图片（不同设备像素比）

```vue
<JvImage src="/path/to/image.jpg" alt="高分辨率图片">
  <source 
    srcset="/path/to/image.jpg, /path/to/image@2x.jpg 2x, /path/to/image@3x.jpg 3x"
    type="image/jpeg" 
  />
</JvImage>
```

### 艺术指导（不同布局）

```vue
<JvImage src="/path/to/fallback.jpg" alt="艺术指导图片">
  <source srcset="/path/to/landscape.jpg" media="(orientation: landscape)" />
  <source srcset="/path/to/portrait.jpg" media="(orientation: portrait)" />
</JvImage>
```

### 结合其他功能

```vue
<JvImage 
  src="/path/to/fallback.jpg" 
  alt="综合示例" 
  fit="cover" 
  rounded="lg"
  :lazy="true"
  loadingImg="/path/to/loading.gif"
  errorImg="/path/to/error.png"
>
  <source srcset="/path/to/image.webp" type="image/webp" />
  <template #overlay>
    <div class="overlay-content">图片说明</div>
  </template>
</JvImage>
```

## 测试技术说明

在测试中，我们使用了以下技术和方法：

- 使用 `mount` 函数创建组件实例
- 使用 `find` 方法查找DOM元素
- 使用 `classes`、`attributes` 和 `text` 方法检查元素属性
- 使用 `props` 方法检查组件属性
- 使用 `emitted` 方法检查事件触发情况
- 使用 `vi.fn()` 模拟DOM方法和事件监听器
- 使用 `Object.defineProperty` 模拟浏览器环境属性

## 测试覆盖范围

这些测试全面覆盖了JvImage组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。测试覆盖了以下方面：

1. 基本渲染和插槽
2. 属性设置和默认值
3. 图片加载状态逻辑
4. 事件触发
5. 样式应用
6. 生命周期钩子
7. 响应式图片功能 