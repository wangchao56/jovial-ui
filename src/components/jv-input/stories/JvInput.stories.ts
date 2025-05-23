import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JvButton from '@/components/jv-button'
import JvFlex from '@/components/jv-flex'
import { useTheme } from '@/theme/config'
import JvInput from '..'

// 更多信息：https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '数据输入组件/Input 输入框',
  component: JvInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '输入框的值',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
      description: '输入框类型',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    readonly: {
      control: 'boolean',
      description: '是否只读',
    },
    clearable: {
      control: 'boolean',
      description: '是否可清空',
    },
    showPassword: {
      control: 'boolean',
      description: '是否显示密码切换按钮',
    },
    size: {
      control: { type: 'select' },
      options: ['xlarge', 'large', 'medium', 'small', 'tiny'],
      description: '输入框大小',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'card'],
      description: '输入框变体风格',
    },
    prefixIcon: {
      control: 'text',
      description: '前缀图标',
    },
    suffixIcon: {
      control: 'text',
      description: '后缀图标',
    },
    maxLength: {
      control: 'number',
      description: '最大输入长度',
    },
    showCount: {
      control: 'boolean',
      description: '是否显示计数',
    },
  },
  args: {
    // 默认参数
    modelValue: '',
    placeholder: '请输入内容',
    type: 'text',
    disabled: false,
    readonly: false,
    clearable: false,
    showPassword: false,
    size: 'medium',
    variant: 'outlined',
    prefixIcon: '',
    suffixIcon: '',
    maxLength: undefined,
    showCount: false,
  },
} satisfies Meta<typeof JvInput>

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  render: args => ({
    components: { JvInput },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: `
      <div style="max-width: 400px;">
        <JvInput v-model="value" v-bind="args" />
        <div style="margin-top: 10px">当前值: {{ value }}</div>
      </div>
    `,
  }),
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput v-model="value" size="xlarge" placeholder="超大尺寸" />
        <JvInput v-model="value" size="large" placeholder="大尺寸" />
        <JvInput v-model="value" size="medium" placeholder="中等尺寸 (默认)" />
        <JvInput v-model="value" size="small" placeholder="小尺寸" />
      </div>
    `,
  }),
}

// // 不同变体
// export const Variants: Story = {
//   render: () => ({
//     components: { JvInput },
//     setup() {
//       const value = ref('')
//       return { value }
//     },
//     template: `
//       <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
//         <JvInput v-model="value" variant="outlined" placeholder="描边样式 (默认)" />
//         <JvInput v-model="value" variant="card" placeholder="卡片样式" />
//       </div>
//     `,
//   }),
// }

// 禁用和只读
export const DisabledAndReadonly: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      return {}
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput value="禁用状态的输入框" disabled />
        <JvInput value="只读状态的输入框" readonly />
      </div>
    `,
  }),
}

// 可清除和密码输入
export const ClearableAndPassword: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      const textValue = ref('这是一段可清除的文本')
      const passwordValue = ref('password123')
      return { textValue, passwordValue }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput v-model="textValue" clearable placeholder="可清除的输入框" />
        <JvInput v-model="passwordValue" type="password" showPassword placeholder="密码输入框" />
        <JvInput v-model="passwordValue" type="password" showPassword clearable placeholder="可清除的密码输入框" />
      </div>
    `,
  }),
}

// 前缀和后缀
export const PrefixAndSuffix: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput v-model="value" prefixIcon="mdi:account" placeholder="带前缀图标" />
        <JvInput v-model="value" suffixIcon="mdi:search" placeholder="带后缀图标" />
        <JvInput v-model="value" placeholder="带自定义前缀和后缀">
          <template #prefix>¥</template>
          <template #suffix>.00</template>
        </JvInput>
      </div>
    `,
  }),
}

// 显示计数
export const ShowCount: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput v-model="value" showCount placeholder="显示字符计数" />
        <JvInput v-model="value" maxLength="20" showCount placeholder="最大输入20个字符" />
      </div>
    `,
  }),
}

// 前置/后置元素
export const PrependAndAppend: Story = {
  render: () => ({
    components: { JvInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <JvInput v-model="value" placeholder="带前置/后置元素">
          <template #prepend>
            <div style="padding: 0 10px; background-color: #f5f7fa; height: 100%; display: flex; align-items: center; border: 1px solid #dcdfe6; border-right: none; border-radius: 4px 0 0 4px;">
              http://
            </div>
          </template>
          <template #append>
            <div style="padding: 0 10px; background-color: #f5f7fa; height: 100%; display: flex; align-items: center; border: 1px solid #dcdfe6; border-left: none; border-radius: 0 4px 4px 0;">
              .com
            </div>
          </template>
        </JvInput>
      </div>
    `,
  }),
}

// 主题适配
export const ThemeAdaptation: Story = {
  render: () => ({
    components: { JvInput, JvButton },
    setup() {
      const theme = useTheme()
      const value = ref('主题适配测试文本')
      const passwordValue = ref('password123')

      function toggleTheme() {
        theme.switch(theme.name.value === 'light' ? 'dark' : 'light')
      }

      return { value, passwordValue, theme, toggleTheme }
    },
    template: `
      <div style="max-width: 600px;">
        <div style="margin-bottom: 16px;">
          <JvButton @click="toggleTheme">
            切换主题 (当前: {{theme.name.value}})
          </JvButton>
        </div>
        
        <div :class="theme.themeClasses" style="padding: 20px; border-radius: 8px;" :style="{ 
          backgroundColor: theme.name.value === 'dark' ? '#282828' : '#f5f5f5',
          color: theme.name.value === 'dark' ? '#fff' : '#333',
          transition: 'background-color 0.3s, color 0.3s'
        }">
          <h3>{{theme.name.value === 'dark' ? '深色' : '浅色'}}主题下的输入框</h3>
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
            <JvInput v-model="value" placeholder="基本输入框" />
            
            <JvInput v-model="value" clearable placeholder="可清除输入框" />
            
            <JvInput v-model="passwordValue" type="password" showPassword placeholder="密码输入框" />
            
            <JvInput v-model="value" prefixIcon="user" suffixIcon="search" placeholder="带图标输入框" />
            
            <JvInput v-model="value" disabled placeholder="禁用状态" />
            
            <JvInput v-model="value" readonly placeholder="只读状态" />
            
            <JvInput v-model="value" maxLength="50" showCount placeholder="带字数统计" />
          </div>
        </div>
      </div>
    `,
  }),
}

// 登录表单
export const LoginPage: Story = {
  render: () => ({
    components: { JvInput, JvButton },
    setup() {
      const username = ref('')
      const password = ref('')
      return { username, password }
    },
    template: `
      <JvFlex :gap="12" direction="vertical" align="center" justify="center" style="height: 100vh;">
        <JvTitle level="2">欢迎登录</JvTitle>
        <JvInput  v-model="username"  placeholder="请输入用户名" prefixIcon="mdi:account-outline"  
           autofocus clearable/>
        <JvInput  v-model="password"  type="password"  placeholder="请输入密码"   prefixIcon="mdi:password-outline" showPassword clearable/>
        <JvButton variant="elevated" color="primary" block>登录</JvButton>
      </JvFlex>
    `,
  }),
}

// 卡片样式
export const CardStyle: Story = {
  render: () => ({
    components: { JvInput, JvFlex },
    template: `
    <JvFlex direction="vertical" gap="12">
        <!-- 基础输入框 -->
    <JvInput v-model="text" placeholder="请输入内容" />

    <!-- 密码输入框 -->
    <JvInput 
    v-model="password" 
    type="password" 
    show-password 
    placeholder="请输入密码" 
    />

    <!-- 带图标的输入框 -->
    <JvInput 
    v-model="search" 
    prefix-icon="mdi:search" 
    clearable 
    placeholder="搜索..." 
    />

    <!-- 带字符计数的输入框 -->
    <JvInput 
    v-model="message" 
    show-count 
    maxlength="100" 
    placeholder="请输入消息" 
    />

    <!-- 不同尺寸的输入框 -->
    <JvInput v-model="input1" size="tiny" placeholder="超小输入框" />
    <JvInput v-model="input2" size="small" placeholder="小型输入框" />
    <JvInput v-model="input3" size="medium" placeholder="中等输入框" />
    <JvInput v-model="input4" size="large" placeholder="大型输入框" />
    <JvInput v-model="input5" size="xlarge" placeholder="超大输入框" />
</JvFlex>
    `,
  }),
}
