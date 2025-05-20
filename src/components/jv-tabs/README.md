# JvTabs 标签页组件

## 组件介绍

JvTabs组件是一种用于在不同内容区域之间进行切换的导航组件。它将内容组织成多个分组，每个分组通过标签页进行访问。这种组织方式在有限空间内展示多个内容区域时非常有效。

## 布局结构使用方式

JvTabs组件主要由以下部分组成：

1. 标签导航区(`JvTabNav`)：显示可点击的标签，用于切换内容
2. 内容区(`JvTabPanel`)：显示当前激活标签对应的内容

基本使用示例：

```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabPanel value="tab1" name="标签1">
      这是标签1的内容
    </JvTabPanel>
    <JvTabPanel value="tab2" name="标签2">
      这是标签2的内容
    </JvTabPanel>
    <JvTabPanel value="tab3" name="标签3">
      这是标签3的内容
    </JvTabPanel>
  </JvTabs>
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

const activeTab = ref('tab1')
</script>
```

也可以使用数据驱动方式：

```vue
<template>
  <JvTabs v-model="activeTab" :items="tabs" />
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs } from '@/components/jv-tabs'

const activeTab = ref('tab1')
const tabs = [
  { value: 'tab1', label: '标签1', content: '这是标签1的内容' },
  { value: 'tab2', label: '标签2', content: '这是标签2的内容' },
  { value: 'tab3', label: '标签3', content: '这是标签3的内容' },
]
</script>
```

## 交互设计

JvTabs组件提供了以下交互效果：

1. 点击标签可切换不同的内容面板
2. 标签下方/侧方有动态滑块指示当前激活的标签
3. 支持懒加载内容，只有在标签被激活时才加载内容
4. 支持垂直和水平布局模式
5. 支持不同的视觉样式变体（默认、分段式、胶囊式、下划线式）

## 可访问性

JvTabs组件遵循WAI-ARIA标准，具备以下可访问性特性：

1. 使用适当的ARIA角色：`tablist`、`tab`和`tabpanel`
2. 键盘导航支持：可通过Tab键在标签之间切换，Enter键激活标签
3. 标签状态清晰：激活状态通过`aria-selected`属性表示
4. 禁用状态明确：通过`aria-disabled`属性标识
5. 垂直布局时使用`aria-orientation="vertical"`属性

## Vue 组件 API

### JvTabs Props

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| modelValue | `string \| number` | `''` | 当前激活的标签值，支持v-model |
| variant | `'default' \| 'segmented' \| 'pills' \| 'underline'` | `'default'` | 标签样式变体 |
| color | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | 标签颜色 |
| alignTabs | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | 标签对齐方式 |
| grow | `boolean` | `false` | 标签是否自动增长填充可用空间 |
| vertical | `boolean` | `false` | 是否垂直排列标签 |
| animated | `boolean` | `true` | 是否启用切换动画 |
| items | `TabNavItem[]` | `[]` | 标签数据项数组，用于自动生成标签和面板 |
| lazy | `boolean` | `false` | 面板是否启用延迟加载，仅在激活时加载内容 |

### JvTabs Events

| 事件名 | 参数 | 说明 |
|-------|------|------|
| update:modelValue | `(value: string \| number) => void` | 更新modelValue事件 |
| change | `(newValue: string \| number, oldValue: string \| number) => void` | 标签变更事件 |

### JvTabs Slots

| 插槽名 | 参数 | 说明 |
|-------|------|------|
| default | - | 默认插槽，用于放置JvTabPanel组件 |
| nav | - | 自定义导航区域的内容 |

### JvTabPanel Props

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| value | `string \| number` | - | 面板的唯一值，与对应标签的value匹配 |
| name | `string` | - | 面板的名称 |
| lazy | `boolean` | `false` | 是否启用延迟加载，仅在激活时加载内容 |

### JvTabPanel Slots

| 插槽名 | 参数 | 说明 |
|-------|------|------|
| default | - | 默认插槽，用于放置面板内容 |

## 测试用例

### 基础功能测试

```js
import { mount } from '@vue/test-utils'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

describe('JvTabs 基础功能', () => {
  it('正确渲染标签和面板', () => {
    const wrapper = mount(JvTabs, {
      props: {
        modelValue: 'tab1'
      },
      slots: {
        default: [
          '<JvTabPanel value="tab1" name="标签1">内容1</JvTabPanel>',
          '<JvTabPanel value="tab2" name="标签2">内容2</JvTabPanel>'
        ]
      },
      global: {
        stubs: {
          JvTabPanel
        }
      }
    })
    
    expect(wrapper.findAll('.jv-tabs-nav__item').length).toBe(2)
    expect(wrapper.find('.jv-tabs-panel--active').text()).toBe('内容1')
  })
  
  it('点击标签切换内容', async () => {
    const wrapper = mount(JvTabs, {
      props: {
        modelValue: 'tab1'
      },
      slots: {
        default: [
          '<JvTabPanel value="tab1" name="标签1">内容1</JvTabPanel>',
          '<JvTabPanel value="tab2" name="标签2">内容2</JvTabPanel>'
        ]
      },
      global: {
        stubs: {
          JvTabPanel
        }
      }
    })
    
    await wrapper.findAll('.jv-tabs-nav__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['tab2'])
  })
})
```

### Props 功能测试

```js
import { mount } from '@vue/test-utils'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

describe('JvTabs Props 功能', () => {
  it('vertical属性生效', () => {
    const wrapper = mount(JvTabs, {
      props: {
        vertical: true,
        modelValue: 'tab1'
      },
      slots: {
        default: [
          '<JvTabPanel value="tab1" name="标签1">内容1</JvTabPanel>',
          '<JvTabPanel value="tab2" name="标签2">内容2</JvTabPanel>'
        ]
      },
      global: {
        stubs: {
          JvTabPanel
        }
      }
    })
    
    expect(wrapper.classes()).toContain('jv-tabs--vertical')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })
  
  it('lazy属性生效', async () => {
    const wrapper = mount(JvTabs, {
      props: {
        lazy: true,
        modelValue: 'tab1'
      },
      slots: {
        default: [
          '<JvTabPanel value="tab1" name="标签1">内容1</JvTabPanel>',
          '<JvTabPanel value="tab2" name="标签2">内容2</JvTabPanel>'
        ]
      },
      global: {
        stubs: {
          JvTabPanel
        }
      }
    })
    
    // 激活tab1，内容应该被渲染
    expect(wrapper.findAll('.jv-tabs-panel')[0].text()).toBe('内容1')
    
    // tab2未激活，内容不应该被渲染
    expect(wrapper.findAll('.jv-tabs-panel')[1].text()).toBe('')
  })
})
```

## 使用示例

### 基础标签页

```vue
<template>
  <JvTabs v-model="activeTab">
    <JvTabPanel value="home" name="首页">
      <p>这是首页内容</p>
    </JvTabPanel>
    <JvTabPanel value="profile" name="个人资料">
      <p>这是个人资料内容</p>
    </JvTabPanel>
    <JvTabPanel value="settings" name="设置">
      <p>这是设置内容</p>
    </JvTabPanel>
  </JvTabs>
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

const activeTab = ref('home')
</script>
```

### 不同样式变体

```vue
<template>
  <div class="tabs-showcase">
    <h3>默认样式</h3>
    <JvTabs v-model="tab1" variant="default">
      <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
        {{ item.content }}
      </JvTabPanel>
    </JvTabs>
    
    <h3>分段式样式</h3>
    <JvTabs v-model="tab2" variant="segmented">
      <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
        {{ item.content }}
      </JvTabPanel>
    </JvTabs>
    
    <h3>胶囊式样式</h3>
    <JvTabs v-model="tab3" variant="pills">
      <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
        {{ item.content }}
      </JvTabPanel>
    </JvTabs>
    
    <h3>下划线式样式</h3>
    <JvTabs v-model="tab4" variant="underline">
      <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :name="item.label">
        {{ item.content }}
      </JvTabPanel>
    </JvTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

const tab1 = ref('tab1')
const tab2 = ref('tab1')
const tab3 = ref('tab1')
const tab4 = ref('tab1')

const items = [
  { value: 'tab1', label: '标签1', content: '这是标签1的内容' },
  { value: 'tab2', label: '标签2', content: '这是标签2的内容' },
  { value: 'tab3', label: '标签3', content: '这是标签3的内容' },
]
</script>
```

### 垂直布局标签页

```vue
<template>
  <JvTabs v-model="activeTab" vertical>
    <JvTabPanel value="general" name="常规设置">
      <h3>常规设置</h3>
      <p>这里是常规设置的选项表单</p>
    </JvTabPanel>
    <JvTabPanel value="security" name="安全设置">
      <h3>安全设置</h3>
      <p>这里是安全设置的选项表单</p>
    </JvTabPanel>
    <JvTabPanel value="notifications" name="通知设置">
      <h3>通知设置</h3>
      <p>这里是通知设置的选项表单</p>
    </JvTabPanel>
  </JvTabs>
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs, JvTabPanel } from '@/components/jv-tabs'

const activeTab = ref('general')
</script>
```

### 带图标的标签页

```vue
<template>
  <JvTabs v-model="activeTab" :items="tabItems" />
</template>

<script setup>
import { ref } from 'vue'
import { JvTabs } from '@/components/jv-tabs'

const activeTab = ref('home')
const tabItems = [
  { 
    value: 'home', 
    label: '首页', 
    icon: 'jv-icon-home',
    content: '欢迎来到首页' 
  },
  { 
    value: 'profile', 
    label: '个人资料', 
    icon: 'jv-icon-user',
    content: '这里是您的个人资料信息' 
  },
  { 
    value: 'messages', 
    label: '消息', 
    icon: 'jv-icon-message',
    badge: 5,
    content: '您有5条未读消息' 
  },
  { 
    value: 'settings', 
    label: '设置', 
    icon: 'jv-icon-settings',
    content: '系统设置选项' 
  }
]
</script>
``` 