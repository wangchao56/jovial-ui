<script setup lang="ts">
import type { JvRadioGroupProps } from './types'
import { provide } from 'vue'
import { JVRADIOGROUP_NAME, radioGroupKey } from './types'

defineOptions({ name: JVRADIOGROUP_NAME, inheritAttrs: false })

const {
  modelValue = '',
  disabled = false,
  name = ''
} = defineProps<JvRadioGroupProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}>()

function updateValue(value: any) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide(radioGroupKey, {
  name: name ?? '',
  modelValue: modelValue ?? '',
  disabled,
  updateValue
})
</script>

<template>
  <div class="jv-radio-group">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
