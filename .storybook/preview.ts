import type { Preview } from '@storybook/vue3'
import { provide } from 'vue'
import {
  createJovialAdapter,
  LocaleSymbol,
} from '../src/locale/adapters/jovial'
import '../src/theme/styles/index.scss'

// 创建 Jovial 国际化适配器实例
const localeInstance = createJovialAdapter({
  locale: 'zh-Hans',
  fallback: 'en',
})

// 创建全局装饰器，为所有故事提供国际化
function withLocale(_story: any) {
  return {
    setup() {
      provide(LocaleSymbol, localeInstance)
      return {}
    },
    template: '<story />',
  }
}

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
      // 可访问性检查默认配置
      config: {
        rules: [
          // 默认开启色彩对比度检查
          { id: 'color-contrast', enabled: true },
        ],
      },
      // 默认启用可访问性检查
      disable: false,
      // 默认根元素
      element: '#storybook-root',
      // 在控制台输出违规信息
      manual: true,
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
  decorators: [withLocale],
}

export default preview
