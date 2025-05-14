import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // 路径别名配置
    config.resolve = {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@utils': '/src/utils',
        '@theme': '/src/theme',
      },
    }
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/theme/styles/_bem.scss" as *;
              @use "@/theme/styles/_variables.scss" as *;
              @use "@/theme/styles/_colors.scss" as *;
              @use "@/theme/styles/_border-radius.scss" as *;
            `,
        },
      },
      postcss: '../postcss.config.js',
    }
    return config
  },
  managerHead: head => `
  ${head}
  <style>
    /* 为可访问性面板添加高亮样式 */
    .sbdocs-a11y-report {
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 16px;
      margin-top: 16px;
    }
    .sbdocs-a11y-report h2 {
      margin-top: 0;
    }
  </style>
`,
}
export default config
