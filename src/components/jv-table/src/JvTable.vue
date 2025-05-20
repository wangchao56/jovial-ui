<script setup lang="ts">
import type {
  JvTableEmits,
  JvTableProps,
  SortOrder,
  TableColumn,
  TableRowData,
} from './types'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { convertToUnit } from '@/utils'
import { exportToCSV as _exportToCSV, useTableClassAndStyle } from './helper'
import JvTableHeader from './JvTableHeader.vue'
import { bem, JVTABLE_NAME, JvTableContextKey, TableEventNames } from './types'

defineOptions({ name: JVTABLE_NAME, inheritAttrs: false })

// 组件属性
const {
  columns = [],
  defaultAlign = 'left',
  size = 'medium',
  border = false,
  stripe = false,
  showHeader = true,
  showFooter = false,
  loading = false,
  emptyText = '暂无数据',
  highlightCurrentRow = false,
  stickyHeader = false,
  rowKey,
  rowClassName,
  rowStyle,
  cellClassName,
  cellStyle,
  dataSource = [],
  defaultSort = { prop: '', order: null },
  maxHeight,
} = defineProps<JvTableProps>()

// 事件处理
const emit = defineEmits<JvTableEmits>()
// 表格DOM引用
const tableRef = ref<HTMLDivElement | null>(null)
const tableBodyRef = ref<HTMLDivElement | null>(null)
const tableHeaderRef = ref<HTMLElement | null>(null)
const scrollerRef = ref<HTMLDivElement | null>(null)

// 表格列
const tableColumns = ref<TableColumn[]>([])

// 选中行数据
const selectedRows = ref<TableRowData[]>([])

// 当前排序列
const sortColumn = ref<TableColumn | null>(null)
const sortOrder = ref<SortOrder>(null)

// 当前高亮行
const currentHighlightRow = ref<TableRowData | null>(null)

// 计算表格尺寸样式
const tableSizeClass = computed(() => bem.m(`size-${size}`))

// 表格类名
const tableClasses = computed(() => [
  bem.b(),
  tableSizeClass.value,
  {
    [bem.m('border')]: border,
    [bem.m('striped')]: stripe,
  },
])

const { setRowClassName, setRowStyle, setCellClassName, setCellStyle }
  = useTableClassAndStyle({
    rowClassName,
    rowStyle,
    cellClassName,
    cellStyle,
    defaultAlign,
    stripe,
    highlightCurrentRow,
  })

// 初始化列配置
function initColumns() {
  if (columns && columns.length > 0) {
    // 深拷贝列配置，避免修改原始数据
    const clonedColumns = columns.map((col) => {
      const newCol = { ...col }

      // 处理fixed属性初始化
      if (newCol.fixed !== undefined && newCol.fixed !== false) {
        newCol.isFixed = true

        if (newCol.fixed === true || newCol.fixed === 'left') {
          newCol.fixedLeft = 0 // 初始值，后续更新
        }
        else if (newCol.fixed === 'right') {
          newCol.fixedRight = 0 // 初始值，后续更新
        }
      }

      return newCol
    })

    tableColumns.value = clonedColumns
    // 计算固定列位置
    updateFixedColumnsPosition()
  }
  else {
    tableColumns.value = []
  }
}

// 处理行点击事件
function handleRowClick(
  row: TableRowData,
  column: TableColumn,
  event: MouseEvent,
) {
  emit(TableEventNames.RowClick, row, column, event)

  if (highlightCurrentRow) {
    const oldCurrentRow = currentHighlightRow.value
    currentHighlightRow.value = row
    emit(TableEventNames.CurrentChange, row, oldCurrentRow!)
  }
}

// 切换行选择
function toggleRowSelection(row: TableRowData, selected?: boolean) {
  const index = selectedRows.value.findIndex(r => r === row)
  const isSelected = index !== -1

  if (typeof selected === 'undefined') {
    if (isSelected) {
      selectedRows.value.splice(index, 1)
    }
    else {
      selectedRows.value.push(row)
    }
  }
  else if (selected && !isSelected) {
    selectedRows.value.push(row)
  }
  else if (!selected && isSelected) {
    selectedRows.value.splice(index, 1)
  }

  emit(TableEventNames.SelectionChange, selectedRows.value)
}

// 清除所有选择
function clearSelection() {
  selectedRows.value = []
  emit(TableEventNames.SelectionChange, selectedRows.value)
}

// 切换全选
function toggleAllSelection() {
  if (selectedRows.value.length === dataSource.length) {
    clearSelection()
  }
  else {
    selectedRows.value = [...dataSource]
    emit(TableEventNames.SelectAll, selectedRows.value)
    emit(TableEventNames.SelectionChange, selectedRows.value)
  }
}

// 排序方法
function updateSortOrder(column: TableColumn) {
  if (!column.sortable)
    return

  const orders: SortOrder[] = column.sortOrders || [
    'ascending',
    'descending',
    null,
  ]
  let nextIndex = 0

  if (sortColumn.value === column) {
    // 当前点击列已经是排序列，切换排序方向
    const currentIndex = orders.indexOf(sortOrder.value)
    nextIndex = (currentIndex + 1) % orders.length
  }

  const nextOrder = orders[nextIndex]

  sortColumn.value = column
  sortOrder.value = nextOrder

  emit(TableEventNames.SortChange, {
    column,
    prop: column.prop || '',
    order: nextOrder,
  })
}

// 注册列
function registerColumn(column: TableColumn) {
  tableColumns.value.push(column)
  // 注册完成后，需要重新计算固定列位置
  updateFixedColumnsPosition()
}

// 注销列
function unregisterColumn(column: TableColumn) {
  tableColumns.value = tableColumns.value.filter(col => col.id !== column.id)
  // 注销后需要重新计算固定列位置
  updateFixedColumnsPosition()
}

// 计算固定列位置
function updateFixedColumnsPosition() {
  // 重置所有列的固定属性
  tableColumns.value.forEach((column) => {
    column.isFixed = false
    column.fixedLeft = undefined
    column.fixedRight = undefined
    column.isLastLeft = false
    column.isFirstRight = false
  })

  // 获取所有左固定列和右固定列
  const leftFixedColumns = tableColumns.value.filter(
    column => column.fixed === true || column.fixed === 'left',
  )
  const rightFixedColumns = tableColumns.value.filter(
    column => column.fixed === 'right',
  )

  // 从左到右依次设置左固定列的位置
  let leftOffset = 0
  leftFixedColumns.forEach((column, index) => {
    column.isFixed = true
    column.fixedLeft = leftOffset
    column.fixedIndex = index
    // 累加左侧偏移量
    leftOffset += Number.parseFloat(
      String(column.width || column.minWidth || 80),
    )
  })

  // 从右到左依次设置右固定列的位置
  let rightOffset = 0
  rightFixedColumns.reverse().forEach((column, index) => {
    column.isFixed = true
    column.fixedRight = rightOffset
    column.fixedIndex = index
    // 累加右侧偏移量
    rightOffset += Number.parseFloat(
      String(column.width || column.minWidth || 80),
    )
  })

  // 标记哪些是第一列和最后一列固定列，用于添加阴影效果
  if (leftFixedColumns.length > 0) {
    const lastLeftFixedColumn = leftFixedColumns[leftFixedColumns.length - 1]
    if (lastLeftFixedColumn) {
      lastLeftFixedColumn.isLastLeft = true
    }
  }

  if (rightFixedColumns.length > 0) {
    const firstRightFixedColumn
      = rightFixedColumns[rightFixedColumns.length - 1]
    if (firstRightFixedColumn) {
      firstRightFixedColumn.isFirstRight = true
    }
  }
}

function setHeaderRef(el: HTMLElement) {
  tableHeaderRef.value = el
}

// 提供注册和注销列的方法给子组件
provide(JvTableContextKey, {
  registerColumn,
  unregisterColumn,
  sortColumn,
  sortOrder,
  updateSortOrder,
  setHeaderRef,
})

// 处理容器滚动事件
function handleScrollerScroll(event: Event) {
  const scrollElement = event.target as HTMLElement
  const { scrollTop, scrollLeft } = scrollElement

  // 同步表头横向滚动
  if (tableHeaderRef.value && scrollElement !== tableHeaderRef.value) {
    // 只更新scrollLeft，保持表头在顶部
    tableHeaderRef.value.scrollLeft = scrollLeft
  }

  // 触发滚动事件
  emit(TableEventNames.Scroll, { scrollTop, scrollLeft, event })
}

// 对外暴露方法
defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  setCurrentRow: (row: TableRowData) => {
    const oldCurrentRow = currentHighlightRow.value
    currentHighlightRow.value = row
    emit(TableEventNames.CurrentChange, row, oldCurrentRow!)
  },
  clearSort: () => {
    sortColumn.value = null
    sortOrder.value = null
  },
  doLayout: () => {
    // 触发表格重新布局
    nextTick(() => {
      if (tableRef.value) {
        // 重新计算表格尺寸
      }
    })
  },
  sort: (prop: string, order: SortOrder) => {
    const column = tableColumns.value.find(col => col.prop === prop)
    if (column && column.sortable) {
      sortColumn.value = column
      sortOrder.value = order
      emit(TableEventNames.SortChange, {
        column,
        prop,
        order,
      })
    }
  },
  exportToCSV: (fileName = 'table-data.csv') => {
    _exportToCSV(dataSource, tableColumns, fileName)
  },
})

// 初始化设置
onMounted(() => {
  // 初始化列配置
  initColumns()

  // 初始化默认排序
  if (defaultSort && defaultSort.prop) {
    const sortCol = tableColumns.value.find(
      col => col.prop === defaultSort?.prop,
    )
    if (sortCol) {
      sortColumn.value = sortCol
      sortOrder.value = defaultSort.order
    }
  }

  // 确保容器滚动事件绑定
  if (scrollerRef.value) {
    scrollerRef.value.addEventListener('scroll', handleScrollerScroll, {
      passive: true,
    })
  }
})

onUnmounted(() => {
  // 清理事件监听器
  if (scrollerRef.value) {
    scrollerRef.value.removeEventListener('scroll', handleScrollerScroll)
  }
})

// 在分页等情况下，数据变化时重置选择状态
watch(
  () => dataSource,
  () => {
    clearSelection()
    currentHighlightRow.value = null
  },
  { deep: true },
)

// 同步外部传入的列配置
watch(
  () => columns,
  () => {
    // 当列配置变化时重新初始化
    initColumns()
  },
  { deep: true },
)
</script>

<template>
  <div ref="tableRef" :class="tableClasses">
    <!-- 加载遮罩 -->
    <div v-if="loading" :class="bem.e('loading-mask')">
      <slot name="loading">
        <div :class="bem.e('loading-spinner')">
          <JvIcon name="mdi:loading" :class="bem.e('loading-icon')" />
          <span>加载中...</span>
        </div>
      </slot>
    </div>

    <div
      ref="scrollerRef"
      class="jv-table-container"
      :style="{ maxHeight: maxHeight ? convertToUnit(maxHeight) : 'none' }"
    >
      <!-- 表格头部 -->
      <JvTableHeader
        v-if="showHeader"
        :table-columns="tableColumns"
        :sticky-header="stickyHeader"
        style="position: relative; z-index: 20; flex: 0 0 auto"
      />

      <!-- 表格主体 -->
      <div ref="tableBodyRef" :class="bem.e('body')">
        <table
          :class="bem.e('body-table')"
          style="width: fit-content; min-width: 100%"
        >
          <colgroup>
            <col
              v-for="(column, index) in tableColumns"
              :key="column.id || index"
              :width="column.width || column.minWidth || 'auto'"
            >
          </colgroup>
          <tbody>
            <template v-if="dataSource && dataSource.length > 0">
              <tr
                v-for="(row, rowIndex) in dataSource"
                :key="
                  rowKey
                    ? typeof rowKey === 'function'
                      ? rowKey(row)
                      : row[rowKey]
                    : rowIndex
                "
                :class="
                  setRowClassName(
                    row,
                    rowIndex,
                    selectedRows,
                    currentHighlightRow,
                  )
                "
                :style="setRowStyle(row, rowIndex)"
                @click="(event) => handleRowClick(row, {}, event)"
              >
                <td
                  v-for="(column, columnIndex) in tableColumns"
                  :key="column.id || columnIndex"
                  :class="setCellClassName(row, column, rowIndex, columnIndex)"
                  :style="setCellStyle(row, column, rowIndex, columnIndex)"
                  @click.stop="
                    (event) =>
                      emit(
                        TableEventNames.CellClick,
                        row,
                        column,
                        event.currentTarget as HTMLElement,
                        event,
                      )
                  "
                  @dblclick.stop="
                    (event) =>
                      emit(
                        TableEventNames.CellDblclick,
                        row,
                        column,
                        event.currentTarget as HTMLElement,
                        event,
                      )
                  "
                >
                  <slot
                    :name="
                      column.prop
                        ? `column-${column.prop}`
                        : `column-${column.type}`
                    "
                    :row="row"
                    :column="column"
                    :index="rowIndex"
                  >
                    <!-- 检查列是否有自定义渲染 -->
                    <template v-if="column.hasCustomRender">
                      <component
                        :is="column.renderCell"
                        :row="row"
                        :column="column"
                        :$index="rowIndex"
                      />
                    </template>
                    <!-- 默认渲染 -->
                    <template v-else>
                      {{
                        column.formatter
                          ? column.formatter(
                            row,
                            column,
                            row[column.prop || ''],
                            rowIndex,
                          )
                          : row[column.prop || '']
                      }}
                    </template>
                  </slot>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr :class="bem.e('empty-row')">
                <td :colspan="tableColumns.length" :class="bem.e('empty-cell')">
                  <slot name="empty">
                    <div :class="bem.e('empty-text')">
                      {{ emptyText }}
                    </div>
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 表格底部 -->
    <div v-if="showFooter" :class="bem.e('footer')">
      <slot
        name="footer"
        v-bind="{ columns: tableColumns, data: dataSource }"
      />
    </div>

    <!-- 追加内容 -->
    <div v-if="$slots.append" :class="bem.e('append')">
      <slot name="append" />
    </div>

    <!-- 默认插槽用于放置Column子组件 -->
    <slot />
  </div>
</template>

<style lang="scss">
.jv-table {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background-color: var(--jv-theme-surface, #fff);
  color: var(--jv-theme-on-surface, #000);
  font-size: var(--jv-font-size-base, 14px);
  line-height: 1.5;

  // 确保CSS变量存在默认值
  --jv-theme-on-surface-variant: rgb(0 0 0 / 0.6);
  --jv-theme-on-surface-rgb: 0, 0, 0;
  --jv-theme-primary-rgb: 33, 150, 243;
  --jv-theme-surface-variant: #f5f5f5;
  --jv-theme-outline-variant: rgb(0 0 0 / 0.12);
  --jv-theme-outline: rgb(0 0 0 / 0.38);
  --jv-theme-primary: #2196f3;
  --jv-theme-background: #fff;

  &-container {
    position: relative;
    display: flex;
    overflow: auto; // 允许容器滚动
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--jv-theme-outline-variant, rgb(0 0 0 / 0.12));
    border-radius: 4px;
    background-color: var(--jv-theme-surface, #fff);

    // 表格主体样式
    .jv-table__body {
      position: relative;
      width: fit-content;
      min-width: 100%;
      height: fit-content;
    }
  }

  &__loading-mask {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255 255 255 / 0.7);
  }

  &__loading-spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__loading-icon {
    color: var(--jv-theme-primary);
    font-size: 24px;
    animation: jv-table-loading-rotate 1.5s linear infinite;
  }

  &__header,
  &__body {
    width: 100%;
  }

  &__header-table,
  &__body-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 100%;
  }

  &__header-row,
  &__row {
    transition: background-color 0.3s ease;
  }

  &__header-cell,
  &__cell {
    overflow: hidden;
    box-sizing: border-box;
    padding: 12px 8px;
    border-bottom: 1px solid var(--jv-theme-outline-variant);
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.is-center {
      text-align: center;
    }

    &.is-right {
      text-align: right;
    }

    // 固定列样式
    &.is-fixed {
      position: sticky !important;
      z-index: 2;
      background-color: var(--jv-theme-surface);
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
      box-shadow: 6px 0 6px -6px rgb(0 0 0 / 0.15);
    }

    // 右侧第一列添加阴影
    &.is-first-right-fixed {
      box-shadow: -6px 0 6px -6px rgb(0 0 0 / 0.15);
    }
  }

  &__header-cell {
    background-color: var(--jv-theme-surface-variant, #f5f5f5);
    color: var(--jv-theme-on-surface-variant, rgb(0 0 0 / 0.6));
    font-weight: bold;

    &.is-sortable {
      cursor: pointer;
    }
  }

  &__header-cell-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__sort-icons {
    display: inline-flex;
    margin-left: 4px;
  }

  &__sort-icon {
    color: var(--jv-theme-outline, rgb(0 0 0 / 0.38));
    font-size: 16px;
    transition: all 0.3s ease;

    &.is-active {
      color: var(--jv-theme-primary, #2196f3);
    }
  }

  &__row {
    &.is-striped {
      background-color: var(--jv-theme-surface-variant, #f5f5f5);
    }

    &.is-selected {
      background-color: rgba(var(--jv-theme-primary-rgb, 33, 150, 243), 0.1);
    }

    &.is-current {
      background-color: rgba(var(--jv-theme-primary-rgb, 33, 150, 243), 0.2);
    }

    &:hover {
      background-color: rgba(var(--jv-theme-on-surface-rgb, 0, 0, 0), 0.04);
    }
  }

  &__empty-text {
    width: 100%;
    padding: 32px 0;
    color: var(--jv-theme-outline, rgb(0 0 0 / 0.38));
    text-align: center;
  }

  &__append {
    margin-top: 8px;
  }

  // 表格尺寸
  &--size-small {
    font-size: var(--jv-font-size-sm);

    .jv-table__header-cell,
    .jv-table__cell {
      padding: 8px 6px;
    }
  }

  &--size-medium {
    font-size: var(--jv-font-size-base);
  }

  &--size-large {
    font-size: var(--jv-font-size-lg);

    .jv-table__header-cell,
    .jv-table__cell {
      padding: 16px 12px;
    }
  }

  // 带边框的表格
  &--border {
    border: 1px solid var(--jv-theme-outline-variant);

    .jv-table__header-cell,
    .jv-table__cell {
      border-right: 1px solid var(--jv-theme-outline-variant);
      border-bottom: 1px solid var(--jv-theme-outline-variant);

      &:last-child {
        border-right: none;
      }
    }

    .jv-table__header-row:last-child .jv-table__header-cell {
      border-bottom: 1px solid var(--jv-theme-outline-variant);
    }

    .jv-table__row:last-child .jv-table__cell {
      border-bottom: none;
    }
  }
}

@keyframes jv-table-loading-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
