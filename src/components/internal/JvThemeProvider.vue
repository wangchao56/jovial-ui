<script setup lang="ts">
import { provideTheme, useTheme } from '@/theme/config/index'
import { unref } from 'vue'

defineOptions({
  name: 'JvThemeProvider',
})

const props = defineProps<{
  theme?: string
}>()

const theme = useTheme()
provideTheme({ theme: props.theme })
</script>

<template>
  <div
    class="jv-theme-provider"
    :class="[unref(theme.themeClasses)]"
  >
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
