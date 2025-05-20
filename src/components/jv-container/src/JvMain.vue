<!-- src/components/layout/Main.vue -->
<script setup lang="ts">
import type { JvContainercontext, JvMainProps } from './types'
import { computed, inject, unref, useCssVars } from 'vue'
import { createNamespace } from '@/utils'
import { JvContainerContextKey } from './types'

defineOptions({ name: 'JvMain', inheritAttrs: false })

const props = withDefaults(defineProps<JvMainProps>(), {
  tag: 'main',
  padding: true,
})

const bem = createNamespace('JvMain')

const { headerHeight } = inject(JvContainerContextKey) as JvContainercontext
const offsetTop = computed(() => {
  return unref(headerHeight) || 60
})
const mainClass = computed(() => [
  bem.b(),
  bem.is('padding', props.padding),
])

const mainStyle = computed(() => ({
  gridArea: 'main',
}))

useCssVars(() => {
  return {
    'jv-main-padding-top': `${offsetTop.value}px`,
    'jv-main-margin-top': `${offsetTop.value}px`,
  }
})
</script>

<template>
  <component :is="tag" :class="mainClass" :style="mainStyle" v-bind="$attrs">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-main {
  --jv-main-padding-top: 60px;
  --jv-main-margin-top: 60px;
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  margin-top: var(--jv-main-margin-top);
  padding-top: var(--jv-main-padding-top);
  justify-self: stretch;
  padding-bottom: 100px;

  &.is-padding {
    padding: var(--jv-spacing-lg);
    padding-top: var(--jv-main-padding-top);
  }
}
</style>
