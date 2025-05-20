<script setup lang="ts">
import type { JvTitleProps } from './types'
import { computed } from 'vue'
import { createNamespace } from '@/utils'

defineOptions({
  name: 'JvTitle',
  inheritAttrs: false,
})

// 标题组件
// 支持Material Design排版规范的标题
const {
  level = 2,
  color,
  weight,
  lineHeight,
  align = 'left',
  gutterBottom = true,
  text,
} = defineProps<JvTitleProps>()

const bem = createNamespace('JvTitle')

const tag = computed(() => `h${level}`)

// Material Design变体类
const mdVariantClass = computed(() => {
  const mdVariant = `h${level}`
  return `md-${mdVariant}`
})

const colorClass = computed(() => {
  if (color)
    return `text-${color}`
  return ''
})

const weightClass = computed(() => weight ? `font-${weight}` : '')
const lineHeightClass = computed(() => lineHeight ? `leading-${lineHeight}` : '')
const alignClass = computed(() => align !== 'left' ? `text-${align}` : '')
</script>

<template>
  <component
    :is="tag"
    :class="[
      bem.b(),
      mdVariantClass,
      colorClass,
      weightClass,
      lineHeightClass,
      alignClass,
      bem.is('with-gutter', gutterBottom),
    ]"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/typography' as *;

@include b(JvTitle) {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--jv-theme-on-surface);

  // Material Design 标题类
  &.md-h1 {
    @include typography-h1;
  }

  &.md-h2 {
    @include typography-h2;
  }

  &.md-h3 {
    @include typography-h3;
  }

  &.md-h4 {
    @include typography-h4;
  }

  &.md-h5 {
    @include typography-h5;
  }

  &.md-h6 {
    @include typography-h6;
  }

  // 尺寸变体
  &--h1 {
    font-size: var(--jv-font-size-h1);
    font-weight: var(--jv-font-weight-light);
    letter-spacing: var(--jv-letter-spacing-tight);
  }

  &--h2 {
    font-size: var(--jv-font-size-h2);
    font-weight: var(--jv-font-weight-light);
    letter-spacing: var(--jv-letter-spacing-tight);
  }

  &--h3 {
    font-size: var(--jv-font-size-h3);
    font-weight: var(--jv-font-weight-regular);
    letter-spacing: var(--jv-letter-spacing-normal);
  }

  &--h4 {
    font-size: var(--jv-font-size-h4);
    font-weight: var(--jv-font-weight-regular);
    letter-spacing: var(--jv-letter-spacing-normal);
  }

  &--h5 {
    font-size: var(--jv-font-size-h5);
    font-weight: var(--jv-font-weight-regular);
    letter-spacing: var(--jv-letter-spacing-normal);
  }

  &--h6 {
    font-size: var(--jv-font-size-h6);
    font-weight: var(--jv-font-weight-medium);
    letter-spacing: var(--jv-letter-spacing-normal);
  }

  // 颜色
  &.text-primary {
    color: var(--jv-theme-primary);
  }

  &.text-secondary {
    color: var(--jv-theme-secondary);
  }

  &.text-success {
    color: var(--jv-theme-success);
  }

  &.text-warning {
    color: var(--jv-theme-warning);
  }

  &.text-danger {
    color: var(--jv-theme-danger);
  }

  &.text-info {
    color: var(--jv-theme-info);
  }

  &.text-default {
    color: var(--jv-theme-on-surface);
  }

  // 字重
  &.font-light {
    font-weight: var(--jv-font-weight-light);
  }

  &.font-regular {
    font-weight: var(--jv-font-weight-regular);
  }

  &.font-medium {
    font-weight: var(--jv-font-weight-medium);
  }

  &.font-semibold {
    font-weight: var(--jv-font-weight-semibold);
  }

  &.font-bold {
    font-weight: var(--jv-font-weight-bold);
  }

  // 行高
  &.leading-none {
    line-height: var(--jv-line-height-none);
  }

  &.leading-tight {
    line-height: var(--jv-line-height-tight);
  }

  &.leading-snug {
    line-height: var(--jv-line-height-snug);
  }

  &.leading-normal {
    line-height: var(--jv-line-height-normal);
  }

  &.leading-relaxed {
    line-height: var(--jv-line-height-relaxed);
  }

  &.leading-loose {
    line-height: var(--jv-line-height-loose);
  }

  // 对齐方式
  &.text-left {
    text-align: left;
  }

  &.text-center {
    text-align: center;
  }

  &.text-right {
    text-align: right;
  }

  &.text-justify {
    text-align: justify;
  }

  // 底部间距
  &.is-with-gutter {
    margin-bottom: 0.5em;
  }
}
</style>
