<script setup lang="ts">
import type { JvTagEmits, JvTagProps } from './types'
import { useCssVar } from '@vueuse/core'
import { computed, ref, useSlots } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useTheme } from '@/theme'
import { bem, JVTAG_NAME } from './types'

defineOptions({ name: JVTAG_NAME, inheritAttrs: false })
const {
  type = 'info',
  size = 'medium',
  shape = 'square',
  closable = false,
  label = '',
  variant = 'tonal',
  closeIcon = '',
  prependIcon = '',
} = defineProps<JvTagProps>()

const emit = defineEmits<JvTagEmits>()
const visible = ref(true)
const slots = useSlots()
const theme = useTheme()

function handleClose(e: MouseEvent) {
  e.stopPropagation()
  visible.value = false
  emit('clickClose', e)
}

const _closeIcon = computed(() => {
  if (closeIcon) {
    return closeIcon
  }
  switch (variant) {
    case 'filled':
      return '$closeCircle'
    case 'outlined':
      return '$closeCircleOutline'
    default:
      return '$close'
  }
})

// 计算标签类名
const tagClasses = computed(() => [
  bem.b(),
  bem.m(`type-${type}`),
  bem.m(`variant-${variant}`),
  bem.m(`size-${size}`),
  bem.m(`shape-${shape}`),
  bem.is('closable', closable),
  theme.themeClasses.value,
])

function handleClick(e: MouseEvent) {
  emit('click', e)
}

const tagRef = ref<HTMLElement>()
const iconSize = useCssVar('--jv-icon-size', tagRef, {
  initialValue: '12px',
})
// 判断是否显示前置图标
const showPrepend = computed(() => prependIcon || !!slots.prepend)
</script>

<template>
  <span
    v-show="visible"
    ref="tagRef"
    :class="tagClasses"
    role="status"
    tabindex="0"
    :aria-label="label"
    @click="handleClick"
  >
    <span :class="bem.e('overlay')" />
    <span v-if="showPrepend" :class="bem.e('prepend')">
      <slot name="prepend">
        <JvIcon v-if="prependIcon" :name="prependIcon" :size="iconSize" />
      </slot>
    </span>
    <span :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="closable" :class="bem.e('close')" @click="handleClose">
      <JvIcon :name="_closeIcon" :size="iconSize" />
    </span>
  </span>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';
@use '@/theme/styles/border-radius' as *;

$jv-tag-size-map: (
  'small': (
    'padding': (
      0 8px,
    ),
    'font-size': 10px,
    'height': 22px,
  ),
  'medium': (
    'padding': (
      0 10px,
    ),
    'font-size': 12px,
    'height': 26px,
  ),
  'large': (
    'padding': (
      0 14px,
    ),
    'font-size': 14px,
    'height': 32px,
  ),
);
$jv-tag-type-map: (primary, success, warning, error, info);

@include b(tag) {
  --jv-tag-color: var(--jv-theme-on-surface);
  --jv-tag-background-color: var(--jv-theme-surface);
  --jv-tag-border-color: var(--jv-theme-on-surface);
  --jv-tag-font-size: var(--jv-font-size-base);
  --jv-tag-padding: 4px 10px;
  --jv-tag-border-radius: var(--jv-rounded-md);
  --jv-tag-transition: all 0.2s;
  --jv-tag-box-shadow: var(--jv-elevation-1);
  position: relative;
  display: inline-grid;
  overflow: hidden;
  align-content: stretch;
  box-sizing: border-box;
  padding: var(--jv-tag-padding);
  border-width: thin;
  border-style: solid;
  border-color: var(--jv-tag-border-color);
  border-radius: var(--jv-tag-border-radius);
  background-color: var(--jv-tag-background-color);
  color: var(--jv-tag-color);
  font-size: var(--jv-tag-font-size);
  font-weight: 500;
  text-shadow: 0 0 0.8px currentcolor;
  transition: all 0.2s;
  place-items: center center;
  grid-template-areas: 'prepend content  close';
  grid-template-columns: auto 1fr auto auto;

  :deep(svg),
  :deep(i) {
    color: currentcolor;
    fill: currentcolor;
    stroke: currentcolor;
    font-size: var(--jv-tag-font-size);
  }

  @include e(overlay) {
    position: absolute;
    z-index: 1;
    border-radius: inherit;
    background-color: currentcolor;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    inset: 0;
    pointer-events: none;
  }

  @include e(prepend) {
    grid-area: prepend;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }

  @include e(label) {
    display: inline-flex;
    overflow: hidden;
    flex: 1;
    align-items: center;

    // 单行文本不溢出
    white-space: nowrap;
    cursor: text;
    grid-area: content;
    vertical-align: middle;
    user-select: text;
    text-overflow: ellipsis;

    // 可选择时，文本颜色为白色
    &.jv-tag--selectable {
      color: var(--jv-theme-primary);
    }
  }

  @include e(close) {
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin-left: 8px;
    color: currentcolor;
    cursor: pointer;
    opacity: 0.6;
    transition:
      opacity 0.2s,
      visibility 0.2s;
    grid-area: close;

    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.8;
    }
  }

  @each $size, $value in $jv-tag-size-map {
    &--size-#{$size} {
      height: map.get($value, 'height');
      padding: map.get($value, 'padding');
      font-size: map.get($value, 'font-size');
    }
  }

  @each $type in $jv-tag-type-map {
    &--type-#{$type} {
      --jv-tag-color: var(--jv-theme-on-#{$type});
      --jv-tag-color-rgb: var(--jv-theme-on-#{$type}-rgb);
      --jv-tag-background-color: var(--jv-theme-#{$type});
      --jv-tag-background-color-rgb: var(--jv-theme-#{$type}-rgb);
      --jv-tag-border-color: var(--jv-theme-#{$type});
      --jv-tag-high-contrast-color: var(--jv-theme-on-surface);
    }
  }

  //   变体
  @include m(variant-filled) {
    background-color: var(--jv-tag-background-color);
    color: var(--jv-tag-color);
  }

  @include m(variant-outlined) {
    border-width: thin;
    border-style: solid;
    border-color: currentcolor;
    border-radius: inherit;
    box-shadow: none;
    background-color: transparent;

    // 不存在type-default时的
    &:not(.jv-tag--type-default) {
      border-color: var(--jv-tag-border-color);
      color: var(--jv-tag-background-color);
    }
  }

  // 背景颜色变浅
  @include m(variant-tonal) {
    --jv-tag-tonal-color: color-mix(in srgb, var(--jv-tag-background-color) 12%, var(--jv-tag-color));
    border-color: var(--jv-tag-tonal-color);
    background-color: var(--jv-tag-tonal-color);

    // 文字颜色为背景颜色 并提升对比度
    color: var(--jv-tag-background-color);
  }

  // 形状
  @include m(shape-square) {
    border-radius: var(--jv-rounded-square);
  }

  @include m(shape-pill) {
    border-radius: var(--jv-rounded-pill);
  }

  // 可选择状态
  @include when(selectable) {
    cursor: pointer;
  }

  @include when(selected) {
    box-shadow: 0 0 0 2px var(--jv-tag-background-color);

    &.jv-tag--variant-outlined {
      background-color: rgba(var(--jv-tag-background-color-rgb), 0.1);
    }
  }

  &:active {
    .jv-tag__overlay {
      opacity: 0.12;
    }
  }

  &:focus {
    outline: none;
  }
}
</style>
