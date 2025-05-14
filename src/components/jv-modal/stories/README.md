# JvModal 模态框组件

## 1. 组件介绍
`JvModal` 是一个模态对话框组件，用于在当前页面上浮层展示重要信息或获取用户输入。它通过暂时中断用户操作并聚焦到特定任务，适用于重要提示、确认操作、表单提交等场景，是用户交互中常用的反馈组件。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 遮罩层：覆盖整个页面的半透明背景
- 模态框容器：居中显示的主体内容区域
  - 头部区域：显示标题和关闭按钮
  - 内容区域：显示主要信息或交互元素
  - 底部区域：通常放置操作按钮，如确认和取消

### 基本使用示例
```vue
<template>
  <!-- 基础模态框 -->
  <JvButton @click="visible = true">打开模态框</JvButton>
  <JvModal v-model="visible" title="提示">
    <div>这是模态框内容</div>
  </JvModal>
  
  <!-- 自定义按钮文本 -->
  <JvModal 
    v-model="visibleCustom" 
    cancelText="返回" 
    confirmText="同意"
  >
    <template #title>自定义按钮</template>
    <div>模态框内容</div>
  </JvModal>
  
  <!-- 完全自定义 -->
  <JvModal v-model="visibleFull">
    <template #header>
      <div>自定义头部</div>
    </template>
    <div>主要内容</div>
    <template #footer>
      <div>
        <JvButton @click="visibleFull = false">取消</JvButton>
        <JvButton @click="visibleFull = false">确定</JvButton>
      </div>
    </template>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const visibleCustom = ref(false)
const visibleFull = ref(false)
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 平滑过渡：模态框打开和关闭有平滑的缩放动画效果
- 遮罩交互：点击遮罩层可以关闭模态框（可配置）
- 关闭按钮：右上角提供关闭按钮（可配置）
- 按钮操作：默认提供取消和确认两个操作按钮
- 焦点管理：打开时自动将焦点转移到模态框内

特殊交互：
- 滚动锁定：模态框打开时，背景内容滚动将被禁用，防止页面滚动
- 按键支持：支持ESC键关闭模态框
- 层级管理：自动管理z-index，确保模态框始终显示在最上层
- 可以通过ref获取实例，调用open和close方法手动控制模态框

## 4. 可访问性
组件遵循WCAG无障碍标准：
- 键盘导航：支持通过键盘操作（Tab键导航、Esc键关闭）
- 焦点陷阱：模态框打开时，焦点被限制在模态框内部
- 语义化结构：使用合适的ARIA属性表示模态框的角色和状态
  - `role="dialog"` 和 `aria-modal="true"` 表明这是一个模态对话框
  - 标题元素与模态框关联
- 屏幕阅读器支持：提供合适的朗读文本和提示
- 颜色对比度：确保文本和背景有足够的对比度

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean | false | 是否显示模态框，支持v-model |
| closeable | boolean | true | 是否显示关闭按钮 |
| closeIcon | string | '$close' | 关闭图标 |
| maskClosable | boolean | true | 点击遮罩层是否可关闭 |
| cancelText | string | '取消' | 取消按钮文本 |
| confirmText | string | '确定' | 确认按钮文本 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: boolean) | 模态框显示状态变化时触发 |
| close | - | 点击关闭按钮时触发 |
| cancel | - | 点击取消按钮时触发 |
| confirm | - | 点击确认按钮时触发 |
| openAfter | - | 模态框打开动画结束后触发 |
| closeAfter | - | 模态框关闭动画结束后触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 模态框内容 |
| trigger | 触发模态框的元素，提供props参数以绑定必要的事件 |
| header | 自定义头部区域 |
| title | 自定义标题内容 |
| footer | 自定义底部区域，默认包含取消和确认按钮 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| open | - | 打开模态框 |
| close | - | 关闭模态框 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| MD-002 | 模态框显示 | 验证模态框是否正确显示 | 1. 设置modelValue为true<br>2. 检查模态框是否显示 | 模态框内容应显示 | ✅ |
| MD-003 | 内容渲染 | 验证模态框内容是否正确渲染 | 1. 设置模态框内容<br>2. 打开模态框<br>3. 检查内容是否显示 | 内容应正确显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-101 | 关闭按钮 | 验证closeable属性 | 1. 设置closeable=false<br>2. 打开模态框<br>3. 检查关闭按钮是否显示 | 关闭按钮的显示符合设置 | ✅ |
| MD-102 | 关闭图标 | 验证closeIcon属性 | 1. 设置不同的closeIcon属性<br>2. 打开模态框<br>3. 检查关闭图标 | 关闭图标符合设置 | ✅ |
| MD-103 | 遮罩关闭 | 验证maskClosable属性 | 1. 设置maskClosable=false<br>2. 打开模态框<br>3. 点击遮罩层 | 点击遮罩层的关闭行为符合设置 | ✅ |
| MD-104 | 取消文本 | 验证cancelText属性 | 1. 设置cancelText属性<br>2. 打开模态框<br>3. 检查取消按钮文本 | 取消按钮文本符合设置 | ✅ |
| MD-105 | 确认文本 | 验证confirmText属性 | 1. 设置confirmText属性<br>2. 打开模态框<br>3. 检查确认按钮文本 | 确认按钮文本符合设置 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-201 | 更新事件 | 验证update:modelValue事件 | 1. 监听事件<br>2. 打开/关闭模态框<br>3. 检查事件触发 | 事件被触发且值正确 | ✅ |
| MD-202 | 关闭事件 | 验证close事件 | 1. 监听事件<br>2. 点击关闭按钮<br>3. 检查事件触发 | close事件被触发 | ✅ |
| MD-203 | 取消事件 | 验证cancel事件 | 1. 监听事件<br>2. 点击取消按钮<br>3. 检查事件触发 | cancel事件被触发 | ✅ |
| MD-204 | 确认事件 | 验证confirm事件 | 1. 监听事件<br>2. 点击确认按钮<br>3. 检查事件触发 | confirm事件被触发 | ✅ |
| MD-205 | 打开后事件 | 验证openAfter事件 | 1. 监听事件<br>2. 打开模态框<br>3. 等待动画结束<br>4. 检查事件触发 | openAfter事件被触发 | ✅ |
| MD-206 | 关闭后事件 | 验证closeAfter事件 | 1. 监听事件<br>2. 关闭模态框<br>3. 等待动画结束<br>4. 检查事件触发 | closeAfter事件被触发 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 打开模态框<br>3. 检查内容是否显示 | 默认插槽内容正确显示 | ✅ |
| MD-302 | 头部插槽 | 验证header插槽 | 1. 设置header插槽内容<br>2. 打开模态框<br>3. 检查头部内容 | 头部插槽内容正确显示 | ✅ |
| MD-303 | 标题插槽 | 验证title插槽 | 1. 设置title插槽内容<br>2. 打开模态框<br>3. 检查标题内容 | 标题插槽内容正确显示 | ✅ |
| MD-304 | 底部插槽 | 验证footer插槽 | 1. 设置footer插槽内容<br>2. 打开模态框<br>3. 检查底部内容 | 底部插槽内容正确显示 | ✅ |
| MD-305 | 触发器插槽 | 验证trigger插槽 | 1. 设置trigger插槽内容<br>2. 与触发器交互<br>3. 检查模态框行为 | 触发器正确触发模态框显示 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-401 | 打开方法 | 验证open方法 | 1. 获取组件实例<br>2. 调用open方法<br>3. 检查模态框是否显示 | 模态框显示 | ✅ |
| MD-402 | 关闭方法 | 验证close方法 | 1. 获取组件实例<br>2. 调用close方法<br>3. 检查模态框是否隐藏 | 模态框隐藏 | ✅ |

### 交互和动画测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-501 | 动画效果 | 验证模态框的过渡动画 | 1. 打开模态框<br>2. 观察过渡动画<br>3. 关闭模态框<br>4. 观察过渡动画 | 有平滑的过渡动画 | ✅ |
| MD-502 | 遮罩点击 | 验证点击遮罩关闭模态框 | 1. 打开模态框<br>2. 点击遮罩<br>3. 检查模态框是否关闭 | 模态框关闭 | ✅ |
| MD-503 | 滚动锁定 | 验证模态框打开时背景滚动锁定 | 1. 打开模态框<br>2. 尝试滚动背景<br>3. 检查背景是否滚动 | 背景滚动被禁用 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MD-601 | 键盘导航 | 验证键盘导航和操作 | 1. 使用Tab键聚焦到触发元素<br>2. 按Enter键打开模态框<br>3. 在模态框内使用Tab键导航<br>4. 按Esc键 | 可以通过键盘操作模态框 | ✅ |
| MD-602 | 焦点管理 | 验证打开模态框时的焦点行为 | 1. 打开模态框<br>2. 检查焦点是否移到模态框内 | 焦点应移动到模态框内 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvButton @click="visible = true">打开模态框</JvButton>
  <JvModal v-model="visible">
    <template #title>提示</template>
    <div style="min-width: 400px; padding: 20px 0;">
      这是一个简单的模态框示例
    </div>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 自定义按钮文本
```vue
<template>
  <JvButton @click="visible = true">打开模态框</JvButton>
  <JvModal 
    v-model="visible" 
    cancelText="不同意" 
    confirmText="同意协议"
  >
    <template #title>用户协议</template>
    <div style="min-width: 400px; padding: 20px 0;">
      <p>请仔细阅读以下协议内容...</p>
    </div>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 禁用遮罩关闭
```vue
<template>
  <JvButton @click="visible = true">打开模态框</JvButton>
  <JvModal 
    v-model="visible" 
    :maskClosable="false"
  >
    <template #title>重要提示</template>
    <div style="min-width: 400px; padding: 20px 0;">
      <p>这个操作很重要，请仔细确认。点击遮罩不会关闭此对话框。</p>
    </div>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 不显示关闭按钮
```vue
<template>
  <JvButton @click="visible = true">打开模态框</JvButton>
  <JvModal 
    v-model="visible" 
    :closeable="false"
  >
    <template #title>重要操作</template>
    <div style="min-width: 400px; padding: 20px 0;">
      <p>此操作必须通过底部按钮确认或取消，不提供右上角关闭按钮。</p>
    </div>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 自定义头部和底部
```vue
<template>
  <JvButton @click="visible = true">打开自定义模态框</JvButton>
  <JvModal v-model="visible">
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 16px; width: 100%;">
        <div style="font-size: 20px; font-weight: bold; color: #1976d2;">自定义头部</div>
        <JvButton variant="text" icon="$close" @click="visible = false" />
      </div>
    </template>
    
    <div style="padding: 20px; min-width: 400px;">
      <p>这是自定义头部和底部的模态框内容</p>
      <p>可以放置任何内容，如表单、图表等</p>
    </div>
    
    <template #footer>
      <div style="display: flex; justify-content: space-between; width: 100%; padding: 0 16px;">
        <JvButton variant="text" @click="visible = false">跳过</JvButton>
        <div>
          <JvButton variant="outlined" style="margin-right: 8px;" @click="visible = false">上一步</JvButton>
          <JvButton variant="primary" @click="visible = false">下一步</JvButton>
        </div>
      </div>
    </template>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 确认对话框
```vue
<template>
  <JvButton @click="visible = true" color-type="error">删除数据</JvButton>
  <JvModal 
    v-model="visible" 
    @confirm="handleConfirm"
    @cancel="handleCancel"
    confirmText="确认删除"
    cancelText="取消操作"
  >
    <template #title>
      <span style="color: #ff5252;">删除确认</span>
    </template>
    <div style="min-width: 400px; padding: 20px 0;">
      <p>您确定要删除这条数据吗？此操作不可逆！</p>
    </div>
  </JvModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

function handleConfirm() {
  // 处理确认删除逻辑
  console.log('数据已删除')
  visible.value = false
}

function handleCancel() {
  console.log('取消删除')
  visible.value = false
}
</script>
```

### 使用组件实例方法
```vue
<template>
  <div>
    <JvButton @click="openModal">使用方法打开模态框</JvButton>
    <JvModal 
      ref="modalRef"
      @open-after="handleOpenAfter"
      @close="handleClose"
    >
      <template #title>通过方法控制</template>
      <div style="min-width: 400px; padding: 20px 0;">
        这个模态框通过组件实例方法控制
      </div>
      <template #footer>
        <JvButton @click="closeModal">关闭模态框</JvButton>
      </template>
    </JvModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalRef = ref(null)

function openModal() {
  modalRef.value.open()
}

function closeModal() {
  modalRef.value.close()
}

function handleOpenAfter() {
  console.log('模态框已完全打开')
}

function handleClose() {
  console.log('模态框关闭')
}
</script>
``` 