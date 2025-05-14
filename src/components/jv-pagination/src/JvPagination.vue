<script setup lang="ts">
import type { JvSelectOption } from '@components/jv-select/src/types'
import type { JvPaginationEmits, JvPaginationProps } from './types'
import { useLocale } from '@/locale'
import JvSelect from '@components/jv-select/src/JvSelect.vue'
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

const { current, t } = useLocale()

// 转换pageSizes为JvSelect需要的选项格式
const pageSizeOptions = computed<JvSelectOption[]>(() => {
  return pageSizes.map(size => ({
    label: `${size}${t('pagination.itemsPerPage')}`,
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
watch(() => current.value, updateRtl)

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
</script>

<template>
  <nav :class="[bem.b(), simple && 'is-simple', isRtl && 'is-rtl']">
    <template v-if="isRtl">
      <button
        :class="bem.e('btn')"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <span style="display: inline-block; transform: scaleX(-1)">←</span>
        {{ t('pagination.next') }}
      </button>
      <template v-if="!simple">
        <button
          v-for="p in pageList"
          :key="p"
          :class="[
            bem.e('btn'),
            bem.is('active', p === currentPage),
            bem.is('ellipsis', p === '...'),
          ]"
          :disabled="p === '...'"
          @click="typeof p === 'number' && changePage(p)"
        >
          {{ p === '...' ? '...' : t('pagination.page', p) }}
        </button>
      </template>
      <button
        :class="bem.e('btn')"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <span style="display: inline-block; transform: scaleX(-1)">→</span>
        {{ t('pagination.prev') }}
      </button>
    </template>
    <template v-else>
      <button
        :class="bem.e('btn')"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        {{ t('pagination.prev') }}
        <span style="display: inline-block">←</span>
      </button>
      <template v-if="!simple">
        <button
          v-for="p in pageList"
          :key="p"
          :class="[
            bem.e('btn'),
            bem.is('active', p === currentPage),
            bem.is('ellipsis', p === '...'),
          ]"
          :disabled="p === '...'"
          @click="typeof p === 'number' && changePage(p)"
        >
          {{ p === '...' ? '...' : t('pagination.page', p) }}
        </button>
      </template>
      <button
        :class="bem.e('btn')"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        {{ t('pagination.next') }}
        <span style="display: inline-block">→</span>
      </button>
    </template>
    <span :class="bem.e('total')">{{ t('pagination.total', total) }}</span>
    <!-- 使用JvSelect替换原生select -->
    <JvSelect
      v-model="pageSize"
      inline
      :class="bem.e('select')"
      :options="pageSizeOptions"
      size="small"
      @change="changePageSize"
    />
    <span v-if="!simple" :class="bem.e('jump')">
      {{ t('pagination.jumpTo') }}
      <input
        v-model.number="currentPage"
        type="number"
        min="1"
        :max="totalPages"
        style="width: 40px"
        @change="changePage(currentPage)"
      >
      {{ t('pagination.page') }}
    </span>
  </nav>
</template>

<style scoped lang="scss">
.jv-pagination {
  --jv-pagination-gap: 8px;
  --jv-pagination-padding: 8px 0;
  --jv-pagination-font-size: 15px;
  --jv-pagination-font-size-mobile: 13px;
  --jv-pagination-btn-min-width: 32px;
  --jv-pagination-btn-min-width-mobile: 28px;
  --jv-pagination-btn-height: 32px;
  --jv-pagination-btn-height-mobile: 28px;
  --jv-pagination-btn-bg: #f5f5f7;
  --jv-pagination-btn-color: #333;
  --jv-pagination-btn-radius: 6px;
  --jv-pagination-btn-margin-x: 2px;
  --jv-pagination-btn-active-bg: #409eff;
  --jv-pagination-btn-active-color: #fff;
  --jv-pagination-btn-disabled-opacity: 0.5;
  --jv-pagination-total-margin-x: 8px;
  --jv-pagination-total-color: #888;
  --jv-pagination-total-font-size: 14px;
  --jv-pagination-select-width: 100px;
  --jv-pagination-select-width-mobile: 80px;
  --jv-pagination-select-radius: 4px;
  --jv-pagination-select-border: #ddd;
  --jv-pagination-select-padding: 2px 8px;
  --jv-pagination-select-font-size: 14px;
  --jv-pagination-jump-margin-left: 8px;
  --jv-pagination-input-border: #ddd;
  --jv-pagination-input-radius: 4px;
  --jv-pagination-input-padding: 2px 4px;
  --jv-pagination-input-font-size: 14px;
  --jv-pagination-input-font-size-mobile: 13px;
  --jv-pagination-input-width: 40px;
  --jv-pagination-input-width-mobile: 32px;
  --jv-pagination-input-height-mobile: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--jv-pagination-gap, 8px);
  padding: var(--jv-pagination-padding, 8px 0);
  user-select: none;
  font-size: var(--jv-pagination-font-size, 15px);

  &.is-simple {
    .jv-pagination__btn:not(:first-child):not(:last-child),
    .jv-pagination__jump {
      display: none;
    }
  }

  &.is-rtl {
    flex-direction: row-reverse;

    .jv-pagination__jump {
      margin-right: var(--jv-pagination-jump-margin-left, 8px);
      margin-left: 0;
    }

    .jv-pagination__total {
      margin: 0 var(--jv-pagination-total-margin-x, 8px);
    }
  }

  .jv-pagination__btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: var(--jv-pagination-btn-min-width, 32px);
    height: var(--jv-pagination-btn-height, 32px);
    margin: 0 var(--jv-pagination-btn-margin-x, 2px);
    padding: 0 8px;
    border: none;
    border-radius: var(--jv-pagination-btn-radius, 6px);
    background: var(--jv-pagination-btn-bg, #f5f5f7);
    color: var(--jv-pagination-btn-color, #333);
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s,
      box-shadow 0.2s;

    &.is-active {
      background: var(--jv-pagination-btn-active-bg, #409eff);
      color: var(--jv-pagination-btn-active-color, #fff);
      font-weight: bold;
    }

    &.is-ellipsis {
      background: transparent;
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: var(--jv-pagination-btn-disabled-opacity, 0.5);
    }
  }

  .jv-pagination__total {
    margin: 0 var(--jv-pagination-total-margin-x, 8px);
    color: var(--jv-pagination-total-color, #888);
    font-size: var(--jv-pagination-total-font-size, 14px);
  }

  .jv-pagination__select {
    width: var(--jv-pagination-select-width, 100px);
  }

  .jv-pagination__jump {
    display: flex;
    align-items: center;
    margin-left: var(--jv-pagination-jump-margin-left, 8px);

    input {
      box-sizing: border-box;
      width: var(--jv-pagination-input-width, 40px);
      height: var(--jv-pagination-btn-height, 32px);
      margin: 0 4px;
      padding: var(--jv-pagination-input-padding, 2px 4px);
      border: 1px solid var(--jv-pagination-input-border, #ddd);
      border-radius: var(--jv-pagination-input-radius, 4px);
      font-size: var(--jv-pagination-input-font-size, 14px);
      text-align: center;
    }
  }
}

@media (width <= 600px) {
  .jv-pagination {
    gap: 4px;
    font-size: var(--jv-pagination-font-size-mobile, 13px);

    .jv-pagination__btn,
    .jv-pagination__total {
      min-width: var(--jv-pagination-btn-min-width-mobile, 28px);
      height: var(--jv-pagination-btn-height-mobile, 28px);
      padding: 0 4px;
      font-size: var(--jv-pagination-font-size-mobile, 13px);
    }

    .jv-pagination__select {
      width: var(--jv-pagination-select-width-mobile, 80px);
    }

    .jv-pagination__jump {
      margin-left: 4px;
      font-size: var(--jv-pagination-font-size-mobile, 13px);

      input {
        width: var(--jv-pagination-input-width-mobile, 32px);
        height: var(--jv-pagination-input-height-mobile, 24px);
        margin: 0 2px;
        padding: 0 2px;
        font-size: var(--jv-pagination-input-font-size-mobile, 13px);
      }
    }
  }
}
</style>
