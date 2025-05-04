<script setup lang="ts">
import type { JvTooltipProps, PlacementType } from './types'
import JvFragmentWrapper from '@/components/internal/FragmentWrapper.tsx'
import JvPopover from '@/components/jv-popover/src/JvPopover.vue'
import {
  computed,
  nextTick,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
} from 'vue'
import { JVTOOLTIP_NAME } from './types'

defineOptions({ name: JVTOOLTIP_NAME, inheritAttrs: true })

const {
  triggerMethod = 'hover',
  placement = 'top',
  maxWidth,
  content,
  showArrow = true,
  offset = [8, 8],
  referenceRect = null,
  placementStrategy = 'prevent-overflow',
} = defineProps<JvTooltipProps>()

// 定义显示状态的模型值
const visible = defineModel<boolean>('show', { default: false })

const tooltipId = `${JVTOOLTIP_NAME}-${useId()}`
// 跟踪实际放置位置
const actualPlacement = ref<PlacementType>(placement)

// 用于存储触发元素的引用
const triggerEl = ref<HTMLElement | null>(null)
const localReferenceRect = ref<DOMRect | null>(null)
const tooltipContentEl = ref<HTMLElement | null>(null)
const tooltipSize = ref<{ width?: number, height?: number }>({})

// 接收实际放置位置的方法
function handleActualPlacementChange(newPlacement: string) {
  actualPlacement.value = newPlacement as PlacementType
}

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

// 在tooltip显示前更新内容尺寸
function updateTooltipSize() {
  // 确保DOM已更新
  nextTick(() => {
    if (tooltipContentEl.value) {
      const rect = tooltipContentEl.value.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        tooltipSize.value = {
          width: rect.width,
          height: rect.height,
        }
      }
    }
  })
}

// 处理鼠标进入事件
function handleMouseEnter() {
  if (triggerEl.value && !referenceRect) {
    localReferenceRect.value = triggerEl.value.getBoundingClientRect()
  }
  updateTooltipSize()
  visible.value = true
}

// 处理鼠标离开事件
function handleMouseLeave() {
  visible.value = false
}

// 处理点击事件
function handleClick(_event: MouseEvent) {
  if (triggerEl.value && !referenceRect) {
    localReferenceRect.value = triggerEl.value.getBoundingClientRect()
  }
  updateTooltipSize()
  visible.value = !visible.value
}

// 处理焦点事件
function handleFocus() {
  if (triggerEl.value && !referenceRect) {
    localReferenceRect.value = triggerEl.value.getBoundingClientRect()
  }
  updateTooltipSize()
  visible.value = true
}

// 处理失焦事件
function handleBlur() {
  visible.value = false
}

// 处理右键菜单事件
function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
  if (triggerEl.value && !referenceRect) {
    localReferenceRect.value = triggerEl.value.getBoundingClientRect()
  }
  updateTooltipSize()
  visible.value = !visible.value
}

// 清除触发元素上的事件监听器
function cleanupEventListeners() {
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

onMounted(() => {
  // 如果提供了外部referenceRect，使用它
  if (referenceRect) {
    localReferenceRect.value = referenceRect
    // 如果提供了referenceRect，自动显示tooltip
    visible.value = true
  }
  // 初始计算tooltip尺寸
  updateTooltipSize()
})

const popoverReferenceRect = computed(() => {
  return referenceRect || localReferenceRect.value
})

// 组件卸载时清理事件监听器
onBeforeUnmount(() => {
  cleanupEventListeners()
})
</script>

<template>
  <JvFragmentWrapper v-if="!referenceRect" :set-ref="setRef" :only-child="true">
    <slot />
  </JvFragmentWrapper>
  <div class="jv-tooltip-container">
    <JvPopover
      v-model:show="visible"
      :offset="offset"
      :placement="placement"
      :arrow="showArrow"
      :reference-rect="popoverReferenceRect"
      :placement-strategy="placementStrategy"
      :popover-size="tooltipSize"
      @update:actual-placement="handleActualPlacementChange"
    >
      <div
        :id="tooltipId"
        ref="tooltipContentEl"
        class="jv-tooltip__content"
        :data-placement="actualPlacement"
        :style="normalizeStyle({ maxWidth })"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </JvPopover>
  </div>
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

.jv-tooltip {
  &__content {
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 14px;
    line-height: 1.4;
    white-space: nowrap;
    transition: all 0.2s ease-out;
  }

  .jv-popover__arrow {
    box-shadow: none !important;
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
}
</style>
