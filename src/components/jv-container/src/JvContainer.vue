<!-- src/components/layout/Container.vue -->
<script setup lang="ts">
import type { ContainerStateKey, JvContainerProps } from './types'
import { computed, provide, ref, watch } from 'vue'
import { useBreakpoints } from '@/hooks'
import { useTheme } from '@/theme'
import { createNamespace } from '@/utils'
import { JvContainerContextKey } from './types'

defineOptions({ name: 'JvContainer', inheritAttrs: false })
const props = withDefaults(defineProps<JvContainerProps>(), {
  fluid: false,
  maxWidth: 'lg',
  tag: 'div',
  gridTemplate: '"header header header" auto "left-aside main right-aside" 1fr "left-aside footer footer" auto / auto 1fr auto',
  spacing: 'md',
  asideWidth: 200,
  headerHeight: 60,
  footerHeight: 60,
})

const theme = useTheme()

const bem = createNamespace('JvContainer')

const { current: currentBreakpoint } = useBreakpoints()

const containerClass = computed(() => [
  bem.b(),
  bem.m(`max-width-${props.maxWidth}`),
  bem.is('fluid', props.fluid),
  bem.is('grid-layout', true),
  bem.m(`breakpoint-${currentBreakpoint.value}`),
  bem.m(`spacing-${props.spacing}`),
  theme.themeClasses.value,
])

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    display: 'grid',
    gridTemplate: props.gridTemplate,
  }

  if (!props.fluid) {
    const maxWidthMap = {
      'xs': '444px',
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      'xl': '1536px',
      '2xl': '1920px',
    }

    styles.maxWidth = props.maxWidth ? maxWidthMap[props.maxWidth] : 'none'
  }

  return styles
})

// 与子组件共享的状态
const leftAsideWidth = ref(props.asideWidth || 200)
const rightAsideWidth = ref(props.asideWidth || 200)
const headerHeight = ref(props.headerHeight || 60)
const footerHeight = ref(props.footerHeight || 60)

// 监听props变化，同步更新共享状态
watch(() => props.asideWidth, (newVal) => {
  leftAsideWidth.value = newVal || 200
  rightAsideWidth.value = newVal || 200
})
watch(() => props.headerHeight, (newVal) => {
  headerHeight.value = newVal || 60
})
watch(() => props.footerHeight, (newVal) => {
  footerHeight.value = newVal || 60
})

// 提供共享上下文
provide(JvContainerContextKey, {
  leftAsideWidth,
  rightAsideWidth,
  headerHeight,
  footerHeight,
  updateState: (key: ContainerStateKey, value: number) => {
    switch (key) {
      case 'leftAsideWidth':
        leftAsideWidth.value = value
        break
      case 'rightAsideWidth':
        rightAsideWidth.value = value
        break
      case 'headerHeight':
        headerHeight.value = value
        break
      case 'footerHeight':
        footerHeight.value = value
        break
    }
  },
})
</script>

<template>
  <component :is="tag" :class="containerClass" :style="containerStyle" v-bind="$attrs">
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
  background-color: var(--jv-theme-background);
  color: var(--jv-theme-on-background);

  &.is-grid-layout {
    display: grid;
    overflow: hidden;
    min-height: 100vh;
    grid-template-areas:
      'header header header'
      'left-aside main right-aside'
      'left-aside footer footer';
    grid-auto-columns: min-content 1fr min-content;
  }

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

  // 组件间距
  &.jv-container--spacing-xs {
    .jv-header,
    .jv-main,
    .jv-aside,
    .jv-footer {
      padding: var(--jv-spacing-xs);
    }
  }

  &.jv-container--spacing-sm {
    .jv-header,
    .jv-main,
    .jv-aside,
    .jv-footer {
      padding: var(--jv-spacing-sm);
    }
  }

  &.jv-container--spacing-md {
    .jv-header,
    .jv-main,
    .jv-aside,
    .jv-footer {
      padding: var(--jv-spacing-md);
    }
  }

  &.jv-container--spacing-lg {
    .jv-header,
    .jv-main,
    .jv-aside,
    .jv-footer {
      padding: var(--jv-spacing-lg);
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
