<script setup lang="ts">
import type {
  FormValidateCallback,
  FormValidateError,
  FormValidateResult,
  JvFormContext,
  JvFormEmits,
  JvFormItemContext,
  JvFormProps,
} from './types'
import { computed, provide, reactive, ref, watch } from 'vue'
import { bem, JVFORM_NAME, JvFormContextKey } from './types'

defineOptions({ name: JVFORM_NAME, inheritAttrs: false })

const props = defineProps<JvFormProps>()

const _emit = defineEmits<JvFormEmits>()

// 存储所有表单项
const fields = ref<JvFormItemContext[]>([])

// 可能有aria-label的计算属性
const formAriaLabel = computed(() => props.ariaLabel || '表单')

// 添加表单项
function addField(field: JvFormItemContext) {
  fields.value.push(field)
}

// 移除表单项
function removeField(field: JvFormItemContext) {
  if (field.prop) {
    fields.value = fields.value.filter(item => item !== field)
  }
}

// 校验整个表单
async function validate(
  callback?: FormValidateCallback,
): Promise<FormValidateResult> {
  if (!props.model) {
    console.warn('[JvForm] model is required for validate to work!')
    return {
      valid: false,
      errors: [],
      fields: {},
    }
  }

  // 所有字段的验证结果
  let valid = true
  const errors: FormValidateError[] = []
  const validationFields: Record<string, FormValidateError[]> = {}

  // 执行所有字段的验证
  const validateResults = await Promise.all(
    fields.value.map(field => field.validate('submit')),
  )

  // 合并验证结果
  validateResults.forEach((result) => {
    valid = valid && result.valid
    if (result.errors) {
      errors.push(...result.errors)
      Object.assign(validationFields, result.fields)
    }
  })

  // 执行回调函数
  if (callback) {
    callback(valid, valid ? undefined : validationFields)
  }

  return {
    valid,
    errors,
    fields: validationFields,
  }
}

// 验证指定字段
async function validateField(
  fieldProps: string | string[],
  callback?: FormValidateCallback,
): Promise<FormValidateResult> {
  const props_array = Array.isArray(fieldProps) ? fieldProps : [fieldProps]
  const fieldsToValidate = fields.value.filter(
    field => field.prop && props_array.includes(field.prop),
  )

  if (fieldsToValidate.length === 0) {
    console.warn(`[JvForm] Fields ${props_array.join(', ')} not found`)
    return {
      valid: false,
      errors: [],
      fields: {},
    }
  }

  let valid = true
  const errors: FormValidateError[] = []
  const validationFields: Record<string, FormValidateError[]> = {}

  // 执行指定字段的验证
  const validateResults = await Promise.all(
    fieldsToValidate.map(field => field.validate('submit')),
  )

  // 合并验证结果
  validateResults.forEach((result) => {
    valid = valid && result.valid
    if (result.errors) {
      errors.push(...result.errors)
      Object.assign(validationFields, result.fields)
    }
  })

  // 执行回调函数
  if (callback) {
    callback(valid, valid ? undefined : validationFields)
  }

  return {
    valid,
    errors,
    fields: validationFields,
  }
}

// 重置表单
function resetFields() {
  if (!fields.value.length)
    return
  fields.value.forEach(field => field.resetField())
}

// 清除验证信息
function clearValidate(fieldProps?: string | string[]) {
  const props_array = fieldProps
    ? Array.isArray(fieldProps)
      ? fieldProps
      : [fieldProps]
    : []

  const fieldsToReset = props_array.length
    ? fields.value.filter(
        field => field.prop && props_array.includes(field.prop),
      )
    : fields.value

  fieldsToReset.forEach(field => field.clearValidate())
}

// 清除所有验证信息
function clearValidateAll() {
  fields.value.forEach(field => field.clearValidate())
}

// 获取表单数据
function getFieldsValue() {
  return props.model || {}
}

// 设置表单数据
function setFieldsValue(newFields: Record<string, any>) {
  if (!props.model)
    return

  Object.keys(newFields).forEach((key) => {
    if (props.model && Object.prototype.hasOwnProperty.call(props.model, key)) {
      // 使用解构和重新赋值的方式更新值，不直接修改props
      if (props.model) {
        const updatedModel = { ...props.model }
        updatedModel[key] = newFields[key]
        // 发出update:model事件，让父组件更新model
        _emit('update:model', updatedModel)
      }
    }
  })
}

// 处理回车键验证表单
function handleEnterKey(event: KeyboardEvent) {
  // 防止表单默认提交
  event.preventDefault()
  // 触发验证
  validate()
}

// 暴露表单上下文
provide(
  JvFormContextKey,
  reactive<JvFormContext>({
    model: props.model,
    rules: props.rules,
    labelWidth: props.labelWidth,
    labelPosition: props.labelPosition,
    disabled: props.disabled,
    inline: props.inline,
    showMessage: props.showMessage,
    validateOnRuleChange: props.validateOnRuleChange,
    hideRequiredAsterisk: props.hideRequiredAsterisk,
    requireAsteriskPosition: props.requireAsteriskPosition,
    scrollToError: props.scrollToError,
    size: props.size,
    addField,
    removeField,
    validateField,
  }),
)

// 监听规则变化
watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) {
      validate()
    }
  },
  { deep: true },
)

// 暴露方法
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  clearValidateAll,
  getFieldsValue,
  setFieldsValue,
})
</script>

<template>
  <form
    :class="[
      bem.b(),
      {
        [bem.m('inline')]: props.inline,
        [bem.m(`label-${props.labelPosition}`)]: props.labelPosition,
      },
    ]"
    role="form"
    :aria-label="formAriaLabel"
    :aria-disabled="props.disabled ? 'true' : undefined"
    novalidate
    @submit.prevent
    @keydown.enter="handleEnterKey"
  >
    <slot />
  </form>
</template>

<style lang="scss">
.jv-form {
  margin: 0;
  padding: 0;

  &--inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  &--label-top {
    .jv-form-item__label {
      display: block;
      margin-bottom: 8px;
    }
  }

  &--label-left {
    .jv-form-item {
      display: flex;
      align-items: flex-start;
    }

    .jv-form-item__label {
      text-align: left;
    }
  }

  &--label-right {
    .jv-form-item {
      display: flex;
      align-items: flex-start;
    }

    .jv-form-item__label {
      text-align: right;
    }
  }

  // 焦点指示器样式
  &:focus-within {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--jv-theme-primary, #409eff);
    outline-offset: 2px;
  }
}
</style>
