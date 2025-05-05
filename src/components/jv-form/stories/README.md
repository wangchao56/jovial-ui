# JvForm 表单组件

JvForm 是一个功能完善的表单组件，支持数据验证、表单布局以及可访问性功能。

## 主要特性

- 灵活的表单数据验证
- 多种表单布局
- 嵌套字段支持
- 完善的可访问性

## 可访问性特性

### 1. 键盘导航

- 表单支持完整的键盘导航
- 回车键可触发表单验证
- 焦点状态有明显的视觉指示

### 2. ARIA 属性

- 使用 `role="form"` 正确标识表单
- 使用 `aria-label` 描述表单的用途
- 使用 `aria-disabled` 标识禁用状态

### 3. 表单项特性

- 每个表单项都有独特的 ID 关联标签和表单控件
- 使用 `role="group"` 标识表单项组
- 使用 `aria-labelledby` 关联标签和表单项组
- 使用 `aria-invalid` 标识验证错误
- 使用 `aria-describedby` 关联错误消息
- 错误消息使用 `role="alert"` 和 `aria-live="assertive"` 及时通知用户

### 4. 错误提示

- 错误信息使用 `role="alert"` 和 `aria-live="assertive"` 确保屏幕阅读器能立即通知用户错误
- 可以配置错误信息的位置（顶部、右侧、底部）
- 错误状态有明显的视觉指示

### 5. 必填项标识

- 必填项有明显的视觉标识（星号）
- 可以自定义星号位置

## 使用示例

```vue
<template>
  <JvForm
    :model="form"
    :rules="rules"
    label-width="100px"
    aria-label="用户信息表单"
  >
    <JvFormItem label="用户名" prop="username">
      <JvInput v-model="form.username" />
    </JvFormItem>

    <JvFormItem label="邮箱" prop="email">
      <JvInput v-model="form.email" type="email" />
    </JvFormItem>

    <JvFormItem>
      <JvButton type="primary" @click="submitForm">提交</JvButton>
      <JvButton @click="resetForm">重置</JvButton>
    </JvFormItem>
  </JvForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref(null)
const form = reactive({
  username: '',
  email: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  const result = await formRef.value.validate()
  if (result.valid) {
    console.log('表单验证通过', form)
  } else {
    console.log('表单验证失败', result.errors)
  }
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
```
