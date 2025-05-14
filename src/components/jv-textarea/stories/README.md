# JvTextarea 文本域组件

## 1. 组件介绍
`JvTextarea` 是一个功能丰富的多行文本输入组件，提供了多种尺寸、状态和交互方式。它支持自动调整高度、字符计数、可清空等功能，可用于表单输入、评论框、反馈意见等多行文本输入场景。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 文本输入区域：多行文本的主要输入区域
- 前置内容区域 (prepend)：放置在文本域前的内容
- 后置内容区域 (append)：放置在文本域后的内容
- 前缀区域 (prefix)：文本域内部头部的内容
- 后缀区域 (suffix)：文本域内部尾部的内容，常用于放置清除按钮和字数统计

### 基本使用示例
```vue
<template>
  <!-- 基础文本域 -->
  <JvTextarea v-model="value" placeholder="请输入内容" />
  
  <!-- 不同尺寸 -->
  <JvTextarea v-model="value" size="small" placeholder="小尺寸" />
  <JvTextarea v-model="value" placeholder="默认尺寸" />
  <JvTextarea v-model="value" size="large" placeholder="大尺寸" />
  
  <!-- 不同状态 -->
  <JvTextarea v-model="value" disabled placeholder="禁用状态" />
  <JvTextarea v-model="value" readonly placeholder="只读状态" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 输入交互：支持键盘输入和粘贴操作
- 焦点状态：获取/失去焦点时有视觉反馈
- 禁用和只读状态：分别表示不可操作和不可编辑但可查看
- 清除功能：当设置 clearable 为 true 时，在有内容情况下显示清除按钮
- 字符计数：当设置 showCount 为 true 时，显示已输入/最大可输入字符数量

特殊交互：
- 自动调整高度：当设置 autosize 为 true 时，随着内容增减自动调整高度
- 大小调整：通过 resize 属性控制文本域的调整方向
- 字符限制：通过 maxLength 属性限制最大输入字符数

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 `<textarea>` 元素作为底层实现
- 支持键盘导航和操作
- 禁用状态下提供明确的视觉反馈
- 支持屏幕阅读器辅助阅读
- 提供足够的颜色对比度确保可读性
- 支持通过编程方式获取焦点

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | string | '' | 绑定值 |
| placeholder | string | '' | 占位文本 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | false | 是否可清空 |
| variant | 'outlined' \| 'default' | 'outlined' | 变体风格 |
| size | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' | 文本域尺寸 |
| autosize | boolean \| { minRows?: number, maxRows?: number } | false | 是否自动调整高度 |
| maxLength | number | - | 最大输入长度 |
| showCount | boolean | false | 是否显示计数 |
| rows | number | 3 | 行数 |
| minRows | number | - | 最小行数（autosize 为 true 时生效） |
| maxRows | number | - | 最大行数（autosize 为 true 时生效） |
| resize | 'none' \| 'both' \| 'horizontal' \| 'vertical' | 'vertical' | 调整大小方式 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: string) | 在输入值变化时触发 |
| input | (value: string) | 在输入时触发 |
| change | (value: string) | 在值改变时触发 |
| focus | (event: FocusEvent) | 在获得焦点时触发 |
| blur | (event: FocusEvent) | 在失去焦点时触发 |
| clear | - | 在点击清除按钮时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽 |
| prepend | 前置内容插槽 |
| append | 后置内容插槽 |
| prefix | 输入框头部内容插槽 |
| suffix | 输入框尾部内容插槽 |

### Expose
| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使文本域获得焦点 | - |
| blur | 使文本域失去焦点 | - |
| clear | 清空文本域内容 | - |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TA-001 | 基本渲染 | 验证文本域能够正确渲染 | 1. 挂载JvTextarea组件<br>2. 检查DOM结构 | 组件应正确渲染为textarea元素并包含jv-textarea类名 | ✅ |
| TA-002 | 值绑定 | 验证v-model双向绑定 | 1. 挂载设置modelValue的JvTextarea<br>2. 修改文本域内容<br>3. 检查绑定值变化 | 输入内容应正确更新modelValue | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TA-101 | 尺寸设置 | 验证不同size属性的效果 | 1. 分别挂载不同size的JvTextarea<br>2. 检查不同size的样式 | 不同尺寸的文本域应有对应的样式类 | ✅ |
| TA-102 | 禁用状态 | 验证禁用状态的文本域 | 1. 挂载disabled=true的JvTextarea<br>2. 尝试输入内容<br>3. 检查样式和行为 | 文本域应显示禁用样式且无法输入 | ✅ |
| TA-103 | 只读状态 | 验证只读状态的文本域 | 1. 挂载readonly=true的JvTextarea<br>2. 尝试输入内容<br>3. 检查样式和行为 | 文本域应显示只读样式且无法修改内容 | ✅ |
| TA-104 | 可清空 | 验证可清空功能 | 1. 挂载clearable=true且有内容的JvTextarea<br>2. 点击清除按钮<br>3. 检查内容变化 | 内容应被清空，触发clear事件 | ✅ |
| TA-105 | 字符计数 | 验证字符计数显示 | 1. 挂载showCount=true的JvTextarea<br>2. 输入内容<br>3. 检查字数显示 | 应显示当前输入的字符数量 | ✅ |
| TA-106 | 最大长度 | 验证maxLength限制 | 1. 挂载设置maxLength的JvTextarea<br>2. 尝试输入超过限制的内容<br>3. 检查内容长度 | 内容长度应被限制在maxLength以内 | ✅ |
| TA-107 | 自动调整高度 | 验证autosize功能 | 1. 挂载autosize=true的JvTextarea<br>2. 输入多行内容<br>3. 检查高度变化 | 文本域高度应随内容增加而自动增加 | ✅ |
| TA-108 | 最小/最大行数 | 验证行数限制 | 1. 挂载设置minRows和maxRows的JvTextarea<br>2. 输入不同行数的内容<br>3. 检查高度变化 | 文本域高度应在min和max行数范围内变化 | ✅ |
| TA-109 | 调整大小 | 验证resize属性效果 | 1. 分别挂载不同resize值的JvTextarea<br>2. 检查可调整方向 | 文本域应按指定方向可调整大小 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TA-201 | 输入事件 | 验证input事件触发 | 1. 挂载JvTextarea组件<br>2. 输入内容<br>3. 检查事件触发 | 输入时应触发input事件和update:modelValue事件 | ✅ |
| TA-202 | 变化事件 | 验证change事件触发 | 1. 挂载JvTextarea组件<br>2. 输入内容并触发blur<br>3. 检查事件触发 | 内容变化并失焦时应触发change事件 | ✅ |
| TA-203 | 焦点事件 | 验证focus和blur事件 | 1. 挂载JvTextarea组件<br>2. 触发focus和blur<br>3. 检查事件触发 | 应分别触发focus和blur事件 | ✅ |
| TA-204 | 清除事件 | 验证clear事件触发 | 1. 挂载clearable=true的JvTextarea<br>2. 点击清除按钮<br>3. 检查事件触发 | 应触发clear事件和update:modelValue事件 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TA-301 | 前置插槽 | 验证prepend插槽内容 | 1. 挂载JvTextarea并设置prepend插槽内容<br>2. 检查内容渲染 | prepend插槽内容应正确显示 | ✅ |
| TA-302 | 后置插槽 | 验证append插槽内容 | 1. 挂载JvTextarea并设置append插槽内容<br>2. 检查内容渲染 | append插槽内容应正确显示 | ✅ |
| TA-303 | 前缀插槽 | 验证prefix插槽内容 | 1. 挂载JvTextarea并设置prefix插槽内容<br>2. 检查内容渲染 | prefix插槽内容应正确显示在文本域内部前部 | ✅ |
| TA-304 | 后缀插槽 | 验证suffix插槽内容 | 1. 挂载JvTextarea并设置suffix插槽内容<br>2. 检查内容渲染 | suffix插槽内容应正确显示在文本域内部尾部 | ✅ |

### 暴露方法测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TA-401 | 焦点方法 | 验证focus和blur方法 | 1. 挂载JvTextarea组件<br>2. 调用focus和blur方法<br>3. 检查焦点状态 | 文本域应分别获得和失去焦点 | ✅ |
| TA-402 | 清空方法 | 验证clear方法 | 1. 挂载有内容的JvTextarea<br>2. 调用clear方法<br>3. 检查内容变化 | 文本域内容应被清空 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvTextarea v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 不同尺寸
```vue
<template>
  <JvTextarea v-model="value" size="small" placeholder="小尺寸" />
  <JvTextarea v-model="value" size="medium" placeholder="中等尺寸（默认）" />
  <JvTextarea v-model="value" size="large" placeholder="大尺寸" />
  <JvTextarea v-model="value" size="xlarge" placeholder="超大尺寸" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 禁用和只读
```vue
<template>
  <JvTextarea value="禁用状态的文本域" disabled />
  <JvTextarea value="只读状态的文本域" readonly />
</template>
```

### 可清除
```vue
<template>
  <JvTextarea v-model="value" clearable placeholder="可清除的文本域" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('这是一段可清除的文本')
</script>
```

### 字符计数
```vue
<template>
  <JvTextarea v-model="value" showCount placeholder="显示字符计数" />
  <JvTextarea v-model="value" :maxLength="100" showCount placeholder="最大输入100个字符" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 自动调整高度
```vue
<template>
  <JvTextarea v-model="value" autosize placeholder="自动调整高度" />
  <JvTextarea 
    v-model="value" 
    :autosize="{ minRows: 2, maxRows: 6 }" 
    placeholder="限制最小2行，最大6行" 
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 调整大小
```vue
<template>
  <JvTextarea placeholder="垂直调整大小（默认）" resize="vertical" />
  <JvTextarea placeholder="水平调整大小" resize="horizontal" />
  <JvTextarea placeholder="双向调整大小" resize="both" />
  <JvTextarea placeholder="不可调整大小" resize="none" />
</template>
```

### 不同变体风格
```vue
<template>
  <JvTextarea v-model="value" variant="outlined" placeholder="描边风格（默认）" />
  <JvTextarea v-model="value" variant="default" placeholder="默认风格" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 插槽使用
```vue
<template>
  <JvTextarea v-model="value" placeholder="带前缀和后缀的文本域">
    <template #prefix>
      <JvIcon name="$edit" />
    </template>
    <template #suffix>
      <div class="character-count">{{ value.length }}/100</div>
    </template>
  </JvTextarea>
  
  <JvTextarea v-model="value" placeholder="带前置和后置内容的文本域">
    <template #prepend>
      <div class="label">评论：</div>
    </template>
    <template #append>
      <JvButton size="small">提交</JvButton>
    </template>
  </JvTextarea>
</template>

<script setup>
import { ref } from 'vue'
import { JvIcon, JvButton } from 'jovial-ui'

const value = ref('')
</script>

<style scoped>
.character-count {
  font-size: 12px;
  color: #888;
}
.label {
  padding-right: 10px;
}
</style>
``` 