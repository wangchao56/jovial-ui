/**
 * @license
 * 创建BEM规范
 *  什么是BEM规范?
 *      BEM（Block-Element-Modifier）
 *      Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *      Element：元素，比如按钮的文字，按钮的图标等。
 *      Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 *      BEM规范：
 *          1. Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *          2. Element：元素，比如按钮的文字，按钮的图标等。
 *          3. Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 */

/**
 *  创建BEM规范
 * @param prefixName    块级元素名称
 * @param blockSuffix   元素后缀
 * @param element       元素名称
 * @param modifier      修改器
 * @returns  String           返回一个字符串
 */

import { toKebabCase } from './common'

function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string,
): string {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }

  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}

interface BEMRecord {
  b: (blockSuffix?: string) => string
  e: (element: string) => string
  m: (modifier: string) => string
  be: (blockSuffix: string, element: string) => string
  em: (element: string, modifier: string) => string
  bm: (blockSuffix: string, modifier: string) => string
  bem: (blockSuffix: string, element: string, modifier: string) => string
  is: (name: string, state: unknown) => string
}
/**
 * 创建BEM规范
 * @param prefixName   块级元素名称
 * @returns            返回一个对象，对象中包含b、e、m、be、em、bm、bem方法
 */
function createBEM(prefixName: string): BEMRecord {
  /** 块级元素 */
  const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '')
  /** 元素 */
  const e = (element: string) => _bem(prefixName, '', element, '')
  /** 修改器 */
  const m = (modifier: string) => {
    return modifier ? _bem(prefixName, '', '', modifier) : ''
  }
  /** 块级元素和元素 */
  const be = (blockSuffix: string, element: string) =>
    _bem(prefixName, blockSuffix, element, '')
  /** 元素和修改器 */
  const em = (element: string, modifier: string) =>
    _bem(prefixName, '', element, modifier)
  const bm = (blockSuffix: string, modifier: string) =>
    _bem(prefixName, blockSuffix, '', modifier)
  const bem = (blockSuffix: string, element: string, modifier: string) =>
    _bem(prefixName, blockSuffix, element, modifier)

  // 判断状态
  const is = (name: string, state: unknown) => (state ? `is-${name}` : '')

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  }
}
export type BemRecord = ReturnType<typeof createBEM>
/**
 * 创建命名空间
 * @param namespace   命名空间
 * @returns            返回一个对象，对象中包含b、e、m、be、em、bm、bem方法
 * @example
 * const bem = createNamespace('button')
 * bem.b() // 'jv-button'
 * bem.e('text') // 'jv-button__text'
 * bem.m('primary') // 'jv-button--primary'
 * bem.be('text', 'primary') // 'jv-button__text--primary'
 * bem.em('text', 'primary') // 'jv-button__text--primary'
 * bem.bm('text', 'primary') // 'jv-button__text--primary'
 * bem.bem('text', 'primary') // 'jv-button__text--primary
 */
export function createNamespace(namespace: string): BemRecord {
  // 处理命名空间
  const prefixName = `${toKebabCase(namespace)}`
  return createBEM(prefixName)
}
