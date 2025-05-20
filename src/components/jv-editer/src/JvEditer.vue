<script setup lang="ts">
import type { JvEditerEmits, JvEditerProps } from './types'
import { bem, JVEDITER_NAME } from './types'

defineOptions({ name: JVEDITER_NAME, inheritAttrs: false })
defineProps<JvEditerProps>()
defineEmits<JvEditerEmits>()
const content = defineModel<string>('modelValue')
</script>

<template>
  <div :class="bem.b()">
    <slot />
    <!-- 工具区 -->
    <div :class="bem.e('tools')">
      <slot name="tools" />
    </div>
    <!-- 内容编辑区 -->
    <div :class="bem.e('content')">
      <textarea v-model="content" />
    </div>
    <!-- 底部 -->
    <div :class="bem.e('bottom')">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss">
@include b(editer) {
  min-height: 300px;

  @include e(tools) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
