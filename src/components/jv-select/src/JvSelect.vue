<script setup lang="ts">
import type { JvSelectEmits, JvSelectOption, JvSelectProps } from './types'
import { computed, ref, watchEffect } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
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
  clearable = false,
} = defineProps<JvSelectProps>()
const emit = defineEmits<JvSelectEmits>()

const showDropdown = ref(false)
const selectRef = ref()
const dropdownRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (multiple && Array.isArray(modelValue)) {
    return options
      .filter(opt =>
        (modelValue as (string | number)[]).includes(opt.value),
      )
      .map(opt => opt.label)
      .join(', ')
  }
  const found = options.find(opt => opt.value === modelValue)
  return found ? found.label : ''
})

const hasValue = computed(() => {
  if (multiple && Array.isArray(modelValue)) {
    return (modelValue as (string | number)[]).length > 0
  }
  return modelValue !== ''
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

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', (multiple ? [] : '') as typeof modelValue)
  emit('clear')
}

function toggleDropdown() {
  if (disabled || readonly)
    return
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    emit('focus', new FocusEvent('focus'))
  }
  else {
    emit('blur', new FocusEvent('blur'))
  }
}

function isSelected(option: JvSelectOption) {
  if (multiple && Array.isArray(modelValue)) {
    return (modelValue as (string | number)[]).includes(option.value)
  }
  return modelValue === option.value
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  const selectEl = selectRef.value?.$el || selectRef.value
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
    ref="selectRef"
    :class="[bem.b(), { 'is-disabled': disabled }, bem.m(`size-${size}`), bem.is('inline', inline)]"
    style="position: relative"
  >
    <div class="jv-select__wrapper" @click="toggleDropdown">
      <div class="jv-select__label">
        <span v-if="selectedLabel">{{ selectedLabel }}</span>
        <span v-else class="jv-select__placeholder">{{ placeholder }}</span>
      </div>

      <div class="jv-select__suffix">
        <JvIcon
          v-if="clearable && hasValue && !disabled" class="jv-select__clear" name="$close-circle"
          @click="handleClear"
        />
        <JvIcon class="jv-select__arrow" :class="{ 'is-reverse': showDropdown }" name="$chevron-down" />
      </div>
    </div>

    <div v-if="showDropdown" ref="dropdownRef" :class="bem.e('dropdown')" :style="{ zIndex: 1000 }">
      <div
        v-for="option in options" :key="option.value" :class="[
          bem.e('option'),
          {
            'is-selected': isSelected(option),
            'is-disabled': option.disabled,
          },
        ]" @mousedown.prevent="!option.disabled && handleSelect(option)"
      >
        <span>{{ option.label }}</span>
        <JvIcon v-if="isSelected(option)" :class="bem.e('check')" name="$check" />
      </div>

      <div v-if="!options.length" :class="bem.e('empty')">
        暂无数据
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jv-select {
  --jv-select-height: 36px;
  position: relative;
  width: 100%;

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  &.is-inline {
    display: inline-block;
    width: fit-content;
  }

  .jv-select__wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--jv-select-height);
    padding: 0 12px;
    border: 1px solid var(--jv-input-border-color, #dcdfe6);
    border-radius: var(--jv-input-border-radius, 4px);
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: #c0c4cc;
    }
  }

  .jv-select__label {
    overflow: hidden;
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .jv-select__placeholder {
    color: #999;
  }

  .jv-select__suffix {
    display: flex;
    align-items: center;
  }

  .jv-select__clear {
    margin-right: 6px;
    color: #c0c4cc;
    font-size: 16px;

    &:hover {
      color: #909399;
    }
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
    color: var(--jv-input-icon-color, #c0c4cc);
    font-size: 16px;
    transition: transform 0.2s;

    &.is-reverse {
      transform: rotate(180deg);
    }
  }

  .jv-select__empty {
    padding: 12px 0;
    color: #bbb;
    font-size: 14px;
    text-align: center;
  }
}
</style>
