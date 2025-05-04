<script setup lang="ts">
import type { JvBadgeProps } from './types'
import { computed } from 'vue'
import { bem, JVBADGE_NAME } from './types'

defineOptions({ name: JVBADGE_NAME, inheritAttrs: false })

const {
  value,
  max = 99,
  dot = false,
  hidden = false,
  type = 'error',
  offset
} = defineProps<JvBadgeProps>()

// 声明组件事件
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 计算显示的内容
const content = computed(() => {
  if (dot) return ''

  if (typeof value === 'number' && typeof max === 'number') {
    return value > max ? `${max}+` : `${value}`
  }

  return value
})

// 计算样式
const badgeStyle = computed(() => {
  if (!offset) return {}

  const [x, y] = offset
  return {
    transform: `translate(${x}px, ${y}px)`
  }
})
</script>

<template>
  <div :class="bem.b()">
    <slot />
    <sup
      v-if="!hidden && (content || dot)"
      :class="[
        bem.e('content'),
        bem.m(`type-${type}`),
        bem.is('dot', dot),
        bem.is('fixed', !!$slots.default)
      ]"
      :style="badgeStyle"
      @click="emit('click', $event)"
    >
      {{ content }}
    </sup>
  </div>
</template>

<style lang="scss">
@include b(badge) {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  @include e(content) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    background-color: var(--jv-theme-error);
    color: var(--jv-theme-on-error);
    font-size: 12px;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;

    &.jv-badge__content--is-fixed {
      position: absolute;
      top: 0;
      right: 0;
    }

    @include when(dot) {
      width: 8px;
      min-width: 8px;
      height: 8px;
      padding: 0;
      border-radius: var(--jv-rounded-pill);
    }

    @include m(type-primary) {
      background-color: var(--jv-theme-primary);
      color: var(--jv-theme-on-primary);
    }

    @include m(type-success) {
      background-color: var(--jv-theme-success);
      color: var(--jv-theme-on-success);
    }

    @include m(type-warning) {
      background-color: var(--jv-theme-warning);
      color: var(--jv-theme-on-warning);
    }

    @include m(type-error) {
      background-color: var(--jv-theme-error);
      color: var(--jv-theme-on-error);
    }

    @include m(type-info) {
      background-color: var(--jv-theme-info);
      color: var(--jv-theme-on-info);
    }
  }
}
</style>
