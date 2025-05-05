<script setup lang="ts">
import type { JvMainProps } from './types'
import { JVMAN_NAME } from './types'

defineOptions({ name: JVMAN_NAME, inheritAttrs: false })

// 未使用的props，添加下划线前缀
const _props = withDefaults(defineProps<JvMainProps>(), {
  // 默认属性值
})

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div class="jv-container">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-container {
  // 组件样式
}
</style>
