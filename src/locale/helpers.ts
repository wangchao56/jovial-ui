import type { InjectionKey } from 'vue'
import type { LocaleInstance } from './types'

// 替换字符串中的参数，如：'Hello {0}' -> 'Hello World'
export function replaceParams(text: string, params: unknown[]): string {
  return text.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index)
    return i < params.length ? String(params[i]) : `{${index}}`
  })
}

/**
 * 判断是否为RTL语言
 * @param locale 语言代码
 * @returns 是否为RTL语言
 */
export function isRTLLanguage(locale: string): boolean {
  // RTL语言列表
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.some(lang => locale.startsWith(lang))
}

export const LocaleSymbol: InjectionKey<LocaleInstance>
  = Symbol.for('jovial-ui-locale')
