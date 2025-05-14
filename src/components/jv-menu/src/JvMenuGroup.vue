<script setup lang="ts">
import type { JvMenuGroupProps } from './types'
import { createNamespace } from '@/utils'

defineOptions({
  name: 'JvMenuGroup',
  inheritAttrs: false,
})

withDefaults(defineProps<JvMenuGroupProps>(), {
  title: '',
  disabled: false,
})

const bem = createNamespace('JvMenuGroup')
</script>

<template>
  <menu :class="bem.b()" :data-disabled="disabled">
    <!-- 分组标题 -->
    <div
      :class="bem.e('title')"
      :aria-disabled="disabled"
      role="presentation"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <!-- 分组内容 -->
    <div :class="bem.e('content')">
      <slot />
    </div>
  </menu>
</template>

<style lang="scss">
@include b(menu-group) {
  margin: 4px 0;
  padding: 0;

  @include e(title) {
    padding: 6px 16px;
    color: var(--jv-text-secondary, rgb(0 0 0 / 0.6));
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    user-select: none;

    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  @include e(content) {
    padding: 0;

    [role='menuitem'] {
      padding-left: 24px; // 子菜单项增加缩进
    }
  }

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
