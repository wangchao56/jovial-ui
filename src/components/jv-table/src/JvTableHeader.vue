<script setup lang="ts">
import type { JvTableContext, TableColumn } from './types'
import { inject } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { convertToUnit } from '@/utils'
import { bem, JvTableContextKey } from './types'

defineOptions({
  name: 'JvTableHeader',
  inheritAttrs: false,
})

// 只需要 tableColumns 属性
defineProps<{
  tableColumns: TableColumn[]
  stickyHeader?: boolean
}>()

// 从父组件获取上下文
const { sortColumn, sortOrder, updateSortOrder, setHeaderRef }
  = inject<JvTableContext>(JvTableContextKey) as JvTableContext

// 获取表头单元格的类
function setThClass(column: TableColumn) {
  return [
    bem.e('header-cell'),
    column.headerAlign
      ? `is-${column.headerAlign}`
      : column.align
        ? `is-${column.align}`
        : 'is-left',
    { 'is-sortable': column.sortable },
    { 'is-fixed': column.isFixed },
    { 'is-fixed-left': column.fixed === true || column.fixed === 'left' },
    { 'is-fixed-right': column.fixed === 'right' },
    { 'is-last-left-fixed': column.isLastLeft },
    { 'is-first-right-fixed': column.isFirstRight },
    column.labelClassName || '',
  ]
}

// 获取表头单元格的样式
function setThStyle(column: TableColumn) {
  const baseStyle: Record<string, any> = {
    width: column.width
      ? convertToUnit(column.width)
      : column.minWidth
        ? convertToUnit(column.minWidth)
        : 'auto',
  }

  if (column.isFixed) {
    baseStyle.position = 'sticky'

    if (column.fixed === true || column.fixed === 'left') {
      baseStyle.left = `${column.fixedLeft}px`
      baseStyle.zIndex = 3
    }

    if (column.fixed === 'right') {
      baseStyle.right = `${column.fixedRight}px`
      baseStyle.zIndex = 3
    }
  }

  return baseStyle
}

// 获取当前排序图标
function getSortIconName(column: TableColumn) {
  if (sortColumn.value === column) {
    if (sortOrder.value === 'ascending') {
      return 'mdi:sort-ascending'
    }
    else if (sortOrder.value === 'descending') {
      return 'mdi:sort-descending'
    }
  }
  return 'mdi:sort-variant'
}

// 获取排序图标的类
function getSortIconClass(column: TableColumn) {
  return [
    bem.e('sort-icon'),
    { 'is-active': sortColumn.value === column && sortOrder.value !== null },
  ]
}

// 处理排序点击
function handleSortClick(column: TableColumn) {
  if (column.sortable) {
    updateSortOrder(column)
  }
}
</script>

<template>
  <!-- 表格头部 -->
  <div
    :ref="(el) => setHeaderRef(el as HTMLElement)"
    :class="[bem.e('header'), { 'is-sticky': stickyHeader }]"
  >
    <table
      :class="bem.e('header-table')"
      style="width: fit-content; min-width: 100%"
    >
      <colgroup>
        <col
          v-for="(column, index) in tableColumns"
          :key="column.id || index"
          :width="column.width || column.minWidth || 'auto'"
        >
      </colgroup>
      <thead>
        <tr :class="bem.e('header-row')">
          <th
            v-for="(column, columnIndex) in tableColumns"
            :key="column.id || columnIndex"
            :class="setThClass(column)"
            :style="setThStyle(column)"
            @click="column.sortable ? handleSortClick(column) : null"
          >
            <div :class="bem.e('header-cell-wrapper')">
              <!-- 列标题 -->
              <span :class="bem.e('cell-text')">
                <slot
                  :name="`header-${column.prop}`"
                  v-bind="{ column, $index: columnIndex }"
                >
                  {{ column.label }}
                </slot>
              </span>

              <!-- 排序图标 -->
              <span v-if="column.sortable" :class="bem.e('sort-icons')">
                <JvIcon
                  :name="getSortIconName(column)"
                  :class="getSortIconClass(column)"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style lang="scss">
.jv-table__header {
  position: relative;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: block !important;
  visibility: visible !important;
  overflow: hidden;
  width: 100%;
  min-height: 48px;
  background-color: var(--jv-theme-background, #fff);

  // 确保CSS变量存在默认值
  --jv-theme-on-surface-variant: rgb(0 0 0 / 0.6);
  --jv-theme-on-surface-variant-rgb: 0, 0, 0;
  --jv-theme-surface-variant: #f5f5f5;
  --jv-theme-outline-variant: rgb(0 0 0 / 0.12);
  --jv-theme-primary: #2196f3;

  &.is-sticky {
    position: sticky;
    top: 0;
    z-index: 20;
    visibility: visible;
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
    opacity: 1;
  }
}

.jv-table__header-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
}

.jv-table__header-row {
  height: 48px;
}

.jv-table__header-cell {
  overflow: hidden;
  padding: 12px 8px;
  border-bottom: 1px solid var(--jv-theme-outline-variant);
  background-color: var(--jv-theme-surface-variant);
  color: var(--jv-theme-on-surface-variant);
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  user-select: none;
  text-overflow: ellipsis;

  &.is-left {
    text-align: left;
  }

  &.is-center {
    text-align: center;
  }

  &.is-right {
    text-align: right;
  }

  &.is-sortable {
    cursor: pointer;

    &:hover {
      background-color: rgba(var(--jv-theme-on-surface-variant-rgb), 0.04);
    }
  }

  // 固定列样式
  &.is-fixed {
    position: sticky !important;
    z-index: 3;
    background-color: var(--jv-theme-surface-variant);
  }

  &.is-fixed-left {
    left: 0;
    box-shadow: none;
  }

  &.is-fixed-right {
    right: 0;
    box-shadow: none;
  }

  // 左侧最后一列添加阴影
  &.is-last-left-fixed {
    box-shadow: 6px 0 6px -6px rgb(0 0 0 / 0.2);
  }

  // 右侧第一列添加阴影
  &.is-first-right-fixed {
    box-shadow: -6px 0 6px -6px rgb(0 0 0 / 0.2);
  }
}

.jv-table__header-cell-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jv-table__sort-icons {
  display: inline-flex;
  margin-left: 4px;
}

.jv-table__sort-icon {
  color: var(--jv-theme-outline);
  font-size: 16px;
  transition:
    transform 0.3s,
    color 0.3s;

  &.is-active {
    color: var(--jv-theme-primary);
  }
}
</style>
