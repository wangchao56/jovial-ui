<script setup lang="ts">
import type { JvTabNavProps, TabNavItem } from './types'
import { computed, inject, onMounted, onUpdated, ref, watch } from 'vue'
import JvTab from './JvTab.vue'
import { bem } from './types'

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
const tabs = inject('tabs', {
  activeTab: ref(''),
  updateActiveTab: () => {},
  variant: computed(() => 'default'),
  color: computed(() => 'primary'),
  vertical: computed(() => false),
})

// 滑块样式
const sliderStyle = ref({})
const navRef = ref<HTMLElement | null>(null)
const navItems = ref<HTMLElement[]>([])

// 更新滑块位置
function updateSlider() {
  if (!props.sliderVisible || !navRef.value)
    return

  const activeItem = navItems.value.find((item) => {
    return item.getAttribute('data-value') === tabs.activeTab.value
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
  navItems.value = Array.from(navRef.value?.querySelectorAll('.jv-tab-nav__item') || [])
  updateSlider()
})

onUpdated(() => {
  navItems.value = Array.from(navRef.value?.querySelectorAll('.jv-tab-nav__item') || [])
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

// 判断是否有数据项或插槽内容
const hasItems = computed(() => props.items && props.items.length > 0)
</script>

<template>
  <div ref="navRef" :class="navClass">
    <div class="jv-tab-nav__list">
      <!-- 自动生成的标签 -->
      <template v-if="hasItems">
        <JvTab
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          :icon="item.icon"
        >
          {{ item.label }}
        </JvTab>
      </template>
      <!-- 插槽内容 -->
      <slot v-else />
    </div>
    <div
      v-if="sliderVisible"
      :class="sliderClass"
      :style="sliderStyle"
    />
  </div>
</template>

<style lang="scss" scoped>
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
    }

    &__slider {
      position: absolute;
      z-index: 0;
      background-color: var(--jv-theme-primary);
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

      .jv-tab-nav__list {
        flex-direction: column;
      }
    }
  }
}
</style>
