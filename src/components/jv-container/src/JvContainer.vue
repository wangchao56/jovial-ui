<!-- src/components/layout/Container.vue -->
<script setup lang="ts">
import type { JvContainerProps } from './types'
import { useBreakpoints } from '@/hooks'
import { createNamespace } from '@/utils'
import { computed } from 'vue'

defineOptions({ name: 'JvContainer', inheritAttrs: false })

const props = withDefaults(defineProps<JvContainerProps>(), {
  fluid: false,
  maxWidth: 'lg',
  tag: 'div',
})
const bem = createNamespace('JvContainer')

const { current: currentBreakpoint } = useBreakpoints()

const containerClass = computed(() => [
  bem.b(),
  bem.m(`max-width-${props.maxWidth}`),
  bem.is('fluid', props.fluid),
  bem.m(`breakpoint-${currentBreakpoint.value}`),
])

const containerStyle = computed(() => {
  if (props.fluid)
    return {}

  const maxWidthMap = {
    'xs': '444px',
    'sm': '600px',
    'md': '900px',
    'lg': '1200px',
    'xl': '1536px',
    '2xl': '1920px',
  }

  return {
    maxWidth: props.maxWidth ? maxWidthMap[props.maxWidth] : 'none',
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="containerClass"
    :style="containerStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/breakpoints' as *;

.jv-container {
  box-sizing: border-box;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--jv-spacing-md);
  padding-left: var(--jv-spacing-md);

  // 响应式内边距
  @each $breakpoint, $value in $breakpoints {
    &.jv-container--breakpoint-#{$breakpoint} {
      @if $breakpoint == 'xs' {
        padding-right: var(--jv-spacing-sm);
        padding-left: var(--jv-spacing-sm);
      } @else if $breakpoint == 'sm' {
        padding-right: var(--jv-spacing-md);
        padding-left: var(--jv-spacing-md);
      } @else {
        padding-right: var(--jv-spacing-lg);
        padding-left: var(--jv-spacing-lg);
      }
    }
  }

  // 最大宽度
  &--max-width-xs {
    max-width: 444px;
  }

  &--max-width-sm {
    max-width: 600px;
  }

  &--max-width-md {
    max-width: 900px;
  }

  &--max-width-lg {
    max-width: 1200px;
  }

  &--max-width-xl {
    max-width: 1536px;
  }

  &--max-width-2xl {
    max-width: 1920px;
  }

  // 流体容器
  &.is-fluid {
    max-width: none;
  }
}
</style>
