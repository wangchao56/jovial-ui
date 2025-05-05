<script setup lang="ts">
import type { JvFooterProps } from './types'
import { JVFOOTER_NAME } from './types'

defineOptions({ name: JVFOOTER_NAME, inheritAttrs: false })

// 未使用的props，添加下划线前缀
withDefaults(defineProps<JvFooterProps>(), {
  // 默认属性值
})

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div class="jv-footer">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-footer {
  // 组件样式
}
</style>
