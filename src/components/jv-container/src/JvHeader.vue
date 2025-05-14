<!-- src/components/layout/Header.vue -->
<script setup lang="ts">
import { createNamespace } from '@/utils'
import { computed } from 'vue'

defineOptions({ name: 'JvHeader', inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  height: '60px',
  tag: 'header',
  fixed: false,
})

const bem = createNamespace('JvHeader')

interface Props {
  height?: string | number
  tag?: string
  fixed?: boolean
}

const headerClass = computed(() => [
  bem.b(),
  bem.is('fixed', props.fixed),
])

const headerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
</script>

<template>
  <component
    :is="tag"
    :class="headerClass"
    :style="headerStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-header {
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: var(--jv-theme-surface);
  color: var(--jv-theme-on-surface);
  transition: all 0.3s;

  &.is-fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
