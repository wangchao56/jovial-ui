import type { PluginOption, UserConfig } from 'vite'
import fs from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
// tsx
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
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

// 开发配置
const devConfig: UserConfig = {
  ...baseConfig,
  server: {
    open: true,
    host: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemap: true,
      },
    },
  },
}

// 博客应用配置
const blogConfig: UserConfig = {
  ...baseConfig,
  server: {
    port: 3001,
    open: true,
    host: true,
  },
  build: {
    sourcemap: true,
    outDir: 'dist-blog',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        sourcemap: true,
      },
    },
  },
}

// 库打包配置
const libConfig: UserConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      outDir: 'dist/types',
      staticImport: true,
    }),
    visualizer({ open: true, filename: 'stats.html' }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JovialUI',
      fileName: format => `jovial-ui.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-i18n'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          'vue-i18n': 'VueI18n',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name as string
        },
      },
    },
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

// 组件分别打包配置
const componentsConfig: UserConfig = {
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
        index: resolve(__dirname, 'src/components/index.ts'),
        ...Object.fromEntries(
          components.map(name => [
            name,
            resolve(__dirname, `src/components/${name}/index.ts`),
          ]),
        ),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-i18n', '@/theme', '@/locale', '@/utils'],
      output: {
        // 保持目录结构
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // 为每个组件生成CSS文件
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo
          const componentName = name?.split('/').pop()?.split('.')[0]
          if (componentName && components.includes(componentName)) {
            return `${componentName}/style.css`
          }
          return 'style.css'
        },
      },
    },
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

// 根据命令行参数选择配置
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // 根据命令行参数决定使用哪个配置
    if (process.argv.includes('--blog')) {
      return blogConfig
    }
    return devConfig
  }

  if (mode === 'lib') {
    return libConfig
  }

  if (mode === 'components') {
    return componentsConfig
  }

  // 根据构建输出目录决定使用哪个配置
  if (process.argv.includes('dist-blog')) {
    return blogConfig
  }

  // 默认开发配置
  return devConfig
})
