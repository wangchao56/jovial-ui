# JvTabs 标签页组件

## 1. 组件介绍
`JvTabs` 是一个用于在不同内容面板之间进行切换的导航组件。它包含 `JvTabList`（标签列表）、`JvTab`（单个标签）和 `JvTabPanel`（内容面板）三个主要子组件，可以用于创建不同样式和交互方式的标签页界面。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 标签列表区域 (JvTabList)：包含多个标签项
- 标签项 (JvTab)：用户可点击切换的单个标签
- 内容面板 (JvTabPanel)：与标签对应的内容区域
- 活动指示器：显示当前激活的标签

### 基本使用示例
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="tab1">标签一</JvTab>
      <JvTab value="tab2">标签二</JvTab>
      <JvTab value="tab3">标签三</JvTab>
    </JvTabList>
    
    <JvTabPanel value="tab1">
      标签一的内容
    </JvTabPanel>
    <JvTabPanel value="tab2">
      标签二的内容
    </JvTabPanel>
    <JvTabPanel value="tab3">
      标签三的内容
    </JvTabPanel>
  </JvTabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 标签切换：点击标签可切换显示对应的内容面板
- 活动指示器：当前激活的标签有明显的视觉标识
- 键盘导航：支持通过键盘方向键在标签间导航
- 自适应布局：当标签过多时可以滚动或自动换行
- 过渡动画：切换标签时的平滑过渡效果

特殊交互：
- 当标签数量过多超出容器宽度时，可以左右滚动查看全部标签
- 可以通过编程方式控制标签的激活状态
- 支持禁用特定标签，使其无法点击
- 可以在标签中添加图标、徽标等附加内容

## 4. 可访问性
组件遵循 WCAG 无障碍标准：
- 使用 `role="tablist"`、`role="tab"` 和 `role="tabpanel"` 角色
- 提供 `aria-selected` 属性表示当前选中的标签
- 提供 `aria-controls` 和 `id` 属性建立标签与面板的关联
- 提供 `tabindex` 属性支持键盘导航
- 支持键盘操作，可通过方向键切换标签
- 使用足够的颜色对比度确保可读性
- 禁用状态下提供 `aria-disabled="true"` 属性

## 5. Vue 组件 API

### JvTabs Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | string \| number | undefined | 当前激活的标签值，支持v-model |
| variant | 'default' \| 'segmented' \| 'pills' \| 'underline' | 'default' | 标签样式变体 |
| color | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'primary' | 标签颜色 |
| alignTabs | 'start' \| 'center' \| 'end' \| 'stretch' | 'start' | 标签对齐方式 |
| grow | boolean | false | 标签是否自动增长填充可用空间 |
| vertical | boolean | false | 是否垂直排列标签 |
| animated | boolean | true | 是否启用切换动画 |

### JvTabList Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| sliderPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | 滑块指示器位置 |
| sliderVisible | boolean | true | 是否显示滑块指示器 |
| scrollable | boolean | true | 标签超出容器时是否可滚动 |

### JvTab Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| number | undefined | 标签的唯一值，用于标识和切换 |
| disabled | boolean | false | 是否禁用该标签 |
| icon | string | undefined | 标签图标 |
| badge | number \| string \| boolean | undefined | 标签徽标内容 |

### JvTabPanel Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | string \| number | undefined | 面板的唯一值，与对应标签的value匹配 |
| lazy | boolean | false | 是否延迟加载面板内容 |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: string \| number) | 标签切换时触发 |
| change | (value: string \| number, oldValue: string \| number) | 标签切换时触发，包含旧值和新值 |

### Slots
| 插槽名 | 组件 | 说明 |
|--------|------|------|
| default | JvTabs | 默认插槽，用于放置JvTabList和JvTabPanel组件 |
| default | JvTabList | 默认插槽，用于放置JvTab组件 |
| prefix | JvTabList | 标签列表前缀插槽 |
| suffix | JvTabList | 标签列表后缀插槽 |
| default | JvTab | 默认插槽，标签内容 |
| icon | JvTab | 标签图标插槽 |
| default | JvTabPanel | 默认插槽，面板内容 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 在模板中使用组件 | 1. 组件成功渲染<br>2. 包含正确的类名 | ✅ |
| TB-002 | 标签切换 | 验证点击标签是否切换面板 | 1. 点击不同标签<br>2. 检查激活标签和显示面板 | 点击标签后显示对应的面板内容 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-101 | 样式变体 | 验证不同variant属性的效果 | 1. 设置不同的variant属性<br>2. 检查样式变化 | 应用对应的变体样式 | ✅ |
| TB-102 | 颜色设置 | 验证不同color属性的效果 | 1. 设置不同的color属性<br>2. 检查样式变化 | 应用对应的颜色样式 | ✅ |
| TB-103 | 对齐方式 | 验证不同alignTabs属性的效果 | 1. 设置不同的alignTabs属性<br>2. 检查标签对齐方式 | 标签按设置对齐 | ✅ |
| TB-104 | 自动增长 | 验证grow属性的效果 | 1. 设置grow属性为true<br>2. 检查标签宽度 | 标签自动填充可用空间 | ✅ |
| TB-105 | 垂直排列 | 验证vertical属性的效果 | 1. 设置vertical属性为true<br>2. 检查标签排列方式 | 标签垂直排列 | ✅ |
| TB-106 | 动画效果 | 验证animated属性的效果 | 1. 切换animated属性<br>2. 观察切换动画 | 有无动画效果符合设置 | ✅ |
| TB-107 | 滑块位置 | 验证sliderPosition属性的效果 | 1. 设置不同的sliderPosition<br>2. 检查滑块位置 | 滑块位置符合设置 | ✅ |
| TB-108 | 滑块显示 | 验证sliderVisible属性的效果 | 1. 设置sliderVisible为false<br>2. 检查滑块是否显示 | 滑块显示符合设置 | ✅ |
| TB-109 | 标签禁用 | 验证disabled属性的效果 | 1. 设置某个标签disabled为true<br>2. 尝试点击该标签 | 禁用标签无法点击 | ✅ |
| TB-110 | 延迟加载 | 验证lazy属性的效果 | 1. 设置tabPanel的lazy属性<br>2. 检查面板内容加载时机 | 面板内容仅在激活时加载 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-201 | 更新事件 | 验证update:modelValue事件 | 1. 监听事件<br>2. 点击标签 | 事件被触发且值正确 | ✅ |
| TB-202 | 变更事件 | 验证change事件 | 1. 监听事件<br>2. 点击标签 | 事件被触发且新旧值正确 | ✅ |

### Slots 插槽测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-301 | 标签内容 | 验证JvTab默认插槽 | 1. 设置JvTab的默认插槽内容<br>2. 检查渲染结果 | 正确显示自定义内容 | ✅ |
| TB-302 | 标签图标 | 验证JvTab的icon插槽 | 1. 设置icon插槽内容<br>2. 检查渲染结果 | 正确显示自定义图标 | ✅ |
| TB-303 | 列表前缀 | 验证JvTabList的prefix插槽 | 1. 设置prefix插槽内容<br>2. 检查渲染结果 | 正确显示前缀内容 | ✅ |
| TB-304 | 列表后缀 | 验证JvTabList的suffix插槽 | 1. 设置suffix插槽内容<br>2. 检查渲染结果 | 正确显示后缀内容 | ✅ |

### 键盘导航测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-401 | 左右键导航 | 验证水平标签的键盘导航 | 1. 聚焦标签<br>2. 按左右方向键 | 焦点在标签间移动 | ✅ |
| TB-402 | 上下键导航 | 验证垂直标签的键盘导航 | 1. 在垂直模式下聚焦标签<br>2. 按上下方向键 | 焦点在标签间移动 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| TB-501 | ARIA属性 | 验证ARIA属性设置 | 1. 检查标签和面板的ARIA属性<br>2. 验证关联关系 | 具有正确的ARIA角色和属性 | ✅ |
| TB-502 | 键盘操作 | 验证键盘可访问性 | 1. 使用Tab导航到组件<br>2. 使用键盘操作组件 | 可通过键盘完全操作组件 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="home">首页</JvTab>
      <JvTab value="profile">个人资料</JvTab>
      <JvTab value="settings">设置</JvTab>
    </JvTabList>
    
    <JvTabPanel value="home">
      这是首页内容
    </JvTabPanel>
    <JvTabPanel value="profile">
      这是个人资料内容
    </JvTabPanel>
    <JvTabPanel value="settings">
      这是设置内容
    </JvTabPanel>
  </JvTabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('home')
</script>
```

### 不同样式变体
```vue
<template>
  <JvTabs v-model="activeTab" variant="default">
    <JvTabList>
      <JvTab value="tab1">默认风格</JvTab>
      <JvTab value="tab2">标签二</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
  
  <JvTabs v-model="activeTab" variant="segmented">
    <JvTabList>
      <JvTab value="tab1">分段风格</JvTab>
      <JvTab value="tab2">标签二</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
  
  <JvTabs v-model="activeTab" variant="pills">
    <JvTabList>
      <JvTab value="tab1">胶囊风格</JvTab>
      <JvTab value="tab2">标签二</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
  
  <JvTabs v-model="activeTab" variant="underline">
    <JvTabList>
      <JvTab value="tab1">下划线风格</JvTab>
      <JvTab value="tab2">标签二</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
</template>
```

### 带图标的标签
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="home" icon="$home">首页</JvTab>
      <JvTab value="profile" icon="$user">个人资料</JvTab>
      <JvTab value="settings" icon="$settings">设置</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
</template>
```

### 带徽标的标签
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="home">首页</JvTab>
      <JvTab value="messages" badge="5">消息</JvTab>
      <JvTab value="notifications" badge="new">通知</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
</template>
```

### 垂直布局
```vue
<template>
  <JvTabs v-model="activeTab" vertical>
      <JvTabPanel name="" value="tab1">标签一内容</JvTabPanel>
      <JvTabPanel value="tab2">标签二内容</JvTabPanel>
      <JvTabPanel value="tab3">标签三内容</JvTabPanel>
  </JvTabs>
</template>

<style scoped>
.tab-panels {
  margin-left: 20px;
}
</style>
```

### 禁用标签
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="tab1">标签一</JvTab>
      <JvTab value="tab2" disabled>禁用标签</JvTab>
      <JvTab value="tab3">标签三</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
</template>
```

### 自定义内容
```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabList>
      <JvTab value="tab1">
        <template #default>
          <div class="custom-tab">
            <span class="tab-title">自定义标签</span>
            <span class="tab-desc">含有描述文本</span>
          </div>
        </template>
      </JvTab>
      <JvTab value="tab2">标准标签</JvTab>
    </JvTabList>
    <!-- 面板内容 -->
  </JvTabs>
</template>

<style scoped>
.custom-tab {
  display: flex;
  flex-direction: column;
}
.tab-title {
  font-weight: bold;
}
.tab-desc {
  font-size: 12px;
  color: #666;
}
</style>
``` 