<script setup lang="ts">
import type { JvLoaderProps } from './types'
import { createNamespace } from '@/utils'
import JvOverlay from '@components/jv-overlay/src/JvOverlay.vue'
import { computed, onMounted, ref, useSlots } from 'vue'
import JvCircleLoader from './JvCircleLoader.vue'
import JvLineLoader from './JvLineLoader.vue'
import { JVLOADER_NAME } from './types'

defineOptions({
  name: JVLOADER_NAME,
})

const props = withDefaults(defineProps<JvLoaderProps>(), {
  loading: false,
  size: 'medium',
  color: 'primary',
  target: 'parent',
  placement: 'center',
})

const bem = createNamespace(JVLOADER_NAME)
const visible = computed(() => props.loading)
const slots = useSlots()
// 判断目标容器是否为视口
const isViewport = computed(() => !slots.default?.())

// 获取正确的Teleport目标
const teleportTarget = computed(() => {
  if (isViewport.value) {
    return 'viewport' // 使用body作为默认目标而不是'viewport'
  }
  return 'parent'
})

// 确保body已经存在
const bodyExists = ref(false)
onMounted(() => {
  bodyExists.value = true
})
</script>

<template>
  <template v-if="visible && bodyExists">
    <JvOverlay v-model="visible" :target="teleportTarget" :show-mask="false">
      <template #default="{ style }">
        <div :style="style" :class="[bem.b(), bem.m(teleportTarget), bem.m(placement)]">
          <JvCircleLoader v-if="placement === 'center'" :size="size" :color="color" :class="bem.e('circle')" />
          <JvLineLoader v-else :color="color" :class="bem.e('line')" />
        </div>
      </template>
    </JvOverlay>
  </template>
</template>

<style lang="scss" scoped>
@include b(loader) {
  --jv-loader-height: 16px;
  position: relative;
  height: fit-content;
  backdrop-filter: blur(10px);

  @include e(circle) {
    position: relative;
  }

  @include e(line) {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  //   全局加载器
  @include m(viewport) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    width: 100vw;
    max-height: 16px;
  }

  @include m(parent) {
    position: fixed;
    inset: 0;
    z-index: 3000;
    background-color: rgb(255 255 255 / 0.9);
  }
}
</style>
