import type { Meta, StoryObj } from '@storybook/vue3'
import { provide, ref } from 'vue'
import {
  createJovialAdapter,
  LocaleSymbol
} from '../../../locale/adapters/jovial'
import JvPagination from '../src/JvPagination.vue'

/**
 * # JvPagination 分页组件
 *
 * JvPagination 是一个用于分页显示数据的组件，支持自定义每页显示的数量、跳转到指定页码等功能。
 *
 * ## 特性
 * - 支持基础的分页功能
 * - 支持使用JvSelect修改每页显示条数
 * - 支持快速跳转到指定页码
 * - 支持简洁模式
 * - 支持RTL布局
 *
 * ## 何时使用
 * - 当数据量较大需要分页展示时
 * - 当需要用户能够控制每页展示数量时
 * - 当需要快速跳转到指定页码时
 */

// 创建国际化适配器
const localeAdapter = createJovialAdapter({
  locale: 'zh-Hans',
  fallback: 'en'
})

// 创建一个装饰器，为所有故事提供国际化
function withLocale(story: any) {
  return {
    components: { story },
    setup() {
      provide(LocaleSymbol, localeAdapter)
      return {}
    },
    template: '<story />'
  }
}

const meta: Meta<typeof JvPagination> = {
  title: '导航组件/Pagination 分页',
  component: JvPagination,
  tags: ['autodocs'],
  decorators: [withLocale], // 应用国际化装饰器
  argTypes: {
    modelValue: {
      control: { type: 'number' },
      description: '当前页码',
      table: {
        type: { summary: '1' },
        defaultValue: { summary: '1' }
      }
    },
    total: {
      control: { type: 'number' },
      description: '总条目数',
      table: {
        type: { summary: '0' },
        defaultValue: { summary: '0' }
      }
    },
    pageSize: {
      control: { type: 'number' },
      description: '每页条数',
      table: {
        type: { summary: '10' },
        defaultValue: { summary: '10' }
      }
    },
    pageSizes: {
      control: 'object',
      description: '可选的每页条数',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[10, 20, 50, 100]' }
      }
    },
    simple: {
      control: { type: 'boolean' },
      description: '是否使用简洁模式',
      table: {
        type: { summary: 'false' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    modelValue: 1,
    total: 100,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    simple: false
  }
}

export default meta
type Story = StoryObj<typeof JvPagination>

// 基础用法
export const 基础用法: Story = {
  render: (args) => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(args.modelValue)
      return { args, currentPage }
    },
    template: `
      <div>
        <JvPagination 
          v-model="currentPage" 
          :total="args.total" 
          :page-size="args.pageSize" 
          :page-sizes="args.pageSizes"
          @change="() => {/* 页码改变时的回调 */}"
        />
        <div style="margin-top: 10px">当前页码: {{ currentPage }}</div>
      </div>
    `
  })
}

// 简洁模式
export const 简洁模式: Story = {
  render: (args) => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(args.modelValue)
      return { currentPage }
    },
    template: `
      <div>
        <JvPagination 
          v-model="currentPage" 
          :total="100" 
          :page-size="10" 
          simple
        />
        <div style="margin-top: 10px">当前页码: {{ currentPage }}</div>
      </div>
    `
  })
}

// 自定义每页显示条数
export const 自定义每页显示条数: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      const currentPage = ref(1)
      const pageSize = ref(20)
      return { currentPage, pageSize }
    },
    template: `
      <div>
        <JvPagination 
          v-model="currentPage" 
          :total="200" 
          v-model:page-size="pageSize" 
          :page-sizes="[10, 20, 30, 50, 100]"
          @change="() => {/* 页码改变时的回调 */}"
        />
        <div style="margin-top: 10px">当前页码: {{ currentPage }}, 每页条数: {{ pageSize }}</div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '使用JvSelect组件来选择每页显示条数，更加美观和一致。'
      }
    }
  }
}

// 不同页面总数的分页显示
export const 不同数量分页显示: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      return {}
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4>很少页数 (总共3页)</h4>
          <JvPagination :total="30" :page-size="10" />
        </div>
        <div>
          <h4>较多页数 (总共20页)</h4>
          <JvPagination :total="200" :page-size="10" />
        </div>
        <div>
          <h4>大量页数 (总共100页)</h4>
          <JvPagination :total="1000" :page-size="10" />
        </div>
      </div>
    `
  })
}

// RTL模式 (需要在容器上添加 is-rtl 类或设置 dir="rtl")
export const RTL模式: Story = {
  render: () => ({
    components: { JvPagination },
    setup() {
      return {}
    },
    template: `
      <div dir="rtl">
        <JvPagination :total="100" :page-size="10" />
      </div>
    `
  })
}
