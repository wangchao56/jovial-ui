<script setup lang="ts">
import type { JvCheckboxProps } from './types'
import { computed, inject, nextTick, ref, watch } from 'vue'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import { bem, JVCHECKBOX_NAME, JvCheckboxGroupContextKey } from './types'

defineOptions({ name: JVCHECKBOX_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvCheckboxProps>(), {
  indeterminate: false,
  size: 'medium',
  disabled: false,
  checked: false,
})

const emit = defineEmits(['click', 'update:modelValue', 'checked', 'change'])

// 注入复选框组上下文
const checkboxGroup = inject(JvCheckboxGroupContextKey, null)
const isGroup = computed(() => checkboxGroup !== null)

// 双向绑定与内部状态
const modelValue = defineModel<string | number | boolean>('modelValue')
const innerChecked = ref(props.checked)

// DOM引用
const inputRef = ref<HTMLInputElement | null>(null)

// 响应式处理
watch(() => [props.checked, modelValue.value, checkboxGroup?.modelValue.value], ([newChecked, newModelValue, newGroupValue]) => {
  // 优先级：组值 > props.checked > modelValue
  if (isGroup.value && newGroupValue && props.value !== undefined) {
    innerChecked.value = (newGroupValue as (string | number)[]).includes(props.value as string | number)
  }
  else if (newChecked !== undefined) {
    innerChecked.value = Boolean(newChecked)
  }
  else if (newModelValue !== undefined) {
    if (props.trueValue !== undefined) {
      innerChecked.value = newModelValue === props.trueValue
    }
    else {
      innerChecked.value = !!newModelValue
    }
  }
}, { immediate: true })

// 内部状态变化时，同步更新外部值
watch(innerChecked, (val) => {
  nextTick(() => updateModelValue(val))
}, { flush: 'post' })

// 禁用状态
const isDisabled = computed(() => {
  if (props.disabled)
    return true
  if (isGroup.value && checkboxGroup?.disabled.value)
    return true
  if (isGroup.value && checkboxGroup?.isMaxLimit.value && !innerChecked.value)
    return true
  return false
})

// 尺寸
const finalSize = computed(() =>
  isGroup.value && checkboxGroup?.size.value ? checkboxGroup.size.value : props.size,
)

// 图标
const innerIcon = computed(() =>
  props.indeterminate
    ? '$checkboxIntermediate'
    : innerChecked.value ? '$checkboxMarked' : '$checkboxBlank',
)

// 更新模型值
function updateModelValue(checked: boolean) {
  // 组模式
  if (isGroup.value && props.value !== undefined && checkboxGroup) {
    checkboxGroup.updateModel(props.value, checked)
    emit('checked', checked)
    emit('change')
    return
  }

  // 单独模式
  let newValue: any = checked
  if (props.trueValue !== undefined && props.falseValue !== undefined) {
    newValue = checked ? props.trueValue : props.falseValue
  }
  else if (props.value !== undefined && checked) {
    newValue = props.value
  }
  else if (props.label !== undefined && checked) {
    newValue = props.label
  }

  emit('update:modelValue', newValue)
  emit('checked', checked)
  emit('change')
}

// 点击处理
function handleClick(e: MouseEvent) {
  e.preventDefault()
  if (isDisabled.value)
    return
  emit('click', e)
  innerChecked.value = !innerChecked.value
}

// 键盘事件
function handleKeydown(e: KeyboardEvent) {
  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault()
    handleClick(new MouseEvent('click'))
  }
}

// 焦点方法
const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

// 类名计算
const finalClasses = computed(() => [
  bem.b(),
  bem.is('checked', innerChecked.value),
  bem.is('disabled', isDisabled.value),
  bem.is('indeterminate', props.indeterminate),
  bem.m(`size-${finalSize.value}`),
])

defineExpose({ focus, blur })
</script>

<template>
  <label
    :class="finalClasses" tabindex="0" :aria-checked="indeterminate ? 'mixed' : innerChecked" :aria-disabled="isDisabled"
    role="checkbox" @click.prevent="handleClick" @keydown="handleKeydown"
  >
    <span class="jv-checkbox__input">
      <input
        ref="inputRef" v-bind="$attrs" type="checkbox" :name="name" :disabled="isDisabled"
        :checked="innerChecked" :aria-checked="indeterminate ? 'mixed' : innerChecked" tabindex="-1"
      >
      <JvButton
        :icon="innerIcon" :size="finalSize" variant="flat" color="primary" :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span v-if="$slots.default || label" class="jv-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
// 使用变量缓存常用值，提高性能
$checkbox-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
$checkbox-disabled-opacity: 0.6;
$checkbox-size-map: (
  'tiny': 12px,
  'small': 16px,
  'medium': 20px,
  'large': 24px,
  'xlarge': 32px,
);

@include b(checkbox) {
  // 布局优化
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 4px;
  cursor: pointer;
  transition: color $checkbox-transition;
  user-select: none;
  outline: none;

  // 提高聚焦状态可访问性
  &:focus-visible {
    outline: 2px solid var(--jv-theme-primary, #409eff);
    outline-offset: 2px;
    border-radius: 2px;
  }

  // 改进状态类样式，使用CSS变量提高自定义性
  &__input {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  &__label {
    font-size: 14px;
    line-height: 1.5;
    transition: color $checkbox-transition;
  }

  // 改进状态样式，使用:where()选择器减少特殊性，提高可覆盖性
  &:where(.is-disabled) {
    cursor: not-allowed;
    opacity: $checkbox-disabled-opacity;
    pointer-events: none;
  }

  // 尺寸样式
  @include m(size-tiny) {
    font-size: 12px;
  }

  @include m(size-small) {
    font-size: 13px;
  }

  @include m(size-large) {
    font-size: 16px;
  }

  @include m(size-xlarge) {
    font-size: 18px;
  }

  // 使用CSS变量控制样式，提高主题适配能力
  & input[type='checkbox'] {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
