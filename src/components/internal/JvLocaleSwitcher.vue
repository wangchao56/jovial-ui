<script setup lang="ts">
import { useLocale } from '@/locale/adapters/jovial'
import { computed } from 'vue'

defineOptions({
  name: 'JvLocaleSwitcher',
})

const locale = useLocale()
const availableLocales = computed(() => Object.keys(locale.messages.value))
</script>

<template>
  <div class="jv-locale-switcher">
    <select v-model="locale.current.value">
      <option v-for="lang in availableLocales" :key="lang" :value="lang">
        {{ locale.t(`$jv.languages.${lang}`) }}
      </option>
    </select>
  </div>
</template>
