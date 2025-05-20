<script setup lang="ts">
import type { JvTooltipEmits, JvTooltipProps } from './types'
import type { PlacementType } from '@/components/jv-popover/src/types'
import {
  nextTick,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import JvFragmentWrapper from '@/components/internal/FragmentWrapper.tsx'
import { useComponentId } from '@/hooks/useComponentId'
import usePositioning from '@/hooks/usePositioning'
import { getTooltipContainer } from './helper'
import { JVTOOLTIP_NAME } from './types'

defineOptions({ name: JVTOOLTIP_NAME, inheritAttrs: true })

const {
  triggerMethod = 'hover',
  placement = 'top',
  maxWidth,
  content,
  showArrow = true,
  offset = 8,
  referenceRect = null,
  placementStrategy = 'prevent-overflow',
} = defineProps<JvTooltipProps>()

defineEmits<JvTooltipEmits>()
// 定义显示状态的模型值
const visible = defineModel<boolean>('show', { default: false })

const tooltipId = useComponentId('tooltip')
// 使用定位钩子
const { actualPlacement, updateElementPosition, setupEventListeners, cleanupEventListeners } = usePositioning()

// 用于存储触发元素的引用
const triggerEl = ref<HTMLElement | null>(null)
const tooltipEl = ref<HTMLElement | null>(null)
const arrowEl = ref<HTMLElement | null>(null)
const tooltipContentEl = ref<HTMLElement | null>(null)
const tooltipContainer = ref<HTMLElement | null>(getTooltipContainer())
// 存储计算后的位置
const position = ref({ x: 0, y: 0 })

// 设置触发元素的引用
function setRef(el: HTMLElement) {
  if (el) {
    triggerEl.value = el
    // 只有在没有提供referenceRect时才添加事件监听
    if (!referenceRect) {
      // 当使用FragmentWrapper时，为触发元素添加事件监听
      if (triggerMethod === 'hover') {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      }
      else if (triggerMethod === 'click') {
        el.addEventListener('click', handleClick)
      }
      else if (triggerMethod === 'focus') {
        el.addEventListener('focus', handleFocus)
        el.addEventListener('blur', handleBlur)
      }
      else if (triggerMethod === 'contextmenu') {
        el.addEventListener('contextmenu', handleContextMenu)
      }
    }
    else {
      // 如果提供了referenceRect，直接展示tooltip
      visible.value = true
    }
  }
}

// 计算tooltip位置
function updatePosition() {
  const tooltipElement = tooltipEl.value
  const triggerElement = triggerEl.value

  if (!tooltipElement)
    return

  if (referenceRect) {
    // 使用referenceRect作为参考，手动计算位置
    const offsetValue = typeof offset === 'number' ? [offset, offset] : offset

    // 创建虚拟的参考元素
    const virtualRef = {
      getBoundingClientRect: () => referenceRect,
    } as HTMLElement

    // 更新元素位置
    updateElementPosition(
      tooltipElement,
      virtualRef,
      {
        placement: placement as PlacementType,
        offset: offsetValue,
        placementStrategy,
      },
    )

    // 提取计算后的位置
    position.value = {
      x: Number.parseInt(tooltipElement.style.left, 10),
      y: Number.parseInt(tooltipElement.style.top, 10),
    }

    // 更新箭头位置
    updateArrowPosition()
  }
  else if (triggerElement) {
    // 使用实际触发元素定位
    const offsetValue = typeof offset === 'number' ? [offset, offset] : offset

    // 更新元素位置
    updateElementPosition(
      tooltipElement,
      triggerElement,
      {
        placement: placement as PlacementType,
        offset: offsetValue,
        placementStrategy,
      },
    )

    // 提取计算后的位置
    position.value = {
      x: Number.parseInt(tooltipElement.style.left, 10),
      y: Number.parseInt(tooltipElement.style.top, 10),
    }

    // 更新箭头位置
    updateArrowPosition()
  }
}

// 箭头位置样式
const arrowStyle = ref<Record<string, string>>({})

// 更新箭头位置
function updateArrowPosition() {
  if (!showArrow || !arrowEl.value || !tooltipEl.value)
    return

  const arrowSize = 8 // 箭头大小
  const style: Record<string, string> = {}

  // 根据位置放置箭头
  if (actualPlacement.value?.startsWith('top')) {
    style.bottom = `-${arrowSize - 1}px` // 减少1px以确保箭头紧贴内容边缘
    style.left = '50%'
    style.transform = 'translateX(-50%) rotate(45deg)'
    style.marginBottom = '-1px' // 增加负边距使箭头更好地与内容连接
  }
  else if (actualPlacement.value?.startsWith('bottom')) {
    style.top = `-${arrowSize - 1}px` // 减少1px以确保箭头紧贴内容边缘
    style.left = '50%'
    style.transform = 'translateX(-50%) rotate(45deg)'
    style.marginTop = '-1px' // 增加负边距使箭头更好地与内容连接
  }
  else if (actualPlacement.value?.startsWith('left')) {
    style.right = `-${arrowSize - 1}px` // 减少1px以确保箭头紧贴内容边缘
    style.top = '50%'
    style.transform = 'translateY(-50%) rotate(45deg)'
    style.marginRight = '-1px' // 增加负边距使箭头更好地与内容连接
  }
  else if (actualPlacement.value?.startsWith('right')) {
    style.left = `-${arrowSize - 1}px` // 减少1px以确保箭头紧贴内容边缘
    style.top = '50%'
    style.transform = 'translateY(-50%) rotate(45deg)'
    style.marginLeft = '-1px' // 增加负边距使箭头更好地与内容连接
  }

  // 处理不同变体的箭头位置
  if (actualPlacement.value?.endsWith('start')) {
    if (actualPlacement.value.startsWith('top') || actualPlacement.value.startsWith('bottom')) {
      style.left = `${arrowSize * 2}px`
      style.transform = 'rotate(45deg)'
    }
    else {
      style.top = `${arrowSize * 2}px`
      style.transform = 'rotate(45deg)'
    }
  }
  else if (actualPlacement.value?.endsWith('end')) {
    if (actualPlacement.value.startsWith('top') || actualPlacement.value.startsWith('bottom')) {
      style.left = `calc(100% - ${arrowSize * 2}px)`
      style.transform = 'rotate(45deg)'
    }
    else {
      style.top = `calc(100% - ${arrowSize * 2}px)`
      style.transform = 'rotate(45deg)'
    }
  }

  arrowStyle.value = style
}

// 处理鼠标进入事件
function handleMouseEnter() {
  visible.value = true
}

// 处理鼠标离开事件
function handleMouseLeave() {
  visible.value = false
}

// 处理点击事件
function handleClick(event: MouseEvent) {
  event.preventDefault()
  visible.value = !visible.value
}

// 处理焦点事件
function handleFocus() {
  visible.value = true
}

// 处理失焦事件
function handleBlur() {
  visible.value = false
}

// 处理右键菜单事件
function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
  visible.value = !visible.value
}

// 监听显示状态变化
watch(visible, (isVisible) => {
  if (isVisible) {
    nextTick(() => {
      updatePosition()
      // 添加resize事件监听
      setupEventListeners(updatePosition)
    })
  }
  else {
    // 移除事件监听
    cleanupEventListeners(updatePosition)
  }
})

// 清除触发元素上的事件监听器
function cleanupTriggerEventListeners() {
  if (triggerEl.value) {
    if (triggerMethod === 'hover') {
      triggerEl.value.removeEventListener('mouseenter', handleMouseEnter)
      triggerEl.value.removeEventListener('mouseleave', handleMouseLeave)
    }
    else if (triggerMethod === 'click') {
      triggerEl.value.removeEventListener('click', handleClick)
    }
    else if (triggerMethod === 'focus') {
      triggerEl.value.removeEventListener('focus', handleFocus)
      triggerEl.value.removeEventListener('blur', handleBlur)
    }
    else if (triggerMethod === 'contextmenu') {
      triggerEl.value.removeEventListener('contextmenu', handleContextMenu)
    }
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 如果提供了外部referenceRect，使用它
  tooltipContainer.value = getTooltipContainer()
  if (referenceRect) {
    // 如果提供了referenceRect，自动显示tooltip
    visible.value = true
  }
})

// 组件卸载时清理事件监听器和DOM节点
onBeforeUnmount(() => {
  cleanupTriggerEventListeners()

  // 移除tooltip容器
  if (tooltipContainer.value && document.body.contains(tooltipContainer.value)) {
    document.body.removeChild(tooltipContainer.value)
  }
})
</script>

<template>
  <JvFragmentWrapper v-if="!referenceRect" :set-ref="setRef" :only-child="true">
    <slot />
  </JvFragmentWrapper>
  <Transition name="jv-tooltip-fade">
    <div
      v-if="visible" :id="tooltipId" ref="tooltipEl" class="jv-tooltip" :style="{
        position: 'absolute',
        zIndex: 9999,
      }"
    >
      <div
        ref="tooltipContentEl" class="jv-tooltip__content" :data-placement="actualPlacement"
        :style="normalizeStyle({ maxWidth })"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </div>
      <div v-if="showArrow" ref="arrowEl" class="jv-tooltip__arrow" :style="arrowStyle" />
    </div>
  </Transition>
</template>

<style lang="scss">
.jv-tooltip-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: visible;
  width: 0;
  height: 0;
  pointer-events: none;
}

.jv-tooltip-fade-enter-active,
.jv-tooltip-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.jv-tooltip-fade-enter-from,
.jv-tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.jv-tooltip {
  pointer-events: none;

  &__content {
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgb(0 0 0 / 0.15);
    background: rgb(0 0 0 / 0.8);
    color: white;
    font-size: 14px;
    line-height: 1.4;
    white-space: nowrap;
    transition: all 0.2s ease-out;
  }

  &__arrow {
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border: 1px solid transparent;
    background-color: rgb(0 0 0 / 0.8);
    transform: rotate(45deg);
    pointer-events: none;
  }
}
</style>
