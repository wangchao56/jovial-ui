<script setup lang="ts">
// 同级导入
import type { JvDropdownItemEmits, JvDropdownItemProps, JvDropdownItemSlots } from './types'
// 外部导入
import { computed, inject, useAttrs } from 'vue'
// 内部导入
import { createNamespace } from '@/utils'
import { JVDROPDOWNITEM_NAME } from './types'

defineOptions({ name: JVDROPDOWNITEM_NAME })

const props = withDefaults(defineProps<JvDropdownItemProps>(), {
  disabled: false,
  active: false,
  divider: false,
})

const emit = defineEmits<JvDropdownItemEmits>()

defineSlots<JvDropdownItemSlots>()

const bem = createNamespace(JVDROPDOWNITEM_NAME)

// 尝试从父组件中获取关闭方法和选择方法
const parentClose = inject<() => void>('jv-dropdown-close', () => {})
const parentSelect = inject<(value: any) => void>('jv-dropdown-select', () => {})

// 合并外部样式和自定义类
const attrs = useAttrs()
const classes = computed(() => ({
  [bem.b()]: true,
  'jv-dropdown-item': true,
  [bem.is('disabled', props.disabled)]: props.disabled,
  [bem.is('active', props.active)]: props.active,
  [bem.is('divider', props.divider)]: props.divider,
}))

// 处理点击事件
function handleClick(_event: MouseEvent) {
  if (props.disabled || props.divider)
    return

  emit('click', props.value)
  // 通知父级选择事件
  parentSelect(props.value)
  // 点击后关闭下拉菜单
  parentClose()
}
</script>

<template>
  <div
    v-if="divider"
    class="jv-dropdown-group__divider"
  />
  <div
    v-else
    v-bind="attrs"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style lang="scss">
// 组件样式已在JvDropdown.vue中定义
</style>
