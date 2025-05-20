<script setup lang="ts">
import type { JvCardContentProps } from './types'
import { computed } from 'vue'
import { bem, JVCARDCONTENT_NAME } from './types'

defineOptions({ name: JVCARDCONTENT_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardContentProps>(), {
  padding: 'md',
  divider: false,
})

const { content, padding, divider } = props

const contentClasses = computed(() => {
  return [
    bem.e('content'),
    bem.m(`padding-${padding}`),
    { 'has-divider': divider },
  ]
})
</script>

<template>
  <div :class="contentClasses">
    <slot>{{ content }}</slot>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/typography' as *;

.jv-card__content {
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: 16px;
  padding-top: 0;
  grid-area: content;
  order: 2;

  // 文本内容自动换行
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  align-self: stretch;

  @include typography-body2;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

  &.has-divider {
    border-top: 1px solid var(--jv-theme-outline-variant);
  }

  &.padding-none {
    padding: 0;
  }

  &.padding-xs {
    padding: 4px;
  }

  &.padding-sm {
    padding: 8px;
  }

  &.padding-md {
    padding: 16px;
    padding-top: 0;
  }

  &.padding-lg {
    padding: 24px;
  }

  &.padding-xl {
    padding: 32px;
  }
}
</style>
