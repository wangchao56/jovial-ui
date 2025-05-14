<script setup lang="ts">
import type { BadgePlacementType, JvBadgeProps } from './types'
import { getOptions } from '@/constants'
import { useSize } from '@/hooks/useSize'
import { computed, ref, useCssVars } from 'vue'
import { bem, JVBADGE_NAME } from './types'

defineOptions({ name: JVBADGE_NAME, inheritAttrs: false })

const {
  value,
  max,
  dot,
  hidden,
  placement = 'top-right',
  color = 'error',
  offset,
  size = 'medium',
} = defineProps<JvBadgeProps>()

// 使用useSize hook处理尺寸
const { sizeWithUnit, isInnerSize } = useSize(size, {
  tiny: 12,
  small: 16,
  medium: 20,
  large: 28,
  xlarge: 32,
}, 20)

const badgeRef = ref<HTMLElement>()

// 计算显示的内容
const content = computed(() => {
  if (dot)
    return ''
  if (typeof value === 'number' && typeof max === 'number') {
    return value > max ? `${max}+` : `${value}`
  }
  return value
})

const colorsOptions = getOptions('colorType')
const isInnerColor = computed(() => color && colorsOptions.includes(color as string))

const badgeStyle = computed(() => {
  // 根据placement计算位置
  const placementMap: Record<BadgePlacementType, Record<string, string>> = {
    'top-right': {
      top: offset ? (typeof offset[0] === 'number' ? `${offset[0]}px` : offset[0]) : '0',
      right: offset ? (typeof offset[1] === 'number' ? `${offset[1]}px` : offset[1]) : '0',
      transform: 'translate(50%, -50%)',
    },
    'top-left': {
      top: offset ? (typeof offset[0] === 'number' ? `${offset[0]}px` : offset[0]) : '0',
      left: offset ? (typeof offset[1] === 'number' ? `${offset[1]}px` : offset[1]) : '0',
      transform: 'translate(-50%, -50%)',
    },
    'bottom-right': {
      bottom: offset ? (typeof offset[0] === 'number' ? `${offset[0]}px` : offset[0]) : '0',
      right: offset ? (typeof offset[1] === 'number' ? `${offset[1]}px` : offset[1]) : '0',
      transform: 'translate(50%, 50%)',
    },
    'bottom-left': {
      bottom: offset ? (typeof offset[0] === 'number' ? `${offset[0]}px` : offset[0]) : '0',
      left: offset ? (typeof offset[1] === 'number' ? `${offset[1]}px` : offset[1]) : '0',
      transform: 'translate(-50%, 50%)',
    },
  }
  return placementMap[placement]
})

useCssVars(() => {
  return {
    'jv-badge-background-color': isInnerColor.value ? `var(--jv-theme-${color})` : color,
    'jv-badge-color': isInnerColor.value ? `var(--jv-theme-on-${color})` : color,
    'jv-badge-size': sizeWithUnit.value,
  }
})
</script>

<template>
  <div ref="badgeRef" :class="[bem.b(), { [bem.m(color)]: isInnerColor }]">
    <slot />
    <span
      v-if="!hidden" class="jv-badge__badge" :class="[
        bem.em('badge', placement),
        bem.is('dot', dot),
        isInnerSize && bem.m(`size-${size}`),
      ]" :style="badgeStyle"
    >
      {{ content }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$badge-sizes: (
  'tiny': (
    size: 12px,
    padding: 4px,
    font-size: 10px,
  ),
  'small': (
    size: 16px,
    padding: 6px,
    font-size: 12px,
  ),
  'medium': (
    size: 20px,
    padding: 8px,
    font-size: 14px,
  ),
  'large': (
    size: 28px,
    padding: 8px,
    font-size: 16px,
  ),
  'xlarge': (
    size: 32px,
    padding: 8px,
    font-size: 18px,
  ),
);

@include b(badge) {
  --jv-badge-size: 20px;
  --jv-badge-padding: 6px;
  --jv-badge-font-size: 14px;
  --jv-badge-line-height: 1;
  --jv-badge-background-color: var(--jv-theme-error);
  --jv-badge-color: var(--jv-theme-on-error);

  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: fit-content;
  height: fit-content;

  @each $size, $value in $badge-sizes {
    @include m(size-#{$size}) {
      --jv-badge-size: #{map.get($value, size)};
      --jv-badge-padding: #{map.get($value, padding)};
      --jv-badge-font-size: #{map.get($value, font-size)};
    }
  }

  @include e(badge) {
    position: absolute;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: fit-content;
    height: var(--jv-badge-size);
    padding: 0 var(--jv-badge-padding);
    border-radius: var(--jv-rounded-pill);
    background-color: var(--jv-badge-background-color);
    color: var(--jv-badge-color);
    font-size: var(--jv-badge-font-size);
    font-weight: 500;
    line-height: var(--jv-badge-line-height);
    text-align: center;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
    transform-origin: center;

    &.is-dot {
      width: calc(var(--jv-badge-size) * 0.5);
      height: calc(var(--jv-badge-size) * 0.5);
      padding: 0;
      border: 2px solid currentcolor;
    }
  }

  @include m(primary) {
    --jv-badge-background-color: var(--jv-theme-primary);
    --jv-badge-color: var(--jv-theme-on-primary);
  }

  @include m(success) {
    --jv-badge-background-color: var(--jv-theme-success);
    --jv-badge-color: var(--jv-theme-on-success);
  }

  @include m(warning) {
    --jv-badge-background-color: var(--jv-theme-warning);
    --jv-badge-color: var(--jv-theme-on-warning);
  }

  @include m(error) {
    --jv-badge-background-color: var(--jv-theme-error);
    --jv-badge-color: var(--jv-theme-on-error);
  }

  @include m(info) {
    --jv-badge-background-color: var(--jv-theme-info);
    --jv-badge-color: var(--jv-theme-on-info);
  }

  @include m(secondary) {
    --jv-badge-background-color: var(--jv-theme-secondary);
    --jv-badge-color: var(--jv-theme-on-secondary);
  }
}
</style>
