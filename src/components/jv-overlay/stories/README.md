# JvOverlay 遮罩层组件

## 1. 组件介绍
`JvOverlay` 是一个灵活的遮罩层组件，用于在页面或特定元素上创建覆盖层效果。它支持全屏（viewport）或父元素级别的遮罩，可以用于模态框、加载提示、图片预览等场景。通过提供半透明背景和模糊效果，JvOverlay能够有效地将用户注意力集中在前景内容上，同时保持与背景内容的视觉连接。

## 2. 布局结构使用方式
组件的布局结构主要包含以下部分：
- **遮罩层**：半透明的背景覆盖层，可选显示
- **内容区域**：通过默认插槽提供的自定义内容

JvOverlay组件可以覆盖整个视口（viewport模式）或仅覆盖其父元素（parent模式），并通过Teleport将内容渲染到适当的DOM位置，确保正确的层叠顺序。

### 基本使用示例
```vue
<template>
  <div class="container">
    <button @click="showOverlay = true">显示遮罩层</button>
    
    <JvOverlay v-model:model-value="showOverlay" target="viewport" @click-overlay="handleClick">
      <div class="content-box">
        这是遮罩层中的内容
        <button @click="showOverlay = false">关闭</button>
      </div>
    </JvOverlay>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvOverlay } from 'jovial-ui'

const showOverlay = ref(false)

function handleClick() {
  // 点击遮罩层的处理逻辑
  showOverlay.value = false
}
</script>

<style scoped>
.content-box {
  padding: 20px;
  background: white;
  border-radius: 8px;
  max-width: 400px;
  margin: 20% auto 0;
  text-align: center;
}
</style>
```

## 3. 交互设计
JvOverlay组件提供了丰富的交互特性：

- **遮罩层交互**：
  - 点击遮罩层触发`clickOverlay`事件，可用于关闭浮层
  - 支持自定义是否显示遮罩层（showMask属性）

- **视觉效果**：
  - 半透明背景：默认提供rgba(0, 0, 0, 0.5)的背景，提供足够的对比度
  - 背景模糊：采用backdrop-filter实现模糊效果，增强前景内容的视觉焦点
  - 过渡动画：平滑的淡入淡出效果

- **内容定位**：
  - 支持两种定位模式：viewport（全屏）和parent（父元素）
  - 在parent模式下自动设置父元素为相对定位，确保正确覆盖

- **层级管理**：
  - 自动管理z-index，确保遮罩层和内容在正确的层叠顺序上
  - 支持自定义maskZIndex，适应复杂的层叠上下文

## 4. 可访问性
JvOverlay组件在设计时考虑了可访问性要求：

- **键盘可用性**：内容区域内的可交互元素可通过键盘导航访问
- **焦点管理**：当遮罩层打开时，焦点应当移动到内容区域内的第一个可聚焦元素
- **屏幕阅读器支持**：组件结构符合语义化要求，屏幕阅读器可以正确解释内容
- **视觉对比度**：默认的遮罩层背景提供足够的对比度，确保前景内容清晰可见
- **响应式设计**：在各种屏幕尺寸上都能正确显示和交互

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | boolean | - | 控制遮罩层的显示状态（v-model双向绑定）|
| target | 'viewport' \| 'parent' | 'viewport' | 遮罩层的作用目标，viewport为全屏遮罩，parent为父元素遮罩 |
| showMask | boolean | true | 是否显示半透明遮罩背景 |
| maskZIndex | number | 1000 | 遮罩层的z-index值 |
| class | string | - | 自定义CSS类名 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:model-value | boolean | 更新遮罩层显示状态 |
| closeAfter | - | 遮罩层关闭动画结束后触发 |
| openAfter | - | 遮罩层打开动画结束后触发 |
| clickOverlay | - | 点击遮罩层背景时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 遮罩层中显示的内容，具有{style: CSSProperties}参数 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| OV-001 | 基本渲染 | 验证组件能够正确渲染 | 1. 挂载JvOverlay组件<br>2. 设置model-value为true | 组件应正确渲染遮罩层和内容区域 | ✅ |
| OV-002 | 显示/隐藏控制 | 验证model-value属性控制显示状态 | 1. 挂载组件，初始model-value为false<br>2. 更改model-value为true<br>3. 再次更改为false | 遮罩层应根据model-value值显示或隐藏 | ✅ |
| OV-003 | 遮罩层可见性 | 验证showMask属性控制遮罩背景显示 | 1. 挂载组件，设置showMask为false<br>2. 检查遮罩背景元素可见性 | 当showMask为false时不应显示半透明背景 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| OV-101 | 目标设置 | 验证target属性效果 | 1. 分别设置target为viewport和parent<br>2. 检查遮罩层渲染位置 | viewport模式应渲染到body，parent模式应渲染在父元素内 | ✅ |
| OV-102 | Z-index控制 | 验证maskZIndex属性效果 | 1. 设置自定义maskZIndex值<br>2. 检查遮罩层和内容z-index | 遮罩层z-index应为设定值，内容区域为设定值+1 | ✅ |
| OV-103 | 自定义类名 | 验证class属性应用 | 1. 设置自定义class值<br>2. 检查元素类名 | 元素应包含指定的自定义类名 | ✅ |

### 事件功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| OV-201 | 点击遮罩事件 | 验证clickOverlay事件触发 | 1. 挂载组件并监听clickOverlay事件<br>2. 模拟点击遮罩层背景 | clickOverlay事件应被触发 | ✅ |
| OV-202 | 打开后事件 | 验证openAfter事件触发 | 1. 挂载组件并监听openAfter事件<br>2. 将model-value从false改为true | 过渡动画结束后应触发openAfter事件 | ✅ |
| OV-203 | 关闭后事件 | 验证closeAfter事件触发 | 1. 挂载组件，model-value为true<br>2. 监听closeAfter事件<br>3. 将model-value改为false | 过渡动画结束后应触发closeAfter事件 | ✅ |

### 插槽功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| OV-301 | 默认插槽内容 | 验证默认插槽渲染内容 | 1. 挂载组件并提供默认插槽内容<br>2. 检查渲染结果 | 默认插槽内容应正确渲染在遮罩层内 | ✅ |

## 使用示例

### 基础用法 - 全屏遮罩
```vue
<template>
  <div>
    <button @click="isVisible = true">打开全屏遮罩</button>
    
    <JvOverlay v-model:model-value="isVisible" target="viewport" @click-overlay="isVisible = false">
      <div class="modal-content">
        <h3>全屏遮罩示例</h3>
        <p>这是一个全屏遮罩层示例，点击遮罩区域或关闭按钮可关闭</p>
        <button @click="isVisible = false">关闭</button>
      </div>
    </JvOverlay>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvOverlay } from 'jovial-ui'

const isVisible = ref(false)
</script>

<style scoped>
.modal-content {
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 20vh auto 0;
  text-align: center;
}
</style>
```

### 父元素遮罩
```vue
<template>
  <div class="parent-container">
    <button @click="showParentOverlay = true">显示局部遮罩</button>
    
    <div class="relative-container" id="overlay-container">
      <div class="content-area">
        这是将被遮罩的内容区域
      </div>
      
      <JvOverlay 
        v-model:model-value="showParentOverlay" 
        target="parent"
        @open-after="handleOpen"
        @close-after="handleClose"
      >
        <div class="overlay-content">
          <p>这是父元素内的遮罩层</p>
          <button @click="showParentOverlay = false">关闭</button>
        </div>
      </JvOverlay>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvOverlay } from 'jovial-ui'

const showParentOverlay = ref(false)

function handleOpen() {
  console.log('遮罩层已打开')
}

function handleClose() {
  console.log('遮罩层已关闭')
}
</script>

<style scoped>
.relative-container {
  width: 500px;
  height: 300px;
  border: 2px solid #ddd;
  margin-top: 20px;
  overflow: hidden;
}

.content-area {
  padding: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.overlay-content {
  padding: 16px;
  background: white;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
```

### 无背景遮罩
```vue
<template>
  <div>
    <button @click="showNoMaskOverlay = true">显示无背景遮罩</button>
    
    <JvOverlay 
      v-model:model-value="showNoMaskOverlay" 
      :show-mask="false"
    >
      <div class="floating-content">
        <p>这是没有背景遮罩的浮层内容</p>
        <button @click="showNoMaskOverlay = false">关闭</button>
      </div>
    </JvOverlay>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvOverlay } from 'jovial-ui'

const showNoMaskOverlay = ref(false)
</script>

<style scoped>
.floating-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
```

### 自定义Z-index
```vue
<template>
  <div>
    <button @click="showCustomZOverlay = true">显示自定义层级遮罩</button>
    
    <JvOverlay 
      v-model:model-value="showCustomZOverlay" 
      :mask-z-index="2000"
    >
      <div class="custom-z-content">
        <p>这是具有自定义z-index的遮罩层内容</p>
        <p>当前遮罩层z-index: 2000</p>
        <p>当前内容z-index: 2001</p>
        <button @click="showCustomZOverlay = false">关闭</button>
      </div>
    </JvOverlay>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvOverlay } from 'jovial-ui'

const showCustomZOverlay = ref(false)
</script>

<style scoped>
.custom-z-content {
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 20vh auto 0;
  text-align: center;
}
</style>
```
