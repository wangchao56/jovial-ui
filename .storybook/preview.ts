import type { Preview } from '@storybook/vue3'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { themes } from '@storybook/theming'
import { setup } from '@storybook/vue3'
import JovialUI from '../src/config/index'
import i18n, { getLocale, t } from './i18n'

import '../src/theme/styles/index.scss'
import './style.css'
// 创建全局装饰器，为所有故事提供国际化
setup((app) => {
  app.use(JovialUI)
  // 添加国际化到全局
  app.config.globalProperties.$t = t
  app.provide('i18n', i18n)
})

// 自定义视口
const customViewports = {
  responsive: {
    name: '响应式',
    styles: {
      width: '100%',
      height: '100%',
    },
  },
  desktop: {
    name: '桌面端',
    styles: {
      width: '1200px',
      height: '800px',
    },
  },
  tablet: {
    name: '平板端',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  mobile: {
    name: '移动端',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        boolean: /Boolean$/i,
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
      theme: themes.light,
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
      // 合并预设视口与自定义视口
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      },
    },
    // 添加国际化支持
    globals: {
      locale: getLocale(),
      locales: {
        'zh-Hans': '中文',
        'en-US': 'English',
      },
    },
    i18n: {
      defaultLocale: 'zh-Hans',
      locales: ['zh-Hans', 'en-US'],
    },
  },
}

export default preview
