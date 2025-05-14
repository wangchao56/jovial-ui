import { computed, onMounted, onUnmounted, ref } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 断点配置，与_breakpoints.scss保持一致
export const breakpoints: Record<Breakpoint, number> = {
  'xs': 480,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
}

/**
 * 使用断点检测
 * @returns 断点相关的响应式数据和方法
 */
export function useBreakpoints() {
  // 当前窗口宽度
  const windowWidth = ref(0)

  // 更新窗口宽度
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  // 是否为特定断点
  const isXs = computed(() => windowWidth.value < breakpoints.sm)
  const isSm = computed(
    () =>
      windowWidth.value >= breakpoints.sm && windowWidth.value < breakpoints.md,
  )
  const isMd = computed(
    () =>
      windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg,
  )
  const isLg = computed(
    () =>
      windowWidth.value >= breakpoints.lg && windowWidth.value < breakpoints.xl,
  )
  const isXl = computed(
    () =>
      windowWidth.value >= breakpoints.xl
      && windowWidth.value < breakpoints['2xl'],
  )
  const is2xl = computed(() => windowWidth.value >= breakpoints['2xl'])

  // 当前激活的断点
  const current = computed<Breakpoint>(() => {
    if (is2xl.value)
      return '2xl'
    if (isXl.value)
      return 'xl'
    if (isLg.value)
      return 'lg'
    if (isMd.value)
      return 'md'
    if (isSm.value)
      return 'sm'
    return 'xs'
  })

  // 断点判断映射
  const isBreakpoint = computed(() => ({
    'xs': isXs.value,
    'sm': isSm.value,
    'md': isMd.value,
    'lg': isLg.value,
    'xl': isXl.value,
    '2xl': is2xl.value,
  }))

  // 是否大于或等于特定断点
  const gtOrEq = (bp: Breakpoint) => windowWidth.value >= breakpoints[bp]

  // 是否小于特定断点
  const lt = (bp: Breakpoint) => windowWidth.value < breakpoints[bp]

  // 窗口尺寸类别（参考 Material Design 窗口尺寸类别）
  const windowSizeClass = computed(() => {
    if (windowWidth.value < 600)
      return 'compact'
    if (windowWidth.value < 840)
      return 'medium'
    if (windowWidth.value < 1200)
      return 'expanded'
    return 'large'
  })

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    windowWidth,
    current,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isBreakpoint,
    gtOrEq,
    lt,
    windowSizeClass,
  }
}
