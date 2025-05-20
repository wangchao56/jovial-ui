<!-- src/components/layout/Footer.vue -->
<script setup lang="ts">
import type { JvContainercontext, JvFooterProps } from './types'
import { computed, inject, ref, unref, useCssVars, watch } from 'vue'
import { convertToUnit, createNamespace } from '@/utils'
import { JvContainerContextKey } from './types'

defineOptions({ name: 'JvFooter', inheritAttrs: false })

const props = withDefaults(defineProps<JvFooterProps>(), {
  height: 60,
  tag: 'footer',
  fixed: false,
})

const bem = createNamespace('JvFooter')
const footerRef = ref<HTMLElement>()
const { updateState, leftAsideWidth } = inject(JvContainerContextKey) as JvContainercontext
const footerClass = computed(() => [
  bem.b(),
  bem.is('fixed', props.fixed),
])
// 左侧偏移量根据left-aside宽度计算
const offsetLeft = computed(() => {
  return unref(leftAsideWidth) || 0
})

watch(footerRef, (newRef) => {
  if (newRef && updateState) {
    updateState('footerHeight', newRef.clientHeight)
  }
}, { flush: 'post' }) // 确保在 DOM 更新后执行

const footerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  gridArea: 'footer',
  width: '100%',
}))

useCssVars(() => {
  return {
    'jv-footer-height': convertToUnit(props.height) as string,
    'jv-footer-offset-left': convertToUnit(offsetLeft.value) as string,
  }
})
</script>

<template>
  <component
    :is="tag"
    ref="footerRef"
    :class="footerClass"
    :style="footerStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-footer {
  --jv-footer-height: 60px;
  --jv-footer-offset-left: 220px;
  z-index: 1000;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-height: var(--jv-footer-height);
  box-shadow: 0 -1px 3px 0 var(--jv-theme-outline);
  background-color: var(--jv-theme-background);
  color: var(--jv-theme-on-background);
  transition: all 0.3s;
  justify-self: stretch;

  &.is-fixed {
    position: sticky;
    right: 0;
    bottom: 0;
    left: var(--jv-footer-offset-left);
    max-width: 100%;
  }
}
</style>
