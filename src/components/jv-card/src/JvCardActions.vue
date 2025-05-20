<script setup lang="ts">
import type { JvCardActionsProps } from './types'
import { computed, inject } from 'vue'
import { convertToUnit } from '@/utils'
import { bem, JVCARDACTIONS_NAME, JvCardContextKey } from './types'

defineOptions({ name: JVCARDACTIONS_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardActionsProps>(), {
  align: 'start',
  divider: false,
  padding: 'sm',
  gap: 8,
})

const { align, divider, padding, gap } = props

inject(JvCardContextKey) as { cardId: string }

const flexAlign = computed(() => {
  switch (align) {
    case 'start': return 'flex-start'
    case 'end': return 'flex-end'
    default: return align
  }
})

const actionsClasses = computed(() => {
  return [
    bem.e('actions'),
    bem.m(`padding-${padding}`),
    bem.is(`align-${align}`, true),
    { 'has-divider': divider },
  ]
})

const actionsStyles = computed(() => {
  return {
    gap: convertToUnit(gap),
  }
})
</script>

<template>
  <div v-if="$slots.default" :class="actionsClasses" :style="actionsStyles">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.jv-card__actions {
  grid-area: actions;
  display: flex;
  justify-content: v-bind('flexAlign');
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  &.has-divider {
    border-top: 1px solid var(--jv-theme-outline-variant);
  }

  &.padding-none {
    padding: 0;
  }

  &.padding-xs {
    padding: 4px;
  }

  &.padding-sm {
    padding: 8px;
  }

  &.padding-md {
    padding: 16px;
  }

  &.padding-lg {
    padding: 24px;
  }

  &.padding-xl {
    padding: 32px;
  }
}
</style>
