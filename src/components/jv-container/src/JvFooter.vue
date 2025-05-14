<!-- src/components/layout/Footer.vue -->
<script setup lang="ts">
import type { JvFooterProps } from './types'
import { convertToUnit, createNamespace } from '@/utils'
import { useCssVars } from 'vue'

defineOptions({ name: 'JvFooter', inheritAttrs: false })

const props = withDefaults(defineProps<JvFooterProps>(), {
  height: 60,
  tag: 'footer',
  fixed: false,
})

const bem = createNamespace('JvFooter')

useCssVars(() => {
  return {
    'jv-footer-height': convertToUnit(props.height) as string,
  }
})
</script>

<template>
  <component :is="tag" :class="[bem.b(), bem.is('fixed', fixed)]" v-bind="$attrs">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-footer {
  --jv-footer-height: 60px;
  flex-shrink: 0;
  box-sizing: border-box;
  min-height: var(--jv-footer-height);
  background-color: var(--jv-theme-surface);
  color: var(--jv-theme-on-surface);
  transition: all 0.3s;

  &.is-fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
