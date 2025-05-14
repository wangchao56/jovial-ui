/**
 * 判断是否为css字体大小值
 * @param fontSize 字体大小
 * @returns 是否为有效的css字体大小值
 * @example
 * isCssFontSize('16px') // true
 * isCssFontSize('1.5rem') // true
 * isCssFontSize('2em') // true
 * isCssFontSize('100%') // true
 * isCssFontSize('12pt') // true
 * isCssFontSize('small') // true
 * isCssFontSize('var(--jv-font-size)') // true
 * isCssFontSize('abc') // false
 */
export function isCssFontSize(fontSize?: string | number | null | false): boolean {
  if (typeof fontSize === 'number') {
    return fontSize > 0
  }

  if (!fontSize)
    return false

  // ignore: regexp/no-unused-capturing-group
  const lengthUnits = /^(?:0|[1-9]\d*(?:\.\d+)?(?:px|rem|em|%|pt|pc|vw|vh|vmin|vmax|ex|ch))$/

  // ignore: regexp/no-unused-capturing-group
  const absoluteKeywords = /^(?:caption|icon|menu|message-box|small-caption|status-bar)$/
  // ignore: regexp/no-unused-capturing-group
  const cssVariable = /^var\(--[\w-]+\)$/

  return (
    lengthUnits.test(fontSize)
    || absoluteKeywords.test(fontSize)
    || cssVariable.test(fontSize)
  )
}
