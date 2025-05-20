<script setup lang="ts">
import type { JvMenuEmits, JvMenuProps, MenuItem } from './types'
import type { Rect } from '@/components/jv-popper/src/types'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import JvPopper from '@/components/jv-popper/src/JvPopper.vue'
import OptimizedMenuRenderer from './OptimizedMenuRenderer.vue'
import { bem, JVMENU_NAME } from './types'

defineOptions({ name: JVMENU_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<JvMenuProps>(), {
  items: () => [],
  placement: 'bottom',
  trigger: 'click',
  offset: 10,
  arrow: true,
  disabled: false,
  width: 'auto',
  maxHeight: '300px',
  zIndex: 2000,
  closeOnClickOutside: true,
  closeOnEsc: true,
  transition: 'jv-menu-transition',
  teleport: 'body',
})

const emit = defineEmits<JvMenuEmits>()

// 控制菜单的显示状态
const visible = ref(props.modelValue || false)
// 触发器元素引用
const triggerRef = ref<HTMLElement | null>(null)
// 菜单内容引用
const menuRef = ref<HTMLElement | null>(null)
// 触发器元素的位置信息
const triggerRect = ref<Rect | null>(null)
// 是否处于悬停状态
const isHovered = ref(false)
// 悬停计时器
const hoverTimer = ref<number | null>(null)
// 当前聚焦的菜单项索引
const focusedItemIndex = ref(-1)
// 菜单项元素数组
const menuItems = ref<HTMLElement[]>([])

// 同步内部visible和外部modelValue
watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    visible.value = val
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
  if (val) {
    emit('show')
    // 显示菜单时，重置焦点索引并设置ARIA属性
    focusedItemIndex.value = -1
    nextTick(() => {
      collectMenuItems()
      // 自动聚焦到第一个菜单项
      if (menuItems.value.length > 0) {
        focusedItemIndex.value = 0
        menuItems.value[0].focus()
      }
    })
  }
  else {
    emit('hide')
    // 隐藏菜单时，将焦点返回到触发器
    if (triggerRef.value) {
      triggerRef.value.focus()
    }
  }
})

// 更新触发器元素的位置信息
function updateTriggerRect() {
  if (triggerRef.value) {
    const domRect = triggerRef.value.getBoundingClientRect()
    // 转换为符合Rect类型的对象
    triggerRect.value = {
      x: domRect.x,
      y: domRect.y,
      width: domRect.width,
      height: domRect.height,
      top: domRect.top,
      right: domRect.right,
      bottom: domRect.bottom,
      left: domRect.left,
    }
  }
}

// 收集菜单项元素
function collectMenuItems() {
  if (menuRef.value) {
    // 获取所有可聚焦的菜单项
    menuItems.value = Array.from(
      menuRef.value.querySelectorAll('div[role="menuitem"], button, a, input, select, textarea'),
    ) as HTMLElement[]
  }
}

// 点击触发器
function handleTriggerClick() {
  if (props.disabled)
    return
  if (props.trigger === 'click' || props.trigger === 'manual') {
    toggleMenu()
  }
}

// 悬停触发器
function handleTriggerMouseEnter() {
  if (props.disabled)
    return
  if (props.trigger === 'hover') {
    isHovered.value = true
    if (hoverTimer.value) {
      clearTimeout(hoverTimer.value)
      hoverTimer.value = null
    }
    visible.value = true
  }
}

// 离开触发器
function handleTriggerMouseLeave() {
  if (props.disabled)
    return
  if (props.trigger === 'hover') {
    isHovered.value = false
    if (hoverTimer.value) {
      clearTimeout(hoverTimer.value)
    }
    hoverTimer.value = setTimeout(() => {
      if (!isHovered.value) {
        visible.value = false
      }
    }, 200) as unknown as number
  }
}

// 切换菜单显示状态
function toggleMenu() {
  if (props.disabled)
    return
  visible.value = !visible.value
}

// 关闭菜单
function closeMenu() {
  visible.value = false
}

// 处理菜单项点击
function handleItemClick(item: MenuItem) {
  emit('itemClick', item)

  // 如果不是子菜单项，点击后关闭菜单
  if (item.type !== 'submenu') {
    closeMenu()
  }
}

// 菜单内容样式
const contentStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
    zIndex: props.zIndex,
  }
})

// 处理点击外部关闭菜单
function handleClickOutside(e: MouseEvent) {
  if (!props.closeOnClickOutside || props.trigger === 'manual')
    return

  const target = e.target as HTMLElement
  const triggerEl = triggerRef.value
  const menuEl = menuRef.value

  if (visible.value && triggerEl && menuEl && !triggerEl.contains(target) && !menuEl.contains(target)) {
    closeMenu()
    emit('clickOutside', e)
  }
}

// 处理按键事件
function handleKeydown(e: KeyboardEvent) {
  if (!visible.value)
    return

  switch (e.key) {
    case 'Escape':
      if (props.closeOnEsc) {
        e.preventDefault()
        closeMenu()
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      navigateMenu(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      navigateMenu(-1)
      break
    case 'Home':
      e.preventDefault()
      focusFirstItem()
      break
    case 'End':
      e.preventDefault()
      focusLastItem()
      break
    case 'Enter':
    case ' ':
      if (document.activeElement && document.activeElement.getAttribute('role') === 'menuitem') {
        e.preventDefault()
        ;(document.activeElement as HTMLElement).click()
      }
      break
  }
}

// 导航菜单项
function navigateMenu(direction: number) {
  if (menuItems.value.length === 0)
    return

  let newIndex = focusedItemIndex.value + direction

  // 循环导航
  if (newIndex < 0)
    newIndex = menuItems.value.length - 1
  else if (newIndex >= menuItems.value.length)
    newIndex = 0

  focusedItemIndex.value = newIndex
  menuItems.value[newIndex].focus()
}

// 聚焦第一个菜单项
function focusFirstItem() {
  if (menuItems.value.length > 0) {
    focusedItemIndex.value = 0
    menuItems.value[0].focus()
  }
}

// 聚焦最后一个菜单项
function focusLastItem() {
  if (menuItems.value.length > 0) {
    focusedItemIndex.value = menuItems.value.length - 1
    menuItems.value[menuItems.value.length - 1].focus()
  }
}

// 监听点击事件，处理点击外部关闭菜单
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', updateTriggerRect)
  window.addEventListener('scroll', updateTriggerRect, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updateTriggerRect)
  window.removeEventListener('scroll', updateTriggerRect, true)

  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }
})

// 组件挂载后更新触发器元素位置
onMounted(() => {
  updateTriggerRect()
})

// 导出方法
defineExpose({
  show: () => { visible.value = true },
  hide: () => { visible.value = false },
  toggle: toggleMenu,
})
</script>

<template>
  <div
    :class="bem.b()"
    :data-state="visible ? 'open' : 'closed'"
  >
    <!-- 菜单触发器 -->
    <div
      ref="triggerRef"
      :class="bem.e('trigger')"
      :aria-expanded="visible"
      :aria-haspopup="true"
      :tabindex="disabled ? -1 : 0"
      role="button"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
      @keydown.enter.space.prevent="handleTriggerClick"
    >
      <slot />
    </div>

    <!-- 菜单内容 -->
    <Teleport :to="props.teleport">
      <Transition :name="props.transition">
        <div
          v-if="visible && triggerRect"
          ref="menuRef"
          :class="bem.e('content')"
          :style="contentStyle"
          role="menu"
          aria-orientation="vertical"
          @mouseenter="handleTriggerMouseEnter"
          @mouseleave="handleTriggerMouseLeave"
        >
          <JvPopper
            v-model="visible"
            :reference-rect="triggerRect"
            :placement="placement"
            :arrow="arrow"
            :offset="offset"
          >
            <div :class="bem.e('inner')">
              <!-- 通过插槽方式传入的菜单内容 -->
              <slot v-if="$slots.content" name="content" />

              <!-- 通过items数据渲染的菜单内容 -->
              <template v-else-if="items && items.length > 0">
                <!-- 使用优化的菜单渲染器 -->
                <OptimizedMenuRenderer
                  :items="items"
                  :lazy-load="true"
                  :preload-level="1"
                  @item-click="handleItemClick"
                />
              </template>

              <!-- 空状态 -->
              <div v-else :class="bem.e('empty')">
                <slot name="empty">
                  <div :class="bem.e('empty-text')">
                    暂无菜单项
                  </div>
                </slot>
              </div>
            </div>

            <template v-if="$slots.arrow" #arrow>
              <slot name="arrow" />
            </template>
          </JvPopper>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@include b(menu) {
  position: relative;
  display: inline-block;

  @include e(trigger) {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &:focus {
      outline: 2px solid var(--jv-theme-primary, #1976d2);
      outline-offset: 2px;
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  @include e(content) {
    position: absolute;
    z-index: var(--jv-menu-z-index, 2000);
    min-width: 150px;
    padding: 4px 0;
    border-radius: var(--jv-rounded, 4px);
    box-shadow: var(--jv-elevation-6);
    background-color: var(--jv-menu-bg, #fff);
    overflow-y: auto;
  }

  @include e(inner) {
    padding: 4px 0;

    [role='menuitem'] {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      outline: none;

      &:hover,
      &:focus {
        background-color: var(--jv-menu-hover-bg, rgb(0 0 0 / 0.04));
      }

      &[aria-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }

  @include e(empty) {
    padding: 16px;
    text-align: center;
  }

  @include e(empty-text) {
    color: var(--jv-text-secondary, rgb(0 0 0 / 0.6));
    font-size: 14px;
  }
}

.jv-menu-transition-enter-active,
.jv-menu-transition-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.jv-menu-transition-enter-from,
.jv-menu-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
