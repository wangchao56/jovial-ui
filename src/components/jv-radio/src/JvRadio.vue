<script setup lang="ts">
import type { JvRadioGroupContext } from './group'
import type { JvRadioEmits, JvRadioExpose, JvRadioProps } from './types'
import { computed, inject, ref } from 'vue'
import { JvRadioGroupContextKey } from './group'
import { bem, JVRADIO_NAME } from './types'

defineOptions({ name: JVRADIO_NAME, inheritAttrs: false })

const {
  modelValue,
  label = '',
  disabled = false,
  name,
  size = 'medium',
  bordered = false,
  ripple = true,
  animated = true,
  color
} = defineProps<JvRadioProps>()

const emit = defineEmits<JvRadioEmits>()

// 获取RadioGroup上下文
const radioGroup = inject(
  JvRadioGroupContextKey,
  null
) as JvRadioGroupContext | null

// 计算是否被选中
const isChecked = computed(() => {
  if (radioGroup && radioGroup.modelValue) {
    return radioGroup.modelValue.value === label
  }
  return modelValue === label
})

// 计算是否禁用
const isDisabled = computed(
  () => disabled || !!(radioGroup && radioGroup.disabled)
)

// 获取颜色
const radioColor = computed(
  () => color || (radioGroup && radioGroup.color) || '#409eff'
)

// 获取name属性
const radioName = computed(() => name || (radioGroup && radioGroup.name) || '')

// 获取动画属性
const hasAnimation = computed(() =>
  animated === undefined
    ? radioGroup && radioGroup.animated !== undefined
      ? radioGroup.animated
      : true
    : animated
)

// 波纹效果
const rippleEffect = ref<HTMLDivElement | null>(null)
const showRipple = ref(false)

// 点击处理
function handleClick(e: MouseEvent) {
  if (isDisabled.value) return

  emit('click', e)

  if (ripple && rippleEffect.value) {
    rippleEffect.value.style.left = `${e.offsetX}px`
    rippleEffect.value.style.top = `${e.offsetY}px`
    showRipple.value = true

    setTimeout(() => {
      showRipple.value = false
    }, 400)
  }

  const newValue = label

  if (radioGroup) {
    radioGroup.dispatch('update:modelValue', newValue, 'value')
    radioGroup.dispatch('change', newValue, 'value')
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

// 对外暴露的方法
function check() {
  if (!isDisabled.value && !isChecked.value) {
    handleClick(new MouseEvent('click'))
  }
}

const getChecked = () => isChecked.value

defineExpose<JvRadioExpose>({
  check,
  isChecked: getChecked
})
</script>

<template>
  <label
    :class="[
      bem.b(),
      bem.is('checked', isChecked),
      bem.is('disabled', isDisabled),
      bem.m(size),
      bem.is('bordered', bordered),
      bem.is('animated', hasAnimation)
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
      />
      <span
        :class="bem.e('inner')"
        :style="{
          borderColor: isChecked ? radioColor : '',
          '--radio-color': radioColor
        }"
      />
      <div
        v-if="ripple"
        ref="rippleEffect"
        :class="[bem.e('ripple'), { 'is-active': showRipple }]"
      />
    </span>
    <span :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
.jv-radio {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;

  &__input {
    position: relative;
    margin-right: 8px;
  }

  &__inner {
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.2s;

    &::after {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #409eff;
      transform: scale(0);
      transition: all 0.2s;
      content: '';
    }
  }

  &__label {
    font-size: 14px;
  }

  &.is-checked &__inner {
    border-color: #409eff;

    &::after {
      transform: scale(1);
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
