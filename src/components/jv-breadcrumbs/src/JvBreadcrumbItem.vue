<script setup lang="ts">
import type { JvBreadcrumbItemProps } from './types'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { itemBem, JVBREADCRUMB_ITEM_NAME } from './types'

defineOptions({ name: JVBREADCRUMB_ITEM_NAME, inheritAttrs: false })

const props = withDefaults(
  defineProps<JvBreadcrumbItemProps>(),
  {
    disabled: false,
    active: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isLink = computed(() => !!props.to && !props.disabled && !props.active)

const elementType = computed(() => {
  return isLink.value ? RouterLink : 'span'
})

const linkProps = computed(() => {
  if (!isLink.value)
    return {}

  return {
    to: props.to,
  }
})

function handleClick(event: MouseEvent) {
  if (props.disabled)
    return

  emit('click', event)
}

const classes = computed(() => [
  itemBem.b(),
  {
    [itemBem.m('active')]: props.active,
    [itemBem.m('disabled')]: props.disabled,
    [itemBem.m('clickable')]: isLink.value,
  },
])
</script>

<template>
  <li :class="classes">
    <component
      :is="elementType"
      v-bind="linkProps"
      :class="itemBem.e('content')"
      @click="handleClick"
    >
      <slot v-if="$slots.icon" name="icon">
        <!-- 自定义图标插槽 -->
      </slot>
      <i v-else-if="icon" class="jv-icon" :class="[`jv-icon-${icon}`, itemBem.e('icon')]" />
      <slot v-if="$slots.default">
        {{ text }}
      </slot>
      <span v-else>{{ text }}</span>
    </component>
  </li>
</template>

<style lang="scss">
@include b(breadcrumb-item) {
  display: inline-flex;
  align-items: center;
  color: var(--jv-breadcrumb-color, #606266);
  font-size: var(--jv-breadcrumb-font-size, 14px);
  transition: color 0.2s ease;

  @include e(content) {
    display: flex;
    align-items: center;
  }

  @include e(icon) {
    margin-right: 4px;
    font-size: 14px;
  }

  @include m(clickable) {
    color: var(--jv-breadcrumb-link-color, #409eff);
    cursor: pointer;

    &:hover {
      color: var(--jv-breadcrumb-link-hover-color, #66b1ff);
      text-decoration: underline;
    }
  }

  @include m(active) {
    color: var(--jv-breadcrumb-active-color, #303133);
    font-weight: bold;
    cursor: default;
  }

  @include m(disabled) {
    color: var(--jv-breadcrumb-disabled-color, #c0c4cc);
    cursor: not-allowed;
  }
}
</style>
