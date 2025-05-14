<script setup lang="ts">
import type { JvParagraphProps } from './types'
import { createNamespace } from '@/utils'
import { computed } from 'vue'

defineOptions({
  name: 'JvParagraph',
  inheritAttrs: false,
})

// 段落文本组件
// 支持Material Design排版规范和多行文本溢出
const {
  size = 'medium',
  mdVariant = 'body1',
  color = 'default',
  lineHeight = 'normal',
  align = 'justify',
  ellipsis = false,
  indent,
  lines,
  text,
} = defineProps<JvParagraphProps>()

const bem = createNamespace('JvParagraph')

// 计算样式类
const sizeClass = computed(() => {
  if (typeof size === 'string' && ['tiny', 'small', 'medium', 'large', 'xlarge'].includes(size)) {
    return bem.m(size)
  }
  return ''
})

const colorClass = computed(() => `text-${color}`)
const lineHeightClass = computed(() => `leading-${lineHeight}`)
const alignClass = computed(() => `text-${align}`)

// Material Design变体类
const mdVariantClass = computed(() => mdVariant ? `md-${mdVariant}` : '')

// 多行文本溢出
const ellipsisClass = computed(() => {
  if (ellipsis === true)
    return bem.e('ellipsis')
  if (typeof ellipsis === 'number' && ellipsis > 0)
    return `ellipsis-${ellipsis}`
  return ''
})

// 计算样式
const styles = computed(() => {
  const result: Record<string, string> = {}

  // 处理尺寸
  if (typeof size === 'number') {
    result.fontSize = `${size}px`
  }
  else if (typeof size === 'string' && !['tiny', 'small', 'medium', 'large', 'xlarge'].includes(size)) {
    result.fontSize = size
  }

  // 处理首行缩进
  if (indent !== undefined) {
    result.textIndent = `${indent}em`
  }

  // 处理行数限制
  if (lines !== undefined) {
    result['--jv-paragraph-lines'] = String(lines)
  }

  return result
})
</script>

<template>
  <p
    :class="[
      bem.b(),
      sizeClass,
      mdVariantClass,
      colorClass,
      lineHeightClass,
      alignClass,
      ellipsisClass,
      { [bem.e('lines')]: lines !== undefined },
    ]"
    :style="styles"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </p>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/typography' as *;

@include b(paragraph) {
  --jv-paragraph-margin-bottom: 1em;
  --jv-paragraph-color: var(--jv-theme-on-surface);
  --jv-paragraph-font-size: var(--jv-font-size-medium);
  --jv-paragraph-font-weight: var(--jv-font-weight-regular);
  --jv-paragraph-line-height: var(--jv-line-height-normal);
  --jv-paragraph-text-align: left;
  display: block;
  margin-bottom: var(--jv-paragraph-margin-bottom);
  color: var(--jv-paragraph-color);
  font-size: var(--jv-paragraph-font-size);
  font-weight: var(--jv-paragraph-font-weight);
  line-height: var(--jv-paragraph-line-height);
  text-align: var(--jv-paragraph-text-align);

  // 多行文本溢出
  &__ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: var(--jv-paragraph-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // 默认不限制行数
  &__lines {
    --jv-paragraph-lines: 0;
  }

  // 默认换行
  &--wrap {
    white-space: normal;
  }

  // 默认不换行
  &--nowrap {
    white-space: nowrap;
  }

  // 尺寸变体
  &--tiny {
    font-size: var(--jv-font-size-tiny);
  }

  &--small {
    font-size: var(--jv-font-size-small);
  }

  &--medium {
    font-size: var(--jv-font-size-medium);
  }

  &--large {
    font-size: var(--jv-font-size-large);
  }

  &--xlarge {
    font-size: var(--jv-font-size-xlarge);
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
}
</style>
