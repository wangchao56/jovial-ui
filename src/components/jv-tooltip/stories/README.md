# JvTooltip 文字提示组件

## 1. 组件介绍
`JvTooltip` 是一个用于显示简短信息提示的悬浮组件，当用户将鼠标悬停、聚焦或点击元素时显示。它通常用于解释按钮功能、提供额外信息或显示元素的完整内容（当显示空间有限时）。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 触发元素：用户交互的目标元素
- 提示内容：显示的文本或自定义内容
- 箭头指示器（可选）：指向触发元素的小箭头

### 基本使用示例
```vue
<template>
  <!-- 基础提示 -->
  <JvTooltip text="这是一个提示">
    <JvButton>悬停查看提示</JvButton>
  </JvTooltip>
  
  <!-- 不同位置 -->
  <JvTooltip text="顶部提示" placement="top">
    <JvButton>顶部</JvButton>
  </JvTooltip>
  
  <!-- 自定义内容 -->
  <JvTooltip>
    <template #activator="{ props }">
      <JvButton v-bind="props">自定义内容</JvButton>
    </template>
    <template #default>
      <div>
        <h4>自定义提示</h4>
        <p>这里可以放置更丰富的内容</p>
      </div>
    </template>
  </JvTooltip>
</template>
```

## 3. 交互设计
组件提供以下交互效果：
- 悬停触发：默认通过鼠标悬停在目标元素上触发提示显示
- 聚焦触发：通过键盘导航聚焦到目标元素时显示
- 点击触发：通过点击目标元素触发提示显示
- 延迟显示/隐藏：可设置显示和隐藏的延迟时间，避免频繁闪烁
- 平滑过渡：提示的显示和隐藏有平滑的过渡动画

特殊交互：
- 自动定位：根据视口边界自动调整提示位置，避免被裁剪
- 边界检测：超出视口边界时自动翻转到对面位置
- 跟随滚动：页面滚动时提示保持与触发元素的相对位置
- 嵌套提示：支持在提示内部嵌套其他提示

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用 `role="tooltip"` 角色标识提示内容
- 通过 `aria-describedby` 关联触发元素和提示内容
- 支持键盘触发（通过Tab键导航并自动显示）
- 适当的显示延迟避免对屏幕阅读器用户造成干扰
- 提供足够的颜色对比度确保内容可读性
- 提示内容通常是非交互式的，仅用于辅助说明

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | string | '' | 提示文本内容 |
| placement | 'top' \| 'right' \| 'bottom' \| 'left' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end' | 'bottom' | 提示出现的位置 |
| color | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | 提示颜色 |
| arrow | boolean | true | 是否显示箭头 |
| maxWidth | string \| number | 300 | 提示框最大宽度 |
| openDelay | number | 300 | 显示延迟时间(毫秒) |
| closeDelay | number | 200 | 隐藏延迟时间(毫秒) |
| disabled | boolean | false | 是否禁用提示 |
| offset | number | 8 | 提示距离触发元素的偏移量 |
| strategy | 'absolute' \| 'fixed' | 'absolute' | 定位策略 |
| zIndex | number | 1000 | z-index层级 |
| triggers | Array<'hover' \| 'focus' \| 'click'> | ['hover', 'focus'] | 触发方式 |
| contentClass | string | undefined | 提示内容自定义类名 |
| modelValue | boolean | undefined | 控制提示显示状态，支持v-model |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: boolean) | 提示显示状态变化时触发 |
| show | - | 提示显示时触发 |
| hide | - | 提示隐藏时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 提示内容，如果提供则覆盖text属性 |
| activator | 触发元素，提供props参数以绑定必要的事件 |

### Expose
| 方法名 | 参数 | 说明 |
|--------|------|------|
| show | - | 显示提示 |
| hide | - | 隐藏提示 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| TP-002 | 提示显示 | 验证悬停时提示是否显示 | 1. 悬停在触发元素上<br>2. 检查提示是否显示 | 提示内容应显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-101 | 文本内容 | 验证text属性设置文本 | 1. 设置text属性<br>2. 触发提示显示<br>3. 检查提示内容 | 提示显示设置的文本 | ✅ |
| TP-102 | 位置设置 | 验证不同placement属性 | 1. 设置不同的placement属性<br>2. 触发提示显示<br>3. 检查提示位置 | 提示位置符合设置 | ✅ |
| TP-103 | 颜色设置 | 验证不同color属性 | 1. 设置不同的color属性<br>2. 触发提示显示<br>3. 检查提示颜色 | 提示颜色符合设置 | ✅ |
| TP-104 | 箭头显示 | 验证arrow属性 | 1. 设置arrow=false<br>2. 触发提示显示<br>3. 检查箭头是否显示 | 箭头显示符合设置 | ✅ |
| TP-105 | 最大宽度 | 验证maxWidth属性 | 1. 设置maxWidth属性<br>2. 触发提示显示<br>3. 检查提示宽度 | 提示宽度不超过设置值 | ✅ |
| TP-106 | 显示延迟 | 验证openDelay属性 | 1. 设置openDelay属性<br>2. 悬停在触发元素上<br>3. 测量显示延迟 | 延迟时间符合设置 | ✅ |
| TP-107 | 隐藏延迟 | 验证closeDelay属性 | 1. 设置closeDelay属性<br>2. 移开触发元素<br>3. 测量隐藏延迟 | 延迟时间符合设置 | ✅ |
| TP-108 | 禁用状态 | 验证disabled属性 | 1. 设置disabled=true<br>2. 尝试触发提示<br>3. 检查提示是否显示 | 提示不应显示 | ✅ |
| TP-109 | 偏移设置 | 验证offset属性 | 1. 设置offset属性<br>2. 触发提示显示<br>3. 检查提示与触发元素的距离 | 偏移距离符合设置 | ✅ |
| TP-110 | 触发方式 | 验证不同triggers设置 | 1. 设置不同的triggers<br>2. 尝试不同的触发方式<br>3. 检查提示是否显示 | 提示仅以设置的方式触发 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-201 | 更新事件 | 验证update:modelValue事件 | 1. 监听事件<br>2. 触发提示显示/隐藏<br>3. 检查事件触发 | 事件被触发且值正确 | ✅ |
| TP-202 | 显示事件 | 验证show事件 | 1. 监听事件<br>2. 触发提示显示<br>3. 检查事件触发 | show事件被触发 | ✅ |
| TP-203 | 隐藏事件 | 验证hide事件 | 1. 监听事件<br>2. 触发提示隐藏<br>3. 检查事件触发 | hide事件被触发 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-301 | 默认插槽 | 验证默认插槽内容 | 1. 设置默认插槽内容<br>2. 触发提示显示<br>3. 检查提示内容 | 显示自定义内容 | ✅ |
| TP-302 | 触发器插槽 | 验证activator插槽 | 1. 设置activator插槽<br>2. 与插槽内容交互<br>3. 检查提示行为 | 提示正常触发和显示 | ✅ |

### Expose API 测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-401 | 显示方法 | 验证show方法 | 1. 获取组件实例<br>2. 调用show方法<br>3. 检查提示是否显示 | 提示显示 | ✅ |
| TP-402 | 隐藏方法 | 验证hide方法 | 1. 获取组件实例<br>2. 调用hide方法<br>3. 检查提示是否隐藏 | 提示隐藏 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TP-501 | ARIA属性 | 验证ARIA属性设置 | 1. 检查触发元素和提示的ARIA属性<br>2. 验证关联关系 | 具有正确的ARIA角色和属性 | ✅ |
| TP-502 | 键盘触发 | 验证键盘可触发性 | 1. 使用Tab键聚焦到触发元素<br>2. 检查提示是否显示 | 提示应正常显示 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvTooltip text="这是一个简单的提示">
    <JvButton>悬停查看</JvButton>
  </JvTooltip>
</template>
```

### 不同位置
```vue
<template>
  <JvTooltip text="顶部提示" placement="top">
    <JvButton>顶部</JvButton>
  </JvTooltip>
  
  <JvTooltip text="右侧提示" placement="right">
    <JvButton>右侧</JvButton>
  </JvTooltip>
  
  <JvTooltip text="底部提示" placement="bottom">
    <JvButton>底部</JvButton>
  </JvTooltip>
  
  <JvTooltip text="左侧提示" placement="left">
    <JvButton>左侧</JvButton>
  </JvTooltip>
</template>
```

### 不同颜色
```vue
<template>
  <JvTooltip text="默认提示" color="default">
    <JvButton>默认</JvButton>
  </JvTooltip>
  
  <JvTooltip text="主要提示" color="primary">
    <JvButton>主要</JvButton>
  </JvTooltip>
  
  <JvTooltip text="成功提示" color="success">
    <JvButton>成功</JvButton>
  </JvTooltip>
  
  <JvTooltip text="警告提示" color="warning">
    <JvButton>警告</JvButton>
  </JvTooltip>
  
  <JvTooltip text="错误提示" color="error">
    <JvButton>错误</JvButton>
  </JvTooltip>
</template>
```

### 自定义内容
```vue
<template>
  <JvTooltip>
    <template #activator="{ props }">
      <JvButton v-bind="props">自定义内容</JvButton>
    </template>
    <template #default>
      <div class="custom-tooltip">
        <h3>自定义提示</h3>
        <p>这里可以放置更复杂的内容</p>
        <JvButton size="small">甚至可以包含按钮</JvButton>
      </div>
    </template>
  </JvTooltip>
</template>

<style scoped>
.custom-tooltip {
  padding: 8px;
  text-align: center;
}
</style>
```

### 不同触发方式
```vue
<template>
  <JvTooltip text="悬停和聚焦触发" :triggers="['hover', 'focus']">
    <JvButton>默认触发</JvButton>
  </JvTooltip>
  
  <JvTooltip text="仅点击触发" :triggers="['click']">
    <JvButton>点击触发</JvButton>
  </JvTooltip>
  
  <JvTooltip text="仅悬停触发" :triggers="['hover']">
    <JvButton>悬停触发</JvButton>
  </JvTooltip>
</template>
```

### 手动控制显示
```vue
<template>
  <JvButton @click="showTooltip = !showTooltip">
    {{ showTooltip ? '隐藏' : '显示' }}提示
  </JvButton>
  
  <JvTooltip 
    text="手动控制的提示"
    v-model="showTooltip"
    :triggers="[]"
  >
    <JvButton>提示目标</JvButton>
  </JvTooltip>
</template>

<script setup>
import { ref } from 'vue'

const showTooltip = ref(false)
</script>
```

### 禁用提示
```vue
<template>
  <JvTooltip text="这个提示不会显示" :disabled="true">
    <JvButton>禁用提示</JvButton>
  </JvTooltip>
</template>
```

### 不显示箭头
```vue
<template>
  <JvTooltip text="没有箭头的提示" :arrow="false">
    <JvButton>无箭头</JvButton>
  </JvTooltip>
</template>
```

### 自定义延迟
```vue
<template>
  <JvTooltip 
    text="显示有较长延迟，隐藏很快" 
    :openDelay="1000"
    :closeDelay="0"
  >
    <JvButton>自定义延迟</JvButton>
  </JvTooltip>
</template>
``` 