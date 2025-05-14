# JvDrawer 抽屉组件

## 1. 组件介绍
`JvDrawer` 是一个从屏幕边缘滑出的浮层面板组件，通常用于在不离开当前页面的情况下，展示或处理任务。它可以从屏幕的四个方向滑出，适用于展示表单、导航菜单、详情信息等场景，是弹窗的一种变体形式。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 触发器：用于打开抽屉的元素
- 覆盖层：抽屉打开时的背景遮罩
- 抽屉容器：包含抽屉内容的主体部分
  - 头部区域：显示标题和关闭按钮
  - 内容区域：显示主要内容
  - 底部区域：通常放置操作按钮

### 基本使用示例
```vue
<template>
  <!-- 基础抽屉 -->
  <JvButton @click="visible = true">打开抽屉</JvButton>
  <JvDrawer v-model="visible" title="基础抽屉">
    <div>抽屉内容</div>
  </JvDrawer>
  
  <!-- 不同位置 -->
  <JvDrawer v-model="visibleLeft" placement="left" title="左侧抽屉">
    <div>左侧抽屉内容</div>
  </JvDrawer>
  
  <!-- 自定义头部和底部 -->
  <JvDrawer v-model="visibleCustom">
    <template #header>
      <div>自定义头部</div>
    </template>
    <div>主要内容</div>
    <template #footer>
      <div>
        <JvButton variant="outlined" @click="visibleCustom = false">取消</JvButton>
        <JvButton variant="primary" @click="visibleCustom = false">确定</JvButton>
      </div>
    </template>
  </JvDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const visibleLeft = ref(false)
const visibleCustom = ref(false)
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 平滑过渡：抽屉打开和关闭有平滑的动画效果
- 遮罩层交互：点击遮罩层可以关闭抽屉（可配置）
- 关闭按钮：右上角提供关闭按钮（可配置）
- 防止滚动穿透：抽屉打开时，背景内容滚动将被禁用

特殊交互：
- 响应式设计：在移动设备上，抽屉会自动调整为从底部弹出
- 按键支持：支持ESC键关闭抽屉
- 自适应内容：抽屉高度会根据内容自动调整（在顶部和底部模式下）
- 可以通过ref获取实例，调用open和close方法手动控制抽屉

## 4. 可访问性
组件遵循WCAG无障碍标准：
- 键盘导航：支持通过键盘操作（Tab键导航、Esc键关闭）
- 焦点管理：抽屉打开时，焦点会移动到抽屉内容
- 语义化结构：使用合适的ARIA属性表示抽屉的角色和状态
- 屏幕阅读器支持：提供合适的朗读文本和提示

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean | false | 是否显示抽屉，支持v-model |
| placement | 'left' \| 'right' \| 'top' \| 'bottom' | 'right' | 抽屉出现的位置 |
| size | string \| number | '300px' | 抽屉宽度（左右方向）或高度（上下方向） |
| title | string | undefined | 抽屉标题 |
| closeIcon | string | '$close' | 关闭图标 |
| closeable | boolean | true | 是否显示关闭按钮 |
| maskClosable | boolean | true | 点击遮罩层是否可关闭 |
| zIndex | number | undefined | 抽屉层级，会自动管理 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: boolean) | 抽屉显示状态变化时触发 |
| open | - | 抽屉打开时触发 |
| close | - | 抽屉关闭时触发 |
| openAfter | - | 抽屉打开动画结束后触发 |
| closeAfter | - | 抽屉关闭动画结束后触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| trigger | 触发抽屉的元素，提供props参数以绑定必要的事件 |
| header | 自定义头部区域 |
| title | 自定义标题 |
| footer | 自定义底部区域 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| open | - | 打开抽屉 |
| close | - | 关闭抽屉 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| DR-002 | 抽屉显示 | 验证抽屉是否正确显示 | 1. 设置modelValue为true<br>2. 检查抽屉是否显示 | 抽屉内容应显示 | ✅ |
| DR-003 | 内容渲染 | 验证抽屉内容是否正确渲染 | 1. 设置抽屉内容<br>2. 打开抽屉<br>3. 检查内容是否显示 | 内容应正确显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-101 | 位置设置 | 验证不同placement属性 | 1. 设置不同的placement属性<br>2. 打开抽屉<br>3. 检查抽屉位置 | 抽屉位置符合设置 | ✅ |
| DR-102 | 尺寸设置 | 验证size属性 | 1. 设置不同的size属性<br>2. 打开抽屉<br>3. 检查抽屉尺寸 | 抽屉尺寸符合设置 | ✅ |
| DR-103 | 标题设置 | 验证title属性 | 1. 设置title属性<br>2. 打开抽屉<br>3. 检查抽屉标题 | 标题内容符合设置 | ✅ |
| DR-104 | 关闭图标 | 验证closeIcon属性 | 1. 设置不同的closeIcon属性<br>2. 打开抽屉<br>3. 检查关闭图标 | 关闭图标符合设置 | ✅ |
| DR-105 | 关闭按钮 | 验证closeable属性 | 1. 设置closeable=false<br>2. 打开抽屉<br>3. 检查关闭按钮是否显示 | 关闭按钮的显示符合设置 | ✅ |
| DR-106 | 遮罩关闭 | 验证maskClosable属性 | 1. 设置maskClosable=false<br>2. 打开抽屉<br>3. 点击遮罩层 | 点击遮罩层的关闭行为符合设置 | ✅ |
| DR-107 | 响应式设计 | 验证移动设备下的响应式行为 | 1. 在移动设备视口大小下测试<br>2. 打开抽屉<br>3. 检查抽屉位置 | 移动设备下应从底部弹出 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-201 | 更新事件 | 验证update:modelValue事件 | 1. 监听事件<br>2. 打开/关闭抽屉<br>3. 检查事件触发 | 事件被触发且值正确 | ✅ |
| DR-202 | 打开事件 | 验证open事件 | 1. 监听事件<br>2. 打开抽屉<br>3. 检查事件触发 | open事件被触发 | ✅ |
| DR-203 | 关闭事件 | 验证close事件 | 1. 监听事件<br>2. 关闭抽屉<br>3. 检查事件触发 | close事件被触发 | ✅ |
| DR-204 | 打开后事件 | 验证openAfter事件 | 1. 监听事件<br>2. 打开抽屉<br>3. 等待动画结束<br>4. 检查事件触发 | openAfter事件被触发 | ✅ |
| DR-205 | 关闭后事件 | 验证closeAfter事件 | 1. 监听事件<br>2. 关闭抽屉<br>3. 等待动画结束<br>4. 检查事件触发 | closeAfter事件被触发 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 打开抽屉<br>3. 检查内容是否显示 | 默认插槽内容正确显示 | ✅ |
| DR-302 | 头部插槽 | 验证header插槽 | 1. 设置header插槽内容<br>2. 打开抽屉<br>3. 检查头部内容 | 头部插槽内容正确显示 | ✅ |
| DR-303 | 标题插槽 | 验证title插槽 | 1. 设置title插槽内容<br>2. 打开抽屉<br>3. 检查标题内容 | 标题插槽内容正确显示 | ✅ |
| DR-304 | 底部插槽 | 验证footer插槽 | 1. 设置footer插槽内容<br>2. 打开抽屉<br>3. 检查底部内容 | 底部插槽内容正确显示 | ✅ |
| DR-305 | 触发器插槽 | 验证trigger插槽 | 1. 设置trigger插槽内容<br>2. 与触发器交互<br>3. 检查抽屉行为 | 触发器正确触发抽屉显示 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-401 | 打开方法 | 验证open方法 | 1. 获取组件实例<br>2. 调用open方法<br>3. 检查抽屉是否显示 | 抽屉显示 | ✅ |
| DR-402 | 关闭方法 | 验证close方法 | 1. 获取组件实例<br>2. 调用close方法<br>3. 检查抽屉是否隐藏 | 抽屉隐藏 | ✅ |

### 交互和动画测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-501 | 动画效果 | 验证抽屉的过渡动画 | 1. 打开抽屉<br>2. 观察过渡动画<br>3. 关闭抽屉<br>4. 观察过渡动画 | 有平滑的过渡动画 | ✅ |
| DR-502 | 遮罩点击 | 验证点击遮罩关闭抽屉 | 1. 打开抽屉<br>2. 点击遮罩<br>3. 检查抽屉是否关闭 | 抽屉关闭 | ✅ |
| DR-503 | 滚动锁定 | 验证抽屉打开时背景滚动锁定 | 1. 打开抽屉<br>2. 尝试滚动背景<br>3. 检查背景是否滚动 | 背景滚动被禁用 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| DR-601 | 键盘导航 | 验证键盘导航和操作 | 1. 使用Tab键聚焦到触发元素<br>2. 按Enter键打开抽屉<br>3. 在抽屉内使用Tab键导航<br>4. 按Esc键 | 可以通过键盘操作抽屉 | ✅ |
| DR-602 | 焦点管理 | 验证打开抽屉时的焦点行为 | 1. 打开抽屉<br>2. 检查焦点是否移到抽屉内 | 焦点应移动到抽屉内 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvButton @click="visible = true">打开抽屉</JvButton>
  <JvDrawer v-model="visible" title="基础抽屉">
    <div style="padding: 20px;">
      这是抽屉内容
    </div>
  </JvDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 不同方向
```vue
<template>
  <div class="drawer-demo">
    <JvButton @click="leftVisible = true">左侧抽屉</JvButton>
    <JvDrawer v-model="leftVisible" placement="left" title="左侧抽屉">
      <div style="padding: 20px;">
        从左侧滑出的抽屉
      </div>
    </JvDrawer>
    
    <JvButton @click="rightVisible = true">右侧抽屉</JvButton>
    <JvDrawer v-model="rightVisible" placement="right" title="右侧抽屉">
      <div style="padding: 20px;">
        从右侧滑出的抽屉
      </div>
    </JvDrawer>
    
    <JvButton @click="topVisible = true">顶部抽屉</JvButton>
    <JvDrawer v-model="topVisible" placement="top" title="顶部抽屉">
      <div style="padding: 20px;">
        从顶部滑出的抽屉
      </div>
    </JvDrawer>
    
    <JvButton @click="bottomVisible = true">底部抽屉</JvButton>
    <JvDrawer v-model="bottomVisible" placement="bottom" title="底部抽屉">
      <div style="padding: 20px;">
        从底部滑出的抽屉
      </div>
    </JvDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leftVisible = ref(false)
const rightVisible = ref(false)
const topVisible = ref(false)
const bottomVisible = ref(false)
</script>

<style scoped>
.drawer-demo {
  display: flex;
  gap: 10px;
}
</style>
```

### 自定义大小
```vue
<template>
  <JvButton @click="visible = true">打开宽抽屉</JvButton>
  <JvDrawer v-model="visible" title="自定义大小" size="500px">
    <div style="padding: 20px;">
      这是一个宽度为500px的抽屉
    </div>
  </JvDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 自定义头部和底部
```vue
<template>
  <JvButton @click="visible = true">自定义抽屉</JvButton>
  <JvDrawer v-model="visible">
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px;">
        <div style="font-size: 18px; font-weight: bold;">自定义头部</div>
        <JvButton variant="text" icon="$close" @click="visible = false" />
      </div>
    </template>
    
    <div style="padding: 20px;">
      <p>这是抽屉的主要内容</p>
      <p>可以放置任何内容，如表单、列表等</p>
    </div>
    
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 10px; padding: 16px;">
        <JvButton variant="outlined" @click="visible = false">取消</JvButton>
        <JvButton variant="primary" @click="handleConfirm">确定</JvButton>
      </div>
    </template>
  </JvDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

function handleConfirm() {
  // 处理确认逻辑
  visible.value = false
}
</script>
```

### 使用组件实例方法
```vue
<template>
  <div>
    <JvButton @click="openDrawer">使用方法打开抽屉</JvButton>
    <JvDrawer 
      ref="drawerRef"
      title="通过方法控制"
      @open="handleOpen"
      @close="handleClose"
    >
      <div style="padding: 20px;">
        这个抽屉通过组件实例方法控制
      </div>
      <template #footer>
        <JvButton @click="closeDrawer">关闭抽屉</JvButton>
      </template>
    </JvDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawerRef = ref(null)

function openDrawer() {
  drawerRef.value.open()
}

function closeDrawer() {
  drawerRef.value.close()
}

function handleOpen() {
  console.log('抽屉已打开')
}

function handleClose() {
  console.log('抽屉已关闭')
}
</script>
```

### 响应式抽屉
```vue
<template>
  <JvButton @click="visible = true">打开响应式抽屉</JvButton>
  <JvDrawer v-model="visible" title="响应式抽屉">
    <div style="padding: 20px;">
      <p>在移动设备上会自动显示为底部抽屉</p>
      <p>请尝试在不同设备上查看此抽屉的表现</p>
    </div>
  </JvDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
``` 