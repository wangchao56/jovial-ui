<script setup lang="ts">
import type { JvAsideProps } from './types'
import { convertToUnit, createNamespace } from '@/utils'
import { computed, useCssVars } from 'vue'

defineOptions({ name: 'JvAside', inheritAttrs: false })

const props = withDefaults(defineProps<JvAsideProps>(), {
  width: 200,
  tag: 'aside',
  fixed: false,
  breakpoint: 'md',
})

const bem = createNamespace('JvAside')

const asideClass = computed(() => [
  bem.b(),
  bem.is('fixed', props.fixed),
])

const asideStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
useCssVars(() => {
  return {
    'jv-aside-width': convertToUnit(props.width) as string,
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="asideClass"
    :style="asideStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-aside {
  --jv-aside-width: 200px;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: var(--jv-theme-surface);
  color: var(--jv-theme-on-surface);
  transition: all 0.3s;

  &.is-fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
