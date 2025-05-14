# JvMenu 菜单组件

JvMenu 是一个功能完整的菜单组件，支持嵌套菜单、分组、分割线和懒加载。

## 组件介绍

JvMenu 组件提供了丰富的菜单功能，包括：

- 普通菜单项 (JvMenuItem)
- 分组菜单 (JvMenuGroup)
- 子菜单 (JvSubMenu)
- 分割线 (JvMenuDivider)

组件采用了扁平化渲染和懒加载技术，提高了性能和用户体验。通过 `useMenuFlatten` 和 `useLazyMenu` 这两个核心 hooks，实现了树形数据结构的高效渲染和按需加载，特别适合于大型嵌套菜单的场景。

## 布局结构使用方式

### 基础菜单

```vue
<JvMenu>
  <template #default>
    <JvButton>打开菜单</JvButton>
  </template>
  
  <template #content>
    <JvMenuItem title="菜单项1" />
    <JvMenuItem title="菜单项2" />
    <JvMenuDivider />
    <JvMenuItem title="菜单项3" />
  </template>
</JvMenu>
```

### 使用菜单分组

```vue
<JvMenu>
  <template #default>
    <JvButton>打开菜单</JvButton>
  </template>
  
  <template #content>
    <JvMenuGroup title="分组1">
      <JvMenuItem title="菜单项1" />
      <JvMenuItem title="菜单项2" />
    </JvMenuGroup>
    <JvMenuDivider />
    <JvMenuGroup title="分组2">
      <JvMenuItem title="菜单项3" />
      <JvMenuItem title="菜单项4" />
    </JvMenuGroup>
  </template>
</JvMenu>
```

### 使用子菜单

```vue
<JvMenu>
  <template #default>
    <JvButton>打开菜单</JvButton>
  </template>
  
  <template #content>
    <JvMenuItem title="菜单项1" />
    <JvSubMenu title="子菜单1">
      <JvMenuItem title="子菜单项1" />
      <JvMenuItem title="子菜单项2" />
      <JvSubMenu title="嵌套子菜单">
        <JvMenuItem title="嵌套菜单项1" />
        <JvMenuItem title="嵌套菜单项2" />
      </JvSubMenu>
    </JvSubMenu>
    <JvMenuItem title="菜单项2" />
  </template>
</JvMenu>
```

### 使用数据源渲染菜单

```vue
<template>
  <JvMenu :items="menuItems" @item-click="handleItemClick" />
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  {
    type: 'item',
    id: 'item1',
    title: '菜单项1'
  },
  {
    type: 'group',
    id: 'group1',
    title: '分组1',
    children: [
      {
        type: 'item',
        id: 'item2',
        title: '菜单项2'
      },
      {
        type: 'item',
        id: 'item3',
        title: '菜单项3'
      }
    ]
  },
  {
    type: 'divider',
    id: 'divider1'
  },
  {
    type: 'submenu',
    id: 'submenu1',
    title: '子菜单1',
    expanded: false,
    children: [
      {
        type: 'item',
        id: 'item4',
        title: '子菜单项1'
      },
      {
        type: 'item',
        id: 'item5',
        title: '子菜单项2'
      }
    ]
  }
])

function handleItemClick(item) {
  console.log('点击菜单项:', item)
}
</script>
```

## 交互设计

- **菜单项**：支持点击事件，可以设置禁用状态和激活状态
- **菜单分组**：将相关菜单项组织在一起，提供分组标题
- **子菜单**：支持展开/折叠，可以嵌套多级子菜单
- **懒加载**：子菜单内容仅在展开时渲染，提高性能
- **扁平化渲染**：使用扁平数据结构，避免深层递归渲染

## 可访问性

组件充分考虑了可访问性设计：

- 使用 `role` 属性定义适当的 ARIA 角色（如 `menu`、`menuitem`、`group`）
- 使用 `aria-haspopup`、`aria-expanded` 等属性表示组件状态
- 支持键盘导航，可以通过 Tab、Enter、Space 等键操作
- 为禁用状态提供视觉和语义标记
- 支持屏幕阅读器，提供合适的焦点管理

## Vue 组件 API

### JvMenu

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | Array | [] | 菜单项数据源 |
| modelValue | Boolean | false | 菜单是否可见 |
| placement | String | 'bottom-start' | 菜单位置 |
| trigger | String | 'click' | 触发方式，可选值: 'click', 'hover', 'manual' |
| offset | Number | 4 | 菜单偏移量 |
| arrow | Boolean | false | 是否显示箭头 |
| disabled | Boolean | false | 是否禁用菜单 |
| width | String/Number | 'auto' | 菜单宽度 |
| maxHeight | String/Number | '300px' | 菜单最大高度 |
| zIndex | Number | 2000 | 菜单z-index |
| closeOnClickOutside | Boolean | true | 点击外部是否关闭菜单 |
| closeOnEsc | Boolean | true | 按ESC键是否关闭菜单 |
| transition | String | 'fade' | 过渡动画名称 |
| teleport | String | 'body' | 传送门挂载位置 |

#### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | value: Boolean | 菜单显示状态变化事件 |
| show | - | 菜单显示事件 |
| hide | - | 菜单隐藏事件 |
| clickOutside | event: MouseEvent | 点击菜单外部事件 |
| itemClick | item: MenuItem | 菜单项点击事件 |

#### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 菜单触发元素 |
| content | 菜单内容 |
| arrow | 自定义箭头 |
| item | 自定义菜单项渲染 |
| group | 自定义菜单组渲染 |
| submenu | 自定义子菜单渲染 |
| empty | 空状态 |

#### Expose

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| show | - | 显示菜单 |
| hide | - | 隐藏菜单 |
| toggle | - | 切换菜单显示状态 |

### JvMenuGroup

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | '' | 分组标题 |
| disabled | Boolean | false | 是否禁用整个分组 |

#### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 分组内容，通常为多个JvMenuItem |
| title | 自定义标题 |

### JvSubMenu

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | '' | 子菜单标题 |
| disabled | Boolean | false | 是否禁用子菜单 |
| expanded | Boolean | false | 是否默认展开 |
| icon | String | '' | 子菜单图标 |
| showArrow | Boolean | true | 是否显示箭头图标 |
| lazy | Boolean | true | 是否懒加载子菜单内容 |

#### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:expanded | value: Boolean | 展开状态变化事件 |
| expand | event: MouseEvent/KeyboardEvent | 展开事件 |
| collapse | event: MouseEvent/KeyboardEvent | 折叠事件 |

#### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 子菜单内容 |
| title | 自定义标题 |
| icon | 自定义图标 |
| arrow | 自定义箭头 |

## 测试用例

### 基础功能测试

- 测试菜单组件的基本渲染和布局
- 测试菜单项的点击事件
- 测试菜单的显示/隐藏
- 测试菜单分组的渲染
- 测试子菜单的展开/折叠

### Props 功能测试

- 测试不同的触发方式：点击、悬停和手动
- 测试禁用状态
- 测试不同的菜单位置
- 测试自定义宽度和高度
- 测试子菜单的懒加载功能

### Emits 事件测试

- 测试菜单项点击事件
- 测试菜单展开/折叠事件
- 测试点击外部关闭事件
- 测试 ESC 键关闭事件

### Slots 插槽测试

- 测试默认插槽和内容插槽
- 测试自定义标题插槽
- 测试自定义图标和箭头插槽

### Expose API 测试

- 测试菜单的 show/hide/toggle 方法
- 测试扁平化渲染 API
- 测试懒加载 API

### 样式测试

- 测试默认样式
- 测试激活状态样式
- 测试禁用状态样式
- 测试展开/折叠动画

### 可访问性测试

- 测试键盘导航
- 测试 ARIA 属性
- 测试焦点管理
- 测试屏幕阅读器支持

## 使用示例

### 基础菜单

```vue
<template>
  <JvMenu>
    <template #default>
      <JvButton>基础菜单</JvButton>
    </template>
    
    <template #content>
      <JvMenuItem title="编辑" icon="edit" />
      <JvMenuItem title="复制" icon="copy" />
      <JvMenuDivider />
      <JvMenuItem title="删除" icon="delete" disabled />
    </template>
  </JvMenu>
</template>
```

### 带分组的菜单

```vue
<template>
  <JvMenu>
    <template #default>
      <JvButton>带分组菜单</JvButton>
    </template>
    
    <template #content>
      <JvMenuGroup title="文件操作">
        <JvMenuItem title="新建" icon="file-plus" />
        <JvMenuItem title="打开" icon="folder-open" />
        <JvMenuItem title="保存" icon="save" />
      </JvMenuGroup>
      
      <JvMenuDivider />
      
      <JvMenuGroup title="编辑操作">
        <JvMenuItem title="剪切" icon="scissors" />
        <JvMenuItem title="复制" icon="copy" />
        <JvMenuItem title="粘贴" icon="clipboard" />
      </JvMenuGroup>
    </template>
  </JvMenu>
</template>
```

### 嵌套子菜单

```vue
<template>
  <JvMenu>
    <template #default>
      <JvButton>嵌套子菜单</JvButton>
    </template>
    
    <template #content>
      <JvMenuItem title="首页" icon="home" />
      
      <JvSubMenu title="设置" icon="settings">
        <JvMenuItem title="用户设置" />
        <JvMenuItem title="系统设置" />
        
        <JvSubMenu title="高级设置">
          <JvMenuItem title="网络配置" />
          <JvMenuItem title="安全设置" />
        </JvSubMenu>
      </JvSubMenu>
      
      <JvMenuItem title="退出" icon="log-out" />
    </template>
  </JvMenu>
</template>
```

### 使用数据源和扁平化渲染

```vue
<template>
  <JvMenu>
    <template #default>
      <JvButton>优化渲染菜单</JvButton>
    </template>
    
    <template #content>
      <OptimizedMenuRenderer :items="menuItems" />
    </template>
  </JvMenu>
</template>

<script setup>
import { ref } from 'vue'
import OptimizedMenuRenderer from '@/components/jv-menu/src/OptimizedMenuRenderer.vue'

const menuItems = ref([
  // 大量嵌套菜单数据
  // ...
])
</script>
``` 