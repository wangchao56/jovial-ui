# JvGrid 网格布局组件

JvGrid 是一个灵活的网格布局组件，基于CSS Grid实现，支持响应式设计。

## 特性

- 支持自定义列数和行数
- 支持响应式断点调整布局
- 支持Material Design窗口尺寸类别
- 灵活的间距配置
- 支持自定义标题和子标题
- 支持多种视觉风格和颜色主题
- 支持多种状态（禁用、可点击等）

## 基础用法

```vue
<JvGrid :cols="3" :gap="16">
  <JvGridItem v-for="i in 9" :key="i">
    内容 {{ i }}
  </JvGridItem>
</JvGrid>
```

## 响应式断点支持

JvGrid 组件支持根据断点自动调整布局，可以为不同断点设置不同的列数、行数和间距。

```vue
<JvGrid
  :responsive-cols="{
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    '2xl': 12
  }"
  :responsive-gap="{
    xs: 8,
    md: 16,
    lg: 24
  }"
>
  <JvGridItem v-for="i in 12" :key="i">
    内容 {{ i }}
  </JvGridItem>
</JvGrid>
```

### 可用断点

| 断点名称 | 屏幕宽度 |
| -------- | -------- |
| xs       | < 640px  |
| sm       | ≥ 640px  |
| md       | ≥ 768px  |
| lg       | ≥ 1024px |
| xl       | ≥ 1280px |
| 2xl      | ≥ 1536px |

## Material Design 窗口尺寸类别

组件已内置支持Material Design窗口尺寸类别，会根据窗口尺寸自动应用相应的样式。

| 尺寸类别 | 屏幕宽度       | 特点                             |
| -------- | -------------- | -------------------------------- |
| compact  | < 600px        | 单列布局，密集内容，最小化边距   |
| medium   | 600px - 840px  | 8列网格，增加内边距和元素间距    |
| expanded | 840px - 1200px | 12列网格，更大边距，适合平板设备 |
| large    | ≥ 1200px       | 12列网格，最大边距，适合桌面设备 |

## 高级用法

### 单独设置行列间距

```vue
<JvGrid :cols="4" :row-gap="24" :col-gap="16">
  <!-- 内容 -->
</JvGrid>
```

### 响应式行列间距

```vue
<JvGrid
  :cols="3"
  :responsive-row-gap="{
    xs: 8,
    md: 24
  }"
  :responsive-col-gap="{
    xs: 4,
    md: 16
  }"
>
  <!-- 内容 -->
</JvGrid>
```

### 自动填充

```vue
<JvGrid
  :cols="250"  <!-- 最小宽度，单位px -->
  :auto-fill="true"
>
  <!-- 内容 -->
</JvGrid>
```

### 使用 useBreakpoints 钩子

在组件中，您可以使用 `useBreakpoints` 钩子来获取当前断点信息：

```vue
<script setup>
import { useBreakpoints } from '@/hooks'

const {
  current, // 当前激活的断点
  windowWidth, // 窗口宽度
  windowSizeClass, // Material Design 窗口尺寸类别
  isXs,
  isSm,
  isMd,
  isLg,
  isXl,
  is2xl, // 当前断点判断
  gtOrEq, // 是否大于等于指定断点
  lt // 是否小于指定断点
} = useBreakpoints()

// 示例
const isLargeScreen = gtOrEq('lg')
const isSmallScreen = lt('md')
</script>
```

## 属性

| 属性名           | 类型                | 默认值     | 说明             |
| ---------------- | ------------------- | ---------- | ---------------- |
| cols             | number/string       | 12         | 列数             |
| responsiveCols   | Object              | -          | 响应式列数配置   |
| rows             | number/string       | -          | 行数             |
| responsiveRows   | Object              | -          | 响应式行数配置   |
| gap              | number/string/Array | 16         | 网格间距         |
| responsiveGap    | Object              | -          | 响应式间距配置   |
| rowGap           | number/string       | -          | 行间距           |
| responsiveRowGap | Object              | -          | 响应式行间距配置 |
| colGap           | number/string       | -          | 列间距           |
| responsiveColGap | Object              | -          | 响应式列间距配置 |
| header           | string              | -          | 标题内容         |
| subheader        | string              | -          | 子标题内容       |
| autoFill         | boolean             | false      | 是否自动填充     |
| fill             | boolean             | false      | 是否填充父容器   |
| height           | number/string       | -          | 高度设置         |
| width            | number/string       | -          | 宽度设置         |
| padding          | string              | 'md'       | 内边距大小       |
| rounded          | string              | 'rounded'  | 圆角风格         |
| bordered         | boolean             | false      | 是否显示边框     |
| disabled         | boolean             | false      | 是否禁用         |
| clickable        | boolean             | false      | 是否可点击       |
| colorType        | string              | 'default'  | 颜色类型         |
| variant          | string              | 'elevated' | 视觉变体         |

## 事件

| 事件名 | 参数              | 说明           |
| ------ | ----------------- | -------------- |
| click  | event: MouseEvent | 点击网格时触发 |

## 插槽

| 插槽名    | 说明                     |
| --------- | ------------------------ |
| default   | 默认插槽，放置网格项内容 |
| header    | 标题区域插槽             |
| subheader | 子标题区域插槽           |
| footer    | 底部区域插槽             |
