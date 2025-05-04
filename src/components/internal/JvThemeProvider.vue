<script setup lang="ts">
import { provideTheme, useTheme } from '@/theme/config/index'

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
    :class="[theme.themeClasses]"
    :data-theme="theme.name.value"
  >
    <slot />
  </div>
</template>
