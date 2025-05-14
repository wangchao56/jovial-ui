<script setup lang="ts">
import type { JvListProps, JvListSlots } from './types'
import { computed } from 'vue'
import { bem, JVLIST_NAME } from './types'

defineOptions({ name: JVLIST_NAME, inheritAttrs: false })

const props = withDefaults(
  defineProps<JvListProps>(),
  {
    bordered: false,
    rounded: false,
    dense: false,
    disabled: false,
    divided: false,
    hover: false,
  },
)

defineSlots<JvListSlots>()

const listStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number'
      ? `${props.maxHeight}px`
      : props.maxHeight
    style.overflow = 'auto'
  }
  return style
})

const listClasses = computed(() => ([
  bem.b(),
  {
    [bem.m('bordered')]: props.bordered,
    [bem.m('rounded')]: props.rounded,
    [bem.m('dense')]: props.dense,
    [bem.m('disabled')]: props.disabled,
    [bem.m('divided')]: props.divided,
    [bem.m('hover')]: props.hover,
    [bem.m(`color-${props.color}`)]: props.color,
  },
]))
</script>

<template>
  <div :class="listClasses" :style="listStyle">
    <div v-if="$slots.header" :class="bem.e('header')">
      <slot name="header" />
    </div>
    <div :class="bem.e('content')">
      <slot />
    </div>
    <div v-if="$slots.empty && !$slots.default" :class="bem.e('empty')">
      <slot name="empty" />
    </div>
    <div v-if="$slots.footer" :class="bem.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@include b(list) {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--jv-color-background);

  @include e(header) {
    padding: var(--jv-spacing-md);
    font-weight: var(--jv-font-weight-medium);
  }

  @include e(content) {
    flex: 1;
  }

  @include e(footer) {
    padding: var(--jv-spacing-md);
  }

  @include e(empty) {
    padding: var(--jv-spacing-md);
    color: var(--jv-color-text-secondary);
    text-align: center;
  }

  @include m(bordered) {
    border: 1px solid var(--jv-color-border);
  }

  @include m(rounded) {
    border-radius: var(--jv-rounded);
  }

  @include m(dense) {
    & > * {
      padding-top: var(--jv-spacing-xs);
      padding-bottom: var(--jv-spacing-xs);
    }
  }

  @include m(disabled) {
    opacity: 0.6;
    pointer-events: none;
  }

  @include m(divided) {
    & > *:not(:last-child) {
      border-bottom: 1px solid var(--jv-color-border);
    }
  }

  @include m(hover) {
    & > *:hover {
      background-color: var(--jv-color-hover);
    }
  }

  @each $color in (primary, secondary, success, warning, danger, info) {
    @include m(color-#{$color}) {
      background-color: var(--jv-color-#{$color}-light);
    }
  }
}
</style>
