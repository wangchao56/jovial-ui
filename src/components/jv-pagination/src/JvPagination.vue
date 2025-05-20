<script setup lang="ts">
import type { JvSelectOption } from '@components/jv-select/src/types'
import type { JvPaginationEmits, JvPaginationProps } from './types'
import JvButton from '@components/jv-button/src/JvButton.vue'
import JvInputNumber from '@components/jv-input-number/src/JvInputNumber.vue'
import JvSelect from '@components/jv-select/src/JvSelect.vue'
import JvText from '@components/jv-typography/src/JvText.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { bem } from './types'

const {
  modelValue = 1,
  total,
  pageSize: pageSizeProp = 10,
  pageSizes = [10, 20, 50, 100],
  simple = false,
} = defineProps<JvPaginationProps>()

const emit = defineEmits<JvPaginationEmits>()

const currentPage = ref(modelValue)
const pageSize = ref(pageSizeProp)
const totalPages = computed(() => Math.ceil(total / pageSize.value))

// 转换pageSizes为JvSelect需要的选项格式
const pageSizeOptions = computed<JvSelectOption[]>(() => {
  return pageSizes.map(size => ({
    label: `${size} 条/页`,
    value: size,
  }))
})

const isRtl = ref(false)
function updateRtl() {
  isRtl.value
    = document.dir === 'rtl' || document.body.classList.contains('is-rtl')
}
onMounted(() => {
  updateRtl()
  window.addEventListener('directionchange', updateRtl)
})
onUnmounted(() => {
  window.removeEventListener('directionchange', updateRtl)
})

watch(
  () => modelValue,
  (val) => {
    if (val !== currentPage.value)
      currentPage.value = val
  },
)

// 监听pageSize属性变化，确保双向绑定正确工作
watch(
  () => pageSizeProp,
  (val) => {
    if (val !== pageSize.value)
      pageSize.value = val
  },
)

function changePage(page: number) {
  if (page < 1 || page > totalPages.value)
    return
  currentPage.value = page
  emit('update:modelValue', page)
  emit('change', page, pageSize.value)
}

function changePageSize(size: number | string | number[] | string[]) {
  // 确保转换为数字类型
  const newSize = Number(size)
  // 只有当转换结果是有效数字时才更新
  if (!Number.isNaN(newSize)) {
    pageSize.value = newSize
    emit('update:pageSize', newSize)
    emit('change', currentPage.value, newSize)
  }
}

const pageList = computed(() => {
  const pages = []
  const totalVal = totalPages.value
  const cur = currentPage.value
  if (totalVal <= 7) {
    for (let i = 1; i <= totalVal; i++) pages.push(i)
  }
  else {
    if (cur <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalVal)
    }
    else if (cur >= totalVal - 3) {
      pages.push(
        1,
        '...',
        totalVal - 4,
        totalVal - 3,
        totalVal - 2,
        totalVal - 1,
        totalVal,
      )
    }
    else {
      pages.push(1, '...', cur - 1, cur, cur + 1, '...', totalVal)
    }
  }
  return isRtl.value ? pages.reverse() : pages
})

const pagebtnVariant = computed(() => {
  return (p: string | number) => p === '...' ? 'text' : 'flat'
})

const pagebtnColor = computed(() => {
  return (p: string | number) => p === currentPage.value ? 'primary' : 'default'
})
</script>

<template>
  <nav :class="[bem.b(), simple && 'is-simple', isRtl && 'is-rtl']">
    <!-- 导航控制区 -->
    <div :class="bem.e('nav')">
      <!-- 前一页按钮 -->
      <JvButton
        :class="bem.e('nav-btn')" :disabled="currentPage === 1" size="small" variant="flat"
        :prepend-icon="isRtl ? '$chevronRight' : '$chevronLeft'" @click="changePage(currentPage - 1)"
      />

      <!-- 页码区域 -->
      <TransitionGroup v-if="!simple" name="jv-pagination-fade" tag="div" :class="bem.e('pages')">
        <JvButton
          v-for="p in pageList" :key="p" :class="[
            bem.e('page-btn'),
            bem.is('active', p === currentPage),
            bem.is('ellipsis', p === '...'),
          ]" :disabled="p === '...'" size="small" :variant="pagebtnVariant(p)" :color="pagebtnColor(p)"
          @click="typeof p === 'number' && changePage(p)"
        >
          {{ p }}
        </JvButton>
      </TransitionGroup>
      <!-- 后一页按钮 -->
      <JvButton
        :class="bem.e('nav-btn')" :disabled="currentPage === totalPages" size="small" variant="flat"
        :append-icon="isRtl ? '$chevronLeft' : '$chevronRight'" @click="changePage(currentPage + 1)"
      />
    </div>

    <!-- 信息和控制区 -->
    <div :class="bem.e('controls')">
      <!-- 总条数信息 -->
      <JvFlex :gap="8" align="center">
        <JvText :class="bem.e('total')" secondary>
          {{ total }}
        </JvText>
        <JvSelect
          v-model="pageSize" inline size="small" :class="bem.e('select')" :options="pageSizeOptions"
          @change="changePageSize"
        />
      </JvFlex>
      <!-- 每页条数选择器 -->

      <!-- 跳转到特定页面 -->
      <JvInputNumber
        v-model="currentPage" :min="1" :max="totalPages" size="small" inline
        :class="bem.e('jump-input')" @change="changePage"
      >
        <template #prepend>
          <JvText secondary>
            跳转
          </JvText>
        </template>
        <template #append>
          <JvText secondary>
            页
          </JvText>
        </template>
      </JvInputNumber>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.jv-pagination {
  --jv-pagination-gap: 16px;
  --jv-pagination-padding: 8px 0;
  --jv-pagination-font-size: 14px;
  --jv-pagination-font-size-mobile: 13px;
  --jv-pagination-btn-min-width: 32px;
  --jv-pagination-btn-min-width-mobile: 28px;
  --jv-pagination-btn-height: 32px;
  --jv-pagination-btn-height-mobile: 28px;
  --jv-pagination-total-margin-x: 8px;
  --jv-pagination-total-color: var(--jv-theme-on-background, #282828);
  --jv-pagination-total-font-size: 14px;
  --jv-pagination-select-width: 100px;
  --jv-pagination-select-width-mobile: 80px;
  --jv-pagination-jump-margin-left: 8px;
  --jv-pagination-input-width: 60px;
  --jv-pagination-input-width-mobile: 32px;
  --jv-pagination-animation-duration: 0.3s;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--jv-pagination-gap);
  padding: var(--jv-pagination-padding);
  font-size: var(--jv-pagination-font-size);
  user-select: none;

  &.is-simple {
    .jv-pagination__pages {
      display: none;
    }

    .jv-pagination__jump {
      display: none;
    }
  }

  &.is-rtl {
    flex-direction: row-reverse;

    .jv-pagination__nav {
      flex-direction: row-reverse;
    }

    .jv-pagination__controls {
      flex-direction: row-reverse;
    }
  }

  // 导航区域样式
  .jv-pagination__nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  // 页码区域样式
  .jv-pagination__pages {
    position: relative;
    display: flex;
    overflow: hidden;
    flex: 1;
    align-items: center;
    gap: 4px;
  }

  // 页码按钮样式
  .jv-pagination__page-btn {
    min-width: var(--jv-pagination-btn-min-width);
  }

  // 导航按钮样式
  .jv-pagination__nav-btn {
    min-width: fit-content;
  }

  // 控制区域样式
  .jv-pagination__controls {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 16px;
  }

  // 总数显示样式
  .jv-pagination__total {
    margin: 0;
    white-space: nowrap;
  }

  // 选择器样式
  .jv-pagination__select {
    width: var(--jv-pagination-select-width);
  }

  // 跳转区域样式
  .jv-pagination__jump {
    display: flex;
    align-items: center;
    gap: 8px;

    .jv-pagination__jump-input {
      width: var(--jv-pagination-input-width);
    }
  }

  // 页码动画效果
  .jv-pagination-fade-move,
  .jv-pagination-fade-enter-active,
  .jv-pagination-fade-leave-active {
    transition: all var(--jv-pagination-animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
  }

  .jv-pagination-fade-enter-from {
    opacity: 0;
    transform: translateX(10px);
  }

  .jv-pagination-fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }

  .jv-pagination-fade-leave-active {
    position: absolute;
  }
}

// 暗色主题下的特殊调整
.jv-theme-dark .jv-pagination {
  --jv-pagination-btn-hover-bg: rgb(255 255 255 / 0.1);
}

// 响应式样式
@media (width <=600px) {
  .jv-pagination {
    // 在移动设备上更改布局方向
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--jv-pagination-font-size-mobile);

    .jv-pagination__nav {
      justify-content: space-between;
      width: 100%;
    }

    .jv-pagination__controls {
      justify-content: space-between;
      width: 100%;
    }

    .jv-pagination__page-btn,
    .jv-pagination__nav-btn {
      min-width: var(--jv-pagination-btn-min-width-mobile);
      height: var(--jv-pagination-btn-height-mobile);
      padding: 0 4px;
      font-size: var(--jv-pagination-font-size-mobile);
    }

    .jv-pagination__pages {
      gap: 2px;
    }

    .jv-pagination__select {
      width: var(--jv-pagination-select-width-mobile);
    }

    .jv-pagination__jump {
      gap: 4px;

      .jv-pagination__jump-input {
        width: var(--jv-pagination-input-width-mobile);
      }
    }

    // 移动端动画更快
    --jv-pagination-animation-duration: 0.2s;
  }
}
</style>
