<script setup lang="ts">
import type { JvRadioGroupContext } from './group'
import type { JvRadioEmits, JvRadioProps } from './types'
import JvButton from '@components/jv-button/src/JvButton.vue'
import { computed, inject, useId } from 'vue'
import { JvRadioGroupContextKey } from './group'
import { bem, JVRADIO_NAME } from './types'

defineOptions({ name: JVRADIO_NAME, inheritAttrs: false })

const {
  label = '',
  disabled = false,
  name,
  size = 'medium',
  bordered = false,
  animated = true,
  color,
} = defineProps<JvRadioProps>()

const emit = defineEmits<JvRadioEmits>()
const radioValue = defineModel('modelValue', { required: false })
// 获取RadioGroup上下文
const radioGroup = inject(
  JvRadioGroupContextKey,
  null,
) as JvRadioGroupContext | null

// 计算是否被选中
const isChecked = computed(() => {
  if (radioGroup && radioGroup.modelValue) {
    return radioGroup.modelValue.value === label
  }
  return radioValue.value === label
})

// 计算是否禁用
const isDisabled = computed(
  () => disabled || !!(radioGroup && radioGroup.disabled),
)

// 获取name属性
const radioName = computed(() => name || (radioGroup && radioGroup.name) || `radio-${useId()}`)

// 获取动画属性
const hasAnimation = computed(() =>
  animated === undefined
    ? radioGroup && radioGroup.animated !== undefined
      ? radioGroup.animated
      : true
    : animated,
)

// 点击处理
function handleClick(e: MouseEvent) {
  if (isDisabled.value)
    return
  radioGroup?.setValue(label)
  emit('click', e)

  const newValue = label

  if (radioGroup) {
    radioGroup.dispatch('update:modelValue', newValue, 'value')
    radioGroup.dispatch('change', newValue, 'value')
  }
  else {
    emit('change', newValue)
  }
}

const radioIcon = computed(() => {
  if (isChecked.value) {
    return '$radioBoxMarked'
  }
  return '$radioBoxBlank'
})
</script>

<template>
  <label
    :class="[
      bem.b(),
      bem.is('checked', isChecked),
      bem.is('disabled', isDisabled),
      size && bem.m(`size-${size}`),
      bem.is('bordered', bordered),
      bem.is('animated', hasAnimation),
    ]"
    @click="handleClick"
  >
    <span :class="bem.e('input')">
      <input
        type="radio"
        :name="radioName"
        :disabled="isDisabled"
        :checked="isChecked"
        hidden
      >
      <span :class="bem.e('inner')">
        <JvButton variant="text" :icon="radioIcon" :color="color" :size="size" />
      </span>
    </span>
    <span :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
@include b(radio) {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  padding-right: 16px;
  cursor: pointer;
  user-select: none;

  @include m(size-tiny) {
    font-size: 10px;
  }

  @include m(size-small) {
    font-size: 12px;
  }

  @include m(size-medium) {
    font-size: 14px;
  }

  @include m(size-large) {
    font-size: 16px;
  }

  @include m(size-xlarge) {
    font-size: 20px;
  }

  @include m(size-huge) {
    font-size: 24px;
  }

  @include e(input) {
    position: relative;
    margin-right: 8px;
  }

  @include e(inner) {
    position: relative;
  }

  @include e(label) {
    font-size: 14px;
  }

  @include when(checked) {
    border-color: #409eff;

    &::after {
      transform: scale(1);
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @include when(bordered) {
    border: 1px solid #409eff;
    border-radius: var(--jv-rounded-md);
  }
}
</style>
