<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { JvPopperProps, Rect } from './types'
import { throttledWatch } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, unref } from 'vue'
import { calculatePosition, getFinalPlacement, updateArrow } from './helper'
import { bem, JVPOPPER_NAME } from './types'

defineOptions({ name: JVPOPPER_NAME, inheritAttrs: false })

const { placement = 'bottom', referenceRect, arrow = false, offset = [0, 0], background, borderColor, type } = defineProps<JvPopperProps>()
const popperRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const popperRect = ref<Rect>()
const offsetValue = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const arrowStyle = ref<CSSProperties>({})
const visible = ref(false)

const popperStyle = computed<CSSProperties>(() => ({
  transform: `translate3d(${offsetValue.value?.x}px, ${offsetValue.value?.y}px, 0)`,
  background,
  borderColor,
}))
const finalPlacement = ref(placement)
function updatePosition() {
  if (!referenceRect || !popperRect.value || !popperRef.value)
    return
  finalPlacement.value = getFinalPlacement(referenceRect, popperRef.value, placement) as PlacementType
  offsetValue.value = calculatePosition(referenceRect, popperRect.value, {
    placement: unref(finalPlacement),
    modifiers: {
      offset,
      arrow,
    },
  })
}

// 窗口大小变化时更新位置
onMounted(() => {
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
})
onUnmounted(() => {
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})

throttledWatch(() => [popperStyle.value, referenceRect, popperRect.value, arrow], () => {
  if (arrow) {
    arrowStyle.value = updateArrow(referenceRect, popperRect.value, arrow, unref(finalPlacement)) as CSSProperties
  }
  visible.value = true
}, {
  throttle: 10,
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="popperRef" :class="[bem.b(), bem.is('arrow', arrow), bem.is('visible', visible), bem.m(type)]"
      :style="popperStyle" :data-placement="finalPlacement"
    >
      <div :class="bem.e('wrapper')">
        <slot />
        <span
          v-if="arrow" id="jv-popper__arrow" ref="arrowRef" :style="arrowStyle"
          :data-placement="finalPlacement" :class="bem.e('arrow')"
        />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
$type-map: ('primary', 'secondary', 'success', 'warning', 'error');

@include b(popper) {
  --jv-popper-arrow-size: 16px;
  --jv-popper-arrow-color: var(--jv-theme-primary);
  --jv-popper-arrow-background: var(--jv-theme-background);
  --jv-popper-arrow-border-color: var(--jv-theme-primary);
  --jv-popper-background: var(--jv-theme-background);
  --jv-popper-color: var(--jv-theme-on-background);
  --jv-popper-border-color: var(--jv-theme-border);
  --jv-popper-border-width: 1px;
  --jv-popper-border-style: solid;
  --jv-popper-border-radius: 4px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  box-sizing: border-box;
  min-width: fit-content;
  min-height: fit-content;
  opacity: 0; // 默认隐藏
  transition: opacity 0.3s ease-in-out;

  &[data-placement^='top'] {
    padding-bottom: var(--jv-popper-arrow-size);
  }

  &[data-placement^='bottom'] {
    padding-top: var(--jv-popper-arrow-size);
  }

  &[data-placement^='left'] {
    padding-right: var(--jv-popper-arrow-size);
  }

  &[data-placement^='right'] {
    padding-left: var(--jv-popper-arrow-size);
  }

  @each $type in $type-map {
    @include m($type) {
      --jv-popper-arrow-color: var(--jv-theme-on-#{$type});
      --jv-popper-arrow-background: var(--jv-theme-background);
      --jv-popper-arrow-border-color: var(--jv-theme-#{$type});
      --jv-popper-background: var(--jv-theme-#{$type});
    }
  }

  @include when(visible) {
    opacity: 1;
  }

  @include e(wrapper) {
    position: relative;
    box-sizing: border-box;

    // padding: var(--jv-popper-arrow-size);
    border-radius: var(--jv-popper-border-radius);
    background: var(--jv-popper-background);
    color: var(--jv-popper-color);
    filter: drop-shadow(var(--jv-elevation-6));
    backdrop-filter: blur(10px);

    // background-clip: content-box;
  }

  @include e(arrow) {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: var(--jv-popper-arrow-size);
    height: var(--jv-popper-arrow-size);
    transform: translate(-50%, -50%);

    &::before {
      position: absolute;
      border-width: 0;
      border-style: solid;
      border-color: var(--jv-popper-arrow-border-color);
      background: var(--jv-popper-arrow-background);
      transform: rotate(45deg);
      border-right-width: 2px;
      border-bottom-width: 2px;
      content: '';
      inset: 0;
      clip-path: polygon(90% 0, 100% 0, 100% 100%, 0 100%, 0 90%);
    }
  }

  [data-placement^='top'] {
    &::before {
      transform: rotate(45deg);
    }
  }

  [data-placement^='bottom'] {
    &::before {
      transform: rotate(-135deg);
    }
  }

  [data-placement^='left'] {
    &::before {
      transform: rotate(-45deg);
    }
  }

  [data-placement^='right'] {
    &::before {
      transform: rotate(135deg);
    }
  }
}
</style>
