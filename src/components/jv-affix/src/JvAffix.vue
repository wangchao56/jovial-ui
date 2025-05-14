<script setup lang="ts">
import type { JvAffixEmits, JvAffixExpose, JvAffixProps } from './types'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { JVAFFIX_NAME } from './types'

defineOptions({
  name: JVAFFIX_NAME,
})

const props = withDefaults(defineProps<JvAffixProps>(), {
  zIndex: 100,
  placement: 'top',
})

const emit = defineEmits<JvAffixEmits>()

// refs
const affixRef = ref<HTMLElement | null>(null)
const placeholderRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// 状态
const fixed = ref(false)
const placeholderRect = ref<DOMRect | null>(null)

// 计算样式
const placeholderStyle = computed(() => {
  if (!fixed.value || !placeholderRect.value)
    return {}

  return {
    width: `${placeholderRect.value.width}px`,
    height: `${placeholderRect.value.height}px`,
  }
})

const affixStyle = computed(() => {
  if (!fixed.value)
    return {}

  const style: Record<string, string> = {
    zIndex: String(props.zIndex),
    position: 'fixed',
  }

  if (placeholderRect.value) {
    style.width = `${placeholderRect.value.width}px`
  }

  // 设置位置
  if (props.top !== undefined) {
    style.top = `${props.top}px`
  }

  if (props.bottom !== undefined) {
    style.bottom = `${props.bottom}px`
  }

  if (props.left !== undefined) {
    style.left = `${props.left}px`
  }

  if (props.right !== undefined) {
    style.right = `${props.right}px`
  }

  return style
})

// 获取目标元素
function getTargetElement(): HTMLElement | Window {
  if (!props.target || props.target === 'window') {
    return window
  }

  if (props.target === 'body') {
    return document.body
  }

  return props.target
}

// 更新固钉位置和状态
function updatePosition() {
  if (!affixRef.value || !contentRef.value)
    return

  // 获取元素位置信息
  const targetElement = getTargetElement()
  placeholderRect.value = affixRef.value.getBoundingClientRect()

  // 获取滚动位置
  const scrollTop
    = targetElement instanceof Window
      ? targetElement.scrollY
      : targetElement.scrollTop

  let shouldBeFixed = false

  // 根据placement和对应的偏移值判断是否需要固定
  if (props.placement === 'top' && props.top !== undefined) {
    shouldBeFixed = placeholderRect.value.top <= props.top
  }
  else if (props.placement === 'bottom' && props.bottom !== undefined) {
    const windowHeight = window.innerHeight
    shouldBeFixed = windowHeight - placeholderRect.value.bottom <= props.bottom
  }
  else if (props.placement === 'left' && props.left !== undefined) {
    shouldBeFixed = placeholderRect.value.left <= props.left
  }
  else if (props.placement === 'right' && props.right !== undefined) {
    const windowWidth = window.innerWidth
    shouldBeFixed = windowWidth - placeholderRect.value.right <= props.right
  }

  // 如果固定状态发生变化，触发change事件
  if (fixed.value !== shouldBeFixed) {
    fixed.value = shouldBeFixed
    emit('change', shouldBeFixed)
  }

  // 触发滚动事件
  emit('scroll', new Event('scroll'), { scrollTop, fixed: fixed.value })
}

// 刷新组件
async function refresh() {
  await nextTick()
  updatePosition()
}

// 监听滚动事件
function handleScroll() {
  updatePosition()
}

// 添加滚动监听
function addScrollListener() {
  const targetElement = getTargetElement()
  targetElement.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
}

// 移除滚动监听
function removeScrollListener() {
  const targetElement = getTargetElement()
  targetElement.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
}

// 监听属性变化
watch(
  () => [props.top, props.bottom, props.left, props.right, props.target, props.placement],
  () => {
    refresh()
  },
)

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    addScrollListener()
    updatePosition()
  })
})

onBeforeUnmount(() => {
  removeScrollListener()
})

// 暴露方法
defineExpose<JvAffixExpose>({
  updatePosition,
  refresh,
})
</script>

<template>
  <div ref="affixRef" class="jv-affix" :class="{ 'is-fixed': fixed }">
    <div
      ref="placeholderRef"
      :style="placeholderStyle"
    >
      <div
        ref="contentRef"
        :style="affixStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jv-affix {
  &.is-fixed {
    overflow: hidden;
  }
}
</style>
