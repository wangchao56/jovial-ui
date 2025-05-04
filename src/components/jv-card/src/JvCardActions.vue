<script setup lang="ts">
import type { JvCardActionsProps } from './types'
import { computed } from 'vue'
import { bem, JVCARDACTIONS_NAME } from './types'

defineOptions({ name: JVCARDACTIONS_NAME, inheritAttrs: false })
const { align = 'start' } = defineProps<JvCardActionsProps>()
const flexAlign = computed(() => `flex-${align}`)
</script>

<template>
  <div :class="[bem.e('actions'), bem.is(`align-${align}`, true)]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.jv-card__actions {
  display: flex;
  justify-content: v-bind('flexAlign');
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  order: 3;
}
</style>
