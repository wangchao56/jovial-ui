interface Locales {
  [key: string]: {
    [key: string]: string
  }
}

// 定义语言包
const locales: Locales = {
  'zh-CN': {
    // Storybook UI相关
    'search': '搜索',
    'find': '查找',
    'find results for': '搜索结果',
    'no results found': '未找到结果',
    'clear search results': '清除搜索结果',
    'close': '关闭',
    'menu': '菜单',
    // 组件文档相关
    'docs': '文档',
    'show code': '显示代码',
    'hide code': '隐藏代码',
    'show info': '显示信息',
    'hide info': '隐藏信息',
    // 故事相关
    'component story': '组件故事',
    'example story': '示例故事',
    // 控件相关
    'controls': '控件',
    'props': '属性',
    'events': '事件',
    'methods': '方法',
    'slots': '插槽',
    'background color': '背景颜色',
    'color': '颜色',
    'size': '尺寸',
    'small': '小型',
    'medium': '中型',
    'large': '大型',
    // 页面标题
    'Jovial UI': 'Jovial UI 组件库',
    // 组件分类
    'Form Controls': '表单控件',
    'Data Display': '数据展示',
    'Feedback Components': '反馈组件',
    'Navigation Components': '导航组件',
    'Layout Components': '布局组件',
    'General Components': '通用组件',
    // 组件位置
    'Top': '顶部',
    'Bottom': '底部',
    'Left': '左侧',
    'Right': '右侧',
    // 国际化示例
    'Internationalized Tooltip Example': '国际化提示示例',
    'Current interface language': '当前界面语言',
    'zh-CN': '中文',
    'en-US': '英文',
  },
  'en-US': {
    // Storybook UI related
    'search': 'Search',
    'find': 'Find',
    'find results for': 'Find results for',
    'no results found': 'No results found',
    'clear search results': 'Clear search results',
    'close': 'Close',
    'menu': 'Menu',
    // Component docs related
    'docs': 'Docs',
    'show code': 'Show code',
    'hide code': 'Hide code',
    'show info': 'Show info',
    'hide info': 'Hide info',
    // Story related
    'component story': 'Component Story',
    'example story': 'Example Story',
    // Controls related
    'controls': 'Controls',
    'props': 'Props',
    'events': 'Events',
    'methods': 'Methods',
    'slots': 'Slots',
    'background color': 'Background Color',
    'color': 'Color',
    'size': 'Size',
    'small': 'Small',
    'medium': 'Medium',
    'large': 'Large',
    // Page title
    'Jovial UI': 'Jovial UI Component Library',
    // Component categories
    'Form Controls': 'Form Controls',
    'Data Display': 'Data Display',
    'Feedback Components': 'Feedback Components',
    'Navigation Components': 'Navigation Components',
    'Layout Components': 'Layout Components',
    'General Components': 'General Components',
    // 组件位置
    'Top': 'Top',
    'Bottom': 'Bottom',
    'Left': 'Left',
    'Right': 'Right',
    // 国际化示例
    'Internationalized Tooltip Example': 'Internationalized Tooltip Example',
    'Current interface language': 'Current interface language',
    'zh-CN': 'Chinese',
    'en-US': 'English',
  },
}

// 获取浏览器语言或默认语言
function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined')
    return 'zh-CN'
  const lang = navigator.language || 'zh-CN'
  return lang.startsWith('zh') ? 'zh-CN' : 'en-US'
}

// 当前语言
let currentLocale = getBrowserLanguage()

// 切换语言
export function setLocale(locale: string): void {
  if (locales[locale]) {
    currentLocale = locale
    // 触发自定义事件，通知语言变更
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('storybook-locale-changed', { detail: locale }))
    }
  }
}

// 获取当前语言
export const getLocale = (): string => currentLocale

// 翻译函数
export function t(key: string): string {
  if (locales[currentLocale] && locales[currentLocale][key]) {
    return locales[currentLocale][key]
  }
  // 如果没有找到翻译，回退到英文
  if (locales['en-US'] && locales['en-US'][key]) {
    return locales['en-US'][key]
  }
  // 如果英文也没有，直接返回key
  return key
}

export default {
  locales,
  t,
  setLocale,
  getLocale,
}
