<script setup lang="ts">
import type { JvLinkProps } from './types'
import { computed } from 'vue'
import { createNamespace } from '@/utils'

defineOptions({
  name: 'JvLink',
  inheritAttrs: true,
})

const { href, target, rel, size, type, underline, disabled } = defineProps<JvLinkProps>()
const emit = defineEmits(['click'])
const bem = createNamespace('link')

function handleClick(event: MouseEvent) {
  if (disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const computedRel = computed(() => {
  if (target === '_blank' && !rel) {
    return 'noopener noreferrer'
  }
  return rel
})
</script>

<template>
  <a
    role="link" :href="href" :target="target" :rel="computedRel"
    :class="[bem.b(), bem.m(size), bem.m(type), bem.is('underline', underline), bem.is('disabled', disabled)]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/typography' as *;

$link-variants: ('primary', 'secondary', 'success', 'warning', 'error', 'info', 'default');
$link-weights: ('light', 'regular', 'medium', 'semibold', 'bold');
$link-line-heights: ('none', 'tight', 'snug', 'normal', 'relaxed', 'loose');
$link-sizes: ('tiny', 'small', 'base', 'large', 'xlarge');

@include b(link) {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  // 变体
  @each $variant in $link-variants {
    &--#{$variant} {
      color: var(--jv-theme-#{$variant});
    }
  }

  // 权重
  @each $weight in $link-weights {
    &--#{$weight} {
      font-weight: var(--jv-font-weight-#{$weight});
    }
  }

  // 行高
  @each $line-height in $link-line-heights {
    &--#{$line-height} {
      line-height: var(--jv-line-height-#{$line-height});
    }
  }

  // 下划线
  &.is-underline {
    text-decoration: underline;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
