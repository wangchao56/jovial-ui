<script setup lang="ts">
import LineSvg from '@components/jv-progress/src/LineSvg.vue'
import { bem, JVLOADER_NAME } from './types'

defineOptions({ name: `${JVLOADER_NAME}Line`, inheritAttrs: false })

const props = withDefaults(
  defineProps<Props>(),
  {
    color: '#409eff',
    height: 8,
  },
)

interface Props {
  color?: string
  height?: number
}
</script>

<template>
  <div :class="bem.b('line')" :style="{ height: `${props.height}px` }">
    <LineSvg :color="props.color" :height="props.height" indeterminate />
  </div>
</template>

<style lang="scss" scoped>
@include b(loader-line) {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  width: 100%;

  &__path {
    stroke-linecap: round;
  }
}
</style>
