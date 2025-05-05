# JvForm 表单组件

表单组件用于创建交互式表单，支持数据绑定、表单验证、不同的样式和布局选项。

## 功能特性

- 支持数据双向绑定
- 内置表单验证功能，基于 async-validator 库
- 支持多种布局方式：标准、内联和不同的标签位置
- 支持嵌套字段的数据绑定和验证
- 完全符合可访问性标准
- 支持动态表单项
- 自定义验证规则
- 多种尺寸和样式选项

## 组件组成

- `JvForm`: 表单容器组件
- `JvFormItem`: 表单项组件

## 基本用法

```vue
<template>
  <JvForm ref="formRef" :model="formData" :rules="rules" label-width="100px">
    <JvFormItem label="姓名" prop="name">
      <JvInput v-model="formData.name" placeholder="请输入姓名" />
    </JvFormItem>

    <JvFormItem label="邮箱" prop="email">
      <JvInput v-model="formData.email" placeholder="请输入邮箱" />
    </JvFormItem>

    <JvFormItem>
      <JvButton type="primary" @click="submitForm">提交</JvButton>
      <JvButton @click="resetForm">重置</JvButton>
    </JvFormItem>
  </JvForm>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { JvForm, JvFormItem } from '@/components/jv-form'
import JvInput from '@/components/jv-input'
import JvButton from '@/components/jv-button'

const formData = reactive({
  name: '',
  email: ''
})

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const formRef = ref()

const submitForm = async () => {
  const result = await formRef.value.validate()
  if (result.valid) {
    console.log('验证通过，提交的数据:', formData)
  }
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
```

## JvForm API

### 属性

| 属性名                  | 类型          | 默认值   | 说明                                               |
| ----------------------- | ------------- | -------- | -------------------------------------------------- |
| model                   | Object        | -        | 表单数据对象                                       |
| rules                   | Object        | -        | 表单验证规则                                       |
| labelWidth              | String/Number | -        | 标签宽度                                           |
| labelPosition           | String        | 'right'  | 标签位置，可选值：'top', 'left', 'right'           |
| disabled                | Boolean       | false    | 是否禁用表单                                       |
| inline                  | Boolean       | false    | 是否行内表单                                       |
| showMessage             | Boolean       | true     | 是否显示校验错误信息                               |
| validateOnRuleChange    | Boolean       | true     | 规则变化时是否触发校验                             |
| hideRequiredAsterisk    | Boolean       | false    | 隐藏必填星号                                       |
| requireAsteriskPosition | String        | 'left'   | 必填星号位置，可选值：'left', 'right'              |
| scrollToError           | Boolean       | false    | 校验错误时是否滚动到错误处                         |
| size                    | String        | 'medium' | 尺寸，可选值：'small', 'medium', 'large', 'xlarge' |
| ariaLabel               | String        | '表单'   | ARIA标签                                           |

### 事件

| 事件名       | 说明               | 参数                                              |
| ------------ | ------------------ | ------------------------------------------------- |
| validate     | 表单项验证触发事件 | (prop: string, isValid: boolean, message: string) |
| update:model | 表单数据更新事件   | (model: Object)                                   |

### 方法

| 方法名           | 说明                   | 参数                                                                     |
| ---------------- | ---------------------- | ------------------------------------------------------------------------ |
| validate         | 校验整个表单           | (callback?: (valid: boolean, invalidFields?: object) => void) => Promise |
| validateField    | 校验指定字段           | (props: string \| string[], callback?: Function) => Promise              |
| resetFields      | 重置表单数据和验证状态 | -                                                                        |
| clearValidate    | 清除指定字段的验证状态 | (props?: string \| string[]) => void                                     |
| clearValidateAll | 清除所有验证状态       | -                                                                        |
| getFieldsValue   | 获取表单数据           | -                                                                        |
| setFieldsValue   | 设置表单数据           | (fields: object) => void                                                 |

## JvFormItem API

### 属性

| 属性名        | 类型          | 默认值   | 说明                                                                        |
| ------------- | ------------- | -------- | --------------------------------------------------------------------------- |
| label         | String        | -        | 标签文本                                                                    |
| prop          | String        | -        | 绑定的表单字段名，支持嵌套路径（如 'user.name'）                            |
| required      | Boolean       | -        | 是否必填，如不设置则根据验证规则自动判断                                    |
| rules         | Object/Array  | -        | 表单项验证规则                                                              |
| labelWidth    | String/Number | -        | 标签宽度，优先级高于Form的labelWidth                                        |
| showMessage   | Boolean       | -        | 是否显示校验错误信息                                                        |
| errorPosition | String        | 'bottom' | 错误信息位置，可选值：'top', 'right', 'bottom'                              |
| inline        | Boolean       | -        | 是否内联显示                                                                |
| labelPosition | String        | -        | 标签位置，可选值：'top', 'left', 'right'                                    |
| size          | String        | -        | 尺寸，可选值：'small', 'medium', 'large', 'xlarge'                          |
| disabled      | Boolean       | -        | 是否禁用                                                                    |
| wrapInput     | Boolean       | true     | 是否使用label标签包裹input元素，为true时使用隐式关联，为false时使用显式关联 |

### 事件

| 事件名   | 说明               | 参数                                |
| -------- | ------------------ | ----------------------------------- |
| validate | 表单项验证触发事件 | (isValid: boolean, message: string) |

### 方法

| 方法名        | 说明                   | 参数                          |
| ------------- | ---------------------- | ----------------------------- |
| validate      | 校验表单项             | (trigger?: string) => Promise |
| resetField    | 重置表单项值和验证状态 | -                             |
| clearValidate | 清除验证状态           | -                             |

## 高级用法

### 嵌套对象验证

```vue
<template>
  <JvForm :model="formData" :rules="rules" ref="formRef">
    <JvFormItem label="用户名" prop="name">
      <JvInput v-model="formData.name" />
    </JvFormItem>
    <JvFormItem label="地址" prop="address.city">
      <JvInput v-model="formData.address.city" />
    </JvFormItem>
  </JvForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  name: '',
  address: {
    city: ''
  }
})

const rules = {
  name: [{ required: true, message: '请输入用户名' }],
  'address.city': [{ required: true, message: '请输入城市' }]
}
</script>
```

### 自定义验证规则

```vue
<script setup>
const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入年龄'))
  }
  const age = parseInt(value, 10)
  if (isNaN(age)) {
    return callback(new Error('年龄必须为数字'))
  }
  if (age < 18) {
    return callback(new Error('年龄必须大于18岁'))
  }
  return callback()
}

const rules = {
  age: [{ validator: checkAge, trigger: 'blur' }]
}
</script>
```

### 动态表单项

```vue
<template>
  <JvForm :model="dynamicForm" :rules="dynamicRules" ref="dynamicFormRef">
    <JvFormItem
      v-for="(domain, index) in dynamicForm.domains"
      :key="index"
      :label="'域名' + (index + 1)"
      :prop="'domains.' + index + '.value'"
    >
      <JvInput v-model="domain.value" />
      <JvButton @click="removeDomain(domain)">删除</JvButton>
    </JvFormItem>
    <JvFormItem>
      <JvButton @click="addDomain">新增域名</JvButton>
      <JvButton type="primary" @click="submitForm">提交</JvButton>
    </JvFormItem>
  </JvForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const dynamicForm = reactive({
  domains: [{ value: '' }]
})

const dynamicRules = {
  'domains.0.value': [{ required: true, message: '域名不能为空' }]
}

const removeDomain = (item) => {
  const index = dynamicForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicForm.domains.push({
    value: ''
  })
}
</script>
```

## 可访问性特性

- 表单使用适当的ARIA角色和属性
- 错误消息使用`aria-live`属性动态通知屏幕阅读器
- 支持键盘导航，回车键提交表单
- 标签正确关联表单控件（支持隐式和显式关联）
- 错误状态显示清晰的视觉反馈

## 最佳实践

1. 始终为表单项提供明确的标签
2. 使用适当的验证规则确保数据质量
3. 为必填字段提供清晰的视觉指示
4. 显示具体的错误信息，指导用户如何修正
5. 保持表单结构简洁，逻辑分组相关字段
6. 在处理复杂表单时，考虑分步骤显示
