<script setup lang="ts">
import type {
  JvMessageEmits,
  JvMessageExpose,
  JvMessageProps,
  MessageType
} from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { useZindex } from '@/hooks'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { bem, JVMESSAGE_NAME } from './types'

defineOptions({ name: JVMESSAGE_NAME, inheritAttrs: false })

const {
  type = 'info',
  closable = false,
  showIcon = true,
  duration = 3000,
  center = false,
  variant = '',
  autoClose = false
} = defineProps<JvMessageProps>()

const emit = defineEmits<JvMessageEmits>()

const visible = ref(true)
// z-index管理
const { currentZIndex, nextZindex } = useZindex(1000)

// 自动关闭定时器
let timer: NodeJS.Timeout | null = null
// 创建定时器
function createTimer() {
  if (autoClose && duration > 0) {
    timer = setTimeout(() => {
      close()
    }, duration)
  }
}
// 清除定时器
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
  }
}

onMounted(() => {
  createTimer()
  nextZindex()
})

onUnmounted(() => {
  clearTimer()
})

// 关闭消息
function close() {
  visible.value = false
  emit('close')
  if (timer) {
    clearTimeout(timer)
  }
}

// 计算图标
const iconName = computed(() => {
  const iconMap: Record<MessageType, string> = {
    info: 'mdi:information',
    success: 'mdi:check-circle',
    warning: 'mdi:alert',
    error: 'mdi:close-circle'
  }
  return iconMap[type as MessageType]
})

defineExpose<JvMessageExpose>({
  close
})
</script>

<template>
  <Transition name="jv-message-fade">
    <div
      v-if="visible"
      :class="[
        bem.b(),
        bem.m(`type-${type}`),
        bem.is('center', center),
        variant ? bem.m(`variant-${variant}`) : ''
      ]"
      :style="{ zIndex: currentZIndex }"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
      @touchstart="clearTimer"
      @touchend="createTimer"
    >
      <div :class="bem.e('content')">
        <JvIcon v-if="showIcon" :name="iconName" :class="bem.e('icon')" />
        <span :class="bem.e('text')">
          <slot />
        </span>
      </div>

      <JvButton
        v-if="closable"
        icon="$close"
        variant="plain"
        size="small"
        :class="bem.e('close')"
        @click="close"
      />
    </div>
  </Transition>
</template>

<style lang="scss">
@use 'sass:map';
@use '@/theme/styles/border-radius' as *;

$message-type-options: (info, success, warning, error);

@include b(message) {
  --jv-message-color: var(--jv-theme-on-surface);
  --jv-message-background-color: var(--jv-theme-surface);
  --jv-message-border-color: var(--jv-theme-on-surface);
  --jv-message-border-radius: var(--jv-rounded-md);
  --jv-message-box-shadow: var(--jv-elevation-6);
  --jv-message-font-size: var(--jv-font-size-base, 14px);
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: var(--jv-zindex-message);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: var(--jv-message-border-radius);
  box-shadow: var(--jv-message-box-shadow);
  background-color: var(--jv-message-background-color);
  color: var(--jv-message-color);
  font-size: var(--jv-message-font-size);
  line-height: 1.5;
  opacity: 1;
  transform: translateX(-50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @include e(content) {
    display: flex;
    align-items: center;
  }

  @include e(icon) {
    margin-right: 12px;
    font-size: 20px;
  }

  @include e(text) {
    padding: 0;
    font-size: var(--jv-font-size-base);
    word-break: break-all;
  }

  @include e(close) {
    margin-left: 16px;
    color: inherit;
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  &.jv-message--is-center {
    justify-content: center;
  }

  @each $type in $message-type-options {
    @include m(type-#{$type}) {
      --jv-message-background-color: rgb(var(--jv-theme-#{$type}-rgb));
      --jv-message-color: var(--jv-theme-on-#{$type});

      .jv-message__icon {
        color: var(--jv-theme-on-#{$type});
      }
    }
  }

  // 变体样式
  @include m(variant-outlined) {
    border-width: 1px;
    border-style: solid;
    border-color: var(--jv-message-background-color);
    background-color: transparent;
    color: var(--jv-message-background-color);

    .jv-message__icon {
      color: var(--jv-message-background-color);
    }
  }

  @include m(variant-filled) {
    background-color: var(--jv-message-background-color);
    color: var(--jv-message-color);
  }
}

// 动画
.jv-message-fade-enter-active,
.jv-message-fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.jv-message-fade-enter-from,
.jv-message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
