# JvList 列表组件

## 1. 组件介绍

JvList 是一个用于显示数据集合的组件，支持多种布局和样式选项。列表组件可以用于导航菜单、数据展示、选择操作等多种场景。组件提供了丰富的定制选项，可以轻松实现各种复杂的列表布局和交互效果。

特点：
- 灵活的布局：支持密集、普通、宽松三种布局密度
- 丰富的样式：支持边框、分割线、圆角、悬浮效果等多种样式选项
- 强大的交互：支持链接、点击事件、选择、禁用等多种交互方式
- 多级嵌套：支持创建多级嵌套列表结构
- 虚拟滚动：大数据量时支持虚拟滚动，提高性能

## 2. 布局结构使用方式

列表组件由 JvList 和 JvListItem 两个组件组成。JvList 作为容器，而 JvListItem 作为列表项。每个列表项可以包含标题、副标题、描述、图标以及自定义内容。

### 基本布局

```vue
<JvList>
  <JvListItem title="标题1" subtitle="副标题1" icon="icon-user" />
  <JvListItem title="标题2" subtitle="副标题2" icon="icon-settings" />
  <JvListItem title="标题3" subtitle="副标题3" icon="icon-home" />
</JvList>
```

### 带有链接的列表

```vue
<JvList bordered divided>
  <JvListItem title="谷歌" subtitle="搜索引擎" link="https://google.com" />
  <JvListItem title="百度" subtitle="搜索引擎" link="https://baidu.com" />
</JvList>
```

### 使用插槽

```vue
<JvList bordered>
  <template #header>
    <h3>用户列表</h3>
  </template>
  
  <JvListItem v-for="user in users" :key="user.id" :title="user.name" :subtitle="user.email" />
  
  <template #empty>
    <p>没有可用的用户数据</p>
  </template>
  
  <template #footer>
    <div class="list-footer">共 {{ users.length }} 条数据</div>
  </template>
</JvList>
```

## 3. 交互设计

JvList 组件提供了丰富的交互功能，以满足不同的使用场景需求：

### 点击交互
- **链接导航**：通过 `link` 属性设置链接，点击后跳转到指定页面
- **点击事件**：通过 `@click` 监听点击事件，执行自定义操作
- **阻止冒泡**：在嵌套列表中可以使用 `stopPropagation` 阻止事件冒泡

### 视觉反馈
- **悬停效果**：通过 `hover` 属性启用鼠标悬停效果，提供视觉反馈
- **激活状态**：通过 `active` 属性标记当前激活的列表项
- **禁用状态**：通过 `disabled` 属性禁用特定列表项或整个列表

### 展开/折叠
- **可展开列表**：支持创建可展开/折叠的列表项
- **手风琴效果**：可以实现一次只展开一个列表项的手风琴效果
- **默认展开**：通过 `defaultExpanded` 属性设置默认展开的列表项

使用示例：

```vue
<JvList hover>
  <!-- 链接项 -->
  <JvListItem title="外部链接" link="https://example.com" target="_blank" />
  
  <!-- 点击事件 -->
  <JvListItem title="点击操作" @click="handleItemClick" />
  
  <!-- 禁用项 -->
  <JvListItem title="禁用项" disabled />
  
  <!-- 激活项 -->
  <JvListItem title="当前激活" active />
</JvList>
```

## 4. 样式定制

列表支持多种样式选项，可以根据需要进行定制：

### 列表样式
- **边框**：通过 `bordered` 属性为列表添加边框
- **分割线**：通过 `divided` 属性为列表项之间添加分割线
- **圆角**：通过 `rounded` 属性设置列表圆角
- **密度**：通过 `dense` 属性设置紧凑模式，减小列表项间距
- **背景色**：通过 `color` 属性设置列表背景色
- **悬浮效果**：通过 `hover` 属性启用鼠标悬停效果
- **最大高度**：通过 `maxHeight` 属性限制列表的最大高度，超出部分可滚动

### 列表项样式
- **图标**：通过 `icon` 属性或插槽添加图标
- **头像**：通过插槽添加头像
- **布局**：支持灵活的内容布局，可以通过插槽自定义布局
- **强调显示**：通过 `highlighted` 属性突出显示特定列表项

使用样式示例：

```vue
<!-- 带边框的列表 -->
<JvList bordered>...</JvList>

<!-- 带分割线的列表 -->
<JvList divided>...</JvList>

<!-- 圆角列表 -->
<JvList rounded>...</JvList>

<!-- 紧凑列表 -->
<JvList dense>...</JvList>

<!-- 悬浮效果 -->
<JvList hover>...</JvList>

<!-- 彩色背景 -->
<JvList color="primary">...</JvList>

<!-- 固定高度 -->
<JvList :maxHeight="300">...</JvList>
```

## 5. 可访问性

JvList 组件在设计时充分考虑了可访问性需求，遵循 WCAG 标准：

- **语义化结构**：列表使用 `<ul>`, `<li>` 元素构建，保持正确的HTML语义
- **键盘导航**：支持通过Tab键和方向键在列表项间导航
- **焦点管理**：提供清晰的焦点状态样式，便于键盘用户识别当前位置
- **ARIA属性**：
  - 使用 `role="list"` 和 `role="listitem"` 确保正确的角色
  - 使用 `aria-disabled` 标识禁用状态
  - 使用 `aria-current` 标识当前选中项
  - 可展开列表使用 `aria-expanded` 标识展开状态
- **颜色对比度**：确保文本和背景之间有足够的对比度
- **屏幕阅读器支持**：提供适当的文本标签和描述

## 6. Vue 组件 API

### Props

#### JvList Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| bordered | boolean | false | 是否显示边框 |
| rounded | boolean \| string | false | 是否显示圆角，可设置具体圆角大小 |
| dense | boolean | false | 是否使用紧凑模式 |
| disabled | boolean | false | 是否禁用列表 |
| divided | boolean | false | 是否显示分割线 |
| color | string | - | 列表背景色类型，如：primary, secondary, success等 |
| hover | boolean | false | 是否显示悬浮效果 |
| maxHeight | string \| number | - | 列表最大高度，超出后显示滚动条 |
| nav | boolean | false | 是否为导航列表，导航列表项默认为链接样式 |

#### JvListItem Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| title | string | - | 列表项标题 |
| subtitle | string | - | 列表项副标题 |
| description | string | - | 列表项描述文本 |
| icon | string | - | 列表项图标名称 |
| link | string | - | 列表项链接地址 |
| active | boolean | false | 是否为激活状态 |
| disabled | boolean | false | 是否禁用该列表项 |
| highlighted | boolean | false | 是否高亮显示 |
| target | string | '_self' | 链接打开方式，同a标签的target属性 |
| stopPropagation | boolean | false | 是否阻止事件冒泡 |

### 事件 (Emits)

#### JvList Emits

| 事件名 | 参数 | 说明 |
| ------ | ---- | ---- |
| scroll | (event: Event) | 列表滚动时触发 |

#### JvListItem Emits

| 事件名 | 参数 | 说明 |
| ------ | ---- | ---- |
| click | (event: MouseEvent) | 点击列表项时触发 |
| active-change | (active: boolean) | 列表项激活状态变化时触发 |

### 插槽 (Slots)

#### JvList Slots

| 插槽名 | 说明 |
| ------ | ---- |
| default | 默认插槽，用于放置列表项 |
| header | 列表头部插槽 |
| footer | 列表底部插槽 |
| empty | 列表空状态插槽，当没有内容时显示 |

#### JvListItem Slots

| 插槽名 | 说明 |
| ------ | ---- |
| default | 默认插槽，用于自定义内容 |
| prepend | 在主内容前插入内容，通常用于放置图标或头像 |
| append | 在主内容后插入内容，通常用于放置操作按钮或状态指示器 |
| icon | 图标插槽，优先级高于icon属性 |
| title | 标题插槽，优先级高于title属性 |
| subtitle | 副标题插槽，优先级高于subtitle属性 |
| description | 描述插槽，优先级高于description属性 |

## 7. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| LS-001 | 基本渲染 | 验证列表能否正确渲染 | 1. 挂载JvList组件<br>2. 添加多个JvListItem子组件<br>3. 检查DOM结构 | 组件应正确渲染，包含所有子列表项 | ✅ |
| LS-002 | 空状态显示 | 验证列表空状态 | 1. 挂载JvList组件不添加子项<br>2. 提供empty插槽内容<br>3. 检查空状态显示 | 应显示empty插槽的内容 | ✅ |
| LS-003 | 列表项内容 | 验证列表项内容渲染 | 1. 添加title、subtitle、description属性<br>2. 检查渲染结果 | 应正确显示标题、副标题和描述文本 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| LS-101 | 边框样式 | 验证bordered属性 | 1. 挂载bordered=true的JvList<br>2. 检查样式 | 列表应显示边框 | ✅ |
| LS-102 | 分割线 | 验证divided属性 | 1. 挂载divided=true的JvList<br>2. 检查列表项之间 | 列表项之间应显示分割线 | ✅ |
| LS-103 | 圆角设置 | 验证rounded属性 | 1. 挂载rounded=true的JvList<br>2. 检查样式 | 列表应显示圆角 | ✅ |
| LS-104 | 链接功能 | 验证link属性 | 1. 添加link属性的JvListItem<br>2. 检查渲染的元素 | 应渲染为a标签并包含正确的href属性 | ✅ |
| LS-105 | 禁用状态 | 验证disabled属性 | 1. 挂载disabled=true的JvList<br>2. 尝试点击列表项<br>3. 检查事件触发 | 所有列表项应显示为禁用状态且不响应点击 | ✅ |
| LS-106 | 紧凑模式 | 验证dense属性 | 1. 挂载dense=true的JvList<br>2. 检查列表项间距 | 列表项应使用紧凑间距 | ✅ |
| LS-107 | 列表高度 | 验证maxHeight属性 | 1. 挂载设置了maxHeight的JvList<br>2. 添加足够多的列表项<br>3. 检查列表高度和滚动条 | 列表高度应被限制，并显示滚动条 | ✅ |

### 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| LS-201 | 点击事件 | 验证列表项点击事件 | 1. 挂载JvListItem并监听click事件<br>2. 点击列表项<br>3. 检查事件触发 | click事件应被触发 | ✅ |
| LS-202 | 禁用点击 | 验证禁用状态下的点击行为 | 1. 挂载disabled=true的JvListItem<br>2. 点击列表项<br>3. 检查事件触发 | click事件不应被触发 | ✅ |
| LS-203 | 滚动事件 | 验证列表滚动事件 | 1. 挂载设置了maxHeight的JvList并监听scroll事件<br>2. 添加足够多的列表项并触发滚动<br>3. 检查事件触发 | scroll事件应被触发 | ✅ |

### 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| LS-301 | 头部插槽 | 验证header插槽 | 1. 挂载JvList并设置header插槽内容<br>2. 检查渲染结果 | 头部插槽内容应正确显示 | ✅ |
| LS-302 | 尾部插槽 | 验证footer插槽 | 1. 挂载JvList并设置footer插槽内容<br>2. 检查渲染结果 | 尾部插槽内容应正确显示 | ✅ |
| LS-303 | 前置插槽 | 验证prepend插槽 | 1. 挂载JvListItem并设置prepend插槽内容<br>2. 检查渲染结果 | 前置插槽内容应正确显示在主内容之前 | ✅ |
| LS-304 | 后置插槽 | 验证append插槽 | 1. 挂载JvListItem并设置append插槽内容<br>2. 检查渲染结果 | 后置插槽内容应正确显示在主内容之后 | ✅ |

## 8. 使用示例

### 基础列表

```vue
<template>
  <JvList bordered rounded>
    <JvListItem title="收件箱" subtitle="查看您的邮件" icon="$inbox" />
    <JvListItem title="已发送" subtitle="已发送的邮件" icon="$send" />
    <JvListItem title="草稿箱" subtitle="未完成的邮件" icon="$draft" />
    <JvListItem title="垃圾箱" subtitle="已删除的邮件" icon="$trash" disabled />
  </JvList>
</template>

<script setup>
import { JvList, JvListItem } from 'jovial-ui'
</script>
```

### 导航列表

```vue
<template>
  <JvList nav bordered>
    <template #header>
      <h3>导航菜单</h3>
    </template>
    
    <JvListItem 
      v-for="item in navItems" 
      :key="item.id"
      :title="item.title"
      :icon="item.icon"
      :link="item.link"
      :active="currentRoute === item.link"
      @click="handleNavClick(item)"
    />
  </JvList>
</template>

<script setup>
import { ref } from 'vue'
import { JvList, JvListItem } from 'jovial-ui'

const currentRoute = ref('/dashboard')

const navItems = [
  { id: 1, title: '仪表盘', icon: '$dashboard', link: '/dashboard' },
  { id: 2, title: '用户管理', icon: '$account', link: '/users' },
  { id: 3, title: '产品列表', icon: '$cube', link: '/products' },
  { id: 4, title: '设置', icon: '$settings', link: '/settings' },
]

function handleNavClick(item) {
  currentRoute.value = item.link
  // 可以在这里进行路由导航
}
</script>
```

### 带头像的联系人列表

```vue
<template>
  <JvList divided hover>
    <template #header>
      <div class="contact-header">
        <h3>联系人列表</h3>
        <JvButton size="small" icon="$add">添加</JvButton>
      </div>
    </template>
    
    <JvListItem 
      v-for="contact in contacts" 
      :key="contact.id"
      :title="contact.name"
      :subtitle="contact.email"
    >
      <template #prepend>
        <div class="avatar" :style="{ backgroundColor: contact.color }">
          {{ contact.initials }}
        </div>
      </template>
      
      <template #append>
        <div class="contact-actions">
          <JvButton icon="$call" variant="text" size="small" />
          <JvButton icon="$email" variant="text" size="small" />
        </div>
      </template>
    </JvListItem>
    
    <template #empty>
      <div class="empty-contacts">
        <p>暂无联系人</p>
        <JvButton>添加联系人</JvButton>
      </div>
    </template>
  </JvList>
</template>

<script setup>
import { ref } from 'vue'
import { JvList, JvListItem, JvButton } from 'jovial-ui'

const contacts = ref([
  { 
    id: 1, 
    name: '张三', 
    email: 'zhangsan@example.com',
    initials: 'ZS',
    color: '#4caf50'
  },
  { 
    id: 2, 
    name: '李四', 
    email: 'lisi@example.com',
    initials: 'LS',
    color: '#2196f3'
  },
  { 
    id: 3, 
    name: '王五', 
    email: 'wangwu@example.com',
    initials: 'WW',
    color: '#ff9800'
  }
])
</script>

<style scoped>
.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.contact-actions {
  display: flex;
  gap: 8px;
}

.empty-contacts {
  padding: 24px;
  text-align: center;
}
</style>
```

### 可展开的嵌套列表

```vue
<template>
  <JvList bordered>
    <JvListItem
      v-for="item in nestedItems"
      :key="item.id"
      :title="item.title"
      :icon="item.icon"
      @click="toggleExpand(item)"
    >
      <template #append>
        <JvIcon 
          :name="expandedItems.includes(item.id) ? '$chevronUp' : '$chevronDown'" 
          v-if="item.children && item.children.length"
        />
      </template>
      
      <JvList v-if="expandedItems.includes(item.id) && item.children">
        <JvListItem
          v-for="child in item.children"
          :key="child.id"
          :title="child.title"
          :icon="child.icon"
          :link="child.link"
        />
      </JvList>
    </JvListItem>
  </JvList>
</template>

<script setup>
import { ref } from 'vue'
import { JvList, JvListItem, JvIcon } from 'jovial-ui'

const expandedItems = ref([1]) // 默认展开第一项

const nestedItems = [
  {
    id: 1,
    title: '文档',
    icon: '$folder',
    children: [
      { id: 11, title: '报告', icon: '$file', link: '/docs/reports' },
      { id: 12, title: '计划书', icon: '$file', link: '/docs/plans' },
      { id: 13, title: '合同', icon: '$file', link: '/docs/contracts' }
    ]
  },
  {
    id: 2,
    title: '图片',
    icon: '$image',
    children: [
      { id: 21, title: '截图', icon: '$image', link: '/images/screenshots' },
      { id: 22, title: '照片', icon: '$image', link: '/images/photos' }
    ]
  },
  {
    id: 3,
    title: '下载',
    icon: '$download',
    children: [
      { id: 31, title: '软件', icon: '$app', link: '/downloads/software' },
      { id: 32, title: '文档', icon: '$file', link: '/downloads/documents' }
    ]
  }
]

function toggleExpand(item) {
  if (!item.children || !item.children.length) return
  
  if (expandedItems.value.includes(item.id)) {
    expandedItems.value = expandedItems.value.filter(id => id !== item.id)
  } else {
    expandedItems.value.push(item.id)
  }
}
</script>
```

### 选择列表

```vue
<template>
  <div>
    <JvList hover bordered>
      <JvListItem
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        :active="selectedValue === option.value"
        @click="selectOption(option.value)"
      >
        <template #append>
          <JvIcon name="$check" v-if="selectedValue === option.value" />
        </template>
      </JvListItem>
    </JvList>
    
    <div class="selected-value">
      当前选中: {{ getSelectedLabel() }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvList, JvListItem, JvIcon } from 'jovial-ui'

const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' }
]

const selectedValue = ref('option1')

function selectOption(value) {
  selectedValue.value = value
}

function getSelectedLabel() {
  const option = options.find(opt => opt.value === selectedValue.value)
  return option ? option.label : '无'
}
</script>

<style scoped>
.selected-value {
  margin-top: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```
