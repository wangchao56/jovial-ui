<script setup lang="ts">
import type { JvAsideProps, JvContainercontext } from './types'
import { computed, inject, ref, unref, useCssVars, watch } from 'vue'
import { convertToUnit, createNamespace } from '@/utils'
import { JvContainerContextKey } from './types'

defineOptions({ name: 'JvAside', inheritAttrs: false })

const props = withDefaults(defineProps<JvAsideProps>(), {
  width: 200,
  tag: 'aside',
  fixed: true,
  breakpoint: 'md',
  position: 'left',
})

const bem = createNamespace('JvAside')
const asideRef = ref<HTMLElement>()
const { updateState, headerHeight } = inject(JvContainerContextKey) as JvContainercontext

const offsetTop = computed(() => {
  return unref(headerHeight) || 64
})
const asideClass = computed(() => [
  bem.b(),
  bem.is('fixed', props.fixed),
  bem.is('left', props.position === 'left'),
  bem.is('right', props.position === 'right'),
])

const asideStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  gridArea: props.position === 'left' ? 'left-aside' : 'right-aside',
}))

useCssVars(() => {
  return {
    'jv-aside-width': convertToUnit(props.width) as string,
    'jv-aside-offset-top': new CSSUnitValue(offsetTop.value, 'px').toString(),
  }
})

watch(asideRef, (newRef) => {
  if (newRef && updateState) {
    updateState('asideWidth', newRef.clientWidth)
  }
}, { flush: 'post' }) // 确保在 DOM 更新后执行
</script>

<template>
  <component
    :is="tag"
    ref="asideRef"
    :class="[asideClass, $attrs.class]"
    :style="[asideStyle, $attrs.style]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.jv-aside {
  --jv-aside-width: 200px;
  --jv-aside-offset-top: 64px;
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--jv-aside-width);
  min-width: var(--jv-aside-width);
  max-width: var(--jv-aside-width);
  height: 100%;
  background-color: var(--jv-theme-surface);
  color: var(--jv-theme-on-surface);
  transition: all 0.3s;

  &.is-fixed {
    position: fixed;
    top: var(--jv-aside-offset-top);
    bottom: 0;
    z-index: 99;
  }

  &.is-left {
    &.is-fixed {
      left: 0;
    }
  }

  &.is-right {
    &.is-fixed {
      right: 0;
    }
  }
}
</style>
