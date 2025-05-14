import type { PluginOption, UserConfig } from 'vite'
import fs from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import StylelintPlugin from 'vite-plugin-stylelint'

// 获取components目录下的所有组件
const components = fs
  .readdirSync(resolve(__dirname, 'src/components'))
  .filter(dir => !dir.startsWith('.') && dir.startsWith('jv-'))

// 基础配置
const baseConfig = {
  plugins: [
    vue(),
    vueJsx(),
    StylelintPlugin({
      fix: true,
      cache: false,
      include: ['src/**/*.{vue,scss,css}'],
      exclude: ['node_modules', 'dist', 'dist-components'],
    }) as PluginOption,
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/theme/styles/_bem.scss" as *;`,
      },
    },
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
}

// 组件打包配置
const config: UserConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    dts({
      include: ['src/components/**/*.ts', 'src/components/**/*.d.ts', 'src/components/**/*.tsx', 'src/components/**/*.vue'],
      outDir: 'dist-components/types',
      staticImport: true,
    }),
  ],
  build: {
    outDir: 'dist-components',
    sourcemap: true,
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/components/index.ts'),
        ...Object.fromEntries(
          components.map(name => [
            name,
            resolve(__dirname, `src/components/${name}/index.ts`),
          ]),
        ),
        // 添加工具类样式入口
        'theme/styles/index': resolve(__dirname, 'src/theme/styles/index.scss'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-i18n'],
      output: {
        // 保持目录结构
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // 为每个组件生成CSS文件
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo
          // 处理主题样式
          if (name?.includes('theme/styles')) {
            return 'theme/styles.css'
          }
          // 处理组件样式
          const componentName = name?.split('/').pop()?.split('.')[0]
          if (componentName && components.includes(componentName)) {
            return `${componentName}/style.css`
          }
          return 'style.css'
        },
      },
    },
    // 复制工具类样式文件到输出目录
    emptyOutDir: false,
    copyPublicDir: false,
    // 压缩代码
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}

export default config
