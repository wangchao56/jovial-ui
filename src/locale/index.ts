import type { LocaleInstance, LocaleMessages, LocaleOptions } from './types'
import { ref, shallowRef } from 'vue'

function defaultT(key: string, ...params: unknown[]): string {
  // 简单回退实现
  if (params.length) {
    return key.replace(/\{(\d+)\}/g, (_, i) => String(params[i] ?? `{${i}}`))
  }
  return key
}
function defaultN(value: number) {
  return String(value)
}

export function createLocaleManager(
  options: LocaleOptions = {}
): LocaleInstance {
  const current = shallowRef(options.locale ?? 'zh-Hans')
  const fallback = shallowRef(options.fallback ?? 'zh-Hans')
  const messages = ref<LocaleMessages>(options.messages ?? {})
  return {
    name: 'jovial',
    current,
    fallback,
    messages,
    t: (options as any)?.t ?? defaultT,
    n: (options as any)?.n ?? defaultN,
    provide:
      (options as any)?.provide ??
      (() => {
        throw new Error('provide not implemented')
      })
  }
}
