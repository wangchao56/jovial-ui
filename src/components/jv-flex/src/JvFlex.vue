<script setup lang="ts">
import type { JvFlexProps } from './types'
import { computed } from 'vue'
import { convertToUnit } from '@/utils'
import { bem, JVFLEX_NAME } from './types'

defineOptions({ name: JVFLEX_NAME, inheritAttrs: true })
const props = withDefaults(defineProps<JvFlexProps>(), {
  direction: 'horizontal',
  justify: 'start',
  align: 'start',
  wrap: false,
  contentAlign: 'start',
  gap: 0,
})

const gap = computed(() => {
  if (Array.isArray(props.gap)) {
    return props.gap.map(item => convertToUnit(item)).join(' ')
  }
  return convertToUnit(props.gap)
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('wrap', wrap),
      bem.is('reverse', reverse),
      bem.is('inline', inline),
      bem.m(direction),
      justify && bem.m(`justify-${justify}`),
      align && bem.m(`align-${align}`),
      contentAlign && bem.m(`content-${contentAlign}`),
    ]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme/styles/flex' as *;

@include b(flex) {
  display: flex;
  align-items: baseline;
  gap: v-bind(gap);
  box-sizing: border-box;
  min-width: fit-content;

  // 动画过渡
  transition: all 0.3s ease;

  @include m(horizontal) {
    flex-direction: row;
  }

  @include m(vertical) {
    flex-direction: column;
  }

  // 主轴对齐
  @include m(justify-start) {
    justify-content: flex-start;
  }

  @include m(justify-end) {
    justify-content: flex-end;
  }

  @include m(justify-center) {
    justify-content: center;
  }

  @include m(justify-between) {
    justify-content: space-between;
  }

  @include m(justify-around) {
    justify-content: space-around;
  }

  @include m(justify-evenly) {
    justify-content: space-evenly;
  }

  @include m(justify-left) {
    justify-content: left;
  }

  @include m(justify-right) {
    justify-content: right;
  }

  // 交叉轴对齐
  @include m(align-start) {
    align-items: flex-start;
  }

  @include m(align-end) {
    align-items: flex-end;
  }

  @include m(align-center) {
    align-items: center;
  }

  @include m(align-baseline) {
    align-items: baseline;
  }

  @include m(align-stretch) {
    align-items: stretch;
  }

  // 内容对齐（多行）
  @include m(content-start) {
    align-content: flex-start;
  }

  @include m(content-end) {
    align-content: flex-end;
  }

  @include m(content-center) {
    align-content: center;
  }

  @include m(content-between) {
    align-content: space-between;
  }

  @include m(content-around) {
    align-content: space-around;
  }

  @include m(content-stretch) {
    align-content: stretch;
  }

  // 其他属性
  @include when(wrap) {
    flex-wrap: wrap;
  }

  @include when(inline) {
    display: inline-flex;
  }

  @include when(reverse) {
    &.jv-flex--row {
      flex-direction: row-reverse;
    }

    &.jv-flex--column {
      flex-direction: column-reverse;
    }
  }
}
</style>
