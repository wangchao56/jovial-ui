# JvInput 输入框组件

## 1. 组件介绍
`JvInput` 是一个功能完善的输入框组件，提供了多种输入类型、尺寸和变体。它支持前缀/后缀图标、清除按钮、密码可见性切换、字符计数等特性，适用于各种表单输入场景。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 前置区域 (prepend)：位于输入框之前的内容
- 输入框包装器 (wrapper)：包含输入框和其相关元素
  - 前缀区域 (prefix)：位于输入框内部左侧
  - 输入元素 (inner)：实际的输入框
  - 后缀区域 (suffix)：位于输入框内部右侧，包含清除按钮、密码切换按钮、字符计数等
- 后置区域 (append)：位于输入框之后的内容

### 基本使用示例
```vue
<template>
  <!-- 基础输入框 -->
  <JvInput v-model="input" placeholder="请输入内容" />

  <!-- 带图标的输入框 -->
  <JvInput v-model="input" prefix-icon="mdi:account" />

  <!-- 可清除的输入框 -->
  <JvInput v-model="input" clearable />

  <!-- 密码输入框 -->
  <JvInput v-model="password" type="password" show-password />

  <!-- 带字符计数的输入框 -->
  <JvInput v-model="message" show-count max-length="50" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const password = ref('')
const message = ref('')
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 聚焦/失焦：输入框聚焦时边框变色并有轻微阴影效果
- 输入响应：实时响应用户输入并更新绑定值
- 清除功能：启用 clearable 后鼠标悬停在输入框上会显示清除按钮
- 密码切换：启用 showPassword 后可切换密码的明文/密文显示
- 字符计数：启用 showCount 后在输入框右侧显示当前字符数量
- 最大长度限制：设置 maxLength 可限制输入的最大字符数
- 不同状态视觉反馈：默认、聚焦、禁用、只读状态有不同的视觉表现
- 键盘导航：支持标准的键盘操作和导航

特殊交互：
- 清除按钮点击后会自动聚焦输入框
- 禁用状态下不响应任何交互
- 只读状态下可以选择和复制文本，但不能编辑

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 `<input>` 元素作为输入控件
- 支持键盘导航和操作
- 提供 placeholder 属性增强提示信息
- 禁用状态下视觉和功能上都明确表示
- 输入框聚焦状态有明显的视觉提示
- 可通过编程方式聚焦和操作 (focus/blur API)
- 足够的颜色对比度确保可读性

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | string | '' | 绑定值 |
| placeholder | string | '' | 输入框占位文本 |
| disabled | boolean | false | 是否禁用输入框 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | false | 是否可清空 |
| showPassword | boolean | false | 是否显示切换密码图标 |
| type | 'text' \| 'password' \| 'email' | 'text' | 输入框类型 |
| variant | 'outlined' \| 'default' | 'outlined' | 输入框变体样式 |
| size | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 输入框尺寸 |
| prefixIcon | string | '' | 输入框头部图标 |
| suffixIcon | string | '' | 输入框尾部图标 |
| maxLength | number | undefined | 最大输入长度 |
| showCount | boolean | false | 是否显示字符计数 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: string) | 输入值变化时触发 |
| clear | - | 点击清除按钮时触发 |
| focus | (event: FocusEvent) | 输入框获取焦点时触发 |
| blur | (event: FocusEvent) | 输入框失去焦点时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus | - | 使输入框获取焦点 |
| blur | - | 使输入框失去焦点 |
| clear | - | 清空输入框 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| IN-002 | 数据绑定 | 验证 v-model 双向绑定 | 1. 设置初始值<br>2. 在输入框中输入文本 | 绑定的变量值应与输入值同步 | ✅ |
| IN-003 | 占位文本 | 验证占位文本显示 | 1. 设置 placeholder 属性<br>2. 查看输入框 | 正确显示占位文本 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-101 | 禁用状态 | 验证禁用状态效果 | 1. 设置 disabled 属性<br>2. 尝试在输入框中输入 | 1. 输入框显示禁用样式<br>2. 无法输入文本 | ✅ |
| IN-102 | 只读状态 | 验证只读状态效果 | 1. 设置 readonly 属性<br>2. 尝试在输入框中输入 | 1. 输入框显示只读样式<br>2. 无法输入文本但可选择 | ✅ |
| IN-103 | 可清除功能 | 验证清除按钮功能 | 1. 设置 clearable 属性<br>2. 输入文本<br>3. 点击清除按钮 | 1. 输入框中的文本被清除<br>2. 输入框获得焦点 | ✅ |
| IN-104 | 密码可见性 | 验证密码可见性切换 | 1. 设置 type="password" 和 showPassword<br>2. 输入密码<br>3. 点击可见性图标 | 密码在密文和明文之间切换 | ✅ |
| IN-105 | 图标显示 | 验证前缀和后缀图标 | 1. 设置 prefixIcon 和 suffixIcon<br>2. 查看输入框 | 正确显示前缀和后缀图标 | ✅ |
| IN-106 | 字符计数 | 验证字符计数功能 | 1. 设置 showCount 属性<br>2. 输入文本 | 显示正确的字符数量 | ✅ |
| IN-107 | 最大长度 | 验证最大长度限制 | 1. 设置 maxLength 属性<br>2. 尝试输入超过限制的文本 | 1. 输入被限制在最大长度内<br>2. 字符计数显示当前/最大值 | ✅ |
| IN-108 | 不同尺寸 | 验证不同尺寸效果 | 1. 设置不同的 size 属性<br>2. 查看输入框尺寸 | 输入框尺寸与设置匹配 | ✅ |
| IN-109 | 不同变体 | 验证不同变体效果 | 1. 设置不同的 variant 属性<br>2. 查看输入框样式 | 输入框样式与变体匹配 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-201 | 更新事件 | 验证 update:modelValue 事件 | 1. 监听事件<br>2. 在输入框中输入 | 事件被触发且值正确 | ✅ |
| IN-202 | 清除事件 | 验证 clear 事件 | 1. 监听事件<br>2. 点击清除按钮 | 事件被触发 | ✅ |
| IN-203 | 聚焦事件 | 验证 focus 事件 | 1. 监听事件<br>2. 点击输入框 | 事件被触发且事件对象正确 | ✅ |
| IN-204 | 失焦事件 | 验证 blur 事件 | 1. 监听事件<br>2. 聚焦后点击其他位置 | 事件被触发且事件对象正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-301 | 前置插槽 | 验证 prepend 插槽 | 1. 设置 prepend 插槽内容<br>2. 查看渲染结果 | 正确显示前置内容 | ✅ |
| IN-302 | 后置插槽 | 验证 append 插槽 | 1. 设置 append 插槽内容<br>2. 查看渲染结果 | 正确显示后置内容 | ✅ |
| IN-303 | 前缀插槽 | 验证 prefix 插槽 | 1. 设置 prefix 插槽内容<br>2. 查看渲染结果 | 正确显示前缀内容 | ✅ |
| IN-304 | 后缀插槽 | 验证 suffix 插槽 | 1. 设置 suffix 插槽内容<br>2. 查看渲染结果 | 正确显示后缀内容 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-401 | focus 方法 | 验证 focus 方法 | 1. 调用 focus 方法<br>2. 检查焦点状态 | 输入框获得焦点 | ✅ |
| IN-402 | blur 方法 | 验证 blur 方法 | 1. 调用 blur 方法<br>2. 检查焦点状态 | 输入框失去焦点 | ✅ |
| IN-403 | clear 方法 | 验证 clear 方法 | 1. 输入文本<br>2. 调用 clear 方法 | 输入框内容被清除 | ✅ |

### 样式测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-501 | 聚焦样式 | 验证聚焦状态样式 | 1. 点击输入框获取焦点<br>2. 检查样式变化 | 输入框显示正确的聚焦样式 | ✅ |
| IN-502 | 悬停样式 | 验证鼠标悬停样式 | 1. 将鼠标悬停在输入框上<br>2. 检查样式变化 | 正确显示悬停样式效果 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| IN-601 | 键盘导航 | 验证键盘导航功能 | 1. 使用 Tab 键聚焦<br>2. 输入文本 | 可以通过键盘聚焦和输入 | ✅ |
| IN-602 | 屏幕阅读器 | 验证屏幕阅读器支持 | 1. 使用屏幕阅读器<br>2. 访问输入框 | 屏幕阅读器能正确识别和操作输入框 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvInput v-model="input" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```

### 带图标的输入框
```vue
<template>
  <JvInput v-model="input" prefix-icon="$search" placeholder="搜索..." />
</template>
```

### 可清除和密码输入框
```vue
<template>
  <JvInput v-model="input" clearable placeholder="可清除输入框" />
  <JvInput v-model="password" type="password" show-password placeholder="请输入密码" />
</template>
```

### 不同尺寸
```vue
<template>
  <JvInput v-model="input" size="small" placeholder="小尺寸" />
  <JvInput v-model="input" placeholder="默认尺寸" />
  <JvInput v-model="input" size="large" placeholder="大尺寸" />
  <JvInput v-model="input" size="xlarge" placeholder="超大尺寸" />
</template>
```

### 字符计数和最大长度
```vue
<template>
  <JvInput v-model="message" show-count :max-length="100" placeholder="最多输入100个字符" />
</template>
```
