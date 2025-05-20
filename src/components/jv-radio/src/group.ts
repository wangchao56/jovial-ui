import type { InjectionKey, Ref, Slot } from 'vue'
import { createNamespace } from '@/utils'

// 添加 RadioOption 接口定义
export interface RadioOption {
  /** 选项标签显示的文本 */
  label: string
  /** 选项的值 */
  value: string | number | boolean
  /** 是否禁用该选项 */
  disabled?: boolean
}

export const JVRADIOGROUP_NAME = 'JvRadioGroup'
export const bem = createNamespace(JVRADIOGROUP_NAME)

export interface JvRadioGroupProps {
  /** 单选框组的值 */
  modelValue?: string | number | boolean
  /** 是否禁用整个单选框组 */
  disabled?: boolean
  /** 单选框组的 name 属性 */
  name?: string
  /** 是否为垂直布局 */
  column?: boolean
  /** 是否为内联布局 */
  inline?: boolean
  /** 单选框组的标签 */
  label?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否使用紧凑模式 */
  compact?: boolean
  /** 自定义颜色 */
  color?: string
  /** 切换时是否有动画效果 */
  animated?: boolean
  /** 选项数据 */
  options?: RadioOption[]
  /**
   * 每行显示列数
   * 可以是数字或者响应式配置对象
   * 例如: 3 或 { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }
   */
  columns?: number | Record<string, number>
  /** 选项间距 */
  gap?: string | number
}

export interface JvRadioGroupEmits {
  /**
   * 更新单选框组的值
   * @param {string | number | boolean} value - 选中的值
   */
  (e: 'update:modelValue', value?: string | number | boolean): void

  /**
   * 选中值变化时触发
   * @param {string | number | boolean} value - 新的选中值
   */
  (e: 'change', value?: string | number | boolean): void

  /**
   * 远程加载成功时触发
   * @param {RadioOption[]} options - 加载的选项数据
   */
  (e: 'load-success', options: RadioOption[]): void

  /**
   * 远程加载失败时触发
   * @param {Error} error - 错误信息
   */
  (e: 'load-error', error: Error): void
}

export interface JvRadioGroupSlots {
  /** 默认插槽，用于放置 Radio 组件 */
  default: Slot
  /** 标题插槽，用于自定义标题内容 */
  legend: Slot
  /** 错误信息插槽 */
  error: Slot
  /** 加载中状态插槽 */
  loading: Slot
  /** 空状态插槽 */
  empty: Slot
  /** 前置内容插槽 */
  prepend: Slot
  /** 后置内容插槽 */
  append: Slot
}

export interface JvRadioGroupExpose {
  /**
   * 重置单选框组
   */
  reset: () => void
  /**
   * 获取当前选中的值
   */
  getValue: () => string | number | boolean | undefined
  /**
   * 设置当前选中的值
   */
  setValue: (value: string | number | boolean) => void
}

/**
 * Radio 组上下文接口
 * @description 用于向子组件注入的上下文数据
 */
export interface JvRadioGroupContext {
  /** 单选框组的 name 属性 */
  name?: string
  /** 单选框组的值 */
  modelValue?: Ref<string | number | boolean | undefined>
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义颜色 */
  color?: string
  /** 是否有动画 */
  animated?: boolean
  /** 标签位置 */
  labelPosition?: 'left' | 'right'
  /**
   * 派发事件方法
   * @param {string} event - 事件名称
   * @param {any} args - 事件参数
   * @param {string} valueType - 值类型
   */
  dispatch: (
    event: 'change' | 'update:modelValue',
    args: any,
    valueType: string
  ) => void
  /**
   * 设置当前值
   * @param {any} value - 新的值
   */
  setValue: (value: any) => void
  /**
   * 装填选项数据
   */
  updateOption: (option: RadioOption) => void
}

/** Radio 组注入的 key */
export const JvRadioGroupContextKey: InjectionKey<JvRadioGroupContext>
  = Symbol.for('radioGroupContextKey')
