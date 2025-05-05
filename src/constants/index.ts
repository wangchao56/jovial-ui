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
  'right-end'
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
  CENTER = 'center'
}

export const sizeOptions = ['small', 'medium', 'large', 'xlarge', 'tiny']

export enum Type {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

export const typeOptions = [
  Type.PRIMARY,
  Type.SECONDARY,
  Type.SUCCESS,
  Type.WARNING,
  Type.ERROR,
  Type.INFO
]
export enum ColorType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}
export const colorTypeOptions = [
  ColorType.DEFAULT,
  ColorType.PRIMARY,
  ColorType.SECONDARY,
  ColorType.SUCCESS,
  ColorType.WARNING,
  ColorType.ERROR,
  ColorType.INFO
]
export enum Variant {
  ELEVATED = 'elevated',
  FILLED = 'filled',
  DASHED = 'dashed',
  TONAL = 'tonal',
  TEXT = 'text',
  LINK = 'link',
  PLAIN = 'plain',
  OUTLINED = 'outlined'
}
export const variantOptions = [
  Variant.ELEVATED,
  Variant.FILLED,
  Variant.DASHED,
  Variant.TONAL,
  Variant.TEXT,
  Variant.LINK,
  Variant.PLAIN,
  Variant.OUTLINED
]
export enum Shape {
  SQUARE = 'square',
  PILL = 'pill'
}
export const shapeOptions = [Shape.SQUARE, Shape.PILL]
export enum Justify {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BETWEEN = 'between'
}

export const optionsMap = {
  placement: placementOptions,
  size: sizeOptions,
  type: typeOptions,
  colorType: colorTypeOptions,
  variant: variantOptions,
  shape: shapeOptions
}

export function getOptions(
  name: keyof typeof optionsMap,
  exclude: string[] = []
) {
  const options = optionsMap[name] || []
  return options.filter((option) => !exclude.includes(option))
}
