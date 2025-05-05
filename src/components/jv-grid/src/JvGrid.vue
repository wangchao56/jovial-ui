<script setup lang="ts">
import type { JvGridProps, JvGridSlots } from './types'
import { useBreakpoints, useStyle } from '@/hooks'
import { convertToUnit } from '@/utils'
import { computed } from 'vue'
import { bem, JVGRID_NAME } from './types'

defineOptions({ name: JVGRID_NAME, inheritAttrs: false })

const {
  cols = 12,
  responsiveCols,
  rows,
  responsiveRows,
  gap = 16,
  responsiveGap,
  rowGap,
  responsiveRowGap,
  colGap,
  responsiveColGap,
  header,
  subheader,
  autoFill = false,
  fill = false,
  height,
  width,
  padding = 'md',
  rounded = 'rounded',
  bordered = false,
  disabled = false,
  clickable = false,
  colorType = 'default',
  variant = 'elevated',
  role = 'grid'
} = defineProps<JvGridProps>()

defineSlots<JvGridSlots>()

// 断点相关钩子
const { current: currentBreakpoint, windowSizeClass } = useBreakpoints()

// 自定义样式
const { customStyles } = useStyle()
const gridStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (customStyles) {
    Object.assign(styles, customStyles)
  }

  // 根据断点获取对应值
  const getResponsiveValue = (
    defaultValue: any,
    responsiveMap?: Partial<Record<string, any>>
  ): any => {
    if (!responsiveMap) return defaultValue

    // 优先匹配当前断点
    if (responsiveMap[currentBreakpoint.value])
      return responsiveMap[currentBreakpoint.value]

    // 从小到大查找最接近的断点
    const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint.value)

    // 向下查找最近的断点
    for (let i = currentIndex - 1; i >= 0; i--) {
      const bp = breakpointOrder[i]
      if (responsiveMap[bp] !== undefined) return responsiveMap[bp]
    }

    return defaultValue
  }

  // 获取当前断点下的列数
  const currentCols = getResponsiveValue(cols, responsiveCols)

  // 网格列数设置
  if (currentCols) {
    styles.gridTemplateColumns = autoFill
      ? `repeat(auto-fill, minmax(${convertToUnit(Number(currentCols))}, 1fr))`
      : `repeat(${currentCols}, 1fr)`
  }

  // 获取当前断点下的行数
  const currentRows = getResponsiveValue(rows, responsiveRows)

  // 网格行数设置
  if (currentRows) {
    styles.gridTemplateRows = `repeat(${currentRows}, 1fr)`
  }

  // 获取当前断点下的间距
  const currentGap = getResponsiveValue(gap, responsiveGap)

  // 处理间距
  if (currentGap !== undefined) {
    const [rowGapValue, colGapValue] = Array.isArray(currentGap)
      ? currentGap
      : [currentGap, currentGap]
    styles.rowGap =
      typeof rowGapValue === 'number' ? convertToUnit(rowGapValue) : rowGapValue
    styles.columnGap =
      typeof colGapValue === 'number' ? convertToUnit(colGapValue) : colGapValue
  }

  // 获取当前断点下的行间距
  const currentRowGap = getResponsiveValue(rowGap, responsiveRowGap)

  // 独立设置行间距
  if (currentRowGap !== undefined) {
    styles.rowGap =
      typeof currentRowGap === 'number'
        ? convertToUnit(currentRowGap)
        : currentRowGap
  }

  // 获取当前断点下的列间距
  const currentColGap = getResponsiveValue(colGap, responsiveColGap)

  // 独立设置列间距
  if (currentColGap !== undefined) {
    styles.columnGap =
      typeof currentColGap === 'number'
        ? convertToUnit(currentColGap)
        : currentColGap
  }

  // 设置宽高
  if (width) {
    styles.width = typeof width === 'number' ? `${width}px` : width
  }

  if (height) {
    styles.height = typeof height === 'number' ? `${height}px` : height
  }

  return styles
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`color-type-${colorType}`),
      bem.m(`padding-${padding}`),
      bem.m(`rounded-${rounded}`),
      bem.m(`window-size-${windowSizeClass}`),
      bem.m(`breakpoint-${currentBreakpoint}`),
      bem.is('bordered', bordered),
      bem.is('clickable', clickable),
      bem.is('disabled', disabled),
      bem.is('fill', fill)
    ]"
    :style="gridStyles"
    :role="role"
    v-bind="$attrs"
  >
    <div v-if="$slots.header" :class="bem.e('header')">
      <slot name="header" />
    </div>
    <div
      v-else-if="header || subheader || $slots.subheader"
      :class="bem.e('header')"
    >
      <div v-if="header" :class="bem.e('title')">
        {{ header }}
      </div>
      <div v-if="$slots.subheader" :class="bem.e('subheader')">
        <slot name="subheader" />
      </div>
      <div v-else-if="subheader" :class="bem.e('subheader')">
        {{ subheader }}
      </div>
    </div>

    <div :class="bem.e('content')">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="bem.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;
@use '@/theme/styles/breakpoints' as *;

// 卡片内边距映射
$grid-padding-map: (
  'none': 0,
  'xs': 4px,
  'sm': 8px,
  'md': 16px,
  'lg': 24px,
  'xl': 32px
);

// 颜色类型列表
$color-types: (primary, secondary, success, warning, danger, info, default);

// 变体列表
$variants: (elevated, outlined, tonal);

// Material Design 窗口尺寸类别
$window-size-classes: (compact, medium, expanded, large);

@include b(grid) {
  // ---------- CSS 变量定义 ----------
  --jv-grid-background: var(--jv-theme-background);
  --jv-grid-background-rgb: var(--jv-theme-background-rgb);
  --jv-grid-color: var(--jv-theme-on-background);
  --jv-grid-color-rgb: var(--jv-theme-on-background-rgb);
  --jv-grid-border-radius: var(--jv-rounded);
  --jv-grid-border-color: var(--jv-theme-outline);
  --jv-grid-border-width: 0;
  --jv-grid-box-shadow: none;
  --jv-grid-padding: 16px;

  // ---------- 布局样式 ----------
  position: relative;
  display: grid;
  gap: 16px;
  box-sizing: border-box;

  border: var(--jv-grid-border-width) solid var(--jv-grid-border-color);
  border-radius: var(--jv-grid-border-radius);
  background: var(--jv-grid-background);
  color: var(--jv-grid-color);
  transition: all 0.3s ease;

  // ---------- 子元素样式 ----------
  @include e(header) {
    grid-column: 1 / -1;
    padding: 10px 16px;
  }

  @include e(title) {
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.8;
  }

  @include e(subheader) {
    padding-bottom: 4px;
    color: rgba(0, 0, 0, 0.256);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  @include e(content) {
    display: contents;
  }

  @include e(footer) {
    grid-column: 1 / -1;
    padding: var(--jv-grid-padding);
    border-top: 1px solid var(--jv-theme-outline-variant);
  }

  // ---------- 变体样式 ----------
  @include m(variant-elevated) {
    --jv-grid-box-shadow: var(--jv-elevation-6);
    box-shadow: var(--jv-grid-box-shadow);
  }

  @include m(variant-outlined) {
    --jv-grid-border-width: 2px;
    --jv-grid-border-color: #0000001f;
    --jv-grid-box-shadow: none;
    border: var(--jv-grid-border-width) solid var(--jv-grid-border-color);
    box-shadow: none;
  }

  @include m(variant-tonal) {
    --jv-grid-background: rgba(var(--jv-grid-color-rgb), 0.12);
  }

  // ---------- 颜色类型 ----------
  @each $type in $color-types {
    @include m(color-type-#{$type}) {
      @if $type == default {
        --jv-grid-background: var(--jv-theme-background);
        --jv-grid-background-rgb: var(--jv-theme-background-rgb);
        --jv-grid-color: var(--jv-theme-on-background);
        --jv-grid-color-rgb: var(--jv-theme-on-background-rgb);
      } @else {
        --jv-grid-background: var(--jv-theme-#{$type});
        --jv-grid-background-rgb: var(--jv-theme-#{$type}-rgb);
        --jv-grid-color: var(--jv-theme-on-#{$type});
        --jv-grid-color-rgb: var(--jv-theme-on-#{$type}-rgb);
      }
    }
  }

  // ---------- 窗口尺寸类别样式 ----------
  @each $size in $window-size-classes {
    @include m(window-size-#{$size}) {
      @if $size == 'compact' {
        --jv-grid-padding: 8px;
        --jv-grid-gap: 8px;
        gap: var(--jv-grid-gap);
      } @else if $size == 'medium' {
        --jv-grid-padding: 12px;
        --jv-grid-gap: 12px;
        gap: var(--jv-grid-gap);
      } @else if $size == 'expanded' {
        --jv-grid-padding: 16px;
        --jv-grid-gap: 16px;
        gap: var(--jv-grid-gap);
      } @else if $size == 'large' {
        --jv-grid-padding: 24px;
        --jv-grid-gap: 24px;
        gap: var(--jv-grid-gap);
      }
    }
  }

  // ---------- 断点样式 ----------
  @each $breakpoint, $value in $breakpoints {
    @include m(breakpoint-#{$breakpoint}) {
      @if $breakpoint == 'xs' {
        --jv-grid-title-font-size: 16px;
        --jv-grid-subheader-font-size: 12px;
      } @else if $breakpoint == 'sm' {
        --jv-grid-title-font-size: 18px;
        --jv-grid-subheader-font-size: 13px;
      } @else if $breakpoint == 'md' {
        --jv-grid-title-font-size: 20px;
        --jv-grid-subheader-font-size: 14px;
      } @else if $breakpoint == 'lg' {
        --jv-grid-title-font-size: 22px;
        --jv-grid-subheader-font-size: 15px;
      } @else if $breakpoint == 'xl' {
        --jv-grid-title-font-size: 24px;
        --jv-grid-subheader-font-size: 16px;
      } @else if $breakpoint == '2xl' {
        --jv-grid-title-font-size: 26px;
        --jv-grid-subheader-font-size: 17px;
      }
    }
  }

  // 根据断点调整标题和子标题字体大小
  @include e(title) {
    font-size: var(--jv-grid-title-font-size, 20px);
  }

  @include e(subheader) {
    font-size: var(--jv-grid-subheader-font-size, 14px);
  }

  // ---------- 圆角样式 ----------
  @include m(rounded-rounded) {
    --jv-grid-border-radius: var(--jv-rounded);
  }

  @include m(rounded-roundedSm) {
    --jv-grid-border-radius: var(--jv-rounded-sm);
  }

  @include m(rounded-roundedLg) {
    --jv-grid-border-radius: var(--jv-rounded-lg);
  }

  @include m(rounded-roundedXl) {
    --jv-grid-border-radius: var(--jv-rounded-xl);
  }

  @include m(rounded-roundedFull) {
    --jv-grid-border-radius: var(--jv-rounded-pill);
  }

  // ---------- 内边距样式 ----------
  @each $name, $value in $grid-padding-map {
    @include m(padding-#{$name}) {
      --jv-grid-padding: #{$value};
      padding: #{$value};
    }
  }

  // ---------- 状态样式 ----------
  @include when(bordered) {
    --jv-grid-border-width: 1px;
  }

  @include when(fill) {
    width: 100%;
    height: 100%;
  }

  @include when(clickable) {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: var(--jv-elevation-6);
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: var(--jv-elevation-2);
      transform: translateY(0);
    }
  }

  @include when(disabled) {
    --jv-grid-background: var(--jv-theme-disabled);
    --jv-grid-color: var(--jv-theme-on-disabled);
    --jv-grid-box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
