import type { CSSProperties, Ref } from 'vue'
import { unref } from 'vue'

// 定义更详细的放置位置类型
export type PlacementType =
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

// 定义放置策略类型
type PlacementStrategy = 'flip' | 'prevent-overflow' | 'auto' | 'fixed'

/**
 * 计算元素的最佳放置位置
 * @param triggerRect 触发元素的DOMRect
 * @param popoverRect 弹出层的DOMRect
 * @param preferredPlacement 首选位置
 * @param offset 偏移量，可以是数字或者[x偏移, y偏移]数组
 * @param strategy 放置策略：flip(翻转), prevent-overflow(防止溢出), auto(自动), fixed(固定)
 * @returns 计算结果，包含最终位置、变换原点和平移值
 */
export function calculatePlacement(
  triggerRect: Ref<DOMRect>,
  popoverRect: Ref<DOMRect>,
  preferredPlacement: PlacementType = 'bottom',
  offset: [number, number] | number = [0, 0],
  strategy: PlacementStrategy = 'auto'
): CSSProperties & { 'data-actual-placement'?: string } {
  // 获取触发元素的位置和尺寸
  const triggerRectValue = unref(triggerRect)
  const { x, y, width, height, top, left, right, bottom } = triggerRectValue

  // 获取弹出层的尺寸
  const popoverRectValue = unref(popoverRect)
  const popoverWidth = popoverRectValue.width
  const popoverHeight = popoverRectValue.height

  // 处理偏移量，支持单一数值或x/y分别指定
  const [offsetX, offsetY] = Array.isArray(offset) ? offset : [0, offset]

  // 获取视口尺寸和滚动位置
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset

  // 考虑滚动位置的边界计算
  const viewportTop = scrollY
  const viewportLeft = scrollX
  const viewportRight = scrollX + viewportWidth
  const viewportBottom = scrollY + viewportHeight

  // 安全边距，确保弹出层不会太靠近视口边缘
  const SAFETY_MARGIN = 8

  // 检查各个方向的可用空间
  const spaces = {
    top: top - viewportTop - SAFETY_MARGIN,
    bottom: viewportBottom - bottom - SAFETY_MARGIN,
    left: left - viewportLeft - SAFETY_MARGIN,
    right: viewportRight - right - SAFETY_MARGIN
  }

  // 确定各个方向是否有足够空间放置弹出层
  const hasSpace = {
    top: spaces.top >= popoverHeight,
    bottom: spaces.bottom >= popoverHeight,
    left: spaces.left >= popoverWidth,
    right: spaces.right >= popoverWidth
  }

  // 计算各个方向的适合度得分（空间越多越适合）
  const scores = {
    top: spaces.top / popoverHeight,
    bottom: spaces.bottom / popoverHeight,
    left: spaces.left / popoverWidth,
    right: spaces.right / popoverWidth
  }

  // 初始化最终放置位置
  let finalPlacement = preferredPlacement

  if (strategy === 'fixed') {
    // 固定策略：不变更首选位置
    finalPlacement = preferredPlacement
  } else if (strategy === 'flip' || strategy === 'auto') {
    // 翻转策略或自动策略：根据空间不足翻转位置

    // 定义对应的翻转位置映射
    const flipMap: Record<string, PlacementType> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
      'top-start': 'bottom-start',
      'top-end': 'bottom-end',
      'bottom-start': 'top-start',
      'bottom-end': 'top-end',
      'left-start': 'right-start',
      'left-end': 'right-end',
      'right-start': 'left-start',
      'right-end': 'left-end'
    }

    // 获取主方向和修饰符
    const [mainPlacement, modifier] = preferredPlacement.split('-') as [
      PlacementType,
      string | undefined
    ]

    // 检查主方向空间是否不足
    if (!hasSpace[mainPlacement as keyof typeof hasSpace]) {
      const flippedMain = flipMap[mainPlacement]

      // 如果翻转后的方向有足够空间，或者策略是flip，则应用翻转
      if (
        hasSpace[flippedMain as keyof typeof hasSpace] ||
        strategy === 'flip'
      ) {
        finalPlacement = modifier
          ? (`${flippedMain}-${modifier}` as PlacementType)
          : flippedMain
      }
      // 如果是auto策略，并且两个方向都没有足够空间，则选择空间更多的方向
      else if (strategy === 'auto') {
        // 如果原方向和翻转方向都没有足够空间，选择空间比例最大的方向
        const mainScore = scores[mainPlacement as keyof typeof scores]
        const flippedScore = scores[flippedMain as keyof typeof scores]

        if (flippedScore > mainScore) {
          finalPlacement = modifier
            ? (`${flippedMain}-${modifier}` as PlacementType)
            : flippedMain
        }

        // 如果水平和垂直方向都不够空间，尝试寻找最佳位置
        if (mainScore < 0.8 && flippedScore < 0.8) {
          // 找出得分最高的方向
          let bestPlacement: PlacementType = 'top'
          let bestScore = scores.top

          if (scores.bottom > bestScore) {
            bestScore = scores.bottom
            bestPlacement = 'bottom'
          }

          if (scores.left > bestScore) {
            bestScore = scores.left
            bestPlacement = 'left'
          }

          if (scores.right > bestScore) {
            bestScore = scores.right
            bestPlacement = 'right'
          }

          // 如果最佳方向的得分明显高于当前方向，则切换
          if (bestScore > Math.max(mainScore, flippedScore) * 1.5) {
            finalPlacement = bestPlacement
          }
        }
      }
    }
  }

  if (strategy === 'auto' || strategy === 'prevent-overflow') {
    // 自动策略或防溢出策略：还需要检查修饰符是否导致溢出

    // 分解为主方向和修饰符
    const [mainPlacement, modifier] = finalPlacement.split('-') as [
      PlacementType,
      string | undefined
    ]

    if (modifier) {
      let newModifier = modifier

      // 检查水平方向上的修饰符
      if (mainPlacement === 'top' || mainPlacement === 'bottom') {
        // 检查start修饰符是否导致左侧溢出
        if (
          modifier === 'start' &&
          left + offsetX < viewportLeft + SAFETY_MARGIN
        ) {
          newModifier = 'end'
        }
        // 检查end修饰符是否导致右侧溢出
        else if (
          modifier === 'end' &&
          right + offsetX > viewportRight - SAFETY_MARGIN
        ) {
          newModifier = 'start'
        }
      }
      // 检查垂直方向上的修饰符
      else if (mainPlacement === 'left' || mainPlacement === 'right') {
        // 检查start修饰符是否导致顶部溢出
        if (
          modifier === 'start' &&
          top + offsetY < viewportTop + SAFETY_MARGIN
        ) {
          newModifier = 'end'
        }
        // 检查end修饰符是否导致底部溢出
        else if (
          modifier === 'end' &&
          bottom + offsetY > viewportBottom - SAFETY_MARGIN
        ) {
          newModifier = 'start'
        }
      }

      // 应用新的修饰符（如果有变化）
      if (newModifier !== modifier) {
        finalPlacement = `${mainPlacement}-${newModifier}` as PlacementType
      }
    }
  }

  // 计算变换原点和起点，以及终点位置
  const calculatePositioningData = (placement: PlacementType) => {
    // 默认值
    let origin = 'center center'
    let startPoint = { x: '50%', y: '50%' }
    let endX, endY

    // 根据放置位置确定变换原点、起始点和终点位置
    switch (placement) {
      case 'top':
        origin = 'center bottom'
        startPoint = { x: '50%', y: '100%' }
        endX = x + width / 2 - popoverWidth / 2 // 水平居中
        endY = y - popoverHeight // 顶部对齐
        break
      case 'top-start':
        origin = 'left bottom'
        startPoint = { x: '0%', y: '100%' }
        endX = x // 左对齐
        endY = y - popoverHeight // 顶部对齐
        break
      case 'top-end':
        origin = 'right bottom'
        startPoint = { x: '100%', y: '100%' }
        endX = x + width - popoverWidth // 右对齐
        endY = y - popoverHeight // 顶部对齐
        break
      case 'bottom':
        origin = 'center top'
        startPoint = { x: '50%', y: '0%' }
        endX = x + width / 2 - popoverWidth / 2 // 水平居中
        endY = y + height // 底部对齐
        break
      case 'bottom-start':
        origin = 'left top'
        startPoint = { x: '0%', y: '0%' }
        endX = x // 左对齐
        endY = y + height // 底部对齐
        break
      case 'bottom-end':
        origin = 'right top'
        startPoint = { x: '100%', y: '0%' }
        endX = x + width - popoverWidth // 右对齐
        endY = y + height // 底部对齐
        break
      case 'left':
        origin = 'right center'
        startPoint = { x: '100%', y: '50%' }
        endX = x - popoverWidth // 左对齐
        endY = y + height / 2 - popoverHeight / 2 // 垂直居中
        break
      case 'left-start':
        origin = 'right top'
        startPoint = { x: '100%', y: '0%' }
        endX = x - popoverWidth // 左对齐
        endY = y // 顶部对齐
        break
      case 'left-end':
        origin = 'right bottom'
        startPoint = { x: '100%', y: '100%' }
        endX = x - popoverWidth // 左对齐
        endY = y + height - popoverHeight // 底部对齐
        break
      case 'right':
        origin = 'left center'
        startPoint = { x: '0%', y: '50%' }
        endX = x + width // 右对齐
        endY = y + height / 2 - popoverHeight / 2 // 垂直居中
        break
      case 'right-start':
        origin = 'left top'
        startPoint = { x: '0%', y: '0%' }
        endX = x + width // 右对齐
        endY = y // 顶部对齐
        break
      case 'right-end':
        origin = 'left bottom'
        startPoint = { x: '0%', y: '100%' }
        endX = x + width // 右对齐
        endY = y + height - popoverHeight // 底部对齐
        break
      default:
        origin = 'center center'
        startPoint = { x: '50%', y: '50%' }
        endX = x + width / 2 - popoverWidth / 2 // 水平居中
        endY = y + height / 2 - popoverHeight / 2 // 垂直居中
        break
    }

    // 应用偏移
    endX += offsetX
    endY += offsetY

    // 边界保护：确保不超出视口边界
    if (strategy !== 'fixed') {
      // 水平边界保护
      if (endX < viewportLeft + SAFETY_MARGIN) {
        endX = viewportLeft + SAFETY_MARGIN
      } else if (endX + popoverWidth > viewportRight - SAFETY_MARGIN) {
        endX = viewportRight - popoverWidth - SAFETY_MARGIN
      }

      // 垂直边界保护
      if (endY < viewportTop + SAFETY_MARGIN) {
        endY = viewportTop + SAFETY_MARGIN
      } else if (endY + popoverHeight > viewportBottom - SAFETY_MARGIN) {
        endY = viewportBottom - popoverHeight - SAFETY_MARGIN
      }
    }

    return { origin, startPoint, endX, endY }
  }

  // 3. 算出偏移量，构建精确的变换值
  const buildTransformValue = (placement: PlacementType) => {
    const { endX, endY } = calculatePositioningData(placement)
    return `translate(${endX}px, ${endY}px)`
  }

  // 构建最终的样式对象
  return {
    transformOrigin: calculatePositioningData(finalPlacement).origin,
    transform: buildTransformValue(finalPlacement),
    '--x': `${x}px`, // 触发元素的x坐标
    '--y': `${y}px`, // 触发元素的y坐标
    '--width': `${width}px`, // 触发元素的宽度
    '--height': `${height}px`, // 触发元素的高度
    '--left': `${left}px`, // 触发元素的left坐标
    '--top': `${top}px`, // 触发元素的top坐标
    '--right': `${right}px`, // 触发元素的right坐标
    '--bottom': `${bottom}px`, // 触发元素的bottom坐标
    '--viewport-width': `${viewportWidth}px`, // 视口的宽度
    '--viewport-height': `${viewportHeight}px`, // 视口的高度
    '--popover-width': `${popoverWidth}px`, // 弹出层的宽度
    '--popover-height': `${popoverHeight}px`, // 弹出层的高度
    position: 'fixed', // 固定定位
    'data-actual-placement': finalPlacement
  }
}
