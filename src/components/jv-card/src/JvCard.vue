<script setup lang="ts">
import type { JvCardEmits, JvCardProps, JvCardSlots } from './types'
import { computed, provide, shallowRef, useCssVars } from 'vue'
import { useComponentId } from '@/hooks/useComponentId'
import { useRoundedClass } from '@/hooks/useStyle/useRoundedClass'
import {
  bem,
  JVCARD_NAME,
  JvCardContextKey,
} from './types'

defineOptions({ name: JVCARD_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardProps>(), {
  tag: 'div',
  color: 'default',
  variant: 'elevated',
  rounded: 'sm',
  clickable: false,
  disabled: false,
  padding: 'md',
  actionsAlign: 'end',
  orientation: 'vertical',
  loading: false,
  objectFit: 'cover',
  maxWidth: 350,
})

const emit = defineEmits<JvCardEmits>()

// 获取插槽内容
const slots = defineSlots<JvCardSlots>()

// 使用shallowRef提高性能
const slotsDefault = shallowRef<ReturnType<NonNullable<typeof slots.default>> | undefined>()
function updateSlotsDefault() {
  slotsDefault.value = slots.default?.()
}
updateSlotsDefault()

// 点击处理函数
function handleClick(event: MouseEvent) {
  if (props.disabled || !props.clickable)
    return
  emit('click', event)
}

const cardId = useComponentId('jv-card')
provide(JvCardContextKey, {
  cardId,
})

// 是否显示遮罩
const hasOverlay = computed(() => {
  return props.variant === 'outlined' || props.variant === 'tonal'
})
// 是否显示media
const hasMedia = computed(() => {
  return props.imgSrc || slots.media
})

const roundedClass = useRoundedClass(props.rounded)
useCssVars(() => {
  return {
    'jv-card-max-width': `${props.maxWidth}px`,
  }
})
</script>

<template>
  <component
    :is="tag" :id="cardId" :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`color-${color}`),
      bem.m(`rounded-${rounded}`),
      bem.m(`orientation-${orientation}`),
      bem.is('clickable', clickable),
      bem.is('disabled', disabled),
      bem.is('loading', loading),
      roundedClass,
    ]" v-bind="$attrs" role="article" :aria-label="title" :aria-labelledby="cardId" @click="handleClick"
  >
    <!-- 加载遮罩 -->
    <div v-if="loading" :class="bem.e('loading-overlay')">
      <div :class="bem.e('loading-spinner')" />
    </div>
    <!-- 遮罩 -->
    <div :class="bem.e('overlay')" />
    <!-- 底部 -->
    <div v-if="hasOverlay" :class="bem.e('underlay')" />

    <!-- 媒体区 -->
    <div v-if="hasMedia" :class="bem.e('media')">
      <slot name="media">
        <img :src="imgSrc" :alt="alt">
      </slot>
    </div>
    <div :class="bem.e('header')">
      <slot name="header">
        <div :class="bem.e('title')">
          {{ title }}
        </div>
        <div :class="bem.e('subtitle')">
          {{ subtitle }}
        </div>
      </slot>
    </div>
    <!-- 内容区 -->
    <div :class="bem.e('content')">
      <slot name="default">
        {{ content }}
      </slot>
    </div>
    <!-- 操作区 - 从插槽渲染 -->
    <div v-if="$slots.actions" :class="[bem.e('actions'), bem.m(`actions-align-${actionsAlign}`)]">
      <slot name="actions" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;

// 单行文本不换行溢出隐藏
@mixin text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
  hyphens: auto;
  letter-spacing: 0.0125em;
}

// 颜色类型列表
$color-types: (primary, secondary, success, warning, error, info);

// 内边距映射
$padding-map: (
  'none': 0,
  'xs': 8px,
  'sm': 12px,
  'md': 16px,
  'lg': 24px,
  'xl': 32px,
);

@include b(card) {
  // ---------- CSS 变量定义 ----------
  --jv-card-background: var(--jv-theme-surface);
  --jv-card-background-rgb: var(--jv-theme-surface-rgb);
  --jv-card-color: var(--jv-theme-on-surface);
  --jv-card-color-rgb: var(--jv-theme-on-surface-rgb);
  --jv-card-border-color: var(--jv-theme-outline);
  --jv-card-border-width: 0;
  --jv-card-box-shadow: var(--jv-elevation-6);
  --jv-card-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --jv-card-gap: 8px;
  --jv-card-focus-ring-color: var(--jv-theme-primary);
  --jv-card-focus-ring-width: 2px;
  --jv-card-max-width: 100%;

  // ---------- 布局样式 ----------
  position: relative;
  display: grid;
  overflow: hidden;
  box-sizing: border-box;
  width: fit-content;
  max-width: var(--jv-card-max-width);
  min-height: fit-content;
  box-shadow: var(--jv-card-box-shadow);
  background: var(--jv-card-background);
  color: var(--jv-card-color);
  transition: var(--jv-card-transition);
  will-change: transform, box-shadow, opacity;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas: 'media' 'header' 'content' 'actions';
  contain: layout style;

  // 支持聚焦状态
  &:focus-visible {
    outline: var(--jv-card-focus-ring-width) solid var(--jv-card-focus-ring-color);
    outline-offset: 2px;
  }

  // 水平方向布局
  &.is-orientation-horizontal {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'media header'
      'media content'
      'media actions';

    .jv-card__media {
      max-width: 240px;
      height: 100%;
      grid-row: span 3;
    }
  }

  // 遮罩层
  &__underlay,
  &__overlay {
    position: absolute;
    z-index: 1;
    opacity: 0;
    inset: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
  }

  @include e(overlay) {
    z-index: 2;
  }

  @include e(underlay) {
    z-index: 1;
  }

  &__content,
  &__actions,
  &__header {
    z-index: 3;
  }

  // ---------- 子元素样式 ----------
  @include e(media) {
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    grid-area: media;

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: var(--jv-card-media-object-fit, cover);
      transition: transform 0.3s ease;
    }

    // 悬停时轻微放大图片
    .is-clickable:hover & {
      img,
      video {
        transform: scale(1.05);
      }
    }
  }

  @include e(header) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 16px;
    grid-area: header;
  }

  @include e(content) {
    display: flex;
    overflow: auto;
    flex-direction: column;
    gap: var(--jv-card-gap);

    // 内容区最小高度确保卡片有一定高度
    min-height: 40px;
    padding: 0 16px 16px;
    grid-area: content;
  }

  @include e(actions) {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    grid-area: actions;

    // 添加上边框
    &:not(:empty) {
      border-top: 1px solid rgba(var(--jv-card-color-rgb), 0.12);
    }

    // 按钮样式统一
    button,
    .jv-button {
      flex-shrink: 0;
    }

    @include m(actions-align-start) {
      justify-content: flex-start;
    }

    @include m(actions-align-center) {
      justify-content: center;
    }

    @include m(actions-align-end) {
      justify-content: flex-end;
    }

    @include m(actions-align-between) {
      justify-content: space-between;
    }

    @include m(actions-align-around) {
      justify-content: space-around;
    }
  }

  // 标题
  @include e(title) {
    font-size: var(--jv-font-size-h6);
  }

  @include e(subtitle) {
    font-size: var(--jv-font-size-subtitle2);
  }

  @include e(loading-overlay) {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--jv-card-background-rgb), 0.85);
    backdrop-filter: blur(3px);
    transition: opacity 0.3s ease;
  }

  @include e(loading-spinner) {
    width: 40px;
    height: 40px;
    border: 4px solid currentcolor;
    border-top-color: var(--jv-card-background);
    border-radius: 50%;
    animation: card-spinner 0.8s linear infinite;
  }

  // 辅助类：隐藏但对屏幕阅读器可见
  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }

  // ---------- 内边距 ----------
  @each $size, $value in $padding-map {
    @include m(padding-#{$size}) {
      --jv-card-padding: #{$value};
    }
  }

  // ---------- 对齐方式 ----------
  @each $align in (start, center, end, space-between, space-around) {
    @include m(actions-align-#{$align}) {
      .jv-card__actions {
        justify-content: #{$align};
      }
    }
  }

  // ---------- 变体样式 ----------
  @include m(variant-elevated) {
    --jv-card-box-shadow: var(--jv-elevation-6);
  }

  @include m(variant-outlined) {
    --jv-card-box-shadow: none;
    background-color: transparent;
    color: var(--jv-card-background);

    .jv-card__underlay {
      border: 2px solid currentcolor;
      opacity: 0.46;
    }
  }

  @include m(variant-tonal) {
    box-shadow: none;
    background: none;
    color: var(--jv-card-background);

    .jv-card__underlay {
      background-color: currentcolor;
      opacity: 0.12;
    }
  }

  @include m(variant-filled) {
    background-color: var(--jv-card-color);
    color: var(--jv-card-background);
  }

  @include m(variant-flat) {
    --jv-card-box-shadow: none;
  }

  @include m(variant-link) {
    --jv-card-box-shadow: none;
    --jv-card-border-width: 1px;
    --jv-card-border-color: transparent;
    background-color: transparent;
  }

  // ---------- 颜色类型 ----------
  @include m(color-default) {
    --jv-card-background: var(--jv-theme-surface);
    --jv-card-background-rgb: var(--jv-theme-surface-rgb);
    --jv-card-color: var(--jv-theme-on-surface);
    --jv-card-color-rgb: var(--jv-theme-on-surface-rgb);
  }

  @each $type in $color-types {
    @include m(color-#{$type}) {
      --jv-card-background: var(--jv-theme-#{$type});
      --jv-card-background-rgb: var(--jv-theme-#{$type}-rgb);
      --jv-card-color: var(--jv-theme-on-#{$type});
      --jv-card-color-rgb: var(--jv-theme-on-#{$type}-rgb);
    }
  }

  @include m(rounded-none) {
    --jv-card-border-radius: 0;
  }

  // ---------- 状态样式 ----------
  @include when(clickable) {
    cursor: pointer;

    .jv-card__overlay {
      background-color: currentcolor;
    }

    &:hover {
      box-shadow: var(--jv-elevation-8);
      transform: translateY(-2px);

      .jv-card__overlay {
        opacity: 0.04;
      }
    }

    &:active {
      box-shadow: var(--jv-elevation-2);
      transform: translateY(0);

      .jv-card__overlay {
        opacity: 0.1;
      }
    }
  }

  @include when(disabled) {
    --jv-card-background: var(--jv-theme-disabled);
    --jv-card-color: var(--jv-theme-on-disabled);
    --jv-card-box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
    filter: grayscale(0.5);
  }

  @include when(loading) {
    .jv-card__content,
    .jv-card__actions,
    .jv-card__media {
      opacity: 0.6;
      pointer-events: none;
    }
  }

  // ---------- 响应式调整 ----------
  @media (width <=600px) {
    &.is-orientation-horizontal {
      grid-template-columns: 1fr;
      grid-template-areas:
        'media'
        'header'
        'content'
        'actions';

      .jv-card__media {
        max-width: 100%;
        height: auto;
        grid-row: auto;
      }
    }
  }

  // 高对比度模式支持
  @media (prefers-contrast: more) {
    --jv-card-border-width: 2px;
    --jv-card-border-color: currentcolor;
  }

  // 减少动画
  @media (prefers-reduced-motion: reduce) {
    --jv-card-transition: none;

    .jv-card__loading-spinner {
      animation-duration: 2s;
    }

    .jv-card__media img {
      transition: none;
    }

    &.is-clickable:hover {
      transform: none;
    }
  }
}

@keyframes card-spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
