<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, useCssVars } from 'vue'

defineOptions({ name: 'JvCircleLoader', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    color?: string | 'primary' | 'success' | 'warning' | 'error' | 'info'
    style?: CSSProperties
    class?: string
  }>(),
  {
    size: 'medium',
    color: 'primary',
  },
)

const sizeMap = { small: 32, medium: 48, large: 64 }
const currentSize = computed(() => sizeMap[props.size])
const ringSize = computed(() => currentSize.value * 0.8)
const ringMargin = computed(() => currentSize.value * 0.1)
const ringBorder = computed(() => currentSize.value * 0.1)
const colorMap = {
  primary: 'var(--jv-theme-primary)',
  success: 'var(--jv-theme-success)',
  warning: 'var(--jv-theme-warning)',
  error: 'var(--jv-theme-error)',
  info: 'var(--jv-theme-info)',
}

useCssVars(() => ({
  'jv-circle-loader-size': `${currentSize.value}px`,
  'jv-circle-loader-ring-size': `${ringSize.value}px`,
  'jv-circle-loader-ring-margin': `${ringMargin.value}px`,
  'jv-circle-loader-ring-border-width': `${ringBorder.value}px`,
  'jv-circle-loader-color': colorMap[props.color as keyof typeof colorMap] || props.color,
}))
</script>

<template>
  <div
    class="jv-circle-loader"
    :class="props.class"
    :style="props.style"
  >
    <div />
    <div />
    <div />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$color-map: ('primary', 'success', 'warning', 'error', 'info');

@each $color in $color-map {
  .jv-circle-loader-#{$color} {
    --jv-circle-loader-color: var(--jv-theme-#{$color});
  }
}

.jv-circle-loader {
  position: relative;
  display: inline-block;
  width: var(--jv-circle-loader-size);
  height: var(--jv-circle-loader-size);
}

.jv-circle-loader > div {
  position: absolute;
  display: block;
  box-sizing: border-box;
  width: var(--jv-circle-loader-ring-size);
  height: var(--jv-circle-loader-ring-size);
  margin: var(--jv-circle-loader-ring-margin);
  border: var(--jv-circle-loader-ring-border-width) solid var(--jv-circle-loader-color);
  border-color: var(--jv-circle-loader-color) transparent transparent;
  border-radius: 50%;
  animation: jv-circle-loader-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.jv-circle-loader > div:nth-child(1) {
  animation-delay: -0.45s;
}

.jv-circle-loader > div:nth-child(2) {
  animation-delay: -0.3s;
}

.jv-circle-loader > div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes jv-circle-loader-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
