<script setup lang="ts">
import type { JvImageEmits, JvImageProps, JvImageSlots } from './types'
import JvLoader from '@/components/jv-loader/src/JvLoader.vue'
import JvOverlay from '@/components/jv-overlay/src/JvOverlay.vue'
import { useCssVariables } from '@/hooks/useStyle/useCssVariables'
import { useRoundedClass } from '@/hooks/useStyle/useRoundedClass'
import { convertToUnit } from '@/utils'
import { computed, onMounted, ref, useCssVars } from 'vue'
import { bem, JVIMAGE_NAME } from './types'

defineOptions({ name: JVIMAGE_NAME, inheritAttrs: false })

const {
  src,
  alt,
  loadingImg,
  errorImg,
  lazy = false,
  fit,
  aspectRatio = 'auto',
  borderStyle,
  borderWidth,
  borderColor,
  rounded = 'none',
  sources = [],
} = defineProps<JvImageProps>()

// 定义事件
const emit = defineEmits<JvImageEmits>()

// 插槽
defineSlots<JvImageSlots>()

// 图片状态
const isLoading = ref(true)
const isError = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
// 暂时隐藏图片
const isHidden = ref(false)

// 当前显示的图片源
const currentSrc = computed(() => {
  if (isError.value && errorImg)
    return errorImg
  if (isLoading.value && loadingImg)
    return loadingImg
  return src
})

// 图片加载和错误处理
function handleLoad(event: Event) {
  isLoading.value = false
  isError.value = false
  emit('load', event)
}

function handleError(event: Event) {
  isHidden.value = false
  isLoading.value = false
  isError.value = true
  emit('error', event)
}

// 懒加载实现
onMounted(() => {
  if (!lazy)
    return

  const observer = new IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0]
    if (isIntersecting && imgRef.value) {
      imgRef.value.src = src || ''
      observer.unobserve(imgRef.value)
    }
  })

  if (imgRef.value) {
    observer.observe(imgRef.value)
  }
})

const { uniqueClass } = useCssVariables(JVIMAGE_NAME, () => ({
  aspectRatio,
  borderStyle,
  borderWidth: convertToUnit(borderWidth) || '0',
  borderColor,
  objectFit: fit,
}))

const borderRadiusClass = useRoundedClass(rounded)

const hasSources = computed(() => {
  return sources && sources.length > 0
})

useCssVars(() => ({
  'jv-image-aspect-ratio': aspectRatio,
  'jv-image-border-style': borderStyle || 'none',
  'jv-image-border-width': convertToUnit(borderWidth) || '0',
  'jv-image-border-color': borderColor || 'var(--jv-theme-outline-variant)',
  'jv-image-object-fit': fit || 'fill',
}))
</script>

<template>
  <!-- 使用 picture 标签实现响应式图片 -->
  <picture class="jv-image" :class="[borderRadiusClass, uniqueClass, fit ? bem.m(`fit-${fit}`) : '']">
    <!-- 自定义 sources 元素 -->
    <template v-if="hasSources">
      <source
        v-for="source in sources" :key="source.src" :srcset="source.srcset" :type="source.type"
        :media="source.media" :width="source.width" :height="source.height"
      >
    </template>

    <!-- 支持多种图片格式的source源 -->
    <slot />
    <!-- 默认图片 -->
    <img
      v-show="!isHidden" ref="imgRef" :class="bem.e('img')" :src="lazy ? (loadingImg || '') : currentSrc"
      v-bind="$attrs" role="img" :title="alt" :alt="alt" :aria-label="alt" @load="handleLoad"
      @error="handleError"
    >

    <!-- 图片加载中 -->
    <div v-if="isLoading && !loadingImg" :class="bem.e('loading')">
      <slot name="loading">
        <JvLoader />
      </slot>
    </div>
    <!-- 图片加载错误 -->
    <span v-if="isError && !errorImg" :class="bem.e('error')">
      <slot name="error">
        <JvIcon name="error" />
      </slot>
    </span>
    <!-- 覆盖层 -->
    <JvOverlay v-if="$slots.overlay" class="jv-image__placeholder" target="parent">
      <slot name="overlay" />
    </JvOverlay>
  </picture>
</template>

<style lang="scss" scoped>
@include b(image) {
  --jv-image-object-fit: fill;
  --jv-image-border-radius: 0;
  --jv-image-border-style: none;
  --jv-image-aspect-ratio: auto;
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  aspect-ratio: var(--jv-image-aspect-ratio);

  //   消除图片的底线
  line-height: 0;

  @include e(img) {
    display: block;
    width: 100%;
    border-style: var(--jv-image-border-style);
    border-radius: var(--jv-image-border-radius);
    object-fit: var(--jv-image-object-fit);
    aspect-ratio: var(--jv-image-aspect-ratio);
  }

  @include m(fit-cover) {
    --jv-image-object-fit: cover;
  }

  @include m(fit-contain) {
    --jv-image-object-fit: contain;
  }

  @include m(fit-fill) {
    --jv-image-object-fit: fill;
  }

  @include m(fit-none) {
    --jv-image-object-fit: none;
  }

  @include m(fit-scale-down) {
    --jv-image-object-fit: scale-down;
  }

  @include m(round) {
    --jv-image-border-radius: 50%;
  }

  &__loading,
  &__error {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--jv-theme-on-surface);
  }

  @include e(loading-icon) {
    width: 24px;
    height: 24px;
    border: 2px solid var(--jv-theme-primary);
    border-radius: 50%;
    border-bottom-color: transparent;
    animation: jv-image-rotate 1s linear infinite;
  }

  @include e(error-icon) {
    position: relative;
    width: 24px;
    height: 24px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background-color: var(--jv-theme-danger);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  @keyframes jv-image-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
