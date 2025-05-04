<script setup lang="ts">
import type { JvSpaceProps } from './types'
import { convertToUnit } from '@/utils'
import { computed } from 'vue'
import { bem, JVSPACE_NAME } from './types'

defineOptions({ name: JVSPACE_NAME, inheritAttrs: false })

// 使用Vue 3.5的直接解构props特性
const {
  gap = 8,
  direction = 'horizontal',
  align,
  justify,
  wrap = false,
  fill = false,
  // 添加可访问性相关属性
  role = 'group',
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby
} = defineProps<JvSpaceProps>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 计算样式
const spaceStyle = computed(() => {
  const style: Record<string, any> = {
    columnGap: 0,
    rowGap: 0
  }
  const [horizontalGap, verticalGap] = Array.isArray(gap) ? gap : [gap, gap]
  style.columnGap =
    typeof horizontalGap === 'number'
      ? convertToUnit(horizontalGap)
      : horizontalGap
  style.rowGap =
    typeof verticalGap === 'number' ? convertToUnit(verticalGap) : verticalGap
  return style
})

// 获取ARIA角色
const computedRole = computed(() => {
  // 如果设置了role="none"，则不使用role属性
  return role === 'none' ? undefined : role
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      align && bem.m(`align-${align}`),
      justify && bem.m(`justify-${justify}`),
      fill && bem.m('fill'),
      wrap && bem.m('wrap')
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
.jv-space {
  display: flex;
  flex: 1 0 0;
  gap: v-bind('spaceStyle.rowGap') v-bind('spaceStyle.columnGap');

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--fill {
    width: 100%;
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }

  &--align-baseline {
    align-items: baseline;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-between {
    justify-content: space-between;
  }
}
</style>
