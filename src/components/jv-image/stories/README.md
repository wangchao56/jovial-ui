# JvImage 图片组件

## 1. 介绍组件

JvImage 是一个功能丰富的图片组件，提供了图片展示、懒加载、加载状态展示、错误处理和自定义覆盖层等功能。

## 2. 布局结构使用方式

基本使用示例：

```vue
<JvImage 
  src="https://example.com/image.jpg" 
  alt="示例图片" 
  width="200px" 
  height="200px"
/>
```

## 3. 样式

### 图片适应方式

通过 `fit` 属性可以设置图片在容器内的填充方式：

```vue
<JvImage 
  src="https://example.com/image.jpg" 
  width="200px" 
  height="200px" 
  fit="cover"
/>
```

支持的 `fit` 值：
- `fill`: 拉伸填满容器（默认）
- `contain`: 保持宽高比缩放以适应容器
- `cover`: 保持宽高比填满容器（可能裁剪）
- `none`: 保持原始尺寸
- `scale-down`: 以 `none` 或 `contain` 中尺寸较小的一个显示

### 宽高比

可以通过 `aspectRatio` 属性设置图片的宽高比：

```vue
<JvImage 
  src="https://example.com/image.jpg" 
  width="100%" 
  aspectRatio="16/9" 
/>
```

### 圆角与圆形

可以通过 `radius` 设置圆角大小，或使用 `round` 属性将图片设为圆形：

```vue
<!-- 圆角图片 -->
<JvImage src="..." radius="10px" />

<!-- 圆形图片 -->
<JvImage src="..." round />
```

## 4. 交互

### 懒加载

通过设置 `lazy` 属性启用懒加载功能，只有当图片进入视口时才会加载：

```vue
<JvImage src="..." lazy />
```

### 加载状态与错误处理

组件内置了加载中和加载失败的状态展示，也可以通过 `loadingImg` 和 `errorImg` 属性设置对应状态下显示的图片：

```vue
<JvImage 
  src="..." 
  loadingImg="/path/to/loading.png"
  errorImg="/path/to/error.png"
/>
```

### 自定义覆盖层

使用 `overlay` 插槽可以在图片上添加自定义覆盖层：

```vue
<JvImage src="...">
  <template #overlay>
    <div class="custom-overlay">图片说明</div>
  </template>
</JvImage>
```

## 5. 可访问性

组件自动为图片添加 `alt` 属性以提高可访问性。建议始终为图片提供有意义的替代文本。

## 6. Vue API

### Props

| 属性名      | 类型                                          | 默认值    | 说明                              |
| ----------- | --------------------------------------------- | --------- | --------------------------------- |
| src         | string                                        | -         | 图片源                            |
| alt         | string                                        | ''        | 图片替代文本                      |
| width       | string \| number                              | -         | 图片宽度                          |
| height      | string \| number                              | -         | 图片高度                          |
| aspectRatio | string                                        | -         | 图片宽高比，如 "16/9"             |
| fit         | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | 'fill'   | 图片适应方式                      |
| lazy        | boolean                                       | false     | 是否启用懒加载                    |
| loadingImg  | string                                        | -         | 加载中显示的图片                  |
| errorImg    | string                                        | -         | 加载失败显示的图片                |
| radius      | string \| number                              | 0         | 圆角大小                          |
| round       | boolean                                       | false     | 是否为圆形                        |
| borderStyle | string                                        | 'none'    | 边框样式                          |

### 事件 (Emits)

| 事件名 | 参数                | 说明           |
| ------ | ------------------- | -------------- |
| load   | Event               | 图片加载成功时触发 |
| error  | Event               | 图片加载失败时触发 |

### 插槽 (Slots)

| 插槽名  | 说明                                 |
| ------- | ------------------------------------ |
| default | 默认插槽                             |
| loading | 自定义加载中的内容                   |
| error   | 自定义加载失败的内容                 |
| overlay | 自定义覆盖层内容                     |
