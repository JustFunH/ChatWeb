<template>
  <div class="app-wrapper">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
// 全局导入 toast 样式
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
// element dark 模式
import 'element-plus/theme-chalk/dark/css-vars.css'
</script>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/login.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
