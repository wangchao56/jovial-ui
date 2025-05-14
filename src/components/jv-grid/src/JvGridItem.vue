<script setup lang="ts">
import type { JvGridItemPosition } from './types'
import { useStyle } from '@/hooks'
import { computed } from 'vue'
import { bem, JVGRID_NAME } from './types'

defineOptions({ name: `${JVGRID_NAME}Item`, inheritAttrs: false })
const props = defineProps<JvGridItemProps>()
interface JvGridItemProps extends JvGridItemPosition {
  // 是否填充父容器
  fill?: boolean
}

// 自定义样式
const { customStyles } = useStyle()
const gridItemStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (customStyles) {
    Object.assign(styles, customStyles)
  }

  // 处理网格项的位置
  if (props.rowStart !== undefined) {
    styles.gridRowStart = props.rowStart
  }

  if (props.rowEnd !== undefined) {
    styles.gridRowEnd = props.rowEnd
  }

  if (props.colStart !== undefined) {
    styles.gridColumnStart = props.colStart
  }

  if (props.colEnd !== undefined) {
    styles.gridColumnEnd = props.colEnd
  }

  // 处理跨行跨列
  if (props.rowSpan !== undefined) {
    styles.gridRow = `span ${props.rowSpan}`
  }

  if (props.colSpan !== undefined) {
    styles.gridColumn = `span ${props.colSpan}`
  }

  return styles
})
</script>

<template>
  <div
    :class="[
      bem.e('item'),
      bem.is('fill', props.fill),
    ]"
    :style="gridItemStyles"
    v-bind="$attrs"
    role="gridcell"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.jv-grid__item {
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  background-color: var(--jv-theme-surface);

  &.is-fill {
    width: 100%;
    height: 100%;
  }
}
</style>
