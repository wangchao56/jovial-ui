<script setup lang="ts">
import { createLocale, LocaleSymbol } from '@/locale'
import { isRTLLanguage } from '@/locale/helpers'
import { provide, watch } from 'vue'

defineOptions({
  name: 'JvLocaleProvider',
})

const props = defineProps<{
  locale?: string
  fallback?: string
  messages?: Record<string, any>
}>()

const locale = createLocale(props)
provide(LocaleSymbol, locale)
watch(
  () => locale.current.value,
  (newLocale) => {
    const isRtl = isRTLLanguage(newLocale)
    document.dir = isRtl ? 'rtl' : 'ltr'
    document.body.classList.toggle('is-rtl', isRtl)
  },
  { immediate: true },
)
</script>

<template>
  <div class="jv-locale-provider" :lang="locale.current.value">
    <slot />
  </div>
</template>
