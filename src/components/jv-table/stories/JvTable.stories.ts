import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvTable from '../src/JvTable.vue'
import JvTableColumn from '../src/JvTableColumn.vue'

// 示例数据
function generateData(count = 10) {
  return Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 40) + 18,
    address: `北京市朝阳区某某街道${index + 1}号`,
    status: ['在线', '离线', '忙碌'][Math.floor(Math.random() * 3)],
    createTime: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString(),
  }))
}

const meta = {
  title: '组件/数据展示/JvTable',
  component: JvTable,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '表格尺寸',
      defaultValue: 'medium',
    },
    border: {
      control: 'boolean',
      description: '是否显示边框',
      defaultValue: false,
    },
    stripe: {
      control: 'boolean',
      description: '是否使用斑马纹',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
      defaultValue: false,
    },
    showHeader: {
      control: 'boolean',
      description: '是否显示表头',
      defaultValue: true,
    },
    showFooter: {
      control: 'boolean',
      description: '是否显示表尾',
      defaultValue: false,
    },
    emptyText: {
      control: 'text',
      description: '空数据提示文本',
      defaultValue: '暂无数据',
    },
    highlightCurrentRow: {
      control: 'boolean',
      description: '是否高亮当前行',
      defaultValue: false,
    },
    stickyHeader: {
      control: 'boolean',
      description: '是否固定表头',
      defaultValue: false,
    },
    maxHeight: {
      control: 'text',
      description: '表格最大高度',
    },
    defaultAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '默认对齐方式',
      defaultValue: 'left',
    },
    onRowClick: { action: '行点击' },
    onCellClick: { action: '单元格点击' },
    onSortChange: { action: '排序变化' },
    onSelectionChange: { action: '选择变化' },
    onCurrentChange: { action: '当前行变化' },
  },
} satisfies Meta<typeof JvTable>

export default meta
type Story = StoryObj<typeof meta>

// 基础表格
export const 基础表格: Story = {
  render: args => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns, ...args }
    },
    template: `
      <JvTable :data-source="data" :columns="columns" v-bind="$props">
        <template #empty>
          <div style="padding: 24px; text-align: center;">自定义空数据展示</div>
        </template>
      </JvTable>
    `,
  }),
  args: {
    border: true,
    stripe: true,
  },
}

// 带边框表格
export const 带边框表格: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable :data-source="data" :columns="columns" border>
      </JvTable>
    `,
  }),
}

// 斑马纹表格
export const 斑马纹表格: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable :data-source="data" :columns="columns" stripe>
      </JvTable>
    `,
  }),
}

// 表格尺寸
export const 表格尺寸: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData(5))
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
      ]

      return { data, columns }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>小尺寸</h3>
          <JvTable :data-source="data" :columns="columns" size="small" border>
          </JvTable>
        </div>
        <div>
          <h3>中等尺寸（默认）</h3>
          <JvTable :data-source="data" :columns="columns" size="medium" border>
          </JvTable>
        </div>
        <div>
          <h3>大尺寸</h3>
          <JvTable :data-source="data" :columns="columns" size="large" border>
          </JvTable>
        </div>
      </div>
    `,
  }),
}

// 排序表格
export const 排序表格: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px', sortable: true },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px', sortable: true },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px', sortable: true },
      ]

      const handleSortChange = (_params: any) => {
        // 处理排序变化
      }

      return { data, columns, handleSortChange }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        :default-sort="{ prop: 'id', order: 'ascending' }"
        @sort-change="handleSortChange"
      >
      </JvTable>
    `,
  }),
}

// 固定表头
export const 固定表头: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData(20))
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        sticky-header
        max-height="300px"
      >
      </JvTable>
    `,
  }),
}

// 固定列
export const 固定列: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData(10))
      const columns = [
        { prop: 'id', label: 'ID', width: '80px', fixed: 'left' },
        { prop: 'name', label: '姓名', width: '120px', fixed: 'left' },
        { prop: 'age', label: '年龄', width: '120px' },
        { prop: 'address', label: '地址', width: '300px' },
        { prop: 'status', label: '状态', width: '120px' },
        { prop: 'createTime', label: '创建时间', width: '180px', fixed: 'right' },
      ]

      return { data, columns }
    },
    template: `
      <div style="width: 600px; overflow: hidden;">
        <JvTable 
          :data-source="data" 
          :columns="columns" 
          border 
          max-height="300px"
        >
        </JvTable>
      </div>
    `,
  }),
}

// 高亮当前行
export const 高亮当前行: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      const handleCurrentChange = (_currentRow: any, _oldRow: any) => {
        // 处理当前行变化
      }

      return { data, columns, handleCurrentChange }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        highlight-current-row
        @current-change="handleCurrentChange"
      >
      </JvTable>
    `,
  }),
}

// 自定义单元格内容
export const 自定义单元格内容: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'status', label: '状态', width: '120px' },
        { prop: 'address', label: '地址' },
        { prop: 'operation', label: '操作', width: '150px' },
      ]

      const handleEdit = (_row: any) => {
        // 处理编辑操作
      }

      const handleDelete = (_row: any) => {
        // 处理删除操作
      }

      return { data, columns, handleEdit, handleDelete }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
      >
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
            <button @click="handleEdit(row)" style="padding: 2px 8px;">编辑</button>
            <button @click="handleDelete(row)" style="padding: 2px 8px;">删除</button>
          </div>
        </template>
      </JvTable>
    `,
  }),
}

// 加载状态
export const 加载状态: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        loading
      >
        <template #loading>
          <div style="display: flex; flex-direction: column; align-items: center; padding: 24px;">
            <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
            <div>数据加载中，请稍候...</div>
          </div>
        </template>
      </JvTable>
    `,
  }),
}

// 表头表尾
export const 表头表尾: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        show-footer
      >
        <template #footer="{ columns, data }">
          <div style="padding: 12px 8px; display: flex; justify-content: space-between;">
            <div>总计: {{ data.length }} 条数据</div>
            <div>
              <button style="padding: 4px 12px;">导出数据</button>
            </div>
          </div>
        </template>
      </JvTable>
    `,
  }),
}

// 空数据显示
export const 空数据显示: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref([])
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      return { data, columns }
    },
    template: `
      <JvTable 
        :data-source="data" 
        :columns="columns" 
        border 
        empty-text="没有找到符合条件的数据"
      >
        <template #empty>
          <div style="padding: 32px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
            <div style="font-size: 16px; color: #666;">没有找到任何数据</div>
            <button style="margin-top: 16px; padding: 8px 16px;">添加数据</button>
          </div>
        </template>
      </JvTable>
    `,
  }),
}

// 导出CSV
export const 导出数据: Story = {
  render: () => ({
    components: { JvTable, JvTableColumn },
    setup() {
      const data = ref(generateData())
      const columns = [
        { prop: 'id', label: 'ID', width: '80px' },
        { prop: 'name', label: '姓名', width: '120px' },
        { prop: 'age', label: '年龄', width: '80px' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', width: '180px' },
      ]

      const tableRef = ref<any>(null)

      const exportData = () => {
        if (tableRef.value) {
          tableRef.value.exportToCSV('table-data.csv')
        }
      }

      return { data, columns, tableRef, exportData }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <button @click="exportData" style="padding: 8px 16px;">导出CSV</button>
        </div>
        <JvTable 
          ref="tableRef"
          :data-source="data" 
          :columns="columns" 
          border 
        >
        </JvTable>
      </div>
    `,
  }),
}
