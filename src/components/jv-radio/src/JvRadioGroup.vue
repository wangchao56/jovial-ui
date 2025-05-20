<script setup lang="ts">
import type { JvRadioGroupEmits, JvRadioGroupExpose, JvRadioGroupProps, RadioOption } from './group'
import { computed, provide, ref, toRef, watch } from 'vue'
import {
  bem,
  JVRADIOGROUP_NAME,
  JvRadioGroupContextKey,
} from './group'
import JvRadio from './JvRadio.vue'

defineOptions({ name: JVRADIOGROUP_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvRadioGroupProps>(), {
  modelValue: undefined,
  disabled: false,
  column: false,
  inline: false,
  bordered: false,
  compact: false,
  animated: true,
  options: () => [],
  columns: 0,
  remote: false,
  remoteParams: () => ({}),
  remoteLoading: false,
  valueField: 'value',
  labelField: 'label',
  labelPosition: 'right',
  error: false,
  gap: 12,
})
const emit = defineEmits<JvRadioGroupEmits>()

// 组件内部值，初始化为props中的modelValue
const radioGroupValue = defineModel('modelValue', { required: false })

// 选项数据
const options = ref<Set<RadioOption>>(new Set(props.options))

// 基于columns属性计算CSS Grid样式
const gridStyle = computed(() => {
  const { columns, gap } = props

  if (!columns || columns === 0) {
    return {}
  }

  const gapValue = typeof gap === 'number' ? `${gap}px` : gap

  // 处理响应式列数
  if (typeof columns === 'object') {
    // 基础样式 - 默认一列
    return {
      display: 'grid',
      gap: gapValue,
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    }
  }

  // 固定列数
  return {
    display: 'grid',
    gap: gapValue,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
})

// 当props.modelValue变化时更新内部值
watch(
  () => props.modelValue,
  (value) => {
    if (value !== radioGroupValue.value) {
      radioGroupValue.value = value
    }
  },
)

// 更新值的方法
function dispatch(
  event: 'change' | 'update:modelValue',
  value: any,
  _valueType: string,
) {
  radioGroupValue.value = value
  if (event === 'update:modelValue') {
    emit('update:modelValue', value)
  }
  else if (event === 'change') {
    emit('change', value)
  }
}

// 重置功能
function reset() {
  radioGroupValue.value = undefined
  emit('update:modelValue', undefined)
}

// 获取当前值
function getValue() {
  return radioGroupValue.value as string | number | boolean | undefined
}

// 设置当前值
function setValue(value: any) {
  radioGroupValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

const computedOptions = computed(() => Array.from(options.value))

// 向子组件提供上下文
provide(JvRadioGroupContextKey, {
  name: props.name,
  modelValue: toRef(props, 'modelValue'),
  disabled: props.disabled,
  color: props.color,
  animated: props.animated,
  dispatch,
  setValue,
  updateOption,
})

// 装填选项数据
function updateOption(_option: RadioOption) {
  options.value.add(_option)
}

// 向外部暴露的方法
defineExpose<JvRadioGroupExpose>({
  reset,
  getValue,
  setValue,
})
</script>

<template>
  <fieldset
    :class="[
      bem.b(),
      bem.is('column', column),
      bem.is('inline', inline),
      bem.is('bordered', bordered),
      bem.is('compact', compact),
      bem.is('disabled', disabled),
    ]" :aria-disabled="disabled" role="radiogroup" :aria-labelledby="`${name || 'radiogroup'}-legend`"
  >
    <!-- 图例/标题 -->
    <legend v-if="label" :id="`${name || 'radiogroup'}-legend`" :class="bem.e('legend')">
      {{ label }}
    </legend>
    <slot>
      <!-- 包装器 - 应用网格布局 -->
      <div :class="bem.e('wrapper')" :style="gridStyle">
        <template v-if="computedOptions.length > 0">
          <JvRadio
            v-for="(option, index) in computedOptions" :key="`${option.value}-${index}`"
            v-model="radioGroupValue" :label="option.label" :disabled="option.disabled"
            :value="option.value" :color="color"
            manual
          >
            {{ option.label }}
          </JvRadio>
        </template>
      </div>
    </slot>
  </fieldset>
</template>

<style lang="scss">
@include b(radio-group) {
  position: relative;
  display: inline-block;
  min-width: fit-content;
  margin: 0;
  padding: 0;
  border: none;

  --jv-radio-group-gap: 12px;

  @include e(wrapper) {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--jv-radio-group-gap);
    min-width: fit-content;
    place-content: flex-start flex-start;
  }

  @include e(legend) {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    color: #606266;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
  }

  @include e(prepend) {
    margin-bottom: 8px;
  }

  @include e(append) {
    margin-top: 8px;
  }

  @include e(loading) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    color: #909399;
    font-size: 14px;

    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 2px solid #409eff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: jv-radio-loading-spin 1s linear infinite;
    }
  }

  @include e(load-error) {
    width: 100%;
    padding: 16px;
    color: var(--jv-theme-error);
    font-size: 14px;
  }

  @include e(empty) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    border: 1px dashed #e4e7ed;
    border-radius: 4px;
    color: #909399;
    font-size: 14px;
  }

  @include e(error) {
    margin-top: 4px;
    color: var(--jv-theme-error);
    font-size: 12px;
  }

  @include when(column) {
    @include e(wrapper) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @include when(inline) {
    @include e(wrapper) {
      display: inline-flex;
    }
  }

  @include when(bordered) {
    padding: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    legend {
      padding: 0 8px;
    }

    &.is-error {
      border-color: var(--jv-theme-error);
    }
  }

  @include when(compact) {
    @include e(wrapper) {
      gap: 0;

      .jv-radio {
        margin-right: 0;
        margin-left: 0;

        &.is-bordered {
          margin-right: -1px;
          border-radius: 0;

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            margin-right: 0;
          }
        }
      }
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    legend {
      color: #c0c4cc;
    }
  }

  @include when(error) {
    .jv-radio-group__legend {
      color: var(--jv-theme-error);
    }
  }
}

// 加载动画
@keyframes jv-radio-loading-spin {
  100% {
    transform: rotate(360deg);
  }
}

// 过渡动画
.jv-fade-enter-active,
.jv-fade-leave-active {
  transition: opacity 0.3s ease;
}

.jv-fade-enter-from,
.jv-fade-leave-to {
  opacity: 0;
}
</style>
