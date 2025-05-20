<script setup lang="ts">
import type { JvDividerProps } from './types'
import { computed, useCssVars } from 'vue'
import { createNamespace } from '@/utils'
import { JVDIVIDER_NAME } from './types'

defineOptions({ name: JVDIVIDER_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvDividerProps>(), {
  color: 'var(--jv-theme-border)',
  size: '1px',
  opacity: 1,
  variant: 'solid',
  spacing: 'md',
})

const bem = createNamespace(JVDIVIDER_NAME)

// 计算样式
const dividerStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (props.length) {
    if (props.vertical) {
      styles.height = typeof props.length === 'number' ? `${props.length}px` : props.length
    }
    else {
      styles.width = typeof props.length === 'number' ? `${props.length}px` : props.length
    }
  }

  return styles
})

useCssVars(() => {
  return {
    'jv-divider-color': props.color,
    'jv-divider-size': props.size,
    'jv-divider-opacity': String(props.opacity),
  }
})
</script>

<template>
  <hr
    :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`spacing-${spacing}`),
      bem.is('vertical', vertical),
      bem.is('dashed', dashed),
      bem.is('inset', inset),
      props.class,
    ]"
    :style="[dividerStyles, style]"
    role="separator"
    aria-orientation="horizontal"
    v-bind="$attrs"
  >
</template>

<style lang="scss">
.jv-divider {
  --jv-divider-color: var(--jv-theme-border);
  --jv-divider-size: 1px;
  --jv-divider-opacity: 1;
  --jv-divider-transition: all 0.3s ease;
  --jv-divider-width: thin;
  --jv-divider-spacing: var(--jv-spacing-md);

  display: block;
  width: 100%;
  height: 0;
  margin: var(--jv-divider-spacing) 0;
  border: none;
  border-top: var(--jv-divider-size) solid var(--jv-divider-color);
  opacity: var(--jv-divider-opacity);
  transition: var(--jv-divider-transition);

  // 变体样式
  &.variant-dashed {
    border-style: dashed;
  }

  &.variant-dotted {
    border-style: dotted;
  }

  &.variant-double {
    border-top-width: calc(var(--jv-divider-size) * 3);
    border-top-style: double;
  }

  // 间距样式
  @each $size, $value in (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px) {
    &.spacing-#{$size} {
      --jv-divider-spacing: #{$value};
    }
  }

  // 垂直样式
  &.is-vertical {
    display: inline-block;
    width: 0;
    height: 100%;
    margin: 0 var(--jv-divider-spacing);
    border-top: none;
    border-left: var(--jv-divider-size) solid var(--jv-divider-color);
    vertical-align: middle;

    &.variant-double {
      border-left-width: calc(var(--jv-divider-size) * 3);
      border-left-style: double;
    }
  }

  // 内嵌样式
  &.is-inset {
    margin-right: var(--jv-divider-spacing);
    margin-left: var(--jv-divider-spacing);
  }
}
</style>
