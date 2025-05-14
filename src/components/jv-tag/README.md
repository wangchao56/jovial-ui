# JvTag 标签组件

## 组件介绍
`JvTag` 是一个用于标记和分类的标签组件，可以展示状态、属性和分类信息。它包含两个核心组件：单个标签 (JvTag) 和标签组 (JvTagGroup)，可以灵活组合使用，适用于信息展示、筛选、分类等场景。

标签组件具有以下特点：
- 多种视觉样式：支持不同类型、变体、尺寸和形状
- 丰富的交互功能：可关闭、可选择、可自定义图标
- 标签组管理：支持折叠、添加、搜索、选择等功能
- 可访问性设计：符合 WCAG 无障碍标准

## 布局结构使用方式

### JvTag 组件
JvTag 组件采用简洁的结构，主要包含三个部分：
- 前置区域（prepend）：可选的前置图标或内容
- 内容区域（content）：标签的主要文本内容
- 关闭图标（close）：当 closable 设置为 true 时显示

基本使用示例：

```vue
<template>
  <!-- 基础标签 -->
  <JvTag label="基础标签" />
  
  <!-- 不同类型 -->
  <JvTag type="primary" label="主要" />
  <JvTag type="success" label="成功" />
  <JvTag type="warning" label="警告" />
  <JvTag type="error" label="错误" />
  <JvTag type="info" label="信息" />
  
  <!-- 不同变体 -->
  <JvTag variant="filled" label="填充" />
  <JvTag variant="outlined" label="描边" />
  <JvTag variant="tonal" label="色调" />
  
  <!-- 可关闭标签 -->
  <JvTag label="可关闭标签" closable @clickClose="handleClose" />
  
  <!-- 带图标标签 -->
  <JvTag label="带图标" prependIcon="$star" />
  
  <!-- 自定义内容 -->
  <JvTag>
    <template #prepend>
      <img src="avatar.jpg" width="16" height="16" alt="用户头像" />
    </template>
    用户名
  </JvTag>
</template>

<script setup>
function handleClose(event) {
  console.log('标签已关闭', event)
}
</script>
```

### JvTagGroup 组件
JvTagGroup 用于管理一组标签，提供了丰富的功能和交互方式：

```vue
<template>
  <JvTagGroup
    v-model:tags="tags"
    closable
    addable
    searchable
    selectable
    multiple
    @close="handleClose"
    @add="handleAdd"
    @select="handleSelect"
    @search="handleSearch"
  >
    <!-- 自定义标签内容 -->
    <template #tag="{ tag }">
      {{ tag.props.label }}
    </template>
    
    <!-- 前缀内容 -->
    <template #prefix>
      <span class="label">标签：</span>
    </template>
    
    <!-- 后缀内容 -->
    <template #suffix>
      <button class="action-btn" @click="clearAll">清空</button>
    </template>
  </JvTagGroup>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref([
  { id: 1, selected: false, props: { label: '标签1', type: 'primary' } },
  { id: 2, selected: false, props: { label: '标签2', type: 'success' } },
  { id: 3, selected: false, props: { label: '标签3', type: 'warning' } }
])

function handleClose(tag, index) {
  console.log('关闭标签', tag, index)
}

function handleAdd() {
  console.log('添加标签')
}

function handleSelect(tag, index) {
  console.log('选择标签', tag, index)
}

function handleSearch(keyword) {
  console.log('搜索标签', keyword)
}

function clearAll() {
  tags.value = []
}
</script>
```

## 交互设计

### JvTag 交互
JvTag 组件提供以下交互特性：

- **点击事件**：标签可以响应点击事件，触发 `click` 事件
- **关闭功能**：启用 `closable` 后，可以点击关闭按钮移除标签，触发 `clickClose` 事件
- **过渡动画**：标签在添加和移除时有平滑的过渡效果
- **选择状态**：可通过 `selectable` 和 `selected` 属性控制选择状态
- **键盘导航**：支持键盘焦点和操作，增强可访问性

### JvTagGroup 交互
JvTagGroup 组件提供丰富的交互功能：

- **折叠展开**：当标签数量超过 `maxCollapse` 设定值时，多余标签会被折叠，可通过点击展开/收起
- **添加标签**：启用 `addable` 属性后，可以点击添加按钮并通过输入框添加新标签
- **删除标签**：启用 `closable` 属性后，可以删除组内的标签
- **搜索过滤**：启用 `searchable` 属性后，可以搜索和过滤标签
- **标签选择**：启用 `selectable` 属性后，标签可以被选中，支持单选和多选模式
- **清除选择**：在多选模式下，提供清除全部选择的功能

## 可访问性
标签组件遵循 WCAG 无障碍标准设计：

- **语义化结构**：使用语义化的 HTML 结构，提高屏幕阅读器识别度
- **ARIA 属性**：标签设置了 `role="tag"` 属性，关闭按钮使用适当的 ARIA 标签
- **键盘可用性**：支持 `tabindex` 属性和键盘导航，可以通过 Tab 键聚焦，Space/Enter 键触发操作
- **焦点状态**：提供清晰的焦点状态样式，便于键盘用户识别当前焦点位置
- **颜色对比度**：所有标签样式确保足够的颜色对比度，符合 WCAG AA 级标准
- **状态指示**：为选中、禁用等状态提供适当的视觉和无障碍指示

## Vue 组件 API

### JvTag 组件

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'primary' | 标签类型 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 标签尺寸 |
| shape | 'square' \| 'pill' | 'square' | 标签形状 |
| color | string | undefined | 自定义标签颜色 |
| closable | boolean | false | 是否可关闭 |
| closeIcon | string | '' | 自定义关闭图标 |
| prependIcon | string | '' | 前置图标 |
| label | string | '' | 标签文本内容 |
| variant | 'filled' \| 'outlined' \| 'tonal' | 'filled' | 标签变体样式 |
| selectable | boolean | false | 是否可选择 |
| selected | boolean | false | 是否已选中 |

#### 事件 (Emits)
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击标签时触发 |
| clickClose | (event: MouseEvent) | 点击关闭按钮时触发 |
| groupSelect | (selected: boolean) | 在标签组中选择状态变化时触发 |

#### 插槽 (Slots)
| 插槽名 | 说明 |
|--------|------|
| default | 标签内容的默认插槽 |
| prepend | 标签前置内容插槽 |

#### 暴露方法 (Expose)
| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus | - | 使标签获取焦点 |
| blur | - | 使标签失去焦点 |

### JvTagGroup 组件

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| tags | JvTagItemProps[] | [] | 标签数据数组 |
| collapsible | boolean | false | 是否可折叠 |
| maxCollapse | number | 5 | 折叠前显示的最大标签数量 |
| closable | boolean | false | 标签是否可关闭 |
| addable | boolean | false | 是否可添加标签 |
| selectable | boolean | false | 标签是否可选择 |
| multiple | boolean | false | 是否允许多选 |
| searchable | boolean | false | 是否可搜索 |
| defaultTagType | TagType | 'primary' | 默认标签类型 |
| defaultTagSize | 'small' \| 'medium' \| 'large' | 'small' | 默认标签尺寸 |
| defaultTagVariant | 'filled' \| 'outlined' \| 'tonal' | 'outlined' | 默认标签变体 |
| defaultTagShape | 'square' \| 'pill' | 'square' | 默认标签形状 |

#### 事件 (Emits)
| 事件名 | 参数 | 说明 |
|--------|------|------|
| close | (tag: JvTagItemProps, index: number) | 关闭标签时触发 |
| add | - | 添加标签时触发 |
| update:tags | (tags: JvTagItemProps[]) | 标签数组更新时触发 |
| select | (tag: JvTagItemProps, index: number) | 选择标签时触发 |
| search | (keyword: string) | 搜索标签时触发 |

#### 插槽 (Slots)
| 插槽名 | 说明 |
|--------|------|
| tag | 自定义标签内容，提供 tag 属性访问标签数据 |
| prefix | 标签组前置内容 |
| suffix | 标签组后置内容 |
| actions | 标签组操作区域 |

#### 标签数据结构 (JvTagItemProps)
```typescript
interface JvTagItemProps {
  id?: string | number // 标签唯一标识
  selected?: boolean // 是否选中
  props?: JvTagProps // 标签属性
}
```

## 测试用例

### JvTag 组件测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TAG-001 | 基础渲染 | 验证标签基本渲染 | 1. 挂载JvTag组件<br>2. 检查DOM结构 | 1. 标签应正确渲染<br>2. 包含正确的类名 | ✅ |
| TAG-002 | 内容显示 | 验证标签内容显示 | 1. 设置label属性<br>2. 检查内容显示 | 显示正确的标签文本 | ✅ |
| TAG-003 | 插槽内容 | 验证默认插槽 | 1. 设置默认插槽内容<br>2. 检查渲染结果 | 应正确显示插槽内容 | ✅ |
| TAG-004 | 前置插槽 | 验证前置插槽 | 1. 设置prepend插槽内容<br>2. 检查渲染结果 | 应正确显示前置内容 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TAG-101 | 类型设置 | 验证不同type效果 | 1. 设置不同type值<br>2. 检查类名和样式 | 应用正确的类型样式 | ✅ |
| TAG-102 | 尺寸设置 | 验证不同size效果 | 1. 设置不同size值<br>2. 检查类名和样式 | 应用正确的尺寸样式 | ✅ |
| TAG-103 | 形状设置 | 验证不同shape效果 | 1. 设置不同shape值<br>2. 检查边框圆角 | 应用正确的形状样式 | ✅ |
| TAG-104 | 变体设置 | 验证不同variant效果 | 1. 设置不同variant值<br>2. 检查样式变化 | 应用正确的变体样式 | ✅ |
| TAG-105 | 可关闭 | 验证closable属性 | 1. 设置closable=true<br>2. 检查关闭按钮 | 显示关闭按钮 | ✅ |
| TAG-106 | 自定义图标 | 验证prependIcon属性 | 1. 设置prependIcon值<br>2. 检查图标渲染 | 显示正确的前置图标 | ✅ |
| TAG-107 | 可选择 | 验证selectable和selected属性 | 1. 设置selectable=true和selected状态<br>2. 检查选中样式 | 正确显示选中状态 | ✅ |

#### 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TAG-201 | 点击事件 | 验证click事件 | 1. 点击标签<br>2. 检查事件触发 | click事件应被触发 | ✅ |
| TAG-202 | 关闭事件 | 验证clickClose事件 | 1. 点击关闭按钮<br>2. 检查事件触发 | clickClose事件应被触发 | ✅ |
| TAG-203 | 选择事件 | 验证groupSelect事件 | 1. 在可选择模式下点击标签<br>2. 检查事件触发 | groupSelect事件应被触发 | ✅ |

### JvTagGroup 组件测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TGP-001 | 基础渲染 | 验证标签组基本渲染 | 1. 挂载JvTagGroup<br>2. 设置tags属性<br>3. 检查渲染结果 | 所有标签应正确渲染 | ✅ |
| TGP-002 | 标签更新 | 验证标签数组更新 | 1. 改变tags数组<br>2. 检查渲染结果 | 标签显示应随数组更新 | ✅ |

#### 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TGP-101 | 折叠功能 | 验证标签折叠 | 1. 设置collapsible=true<br>2. 添加超过maxCollapse数量的标签<br>3. 检查折叠状态 | 超出部分应被折叠，显示"+N"标签 | ✅ |
| TGP-102 | 展开功能 | 验证折叠展开 | 1. 点击折叠指示器<br>2. 检查展开状态 | 所有标签应被展开显示 | ✅ |
| TGP-103 | 关闭功能 | 验证标签关闭 | 1. 设置closable=true<br>2. 点击关闭按钮<br>3. 检查标签删除 | 标签应被移除 | ✅ |
| TGP-104 | 添加功能 | 验证标签添加 | 1. 设置addable=true<br>2. 点击添加按钮<br>3. 输入标签内容<br>4. 按回车确认 | 新标签应被添加 | ✅ |
| TGP-105 | 搜索功能 | 验证标签搜索 | 1. 设置searchable=true<br>2. 在搜索框输入关键字<br>3. 检查过滤结果 | 应只显示匹配的标签 | ✅ |
| TGP-106 | 选择功能 | 验证标签选择 | 1. 设置selectable=true<br>2. 点击标签<br>3. 检查选中状态 | 标签应显示选中状态 | ✅ |
| TGP-107 | 多选功能 | 验证多选模式 | 1. 设置multiple=true<br>2. 选择多个标签<br>3. 检查多选状态 | 多个标签可同时选中 | ✅ |
| TGP-108 | 清除选择 | 验证清除选择功能 | 1. 选中多个标签<br>2. 点击清除选择按钮<br>3. 检查选中状态 | 所有标签选中状态应被清除 | ✅ |

## 使用示例

### 基础标签
```vue
<template>
  <div class="tag-demo">
    <h3>基础标签</h3>
    <div class="tag-container">
      <JvTag label="默认标签" />
      <JvTag type="primary" label="主要" />
      <JvTag type="success" label="成功" />
      <JvTag type="warning" label="警告" />
      <JvTag type="error" label="错误" />
      <JvTag type="info" label="信息" />
    </div>
    
    <h3>标签变体</h3>
    <div class="tag-container">
      <JvTag variant="filled" label="填充标签" />
      <JvTag variant="outlined" label="描边标签" />
      <JvTag variant="tonal" label="色调标签" />
    </div>
    
    <h3>标签尺寸</h3>
    <div class="tag-container">
      <JvTag size="small" label="小标签" />
      <JvTag size="medium" label="中标签" />
      <JvTag size="large" label="大标签" />
    </div>
    
    <h3>标签形状</h3>
    <div class="tag-container">
      <JvTag shape="square" label="方形标签" />
      <JvTag shape="pill" label="药丸标签" />
    </div>
  </div>
</template>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
</style>
```

### 可交互标签
```vue
<template>
  <div class="tag-demo">
    <h3>可关闭标签</h3>
    <div class="tag-container">
      <JvTag 
        v-for="(tag, index) in closableTags" 
        :key="index"
        :label="tag" 
        :type="tagTypes[index % tagTypes.length]"
        closable
        @clickClose="() => handleCloseTag(index)"
      />
    </div>
    
    <h3>可选择标签</h3>
    <div class="tag-container">
      <JvTag 
        v-for="(tag, index) in selectableTags" 
        :key="index"
        :label="tag.label" 
        :type="tag.type"
        selectable
        :selected="tag.selected"
        @click="() => toggleSelect(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tagTypes = ['primary', 'success', 'warning', 'error', 'info']
const closableTags = ref(['标签1', '标签2', '标签3', '标签4', '标签5'])

const selectableTags = ref([
  { label: '选项1', type: 'primary', selected: false },
  { label: '选项2', type: 'success', selected: false },
  { label: '选项3', type: 'warning', selected: false },
  { label: '选项4', type: 'error', selected: false },
])

function handleCloseTag(index) {
  closableTags.value.splice(index, 1)
}

function toggleSelect(index) {
  selectableTags.value[index].selected = !selectableTags.value[index].selected
}
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
</style>
```

### 标签组示例
```vue
<template>
  <div class="tag-group-demo">
    <h3>基础标签组</h3>
    <JvTagGroup
      v-model:tags="tags"
      closable
      @close="handleClose"
    />
    
    <h3>可折叠标签组</h3>
    <JvTagGroup
      v-model:tags="manyTags"
      :max-collapse="3"
      collapsible
    />
    
    <h3>可添加标签组</h3>
    <JvTagGroup
      v-model:tags="editableTags"
      closable
      addable
      @close="handleClose"
      @add="handleAdd"
    />
    
    <h3>可选择标签组 (单选)</h3>
    <JvTagGroup
      v-model:tags="selectTags"
      selectable
      @select="handleSelect"
    />
    
    <h3>可选择标签组 (多选)</h3>
    <JvTagGroup
      v-model:tags="multiSelectTags"
      selectable
      multiple
      @select="handleSelect"
    />
    
    <h3>可搜索标签组</h3>
    <JvTagGroup
      v-model:tags="searchableTags"
      searchable
      @search="handleSearch"
    />
    
    <h3>完整功能标签组</h3>
    <JvTagGroup
      v-model:tags="fullFeatureTags"
      closable
      addable
      searchable
      selectable
      multiple
      collapsible
      :max-collapse="5"
      @close="handleClose"
      @add="handleAdd"
      @select="handleSelect"
      @search="handleSearch"
    >
      <template #prefix>
        <span class="group-label">标签：</span>
      </template>
    </JvTagGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 生成标签数据的辅助函数
function createTag(id, label, type = 'primary', variant = 'outlined', selected = false) {
  return {
    id,
    selected,
    props: { label, type, variant }
  }
}

const tags = ref([
  createTag(1, '标签1', 'primary'),
  createTag(2, '标签2', 'success'),
  createTag(3, '标签3', 'warning')
])

const manyTags = ref([
  createTag(1, '标签1', 'primary'),
  createTag(2, '标签2', 'success'),
  createTag(3, '标签3', 'warning'),
  createTag(4, '标签4', 'error'),
  createTag(5, '标签5', 'info'),
  createTag(6, '标签6', 'primary'),
  createTag(7, '标签7', 'success')
])

const editableTags = ref([
  createTag(1, '可添加', 'primary'),
  createTag(2, '可删除', 'success')
])

const selectTags = ref([
  createTag(1, '选项1', 'primary', 'outlined', false),
  createTag(2, '选项2', 'success', 'outlined', false),
  createTag(3, '选项3', 'warning', 'outlined', false)
])

const multiSelectTags = ref([
  createTag(1, '多选1', 'primary', 'outlined', false),
  createTag(2, '多选2', 'success', 'outlined', false),
  createTag(3, '多选3', 'warning', 'outlined', false),
  createTag(4, '多选4', 'error', 'outlined', false)
])

const searchableTags = ref([
  createTag(1, '苹果', 'primary'),
  createTag(2, '香蕉', 'success'),
  createTag(3, '橙子', 'warning'),
  createTag(4, '葡萄', 'error'),
  createTag(5, '西瓜', 'info'),
  createTag(6, '芒果', 'primary')
])

const fullFeatureTags = ref([
  createTag(1, '功能1', 'primary'),
  createTag(2, '功能2', 'success'),
  createTag(3, '功能3', 'warning'),
  createTag(4, '功能4', 'error'),
  createTag(5, '功能5', 'info'),
  createTag(6, '功能6', 'primary'),
  createTag(7, '功能7', 'success')
])

function handleClose(tag, index) {
  console.log('关闭标签', tag, index)
}

function handleAdd() {
  console.log('添加标签')
}

function handleSelect(tag, index) {
  console.log('选择标签', tag, index)
}

function handleSearch(keyword) {
  console.log('搜索关键字', keyword)
}
</script>

<style scoped>
.tag-group-demo > h3 {
  margin-top: 24px;
  margin-bottom: 12px;
}

.group-label {
  font-size: 14px;
  margin-right: 8px;
  color: #666;
}
</style> 