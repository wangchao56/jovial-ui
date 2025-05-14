<script setup lang="ts">
import type { JvProgressProps } from './types'
import { computed, ref, useAttrs, useCssVars, watch } from 'vue'
import CircleSvg from './CircleSvg.vue'
import LineSvg from './LineSvg.vue'
import { bem, JVPROGRESS_NAME } from './types'

defineOptions({ name: JVPROGRESS_NAME, inheritAttrs: true })

const props = withDefaults(
  defineProps<JvProgressProps>(),
  {
    progress: 0,
    color: '#1976d2',
    width: 100,
    height: 4,
    shape: 'line',
    indeterminate: false,
  },
)
const attrs = useAttrs()

const renderComponent = computed(() => {
  if (props.shape === 'line') {
    return LineSvg
  }
  return CircleSvg
})

useCssVars(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))

const ariaBusy = ref(true)
const ariaDescribedby = ref('')
const innerProps = computed(() => {
  return {
    ...(attrs || {}),
    ...props,
  }
})

// 当进度达到100%时，移除aria-busy属性
watch(() => props.progress, (newValue) => {
  ariaBusy.value = newValue < 100
}, { immediate: true })
</script>

<template>
  <div
    :class="[bem.b(), `${bem.b()}--${props.shape}`]" role="progressbar" :aria-valuemin="0" :aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : progress"
    :aria-valuetext="indeterminate ? '加载中' : `${progress}%已完成`" :aria-busy="ariaBusy"
    :aria-describedby="ariaDescribedby"
  >
    <component :is="renderComponent" v-bind="innerProps" />
    <slot />
  </div>
</template>

<style lang="scss">
@include b(progress) {
  position: relative;

  &--line {
    overflow: hidden;
  }

  &__track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: rgb(0 0 0 / 0.1);
  }

  &__bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  &--circle {
    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }

    &__track {
      stroke: rgb(0 0 0 / 0.1);
    }

    &__bar {
      transition: stroke-dashoffset 0.3s ease;
    }
  }
}
</style>
