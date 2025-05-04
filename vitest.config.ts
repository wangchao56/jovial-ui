import {
  coverageConfigDefaults,
  defineConfig,
  mergeConfig,
} from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'], // 报告类型
        include: ['src/**/*.{js,ts,vue}'], // 覆盖默认值，只覆盖src目录下的文件
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/.storybook/**',
          // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
          '**/*.stories.*',
          // 👇 This pattern must align with the output directory of `storybook build`
          '**/storybook-static/**',
        ],
      },
    },
  }),
)
