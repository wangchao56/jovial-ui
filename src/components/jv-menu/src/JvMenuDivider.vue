<script setup lang="ts">
import { defineOptions } from 'vue'
import JvDivider from '@/components/jv-divider/src/JvDivider.vue'
import { createNamespace } from '@/utils'

defineOptions({
  name: 'JvMenuDivider',
  inheritAttrs: false,
})

const bem = createNamespace('JvMenuDivider')
</script>

<template>
  <JvDivider
    :class="bem.b()"
    color="var(--jv-divider-color, rgba(0, 0, 0, 0.12))"
    size="1px"
    variant="solid"
    :inset="true"
    spacing="xs"
    role="separator"
    aria-orientation="horizontal"
    v-bind="$attrs"
  />
</template>

<style lang="scss">
@include b(menu-divider) {
  margin: 4px 0;
}
</style>
