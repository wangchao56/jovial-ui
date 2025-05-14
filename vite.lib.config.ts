import type { PluginOption, UserConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'
import StylelintPlugin from 'vite-plugin-stylelint'

// 基础配置
const baseConfig = {
  plugins: [
    vue(),
    vueJsx(),
    StylelintPlugin({
      fix: true,
      cache: false,
      include: ['src/**/*.{vue,scss,css}'],
      exclude: ['node_modules', 'dist', 'dist-lib'],
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

// 库打包配置
const config: UserConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      outDir: 'dist-lib/types',
      staticImport: true,
    }),
    visualizer({ open: true, filename: 'stats.html' }),
  ],
  build: {
    outDir: 'dist-lib',
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
    // 复制工具类样式文件夹到输出目录
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
