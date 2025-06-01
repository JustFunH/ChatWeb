<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthDialogStore } from '@/stores/authDialog'
import apis from '@/services/apis'
import { useRouter } from 'vue-router'
import { handleLoginSuccess } from '@/utils/auth'
const router = useRouter()
const authStore = useAuthDialogStore()

const form = reactive({
    username: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: ''
})

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '邮箱格式错误' }],
    verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (_: any, value: string) => {
                if (value !== form.password) {
                    return Promise.reject('两次密码不一致')
                }
                return Promise.resolve()
            },
            trigger: 'blur'
        }
    ]
}

const countdown = ref(0)
let timer: number | null = null

const sendCode = async () => {
    if (countdown.value > 0) return;

    try {
        // 调用发送验证码的 API
        await apis.sendCode({ email: form.email }); // 假设接口需要邮箱作为参数

        ElMessage.success('验证码已发送');

        countdown.value = 60;
        timer = setInterval(() => {
            countdown.value--;
            if (countdown.value === 0 && timer) {
                clearInterval(timer);
                timer = null;
            }
        }, 1000);
    } catch (error: any) {
        ElMessage.error(error.message || '验证码发送失败');
    }
};

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
    }
})

const registerFormRef = ref()

const handleRegister = async () => {
    registerFormRef.value?.validate(async (valid: boolean) => {
        if (!valid) return
        try {
            const res = await apis.register(form) // 这里替换为你实际的注册接口
            handleLoginSuccess(res)
        } catch (err: any) {
            ElMessage.error(err.message || '注册失败，请重试')
        }
    })
}
</script>

<template>
    <div class="register-container">
        <h2>创建账号</h2>
        <p class="subtitle">开启您的美好旅程</p>
        <el-form :model="form" :rules="rules" ref="registerFormRef" label-position="top">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
                <div class="code-group">
                    <el-input v-model="form.verificationCode" maxlength="6" placeholder="请输入验证码" />
                    <el-button :disabled="countdown > 0" @click="sendCode" type="primary" class="code-btn">
                        {{ countdown > 0 ? `${countdown}s 后重试` : '获取验证码' }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" show-password placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" show-password placeholder="请再次输入密码" />
            </el-form-item>
            <el-button type="primary" @click="handleRegister" class="submit-btn" block>立即注册</el-button>
            <div class="form-footer">
                已有账号？<a @click="authStore.openLogin">立即登录</a>
            </div>
        </el-form>
    </div>
</template>

<style lang="scss" src="./styles.scss" scoped />