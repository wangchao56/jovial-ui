<script setup lang="ts">
import type { JvModalEmits, JvModalExpose, JvModalProps } from './types'
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvOverlay from '@/components/jv-overlay/src/JvOverlay.vue'
import { useZindex } from '@/hooks'
import { useLocale } from '@/locale/adapters/jovial'
import { computed, normalizeStyle, ref, useId, watch } from 'vue'
import { bem, JVMODAL_NAME } from './types'

defineOptions({ name: JVMODAL_NAME, inheritAttrs: false })

const { maskClosable } = defineProps<JvModalProps>()
const emit = defineEmits<JvModalEmits>()
const modalVisible = ref(false)
const overlayVisible = ref(false)
const local = useLocale()
const { currentZIndex, nextZindex } = useZindex()
nextZindex()
const visible = defineModel<boolean>('modelValue')
function openModal() {
  visible.value = true
}

function closeModal() {
  visible.value = false
}

function toggleModal() {
  visible.value = !visible.value
}

watch(
  visible,
  (val) => {
    if (val) {
      overlayVisible.value = true
    }
    else {
      modalVisible.value = false
    }
  },
  { immediate: true },
)

function overlayOpenAfter() {
  modalVisible.value = true
}

function overlayCloseAfter() {
  emit('closeAfter')
}

function handleCloseAfter() {
  overlayVisible.value = false
}

function handleOpenAfter() {
  emit('openAfter')
}

function handleClose() {
  closeModal()
  emit('close')
}

function handleCancel() {
  closeModal()
  emit('cancel')
}

function handleConfirm() {
  closeModal()
  emit('confirm')
}
const modalId = `jv-modal-${useId()}`

const triggerProps = computed(() => {
  return {
    'onClick': toggleModal,
    'class': 'jv-modal__trigger',
    'data-bindmodal-id': modalId,
  }
})
const maskZIndex = computed(() => {
  return currentZIndex.value - 1
})

function handleClickOverlay() {
  if (maskClosable) {
    toggleModal()
  }
}

defineExpose<JvModalExpose>({
  open: openModal,
  close: closeModal,
})
</script>

<template>
  <slot name="trigger" :props="triggerProps" />
  <JvOverlay
    target="viewport"
    :model-value="overlayVisible"
    :mask-z-index="maskZIndex"
    class="jv-modal"
    @open-after="overlayOpenAfter"
    @close-after="overlayCloseAfter"
    @click-overlay="handleClickOverlay"
  >
    <template #default="{ style: contentStyle }">
      <Transition
        name="jv-modal"
        @after-enter="handleOpenAfter"
        @after-leave="handleCloseAfter"
      >
        <div
          v-if="modalVisible"
          :id="modalId"
          :class="[bem.e('wrapper'), bem.is('open', visible)]"
          :style="normalizeStyle(contentStyle)"
        >
          <div :class="[bem.e('header')]">
            <slot name="header">
              <div :class="[bem.e('title')]">
                <slot name="title">
                  <span>标题</span>
                </slot>
              </div>
            </slot>
            <!-- 关闭按钮 -->
            <JvButton
              v-if="closeable"
              size="small"
              variant="text"
              :icon="closeIcon"
              @click="handleClose"
            />
          </div>
          <div :class="[bem.e('body')]">
            <slot />
          </div>
          <div :class="[bem.e('footer')]">
            <slot name="footer">
              <JvButton
                size="small"
                variant="outlined"
                color-type="warning"
                @click="handleCancel"
              >
                {{ cancelText || local.t('$jv.modal.cancel') }}
              </JvButton>
              <JvButton
                size="small"
                variant="text"
                color-type="primary"
                @click="handleConfirm"
              >
                {{ confirmText || local.t('$jv.modal.confirm') }}
              </JvButton>
            </slot>
          </div>
        </div>
      </Transition>
    </template>
  </JvOverlay>
</template>

<style lang="scss">
@use '@/theme/styles/border-radius' as *;

@include b(modal) {
  display: flex;
  justify-content: center;
  align-items: center;

  @include e(wrapper) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    // 组件样式
    width: fit-content;
    height: fit-content;
    padding: 16px;
    border-radius: var(--jv-rounded-md);
    box-shadow: var(--jv-elevation-4);
    background-color: #fff;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__title {
    font-size: var(--jv-font-size-lg);
    font-weight: var(--jv-font-weight-bold);
    text-wrap: nowrap;
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    gap: 16px;
  }
}

// 动画
.jv-modal-enter-active,
.jv-modal-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0.2, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.jv-modal-enter-from,
.jv-modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.jv-modal-enter-to,
.jv-modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
