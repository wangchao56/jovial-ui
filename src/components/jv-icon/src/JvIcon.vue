<script setup lang="ts">
import type { InternalIconName, JvIconProps } from './types'
import { _internalIcons } from '@/components/internal-icon'
import { useSize } from '@/hooks/useSize'
import { computed, shallowRef, useCssVars } from 'vue'
import JvIconify from './JvIconify.vue'
import { bem as _bem, JVICON_NAME } from './types'

defineOptions({ name: JVICON_NAME, inheritAttrs: true })

const {
  color = 'primary',
  size = 'medium',
  name,
  rotate = 0,
  flip = false,
  spin = false,
  disabled = false,
} = defineProps<JvIconProps>()
// 判断是否是内部图标
const hasInnerIcon = shallowRef(name && String(name).startsWith('$'))
// 判断是否显示外部图标
const showExternalIcon = shallowRef(name && !hasInnerIcon.value)

const { sizeWithUnit, isInnerSize } = useSize(size, {
  tiny: 16,
  small: 20,
  medium: 24,
  large: 32,
  xlarge: 40,
}, 24)

// 处理内部图标
const internalIconVnode = computed(() => {
  if (hasInnerIcon.value) {
    return _internalIcons[name as InternalIconName] || null
  }
  return null
})

useCssVars(() => {
  return {
    'jv-icon-size': sizeWithUnit.value,
  }
})
</script>

<template>
  <i
    :class="[
      _bem.b(),
      isInnerSize && _bem.m(`size-${size}`),
      flip && _bem.m('flip'),
      spin && _bem.m('spin'),
      disabled && _bem.m('disabled'),
      color && !color.startsWith('#') && _bem.m(`color-${color}`),
    ]"
    tabindex="0"
    :aria-disabled="disabled"
    :style="color.startsWith('#') ? { color } : undefined"
    role="img"
    :aria-hidden="false"
  >
    <slot v-if="$slots.default" />
    <JvIconify
      v-else-if="showExternalIcon" :icon="name as string" :color="color" :rotate="rotate"
      :flip="flip ? 'horizontal' : undefined" :spin="spin"
    />
    <component :is="internalIconVnode" v-else-if="internalIconVnode" />
  </i>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$icon-size-map: (
  'tiny': 12px,
  'small': 16px,
  'medium': 20px,
  'large': 24px,
  'xlarge': 32px,
);
$icon-color-map: ('primary', 'secondary', 'success', 'warning', 'error', 'info');

.jv-icon {
  --jv-icon-size: 24px;
  --jv-icon-color: var(--jv-theme-on-surface);

  //   ==== 通用样式 ====
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  font-size: var(--jv-icon-size);
  transition: color 0.2s ease-in-out;

  svg {
    fill: currentcolor;
    stroke: currentcolor;
  }

  @each $key, $value in $icon-size-map {
    &--size-#{$key} {
      --jv-icon-size: #{$value};
    }
  }

  @each $key, $value in $icon-color-map {
    &--color-#{$key} {
      --jv-icon-color: var(--jv-theme-#{$value});
    }
  }

  &--spin {
    animation: jv-icon-spin 1s infinite linear;
  }

  &--flip {
    transform: scaleX(-1);
  }

  &--disabled {
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
