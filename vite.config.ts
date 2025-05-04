import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
// tsx
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

import StylelintPlugin from 'vite-plugin-stylelint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer({ open: true, filename: 'stats.html' }),
    StylelintPlugin({
      fix: true,
      cache: false,
      include: ['src/**/*.{vue,scss,css}'],
      exclude: ['node_modules', 'dist']
    }) as PluginOption
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/theme/styles/_bem.scss" as *;`
      }
    },
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemap: true
      }
    }
  }
})
