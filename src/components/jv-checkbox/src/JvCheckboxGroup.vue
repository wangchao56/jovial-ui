<script setup lang="ts">
import type { JvCheckboxGroupProps } from './types'
import { computed, provide, toRef } from 'vue'
import { bemGroup, JVCHECKBOXGROUP_NAME, JvCheckboxGroupContextKey } from './types'

defineOptions({ name: JVCHECKBOXGROUP_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvCheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  size: 'medium',
  direction: 'horizontal',
  gap: 12,
})

const emit = defineEmits(['update:modelValue', 'change'])

// 双向绑定
const groupValue = defineModel<(string | number)[]>('modelValue', { default: () => [] })

// 最大选择限制
const isMaxLimit = computed(() =>
  props.max !== undefined && (groupValue.value || []).length >= props.max,
)

// 向子组件提供上下文
provide(JvCheckboxGroupContextKey, {
  name: JVCHECKBOXGROUP_NAME,
  modelValue: groupValue,
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  max: toRef(props, 'max'),
  isMaxLimit,
  // 更新方法
  updateModel: (val: string | number | boolean, checked: boolean) => {
    if (!val || typeof val === 'boolean')
      return

    const newValue = [...(groupValue.value || [])]

    if (checked) {
      // 达到最大限制时不处理
      if (props.max !== undefined && newValue.length >= props.max) {
        return
      }

      // 添加值(防重复)
      if (!newValue.includes(val)) {
        newValue.push(val)
      }
    }
    else {
      // 移除值
      const index = newValue.indexOf(val)
      if (index !== -1) {
        newValue.splice(index, 1)
      }
    }

    groupValue.value = newValue
    emit('change', newValue)
  },
})

// 计算容器类名
const groupClasses = computed(() => {
  const classes = [
    bemGroup.b(),
    bemGroup.m(`direction-${props.direction}`),
    props.disabled ? bemGroup.is('disabled', true) : '',
  ]

  // 处理自定义类名
  if (props.customClass) {
    if (typeof props.customClass === 'string') {
      classes.push(props.customClass)
    }
    else if (Array.isArray(props.customClass)) {
      classes.push(...props.customClass)
    }
    else {
      for (const [className, condition] of Object.entries(props.customClass)) {
        if (condition)
          classes.push(className)
      }
    }
  }

  return classes.filter(Boolean)
})

// 计算容器样式
const groupStyles = computed(() => {
  const baseStyles: Record<string, string> = {
    ...(props.customStyle || {}),
  }

  const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  baseStyles[props.direction === 'horizontal' ? 'gap' : 'rowGap'] = gapValue

  return baseStyles
})
</script>

<template>
  <div :class="groupClasses" :style="groupStyles" role="group" aria-label="复选框组">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@include b(checkbox-group) {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  @include m(direction-horizontal) {
    flex-direction: row;
  }

  @include m(direction-vertical) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
