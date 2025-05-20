<script setup lang="ts">
import type { Placement, Instance as PopperInstance, Options as PopperOptions } from '@popperjs/core'
import type {
  JvPopoverEmits,
  JvPopoverExpose,
  JvPopoverProps,
  JvPopoverSlots,
} from './types'
import { createPopper } from '@popperjs/core'
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
  watchEffect,
} from 'vue'
import { useZindex } from '@/hooks'
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
  offsetTarget = 'trigger',
} = defineProps<JvPopoverProps>()

const emits = defineEmits<JvPopoverEmits>()

defineSlots<JvPopoverSlots>()

// 使用Vue 3.5的defineModel语法
const visible = defineModel<boolean>('show', { default: true })

// 计算实际放置位置
const actualPlacement = ref<string>(placement)

// 使用标准的ref API
const popoverRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const virtualReference = ref<any>(null)
// popper实例
const popperInstance = shallowRef<PopperInstance | null>(null)

// 创建虚拟引用元素
function createVirtualReference() {
  if (!referenceRect)
    return null

  return {
    getBoundingClientRect: () => ({
      width: referenceRect.width,
      height: referenceRect.height,
      top: referenceRect.top,
      left: referenceRect.left,
      right: referenceRect.right,
      bottom: referenceRect.bottom,
      x: referenceRect.left,
      y: referenceRect.top,
    }),
    contextElement: document.documentElement,
  }
}

// 处理偏移量，支持单一数值或x/y分别指定
const finalOffset = computed<[number, number]>(() => {
  if (Array.isArray(offset)) {
    return [offset[0], offset[1]]
  }
  return [0, offset]
})

const { currentZIndex, nextZindex } = useZindex()
onMounted(() => {
  nextZindex()
})

const zindex = computed(() => currentZIndex.value)

// 创建或更新Popper实例
function createPopperInstance() {
  if (!popoverRef.value)
    return

  // 如果已存在实例，先销毁
  if (popperInstance.value) {
    popperInstance.value.destroy()
  }

  // 获取引用元素（真实元素或虚拟元素）
  const reference = virtualReference.value || document.createElement('div')

  // 创建Popper配置
  const options: Partial<PopperOptions> = {
    placement: placement as Placement,
    strategy: offsetTarget === 'viewport' ? 'fixed' : 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: finalOffset.value,
        },
      },
      {
        name: 'preventOverflow',
        enabled: placementStrategy === 'prevent-overflow' || placementStrategy === 'auto',
        options: {
          boundary: 'viewport',
          padding: 8,
        },
      },
      {
        name: 'flip',
        enabled: placementStrategy === 'flip' || placementStrategy === 'auto',
        options: {
          fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        },
      },
      {
        name: 'arrow',
        enabled: arrow,
        options: {
          element: arrowRef.value,
          padding: 5,
        },
      },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: true,
          adaptive: true,
        },
      },
      {
        name: 'updateState',
        enabled: true,
        phase: 'write',
        fn: ({ state }) => {
          // 更新实际放置位置
          const newPlacement = state.placement
          if (actualPlacement.value !== newPlacement) {
            actualPlacement.value = newPlacement
            emits('update:actualPlacement', newPlacement)
          }
        },
        requires: ['computeStyles'],
      },
    ],
  }

  // 创建popper实例
  popperInstance.value = createPopper(reference, popoverRef.value, options)
}

// 页面尺寸变化时更新位置
function updatePosition() {
  if (popperInstance.value) {
    popperInstance.value.update()
  }
}

// 组件挂载时初始化
onMounted(() => {
  if (referenceRect) {
    virtualReference.value = createVirtualReference()
  }

  // 确保DOM已渲染后创建popper
  nextTick(() => {
    createPopperInstance()
    // 初次创建后立即更新位置
    if (visible.value) {
      updatePosition()
    }
  })

  // 监听窗口大小变化
  window.addEventListener('resize', updatePosition)
})

// 监控visible状态变化
watch(visible, (newVal) => {
  if (newVal) {
    // 确保DOM已更新
    nextTick(() => {
      // 更新或创建popper实例
      if (!popperInstance.value) {
        createPopperInstance()
      }
      updatePosition()
    })
  }
})

// 监控referenceRect变化
watch(() => referenceRect, () => {
  if (referenceRect) {
    virtualReference.value = createVirtualReference()
    nextTick(() => {
      if (visible.value) {
        createPopperInstance()
        updatePosition()
      }
    })
  }
}, { deep: true })

// 监控放置策略或偏移量变化
watchEffect(() => {
  // 如果关键配置有变更且实例存在，重新创建实例
  if (popperInstance.value && visible.value) {
    nextTick(() => {
      createPopperInstance()
      updatePosition()
    })
  }
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 销毁popper实例
  if (popperInstance.value) {
    popperInstance.value.destroy()
    popperInstance.value = null
  }

  // 移除事件监听
  window.removeEventListener('resize', updatePosition)
})

function show() {
  manual && (visible.value = true)
  nextTick(() => updatePosition())
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
function onEnter() {
  // 进入动画开始后立即更新位置
  nextTick(updatePosition)
}

function onLeave() {
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
      >
        <slot name="default" />
        <div
          v-if="arrow"
          ref="arrowRef"
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
    position: absolute; // popper.js会处理定位
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
    position: absolute;
    z-index: 1; // 确保箭头位于内容上层
    width: var(--jv-popover-arrow-ratio);
    height: var(--jv-popover-arrow-ratio);
    border: none;
    background-color: var(--jv-popover-bg); // 使用与popover相同的背景色
    transform: rotate(45deg);
    pointer-events: none; // 确保箭头不阻止鼠标事件
  }

  &[data-popper-placement^='top'] .jv-popover__arrow {
    bottom: calc(var(--jv-popover-arrow-size) / -2);
  }

  &[data-popper-placement^='bottom'] .jv-popover__arrow {
    top: calc(var(--jv-popover-arrow-size) / -2);
  }

  &[data-popper-placement^='left'] .jv-popover__arrow {
    right: calc(var(--jv-popover-arrow-size) / -2);
  }

  &[data-popper-placement^='right'] .jv-popover__arrow {
    left: calc(var(--jv-popover-arrow-size) / -2);
  }
}
</style>
