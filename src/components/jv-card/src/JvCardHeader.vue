<script setup lang="ts">
import type { JvAvatarProps } from '@/components/jv-avatar/src/types'
import type { JvIconProps } from '@/components/jv-icon/src/types'
import type { JvParagraphProps, JvTextProps, JvTitleProps } from '@/components/jv-typography/src/types'
import type { JvCardHeaderProps, JvCardHeaderSlots } from './types'
import JvAvatar from '@/components/jv-avatar/src/JvAvatar.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import JvImage from '@/components/jv-image/src/JvImage.vue'
import { useStringOrObjectProps } from '@/hooks/useStringOrObjectProps'
import { isString } from '@/utils'
import JvParagraph from '@components/jv-typography/src/JvParagraph.vue'
import JvText from '@components/jv-typography/src/JvText.vue'
import JvTitle from '@components/jv-typography/src/JvTitle.vue'
import { computed } from 'vue'
import { bem, JVCARDHEADER_NAME } from './types'

defineOptions({ name: JVCARDHEADER_NAME, inheritAttrs: false })

// 使用解构写法定义props
const props = withDefaults(defineProps<JvCardHeaderProps>(), {
  divider: false,
  variant: 'flat',
})

defineSlots<JvCardHeaderSlots>()

const { title, subtitle, description, icon, avatar, divider, image, variant } = props

const iconProps = useStringOrObjectProps<JvIconProps>(icon, 'name')
const titleProps = useStringOrObjectProps<JvTitleProps>(title)
const subtitleProps = useStringOrObjectProps<JvTextProps>(subtitle)
const descriptionProps = useStringOrObjectProps<JvParagraphProps>(description)
const avatarProps = useStringOrObjectProps<JvAvatarProps>(avatar, 'image')

const imageProps = computed(() => {
  if (isString(image)) {
    return { src: image, width: 40, height: 40 }
  }
  return image
})
</script>

<template>
  <div
    v-if="title || subtitle || description || $slots.title || $slots.subtitle || $slots.description || $slots.prepend || $slots.append || icon || avatar"
    :class="[bem.e('header'), { 'has-divider': divider }, bem.em('header', `variant-${variant}`)]"
  >
    <div v-if="avatar || icon || image || $slots.prepend" :class="bem.e('header__prepend')">
      <slot name="prepend">
        <JvAvatar v-if="avatarProps" v-bind="avatarProps" />
        <JvIcon v-if="iconProps" v-bind="iconProps" />
        <JvImage v-if="imageProps" v-bind="imageProps" />
      </slot>
    </div>
    <div :class="bem.e('header__content')">
      <div v-if="title || $slots.title" :class="bem.e('header__title')">
        <JvTitle :level="4" v-bind="titleProps">
          <slot name="title">
            {{ title }}
          </slot>
        </JvTitle>
      </div>
      <div v-if="subtitle || $slots.subtitle" :class="bem.e('header__subtitle')">
        <JvText secondary v-bind="subtitleProps">
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </JvText>
      </div>
      <div v-if="description || $slots.description" :class="bem.e('header__description')">
        <slot name="description">
          <JvParagraph v-bind="descriptionProps">
            {{ description }}
          </JvParagraph>
        </slot>
      </div>
    </div>
    <div v-if="$slots.append" :class="bem.e('header__append')">
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
  hyphens: auto;
  letter-spacing: 0.0125em;
}

@include b(card__header) {
  --jv-card-header-padding: 16px;
  --jv-card-header-color: var(--jv-theme-on-surface);
  --jv-card-header-background: var(--jv-theme-surface);
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: var(--jv-card-header-padding);
  grid-area: header;

  &.has-divider {
    border-bottom: 1px solid var(--jv-theme-outline-variant);
  }

  @include e(prepend) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    align-self: stretch;
  }

  @include e(append) {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  @include e(content) {
    flex: 1;
    min-width: 0;
    align-self: stretch;
  }

  @include e(title) {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
  }

  @include e(subtitle) {
    @include text-overflow-ellipsis;
    color: rgb(0 0 0 / 0.7);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  @include e(description) {
    max-width: 100%;
    margin-top: 8px;
    color: rgb(0 0 0 / 0.6);
    font-size: 14px;
    line-height: 1.5;
    overflow-wrap: break-word;
    word-break: break-all;
  }

  // 变体
  @include m(variant-elevated) {
    box-shadow: var(--jv-elevation-2);
  }

  @include m(variant-outlined) {
    border: thin solid #e0e0e0;
    background: transparent;
  }

  @include m(variant-tonal) {
    // 文字颜色的低透明度模式
    background-color: color-mix(in srgb, var(--jv-card-header-background), var(--jv-theme-on-surface) 10%);
  }

  @include m(variant-flat) {
    box-shadow: none;
  }
}
</style>
