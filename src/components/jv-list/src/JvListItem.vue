<script setup lang="ts">
import type { JvListItemProps, JvListItemSlots } from './item'
import { h } from 'vue'
import JvCardHeader from '@/components/jv-card/src/JvCardHeader.vue'
import { JVLISTITEM_NAME } from './item'
import { bem } from './types'

defineOptions({ name: JVLISTITEM_NAME, inheritAttrs: false })

const props = defineProps<JvListItemProps>()
defineSlots<JvListItemSlots>()
</script>

<template>
  <component
    :is="props.link ? 'a' : 'div'"
    :href="props.link"
    :class="[bem.e('item'), { [bem.em('item', 'link')]: props.link }]"
  >
    <component
      :is="h(JvCardHeader, {
        title: props.title,
        subtitle: props.subtitle,
        description: props.description,
        icon: props.icon,
      }, $slots)"
    />
    <slot name="append" />
  </component>
</template>

<style lang="scss">
@include b(list) {
  @include e(item) {
    display: flex;
    align-items: center;
    padding: var(--jv-spacing-md);
    transition: background-color 0.2s ease;

    @include m(link) {
      color: inherit;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background-color: var(--jv-color-hover);
      }
    }
  }
}
</style>
