<script setup lang="ts">
import JvThemeProvider from '@/components/internal/JvThemeProvider.vue'
import { ref } from 'vue'
import ResponsiveGridExample from './components/examples/ResponsiveGrid.vue'
import TableExample from './components/examples/TableExample.vue'
import { useLocale } from './locale/adapters/jovial'
// 测试locale
const locale = useLocale()
locale.t('open')
const loading = ref(false)
// 未使用的函数，以下划线开头命名或移除
function _handleClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <JvThemeProvider>
    <TableExample />
    <ResponsiveGridExample />
  </JvThemeProvider>
</template>

<style lang="scss">
.app-container {
  position: relative;
  width: 500px;
  height: 400px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  --header-height: 50px;
  overflow-y: auto;

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background-color: #000;
  }

  .content {
    width: 100vw;
    height: 100vh;
    padding-top: var(--header-height);
  }
}
</style>
