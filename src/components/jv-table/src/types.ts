import type { CSSProperties, InjectionKey, Ref, VNode } from 'vue'
import { createNamespace } from '@/utils'

export const JVTABLE_NAME = 'JvTable'
export const bem = createNamespace(JVTABLE_NAME)

// 定义排序规则
export type SortOrder = 'ascending' | 'descending' | null
export type SortDirection = 'ascending' | 'descending'

// 表格列对齐方式
export type TableColumnAlign = 'left' | 'center' | 'right'

// 表格数据类型
export type TableRowData = Record<string, any>

// 表格行选中类型
export type TableSelectionType = 'single' | 'multiple'

// 表格列固定位置
export type TableColumnFixedType = 'left' | 'right'

// 行索引选择器类型
export type IndexMethod = (index: number) => number | string

// 定义表格列的配置接口
export interface TableColumn {
  // 列属性
  prop?: string
  label?: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | TableColumnFixedType
  align?: TableColumnAlign
  headerAlign?: TableColumnAlign
  sortable?: boolean | 'custom'
  sortMethod?: (a: any, b: any) => number
  sortOrders?: SortOrder[]
  resizable?: boolean
  formatter?: (
    row: TableRowData,
    column: TableColumn,
    cellValue: any,
    index: number
  ) => VNode | string | number
  showOverflowTooltip?: boolean
  className?: string
  labelClassName?: string
  selectable?: (row: TableRowData, index: number) => boolean
  index?: number | IndexMethod
  type?: 'default' | 'selection' | 'index' | 'expand' | 'action'

  // 内部使用
  id?: string
  realWidth?: number
  order?: null | SortOrder
  level?: number
  children?: TableColumn[]
  colSpan?: number
  rowSpan?: number
  isFixed?: boolean
  fixedLeft?: number
  fixedRight?: number
  fixedIndex?: number
  isLastLeft?: boolean
  isFirstRight?: boolean
  renderHeader?: (params: { column: TableColumn; $index: number }) => VNode
  renderCell?: (params: {
    row: TableRowData
    column: TableColumn
    $index: number
  }) => VNode
  // 使用TableColumn组件时标记有自定义渲染
  hasCustomRender?: boolean
  hasCustomHeader?: boolean
}

// 单元格样式回调参数
export interface CellStyleProps {
  row: TableRowData
  column: TableColumn
  rowIndex: number
  columnIndex: number
}

// 表格滚动事件参数
export interface TableScrollEventParams {
  scrollTop: number
  scrollLeft: number
  event: Event
}

// 定义表格组件属性
export interface JvTableProps {
  /**
   * 表格数据
   */
  data?: TableRowData[]
  /**
   * 表格数据源（与data同义）
   */
  dataSource?: TableRowData[]
  /**
   * 表格列配置
   */
  columns?: TableColumn[]
  /**
   * 表格高度
   */
  height?: string | number
  /**
   * 表格最大高度
   */
  maxHeight?: string | number
  /**
   * 是否带有纵向边框
   */
  border?: boolean
  /**
   * 是否为斑马纹表格
   */
  stripe?: boolean
  /**
   * 是否显示表头
   */
  showHeader?: boolean
  /**
   * 是否显示表格底部
   */
  showFooter?: boolean
  /**
   * 是否带有横向滚动条
   */
  scrollX?: boolean
  /**
   * 是否带有纵向滚动条
   */
  scrollY?: boolean
  /**
   * 列的宽度是否自撑开
   */
  fit?: boolean
  /**
   * 是否为加载状态
   */
  loading?: boolean
  /**
   * 空数据时显示的文本
   */
  emptyText?: string
  /**
   * 行的 key 属性
   */
  rowKey?: string | ((row: TableRowData) => string)
  /**
   * 表格行的类名
   */
  rowClassName?: string | ((row: TableRowData, rowIndex: number) => string)
  /**
   * 表格行的样式
   */
  rowStyle?:
    | CSSProperties
    | ((row: TableRowData, rowIndex: number) => CSSProperties)
  /**
   * 表格列的默认对齐方式
   */
  defaultAlign?: TableColumnAlign
  /**
   * 表格头部单元格的类名
   */
  headerCellClassName?:
    | string
    | ((params: { column: TableColumn; columnIndex: number }) => string)
  /**
   * 表格头部单元格的样式
   */
  headerCellStyle?:
    | CSSProperties
    | ((params: { column: TableColumn; columnIndex: number }) => CSSProperties)
  /**
   * 表格单元格的类名
   */
  cellClassName?: string | ((params: CellStyleProps) => string)
  /**
   * 表格单元格的样式
   */
  cellStyle?: CSSProperties | ((params: CellStyleProps) => CSSProperties)
  /**
   * 表格行高
   */
  rowHeight?: number
  /**
   * 表格头部行高
   */
  headerRowHeight?: number
  /**
   * 选择类型
   */
  selectionType?: TableSelectionType
  /**
   * 是否支持展开行
   */
  expandable?: boolean
  /**
   * 表格尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否显示选中统计
   */
  showSelectionInfo?: boolean
  /**
   * 选中行的高亮样式
   */
  highlightCurrentRow?: boolean
  /**
   * 是否固定表头
   */
  stickyHeader?: boolean
  /**
   * 树形数据设置
   */
  treeProps?: {
    children?: string
    hasChildren?: string
    indent?: number
  }
  /**
   * 总结行数据
   */
  summaryMethod?: (params: {
    columns: TableColumn[]
    data: TableRowData[]
  }) => string[]
  /**
   * 是否默认排序
   */
  defaultSort?: { prop: string; order: SortOrder }
  /**
   * 是否开启虚拟滚动（优化大数据量渲染）
   */
  virtualScroll?: boolean
  /**
   * 虚拟滚动配置
   */
  virtualConfig?: {
    /**
     * 可视区域外预渲染的行数
     */
    bufferSize?: number
    /**
     * 行高估计值（像素）
     */
    estimatedRowHeight?: number
  }
}

// 事件名称枚举（用于避免字符串拼写错误）
export enum TableEventNames {
  Select = 'select',
  SelectAll = 'selectAll',
  SelectionChange = 'selectionChange',
  CellClick = 'cellClick',
  CellDblclick = 'cellDblclick',
  RowClick = 'rowClick',
  RowDblclick = 'rowDblclick',
  HeaderClick = 'headerClick',
  SortChange = 'sortChange',
  FilterChange = 'filterChange',
  CurrentChange = 'currentChange',
  HeaderDragend = 'headerDragend',
  ExpandChange = 'expandChange',
  Scroll = 'scroll'
}

// 定义表格事件
export interface JvTableEmits {
  (
    e: TableEventNames.Select,
    selection: TableRowData[],
    row: TableRowData
  ): void
  (e: TableEventNames.SelectAll, selection: TableRowData[]): void
  (e: TableEventNames.SelectionChange, selection: TableRowData[]): void
  (
    e: TableEventNames.CellClick,
    row: TableRowData,
    column: TableColumn,
    cell: HTMLElement,
    event: MouseEvent
  ): void
  (
    e: TableEventNames.CellDblclick,
    row: TableRowData,
    column: TableColumn,
    cell: HTMLElement,
    event: MouseEvent
  ): void
  (
    e: TableEventNames.RowClick,
    row: TableRowData,
    column: TableColumn,
    event: MouseEvent
  ): void
  (
    e: TableEventNames.RowDblclick,
    row: TableRowData,
    column: TableColumn,
    event: MouseEvent
  ): void
  (e: TableEventNames.HeaderClick, column: TableColumn, event: MouseEvent): void
  (
    e: TableEventNames.SortChange,
    params: { column: TableColumn; prop: string; order: SortOrder }
  ): void
  (e: TableEventNames.FilterChange, filters: Record<string, string[]>): void
  (
    e: TableEventNames.CurrentChange,
    currentRow: TableRowData,
    oldCurrentRow: TableRowData
  ): void
  (
    e: TableEventNames.HeaderDragend,
    newWidth: number,
    oldWidth: number,
    column: TableColumn,
    event: Event
  ): void
  (e: TableEventNames.ExpandChange, row: TableRowData, expanded: boolean): void
  (e: TableEventNames.Scroll, params: TableScrollEventParams): void

  // 为了兼容使用kebab-case的事件名称
}

// 定义表格暴露方法
export interface JvTableExpose {
  clearSelection: () => void
  toggleRowSelection: (row: TableRowData, selected?: boolean) => void
  toggleAllSelection: () => void
  toggleRowExpansion: (row: TableRowData, expanded?: boolean) => void
  setCurrentRow: (row: TableRowData) => void
  clearSort: () => void
  clearFilter: () => void
  doLayout: () => void
  sort: (prop: string, order: SortOrder) => void
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => void
  // 导出表格数据为CSV文件
  exportToCSV: (fileName?: string) => void
}

// 定义表格插槽
export interface JvTableSlots {
  default: () => VNode[]
  empty: () => VNode[]
  append: () => VNode[]
  loading: () => VNode[]
  header: (props: { columns: TableColumn[] }) => VNode[]
  footer: (props: { columns: TableColumn[]; data: TableRowData[] }) => VNode[]
  [key: `column-${string}`]: (props: {
    row: TableRowData
    column: TableColumn
    $index: number
  }) => VNode[]
  [key: `header-${string}`]: (props: {
    column: TableColumn
    $index: number
  }) => VNode[]
}

export interface JvTableContext {
  registerColumn: (column: TableColumn) => void
  unregisterColumn: (column: TableColumn) => void
  sortColumn: Ref<TableColumn | null>
  sortOrder: Ref<SortOrder>
  updateSortOrder: (column: TableColumn) => void
  setHeaderRef: (el: HTMLElement) => void
}

export const JvTableContextKey: InjectionKey<JvTableContext> =
  Symbol('jv-table')
