<script setup lang="ts">
import type { JvDrawerEmits, JvDrawerExpose, JvDrawerProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvOverlay from '@/components/jv-overlay/src/JvOverlay.vue'
import { useZindex } from '@/hooks'
import { computed, normalizeStyle, onMounted, ref, useId, watch } from 'vue'
import { bem, JVDRAWER_NAME } from './types'

defineOptions({ name: JVDRAWER_NAME, inheritAttrs: false })

const {
  placement = 'right',
  size = '300px',
  closeIcon = '$close',
  closeable = true,
  maskClosable = true
} = defineProps<JvDrawerProps>()

const emit = defineEmits<JvDrawerEmits>()
const drawerVisible = ref(false)
const overlayVisible = ref(false)
const { currentZIndex, nextZindex } = useZindex()
onMounted(() => {
  nextZindex()
})
const visible = defineModel<boolean>('modelValue')

function openDrawer() {
  visible.value = true
}

function closeDrawer() {
  visible.value = false
}

function toggleDrawer() {
  visible.value = !visible.value
}

// 关闭时，滚动条恢复
function hideScrollbar() {
  document.documentElement.style.scrollbarWidth = 'none'
}

function showScrollbar() {
  document.documentElement.style.scrollbarWidth = 'thin'
}

watch(
  visible,
  (val) => {
    if (val) {
      overlayVisible.value = true
      hideScrollbar()
    } else {
      drawerVisible.value = false
      showScrollbar()
    }
  },
  { immediate: true }
)

function overlayOpenAfter() {
  drawerVisible.value = true
}

function overlayCloseAfter() {
  emit('closeAfter')
}

function handleCloseAfter() {
  overlayVisible.value = false
}

function handleOpenAfter() {
  emit('openAfter')
}

function handleClose() {
  closeDrawer()
  emit('close')
}

const drawerId = `jv-drawer-${useId()}`

const triggerProps = computed(() => {
  return {
    onClick: toggleDrawer,
    class: 'jv-drawer__trigger',
    'data-bindmodal-id': drawerId
  }
})

const maskZIndex = computed(() => {
  return currentZIndex.value - 1
})

// 判断是否为移动端
const isMobile = computed(() => window.innerWidth <= 600)

const realPlacement = computed(() => {
  if (isMobile.value) return 'bottom'
  return placement
})

const placementStyle = computed(() => {
  const style: Record<string, any> = {}
  const innerSize = typeof size === 'number' ? `${size}px` : size
  if (isMobile.value) {
    style.width = '100vw'
    style.height = 'auto'
    style.maxHeight = '90vh'
    style.left = 0
    style.right = 0
    style.bottom = 0
    style.borderRadius = '16px 16px 0 0'
  } else {
    switch (realPlacement.value) {
      case 'left':
        style.width = innerSize
        break
      case 'right':
        style.width = innerSize
        break
      case 'top':
        style.height = innerSize
        break
      case 'bottom':
        style.height = innerSize
        break
    }
  }
  return style
})

function handleClickOverlay() {
  if (maskClosable) {
    toggleDrawer()
  }
}

defineExpose<JvDrawerExpose>({
  open: openDrawer,
  close: closeDrawer
})
</script>

<template>
  <slot name="trigger" :props="triggerProps" />
  <JvOverlay
    target="viewport"
    :model-value="overlayVisible"
    :mask-z-index="maskZIndex"
    :z-index="currentZIndex"
    class="jv-drawer"
    @open-after="overlayOpenAfter"
    @close-after="overlayCloseAfter"
    @click-overlay="handleClickOverlay"
  >
    <template #default="{ style: contentStyle }">
      <Transition
        :name="`jv-drawer-${realPlacement}`"
        @after-enter="handleOpenAfter"
        @after-leave="handleCloseAfter"
      >
        <div
          v-if="drawerVisible"
          :id="drawerId"
          :class="[
            bem.e('wrapper'),
            bem.is('open', visible),
            bem.m(realPlacement)
          ]"
          :style="normalizeStyle([contentStyle, placementStyle])"
        >
          <div :class="[bem.e('header')]">
            <slot name="header">
              <div :class="[bem.e('title')]">
                <slot name="title">
                  <span>{{ title || '标题' }}</span>
                </slot>
              </div>
            </slot>
            <JvButton
              v-if="closeable"
              size="small"
              variant="text"
              :icon="closeIcon"
              @click="handleClose"
            />
          </div>
          <div :class="[bem.e('body')]">
            <slot />
          </div>
          <div :class="[bem.e('footer')]">
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </template>
  </JvOverlay>
</template>

<style lang="scss">
@include b(drawer) {
  --jv-drawer-padding: 16px;
  --jv-drawer-width: 30%;
  --jv-drawer-height: 100%;
  --jv-drawer-width-mobile: 100vw;
  --jv-drawer-height-mobile: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @include e(wrapper) {
    position: fixed;
    z-index: var(--jv-z-index-drawer);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: var(--jv-drawer-padding);
    box-shadow: var(--jv-elevation-6);
    background-color: #fff;

    @include m(left) {
      width: var(--jv-drawer-width);
      height: 100%;
      min-height: 100vh;
      border-radius: 0 var(--jv-rounded-md) var(--jv-rounded-md) 0;
      inset: 0 auto 0 0;
    }

    @include m(right) {
      width: var(--jv-drawer-width);
      height: 100%;
      min-height: 100vh;
      border-radius: var(--jv-rounded-md) 0 0 var(--jv-rounded-md);
      inset: 0 0 0 auto;
    }

    @include m(top) {
      width: 100%;
      min-width: 100vw;
      height: var(--jv-drawer-width);
      border-radius: 0 0 var(--jv-rounded-md) var(--jv-rounded-md);
      inset: 0 0 auto;
    }

    @include m(bottom) {
      width: 100%;
      min-width: 100vw;
      height: var(--jv-drawer-width);
      border-radius: var(--jv-rounded-md) var(--jv-rounded-md) 0 0;
      inset: auto 0 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__title {
    font-size: var(--jv-font-size-lg);
    font-weight: var(--jv-font-weight-bold);
    text-wrap: nowrap;
  }

  &__body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    width: 100%;
    padding: 8px 16px 16px;
  }
}

// 动画
.jv-drawer-left-enter-active,
.jv-drawer-left-leave-active {
  transition: transform 0.3s ease;
}

.jv-drawer-left-enter-from,
.jv-drawer-left-leave-to {
  transform: translateX(-100%);
}

.jv-drawer-right-enter-active,
.jv-drawer-right-leave-active {
  transition: transform 0.3s ease;
}

.jv-drawer-right-enter-from,
.jv-drawer-right-leave-to {
  transform: translateX(100%);
}

.jv-drawer-top-enter-active,
.jv-drawer-top-leave-active {
  transition: transform 0.3s ease;
}

.jv-drawer-top-enter-from,
.jv-drawer-top-leave-to {
  transform: translateY(-100%);
}

.jv-drawer-bottom-enter-active,
.jv-drawer-bottom-leave-active {
  transition: transform 0.3s ease;
}

.jv-drawer-bottom-enter-from,
.jv-drawer-bottom-leave-to {
  transform: translateY(100%);
}

@media (width <= 600px) {
  .jv-drawer__wrapper {
    position: fixed !important;
    inset: auto 0 0 !important;
    width: 100vw !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: 90vh !important;
    border-radius: 16px 16px 0 0 !important;
    animation: drawerUp 0.3s;
  }
}

@keyframes drawerUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>
