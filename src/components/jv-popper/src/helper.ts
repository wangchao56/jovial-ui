import type { CSSProperties, MaybeRef } from 'vue'
import type { Rect } from './types'
import { unref } from 'vue'

interface PopperOptions {
  placement: PlacementType
  modifiers: {
    arrow?: boolean | {
      element?: HTMLElement
    }
    offset?: MaybeRef<number | [number, number]>
  }
}
// 计算popper的位置
export function calculatePosition(referenceRect: Rect, popperRect: Rect, options: PopperOptions) {
  const { placement, modifiers } = unref(options)
  const offset = unref(modifiers.offset) || [0, 0]
  const arrow = unref(Boolean(modifiers.arrow))
  const { offsetX, offsetY } = usePopperOffset(offset)

  // 基本位置映射 - 减少代码重复
  const basePositions = {
    top: {
      x: referenceRect.x + (referenceRect.width - popperRect.width) / 2 + offsetX,
      y: referenceRect.y - popperRect.height - offsetY - (arrow ? 10 : 0),
    },
    bottom: {
      x: referenceRect.x + (referenceRect.width - popperRect.width) / 2 + offsetX,
      y: referenceRect.bottom + offsetY + (arrow ? 10 : 0),
    },
    left: {
      x: referenceRect.x - popperRect.width - offsetX - (arrow ? 10 : 0),
      y: referenceRect.y + (referenceRect.height - popperRect.height) / 2 + offsetY,
    },
    right: {
      x: referenceRect.right + offsetX + (arrow ? 10 : 0),
      y: referenceRect.y + (referenceRect.height - popperRect.height) / 2 + offsetY,
    },
  }

  // 起始位置变体
  const startPositions = {
    'top-start': { x: referenceRect.x + offsetX, y: basePositions.top.y },
    'bottom-start': { x: referenceRect.x + offsetX, y: basePositions.bottom.y },
    'left-start': { x: basePositions.left.x, y: referenceRect.y + offsetY },
    'right-start': { x: basePositions.right.x, y: referenceRect.y + offsetY },
  }

  // 结束位置变体
  const endPositions = {
    'top-end': { x: referenceRect.right - popperRect.width + offsetX, y: basePositions.top.y },
    'bottom-end': { x: referenceRect.right - popperRect.width + offsetX, y: basePositions.bottom.y },
    'left-end': { x: basePositions.left.x, y: referenceRect.bottom - popperRect.height + offsetY },
    'right-end': { x: basePositions.right.x, y: referenceRect.bottom - popperRect.height + offsetY },
  }

  // 合并所有位置选项
  const allPositions = { ...basePositions, ...startPositions, ...endPositions }

  // 返回计算结果
  return allPositions[placement] || basePositions.bottom
}

// popper的offset计算逻辑
export function usePopperOffset(offset: MaybeRef<number | [number, number]>) {
  const initalOffset = unref(offset)
  const offsetValue = typeof initalOffset === 'number' ? [0, initalOffset] : initalOffset || [0, 0]
  const [offsetX, offsetY] = offsetValue
  return { offsetX, offsetY }
}

/**
 * 实现一个取平均值的函数
 * @param arr 数组
 * @returns 平均值
 */
export function getAverage(arr: number[]) {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length
}

export const oppositePlacementMap = { // 反向映射
  'top': 'bottom',
  'bottom': 'top',
  'left': 'right',
  'right': 'left',
  'top-start': 'bottom-start',
  'top-end': 'bottom-end',
  'bottom-start': 'top-start',
  'bottom-end': 'top-end',
  'left-start': 'right-start',
  'left-end': 'right-end',
  'right-start': 'left-start',
  'right-end': 'left-end',
}
/**
 * 检查 PresetPillar 是否完全在 viewPortPillar 内部
 * @param {number[][]} PresetPillar - 目标矩形 [[x1, y1], [x2, y2]]
 * @param {number[][]} viewPortPillar - 视口矩形 [[x1, y1], [x2, y2]]
 */
export function isPresetPillarInsideViewPort(PresetPillar: number[][], viewPortPillar: number[][]) {
  const [[presetLeft, presetTop], [presetRight, presetBottom]] = PresetPillar
  const [[viewLeft, viewTop], [viewRight, viewBottom]] = viewPortPillar

  // 检查四个边界是否全部在视口内
  return {
    top: presetTop >= viewTop,
    bottom: presetBottom <= viewBottom,
    left: presetLeft >= viewLeft,
    right: presetRight <= viewRight,
  }
}

// 计算最终placement
export function getFinalPlacement(referenceRect: Rect, popperRef: HTMLElement, placement: PlacementType = 'bottom') {
  if (!referenceRect || !popperRef)
    return placement

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const viewportPadding = 5 // 距离视口边缘的最小安全距离
  const { width: popw, height: poph } = popperRef.getBoundingClientRect()

  // 预计算各个方向的放置结果
  const placementResults = {
    top: { y: referenceRect.y - poph, fits: referenceRect.y - poph >= viewportPadding },
    bottom: { y: referenceRect.bottom, fits: referenceRect.bottom + poph <= viewportHeight - viewportPadding },
    left: { x: referenceRect.x - popw, fits: referenceRect.x - popw >= viewportPadding },
    right: { x: referenceRect.right, fits: referenceRect.right + popw <= viewportWidth - viewportPadding },
  }

  // 基于原始放置方向选择最佳替代方案
  if (placement.startsWith('top') && !placementResults.top.fits) {
    return placementResults.bottom.fits ? placement.replace('top', 'bottom') as PlacementType : placement
  }
  else if (placement.startsWith('bottom') && !placementResults.bottom.fits) {
    return placementResults.top.fits ? placement.replace('bottom', 'top') as PlacementType : placement
  }
  else if (placement.startsWith('left') && !placementResults.left.fits) {
    return placementResults.right.fits ? placement.replace('left', 'right') : placement
  }
  else if (placement.startsWith('right') && !placementResults.right.fits) {
    return placementResults.left.fits ? placement.replace('right', 'left') : placement
  }

  return placement
}

// 计算arrowdom与referenceRect 的相对关系并更据placement确认正确的偏移位置渲染位置
export function updateArrow(_referenceRect: Rect, _popperRect: Rect | undefined, _arrow: boolean, _placement: PlacementType) {
  // 1. 减少DOM查询，使用缓存的引用
  const arrowDom = typeof _arrow === 'object' && _arrow
    ? (_arrow as { element: HTMLElement }).element
    : document.querySelector('#jv-popper__arrow') as HTMLElement

  if (!arrowDom || !_referenceRect || !_popperRect)
    return
  //  边缘值 旋转后 箭头会超出边界
  // 2. 批量计算，减少重复访问属性
  const { x: refx, y: refy, right: refRight, bottom: refBottom } = _referenceRect
  const { x: popx, y: popy, width: popw, height: poph, right: popRight, bottom: popBottom } = _popperRect

  // 3. 计算相交区域一次性完成
  const leftMax = Math.max(refx, popx)
  const rightMin = Math.min(popRight, refRight)
  const topMax = Math.max(refy, popy)
  const bottomMin = Math.min(popBottom, refBottom)
  // 4. 计算中心点位置
  const xCenter = leftMax + (rightMin - leftMax) / 2
  const yCenter = topMax + (bottomMin - topMax) / 2
  const arrowX = (xCenter - popx) / popw * 100
  const arrowY = (yCenter - popy) / poph * 100
  let tempStyle: CSSProperties = {}
  if (_placement.startsWith('top')) {
    tempStyle = {
      bottom: 0,
      left: `${arrowX}%`,
      top: 'auto',
      right: 'auto',
      transform: `translateX(-50%) translateY(50%)`,
      transformOrigin: 'center center',
    }
  }
  else if (_placement.startsWith('bottom')) {
    tempStyle = {
      top: 0,
      left: `${arrowX}%`,
      bottom: 'auto',
      right: 'auto',
      transform: `translateX(-50%) translateY(-50%)`,
    }
  }
  else if (_placement.startsWith('left')) {
    tempStyle = {
      top: `${arrowY}%`,
      right: 0,
      bottom: 'auto',
      left: 'auto',
      transform: `translateX(50%) translateY(-50%)`,
    }
  }
  else if (_placement.startsWith('right')) {
    tempStyle = {
      top: `${arrowY}%`,
      left: 0,
      bottom: 'auto',
      right: 'auto',
      transform: `translateX(-50%) translateY(-50%)`,
    }
  }

  return tempStyle
}

// 防止 popper 溢出视口的函数
function preventOverflow(position: { x: number, y: number }, popperRect: Rect, padding = 5) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 应用视口约束
  return {
    x: Math.max(padding, Math.min(position.x, viewportWidth - popperRect.width - padding)),
    y: Math.max(padding, Math.min(position.y, viewportHeight - popperRect.height - padding)),
  }
}

// 添加节流函数
export function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastCall = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - lastCall < delay)
      return
    lastCall = now
    return fn(...args)
  }
}

/**
 * 创建自定义 popper 实例
 * @param referenceRect - 参考元素的矩形信息
 * @param popperRef - popper 元素引用
 * @param options - 配置选项
 * @param options.placement - 放置位置
 * @param options.modifiers - 修饰符
 * @param options.modifiers.offset - 偏移量
 * @param options.modifiers.arrow - 是否显示箭头
 * @param options.modifiers.preventOverflow - 是否防止溢出
 * @param options.modifiers.flip - 是否翻转
 * @param options.strategy - 策略
 * @param options.scrollContainer - 滚动容器
 * @returns 自定义 popper 控制对象
 */
export function createCustomPopper(
  referenceRect: Rect,
  popperRef: HTMLElement,
  options: {
    placement?: PlacementType
    modifiers?: {
      offset?: [number, number]
      arrow?: boolean | { element?: HTMLElement }
      preventOverflow?: boolean
      flip?: boolean
    }
    strategy?: 'absolute' | 'fixed'
    scrollContainer?: HTMLElement | Window
  } = {},
) {
  if (!referenceRect || !popperRef)
    return null

  const {
    placement = 'bottom',
    modifiers = { offset: [0, 0], preventOverflow: true, flip: true },
    strategy = 'fixed',
    scrollContainer = window,
  } = options

  // 获取 popper 元素尺寸
  const popperRect = popperRef.getBoundingClientRect()

  // 计算初始位置
  let finalPlacement = placement
  if (modifiers.flip) {
    finalPlacement = getFinalPlacement(referenceRect, popperRef, placement) as PlacementType
  }

  // 计算位置
  const position = calculatePosition(referenceRect, popperRect, {
    placement: finalPlacement,
    modifiers: {
      offset: modifiers.offset,
      arrow: modifiers.arrow,
    },
  })

  // 如果启用了防溢出
  if (modifiers.preventOverflow) {
    Object.assign(position, preventOverflow(position, popperRect))
  }

  // 应用位置
  const applyPosition = () => {
    if (strategy === 'fixed') {
      popperRef.style.position = 'fixed'
    }
    else {
      popperRef.style.position = 'absolute'
    }

    popperRef.style.top = '0'
    popperRef.style.left = '0'
    popperRef.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
    popperRef.setAttribute('data-placement', finalPlacement)
  }

  // 处理箭头元素
  const updateArrowElement = () => {
    if (!modifiers.arrow)
      return

    const arrowElement = typeof modifiers.arrow === 'object' && modifiers.arrow.element
      ? modifiers.arrow.element
      : popperRef.querySelector('.jv-popper__arrow') as HTMLElement

    if (!arrowElement)
      return

    const arrowStyles = updateArrow(referenceRect, popperRect, !!modifiers.arrow, finalPlacement)
    if (arrowStyles) {
      Object.assign((arrowElement as HTMLElement).style, arrowStyles)
    }
  }

  const update = () => {
    const newPopperRect = popperRef.getBoundingClientRect()
    Object.assign(popperRect, newPopperRect)

    if (modifiers.flip) {
      finalPlacement = getFinalPlacement(referenceRect, popperRef, placement) as PlacementType
    }

    Object.assign(
      position,
      calculatePosition(referenceRect, popperRect, {
        placement: finalPlacement,
        modifiers: {
          offset: modifiers.offset,
          arrow: modifiers.arrow,
        },
      }),
    )

    // 如果启用了防溢出
    if (modifiers.preventOverflow) {
      Object.assign(position, preventOverflow(position, popperRect))
    }

    applyPosition()
    updateArrowElement()
  }

  const handleScroll = throttle(() => update(), 16)

  // 声明实例对象
  const instance = {
    placement: finalPlacement,
    position,
    update: () => {
      const newPopperRect = popperRef.getBoundingClientRect()
      Object.assign(popperRect, newPopperRect)

      if (modifiers.flip) {
        finalPlacement = getFinalPlacement(referenceRect, popperRef, placement) as PlacementType
      }

      Object.assign(
        position,
        calculatePosition(referenceRect, popperRect, {
          placement: finalPlacement,
          modifiers: {
            offset: modifiers.offset,
            arrow: modifiers.arrow,
          },
        }),
      )

      // 如果启用了防溢出
      if (modifiers.preventOverflow) {
        Object.assign(position, preventOverflow(position, popperRect))
      }

      applyPosition()
      updateArrowElement()
    },
    destroy: () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      popperRef.remove()
    },
  }

  // 初始化滚动监听
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

  // 初始化
  applyPosition()
  updateArrowElement()

  // 返回实例
  return instance
}
