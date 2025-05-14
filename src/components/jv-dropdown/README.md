# JvDropdown 下拉菜单组件

## 组件介绍
`JvDropdown` 是一个灵活的下拉菜单组件，用于在用户与元素交互时显示下拉内容。它基于 @popperjs/core 构建，提供精确的定位和多种交互方式。下拉菜单通常用于导航、选择操作、过滤或显示附加信息。

## 布局结构使用方式
下拉菜单组件有两个主要部分：触发器和下拉内容。触发器是用户交互的元素，可以是按钮、链接或任何其他元素。下拉内容是在用户与触发器交互时显示的。

基本使用示例：

```vue
<template>
  <JvDropdown>
    <template #trigger>
      <button>点击此处 ▼</button>
    </template>
    <div>
      <div>选项 1</div>
      <div>选项 2</div>
      <div>选项 3</div>
    </div>
  </JvDropdown>
</template>
```

## 交互设计
组件提供以下交互效果：
- **多种触发方式**：支持点击触发、悬停触发和手动控制三种方式
- **自动定位**：下拉内容会根据空间自动调整位置，避免溢出视口
- **箭头指示**：可选的箭头指示器，指向触发元素
- **平滑过渡**：内容显示/隐藏时的平滑过渡效果
- **延迟关闭**：悬停模式下支持延迟关闭，避免意外关闭

特殊交互：
- **放置策略**：支持多种放置策略（flip、prevent-overflow、auto、fixed）
- **偏移设置**：支持设置下拉内容相对于触发元素的偏移量
- **宽度控制**：支持自适应宽度、固定宽度和跟随触发元素宽度三种模式

## 可访问性
组件遵循WCAG无障碍标准：
- **键盘操作**：支持键盘焦点和操作
- **屏幕阅读器支持**：使用适当的ARIA属性和角色
- **焦点管理**：在内容显示时正确管理焦点
- **颜色对比**：确保文本和背景有足够的对比度
- **语义化结构**：使用语义化的HTML结构

## Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| placement | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' | 'bottom-start' | 下拉菜单的显示位置 |
| arrow | boolean | true | 是否显示箭头 |
| offset | number \| [number, number] | 4 | 偏移量，可以是单值或[x, y]数组 |
| show | boolean | false | 是否显示下拉菜单 |
| placementStrategy | 'flip' \| 'prevent-overflow' \| 'auto' \| 'fixed' | 'auto' | 放置策略 |
| arrowSize | number | 8 | 箭头大小 |
| trigger | 'click' \| 'hover' \| 'manual' | 'click' | 触发方式 |
| hideDelay | number | 150 | 延迟关闭时间(毫秒) |
| width | number \| 'auto' \| 'trigger' | 'auto' | 下拉菜单宽度，'auto'表示自动适应内容宽度，'trigger'表示与触发元素同宽 |
| disabled | boolean | false | 是否禁用 |
| manual | boolean | false | 是否手动控制(与trigger="manual"效果相同) |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:show | (value: boolean) | 更新显示状态 |
| select | (value: any) | 选项被点击时触发 |
| shown | - | 下拉菜单显示后触发 |
| hidden | - | 下拉菜单隐藏后触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，下拉菜单内容 |
| trigger | 触发器插槽 |
| empty | 空状态插槽，当没有选项时显示 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle | (force?: boolean) | 切换下拉菜单显示状态，可选参数force用于强制指定状态 |
| show | - | 显示下拉菜单 |
| hide | - | 隐藏下拉菜单 |

## 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| DD-002 | 弹出显示 | 验证下拉内容是否正确显示 | 1. 点击/悬停触发元素<br>2. 检查下拉内容是否显示 | 下拉内容应显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-101 | 位置设置 | 验证不同placement属性 | 1. 设置不同的placement属性<br>2. 触发弹出<br>3. 检查弹出位置 | 弹出位置符合设置 | ✅ |
| DD-102 | 箭头显示 | 验证arrow属性 | 1. 设置arrow=true<br>2. 触发弹出<br>3. 检查箭头是否显示 | 箭头显示符合设置 | ✅ |
| DD-103 | 偏移设置 | 验证offset属性 | 1. 设置不同的offset值<br>2. 触发弹出<br>3. 检查弹出内容的偏移 | 偏移距离符合设置 | ✅ |
| DD-104 | 触发方式 | 验证不同trigger值 | 1. 分别设置'click'、'hover'和'manual'<br>2. 进行相应操作<br>3. 检查交互行为 | 交互行为符合设置 | ✅ |
| DD-105 | 宽度控制 | 验证width属性 | 1. 设置不同width值<br>2. 触发弹出<br>3. 检查下拉菜单宽度 | 宽度符合设置 | ✅ |
| DD-106 | 禁用状态 | 验证disabled属性 | 1. 设置disabled=true<br>2. 尝试触发下拉菜单<br>3. 检查是否可交互 | 下拉菜单应被禁用 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-201 | 显示更新 | 验证update:show事件 | 1. 监听事件<br>2. 触发显示/隐藏<br>3. 检查事件触发 | 事件被触发且值正确 | ✅ |
| DD-202 | 选项选择 | 验证select事件 | 1. 监听事件<br>2. 点击下拉选项<br>3. 检查事件触发 | 事件被触发且参数正确 | ✅ |
| DD-203 | 显示完成 | 验证shown事件 | 1. 监听事件<br>2. 触发显示<br>3. 检查事件触发 | 事件被触发 | ✅ |
| DD-204 | 隐藏完成 | 验证hidden事件 | 1. 监听事件<br>2. 触发隐藏<br>3. 检查事件触发 | 事件被触发 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-301 | 默认插槽 | 验证default插槽内容 | 1. 设置default插槽内容<br>2. 触发下拉<br>3. 检查渲染结果 | 内容正确渲染 | ✅ |
| DD-302 | 触发器插槽 | 验证trigger插槽内容 | 1. 设置trigger插槽内容<br>2. 检查渲染结果 | 内容作为触发器渲染 | ✅ |
| DD-303 | 空状态插槽 | 验证empty插槽内容 | 1. 不设置默认内容<br>2. 设置empty插槽内容<br>3. 触发下拉 | 空状态内容正确渲染 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-401 | toggle方法 | 验证toggle方法 | 1. 获取组件实例<br>2. 调用toggle方法<br>3. 检查显示状态 | 显示状态应切换 | ✅ |
| DD-402 | show方法 | 验证show方法 | 1. 获取组件实例<br>2. 调用show方法<br>3. 检查显示状态 | 下拉菜单应显示 | ✅ |
| DD-403 | hide方法 | 验证hide方法 | 1. 获取组件实例<br>2. 调用hide方法<br>3. 检查显示状态 | 下拉菜单应隐藏 | ✅ |

### 样式和交互测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DD-501 | 自动翻转 | 验证边界情况下的自动翻转 | 1. 将下拉菜单放在视口边缘<br>2. 触发显示<br>3. 观察显示位置 | 位置应自动调整以避免溢出 | ✅ |
| DD-502 | 过渡动画 | 验证过渡动画效果 | 1. 触发显示/隐藏<br>2. 观察过渡效果 | 应有平滑的过渡动画 | ✅ |
| DD-503 | 延迟隐藏 | 验证hideDelay属性 | 1. 设置hideDelay值<br>2. 悬停后移出鼠标<br>3. 检查隐藏时间 | 隐藏延迟应符合设置 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvDropdown placement="bottom" :arrow="true">
    <template #trigger>
      <button class="trigger-button">点击此处 ▼</button>
    </template>
    <div class="dropdown-content">
      <div class="dropdown-item">选项 1</div>
      <div class="dropdown-item">选项 2</div>
      <div class="dropdown-item">选项 3</div>
    </div>
  </JvDropdown>
</template>

<style scoped>
.trigger-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-content {
  min-width: 120px;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>
```

### 不同位置
```vue
<template>
  <div class="positions-demo">
    <JvDropdown placement="top" :arrow="true">
      <template #trigger>
        <button>上方</button>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
      </div>
    </JvDropdown>
    
    <JvDropdown placement="right" :arrow="true">
      <template #trigger>
        <button>右侧</button>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
      </div>
    </JvDropdown>
    
    <JvDropdown placement="bottom" :arrow="true">
      <template #trigger>
        <button>下方</button>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
      </div>
    </JvDropdown>
    
    <JvDropdown placement="left" :arrow="true">
      <template #trigger>
        <button>左侧</button>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
      </div>
    </JvDropdown>
  </div>
</template>

<style scoped>
.positions-demo {
  display: flex;
  justify-content: space-around;
  padding: 50px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 悬停触发
```vue
<template>
  <JvDropdown trigger="hover" placement="bottom-start" :arrow="true">
    <template #trigger>
      <button>悬停此处显示 ▼</button>
    </template>
    <div>
      <div class="dropdown-item">选项 1</div>
      <div class="dropdown-item">选项 2</div>
      <div class="dropdown-item">选项 3</div>
    </div>
  </JvDropdown>
</template>

<style scoped>
button {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 手动控制
```vue
<template>
  <div>
    <button @click="show = !show">
      {{ show ? '隐藏' : '显示' }} 下拉菜单
    </button>
    
    <JvDropdown v-model:show="show" manual :arrow="true" placement="bottom-start">
      <template #trigger>
        <div class="reference-element">参考元素</div>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
        <div class="dropdown-item">选项 3</div>
      </div>
    </JvDropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
button {
  padding: 8px 16px;
  margin-bottom: 16px;
  cursor: pointer;
}

.reference-element {
  padding: 8px;
  border: 1px dashed #ccc;
  display: inline-block;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 自定义宽度和事件处理
```vue
<template>
  <JvDropdown :width="200" placement="bottom-start" :arrow="true" @select="handleSelect">
    <template #trigger>
      <button>自定义宽度菜单 ▼</button>
    </template>
    <div>
      <div 
        v-for="item in options" 
        :key="item.value" 
        class="dropdown-item"
        @click="handleItemClick(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </JvDropdown>
  
  <div v-if="selected" class="selected-info">
    已选择: {{ selected }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
]

const selected = ref('')

function handleItemClick(value) {
  selected.value = value
}

function handleSelect(value) {
  console.log('选中:', value)
}
</script>

<style scoped>
button {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.selected-info {
  margin-top: 16px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
```

### 使用组件实例方法
```vue
<template>
  <div>
    <div class="buttons">
      <button @click="showDropdown">显示</button>
      <button @click="hideDropdown">隐藏</button>
      <button @click="toggleDropdown">切换</button>
    </div>
    
    <JvDropdown ref="dropdownRef" placement="bottom" :arrow="true">
      <template #trigger>
        <div class="reference-box">参考元素</div>
      </template>
      <div>
        <div class="dropdown-item">选项 1</div>
        <div class="dropdown-item">选项 2</div>
        <div class="dropdown-item">选项 3</div>
      </div>
    </JvDropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dropdownRef = ref(null)

function showDropdown() {
  dropdownRef.value.show()
}

function hideDropdown() {
  dropdownRef.value.hide()
}

function toggleDropdown() {
  dropdownRef.value.toggle()
}
</script>

<style scoped>
.buttons {
  margin-bottom: 16px;
}

button {
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
}

.reference-box {
  padding: 8px;
  border: 1px solid #ccc;
  display: inline-block;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
``` 