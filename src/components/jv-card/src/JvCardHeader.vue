<script setup lang="ts">
import type { JvCardHeaderProps } from './types'
import { bem, JVCARDHEADER_NAME } from './types'

defineOptions({ name: JVCARDHEADER_NAME, inheritAttrs: false })

const { title, subtitle } = defineProps<JvCardHeaderProps>()
</script>

<template>
  <div :class="bem.e('header')">
    <div v-if="$slots.title" :class="bem.e('title')">
      <slot name="title" />
    </div>
    <div v-else-if="title" :class="bem.e('title')">
      {{ title }}
    </div>
    <div v-if="$slots.subtitle" :class="bem.e('subtitle')">
      <slot name="subtitle" />
    </div>
    <div v-else-if="subtitle" :class="bem.e('subtitle')">
      {{ subtitle }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@mixin text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
  hyphens: auto;
  letter-spacing: 0.0125em;
}

.jv-card__header {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  order: 1;
}

.jv-card__title {
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.8;

  @include text-overflow-ellipsis;
}

.jv-card__subtitle {
  padding-bottom: 4px;
  color: rgba(0, 0, 0, 0.256);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

  @include text-overflow-ellipsis;
}
</style>
