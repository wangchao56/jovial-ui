<script setup lang="ts">
import type { JvTabPanelProps, JvTabsContext } from './types'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { bem, JvTabsContextKey } from './types'

defineOptions({ name: 'JvTabPanel', inheritAttrs: false })

const props = withDefaults(
  defineProps<JvTabPanelProps>(),
  {
    lazy: false,
  },
)

// 获取父组件提供的上下文
const tabs = inject(JvTabsContextKey, null) as JvTabsContext

// 计算面板是否激活
const isActive = computed(() => tabs && tabs.activeTab.value === props.value)

// 记录面板是否曾经被激活过
const hasBeenActive = ref(isActive.value)

// 监听激活状态变化
watch(isActive, (val) => {
  if (props.lazy && val) {
    hasBeenActive.value = true
  }
})

// 计算面板样式类
const panelClass = computed(() => [
  `${bem.b()}-panel`,
  {
    [`${bem.b()}-panel--active`]: isActive.value,
  },
])

// 在组件挂载时注册到父组件
onMounted(() => {
  tabs.addTabPanel(props)
})

// 在组件卸载前从父组件注销
onBeforeUnmount(() => {
  tabs.removeTabPanel(props)
})
</script>

<template>
  <div v-show="isActive" :class="panelClass" role="tabpanel" :aria-hidden="!isActive">
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
