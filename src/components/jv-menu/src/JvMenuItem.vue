<script setup lang="ts">
import type { JvMenuItemEmits, JvMenuItemProps } from './types'
import { computed } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { createNamespace } from '@/utils'

defineOptions({
  name: 'JvMenuItem',
  inheritAttrs: false,
})

const { id, title, icon, disabled, active, data } = defineProps<JvMenuItemProps>()

const emit = defineEmits<JvMenuItemEmits>()

const bem = createNamespace('JvMenuItem')

// 处理点击事件
function handleClick(_event: MouseEvent) {
  if (disabled)
    return

  // 将当前菜单项数据作为参数传递给click事件
  emit('click', {
    id,
    title,
    icon,
    disabled,
    active,
    data,
  })
}

// 计算样式类
const classes = computed(() => [
  bem.b(),
  {
    [bem.m('active')]: active,
    [bem.m('disabled')]: disabled,
  },
])
</script>

<template>
  <li
    :class="classes"
    role="menuitem"
    :aria-disabled="disabled"
    :aria-current="active ? 'true' : undefined"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.space.prevent="(e: KeyboardEvent) => handleClick(e as any)"
  >
    <!-- 图标 -->
    <slot v-if="$slots.icon" name="icon">
      <JvIcon v-if="icon" :name="icon" :class="bem.e('icon')" />
    </slot>
    <!-- 内容 -->
    <div :class="bem.e('content')">
      <slot>{{ title }}</slot>
    </div>
  </li>
</template>

<style lang="scss">
@include b(menu-item) {
  display: flex;
  overflow: hidden;
  align-items: center;
  padding: 8px 16px;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  text-overflow: ellipsis;
  user-select: none;

  &:hover,
  &:focus {
    background-color: var(--jv-menu-hover-bg, rgb(0 0 0 / 0.04));
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--jv-theme-primary, #1976d2);
    outline-offset: -2px;
  }

  @include m(active) {
    background-color: var(--jv-menu-active-bg, rgb(25 118 210 / 0.1));
    color: var(--jv-theme-primary, #1976d2);
    font-weight: 500;
  }

  @include m(disabled) {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  @include e(icon) {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 16px;
  }

  @include e(content) {
    overflow: hidden;
    flex: 1;
    text-overflow: ellipsis;
  }
}
</style>
