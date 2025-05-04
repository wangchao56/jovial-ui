<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type {
  JvOverlayEmits,
  JvOverlayExpose,
  JvOverlayProps,
  JvOverlaySolts
} from './types'
import { useZindex } from '@/hooks'
import { useParentElement } from '@vueuse/core'
import { computed, onMounted, unref } from 'vue'
import { bem, JVOVERLAY_NAME } from './types'

defineOptions({ name: JVOVERLAY_NAME, inheritAttrs: true })

const {
  target = 'viewport',
  maskZIndex = 1000,
  class: customClass
} = defineProps<JvOverlayProps>()

const emit = defineEmits<JvOverlayEmits>()
defineSlots<JvOverlaySolts>()
const visible = defineModel<boolean>('modelValue')
defineExpose<JvOverlayExpose>()

const { currentZIndex, nextZindex } = useZindex(
  target === 'parent' ? 100 : maskZIndex
)
// 获取父元素
const parentEl = useParentElement()
onMounted(() => {
  nextZindex()
  if (target === 'parent') {
    parentEl.value!.style.position = 'relative'
  }
})

function handleLeaveAfter() {
  emit('closeAfter')
}

function handleEnterAfter() {
  emit('openAfter')
}
const overlayClass = computed(() => {
  return [bem.b(), customClass]
})

const overlayStyle = computed<CSSProperties>(() => {
  switch (target) {
    case 'parent':
      return {
        position: 'relative',
        width: '100%',
        height: '100%'
      }
    default:
      return {
        position: 'fixed',
        width: '100vw',
        height: '100vh'
      }
  }
})

const maskStyle = computed<CSSProperties>(() => {
  return {
    position: target === 'parent' ? 'absolute' : 'fixed',
    zIndex: unref(currentZIndex)
  }
})

const contentStyle = computed<CSSProperties>(() => {
  return {
    zIndex: unref(currentZIndex) + 1,
    position: target === 'parent' ? 'relative' : 'fixed'
  }
})
function handleClickOverlay() {
  emit('clickOverlay')
}
</script>

<template>
  <Teleport
    :to="target === 'viewport' ? 'body' : parentEl?.id"
    :disabled="target === 'parent'"
  >
    <Transition
      name="jv-overlay"
      @after-leave="handleLeaveAfter"
      @after-enter="handleEnterAfter"
    >
      <div v-if="visible" :class="overlayClass" :style="overlayStyle">
        <!-- 遮罩 -->
        <span
          :class="bem.e('mask')"
          :style="maskStyle"
          @click="handleClickOverlay"
        />
        <!-- 内容 -->
        <slot name="default" :style="contentStyle" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@include b(overlay) {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: transparent;

  @include e(mask) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
  }
}

.jv-overlay-enter-active,
.jv-overlay-leave-active {
  transition: opacity 0.15s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.jv-overlay-enter-from,
.jv-overlay-leave-to {
  opacity: 0;
}

.jv-overlay-enter-to,
.jv-overlay-leave-from {
  opacity: 1;
}
</style>
