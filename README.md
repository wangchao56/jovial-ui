# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# Jovial UI

一个现代化的Vue 3组件库

## 安装

```bash
npm install jovial-ui
# 或者
yarn add jovial-ui
# 或者
pnpm add jovial-ui
```

## 使用方法

### 全量引入

```js
import JovialUI from 'jovial-ui'
import { createApp } from 'vue'
import App from './App.vue'
import 'jovial-ui/dist/style.css'

const app = createApp(App)
app.use(JovialUI)
app.mount('#app')
```

### 按需引入

```js
import { JvButton, JvInput } from 'jovial-ui'
import { createApp } from 'vue'
import App from './App.vue'
import 'jovial-ui/dist/style.css'

const app = createApp(App)
app.component('JvButton', JvButton)
app.component('JvInput', JvInput)
app.mount('#app')
```

### 使用ES模块方式引入（可以配合tree-shaking）

```js
// 引入单个组件
import JvButton from 'jovial-ui/es/jv-button'
import { createApp } from 'vue'
import App from './App.vue'
// 需要手动引入组件样式
import 'jovial-ui/dist/style.css'

const app = createApp(App)
app.component('JvButton', JvButton)
app.mount('#app')
```

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

Extra small xs Small to large phone < 600px
Small sm Small to medium tablet 600px > < 960px
Medium md Large tablet to laptop 960px > < 1280px
Large lg Laptop to desktop 1280px > < 1920px
Extra large xl 1080p to 1440p desktop 1920px > < 2560px
Extra extra large xxl 4k and ultra-wide > 2560px
