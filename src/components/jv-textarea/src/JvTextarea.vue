<script setup lang="ts">
import type { JvTextareaEmits, JvTextareaProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { bem, JVTEXTAREA_NAME } from './types'

defineOptions({ name: JVTEXTAREA_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvTextareaProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  variant: 'outlined',
  size: 'medium',
  autosize: false,
  rows: 3,
  resize: 'vertical',
})

const emit = defineEmits<JvTextareaEmits>()

const focused = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// 计算字符数显示文本
const countText = computed(() => {
  if (!props.showCount)
    return ''
  const length = String(props.modelValue).length
  return props.maxLength ? `${length}/${props.maxLength}` : String(length)
})

// 处理输入事件
function handleInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  emit('update:modelValue', textarea.value)
  emit('input', textarea.value)

  if (props.autosize) {
    nextTick(() => {
      adjustTextareaHeight()
    })
  }
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

// 处理变更事件
function handleChange(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  emit('change', textarea.value)
}

// 清除输入值
function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  // 清除后自动聚焦
  textareaRef.value?.focus()
}

// 调整文本域高度
function adjustTextareaHeight() {
  if (!textareaRef.value)
    return

  const textarea = textareaRef.value

  if (props.autosize) {
    // 重置高度
    textarea.style.height = 'auto'

    // 计算新高度
    let height = textarea.scrollHeight
    const minRows = typeof props.autosize === 'object' ? props.autosize.minRows : props.minRows
    const maxRows = typeof props.autosize === 'object' ? props.autosize.maxRows : props.maxRows

    // 计算每行高度
    const lineHeight = Number.parseInt(getComputedStyle(textarea).lineHeight, 10) || 20

    // 设置最小高度
    if (minRows) {
      const minHeight = minRows * lineHeight
      height = Math.max(height, minHeight)
    }

    // 设置最大高度
    if (maxRows) {
      const maxHeight = maxRows * lineHeight
      height = Math.min(height, maxHeight)
    }

    // 应用高度
    textarea.style.height = `${height}px`
  }
}

// 监听值的变化，调整高度
watch(
  () => props.modelValue,
  () => {
    if (props.autosize) {
      nextTick(() => {
        adjustTextareaHeight()
      })
    }
  },
)

// 挂载后调整高度
onMounted(() => {
  if (props.autosize) {
    adjustTextareaHeight()
  }
})

// 暴露方法
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
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
    ]"
  >
    <!-- 前置插槽 -->
    <slot name="prepend" />

    <div :class="bem.e('wrapper')">
      <!-- 前缀插槽 -->
      <div v-if="$slots.prefix" :class="bem.e('prefix')">
        <slot name="prefix" />
      </div>

      <!-- 文本域 -->
      <textarea
        ref="textareaRef"
        :class="bem.e('inner')"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :rows="rows"
        :style="{ resize }"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />

      <!-- 后缀区域 -->
      <div
        v-if="$slots.suffix || showCount || clearable"
        :class="bem.e('suffix')"
      >
        <!-- 清除按钮 -->
        <JvButton
          v-if="clearable && modelValue"
          icon="$close"
          :class="bem.e('clear-icon')"
          size="small"
          variant="plain"
          @click.stop="handleClear"
        />

        <!-- 字符计数 -->
        <span v-if="showCount" :class="bem.e('count')">{{ countText }}</span>

        <!-- 自定义后缀插槽 -->
        <slot name="suffix" />
      </div>
    </div>

    <!-- 后置插槽 -->
    <slot name="append" />
  </div>
</template>

<style lang="scss">
@use '@/theme/styles/border-radius' as *;
@use 'sass:map';

$jv-textarea-size-options: (
  small: (
    min-height: 60px,
    font-size: 12px,
    padding-x: 8px,
    padding-y: 6px,
  ),
  medium: (
    min-height: 80px,
    font-size: 14px,
    padding-x: 12px,
    padding-y: 8px,
  ),
  large: (
    min-height: 100px,
    font-size: 16px,
    padding-x: 16px,
    padding-y: 10px,
  ),
  xlarge: (
    min-height: 120px,
    font-size: 18px,
    padding-x: 16px,
    padding-y: 12px,
  ),
);

.jv-textarea {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;

  border-radius: var(--jv-textarea-border-radius);

  --jv-textarea-border-radius: var(--jv-rounded);
  --jv-textarea-border-color: #dcdfe6;
  --jv-textarea-bg: #fff;
  --jv-textarea-text-color: #303133;
  --jv-textarea-placeholder-color: #c0c4cc;
  --jv-textarea-icon-color: #c0c4cc;
  --jv-textarea-icon-hover-color: var(--jv-theme-primary, #409eff);
  --jv-textarea-count-color: #909399;

  // 尺寸样式
  @each $size, $size-options in $jv-textarea-size-options {
    &.jv-textarea--size-#{$size} {
      .jv-textarea__wrapper {
        font-size: map.get($size-options, 'font-size');
      }

      .jv-textarea__inner {
        min-height: map.get($size-options, 'min-height');
        padding: map.get($size-options, 'padding-y') map.get($size-options, 'padding-x');
      }
    }
  }

  &.is-focused .jv-textarea__wrapper {
    border-color: var(--jv-theme-primary, #409eff);
    box-shadow: 0 0 0 2px rgba(var(--jv-theme-primary-rgb, 64, 158, 255), 0.1);
  }

  &.is-disabled .jv-textarea__wrapper {
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  &.is-readonly .jv-textarea__wrapper {
    background-color: #f5f7fa;
  }

  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: max-content;
    border: 1px solid var(--jv-textarea-border-color);
    border-radius: var(--jv-textarea-border-radius);
    background-color: var(--jv-textarea-bg);
    transition: all 0.3s;
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: var(--jv-textarea-icon-color);
  }

  &__prefix {
    margin: 8px 8px -2px;
  }

  &__suffix {
    display: flex;
    gap: 6px;
    margin: -2px 8px 6px;
    align-self: flex-end;
  }

  &__inner {
    box-sizing: border-box;
    width: 100%;
    border: none;
    background: none;
    color: var(--jv-textarea-text-color);
    font-size: inherit;
    outline: none;
    line-height: 1.5;
    transition:
      color 0.2s,
      background 0.2s;
    resize: both;

    &::placeholder {
      color: var(--jv-textarea-placeholder-color);
      opacity: 1;
    }

    &:disabled,
    &[readonly] {
      background: transparent;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  &__count {
    position: absolute;
    right: 16px;
    bottom: 8px;
    margin-left: 4px;
    color: var(--jv-textarea-count-color);
    font-size: 12px;
  }

  &__clear-icon {
    color: var(--jv-textarea-icon-color);
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--jv-textarea-icon-hover-color);
    }
  }
}
</style>
