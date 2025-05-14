# Typography 排版

Typography（排版）组件是 Jovial UI 设计系统的核心部分，它提供了一套完整的文本排版工具，基于 Material Design 规范设计，用于创建清晰、一致且有层次感的文本内容。

## 组件介绍

Typography 组件系统包含以下组件：

- **JvTitle**: 用于创建标题（H1-H6），支持不同层级的标题样式
- **JvText**: 用于内联文本元素，支持各种文本变体和样式
- **JvParagraph**: 用于段落文本，提供段落级文本的排版控制
- **JvLink**: 用于链接文本，提供多种样式的链接

所有组件均基于 Material Design 的排版规范，提供丰富的自定义选项，包括颜色、大小、字重、对齐方式等。

## 布局结构与使用方式

Typography 组件可以单独使用，也可以组合使用，以创建完整的文本布局。

### 基本用法

```vue
<JvTypography>
  <JvTitle level="1">主标题</JvTitle>
  <JvText mdVariant="subtitle1">副标题文本</JvText>
  <JvParagraph>
    这是一个段落文本，用于展示大段的文字内容。可以设置多种样式和属性。
  </JvParagraph>
  <JvLink href="https://example.com">链接文本</JvLink>
</JvTypography>
```

### 嵌套使用

组件支持嵌套使用，可以在段落内部使用链接或特殊格式的文本：

```vue
<JvParagraph>
  普通文本 <JvText weight="bold">加粗文本</JvText> 普通文本
  <JvLink href="https://example.com">链接文本</JvLink> 普通文本
</JvParagraph>
```

## Material Design 排版规范

Jovial UI 的排版系统遵循 Material Design 的排版规范，提供以下文本变体：

### 标题类

- **H1** (96px): 特大标题，仅限特殊场景，如页面主标题、重要标语
- **H2** (60px): 大标题，用于次级标题、重要模块标题
- **H3** (48px): 中等标题，用于部分标题、关键信息标题
- **H4** (34px): 较小标题，用于模块标题、分段标题
- **H5** (24px): 常规标题，用于文章标题、列表标题
- **H6** (20px): 较小标题，用于辅助标题、次要信息标题

### 正文类

- **Subtitle1** (16px): 副标题，中等粗细，用于文章副标题、重要说明
- **Subtitle2** (14px): 副标题，加粗，用于强调副标题、重要提示
- **Body1** (16px): 常规正文，用于主要内容、段落文本
- **Body2** (14px): 辅助正文，用于辅助说明、次要内容

### 按钮与标签

- **Button** (14px): 按钮文本，全大写，加粗
- **Caption** (12px): 小字说明，用于辅助说明、注释
- **Overline** (10px): 标签或分类标识，用于标签、分类标识

## 交互特性

Typography 组件支持多种交互特性：

- **文本截断**: 支持单行和多行文本溢出省略
- **响应式排版**: 在不同设备上保持一致的排版效果
- **链接交互**: 支持悬停、点击等交互效果

## 可访问性

Typography 组件遵循 WCAG 2.1 可访问性指南：

- 提供足够的对比度，确保文本在各种背景下可读
- 使用适当的字体大小，提高可读性
- 支持响应式设计，适应不同设备和浏览器设置
- 使用语义化的 HTML 标签，增强屏幕阅读器兼容性

## 组件 API

### JvTitle Props

| 属性         | 类型                                | 默认值  | 说明                |
| ------------ | ----------------------------------- | ------- | ------------------- |
| level        | 1 \| 2 \| 3 \| 4 \| 5 \| 6         | 2       | 标题级别            |
| size         | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' | -       | 标题大小，覆盖level  |
| color        | string                              | 'default' | 文本颜色            |
| weight       | 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold' | -       | 字体粗细            |
| lineHeight   | 'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose' | -     | 行高          |
| align        | 'left' \| 'center' \| 'right' \| 'justify' | 'left'  | 文本对齐方式        |
| gutterBottom | boolean                             | true    | 是否显示底部间距    |
| text         | string                              | -       | 标题文本内容        |

### JvText Props

| 属性         | 类型                                | 默认值  | 说明                |
| ------------ | ----------------------------------- | ------- | ------------------- |
| size         | 'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 文本大小 |
| variant      | TextVariant                         | 'span'  | HTML标签类型        |
| mdVariant    | MaterialTextVariant                 | -       | Material Design文本变体 |
| color        | string                              | 'default' | 文本颜色           |
| secondary    | boolean                             | false   | 是否为次要文本      |
| weight       | 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold' | 'medium' | 字体粗细 |
| lineHeight   | 'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose' | 'normal' | 行高 |
| align        | 'left' \| 'center' \| 'right' \| 'justify' | 'left'  | 文本对齐方式       |
| ellipsis     | number \| boolean                   | false   | 多行文本省略        |
| truncate     | boolean                             | false   | 是否截断多余文本    |
| text         | string \| number                    | -       | 文本内容            |

### JvParagraph 段落文本组件

JvParagraph是一个用于展示段落文本的组件，提供丰富的排版功能，包括尺寸、颜色、行高、对齐方式、首行缩进、行数限制等控制选项。

### 基本用法

```vue
<JvParagraph>
  这是一个简单的段落文本。
</JvParagraph>
```

### 尺寸设置

支持预设尺寸和自定义尺寸：

```vue
<!-- 使用预设尺寸 -->
<JvParagraph size="small">小尺寸文本</JvParagraph>
<JvParagraph size="medium">中等尺寸文本</JvParagraph>
<JvParagraph size="large">大尺寸文本</JvParagraph>

<!-- 使用自定义尺寸（数字，单位为px） -->
<JvParagraph :size="16">16px大小文本</JvParagraph>

<!-- 使用自定义尺寸（带单位的字符串） -->
<JvParagraph size="1.5rem">1.5rem大小文本</JvParagraph>
```

### 文本样式控制

可以控制文本的颜色、对齐方式和行高：

```vue
<!-- 颜色 -->
<JvParagraph color="primary">主色文本</JvParagraph>
<JvParagraph color="secondary">次要色文本</JvParagraph>

<!-- 对齐方式 -->
<JvParagraph align="left">左对齐文本</JvParagraph>
<JvParagraph align="center">居中对齐文本</JvParagraph>
<JvParagraph align="right">右对齐文本</JvParagraph>
<JvParagraph align="justify">两端对齐文本</JvParagraph>

<!-- 行高 -->
<JvParagraph lineHeight="normal">正常行高文本</JvParagraph>
<JvParagraph lineHeight="loose">宽松行高文本</JvParagraph>
```

### 高级排版功能

提供首行缩进、行数限制、文本溢出控制等高级排版功能：

```vue
<!-- 首行缩进（单位为em） -->
<JvParagraph :indent="2">
  这是一段带有首行缩进的文本，缩进量为2em。这样的排版在正式文档中常见。
</JvParagraph>

<!-- 行数限制 -->
<JvParagraph :lines="3" ellipsis>
  这是一段限制为3行的文本，超出部分将被省略。这样的设置在卡片、列表等UI组件中非常有用，可以保持界面的整洁和一致性。
</JvParagraph>

<!-- Material Design文本变体 -->
<JvParagraph mdVariant="body1">
  这是使用Material Design body1变体的文本。
</JvParagraph>
<JvParagraph mdVariant="body2">
  这是使用Material Design body2变体的文本。
</JvParagraph>
```

### 直接设置文本内容

除了使用slot，还可以直接通过`text`属性设置文本内容：

```vue
<JvParagraph text="这是通过text属性设置的文本内容" />
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | SizeType \| number \| string | 'medium' | 文本大小，可以是预设尺寸、数字（px）或带单位的字符串 |
| color | ColorType | 'default' | 文本颜色 |
| mdVariant | MaterialTextVariant | 'body1' | Material Design文本变体 |
| lineHeight | LineHeightType | 'normal' | 行高 |
| align | AlignType | 'justify' | 文本对齐方式 |
| ellipsis | number \| boolean | false | 文本溢出控制，true表示启用省略，数字表示最大行数 |
| indent | number | - | 首行缩进，单位为em |
| lines | number | - | 文本行数限制 |
| text | string \| number | - | 文本内容 |

### JvLink Props

| 属性         | 类型                                | 默认值  | 说明                |
| ------------ | ----------------------------------- | ------- | ------------------- |
| href         | string                              | -       | 链接地址            |
| target       | '_blank' \| '_self' \| '_parent' \| '_top' | -   | 链接打开方式        |
| rel          | string                              | -       | 链接关系属性        |
| size         | 'tiny' \| 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 链接文本大小 |
| type         | string                              | -       | 链接颜色类型        |
| underline    | boolean                             | false   | 是否显示下划线      |
| disabled     | boolean                             | false   | 是否禁用链接        |

## 使用示例

查看不同的故事示例，了解Typography组件的各种用法和组合方式。