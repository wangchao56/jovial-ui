import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import JovialUI from '../src/config/index'
import '../src/theme/styles/index.scss'
import './style.css'
// 创建全局装饰器，为所有故事提供国际化
setup((app) => {
  app.use(JovialUI)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 全局可访问性配置
    a11y: {
      // Optional selector to inspect
      element: 'body',
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
        ],
      },
      /*
             * Axe's options parameter
             * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
             * to learn more about the available options.
             */
      options: {},
    },
    // 组件文档参数
    docs: {
      // 文档描述
      description: {
        // 组件库整体描述
        component:
                    'JovialUI - 一个现代化的Vue 3组件库，注重用户体验和可访问性。',
      },
      // 文档默认配置
      source: {
        // 默认展示代码
        state: 'open',
      },
    },
    // 视口配置
    viewport: {
      // 默认视口
      defaultViewport: 'responsive',
    },
  },
  // 添加全局装饰器
}

export default preview
