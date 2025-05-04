<script setup lang="ts">
import { createLocaleManager } from '@/locale'
import { LocaleSymbol } from '@/locale/adapters/jovial'
import { provide, watch } from 'vue'

defineOptions({
  name: 'JvLocaleProvider',
})

const props = defineProps<{
  locale?: string
  fallback?: string
  messages?: Record<string, any>
}>()

const locale = createLocaleManager(props)
provide(LocaleSymbol, locale)

function isRTLLanguage(locale: string): boolean {
  return ['ar', 'he', 'fa', 'ur'].some(rtl => locale.startsWith(rtl))
}

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
