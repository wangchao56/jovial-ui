<script setup lang="ts">
import type { JvTabsEmits, JvTabsProps } from './types'
import { computed, isVNode, provide, ref, useSlots, watch } from 'vue'
import JvTabNav from './JvTabNav.vue'
import JvTabPanel from './JvTabPanel.vue'
import { bem, JVTABS_NAME } from './types'
import { isComponentByName } from './utils'

defineOptions({ name: JVTABS_NAME, inheritAttrs: false })

const props = withDefaults(
  defineProps<JvTabsProps>(),
  {
    variant: 'default',
    color: 'primary',
    alignTabs: 'start',
    grow: false,
    vertical: false,
    animated: true,
    items: () => [],
    lazy: false,
  },
)

const emit = defineEmits<JvTabsEmits>()

// 确保activeTab始终有值
const activeTab = ref<string | number>(props.modelValue ?? '')

// 监听modelValue变化
watch(
  () => props.modelValue,
  (val) => {
    if (val !== activeTab.value) {
      activeTab.value = val ?? ''
    }
  },
)

// 计算组件样式类
const tabsClass = computed(() => [
  bem.b(),
  bem.m(props.variant),
  bem.m(props.color),
  bem.m(`align-${props.alignTabs}`),
  {
    [bem.m('grow')]: props.grow,
    [bem.m('vertical')]: props.vertical,
    [bem.m('animated')]: props.animated,
  },
])

// 更新当前激活的标签
function updateActiveTab(value: string | number) {
  const oldValue = activeTab.value
  activeTab.value = value
  emit('update:modelValue', value)
  emit('change', value, oldValue)
}

// 提供给子组件的上下文
provide('tabs', {
  activeTab,
  updateActiveTab,
  variant: computed(() => props.variant),
  color: computed(() => props.color),
  vertical: computed(() => props.vertical),
})

// 判断是否使用数据生成模式
const hasItems = computed(() => props.items && props.items.length > 0)

// 暴露方法
defineExpose({
  focus: () => {
    // 实现获取焦点的逻辑
    const tabsElement = document.querySelector(`.${bem.b()}`)
    if (tabsElement) {
      const firstFocusable = tabsElement.querySelector('button, [tabindex="0"]') as HTMLElement
      firstFocusable?.focus()
    }
  },
})

// 获取所有的slots中默认插槽的JvTabPanel的props
const slots = useSlots()
const _tabPanelProps = computed<any[]>(() => {
  const result: any[] = []

  // 获取所有的slots中默认插槽的JvTabPanel的props
  const childNodes = slots.default?.()
  if (!childNodes) {
    return result
  }

  (childNodes || []).forEach((vnode) => {
    if (isVNode(vnode) && isComponentByName(vnode, 'JvTabPanel')) {
      result.push(vnode.props)
    }
  })

  return result
})
</script>

<template>
  <div :class="tabsClass">
    <!-- 数据生成模式 -->
    <template v-if="hasItems">
      <JvTabNav :model-value="activeTab" :items="items" />

      <JvTabPanel v-for="item in items" :key="item.value" :value="item.value" :lazy="lazy">
        <template v-if="typeof item.content === 'function'">
          <component :is="item.content" />
        </template>
        <template v-else>
          {{ item.content }}
        </template>
      </JvTabPanel>
    </template>

    <!-- 默认插槽模式 -->
    <slot v-else />
  </div>
</template>

<style lang="scss">
@include b(tabs) {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--vertical {
    flex-direction: row;
  }

  &--grow {
    .jv-tab-nav__item {
      flex-grow: 1;
    }
  }

  &--align-start {
    .jv-tab-nav__list {
      justify-content: flex-start;
    }
  }

  &--align-center {
    .jv-tab-nav__list {
      justify-content: center;
    }
  }

  &--align-end {
    .jv-tab-nav__list {
      justify-content: flex-end;
    }
  }

  &--align-stretch {
    .jv-tab-nav__list {
      justify-content: stretch;
    }
  }
}
</style>
