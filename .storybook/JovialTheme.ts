import { create } from '@storybook/theming'
import logo from './assets/jovial-logo.svg'

export default create({
  base: 'light',

  // 品牌信息
  brandTitle: 'Jovial UI',
  brandUrl: 'https://github.com/wangchao56/jovial-ui',
  brandTarget: '_self',
  brandImage: logo,

  // 排版
  fontBase: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
  fontCode: 'monospace',

  // 颜色
  colorPrimary: '#067d75', // 主色调
  colorSecondary: '#015751', // 次要色调

  // UI
  appBg: '#f8f8fc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // 文本颜色
  textColor: '#121212',
  textInverseColor: '#ffffff',

  // 工具栏颜色
  barTextColor: '#64748b',
  barSelectedColor: '#067d75',
  barHoverColor: '#067d75',
  barBg: '#ffffff',

  // 表单颜色
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#334155',
  inputBorderRadius: 4,

})
