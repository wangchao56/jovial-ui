<script setup lang="ts">
import type { JvTextProps } from './types'
import { getOptions } from '@/constants'
import { createNamespace, isCssFontSize, isString } from '@/utils'
import { isCssColor } from '@/utils/color/colorUtils'
import { computed, useCssVars } from 'vue'

defineOptions({
  name: 'JvText',
  inheritAttrs: false,
})

// 文本组件
// 支持HTML内联文本语义和Material Design排版规范
const {
  size = 'medium',
  variant = 'span',
  color = 'default',
  weight = 'medium',
  lineHeight = 'normal',
  secondary = false,
  align = 'left',
  ellipsis = false,
  truncate = false,
  text = '',
} = defineProps<JvTextProps>()
const colorsOptions = getOptions('colorType')
const bem = createNamespace('JvText')

// 内部颜色值
const colorValue = computed(() => {
  if (isString(color) && colorsOptions.includes(color))
    return color
  return 'default' // 默认颜色
})

// css颜色值
const cssColor = computed(() => {
  if (isCssColor(color))
    return color
  return ''
})

// 内部fontsize
const fontSizeValue = computed(() => {
  if (isString(size) && size.startsWith('var'))
    return size
  return 'medium'
})

// cssfontsize
const cssFontSize = computed(() => {
  if (isCssFontSize(size))
    return size
  return ''
})

const colorClass = computed(() => {
  return `text-${colorValue.value}`
})

const weightClass = computed(() => `font-${weight}`)
const lineHeightClass = computed(() => `leading-${lineHeight}`)
const alignClass = computed(() => `text-${align}`)

// 多行文本溢出
const ellipsisClass = computed(() => {
  if (ellipsis === true)
    return 'ellipsis'
  if (typeof ellipsis === 'number' && ellipsis > 0)
    return `ellipsis-${ellipsis}`
  return ''
})

// 是否截断
const truncateClass = computed(() => truncate ? 'truncate' : '')

useCssVars(() => {
  return {
    'jv-text-color': cssColor.value,
    'jv-text-size': cssFontSize.value,
  }
})
</script>

<template>
  <component
    :is="variant"
    :class="[
      bem.b(),
      bem.m(fontSizeValue),
      bem.m(variant),
      bem.is('secondary', secondary),
      colorClass,
      weightClass,
      lineHeightClass,
      alignClass,
      ellipsisClass,
      truncateClass,
    ]"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/typography' as *;

$text-colors: ('primary', 'secondary', 'success', 'warning', 'danger', 'info', 'default');
$text-weights: ('light', 'regular', 'medium', 'semibold', 'bold');
$text-line-heights: ('none', 'tight', 'snug', 'normal', 'relaxed', 'loose');
$text-sizes: ('tiny', 'small', 'medium', 'large', 'xlarge');
$text-aligns: ('left', 'center', 'right', 'justify');

@include b(text) {
  --jv-text-color: var(--jv-theme-on-surface);
  --jv-text-align: left;
  --jv-text-size: var(--jv-font-size-medium);
  --jv-text-weight: var(--jv-font-weight-medium);
  --jv-text-line-height: var(--jv-line-height-normal);
  color: var(--jv-text-color);
  font-family: var(--jv-font-family-cn);
  font-size: var(--jv-text-size);
  font-weight: var(--jv-text-weight);
  line-height: var(--jv-text-line-height);
  text-align: var(--jv-text-align);

  // 文本溢出省略 - 单行
  &.ellipsis,
  &.truncate {
    @include text-overflow-ellipsis;
  }

  // 文本溢出省略 - 多行
  &.ellipsis-2 {
    @include text-overflow-ellipsis-multi(2);
  }

  &.ellipsis-3 {
    @include text-overflow-ellipsis-multi(3);
  }

  &.ellipsis-4 {
    @include text-overflow-ellipsis-multi(4);
  }

  &.ellipsis-5 {
    @include text-overflow-ellipsis-multi(5);
  }

  // 颜色
  @each $color in $text-colors {
    &.text-#{$color} {
      @if $color != 'default' {
        --jv-text-color: var(--jv-theme-#{$color});
      } @else {
        --jv-text-color: var(--jv-theme-#{$color});
      }
    }
  }

  //  权重
  @each $weight in $text-weights {
    &.font-#{$weight} {
      --jv-text-weight: var(--jv-font-weight-#{$weight});
    }
  }

  //  行高
  @each $line-height in $text-line-heights {
    &.leading-#{$line-height} {
      --jv-text-line-height: var(--jv-line-height-#{$line-height});
    }
  }

  //   size
  @each $size in $text-sizes {
    &--#{$size} {
      --jv-text-size: var(--jv-font-size-#{$size});
    }
  }

  @include when(secondary) {
    --jv-text-size: var(--jv-font-size-small);
    --jv-text-color: var(--jv-theme-subface-variant);
  }

  //  对齐方式
  @each $align in $text-aligns {
    &.text-#{$align} {
      --jv-text-align: #{$align};
    }
  }
}
</style>
