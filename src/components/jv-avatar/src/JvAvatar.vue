<script setup lang="ts">
import type { JvAvatarEmits, JvAvatarProps, JvAvatarSlots } from './types'
import type { JvBadgeProps } from '@/components/jv-badge'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import JvBadge from '@components/jv-badge/src/JvBadge.vue'
import JvIcon from '@components/jv-icon/src/JvIcon.vue'
import JvImage from '@components/jv-image/src/JvImage.vue'
import { computed, ref, shallowRef, useCssVars } from 'vue'
import { useComponentId } from '@/hooks/useComponentId'
import { useSize } from '@/hooks/useSize'
import { useStringOrObjectProps } from '@/hooks/useStringOrObjectProps'
import { convertToUnit } from '@/utils'
import { bem, JVAVATAR_NAME } from './types'

defineOptions({ name: JVAVATAR_NAME, inheritAttrs: false })

const {
  size = 'medium',
  shape = 'circle',
  variant = 'filled',
  image,
  icon,
  text = 'U',
  badge = false,
  disabled = false,
  borderWidth = 1,
  elevated = false,
  class: className = '',
  style: styleObj = {},
  textColor,
} = defineProps<JvAvatarProps>()

const emit = defineEmits<JvAvatarEmits>()
const slots = defineSlots<JvAvatarSlots>()

// 使用useSize hook处理尺寸
const { sizeWithUnit, isInnerSize } = useSize(size, {
  tiny: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 64,
}, 40)

// 使用computed优化类型判断
const innerType = computed(() => {
  if (image)
    return 'image'
  if (icon)
    return 'icon'
  if (text !== undefined || (slots.text && !!slots.text()))
    return 'text'
  return 'default'
})

// 优化图片属性计算
const hasImage = computed(() => innerType.value === 'image')
const avatarImageProps = computed(() => {
  if (!hasImage.value)
    return {}

  const baseProps = {
    fit: 'cover' as const,
    aspectRatio: '1/1',
    rounded: shape === 'rounded' ? 'b-sm' : shape as RoundedType,
    alt: 'avatar',
  }

  if (typeof image === 'string') {
    return { ...baseProps, src: image }
  }

  return { ...baseProps, ...(image || { src: '' }) }
})

// 优化图标属性
const hasIcon = computed(() => innerType.value === 'icon')
const avatarIconProps = computed<JvIconProps>(() => {
  if (!hasIcon.value)
    return { size }

  const iconProps = typeof icon === 'string'
    ? { name: icon }
    : (typeof icon === 'object' ? icon : {})

  return {
    ...iconProps,
    'aria-hidden': 'true',
    'size': size,
  }
})

// 优化文本和默认图标属性
const hasText = computed(() => innerType.value === 'text')
const textRef = ref<HTMLElement>()
const avatarTextContent = computed(() => {
  if (!text)
    return 'U'
  return String(text).charAt(0)
})

// 默认图标属性 - 使用shallowRef避免深层响应式
const avatarDefaultProps = shallowRef<JvIconProps>({
  name: '$account',
  color: 'warning',
})

// 优化badge属性处理 - 使用useMemo缓存结果
const badgeProps = useStringOrObjectProps<JvBadgeProps>(badge, {
  placement: 'bottom-right',
  dot: true,
})

// 事件处理函数优化 - 使用命名函数而非匿名函数
function handleImageLoad(event: Event) {
  emit('load', event)
}

function handleImageError(_event: Event) {
  emit('error', new Error('Image loading failed'))
}

// 处理点击事件 - 添加防抖
let clickTimer: number | null = null
function handleClick(event: MouseEvent) {
  if (disabled || clickTimer)
    return

  clickTimer = window.setTimeout(() => {
    emit('click', event)
    clickTimer = null
  }, 10)
}

// 处理键盘事件
function handleKeyDown(event: KeyboardEvent) {
  if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    handleClick(event as unknown as MouseEvent)
  }
}

// 优化单位转换函数
function getBorderWidthUnit(val: string | number): string {
  return convertToUnit(val) || '1px'
}

// 优化类名计算 - 减少不必要的判断
const avatarClasses = computed(() => [
  bem.b(),
  isInnerSize.value && bem.m(`size-${size}`),
  bem.m(`shape-${shape}`),
  bem.m(`variant-${variant}`),
  bem.is('elevated', elevated),
  disabled && bem.m('disabled'),
  className,
])

// 设置CSS变量 - 只计算必要的变量
useCssVars(() => ({
  'jv-avatar-size': sizeWithUnit.value,
  'jv-avatar-border-width': getBorderWidthUnit(borderWidth),
  'jv-avatar-text-color': textColor || 'var(--jv-theme-on-surface)',
}))

const avatarId = useComponentId(JVAVATAR_NAME)
</script>

<template>
  <div
    :id="avatarId"
    :class="avatarClasses"
    :style="styleObj"
    tabindex="0"
    :aria-disabled="disabled"
    role="img"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <JvBadge
      v-bind="badgeProps"
      :hidden="!badge"
      :offset="['12%', '12%']"
      :size="32"
    >
      <div class="jv-avatar__wrapper">
        <!-- 图片类型 - 条件渲染减少不必要的DOM -->
        <template v-if="hasImage">
          <JvImage
            :class="bem.e('image')"
            :aria-labelledby="avatarId"
            v-bind="avatarImageProps"
            @load="handleImageLoad"
            @error="handleImageError"
          />
        </template>

        <!-- 图标类型 - 直接使用h函数渲染，减少组件嵌套 -->
        <template v-else-if="hasIcon">
          <JvIcon
            :class="bem.e('icon')"
            v-bind="avatarIconProps"
          >
            <slot name="icon" />
          </JvIcon>
        </template>

        <!-- 文本类型 - 使用简单span元素替代组件 -->
        <template v-else-if="hasText">
          <span
            ref="textRef"
            :class="bem.e('text')"
          >
            <slot name="text">
              {{ avatarTextContent }}
            </slot>
          </span>
        </template>

        <!-- 默认占位符 - 使用div包裹，提升语义化 -->
        <template v-else>
          <div :class="bem.e('placeholder')">
            <slot name="placeholder">
              <JvIcon
                :class="bem.e('icon')"
                v-bind="avatarDefaultProps"
              />
            </slot>
          </div>
        </template>
      </div>
    </JvBadge>
  </div>
</template>

<style lang="scss">
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;

$avatar-sizes: (
  'tiny': (
    width: 24px,
    height: 24px,
    font-size: 0.75rem,
  ),
  'small': (
    width: 32px,
    height: 32px,
    font-size: 0.875rem,
  ),
  'medium': (
    width: 40px,
    height: 40px,
    font-size: 1rem,
  ),
  'large': (
    width: 48px,
    height: 48px,
    font-size: 1.25rem,
  ),
  'xlarge': (
    width: 64px,
    height: 64px,
    font-size: 1.5rem,
  ),
);

@include b(avatar) {
  --jv-avatar-size: 40px;
  --jv-avatar-border-radius: var(--jv-rounded-pill);
  --jv-avatar-border-width: 1px;
  --jv-avatar-bg-color: var(--jv-theme-surface);
  --jv-avatar-text-color: var(--jv-theme-on-surface);

  // 布局
  position: relative;
  max-width: var(--jv-avatar-size);
  max-height: var(--jv-avatar-size);
  border: var(--jv-avatar-border-width) solid var(--jv-theme-outline);
  border-radius: var(--jv-avatar-border-radius);
  background-color: var(--jv-avatar-bg-color);
  color: var(--jv-avatar-text-color);
  transition: all 0.2s ease;
  user-select: none;
  aspect-ratio: 1/1;
  will-change: transform, opacity;

  &:focus-visible {
    outline: 2px solid var(--jv-theme-primary);
    outline-offset: 2px;
  }

  @include when(elevated) {
    box-shadow: var(--jv-elevation-2);
  }

  @include e(wrapper) {
    display: inline-flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: var(--jv-avatar-size);
    height: var(--jv-avatar-size);
    border-radius: inherit;
    aspect-ratio: 1/1;
  }

  @each $size, $size-value in $avatar-sizes {
    @include m($size) {
      --jv-avatar-size: #{map.get($size-value, width)};
      font-size: #{map.get($size-value, font-size)};
    }
  }

  @include m(shape-circle) {
    --jv-avatar-border-radius: var(--jv-rounded-pill);
  }

  @include m(shape-square) {
    --jv-avatar-border-radius: var(--jv-rounded-none);
  }

  @include m(shape-rounded) {
    --jv-avatar-border-radius: var(--jv-rounded-base);
  }

  @include m(variant-outlined) {
    border: 4px solid rgb(0 0 0 / 0.1);
    box-shadow: none;
  }

  @include m(variant-filled) {
    box-shadow: var(--jv-avatar-box-shadow);
    background-color: var(--jv-avatar-bg-color);
  }

  @include m(disabled) {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  @include e(icon) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: inherit;

    svg {
      width: 60%;
      height: 60%;
    }
  }

  @include e(text) {
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: inherit;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @include e(placeholder) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .jv-image__img,
  .jv-avatar__image,
  img {
    aspect-ratio: 1/1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
