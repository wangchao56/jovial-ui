<script setup lang="ts">
import type { Placement, Instance as PopperInstance, Options as PopperOptions } from '@popperjs/core'
import type { CSSProperties } from 'vue'
import type {
  JvDropdownEmits,
  JvDropdownExpose,
  JvDropdownProps,
  JvDropdownSlots,
} from './types'
import { useZindex } from '@/hooks'
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
} from 'vue'
import { bem, JVDROPDOWN_NAME } from './types'

defineOptions({ name: JVDROPDOWN_NAME, inheritAttrs: false })

// 使用解构语法直接从defineProps获取props值
const props = withDefaults(defineProps<JvDropdownProps>(), {
  manual: false,
  placement: 'bottom-start',
  arrow: true,
  offset: 4,
  placementStrategy: 'auto',
  arrowSize: 8,
  trigger: 'click',
  hideDelay: 150,
  width: 'auto',
  disabled: false,
})

const emits = defineEmits<JvDropdownEmits>()

defineSlots<JvDropdownSlots>()

// 使用Vue的defineModel语法
const visible = defineModel<boolean>('show', { default: false })

// 计算实际放置位置
const actualPlacement = ref<string>(props.placement)

// 获取z-index
const { currentZIndex } = useZindex()

// 使用标准的ref API
const dropdownRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
// popper实例
const popperInstance = shallowRef<PopperInstance | null>(null)

// 计算最终偏移量
const finalOffset = computed(() => {
  if (Array.isArray(props.offset)) {
    return props.offset
  }
  return [0, props.offset]
})

// 计算下拉菜单样式
const dropdownStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    zIndex: currentZIndex.value,
  }

  if (props.width === 'trigger' && triggerRef.value) {
    style.width = `${triggerRef.value.offsetWidth}px`
  }
  else if (typeof props.width === 'number') {
    style.width = `${props.width}px`
  }

  return style
})

// 创建Popper实例
function createPopperInstance() {
  if (!dropdownRef.value || !triggerRef.value || props.disabled)
    return

  // 如果已存在实例，先销毁
  if (popperInstance.value) {
    popperInstance.value.destroy()
    popperInstance.value = null
  }

  // 创建Popper配置
  const options: Partial<PopperOptions> = {
    placement: props.placement as Placement,
    strategy: 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: finalOffset.value,
        },
      },
      {
        name: 'preventOverflow',
        enabled: props.placementStrategy === 'prevent-overflow' || props.placementStrategy === 'auto',
        options: {
          boundary: 'viewport',
          padding: 8,
        },
      },
      {
        name: 'flip',
        enabled: props.placementStrategy === 'flip' || props.placementStrategy === 'auto',
        options: {
          fallbackPlacements: ['top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end'],
        },
      },
      {
        name: 'arrow',
        enabled: props.arrow,
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
          }
        },
        requires: ['computeStyles'],
      },
    ],
  }

  // 创建popper实例
  popperInstance.value = createPopper(triggerRef.value, dropdownRef.value, options)
}

// 页面尺寸变化时更新位置
function updatePosition() {
  if (popperInstance.value) {
    popperInstance.value.update()
  }
}

// 延迟隐藏计时器
let hideTimer: number | null = null

// 显示下拉菜单
function show() {
  if (props.disabled)
    return

  // 如果有延迟隐藏的计时器，清除它
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  visible.value = true
  nextTick(() => {
    updatePosition()
    emits('shown')
  })
}

// 隐藏下拉菜单
function hide() {
  if (hideTimer) {
    clearTimeout(hideTimer)
  }

  hideTimer = window.setTimeout(() => {
    visible.value = false
    emits('hidden')
    hideTimer = null
  }, props.hideDelay) as unknown as number
}

// 切换下拉菜单显示状态
function toggle(force?: boolean) {
  if (typeof force === 'boolean') {
    force ? show() : hide()
  }
  else {
    visible.value ? hide() : show()
  }
}

// 处理点击外部事件
function handleOutsideClick(event: MouseEvent) {
  const target = event.target as Node
  if (visible.value
    && dropdownRef.value
    && triggerRef.value
    && !dropdownRef.value.contains(target)
    && !triggerRef.value.contains(target)) {
    hide()
  }
}

// 处理触发器点击事件
function handleTriggerClick(event: MouseEvent) {
  if (props.trigger === 'click' && !props.manual) {
    toggle()
    event.stopPropagation()
  }
}

// 处理触发器鼠标进入事件
function handleTriggerMouseEnter() {
  if (props.trigger === 'hover' && !props.manual) {
    show()
  }
}

// 处理触发器鼠标离开事件
function handleTriggerMouseLeave() {
  if (props.trigger === 'hover' && !props.manual) {
    hide()
  }
}

// 处理下拉菜单鼠标进入事件
function handleDropdownMouseEnter() {
  if (props.trigger === 'hover' && hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

// 处理下拉菜单鼠标离开事件
function handleDropdownMouseLeave() {
  if (props.trigger === 'hover' && !props.manual) {
    hide()
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 确保DOM已渲染后创建popper
  nextTick(() => {
    if (triggerRef.value && dropdownRef.value) {
      createPopperInstance()
      // 初次创建后立即更新位置
      if (visible.value) {
        updatePosition()
      }
    }
  })

  // 监听窗口大小变化
  window.addEventListener('resize', updatePosition)
  // 监听点击外部事件
  document.addEventListener('click', handleOutsideClick)
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

// 监控禁用状态变化
watch(() => props.disabled, (newVal) => {
  if (newVal && visible.value) {
    hide()
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
  document.removeEventListener('click', handleOutsideClick)

  // 清除计时器
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
})

// 生成唯一ID
const dropdownID = `${JVDROPDOWN_NAME}-${useId()}`

// 获取外部传入的属性
const attrs = useAttrs()
// 获取外部传入的class
const wrapperClass = attrs.class ? normalizeClass([attrs.class]) : ''
// dropdown内容的class
const dropdownClass = normalizeClass([
  bem.e('content'),
  'elevation-6',
  bem.is('has-arrow', props.arrow),
  bem.is('disabled', props.disabled),
])

// 处理过渡动画事件
function onEnter() {
  // 进入动画开始后立即更新位置
  nextTick(updatePosition)
}

defineExpose<JvDropdownExpose>({
  show,
  hide,
  toggle,
})
</script>

<template>
  <div :class="bem.b()">
    <!-- 触发器 -->
    <div
      ref="triggerRef"
      :class="bem.e('trigger')"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
    >
      <slot name="trigger" />
    </div>

    <!-- 下拉菜单内容 -->
    <Teleport to="body">
      <Transition name="jv-dropdown-fade" appear @enter="onEnter">
        <div
          v-if="visible"
          :id="dropdownID"
          ref="dropdownRef"
          :class="[dropdownClass, wrapperClass]"
          :data-placement="actualPlacement"
          :style="[dropdownStyle, dropdownCssVars]"
          @mouseenter="handleDropdownMouseEnter"
          @mouseleave="handleDropdownMouseLeave"
        >
          <div :class="bem.e('menu')">
            <slot>
              <slot name="empty">
                <div :class="bem.e('empty')">
                  无选项
                </div>
              </slot>
            </slot>
          </div>
          <div
            v-if="arrow"
            ref="arrowRef"
            :class="bem.e('arrow')"
            :data-placement="actualPlacement"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use 'sass:map';

.jv-dropdown-fade-enter-active,
.jv-dropdown-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.jv-dropdown-fade-enter-from,
.jv-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@include b(dropdown) {
  position: relative;
  display: inline-block;

  @include e(trigger) {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  @include e(content) {
    position: absolute; // popper.js会处理定位
    z-index: var(--jv-dropdown-z-index);
    width: var(--jv-dropdown-width);
    min-width: 100px;
    margin: 0;
    padding: 8px 0;
    border-width: 0;
    border-radius: var(--jv-dropdown-border-radius);
    box-shadow: var(--jv-dropdown-box-shadow);
    background: var(--jv-dropdown-bg);
    outline: none;

    @include when(disabled) {
      opacity: 0.6;
      pointer-events: none;
    }
  }

  @include e(menu) {
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgb(0 0 0 / 0.2);
    }
  }

  @include e(empty) {
    padding: 8px 16px;
    color: var(--jv-color-text-secondary);
    font-size: 14px;
    text-align: center;
  }

  @include e(arrow) {
    --jv-dropdown-arrow-ratio: var(--jv-dropdown-arrow-size, 8px);
    position: absolute;
    z-index: 1; // 确保箭头位于内容上层
    width: var(--jv-dropdown-arrow-ratio);
    height: var(--jv-dropdown-arrow-ratio);
    border: none;
    background-color: var(--jv-dropdown-bg); // 使用与dropdown相同的背景色
    transform: rotate(45deg);
    pointer-events: none; // 确保箭头不阻止鼠标事件
  }

  &[data-popper-placement^='top'] .jv-dropdown__arrow {
    bottom: calc(var(--jv-dropdown-arrow-size) / -2);
  }

  &[data-popper-placement^='bottom'] .jv-dropdown__arrow {
    top: calc(var(--jv-dropdown-arrow-size) / -2);
  }

  &[data-popper-placement^='left'] .jv-dropdown__arrow {
    right: calc(var(--jv-dropdown-arrow-size) / -2);
  }

  &[data-popper-placement^='right'] .jv-dropdown__arrow {
    left: calc(var(--jv-dropdown-arrow-size) / -2);
  }
}
</style>
