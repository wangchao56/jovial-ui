# JvAvatar 头像组件

## 组件介绍

JvAvatar 是一个用于显示用户头像或标识的组件。它支持图片、图标和文本三种显示方式，并提供了丰富的自定义选项，如形状、大小、颜色等。组件还内置了无障碍功能，以确保所有用户都能良好地使用和理解。

## 布局结构使用方式

JvAvatar 组件采用简单的圆形或方形布局，可以根据需要调整大小和形状。组件支持图片、图标和文本三种内容类型，并可以添加徽标标记。

基本使用示例：

```vue
<template>
  <JvAvatar />                           <!-- 默认头像 -->
  <JvAvatar image="/path/to/image.jpg" /> <!-- 图片头像 -->
  <JvAvatar icon="$account" />           <!-- 图标头像 -->
  <JvAvatar text="JV" />                 <!-- 文本头像 -->
</template>
```

## 交互设计

JvAvatar 组件支持点击交互，可以通过 `@click` 事件监听用户点击。组件在禁用状态下不会触发点击事件。

组件还支持键盘导航，可以通过 Tab 键聚焦，并使用 Enter 或空格键触发点击事件，增强了组件的可访问性。

## 可访问性

JvAvatar 组件遵循 WAI-ARIA 规范，提供了以下无障碍功能：

1. 适当的角色（role）属性：默认为 "img"，表示这是一个图像元素
2. 替代文本（alt）：为图片类型的头像提供描述性文本
3. ARIA 标签（aria-label）：为屏幕阅读器提供额外信息
4. 禁用状态标记（aria-disabled）：当组件被禁用时，通知辅助技术
5. 键盘导航支持：可以使用 Tab 键聚焦，并通过 Enter 或空格键触发点击事件
6. 焦点样式：当组件获得焦点时，显示清晰的焦点指示器

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ----- | ---- | ----- | ---- |
| image | string \| JvImageProps | - | 头像图片地址或图片组件属性 |
| icon | string \| JvIconProps | - | 头像图标名称或图标组件属性 |
| text | string | 'U' | 头像文本内容 |
| shape | 'circle' \| 'square' \| 'rounded' | 'circle' | 头像形状 |
| size | 'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| number \| string | 'medium' | 头像大小 |
| variant | 'filled' \| 'outlined' | 'filled' | 头像变体样式 |
| badge | boolean \| JvBadgeProps | - | 徽标配置 |
| color | string | - | 头像背景颜色 |
| textColor | string | - | 头像文本/图标颜色 |
| disabled | boolean | false | 是否禁用状态 |
| borderWidth | number \| string | 1 | 边框宽度 |
| elevated | boolean | true | 是否显示阴影 |
| alt | string | '头像' | 图片的替代文本 |
| role | string | 'img' | ARIA角色 |
| tabindex | number | - | 标签索引，用于键盘导航 |
| ariaLabel | string | - | ARIA标签，用于屏幕阅读器 |

### Emits

| 事件名 | 参数 | 说明 |
| ----- | ---- | ---- |
| click | event: Event | 点击头像时触发 |
| load | event: Event | 图片加载成功时触发 |
| error | error: Error | 图片加载失败时触发 |

### Slots

| 插槽名 | 说明 |
| ----- | ---- |
| default | 默认插槽，可自定义头像内容 |
| text | 文本类型的内容插槽 |
| icon | 图标类型的内容插槽 |
| placeholder | 默认占位符插槽 |

## 测试用例

### 基础功能测试

- 测试默认渲染是否正确
- 测试各种形状（circle、square、rounded）是否正确应用
- 测试不同大小（tiny、small、medium、large、xlarge）是否正确应用

### Props 功能测试

- 测试 image 属性是否正确显示图片
- 测试 icon 属性是否正确显示图标
- 测试 text 属性是否正确显示文本
- 测试 color 和 textColor 属性是否正确应用颜色
- 测试 disabled 属性是否正确禁用组件
- 测试 badge 属性是否正确显示徽标

### Emits 事件测试

- 测试点击事件是否正确触发
- 测试禁用状态下是否不触发点击事件
- 测试图片加载成功事件是否正确触发
- 测试图片加载失败事件是否正确触发

### Slots 插槽测试

- 测试默认插槽是否正确渲染自定义内容
- 测试 text 插槽是否正确渲染
- 测试 icon 插槽是否正确渲染
- 测试 placeholder 插槽是否正确渲染

### 可访问性测试

- 测试键盘导航是否正常工作
- 测试 ARIA 属性是否正确设置
- 测试 alt 文本是否正确提供
- 测试焦点样式是否清晰可见

## 使用示例

### 基础用法

```vue
<template>
  <div class="avatar-demo">
    <!-- 默认头像 -->
    <JvAvatar />
    
    <!-- 图片头像 -->
    <JvAvatar image="/path/to/image.jpg" alt="用户头像" />
    
    <!-- 图标头像 -->
    <JvAvatar icon="$account" color="primary" />
    
    <!-- 文本头像 -->
    <JvAvatar text="JV" color="warning" textColor="white" />
  </div>
</template>
```

### 不同大小

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar size="tiny" text="T" />
    <JvAvatar size="small" text="S" />
    <JvAvatar size="medium" text="M" />
    <JvAvatar size="large" text="L" />
    <JvAvatar size="xlarge" text="XL" />
    <JvAvatar :size="100" text="100" />
  </div>
</template>
```

### 不同形状

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar shape="circle" text="C" />
    <JvAvatar shape="square" text="S" />
    <JvAvatar shape="rounded" text="R" />
  </div>
</template>
```

### 带徽标

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar :badge="true" text="B" />
    <JvAvatar :badge="{ content: '99+', color: 'error' }" text="B" />
  </div>
</template>
```

### 禁用状态

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar disabled text="D" />
  </div>
</template>
```

### 带点击事件

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar text="C" @click="handleClick" tabindex="0" />
  </div>
</template>

<script setup>
function handleClick() {
  alert('头像被点击了！')
}
</script>
```

### 可访问性增强

```vue
<template>
  <div class="avatar-demo">
    <JvAvatar 
      text="JV" 
      alt="Jovial UI头像" 
      ariaLabel="用户头像：Jovial UI" 
      tabindex="0"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
function handleClick() {
  alert('头像被点击了！')
}
</script>
``` 