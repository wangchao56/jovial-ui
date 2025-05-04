type ColorType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'
type SizeType = 'xlarge' | 'large' | 'medium' | 'small' | 'tiny'
type ShapeType = 'circle' | 'square' | 'round'
type Variant =
  | 'text' // 文本按钮 特点：无背景色，文字颜色为主题色，
  | 'outlined' // 描边按钮 特点：无背景色，文字颜色为主题色， 边框颜色为主题色 实线
  | 'dashed' // 虚线按钮 特点：无背景色，文字颜色为主题色， 边框颜色为主题色 虚线
  | 'link' // 链接按钮 特点：无背景色，文字颜色为主题色， 边框颜色为透明
  | 'tonal' // 质感按钮 特点：背景色为主题色（低亮点度版），文字颜色为主题色
  | 'flat'
  | 'plain'
  | 'elevated'
  | 'filled'
  | 'soft'

interface BaseProps {
  style?: { [key: string]: string }
  class?: string
}

type PlacementType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

type TriggerMethodType = 'click' | 'hover' | 'focus' | 'contextmenu'
