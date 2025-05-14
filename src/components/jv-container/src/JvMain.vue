<!-- src/components/layout/Main.vue -->
<script setup lang="ts">
import type { JvMainProps } from './types'
import { createNamespace } from '@/utils'
import { computed } from 'vue'

defineOptions({ name: 'JvMain', inheritAttrs: false })

const props = withDefaults(defineProps<JvMainProps>(), {
  tag: 'main',
  padding: true,
})

const bem = createNamespace('JvMain')

const mainClass = computed(() => [
  bem.b(),
  bem.is('padding', props.padding),
])
</script>

<template>
  <component
    :is="tag"
    :class="mainClass"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-main {
  overflow: auto;
  flex: 1;
  box-sizing: border-box;
  background-color: var(--jv-theme-background);
  color: var(--jv-theme-on-background);

  &.is-padding {
    padding: var(--jv-spacing-lg);
  }
}
</style>
