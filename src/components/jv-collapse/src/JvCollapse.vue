<script setup lang="ts">
import type { CollapseGroupContext, JvCollapseEmits, JvCollapseProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useComponentId } from '@/hooks/useComponentId'
import { computed, inject, nextTick, onMounted, ref, shallowRef, useCssVars, watch } from 'vue'
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
  variant = 'default',
} = defineProps<JvCollapseProps>()

const emit = defineEmits<JvCollapseEmits>()
const collapseId = useComponentId('jv-collapse')

// 内部展开状态
const isExpanded = defineModel<boolean>('modelValue', { required: false, default: false })
// 内容区域DOM引用
const contentRef = ref<HTMLElement | null>(null)

// 内容区域高度
const contentHeight = ref(0)

// 是否已加载内容（用于懒加载）
const hasRenderedContent = ref(!lazy || isExpanded.value)

// 计算组件类名 - 使用shallowRef减少深层响应式转换
const collapseClasses = computed(() => [
  bem.b(),
  bem.m(`variant-${variant}`),
  isExpanded.value && bem.m('state-expanded'),
  disabled && bem.m('state-disabled'),
  customClass,
])

// 搭配JvCollapseGroup使用 - 添加默认值以防未在group中使用
const {
  accordion = false,
  expandedItems = shallowRef([]),
  handleItemToggle = () => {},
} = inject(collapseGroupInjectionKey, {
  accordion: false,
  expandedItems: shallowRef([]),
  handleItemToggle: () => {},
}) as CollapseGroupContext

// 只在accordion模式下监听expandedItems变化
if (accordion) {
  watch(() => expandedItems.value, (newVal) => {
    isExpanded.value = newVal.includes(collapseId)
  })
}

// 切换折叠状态 - 优化逻辑流程
function toggleCollapse() {
  if (disabled)
    return

  const newState = !isExpanded.value
  isExpanded.value = newState
  handleItemToggle(collapseId, newState)
  emit('update:modelValue', newState)

  // 发送对应事件
  if (newState) {
    emit('expand')
  }
  else {
    emit('collapse')
  }

  // 懒加载：首次展开时才渲染内容
  if (newState && lazy && !hasRenderedContent.value) {
    hasRenderedContent.value = true
    nextTick(updateContentHeight)
  }
}

// 更新内容区域高度 - 简化逻辑
function updateContentHeight() {
  if (!contentRef.value)
    return
  contentHeight.value = isExpanded.value ? contentRef.value.scrollHeight : 0
}

// 监听展开状态变化，优化监听器
watch(isExpanded, updateContentHeight, { flush: 'post' })

// 计算展开/折叠图标 - 使用shallowRef
const expandIcon = computed(() => isExpanded.value ? '$chevronUp' : '$chevronDown')

// 组件挂载时初始化高度
onMounted(() => {
  if (isExpanded.value) {
    updateContentHeight()
  }
})

// 处理键盘事件，提高可访问性
function handleKeyDown(event: KeyboardEvent) {
  if (disabled)
    return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleCollapse()
  }
}

// 使用CSS变量控制内容区域样式
useCssVars(() => ({
  'jv-collapse-content-height': isExpanded.value ? `${contentHeight.value}px` : '0px',
  'jv-collapse-transition-duration': `${duration}ms`,
}))
</script>

<template>
  <div :id="collapseId" :class="collapseClasses" :data-expanded="isExpanded" :data-disabled="disabled">
    <!-- 折叠区域标题 -->
    <div
      :class="bem.e('header')" role="button" :aria-expanded="isExpanded" :aria-disabled="disabled" tabindex="0"
      @click="toggleCollapse" @keydown="handleKeyDown"
    >
      <slot name="header" :expanded="isExpanded" :disabled="disabled">
        <!-- 图标 -->
        <div v-if="icon || $slots.icon" :class="bem.e('header__prepend')">
          <slot name="prepend">
            <JvIcon v-if="icon" :name="icon" />
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
            <JvButton :icon="expandIcon" variant="text" />
          </slot>
        </div>
      </slot>
    </div>
    <!-- 折叠内容区域 -->
    <div ref="contentRef" :class="bem.e('content')" role="region" :aria-hidden="!isExpanded">
      <div :class="bem.e('inner')">
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

  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-width: 400px;
  border-radius: var(--jv-rounded, 4px);
  box-shadow: var(--jv-elevation-1);

  @include e(header) {
    display: inline-grid;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    min-width: 100%;
    min-height: 48px;
    padding: 8px 16px;
    column-gap: 16px;
    background-color: var(--jv-collapse-header-bg, rgb(0 0 0 / 0.02));
    cursor: pointer;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'prepend title append';
    user-select: none;
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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
  }

  @include e(header__append) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    grid-area: append;
  }

  @include e(content) {
    overflow: hidden;
    width: 100%;
    height: var(--jv-collapse-content-height);
    background-color: var(--jv-collapse-content-bg, white);
    transition: height var(--jv-collapse-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
    will-change: height;
  }

  @include e(inner) {
    padding: 16px;
  }

  //   变体
  @include m(variant-default) {
    --jv-collapse-header-bg: var(--jv-theme-surface);
    --jv-collapse-header-hover-bg: var(--jv-theme-surface-hover, rgb(0 0 0 / 0.04));
    --jv-collapse-content-bg: var(--jv-theme-background);
  }

  @include m(variant-outlined) {
    border: 1px solid currentcolor;
  }

  //  状态
  @include m(state-expanded) {
    .jv-collapse__content {
      overflow-y: auto;
      transition: overflow-y 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    // 阴影
    .jv-collapse__header {
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -1px rgb(0 0 0 / 0.06);
    }
  }

  @include m(state-disabled) {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
