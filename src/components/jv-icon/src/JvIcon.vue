<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { InternalIconName, JvIconProps } from './types'
import { _internalIcons } from '@/components/internal-icon'
import { getOptions } from '@/constants'
import { convertToUnit, isString } from '@/utils'
import { computed } from 'vue'
import { bem as _bem, JVICON_NAME } from './types'

defineOptions({ name: JVICON_NAME, inheritAttrs: true })

const {
  color = 'primary',
  size,
  name,
  colorType = 'default',
  rotate = 0,
  flip = false,
  spin = false,
  disabled = false
} = defineProps<JvIconProps>()

const options = getOptions('size')
// 判断是否是内部图标
const hasInnerIcon = computed(() => name && String(name).startsWith('$'))

// 判断是否显示外部图标
const showExternalIcon = computed(() => name && !hasInnerIcon.value)

const innerSize = computed(() =>
  isString(size) && options.includes(size) ? size : false
)
// 计算图标样式
const iconStyle = computed<CSSProperties>(() => {
  const result: CSSProperties = {}
  // 处理尺寸
  if (!Number.isNaN(size) && innerSize.value === false) {
    const sizeValue = convertToUnit(size)
    result.fontSize = sizeValue
    result.width = sizeValue
    result.height = sizeValue
  }

  // 处理自定义颜色
  if (color) {
    result.color = color
  }

  // 处理旋转
  if (rotate && !showExternalIcon.value) {
    result.transform = `rotate(${rotate}deg)`
  }

  return result
})

// 处理内部图标
const internalIconVnode = computed(() => {
  if (hasInnerIcon.value) {
    return _internalIcons[name as InternalIconName] || null
  }
  return null
})

// 计算组件类名
const iconClasses = computed(() => [
  _bem.b(),
  innerSize.value && _bem.m(`size-${innerSize.value}`),
  colorType && _bem.m(`type-${colorType}`),
  flip && _bem.m('flip'),
  spin && _bem.m('spin'),
  disabled && _bem.m('disabled')
])
</script>

<template>
  <i
    :class="iconClasses"
    :style="iconStyle"
    tabindex="0"
    :aria-disabled="disabled"
  >
    <slot v-if="$slots.default" />
    <JvIconify
      v-else-if="showExternalIcon"
      :icon="name"
      :color="color"
      :rotate="rotate"
      :flip="flip ? 'horizontal' : undefined"
      :spin="spin"
    />
    <component :is="internalIconVnode" v-else-if="internalIconVnode" />
  </i>
</template>

<style lang="scss">
@include b(icon) {
  --jv-icon-size: 24px;
  --jv-icon-color: var(--jv-theme-primary);

  //   ==== 通用样式 ====
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--jv-icon-color);
  font-size: var(--jv-icon-size);
  line-height: 1;
  vertical-align: middle;
  user-select: none;

  // 预设尺寸
  @include m(size-tiny) {
    --jv-icon-size: 12px;
  }

  @include m(size-small) {
    --jv-icon-size: 16px;
  }

  @include m(size-medium) {
    --jv-icon-size: 24px;
  }

  @include m(size-large) {
    --jv-icon-size: 32px;
  }

  @include m(size-xlarge) {
    --jv-icon-size: 40px;
  }

  // 颜色类型
  @include m(type-primary) {
    --jv-icon-color: var(--jv-theme-primary);
  }

  @include m(type-secondary) {
    --jv-icon-color: var(--jv-theme-secondary);
  }

  @include m(type-success) {
    --jv-icon-color: var(--jv-theme-success);
  }

  @include m(type-warning) {
    --jv-icon-color: var(--jv-theme-warning);
  }

  @include m(type-error) {
    --jv-icon-color: var(--jv-theme-error);
  }

  @include m(type-info) {
    --jv-icon-color: var(--jv-theme-info);
  }

  // 动画效果
  @include m(spin) {
    animation: jv-icon-spin 2s infinite linear;
  }

  @include m(flip) {
    transform: scaleX(-1);
  }

  @include m(disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

@keyframes jv-icon-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
