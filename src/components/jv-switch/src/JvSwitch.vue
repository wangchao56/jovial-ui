<script setup lang="ts">
import type { JvSwitchEmits, JvSwitchProps } from './types'
import { computed } from 'vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import { vRipple } from '@/directives'
import { bem, JVSWITCH_NAME } from './types'

defineOptions({ name: JVSWITCH_NAME, inheritAttrs: false })

const props = withDefaults(
  defineProps<JvSwitchProps>(),
  {
    modelValue: false,
    disabled: false,
    readonly: false,
    size: 'medium',
    color: 'primary',
    activeValue: true,
    inactiveValue: false,
    showIcon: true,
    loading: false,
    square: false,
    variant: 'inside',
    ripple: true,
  },
)

const emit = defineEmits<JvSwitchEmits>()

// 使用defineModel
const switchValue = defineModel<boolean | string | number>('modelValue')

// 当前开关是否激活
const isChecked = computed(() => {
  return switchValue.value === props.activeValue
})

// 是否禁用
const isDisabled = computed(() => {
  return props.disabled || props.loading || props.readonly
})

// 计算涟漪选项
const rippleOptions = computed(() => {
  if (!props.ripple || isDisabled.value) {
    return null
  }

  return {
    center: true,
    color: isChecked.value ? props.color : 'default',
  }
})

// 处理开关点击事件
function handleClick(event: MouseEvent) {
  if (isDisabled.value)
    return

  event.preventDefault()
  event.stopPropagation()

  emit('click', event)
  toggleSwitch()
}

// 切换开关状态
function toggleSwitch() {
  if (isDisabled.value)
    return

  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  switchValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 键盘事件处理
function handleKeyDown(event: KeyboardEvent) {
  if (isDisabled.value)
    return

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleSwitch()
  }
}

// 生成开关尺寸类
const sizeClass = computed(() => {
  return props.size ? bem.m(`size-${props.size}`) : ''
})
</script>

<template>
  <div
    v-ripple="rippleOptions" :class="[
      bem.b(),
      sizeClass,
      bem.m(`color-${props.color}`),
      bem.m(`variant-${props.variant}`),
      bem.is('checked', isChecked),
      bem.is('disabled', isDisabled),
      bem.is('readonly', props.readonly),
      bem.is('loading', props.loading),
      bem.is('square', props.square),
    ]" role="switch" :aria-checked="isChecked"
    :aria-disabled="isDisabled" :aria-readonly="props.readonly" tabindex="0" @click="handleClick"
    @keydown="handleKeyDown"
  >
    <!-- 开关轨道 -->
    <div :class="bem.e('track')">
      <!-- 关闭状态文本 -->
      <span v-if="props.inactiveText" :class="bem.e('text-off')">
        {{ props.inactiveText }}
      </span>

      <!-- 开关圆点 -->
      <div :class="bem.e('thumb')">
        <!-- 加载状态 -->
        <JvIcon v-if="props.loading" name="$loading" :class="bem.e('loading-icon')" />

        <!-- 开关图标 - 关闭状态 -->
        <slot v-else-if="!isChecked && $slots.inactiveIcon" name="inactiveIcon" />
        <JvIcon v-else-if="!isChecked && showIcon" name="$close" :class="bem.e('icon')" />

        <!-- 开关图标 - 打开状态 -->
        <slot v-else-if="isChecked && $slots.activeIcon" name="activeIcon" />
        <JvIcon v-else-if="isChecked && showIcon" name="$check" :class="bem.e('icon')" />
      </div>

      <!-- 打开状态文本 -->
      <span v-if="props.activeText" :class="bem.e('text-on')">
        {{ props.activeText }}
      </span>
    </div>

    <!-- 隐藏的原生输入框，用于表单提交 -->
    <input v-if="props.name" type="hidden" :name="props.name" :value="switchValue">
  </div>
</template>

<style lang="scss">
@include b(switch) {
  position: relative;
  display: inline-flex;

  // 适配涟漪效果
  overflow: hidden; // 确保涟漪效果不超出组件边界
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  vertical-align: middle;
  outline: none;

  // 开关轨道
  @include e(track) {
    position: relative;
    display: flex;
    align-items: center;
    min-width: calc(var(--jv-control-height-medium, 32px) * 1.75);
    height: var(--jv-control-height-medium, 32px);
    border-radius: var(--switch-border-radius);
    background-color: var(--jv-neutral-300);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // 开关圆点
  @include e(thumb) {
    position: absolute;
    left: 4px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--jv-control-height-medium, 32px) - 8px);
    height: calc(var(--jv-control-height-medium, 32px) - 8px);
    border-radius: var(--switch-thumb-radius);
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
    background-color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // 图标样式
  @include e(icon) {
    color: var(--jv-neutral-500);
    font-size: 14px;
    transition: all 0.3s;
  }

  // 加载图标
  @include e(loading-icon) {
    color: var(--jv-neutral-500);
    font-size: 14px;
    animation: jv-switch-loading 1s infinite linear;
  }

  // 文本样式 - 关闭状态
  @include e(text-off) {
    margin-right: calc(var(--jv-control-height-medium, 32px) - 4px);
    padding-left: 8px;
    color: var(--jv-text-secondary);
    font-size: var(--jv-font-size-sm);
  }

  // 文本样式 - 打开状态
  @include e(text-on) {
    margin-left: calc(var(--jv-control-height-medium, 32px) - 4px);
    padding-right: 8px;
    color: var(--jv-text-secondary);
    font-size: var(--jv-font-size-sm);
  }

  // 内部变体（默认）
  @include m(variant-inside) {
    @include e(track) {
      background-color: var(--jv-neutral-300);
    }

    @include e(thumb) {
      background-color: white;
    }

    // 选中状态
    @include when(checked) {
      @include e(track) {
        background-color: var(--switch-color, var(--jv-primary));
      }

      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-medium, 32px) + 4px);
      }

      @include e(icon) {
        color: var(--switch-color, var(--jv-primary));
      }
    }
  }

  // 外部变体
  @include m(variant-outside) {
    @include e(track) {
      border: 1px solid var(--jv-neutral-300);
      background-color: white;
    }

    @include e(thumb) {
      background-color: var(--jv-neutral-300);
    }

    // 选中状态
    @include when(checked) {
      @include e(track) {
        border-color: var(--switch-color, var(--jv-primary));
      }

      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-medium, 32px) + 4px);
        background-color: var(--switch-color, var(--jv-primary));
      }

      @include e(icon) {
        color: white;
      }
    }
  }

  // 禁用状态
  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    &.jv-switch--variant-inside {
      @include e(track) {
        background-color: var(--jv-neutral-200);
      }

      @include e(thumb) {
        background-color: var(--jv-neutral-100);
      }
    }

    &.jv-switch--variant-outside {
      @include e(track) {
        border-color: var(--jv-neutral-200);
      }

      @include e(thumb) {
        background-color: var(--jv-neutral-200);
      }
    }
  }

  // 只读状态
  @include when(readonly) {
    cursor: default;
  }

  // 定义颜色变量
  @include m(color-default) {
    --switch-color: var(--jv-neutral-500);
  }

  @include m(color-primary) {
    --switch-color: var(--jv-primary);
  }

  @include m(color-secondary) {
    --switch-color: var(--jv-secondary);
  }

  @include m(color-success) {
    --switch-color: var(--jv-success);
  }

  @include m(color-warning) {
    --switch-color: var(--jv-warning);
  }

  @include m(color-error) {
    --switch-color: var(--jv-error);
  }

  @include m(color-info) {
    --switch-color: var(--jv-info);
  }

  // 尺寸 - 超小
  @include m(size-tiny) {
    @include e(track) {
      min-width: calc(var(--jv-control-height-tiny, 20px) * 1.75);
      height: var(--jv-control-height-tiny, 20px);
    }

    @include e(thumb) {
      width: calc(var(--jv-control-height-tiny, 20px) - 8px);
      height: calc(var(--jv-control-height-tiny, 20px) - 8px);
    }

    @include e(icon) {
      font-size: 10px;
    }

    @include e(loading-icon) {
      font-size: 10px;
    }

    &__text-off,
    &__text-on {
      font-size: var(--jv-font-size-xs);
    }

    @include when(checked) {
      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-tiny, 20px) + 4px);
      }
    }
  }

  // 尺寸 - 小
  @include m(size-small) {
    @include e(track) {
      min-width: calc(var(--jv-control-height-small, 24px) * 1.75);
      height: var(--jv-control-height-small, 24px);
    }

    @include e(thumb) {
      width: calc(var(--jv-control-height-small, 24px) - 8px);
      height: calc(var(--jv-control-height-small, 24px) - 8px);
    }

    @include e(icon) {
      font-size: 12px;
    }

    @include e(loading-icon) {
      font-size: 12px;
    }

    @include when(checked) {
      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-small, 24px) + 4px);
      }
    }
  }

  // 尺寸 - 大
  @include m(size-large) {
    @include e(track) {
      min-width: calc(var(--jv-control-height-large, 40px) * 1.75);
      height: var(--jv-control-height-large, 40px);
    }

    @include e(thumb) {
      width: calc(var(--jv-control-height-large, 40px) - 8px);
      height: calc(var(--jv-control-height-large, 40px) - 8px);
    }

    @include e(icon) {
      font-size: 16px;
    }

    @include e(loading-icon) {
      font-size: 16px;
    }

    &__text-off,
    &__text-on {
      font-size: var(--jv-font-size-base);
    }

    @include when(checked) {
      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-large, 40px) + 4px);
      }
    }
  }

  // 尺寸 - 超大
  @include m(size-xlarge) {
    @include e(track) {
      min-width: calc(var(--jv-control-height-xlarge, 48px) * 1.75);
      height: var(--jv-control-height-xlarge, 48px);
    }

    @include e(thumb) {
      width: calc(var(--jv-control-height-xlarge, 48px) - 8px);
      height: calc(var(--jv-control-height-xlarge, 48px) - 8px);
    }

    @include e(icon) {
      font-size: 18px;
    }

    @include e(loading-icon) {
      font-size: 18px;
    }

    &__text-off,
    &__text-on {
      font-size: var(--jv-font-size-lg);
    }

    @include when(checked) {
      @include e(thumb) {
        left: calc(100% - var(--jv-control-height-xlarge, 48px) + 4px);
      }
    }
  }

  // 聚焦状态样式
  &:focus-visible {
    outline: 2px solid var(--jv-primary-300);
    outline-offset: 2px;
  }

  // 悬停状态
  &:not(.jv-switch--is-disabled):hover {
    .jv-switch__thumb {
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.2);
    }
  }

  // 如果需要自定义涟漪效果的样式
  &.jv-ripple-active::after {
    border-radius: inherit;
    opacity: 0.2;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// 加载动画
@keyframes jv-switch-loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
