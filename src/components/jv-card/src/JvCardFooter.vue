<script setup lang="ts">
import { bem, JVCARDFOOTER_NAME } from './types'

defineOptions({ name: JVCARDFOOTER_NAME, inheritAttrs: false })
</script>

<template>
  <div :class="bem.e('footer')">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.jv-card__footer {
  box-sizing: border-box;
  width: 100%;
  padding: var(--jv-card-padding);
  padding-top: calc(var(--jv-card-padding) / 2);
  border-top: 1px solid var(--jv-theme-outline-variant);
  order: 4;
}
</style>
