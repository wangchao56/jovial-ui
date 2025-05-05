<script setup lang="ts">
import type { JvButtonEmits, JvButtonProps, JvButtonSlots } from './types'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useStyle } from '@/hooks'
import { computed, ref } from 'vue'
import { bem, JVBUTTON_NAME } from './types'

defineOptions({ name: JVBUTTON_NAME, inheritAttrs: true })

// 使用解构语法直接获取props的值
const {
  variant = 'elevated',
  size = 'medium',
  nativeType = 'button',
  disabled = false,
  icon,
  prependIcon,
  appendIcon,
  content,
  autofocus,
  colorType = 'default',
  stacked = false,
  loading = false,
  block = false
} = defineProps<JvButtonProps>()
const emit = defineEmits<JvButtonEmits>()
const slots = defineSlots<JvButtonSlots>()
const buttonRef = ref<HTMLButtonElement>()
const { customStyles } = useStyle()
const showAppend = computed(() => {
  if (stacked) {
    return false
  }
  return slots.append || appendIcon
})
</script>

<template>
  <button
    ref="buttonRef"
    :style="customStyles"
    :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`shape-${shape}`),
      bem.m(`size-${size}`),
      bem.m(`color-type-${colorType}`),
      bem.is('disabled', disabled || loading),
      bem.is('loading', loading),
      bem.is('stacked', stacked),
      { [bem.m('icon-only')]: icon || $slots.icon },
      { [bem.m('block')]: block }
    ]"
    :type="nativeType"
    :autofocus="autofocus"
    :tabindex="0"
    :disabled="disabled || loading"
    role="button"
    :aria-disabled="disabled || loading"
    :aria-label="content"
    v-bind="$attrs"
    @click="emit('click', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <span v-if="$slots.icon || icon" :class="bem.e('content')">
      <slot name="icon">
        <JvIcon :name="icon" :class="bem.e('icon')" :size="size" />
      </slot>
    </span>
    <template v-else>
      <span v-if="$slots.prepend || prependIcon" :class="bem.e('prepend')">
        <slot name="prepend">
          <JvIcon :name="prependIcon" :class="bem.e('icon')" :size="size" />
        </slot>
      </span>
      <span v-if="loading" :class="bem.e('loading')">
        <slot name="loader">
          <JvIcon
            name="mdi:loading"
            class="jv-button__loading-spin"
            :class="[bem.e('icon')]"
            :size="size"
            :color-type="colorType"
          />
        </slot>
      </span>
      <span :class="bem.e('content')">
        <slot>{{ content }}</slot>
      </span>
      <span v-if="showAppend" :class="bem.e('append')">
        <slot name="append">
          <JvIcon :name="appendIcon" :class="bem.e('icon')" :size="size" />
        </slot>
      </span>
    </template>
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;

// ================== 混合宏 ==================
@mixin button-variant($variant) {
  @if $variant == elevated {
    --jv-button-box-shadow: var(--jv-elevation-4);
    box-shadow: var(--jv-button-box-shadow);
    background: var(--jv-button-background);
    color: var(--jv-button-color);

    &:hover {
      box-shadow: var(--jv-elevation-6);
    }

    &:active {
      box-shadow: var(--jv-elevation-2);
    }
  }

  @if $variant == flat {
    --jv-button-box-shadow: none;
    box-shadow: var(--jv-button-box-shadow);
  }

  @if $variant == outlined or $variant == dashed {
    --jv-button-background: transparent;
    border-width: 2px;
    border-style: if($variant == dashed, dashed, solid);
    border-color: var(--jv-button-color);
    background: transparent;
  }

  @if $variant == text {
    box-shadow: none;
    background: transparent;
  }

  @if $variant == tonal {
    background: rgba(var(--jv-button-color-rgb), 0.4);
  }

  @if $variant == plain {
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

@mixin button-disabled {
  --jv-button-background: var(--jv-theme-disabled);
  --jv-button-color: var(--jv-theme-on-disabled);
  --jv-button-box-shadow: none;
  cursor: not-allowed;
  opacity: 0.6;
}

@mixin button-loading {
  .jv-button__content {
    color: transparent;
  }

  .jv-button__loading-spin {
    animation: jv-spin 1s linear infinite;
  }
}

// ================== 配置变量 ==================
$button-sizes: (
  tiny: (
    size: 10px,
    height: 20px,
    padding: 0 8px,
    icon: 14px
  ),
  small: (
    size: 12px,
    height: 28px,
    padding: 0 12px,
    icon: 16px
  ),
  medium: (
    size: 14px,
    height: 36px,
    padding: 0 16px,
    icon: 18px
  ),
  large: (
    size: 16px,
    height: 44px,
    padding: 0 20px,
    icon: 20px
  ),
  xlarge: (
    size: 18px,
    height: 52px,
    padding: 0 24px,
    icon: 22px
  )
);
$color-types: (primary, secondary, success, error, warning, info, default);
$variants: (elevated, outlined, dashed, text, tonal, plain, flat);
$shapes: (pill, square);

// ================== 基础样式 ==================
@include b(button) {
  // ---------- CSS 变量定义 ----------
  --jv-button-background: var(--jv-theme-background);
  --jv-button-background-rgb: var(--jv-theme-background-rgb);
  --jv-button-color: var(--jv-theme-on-background);
  --jv-button-color-rgb: var(--jv-theme-on-background-rgb);
  --jv-button-border-radius: var(--jv-rounded);
  --jv-button-font-size: var(--jv-font-size-base);
  --jv-button-height: 36px;
  --jv-button-padding: 0 16px;
  --jv-button-icon-size: 16px;
  --jv-button-box-shadow: var(--jv-elevation-4);
  --jv-button-border: 0 solid transparent;

  // ---------- 布局样式 ----------
  position: relative;
  display: inline-grid;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  min-height: var(--jv-button-height);
  padding: var(--jv-button-padding);
  border: var(--jv-button-border);
  border-radius: var(--jv-button-border-radius);
  background: var(--jv-button-background);
  color: var(--jv-button-color);
  font-size: var(--jv-button-font-size);
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-template: 'prepend content append' / auto 1fr auto;
  outline: none;
  text-wrap: nowrap;

  // 交互状态层
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentcolor;
    opacity: 0;
    transition: inherit;
    pointer-events: none;
  }

  // ================== 子元素样式 ==================
  @include e(icon) {
    width: var(--jv-button-icon-size);
    height: var(--jv-button-icon-size);
  }

  @include e(prepend) {
    grid-area: prepend;
  }

  @include e(content) {
    grid-area: content;
  }

  @include e(append) {
    grid-area: append;
  }

  @include e(loading) {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
    border-radius: inherit;
    box-shadow: var(--jv-elevation-4);
  }

  // ================== 变体样式 ==================
  @each $variant in $variants {
    @include m(variant-#{$variant}) {
      @include button-variant($variant);
    }
  }

  // ================== 形状 ==================
  @each $shape in $shapes {
    @include m(shape-#{$shape}) {
      border-radius: var(--jv-rounded-#{$shape});
    }
  }

  // ================== 颜色类型 ==================
  @each $type in $color-types {
    @include m(color-type-#{$type}) {
      @if $type == default {
        --jv-button-background: var(--jv-theme-background);
        --jv-button-background-rgb: var(--jv-theme-background-rgb);
        --jv-button-color: var(--jv-theme-on-background);
        --jv-button-color-rgb: var(--jv-theme-on-background-rgb);
      } @else {
        --jv-button-background: var(--jv-theme-#{$type});
        --jv-button-background-rgb: var(--jv-theme-#{$type}-rgb);
        --jv-button-color: var(--jv-theme-on-#{$type});
        --jv-button-color-rgb: var(--jv-theme-on-#{$type}-rgb);
      }
    }
  }

  // 当变体不为flat和elevated，且颜色类型不是default时，交换背景和文本的颜色
  @each $variant in $variants {
    @if $variant != flat and $variant != elevated {
      @each $type in $color-types {
        @if $type != default {
          &.jv-button--variant-#{$variant}.jv-button--color-type-#{$type} {
            --jv-button-background: var(--jv-theme-on-#{$type});
            --jv-button-color: var(--jv-theme-#{$type});
            --jv-button-background-rgb: var(--jv-theme-on-#{$type}-rgb);
            --jv-button-color-rgb: var(--jv-theme-#{$type}-rgb);
          }
        }
      }
    }
  }

  // ================== 尺寸系统 ==================
  @each $size, $config in $button-sizes {
    @include m(size-#{$size}) {
      --jv-button-font-size: #{map.get($config, size)};
      --jv-button-height: #{map.get($config, height)};
      --jv-button-padding: #{map.get($config, padding)};
      --jv-button-icon-size: #{map.get($config, icon)};
    }
  }

  // ================== 特殊状态 ==================
  @include when(disabled) {
    @include button-disabled;
  }

  @include when(loading) {
    @include button-loading;
  }

  @include when(stacked) {
    grid-template: 'prepend' 'content';
    height: max-content;
    place-items: center;
  }

  // 图标按钮
  @include m(icon-only) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--jv-button-height);
    padding: 0;
    border-radius: var(--jv-rounded-pill);
  }

  // 块级按钮
  @include m(block) {
    width: 100%;
  }

  // ================== 交互状态 ==================
  &:hover::after {
    opacity: 0.04;
  }

  &:active::after {
    opacity: 0.1;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--jv-theme-accent);
  }
}

// ================== 动画 ==================
@keyframes jv-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
