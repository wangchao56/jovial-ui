# JvPagination 分页组件

## 1. 组件介绍
`JvPagination` 是一个用于数据分页展示的导航组件，提供了直观的页码浏览和快速跳转功能。它适用于大量数据的分页显示场景，支持自定义每页显示数量、页码范围和简洁模式等功能，并具有良好的国际化和RTL布局支持。

## 2. 布局结构使用方式
组件采用以下布局结构：
- 上一页按钮：导航到前一页
- 页码按钮组：显示可点击的页码
- 下一页按钮：导航到后一页
- 总数显示：显示数据总条数
- 每页条数选择器：可选择每页显示的数据量
- 页码跳转：直接输入页码进行跳转

### 基本使用示例
```vue
<template>
  <!-- 基础分页 -->
  <JvPagination
    v-model="currentPage"
    :total="100"
    :page-size="10"
    @change="handlePageChange"
  />
  
  <!-- 带有每页显示数量选择器 -->
  <JvPagination
    v-model="currentPage"
    v-model:page-size="pageSize"
    :total="100"
    :page-sizes="[10, 20, 50, 100]"
    @change="handlePageChange"
  />
  
  <!-- 简洁模式 -->
  <JvPagination
    v-model="currentPage"
    :total="100"
    :page-size="10"
    simple
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)

function handlePageChange(page, size) {
  console.log(`当前页: ${page}, 每页条数: ${size}`)
  // 加载对应页面数据
}
</script>
```

## 3. 交互设计
组件提供以下交互效果：
- 页码导航：点击页码按钮直接跳转到对应页
- 上一页/下一页：点击切换到相邻页面
- 省略号动态显示：当页数较多时，会显示省略号替代部分页码
- 每页条数选择：通过下拉选择器调整每页显示的数据量
- 页码跳转：通过输入框直接跳转到指定页码

特殊交互：
- 当页码较多时，会动态计算页码显示范围，确保用户始终能看到首页、尾页和当前页附近的页码
- 禁用状态：当到达首页或尾页时，相应的"上一页"或"下一页"按钮会被禁用
- 当前页高亮：当前页码会有明显的视觉差异
- 自动适应RTL布局：在RTL模式下，组件布局会自动翻转

## 4. 可访问性
组件遵循WCAG无障碍标准：
- 语义化结构：使用`<nav>`元素包裹分页组件，表明导航功能
- 按钮状态：禁用状态的按钮会有明显的视觉提示和`disabled`属性
- 键盘操作：支持通过键盘的Tab、Enter等按键进行导航和操作
- 足够的色彩对比度：确保文本和背景有足够的对比度
- 国际化支持：支持不同语言环境下的文本显示
- RTL布局支持：适应阿拉伯语等从右到左阅读的语言环境

## 5. Vue 组件 API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | number | 1 | 当前页码，支持v-model |
| total | number | - | 总条目数（必填） |
| pageSize | number | 10 | 每页显示条目数，支持v-model:page-size |
| pageSizes | number[] | [10, 20, 50, 100] | 可选的每页条数选项 |
| simple | boolean | false | 是否使用简洁模式（不显示页码按钮和跳转） |

### Emits
| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: number) | 当前页码变化时触发 |
| update:pageSize | (value: number) | 每页条数变化时触发 |
| change | (page: number, pageSize: number) | 当页码或每页条数变化时触发 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| - | 组件没有提供自定义插槽 |

## 6. 测试用例

### 基础功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-001 | 基础渲染 | 验证组件是否正确渲染 | 1. 引入组件<br>2. 设置必要属性<br>3. 在模板中使用组件 | 1. 组件成功渲染<br>2. 显示正确的页码按钮 | ✅ |
| PG-002 | 页码计算 | 验证页码总数计算 | 1. 设置total和pageSize<br>2. 检查显示的总页数 | 总页数等于`Math.ceil(total/pageSize)` | ✅ |

### Props 功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-101 | 当前页码 | 验证modelValue属性 | 1. 设置不同的modelValue<br>2. 检查当前激活的页码 | 对应页码按钮应处于激活状态 | ✅ |
| PG-102 | 每页条数 | 验证pageSize属性 | 1. 设置不同的pageSize<br>2. 检查总页数变化 | 总页数应根据pageSize变化 | ✅ |
| PG-103 | 每页条数选项 | 验证pageSizes属性 | 1. 设置自定义pageSizes<br>2. 检查下拉选项 | 下拉选项应与设置一致 | ✅ |
| PG-104 | 简洁模式 | 验证simple属性 | 1. 设置simple=true<br>2. 检查组件显示 | 应只显示上一页/下一页按钮 | ✅ |

### Emits 事件测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-201 | 页码更新 | 验证update:modelValue事件 | 1. 点击不同页码<br>2. 检查事件触发 | 事件被触发且参数为当前页码 | ✅ |
| PG-202 | 条数更新 | 验证update:pageSize事件 | 1. 修改每页条数<br>2. 检查事件触发 | 事件被触发且参数为新的条数 | ✅ |
| PG-203 | 变更事件 | 验证change事件 | 1. 修改页码或条数<br>2. 检查事件触发 | 事件被触发且参数为当前页码和条数 | ✅ |

### 交互功能测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-301 | 页码点击 | 验证页码按钮点击 | 1. 点击不同页码按钮<br>2. 检查当前页码变化 | 当前页码应变为点击的页码 | ✅ |
| PG-302 | 上一页 | 验证上一页按钮 | 1. 设置当前页>1<br>2. 点击上一页按钮 | 当前页码应减1 | ✅ |
| PG-303 | 下一页 | 验证下一页按钮 | 1. 设置当前页<总页数<br>2. 点击下一页按钮 | 当前页码应加1 | ✅ |
| PG-304 | 禁用状态 | 验证禁用状态 | 1. 设置当前页为1<br>2. 检查上一页按钮<br>3. 设置当前页为最后一页<br>4. 检查下一页按钮 | 上一页/下一页按钮在边界情况下应禁用 | ✅ |
| PG-305 | 条数选择 | 验证每页条数选择 | 1. 从下拉框选择不同条数<br>2. 检查每页条数变化 | 每页条数应变为选择的数值 | ✅ |
| PG-306 | 页码跳转 | 验证页码跳转功能 | 1. 在跳转输入框输入数字<br>2. 触发跳转<br>3. 检查当前页码 | 当前页码应变为输入的页码 | ✅ |
| PG-307 | 边界处理 | 验证页码边界处理 | 1. 尝试跳转到小于1的页码<br>2. 尝试跳转到大于总页数的页码 | 不应跳转到无效页码 | ✅ |

### 样式和布局测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-401 | 页码显示算法 | 验证不同页数下的页码显示 | 1. 设置不同total值<br>2. 观察页码按钮显示 | 页码应根据算法正确显示 | ✅ |
| PG-402 | 省略号显示 | 验证省略号显示逻辑 | 1. 设置大量页数<br>2. 观察省略号显示位置 | 应在适当位置显示省略号 | ✅ |
| PG-403 | RTL布局 | 验证RTL布局支持 | 1. 在RTL容器中使用组件<br>2. 检查组件方向 | 组件布局应从右到左 | ✅ |

### 可访问性测试
| 测试ID | 测试场景 | 测试描述 | 测试步骤 | 预期结果 | 测试状态 |
|--------|----------|----------|----------|----------|----------|
| PG-501 | 键盘导航 | 验证键盘导航支持 | 1. 使用Tab键导航<br>2. 使用Enter键激活 | 可以通过键盘操作分页 | ✅ |
| PG-502 | 国际化 | 验证文本国际化 | 1. 在不同语言环境测试<br>2. 检查文本显示 | 文本应正确显示对应语言 | ✅ |

## 使用示例

### 基础用法
```vue
<template>
  <JvPagination
    v-model="currentPage"
    :total="100"
    @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)

function handlePageChange(page, size) {
  console.log(`页码变化为: ${page}, 每页 ${size} 条`)
}
</script>
```

### 自定义每页显示条数
```vue
<template>
  <JvPagination
    v-model="currentPage"
    v-model:page-size="pageSize"
    :total="200"
    :page-sizes="[10, 20, 30, 50]"
    @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(20)

function handlePageChange(page, size) {
  console.log(`页码: ${page}, 每页条数: ${size}`)
  // 这里可以添加获取数据的逻辑
}
</script>
```

### 简洁模式
```vue
<template>
  <JvPagination
    v-model="currentPage"
    :total="100"
    :page-size="10"
    simple
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

### 不同数据量下的分页显示
```vue
<template>
  <div class="pagination-demo">
    <div>
      <h4>少量数据 (3页)</h4>
      <JvPagination :total="30" :page-size="10" />
    </div>
    
    <div>
      <h4>中等数据量 (20页)</h4>
      <JvPagination :total="200" :page-size="10" />
    </div>
    
    <div>
      <h4>大量数据 (100页)</h4>
      <JvPagination :total="1000" :page-size="10" />
    </div>
  </div>
</template>

<style scoped>
.pagination-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
```

### 在表格中使用
```vue
<template>
  <div>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="pagination-container">
      <JvPagination
        v-model="currentPage"
        v-model:page-size="pageSize"
        :total="totalItems"
        :page-sizes="[5, 10, 20, 50]"
        @change="loadData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const allData = ref([])
const displayData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})

// 模拟获取数据
async function loadData(page, size) {
  // 在实际应用中，这里应该是API调用
  console.log(`加载第 ${page} 页，每页 ${size} 条数据`)
  
  // 模拟数据
  if (allData.value.length === 0) {
    // 首次加载生成测试数据
    allData.value = Array.from({ length: 123 }, (_, i) => ({
      id: i + 1,
      name: `项目 ${i + 1}`,
      status: ['活跃', '暂停', '完成'][Math.floor(Math.random() * 3)]
    }))
    totalItems.value = allData.value.length
  }
}

onMounted(() => {
  loadData(currentPage.value, pageSize.value)
})
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
```

### RTL支持
```vue
<template>
  <div dir="rtl" class="rtl-container">
    <JvPagination
      v-model="currentPage"
      :total="100"
      :page-size="10"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<style scoped>
.rtl-container {
  direction: rtl;
  text-align: right;
}
</style>
``` 