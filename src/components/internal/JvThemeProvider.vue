<script setup lang="ts">
import type { ThemeOptions } from '@/theme/config/types'
import { provide, unref } from 'vue'
import { createTheme, ThemeSymbol } from '@/theme/config/index'

defineOptions({
  name: 'JvThemeProvider',
})

const props = defineProps<{
  themes?: ThemeOptions
}>()
const themeInstance = createTheme(props.themes)
provide(ThemeSymbol, themeInstance)
</script>

<template>
  <div class="jv-theme-provider" :class="[unref(themeInstance.themeClasses)]">
    <slot />
  </div>
</template>

<style lang="scss">
.jv-theme-provider {
  width: 100%;
  min-height: 100vh;
  background-color: var(--jv-theme-background);
}
</style>
