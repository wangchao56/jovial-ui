/* eslint-disable no-alert */
import type { Meta, StoryObj } from '@storybook/vue3'
import JvButton from '@components/jv-button'
import JvCheckbox from '@components/jv-checkbox'
import JvInput from '@components/jv-input'
import JvRadio from '@components/jv-radio'
import JvRadioGroup from '@components/jv-radio/src/JvRadioGroup.vue'
import JvSelect from '@components/jv-select'
import JvSpace from '@components/jv-space'
import JvSwitch from '@components/jv-switch/src/JvSwitch.vue'
import { reactive, ref } from 'vue'
import { JvForm, JvFormItem } from '../index'

const meta: Meta<typeof JvForm> = {
  title: '数据录入组件/Form 表单',
  component: JvForm,
  tags: ['autodocs'],
  argTypes: {
    model: {
      control: 'object',
      description: '表单数据对象'
    },
    rules: {
      control: 'object',
      description: '表单验证规则'
    },
    labelWidth: {
      control: 'text',
      description: '标签宽度'
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'right'],
      description: '标签位置'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用表单'
    },
    inline: {
      control: 'boolean',
      description: '是否行内表单'
    },
    showMessage: {
      control: 'boolean',
      description: '是否显示校验错误信息'
    },
    validateOnRuleChange: {
      control: 'boolean',
      description: '规则变化时是否触发校验'
    },
    hideRequiredAsterisk: {
      control: 'boolean',
      description: '隐藏必填星号'
    },
    requireAsteriskPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '必填星号位置'
    },
    scrollToError: {
      control: 'boolean',
      description: '校验错误时是否滚动到错误处'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '表单尺寸'
    }
  },
  args: {
    labelWidth: '100px',
    labelPosition: 'right',
    disabled: false,
    inline: false,
    showMessage: true,
    validateOnRuleChange: true,
    hideRequiredAsterisk: false,
    requireAsteriskPosition: 'left',
    scrollToError: true,
    size: 'medium'
  }
}

export default meta
type Story = StoryObj<typeof JvForm>

// 基础表单
export const 基础表单: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
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
          // 验证通过，这里可以处理表单提交逻辑
          // 以下是表单数据：formData

          alert('验证通过，表单数据有效')
        }
      }

      const resetForm = () => {
        formRef.value.resetFields()
      }

      return { formData, rules, formRef, submitForm, resetForm, ...args }
    },
    template: `
      <JvForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
        :disabled="disabled"
        :inline="inline"
        :show-message="showMessage"
        :validate-on-rule-change="validateOnRuleChange"
        :hide-required-asterisk="hideRequiredAsterisk"
        :require-asterisk-position="requireAsteriskPosition"
        :scroll-to-error="scrollToError"
        :size="size"
      >
        <JvFormItem label="姓名" prop="name">
          <JvInput v-model="formData.name" placeholder="请输入姓名" />
        </JvFormItem>
        
        <JvFormItem label="邮箱" prop="email">
          <JvInput v-model="formData.email" placeholder="请输入邮箱" />
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary" @click="submitForm">提交</JvButton>
            <JvButton @click="resetForm">重置</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 行内表单
export const 行内表单: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton },
    setup() {
      const formData = reactive({
        username: '',
        password: ''
      })

      return { formData, ...args }
    },
    template: `
      <JvForm
        :model="formData"
        inline
        label-width="70px"
      >
        <JvFormItem label="用户名" prop="username">
          <JvInput v-model="formData.username" placeholder="请输入用户名" />
        </JvFormItem>
        
        <JvFormItem label="密码" prop="password">
          <JvInput v-model="formData.password" type="password" placeholder="请输入密码" />
        </JvFormItem>
        
        <JvFormItem>
          <JvButton type="primary">登录</JvButton>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 不同尺寸
export const 不同尺寸: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
      const sizes = ['small', 'medium', 'large', 'xlarge']
      const forms: Record<string, any> = {}

      sizes.forEach((size: string) => {
        forms[size] = reactive({
          name: '',
          email: ''
        })
      })

      return { sizes, forms, ...args }
    },
    template: `
      <div class="form-sizes">
        <div v-for="size in sizes" :key="size" style="margin-bottom: 30px">
          <h3>{{ size }} 尺寸</h3>
          <JvForm
            :model="forms[size]"
            :size="size"
            label-width="80px"
          >
            <JvFormItem label="姓名" prop="name">
              <JvInput v-model="forms[size].name" placeholder="请输入姓名" :size="size" />
            </JvFormItem>
            
            <JvFormItem label="邮箱" prop="email">
              <JvInput v-model="forms[size].email" placeholder="请输入邮箱" :size="size" />
            </JvFormItem>
            
            <JvFormItem>
              <JvButton :size="size" type="primary">提交</JvButton>
            </JvFormItem>
          </JvForm>
        </div>
      </div>
    `
  })
}

// 不同标签位置
export const 不同标签位置: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
      const positions = ['left', 'right', 'top']
      const form = reactive({
        name: '',
        email: ''
      })

      return { positions, form, ...args }
    },
    template: `
      <div class="form-positions">
        <div v-for="position in positions" :key="position" style="margin-bottom: 30px">
          <h3>{{ position }} 标签位置</h3>
          <JvForm
            :model="form"
            :label-position="position"
            label-width="80px"
          >
            <JvFormItem label="姓名" prop="name">
              <JvInput v-model="form.name" placeholder="请输入姓名" />
            </JvFormItem>
            
            <JvFormItem label="邮箱" prop="email">
              <JvInput v-model="form.email" placeholder="请输入邮箱" />
            </JvFormItem>
          </JvForm>
        </div>
      </div>
    `
  })
}

// 复杂表单
export const 复杂表单: Story = {
  render: (args) => ({
    components: {
      JvForm,
      JvFormItem,
      JvInput,
      JvButton,
      JvSpace,
      JvSelect,
      JvCheckbox,
      JvSwitch,
      JvRadioGroup,
      JvRadio
    },
    setup() {
      const formData = reactive({
        name: '',
        email: '',
        age: undefined,
        gender: '',
        occupation: '',
        interests: [],
        subscribe: false,
        description: ''
      })

      const rules = {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
          {
            validator: (rule: any, value: any, callback: any) => {
              if (value && (value < 18 || value > 100)) {
                callback(new Error('年龄必须在18-100之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        occupation: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        interests: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个兴趣爱好',
            trigger: 'change'
          }
        ]
      }

      const occupations = [
        { label: '程序员', value: 'programmer' },
        { label: '设计师', value: 'designer' },
        { label: '产品经理', value: 'pm' },
        { label: '其它', value: 'other' }
      ]

      const formRef = ref()

      const submitForm = async () => {
        const result = await formRef.value.validate()
        if (result.valid) {
          // 验证通过，这里可以处理表单提交逻辑
          // 以下是表单数据：formData

          alert('验证通过，表单数据有效')
        }
      }

      const resetForm = () => {
        formRef.value.resetFields()
      }

      return {
        formData,
        rules,
        occupations,
        formRef,
        submitForm,
        resetForm,
        ...args
      }
    },
    template: `
      <JvForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        label-position="right"
        :size="size"
      >
        <JvFormItem label="姓名" prop="name">
          <JvInput v-model="formData.name" placeholder="请输入姓名" />
        </JvFormItem>
        
        <JvFormItem label="邮箱" prop="email">
          <JvInput v-model="formData.email" placeholder="请输入邮箱" />
        </JvFormItem>
        
        <JvFormItem label="年龄" prop="age">
          <JvInput v-model.number="formData.age" type="number" placeholder="请输入年龄" />
        </JvFormItem>
        
        <JvFormItem label="性别" prop="gender">
          <JvRadioGroup v-model="formData.gender">
            <JvRadio label="male">男</JvRadio>
            <JvRadio label="female">女</JvRadio>
          </JvRadioGroup>
        </JvFormItem>
        
        <JvFormItem label="职业" prop="occupation">
          <JvSelect 
            v-model="formData.occupation" 
            :options="occupations" 
            placeholder="请选择职业"
            style="width: 100%"
          />
        </JvFormItem>
        
        <JvFormItem label="兴趣爱好" prop="interests">
          <JvCheckbox v-model="formData.interests" value="sports">体育运动</JvCheckbox>
          <JvCheckbox v-model="formData.interests" value="reading">阅读</JvCheckbox>
          <JvCheckbox v-model="formData.interests" value="music">音乐</JvCheckbox>
          <JvCheckbox v-model="formData.interests" value="movie">电影</JvCheckbox>
        </JvFormItem>
        
        <JvFormItem label="订阅通知" prop="subscribe">
          <JvSwitch v-model="formData.subscribe" />
        </JvFormItem>
        
        <JvFormItem label="个人简介" prop="description">
          <JvInput 
            v-model="formData.description" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入个人简介"
          />
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary" @click="submitForm">提交</JvButton>
            <JvButton @click="resetForm">重置</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 禁用状态
export const 禁用状态: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace, JvSelect },
    setup() {
      const formData = reactive({
        name: '张三',
        email: 'zhangsan@example.com',
        region: 'beijing'
      })

      const regions = [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' }
      ]

      return { formData, regions, ...args }
    },
    template: `
      <JvForm
        :model="formData"
        label-width="100px"
        disabled
      >
        <JvFormItem label="姓名" prop="name">
          <JvInput v-model="formData.name" placeholder="请输入姓名" />
        </JvFormItem>
        
        <JvFormItem label="邮箱" prop="email">
          <JvInput v-model="formData.email" placeholder="请输入邮箱" />
        </JvFormItem>
        
        <JvFormItem label="地区" prop="region">
          <JvSelect v-model="formData.region" :options="regions" placeholder="请选择地区" style="width: 100%" />
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary">提交</JvButton>
            <JvButton>重置</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 动态表单
export const 动态表单: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
      const formData = reactive({
        domains: [
          {
            key: Date.now(),
            value: ''
          }
        ]
      })

      const rules = {
        domains: {
          type: 'array',
          required: true,
          defaultField: {
            type: 'object',
            required: true,
            fields: {
              value: [
                { required: true, message: '域名不能为空', trigger: 'blur' },
                {
                  type: 'string',
                  pattern: /^[a-z0-9]+\.[a-z]{2,10}$/,
                  message: '请输入有效的域名',
                  trigger: 'blur'
                }
              ]
            }
          }
        }
      }

      const formRef = ref()

      const removeDomain = (item: { key: number; value: string }) => {
        const index = formData.domains.indexOf(item)
        if (index !== -1) {
          formData.domains.splice(index, 1)
        }
      }

      const addDomain = () => {
        formData.domains.push({
          key: Date.now(),
          value: ''
        })
      }

      const submitForm = async () => {
        const result = await formRef.value.validate()
        if (result.valid) {
          // 验证通过，这里可以处理表单提交逻辑
          // 以下是表单数据：formData

          alert('验证通过，表单数据有效')
        }
      }

      return {
        formData,
        rules,
        formRef,
        removeDomain,
        addDomain,
        submitForm,
        ...args
      }
    },
    template: `
      <JvForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <JvFormItem
          v-for="(domain, index) in formData.domains"
          :key="domain.key"
          :label="'域名' + (index + 1)"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur'
          }"
        >
          <div style="display: flex; align-items: center;">
            <JvInput v-model="domain.value" style="margin-right: 10px;" />
            <JvButton 
              type="danger" 
              @click.prevent="removeDomain(domain)"
              :disabled="formData.domains.length === 1"
            >
              删除
            </JvButton>
          </div>
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary" @click="submitForm">提交</JvButton>
            <JvButton type="secondary" @click="addDomain">新增域名</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 自定义验证规则
export const 自定义验证规则: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
      const formData = reactive({
        pass: '',
        checkPass: '',
        age: ''
      })

      const checkAge = (rule: any, value: any, callback: any) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }

        const age = Number.parseInt(value, 10)
        if (Number.isNaN(age)) {
          return callback(new Error('请输入数字值'))
        }

        if (age < 18) {
          return callback(new Error('必须年满18岁'))
        }

        callback()
      }
      const formRef = ref()

      const validatePass = (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (formData.checkPass !== '') {
            formRef.value.validateField('checkPass')
          }
          callback()
        }
      }

      const validatePass2 = (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== formData.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      const rules = {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [{ validator: checkAge, trigger: 'blur' }]
      }

      const submitForm = async () => {
        const result = await formRef.value.validate()
        if (result.valid) {
          // 验证通过，这里可以处理表单提交逻辑
          // 以下是表单数据：formData

          alert('验证通过，表单数据有效')
        }
      }

      const resetForm = () => {
        formRef.value.resetFields()
      }

      return { formData, rules, formRef, submitForm, resetForm, ...args }
    },
    template: `
      <JvForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <JvFormItem label="密码" prop="pass">
          <JvInput type="password" v-model="formData.pass" autocomplete="off" placeholder="请输入密码" />
        </JvFormItem>
        
        <JvFormItem label="确认密码" prop="checkPass">
          <JvInput type="password" v-model="formData.checkPass" autocomplete="off" placeholder="请再次输入密码" />
        </JvFormItem>
        
        <JvFormItem label="年龄" prop="age">
          <JvInput v-model="formData.age" placeholder="请输入年龄" />
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary" @click="submitForm">提交</JvButton>
            <JvButton @click="resetForm">重置</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}

// 嵌套字段验证
export const 嵌套字段验证: Story = {
  render: (args) => ({
    components: { JvForm, JvFormItem, JvInput, JvButton, JvSpace },
    setup() {
      const formData = reactive({
        user: {
          name: '',
          email: '',
          address: {
            city: '',
            street: '',
            zip: ''
          }
        }
      })

      const rules = {
        'user.name': [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        'user.email': [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        'user.address.city': [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        'user.address.zip': [
          { required: true, message: '请输入邮编', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '邮编必须为6位数字', trigger: 'blur' }
        ]
      }

      const formRef = ref()

      const submitForm = async () => {
        const result = await formRef.value.validate()
        if (result.valid) {
          // 验证通过，这里可以处理表单提交逻辑
          // 以下是表单数据：formData

          alert('验证通过，表单数据有效')
        }
      }

      const resetForm = () => {
        formRef.value.resetFields()
      }

      return { formData, rules, formRef, submitForm, resetForm, ...args }
    },
    template: `
      <JvForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <h3>用户信息</h3>
        <JvFormItem label="用户名" prop="user.name">
          <JvInput v-model="formData.user.name" placeholder="请输入用户名" />
        </JvFormItem>
        
        <JvFormItem label="邮箱" prop="user.email">
          <JvInput v-model="formData.user.email" placeholder="请输入邮箱" />
        </JvFormItem>
        
        <h3>地址信息</h3>
        <JvFormItem label="城市" prop="user.address.city">
          <JvInput v-model="formData.user.address.city" placeholder="请输入城市" />
        </JvFormItem>
        
        <JvFormItem label="街道" prop="user.address.street">
          <JvInput v-model="formData.user.address.street" placeholder="请输入街道" />
        </JvFormItem>
        
        <JvFormItem label="邮编" prop="user.address.zip">
          <JvInput v-model="formData.user.address.zip" placeholder="请输入邮编" />
        </JvFormItem>
        
        <JvFormItem>
          <JvSpace>
            <JvButton type="primary" @click="submitForm">提交</JvButton>
            <JvButton @click="resetForm">重置</JvButton>
          </JvSpace>
        </JvFormItem>
      </JvForm>
    `
  })
}
