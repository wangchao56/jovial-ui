<script setup lang="ts">
import type { JvDividerProps } from './types'
import { JVDIVIDER_NAME } from './types'

defineOptions({ name: JVDIVIDER_NAME, inheritAttrs: false })

// 未使用的props，添加下划线前缀
withDefaults(defineProps<JvDividerProps>(), {
  // 默认属性值
})

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div class="jv-divider">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-divider {
  // 组件样式
}
</style>
