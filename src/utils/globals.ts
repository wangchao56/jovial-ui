export const IN_BROWSER = typeof window !== 'undefined'
export const SUPPORTS_INTERSECTION
  = IN_BROWSER && 'IntersectionObserver' in window
export const SUPPORTS_TOUCH
  = IN_BROWSER
    && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)
export const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window
export function isMobile() {
  if (!IN_BROWSER)
    return false

  // 用户代理检测
  const uaCheck
    = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

  // 触摸能力检测
  const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  // 屏幕和输入设备检测
  const mediaCheck = IN_BROWSER
    ? window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    : false

  return uaCheck || (touchCheck && mediaCheck)
}

export const IS_MOBILE = isMobile()
