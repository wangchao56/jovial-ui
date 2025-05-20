<script setup lang="ts">
import type { CollapseGroupContext, JvCollapseEmits, JvCollapseProps } from './types'
import { computed, inject, nextTick, onMounted, ref, shallowRef, useCssVars, watch } from 'vue'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useComponentId } from '@/hooks/useComponentId'
import { bem, collapseGroupInjectionKey, JVCOLLAPSE_NAME } from './types'

defineOptions({ name: JVCOLLAPSE_NAME, inheritAttrs: false })

const {
  disabled = false,
  showArrow = true,
  duration = 300,
  title = '',
  icon = '',
  lazy = false,
  class: customClass = '',
  variant = 'elevated',
  size: propSize,
  style: _style = {},
  width,
  maxWidth,
  collapseIcon = '$chevronDown',
  expandIcon = '$chevronUp',
} = defineProps<JvCollapseProps>()

const emit = defineEmits<JvCollapseEmits>()
const collapseId = useComponentId('jv-collapse')

// 内部展开状态
const isExpanded = defineModel<boolean>('modelValue', { required: false, default: false })
// 内容区域DOM引用
const contentRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)

// 内容区域高度
const contentHeight = ref(0)
// 动画状态
const isAnimating = ref(false)
// 内容是否可见 (用于处理opacity动画)
const isContentVisible = ref(isExpanded.value)

// 是否已加载内容（用于懒加载）
const hasRenderedContent = ref(!lazy || isExpanded.value)

// 搭配JvCollapseGroup使用 - 添加默认值以防未在group中使用
const {
  accordion = false,
  expandedItems = shallowRef([]),
  handleItemToggle = () => {},
  size: parentSize,
  variant: parentVariant,
} = inject(collapseGroupInjectionKey, {
  accordion: false,
  expandedItems: shallowRef([]),
  handleItemToggle: () => {},
  size: undefined,
  variant: undefined,
}) as CollapseGroupContext

// 计算最终使用的尺寸 - 优先使用自身的尺寸，然后是父组件的尺寸，最后默认medium
const size = computed(() => propSize || parentSize || 'medium')

// 计算最终使用的变体样式 - 优先使用自身的变体，然后是父组件的变体，最后默认elevated
const finalVariant = computed(() => variant || parentVariant || 'elevated')

// 计算组件类名 - 使用shallowRef减少深层响应式转换
const collapseClasses = computed(() => [
  bem.b(),
  bem.m(`variant-${finalVariant.value}`),
  bem.m(`size-${size.value}`),
  isExpanded.value && bem.m('state-expanded'),
  isAnimating.value && bem.m('state-animating'),
  disabled && bem.m('state-disabled'),
  customClass,
])

// 只在accordion模式下监听expandedItems变化
if (accordion) {
  watch(() => expandedItems.value, (newVal) => {
    isExpanded.value = newVal.includes(collapseId)
  })
}

// 切换折叠状态 - 优化逻辑流程
function toggleCollapse() {
  if (disabled || isAnimating.value)
    return

  const newState = !isExpanded.value
  isExpanded.value = newState
  isAnimating.value = true

  // 展开时立即设置内容可见
  if (newState) {
    isContentVisible.value = true
  }

  handleItemToggle(collapseId, newState)
  emit('update:modelValue', newState)

  // 发送对应事件
  if (newState) {
    emit('expand')
  }
  else {
    emit('collapse')
    // 收起时延迟隐藏内容，等待动画完成
    setTimeout(() => {
      if (!isExpanded.value) {
        isContentVisible.value = false
      }
    }, duration)
  }

  // 懒加载：首次展开时才渲染内容
  if (newState && lazy && !hasRenderedContent.value) {
    hasRenderedContent.value = true
    nextTick(updateContentHeight)
  }

  // 动画结束后重置状态
  setTimeout(() => {
    isAnimating.value = false
  }, duration)
}

// 更新内容区域高度 - 简化逻辑
function updateContentHeight() {
  if (!contentRef.value || !innerRef.value)
    return

  // 获取内容实际高度
  contentHeight.value = isExpanded.value ? innerRef.value.scrollHeight : 0
}

// 监听展开状态变化，优化监听器
watch(isExpanded, (newVal) => {
  updateContentHeight()
  if (newVal) {
    isContentVisible.value = true
  }
}, { flush: 'post' })

// 组件挂载时初始化高度
onMounted(() => {
  if (isExpanded.value) {
    updateContentHeight()
    isContentVisible.value = true
  }
})

// 计算当前显示的图标
const currentIcon = computed(() => isExpanded.value ? expandIcon : collapseIcon)

// 处理键盘事件，提高可访问性
function handleKeyDown(event: KeyboardEvent) {
  if (disabled)
    return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleCollapse()
  }
}

// 获取不同尺寸的头部高度
function getHeaderHeight() {
  const sizeMap = {
    small: '36px',
    medium: '48px',
    large: '52px',
  }
  return sizeMap[size.value] || '48px'
}

// 获取不同尺寸的内边距
function getHeaderPadding() {
  const sizeMap = {
    small: '6px 12px',
    medium: '8px 16px',
    large: '12px 20px',
  }
  return sizeMap[size.value] || '8px 16px'
}

// 获取不同尺寸的字体大小
function getFontSize() {
  const sizeMap = {
    small: '0.875rem', // 14px
    medium: '1rem', // 16px
    large: '1.125rem', // 18px
  }
  return sizeMap[size.value] || '1rem'
}

// 获取不同尺寸的图标大小
function getIconSize() {
  return size.value
}

const customStyle = computed(() => ({
  width,
  maxWidth,
  ..._style,
}))

// 使用CSS变量控制内容区域样式
useCssVars(() => ({
  'jv-collapse-content-height': isExpanded.value ? `${contentHeight.value}px` : '0px',
  'jv-collapse-transition-duration': `${duration}ms`,
  'jv-collapse-content-visibility': isContentVisible.value ? 'visible' : 'hidden',
  'jv-collapse-content-opacity': isContentVisible.value ? '1' : '0',
  'jv-collapse-content-transform': isExpanded.value ? 'translateY(0)' : 'translateY(-10px)',
  'jv-collapse-header-height': getHeaderHeight(),
  'jv-collapse-header-padding': getHeaderPadding(),
  'jv-collapse-font-size': getFontSize(),
}))
</script>

<template>
  <div :id="collapseId" :class="collapseClasses" :data-expanded="isExpanded" :data-disabled="disabled" :style="customStyle">
    <!-- 折叠区域标题 -->
    <div
      :class="bem.e('header')" role="button" :aria-expanded="isExpanded" :aria-disabled="disabled" tabindex="0"
      @click="toggleCollapse" @keydown="handleKeyDown"
    >
      <slot name="header" :expanded="isExpanded" :disabled="disabled">
        <!-- 图标 -->
        <div v-if="icon || $slots.icon" :class="bem.e('header__prepend')">
          <slot name="prepend">
            <JvIcon v-if="icon" :name="icon" :size="getIconSize()" />
          </slot>
        </div>
        <!-- 标题 -->
        <div :class="bem.e('header__title')">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <!-- 箭头 -->
        <div v-if="showArrow" :class="bem.e('header__append')">
          <slot name="append">
            <JvButton :icon="currentIcon" variant="text" :size="getIconSize()" />
          </slot>
        </div>
      </slot>
    </div>
    <!-- 折叠内容区域 -->
    <div ref="contentRef" :class="bem.e('content')" role="region" :aria-hidden="!isExpanded">
      <div ref="innerRef" :class="bem.e('inner')">
        <!-- 懒加载：只有首次展开后才渲染内容 -->
        <template v-if="hasRenderedContent">
          <slot />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(collapse) {
  --jv-collapse-header-bg: var(--jv-theme-surface);
  --jv-collapse-header-hover-bg: var(--jv-theme-surface);
  --jv-collapse-content-bg: var(--jv-theme-background);
  --jv-collapse-content-height: 0px;
  --jv-collapse-transition-duration: 300ms;
  --jv-collapse-content-visibility: hidden;
  --jv-collapse-content-opacity: 0;
  --jv-collapse-content-transform: translateY(-10px);
  --jv-collapse-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --jv-collapse-header-height: 48px;
  --jv-collapse-header-padding: 8px 16px;
  --jv-collapse-font-size: 1rem;
  --jv-collapse-inner-padding: 16px;
  --jv-collapse-border-color: var(--jv-theme-border, rgb(0 0 0 / 0.12));
  --jv-collapse-border-radius: var(--jv-rounded, 4px);
  --jv-collapse-box-shadow: var(--jv-elevation-1);

  overflow: hidden;
  box-sizing: border-box;
  width: max-content;
  height: auto;
  border-radius: var(--jv-collapse-border-radius);
  box-shadow: var(--jv-collapse-box-shadow);
  font-size: var(--jv-collapse-font-size);

  @include e(header) {
    display: inline-grid;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-height: var(--jv-collapse-header-height);
    padding: var(--jv-collapse-header-padding);
    column-gap: 16px;
    background-color: var(--jv-collapse-header-bg, rgb(0 0 0 / 0.02));
    cursor: pointer;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'prepend title append';
    user-select: none;
    transition: box-shadow 0.3s var(--jv-collapse-easing);

    &:hover {
      background-color: var(--jv-collapse-header-hover-bg, rgb(0 0 0 / 0.04));
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid var(--jv-theme-primary, #1976d2);
      outline-offset: -2px;
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    }
  }

  @include e(header__prepend) {
    grid-area: prepend;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include e(header__title) {
    grid-area: title;
    font-size: var(--jv-collapse-font-size);
  }

  @include e(header__append) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    grid-area: append;
    transition: transform var(--jv-collapse-transition-duration) var(--jv-collapse-easing);

    .jv-button {
      transition: transform var(--jv-collapse-transition-duration) var(--jv-collapse-easing);
    }
  }

  @include e(content) {
    overflow: hidden;
    width: 100%;
    height: var(--jv-collapse-content-height);
    background-color: var(--jv-collapse-content-bg, white);
    transition: height var(--jv-collapse-transition-duration) var(--jv-collapse-easing);
    will-change: height;
  }

  @include e(inner) {
    visibility: var(--jv-collapse-content-visibility);
    padding: var(--jv-collapse-inner-padding);
    opacity: var(--jv-collapse-content-opacity);
    transform: var(--jv-collapse-content-transform);
    transition:
      opacity var(--jv-collapse-transition-duration) var(--jv-collapse-easing),
      transform var(--jv-collapse-transition-duration) var(--jv-collapse-easing);
    will-change: transform, opacity;
  }

  // 尺寸变体
  @include m(size-small) {
    --jv-collapse-header-height: 36px;
    --jv-collapse-header-padding: 6px 12px;
    --jv-collapse-font-size: 0.875rem;
    --jv-collapse-inner-padding: 12px;
  }

  @include m(size-medium) {
    --jv-collapse-header-height: 48px;
    --jv-collapse-header-padding: 8px 16px;
    --jv-collapse-font-size: 1rem;
    --jv-collapse-inner-padding: 16px;
  }

  @include m(size-large) {
    --jv-collapse-header-height: 52px;
    --jv-collapse-header-padding: 12px 20px;
    --jv-collapse-font-size: 1.125rem;
    --jv-collapse-inner-padding: 20px;
  }

  @include m(variant-elevated) {
    --jv-collapse-header-bg: var(--jv-theme-surface);
    --jv-collapse-header-hover-bg: var(--jv-theme-surface-hover, rgb(0 0 0 / 0.04));
    --jv-collapse-content-bg: var(--jv-theme-background);
    --jv-collapse-box-shadow: var(--jv-elevation-2);
    border: none;
  }

  @include m(variant-flat) {
    --jv-collapse-header-bg: transparent;
    --jv-collapse-header-hover-bg: rgb(0 0 0 / 0.03);
    --jv-collapse-content-bg: transparent;
    border: none;
    box-shadow: none;
  }

  @include m(variant-outlined) {
    --jv-collapse-header-bg: transparent;
    --jv-collapse-header-hover-bg: rgb(0 0 0 / 0.03);
    --jv-collapse-content-bg: var(--jv-theme-background);
    border: 1px solid var(--jv-collapse-border-color);
    box-shadow: none;
  }

  //  状态
  @include m(state-expanded) {
    .jv-collapse__content {
      //   overflow-y: auto;
      transition:
        height var(--jv-collapse-transition-duration) var(--jv-collapse-easing),
        overflow-y 0.1s var(--jv-collapse-easing) var(--jv-collapse-transition-duration);
    }

    // 箭头旋转
    .jv-collapse__header__append .jv-button {
      transform: rotate(0deg);
    }

    // 阴影 - 只在elevated变体中应用
    &.jv-collapse--variant-elevated .jv-collapse__header {
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -1px rgb(0 0 0 / 0.06);
    }
  }

  @include m(state-animating) {
    .jv-collapse__content {
      pointer-events: none;
    }
  }

  @include m(state-disabled) {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  // 未展开时箭头向下
  .jv-collapse__header__append .jv-button {
    transform: rotate(180deg);
  }
}
</style>
