<script setup lang="ts">
import type { JvRadioGroupContext } from './group'
import type { JvRadioEmits, JvRadioExpose, JvRadioProps } from './types'
import { useEventListener, useParentElement } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, ref, unref, useId } from 'vue'
import { JvRadioGroupContextKey } from './group'
import { bem, JVRADIO_NAME } from './types'

defineOptions({ name: JVRADIO_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvRadioProps>(), {
  size: 'medium',
  bordered: false,
  animated: true,
  labelPosition: 'right',
  gap: '8px',
  focusVisible: true,
})

const emit = defineEmits<JvRadioEmits>()
const radioValue = defineModel('modelValue', { required: false })

// 获取RadioGroup上下文
const radioGroup = inject(
  JvRadioGroupContextKey,
  null,
) as JvRadioGroupContext | null

// DOM引用
const radioRef = ref<HTMLInputElement | null>(null)
const radioWrapperRef = ref<HTMLElement | null>(null)

// 计算是否被选中
const isChecked = computed(() => {
  if (radioGroup && radioGroup.modelValue) {
    return radioGroup.modelValue.value === props.label
  }
  return radioValue.value === props.label
})

// 计算是否禁用
const isDisabled = computed(
  () => props.disabled || !!(radioGroup && radioGroup.disabled),
)

// 获取name属性
const radioName = computed(() => props.name || (radioGroup && radioGroup.name) || `radio-${useId()}`)

// 获取动画属性
const hasAnimation = computed(() =>
  props.animated === undefined
    ? radioGroup && radioGroup.animated !== undefined
      ? radioGroup.animated
      : true
    : props.animated,
)

// 获取颜色
const radioColor = computed(() => props.color || (radioGroup && radioGroup.color) || 'var(--jv-theme-primary)')

// 焦点状态
const isFocused = ref(false)
const isHovered = ref(false)

// 点击处理
function handleClick(e: MouseEvent) {
  if (isDisabled.value)
    return
  // 发送值更新
  const newValue = props.label
  // 更新选项数据
  if (radioGroup) {
    radioGroup.setValue(newValue)
  }
  else {
    radioValue.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }

  emit('click', e)

  // 聚焦元素
  nextTick(() => {
    radioRef.value?.focus()
  })
}

// 处理键盘事件
function handleKeyDown(e: KeyboardEvent) {
  if (isDisabled.value)
    return

  // 空格键或回车键触发选择
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    handleClick(e as unknown as MouseEvent)
  }
}

// 处理焦点事件
function handleFocus(e: FocusEvent) {
  isFocused.value = true
  emit('focus', e)
}

// 处理失焦事件
function handleBlur(e: FocusEvent) {
  isFocused.value = false
  emit('blur', e)
}

// 处理鼠标悬停
function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

// 暴露给父组件的方法
function check() {
  if (!isDisabled.value && !isChecked.value) {
    handleClick(new MouseEvent('click'))
  }
}

function focus() {
  radioRef.value?.focus()
}

function blur() {
  radioRef.value?.blur()
}
// 点击事件
useEventListener(radioRef, 'click', handleClick)
const parant = useParentElement(radioWrapperRef)
// 挂载时
onMounted(() => {
  // 装填选项数据
  if (unref(parant.value)?.classList.contains('jv-radio-group') && radioGroup) {
    radioGroup.updateOption({ label: props.label, value: props.label })
  }
})

defineExpose<JvRadioExpose>({
  check,
  isChecked: () => isChecked.value,
  focus,
  blur,
})
</script>

<template>
  <span
    ref="radioWrapperRef" :class="[
      bem.b(),
      bem.is('checked', isChecked),
      bem.is('disabled', isDisabled),
      bem.is('bordered', bordered),
      bem.is('animated', hasAnimation),
      bem.is('focused', isFocused && focusVisible),
      bem.is('hovered', isHovered),
      bem.m(`size-${size}`),
      bem.m(`label-${labelPosition}`),
      radioClass,
    ]" :style="{ '--jv-radio-gap': gap }" :data-size="size" :data-testid="JVRADIO_NAME" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span
      :class="[
        bem.e('input'),
        bem.is('checked', isChecked),
      ]"
    >
      <input
        ref="radioRef" :name="radioName" type="radio" :disabled="isDisabled" :checked="isChecked"
        :aria-checked="isChecked" :aria-disabled="isDisabled" :aria-label="ariaLabel" role="radio"
        :tabindex="isDisabled ? -1 : 0" class="sr-only" @focus="handleFocus" @blur="handleBlur"
        @keydown="handleKeyDown" @click.stop
      >
      <span
        :class="bem.e('inner')" :style="{ borderColor: isChecked ? radioColor : undefined }"
        @click.stop="handleClick"
      >
        <span v-if="isChecked" :class="bem.e('dot')" :style="{ backgroundColor: radioColor }" />
      </span>
    </span>

    <label v-if="$slots.default || label" :class="[bem.e('label'), labelClass]" :for="radioName">
      <slot>{{ label }}</slot>
    </label>
  </span>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$jv-radio-sizes: (
  small: (
    height: 16px,
  ),
  medium: (
    height: 20px,
  ),
  large: (
    height: 24px,
  ),
);

@include b(radio) {
  --jv-radio-size-small: 16px;
  --jv-radio-size-medium: 20px;
  --jv-radio-size-large: 24px;
  --jv-radio-color: var(--jv-theme-primary);
  --jv-radio-border: 1px solid #dcdfe6;
  --jv-radio-gap: 8px;
  --jv-radio-error-color: var(--jv-theme-error);
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  // 尺寸变体

  @each $size, $value in $jv-radio-sizes {
    --jv-radio-size-#{$size}: #{map.get($value, height)};

    @include m(size-#{$size}) {
      font-size: 12px;

      .jv-radio__inner {
        width: var(--jv-radio-size-#{$size});
        height: var(--jv-radio-size-#{$size});
      }
    }
  }

  // 标签位置
  @include m(label-left) {
    flex-direction: row-reverse;

    .jv-radio__label {
      margin-right: var(--jv-radio-gap);
      margin-left: 0;
    }
  }

  @include m(label-right) {
    flex-direction: row;

    .jv-radio__label {
      margin-right: 0;
      margin-left: var(--jv-radio-gap);
    }
  }

  @include e(input) {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  @include e(inner) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: var(--jv-radio-size-md);
    height: var(--jv-radio-size-md);
    border: var(--jv-radio-border);
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    &:hover {
      border-color: var(--jv-radio-color);
    }
  }

  @include e(dot) {
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: var(--jv-radio-color);
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: center;

    .is-checked & {
      width: 50%;
      height: 50%;
      transform: scale(1);
    }
  }

  @include e(label) {
    line-height: 1.5;
    transition: color 0.3s;
  }

  @include e(error) {
    margin-top: 4px;
    color: var(--jv-radio-error-color);
    font-size: 12px;
  }

  @include when(checked) {
    .jv-radio__inner {
      border-color: var(--jv-radio-color);
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .jv-radio__inner {
      border-color: #dcdfe6;
      background-color: #f5f7fa;

      &:hover {
        border-color: #dcdfe6;
      }
    }

    .jv-radio__label {
      color: #c0c4cc;
    }
  }

  @include when(bordered) {
    padding: 8px 16px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.3s;

    &.is-checked {
      border-color: var(--jv-radio-color);
    }
  }

  @include when(focused) {
    .jv-radio__inner {
      box-shadow: 0 0 0 2px rgba(var(--jv-radio-color-rgb, 24, 144, 255), 0.2);
    }
  }

  @include when(error) {
    .jv-radio__inner {
      border-color: var(--jv-radio-error-color);
    }
  }

  @include when(hovered) {
    &:not(.is-disabled) {
      .jv-radio__inner {
        border-color: var(--jv-radio-color);
      }
    }
  }
}

// 过渡动画
.jv-fade-enter-active,
.jv-fade-leave-active {
  transition: opacity 0.3s ease;
}

.jv-fade-enter-from,
.jv-fade-leave-to {
  opacity: 0;
}

// 无障碍优化: 隐藏原生input但保持可访问性
.sr-only {
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border-width: 0;
  white-space: nowrap;
}
</style>
