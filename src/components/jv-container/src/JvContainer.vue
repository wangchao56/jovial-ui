<script setup lang="ts">
import type { JvContainerProps } from './types'
import { JVCONTAINER_NAME } from './types'

defineOptions({ name: JVCONTAINER_NAME, inheritAttrs: false })

// 未使用的props，添加下划线前缀
const _props = withDefaults(defineProps<JvContainerProps>(), {
  // 默认属性值
})

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()

// 如需解构props，请按需添加
// const propsRefs = toRefs(props)
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
