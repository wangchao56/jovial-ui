<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type {
  JvPopoverEmits,
  JvPopoverExpose,
  JvPopoverProps,
  JvPopoverSlots,
} from './types'
import { useZindex } from '@/hooks'
import { calculatePlacement } from '@/utils'
import { watchThrottled } from '@vueuse/core'
import {
  computed,
  nextTick,
  normalizeClass,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
  watchPostEffect,
} from 'vue'
import { bem, JVPOPOVER_NAME } from './types'

defineOptions({ name: JVPOPOVER_NAME, inheritAttrs: false })

// 使用解构语法直接从defineProps获取props值
const {
  manual = false,
  placement = 'top',
  arrow = false,
  offset = 0,
  referenceRect = null,
  placementStrategy = 'auto',
  arrowSize = 12,
} = defineProps<JvPopoverProps>()

const emits = defineEmits<JvPopoverEmits>()

defineSlots<JvPopoverSlots>()

// 使用Vue 3.5的defineModel语法
const visible = defineModel<boolean>('show', { default: true })

// 计算实际放置位置
const actualPlacement = ref<string>(placement)

// 使用标准的ref API
const popoverRef = ref<HTMLElement | null>(null)
const defaultRect: DOMRect = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  toJSON() {
    return {}
  },
}
const triggerRect = shallowRef<DOMRect>(referenceRect || defaultRect)
const popoverRect = shallowRef<DOMRect>(defaultRect)
// 当arrow为true时，初始偏移量 为arrowSize
const initOffset = computed(() => {
  if (arrow) {
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      return [0, arrowSize]
    }
    else if (placement.startsWith('left') || placement.startsWith('right')) {
      return [arrowSize, 0]
    }
    return [0, 0]
  }
  return [0, 0]
})
const finalOffset = computed(() => {
  // 处理偏移量，支持单一数值或x/y分别指定
  const [offsetX, offsetY] = Array.isArray(offset) ? offset : [0, offset]
  return [initOffset.value[0] + offsetX, initOffset.value[1] + offsetY] as [
    number,
    number,
  ]
})

const offsetStyles = ref<CSSProperties>({})

const { currentZIndex, nextZindex } = useZindex()
onMounted(() => {
  nextZindex()
  popoverRect.value = popoverRef.value?.getBoundingClientRect() || defaultRect
})

const zindex = computed(() => currentZIndex.value)
// 更新位置样式的函数
function updatePositionStyles() {
  // 判断是否需要更新

  // 确保使用当前最新的referenceRect数据
  if (referenceRect) {
    triggerRect.value = referenceRect
  }

  const styles = calculatePlacement(
    triggerRect,
    popoverRect,
    placement,
    finalOffset.value,
    placementStrategy, // 使用组件传入的策略
  ) as CSSProperties & { 'data-actual-placement'?: string }

  // 更新实际放置位置
  if (styles['data-actual-placement']) {
    actualPlacement.value = styles['data-actual-placement']
    // 触发实际位置更新事件
    emits('update:actualPlacement', actualPlacement.value)
    // 从样式对象中删除这个属性，避免它被应用到DOM
    delete styles['data-actual-placement']
  }
  offsetStyles.value = styles
}

// 优化后的watchPostEffect
watchPostEffect(() => {
  updatePositionStyles()
})

// 监听视口变化
const resizeObserver = ref<ResizeObserver | null>(null)

// 动画帧请求ID
let rafId: number | null = null

// 添加节流函数，避免过于频繁的更新
const throttledUpdatePositionStyles = (() => {
  let ticking = false

  return () => {
    if (ticking)
      return

    ticking = true
    rafId = window.requestAnimationFrame(() => {
      updatePositionStyles()
      ticking = false
      rafId = null
    })
  }
})()

// 取消待处理的更新
function cancelPendingUpdate() {
  if (
    typeof window !== 'undefined'
    && window.cancelAnimationFrame
    && rafId !== null
  ) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
}

onMounted(() => {
  // 只有当未提供referenceRect时才设置DOM相关的观察器
  if (!referenceRect) {
    // 创建ResizeObserver来监听视口变化
    resizeObserver.value = new ResizeObserver(() => {
      // 视口大小变化时更新位置
      throttledUpdatePositionStyles()
    })

    // 监听视口变化
    resizeObserver.value.observe(document.documentElement)

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 当弹出层显示时，添加对弹出层尺寸变化的监听
    if (popoverRef.value) {
      resizeObserver.value.observe(popoverRef.value)
    }
  }

  // 初始化位置
  nextTick(updatePositionStyles)
})

watch(visible, (newVal) => {
  if (newVal && popoverRef.value && resizeObserver.value) {
    // 当弹出层显示时，添加对弹出层尺寸变化的监听
    resizeObserver.value.observe(popoverRef.value)
    nextTick(updatePositionStyles)
  }
})

// 处理页面滚动
function handleScroll() {
  // 使用节流函数确保在下一帧更新，优化性能
  throttledUpdatePositionStyles()
}

// 组件卸载时清理资源
onUnmounted(() => {
  // 取消待处理的更新
  cancelPendingUpdate()

  // 清理ResizeObserver
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
    resizeObserver.value = null
  }
  // 移除滚动事件监听
  window.removeEventListener('scroll', handleScroll)
})

function show() {
  manual && (visible.value = true)
  nextTick(updatePositionStyles)
}

function hide() {
  manual && (visible.value = false)
}

function toggle() {
  if (visible.value) {
    hide()
  }
  else {
    show()
  }
}

const popoverID = `${JVPOPOVER_NAME}-${useId()}`

// 使用节流的监听器监控triggerRect的变化
watchThrottled(
  triggerRect,
  () => {
    // 确保在更新位置时triggerRect是最新的
    if (referenceRect) {
      triggerRect.value = referenceRect
    }
    updatePositionStyles()
  },
  { throttle: 16 }, // 使用16ms (约60fps) 的节流来保持流畅
)

// 获取外部传入的class和样式
const attrs = useAttrs()
// 获取外部传入的class
const wrapperClass = attrs.class ? normalizeClass([attrs.class]) : ''
// popover内容的class
const popoverClass = normalizeClass([
  bem.e('content'),
  'elevation-6',
  bem.is('has-arrow', arrow),
])

// 处理过渡动画事件
function onEnter(el: Element) {
  popoverRect.value = el.getBoundingClientRect()
  // 进入动画开始后立即更新位置
  updatePositionStyles()
  // 使用原生JS为DOM元素设置样式
}

function onLeave(_el: Element) {
  // 离开动画，缩小效果
}

defineExpose<JvPopoverExpose>({
  show,
  hide,
  toggle,
})
</script>

<template>
  <Teleport to="body">
    <Transition name="jv-popover-fade" appear @enter="onEnter" @leave="onLeave">
      <div
        v-if="visible"
        :id="popoverID"
        ref="popoverRef"
        :class="[popoverClass, wrapperClass]"
        :data-placement="actualPlacement"
        :style="offsetStyles"
      >
        <slot name="default" />
        <div
          v-if="arrow"
          :class="bem.e('arrow')"
          :data-placement="actualPlacement"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use 'sass:map';

.jv-popover-fade-enter-active,
.jv-popover-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.jv-popover-fade-enter-from,
.jv-popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@include b(popover) {
  @include e(content) {
    // 颜色
    --jv-popover-bg: var(--jv-theme-background);
    --jv-popover-border-color: rgba(0, 0, 0, 0.1);

    // 数值
    --jv-popover-border-radius: var(--jv-rounded-sm);
    --jv-popover-box-shadow: var(--jv-shadow-md, var(--jv-elevation-4));
    --jv-popover-arrow-size: 12px;
    --jv-popover-arrow-offset: 20px; // 调整start/end位置时的偏移量
    position: fixed;
    top: 0;
    left: 0;
    z-index: v-bind(zindex);
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
    border-width: 0;
    border-radius: var(--jv-popover-border-radius);
    box-shadow: var(--jv-popover-box-shadow);
    background: var(--jv-popover-bg);
    outline: none;
  }

  @include e(arrow) {
    --jv-popover-arrow-ratio: var(--jv-popover-arrow-size, 12px);
    --jv-popover-arrow-rotate: 45deg;
    --jv-popover-arrow-translate-x: 0;
    --jv-popover-arrow-translate-y: 0;
    position: absolute;
    z-index: 1; // 确保箭头位于内容上层
    width: var(--jv-popover-arrow-ratio);
    height: var(--jv-popover-arrow-ratio);
    border: none;
    background-color: var(--jv-popover-bg); // 使用与popover相同的背景色
    transform: rotate(var(--jv-popover-arrow-rotate))
      translate(var(--jv-popover-arrow-translate-x), var(--jv-popover-arrow-translate-y));
    transition: all 0.2s ease-out; // 过渡动画
    pointer-events: none; // 确保箭头不阻止鼠标事件
    clip-path: polygon(100% 0, 0% 100%, 0 0); // 创建三角形切角效果

    // 箭头定位策略：
    // 1. 对于每个方向，箭头都精确指向triggerRect和popoverContent的交点
    // 2. 使用CSS变量 --x, --y, --width, --height 来获取triggerRect的位置信息
    // 3. 对于top/bottom方向，箭头水平对齐到触发元素的中心或边缘
    // 4. 对于left/right方向，箭头垂直对齐到触发元素的中心或边缘
    // 5. 使用max()函数确保箭头不会太靠近popover边缘

    // 顶部位置的箭头样式
    &[data-placement='top'] {
      bottom: calc(var(--jv-popover-arrow-size) / -2);
      left: calc(var(--width) / 2 + var(--x) - var(--jv-popover-arrow-ratio) / 2); // 对齐到触发元素的中间

      --jv-popover-arrow-rotate: -135deg;
      --jv-popover-arrow-translate-x: 0;
      --jv-popover-arrow-translate-y: 0;
    }

    &[data-placement='top-start'] {
      bottom: calc(var(--jv-popover-arrow-size) / -2);
      left: max(var(--jv-popover-arrow-offset), var(--x) + var(--jv-popover-arrow-ratio)); // 对齐到触发元素的开始位置

      --jv-popover-arrow-rotate: -135deg;
      --jv-popover-arrow-translate-x: 8px; // 添加水平偏移
      --jv-popover-arrow-translate-y: -8px; // 添加垂直偏移
    }

    &[data-placement='top-end'] {
      right: max(
        var(--jv-popover-arrow-offset),
        calc(100% - var(--x) - var(--width) + var(--jv-popover-arrow-ratio))
      ); // 对齐到触发元素的结束位置
      bottom: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: -135deg;
      --jv-popover-arrow-translate-x: -8px; // 添加水平偏移
      --jv-popover-arrow-translate-y: -8px; // 添加垂直偏移
    }

    // 底部位置的箭头样式
    &[data-placement='bottom'] {
      top: calc(var(--jv-popover-arrow-size) / -2);
      left: calc(var(--width) / 2 + var(--x) - var(--jv-popover-arrow-ratio) / 2); // 对齐到触发元素的中间

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: 0;
      --jv-popover-arrow-translate-y: 0;
    }

    &[data-placement='bottom-start'] {
      top: calc(var(--jv-popover-arrow-size) / -2);
      left: max(var(--jv-popover-arrow-offset), var(--x) + var(--jv-popover-arrow-ratio)); // 对齐到触发元素的开始位置

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: 8px; // 添加水平偏移
      --jv-popover-arrow-translate-y: 8px; // 添加垂直偏移
    }

    &[data-placement='bottom-end'] {
      top: calc(var(--jv-popover-arrow-size) / -2);
      right: max(
        var(--jv-popover-arrow-offset),
        calc(100% - var(--x) - var(--width) + var(--jv-popover-arrow-ratio))
      ); // 对齐到触发元素的结束位置

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: -8px; // 添加水平偏移
      --jv-popover-arrow-translate-y: 8px; // 添加垂直偏移
    }

    // 左侧位置的箭头样式
    &[data-placement='left'] {
      top: calc(var(--height) / 2 + var(--y) - var(--jv-popover-arrow-ratio) / 2); // 对齐到触发元素的中间
      right: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: 0;
      --jv-popover-arrow-translate-y: 0;
    }

    &[data-placement='left-start'] {
      top: max(var(--jv-popover-arrow-offset), var(--y) + var(--jv-popover-arrow-ratio)); // 对齐到触发元素的开始位置
      right: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: -12px; // 添加水平偏移，方向相反
      --jv-popover-arrow-translate-y: 8px; // 添加垂直偏移
    }

    &[data-placement='left-end'] {
      right: calc(var(--jv-popover-arrow-size) / -2);
      bottom: max(
        var(--jv-popover-arrow-offset),
        calc(100% - var(--y) - var(--height) + var(--jv-popover-arrow-ratio))
      ); // 对齐到触发元素的结束位置

      --jv-popover-arrow-rotate: 45deg;
      --jv-popover-arrow-translate-x: -12px; // 添加水平偏移
      --jv-popover-arrow-translate-y: -8px; // 添加垂直偏移
    }

    // 右侧位置的箭头样式
    &[data-placement='right'] {
      top: calc(var(--height) / 2 + var(--y) - var(--jv-popover-arrow-ratio) / 2); // 对齐到触发元素的中间
      left: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: -45deg;
      --jv-popover-arrow-translate-x: 0;
      --jv-popover-arrow-translate-y: 0;
    }

    &[data-placement='right-start'] {
      top: max(var(--jv-popover-arrow-offset), var(--y) + var(--jv-popover-arrow-ratio)); // 对齐到触发元素的开始位置
      left: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: -45deg;
      --jv-popover-arrow-translate-x: 12px; // 添加水平偏移
      --jv-popover-arrow-translate-y: 8px; // 添加垂直偏移
    }

    &[data-placement='right-end'] {
      bottom: max(
        var(--jv-popover-arrow-offset),
        calc(100% - var(--y) - var(--height) + var(--jv-popover-arrow-ratio))
      ); // 对齐到触发元素的结束位置
      left: calc(var(--jv-popover-arrow-size) / -2);

      --jv-popover-arrow-rotate: -45deg;
      --jv-popover-arrow-translate-x: 12px; // 添加水平偏移
      --jv-popover-arrow-translate-y: -8px; // 添加垂直偏移
    }
  }
}
</style>
