<script setup lang="ts">
import type { JvTextareaProps } from './types'
import { JVTEXTAREA_NAME } from './types'

defineOptions({ name: JVTEXTAREA_NAME, inheritAttrs: false })

// 未使用的props，添加下划线前缀
const _props = withDefaults(defineProps<JvTextareaProps>(), {
  // 默认属性值
})

// 如需解构props，请按需添加
// const propsRefs = toRefs(props)

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div class="jv-textarea">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-textarea {
  // 组件样式
}
</style>
