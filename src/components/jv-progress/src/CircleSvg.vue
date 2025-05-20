<script setup lang="ts">
import type { CircleSvgProps } from './types'
import { computed, ref, useCssVars, watch } from 'vue'
import { useComponentId } from '@/hooks/useComponentId'
import { bemCircle, JVCIRCLESVG_NAME } from './types'

defineOptions({
  name: JVCIRCLESVG_NAME,
})

const props = withDefaults(defineProps<CircleSvgProps>(), {
  progress: 0,
  color: '#1976d2',
  width: 100,
  strokeWidth: 8,
  trackColor: 'rgba(0, 0, 0, 0.1)',
  indeterminate: false,
  animationDuration: 2,
})

// 无障碍支持
const ariaBusy = ref(true)
const progressId = useComponentId(JVCIRCLESVG_NAME)

const radius = computed(() => 50 - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashoffset = computed(() => circumference.value * (1 - props.progress / 100))
// 使用CSS变量设置样式
useCssVars(() => ({
  'progress-color': props.color,
  'track-color': props.trackColor,
  'stroke-width': `${props.strokeWidth}px`,
  'circumference': circumference.value.toString(),
  'dashoffset': dashoffset.value.toString(),
  'animation-duration': `${props.animationDuration}s`,
}))

// 当进度达到100%时，移除aria-busy属性
watch(() => props.progress, (newValue) => {
  ariaBusy.value = newValue < 100
}, { immediate: true })

const gradientId = computed(() => `circle-gradient-${progressId}`)
</script>

<template>
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <!-- 定义渐变和动画 -->
    <defs>
      <radialGradient :id="gradientId" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" :stop-color="color" stop-opacity="1" />
        <stop offset="70%" :stop-color="color" stop-opacity="1" />
        <stop offset="100%" :stop-color="color" stop-opacity="0.8" />
      </radialGradient>

      <!-- 定义动画 -->
      <animateTransform
        v-if="indeterminate" id="rotateTransform" attributeName="transform" attributeType="XML"
        type="rotate" from="0 50 50" to="360 50 50" :dur="`${animationDuration}s`" repeatCount="indefinite"
      />
    </defs>

    <!-- 背景轨道 -->
    <circle
      cx="50" cy="50" :r="radius" fill="none" :stroke="trackColor" :stroke-width="strokeWidth"
      :class="bemCircle.e('track')"
    />

    <!-- 进度圆环 -->
    <circle
      v-if="!indeterminate" cx="50" cy="50" :r="radius" fill="none" :stroke="color"
      :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="dashoffset"
      transform="rotate(-90 50 50)" :class="bemCircle.e('progress')"
    >
      <animate
        v-if="progress > 0" attributeName="stroke-dashoffset" :from="circumference" :to="dashoffset"
        :dur="0.5" fill="freeze"
      />
    </circle>

    <!-- 不确定模式圆环 -->
    <circle
      v-if="indeterminate" cx="50" cy="50" :r="radius" fill="none" :stroke="`url(#${gradientId})`"
      :stroke-width="strokeWidth" :stroke-dasharray="`${circumference * 0.75} ${circumference * 0.25}`"
      :class="bemCircle.e('indeterminate-progress')"
    >
      <!-- 通过应用动画实现旋转效果 -->
      <animateTransform
        attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50"
        :dur="`${animationDuration}s`" repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>

<style lang="scss" scoped>
@include b(circle-progress) {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @include e(track) {
    transition: stroke 0.3s ease;
  }

  @include e(progress) {
    transition: stroke-dashoffset 0.3s ease;
  }

  @include e(indeterminate-progress) {
    /* 使用SVG animate代替CSS动画 */
  }

  @include e(content) {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
