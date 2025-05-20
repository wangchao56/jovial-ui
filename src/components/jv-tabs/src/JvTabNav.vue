<script setup lang="ts">
import type { JvTabNavProps, JvTabsContext, TabNavItem } from './types'
import { computed, inject, onMounted, onUpdated, ref, watch } from 'vue'
import JvTabNavItem from './JvTabNavItem.vue'
import { bem, JvTabsContextKey } from './types'

defineOptions({ name: 'JvTabNav', inheritAttrs: false })

const props = withDefaults(
  defineProps<JvTabNavPropsWithItems>(),
  {
    sliderPosition: 'bottom',
    sliderVisible: true,
    scrollable: true,
    items: () => [],
  },
)

interface JvTabNavPropsWithItems extends JvTabNavProps {
  /**
   * 标签数据项数组，用于自动生成标签
   */
  items?: TabNavItem[]
}

// 获取父组件提供的上下文
const tabs = inject(JvTabsContextKey, null) as JvTabsContext

// 滑块样式
const sliderStyle = ref({})
const navRef = ref<HTMLElement | null>(null)
const navItems = ref<HTMLElement[]>([])

// 更新滑块位置
function updateSlider() {
  if (!props.sliderVisible || !navRef.value)
    return

  const activeItem = navItems.value.find((item) => {
    return item.getAttribute('data-value') === String(tabs.activeTab.value)
  })

  if (!activeItem)
    return

  const isVertical = tabs.vertical.value
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeItem

  if (isVertical) {
    sliderStyle.value = {
      height: `${offsetHeight}px`,
      transform: `translateY(${offsetTop}px)`,
      [props.sliderPosition === 'left' ? 'left' : 'right']: '0',
    }
  }
  else {
    sliderStyle.value = {
      width: `${offsetWidth}px`,
      transform: `translateX(${offsetLeft}px)`,
      [props.sliderPosition === 'top' ? 'top' : 'bottom']: '0',
    }
  }
}

// 监听activeTab变化，更新滑块位置
watch(() => tabs.activeTab.value, updateSlider)

// 监听items变化，更新滑块位置
watch(() => props.items, updateSlider, { deep: true })

// 在组件挂载和更新后更新滑块位置
onMounted(() => {
  navItems.value = Array.from(navRef.value?.querySelectorAll('.jv-tabs-nav__item') || [])
  updateSlider()
})

onUpdated(() => {
  navItems.value = Array.from(navRef.value?.querySelectorAll('.jv-tabs-nav__item') || [])
  updateSlider()
})

// 计算导航栏样式类
const navClass = computed(() => [
  `${bem.b()}-nav`,
  {
    [`${bem.b()}-nav--${tabs.variant.value}`]: tabs.variant.value,
    [`${bem.b()}-nav--${tabs.color.value}`]: tabs.color.value,
    [`${bem.b()}-nav--vertical`]: tabs.vertical.value,
    [`${bem.b()}-nav--scrollable`]: props.scrollable,
  },
])

// 计算滑块样式类
const sliderClass = computed(() => [
  `${bem.b()}-nav__slider`,
  `${bem.b()}-nav__slider--${props.sliderPosition}`,
])

// // 点击标签处理函数
// function handleClick(params: {
//   offsetLeft: number
//   offsetTop: number
//   offsetWidth: number
//   offsetHeight: number
// }) {
//   console.log(params)
// }
</script>

<template>
  <div ref="navRef" :class="navClass">
    <div class="jv-tabs-nav__list">
      <JvTabNavItem
        v-for="item in items" :key="item.value" :value="item.value" :disabled="item.disabled"
        :icon="item.icon" :badge="item.badge"
      >
        {{ item.label }}
      </JvTabNavItem>
      <div v-if="sliderVisible" :class="sliderClass" :style="sliderStyle" />
    </div>
  </div>
</template>

<style lang="scss">
@include b(tabs) {
  &-nav {
    position: relative;
    display: flex;
    overflow: hidden;

    &__list {
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
    }

    &__slider {
      position: absolute;
      z-index: 0;
      background-color: var(--jv-primary);
      transition: all 0.3s ease;

      &--top {
        height: 2px;
      }

      &--bottom {
        height: 2px;
      }

      &--left {
        width: 2px;
      }

      &--right {
        width: 2px;
      }
    }

    &--scrollable {
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &--vertical {
      flex-direction: column;

      .jv-tabs-nav__list {
        flex-direction: column;
      }
    }
  }
}
</style>
