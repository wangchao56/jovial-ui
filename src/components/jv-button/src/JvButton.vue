<script setup lang="ts">
import type { JvButtonEmits, JvButtonProps, JvButtonSlots } from './types'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useStyle } from '@/hooks'
import { useRoundedClass } from '@/hooks/useStyle/useRoundedClass'
import { useTheme } from '@/theme'
import { computed, ref, shallowRef, useCssVars } from 'vue'
import { bem, JVBUTTON_NAME } from './types'

defineOptions({ name: JVBUTTON_NAME, inheritAttrs: true })

// 使用解构语法直接获取props的值
const {
  variant = 'elevated',
  size = 'medium',
  nativeType = 'button',
  disabled = false,
  icon = '',
  prependIcon = '',
  appendIcon = '',
  content = 'Button',
  autofocus = false,
  color = 'default',
  stacked = false,
  loading = false,
  block = false,
  rounded,
  shape,
} = defineProps<JvButtonProps>()

const emit = defineEmits<JvButtonEmits>()
const slots = defineSlots<JvButtonSlots>()
const buttonRef = ref<HTMLButtonElement>()
const { customStyles } = useStyle()
const theme = useTheme()

// 使用shallowRef减少深层响应式转换
const isIconOnly = shallowRef(!!icon || !!slots.icon)
const hasUnderlay = shallowRef(['outlined', 'dashed', 'tonal'].includes(variant))
const showPrepend = computed(() => !!slots.prepend || !!prependIcon)
const showAppend = computed(() => !stacked && (!!slots.append || !!appendIcon))

// 简化icon属性传递
const baseIconProps = {
  size,
  color,
}

const prependIconProps = computed(() => ({
  ...baseIconProps,
  name: prependIcon as string,
}))

const appendIconProps = computed(() => ({
  ...baseIconProps,
  name: appendIcon as string,
}))

const iconProps = computed(() => ({
  ...baseIconProps,
  name: icon as string,
}))

// 计算按钮背景色
function getButtonBgColor() {
  if (['text', 'plain'].includes(variant)) {
    return 'transparent'
  }
  if (['outlined', 'dashed'].includes(variant)) {
    return 'transparent'
  }
  if (color === 'default') {
    return 'var(--jv-theme-surface)'
  }
  return variant === 'tonal'
    ? `var(--jv-theme-on-${color})`
    : `var(--jv-theme-${color})`
}

// 计算按钮文本色
function getButtonTextColor() {
  if (color === 'default') {
    return 'var(--jv-theme-on-surface)'
  }
  if (['elevated', 'flat'].includes(variant)) {
    return `var(--jv-theme-on-${color})`
  }
  return `var(--jv-theme-${color})`
}

// 获取按钮高度
function getButtonHeight() {
  const sizeMap = {
    tiny: '20px',
    small: '28px',
    medium: '36px',
    large: '44px',
    xlarge: '52px',
  }
  return stacked ? `calc(${sizeMap[size] || '36px'} * 2)` : (sizeMap[size] || '36px')
}

// 获取按钮内边距
function getButtonPadding() {
  if (isIconOnly.value)
    return '0'

  const sizeMap = {
    tiny: '0 8px',
    small: '0 12px',
    medium: '0 16px',
    large: '0 20px',
    xlarge: '0 24px',
  }
  return sizeMap[size] || '0 16px'
}

// 获取按钮阴影
function getButtonBoxShadow() {
  if (disabled || loading)
    return 'none'
  if (variant !== 'elevated')
    return 'none'
  return 'var(--jv-elevation-4)'
}

const roundedClass = useRoundedClass(rounded)

// 优化类名计算，减少不必要的类
const buttonClasses = computed(() => [
  theme.themeClasses.value,
  bem.b(),
  bem.m(`variant-${variant}`),
  shape && bem.m(`shape-${shape}`),
  bem.m(`size-${size}`),
  bem.m(`color-${color}`),
  disabled && bem.m('state-disabled'),
  loading && bem.m('state-loading'),
  stacked && bem.m('stacked'),
  block && bem.m('block'),
  isIconOnly.value && bem.m('icon-only'),
  roundedClass.value,
])

// 处理点击事件
function handleClick(event: MouseEvent) {
  if (disabled || loading)
    return
  emit('click', event)
}

// 处理焦点事件
function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

// 处理失焦事件
function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
// 使用CSS变量定义样式，提高可定制性
useCssVars(() => ({
  'jv-button-bg': getButtonBgColor(),
  'jv-button-color': getButtonTextColor(),
  'jv-button-opacity': disabled || loading ? 'var(--jv-disabled-opacity, 0.6)' : '1',
  'jv-button-pointer-events': disabled || loading ? 'none' : 'auto',
  'jv-button-height': getButtonHeight(),
  'jv-button-width': block ? '100%' : 'auto',
  'jv-button-min-width': block ? '100%' : 'auto',
  'jv-button-padding': getButtonPadding(),
  'jv-button-box-shadow': getButtonBoxShadow(),
  //   'jv-button-font-size': getButtonFontSize(),
}))
</script>

<template>
  <button
    ref="buttonRef" :style="customStyles" :class="buttonClasses" :type="nativeType" :autofocus="autofocus"
    :tabindex="disabled ? -1 : 0" :disabled="disabled || loading" role="button" :aria-disabled="disabled || loading"
    :aria-label="content" v-bind="$attrs" @click="handleClick" @focus="handleFocus" @blur="handleBlur"
  >
    <!-- 涟漪效果层 -->
    <span class="jv-button__overlay" />

    <!-- 边框/背景层 -->
    <span v-if="hasUnderlay" :class="bem.e('underlay')" />

    <!-- 图标按钮模式 -->
    <span v-if="isIconOnly" :class="bem.e('content')">
      <slot name="icon">
        <JvIcon v-bind="iconProps" :class="bem.e('icon')" />
      </slot>
    </span>

    <!-- 普通按钮模式 -->
    <template v-else>
      <!-- 前置图标 -->
      <span v-if="showPrepend" :class="bem.e('prepend')">
        <slot name="prepend">
          <JvIcon v-bind="prependIconProps" :class="bem.e('icon')" />
        </slot>
      </span>

      <!-- 加载指示器 -->
      <span v-if="loading" :class="bem.e('loading')">
        <slot name="loader">
          <JvIcon name="mdi:loading" v-bind="baseIconProps" class="jv-button__loading-spin" />
        </slot>
      </span>

      <!-- 按钮内容 -->
      <span :class="bem.e('content')" class="button-text">
        <slot>{{ content }}</slot>
      </span>

      <!-- 后置图标 -->
      <span v-if="showAppend" :class="bem.e('append')">
        <slot name="append">
          <JvIcon v-bind="appendIconProps" :class="bem.e('icon')" />
        </slot>
      </span>
    </template>
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;

// ================== 基础样式 ==================
@include b(button) {
  // 性能优化：使用CSS变量定义所有可变样式
  --jv-button-bg: var(--jv-theme-surface);
  --jv-button-color: var(--jv-theme-on-surface);
  --jv-button-border-radius: var(--jv-rounded);
  --jv-button-font-size: 14px;
  --jv-button-height: 36px;
  --jv-button-width: auto;
  --jv-button-min-width: auto;
  --jv-button-padding: 0 16px;
  --jv-button-opacity: 1;
  --jv-button-pointer-events: auto;
  --jv-button-box-shadow: none;
  --jv-button-border: none;
  --jv-button-transform: translateY(0);

  // 统一的动画参数
  --jv-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --jv-transition-duration: 0.25s;
  --jv-transition-duration-fast: 0.1s;
  --jv-overlay-opacity-hover: 0.08;
  --jv-overlay-opacity-active: 0.12;
  --jv-overlay-opacity-focus: 0.12;

  // 布局样式
  position: relative;
  display: inline-grid;
  justify-content: center;
  place-items: center center;
  box-sizing: border-box;
  width: var(--jv-button-width);
  min-width: var(--jv-button-min-width);
  height: var(--jv-button-height);
  padding: var(--jv-button-padding);

  // 视觉样式
  border: var(--jv-button-border);
  border-radius: var(--jv-button-border-radius);
  box-shadow: var(--jv-button-box-shadow);
  background: var(--jv-button-bg);
  color: var(--jv-button-color);
  font-size: var(--jv-button-font-size);
  line-height: 1.5;

  // 交互样式
  cursor: pointer;
  opacity: var(--jv-button-opacity);
  transform: var(--jv-button-transform);

  // 设置常用过渡属性
  transition:
    transform var(--jv-transition-duration) var(--jv-transition-easing),
    box-shadow var(--jv-transition-duration) var(--jv-transition-easing),
    opacity var(--jv-transition-duration) var(--jv-transition-easing),
    background-color var(--jv-transition-duration) var(--jv-transition-easing),
    color var(--jv-transition-duration) var(--jv-transition-easing);
  vertical-align: middle;
  pointer-events: var(--jv-button-pointer-events);
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  // 性能优化：使用将-webkit-font-smoothing和will-change
  -webkit-font-smoothing: antialiased;
  will-change: transform, box-shadow, opacity;

  // 网格布局
  grid-template: 'prepend content append' / auto 1fr auto;
  outline: none;
  text-wrap: nowrap;

  // 两个装饰层的基础样式
  &__overlay,
  &__underlay {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  // 叠加层(用于hover/active等效果)
  @include e(overlay) {
    z-index: 1;
    background-color: currentcolor;
    opacity: 0;
    transition: opacity var(--jv-transition-duration) var(--jv-transition-easing);
  }

  // 子元素基础样式
  @include e(prepend) {
    z-index: 2;
    display: flex;
    align-items: center;
    margin-right: 8px;
    grid-area: prepend;
  }

  @include e(content) {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    text-align: center;
    grid-area: content;
  }

  @include e(append) {
    z-index: 2;
    display: flex;
    align-items: center;
    margin-left: 8px;
    grid-area: append;
    align-self: center;
  }

  @include e(icon) {
    font-size: calc(var(--jv-button-font-size) * 1.5);
  }

  @include e(loading) {
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    background-color: inherit;
    inset: 0;
  }

  // ================== 变体样式 ==================
  // Elevated变体
  @include m(variant-elevated) {
    &:hover {
      --jv-button-box-shadow: var(--jv-elevation-6);
      --jv-button-transform: translateY(-1px);
    }

    &:active {
      --jv-button-transform: translateY(0);
      transition-duration: var(--jv-transition-duration-fast);
    }
  }

  // Outlined变体
  @include m(variant-outlined) {
    .jv-button__underlay {
      border: 2px solid currentcolor;
      opacity: 0.8;
      transition: opacity var(--jv-transition-duration) var(--jv-transition-easing);
    }

    &:hover .jv-button__underlay {
      opacity: 1;
    }
  }

  // Dashed变体
  @include m(variant-dashed) {
    .jv-button__underlay {
      border: 2px dashed currentcolor;
      opacity: 0.8;
      transition: opacity var(--jv-transition-duration) var(--jv-transition-easing);
    }

    &:hover .jv-button__underlay {
      opacity: 1;
    }
  }

  // Tonal变体
  @include m(variant-tonal) {
    .jv-button__underlay {
      background-color: currentcolor;
      opacity: 0.12;
      transition: opacity var(--jv-transition-duration) var(--jv-transition-easing);
    }

    &:hover .jv-button__underlay {
      opacity: 0.18;
    }

    &:active .jv-button__underlay {
      opacity: 0.24;
    }
  }

  // Plain变体
  @include m(variant-plain) {
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  // 通用交互效果
  &:hover {
    .jv-button__overlay {
      opacity: var(--jv-overlay-opacity-hover);
    }
  }

  &:active {
    .jv-button__overlay {
      opacity: var(--jv-overlay-opacity-active);
      transition-duration: var(--jv-transition-duration-fast);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--jv-theme-warning);

    &--variant-plain {
      opacity: 1;
    }

    .jv-button__overlay {
      opacity: var(--jv-overlay-opacity-focus);
    }
  }

  // ================== 尺寸变体 ==================
  @include m(size-tiny) {
    --jv-button-font-size: 0.625rem; // 10px
  }

  @include m(size-small) {
    --jv-button-font-size: 0.75rem; // 12px
  }

  @include m(size-medium) {
    --jv-button-font-size: 0.875rem; // 14px
  }

  @include m(size-large) {
    --jv-button-font-size: 1rem; // 16px
  }

  @include m(size-xlarge) {
    --jv-button-font-size: 1.125rem; // 18px
  }

  // 图标按钮样式
  @include m(icon-only) {
    grid-template: 'content' / 1fr;
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border-radius: var(--jv-rounded-pill);

    .jv-button__content {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  // 堆叠按钮样式
  @include m(stacked) {
    // 使用网格布局实现完美的堆叠效果
    gap: 4px;
    grid-template: 'prepend' auto 'content' auto / 1fr;
    place-items: center;
    place-content: center;

    .jv-button__prepend {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: fit-content;
      margin: 0;
      align-self: center;
    }

    .jv-button__content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      align-self: center;
    }

    // 在堆叠模式下隐藏后置图标
    .jv-button__append {
      display: none;
    }
  }

  // 禁用状态
  @include m(state-disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // 加载状态
  @include m(state-loading) {
    .jv-button__content {
      visibility: hidden;
    }

    .jv-button__loading-spin {
      animation: jv-button-spin 1s linear infinite;
    }
  }

  // 按钮文本样式 - 直接使用CSS变量控制字体大小
  .button-text {
    font-size: var(--jv-button-font-size);
    font-weight: 500;
    line-height: normal;
    text-align: center;
  }
}

// 优化动画性能
@keyframes jv-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
