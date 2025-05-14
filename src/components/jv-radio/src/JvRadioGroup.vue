<script setup lang="ts">
import type { JvRadioGroupEmits, JvRadioGroupExpose } from './group'
import { provide, toRef, watch } from 'vue'
import {
  bem,
  JVRADIOGROUP_NAME,
  JvRadioGroupContextKey,
  jvRadioGroupProps,
} from './group'

defineOptions({ name: JVRADIOGROUP_NAME, inheritAttrs: false })

const props = defineProps(jvRadioGroupProps)

const emit = defineEmits<JvRadioGroupEmits>()

// 组件内部值，初始化为props中的modelValue
const radioGroupValue = defineModel('modelValue', { required: false })

// 当props.modelValue变化时更新内部值
watch(
  () => props.modelValue,
  (value) => {
    if (value !== radioGroupValue.value) {
      radioGroupValue.value = value
    }
  },
)

// 更新值的方法
function dispatch(
  event: 'change' | 'update:modelValue',
  value: any,
  _valueType: string,
) {
  radioGroupValue.value = value
  if (event === 'update:modelValue') {
    emit('update:modelValue', value)
  }
  else if (event === 'change') {
    emit('change', value)
  }
}

// 重置功能
function reset() {
  radioGroupValue.value = undefined
  emit('update:modelValue', undefined)
}

// 获取当前值
const getValue = () => radioGroupValue.value as string | number | boolean | undefined

// 设置当前值
function setValue(value: any) {
  radioGroupValue.value = value
}

// 向子组件提供上下文
provide(JvRadioGroupContextKey, {
  name: props.name,
  modelValue: toRef(props, 'modelValue'),
  disabled: props.disabled,
  color: props.color,
  animated: props.animated,
  dispatch,
  setValue,
})

// 向外部暴露的方法
defineExpose<JvRadioGroupExpose>({
  reset,
  getValue,
})
</script>

<template>
  <fieldset
    :class="[
      bem.b(),
      bem.is('column', column),
      bem.is('inline', inline),
      bem.is('bordered', bordered),
      bem.is('compact', compact),
      bem.is('disabled', disabled),
    ]" :aria-disabled="disabled"
  >
    <legend v-if="label || $slots.legend || $slots.label">
      <slot name="legend">
        <slot name="label">
          {{ label }}
        </slot>
      </slot>
    </legend>
    <div :class="bem.e('wrapper')">
      <slot />
    </div>
  </fieldset>
</template>

<style lang="scss">
@include b(radio-group) {
  position: relative;
  display: inline-block;
  min-width: fit-content;
  margin: 0;
  padding: 0;
  border: none;

  @include e(wrapper) {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 12px;
    min-width: fit-content;
    place-content: flex-start flex-start;
  }

  @include e(legend) {
    margin-bottom: 8px;
    color: #606266;
    font-size: 14px;
    font-weight: 500;
  }

  @include when(column) {
    @include e(wrapper) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @include when(inline) {
    @include e(wrapper) {
      display: inline-flex;
    }
  }

  @include when(bordered) {
    padding: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    legend {
      padding: 0 8px;
    }
  }

  @include when(compact) {
    @include e(wrapper) {
      gap: 0;

      .jv-radio {
        margin-right: 0;
        margin-left: 0;

        &.is-bordered {
          margin-right: -1px;
          border-radius: 0;

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            margin-right: 0;
          }
        }
      }
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    legend {
      color: #c0c4cc;
    }
  }
}
</style>
