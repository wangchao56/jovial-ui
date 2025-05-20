<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type {
  JvDropdownEmits,
  JvDropdownExpose,
  JvDropdownProps,
  JvDropdownSlots,
} from './types'
import {
  computed,
  nextTick,
  normalizeClass,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useAttrs,
  useId,
  watch,
} from 'vue'
import { useZindex } from '@/hooks'
import { usePositioning } from '@/hooks/usePositioning'
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

// 获取z-index
const { currentZIndex } = useZindex()

// 使用标准的ref API
const dropdownRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// 使用定位Hook
const {
  actualPlacement,
  updateElementPosition,
  useEventListeners,
} = usePositioning()

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
    position: 'absolute',
  }

  if (props.width === 'trigger' && triggerRef.value) {
    style.minWidth = `${triggerRef.value.offsetWidth}px`
  }
  else if (typeof props.width === 'number') {
    style.minWidth = `${props.width}px`
  }

  return style
})

// 根据放置位置计算箭头样式
const arrowStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (!props.arrow)
    return style

  const placement = actualPlacement.value || props.placement
  const arrowSize = props.arrowSize / 2

  if (placement.startsWith('top')) {
    style.bottom = `-${arrowSize}px`
    style.boxShadow = '2px 2px 5px rgb(0 0 0 / 0.06)'
  }
  else if (placement.startsWith('bottom')) {
    style.top = `-${arrowSize}px`
    style.boxShadow = '-2px -2px 5px rgb(0 0 0 / 0.06)'
  }
  else if (placement.startsWith('left')) {
    style.right = `-${arrowSize}px`
    style.boxShadow = '2px -2px 5px rgb(0 0 0 / 0.06)'
  }
  else if (placement.startsWith('right')) {
    style.left = `-${arrowSize}px`
    style.boxShadow = '-2px 2px 5px rgb(0 0 0 / 0.06)'
  }

  if (placement.endsWith('start')) {
    style.left = '16px'
  }
  else if (placement.endsWith('end')) {
    style.right = '16px'
  }
  else {
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      style.left = '50%'
      style.transform = 'translateX(-50%) rotate(45deg)'
    }
    else {
      style.top = '50%'
      style.transform = 'translateY(-50%) rotate(45deg)'
    }
  }

  return style
})

// 更新下拉菜单位置
function updatePosition() {
  if (!dropdownRef.value || !triggerRef.value)
    return

  updateElementPosition(
    dropdownRef.value,
    triggerRef.value,
    {
      placement: props.placement,
      offset: finalOffset.value,
      placementStrategy: props.placementStrategy,
    },
  )
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

// 处理选择事件
function onItemClick(value: any) {
  emits('select', value)
  hide()
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

// 设置事件监听
useEventListeners(updatePosition)

// 额外添加点击外部事件监听
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

// 监控visible状态变化
watch(visible, (newVal) => {
  if (newVal) {
    // 确保DOM已更新
    nextTick(updatePosition)
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
  // 移除点击外部事件监听
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

// 提供关闭方法给子组件
provide('jv-dropdown-close', hide)
// 提供选项点击方法给子组件
provide('jv-dropdown-select', onItemClick)

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
          :style="dropdownStyle"
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
            :style="arrowStyle"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use 'sass:map';

// 过渡动画
.jv-dropdown-fade-enter-active,
.jv-dropdown-fade-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.jv-dropdown-fade-enter-from,
.jv-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

@include b(dropdown) {
  position: relative;
  display: inline-block;

  @include e(trigger) {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  @include e(content) {
    position: absolute;
    z-index: var(--jv-dropdown-z-index);
    overflow: hidden;
    box-sizing: border-box;
    width: var(--jv-dropdown-width, auto);
    min-width: var(--jv-dropdown-min-width, 120px);
    margin: 0;
    padding: 6px 0;
    border-width: 0;
    border-radius: var(--jv-dropdown-border-radius, 6px);
    box-shadow: var(--jv-dropdown-box-shadow, 0 2px 12px 0 rgb(0 0 0 / 0.12));
    background: var(--jv-dropdown-bg, var(--jv-color-bg-popup, #fff));
    color: var(--jv-dropdown-text-color, var(--jv-color-text-primary, #333));
    outline: none;

    @include when(disabled) {
      opacity: 0.6;
      pointer-events: none;
    }

    // 优化基于放置位置的样式
    &[data-placement^='top'] {
      transform-origin: bottom center;
    }

    &[data-placement^='bottom'] {
      transform-origin: top center;
    }

    &[data-placement^='left'] {
      transform-origin: right center;
    }

    &[data-placement^='right'] {
      transform-origin: left center;
    }
  }

  @include e(menu) {
    max-height: var(--jv-dropdown-max-height, 300px);
    overflow-y: auto;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch; // 改善iOS滚动体验

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: var(--jv-scrollbar-color, rgb(0 0 0 / 0.2));
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  @include e(empty) {
    padding: 10px 16px;
    color: var(--jv-color-text-secondary, #909399);
    font-size: 14px;
    text-align: center;
  }

  @include e(arrow) {
    position: absolute;
    z-index: 1; // 确保箭头位于内容上层
    width: var(--jv-dropdown-arrow-size, 8px);
    height: var(--jv-dropdown-arrow-size, 8px);
    border: none;
    background-color: var(--jv-dropdown-bg, var(--jv-color-bg-popup, #fff));
    transform: rotate(45deg);
    pointer-events: none; // 确保箭头不阻止鼠标事件
  }

  // 添加下拉项的默认样式
  .jv-dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: var(--jv-dropdown-item-color, var(--jv-color-text-primary, #333));
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s;

    &:hover {
      background-color: var(--jv-dropdown-item-hover-bg, var(--jv-color-primary-light-9, #f2f8fe));
      color: var(--jv-dropdown-item-hover-color, var(--jv-color-primary, #409eff));
    }

    &.is-disabled {
      color: var(--jv-color-text-disabled, #c0c4cc);
      cursor: not-allowed;
      pointer-events: none;
    }

    &.is-active {
      background-color: var(--jv-dropdown-item-active-bg, var(--jv-color-primary-light-9, #f2f8fe));
      color: var(--jv-color-primary, #409eff);
      font-weight: 500;
    }
  }

  // 添加下拉菜单分组样式
  .jv-dropdown-group {
    &__title {
      padding: 6px 16px;
      color: var(--jv-color-text-secondary, #909399);
      font-size: 12px;
      font-weight: 500;
    }

    &__divider {
      height: 1px;
      margin: 4px 0;
      background-color: var(--jv-color-border, #e4e7ed);
    }
  }
}
</style>
