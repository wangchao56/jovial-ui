<script setup lang="ts">
import type { JvTabsContext } from './types'
import { computed, inject, onMounted, ref } from 'vue'
import { bem, JvTabsContextKey } from './types'

defineOptions({ name: 'JvTabNavItem', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /**
     * 标签的唯一值，用于标识和切换
     */
    value: string | number
    /**
     * 标签显示的文本
     */
    label?: string
    /**
     * 是否禁用该标签
     */
    disabled?: boolean
    /**
     * 标签图标
     */
    icon?: string
    /**
     * 标签徽标内容
     */
    badge?: number | string | boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click', params: {
    offsetLeft: number
    offsetTop: number
    offsetWidth: number
    offsetHeight: number
  }): void
}>()

// 获取父组件提供的上下文
const tabs = inject(JvTabsContextKey, null) as JvTabsContext

const tabNavItemRef = ref<HTMLButtonElement>()
// 计算标签是否激活
const isActive = computed(() => tabs.activeTab.value === props.value)

// 点击标签处理函数
function handleClick() {
  if (props.disabled || !tabNavItemRef.value || !tabs)
    return
  tabs.updateActiveTab(props.value)
  if (tabNavItemRef.value) {
    emit('click', {
      offsetLeft: tabNavItemRef.value?.offsetLeft,
      offsetTop: tabNavItemRef.value?.offsetTop,
      offsetWidth: tabNavItemRef.value?.offsetWidth,
      offsetHeight: tabNavItemRef.value?.offsetHeight,
    })
  }
}

// 计算标签样式类
const tabClass = computed(() => [
  `${bem.b()}-nav__item`,
  {
    [`${bem.b()}-nav__item--active`]: isActive.value,
    [`${bem.b()}-nav__item--disabled`]: props.disabled,
  },
])
onMounted(() => {
  if (tabNavItemRef.value) {
    tabs.updateNavItemOffset({
      offsetLeft: tabNavItemRef.value?.offsetLeft,
      offsetTop: tabNavItemRef.value?.offsetTop,
      offsetWidth: tabNavItemRef.value?.offsetWidth,
      offsetHeight: tabNavItemRef.value?.offsetHeight,
    })
  }
})
</script>

<template>
  <button
    ref="tabNavItemRef" :class="tabClass" :disabled="disabled" :data-value="value" role="tab"
    :aria-selected="isActive" :tabindex="isActive ? 0 : -1" :aria-disabled="disabled" @click="handleClick"
  >
    <span v-if="icon" class="jv-tabs-nav__item-icon">
      <slot name="icon">
        <i :class="icon" />
      </slot>
    </span>
    <span class="jv-tabs-nav__item-content">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="badge" class="jv-tabs-nav__item-badge">
      {{ badge }}
    </span>
  </button>
</template>

<style lang="scss">
@include b(tabs) {
  &-nav__item {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;

    &-icon {
      margin-right: 0.5rem;
    }

    &-badge {
      margin-left: 0.5rem;
      padding: 0.1rem 0.4rem;
      border-radius: 10px;
      background-color: var(--jv-error);
      color: white;
      font-size: 0.75rem;
    }

    &--active {
      color: var(--jv-primary);
      font-weight: 500;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
