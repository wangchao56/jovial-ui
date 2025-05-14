# JvPopover 弹出框组件

## 1. 组件介绍
`JvPopover` 是一个灵活的弹出框组件，用于在元素周围显示临时性内容，如提示、菜单或其他交互界面。它基于Popper.js实现，提供了精准的定位和多种配置选项，可以在不同方向展示内容，且能自动调整以避免溢出视口。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 触发元素：用户交互的目标元素，默认为默认插槽的内容
- 弹出内容：弹出展示的内容，位于特定插槽
- 箭头指示器：可选的指向触发元素的箭头

### 基本使用示例
```vue
<template>
  <!-- 基础弹出框 -->
  <JvPopover placement="top">
    <button>点击/悬停此元素</button>
    <template #default>
      <div>这是弹出的内容</div>
    </template>
  </JvPopover>
  
  <!-- 带箭头的弹出框 -->
  <JvPopover placement="bottom" :arrow="true" :offset="[0, 12]">
    <button>触发元素</button>
    <template #default>
      <div>带箭头的弹出内容</div>
    </template>
  </JvPopover>
  
  <!-- 手动控制的弹出框 -->
  <button @click="showPopover = !showPopover">
    {{ showPopover ? '隐藏' : '显示' }}弹出框
  </button>
  <JvPopover v-model:show="showPopover" manual>
    <div>参考元素</div>
    <template #default>
      <div>手动控制显示的弹出内容</div>
    </template>
  </JvPopover>
</template>

<script setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 自动定位：根据空间自动调整弹出位置，避免内容被截断
- 箭头指示：可选的箭头指示器，指向触发元素
- 平滑过渡：弹出内容显示/隐藏时的平滑过渡效果
- 手动控制：支持通过v-model手动控制弹出框的显示状态

特殊交互：
- 放置策略：支持多种放置策略（flip、prevent-overflow、auto、fixed）
- 偏移设置：支持设置弹出内容相对于触发元素的偏移量
- 绝对/固定定位：支持相对于触发元素或视口定位
- 虚拟定位：支持通过传入referenceRect参数实现无触发元素的定位

## 4. 可访问性
组件遵循WCAG无障碍标准：
- 支持键盘导航：可通过键盘焦点触发
- 无障碍标识：使用适当的aria属性标识弹出内容
- 角色分配：为弹出内容设置正确的role属性
- 焦点管理：在弹出内容显示时可以正确管理焦点
- 适当的层级：确保弹出内容不会被其他元素遮挡

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| placement | 'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end' | 'top' | 弹出框的显示位置 |
| arrow | boolean | false | 是否显示箭头 |
| offset | number \| [number, number] | 0 | 弹出框相对于触发元素的偏移量 |
| offsetTarget | 'trigger' \| 'viewport' | 'trigger' | 偏移方式：相对于触发元素或视口 |
| manual | boolean | false | 是否手动控制显示状态 |
| show | boolean | undefined | 是否显示弹出框，支持v-model:show |
| referenceRect | DOMRect \| null | null | 手动指定参考矩形区域 |
| placementStrategy | 'flip' \| 'prevent-overflow' \| 'auto' \| 'fixed' | 'auto' | 放置策略 |
| arrowSize | number | undefined | 箭头尺寸 |
| popoverSize | { width?: number, height?: number } \| null | null | 弹出层尺寸，用于优化定位 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:show | (value: boolean) | 弹出框显示状态变化时触发 |
| update:actualPlacement | (value: string) | 实际放置位置变化时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 弹出的内容 |
| - | 默认插槽，用于放置触发元素 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle | (force?: boolean) | 切换弹出框显示状态，可选传入强制值 |
| show | - | 显示弹出框 |
| hide | - | 隐藏弹出框 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| PO-002 | 弹出显示 | 验证弹出内容是否正确显示 | 1. 悬停/点击触发元素<br>2. 检查弹出内容是否显示 | 弹出内容应显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-101 | 位置设置 | 验证不同placement属性 | 1. 设置不同的placement属性<br>2. 触发弹出<br>3. 检查弹出位置 | 弹出位置符合设置 | ✅ |
| PO-102 | 箭头显示 | 验证arrow属性 | 1. 设置arrow=true<br>2. 触发弹出<br>3. 检查箭头是否显示 | 箭头显示符合设置 | ✅ |
| PO-103 | 偏移设置 | 验证offset属性 | 1. 设置不同的offset值<br>2. 触发弹出<br>3. 检查弹出内容的偏移 | 偏移距离符合设置 | ✅ |
| PO-104 | 偏移目标 | 验证offsetTarget属性 | 1. 分别设置'trigger'和'viewport'<br>2. 触发弹出<br>3. 检查定位方式 | 定位方式符合设置 | ✅ |
| PO-105 | 手动控制 | 验证manual属性 | 1. 设置manual=true<br>2. 控制show属性<br>3. 检查弹出显示状态 | 弹出显示状态应由show属性控制 | ✅ |
| PO-106 | 放置策略 | 验证不同placementStrategy | 1. 设置不同的策略<br>2. 在边界情况下触发弹出<br>3. 观察弹出行为 | 弹出行为符合对应策略 | ✅ |
| PO-107 | 虚拟参考 | 验证referenceRect属性 | 1. 设置referenceRect<br>2. 不提供触发元素<br>3. 触发弹出 | 弹出内容应相对于指定矩形定位 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-201 | 显示更新 | 验证update:show事件 | 1. 监听事件<br>2. 触发弹出显示/隐藏<br>3. 检查事件触发 | 事件被触发且值正确 | ✅ |
| PO-202 | 位置更新 | 验证update:actualPlacement事件 | 1. 监听事件<br>2. 在边界条件下触发弹出<br>3. 检查事件触发 | 当实际位置变化时事件被触发 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 默认插槽内容作为触发元素渲染 | ✅ |
| PO-302 | 内容插槽 | 验证default插槽内容 | 1. 设置default插槽内容<br>2. 触发弹出<br>3. 检查弹出内容 | 弹出内容应为default插槽内容 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-401 | toggle方法 | 验证toggle方法 | 1. 获取组件实例<br>2. 调用toggle方法<br>3. 检查弹出状态 | 弹出状态应切换 | ✅ |
| PO-402 | show方法 | 验证show方法 | 1. 获取组件实例<br>2. 调用show方法<br>3. 检查弹出状态 | 弹出内容应显示 | ✅ |
| PO-403 | hide方法 | 验证hide方法 | 1. 获取组件实例<br>2. 调用hide方法<br>3. 检查弹出状态 | 弹出内容应隐藏 | ✅ |

### 交互和定位测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PO-501 | 自动翻转 | 验证边界情况下的自动翻转 | 1. 将触发元素放在视口边缘<br>2. 触发弹出<br>3. 观察弹出位置 | 弹出内容应自动调整位置以避免溢出 | ✅ |
| PO-502 | 窗口调整 | 验证窗口大小变化时的位置更新 | 1. 触发弹出<br>2. 调整窗口大小<br>3. 观察弹出位置 | 弹出内容应随窗口调整更新位置 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvPopover placement="bottom" :arrow="true">
    <button class="trigger-button">悬停我</button>
    <template #default>
      <div class="popover-content">
        这是一个基础的弹出框内容
      </div>
    </template>
  </JvPopover>
</template>

<style scoped>
.trigger-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.popover-content {
  padding: 12px 16px;
  max-width: 200px;
}
</style>
```

### 不同位置
```vue
<template>
  <div class="positions-demo">
    <JvPopover placement="top" :arrow="true">
      <button>上方</button>
      <template #default>
        <div>top 弹出内容</div>
      </template>
    </JvPopover>
    
    <JvPopover placement="right" :arrow="true">
      <button>右侧</button>
      <template #default>
        <div>right 弹出内容</div>
      </template>
    </JvPopover>
    
    <JvPopover placement="bottom" :arrow="true">
      <button>下方</button>
      <template #default>
        <div>bottom 弹出内容</div>
      </template>
    </JvPopover>
    
    <JvPopover placement="left" :arrow="true">
      <button>左侧</button>
      <template #default>
        <div>left 弹出内容</div>
      </template>
    </JvPopover>
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
</style>
```

### 手动控制
```vue
<template>
  <div class="manual-demo">
    <button @click="togglePopover">
      {{ show ? '隐藏' : '显示' }}弹出框
    </button>
    
    <JvPopover 
      v-model:show="show" 
      manual 
      placement="right"
      :arrow="true"
    >
      <div class="reference-element">
        参考元素
      </div>
      <template #default>
        <div class="popover-content">
          <h4>手动控制的弹出框</h4>
          <p>这个弹出框通过外部按钮控制显示和隐藏</p>
        </div>
      </template>
    </JvPopover>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

function togglePopover() {
  show.value = !show.value
}
</script>

<style scoped>
.manual-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
}

.reference-element {
  padding: 8px;
  border: 1px dashed #ccc;
  border-radius: 4px;
}

.popover-content {
  padding: 12px 16px;
  max-width: 200px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 自定义样式
```vue
<template>
  <div class="custom-styles-demo">
    <JvPopover :arrow="true" placement="top">
      <button class="green-button">绿色主题</button>
      <template #default>
        <div class="green-popover">
          <h3>自定义绿色主题</h3>
          <p>可以通过CSS自定义弹出框的外观</p>
        </div>
      </template>
    </JvPopover>
    
    <JvPopover :arrow="true" placement="top">
      <button class="blue-button">蓝色带图片</button>
      <template #default>
        <div class="blue-popover">
          <h3>带图片的弹出框</h3>
          <img src="https://via.placeholder.com/200x100" alt="示例图片" />
          <p>弹出框中可以包含各种元素</p>
        </div>
      </template>
    </JvPopover>
  </div>
</template>

<style scoped>
.custom-styles-demo {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 100px;
}

.green-button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.green-popover {
  padding: 12px 16px;
  background: #4CAF50;
  color: white;
  border-radius: 4px;
}

.green-popover h3 {
  margin-top: 0;
}

.blue-button {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.blue-popover {
  padding: 12px 16px;
  background: #E3F2FD;
  border: 1px solid #2196F3;
  border-radius: 4px;
}

.blue-popover h3 {
  margin-top: 0;
  color: #0D47A1;
}

.blue-popover img {
  max-width: 100%;
  border-radius: 4px;
  margin: 8px 0;
}
</style>
```

### 使用组件实例方法
```vue
<template>
  <div class="methods-demo">
    <button @click="showPopover">显示</button>
    <button @click="hidePopover">隐藏</button>
    <button @click="togglePopover">切换</button>
    
    <JvPopover 
      ref="popoverRef"
      manual
      placement="bottom"
      :arrow="true"
    >
      <div class="reference-box">参考元素</div>
      <template #default>
        <div class="popover-content">
          这个弹出框通过组件实例方法控制
        </div>
      </template>
    </JvPopover>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const popoverRef = ref(null)

function showPopover() {
  popoverRef.value.show()
}

function hidePopover() {
  popoverRef.value.hide()
}

function togglePopover() {
  popoverRef.value.toggle()
}
</script>

<style scoped>
.methods-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 50px;
}

button {
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
}

.reference-box {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.popover-content {
  padding: 12px 16px;
  max-width: 200px;
}
</style>
```

### 使用虚拟参考元素
```vue
<template>
  <div class="virtual-ref-demo">
    <div class="canvas" @mousemove="updateMousePosition">
      <div class="info">在画布内移动鼠标</div>
      <JvPopover 
        :reference-rect="mouseRect"
        :offset="[10, 10]"
        :arrow="true"
        placement="right-start"
        manual
        :show="true"
      >
        <template #default>
          <div class="mouse-popover">
            <div>鼠标位置:</div>
            <div>X: {{ mousePosition.x }}</div>
            <div>Y: {{ mousePosition.y }}</div>
          </div>
        </template>
      </JvPopover>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mousePosition = ref({ x: 0, y: 0 })

const mouseRect = computed(() => {
  return {
    width: 1,
    height: 1,
    top: mousePosition.value.y,
    left: mousePosition.value.x,
    right: mousePosition.value.x + 1,
    bottom: mousePosition.value.y + 1,
  }
})

function updateMousePosition(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  mousePosition.value = {
    x: e.clientX,
    y: e.clientY,
  }
}
</script>

<style scoped>
.virtual-ref-demo {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.canvas {
  width: 500px;
  height: 300px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  color: #666;
  pointer-events: none;
}

.mouse-popover {
  padding: 8px 12px;
  font-size: 14px;
}
</style>
``` 