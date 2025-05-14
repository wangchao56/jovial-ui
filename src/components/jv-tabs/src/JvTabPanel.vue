<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { bem } from './types'

defineOptions({ name: 'JvTabPanel', inheritAttrs: false })

const props = withDefaults(
  defineProps<JvTabPanelProps>(),
  {
    lazy: false,
  },
)

interface JvTabPanelProps {
  /**
   * 面板的唯一值，与对应标签的value匹配
   */
  value?: string | number
  /**
   * 是否启用延迟加载，仅在激活时加载内容
   */
  lazy?: boolean
}

// 获取父组件提供的上下文
const tabs = inject('tabs', {
  activeTab: ref(''),
  updateActiveTab: () => {},
  variant: computed(() => 'default'),
  color: computed(() => 'primary'),
  vertical: computed(() => false),
})

// 计算面板是否激活
const isActive = computed(() => tabs.activeTab.value === props.value)

// 记录面板是否曾经被激活过
const hasBeenActive = ref(isActive.value)

// 监听激活状态变化
if (props.lazy) {
  // 如果是懒加载模式，记录面板是否曾经被激活过
  // 这样即使面板不再激活，也不会卸载已加载的内容
  if (isActive.value) {
    hasBeenActive.value = true
  }
}

// 计算面板样式类
const panelClass = computed(() => [
  `${bem.b()}-panel`,
  {
    [`${bem.b()}-panel--active`]: isActive.value,
  },
])
</script>

<template>
  <div
    v-show="isActive"
    :class="panelClass"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot v-if="!lazy || hasBeenActive" />
  </div>
</template>

<style lang="scss">
@include b(tabs) {
  &-panel {
    width: 100%;
    padding: 1rem 0;

    &--active {
      display: block;
    }
  }
}
</style>
