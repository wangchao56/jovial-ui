<script setup lang="ts">
import { makeStyles } from '@/hooks/useStyle/makeStyles'

// 定义样式
const useButtonStyles = makeStyles({
  root: { padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  primary: { backgroundColor: 'blue', color: 'white' },
})
// 在组件中使用
const classes = useButtonStyles()
</script>

<template>
  <button :class="classes.value">
    基础按钮
  </button>
</template>
