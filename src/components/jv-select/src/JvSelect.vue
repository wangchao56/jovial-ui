<script setup lang="ts">
import type { JvSelectEmits, JvSelectOption, JvSelectProps } from './types'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import JvInput from '@/components/jv-input/src/JvInput.vue'
import { computed, ref, watchEffect } from 'vue'
import { bem, JVSELECT_NAME } from './types'

defineOptions({ name: JVSELECT_NAME, inheritAttrs: false })

const {
  inline = false,
  modelValue = '',
  options = [],
  disabled = false,
  readonly = false,
  multiple = false,
  placeholder = '请选择',
  size = 'medium',
  clearable = true,
} = defineProps<JvSelectProps>()
const emit = defineEmits<JvSelectEmits>()

const showDropdown = ref(false)
const inputRef = ref()
const dropdownRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (multiple && Array.isArray(modelValue)) {
    return options
      .filter(opt =>
        (modelValue as (string | number)[]).includes(opt.value),
      )
      .map(opt => opt.label)
      .join(',')
  }
  const found = options.find(opt => opt.value === modelValue)
  return found ? found.label : ''
})

function handleSelect(option: JvSelectOption) {
  if (disabled || readonly)
    return
  if (multiple && Array.isArray(modelValue)) {
    const arr = [...modelValue] as (string | number)[]
    const idx = arr.indexOf(option.value)
    if (idx > -1)
      arr.splice(idx, 1)
    else arr.push(option.value)
    emit('update:modelValue', arr as typeof modelValue)
    emit('change', arr as typeof modelValue)
  }
  else {
    emit('update:modelValue', option.value as typeof modelValue)
    emit('change', option.value as typeof modelValue)
    showDropdown.value = false
  }
}

function handleClear() {
  emit(
    'update:modelValue',
    (multiple ? [] : '') as typeof modelValue,
  )
  emit('clear')
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
  if (!disabled && !readonly) {
    showDropdown.value = true
  }
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

function toggleDropdown() {
  if (disabled || readonly)
    return
  showDropdown.value = !showDropdown.value
}

function isSelected(option: JvSelectOption) {
  if (multiple && Array.isArray(modelValue)) {
    return (modelValue as (string | number)[]).includes(option.value)
  }
  return modelValue === option.value
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  const selectEl = inputRef.value?.$el
  const dropdownEl = dropdownRef.value

  if (
    selectEl
    && !selectEl.contains(target)
    && dropdownEl
    && !dropdownEl.contains(target)
  ) {
    showDropdown.value = false
  }
}

watchEffect(() => {
  if (showDropdown.value) {
    document.addEventListener('click', handleClickOutside)
  }
  else {
    document.removeEventListener('click', handleClickOutside)
  }

  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div
    :class="[bem.b(), { 'is-disabled': disabled }]"
    style="position: relative"
  >
    <JvInput
      ref="inputRef"
      :inline="inline"
      :model-value="selectedLabel || ''"
      :placeholder="placeholder || '请选择'"
      :disabled="disabled"
      :readonly="true"
      :clearable="clearable"
      :size="size || 'medium'"
      type="text"
      variant="outlined"
      :prefix-icon="$slots.prefix ? '' : ''"
      :suffix-icon="$slots.suffix ? '' : ''"
      v-bind="$attrs"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @click="toggleDropdown"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>

      <template #suffix>
        <slot name="suffix">
          <JvIcon
            :class="bem.e('arrow')"
            :rotate="showDropdown ? 180 : 0"
            name="$menuDown"
          />
        </slot>
      </template>
    </JvInput>

    <div
      v-if="showDropdown"
      ref="dropdownRef"
      :class="bem.e('dropdown')"
      :style="{ zIndex: 1000 }"
    >
      <div
        v-for="option in options"
        :key="option.value"
        :class="[
          bem.e('option'),
          {
            'is-selected': isSelected(option),
            'is-disabled': option.disabled,
          },
        ]"
        @mousedown.prevent="!option.disabled && handleSelect(option)"
      >
        <span>{{ option.label }}</span>
        <JvIcon
          v-if="isSelected(option)"
          :class="bem.e('check')"
          name="$check"
        />
      </div>

      <div v-if="!options.length" :class="bem.e('empty')">
        暂无数据
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jv-select {
  position: relative;
  width: 100%;

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .jv-select__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 1000;
    max-height: 220px;
    margin-top: 4px;
    padding: 4px 0;
    border: 1px solid var(--jv-input-border-color, #dcdfe6);
    border-radius: var(--jv-input-border-radius, 4px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
    background: #fff;
    overflow-y: auto;
  }

  .jv-select__option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f5f5f7;
    }

    &.is-selected {
      background: #f0f7ff;
      color: var(--jv-theme-primary, #409eff);
      font-weight: bold;
    }

    &.is-disabled {
      color: #bbb;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .jv-select__check {
      margin-left: auto;
      color: var(--jv-theme-primary, #409eff);
      font-size: 16px;
    }
  }

  .jv-select__arrow {
    display: inline-block;
    margin-left: 4px;
    color: var(--jv-input-icon-color, #c0c4cc);
    transition: transform 0.2s;
  }

  .jv-select__empty {
    padding: 12px 0;
    color: #bbb;
    font-size: 14px;
    text-align: center;
  }
}
</style>
