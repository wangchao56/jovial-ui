<script setup lang="ts">
import type { JvSubMenuProps } from './types'
import JvCollapse from '@/components/jv-collapse/src/JvCollapse.vue'
import { createNamespace } from '@/utils'
import { ref } from 'vue'

defineOptions({
  name: 'JvSubMenu',
  inheritAttrs: false,
})

const { id, title, disabled, expanded: defaultExpanded = false, icon, showArrow, lazy } = defineProps<JvSubMenuProps>()

const emit = defineEmits<JvSubMenuEmits>()
const expanded = ref(defaultExpanded)
const bem = createNamespace('JvSubMenu')

interface JvSubMenuEmits {
  (e: 'update:expanded', value: boolean): void
  (e: 'expand', event?: MouseEvent | KeyboardEvent): void
  (e: 'collapse', event?: MouseEvent | KeyboardEvent): void
}

// 处理展开状态变化
function handleExpandChange(value: boolean) {
  emit('update:expanded', value)

  if (value) {
    emit('expand')
  }
  else {
    emit('collapse')
  }
}
</script>

<template>
  <li :class="bem.b()" :data-expanded="expanded" :data-disabled="disabled" role="menuitem">
    <JvCollapse
      v-model="expanded" :title="title" :icon="icon" :disabled="disabled" :show-arrow="showArrow"
      :lazy="lazy" :custom-class="bem.e('collapse')" @update:model-value="handleExpandChange"
    >
      <!-- 自定义图标 -->
      <template v-if="$slots.icon" #prepend>
        <span :class="bem.e('icon')" aria-hidden="true">
          <slot name="icon" />
        </span>
      </template>
      <!-- 自定义标题部分需要正确的角色 -->
      <template #title>
        <slot name="title">
          {{ title }}
        </slot>
      </template>
      <!-- 自定义箭头 -->
      <template v-if="$slots.arrow" #append>
        <span :class="bem.e('arrow')" aria-hidden="true">
          <slot name="arrow" />
        </span>
      </template>
      <template #default>
        <!-- 子菜单内容 -->
        <div :class="bem.e('content')" role="group" :aria-labelledby="id || undefined">
          <slot />
        </div>
      </template>
    </JvCollapse>
  </li>
</template>

<style lang="scss">
@include b(submenu) {
  position: relative;
  width: 100%;

  @include e(collapse) {
    border-radius: 0 !important;

    .jv-collapse__header {
      padding: 8px 16px;
      background-color: transparent;
      font-weight: normal;

      &:hover {
        background-color: var(--jv-menu-hover-bg, rgb(0 0 0 / 0.04));
      }

      // 确保子菜单标题可以获得正确的焦点样式
      &:focus-visible {
        outline: 2px solid var(--jv-theme-primary, #1976d2);
        outline-offset: -2px;
      }
    }

    .jv-collapse__inner {
      padding: 0;
    }
  }

  @include e(title-wrapper) {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }

  @include e(icon) {
    flex-shrink: 0;
    margin-right: 8px;
  }

  @include e(arrow) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  @include e(content) {
    [role='menuitem'] {
      padding-left: 32px; // 子菜单项增加缩进
    }
  }

  // 使用ARIA状态选择器增强可访问性
  [aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
