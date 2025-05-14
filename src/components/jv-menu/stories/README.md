# JvMenu 菜单组件

## 1. 组件介绍

JvMenu 是一个弹出式的菜单组件，用于显示隐藏在元素后面的链接列表或命令。菜单常用于导航、操作列表、下拉菜单、上下文菜单等场景。它提供了灵活的定位、多种触发方式和自定义样式选项，使其适用于各种复杂的交互需求。

特点：
- 支持多种触发方式：点击、悬停、手动控制
- 灵活的位置摆放：12个不同的位置选项
- 可自定义样式和内容
- 支持键盘导航和可访问性标准
- 自动处理边界检测，确保菜单在视窗内显示

## 2. 布局结构使用方式

JvMenu 组件由触发元素和菜单内容两部分组成。触发元素通过默认插槽传入，菜单内容通过 content 插槽传入。

基本使用示例：

```vue
<JvMenu>
  <JvButton>打开菜单</JvButton>
  <template #content>
    <div style="padding: 8px 16px; cursor: pointer;">菜单项 1</div>
    <div style="padding: 8px 16px; cursor: pointer;">菜单项 2</div>
    <div style="padding: 8px 16px; cursor: pointer;">菜单项 3</div>
  </template>
</JvMenu>
```

## 3. 交互设计

JvMenu 支持多种交互方式，以适应不同的用户场景：

### 触发方式
- **点击触发**：点击触发元素打开菜单，点击页面其他区域关闭菜单
- **悬停触发**：鼠标悬停在触发元素上打开菜单，移出后延迟关闭
- **手动控制**：通过 v-model 完全控制菜单的显示和隐藏

### 位置控制
- 支持 12 个不同的位置：top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end
- 通过 offset 参数控制菜单与触发元素的距离

交互使用示例：

```vue
<!-- 点击触发 -->
<JvMenu trigger="click">
  <JvButton>点击打开</JvButton>
  <template #content>...</template>
</JvMenu>

<!-- 悬停触发 -->
<JvMenu trigger="hover">
  <JvButton>悬停打开</JvButton>
  <template #content>...</template>
</JvMenu>

<!-- 手动控制 -->
<JvMenu v-model="menuVisible" trigger="manual">
  <JvButton @click="menuVisible = !menuVisible">手动控制</JvButton>
  <template #content>...</template>
</JvMenu>
```

## 4. 样式定制

JvMenu 组件提供了多种自定义样式选项，以适应不同的设计需求：

- **宽度控制**：固定宽度或自适应
- **最大高度**：控制菜单的最大高度，超出部分可滚动
- **箭头显示**：可显示指向触发元素的箭头指示器
- **自定义样式**：通过CSS变量定制菜单的背景色、阴影、圆角等

使用样式示例：

```vue
<JvMenu width="300px" maxHeight="200px" placement="bottom-end" :offset="15">
  <JvButton>自定义样式菜单</JvButton>
  <template #content>
    <div style="padding: 8px 16px; cursor: pointer;">自定义宽度的菜单项</div>
    <div style="padding: 8px 16px; cursor: pointer;">自定义宽度的菜单项</div>
    <div style="padding: 8px 16px; cursor: pointer;">自定义宽度的菜单项</div>
  </template>
</JvMenu>
```

## 5. 可访问性

JvMenu 组件遵循WCAG可访问性标准设计：

- **键盘导航**：支持Tab键焦点管理和方向键导航菜单项
- **ARIA属性**：使用适当的aria-expanded、aria-haspopup等属性，确保屏幕阅读器可正确识别
- **焦点管理**：打开菜单时自动将焦点移动到菜单内，关闭后焦点返回触发元素
- **焦点锁定**：当菜单打开时，焦点不会跳出菜单区域
- **快捷键**：支持Esc键关闭菜单

## 6. Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Boolean | false | 菜单是否可见 |
| placement | String | 'bottom' | 菜单位置，可选值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |
| trigger | String | 'click' | 触发方式，可选值: click/hover/manual |
| offset | Number | 10 | 菜单偏移量 |
| showArrow | Boolean | true | 是否显示箭头 |
| disabled | Boolean | false | 是否禁用菜单 |
| width | String/Number | 'auto' | 菜单宽度 |
| maxHeight | String/Number | '300px' | 菜单最大高度 |
| zIndex | Number | 2000 | z-index层级 |
| closeOnClickOutside | Boolean | true | 点击外部是否关闭菜单 |
| closeOnEsc | Boolean | true | 按Esc键是否关闭菜单 |
| transition | String | 'jv-menu-fade' | 过渡动画名称 |
| teleport | String | 'body' | 传送门挂载位置 |

### 事件 (Emits)

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: boolean) | 更新菜单可见状态 |
| show | - | 菜单显示时触发 |
| hide | - | 菜单隐藏时触发 |
| click-outside | (event: MouseEvent) | 点击菜单外部时触发 |

### 插槽 (Slots)

| 插槽名 | 说明 |
|--------|------|
| default | 触发菜单的元素 |
| content | 菜单内容 |
| arrow | 自定义箭头内容 |

### 暴露方法 (Expose)

| 方法名 | 参数 | 说明 |
|--------|------|------|
| show | - | 显示菜单 |
| hide | - | 隐藏菜单 |
| toggle | - | 切换菜单显示状态 |

## 7. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-001 | 基本渲染 | 验证菜单能否正确渲染 | 1. 挂载基础JvMenu组件<br>2. 检查DOM结构 | 组件应正确渲染触发元素和菜单内容部分 | ✅ |
| MN-002 | 点击触发 | 验证点击触发方式 | 1. 挂载trigger="click"的JvMenu<br>2. 点击触发元素<br>3. 检查菜单是否显示 | 点击后菜单应显示，再次点击或点击外部应关闭 | ✅ |
| MN-003 | 悬停触发 | 验证悬停触发方式 | 1. 挂载trigger="hover"的JvMenu<br>2. 鼠标悬停在触发元素上<br>3. 检查菜单是否显示 | 悬停后菜单应显示，鼠标移出后应关闭 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-101 | 位置设置 | 验证不同placement属性 | 1. 分别挂载不同placement值的JvMenu<br>2. 触发菜单显示<br>3. 检查菜单位置 | 菜单应在指定的位置显示 | ✅ |
| MN-102 | 禁用状态 | 验证禁用状态 | 1. 挂载disabled=true的JvMenu<br>2. 尝试触发菜单<br>3. 检查菜单是否显示 | 菜单应保持关闭状态，无法被触发 | ✅ |
| MN-103 | 尺寸控制 | 验证width和maxHeight属性 | 1. 挂载设置了width和maxHeight的JvMenu<br>2. 触发菜单显示<br>3. 检查菜单尺寸 | 菜单应具有指定的宽度和最大高度 | ✅ |

### 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-201 | 显示事件 | 验证show事件 | 1. 挂载JvMenu并监听show事件<br>2. 触发菜单显示<br>3. 检查事件是否触发 | show事件应被触发 | ✅ |
| MN-202 | 隐藏事件 | 验证hide事件 | 1. 挂载JvMenu并监听hide事件<br>2. 触发菜单显示然后关闭<br>3. 检查事件是否触发 | hide事件应被触发 | ✅ |
| MN-203 | 外部点击 | 验证click-outside事件 | 1. 挂载JvMenu并监听click-outside事件<br>2. 触发菜单显示<br>3. 点击外部区域<br>4. 检查事件是否触发 | click-outside事件应被触发 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-301 | 键盘导航 | 验证键盘导航功能 | 1. 挂载JvMenu<br>2. 使用Tab键聚焦到触发元素<br>3. 按Enter键打开菜单<br>4. 使用方向键导航菜单项 | 应能通过键盘完成导航和选择 | ✅ |
| MN-302 | ESC关闭 | 验证ESC键关闭功能 | 1. 挂载JvMenu<br>2. 打开菜单<br>3. 按ESC键 | 菜单应关闭 | ✅ |
| MN-303 | ARIA属性 | 验证ARIA属性 | 1. 挂载JvMenu<br>2. 检查触发元素和菜单的ARIA属性 | 应具有正确的aria-expanded、aria-haspopup等属性 | ✅ |

## 8. 使用示例

### 基础下拉菜单

```vue
<template>
  <JvMenu>
    <JvButton>操作菜单</JvButton>
    <template #content>
      <div class="menu-item" @click="handleEdit">编辑</div>
      <div class="menu-item" @click="handleCopy">复制</div>
      <div class="menu-item" @click="handleDelete">删除</div>
    </template>
  </JvMenu>
</template>

<script setup>
import { JvMenu, JvButton } from 'jovial-ui'

function handleEdit() {
  console.log('点击了编辑')
}

function handleCopy() {
  console.log('点击了复制')
}

function handleDelete() {
  console.log('点击了删除')
}
</script>

<style>
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: #f5f5f5;
}
</style>
```

### 不同触发方式

```vue
<template>
  <div class="trigger-demo">
    <JvMenu trigger="click">
      <JvButton>点击触发</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>

    <JvMenu trigger="hover">
      <JvButton>悬停触发</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>

    <JvMenu v-model="isMenuVisible" trigger="manual">
      <JvButton @click="isMenuVisible = !isMenuVisible">
        手动触发 ({{ isMenuVisible ? '关闭' : '打开' }})
      </JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvMenu, JvButton } from 'jovial-ui'

const isMenuVisible = ref(false)
</script>

<style>
.trigger-demo {
  display: flex;
  gap: 20px;
}
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 不同位置的菜单

```vue
<template>
  <div class="placement-demo">
    <JvMenu placement="top">
      <JvButton>上方菜单</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>

    <JvMenu placement="bottom">
      <JvButton>下方菜单</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>

    <JvMenu placement="left">
      <JvButton>左侧菜单</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>

    <JvMenu placement="right">
      <JvButton>右侧菜单</JvButton>
      <template #content>
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
      </template>
    </JvMenu>
  </div>
</template>

<style>
.placement-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 嵌套菜单

```vue
<template>
  <JvMenu>
    <JvButton>嵌套菜单</JvButton>
    <template #content>
      <div class="menu-item">菜单项 1</div>
      <div class="menu-item">菜单项 2</div>
      <div class="nested-menu-container">
        <JvMenu placement="right-start" trigger="hover">
          <div class="menu-item with-arrow">子菜单</div>
          <template #content>
            <div class="menu-item">子菜单项 1</div>
            <div class="menu-item">子菜单项 2</div>
            <div class="menu-item">子菜单项 3</div>
          </template>
        </JvMenu>
      </div>
      <div class="menu-item">菜单项 3</div>
    </template>
  </JvMenu>
</template>

<style>
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: #f5f5f5;
}
.nested-menu-container {
  position: relative;
}
.with-arrow::after {
  content: "→";
  position: absolute;
  right: 10px;
}
</style>
```