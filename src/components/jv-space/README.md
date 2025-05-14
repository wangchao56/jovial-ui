# JvSpace 间距组件

## 组件介绍
`JvSpace` 是一个简单而实用的布局组件，用于控制子元素之间的间距。它提供水平或垂直方向上的均匀间隔，避免了手动设置 margin 的繁琐。这个组件适用于需要在一组元素之间添加一致间距的场景，如表单控件、按钮组、内联元素等。

主要功能特点：
- 支持水平和垂直排列方向
- 可设置不同大小的间距，支持自定义像素值
- 支持水平和垂直方向不同间距
- 支持元素自动换行
- 灵活的对齐方式设置

## 布局结构使用方式
组件采用 Flexbox 布局实现，结构简单直观：

```vue
<template>
  <!-- 基础使用 -->
  <JvSpace>
    <div>元素1</div>
    <div>元素2</div>
    <div>元素3</div>
  </JvSpace>
  
  <!-- 垂直方向 -->
  <JvSpace direction="vertical">
    <div>元素1</div>
    <div>元素2</div>
    <div>元素3</div>
  </JvSpace>
  
  <!-- 自定义间距 -->
  <JvSpace :gap="16">
    <div>元素1</div>
    <div>元素2</div>
    <div>元素3</div>
  </JvSpace>
  
  <!-- 水平垂直不同间距 -->
  <JvSpace :gap="[16, 8]">
    <div>元素1</div>
    <div>元素2</div>
    <div>元素3</div>
  </JvSpace>
</template>
```

## 交互设计
组件提供了多个属性来控制元素间的布局和交互：

- **方向控制**：通过 `direction` 属性控制元素的排列方向（水平或垂直）
- **间距大小**：通过 `gap` 属性设置元素之间的间距大小
- **对齐方式**：通过 `align` 属性控制垂直对齐方式（顶部对齐、居中对齐、底部对齐或基线对齐）
- **主轴对齐**：通过 `justify` 属性控制主轴上的对齐方式
- **自动换行**：通过 `wrap` 属性控制元素是否自动换行
- **宽度填充**：通过 `fill` 属性控制是否填充父容器宽度

这些控制选项使组件能够适应各种布局需求，特别适合构建表单、工具栏、菜单等 UI 元素。

## 可访问性
组件遵循 WCAG 无障碍标准设计：

- **语义化结构**：默认使用 `role="group"` 属性，提供语义化信息
- **ARIA 属性**：支持 `aria-label`、`aria-labelledby` 和 `aria-describedby` 属性，提高屏幕阅读器兼容性
- **方向指示**：使用 `aria-orientation` 属性指示布局方向
- **键盘导航**：保持子元素的原有焦点行为，支持键盘导航
- **视觉间距**：提供充分的视觉间距，提高可读性和可用性

## Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gap | number \| [number, number] | 8 | 间距大小，单位为像素。可以是单个数字（水平和垂直使用相同间距）或数组 [水平间距, 垂直间距] |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 排列方向 |
| align | 'start' \| 'end' \| 'center' \| 'baseline' | 'start' | 对齐方式，当 direction 为 horizontal 时生效 |
| justify | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' | undefined | 主轴对齐方式 |
| wrap | boolean | false | 是否自动换行，仅在 direction 为 horizontal 时有效 |
| fill | boolean | false | 是否填充父容器宽度 |
| role | string | 'group' | ARIA 角色属性 |
| ariaLabel | string | undefined | ARIA 标签 |
| ariaLabelledby | string | undefined | 指向标签元素 ID 的引用 |
| ariaDescribedby | string | undefined | 指向描述元素 ID 的引用 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，放置需要添加间距的子元素 |

## 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SP-001 | 基础渲染 | 验证组件基本渲染 | 1. 挂载JvSpace<br>2. 检查DOM结构 | 组件应正确渲染 | ✅ |
| SP-002 | 子元素渲染 | 验证子元素内容渲染 | 1. 挂载带子元素的JvSpace<br>2. 检查子元素渲染 | 子元素应正确显示 | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SP-101 | 间距设置 | 验证gap属性效果 | 1. 设置不同gap值<br>2. 检查计算样式 | 间距应符合设置值 | ✅ |
| SP-102 | 方向设置 | 验证direction属性效果 | 1. 设置direction="vertical"<br>2. 检查flex-direction | 应为column布局 | ✅ |
| SP-103 | 对齐方式 | 验证align属性效果 | 1. 设置不同align值<br>2. 检查align-items | 对齐方式应符合设置 | ✅ |
| SP-104 | 主轴对齐 | 验证justify属性效果 | 1. 设置不同justify值<br>2. 检查justify-content | 主轴对齐应符合设置 | ✅ |
| SP-105 | 自动换行 | 验证wrap属性效果 | 1. 设置wrap=true<br>2. 检查flex-wrap | 应启用换行 | ✅ |
| SP-106 | 宽度填充 | 验证fill属性效果 | 1. 设置fill=true<br>2. 检查宽度 | 宽度应为100% | ✅ |
| SP-107 | 复合间距 | 验证数组形式gap效果 | 1. 设置gap=[16, 8]<br>2. 检查行列间距 | 应有不同的行列间距 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| SP-201 | ARIA属性 | 验证ARIA属性设置 | 1. 设置role和aria属性<br>2. 检查DOM属性 | ARIA属性应正确设置 | ✅ |
| SP-202 | 键盘导航 | 验证键盘导航支持 | 1. 添加可聚焦元素<br>2. 测试Tab键导航 | 应能正常导航 | ✅ |
| SP-203 | 方向属性 | 验证aria-orientation | 1. 切换direction<br>2. 检查aria-orientation | 应随方向变化 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvSpace>
    <JvButton>按钮1</JvButton>
    <JvButton>按钮2</JvButton>
    <JvButton>按钮3</JvButton>
  </JvSpace>
</template>
```

### 垂直间距
```vue
<template>
  <JvSpace direction="vertical" :gap="16">
    <JvInput placeholder="请输入用户名" />
    <JvInput placeholder="请输入密码" type="password" />
    <JvButton color-type="primary">登录</JvButton>
  </JvSpace>
</template>
```

### 自定义间距
```vue
<template>
  <JvSpace :gap="24">
    <JvCard title="卡片1">内容1</JvCard>
    <JvCard title="卡片2">内容2</JvCard>
    <JvCard title="卡片3">内容3</JvCard>
  </JvSpace>
</template>
```

### 对齐方式
```vue
<template>
  <div>
    <JvSpace align="center" :gap="16">
      <div style="height: 50px; width: 50px; background-color: #ddd;">50px</div>
      <div style="height: 80px; width: 60px; background-color: #ccc;">80px</div>
      <div style="height: 40px; width: 70px; background-color: #bbb;">40px</div>
    </JvSpace>
    
    <div style="margin-top: 20px;">
      <JvSpace align="end" :gap="16">
        <div style="height: 50px; width: 50px; background-color: #ddd;">50px</div>
        <div style="height: 80px; width: 60px; background-color: #ccc;">80px</div>
        <div style="height: 40px; width: 70px; background-color: #bbb;">40px</div>
      </JvSpace>
    </div>
  </div>
</template>
```

### 主轴对齐
```vue
<template>
  <div>
    <JvSpace justify="center" style="background-color: #f5f5f5; padding: 10px;">
      <JvButton>居中按钮</JvButton>
    </JvSpace>
    
    <div style="margin-top: 10px;">
      <JvSpace justify="space-between" style="background-color: #f5f5f5; padding: 10px;">
        <JvButton>左侧按钮</JvButton>
        <JvButton>右侧按钮</JvButton>
      </JvSpace>
    </div>
  </div>
</template>
```

### 自动换行
```vue
<template>
  <JvSpace :gap="[10, 16]" wrap style="width: 300px; background-color: #f5f5f5; padding: 10px;">
    <JvButton v-for="i in 10" :key="i">按钮{{ i }}</JvButton>
  </JvSpace>
</template>
```

### 结合表单使用
```vue
<template>
  <JvSpace direction="vertical" :gap="20" fill>
    <h3>用户注册</h3>
    
    <JvSpace direction="vertical" :gap="16" fill>
      <JvSpace :gap="8" align="center">
        <label style="width: 80px; text-align: right;">用户名：</label>
        <JvInput placeholder="请输入用户名" style="flex: 1;" />
      </JvSpace>
      
      <JvSpace :gap="8" align="center">
        <label style="width: 80px; text-align: right;">密码：</label>
        <JvInput type="password" placeholder="请输入密码" style="flex: 1;" />
      </JvSpace>
      
      <JvSpace :gap="8" align="center">
        <label style="width: 80px; text-align: right;">确认密码：</label>
        <JvInput type="password" placeholder="请再次输入密码" style="flex: 1;" />
      </JvSpace>
    </JvSpace>
    
    <JvSpace justify="end" :gap="16">
      <JvButton>取消</JvButton>
      <JvButton color-type="primary">注册</JvButton>
    </JvSpace>
  </JvSpace>
</template>
```