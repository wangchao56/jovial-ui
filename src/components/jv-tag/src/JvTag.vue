<script setup lang="ts">
import type { JvTagEmits, JvTagProps } from './types'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { computed, ref } from 'vue'
import { bem, JVTAG_NAME } from './types'

defineOptions({ name: JVTAG_NAME, inheritAttrs: false })

const {
  type = 'primary',
  size = 'medium',
  closable = false,
  label = '',
  variant = 'filled',
  closeIcon = ''
} = defineProps<JvTagProps>()

const emit = defineEmits<JvTagEmits>()
const visible = ref(true)
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
</script>

<template>
  <span
    v-show="visible"
    :class="[
      bem.b(),
      bem.m(`type-${type}`),
      bem.m(`variant-${variant}`),
      bem.m(`size-${size}`),
      bem.m(`shape-${shape}`),
      bem.is('closable', closable)
    ]"
    role="tag"
    tabindex="0"
    @click="emit('click', $event)"
  >
    <span :class="bem.e('prepend')">
      <slot name="prepend">
        <JvIcon :name="prependIcon" :size="size" />
      </slot>
    </span>
    <span :class="bem.e('content')">
      <slot>{{ label }}</slot>
    </span>
    <JvIcon
      v-if="closable"
      :name="_closeIcon"
      :class="bem.e('close')"
      size="small"
      @click="handleClose"
    />
  </span>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;

$jv-tag-size-map: (
  'small': (
    'padding': (
      2px 8px
    ),
    'font-size': 10px,
    'max-height': 22px
  ),
  'medium': (
    'padding': (
      4px 10px
    ),
    'font-size': 12px,
    'max-height': 26px
  ),
  'large': (
    'padding': (
      6px 14px
    ),
    'font-size': 14px,
    'max-height': 34px
  )
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
  grid-template-areas: 'content close';
  box-sizing: border-box;
  padding: var(--jv-tag-padding);
  border-color: var(--jv-tag-border-color);
  border-radius: var(--jv-tag-border-radius);
  background-color: var(--jv-tag-background-color);
  color: var(--jv-tag-color);
  font-size: var(--jv-tag-font-size);
  line-height: 1.5;
  grid-template-columns: 1fr auto;
  transition: grid-template-columns 0.2s;

  @include e(content) {
    grid-area: content;
    display: inline-flex;
    overflow: hidden;
    flex: 1;
    vertical-align: middle;
    align-items: start;

    // 单行文本不溢出
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @include e(close) {
    grid-area: close;
    margin-left: 4px;
    color: currentcolor;
    cursor: pointer;
    opacity: 0.6;
    transition:
      opacity 0.2s,
      visibility 0.2s;

    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.5;
    }
  }

  @each $size, $value in $jv-tag-size-map {
    &--size-#{$size} {
      max-height: map.get($value, 'max-height');
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
    }
  }

  //   变体
  @include m(variant-filled) {
    border-color: var(--jv-tag-border-color);
    box-shadow: var(--jv-tag-box-shadow);
    background-color: var(--jv-tag-background-color);
    color: var(--jv-tag-color);
  }

  @include m(variant-outlined) {
    box-shadow: none;
    background-color: transparent;
    color: var(--jv-tag-background-color);

    // 使用before伪元素绘制边框
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-width: 2px;
      border-style: solid;
      border-color: var(--jv-tag-background-color);
      border-radius: inherit;
      content: '';
    }
  }

  @include m(variant-tonal) {
    background-color: color-mix(
      in srgb,
      var(--jv-tag-background-color) 40%,
      var(--jv-tag-color)
    );
    color: var(--jv-tag-background-color);
  }

  // 形状
  @include m(shape-square) {
    border-radius: var(--jv-rounded-square);
  }

  @include m(shape-pill) {
    border-radius: var(--jv-rounded-pill);
  }
}

@supports (
  color: color-mix(
      in srgb,
      var(--jv-tag-background-color) 40%,
      var(--jv-tag-color)
    )
) {
  .jv-tag--variant-tonal {
    background-color: rgba(var(--jv-tag-background-color-rgb), 0.4);
    color: rgba(var(--jv-tag-background-color-rgb), 0.4);
  }
}
</style>
