// function translate(key: string, locale: string, messages: LocaleMessages, fallback: string, ...params: unknown[]): string {
//   // 如果不是以$jv.开头，直接替换参数
//   if (!key.startsWith('$jv.')) {
//     return replaceParams(key, params)
//   }

//   // 移除前缀
//   const path = key.replace('$jv.', '')
//   // 尝试从当前语言获取
//   let text = getValueByPath(messages[locale], path)

//   // 如果当前语言没有，尝试回退语言
//   if (!text && fallback) {
//     text = getValueByPath(messages[fallback], path)
//   }

//   // 仍然没有，返回键名
//   if (!text) {
//     console.warn(`Translation not found: ${key}`)
//     return key
//   }

//   // 替换参数
//   return replaceParams(text, params)
// }

// 替换字符串中的参数，如：'Hello {0}' -> 'Hello World'
export function replaceParams(text: string, params: unknown[]): string {
  return text.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index)
    return i < params.length ? String(params[i]) : `{${index}}`
  })
}
export function isRTLLanguage(locale: string): boolean {
  // RTL语言列表
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.some((lang) => locale.startsWith(lang))
}
