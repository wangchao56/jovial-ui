import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-a11y',
      options: {
        // 将a11y面板设置为默认打开
        enableShortcuts: true,
        // 将检查结果自动显示在控制台
        check: 'onFirstRender'
      }
    }
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) => {
    // 路径别名配置
    config.resolve = {
      alias: {
        '@': '/src',
        '@components': '/src/components'
      }
    }
    return config
  },
  managerHead: (head) => `
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
`
}
export default config
