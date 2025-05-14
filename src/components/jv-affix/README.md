# JvAffix 固钉组件

## 组件介绍

JvAffix（固钉）组件用于将内容固定在页面的特定位置，常用于导航栏、侧边栏等需要在滚动时保持可见的场景。

## 布局结构使用方式

JvAffix 组件允许通过插槽包裹任意内容，并通过配置决定其固定行为。组件会监听滚动事件，当滚动位置满足固定条件时，将内容固定在指定位置。

基本使用示例：

```vue
<template>
  <JvAffix :top="100">
    <div class="demo-content">固定在距离顶部 100px 的位置</div>
  </JvAffix>
</template>
```

## 交互设计

JvAffix 组件的主要交互特性：

1. **自动固定**：当页面滚动到指定条件时，自动将内容固定在页面的特定位置
2. **事件通知**：固定状态改变时会触发 `change` 事件，滚动时会触发 `scroll` 事件
3. **手动更新**：提供 `updatePosition` 和 `refresh` 方法，用于手动更新固定状态和位置

## 可访问性

JvAffix 组件在开发时考虑了以下可访问性特性：

1. 保持原始内容的结构和语义，仅改变定位方式
2. 固定内容时不会影响键盘导航和屏幕阅读器的使用

## Vue 组件 API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| top | 距离窗口顶部的偏移量（单位：像素） | `number` | `undefined` |
| bottom | 距离窗口底部的偏移量（单位：像素） | `number` | `undefined` |
| left | 距离窗口左侧的偏移量（单位：像素） | `number` | `undefined` |
| right | 距离窗口右侧的偏移量（单位：像素） | `number` | `undefined` |
| target | 指定固钉的容器元素 | `'window' \| 'body' \| HTMLElement` | `'window'` |
| zIndex | 固定时的 z-index | `number` | `100` |
| placement | 固定的定位方式 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

### Emits

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 固钉状态改变时触发 | `(fixed: boolean) => void` |
| scroll | 滚动时触发 | `(event: Event, scrollInfo: { scrollTop: number, fixed: boolean }) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 固钉内容 |

### Expose

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| updatePosition | 手动更新固钉位置 | - |
| refresh | 刷新固钉状态和位置 | - |

## 测试用例

### 基础功能测试

```js
it('测试基础渲染', () => {
  const wrapper = mount(JvAffix)
  expect(wrapper.classes()).toContain('jv-affix')
})

it('测试默认插槽', () => {
  const wrapper = mount(JvAffix, {
    slots: {
      default: '<div class="test-content">测试内容</div>'
    }
  })
  expect(wrapper.find('.test-content').exists()).toBe(true)
})
```

### Props 功能测试

```js
it('测试 top 属性', async () => {
  const wrapper = mount(JvAffix, {
    props: { top: 50 }
  })
  
  // 模拟滚动以触发固定
  await wrapper.vm.updatePosition()
  wrapper.vm.fixed = true
  await nextTick()
  
  const style = wrapper.find('.jv-affix > div > div').attributes('style')
  expect(style).toContain('top: 50px')
})

it('测试 zIndex 属性', async () => {
  const wrapper = mount(JvAffix, {
    props: { zIndex: 200 }
  })
  
  // 模拟滚动以触发固定
  wrapper.vm.fixed = true
  await nextTick()
  
  const style = wrapper.find('.jv-affix > div > div').attributes('style')
  expect(style).toContain('z-index: 200')
})

it('测试 placement 属性', async () => {
  const wrapper = mount(JvAffix, {
    props: { 
      placement: 'bottom',
      bottom: 20
    }
  })
  
  // 模拟滚动以触发固定
  wrapper.vm.fixed = true
  await nextTick()
  
  const style = wrapper.find('.jv-affix > div > div').attributes('style')
  expect(style).toContain('bottom: 20px')
})
```

### Emits 事件测试

```js
it('测试 change 事件', async () => {
  const wrapper = mount(JvAffix)
  const updatePositionSpy = vi.spyOn(wrapper.vm, 'updatePosition')
  
  // 模拟状态变化
  wrapper.vm.fixed = false
  await wrapper.vm.updatePosition()
  wrapper.vm.fixed = true
  
  expect(wrapper.emitted('change')).toBeTruthy()
  expect(wrapper.emitted('change')[0]).toEqual([true])
})

it('测试 scroll 事件', async () => {
  const wrapper = mount(JvAffix)
  
  // 模拟滚动
  await wrapper.vm.updatePosition()
  
  expect(wrapper.emitted('scroll')).toBeTruthy()
  expect(wrapper.emitted('scroll')[0][1]).toHaveProperty('scrollTop')
  expect(wrapper.emitted('scroll')[0][1]).toHaveProperty('fixed')
})
```

### Slots 插槽测试

```js
it('测试默认插槽渲染', () => {
  const wrapper = mount(JvAffix, {
    slots: {
      default: '<button>测试按钮</button>'
    }
  })
  
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.find('button').text()).toBe('测试按钮')
})
```

### Expose API 测试

```js
it('测试 updatePosition 方法', async () => {
  const wrapper = mount(JvAffix)
  const updatePositionSpy = vi.spyOn(wrapper.vm, 'updatePosition')
  
  wrapper.vm.updatePosition()
  expect(updatePositionSpy).toHaveBeenCalled()
})

it('测试 refresh 方法', async () => {
  const wrapper = mount(JvAffix)
  const refreshSpy = vi.spyOn(wrapper.vm, 'refresh')
  const updatePositionSpy = vi.spyOn(wrapper.vm, 'updatePosition')
  
  await wrapper.vm.refresh()
  expect(refreshSpy).toHaveBeenCalled()
  expect(updatePositionSpy).toHaveBeenCalled()
})
```

### 样式测试

```js
it('测试固定状态下的样式类', async () => {
  const wrapper = mount(JvAffix)
  
  // 初始状态
  expect(wrapper.classes()).toContain('jv-affix')
  expect(wrapper.classes()).not.toContain('jv-affix--fixed')
  
  // 固定状态
  wrapper.vm.fixed = true
  await nextTick()
  
  expect(wrapper.classes()).toContain('is-fixed')
})
```

### 可访问性测试

```js
it('测试可访问性', () => {
  const wrapper = mount(JvAffix, {
    slots: {
      default: '<button>可访问性测试</button>'
    }
  })
  
  // 检查按钮仍然可以聚焦
  const button = wrapper.find('button')
  expect(button.attributes('tabindex')).not.toBe('-1')
})
```

## 使用示例

### 基础用法

```vue
<template>
  <div class="demo-container">
    <JvAffix :top="100">
      <div class="demo-content">
        固定在距离顶部 100px 的位置
      </div>
    </JvAffix>
  </div>
</template>

<style>
.demo-container {
  height: 200vh; /* 创建滚动条 */
}
.demo-content {
  padding: 10px;
  background: #409eff;
  color: white;
  text-align: center;
}
</style>
```

### 多方向固定

```vue
<template>
  <div class="demo-container">
    <JvAffix :top="100">
      <div class="demo-content">固定在顶部</div>
    </JvAffix>
    
    <div style="height: 50vh;"></div>
    
    <JvAffix :bottom="100" placement="bottom">
      <div class="demo-content">固定在底部</div>
    </JvAffix>
  </div>
</template>
```

### 监听事件

```vue
<template>
  <div class="demo-container">
    <JvAffix 
      :top="100" 
      @change="onFixedChange"
      @scroll="onScroll"
    >
      <div class="demo-content">
        {{ fixed ? '已固定' : '未固定' }}
      </div>
    </JvAffix>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fixed = ref(false)

const onFixedChange = (isFixed) => {
  fixed.value = isFixed
  console.log('固定状态变化:', isFixed)
}

const onScroll = (event, { scrollTop, fixed }) => {
  console.log('滚动位置:', scrollTop, '固定状态:', fixed)
}
</script>
```

### 自定义容器

```vue
<template>
  <div class="custom-container" ref="containerRef">
    <div style="height: 200vh; padding: 20px;">
      <JvAffix :top="20" :target="containerRef">
        <div class="demo-content">
          固定在自定义容器内
        </div>
      </JvAffix>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const containerRef = ref(null)
</script>

<style>
.custom-container {
  height: 400px;
  overflow: auto;
  border: 1px solid #ddd;
}
</style>
```

### 手动控制

```vue
<template>
  <div class="demo-container">
    <button @click="updatePosition">更新位置</button>
    <button @click="refresh">刷新状态</button>
    
    <JvAffix :top="100" ref="affixRef">
      <div class="demo-content">
        可以通过按钮手动控制
      </div>
    </JvAffix>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const affixRef = ref(null)

const updatePosition = () => {
  affixRef.value.updatePosition()
}

const refresh = () => {
  affixRef.value.refresh()
}
</script>
```

## 测试技术说明

在测试中，我们使用了以下技术和方法：

- 使用 `mount` 函数创建组件实例
- 使用 `find` 方法查找DOM元素
- 使用 `classes`、`attributes` 和 `text` 方法检查元素属性
- 使用 `props` 方法检查组件属性
- 使用 `emitted` 方法检查事件触发情况
- 使用 `vi.fn()` 模拟DOM方法和事件监听器
- 使用 `Object.defineProperty` 模拟浏览器环境属性

## 测试覆盖范围

这些测试全面覆盖了JvAffix组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。测试覆盖了以下方面：

1. 基本渲染和插槽
2. 属性设置和默认值
3. 固定状态逻辑
4. 事件触发
5. 样式应用
6. 生命周期钩子
7. 暴露的方法
