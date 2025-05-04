<script setup lang="ts">
import type { JvTagGroupProps, JvTagItemProps } from './types'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import JvTag from '@components/jv-tag/src/JvTag.vue'
import { computed, ref, watch } from 'vue'
import { bem, JVTAGGROUP_NAME } from './types'

defineOptions({ name: JVTAGGROUP_NAME, inheritAttrs: false })

const {
  tags = [],
  collapsible = false,
  maxCollapse = 5,
  closable = false,
  addable = false,
  selectable = false,
  multiple = false,
  searchable = false,
  defaultTagType = 'primary',
  defaultTagSize = 'small',
  defaultTagVariant = 'outlined',
  defaultTagShape = 'square'
} = defineProps<JvTagGroupProps>()

const emit = defineEmits<{
  (e: 'close', tag: JvTagItemProps, index: number): void
  (e: 'add'): void
  (e: 'update:tags', tags: JvTagItemProps[]): void
  (e: 'select', tag: JvTagItemProps, index: number): void
  (e: 'search', keyword: string): void
}>()

const localTags = ref<JvTagItemProps[]>([...tags])
const isExpanded = ref(false)
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const searchKeyword = ref('')

// 监听外部tags变化
watch(
  () => tags,
  (newTags) => {
    localTags.value = [...newTags]
  },
  { deep: true }
)

const filteredTags = computed(() => {
  if (!searchKeyword.value || !searchable) {
    return localTags.value
  }
  return localTags.value.filter((tag) =>
    tag.props?.content
      ?.toLowerCase()
      .includes(searchKeyword.value.toLowerCase())
  )
})

const displayTags = computed(() => {
  const tagsToDisplay = filteredTags.value
  if (!collapsible || isExpanded.value || tagsToDisplay.length <= maxCollapse) {
    return tagsToDisplay
  }
  return tagsToDisplay.slice(0, maxCollapse)
})

const remainingCount = computed(() => {
  if (!collapsible || filteredTags.value.length <= maxCollapse) {
    return 0
  }
  return filteredTags.value.length - maxCollapse
})

function handleClose(event: MouseEvent, tag: JvTagItemProps, index: number) {
  emit('close', tag, index)
  const newTags = [...localTags.value]
  // 找到原始数组中的实际索引
  const actualIndex = localTags.value.findIndex((t) => t.id === tag.id)
  if (actualIndex !== -1) {
    newTags.splice(actualIndex, 1)
    localTags.value = newTags
    emit('update:tags', newTags)
  }
}

function handleAdd() {
  if (addable) {
    inputVisible.value = true
    setTimeout(() => {
      inputRef.value?.focus()
    }, 10)
  } else {
    emit('add')
  }
}

function handleSelect(
  selected: boolean,
  tag: JvTagItemProps,
  _index: number
): void {
  const newTags = [...localTags.value]
  // 找到原始数组中的实际索引
  const actualIndex = localTags.value.findIndex((t) => t.id === tag.id)

  if (actualIndex === -1) return

  if (!multiple) {
    // 单选模式：取消其他所有选中
    newTags.forEach((t) => {
      t.selected = false
    })
  }

  newTags[actualIndex].selected = selected
  localTags.value = newTags
  emit('update:tags', newTags)
  emit('select', tag, actualIndex)
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function handleSearch() {
  emit('search', searchKeyword.value)
}

function handleInputConfirm() {
  if (inputValue.value) {
    const newTag: JvTagItemProps = {
      id: Date.now(),
      selected: false,
      props: {
        type: defaultTagType,
        size: defaultTagSize,
        shape: defaultTagShape,
        variant: defaultTagVariant,
        content: inputValue.value
      }
    }
    const newTags = [...localTags.value, newTag]
    localTags.value = newTags
    emit('update:tags', newTags)
  }
  inputVisible.value = false
  inputValue.value = ''
}

function clearSelected() {
  const newTags = localTags.value.map((tag) => ({
    ...tag,
    selected: false
  }))
  localTags.value = newTags
  emit('update:tags', newTags)
}
</script>

<template>
  <div :class="bem.b()">
    <div v-if="searchable" :class="bem.e('search')">
      <input
        v-model="searchKeyword"
        type="text"
        :class="bem.e('search-input')"
        placeholder="搜索标签"
        @input="handleSearch"
      />
      <JvIcon
        v-if="searchKeyword"
        name="$close"
        size="small"
        :class="bem.e('search-clear')"
        @click="searchKeyword = ''"
      />
    </div>

    <div :class="bem.e('tags-container')">
      <slot name="prefix" />

      <JvTag
        v-for="(tag, index) in displayTags"
        :key="tag.id || index"
        :type="tag.props?.type"
        :size="tag.props?.size"
        :shape="tag.props?.shape"
        :variant="tag.props?.variant"
        :content="tag.props?.content"
        :closable="closable"
        :selectable="selectable"
        :selected="tag.selected"
        :class="bem.e('item')"
        @close="(e) => handleClose(e, tag, index)"
        @select="(selected: boolean) => handleSelect(selected, tag, index)"
      >
        <slot name="tag" :tag="tag">
          <slot>{{ tag.props?.content }}</slot>
        </slot>
      </JvTag>

      <JvTag
        v-if="remainingCount > 0"
        type="info"
        :class="bem.e('more')"
        @click="toggleExpand"
      >
        {{ isExpanded ? '收起' : `+${remainingCount}` }}
      </JvTag>

      <div v-if="inputVisible" :class="bem.e('input-wrapper')">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="text"
          :class="bem.e('input')"
          placeholder="请输入标签内容"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
      </div>

      <JvTag
        v-else-if="addable"
        type="info"
        variant="outlined"
        :class="bem.e('add')"
        @click="handleAdd"
      >
        <JvIcon name="$plus" size="small" /> 新增
      </JvTag>

      <slot name="suffix" />
    </div>

    <div v-if="selectable && multiple" :class="bem.e('actions')">
      <slot name="actions">
        <button
          v-if="localTags.some((tag) => tag.selected)"
          :class="bem.e('clear')"
          @click="clearSelected"
        >
          清除选择
        </button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@include b(tag-group) {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &__search {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    &-input {
      width: 100%;
      height: 32px;
      padding: 0 30px 0 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: var(--jv-rounded-md);
      font-size: 14px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: var(--jv-theme-primary);
        box-shadow: 0 0 0 2px rgba(var(--jv-theme-primary-rgb), 0.1);
      }
    }

    &-clear {
      position: absolute;
      right: 8px;
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;

      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  &__tags-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__more,
  &__add {
    cursor: pointer;
  }

  &__input-wrapper {
    display: inline-flex;
    align-items: center;
    min-width: 120px;
    height: 32px;
    vertical-align: bottom;
  }

  &__input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--jv-rounded-md);
    font-size: 12px;

    &:focus {
      outline: none;
      border-color: var(--jv-theme-primary);
      box-shadow: 0 0 0 2px rgba(var(--jv-theme-primary-rgb), 0.2);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  &__clear {
    padding: 4px 8px;
    border: none;
    border-radius: var(--jv-rounded-sm);
    background-color: rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
