# Jovial UI

一个优雅、易用的Vue 3组件库，提供丰富的组件和工具类样式，适用于快速构建现代化Web应用。

## 特性

- 🧩 **20+ 组件** - 包含丰富的UI组件，覆盖各种常见场景
- 🎨 **主题定制** - 支持亮色/暗色主题和自定义主题
- 🚀 **按需加载** - 支持完整引入和按需引入，优化应用体积
- 💪 **TypeScript** - 使用TypeScript开发，提供完整类型支持
- 📦 **工具类** - 丰富的CSS工具类，快速构建页面
- 📱 **响应式设计** - 自适应各种屏幕尺寸

## 安装

```bash
# NPM
npm install jovial-ui

# Yarn
yarn add jovial-ui

# PNPM
pnpm add jovial-ui
```

## 使用方法

### 全量引入

```js
import { createApp } from 'vue'
import JovialUI from 'jovial-ui'
import 'jovial-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(JovialUI)
app.mount('#app')
```

### 按需引入

```js
import { createApp } from 'vue'
import { JvButton, JvCard, JvInput } from 'jovial-ui'
import 'jovial-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('JvButton', JvButton)
app.component('JvCard', JvCard)
app.component('JvInput', JvInput)
app.mount('#app')
```

## 主题设置

Jovial UI支持亮色和暗色主题，同时提供高对比度版本。

```js
// 引入亮色主题 (默认)
import 'jovial-ui/theme/styles/css/light.css'

// 引入暗色主题
import 'jovial-ui/theme/styles/css/dark.css'

// 引入高对比度亮色主题
import 'jovial-ui/theme/styles/css/light-hc.css'

// 引入高对比度暗色主题
import 'jovial-ui/theme/styles/css/dark-hc.css'
```


```

import type { App } from 'vue'
import * as components from '@/components/components'
import { createJovialUI } from '@/core/framework'

// 测试
const jovial = createJovialUI({
  components,
  locale: {
    locale: 'zh-Hans',
  },
})


// 添加全局组件库
app.use(Jovial)


```
## 组件列表

Jovial UI提供了丰富的组件，包括但不限于：

- JvAffix - 固钉
- JvAvatar - 头像
- JvBadge - 徽章
- JvButton - 按钮
- JvCard - 卡片
- JvCheckbox - 复选框
- JvCollapse - 折叠面板
- JvContainer - 容器
- JvDivider - 分割线
- JvDrawer - 抽屉
- JvDropdown - 下拉菜单
- JvFlex - 弹性布局
- JvForm - 表单
- JvGrid - 网格
- JvIcon - 图标
- JvInput - 输入框
- JvList - 列表
- JvMenu - 菜单
- JvModal - 模态框
- JvPagination - 分页
- JvPopover - 弹出框
- JvProgress - 进度条
- JvRadio - 单选框
- JvSelect - 选择器
- JvTable - 表格
- JvTabs - 标签页
- JvTag - 标签
- JvTooltip - 文字提示
- 更多组件...

## 工具类样式

Jovial UI提供了一系列实用的工具类样式：

- 布局类 - Flex布局、网格布局、容器
- 间距类 - 外边距、内边距、间距
- 颜色类 - 主题色、中性色、功能色
- 字体类 - 字号、字重、行高
- 阴影类 - 不同层级的阴影效果
- 形状类 - 圆角、形状变换
- 动画类 - 过渡效果、动画效果

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

[MIT](LICENSE)

## 开发

```bash
# 开发模式
npm run dev

# 构建组件库（完整版）
npm run build:lib

# 构建组件库（按需引入版）
npm run build:components

# 构建所有版本
npm run build:all
```

## 工具类样式

JovialUI 提供了一系列实用的工具类样式，您可以直接导入和使用这些样式：

### 通过全量引入

```js
// 引入所有工具类样式
import 'jovial-ui/style.css'
```

### 按需引入特定工具类

```js
// 仅引入圆角工具类
import 'jovial-ui/theme/styles/border-radius.css'

// 仅引入透明度工具类
import 'jovial-ui/theme/styles/opacity.css'

// 仅引入字体工具类
import 'jovial-ui/theme/styles/font.css'
```

### 可用的工具类

JovialUI 提供以下工具类：

- `border-radius.css` - 圆角样式
- `opacity.css` - 透明度样式
- `elevation.css` - 阴影样式  
- `font.css` - 字体样式
- `flex.css` - Flex布局样式
- `spacing.css` - 间距样式
- `colors.css` - 颜色样式
- `transition.css` - 过渡动画样式

详细的工具类使用方法请参考文档。
