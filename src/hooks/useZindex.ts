import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

export const zIndexContextKey = Symbol('zIndexContextKey')
export const defaultZIndex = 2000

const zIndex = ref(0)
export function useZindex(initialZIndex = defaultZIndex): {
  zIndex: Ref<number>
  currentZIndex: ComputedRef<number>
  nextZindex: () => number
} {
  const currentZIndex = computed(() => initialZIndex + zIndex.value)

  const nextZindex = (): number => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    zIndex,
    currentZIndex,
    nextZindex,
  }
}
