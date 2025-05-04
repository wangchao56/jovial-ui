import type { MaybeRef } from 'vue'
import type { JvTableProps, TableColumn, TableRowData } from './types'
import { convertToUnit } from '@/utils'
import { unref } from 'vue'
import { bem } from './types'
/**
 * 样式处理相关的函数提供hook
 */
export function useTableClassAndStyle(props: JvTableProps) {
  // 不使用toRefs，直接从props中获取值
  const rowClassName = props.rowClassName
  const rowStyle = props.rowStyle
  const cellClassName = props.cellClassName
  const cellStyle = props.cellStyle
  const defaultAlign = props.defaultAlign || 'left'
  const stripe = props.stripe || false
  const highlightCurrentRow = props.highlightCurrentRow || false

  return {
    setRowClassName: (
      row: TableRowData,
      rowIndex: number,
      selectedRows: MaybeRef<TableRowData[]>,
      currentHighlightRow: MaybeRef<TableRowData | null>
    ) => {
      const _selectedRows = unref(selectedRows)
      const _currentHighlightRow = unref(currentHighlightRow)
      return [
        bem.e('row'),
        { 'is-striped': stripe && rowIndex % 2 !== 0 },
        { 'is-selected': _selectedRows.includes(row) },
        { 'is-current': highlightCurrentRow && _currentHighlightRow === row },
        typeof rowClassName === 'function'
          ? rowClassName(row, rowIndex)
          : rowClassName || ''
      ]
    },
    setRowStyle: (row: TableRowData, rowIndex: number) => {
      return {
        width: row.width ? convertToUnit(row.width) : 'auto',
        ...(typeof rowStyle === 'function'
          ? rowStyle(row, rowIndex)
          : rowStyle || {})
      }
    },
    setCellClassName: (
      row: TableRowData,
      column: TableColumn,
      rowIndex: number,
      columnIndex: number
    ) => {
      return [
        bem.e('cell'),
        column.align ? `is-${column.align}` : `is-${defaultAlign}`, // 默认对齐方式
        column.className || '',
        // 添加固定列相关类名
        { 'is-fixed': column.isFixed },
        { 'is-fixed-left': column.fixed === true || column.fixed === 'left' },
        { 'is-fixed-right': column.fixed === 'right' },
        { 'is-last-left-fixed': column.isLastLeft },
        { 'is-first-right-fixed': column.isFirstRight },
        typeof cellClassName === 'function'
          ? cellClassName({ row, column, rowIndex, columnIndex })
          : cellClassName || ''
      ]
    },
    setCellStyle: (
      row: TableRowData,
      column: TableColumn,
      rowIndex: number,
      columnIndex: number
    ) => {
      // 基础样式
      const baseStyle: Record<string, any> = {
        width: column.width ? convertToUnit(column.width) : 'auto'
      }

      // 添加固定列样式
      if (column.isFixed) {
        baseStyle.position = 'sticky'

        if (column.fixed === true || column.fixed === 'left') {
          baseStyle.left =
            column.fixedLeft !== undefined ? `${column.fixedLeft}px` : 0
          baseStyle.zIndex = 3
          baseStyle.backgroundColor = 'var(--jv-theme-surface, #fff)'

          // 条纹行样式背景适配
          if (stripe && rowIndex % 2 !== 0) {
            baseStyle.backgroundColor =
              'var(--jv-theme-surface-variant, #f5f5f5)'
          }
        }

        if (column.fixed === 'right') {
          baseStyle.right =
            column.fixedRight !== undefined ? `${column.fixedRight}px` : 0
          baseStyle.zIndex = 3
          baseStyle.backgroundColor = 'var(--jv-theme-surface, #fff)'

          // 条纹行样式背景适配
          if (stripe && rowIndex % 2 !== 0) {
            baseStyle.backgroundColor =
              'var(--jv-theme-surface-variant, #f5f5f5)'
          }
        }
      }

      // 合并用户自定义样式
      return {
        ...baseStyle,
        ...(typeof cellStyle === 'function'
          ? cellStyle({ row, column, rowIndex, columnIndex })
          : cellStyle || {})
      }
    }
  }
}

// 添加导出数据功能
export function exportToCSV(
  _dataSource: MaybeRef<TableRowData[]>,
  _columns: MaybeRef<TableColumn[]>,
  fileName = 'table-data.csv'
) {
  const dataSource = unref(_dataSource)
  const columns = unref(_columns)
  if (!dataSource || dataSource.length === 0) {
    return
  }

  const visibleColumns = columns.filter(
    (col) => col.type !== 'selection' && col.type !== 'expand'
  )
  const headers = visibleColumns.map((col) => col.label || col.prop || '')

  let csvContent = `${headers.join(',')}\n`

  for (const row of dataSource) {
    const csvRow = visibleColumns.map((col) => {
      const value = row[col.prop || '']
      // 处理CSV中的特殊字符
      return typeof value === 'string'
        ? `"${value.replace(/"/g, '""')}"`
        : value !== undefined && value !== null
          ? value
          : ''
    })
    csvContent += `${csvRow.join(',')}\n`
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
