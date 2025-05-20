# JvTable 表格

表格组件用于展示大量结构化数据，支持排序、固定列、固定表头、自定义样式等功能。

## 组件介绍

JvTable 是一个功能完善的表格组件，用于高效展示和操作大量结构化数据。组件支持多种表格常用功能，如排序、固定列、固定表头、条纹样式、边框显示等，同时提供丰富的自定义能力，便于适应各种业务场景。

## 布局结构和使用方式

表格组件由表头(header)、表体(body)和表尾(footer)三部分组成，支持通过配置灵活控制表格的显示样式和行为。

基本使用方式：

```vue
<template>
  <JvTable :data-source="tableData" :columns="tableColumns" />
</template>

<script setup>
import { ref } from 'vue'
import JvTable from '@/components/jv-table'

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' }
])

const tableColumns = ref([
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'name', label: '姓名', width: '120px' },
  { prop: 'age', label: '年龄', width: '80px' },
  { prop: 'address', label: '地址' }
])
</script>
```

## 交互设计

JvTable 支持多种交互方式，通过属性配置和事件处理满足不同场景需求：

- **排序功能**：点击设置了 `sortable` 的列头可进行排序
- **高亮当前行**：设置 `highlight-current-row` 属性可启用点击行高亮效果
- **固定表头**：设置 `sticky-header` 和 `max-height` 可实现表头固定，表体滚动
- **固定列**：通过列配置的 `fixed` 属性设置固定列，支持左侧和右侧固定
- **行样式**：支持条纹表格、边框样式、自定义行样式等

## 可访问性

JvTable 组件设计充分考虑了可访问性，支持键盘导航和屏幕阅读器，确保所有用户都能有效地使用表格：

- 表格结构使用适当的 HTML 语义
- 提供适当的颜色对比度
- 支持键盘操作
- 确保与辅助技术兼容

## Vue 组件 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| columns | TableColumn[] | [] | 表格列配置 |
| dataSource | TableRowData[] | [] | 表格数据源 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 表格尺寸 |
| border | boolean | false | 是否显示边框 |
| stripe | boolean | false | 是否使用斑马纹 |
| showHeader | boolean | true | 是否显示表头 |
| showFooter | boolean | false | 是否显示表尾 |
| loading | boolean | false | 加载状态 |
| emptyText | string | '暂无数据' | 空数据提示文本 |
| highlightCurrentRow | boolean | false | 是否高亮当前行 |
| stickyHeader | boolean | false | 是否固定表头 |
| rowKey | string \| function | - | 行数据的唯一标识字段或函数 |
| maxHeight | number \| string | - | 表格最大高度 |
| defaultAlign | 'left' \| 'center' \| 'right' | 'left' | 默认对齐方式 |
| rowClassName | string \| function | - | 行的 class 名称 |
| rowStyle | object \| function | - | 行的样式 |
| cellClassName | string \| function | - | 单元格的 class 名称 |
| cellStyle | object \| function | - | 单元格的样式 |
| defaultSort | { prop: string, order: 'ascending' \| 'descending' \| null } | { prop: '', order: null } | 默认排序配置 |

### TableColumn 类型

```typescript
interface TableColumn {
  type?: string;                    // 列类型
  prop?: string;                    // 对应列内容的字段名
  label?: string;                   // 显示的标题
  width?: string | number;          // 列宽度
  minWidth?: string | number;       // 列最小宽度
  fixed?: boolean | 'left' | 'right'; // 列是否固定在左侧或者右侧
  sortable?: boolean;               // 是否可排序
  sortOrders?: SortOrder[];         // 排序顺序
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => any; // 格式化函数
  align?: 'left' | 'center' | 'right'; // 对齐方式
  headerAlign?: 'left' | 'center' | 'right'; // 表头对齐方式
  className?: string;               // 列的 className
  headerClassName?: string;         // 表头的 className
  renderCell?: any;                 // 自定义单元格渲染
  hasCustomRender?: boolean;        // 是否有自定义渲染
  resizable?: boolean;              // 是否可调整宽度
}
```

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| row-click | row, column, event | 当某一行被点击时触发 |
| cell-click | row, column, cell, event | 当某个单元格被点击时触发 |
| sort-change | { column, prop, order } | 当表格的排序条件发生变化时触发 |
| selection-change | selection | 当选择项发生变化时触发 |
| current-change | currentRow, oldCurrentRow | 当表格的当前行发生变化时触发 |
| scroll | { scrollTop, scrollLeft, event } | 表格滚动时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 用于放置 JvTableColumn 组件 |
| empty | 自定义空数据时的显示内容 |
| loading | 自定义加载中的显示内容 |
| append | 插入至表格最后一行之后的内容 |
| footer | 表尾插槽 |
| column-[prop] | 自定义列的内容，参数为 { row, column, index } |

### Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| clearSelection | - | 清空表格的选择 |
| toggleRowSelection | row, selected | 切换行的选中状态 |
| toggleAllSelection | - | 切换所有行的选中状态 |
| setCurrentRow | row | 设置某一行为当前行 |
| clearSort | - | 清空排序条件 |
| sort | prop, order | 手动对表格进行排序 |
| doLayout | - | 重新布局表格 |
| exportToCSV | fileName | 导出表格数据为CSV文件 |

## 使用示例

### 基础表格

```vue
<template>
  <JvTable :data-source="tableData" :columns="tableColumns" border>
  </JvTable>
</template>
```

### 带斑马纹表格

```vue
<template>
  <JvTable :data-source="tableData" :columns="tableColumns" stripe>
  </JvTable>
</template>
```

### 带排序功能

```vue
<template>
  <JvTable 
    :data-source="tableData" 
    :columns="tableColumns" 
    border
    :default-sort="{ prop: 'age', order: 'ascending' }"
    @sort-change="handleSortChange"
  >
  </JvTable>
</template>

<script setup>
const handleSortChange = ({ column, prop, order }) => {
  console.log('排序变化', column, prop, order)
}
</script>
```

### 固定表头

```vue
<template>
  <JvTable 
    :data-source="tableData" 
    :columns="tableColumns" 
    border
    sticky-header
    max-height="400px"
  >
  </JvTable>
</template>
```

### 固定列

```vue
<template>
  <JvTable :data-source="tableData" :columns="fixedColumns" border>
  </JvTable>
</template>

<script setup>
const fixedColumns = [
  { prop: 'id', label: 'ID', width: '80px', fixed: 'left' },
  { prop: 'name', label: '姓名', width: '120px', fixed: 'left' },
  { prop: 'age', label: '年龄', width: '80px' },
  { prop: 'address', label: '地址', width: '300px' },
  { prop: 'phone', label: '电话', width: '120px' },
  { prop: 'email', label: '邮箱', width: '200px' },
  { prop: 'createTime', label: '创建时间', width: '180px', fixed: 'right' }
]
</script>
```

### 自定义单元格

```vue
<template>
  <JvTable :data-source="tableData" :columns="tableColumns" border>
    <template #column-status="{ row }">
      <span :style="{ 
        color: row.status === '在线' ? 'green' : row.status === '离线' ? 'red' : 'orange',
        fontWeight: 'bold'
      }">
        {{ row.status }}
      </span>
    </template>
    <template #column-operation="{ row }">
      <div style="display: flex; gap: 8px;">
        <button @click="handleEdit(row)">编辑</button>
        <button @click="handleDelete(row)">删除</button>
      </div>
    </template>
  </JvTable>
</template>
```

### 加载状态

```vue
<template>
  <JvTable 
    :data-source="tableData" 
    :columns="tableColumns" 
    border
    loading
  >
    <template #loading>
      <div style="padding: 24px; text-align: center;">
        自定义加载中...
      </div>
    </template>
  </JvTable>
</template>
```

### 空数据自定义

```vue
<template>
  <JvTable 
    :data-source="[]" 
    :columns="tableColumns" 
    border
  >
    <template #empty>
      <div style="padding: 32px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
        <div>没有找到任何数据</div>
        <button style="margin-top: 16px;">添加数据</button>
      </div>
    </template>
  </JvTable>
</template>
```

### 导出CSV

```vue
<template>
  <div>
    <button @click="exportData">导出CSV</button>
    <JvTable 
      ref="tableRef"
      :data-source="tableData" 
      :columns="tableColumns" 
      border
    >
    </JvTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableRef = ref(null)
const exportData = () => {
  tableRef.value.exportToCSV('table-data.csv')
}
</script>
``` 