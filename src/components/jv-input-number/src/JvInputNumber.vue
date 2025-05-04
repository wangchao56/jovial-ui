<script setup lang="ts">
import type { JvInputNumberEmits, JvInputNumberProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import { computed, ref, watch } from 'vue'
import { bem, JVINPUTNUMBER_NAME } from './types'

// 组件名
defineOptions({ name: JVINPUTNUMBER_NAME, inheritAttrs: false })

const {
  modelValue,
  min = 0,
  max = 100,
  step = 1,
  precision = 0,
  disabled = false,
  readonly = false,
  size = 'medium',
  clearable = false,
} = defineProps<JvInputNumberProps>()
const emit = defineEmits<JvInputNumberEmits>()

const focused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const innerValue = ref<number | ''>(modelValue ?? '')

// 是否显示清除按钮
const showClearIcon = computed(() => {
  return clearable && !disabled && !readonly && innerValue.value !== ''
})

// 加法
function handleAdd() {
  if (disabled || readonly)
    return
  let val = Number(innerValue.value) || 0
  val += step
  if (max !== undefined)
    val = Math.min(val, max)
  val = toPrecision(val)
  innerValue.value = val
  emit('update:modelValue', val)
  emit('input', val)
  emit('change', val)
}
// 减法
function handleSub() {
  if (disabled || readonly)
    return
  let val = Number(innerValue.value) || 0
  val -= step
  if (min !== undefined)
    val = Math.max(val, min)
  val = toPrecision(val)
  innerValue.value = val
  emit('update:modelValue', val)
  emit('input', val)
  emit('change', val)
}
// 输入
function handleInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  // 允许空字符串
  if (val === '') {
    innerValue.value = ''
    emit('update:modelValue', 0)
    emit('input', 0)
    return
  }
  let num = Number(val)
  if (!Number.isNaN(num)) {
    if (max !== undefined)
      num = Math.min(num, max)
    if (min !== undefined)
      num = Math.max(num, min)
    num = toPrecision(num)
    innerValue.value = num
    emit('update:modelValue', num)
    emit('input', num)
  }
}
// 失焦
function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
  emit('change', Number(innerValue.value) || 0)
}
// 聚焦
function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}
// 清除
function handleClear() {
  innerValue.value = ''
  emit('update:modelValue', 0)
  emit('clear', new MouseEvent('click'))
  inputRef.value?.focus()
}
// 精度处理
function toPrecision(val: number) {
  if (precision > 0) {
    return Number(val.toFixed(precision))
  }
  return val
}
// v-model 同步
watch(
  () => modelValue,
  (val) => {
    innerValue.value = val
  },
)

// 暴露方法
function getInputValue() {
  return String(innerValue.value)
}
function setInputValue(val: string) {
  innerValue.value = Number(val)
}
function clearInputValue() {
  handleClear()
}
defineExpose({ getInputValue, setInputValue, clearInputValue })
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`size-${size}`),
      bem.is('disabled', disabled),
      bem.is('readonly', readonly),
      bem.is('focused', focused),
    ]"
  >
    <div :class="bem.e('prepend')">
      <slot name="prepend" />
    </div>
    <div :class="bem.e('wrapper')">
      <div :class="bem.e('prefix')">
        <slot name="prefix" />
      </div>
      <!-- 输入框 -->
      <input
        ref="inputRef"
        :class="bem.e('inner')"
        :value="innerValue"
        type="number"
        :disabled="disabled"
        :readonly="readonly"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- 清除按钮 -->
      <JvButton
        v-if="clearable && showClearIcon"
        icon="$close"
        size="small"
        variant="tonal"
        @click="handleClear"
      />
      <!-- 减按钮 -->
      <JvButton
        icon="$minus"
        :size="size"
        variant="text"
        :disabled="disabled || readonly"
        @click="handleSub"
      />
      <!-- 加按钮 -->
      <JvButton
        icon="$plus"
        :size="size"
        variant="text"
        :disabled="disabled || readonly"
        @click="handleAdd"
      />
    </div>
    <div :class="bem.e('append')">
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/variables' as *;
@use 'sass:map';

.jv-input-number {
  display: inline-flex;
  width: 100%;
  min-height: 28px;
  padding: 4px;

  --jv-input-border-radius: 4px;
  --jv-input-border-color: #dcdfe6;
  --jv-input-bg: #fff;
  --jv-input-text-color: #303133;
  --jv-input-placeholder-color: #c0c4cc;
  --jv-input-icon-color: #c0c4cc;

  &.is-focused .jv-input-number__wrapper {
    border-color: var(--jv-theme-primary, #409eff);
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.12);
  }

  &.is-disabled .jv-input-number__wrapper {
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  &.is-readonly .jv-input-number__wrapper {
    background-color: #f5f7fa;
  }

  //   尺寸
  @each $size, $size-options in $jv-input-size-options {
    &.jv-input-number--size-#{$size} {
      .jv-input-number__wrapper {
        height: map.get($size-options, 'height');
        font-size: map.get($size-options, 'font-size');
      }

      .jv-input-number__inner {
        padding-right: map.get($size-options, 'padding-x');
        padding-left: map.get($size-options, 'padding-x');
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 4px;
    border: 1px solid var(--jv-input-border-color, #dcdfe6);
    border-radius: var(--jv-input-border-radius, 4px);
    background-color: var(--jv-input-bg, #fff);
    transition: all 0.3s;
    column-gap: 4px;
  }

  &__btn {
    width: 32px;
    height: 100%;
    border: none;
    background: none;
    color: var(--jv-input-icon-color, #c0c4cc);
    font-size: 18px;
    cursor: pointer;
    transition: color 0.2s;

    &:disabled {
      color: #e4e7ed;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      color: var(--jv-input-icon-hover-color, #909399);
    }
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    border: none;
    background: none;
    color: var(--jv-input-text-color, #303133);
    font-size: inherit;
    outline: none;
    text-align: center;

    &::placeholder {
      color: var(--jv-input-placeholder-color, #c0c4cc);
    }

    &:disabled,
    &[readonly] {
      cursor: not-allowed;
    }
  }

  &__clear-icon {
    margin: 0 4px;
    color: var(--jv-input-icon-color, #c0c4cc);
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: var(--jv-input-icon-hover-color, #909399);
    }
  }

  // 隐藏原生 number input 的加减按钮
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  input[type='number'] {
    appearance: textfield;
  }
}
</style>
