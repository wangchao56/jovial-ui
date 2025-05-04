<script setup lang="ts">
import type { JvTableContext, TableColumn } from './types'
import { inject, onBeforeUnmount, onMounted, renderSlot, useSlots } from 'vue'
import { JvTableContextKey } from './types'

// 定义组件名称
defineOptions({
  name: 'JvTableColumn',
  inheritAttrs: false,
})

// 定义属性
const props = defineProps<{
  // 对应列的字段名
  prop?: string
  // 显示的标题
  label?: string
  // 对应列的宽度
  width?: string | number
  // 对应列的最小宽度
  minWidth?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 表头对齐方式
  headerAlign?: 'left' | 'center' | 'right'
  // 是否可排序
  sortable?: boolean | 'custom'
  // 是否显示为固定列
  fixed?: boolean | 'left' | 'right'
  // 当内容过长时是否显示tooltip
  showOverflowTooltip?: boolean
  // 列的自定义类名
  className?: string
  // 表头单元格的自定义类名
  labelClassName?: string
  // 列的类型
  type?: 'default' | 'selection' | 'index' | 'expand'
  // 索引方法
  index?: number | ((index: number) => number | string)
}>()

defineSlots<{
  default?: (props: { row: any, column: TableColumn, $index: number }) => any
  header?: (props: { column: TableColumn, $index: number }) => any
}>()

// 获取插槽
const slots = useSlots()

// 从父组件获取注册列方法
const { registerColumn, unregisterColumn } = inject<JvTableContext>(
  JvTableContextKey,
) as JvTableContext

// 处理fixed属性
const isFixed = props.fixed !== undefined && props.fixed !== false
const fixedType = props.fixed === true ? 'left' : props.fixed

// 组装列配置
const column: TableColumn = {
  ...props,
  id: `col-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  // 添加固定列属性
  isFixed,
  fixedLeft: fixedType === 'left' ? 0 : undefined,
  fixedRight: fixedType === 'right' ? 0 : undefined,
  // 如果存在自定义渲染插槽，标记列有自定义渲染
  hasCustomRender: !!slots.default,
  hasCustomHeader: !!slots.header,
  renderHeader: (params: { column: TableColumn, $index: number }) =>
    renderSlot(slots, 'header', params),
  renderCell: (params: { row: any, column: TableColumn, $index: number }) =>
    renderSlot(slots, 'default', params),
}

// 注册列
onMounted(() => {
  if (registerColumn) {
    registerColumn(column)
  }
})

// 注销列
onBeforeUnmount(() => {
  if (unregisterColumn) {
    unregisterColumn(column)
  }
})
</script>
