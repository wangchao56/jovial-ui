# JvTextarea 文本域组件

## 组件介绍

JvTextarea 是一个功能丰富的文本域组件，用于收集和处理用户的多行文本输入。它提供了多种特性，包括自动调整高度、字符计数限制、清除按钮等，并支持丰富的样式定制选项，适用于各种表单场景和复杂的用户输入需求。组件采用BEM命名规范，确保样式隔离和可维护性。

## 布局结构使用方式

JvTextarea 组件的布局结构主要由以下几个部分组成：

1. **外层容器**：提供整体布局和样式控制
2. **前置元素区域**（prepend slot）：位于文本域上方的内容区域，适合放置标题、提示信息等
3. **文本域主体区域**：包含以下元素
   - **前缀元素**（prefix slot）：位于文本域内部左侧，可放置图标或短文本
   - **文本输入区域**：用户输入的文本内容主体
   - **后缀元素区域**：包含清除按钮、字符计数和自定义后缀（suffix slot）
4. **后置元素区域**（append slot）：位于文本域下方的内容区域，适合放置辅助信息、操作按钮等

基本使用示例：

```vue
<template>
  <JvTextarea 
    v-model="textValue" 
    placeholder="请输入内容" 
    :rows="4"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const textValue = ref('')
</script>
```

## 交互设计

JvTextarea 组件提供了丰富的交互特性，以增强用户体验：

1. **响应式状态变化**：组件会根据用户交互显示不同的状态样式
   - 默认状态：普通边框和背景
   - 聚焦状态：突出显示边框，提供视觉反馈
   - 禁用状态：降低透明度，表明不可交互
   - 只读状态：特殊样式，表明可查看但不可编辑

2. **自动调整高度**：当设置 `autosize` 属性时，文本域会随着内容的增减自动调整高度
   - 可设置最小和最大行数限制
   - 确保界面布局稳定性

3. **清除功能**：启用 `clearable` 属性后，当输入内容时会显示清除按钮
   - 点击清除按钮后自动聚焦回文本域
   - 触发 clear 事件，便于执行额外操作

4. **字符计数**：启用 `showCount` 属性可显示已输入字符数量
   - 结合 `maxLength` 可显示"已用/总可用"字符数
   - 超出限制时可提供视觉反馈

5. **大小调整控制**：通过 `resize` 属性精确控制用户是否可以手动调整文本域大小及其方向
   - 支持垂直、水平、双向和禁止调整四种模式

## 可访问性

JvTextarea 组件在设计时充分考虑了可访问性（A11Y）要求：

1. **语义化结构**：使用原生 `<textarea>` 元素作为核心，确保键盘导航和屏幕阅读器的完全兼容性
2. **状态清晰**：支持 `disabled` 和 `readonly` 状态，通过视觉和属性明确表示组件的交互状态
3. **视觉反馈**：当禁用或只读时，通过样式变化提供清晰的视觉反馈，帮助用户理解当前状态
4. **表单集成**：支持标准的表单属性和事件，与表单验证系统无缝集成
5. **色彩对比**：使用合适的颜色对比度，确保内容在各种环境下清晰可见
6. **键盘操作**：完全支持键盘操作，包括Tab切换焦点、Esc清除内容等
7. **聚焦状态**：提供明确的聚焦视觉提示，帮助用户理解当前交互元素

## Vue 组件 API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | string | '' |
| placeholder | 占位符文本 | string | '' |
| disabled | 是否禁用 | boolean | false |
| readonly | 是否只读 | boolean | false |
| clearable | 是否可清空 | boolean | false |
| variant | 变体风格 | 'outlined' \| 'default' | 'outlined' |
| size | 文本域大小 | 'small' \| 'medium' \| 'large' \| 'xlarge' | 'medium' |
| autosize | 是否自动调整高度 | boolean \| { minRows?: number, maxRows?: number } | false |
| maxLength | 最大输入长度 | number | - |
| showCount | 是否显示计数 | boolean | false |
| rows | 文本域行数 | number | 3 |
| minRows | 最小行数（与 autosize 对象一起使用时） | number | - |
| maxRows | 最大行数（与 autosize 对象一起使用时） | number | - |
| resize | 调整大小方式 | 'none' \| 'both' \| 'horizontal' \| 'vertical' | 'vertical' |

### Emits

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 输入值改变时触发 | (value: string) |
| clear | 点击清除按钮时触发 | - |
| focus | 获取焦点时触发 | (event: FocusEvent) |
| blur | 失去焦点时触发 | (event: FocusEvent) |
| input | 输入时触发 | (value: string) |
| change | 值改变且失去焦点时触发 | (value: string) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prepend | 前置内容插槽，位于文本域上方 |
| append | 后置内容插槽，位于文本域下方 |
| prefix | 前缀插槽，位于文本域内左侧 |
| suffix | 后缀插槽，位于文本域内右下角 |

### Expose

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使文本域获取焦点 | - |
| blur | 使文本域失去焦点 | - |
| clear | 清空文本域内容 | - |

## 测试用例

下面是 JvTextarea 组件的全面测试覆盖范围：

| 测试类型 | 测试描述 | 测试方法 | 预期结果 |
| --- | --- | --- | --- |
| **基础功能测试** | 组件渲染测试 | 创建组件实例并验证DOM结构 | 组件能够正确渲染且包含所有必要元素 |
| | v-model双向绑定测试 | 更新modelValue并检查文本域内容；通过用户输入更新值 | 组件能正确响应v-model的双向绑定 |
| | 初始值显示测试 | 设置初始modelValue并渲染组件 | 文本域正确显示传入的初始值 |
| **Props功能测试** | placeholder属性测试 | 设置placeholder属性并检查DOM | 占位符文本正确显示 |
| | disabled属性测试 | 设置disabled=true并尝试交互 | 组件被禁用且样式显示为禁用状态，无法输入 |
| | readonly属性测试 | 设置readonly=true并尝试交互 | 组件为只读状态，可以选择文本但不能修改 |
| | size属性测试 | 分别设置不同size值并检查样式 | 尺寸变化符合预期，对应样式类被正确应用 |
| | variant属性测试 | 设置不同variant值并检查样式 | 变体样式正确应用，视觉呈现符合预期 |
| | clearable属性测试 | 设置clearable=true并输入内容 | 显示清除按钮，点击可清除内容 |
| | showCount属性测试 | 设置showCount=true并输入内容 | 字符计数正确显示，位置和样式符合设计 |
| | maxLength属性测试 | 设置maxLength并尝试超出输入 | 输入被限制在指定字符数内，计数显示正确 |
| | autosize属性测试 | 设置autosize并输入多行内容 | 文本域高度自动调整，符合内容量变化 |
| | resize属性测试 | 测试四种resize值的效果 | 调整大小行为符合设置，四种模式下表现正确 |
| **Emits事件测试** | update:modelValue事件测试 | 输入内容并捕获事件 | 输入值变化时正确触发事件并传递新值 |
| | clear事件测试 | 点击清除按钮并监听事件 | 清除时触发clear事件 |
| | focus事件测试 | 使组件获取焦点并监听事件 | 获取焦点时触发focus事件并传递事件对象 |
| | blur事件测试 | 使组件失去焦点并监听事件 | 失去焦点时触发blur事件并传递事件对象 |
| | input事件测试 | 输入内容并监听事件 | 输入时触发input事件并传递当前值 |
| | change事件测试 | 改变值并失去焦点，监听事件 | 值改变并失去焦点时触发change事件 |
| | 边缘情况事件测试 | 测试特殊输入情况(如粘贴大量文本) | 在各种情况下事件触发行为一致 |
| **Slots插槽测试** | prepend/append插槽测试 | 提供插槽内容并渲染 | 插槽内容正确显示在预期位置，样式正确 |
| | prefix/suffix插槽测试 | 提供前缀和后缀插槽内容 | 插槽内容正确显示，不影响主体功能 |
| | 插槽响应式更新测试 | 动态改变插槽内容 | 插槽内容能够响应式更新，不需要重新渲染组件 |
| **Expose API测试** | focus()方法测试 | 调用expose的focus方法 | 文本域成功获取焦点 |
| | blur()方法测试 | 调用expose的blur方法 | 文本域成功失去焦点 |
| | clear()方法测试 | 调用expose的clear方法 | 文本域内容被清空，组件状态正确更新 |
| | 不同状态下API测试 | 在禁用/只读状态下测试API | 方法行为在各种状态下保持一致性 |
| **样式测试** | 状态样式测试 | 测试各种交互状态下的样式变化 | 默认、聚焦、禁用、只读状态下样式符合设计 |
| | 尺寸样式测试 | 检查不同尺寸的样式实现 | 文本大小、内边距等随尺寸变化正确调整 |
| | 变体样式测试 | 测试不同变体的样式差异 | 各变体样式符合设计规范，视觉表现一致 |
| | 自适应测试 | 在不同容器宽度下测试组件 | 组件能自适应不同宽度的容器 |
| | 组合状态测试 | 测试多种状态组合的样式表现 | 各种状态组合下样式表现始终一致 |
| **可访问性测试** | 键盘操作测试 | 使用键盘测试组件操作 | 支持Tab焦点切换和所有键盘操作 |
| | 禁用状态可访问性 | 检查禁用状态下的ARIA属性 | 禁用状态正确传达，屏幕阅读器能识别 |
| | 表单集成测试 | 将组件集成到表单中测试 | 支持表单提交和验证，与表单元素协同工作 |
| | 屏幕阅读器测试 | 使用屏幕阅读器测试组件 | 屏幕阅读器能正确解读组件内容和状态 |
| | 高对比度模式测试 | 在高对比度模式下测试组件 | 在高对比度模式下组件仍然可用，文本清晰 |

## 使用示例

### 基础用法

```vue
<template>
  <JvTextarea v-model="text" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text = ref('')
</script>
```

### 不同尺寸

```vue
<template>
  <div class="textarea-size-demo">
    <JvTextarea v-model="text" size="small" placeholder="小尺寸" />
    <JvTextarea v-model="text" size="medium" placeholder="中等尺寸" />
    <JvTextarea v-model="text" size="large" placeholder="大尺寸" />
    <JvTextarea v-model="text" size="xlarge" placeholder="超大尺寸" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text = ref('')
</script>

<style>
.textarea-size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 禁用和只读状态

```vue
<template>
  <div class="textarea-state-demo">
    <JvTextarea value="禁用状态的文本域" disabled />
    <JvTextarea value="只读状态的文本域" readonly />
  </div>
</template>

<script setup>
import { JvTextarea } from 'jovial-ui'
</script>

<style>
.textarea-state-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 可清除内容

```vue
<template>
  <JvTextarea v-model="text" clearable placeholder="输入内容后可清除" />
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text = ref('这是一段可清除的文本')
</script>
```

### 字符计数

```vue
<template>
  <div class="textarea-count-demo">
    <JvTextarea v-model="text1" showCount placeholder="显示字符计数" />
    <JvTextarea v-model="text2" maxLength="100" showCount placeholder="最大输入100个字符" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text1 = ref('')
const text2 = ref('')
</script>

<style>
.textarea-count-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 自动调整高度

```vue
<template>
  <div class="textarea-autosize-demo">
    <JvTextarea v-model="text1" autosize placeholder="自动调整高度" />
    <JvTextarea 
      v-model="text2" 
      :autosize="{ minRows: 2, maxRows: 6 }" 
      placeholder="限制最小2行，最大6行" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text1 = ref('')
const text2 = ref('')
</script>

<style>
.textarea-autosize-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 调整大小方式

```vue
<template>
  <div class="textarea-resize-demo">
    <JvTextarea placeholder="垂直调整大小 (默认)" resize="vertical" />
    <JvTextarea placeholder="水平调整大小" resize="horizontal" />
    <JvTextarea placeholder="双向调整大小" resize="both" />
    <JvTextarea placeholder="不可调整大小" resize="none" />
  </div>
</template>

<script setup>
import { JvTextarea } from 'jovial-ui'
</script>

<style>
.textarea-resize-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 使用插槽

```vue
<template>
  <JvTextarea v-model="text" placeholder="带前缀和后缀插槽">
    <template #prepend>
      <div class="textarea-header">标题</div>
    </template>
    <template #prefix>
      <div class="textarea-prefix">备注:</div>
    </template>
    <template #suffix>
      <div class="textarea-suffix">
        <span class="icon">📝</span>
      </div>
    </template>
    <template #append>
      <div class="textarea-footer">底部说明文本</div>
    </template>
  </JvTextarea>
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const text = ref('')
</script>

<style>
.textarea-header, .textarea-footer {
  padding: 8px;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
}
.textarea-header {
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.textarea-footer {
  border-top: none;
  border-radius: 0 0 4px 4px;
}
.textarea-prefix {
  padding-right: 8px;
}
.textarea-suffix {
  display: flex;
  align-items: center;
}
</style>
```

### 表单验证集成

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-item">
      <label>反馈意见</label>
      <JvTextarea 
        v-model="feedback" 
        placeholder="请输入您的反馈意见" 
        :maxLength="200" 
        showCount 
        required
      />
    </div>
    <button type="submit">提交</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { JvTextarea } from 'jovial-ui'

const feedback = ref('')

const submitForm = () => {
  alert(`提交的反馈意见: ${feedback.value}`)
}
</script>

<style>
.form-item {
  margin-bottom: 16px;
}
.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
</style>
``` 