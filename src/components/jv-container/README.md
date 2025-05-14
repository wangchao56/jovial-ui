# JvContainer 布局容器组件

## 组件介绍
`JvContainer` 是一个灵活的布局容器组件系统，用于创建响应式的页面布局结构。它由一系列相互配合的组件组成：

- **JvContainer**: 基础容器，提供内容最大宽度限制和响应式边距
- **JvHeader**: 页面顶部区域，可固定在视口顶部
- **JvAside**: 侧边栏区域，可作为导航菜单容器
- **JvMain**: 主内容区域，占据剩余空间
- **JvFooter**: 页面底部区域，可固定在视口底部

这些组件遵循现代布局最佳实践，使用 Flexbox 构建，支持多种布局组合方式，适用于各种复杂的页面结构需求。

## 布局结构使用方式
布局容器组件支持多种灵活的组合方式：

### 基本容器
```vue
<template>
  <JvContainer :max-width="lg">
    <div>容器内容</div>
  </JvContainer>
</template>
```

### 经典布局 (上中下结构)
```vue
<template>
  <div style="height: 100vh; display: flex; flex-direction: column;">
    <JvHeader height="60">
      页面头部
    </JvHeader>
    
    <JvMain>
      主内容区域
    </JvMain>
    
    <JvFooter height="40">
      页面底部
    </JvFooter>
  </div>
</template>
```

### 侧边栏布局
```vue
<template>
  <div style="height: 100vh; display: flex;">
    <JvAside width="200">
      侧边导航
    </JvAside>
    
    <div style="flex: 1; display: flex; flex-direction: column;">
      <JvHeader>
        页面头部
      </JvHeader>
      
      <JvMain>
        主内容区域
      </JvMain>
      
      <JvFooter>
        页面底部
      </JvFooter>
    </div>
  </div>
</template>
```

### 复杂布局 (含侧边栏的上中下结构)
```vue
<template>
  <div style="height: 100vh; display: flex; flex-direction: column;">
    <JvHeader>
      页面头部
    </JvHeader>
    
    <div style="flex: 1; display: flex;">
      <JvAside>
        侧边导航
      </JvAside>
      
      <JvMain>
        <JvContainer>
          主内容区域
        </JvContainer>
      </JvMain>
    </div>
    
    <JvFooter>
      页面底部
    </JvFooter>
  </div>
</template>
```

## 交互设计
布局组件系统提供以下交互特性：

### JvContainer
- **响应式行为**：根据不同屏幕尺寸自动调整内边距
- **最大宽度限制**：提供多个断点的最大宽度选项（xs, sm, md, lg, xl, 2xl）
- **流体模式**：可设置为流体容器（100%宽度）

### JvHeader
- **固定定位**：可固定在视口顶部，页面滚动时保持可见
- **高度自定义**：支持自定义高度
- **z-index控制**：固定时具有适当的层级，保证在其他内容之上

### JvAside
- **响应式行为**：支持在不同断点隐藏/显示
- **固定定位**：可固定在视口左侧
- **宽度自定义**：支持自定义宽度

### JvMain
- **自动填充**：自动占据剩余空间
- **内边距控制**：可选择是否应用内边距
- **溢出处理**：自动处理内容溢出，提供滚动功能

### JvFooter
- **固定定位**：可固定在视口底部
- **高度自定义**：支持自定义高度

## 可访问性
布局容器组件系统遵循以下可访问性原则：

- **语义化标签**：默认使用语义化HTML标签（header, aside, main, footer），也支持自定义标签
- **结构清晰**：提供清晰的页面结构，便于屏幕阅读器理解内容组织
- **键盘导航**：固定布局元素不会影响键盘导航和焦点管理
- **可自定义颜色**：支持通过CSS变量自定义颜色，可实现高对比度样式
- **响应式设计**：适应不同屏幕尺寸，提供良好的移动设备体验

## Vue 组件 API

### JvContainer

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fluid | boolean | false | 是否使用流体容器（100%宽度） |
| maxWidth | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| false | 'lg' | 容器的最大宽度，对应的像素值：xs(444px)、sm(600px)、md(900px)、lg(1200px)、xl(1536px)、2xl(1920px) |
| tag | string | 'div' | 容器的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，容器内容 |

### JvHeader

#### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | number \| string | 60 | 头部高度，单位为像素 |
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
| width | number \| string | 200 | 侧边栏宽度，单位为像素 |
| fixed | boolean | false | 是否固定在视口左侧 |
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
| height | number \| string | 60 | 底部高度，单位为像素 |
| fixed | boolean | false | 是否固定在视口底部 |
| tag | string | 'footer' | 底部的HTML标签 |

#### Slots
| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，底部内容 |

## 测试用例

### JvContainer 测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CT-001 | 基础渲染 | 验证容器基本渲染 | 1. 挂载JvContainer<br>2. 检查DOM结构 | 1. 组件应正确渲染<br>2. 应具有正确的class | ✅ |
| CT-002 | 内容渲染 | 验证容器内容渲染 | 1. 挂载JvContainer并设置内容<br>2. 检查内容渲染 | 内容应正确显示 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| CT-101 | fluid属性 | 验证fluid模式 | 1. 设置fluid=true<br>2. 检查样式 | 容器宽度应为100% | ✅ |
| CT-102 | maxWidth属性 | 验证不同maxWidth值 | 1. 设置不同的maxWidth值<br>2. 检查最大宽度 | 最大宽度应符合设置 | ✅ |
| CT-103 | tag属性 | 验证自定义标签 | 1. 设置tag='section'<br>2. 检查渲染的HTML标签 | 应渲染为section标签 | ✅ |

### JvHeader 测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| HD-001 | 基础渲染 | 验证头部基本渲染 | 1. 挂载JvHeader<br>2. 检查DOM结构 | 1. 组件应正确渲染<br>2. 应渲染为header标签 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| HD-101 | height属性 | 验证高度设置 | 1. 设置height=80<br>2. 检查高度样式 | 高度应为80px | ✅ |
| HD-102 | fixed属性 | 验证固定定位 | 1. 设置fixed=true<br>2. 检查position样式 | 定位应为fixed | ✅ |

### JvAside 测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AS-001 | 基础渲染 | 验证侧边栏基本渲染 | 1. 挂载JvAside<br>2. 检查DOM结构 | 1. 组件应正确渲染<br>2. 应渲染为aside标签 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| AS-101 | width属性 | 验证宽度设置 | 1. 设置width=250<br>2. 检查宽度样式 | 宽度应为250px | ✅ |
| AS-102 | fixed属性 | 验证固定定位 | 1. 设置fixed=true<br>2. 检查position样式 | 定位应为fixed | ✅ |

### JvMain 测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-001 | 基础渲染 | 验证主内容区基本渲染 | 1. 挂载JvMain<br>2. 检查DOM结构 | 1. 组件应正确渲染<br>2. 应渲染为main标签 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| MN-101 | padding属性 | 验证内边距设置 | 1. 设置padding=false<br>2. 检查padding样式 | 不应应用内边距 | ✅ |

### JvFooter 测试

#### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| FT-001 | 基础渲染 | 验证底部基本渲染 | 1. 挂载JvFooter<br>2. 检查DOM结构 | 1. 组件应正确渲染<br>2. 应渲染为footer标签 | ✅ |

#### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| FT-101 | height属性 | 验证高度设置 | 1. 设置height=50<br>2. 检查高度样式 | 高度应为50px | ✅ |
| FT-102 | fixed属性 | 验证固定定位 | 1. 设置fixed=true<br>2. 检查position样式 | 定位应为fixed | ✅ |

## 使用示例

### 基础容器
```vue
<template>
  <JvContainer :max-width="md">
    <div class="content-box">
      <h2>基础容器</h2>
      <p>这是一个最大宽度为900px的容器</p>
    </div>
  </JvContainer>
</template>

<style scoped>
.content-box {
  padding: 20px;
  background-color: var(--jv-theme-surface);
  border-radius: 4px;
}
</style>
```

### 流体容器
```vue
<template>
  <JvContainer fluid>
    <div class="content-box">
      <h2>流体容器</h2>
      <p>这个容器会占据100%的宽度</p>
    </div>
  </JvContainer>
</template>

<style scoped>
.content-box {
  padding: 20px;
  background-color: var(--jv-theme-surface);
  border-radius: 4px;
}
</style>
```

### 经典上中下布局
```vue
<template>
  <div class="layout-container">
    <JvHeader height="60" class="demo-header">
      <h2>页面头部</h2>
    </JvHeader>
    
    <JvMain class="demo-main">
      <JvContainer>
        <h3>主内容区域</h3>
        <p>这里是页面的主要内容</p>
      </JvContainer>
    </JvMain>
    
    <JvFooter height="50" class="demo-footer">
      <p>页面底部 © 2023</p>
    </JvFooter>
  </div>
</template>

<script setup>
// 组件引入
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.demo-header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.demo-main {
  flex: 1;
}

.demo-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
}
</style>
```

### 带侧边栏的布局
```vue
<template>
  <div class="layout-container">
    <JvHeader height="60" class="demo-header">
      <h2>页面头部</h2>
    </JvHeader>
    
    <div class="layout-content">
      <JvAside width="220" class="demo-aside">
        <h3>侧边栏</h3>
        <div class="nav-item">首页</div>
        <div class="nav-item">列表页</div>
        <div class="nav-item">详情页</div>
        <div class="nav-item">设置</div>
      </JvAside>
      
      <JvMain class="demo-main">
        <JvContainer>
          <h3>主内容区域</h3>
          <p>这里是页面的主要内容</p>
        </JvContainer>
      </JvMain>
    </div>
    
    <JvFooter height="50" class="demo-footer">
      <p>页面底部 © 2023</p>
    </JvFooter>
  </div>
</template>

<script setup>
// 组件引入
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.demo-header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.demo-aside {
  padding: 20px;
  background-color: var(--jv-theme-surface-variant);
  border-right: 1px solid #eee;
}

.nav-item {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.demo-main {
  flex: 1;
  overflow: auto;
}

.demo-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
}
</style>
```

### 具有固定头部和侧边栏的布局
```vue
<template>
  <div class="layout-container">
    <JvHeader height="60" fixed class="demo-header">
      <div class="header-content">
        <h2>固定头部</h2>
        <div class="actions">
          <button>登录</button>
          <button>注册</button>
        </div>
      </div>
    </JvHeader>
    
    <div class="layout-body">
      <JvAside width="220" fixed class="demo-aside">
        <div class="aside-content">
          <h3>固定侧边栏</h3>
          <div class="nav-item">首页</div>
          <div class="nav-item active">控制台</div>
          <div class="nav-item">用户管理</div>
          <div class="nav-item">系统设置</div>
        </div>
      </JvAside>
      
      <JvMain class="demo-main" style="margin-left: 220px; margin-top: 60px;">
        <JvContainer>
          <div class="content-card">
            <h3>内容区域</h3>
            <p>这里是主要内容，有固定头部和侧边栏。滚动时，头部和侧边栏位置保持不变。</p>
            
            <!-- 添加额外内容使其可滚动 -->
            <div v-for="i in 20" :key="i" class="demo-card">
              演示卡片 {{ i }}
            </div>
          </div>
        </JvContainer>
      </JvMain>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.layout-body {
  display: flex;
}

.demo-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 6px 12px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #ddd;
  cursor: pointer;
}

.demo-aside {
  padding-top: 60px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

.aside-content {
  padding: 20px;
}

.nav-item {
  padding: 10px 15px;
  margin: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(0, 0, 0, 0.08);
}

.nav-item.active {
  font-weight: bold;
}

.demo-main {
  flex: 1;
  padding: 20px;
}

.content-card {
  background-color: var(--jv-theme-surface);
  border-radius: 8px;
  padding: 20px;
}

.demo-card {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style> 