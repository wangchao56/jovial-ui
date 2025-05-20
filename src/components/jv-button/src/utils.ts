import type { ColorContrast } from './types'
import { ContrastLevel } from './types'

/**
 * 将RGB颜色转换为亮度值
 * 使用相对亮度公式: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * @param r 红色通道 (0-255)
 * @param g 绿色通道 (0-255)
 * @param b 蓝色通道 (0-255)
 * @returns 亮度值 (0-1)
 */
export function getLuminance(r: number, g: number, b: number): number {
  // 将RGB值归一化到0-1范围
  const R = r / 255
  const G = g / 255
  const B = b / 255

  // 对每个通道应用sRGB转换
  const rsRGB = R <= 0.03928 ? R / 12.92 : ((R + 0.055) / 1.055) ** 2.4
  const gsRGB = G <= 0.03928 ? G / 12.92 : ((G + 0.055) / 1.055) ** 2.4
  const bsRGB = B <= 0.03928 ? B / 12.92 : ((B + 0.055) / 1.055) ** 2.4

  // 根据W3C标准计算相对亮度
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB
}

/**
 * 计算两个颜色之间的对比度
 * 使用WCAG 2.0公式: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 * @param luminance1 第一个颜色的亮度
 * @param luminance2 第二个颜色的亮度
 * @returns 对比度 (1-21)
 */
export function getContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * 将十六进制颜色转换为RGB
 * @param hex 十六进制颜色字符串 (如 "#ffffff" 或 "#fff")
 * @returns RGB 三元组 [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  // 移除可能的 # 前缀
  hex = hex.replace(/^#/, '')

  // 处理缩写形式 (如 #fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  // 验证十六进制格式
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match)
    return null

  // 转换为RGB值
  return [
    Number.parseInt(match[1], 16),
    Number.parseInt(match[2], 16),
    Number.parseInt(match[3], 16),
  ]
}

/**
 * 解析CSS颜色字符串为RGB值
 * 支持hex、rgb、rgba格式
 * @param color CSS颜色字符串
 * @returns RGB三元组 [r, g, b]
 */
export function parseColor(color: string): [number, number, number] | null {
  // 处理Hex格式
  if (color.startsWith('#')) {
    return hexToRgb(color)
  }

  // 处理rgb/rgba格式
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
  if (rgbMatch) {
    return [
      Number.parseInt(rgbMatch[1]),
      Number.parseInt(rgbMatch[2]),
      Number.parseInt(rgbMatch[3]),
    ]
  }

  // 处理CSS命名颜色或其他格式
  // 这里可以添加命名颜色的映射表，或者使用Canvas API来获取RGB值
  // 简化起见，这里返回null
  return null
}

/**
 * 将RGB转换为十六进制颜色
 * @param r 红色 (0-255)
 * @param g 绿色 (0-255)
 * @param b 蓝色 (0-255)
 * @returns 十六进制颜色字符串 (如 "#ffffff")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * 获取适合背景色的文本颜色
 * @param bgColor 背景色 (十六进制、rgb或rgba)
 * @returns 文本颜色 (白色或黑色)
 */
export function getContrastTextColor(bgColor: string): string {
  const rgb = parseColor(bgColor)
  if (!rgb)
    return '#000000' // 默认黑色文本

  const luminance = getLuminance(rgb[0], rgb[1], rgb[2])

  // 亮度阈值0.5，高于此值使用深色文本，否则使用浅色文本
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

/**
 * 检查颜色对比度是否满足WCAG标准
 * @param bgColor 背景色
 * @param textColor 文本色
 * @param level WCAG级别
 * @returns 是否满足要求
 */
export function meetsContrastRequirement(
  bgColor: string,
  textColor: string,
  level: ContrastLevel = ContrastLevel.AA,
): boolean {
  const bgRgb = parseColor(bgColor)
  const textRgb = parseColor(textColor)

  if (!bgRgb || !textRgb)
    return false

  const bgLuminance = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2])
  const textLuminance = getLuminance(textRgb[0], textRgb[1], textRgb[2])
  const ratio = getContrastRatio(bgLuminance, textLuminance)

  // 根据WCAG级别检查对比度
  switch (level) {
    case ContrastLevel.AA:
      return ratio >= 4.5
    case ContrastLevel.AAA:
      return ratio >= 7
    case ContrastLevel.LargeTextAA:
      return ratio >= 3
    case ContrastLevel.LargeTextAAA:
      return ratio >= 4.5
    case ContrastLevel.NonText:
      return ratio >= 3
    default:
      return ratio >= 4.5 // 默认AA级别
  }
}

/**
 * 调整文本颜色以满足WCAG对比度要求
 * @param bgColor 背景色
 * @param textColor 原始文本色
 * @param level WCAG级别
 * @returns 调整后的文本颜色
 */
export function adjustTextColorForContrast(
  bgColor: string,
  textColor: string,
  level: ContrastLevel = ContrastLevel.AA,
): string {
  if (meetsContrastRequirement(bgColor, textColor, level)) {
    return textColor // 已经满足要求
  }

  // 如果原始颜色不满足要求，返回黑色或白色以确保最大对比度
  return getContrastTextColor(bgColor)
}

/**
 * 调整颜色亮度
 * @param color RGB颜色数组 [r, g, b]
 * @param factor 调整因子 (>1变亮，<1变暗)
 * @returns 调整后的RGB颜色数组
 */
export function adjustColorBrightness(
  color: [number, number, number],
  factor: number,
): [number, number, number] {
  return [
    Math.min(255, Math.max(0, Math.round(color[0] * factor))),
    Math.min(255, Math.max(0, Math.round(color[1] * factor))),
    Math.min(255, Math.max(0, Math.round(color[2] * factor))),
  ]
}

/**
 * 生成指定对比度的文本颜色
 * @param bgColor 背景色
 * @param targetContrast 目标对比度 (通常4.5为AA级别，7为AAA级别)
 * @returns 满足对比度要求的文本颜色
 */
export function generateAccessibleTextColor(
  bgColor: string,
  targetContrast: number = 4.5,
): string {
  const bgRgb = parseColor(bgColor)
  if (!bgRgb)
    return '#000000'

  const bgLuminance = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2])

  // 确定文本应该是黑色还是白色
  // 如果背景较亮，使用黑色文本，否则使用白色文本
  const textRgb: [number, number, number] = bgLuminance > 0.5 ? [0, 0, 0] : [255, 255, 255]

  const textLuminance = getLuminance(textRgb[0], textRgb[1], textRgb[2])
  const initialContrast = getContrastRatio(bgLuminance, textLuminance)

  // 如果已经满足对比度要求，直接返回
  if (initialContrast >= targetContrast) {
    return rgbToHex(textRgb[0], textRgb[1], textRgb[2])
  }

  // 如果初始对比度已经很高，可能无法达到目标对比度
  // 这种情况返回最高对比度的黑色或白色
  return textRgb[0] === 0 ? '#000000' : '#ffffff'
}

/**
 * 生成WCAG兼容的颜色对
 * @param color 基础颜色 (可以是背景色或文本色)
 * @param isBackground 指定的颜色是否为背景色
 * @param level WCAG级别
 * @returns 背景色和文本色的组合
 */
export function generateWCAGColorPair(
  color: string,
  isBackground: boolean = true,
  level: ContrastLevel = ContrastLevel.AA,
): ColorContrast {
  if (isBackground) {
    // 如果给定的是背景色，生成适合的文本色
    const textColor = generateAccessibleTextColor(
      color,
      level === ContrastLevel.AA || level === ContrastLevel.LargeTextAAA
        ? 4.5
        : level === ContrastLevel.AAA ? 7 : 3,
    )

    // 计算实际对比度
    const bgRgb = parseColor(color)
    const txtRgb = parseColor(textColor)
    let contrastRatio = 0

    if (bgRgb && txtRgb) {
      const bgLum = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2])
      const txtLum = getLuminance(txtRgb[0], txtRgb[1], txtRgb[2])
      contrastRatio = getContrastRatio(bgLum, txtLum)
    }

    return {
      bg: color,
      text: textColor,
      contrastRatio,
    }
  }
  else {
    // 如果给定的是文本色，选择合适的背景色
    // 简化实现，选择黑色或白色作为背景
    const textRgb = parseColor(color)
    if (!textRgb)
      return { bg: '#ffffff', text: color }

    const textLum = getLuminance(textRgb[0], textRgb[1], textRgb[2])
    const bgColor = textLum > 0.5 ? '#000000' : '#ffffff'

    // 计算实际对比度
    const contrastRatio = getContrastRatio(textLum, textLum > 0.5 ? 0 : 1)

    return {
      bg: bgColor,
      text: color,
      contrastRatio,
    }
  }
}
