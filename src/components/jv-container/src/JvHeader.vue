<!-- src/components/layout/Header.vue -->
<script setup lang="ts">
import type { JvContainercontext, JvHeaderProps } from './types'
import { computed, inject, ref, useCssVars, watch } from 'vue'
import { convertToUnit, createNamespace } from '@/utils'
import { JvContainerContextKey } from './types'

defineOptions({ name: 'JvHeader', inheritAttrs: false })

const props = withDefaults(defineProps<JvHeaderProps>(), {
  height: 60,
  tag: 'header',
  fixed: false,
})

const bem = createNamespace('JvHeader')
const headerRef = ref<HTMLElement>()
const { updateState } = inject(JvContainerContextKey) as JvContainercontext
const headerClass = computed(() => [
  bem.b(),
  bem.is('fixed', props.fixed),
])

const headerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  gridArea: 'header',
}))

watch(headerRef, (newRef) => {
  if (newRef && updateState) {
    updateState('headerHeight', newRef.clientHeight)
  }
}, { flush: 'post' }) // 确保在 DOM 更新后执行

useCssVars(() => ({
  'jv-header-height': convertToUnit(props.height) as string,
}))
</script>

<template>
  <component
    :is="tag"
    ref="headerRef"
    :class="headerClass"
    :style="headerStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-header {
  --jv-header-height: 60px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--jv-header-height);
  background-color: var(--jv-theme-background);
  color: var(--jv-theme-on-background);
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
