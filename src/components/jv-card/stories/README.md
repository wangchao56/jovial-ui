# JvCard 卡片组件

## 1. 组件介绍
`JvCard` 是一个灵活的容器组件，用于展示相关内容的集合。它遵循 Material Design 设计规范，提供多种变体和布局选项。卡片可以包含标题、副标题、内容、媒体、操作按钮和底部信息等，适用于信息展示、产品卡片、个人资料卡等多种场景。

## 2. 布局结构使用方式
组件采用模块化布局，包含多个子组件：
- `JvCardHeader`：卡片头部，包含标题和副标题
- `JvCardContent`：卡片内容区域
- `JvCardActions`：卡片操作区域，通常放置按钮

`JvCard` 支持两种使用方式：
1. 通过属性和插槽直接在 JvCard 上配置内容
2. 使用子组件进行更精细的布局控制

### 基本使用示例
```vue
<template>
  <!-- 简单卡片 - 使用属性 -->
  <JvCard title="卡片标题" subtitle="卡片副标题" content="这是卡片的内容区域" />

  <!-- 高级卡片 - 使用子组件 -->
  <JvCard>
    <JvCardHeader title="卡片标题" subtitle="卡片副标题" />
    <div class="jv-card__media">
      <img src="image.jpg" alt="卡片图片" />
    </div>
    <JvCardContent>
      <p>这是卡片的详细内容</p>
    </JvCardContent>
    <JvCardActions align="end">
      <JvButton variant="text">取消</JvButton>
      <JvButton variant="tonal">确认</JvButton>
    </JvCardActions>
  </JvCard>
</template>
```

## 3. 交互设计
组件提供以下交互效果：
- 点击交互：设置 `clickable` 属性后，卡片可以响应点击事件并发出 `click` 事件
- 悬停效果：可点击卡片在悬停时会有轻微的视觉反馈
- 禁用状态：设置 `disabled` 属性后，卡片将不再响应交互

特殊交互：
- 不同变体类型有不同的交互视觉反馈：
  - elevated 卡片在悬停和点击时会改变阴影深度
  - outlined 卡片会有边框颜色变化
  - tonal 卡片会有背景色透明度变化
- 内容组织：卡片会自动检测子组件，避免重复渲染，确保内容布局合理
- 布局适配：卡片会根据内容自动调整高度，并可限制最大宽度

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用语义化的 HTML 结构，便于屏幕阅读器理解内容
- 可点击卡片设置适当的键盘焦点样式
- 禁用状态下明确传达交互限制（使用 `aria-disabled="true"`）
- 足够的颜色对比度确保内容可读性
- 使用合适的 HTML 元素表示不同部分（如标题使用 heading 元素）
- 若卡片可点击，设置 `role="button"` 或使用适当的元素和键盘可访问性

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | undefined | 卡片标题 |
| subtitle | string | undefined | 卡片副标题 |
| content | string | undefined | 卡片内容 |
| imgSrc | string | undefined | 卡片图片 |
| maxWidth | string \| number | undefined | 卡片最大宽度 |
| variant | 'elevated' \| 'outlined' \| 'tonal' | 'elevated' | 卡片变体 |
| rounded | 'rounded' \| 'rounded-sm' \| 'rounded-lg' \| 'rounded-xl' \| 'rounded-full' \| 'rounded-none' | 'rounded' | 卡片圆角样式 |
| actionsAlign | 'start' \| 'end' \| 'center' | 'end' | 操作按钮对齐方式 |
| clickable | boolean | false| 卡片是否可点击| 

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击卡片时触发（仅当 clickable 为 true 时） |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，推荐放置卡片子组件 |
| header | 卡片头部内容 |
| title | 卡片标题内容 |
| subtitle | 卡片副标题内容 |
| media | 卡片媒体内容 |
| content | 卡片主要内容 |
| actions | 卡片操作按钮区域 |
| footer | 卡片底部内容 |

### 子组件

#### JvCardHeader Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | undefined | 卡片标题 |
| subtitle | string | undefined | 卡片副标题 |

#### JvCardContent Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | string | undefined | 卡片内容 |

#### JvCardActions Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| align | 'start' \| 'end' \| 'center' | 'end' | 操作按钮对齐方式 |
## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-001 | 基础渲染 | 验证卡片能够正确渲染基本内容 | 1. 挂载JvCard组件<br>2. 检查组件类名和结构 | 组件应正确渲染且包含jv-card类名 | ✅ |
| CD-002 | 属性渲染 | 验证卡片能正确显示通过props传入的内容 | 1. 挂载JvCard组件并设置title、subtitle、content属性<br>2. 检查渲染内容 | 卡片应正确显示设置的标题、副标题和内容 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-101 | 颜色类型 | 验证不同colorType属性的效果 | 1. 分别挂载不同colorType的JvCard<br>2. 检查样式变化 | 不同颜色类型的卡片应有对应的样式类 | ✅ |
| CD-102 | 变体样式 | 验证不同variant属性的效果 | 1. 分别挂载不同variant的JvCard<br>2. 检查样式变化 | 不同变体的卡片应有对应的样式类和视觉效果 | ✅ |
| CD-103 | 圆角样式 | 验证不同rounded属性的效果 | 1. 设置不同rounded属性<br>2. 检查卡片圆角样式 | 卡片圆角应符合设置 | ✅ |
| CD-104 | 边框显示 | 验证bordered属性的效果 | 1. 设置bordered=true<br>2. 检查卡片边框 | 卡片应显示边框 | ✅ |
| CD-105 | 可点击状态 | 验证clickable属性的效果 | 1. 设置clickable=true<br>2. 检查卡片样式和交互 | 卡片应有可点击样式且响应点击事件 | ✅ |
| CD-106 | 禁用状态 | 验证disabled属性的效果 | 1. 设置disabled=true<br>2. 检查卡片样式和交互 | 卡片应有禁用样式且不响应交互 | ✅ |
| CD-107 | 内边距设置 | 验证不同padding属性的效果 | 1. 设置不同padding属性<br>2. 检查卡片内边距 | 卡片内边距应符合设置 | ✅ |
| CD-108 | 最大宽度 | 验证maxWidth属性的效果 | 1. 设置maxWidth属性<br>2. 检查卡片宽度 | 卡片宽度应不超过设置值 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-201 | 点击事件 | 验证可点击卡片的点击事件 | 1. 设置clickable=true<br>2. 点击卡片<br>3. 检查事件触发 | 点击后应触发click事件 | ✅ |
| CD-202 | 禁用时点击 | 验证禁用状态下的点击行为 | 1. 设置disabled=true和clickable=true<br>2. 点击卡片<br>3. 检查事件触发 | 点击后不应触发click事件 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-301 | 默认插槽 | 验证默认插槽内容渲染 | 1. 在默认插槽中放置内容<br>2. 检查渲染结果 | 应正确显示默认插槽内容 | ✅ |
| CD-302 | 头部插槽 | 验证header插槽内容渲染 | 1. 在header插槽中放置内容<br>2. 检查渲染结果 | 应正确显示头部插槽内容 | ✅ |
| CD-303 | 标题插槽 | 验证title插槽内容渲染 | 1. 在title插槽中放置内容<br>2. 检查渲染结果 | 应正确显示标题插槽内容 | ✅ |
| CD-304 | 媒体插槽 | 验证media插槽内容渲染 | 1. 在media插槽中放置内容<br>2. 检查渲染结果 | 应正确显示媒体插槽内容 | ✅ |
| CD-305 | 内容插槽 | 验证content插槽内容渲染 | 1. 在content插槽中放置内容<br>2. 检查渲染结果 | 应正确显示内容插槽内容 | ✅ |
| CD-306 | 操作插槽 | 验证actions插槽内容渲染 | 1. 在actions插槽中放置内容<br>2. 检查渲染结果 | 应正确显示操作插槽内容 | ✅ |


### 子组件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-401 | 卡片头部 | 验证JvCardHeader组件渲染 | 1. 在JvCard中使用JvCardHeader<br>2. 设置标题和副标题<br>3. 检查渲染结果 | 应正确显示头部组件、标题和副标题 | ✅ |
| CD-402 | 卡片内容 | 验证JvCardContent组件渲染 | 1. 在JvCard中使用JvCardContent<br>2. 添加内容<br>3. 检查渲染结果 | 应正确显示内容组件和内容 | ✅ |
| CD-403 | 卡片操作 | 验证JvCardActions组件渲染 | 1. 在JvCard中使用JvCardActions<br>2. 设置不同align值<br>3. 检查渲染结果 | 应正确显示操作组件并按设置对齐 | ✅ |
| CD-404 | 卡片底部 | 验证JvCardFooter组件渲染 | 1. 在JvCard中使用JvCardFooter<br>2. 添加内容<br>3. 检查渲染结果 | 应正确显示底部组件和内容 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CD-501 | ARIA属性 | 验证可点击卡片的ARIA属性 | 1. 设置clickable=true<br>2. 检查ARIA属性 | 应设置正确的ARIA角色和属性 | ✅ |
| CD-502 | 键盘操作 | 验证可点击卡片的键盘交互 | 1. 设置clickable=true<br>2. 使用键盘导航到卡片<br>3. 按回车键 | 应能通过键盘操作卡片 | ✅ |

## 使用示例

### 基础卡片
```vue
<template>
  <JvCard title="基础卡片" content="这是一个简单的卡片示例" />
</template>
```

### 不同变体样式
```vue
<template>
  <JvCard title="凸起卡片" variant="elevated" content="带阴影的卡片" />
  <JvCard title="描边卡片" variant="outlined" content="带边框的卡片" />
  <JvCard title="渐变卡片" variant="tonal" content="带背景色的卡片" />
</template>
```

### 不同颜色类型
```vue
<template>
  <JvCard title="默认卡片" color-type="default" content="使用默认颜色" />
  <JvCard title="主要卡片" color-type="primary" content="使用主要颜色" />
  <JvCard title="成功卡片" color-type="success" content="使用成功颜色" />
  <JvCard title="警告卡片" color-type="warning" content="使用警告颜色" />
  <JvCard title="错误卡片" color-type="error" content="使用错误颜色" />
  <JvCard title="信息卡片" color-type="info" content="使用信息颜色" />
</template>
```

### 可点击卡片
```vue
<template>
  <JvCard 
    title="可点击卡片" 
    content="点击此卡片会触发事件" 
    clickable 
    @click="handleCardClick" 
  />
</template>

<script setup>
function handleCardClick(event) {
  console.log('卡片被点击', event)
}
</script>
```

### 带图片的卡片
```vue
<template>
  <JvCard title="图片卡片" subtitle="带有图片的卡片示例">
    <template #media>
      <img src="https://example.com/image.jpg" alt="示例图片" />
    </template>
    <template #content>
      <p>这是卡片的详细描述内容</p>
    </template>
  </JvCard>
</template>
```

### 完整布局卡片
```vue
<template>
  <JvCard maxWidth="400px">
    <JvCardHeader title="产品名称" subtitle="产品描述" />
    <template #media>
      <img src="https://example.com/product.jpg" alt="产品图片" />
    </template>
    <JvCardContent>
      <p>这是产品的详细介绍，包含了产品的各种特性和优势。</p>
      <div class="price">¥299.00</div>
    </JvCardContent>
    <div>
        这是一段内容
    </div>
    <JvCardActions>
      <JvButton variant="text">查看详情</JvButton>
      <JvButton variant="elevated" color-type="primary">立即购买</JvButton>
    </JvCardActions>
  </JvCard>
</template>

<style scoped>
.price {
  font-size: 20px;
  font-weight: bold;
  color: #f30;
  margin-top: 10px;
}
</style>
```

### 禁用状态卡片
```vue
<template>
  <JvCard 
    title="禁用卡片" 
    content="此卡片处于禁用状态" 
    clickable 
    disabled
  />
</template>
```

### 自定义圆角和内边距
```vue
<template>
  <JvCard 
    title="自定义样式卡片" 
    content="自定义圆角和内边距的卡片" 
    rounded="rounded-lg" 
    padding="lg" 
  />
</template>
```
