/**
 *  将字符串转换为驼峰命名
 *  例如：'hello world' -> 'helloWorld'
 * @param str 被转换的字符串
 * @returns  转换后的字符串
 * @example
 * ```ts
 * toCamelCase('hello world') // 'helloWorld'
 * toCamelCase('hello_world') // 'helloWorld'
 * ```
 */

export function toCamelCase(str: string): string {
  return str
    .replace(/^\w|[A-Z]|\b\w/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * 将字符串转换为 kebab-case 格式
 * @param str - 要转换的字符串，默认为空字符串
 * @returns 转换后的 kebab-case 字符串
 *
 * 核心功能：
 * 1. 将字符串转换为 kebab-case 格式
 * 2. 支持空字符串
 * 3. 支持缓存转换结果
 * @example
 * ```ts
 * const kebab = toKebabCase('Hello World') // 'hello-world'
 * ```
 */
export function toKebabCase(str = '') {
  // 如果缓存中已经存在该字符串的转换结果，则直接返回缓存中的结果
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str)!
  // 使用正则表达式将字符串中的非字母字符替换为连字符，并将大写字母转换为小写字母
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
  // 将转换结果存储到缓存中
  toKebabCase.cache.set(str, kebab)
  // 返回转换后的 kebab-case 字符串
  return kebab
}
// 创建一个 Map 对象，用于缓存转换结果
toKebabCase.cache = new Map<string, string>()

enum TypeOptions {
  'Object' = '[object Object]',
  'Null' = '[object Null]',
  'Array' = '[object Array]',
  'Boolean' = '[object Boolean]',
  'Date' = '[object Date]',
  'Function' = '[object Function]',
  'Number' = '[object Number]',
  'Number&NaN' = '[object Number]',
  'RegExp' = '[object RegExp]',
  'String' = '[object String]',
  'Undefined' = '[object Undefined]',
  'Error' = '[object Error]',
  'Symbol' = '[object Symbol]',
  'Map' = '[object Map]',
  'Set' = '[object Set]',
  'WeakMap' = '[object WeakMap]',
  'WeakSet' = '[object WeakSet]',
  'Int8Array' = '[object Int8Array]',
  'Uint8Array' = '[object Uint8Array]',
  'Uint8ClampedArray' = '[object Uint8ClampedArray]',
  'Int16Array' = '[object Int16Array]',
  'Uint16Array' = '[object Uint16Array]',
  'Int32Array' = '[object Int32Array]',
  'Uint32Array' = '[object Uint32Array]',
  'Float32Array' = '[object Float32Array]',
  'Float64Array' = '[object Float64Array]',
  'BigInt64Array' = '[object BigInt64Array]',
  'BigUint64Array' = '[object BigUint64Array]'
}

/**
 * 将给定的数据转换为JSON字符串
 * @param data 任何类型的数据，将被转换为JSON字符串
 * @returns 返回格式化的JSON字符串
 */
export function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}
export function isObject(thing: any): boolean {
  return (
    typeof thing === 'object' &&
    thing !== null &&
    Object.prototype.toString.call(thing) === TypeOptions.Object
  )
}
export function isEmptyObject(thing: any) {
  return isObject(thing) && Object.keys(thing).length === 0
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// 判断数据类型的函数
function getType(value: any): string {
  return Object.prototype.toString.call(value)
}
/**
 * 判断是否为数组
 *  最好使用 Array.isArray 来判断
 *  原因 [Symbol.toStringTag] 属性 可能被重写 所以使用 Object.prototype.toString.call 来判断会不准确
 *  例如：
 *
 *
 *
 *
 */
export function isArray(value: any): value is (...args: any[]) => any {
  return Array.isArray(value)
}

export function isNull(value: any): value is null {
  return getType(value) === TypeOptions.Null
}

export function isBoolean(value: any): value is boolean {
  return getType(value) === TypeOptions.Boolean
}

export function isDate(value: any): value is Date {
  return getType(value) === TypeOptions.Date
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction(value: any): value is Function {
  return getType(value) === TypeOptions.Function
}
/**
 * 判断传入的值是否为数字或NaN。
 *
 * @param value 需要判断的值。
 * @returns 如果值为数字或NaN，则返回true；否则返回false。
 */
export function isNumber(value: any): value is number {
  return (
    getType(value) === TypeOptions['Number&NaN'] ||
    (typeof value === 'number' && Number.isNaN(value))
  )
}

/**
 * 判断传入的值是否为数字排除NaN。
 *
 * @param value 需要判断的值。
 * @returns 如果值为数字或NaN，则返回true；否则返回false。
 */
export function isNumberExcludeNaN(value: any): value is number {
  return getType(value) === TypeOptions['Number&NaN'] && !Number.isNaN(value)
}

export function isRegExp(value: any): value is RegExp {
  return getType(value) === TypeOptions.RegExp
}

export function isString(value: any): value is string {
  return getType(value) === TypeOptions.String
}

// 判断是否为空
export function isEmpty(value: any): value is string | number | object {
  if (isArray(value) || isString(value)) {
    return value.length === 0
  }
  if (isNumberExcludeNaN(value)) {
    return false
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return !value
}
/** 是否为undfined  */
export function isUndefined(value: any): value is undefined {
  return getType(value) === TypeOptions.Undefined
}
