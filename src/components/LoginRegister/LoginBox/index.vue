<script setup lang="ts">
import apis from '@/services/apis'
import { handleLoginSuccess } from '@/utils/auth'
import { computed, ref, reactive, onMounted } from 'vue'
import { useAuthDialogStore } from '@/stores/authDialog'
import { ElMessage } from 'element-plus'

const loginForm = reactive({
  username: '',
  password: ''
})

const authStore = useAuthDialogStore()
const errorMsg = ref('')
const loginRef = ref('')
const isFormValid = computed(() => loginForm.username && loginForm.password)

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}


const handleLogin = async () => {
  const valid = await loginRef.value?.validate().catch(() => false)
  if (!valid) return

  const xssPattern = /(~|\{|\}|"|'|<|>|\?)/g
  if (xssPattern.test(loginForm.username) || xssPattern.test(loginForm.password)) {
    ElMessage.error('警告: 输入包含非法字符')
    return
  }

  try {
    const res = await apis.login(loginForm)
    authStore.closeDialog() 
    handleLoginSuccess(res)
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败，请检查用户名密码')
  }
}

</script>

<template>
  <div class="login-container">
    <div class="form-header">
      <h2>用户登录</h2>
      <p>欢迎回来，请登录您的账号</p>
    </div>

    <form class="login-form">
      <el-form :model="loginForm" :rules="rules" ref="loginRef" label-width="0">
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="loginForm.password" type="password" placeholder="密码" show-password />
        </el-form-item>
        <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
        <el-button type="primary" :disabled="!isFormValid" class="submit-btn" 
        @click="handleLogin" block>登录</el-button>
      </el-form>

      <div class="form-footer">
        <span>还没有账号？</span>
        <a @click="authStore.openRegister">立即注册</a>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="./styles.scss" scoped />
