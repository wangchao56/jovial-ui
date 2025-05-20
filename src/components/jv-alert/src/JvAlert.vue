<script setup lang="ts">
import type { JvAlertEmits, JvAlertProps } from './types'
import { computed, ref, useCssVars, watchEffect } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useRoundedClass } from '@/hooks/useStyle/useRoundedClass'
import { bem, JVALERT_NAME } from './types'

defineOptions({ name: JVALERT_NAME, inheritAttrs: false })

const {
  type = 'info',
  closable = false,
  showIcon = true,
  variant = 'filled',
  rounded = 'none',
  visible = true,
  icon,
  title,
  description,
  backgroundColor,
  textColor,
} = defineProps<JvAlertProps>()

const emit = defineEmits<JvAlertEmits>()
const roundedClass = useRoundedClass(rounded)

// 计算背景色
const getBackground = computed(() => {
  if (backgroundColor)
    return backgroundColor

  if (['outlined', 'left-accent'].includes(variant)) {
    return `var(--jv-theme-on-${type})`
  }
  return `var(--jv-theme-${type})`
})

// 计算文本色
const getTypeColor = computed(() => {
  if (textColor)
    return textColor

  if (['outlined', 'left-accent'].includes(variant)) {
    return `var(--jv-theme-${type})`
  }
  return `var(--jv-theme-on-${type})`
})
// 获取对应类型的图标
const getTypeIcon = computed(() => {
  if (icon)
    return icon

  const typeIcons = {
    success: '$successOutline',
    warning: '$warningOutline',
    info: '$infoOutline',
    error: '$errorOutline',
  }

  return typeIcons[type]
})

// 计算样式类
const alertClasses = computed(() => [
  bem.b(),
  bem.m(`type-${type}`),
  variant && bem.m(`variant-${variant}`),
  roundedClass.value,
])

// 本地可见性状态
const localVisible = ref(visible)

// 处理关闭按钮点击
function handleClose() {
  emit('update:visible', false)
  emit('close')
  localVisible.value = false
}

// 监听visible属性变化，同步本地状态
watchEffect(() => {
  localVisible.value = visible
})

// 暴露方法供父组件调用
defineExpose({
  /**
   * 手动关闭alert
   */
  close: handleClose,
})
const alertRef = ref<HTMLElement>()
// 当前字体颜色
useCssVars(() => {
  return {
    'jv-alert-background-color': getBackground.value,
    'jv-alert-color': getTypeColor.value,
  }
})
</script>

<template>
  <transition name="jv-alert-fade">
    <div v-if="localVisible" ref="alertRef" :class="alertClasses" role="alert" :aria-label="title">
      <!-- 图标 -->
      <div v-if="showIcon" :class="bem.e('icon')">
        <slot name="icon">
          <JvIcon :name="getTypeIcon" :color="getTypeColor" />
        </slot>
      </div>

      <!-- 内容 -->
      <div :class="bem.e('content')">
        <!-- 标题 -->
        <div v-if="title || $slots.title" :class="bem.e('title')">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <!-- 描述/内容 -->
        <div :class="bem.e('description')">
          <slot>{{ description }}</slot>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div v-if="closable" :class="bem.e('action')">
        <slot name="action">
          <JvButton variant="text" icon="$close" size="small" :color="type" @click="handleClose" />
        </slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use 'sass:map';

$alert-type-map: ('success', 'warning', 'info', 'error');

@include b(alert) {
  --jv-alert-border-color: currentcolor;
  --jv-alert-background-color: var(--jv-theme-suface);
  --jv-alert-color: var(--jv-theme-on-suface);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px 16px;
  background-color: var(--jv-alert-background-color);
  color: var(--jv-alert-color);
  transition:
    opacity 0.3s,
    transform 0.3s;

  :deep(.jv-button) {
    color: var(--jv-alert-color) !important;
  }

  @include m(variant-outlined) {
    border: 2px solid currentcolor;
  }

  @include m(variant-left-accent) {
    border-left: 4px solid currentcolor;
  }

  @include e(icon) {
    display: flex;
    align-items: flex-start;
    margin-right: 12px;
    font-size: 18px;
  }

  @include e(content) {
    flex: 1;
    min-width: 0; // 防止内容溢出
  }

  @include e(title) {
    // 文本超出省略
    overflow: hidden;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
  }

  @include e(description) {
    font-size: 14px;

    // 文本不换行
    white-space: normal;
    word-break: break-all; // 长文本自动换行
  }

  @include e(action) {
    margin-left: auto;
    align-self: flex-start;
  }

  @include e(close) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    opacity: 0.6;
    outline: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: 1px solid currentcolor;
      outline-offset: 1px;
    }
  }
}

// 添加淡入淡出动画
.jv-alert-fade-enter-active,
.jv-alert-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.jv-alert-fade-enter-from,
.jv-alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
