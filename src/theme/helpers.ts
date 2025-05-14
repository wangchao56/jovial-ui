import type { Color } from '@/utils/color/colorUtils'
import type { InternalThemeDefinition } from './config/types'
import { APCAcontrast } from '@/utils/color/APCA'
import { getLuma, parseColor } from '@/utils/color/colorUtils'

export const THEME_PREFIX = 'jv-theme'
export const THEME_CLASS = `${THEME_PREFIX}`

/**
 * 创建CSS类
 * @param lines 行数组
 * @param selector 选择器
 * @param declarations 声明
 * @example
 * createCssClass(['.jv-theme-light', '.jv-theme-dark'], ['--jv-theme-primary', '--jv-theme-secondary'], ['--jv-theme-primary: #000000', '--jv-theme-secondary: #000000'])
 */
export function createCssClass(
  lines: string[],
  selector: string,
  declarations: string[],
) {
  lines.push(
    `${selector} {\n`,
    ...declarations.map(line => `  ${line};\n`),
    '}\n',
  )
}

/**
 * 生成CSS变量
 * @param theme 主题
 * @returns 生成的CSS变量  [ '--jv-theme-primary: 0, 0, 0;', '--jv-theme-primary-overlay-multiplier: 2;' ]
 */
export function genCssVariables(theme: InternalThemeDefinition): string[] {
  // 根据主题的黑暗模式设置覆盖层的乘数
  const lightOverlay = theme.darkMode ? 2 : 1
  const darkOverlay = theme.darkMode ? 1 : 2

  // 存储生成的CSS变量
  const variables: string[] = []

  // 遍历主题颜色对象，生成CSS变量
  for (const [key, value] of Object.entries(theme.colors)) {
    // 解析颜色值为RGB对象
    const rgb = parseColor(value)
    // 添加颜色变量
    variables.push(
      `${THEME_PREFIX}-${key}: ${rgb.r},${rgb.g},${rgb.b}`, // 颜色变量  --jv-theme-primary: 0, 0, 0;
    )
    // 如果颜色键不以'on-'开头，添加覆盖层乘数变量
    if (!key.startsWith('on-')) {
      variables.push(
        `${THEME_PREFIX}-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`, // 覆盖层乘数变量  --jv-theme-primary-overlay-multiplier: 2;
      )
    }
  }

  for (const [key, value] of Object.entries(theme.variables || {})) {
    // 如果变量值是字符串且以'#'开头，解析为RGB对象
    const color
          = typeof value === 'string' && value.startsWith('#')
            ? parseColor(value)
            : undefined
    // 获取RGB值或原始值
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined
    // 添加变量
    variables.push(`--jv-${key}: ${rgb ?? value}`)
  }
  return variables
}

/**
 * 获取前景色
 * @param color 颜色
 * @returns 前景色
 */
export function getForeground(color: Color) {
  const blackContrast = Math.abs(
    APCAcontrast(parseColor(0), parseColor(color)),
  )
  const whiteContrast = Math.abs(
    APCAcontrast(parseColor(0xFFFFFF), parseColor(color)),
  )

  // TODO: warn about poor color selections
  // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
  // const minContrast = Math.max(blackContrast, whiteContrast)
  // if (minContrast < 60) {
  //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
  // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
  //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
  // }

  // Prefer white text if both have an acceptable contrast ratio
  return whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000'
}

/**
 * 创建主题样式表
 * @param lines css 规则数组
 * @param styleSheetId 样式表ID
 * @returns 样式表
 */
export function createThemeStylesheet(lines: string[], styleSheetId: string = `${THEME_CLASS}-${themeClasses}`) {
  const style = document.createElement('style')
  style.id = styleSheetId
  // 值转化为rgb的数值 使用时使用rgb(var(--jv-theme-primary)) / rgba(var(--jv-theme-primary),0.5)
  style.textContent = lines.join('\n')
  document.head.appendChild(style)
  return style
}

/**
 * 监听系统主题
 */
export function watchSystemTheme() {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', () => {
  })
}

/**
 * 解析主题选项
 *
 * @param options - 主题选项，默认为生成的默认选项
 * @returns 解析后的内部主题选项
 */
// export function parseThemeOptions(
//     options: ThemeOptions = genDefaults(),
//   ): InternalThemeOptions {
//     // 生成默认主题选项
//     const defaults = genDefaults();

//     // 如果没有提供选项，则返回默认选项，并将isDisabled设置为true
//     if (!options) return { ...defaults, isDisabled: true } as any;

//     // 初始化一个空对象，用于存储解析后的主题
//     const themes: Record<string, InternalThemeDefinition> = {};

//     // 遍历提供的主题选项
//     for (const [key, theme] of Object.entries(options.themes ?? {})) {
//       // 根据主题的dark属性或键名确定默认主题
//       const defaultTheme =
//         theme.dark || key === "dark"
//           ? defaults.themes?.dark
//           : defaults.themes?.light;

//       // 合并默认主题和当前主题，并将结果存储在themes对象中
//       themes[key] = mergeDeep(defaultTheme, theme) as InternalThemeDefinition;
//     }

//     // 合并默认选项和解析后的主题选项，并返回结果
//     return mergeDeep(defaults, { ...options, themes }) as InternalThemeOptions;
//   }
