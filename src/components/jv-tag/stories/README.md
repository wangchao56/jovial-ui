# JvTag 标签组件

## 1. 介绍组件

JvTag 是一个用于标记和分类的标签组件，可以展示状态、属性和分类信息。它包含单个标签 (JvTag) 和标签组 (JvTagGroup) 两个组件，可以灵活组合使用，适用于信息展示、筛选、分类等场景。

## 2. 布局结构使用方式

### JvTag 组件

JvTag 组件采用简洁的结构，主要包含以下部分：

- 前置区域 (prepend)：可选的前置图标或内容
- 内容区域 (content)：标签的主要文本或内容
- 关闭按钮 (close)：可选的关闭按钮

基本使用示例：

```vue
<template>
  <!-- 基础标签 -->
  <JvTag label="标签" />

  <!-- 不同类型 -->
  <JvTag label="主要" type="primary" />
  <JvTag label="成功" type="success" />
  <JvTag label="警告" type="warning" />
  <JvTag label="错误" type="error" />
  <JvTag label="信息" type="info" />

  <!-- 可关闭标签 -->
  <JvTag label="可关闭" closable @clickClose="handleClose" />

  <!-- 带图标的标签 -->
  <JvTag label="带图标" prependIcon="mdi:star" />

  <!-- 自定义内容 -->
  <JvTag>
    <template #prepend>
      <img src="avatar.jpg" width="16" height="16" alt="用户头像" />
    </template>
    用户名
  </JvTag>
</template>
```

### JvTagGroup 组件

JvTagGroup 用于管理一组标签，提供了折叠、搜索、添加、选择等功能：

```vue
<template>
  <JvTagGroup
    v-model:tags="tags"
    closable
    addable
    searchable
    selectable
    multiple
    @close="handleClose"
    @add="handleAdd"
    @select="handleSelect"
    @search="handleSearch"
  >
    <!-- 自定义标签内容 -->
    <template #tag="{ tag }">
      {{ tag.props.label }}
    </template>

    <!-- 前缀内容 -->
    <template #prefix>
      <span class="label">标签：</span>
    </template>

    <!-- 后缀内容 -->
    <template #suffix>
      <button @click="clearAll">清空</button>
    </template>
  </JvTagGroup>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref([
  { id: 1, selected: false, props: { label: '标签1', type: 'primary' } },
  { id: 2, selected: false, props: { label: '标签2', type: 'success' } },
  { id: 3, selected: false, props: { label: '标签3', type: 'warning' } }
])

const handleClose = (tag, index) => {
  console.log('关闭标签', tag, index)
}

const handleAdd = () => {
  console.log('添加标签')
}

const handleSelect = (tag, index) => {
  console.log('选择标签', tag, index)
}

const handleSearch = (keyword) => {
  console.log('搜索标签', keyword)
}

const clearAll = () => {
  tags.value = []
}
</script>
```

## 3. 样式

### JvTag 组件样式

JvTag 组件提供多种样式定制选项：

- **类型 (type)**：

  - primary (默认)：主要标签，使用主题主色
  - success：成功标签，通常为绿色
  - warning：警告标签，通常为黄色
  - error：错误标签，通常为红色
  - info：信息标签，通常为蓝色

- **变体 (variant)**：

  - filled (默认)：填充样式，带背景色
  - outlined：描边样式，透明背景带边框
  - tonal：色调样式，半透明背景色

- **尺寸 (size)**：

  - small：小尺寸标签
  - medium (默认)：中等尺寸标签
  - large：大尺寸标签

- **形状 (shape)**：
  - square (默认)：方形标签（带圆角）
  - pill：药丸形标签

### JvTagGroup 组件样式

JvTagGroup 组件样式主要基于标签组的功能性设计：

- 标签按照水平流式布局排列
- 搜索框在标签组顶部（启用搜索功能时）
- 折叠状态下显示 "+N" 的指示器
- 添加按钮使用特殊样式，通常为描边样式
- 可定制每个标签的默认样式属性

## 4. 交互

### JvTag 交互

JvTag 组件提供以下交互特性：

- **点击事件**：标签可以响应点击事件
- **关闭功能**：启用 closable 后，可以点击关闭按钮移除标签
- **键盘导航**：支持通过键盘导航和操作
- **过渡动画**：标签在添加和移除时有平滑的过渡效果

### JvTagGroup 交互

JvTagGroup 组件提供以下丰富的交互功能：

- **折叠展开**：当标签数量超过 maxCollapse 设定值时，多余标签会被折叠，可通过点击展开/收起
- **添加标签**：启用 addable 属性后，可以通过输入框添加新标签
- **删除标签**：启用 closable 属性后，可以删除组内的标签
- **搜索过滤**：启用 searchable 属性后，可以搜索标签
- **标签选择**：启用 selectable 属性后，标签可以被选中，支持单选和多选模式
- **清除选择**：在多选模式下，提供清除全部选择的功能

## 5. 可访问性

JvTag 组件的可访问性设计包括：

- 使用语义化的 HTML 结构
- 标签设置了 role="tag" 属性，提高屏幕阅读器的识别度
- 支持 tabindex 属性，允许通过键盘导航
- 关闭按钮提供适当的视觉反馈和焦点状态
- 选择和关闭功能支持键盘操作（Space 和 Enter 键）
- 足够的颜色对比度确保视觉上的可识别性
- 标签组提供清晰的状态指示，如选中状态、折叠状态等

## 6. Vue API

### JvTag 组件

#### Props

| 属性名      | 类型                                                     | 默认值    | 说明           |
| ----------- | -------------------------------------------------------- | --------- | -------------- |
| type        | 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'primary' | 标签类型       |
| size        | 'small' \| 'medium' \| 'large'                           | 'medium'  | 标签尺寸       |
| shape       | 'square' \| 'pill'                                       | 'square'  | 标签形状       |
| color       | string                                                   | undefined | 自定义标签颜色 |
| closable    | boolean                                                  | false     | 是否可关闭     |
| closeIcon   | string                                                   | ''        | 自定义关闭图标 |
| prependIcon | string                                                   | ''        | 前置图标       |
| label       | string                                                   | ''        | 标签文本内容   |
| variant     | 'filled' \| 'outlined' \| 'tonal'                        | 'filled'  | 标签变体样式   |
| selectable  | boolean                                                  | false     | 是否可选择     |
| selected    | boolean                                                  | false     | 是否已选中     |

#### 事件 (Emits)

| 事件名      | 参数                | 说明                 |
| ----------- | ------------------- | -------------------- |
| click       | (event: MouseEvent) | 点击标签时触发       |
| clickClose  | (event: MouseEvent) | 点击关闭按钮时触发   |
| groupSelect | (selected: boolean) | 在标签组中选择时触发 |

#### 插槽 (Slots)

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 标签内容的默认插槽 |
| prepend | 标签前置内容插槽   |

#### 暴露方法 (Expose)

| 方法名 | 参数 | 说明           |
| ------ | ---- | -------------- |
| focus  | -    | 使标签获取焦点 |
| blur   | -    | 使标签失去焦点 |

### JvTagGroup 组件

#### Props

| 属性名            | 类型                              | 默认值     | 说明                     |
| ----------------- | --------------------------------- | ---------- | ------------------------ |
| tags              | JvTagItemProps[]                  | []         | 标签数据数组             |
| collapsible       | boolean                           | false      | 是否可折叠               |
| maxCollapse       | number                            | 5          | 折叠前显示的最大标签数量 |
| closable          | boolean                           | false      | 标签是否可关闭           |
| addable           | boolean                           | false      | 是否可添加标签           |
| selectable        | boolean                           | false      | 标签是否可选择           |
| multiple          | boolean                           | false      | 是否允许多选             |
| searchable        | boolean                           | false      | 是否可搜索               |
| defaultTagType    | TagType                           | 'primary'  | 默认标签类型             |
| defaultTagSize    | SizeType                          | 'small'    | 默认标签尺寸             |
| defaultTagVariant | 'filled' \| 'outlined' \| 'tonal' | 'outlined' | 默认标签变体             |
| defaultTagShape   | 'square' \| 'pill'                | 'square'   | 默认标签形状             |

#### 事件 (Emits)

| 事件名      | 参数                                 | 说明               |
| ----------- | ------------------------------------ | ------------------ |
| close       | (tag: JvTagItemProps, index: number) | 关闭标签时触发     |
| add         | -                                    | 添加标签时触发     |
| update:tags | (tags: JvTagItemProps[])             | 标签数组更新时触发 |
| select      | (tag: JvTagItemProps, index: number) | 选择标签时触发     |
| search      | (keyword: string)                    | 搜索标签时触发     |

#### 插槽 (Slots)

| 插槽名  | 说明                                      |
| ------- | ----------------------------------------- |
| tag     | 自定义标签内容，提供 tag 属性访问标签数据 |
| prefix  | 标签组前置内容                            |
| suffix  | 标签组后置内容                            |
| actions | 标签组操作区域                            |

#### 标签数据结构 (JvTagItemProps)

```typescript
interface JvTagItemProps {
  id?: string | number // 标签唯一标识
  selected?: boolean // 是否选中
  props?: JvTagProps // 标签属性
}
```
