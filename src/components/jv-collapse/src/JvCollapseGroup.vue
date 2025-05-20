<script setup lang="ts">
import type { CollapseGroupContext, JvCollapseGroupProps } from './types'
import { provide, ref, watch } from 'vue'
import { bemGroup, collapseGroupInjectionKey, JVCOLLAPSEGROUP_NAME } from './types'

defineOptions({ name: JVCOLLAPSEGROUP_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvCollapseGroupProps>(), {
  accordion: false,
  modelValue: () => [],
  variant: 'elevated',
  divider: false,
  rounded: false,
  elevated: true,
  size: 'medium',
})

// 使用emit来抛出事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}>()

// 当前展开的折叠面板的name列表
const internalExpandedItems = ref<string[]>(props.modelValue || [])

// 当modelValue变化时，更新内部状态
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== internalExpandedItems.value) {
      internalExpandedItems.value = newVal
    }
  },
)

// 处理折叠面板的切换
function handleItemToggle(name: string, expanded: boolean) {
  const index = internalExpandedItems.value.indexOf(name)
  // 如果是手风琴模式，切换时要关闭其他已展开的面板
  if (props.accordion && expanded) {
    internalExpandedItems.value = [name]
  }
  else {
    // 非手风琴模式下，只切换当前面板的状态
    if (expanded && index === -1) {
      internalExpandedItems.value.push(name)
    }
    else if (!expanded && index !== -1) {
      internalExpandedItems.value.splice(index, 1)
    }
  }

  // 抛出事件通知父组件
  emit('update:modelValue', internalExpandedItems.value)
  emit('change', internalExpandedItems.value)
}

// 提供上下文给子组件
provide<CollapseGroupContext>(collapseGroupInjectionKey, {
  accordion: props.accordion,
  expandedItems: internalExpandedItems,
  handleItemToggle,
  size: props.size,
  variant: props.variant,
})

// 计算容器类名
const containerClasses = [
  bemGroup.b(),
  bemGroup.m(`variant-${props.variant}`),
  props.divider && bemGroup.m('with-divider'),
  props.rounded && bemGroup.m('rounded'),
  props.elevated && bemGroup.m('elevated'),
  bemGroup.m(`size-${props.size}`),
]
</script>

<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@include b(collapse-group) {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: max-content;

  // 组件变体
  @include m(variant-default) {
    // 默认样式
  }

  @include m(variant-outlined) {
    border: 1px solid var(--jv-theme-border, rgb(0 0 0 / 0.12));
  }

  // 特性修饰符
  @include m(with-divider) {
    .jv-collapse:not(:last-child) {
      border-bottom: 1px solid var(--jv-theme-border, rgb(0 0 0 / 0.12));
    }
  }

  @include m(rounded) {
    overflow: hidden;
    border-radius: var(--jv-rounded, 4px);
  }

  @include m(elevated) {
    box-shadow: var(--jv-elevation-2);
  }

  // 移除冲突样式
  :deep(.jv-collapse) {
    width: 100%;
    min-width: unset; // 覆盖子组件的最小宽度
    margin: 0; // 确保没有外边距
    border-radius: 0; // 移除子组件的圆角
    border-bottom: 1px solid var(--jv-theme-border, rgb(0 0 0 / 0.12));
    box-shadow: none; // 移除子组件的阴影
  }

  // 让第一个和最后一个子元素拥有合适的圆角
  @include m(rounded) {
    :deep(.jv-collapse:first-child) {
      border-top-left-radius: var(--jv-rounded, 4px);
      border-top-right-radius: var(--jv-rounded, 4px);
    }

    :deep(.jv-collapse:last-child) {
      border-bottom-left-radius: var(--jv-rounded, 4px);
      border-bottom-right-radius: var(--jv-rounded, 4px);
    }
  }
}
</style>
