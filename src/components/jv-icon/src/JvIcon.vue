<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { InternalIconName, JvIconProps, JvIconSize } from './types'
import { _internalIcons } from '@/components/internal-icon'
import { isString } from '@/utils'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { bem as _bem, JVICON_NAME, sizeOptions } from './types'

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

// 判断是否显示外部图标
const showExternalIcon = computed(() => name && !String(name).startsWith('$'))
// 计算图标样式
const iconStyle = computed<CSSProperties>(() => {
  const result: CSSProperties = {}

  // 处理尺寸
  if (!Number.isNaN(size)) {
    const sizeValue = `${size}px`
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

const innerSize = computed(() =>
  isString(size) && sizeOptions.includes(size as JvIconSize) ? size : ''
)

// 处理内部图标
const internalIconVnode = computed(() => {
  if (name && String(name).startsWith('$')) {
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
  spin && _bem.m('spin')
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
    <Icon
      v-else-if="showExternalIcon"
      :icon="name"
      :color="color"
      :rotate="rotate"
      :flip="flip ? 'horizontal' : undefined"
      :class="{ 'jv-icon--spin': spin }"
    />
    <component
      :is="internalIconVnode"
      v-else-if="internalIconVnode"
      :class="{ 'jv-icon--spin': spin }"
    />
  </i>
</template>

<style lang="scss">
.jv-icon {
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
  &--size-small {
    --jv-icon-size: 16px;
  }

  &--size-medium {
    --jv-icon-size: 24px;
  }

  &--size-large {
    --jv-icon-size: 32px;
  }

  &--size-xlarge {
    --jv-icon-size: 40px;
  }

  // 颜色类型
  &--type-primary {
    --jv-icon-color: var(--jv-theme-primary);
  }

  &--type-secondary {
    --jv-icon-color: var(--jv-theme-secondary);
  }

  &--type-success {
    --jv-icon-color: var(--jv-theme-success);
  }

  &--type-warning {
    --jv-icon-color: var(--jv-theme-warning);
  }

  &--type-error {
    --jv-icon-color: var(--jv-theme-error);
  }

  &--type-info {
    --jv-icon-color: var(--jv-theme-info);
  }

  // 动画效果
  &--spin {
    animation: jv-icon-spin 2s infinite linear;
  }

  &--flip {
    transform: scaleX(-1);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
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
