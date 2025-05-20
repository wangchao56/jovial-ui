<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/locale'

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

// 定义样式
const useButtonStyles = makeStyles({
root: { padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  primary: { backgroundColor: 'blue', color: 'white' }
})
// 在组件中使用
const classes = useButtonStyles()
<button :class="classes.value.root">
基础按钮
</button>
