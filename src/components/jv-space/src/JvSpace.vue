<script setup lang="ts">
import type { JvSpaceProps } from './types'
import { computed, useCssVars } from 'vue'
import { convertToUnit } from '@/utils'
import { bem, JVSPACE_NAME } from './types'

defineOptions({ name: JVSPACE_NAME, inheritAttrs: false })

// 使用Vue 3.5的直接解构props特性
const {
  gap = 8,
  direction = 'horizontal',
  align = 'start',
  justify,
  wrap = false,
  fill = false,
  // 添加可访问性相关属性
  role = 'group',
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
} = defineProps<JvSpaceProps>()

// 获取ARIA角色
const computedRole = computed(() => {
  // 如果设置了role="none"，则不使用role属性
  return role === 'none' ? undefined : role
})
useCssVars(() => {
  const innerGap = Array.isArray(gap) ? gap : [gap, gap]
  return {
    'jv-space-column-gap': convertToUnit(innerGap[0]),
    'jv-space-row-gap': convertToUnit(innerGap[1]),
  }
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      { [bem.m(`align-${align}`)]: align },
      justify && bem.m(`justify-${justify}`),
      fill && bem.m('fill'),
      wrap && bem.m('wrap'),
    ]"
    :role="computedRole"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby"
    :aria-orientation="direction"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@include b(space) {
  --jv-space-column-gap: 8px;
  --jv-space-row-gap: 8px;
  display: flex;
  flex: 1 0 0;
  align-items: flex-start;
  gap: var(--jv-space-row-gap) var(--jv-space-column-gap);

  @include m(horizontal) {
    flex-direction: row;
  }

  @include m(vertical) {
    flex-direction: column;
    align-items: flex-start;
  }

  @include m(wrap) {
    flex-wrap: wrap;
  }

  @include m(fill) {
    width: 100%;
  }

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

  @include m(justify-start) {
    justify-content: flex-start;
  }

  @include m(justify-end) {
    justify-content: flex-end;
  }

  @include m(justify-center) {
    justify-content: center;
  }

  @include m(justify-space-around) {
    justify-content: space-around;
  }

  @include m(justify-space-between) {
    justify-content: space-between;
  }
}
</style>
