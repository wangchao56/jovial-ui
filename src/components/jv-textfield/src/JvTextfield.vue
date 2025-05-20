<script setup lang="ts">
import type { JvTextfieldEmits, JvTextfieldProps } from './types'
import { computed, ref } from 'vue'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { bem, JVINPUT_NAME } from './types'

defineOptions({ name: JVINPUT_NAME, inheritAttrs: false })

const {
  modelValue = '',
  placeholder = '',
  disabled = false,
  readonly = false,
  clearable = false,
  showPassword = false,
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  prefixIcon = '',
  suffixIcon = '',
  maxLength = undefined,
  showCount = false,
} = defineProps<JvTextfieldProps>()

const emit = defineEmits<JvTextfieldEmits>()

const focused = ref(false)
const passwordVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// 计算实际输入类型
const inputType = computed(() => {
  if (type !== 'password')
    return type
  return passwordVisible.value ? 'text' : 'password'
})

// 计算字符数显示文本
const countText = computed(() => {
  if (!showCount)
    return ''
  const length = String(modelValue).length
  return maxLength ? `${length}/${maxLength}` : String(length)
})

// 处理输入事件
function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

// 处理聚焦事件
function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

// 处理失焦事件
function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

// 清除输入值
function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  // 清除后自动聚焦
  inputRef.value?.focus()
}

// 切换密码可见性
function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
}
const passwordIcon = computed(() => {
  return passwordVisible.value ? '$eye' : '$eyeOff'
})
// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: handleClear,
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`size-${size}`),
      bem.m(`variant-${variant}`),
      bem.is('focused', focused),
      bem.is('disabled', disabled),
      bem.is('readonly', readonly),
      bem.is('clearable', clearable),
      bem.is('show-password', showPassword),
    ]"
  >
    <!-- 前置插槽 -->
    <slot name="prepend" />

    <div :class="bem.e('wrapper')">
      <!-- 前缀图标或插槽 -->
      <div v-if="$slots.prefix || prefixIcon" :class="bem.e('prefix')">
        <slot name="prefix">
          <JvIcon v-if="prefixIcon" :name="prefixIcon" />
        </slot>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        :class="bem.e('inner')"
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >

      <!-- 后缀图标或插槽 -->
      <div
        v-if="
          $slots.suffix || suffixIcon || showCount || clearable || showPassword
        "
        :class="bem.e('suffix')"
      >
        <!-- 清除按钮 -->
        <JvButton
          v-if="clearable"
          icon="$close"
          :class="bem.e('clear-icon')"
          size="small"
          variant="plain"
          @click.stop="handleClear"
        />

        <!-- 密码切换按钮 -->
        <JvButton
          v-if="type === 'password' && showPassword"
          :icon="passwordIcon"
          :class="bem.e('password-icon')"
          size="small"
          variant="plain"
          @click="togglePasswordVisibility"
        />

        <!-- 字符计数 -->
        <span v-if="showCount" :class="bem.e('count')">{{ countText }}</span>

        <!-- 自定义后缀插槽或图标 -->
        <slot name="suffix">
          <JvIcon v-if="suffixIcon" :name="suffixIcon" />
        </slot>
      </div>
    </div>
    <!-- 后置插槽 -->
    <slot name="append" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/border-radius' as *;
@use 'sass:map';

$jv-textfield-size-options: (
  small: (
    height: 28px,
    font-size: 12px,
    padding-x: 8px,
  ),
  medium: (
    height: 36px,
    font-size: 14px,
    padding-x: 12px,
  ),
  large: (
    height: 44px,
    font-size: 16px,
    padding-x: 16px,
  ),
  xlarge: (
    height: 52px,
    font-size: 18px,
    padding-x: 16px,
  ),
);

.jv-textfield {
  position: relative;
  display: inline-flex;
  width: 100%;

  --jv-textfield-border-radius: 4px;
  --jv-textfield-border-color: var(--jv-theme-border, #dcdfe6);
  --jv-textfield-bg: var(--jv-theme-surface, #fff);
  --jv-textfield-text-color: var(--jv-theme-on-surface, #303133);
  --jv-textfield-placeholder-color: var(--jv-theme-on-surface-variant, #c0c4cc);
  --jv-textfield-icon-color: var(--jv-theme-on-surface-variant, #c0c4cc);
  --jv-textfield-icon-hover-color: var(--jv-theme-info, #409eff);
  --jv-textfield-count-color: var(--jv-theme-on-surface-variant, #909399);

  border-radius: var(--jv-textfield-border-radius);

  // 尺寸
  @each $size, $size-options in $jv-textfield-size-options {
    &.jv-textfield--size-#{$size} {
      height: map.get($size-options, 'height');

      .jv-textfield__wrapper {
        height: map.get($size-options, 'height');
        font-size: map.get($size-options, 'font-size');
      }

      .jv-textfield__inner {
        padding-right: map.get($size-options, 'padding-x');
        padding-left: map.get($size-options, 'padding-x');
      }
    }
  }

  &.is-focused .jv-textfield__wrapper {
    border-color: var(--jv-theme-primary, #409eff);
    box-shadow: 0 0 0 2px rgb(64 158 255 / 0.1);
  }

  &.is-disabled .jv-textfield__wrapper {
    background-color: var(--jv-theme-surface-variant, #f5f7fa);
    color: var(--jv-theme-on-surface-variant, #c0c4cc);
    cursor: not-allowed;
  }

  &.is-readonly .jv-textfield__wrapper {
    background-color: var(--jv-theme-surface-variant, #f5f7fa);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--jv-textfield-border-color);
    border-radius: var(--jv-textfield-border-radius);
    background-color: var(--jv-textfield-bg);
    transition: all 0.3s;
    column-gap: 4px;
  }

  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--jv-textfield-icon-color);
  }

  &__prefix {
    margin-right: 6px;
    margin-left: 8px;
  }

  &__suffix {
    display: inline-flex;
    gap: 6px;
    margin-right: 8px;
    margin-left: 6px;
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: var(--jv-textfield-text-color);
    font-size: inherit;
    outline: none;
    line-height: 1.5;
    transition:
      color 0.2s,
      background 0.2s;

    &::placeholder {
      color: var(--jv-textfield-placeholder-color);
      opacity: 1;
    }

    &:disabled,
    &[readonly] {
      background: transparent;
      color: var(--jv-theme-on-surface-variant, #c0c4cc);
      cursor: not-allowed;
    }
  }

  &__count {
    margin-left: 4px;
    color: var(--jv-textfield-count-color);
    font-size: 12px;
  }

  &__clear-icon,
  &__password-icon {
    color: var(--jv-textfield-icon-color);
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--jv-textfield-icon-hover-color);
    }
  }
}
</style>
