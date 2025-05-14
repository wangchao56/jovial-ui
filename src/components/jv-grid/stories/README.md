# JvGrid 网格布局组件

JvGrid 是一个简洁的网格布局组件，基于CSS Grid实现，支持响应式设计。

## 特性

- 支持自定义列数和行数
- 支持响应式断点调整布局
- 灵活的间距配置
- 支持设置宽高和填充

## 基础用法

```vue
<JvGrid :cols="3" :gap="16">
  <JvGridItem v-for="i in 9" :key="i">
    内容 {{ i }}
  </JvGridItem>
</JvGrid>
```

## 响应式断点支持

JvGrid 组件支持根据断点自动调整布局，可以为不同断点设置不同的列数和间距。

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

## 组件 API

### Props

| 属性名         | 类型                                     | 默认值 | 说明           |
| -------------- | ---------------------------------------- | ------ | -------------- |
| cols           | number                                   | 12     | 列数           |
| responsiveCols | Partial<Record<Breakpoint, number>>      | -      | 响应式列数     |
| rows           | number                                   | -      | 行数           |
| gap            | number \| string \| [string\|number, string\|number] | 16     | 栅格间距       |
| responsiveGap  | Partial<Record<Breakpoint, GridGap>>     | -      | 响应式间距     |
| fill           | boolean                                  | false  | 是否填充父容器 |
| height         | number/string                            | -      | 高度设置       |
| width          | number/string                            | -      | 宽度设置       |

### JvGridItem Props

| 属性名    | 类型            | 默认值 | 说明           |
| --------- | --------------- | ------ | -------------- |
| rowStart  | number          | -      | 行起始位置     |
| rowEnd    | number          | -      | 行结束位置     |
| colStart  | number          | -      | 列起始位置     |
| colEnd    | number          | -      | 列结束位置     |
| rowSpan   | number          | -      | 跨行数         |
| colSpan   | number          | -      | 跨列数         |
| fill      | boolean         | false  | 是否填充父容器 |
