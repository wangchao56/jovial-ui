<script setup lang="ts">
import type { BreadcrumbItem, JvBreadcrumbsProps } from './types'
import { computed, provide } from 'vue'
import JvBreadcrumbItem from './JvBreadcrumbItem.vue'
import { bem, JVBREADCRUMBS_NAME } from './types'

defineOptions({ name: JVBREADCRUMBS_NAME, inheritAttrs: false })

const props = withDefaults(
  defineProps<JvBreadcrumbsProps>(),
  {
    separator: '/',
    showHome: true,
    homeText: '首页',
    homeTo: '/',
    maxItems: Infinity,
  },
)

// 处理面包屑数据
const displayItems = computed(() => {
  let result: BreadcrumbItem[] = []

  // 添加首页
  if (props.showHome) {
    result.push({
      text: props.homeText,
      to: props.homeTo,
      icon: props.homeIcon,
    })
  }

  // 添加用户传入的items
  if (props.items && props.items.length) {
    result = [...result, ...props.items]
  }

  // 处理最大显示层级
  if (props.maxItems && props.maxItems < result.length) {
    const firstItem = result[0]
    const lastItems = result.slice(result.length - props.maxItems + 1)
    result = [firstItem, ...lastItems]
  }

  // 标记最后一项为当前项
  if (result.length > 0) {
    const lastIndex = result.length - 1
    result.forEach((item, index) => {
      if (index === lastIndex) {
        item.active = true
      }
    })
  }

  return result
})

// 提供给子组件的上下文
provide('jv-breadcrumbs', {
  separator: props.separator,
  separatorIcon: props.separatorIcon,
})
</script>

<template>
  <nav :class="bem.b()" aria-label="面包屑导航">
    <ol :class="bem.e('list')">
      <!-- 通过插槽自定义面包屑 -->
      <template v-if="$slots.default">
        <slot />
      </template>

      <!-- 通过items属性渲染面包屑 -->
      <template v-else>
        <template v-for="(item, index) in displayItems" :key="index">
          <!-- 分隔符 -->
          <li v-if="index > 0" :class="bem.e('separator')">
            <slot v-if="$slots.separator" name="separator" />
            <i v-else-if="separatorIcon" class="jv-icon" :class="[`jv-icon-${separatorIcon}`]" />
            <span v-else>{{ separator }}</span>
          </li>

          <!-- 首页 -->
          <template v-if="index === 0 && showHome">
            <slot v-if="$slots.home" name="home" />
            <JvBreadcrumbItem
              v-else
              :text="item.text"
              :to="item.to"
              :icon="item.icon"
              :active="!!item.active"
              :disabled="!!item.disabled"
            />
          </template>

          <!-- 普通项 -->
          <JvBreadcrumbItem
            v-else
            :text="item.text"
            :to="item.to"
            :icon="item.icon"
            :active="!!item.active"
            :disabled="!!item.disabled"
          />
        </template>
      </template>
    </ol>
  </nav>
</template>

<style lang="scss">
@include b(breadcrumbs) {
  color: var(--jv-breadcrumb-color, #606266);
  font-size: 14px;

  @include e(list) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @include e(separator) {
    display: inline-flex;
    align-items: center;
    margin: 0 8px;
    color: var(--jv-breadcrumb-separator-color, #c0c4cc);

    i {
      font-size: 12px;
    }
  }

  @media screen and (width <= 576px) {
    font-size: 12px;

    @include e(separator) {
      margin: 0 4px;
    }
  }
}
</style>
