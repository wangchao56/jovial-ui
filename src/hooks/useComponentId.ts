import { useId } from 'vue'

export function useComponentId(prefix = 'jv-') {
  return `${prefix}-${useId()}`
}
