// 可选位置列表
export const placementOptions = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
]
export enum Placement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
  CENTER = 'center',
}

export const sizeOptions = ['tiny', 'small', 'medium', 'large', 'xlarge']
export const roundedOptions: RoundedType[] = [
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'circle',
  'shaped',
  't',
  't-none',
  't-sm',
  't-lg',
  't-xl',
  't-pill',
  't-circle',
  't-shaped',
  'te',
  'te-none',
  'te-sm',
  'te-lg',
  'te-xl',
  'te-pill',
  'te-circle',
  'te-shaped',
  'ts',
  'ts-none',
  'ts-sm',
  'ts-lg',
  'ts-xl',
  'ts-pill',
  'ts-circle',
  'ts-shaped',
  'e',
  'e-none',
  'e-sm',
  'e-lg',
  'e-xl',
  'e-pill',
  'e-circle',
  'e-shaped',
  'b',
  'b-none',
  'b-sm',
  'b-lg',
  'b-xl',
  'b-pill',
  'b-circle',
  'b-shaped',
  'be',
  'be-none',
  'be-sm',
  'be-lg',
  'be-xl',
  'be-pill',
  'be-circle',
  'be-shaped',
  'bs',
  'bs-none',
  'bs-sm',
  'bs-lg',
  'bs-xl',
  'bs-pill',
  'bs-circle',
  'bs-shaped',
  's',
  's-none',
  's-sm',
  's-lg',
  's-xl',
  's-pill',
  's-circle',
  's-shaped',

]
export enum Type {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export const typeOptions = [
  Type.PRIMARY,
  Type.SECONDARY,
  Type.SUCCESS,
  Type.WARNING,
  Type.ERROR,
  Type.INFO,
]
export enum ColorType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}
export const colorTypeOptions = [
  ColorType.DEFAULT,
  ColorType.PRIMARY,
  ColorType.SECONDARY,
  ColorType.SUCCESS,
  ColorType.WARNING,
  ColorType.ERROR,
  ColorType.INFO,
]
export enum Variant {
  ELEVATED = 'elevated',
  FILLED = 'filled',
  DASHED = 'dashed',
  TONAL = 'tonal',
  TEXT = 'text',
  LINK = 'link',
  PLAIN = 'plain',
  OUTLINED = 'outlined',
}
export const variantOptions = [
  Variant.ELEVATED,
  Variant.FILLED,
  Variant.DASHED,
  Variant.TONAL,
  Variant.TEXT,
  Variant.LINK,
  Variant.PLAIN,
  Variant.OUTLINED,
]
export enum Shape {
  SQUARE = 'square',
  PILL = 'pill',
  ROUNDED = 'rounded',
}
export const shapeOptions = [Shape.SQUARE, Shape.PILL, Shape.ROUNDED]
export enum Justify {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BETWEEN = 'between',
}

export const optionsMap = {
  placement: placementOptions,
  size: sizeOptions,
  type: typeOptions,
  colorType: colorTypeOptions,
  variant: variantOptions,
  shape: shapeOptions,
}

export function getOptions(
  name: keyof typeof optionsMap,
  exclude: string[] = [],
) {
  const options = optionsMap[name] || []
  return options.filter(option => !exclude.includes(option))
}

export const imageExample = 'https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0'
