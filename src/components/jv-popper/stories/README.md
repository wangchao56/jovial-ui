# JvPopper 浮层组件

## 1. 组件介绍
`JvPopper` 是一个灵活的浮层定位组件，用于在页面中创建具有精确定位的浮层内容，如提示框、下拉菜单、弹出框等。它基于参考元素的位置自动计算浮层的最佳显示位置，支持多种放置方式、自定义箭头和主题设置，确保浮层内容在视口内可见。

## 2. 布局结构使用方式
组件的布局结构主要包含以下部分：
- **浮层容器**：定位于参考元素附近的主体容器
- **浮层内容区域**：用户自定义的浮层内容
- **箭头指示器**（可选）：指向参考元素的视觉指示器

JvPopper 组件通过 Teleport 将内容渲染到 body 元素中，避免定位和层叠上下文的限制。

### 基本使用示例
```vue
<template>
  <div ref="referenceEl" class="reference-element">
    参考元素
  </div>
  
  <JvPopper 
    :reference-rect="referenceRect" 
    placement="bottom"
    :arrow="true"
  >
    <div class="popper-content">
      这是浮层内容
    </div>
  </JvPopper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { JvPopper } from 'jovial-ui'

const referenceEl = ref(null)
const referenceRect = ref(null)

onMounted(() => {
  // 获取参考元素的位置信息
  updateReferenceRect()
  // 监听滚动和调整大小事件
  window.addEventListener('scroll', updateReferenceRect)
  window.addEventListener('resize', updateReferenceRect)
})

function updateReferenceRect() {
  if (referenceEl.value) {
    referenceRect.value = referenceEl.value.getBoundingClientRect()
  }
}
</script>

<style>
.reference-element {
  padding: 8px 16px;
  background: #f0f0f0;
  display: inline-block;
  cursor: pointer;
}
.popper-content {
  padding: 12px;
  width: 200px;
}
</style>
```

## 3. 交互设计
JvPopper 组件提供了多种交互方式和自适应能力，确保良好的用户体验：

- **智能定位**：
  - 自动检测视口边界，避免浮层溢出屏幕
  - 当首选位置无法容纳浮层时，自动切换到最佳替代位置
  - 支持 12 种不同的放置位置（top/bottom/left/right + start/end 变体）

- **视觉反馈**：
  - 过渡动画：平滑的渐入渐出效果
  - 箭头指示：可选的箭头指向参考元素，增强视觉连接
  - 阴影与模糊：通过滤镜提供深度感，边缘模糊增强视觉体验

- **适应能力**：
  - 窗口调整：在窗口大小改变时自动重新定位
  - 滚动响应：在页面滚动时保持正确的相对位置
  - 屏幕边缘处理：自动调整位置以确保完全可见

- **主题支持**：
  - 提供 primary、secondary、success、warning、error 等预设主题
  - 支持自定义背景色和边框颜色

## 4. 可访问性
组件在设计时考虑了可访问性要求，以确保各种用户都能有效地使用：

- **键盘可访问性**：浮层内容可以通过键盘导航访问，确保无鼠标用户可以操作
- **屏幕阅读器支持**：浮层内容可以被屏幕阅读器正确识别和朗读
- **焦点管理**：在浮层打开时可以适当地移动焦点，关闭时返回原焦点位置
- **高对比度**：提供足够的颜色对比度，确保视觉清晰度
- **响应式设计**：在各种屏幕尺寸上都能正确显示和交互

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| referenceRect | Rect | 必填 | 参考元素的位置信息（DOMRect对象）|
| placement | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' | 'bottom' | 浮层的首选放置位置 |
| arrow | boolean | false | 是否显示箭头指示器 |
| offset | number \| [number, number] | [0, 0] | 浮层与参考元素的偏移量，可设置单个值或[x, y]数组 |
| background | string | - | 自定义背景色，覆盖主题默认值 |
| borderColor | string | - | 自定义边框颜色，覆盖主题默认值 |
| type | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' | - | 预设主题类型 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| afterShow | - | 浮层显示后触发 |
| afterHide | - | 浮层隐藏后触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 浮层内容插槽 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PP-001 | 基本渲染 | 验证组件能够正确渲染 | 1. 挂载JvPopper组件<br>2. 提供有效的referenceRect属性 | 组件应正确渲染并定位在参考元素附近 | ✅ |
| PP-002 | 位置计算 | 验证浮层位置计算逻辑 | 1. 挂载JvPopper组件并设置不同的placement<br>2. 检查位置计算结果 | 浮层应根据placement属性正确定位 | ✅ |
| PP-003 | 箭头显示 | 验证箭头元素的显示 | 1. 挂载JvPopper组件并设置arrow=true<br>2. 检查箭头元素是否存在及样式 | 应正确显示指向参考元素的箭头 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PP-101 | 放置位置 | 验证不同placement属性的效果 | 1. 分别使用不同的placement值挂载组件<br>2. 检查浮层位置 | 浮层应按照指定的放置位置显示 | ✅ |
| PP-102 | 偏移设置 | 验证offset属性效果 | 1. 设置不同的offset值挂载组件<br>2. 检查浮层偏移 | 浮层应按照指定的偏移值调整位置 | ✅ |
| PP-103 | 主题类型 | 验证type属性效果 | 1. 分别使用不同的type值挂载组件<br>2. 检查浮层样式 | 浮层应应用对应主题类型的样式 | ✅ |
| PP-104 | 自定义样式 | 验证background和borderColor属性 | 1. 设置自定义的background和borderColor<br>2. 检查浮层样式 | 浮层应应用指定的背景色和边框颜色 | ✅ |

### 边界情况测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PP-201 | 视口边缘处理 | 验证接近视口边缘时的自适应 | 1. 将参考元素放置在视口边缘<br>2. 观察浮层位置变化 | 浮层应自动调整位置，确保完全在视口内可见 | ✅ |
| PP-202 | 窗口调整响应 | 验证窗口大小变化时的响应 | 1. 挂载组件<br>2. 模拟窗口大小变化<br>3. 检查位置更新 | 窗口大小变化时浮层应重新计算并调整位置 | ✅ |
| PP-203 | 滚动响应 | 验证页面滚动时的响应 | 1. 挂载组件<br>2. 模拟页面滚动<br>3. 检查位置更新 | 页面滚动时浮层应重新计算并调整位置 | ✅ |

### 过渡效果测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PP-301 | 显示过渡 | 验证浮层显示的过渡效果 | 1. 控制浮层显示<br>2. 观察过渡动画 | 浮层应以平滑的过渡效果显示 | ✅ |
| PP-302 | 隐藏过渡 | 验证浮层隐藏的过渡效果 | 1. 控制浮层隐藏<br>2. 观察过渡动画 | 浮层应以平滑的过渡效果隐藏 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <div ref="buttonRef" class="button">
    悬停显示提示
  </div>
  
  <JvPopper 
    v-if="showPopper"
    :reference-rect="buttonRect" 
    arrow
  >
    <div class="tooltip">这是一个简单的提示信息</div>
  </JvPopper>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { JvPopper } from 'jovial-ui'

const buttonRef = ref(null)
const buttonRect = ref(null)
const showPopper = ref(false)

function updateRect() {
  if (buttonRef.value) {
    buttonRect.value = buttonRef.value.getBoundingClientRect()
  }
}

function handleMouseEnter() {
  updateRect()
  showPopper.value = true
}

function handleMouseLeave() {
  showPopper.value = false
}

onMounted(() => {
  const el = buttonRef.value
  if (el) {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', updateRect)
  }
})

onUnmounted(() => {
  const el = buttonRef.value
  if (el) {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
    window.removeEventListener('resize', updateRect)
  }
})
</script>

<style scoped>
.button {
  padding: 8px 16px;
  background: #f0f0f0;
  display: inline-block;
  cursor: pointer;
}
.tooltip {
  padding: 10px;
  min-width: 120px;
}
</style>
```

### 不同放置位置
```vue
<template>
  <div class="placement-demo">
    <div v-for="placement in placements" :key="placement" class="button-container">
      <button ref="buttonsRef" :data-placement="placement" @click="showPopperFor(placement)">
        {{ placement }}
      </button>
      
      <JvPopper 
        v-if="visiblePlacements[placement]"
        :reference-rect="buttonRects[placement]" 
        :placement="placement"
        arrow
      >
        <div class="popper-content">
          {{ placement }} 位置的浮层
        </div>
      </JvPopper>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { JvPopper } from 'jovial-ui'

const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
]

const buttonsRef = ref([])
const buttonRects = reactive({})
const visiblePlacements = reactive({})

function showPopperFor(placement) {
  // 更新当前点击按钮的位置信息
  const buttons = buttonsRef.value
  const button = buttons.find(btn => btn.dataset.placement === placement)
  if (button) {
    buttonRects[placement] = button.getBoundingClientRect()
    // 关闭其他浮层，只显示当前点击的
    placements.forEach(p => {
      visiblePlacements[p] = p === placement
    })
  }
}

onMounted(() => {
  // 初始化每个按钮的位置信息
  buttonsRef.value.forEach(button => {
    const placement = button.dataset.placement
    buttonRects[placement] = button.getBoundingClientRect()
    visiblePlacements[placement] = false
  })
})
</script>

<style scoped>
.placement-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 100px;
}
.button-container {
  text-align: center;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
.popper-content {
  padding: 10px;
  min-width: 120px;
}
</style>
```

### 使用不同主题
```vue
<template>
  <div class="theme-demo">
    <button 
      v-for="type in types" 
      :key="type" 
      :ref="el => buttonRefs[type] = el"
      @click="togglePopper(type)"
    >
      {{ type }} 主题
    </button>
    
    <JvPopper 
      v-for="type in types"
      :key="type"
      v-show="visibleTypes[type]"
      :reference-rect="buttonRects[type]"
      :type="type"
      arrow
      placement="top"
    >
      <div class="theme-content">
        这是 {{ type }} 主题的浮层
      </div>
    </JvPopper>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { JvPopper } from 'jovial-ui'

const types = ['primary', 'secondary', 'success', 'warning', 'error']
const buttonRefs = reactive({})
const buttonRects = reactive({})
const visibleTypes = reactive({})

// 初始化所有主题为不可见
types.forEach(type => {
  visibleTypes[type] = false
})

function togglePopper(type) {
  const button = buttonRefs[type]
  if (button) {
    buttonRects[type] = button.getBoundingClientRect()
    visibleTypes[type] = !visibleTypes[type]
  }
}

onMounted(() => {
  // 初始化每个按钮的位置信息
  types.forEach(type => {
    if (buttonRefs[type]) {
      buttonRects[type] = buttonRefs[type].getBoundingClientRect()
    }
  })
})
</script>

<style scoped>
.theme-demo {
  display: flex;
  gap: 16px;
  margin: 100px 0;
}
button {
  padding: 8px 16px;
  cursor: pointer;
}
.theme-content {
  padding: 12px;
  min-width: 150px;
}
</style>
```

### 自定义样式
```vue
<template>
  <button ref="customButtonRef" @click="toggleCustomPopper">
    显示自定义样式浮层
  </button>
  
  <JvPopper 
    v-if="showCustomPopper"
    :reference-rect="customButtonRect" 
    background="#1a1a1a"
    border-color="#5d00ff"
    arrow
    placement="right"
  >
    <div class="custom-content">
      <h3>自定义样式</h3>
      <p>自定义背景和边框颜色的浮层</p>
    </div>
  </JvPopper>
</template>

<script setup>
import { ref } from 'vue'
import { JvPopper } from 'jovial-ui'

const customButtonRef = ref(null)
const customButtonRect = ref(null)
const showCustomPopper = ref(false)

function toggleCustomPopper() {
  if (customButtonRef.value) {
    customButtonRect.value = customButtonRef.value.getBoundingClientRect()
    showCustomPopper.value = !showCustomPopper.value
  }
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  margin: 50px;
  cursor: pointer;
}
.custom-content {
  padding: 16px;
  color: white;
  min-width: 200px;
}
.custom-content h3 {
  margin-top: 0;
  margin-bottom: 8px;
}
.custom-content p {
  margin: 0;
}
</style>
```
