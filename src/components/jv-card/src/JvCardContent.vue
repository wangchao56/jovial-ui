<script setup lang="ts">
import type { JvCardContentProps } from './types'
import { bem, JVCARDCONTENT_NAME } from './types'

defineOptions({ name: JVCARDCONTENT_NAME, inheritAttrs: false })
defineProps<JvCardContentProps>()
</script>

<template>
  <div :class="bem.e('content')">
    <slot>{{ content }}</slot>
  </div>
</template>

<style lang="scss" scoped>
.jv-card__content {
  flex: 1;
  box-sizing: border-box;
  padding: 0 16px 16px;
  order: 2;

  //   文本内容 自动换行
  word-break: break-all;
}
</style>
