<script setup lang="ts">
import type { JvCardMediaProps } from './types'
import { computed } from 'vue'
import JvImage from '@/components/jv-image/src/JvImage.vue'
import { convertToUnit, isString } from '@/utils'
import { bem, JVCARDMEDIA_NAME } from './types'

defineOptions({ name: JVCARDMEDIA_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardMediaProps>(), {
  objectFit: 'cover',
  aspectRatio: '16 / 9',
  divider: false,
})

const { height, width, objectFit, aspectRatio, divider, image } = props

const mediaStyles = computed(() => {
  const styles: Record<string, any> = {
    objectFit,
  }

  if (height) {
    styles.height = convertToUnit(height)
  }

  if (width) {
    styles.width = convertToUnit(width)
  }

  if (aspectRatio) {
    styles['--jv-card-media-aspect-ratio'] = aspectRatio
  }

  return styles
})

const mediaClasses = computed(() => {
  return [
    bem.e('media'),
    bem.is('divider', divider),
    bem.em('media', objectFit),
  ]
})

const imageProps = computed(() => {
  if (isString(image)) {
    return {
      src: image,
      width,
      height,
      fit: objectFit,
      aspectRatio,
    }
  }
  return image
})

// 图片是否有效
const hasValidImage = computed(() => Boolean(image))

// 公开方法
defineExpose({
  hasValidImage,
})
</script>

<template>
  <div :class="mediaClasses" :style="mediaStyles">
    <slot>
      <JvImage v-if="hasValidImage" v-bind="imageProps" class="jv-card__media-image" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.jv-card__media {
  --jv-card-media-aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: auto;
  grid-area: media;

  img,
  video,
  .jv-card__media-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  // 填充模式
  &--cover {
    img,
    video,
    .jv-card__media-image {
      object-fit: cover;
    }
  }

  &--contain {
    img,
    video,
    .jv-card__media-image {
      object-fit: contain;
    }
  }

  &--fill {
    img,
    video,
    .jv-card__media-image {
      object-fit: fill;
    }
  }

  &--none {
    img,
    video,
    .jv-card__media-image {
      object-fit: none;
    }
  }

  &--scale-down {
    img,
    video,
    .jv-card__media-image {
      object-fit: scale-down;
    }
  }

  &.is-divider {
    border-bottom: 1px solid var(--jv-theme-outline-variant);
  }
}
</style>
