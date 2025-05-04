<script setup lang="ts">
import type { JvGridItemPosition } from './types'
import { useStyle } from '@/hooks'
import { computed } from 'vue'
import { bem, JVGRID_NAME } from './types'

defineOptions({ name: `${JVGRID_NAME}Item`, inheritAttrs: false })
const props = defineProps<JvGridItemProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

interface JvGridItemProps extends JvGridItemPosition {
  // 是否填充父容器
  fill?: boolean
  // 是否禁用
  disabled?: boolean
  // 是否可点击
  clickable?: boolean
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

// 点击处理函数
function handleClick(event: MouseEvent) {
  if (props.disabled || !props.clickable)
    return
  emit('click', event)
}
</script>

<template>
  <div
    :class="[
      bem.e('item'),
      bem.is('fill', props.fill),
      bem.is('clickable', props.clickable),
      bem.is('disabled', props.disabled),
    ]"
    :style="gridItemStyles"
    v-bind="$attrs"
    role="gridcell"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/elevation' as *;

.jv-grid__item {
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  border-radius: var(--jv-rounded-sm);
  background-color: var(--jv-theme-surface);
  transition: all 0.3s ease;

  &.is-fill {
    width: 100%;
    height: 100%;
  }

  &.is-clickable {
    cursor: pointer;

    &:hover {
      box-shadow: var(--jv-elevation-4);
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: var(--jv-elevation-1);
      transform: translateY(0);
    }
  }

  &.is-disabled {
    background-color: var(--jv-theme-disabled);
    color: var(--jv-theme-on-disabled);
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
