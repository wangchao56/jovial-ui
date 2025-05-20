import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 位置计算的配置选项
 */
export interface PositioningOptions {
  /** 放置位置 */
  placement: PlacementType
  /** 偏移量 [x, y] */
  offset: number[]
  /** 放置策略 */
  placementStrategy: string
}

/**
 * 位置计算结果
 */
export interface PositionResult {
  /** 左侧位置 */
  left: number
  /** 顶部位置 */
  top: number
  /** 最终放置位置 */
  placement: PlacementType
}

/**
 * 计算下拉菜单的位置
 * @param dropdown 下拉菜单元素
 * @param trigger 触发器元素
 * @param options 配置选项
 * @returns 计算结果，包含位置和新的放置方向
 */
export function calculatePosition(
  dropdown: HTMLElement,
  trigger: HTMLElement,
  options: PositioningOptions,
): PositionResult {
  const triggerRect = trigger.getBoundingClientRect()
  const dropdownRect = dropdown.getBoundingClientRect()

  // 获取视口尺寸
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  // 计算各个方向的开始位置
  const positions = {
    top: triggerRect.top - dropdownRect.height,
    bottom: triggerRect.bottom,
    left: triggerRect.left,
    right: triggerRect.right,
  }

  // 添加偏移量
  const [xOffset, yOffset] = options.offset

  let left = 0
  let top = 0
  let newPlacement = options.placement

  // 计算水平位置
  if (newPlacement.includes('start')) {
    left = positions.left + xOffset
  }
  else if (newPlacement.includes('end')) {
    left = positions.right - dropdownRect.width - xOffset
  }
  else if (newPlacement.startsWith('left')) {
    left = positions.left - dropdownRect.width - xOffset
  }
  else if (newPlacement.startsWith('right')) {
    left = positions.right + xOffset
  }
  else {
    // 居中
    left = positions.left + (triggerRect.width - dropdownRect.width) / 2
  }

  // 计算垂直位置
  if (newPlacement.startsWith('top')) {
    top = positions.top - yOffset
  }
  else if (newPlacement.startsWith('bottom')) {
    top = positions.bottom + yOffset
  }
  else {
    // 中间对齐
    top = positions.top + (triggerRect.height - dropdownRect.height) / 2
  }

  // 防止溢出处理
  if (options.placementStrategy === 'prevent-overflow' || options.placementStrategy === 'auto') {
    // 水平方向防溢出
    if (left < 0) {
      left = 0
    }
    else if (left + dropdownRect.width > viewport.width) {
      left = viewport.width - dropdownRect.width
    }

    // 垂直方向防溢出
    if (top < 0) {
      top = 0
    }
    else if (top + dropdownRect.height > viewport.height) {
      top = viewport.height - dropdownRect.height
    }
  }

  // 翻转处理
  if ((options.placementStrategy === 'flip' || options.placementStrategy === 'auto')
    && !options.placementStrategy.includes('fixed')) {
    // 垂直方向翻转
    if (newPlacement.startsWith('top') && top < 0) {
      top = positions.bottom + yOffset
      newPlacement = newPlacement.replace('top', 'bottom') as PlacementType
    }
    else if (newPlacement.startsWith('bottom') && (top + dropdownRect.height) > viewport.height) {
      top = positions.top - dropdownRect.height - yOffset
      newPlacement = newPlacement.replace('bottom', 'top') as PlacementType
    }

    // 水平方向翻转
    if (newPlacement.startsWith('left') && left < 0) {
      left = positions.right + xOffset
      newPlacement = newPlacement.replace('left', 'right') as PlacementType
    }
    else if (newPlacement.startsWith('right') && (left + dropdownRect.width) > viewport.width) {
      left = positions.left - dropdownRect.width - xOffset
      newPlacement = newPlacement.replace('right', 'left') as PlacementType
    }
  }

  return {
    left,
    top,
    placement: newPlacement,
  }
}

/**
 * 可复用的位置计算Hook
 * @returns 更新位置和事件处理逻辑
 */
export function usePositioning() {
  const actualPlacement = ref<PlacementType | null>(null)

  /**
   * 更新元素位置
   * @param content 内容元素
   * @param reference 参考元素
   * @param options 定位选项
   */
  function updateElementPosition(
    content: HTMLElement,
    reference: HTMLElement,
    options: PositioningOptions,
  ) {
    if (!content || !reference)
      return

    const result = calculatePosition(content, reference, options)

    // 应用位置
    content.style.left = `${result.left}px`
    content.style.top = `${result.top}px`

    // 返回实际放置位置
    actualPlacement.value = result.placement

    return result.placement
  }

  /**
   * 添加窗口事件监听
   * @param handler 处理函数
   */
  function setupEventListeners(handler: () => void) {
    window.addEventListener('resize', handler)
    document.addEventListener('scroll', handler, true)
  }

  /**
   * 移除窗口事件监听
   * @param handler 处理函数
   */
  function cleanupEventListeners(handler: () => void) {
    window.removeEventListener('resize', handler)
    document.removeEventListener('scroll', handler, true)
  }

  /**
   * 自动设置和清理事件监听
   * @param handler 处理函数
   */
  function useEventListeners(handler: () => void) {
    onMounted(() => setupEventListeners(handler))
    onUnmounted(() => cleanupEventListeners(handler))
  }

  return {
    actualPlacement,
    updateElementPosition,
    setupEventListeners,
    cleanupEventListeners,
    useEventListeners,
  }
}

export default usePositioning
