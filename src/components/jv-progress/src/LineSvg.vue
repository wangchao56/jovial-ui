<script setup lang="ts">
import type { LineSvgProps } from './types'
import { getOptions } from '@/constants'
import { useComponentId } from '@/hooks/useComponentId'
import { createNamespace } from '@/utils'
import { computed, ref, useCssVars, watch } from 'vue'
import { JVLINESVG_NAME } from './types'

defineOptions({
  name: JVLINESVG_NAME,
})

const props = withDefaults(defineProps<LineSvgProps>(), {
  progress: 0,
  color: '#1976d2',
  width: 100,
  height: 8,
  trackColor: 'rgba(0, 0, 0, 0.1)',
  indeterminate: false,
  buffer: false,
  bufferProgress: 0,
  bufferColor: 'rgba(25, 118, 210, 0.4)',
  rounded: 'pill',
})

const bem = createNamespace('line-progress')

const svgWidth = 100
const progressWidth = computed(() => (props.progress / 100) * svgWidth)
const bufferWidth = computed(() => (props.bufferProgress / 100) * svgWidth)
const colorOptions = getOptions('colorType')
const progressColor = computed(() => {
  if (colorOptions.includes(props.color)) {
    return `var(--jv-theme-${props.color})`
  }
  return props.color
})
// 使用CSS变量设置样式
useCssVars(() => ({
  'progress-color': progressColor.value,
  'track-color': props.trackColor,
  'buffer-color': props.bufferColor,
  'progress-height': `${props.height}px`,
}))

// 无障碍支持
const ariaBusy = ref(true)
const progressId = useComponentId(JVLINESVG_NAME)
// 当进度达到100%时，移除aria-busy属性
watch(() => props.progress, (newValue) => {
  ariaBusy.value = newValue < 100
}, { immediate: true })
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <!-- 定义渐变和动画 -->
    <defs>
      <linearGradient :id="`indeterminate-gradient-${progressId}`" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="progressColor" stop-opacity="0.2" />
        <stop offset="50%" :stop-color="progressColor" stop-opacity="1" />
        <stop offset="100%" :stop-color="progressColor" stop-opacity="0.2" />
      </linearGradient>

      <!-- 不确定模式动画 -->
      <pattern
        :id="`indeterminate-pattern-${progressId}`" x="0" y="0" width="300" height="100"
        patternUnits="userSpaceOnUse"
      >
        <rect x="0" y="0" width="100" height="100" :fill="`url(#indeterminate-gradient-${progressId})`">
          <animate attributeName="x" from="-100" to="200" dur="2s" repeatCount="indefinite" />
        </rect>
      </pattern>
    </defs>

    <!-- 背景轨道 -->
    <rect x="0" y="0" width="100" :height="100" fill="var(--track-color)" :class="bem.e('track')" />

    <!-- 缓冲条 -->
    <rect
      v-if="buffer && !indeterminate" x="0" y="0" :width="bufferWidth" :height="100" fill="var(--buffer-color)"
      :class="bem.e('buffer')"
    >
      <animate v-if="buffer" attributeName="width" :from="0" :to="bufferWidth" dur="0.5s" fill="freeze" />
    </rect>

    <!-- 进度条 -->
    <rect
      v-if="!indeterminate" x="0" y="0" :width="progressWidth" :height="100" fill="var(--progress-color)" rx="4"
      ry="4" :class="bem.e('progress')"
    >
      <animate attributeName="width" :from="0" :to="progressWidth" dur="0.5s" fill="freeze" />
    </rect>

    <!-- 不确定模式进度条 -->
    <rect
      v-if="indeterminate" x="0" y="0" width="100" :height="100"
      :fill="`url(#indeterminate-pattern-${progressId})`" :class="bem.e('indeterminate-progress')"
    />
  </svg>
</template>

<style lang="scss" scoped>
@include b(line-progress) {
  position: relative;
  overflow: hidden;

  @include e(track) {
    transition: fill 0.3s ease;
  }

  @include e(buffer) {
    transition: width 0.3s ease;
  }

  @include e(progress) {
    transition: width 0.3s ease;
  }

  &--indeterminate {
    overflow: hidden;
  }
}

svg {
  display: block; // 消除默认间隙
  width: 100%;
  height: 100%;
  border-radius: inherit;
  box-shadow: var(--jv-elevation-2);
}
</style>
