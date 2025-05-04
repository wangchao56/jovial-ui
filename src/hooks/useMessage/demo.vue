<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from './index'

defineOptions({
  name: 'JvMessageDemo'
})
// 用于手动控制的消息实例
const manualMessage = ref<{ close: () => void } | null>(null)

// 基础消息
function showMessage() {
  useMessage('这是一条默认消息')
}

function showSuccessMessage() {
  useMessage.success('操作成功')
}

function showWarningMessage() {
  useMessage.warning('警告信息')
}

function showErrorMessage() {
  useMessage.error('操作失败')
}

function showInfoMessage() {
  useMessage.info('提示信息')
}

// 消息变体
function showOutlinedMessage() {
  useMessage({
    message: 'Outlined 消息',
    variant: 'outlined',
    type: 'info'
  })
}

function showFilledMessage() {
  useMessage({
    message: 'Filled 消息',
    variant: 'filled',
    type: 'info'
  })
}

// 可关闭
function showClosableMessage() {
  useMessage({
    message: '点击右侧按钮关闭',
    closable: true,
    duration: 0
  })
}

// 自定义持续时间
function showLongDurationMessage() {
  useMessage({
    message: '这条消息将显示10秒',
    duration: 10000
  })
}

function showNoDurationMessage() {
  useMessage({
    message: '这条消息不会自动关闭',
    duration: 0
  })
}

// 手动控制
function showManualControl() {
  manualMessage.value = useMessage({
    message: '手动创建的消息',
    duration: 0
  })
}

function closeManualMessage() {
  if (manualMessage.value) {
    manualMessage.value.close()
    manualMessage.value = null
  }
}

function closeAll() {
  useMessage.closeAll()
}
</script>

<template>
  <div class="message-demo">
    <h3>基础消息</h3>
    <div class="button-group">
      <jv-button @click="showMessage"> 默认消息 </jv-button>
      <jv-button type="primary" @click="showSuccessMessage">
        成功消息
      </jv-button>
      <jv-button type="warning" @click="showWarningMessage">
        警告消息
      </jv-button>
      <jv-button type="error" @click="showErrorMessage"> 错误消息 </jv-button>
      <jv-button type="info" @click="showInfoMessage"> 信息消息 </jv-button>
    </div>

    <h3>消息变体</h3>
    <div class="button-group">
      <jv-button @click="showOutlinedMessage"> Outlined </jv-button>
      <jv-button @click="showFilledMessage"> Filled </jv-button>
    </div>

    <h3>可关闭</h3>
    <div class="button-group">
      <jv-button @click="showClosableMessage"> 可关闭消息 </jv-button>
    </div>

    <h3>自定义持续时间</h3>
    <div class="button-group">
      <jv-button @click="showLongDurationMessage"> 10秒 </jv-button>
      <jv-button @click="showNoDurationMessage"> 不自动关闭 </jv-button>
    </div>

    <h3>手动控制</h3>
    <div class="button-group">
      <jv-button @click="showManualControl"> 手动创建 </jv-button>
      <jv-button :disabled="!manualMessage" @click="closeManualMessage">
        关闭消息
      </jv-button>
      <jv-button type="warning" @click="closeAll"> 关闭所有 </jv-button>
    </div>
  </div>
</template>

<style scoped>
.message-demo {
  padding: 20px;
}

.button-group {
  margin-bottom: 20px;
}

.button-group > button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
