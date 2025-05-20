import type { App, InjectionKey, Ref } from 'vue'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '../types'
import { computed, ref, shallowRef, useModel, watch } from 'vue'
import {
  consoleError,
  consoleWarn,
  getObjectValueByPath,
} from '@/utils'
import { isRTLLanguage } from '../helpers'
import en from '../language/en'
import zhHans from '../language/zh-Hans'
import zhHant from '../language/zh-Hant'
/** Jovial国际化前缀 */
const LANG_PREFIX = '$jv.'
export const LocaleSymbol: InjectionKey<LocaleInstance>
  = Symbol.for('jovial-ui-locale')

/**
 * 替换字符串中的参数
 * @param str 原始字符串,如:'Hello {0}'
 * @param params 要替换的参数数组,如:['World']
 * @returns 替换后的字符串,如:'Hello World'
 *  @example
 *  replace('Hello {0}', ['World']) // 'Hello World'
 *  replace('Hello {0} {1}', ['World', 'Jovial']) // 'Hello World Jovial'
 */
function replace(str: string, params: unknown[]): string {
  return str.replace(/\{(\d+)\}/g, (match: string, index: string) => {
    const paramIndex = +index // 获取参数索引
    return paramIndex < params.length ? String(params[paramIndex]) : match // 如果索引小于参数数组长度,则返回参数,否则返回原始字符串
  })
}

/**
 * 创建翻译函数
 * @param current 当前语言
 * @param fallback 回退语言
 * @param messages 语言包
 * @returns 翻译函数
 * @example
 * const t = createTranslateFunction(current, fallback, messages)
 * t('jv.button.cancel')
 * t('你好 {0} {1}', 'hello', 'Jovial')
 */
function createTranslateFunction(
  current: Ref<string>,
  fallback: Ref<string>,
  messages: Ref<LocaleMessages>,
) {
  return (key: string, ...params: unknown[]): string => {
    let shortKey = key

    // 处理前缀
    if (key.startsWith(LANG_PREFIX)) {
      shortKey = key.replace(LANG_PREFIX, '')
    }
    else if (!key.includes('.')) {
      // 如果不包含点，可能是普通文本，直接返回
      return replace(key, params)
    }

    // 获取当前语言的翻译
    const currentLocale = current.value && messages.value[current.value]
    // 获取回退语言的翻译
    const fallbackLocale = fallback.value && messages.value[fallback.value]
    // 从当前语言中获取翻译
    let str: string = getObjectValueByPath(currentLocale, shortKey, null)
    // 如果当前语言没有该翻译,使用回退语言
    if (!str) {
      consoleWarn(
        `Translation key "${shortKey}" not found in "${current.value}", trying fallback locale`,
      )
      str = getObjectValueByPath(fallbackLocale, shortKey, null)
    }

    // 如果回退语言也没有该翻译,返回key本身
    if (!str) {
      consoleError(`Translation key "${shortKey}" not found in fallback`)
      str = key
    }

    // 确保翻译值是字符串
    if (typeof str !== 'string') {
      consoleError(`Translation key "${shortKey}" has a non-string value`)
      str = key
    }

    // 替换参数并返回
    return replace(str, params)
  }
}

/**
 * 创建数字格式化函数
 * @param current 当前语言
 * @param fallback 回退语言
 * @returns 数字格式化函数
 * @example
 * const n = createNumberFunction(current, fallback)
 * n(1234567890) // 1,234,567,890
 * n(1234567890, { style: 'currency', currency: 'USD' }) // $1,234,567,890.00
 */
function createNumberFunction(current: Ref<string>, fallback: Ref<string>) {
  return (value: number, options?: Intl.NumberFormatOptions): string => {
    const numberFormat = new Intl.NumberFormat(
      [current.value, fallback.value],
      options,
    )
    return numberFormat.format(value)
  }
}

/**
 * 处理属性和提供的值之间的关系
 * @param props 组件属性
 * @param prop 属性名
 * @param provided 提供的值
 * @returns 响应式引用
 * @example
 * const current = useProvided(props, 'locale', state.current) // 提供当前语言
 * const fallback = useProvided(props, 'fallback', state.fallback) // 提供回退语言
 * const messages = useProvided(props, 'messages', state.messages) // 提供语言包
 * const t = createTranslateFunction(current, fallback, messages) // 创建翻译函数
 * t('jv.button.cancel') // 翻译按钮取消
 * const n = createNumberFunction(current, fallback) // 创建数字格式化函数
 * n(1234567890) // 1,234,567,890
 * n(1234567890, { style: 'currency', currency: 'USD' }) // $1,234,567,890.00
 */
function useProvided<T>(
  props: any,
  prop: string,
  provided: Ref<T>,
): Ref<T> {
  const internal = useModel(props, prop)
  internal.value = props[prop] ?? provided.value

  watch(provided, () => {
    if (props[prop] == null) {
      internal.value = provided.value
    }
  })

  return internal as Ref<T>
}

/**
 * 创建提供函数
 * @param state 状态对象
 * @param state.current 当前语言引用
 * @param state.fallback 回退语言引用
 * @param state.messages 语言包引用
 * @returns 提供函数
 */
function createProvideFunction(state: {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
}): (props: LocaleOptions) => LocaleInstance {
  return function provideFn(props: LocaleOptions): LocaleInstance {
    // 现在 LocaleOptions 已经继承自 Record<string, unknown>，不需要类型转换
    const current = useProvided(props, 'locale', state.current)
    const fallback = useProvided(props, 'fallback', state.fallback)
    const messages = useProvided(props, 'messages', state.messages)

    return {
      name: 'jovial',
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: provideFn as LocaleInstance['provide'],
    }
  }
}

/**
 * 创建Jovial国际化适配器
 * @param options 国际化选项
 * @returns 国际化实例
 *
 * 功能:
 * 1. 提供默认的英文翻译
 * 2. 支持自定义当前语言和回退语言
 * 3. 支持自定义语言包
 * 4. 提供翻译函数(t)和数字格式化函数(n)
 * 5. 支持嵌套的语言键值
 * 6. 支持参数替换
 * 7. 支持在运行时切换语言
 */
export function createJovialAdapter(options?: LocaleOptions): LocaleInstance {
  const current = shallowRef(options?.locale ?? 'zh-Hans')
  const fallback = shallowRef(options?.fallback ?? 'zh-Hans')
  const messages = ref({
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ...options?.messages,
  })

  const isRTL = computed(() => isRTLLanguage(current.value))
  const localeClassValue = computed(() => `direction-${isRTL.value ? 'rtl' : 'ltr'}`).value
  const t = createTranslateFunction(current, fallback, messages)
  const n = createNumberFunction(current, fallback)

  const d = (date: Date | number, options?: Intl.DateTimeFormatOptions) => {
    const dateTimeFormat = new Intl.DateTimeFormat(
      [current.value, fallback.value],
      options,
    )
    return dateTimeFormat.format(date)
  }

  const switchLocale = (locale: string) => {
    current.value = locale
  }

  const instance: LocaleInstance = {
    name: 'jovial',
    localeClass: localeClassValue,
    current,
    fallback,
    messages,
    t,
    n,
    d,
    switchLocale,
    provide: createProvideFunction({ current, fallback, messages }),
    install: (_app: App) => {
      consoleWarn('Jovial locale adapter does not need to be installed')
    },
  }

  return instance
}
