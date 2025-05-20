<script setup lang="ts">
import type { JvGridProps, JvGridSlots } from './types'
import { computed } from 'vue'
import { useBreakpoints, useStyle } from '@/hooks'
import { convertToUnit } from '@/utils'
import { bem, JVGRID_NAME } from './types'

defineOptions({ name: JVGRID_NAME, inheritAttrs: false })

const {
  cols = 12,
  responsiveCols,
  rows,
  gap = 16,
  responsiveGap,
  fill = false,
  height,
  width,
} = defineProps<JvGridProps>()

defineSlots<JvGridSlots>()

// 断点相关钩子
const { current: currentBreakpoint } = useBreakpoints()

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
    responsiveMap?: Partial<Record<string, any>>,
  ): any => {
    if (!responsiveMap)
      return defaultValue

    // 优先匹配当前断点
    if (responsiveMap[currentBreakpoint.value])
      return responsiveMap[currentBreakpoint.value]

    // 从小到大查找最接近的断点
    const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint.value)

    // 向下查找最近的断点
    for (let i = currentIndex - 1; i >= 0; i--) {
      const bp = breakpointOrder[i]
      if (responsiveMap[bp] !== undefined)
        return responsiveMap[bp]
    }

    return defaultValue
  }

  // 获取当前断点下的列数
  const currentCols = getResponsiveValue(cols, responsiveCols)

  // 网格列数设置
  if (currentCols) {
    styles.gridTemplateColumns = `repeat(${currentCols}, 1fr)`
  }

  // 网格行数设置
  if (rows) {
    styles.gridTemplateRows = `repeat(${rows}, 1fr)`
  }

  // 获取当前断点下的间距
  const currentGap = getResponsiveValue(gap, responsiveGap)

  // 处理间距
  if (currentGap !== undefined) {
    const [rowGapValue, colGapValue] = Array.isArray(currentGap)
      ? currentGap
      : [currentGap, currentGap]
    styles.rowGap
      = typeof rowGapValue === 'number' ? convertToUnit(rowGapValue) : rowGapValue
    styles.columnGap
      = typeof colGapValue === 'number' ? convertToUnit(colGapValue) : colGapValue
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
      bem.is('fill', fill),
    ]"
    :style="gridStyles"
    role="grid"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@include b(grid) {
  // ---------- 布局样式 ----------
  position: relative;
  display: grid;
  gap: 16px;
  box-sizing: border-box;
  background: var(--jv-theme-background);
  color: var(--jv-theme-on-background);
  transition: all 0.3s ease;

  // ---------- 状态样式 ----------
  @include when(fill) {
    width: 100%;
    height: 100%;
  }
}
</style>
