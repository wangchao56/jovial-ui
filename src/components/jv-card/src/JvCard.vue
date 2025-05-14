<script setup lang="ts">
import type { JvCardEmits, JvCardHeaderProps, JvCardProps, JvCardSlots } from './types'
import { useComponentId } from '@/hooks/useComponentId'
import { convertToUnit } from '@/utils'
import { computed, h, provide, shallowRef } from 'vue'
import JvCardActions from './JvCardActions.vue'
import JvCardContent from './JvCardContent.vue'
import JvCardHeader from './JvCardHeader.vue'
import JvCardMedia from './JvCardMedia.vue'
import {
  bem,
  JVCARD_NAME,
  JVCARDACTIONS_NAME,
  JVCARDCONTENT_NAME,
  JvCardContextKey,
  JVCARDHEADER_NAME,
  JVCARDMEDIA_NAME,
} from './types'

defineOptions({ name: JVCARD_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardProps>(), {
  tag: 'div',
  color: 'default',
  variant: 'elevated',
  rounded: 'rounded',
  bordered: false,
  clickable: false,
  disabled: false,
  padding: 'md',
  actionsAlign: 'end',
  orientation: 'vertical',
  flat: false,
  loading: false,
  objectFit: 'cover',
})

const emit = defineEmits<JvCardEmits>()

// 获取插槽内容
const slots = defineSlots<JvCardSlots>()

// 卡片子组件名称列表
const cardChildComponents = [
  JVCARDHEADER_NAME,
  JVCARDCONTENT_NAME,
  JVCARDACTIONS_NAME,
  JVCARDMEDIA_NAME,
]

// 使用shallowRef提高性能
const slotsDefault = shallowRef<ReturnType<NonNullable<typeof slots.default>> | undefined>()
function updateSlotsDefault() {
  slotsDefault.value = slots.default?.()
}
updateSlotsDefault()

// 提取出slots.default中的非卡片子组件
const otherContentVnodes = computed(() => {
  return slotsDefault.value?.filter((vnode) => {
    return (
      !vnode.type
      || !cardChildComponents.includes((vnode.type as any)?.name || '')
    )
  })
})

// 包含卡片子组件的节点
const cardChildVnodes = computed(() => {
  return slotsDefault.value?.filter((vnode) => {
    return cardChildComponents.includes((vnode.type as any)?.name || '')
  })
})

// 检查子组件的存在情况
const hasHeaderComponent = computed(() =>
  cardChildVnodes.value?.some(vnode => (vnode.type as any)?.name === JVCARDHEADER_NAME),
)
const hasContentComponent = computed(() =>
  cardChildVnodes.value?.some(vnode => (vnode.type as any)?.name === JVCARDCONTENT_NAME),
)
const hasActionsComponent = computed(() =>
  cardChildVnodes.value?.some(vnode => (vnode.type as any)?.name === JVCARDACTIONS_NAME),
)
const hasMediaComponent = computed(() =>
  cardChildVnodes.value?.some(vnode => (vnode.type as any)?.name === JVCARDMEDIA_NAME),
)

// 点击处理函数
function handleClick(event: MouseEvent) {
  if (props.disabled || !props.clickable)
    return
  emit('click', event)
}

// 计算卡片样式
const cardStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (props.maxWidth) {
    styles.maxWidth = convertToUnit(props.maxWidth)
  }

  if (props.minWidth) {
    styles.minWidth = convertToUnit(props.minWidth)
  }

  if (props.height) {
    styles.height = convertToUnit(props.height)
  }

  if (typeof props.elevation === 'number') {
    styles['--jv-card-box-shadow'] = `var(--jv-elevation-${props.elevation})`
  }

  return styles
})

// 计算是否有媒体内容
const hasMedia = computed(() => Boolean(props.image || slots.media || hasMediaComponent.value))

// 计算是否有头部内容
const hasHeader = computed(() => Boolean(props.title || props.subtitle || props.description || slots.title || slots.subtitle || slots.description || hasHeaderComponent.value))

// 计算是否有操作区内容
const hasActions = computed(() => Boolean(slots.actions || hasActionsComponent.value))

// 计算是否有内容区
const hasContent = computed(() => Boolean(props.content || (otherContentVnodes.value && otherContentVnodes.value.length > 0) || slots.content || hasContentComponent.value))

const cardHeaderProps = computed<JvCardHeaderProps>(() => {
  return {
    variant: 'flat',
    title: props.title,
    subtitle: props.subtitle,
    description: props.description,
  }
})

const cardId = useComponentId('jv-card')
provide(JvCardContextKey, {
  cardId,
})

// 公开方法
defineExpose({
  updateSlots: updateSlotsDefault,
})
</script>

<template>
  <component
    :is="tag" :id="cardId" :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`color-type-${color}`),
      bem.m(`padding-${padding}`),
      bem.m(`rounded-${rounded}`),
      bem.m(`orientation-${orientation}`),
      bem.is('bordered', bordered),
      bem.is('clickable', clickable),
      bem.is('disabled', disabled),
      bem.is('flat', flat),
      bem.is('loading', loading),
      bem.is('no-elevation', !elevation),
    ]" :style="cardStyles" v-bind="$attrs" @click="handleClick"
  >
    <!-- 加载遮罩 -->
    <div v-if="loading" :class="bem.e('loading-overlay')">
      <div :class="bem.e('loading-spinner')" />
    </div>

    <!-- 渲染子组件 - 首先检查是否有直接提供的子组件 -->
    <template v-if="cardChildVnodes && cardChildVnodes.length > 0">
      <!-- 渲染所有卡片子组件 -->
      <component :is="node" v-for="(node, index) in cardChildVnodes" :key="index" />

      <!-- 如果有非卡片子组件内容，但没有提供JvCardContent，则自动包装到内容区域 -->
      <component
        :is="h(JvCardContent, { content }, otherContentVnodes)"
        v-if="otherContentVnodes && otherContentVnodes.length > 0 && !hasContentComponent"
      />
    </template>
    <!-- 如果没有直接提供子组件，则使用属性和具名插槽方式渲染 -->
    <template v-else>
      <!-- 媒体内容 - 从插槽或属性渲染 -->
      <JvCardMedia v-if="hasMedia" :image="image" :height="height" :object-fit="objectFit">
        <slot name="media" />
      </JvCardMedia>

      <!-- 头部内容 - 从插槽或属性渲染 -->
      <JvCardHeader v-if="hasHeader" v-bind="cardHeaderProps">
        <template v-if="slots.title" #title>
          <slot name="title" />
        </template>
        <template v-if="slots.subtitle" #subtitle>
          <slot name="subtitle" />
        </template>
        <template v-if="slots.description" #description>
          <slot name="description" />
        </template>
      </JvCardHeader>

      <!-- 内容区 - 渲染插槽内容或非卡片子组件 -->
      <JvCardContent v-if="hasContent" :content="content">
        <slot v-if="slots.content" name="content" />
        <template v-else>
          <component :is="node" v-for="(node, index) in otherContentVnodes" :key="index" />
        </template>
      </JvCardContent>

      <!-- 操作区 - 从插槽渲染 -->
      <JvCardActions v-if="hasActions" :align="actionsAlign">
        <slot name="actions" />
      </JvCardActions>
    </template>
  </component>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;
@use '@/theme/styles/elevation' as *;

// 单行文本不换行溢出隐藏
@mixin text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
  hyphens: auto;
  letter-spacing: 0.0125em;
}

// 颜色类型列表
$color-types: (primary, secondary, success, warning, error, info);

// 变体列表
$variants: (elevated, outlined, tonal, filled, flat);

@include b(card) {
  // ---------- CSS 变量定义 ----------
  --jv-card-background: var(--jv-theme-surface);
  --jv-card-background-rgb: var(--jv-theme-surface-rgb);
  --jv-card-color: var(--jv-theme-on-surface);
  --jv-card-color-rgb: var(--jv-theme-on-surface-rgb);
  --jv-card-border-radius: var(--jv-rounded);
  --jv-card-border-color: var(--jv-theme-outline);
  --jv-card-border-width: 0;
  --jv-card-box-shadow: var(--jv-elevation-6);

  // ---------- 布局样式 ----------
  position: relative;
  display: grid;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: fit-content;

  border: var(--jv-card-border-width) solid var(--jv-card-border-color);
  border-radius: var(--jv-card-border-radius);
  box-shadow: var(--jv-card-box-shadow);
  background: var(--jv-card-background);
  color: var(--jv-card-color);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow, opacity;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas: 'media' 'header' 'content' 'actions';
  contain: content;

  // 水平方向布局
  &.is-orientation-horizontal {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'media header'
      'media content'
      'media actions';

    .jv-card__media {
      max-width: 200px;
      height: 100%;
      grid-row: span 3;
    }
  }

  // ---------- 子元素样式 ----------
  @include e(loading-overlay) {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255 255 255 / 0.7);
    backdrop-filter: blur(2px);
  }

  @include e(loading-spinner) {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(var(--jv-card-color-rgb), 0.1);
    border-top-color: var(--jv-card-color);
    border-radius: 50%;
    animation: card-spinner 1s linear infinite;
  }

  @include m(actions-align-start) {
    .jv-card__actions {
      justify-content: flex-start;
    }
  }

  @include m(actions-align-center) {
    .jv-card__actions {
      justify-content: center;
    }
  }

  @include m(actions-align-end) {
    .jv-card__actions {
      justify-content: flex-end;
    }
  }

  @include m(actions-align-space-between) {
    .jv-card__actions {
      justify-content: space-between;
    }
  }

  @include m(actions-align-space-around) {
    .jv-card__actions {
      justify-content: space-around;
    }
  }

  // ---------- 变体样式 ----------
  @include m(variant-elevated) {
    --jv-card-box-shadow: var(--jv-elevation-6);
    box-shadow: var(--jv-card-box-shadow);
  }

  @include m(variant-outlined) {
    --jv-card-border-width: 2px;
    --jv-card-border-color: #0000001f;
    --jv-card-box-shadow: none;
    border: var(--jv-card-border-width) solid var(--jv-card-border-color);
    box-shadow: none;
  }

  @include m(variant-tonal) {
    --jv-card-background: rgba(var(--jv-card-color-rgb), 0.12);
  }

  @include m(variant-filled) {
    --jv-card-background: var(--jv-theme-surface-variant);
  }

  @include m(variant-flat) {
    --jv-card-background: transparent;
    --jv-card-box-shadow: none;
  }

  // ---------- 颜色类型 ----------
  @include m(color-type-default) {
    --jv-card-background: var(--jv-theme-background);
    --jv-card-background-rgb: var(--jv-theme-background-rgb);
    --jv-card-color: var(--jv-theme-on-background);
    --jv-card-color-rgb: var(--jv-theme-on-background-rgb);
  }

  @each $type in $color-types {
    @include m(color-type-#{$type}) {
      --jv-card-background: var(--jv-theme-#{$type});
      --jv-card-background-rgb: var(--jv-theme-#{$type}-rgb);
      --jv-card-color: var(--jv-theme-on-#{$type});
      --jv-card-color-rgb: var(--jv-theme-on-#{$type}-rgb);
    }
  }

  // ---------- 圆角样式 ----------
  @include m(rounded-rounded) {
    --jv-card-border-radius: var(--jv-rounded);
  }

  @include m(rounded-roundedSm) {
    --jv-card-border-radius: var(--jv-rounded-sm);
  }

  @include m(rounded-roundedLg) {
    --jv-card-border-radius: var(--jv-rounded-lg);
  }

  @include m(rounded-roundedXl) {
    --jv-card-border-radius: var(--jv-rounded-xl);
  }

  @include m(rounded-roundedFull) {
    --jv-card-border-radius: var(--jv-rounded-pill);
  }

  @include m(rounded-none) {
    --jv-card-border-radius: 0;
  }

  // ---------- 方向样式 ----------
  @include m(orientation-horizontal) {
    grid-template-areas: 'media header' 'media content' 'media actions';
  }

  @include m(orientation-vertical) {
    grid-template-areas: 'media' 'header' 'content' 'actions';
  }

  // ---------- 状态样式 ----------
  @include when(bordered) {
    --jv-card-border-width: 1px;
  }

  @include when(clickable) {
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: var(--jv-elevation-8);
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: var(--jv-elevation-2);
      transform: translateY(0);
    }
  }

  @include when(disabled) {
    --jv-card-background: var(--jv-theme-disabled);
    --jv-card-color: var(--jv-theme-on-disabled);
    --jv-card-box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  @include when(no-elevation) {
    --jv-card-box-shadow: none;
  }
}

@keyframes card-spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
