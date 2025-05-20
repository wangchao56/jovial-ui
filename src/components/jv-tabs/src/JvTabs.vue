<script setup lang="ts">
import type { JvTabPanelProps, JvTabsEmits, JvTabsProps, TabNavItem } from './types'
import { computed, provide, ref, watch } from 'vue'
import JvTabNav from './JvTabNav.vue'
import JvTabPanel from './JvTabPanel.vue'
import { bem, JVTABS_NAME, JvTabsContextKey } from './types'

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

// _tabPanel的集合
const tabPanels = ref<JvTabPanelProps[]>([])
//  子元素props集合
const childProps = ref<TabNavItem[]>(props.items)

// 更新tabs
function updateTabs(tabs: JvTabPanelProps[]) {
  tabPanels.value = tabs
}

// 添加tabPanel
function addTabPanel(tabPanel: JvTabPanelProps) {
  // 检查是否已存在
  const exists = tabPanels.value.some(item => item.value === tabPanel.value)
  if (!exists) {
    tabPanels.value.push(tabPanel)
  }
}

// 移除tabPanel
function removeTabPanel(tabPanel: JvTabPanelProps) {
  const index = tabPanels.value.findIndex(item => item.value === tabPanel.value)
  if (index !== -1) {
    tabPanels.value.splice(index, 1)
  }
}

watch(() => props.items, (newItems) => {
  if (newItems) {
    childProps.value = newItems
  }
})

// 更新navItem的offset
function updateNavItemOffset(_offset: {
  offsetLeft: number
  offsetTop: number
  offsetWidth: number
  offsetHeight: number
}) {
}

// 提供给子组件的上下文
provide(JvTabsContextKey, {
  activeTab,
  updateActiveTab,
  variant: computed(() => props.variant),
  color: computed(() => props.color),
  vertical: computed(() => props.vertical),
  direction: computed(() => props.vertical ? 'vertical' : 'horizontal'),
  labelPosition: computed(() => props.vertical ? 'left' : 'top'),
  updateTabs,
  addTabPanel,
  removeTabPanel,
  updateNavItemOffset,
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

// 获取当前激活的tabPanel
// const currentTabPanel = computed(() => {
//   return tabPanels.value.find(tabPanel => tabPanel.value === activeTab.value) || tabPanels.value[0]
// })

// 获取所有的slots中默认插槽的JvTabPanel的props
// const slots = useSlots()
// 获取所有的slots中默认插槽的JvTabPanel的props
// const tabPanelProps = computed(() => {
//   const result: JvTabPanelProps[] = []

//   // 获取所有的slots中默认插槽的JvTabPanel的props
//   const childNodes = slots.default?.()
//   if (!childNodes) {
//     return result
//   }

//   (childNodes || []).forEach((vnode) => {
//     if (isVNode(vnode) && isComponentByName(vnode, 'JvTabPanel')) {
//       result.push(vnode.props as JvTabPanelProps)
//     }
//   })

//   return result
// })
</script>

<template>
  <div :class="tabsClass" role="tablist" :aria-orientation="vertical ? 'vertical' : 'horizontal'">
    <JvTabNav v-if="hasItems" :items="childProps" />
    <div v-else>
      <slot name="nav">
        <JvTabNav
          :items="tabPanels.map(panel => ({
            value: panel.value ?? '',
            label: panel.name || String(panel.value ?? ''),
            active: panel.value === activeTab,
          }))"
        />
      </slot>
    </div>

    <div class="jv-tabs__content">
      <template v-if="hasItems">
        <JvTabPanel
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :name="item.label"
          :lazy="lazy"
        >
          <div v-if="typeof item.content === 'function'">
            {{ item.content() }}
          </div>
          <div v-else>
            {{ item.content }}
          </div>
        </JvTabPanel>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@include b(tabs) {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__content {
    overflow: hidden;
    flex: 1;
  }

  &--vertical {
    flex-direction: row;
  }

  &--grow {
    .jv-tabs-nav__item {
      flex-grow: 1;
    }
  }

  &--align-start {
    .jv-tabs-nav__list {
      justify-content: flex-start;
    }
  }

  &--align-center {
    .jv-tabs-nav__list {
      justify-content: center;
    }
  }

  &--align-end {
    .jv-tabs-nav__list {
      justify-content: flex-end;
    }
  }

  &--align-stretch {
    .jv-tabs-nav__list {
      justify-content: stretch;
    }
  }

  &--animated {
    .jv-tabs-panel {
      transition:
        opacity 0.3s,
        transform 0.3s;
    }
  }
}
</style>
