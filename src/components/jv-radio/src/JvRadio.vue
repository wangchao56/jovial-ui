<script setup lang="ts">
import type { JvRadioProps } from './types'
import { computed } from 'vue'
import { JVRADIO_NAME } from './types'

defineOptions({ name: JVRADIO_NAME, inheritAttrs: false })

const { modelValue, label, disabled, name } = defineProps<JvRadioProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: any): void
}>()

const isChecked = computed(() => modelValue === label)

function handleClick(e: MouseEvent) {
  if (disabled) return
  emit('click', e)
  emit('update:modelValue', label)
}
</script>

<template>
  <label
    class="jv-radio"
    :class="[
      {
        'is-checked': isChecked,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
  >
    <span class="jv-radio__input">
      <input
        type="radio"
        :name="name"
        :disabled="disabled"
        :checked="isChecked"
        hidden
      />
      <span class="jv-radio__inner" />
    </span>
    <span class="jv-radio__label">
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
