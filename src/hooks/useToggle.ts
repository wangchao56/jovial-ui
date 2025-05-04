import type { Ref } from 'vue'
import { ref } from 'vue'

function useToggle(initialValue: boolean): [Ref<boolean>, () => void] {
  const value = ref(initialValue)
  const toggle = (): void => {
    value.value = !value.value
  }
  return [value, toggle]
}

export default useToggle
