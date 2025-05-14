<script setup lang="ts">
import type { JvFormItemEmits, JvFormItemProps } from './item'
import type {
  FormItemValue,
  FormValidateResult,
  FormValidateRule,
  FormValidateStatus,
  JvFormContext,
} from './types'
import { useComponentId } from '@/hooks/useComponentId'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  computeLabelWidthStyle,
  filterRulesByTrigger,
  getNestedValue,
  isRequiredField,
  mergeRules,
  setNestedValue,
  validateField,
} from './helper'
import { bem, JVFORMITEM_NAME } from './item'
import { JvFormContextKey } from './types'

defineOptions({ name: JVFORMITEM_NAME, inheritAttrs: false })

// 使用解构写法并提供默认值
const {
  label,
  prop,
  required,
  rules: propRules,
  labelWidth,
  showMessage = true,
  errorPosition = 'bottom',
  inline,
  labelPosition,
  size,
  disabled: _disabled,
  wrapInput = true, // 默认使用包裹模式
} = defineProps<JvFormItemProps>()

const emit = defineEmits<JvFormItemEmits>()

// 注入表单上下文
const formContext = inject<JvFormContext | undefined>(
  JvFormContextKey,
  undefined,
)

// 生成唯一ID
const uniqueId = useComponentId(JVFORMITEM_NAME)

// 验证状态
const validateState = ref<FormValidateStatus>('')

// 验证消息
const validateMessage = ref('')

// 验证监听器
const validateDisposer = ref<ReturnType<typeof watch> | null>(null)

// 字段初始值
const initialValue = ref<FormItemValue>()

// 是否为嵌套字段
const isNested = computed(() => prop && prop.includes('.'))

// 标签位置
const computedLabelPosition = computed(
  () => labelPosition || formContext?.labelPosition || 'left',
)

// 尺寸
const computedSize = computed(() => size || formContext?.size || 'medium')

// 是否必填
const isRequired = computed(() => isRequiredField(required, getRules()))

// 包裹模式的标签样式类
const labelWrapperClass = computed(() => {
  const baseClasses = [
    bem.e('label-wrapper'),
    bem.is('required', isRequired.value && !formContext?.hideRequiredAsterisk),
    bem.is('error', validateState.value === 'error'),
  ]

  if (labelPosition || formContext?.labelPosition) {
    baseClasses.push(bem.m(`position-${computedLabelPosition.value}`))
  }

  if (size || formContext?.size) {
    baseClasses.push(bem.m(`size-${computedSize.value}`))
  }

  if (inline || formContext?.inline) {
    baseClasses.push(bem.is('inline', true))
  }

  return baseClasses
})

// 获取字段值
const fieldValue = computed(() => {
  if (!formContext?.model || !prop)
    return undefined

  if (isNested.value) {
    return getNestedValue(formContext.model, prop)
  }

  return formContext.model[prop]
})

// 获取规则
function getRules(trigger?: string): FormValidateRule[] {
  // 合并表单项规则和表单规则
  const rules = mergeRules(
    propRules,
    formContext?.rules && prop ? formContext.rules[prop] : undefined,
  )

  // 过滤规则
  return trigger ? filterRulesByTrigger(rules, trigger) : rules
}

// 标签宽度
const labelWidthStyle = computed(() =>
  computeLabelWidthStyle(labelWidth ?? formContext?.labelWidth, labelPosition),
)

// 是否显示错误消息
const shouldShowMessage = computed(() =>
  showMessage !== undefined
    ? showMessage
    : formContext?.showMessage !== undefined
      ? formContext.showMessage
      : true,
)

// 为屏幕阅读器添加的描述元素ID
const ariaDescribedby = computed(() =>
  validateState.value === 'error' && shouldShowMessage.value
    ? `${uniqueId}-error`
    : undefined,
)

// 验证字段
async function validate(
  trigger = '',
  callback?: (result: FormValidateResult) => void,
): Promise<FormValidateResult> {
  // 如果没有绑定字段或表单上下文，则直接返回成功
  if (!prop || !formContext?.model) {
    console.warn('[JvFormItem] prop is required for validate to work!')
    return { valid: true, errors: [], fields: {} }
  }

  // 获取规则
  const rules = getRules(trigger)

  // 如果没有规则，则直接返回成功
  if (rules.length === 0) {
    if (callback)
      callback({ valid: true, errors: [], fields: {} })
    return { valid: true, errors: [], fields: {} }
  }

  // 设置验证状态为验证中
  validateState.value = 'validating'

  // 执行校验
  const result = await validateField(prop, fieldValue.value, rules)

  if (result.valid) {
    // 校验通过
    validateState.value = 'success'
    validateMessage.value = ''

    // 触发验证事件
    emit('validate', true, '')
  }
  else {
    // 校验失败
    validateState.value = 'error'
    validateMessage.value = result.message

    // 触发验证事件
    emit('validate', false, validateMessage.value)
  }

  // 执行回调
  if (callback)
    callback(result)

  return result
}

// 重置字段
function resetField() {
  // 重置验证状态
  validateState.value = ''
  validateMessage.value = ''

  // 重置字段值
  if (formContext?.model && prop && initialValue.value !== undefined) {
    if (isNested.value) {
      // 处理嵌套字段
      setNestedValue(formContext.model, prop, initialValue.value)
    }
    else {
      formContext.model[prop] = initialValue.value
    }
  }
}

// 清除验证状态
function clearValidate() {
  validateState.value = ''
  validateMessage.value = ''
}

// 设置初始值
function setInitialValue() {
  if (prop && formContext?.model) {
    initialValue.value = fieldValue.value
  }
}

// 挂载时添加到表单
onMounted(() => {
  if (prop) {
    // 注册到表单
    formContext?.addField({
      prop,
      validate,
      resetField,
      clearValidate,
    })

    // 添加值监听
    if (formContext?.model) {
      validateDisposer.value = watch(
        () => fieldValue.value,
        // 使用下划线前缀忽略未使用的参数
        (_newVal, _oldVal) => {
          // 当值变化时，如果处于错误状态，则尝试校验
          if (validateState.value === 'error') {
            validate('change')
          }
        },
      )
    }

    // 设置初始值
    setInitialValue()
  }
})

// 卸载时从表单移除
onBeforeUnmount(() => {
  if (prop) {
    // 取消验证监听
    validateDisposer.value?.()

    // 从表单注销
    formContext?.removeField({
      prop,
      validate,
      resetField,
      clearValidate,
    })
  }
})

// 暴露方法
defineExpose({
  validate,
  resetField,
  clearValidate,
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('error', validateState === 'error'),
      bem.is('success', validateState === 'success'),
      bem.is('validating', validateState === 'validating'),
      bem.is('inline', inline || formContext?.inline),
    ]"
    role="group"
    :aria-labelledby="label ? `${uniqueId}-label` : undefined"
    :aria-invalid="validateState === 'error' ? 'true' : undefined"
  >
    <!-- 使用for/id显式关联方式 -->
    <template v-if="label && !wrapInput">
      <!-- 标签 -->
      <label
        :id="`${uniqueId}-label`"
        :class="[
          bem.e('label'),
          bem.is('required', isRequired && !formContext?.hideRequiredAsterisk),
          bem.is('error', validateState === 'error'),
          bem.m(`position-${computedLabelPosition}`),
          bem.m(`size-${computedSize}`),
        ]"
        :style="labelWidthStyle"
        :for="uniqueId"
      >
        {{ label }}
      </label>

      <div :class="bem.e('content')">
        <!-- 上方错误信息 -->
        <div
          v-if="
            validateState === 'error'
              && shouldShowMessage
              && errorPosition === 'top'
          "
          :id="`${uniqueId}-error`"
          :class="bem.e('error')"
          role="alert"
          aria-live="assertive"
        >
          {{ validateMessage }}
        </div>

        <!-- 表单项内容 -->
        <div :class="bem.e('field')" :aria-describedby="ariaDescribedby">
          <slot :id="uniqueId" />

          <!-- 右侧错误信息 -->
          <div
            v-if="
              validateState === 'error'
                && shouldShowMessage
                && errorPosition === 'right'
            "
            :id="`${uniqueId}-error`"
            :class="[bem.e('error'), bem.em('error', 'right')]"
            role="alert"
            aria-live="assertive"
          >
            {{ validateMessage }}
          </div>
        </div>

        <!-- 下方错误信息 -->
        <div
          v-if="
            validateState === 'error'
              && shouldShowMessage
              && errorPosition === 'bottom'
          "
          :id="`${uniqueId}-error`"
          :class="bem.e('error')"
          role="alert"
          aria-live="assertive"
        >
          {{ validateMessage }}
        </div>
      </div>
    </template>

    <!-- 使用label包裹方式（隐式关联） -->
    <template v-else>
      <label v-if="label" :class="labelWrapperClass">
        <span :class="bem.e('text')">{{ label }}</span>

        <div :class="bem.e('content')">
          <!-- 上方错误信息 -->
          <div
            v-if="
              validateState === 'error'
                && shouldShowMessage
                && errorPosition === 'top'
            "
            :id="`${uniqueId}-error`"
            :class="bem.e('error')"
            role="alert"
            aria-live="assertive"
          >
            {{ validateMessage }}
          </div>

          <!-- 表单项内容 -->
          <div :class="bem.e('field')" :aria-describedby="ariaDescribedby">
            <slot />

            <!-- 右侧错误信息 -->
            <div
              v-if="
                validateState === 'error'
                  && shouldShowMessage
                  && errorPosition === 'right'
              "
              :id="`${uniqueId}-error`"
              :class="[bem.e('error'), bem.em('error', 'right')]"
              role="alert"
              aria-live="assertive"
            >
              {{ validateMessage }}
            </div>
          </div>

          <!-- 下方错误信息 -->
          <div
            v-if="
              validateState === 'error'
                && shouldShowMessage
                && errorPosition === 'bottom'
            "
            :id="`${uniqueId}-error`"
            :class="bem.e('error')"
            role="alert"
            aria-live="assertive"
          >
            {{ validateMessage }}
          </div>
        </div>
      </label>

      <!-- 没有标签时只显示内容 -->
      <div v-else :class="bem.e('content')">
        <!-- 上方错误信息 -->
        <div
          v-if="
            validateState === 'error'
              && shouldShowMessage
              && errorPosition === 'top'
          "
          :id="`${uniqueId}-error`"
          :class="bem.e('error')"
          role="alert"
          aria-live="assertive"
        >
          {{ validateMessage }}
        </div>

        <!-- 表单项内容 -->
        <div :class="bem.e('field')" :aria-describedby="ariaDescribedby">
          <slot />

          <!-- 右侧错误信息 -->
          <div
            v-if="
              validateState === 'error'
                && shouldShowMessage
                && errorPosition === 'right'
            "
            :id="`${uniqueId}-error`"
            :class="[bem.e('error'), bem.em('error', 'right')]"
            role="alert"
            aria-live="assertive"
          >
            {{ validateMessage }}
          </div>
        </div>

        <!-- 下方错误信息 -->
        <div
          v-if="
            validateState === 'error'
              && shouldShowMessage
              && errorPosition === 'bottom'
          "
          :id="`${uniqueId}-error`"
          :class="bem.e('error')"
          role="alert"
          aria-live="assertive"
        >
          {{ validateMessage }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.#{$namespace}-form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;

  &.is-inline {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    margin-right: 16px;
  }

  // 普通标签样式
  &__label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding-right: 12px;
    color: var(--jv-text-color);
    font-weight: var(--jv-font-weight-medium);

    &.is-position-top {
      justify-content: flex-start;
      padding-right: 0;
      padding-bottom: 8px;
    }

    &.is-position-right {
      justify-content: flex-start;
      padding-right: 0;
      padding-left: 12px;
      order: 2;
    }

    &.is-required::before {
      margin-right: 4px;
      color: var(--jv-danger);
      content: '*';
    }

    &.is-error {
      color: var(--jv-danger);
    }

    &.is-size-small {
      font-size: var(--jv-font-size-sm);
    }

    &.is-size-medium {
      font-size: var(--jv-font-size-base);
    }

    &.is-size-large {
      font-size: var(--jv-font-size-lg);
    }

    &.is-size-xlarge {
      font-size: var(--jv-font-size-xl);
    }
  }

  // 包裹标签样式
  &__label-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 0;

    &--position-top {
      flex-direction: column;

      .#{$namespace}-form-item__text {
        margin-bottom: 8px;
      }
    }

    &--position-left {
      flex-direction: row;

      .#{$namespace}-form-item__text {
        width: calc(var(--jv-label-width, 100px));
        padding-right: 12px;
        text-align: right;
      }
    }

    &--position-right {
      flex-direction: row;

      .#{$namespace}-form-item__text {
        width: calc(var(--jv-label-width, 100px));
        padding-left: 12px;
        text-align: left;
        order: 2;
      }
    }

    &.is-required .#{$namespace}-form-item__text::before {
      margin-right: 4px;
      color: var(--jv-danger);
      content: '*';
    }

    &.is-error .#{$namespace}-form-item__text {
      color: var(--jv-danger);
    }

    &.is-inline {
      display: inline-flex;
      width: auto;
      margin-right: 16px;
    }

    &--size-small .#{$namespace}-form-item__text {
      font-size: var(--jv-font-size-sm);
    }

    &--size-medium .#{$namespace}-form-item__text {
      font-size: var(--jv-font-size-base);
    }

    &--size-large .#{$namespace}-form-item__text {
      font-size: var(--jv-font-size-lg);
    }

    &--size-xlarge .#{$namespace}-form-item__text {
      font-size: var(--jv-font-size-xl);
    }
  }

  &__text {
    display: inline-block;
    color: var(--jv-text-color);
    font-weight: var(--jv-font-weight-medium);
    line-height: 1.5;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &__field {
    position: relative;
  }

  &__error {
    padding-top: 4px;
    color: var(--jv-danger);
    font-size: var(--jv-font-size-sm);
    line-height: 1.2;

    &--right {
      position: absolute;
      top: 50%;
      right: -8px;
      padding-top: 0;
      padding-left: 8px;
      white-space: nowrap;
      transform: translateY(-50%) translateX(100%);
    }
  }

  &.is-error {
    :deep(input),
    :deep(textarea),
    :deep(select) {
      border-color: var(--jv-danger);

      &:focus {
        border-color: var(--jv-danger);
        box-shadow: 0 0 0 2px rgba(var(--jv-danger-rgb), 0.2);
      }
    }
  }

  &.is-success {
    :deep(input),
    :deep(textarea),
    :deep(select) {
      border-color: var(--jv-success);

      &:focus {
        border-color: var(--jv-success);
        box-shadow: 0 0 0 2px rgba(var(--jv-success-rgb), 0.2);
      }
    }
  }
}
</style>
