<script setup lang="ts">
import type { JvCollapseGroupEmits, JvCollapseGroupProps } from './types'
import { computed, provide, useCssVars, watch } from 'vue'
import { bemGroup, collapseGroupInjectionKey, JVCOLLAPSEGROUP_NAME } from './types'

defineOptions({ name: JVCOLLAPSEGROUP_NAME, inheritAttrs: false })

const {
  accordion = false,
  variant = 'default',
  divider = true,
  rounded = false,
  elevated = false,
} = defineProps<JvCollapseGroupProps>()

const emit = defineEmits<JvCollapseGroupEmits>()

// 使用shallowRef优化性能
const expandedItems = defineModel<Set<string>>('modelValue', { required: false, default: () => new Set() })

// 监听内部状态变化，更新 modelValue - 使用Array.from缓存优化
watch(expandedItems, (newVal) => {
  const values = Array.from(newVal)
  emit('update:modelValue', values)
  emit('change', values)
}, { deep: true })

// 优化处理逻辑
function handleItemToggle(name: string, expanded: boolean) {
  // 创建新的Set以触发响应式更新
  const newItems = new Set(expandedItems.value)

  if (expanded) {
    // 手风琴模式：只允许一个面板展开
    if (accordion) {
      expandedItems.value = new Set([name])
      return
    }

    // 普通模式：添加到展开列表
    newItems.add(name)
  }
  else {
    // 从展开列表中移除
    newItems.delete(name)
  }

  expandedItems.value = newItems
}

// 提供给子组件的上下文
provide(collapseGroupInjectionKey, {
  accordion,
  expandedItems: computed(() => Array.from(expandedItems.value)),
  handleItemToggle,
})
// 计算组件类名
const groupClasses = computed(() => [
  bemGroup.b(),
  bemGroup.m(`variant-${variant}`),
  elevated && bemGroup.m('elevated'),
  rounded && bemGroup.m('rounded'),
])
// 使用CSS变量控制主题
useCssVars(() => ({
  'jv-collapse-group-border-color': divider ? 'var(--jv-theme-outline, #e0e0e0)' : 'transparent',
  'jv-collapse-group-border-radius': rounded ? 'var(--jv-rounded, 4px)' : '0',
  'jv-collapse-group-box-shadow': elevated ? 'var(--jv-elevation-2)' : 'none',
}))
</script>

<template>
  <div :class="groupClasses">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@include b(collapse-group) {
  --jv-collapse-group-border-color: var(--jv-theme-outline, #e0e0e0);
  --jv-collapse-group-border-radius: 0;
  --jv-collapse-group-box-shadow: none;

  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--jv-collapse-group-border-color);
  border-radius: var(--jv-collapse-group-border-radius);
  box-shadow: var(--jv-collapse-group-box-shadow);
  justify-items: flex-start;

  // 重置内部 Collapse 组件的样式
  :deep(.jv-collapse) {
    min-width: unset;
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: none;

    // 移除最后一个Collapse的边框
    &:last-child {
      border-bottom: none;
    }
  }

  // 内部header样式调整
  :deep(.jv-collapse__header) {
    margin: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--jv-collapse-group-border-color);
  }

  // 最后一个未展开的折叠面板不显示header底部边框
  :deep(.jv-collapse:last-child:not(.jv-collapse--state-expanded) .jv-collapse__header) {
    border-bottom: none;
  }

  // 内容区域样式重置
  :deep(.jv-collapse__content) {
    border-top: none;
  }

  // 变体样式
  @include m(variant-default) {
    --jv-collapse-group-bg: var(--jv-theme-surface);
    background-color: var(--jv-collapse-group-bg);
  }

  @include m(variant-outlined) {
    border: 1px solid var(--jv-collapse-group-border-color);
    box-shadow: none;
  }

  @include m(elevated) {
    box-shadow: var(--jv-collapse-group-box-shadow);
  }

  @include m(rounded) {
    border-radius: var(--jv-collapse-group-border-radius);

    // 第一个和最后一个子元素圆角处理
    :deep(.jv-collapse:first-child .jv-collapse__header) {
      border-top-left-radius: calc(var(--jv-collapse-group-border-radius) - 1px);
      border-top-right-radius: calc(var(--jv-collapse-group-border-radius) - 1px);
    }

    :deep(.jv-collapse:last-child .jv-collapse__content) {
      border-bottom-left-radius: calc(var(--jv-collapse-group-border-radius) - 1px);
      border-bottom-right-radius: calc(var(--jv-collapse-group-border-radius) - 1px);
    }
  }
}
</style>
