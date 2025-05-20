# JvContainer 布局容器组件

## 组件介绍
`JvContainer` 是一个灵活的布局容器组件系统，使用CSS Grid布局实现响应式页面结构。它由一系列相互配合的组件组成：

- **JvContainer**: 基础容器，提供内容最大宽度限制和响应式边距，使用Grid布局管理子组件
- **JvHeader**: 页面顶部区域，可固定在视口顶部，对应gridArea: 'header'
- **JvAside**: 侧边栏区域，可作为导航菜单容器，可设置左侧栏(gridArea: 'left-aside')或右侧栏(gridArea: 'right-aside')
- **JvMain**: 主内容区域，对应gridArea: 'main'
- **JvFooter**: 页面底部区域，可固定在视口底部，对应gridArea: 'footer'

这些组件遵循现代布局最佳实践，使用CSS Grid构建，支持多种布局组合方式，适用于各种复杂的页面结构需求。

## 布局结构使用方式
布局容器组件支持多种灵活的组合方式：

### 基本容器
```vue
<template>
  <JvContainer :max-width="lg" spacing="md">
    <div>容器内容</div>
  </JvContainer>
</template>
```

### 经典布局 (上中下结构)
```vue
<template>
  <JvContainer gridTemplate='"header" auto "main" 1fr "footer" auto / 1fr' spacing="md">
    <JvHeader height="60">
      页面头部
    </JvHeader>
    
    <JvMain>
      主内容区域
    </JvMain>
    
    <JvFooter height="40">
      页面底部
    </JvFooter>
  </JvContainer>
</template>
```

### 带左侧边栏的布局
```vue
<template>
  <JvContainer gridTemplate='"header header" auto "left-aside main" 1fr "footer footer" auto / 200px 1fr' spacing="md">
    <JvHeader>
      页面头部
    </JvHeader>
    
    <JvAside position="left">
      侧边导航
    </JvAside>
    
    <JvMain>
      主内容区域
    </JvMain>
    
    <JvFooter>
      页面底部
    </JvFooter>
  </JvContainer>
</template>
```

### 双侧边栏布局
```vue
<template>
  <JvContainer gridTemplate='"header header header" auto "left-aside main right-aside" 1fr "footer footer footer" auto / 200px 1fr 200px' spacing="md">
    <JvHeader>页面头部</JvHeader>
    
    <JvAside position="left">左侧导航</JvAside>
    <JvMain>主内容区域</JvMain>
    <JvAside position="right">右侧信息栏</JvAside>
    
    <JvFooter>页面底部</JvFooter>
  </JvContainer>
</template>
```

### 自定义区域布局
```vue
<template>
  <JvContainer gridTemplate='"header header header" 60px "left-aside main right-aside" 1fr "left-aside footer footer" auto / 220px 1fr 180px' spacing="sm">
    <JvHeader>
      <div>页面头部</div>
    </JvHeader>
    
    <JvAside position="left">
      <div>左侧栏</div>
    </JvAside>
    
    <JvAside position="right">
      <div>右侧栏</div>
    </JvAside>
    
    <JvMain>
      <JvContainer gridTemplate='"section1 section2" 1fr "section3 section3" auto / 1fr 1fr' spacing="xs">
        <div style="grid-area: section1">区块1</div>
        <div style="grid-area: section2">区块2</div>
        <div style="grid-area: section3">区块3</div>
      </JvContainer>
    </JvMain>
    
    <JvFooter>
      <div>页面底部</div>
    </JvFooter>
  </JvContainer>
</template>
```

## 交互设计
- 容器组件支持响应式布局，根据屏幕尺寸自动调整间距
- 固定布局（fixed）使头部和底部保持在视口中
- 默认布局通过grid布局提供了一种直观的页面区域组织方式
- 双侧边栏布局支持左右侧边栏，更灵活地展示内容
- 使用内边距（padding）而非间隔（gap）控制组件间距，可设置不同大小的间距

## 可访问性
- 使用语义化HTML标签，如`<header>`, `<main>`, `<footer>`, `<aside>`等
- 可以通过tag属性自定义标签类型
- 良好的键盘导航支持

## Vue 组件 API

### JvContainer

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fluid | boolean | false | 是否使用流体容器（100%宽度） |
| maxWidth | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| false | 'lg' | 容器的最大宽度，对应的像素值：xs(444px)、sm(600px)、md(900px)、lg(1200px)、xl(1536px)、2xl(1920px) |
| tag | string | 'div' | 容器的HTML标签 |
| gridTemplate | string | '"header header header" auto "left-aside main right-aside" 1fr "left-aside footer footer" auto / auto 1fr auto' | CSS Grid布局模板，定义布局结构 |
| spacing | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | 设置容器子元素的内边距大小 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，容器内容 |

### JvHeader

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | number \| string | '60px' | 头部高度 |
| fixed | boolean | false | 是否固定在视口顶部 |
| tag | string | 'header' | 头部的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，头部内容 |

### JvAside

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| width | number \| string | 200 | 侧边栏宽度 |
| fixed | boolean | false | 是否固定在视口侧边 |
| position | 'left' \| 'right' | 'left' | 侧边栏位置，左侧或右侧 |
| breakpoint | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md' | 响应式断点，低于该断点时可隐藏 |
| tag | string | 'aside' | 侧边栏的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，侧边栏内容 |

### JvMain

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| padding | boolean | true | 是否应用内边距 |
| tag | string | 'main' | 主内容区的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，主内容区内容 |

### JvFooter

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | number \| string | 60 | 底部高度 |
| fixed | boolean | false | 是否固定在视口底部 |
| tag | string | 'footer' | 底部的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，底部内容 |

## 测试用例

### 基础功能测试
- 测试组件实例渲染
- 测试默认插槽内容

### Props 功能测试
- 测试 gridTemplate 属性应用
- 测试 maxWidth 属性是否正确应用
- 测试 fixed 属性是否正确生效
- 测试 height/width 属性是否按预期设置
- 测试 position 属性是否正确控制侧边栏位置
- 测试 spacing 属性是否正确控制内边距

### 布局组合测试
- 测试基本的上中下布局
- 测试带侧边栏的布局
- 测试双侧边栏布局
- 测试多区域自定义布局

### 样式测试
- 测试基本样式应用
- 测试响应式布局效果

### 可访问性测试
- 测试语义化HTML结构

## 使用示例

### 标准布局
```vue
<template>
  <JvContainer spacing="md">
    <JvHeader>
      <h1>页面标题</h1>
      <nav>
        <a href="/">首页</a>
        <a href="/about">关于</a>
        <a href="/contact">联系我们</a>
      </nav>
    </JvHeader>
    
    <JvAside position="left">
      <nav>
        <ul>
          <li><a href="/dashboard">仪表盘</a></li>
          <li><a href="/profile">个人资料</a></li>
          <li><a href="/settings">设置</a></li>
        </ul>
      </nav>
    </JvAside>
    
    <JvMain>
      <h2>主内容区域</h2>
      <p>这里是页面的主要内容...</p>
    </JvMain>
    
    <JvFooter>
      <p>© 2023 JovalUI. 保留所有权利。</p>
    </JvFooter>
  </JvContainer>
</template>
```

### 双侧边栏布局
```vue
<template>
  <JvContainer gridTemplate='"header header header" auto "left-aside main right-aside" 1fr "footer footer footer" auto / 200px 1fr 180px' spacing="sm">
    <JvHeader>
      <div class="logo">管理中心</div>
      <div class="user-menu">用户菜单</div>
    </JvHeader>
    
    <JvAside position="left">
      <div class="nav-menu">
        <div class="nav-item">控制台</div>
        <div class="nav-item">用户管理</div>
        <div class="nav-item">内容管理</div>
      </div>
    </JvAside>
    
    <JvMain>
      <div class="content-panel">
        <h1>控制台</h1>
        <p>主要内容区域，显示核心数据和操作界面</p>
      </div>
    </JvMain>
    
    <JvAside position="right">
      <div class="info-panel">
        <div class="info-item">系统公告</div>
        <div class="info-item">待办事项</div>
        <div class="info-item">快捷操作</div>
      </div>
    </JvAside>
    
    <JvFooter>
      <p>© 2023 管理系统. 版权所有</p>
    </JvFooter>
  </JvContainer>
</template>
```

### 自定义网格布局
```vue
<template>
  <JvContainer gridTemplate='"header header header" auto "nav content sidebar" 1fr "footer footer footer" auto / 200px 1fr 200px' spacing="md">
    <header style="grid-area: header">页面头部</header>
    <nav style="grid-area: nav">导航菜单</nav>
    <main style="grid-area: content">主内容</main>
    <aside style="grid-area: sidebar">侧边栏</aside>
    <footer style="grid-area: footer">页面底部</footer>
  </JvContainer>
</template>
```

### 响应式管理面板布局
```vue
<template>
  <JvContainer gridTemplate='"header header header" auto "left-aside main right-aside" 1fr / 240px 1fr 180px' spacing="lg">
    <JvHeader>
      <div class="logo">管理面板</div>
      <div class="user-info">管理员</div>
    </JvHeader>
    
    <JvAside position="left" width="240">
      <div class="sidebar-menu">
        <div class="menu-item">仪表盘</div>
        <div class="menu-item">用户管理</div>
        <div class="menu-item">内容管理</div>
        <div class="menu-item">系统设置</div>
      </div>
    </JvAside>
    
    <JvMain>
      <JvContainer spacing="md">
        <div class="content-card">
          <h2>欢迎使用管理面板</h2>
          <p>这是基于Grid布局的响应式管理界面</p>
        </div>
        
        <div class="dashboard-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
          <div class="stat-card">访问统计</div>
          <div class="stat-card">用户统计</div>
          <div class="stat-card">收入统计</div>
          <div class="stat-card">活动统计</div>
        </div>
      </JvContainer>
    </JvMain>
    
    <JvAside position="right" width="180">
      <div class="info-panel">
        <h3>通知中心</h3>
        <div class="notice-item">系统更新</div>
        <div class="notice-item">新消息(3)</div>
        <div class="notice-item">待办事项</div>
      </div>
    </JvAside>
  </JvContainer>
</template>
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

这些测试全面覆盖了JvContainer及其子组件的功能，确保组件在各种配置下都能正确渲染和工作。测试用例设计合理，每个测试都专注于一个特定的功能点，使测试结果清晰明确。测试覆盖了以下方面：

1. 基本渲染和插槽
2. 属性设置和默认值
3. 格网布局结构
4. 样式应用
5. 生命周期钩子
6. 组件嵌套使用场景 