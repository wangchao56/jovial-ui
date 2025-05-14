<script setup lang="ts">
import type { JvCheckboxProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import { computed, useAttrs } from 'vue'
import { bem, JVCHECKBOX_NAME } from './types'

defineOptions({ name: JVCHECKBOX_NAME, inheritAttrs: false })

const {
  label,
  disabled = false,
  indeterminate = false,
  size = 'medium',
} = defineProps<JvCheckboxProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: any): void
}>()

const internalValue = defineModel<boolean | Array<string | number>>(
  'modelValue',
)

const innerIcon = computed(() => {
  if (indeterminate) {
    return '$checkboxIntermediate'
  }
  return internalValue.value ? '$checkboxMarked' : '$checkboxBlank'
})

const attrs = useAttrs()

const isChecked = computed(() => {
  if (Array.isArray(internalValue.value)) {
    return internalValue.value.includes(label!)
  }
  return internalValue.value === true
})

function handleClick(e: MouseEvent) {
  if (disabled)
    return

  emit('click', e)

  let newValue
  if (Array.isArray(internalValue.value)) {
    newValue = [...internalValue.value]
    const index = newValue.indexOf(label!)
    index === -1 ? newValue.push(label!) : newValue.splice(index, 1)
  }
  else {
    newValue = !isChecked.value
  }

  emit('update:modelValue', newValue)
}
</script>

<template>
  <label
    :class="[
      bem.b(),
      bem.is('checked', isChecked),
      bem.is('disabled', disabled),
      bem.is('indeterminate', indeterminate),
    ]"
    @click="handleClick"
  >
    <span class="jv-checkbox__input">
      <input
        v-bind="attrs"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :checked="isChecked"
        hidden
      >
      <JvButton
        :icon="innerIcon"
        :size="size"
        variant="flat"
        color-type="primary"
      />
    </span>
    <span v-if="label" class="jv-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
$checkbox-size-map: (
  'xs': (
    height: 12px,
    width: 12px,
  ),
  'small': (
    height: 16px,
    width: 16px,
  ),
  'medium': (
    height: 20px,
    width: 20px,
  ),
  'large': (
    height: 24px,
    width: 24px,
  ),
  'xlarge': (
    height: 32px,
    width: 32px,
  ),
);

@include b(checkbox) {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &__input {
    position: relative;
    margin-right: 8px;
  }

  &__inner {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    background-color: #fff;
    transition: all 0.2s;

    &::after {
      position: absolute;
      top: 2px;
      left: 5px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
      content: '';
    }
  }

  &__label {
    font-size: 14px;
  }

  &.is-checked &__inner {
    border-color: #409eff;
    background-color: #409eff;

    &::after {
      opacity: 1;
    }
  }

  &.is-indeterminate &__inner {
    border-color: #409eff;
    background-color: #409eff;

    &::after {
      top: 6px;
      left: 2px;
      width: 10px;
      height: 2px;
      transform: none;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
