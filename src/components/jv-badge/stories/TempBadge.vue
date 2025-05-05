<script setup lang="ts">
import JvButton from '@/components/jv-button/src/JvButton.vue'
import JvIcon from '@/components/jv-icon/src/JvIcon.vue'
import JvBadge from '../src/JvBadge.vue'
</script>

<template>
  <!-- 基础徽标 -->
  <JvBadge :value="5">
    <JvButton>消息</JvButton>
  </JvBadge>

  <!-- 最大值 -->
  <JvBadge :value="100" :max="99">
    <JvButton>通知</JvButton>
  </JvBadge>

  <!-- 小圆点 -->
  <JvBadge dot>
    <JvButton>提醒</JvButton>
  </JvBadge>

  <!-- 自定义偏移 -->
  <JvBadge :value="8" :offset="[10, -5]">
    <JvButton>自定义位置</JvButton>
  </JvBadge>

  <!-- 不同颜色类型 -->
  <JvBadge :value="1" type="primary">
    <JvIcon name="mdi:email" />
  </JvBadge>
</template>
