import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'

/**
 * 生成圆角类名
 * @param rounded 圆角类型（支持ref或普通值）
 * @returns ComputedRef<string>
 */
export function useRoundedClass(rounded: Ref<RoundedType | undefined> | RoundedType | undefined): ComputedRef<string> {
  return computed(() => {
    const value = typeof rounded === 'object' && rounded && 'value' in rounded ? rounded.value : rounded
    return value ? `rounded-${value}` : 'rounded-none'
  })
}
