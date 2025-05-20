<script setup lang="ts">
import type { JvButtonGroupProps, JvButtonGroupSlots } from './types'
import { computed, useCssVars } from 'vue'
import { Shape } from '@/constants'
import { useStyle } from '@/hooks'
import { useRoundedClass } from '@/hooks/useStyle/useRoundedClass'
import { useTheme } from '@/theme'
import { convertToUnit } from '@/utils'
import { bemGroup, JVBUTTONGROUP_NAME } from './types'

defineOptions({ name: JVBUTTONGROUP_NAME, inheritAttrs: false })

// 组件属性默认值设置
const props = withDefaults(defineProps<JvButtonGroupProps>(), {
  direction: 'horizontal',
  variant: 'elevated',
  size: 'medium',
  color: 'default',
  disabled: false,
  shape: Shape.SQUARE,
  gap: 2,
  attached: false,
})

defineSlots<JvButtonGroupSlots>()

// 工具钩子
const { customStyles } = useStyle()
const theme = useTheme()
const roundedClass = useRoundedClass(props.rounded)

// 计算样式类
const groupClasses = computed(() => {
  const classes = [
    theme.themeClasses.value,
    bemGroup.b(),
    bemGroup.m(`direction-${props.direction}`),
    bemGroup.m(`shape-${props.shape}`),
    props.attached && bemGroup.m('attached'),
    props.disabled && bemGroup.m('disabled'),
    roundedClass.value,
  ]

  // 处理自定义类名
  if (props.customClass) {
    if (typeof props.customClass === 'string') {
      classes.push(props.customClass)
    }
    else if (Array.isArray(props.customClass)) {
      classes.push(...props.customClass)
    }
    else {
      for (const [className, condition] of Object.entries(props.customClass)) {
        if (condition)
          classes.push(className)
      }
    }
  }

  return classes.filter(Boolean)
})

// 计算样式对象
const groupStyle = computed(() => {
  const baseStyles: Record<string, string> = {
    ...(props.customStyle || {}),
  }

  if (!props.attached) {
    const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
    baseStyles.gap = gapValue
  }

  return baseStyles
})

useCssVars(() => ({
  'jv-buttongroup-direction': props.direction,
  'jv-buttongroup-variant': props.variant,
  'jv-buttongroup-size': props.size,
  'jv-buttongroup-color': props.color,
  'jv-buttongroup-attached': props.attached ? 'true' : 'false',
  'jv-buttongroup-shape': props.shape,
  'jv-buttongroup-gap': convertToUnit(props.gap) as string,
}))
</script>

<template>
  <div
    :class="groupClasses"
    :style="[groupStyle, customStyles]"
    role="group"
    :aria-disabled="disabled"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;

@include b(button-group) {
  --jv-buttongroup-gap: 0px;
  position: relative;
  display: inline-flex;
  gap: var(--jv-buttongroup-gap);

  // 处理子按钮样式
  :deep(.jv-button) {
    --button-group-mode: true;

    // 如果组是禁用状态，强制所有子按钮禁用
    .jv-button-group--disabled & {
      --jv-button-opacity: 0.6;
      --jv-button-pointer-events: none;
      cursor: not-allowed;
    }

    // 应用组配置的变体、尺寸和颜色
    &:not([data-ignore-group='true']) {
      --jv-button-variant: var(--jv-buttongroup-variant);
      --jv-button-size: var(--jv-buttongroup-size);
      --jv-button-height: auto; // 让按钮高度自适应，由尺寸决定
      --jv-button-color: var(--jv-buttongroup-color);
    }
  }

  // 紧凑模式样式
  &--attached {
    :deep(.jv-button) {
      margin: 0;
      border-radius: 0;

      &:not(:first-child) {
        margin-left: -1px; // 合并边框
      }

      &:first-child {
        border-top-left-radius: var(--jv-rounded);
        border-bottom-left-radius: var(--jv-rounded);
      }

      &:last-child {
        border-top-right-radius: var(--jv-rounded);
        border-bottom-right-radius: var(--jv-rounded);
      }

      &:focus {
        position: relative;
        z-index: 1;
      }
    }
  }

  // 方向变体
  &--direction-horizontal {
    flex-direction: row;
    align-items: center;
  }

  &--direction-vertical {
    flex-direction: column;
    align-items: stretch;

    &.jv-button-group--attached {
      :deep(.jv-button) {
        &:not(:first-child) {
          margin-top: -1px;
          margin-left: 0;
        }

        &:first-child {
          border-radius: var(--jv-rounded) var(--jv-rounded) 0 0;
        }

        &:last-child {
          border-radius: 0 0 var(--jv-rounded) var(--jv-rounded);
        }
      }
    }
  }

  // 形状变体
  &--shape-square {
    :deep(.jv-button) {
      &:first-child,
      &:last-child {
        border-radius: 0;
      }
    }
  }

  &--shape-pill {
    --jv-rounded: var(--jv-rounded-pill);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
