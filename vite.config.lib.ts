import type { PluginOption, UserConfig } from 'vite'
import fs from 'node:fs'
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

// 需要保留的文件夹
const keepDirectories = ['components', 'hooks', 'directives', 'locale', 'theme', 'utils']

// 创建global.d.ts类型文件的函数
function generateGlobalDts() {
  // 合并类型文件的内容
  const typingsDir = resolve(__dirname, 'src/typings')
  const files = ['index.d.ts', 'utils.d.ts', 'vue-shims.d.ts']

  let content = '// 全局类型定义，自动生成\n\n'

  // 读取所有类型定义文件内容
  files.forEach((file) => {
    const filePath = resolve(typingsDir, file)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      content += `// 来自 ${file}\n${fileContent}\n\n`
    }
  })

  // 确保目标目录存在
  const outDir = resolve(__dirname, 'dist-lib/typings')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  // 写入global.d.ts文件
  fs.writeFileSync(resolve(outDir, 'global.d.ts'), content)
  console.log('✅ global.d.ts 生成成功!')
}

// 库打包配置
const config: UserConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    dts({
      include: [
        'src/components/**/*.ts',
        'src/components/**/*.d.ts',
        'src/components/**/*.tsx',
        'src/components/**/*.vue',
        'src/hooks/**/*.ts',
        'src/directives/**/*.ts',
        'src/locale/**/*.ts',
        'src/theme/**/*.ts',
        'src/utils/**/*.ts',
      ],
      outDir: 'dist-lib/typings',
      staticImport: true,
      afterBuild: generateGlobalDts,
    }),
    visualizer({ open: true, filename: 'stats.html' }),
  ],
  build: {
    outDir: 'dist-lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/core/index.ts'),
      name: 'JovialUI',
      fileName: format => `jovial-ui.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-i18n', 'vue-router', '@iconify/vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          'vue-i18n': 'VueI18n',
          'vue-router': 'VueRouter',
          '@iconify/vue': 'IconifyVue',
        },
        // 保持目录结构，只保留指定的文件夹
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: (chunk) => {
          const id = chunk.facadeModuleId || ''
          // 只保留指定的文件夹
          const shouldPreserve = keepDirectories.some(dir => id.includes(`/src/${dir}/`))

          if (shouldPreserve) {
            return '[name].js'
          }
          // 其他模块放在根目录
          return chunk.name.includes('/') ? `${chunk.name.split('/').pop()}.js` : `${chunk.name}.js`
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || ''
          // 处理主题样式
          if (info.includes('theme/')) {
            return 'theme/[name][extname]'
          }
          // 处理组件样式
          if (info.includes('components/')) {
            return info.replace('src/', '')
          }
          return '[name][extname]'
        },
      },
    },
    // 复制工具类样式文件夹到输出目录
    emptyOutDir: true,
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

// 添加构建后的钩子，用于生成global.d.ts
if (!config.build)
  config.build = {}
if (!config.build.rollupOptions)
  config.build.rollupOptions = {}
if (!config.build.rollupOptions.onwarn) {
  config.build.rollupOptions.onwarn = (warning) => {
    // 忽略某些警告
    if (warning.code === 'CIRCULAR_DEPENDENCY')
      return
    console.warn(`[rollup] ${warning.message}`)
  }
}

export default config
