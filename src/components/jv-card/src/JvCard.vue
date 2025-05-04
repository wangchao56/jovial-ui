<script setup lang="ts">
import type { JvCardEmits, JvCardProps, JvCardSlots } from './types'
import { consoleWarn, convertToUnit } from '@/utils'
import { computed, onMounted, ref } from 'vue'
import JvCardActions from './JvCardActions.vue'
import JvCardContent from './JvCardContent.vue'
import JvCardFooter from './JvCardFooter.vue'
import JvCardHeader from './JvCardHeader.vue'
import {
  bem,
  JVCARD_NAME,
  JVCARDACTIONS_NAME,
  JVCARDCONTENT_NAME,
  JVCARDFOOTER_NAME,
  JVCARDHEADER_NAME
} from './types'

defineOptions({ name: JVCARD_NAME, inheritAttrs: false })

const {
  title,
  subtitle,
  maxWidth,
  colorType = 'default',
  variant = 'elevated',
  rounded = 'rounded',
  bordered = false,
  clickable = false,
  disabled = false,
  padding = 'md',
  actionsAlign = 'end',
  content
} = defineProps<JvCardProps>()

const emit = defineEmits<JvCardEmits>()

// 获取插槽内容
const slots = defineSlots<JvCardSlots>()

// 检测是否有子组件
const hasChildHeader = ref(false)
const hasChildContent = ref(false)
const hasChildActions = ref(false)
const hasChildFooter = ref(false)
const hasOtherContent = ref(false)

// 在组件挂载和更新后检查子组件
onMounted(checkChildren)

// 卡片子组件名称列表
const cardChildComponents = [
  JVCARDHEADER_NAME,
  JVCARDCONTENT_NAME,
  JVCARDACTIONS_NAME,
  JVCARDFOOTER_NAME
]

// 检查子组件的存在
function checkChildren() {
  // 获取默认插槽的内容
  const defaultSlotContent = slots.default?.() || []

  // 查找直接子组件
  hasChildHeader.value = defaultSlotContent.some((vnode) => {
    return vnode.type && (vnode.type as any).name === JVCARDHEADER_NAME
  })

  hasChildContent.value = defaultSlotContent.some((vnode) => {
    return vnode.type && (vnode.type as any).name === JVCARDCONTENT_NAME
  })

  hasChildActions.value = defaultSlotContent.some((vnode) => {
    return vnode.type && (vnode.type as any).name === JVCARDACTIONS_NAME
  })

  hasChildFooter.value = defaultSlotContent.some((vnode) => {
    return vnode.type && (vnode.type as any).name === JVCARDFOOTER_NAME
  })

  // 检查是否有非卡片子组件的内容
  hasOtherContent.value = defaultSlotContent.some((vnode) => {
    // 如果是文本节点或者非卡片子组件
    return (
      !vnode.type || // 文本节点
      (typeof vnode.type === 'string' && vnode.type !== 'template') || // HTML元素
      (vnode.type &&
        typeof vnode.type !== 'string' &&
        !cardChildComponents.includes((vnode.type as any).name || '')) // 其他组件
    )
  })

  // 开发环境下输出警告
  if (hasOtherContent.value && import.meta.env.DEV) {
    consoleWarn(
      `[JvCard] 警告: 检测到默认插槽中包含非卡片子组件的内容。
      为了最佳实践，建议在默认插槽中仅使用 JvCardHeader、JvCardContent、JvCardActions 或 JvCardFooter 子组件。
      如需添加内容，请使用 JvCardContent 子组件或 content 插槽。`
    )
  }
}

// 提取出slots.default中的非卡片子组件
const otherContentVnode = computed(() => {
  return slots.default?.()?.filter((vnode) => {
    return (
      !vnode.type ||
      !cardChildComponents.includes((vnode.type as any)?.name || '')
    )
  })
})

// 点击处理函数
function handleClick(event: MouseEvent) {
  if (disabled || !clickable) return
  emit('click', event)
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`variant-${variant}`),
      bem.m(`color-type-${colorType}`),
      bem.m(`padding-${padding}`),
      bem.m(`rounded-${rounded}`),
      bem.is('bordered', bordered),
      bem.is('clickable', clickable),
      bem.is('disabled', disabled)
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!--  渲染剩余的子组件 -->
    <slot />
    <!-- 当没有子组件JvCardHeader时，使用插槽或属性渲染 -->
    <template v-if="!hasChildHeader">
      <JvCardHeader v-if="$slots.header" v-slot="headerProps">
        <slot name="header" v-bind="headerProps" />
      </JvCardHeader>
      <JvCardHeader
        v-else-if="title || subtitle || $slots.title || $slots.subtitle"
        :title="title"
        :subtitle="subtitle"
      >
        <template v-if="$slots.title" #title>
          <slot name="title" />
        </template>
        <template v-if="$slots.subtitle" #subtitle>
          <slot name="subtitle" />
        </template>
      </JvCardHeader>
    </template>

    <!-- 当没有子组件时，使用媒体插槽 -->
    <div v-if="$slots.media" :class="bem.e('media')">
      <slot name="media" />
    </div>

    <!-- 当没有子组件JvCardContent时，使用内容插槽或属性 -->
    <JvCardContent
      v-if="
        !hasChildContent &&
        ($slots.content || content || otherContentVnode?.length)
      "
      :content="content"
    >
      <template v-if="$slots.content">
        <slot name="content" />
      </template>
      <template v-else-if="otherContentVnode?.length">
        <slot />
      </template>
    </JvCardContent>

    <!-- 当没有子组件JvCardActions时，使用操作插槽 -->
    <JvCardActions
      v-if="!hasChildActions && $slots.actions"
      :align="actionsAlign"
    >
      <slot name="actions" />
    </JvCardActions>

    <!-- 当没有子组件JvCardFooter时，使用底部插槽 -->
    <JvCardFooter v-if="!hasChildFooter && $slots.footer">
      <slot name="footer" />
    </JvCardFooter>
  </div>
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

// 卡片内边距映射
$card-padding-map: (
  'none': 0,
  'xs': 4px,
  'sm': 8px,
  'md': 16px,
  'lg': 24px,
  'xl': 32px
);

// 颜色类型列表
$color-types: (primary, secondary, success, warning, error, info, default);

// 变体列表
$variants: (elevated, outlined, tonal);

@include b(card) {
  // ---------- CSS 变量定义 ----------
  --jv-card-background: var(--jv-theme-background);
  --jv-card-background-rgb: var(--jv-theme-background-rgb);
  --jv-card-color: var(--jv-theme-on-background);
  --jv-card-color-rgb: var(--jv-theme-on-background-rgb);
  --jv-card-border-radius: var(--jv-rounded);
  --jv-card-border-color: var(--jv-theme-outline);
  --jv-card-border-width: 0;
  --jv-card-box-shadow: none;
  --jv-card-padding: 16px;

  // ---------- 布局样式 ----------
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  max-width: v-bind('convertToUnit(maxWidth)');
  min-height: fit-content;

  border: var(--jv-card-border-width) solid var(--jv-card-border-color);
  border-radius: var(--jv-card-border-radius);
  background: var(--jv-card-background);
  color: var(--jv-card-color);
  transition: all 0.3s ease;

  // ---------- 子元素样式 ----------
  @include e(media) {
    overflow: hidden;
    width: 100%;

    img,
    video {
      display: block;
      width: 100%;
      object-fit: cover;
    }
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

  // ---------- 颜色类型 ----------
  @each $type in $color-types {
    @include m(color-type-#{$type}) {
      @if $type == default {
        --jv-card-background: var(--jv-theme-background);
        --jv-card-background-rgb: var(--jv-theme-background-rgb);
        --jv-card-color: var(--jv-theme-on-background);
        --jv-card-color-rgb: var(--jv-theme-on-background-rgb);
      } @else {
        --jv-card-background: var(--jv-theme-#{$type});
        --jv-card-background-rgb: var(--jv-theme-#{$type}-rgb);
        --jv-card-color: var(--jv-theme-on-#{$type});
        --jv-card-color-rgb: var(--jv-theme-on-#{$type}-rgb);
      }
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

  // ---------- 内边距样式 ----------
  @each $name, $value in $card-padding-map {
    @include m(padding-#{$name}) {
      --jv-card-padding: #{$value};
    }
  }

  // ---------- 状态样式 ----------
  @include when(bordered) {
    --jv-card-border-width: 1px;
  }

  @include when(clickable) {
    cursor: pointer;
    transition: all 0.3s ease;

    // 可点击时，hover 时增加阴影，点击时缩小阴影

    &:hover {
      box-shadow: var(--jv-elevation-6);
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
  }
}
</style>
